#!/usr/bin/env node
// Alchemist production server: static files (allow-listed paths only, the app shell for every route) + a caching
// proxy for PubChem.
// No dependencies. Node 20+.
//
// Why a proxy? A whole classroom usually shares one public IP address, and PubChem allows about
// 5 requests per second per address. The proxy caches responses and paces upstream requests for everyone.
//
// Environment: PORT (8080) · HOST (0.0.0.0) · PROXY (1) · PUBCHEM_INTERVAL_MS (250) · CACHE_MAX_ENTRIES (4000) · CACHE_MAX_MB (256)
//              CLIENT_LIMIT_PER_MIN (300) · TRUST_PROXY (0) · HSTS=1 (behind HTTPS) · LOG=1 · USER_AGENT
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync, constants as zlib } from 'node:zlib';
import {
  APP_ROUTES,
  DEFAULT_USER_AGENT,
  SECURITY_HEADERS as BASE_HEADERS,
  UPSTREAM,
  route,
} from './policy.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';
const INTERVAL = Number(process.env.PUBCHEM_INTERVAL_MS || 250);
const CACHE_MAX = Number(process.env.CACHE_MAX_ENTRIES || 4000);
const CLIENT_LIMIT = Number(process.env.CLIENT_LIMIT_PER_MIN || 300);
// Number of reverse proxies in front of this server. X-Forwarded-For is ignored when 0 (clients can forge it).
const TRUST_PROXY = Number(process.env.TRUST_PROXY || 0);
const USER_AGENT = process.env.USER_AGENT || DEFAULT_USER_AGENT;
const LOG = process.env.LOG === '1';
// PROXY=0 turns the PubChem proxy off: /api/* answers 404 and browsers call PubChem directly.
const PROXY = process.env.PROXY !== '0';
const VERSION = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8')).version;

const SECURITY_HEADERS = {
  ...BASE_HEADERS,
  ...(process.env.HSTS === '1' ? { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' } : {}),
};

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
};
const COMPRESSIBLE = /^(text\/|application\/(json|manifest\+json|javascript))|image\/svg/;
// Only these paths are ever served; everything else (.git, package.json, server/, scripts/, tests/…) is 404.
const PUBLIC_PATHS = [
  /^\/$/,
  /^\/index\.html$/,
  /^\/manifest\.webmanifest$/,
  /^\/sw\.js$/,
  /^\/robots\.txt$/,
  /^\/css\/[\w.-]+\.css$/,
  /^\/js\/[\w./-]+\.js$/,
  /^\/assets\/[\w./-]+\.(svg|png|jpg|jpeg|ico)$/,
  /^\/assets\/fonts\/[\w-]+\.(ttf|woff2)$/,
  /^\/assets\/fonts\/OFL\.txt$/,
  /^\/data\/(molecules|elements|ions)\/[\w.-]+\.json$/,
  /^\/data\/isotopes\.json$/,
  /^\/data\/classes\.json$/,
];

/* ---------- Static files ---------- */
const compressed = new Map();

function pick(req, body, type, key) {
  const accept = String(req.headers['accept-encoding'] || '');
  if (!COMPRESSIBLE.test(type) || body.length < 1024) return { body, encoding: null };
  const encoding = /\bbr\b/.test(accept) ? 'br' : /\bgzip\b/.test(accept) ? 'gzip' : null;
  if (!encoding) return { body, encoding: null };
  const cacheKey = `${key}|${encoding}`;
  if (!compressed.has(cacheKey)) {
    if (compressed.size > 2000) compressed.clear();
    const out =
      encoding === 'br'
        ? brotliCompressSync(body, { params: { [zlib.BROTLI_PARAM_QUALITY]: 9 } })
        : gzipSync(body, { level: 9 });
    compressed.set(cacheKey, out);
  }
  return { body: compressed.get(cacheKey), encoding };
}

// App routes (/atom/Fe, /molecule/water, /search) are served the app shell, like the prerendered pages on a
// static host; an unknown extensionless path gets the shell too but answers 404 (the app shows its not-found page,
// as 404.html does on Cloudflare Pages). Dotfiles and paths with an extension are never app routes.
const isAppRoute = pathname =>
  !/\.[a-z0-9]+$/i.test(pathname.split('/').pop()) && !pathname.split('/').some(part => part.startsWith('.'));

async function serveStatic(req, res, pathname) {
  if (pathname === '/') pathname = '/index.html';
  let status = 200;
  if (pathname.includes('..')) return send(res, 404, 'Not found');
  if (!PUBLIC_PATHS.some(re => re.test(pathname))) {
    if (!isAppRoute(pathname)) return send(res, 404, 'Not found');
    if (!APP_ROUTES.includes(pathname.split('/')[1])) status = 404;
    pathname = '/index.html';
  }
  const file = normalize(join(ROOT, pathname));
  if (!file.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) return send(res, 403, 'Forbidden');
  let info;
  try {
    info = await stat(file);
    if (!info.isFile()) throw new Error('not a file');
  } catch {
    return send(res, 404, 'Not found');
  }
  const etag = `W/"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
  const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream';
  const volatile = /\/(index\.html|sw\.js)$/.test(file) || /\.(js|css|webmanifest|json)$/.test(file);
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': type,
    ETag: etag,
    'Cache-Control': volatile ? 'no-cache' : 'public, max-age=604800',
    Vary: 'Accept-Encoding',
  };
  if (status === 200 && req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    return res.end();
  }
  const raw = await readFile(file);
  const { body, encoding } = pick(req, raw, type, `${file}|${etag}`);
  if (encoding) headers['Content-Encoding'] = encoding;
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
}

/* ---------- Caching PubChem proxy ---------- */
const cache = new Map();
const inflight = new Map();
let queue = Promise.resolve();
let last = 0;

// Bounded by entries and by bytes; very large upstream bodies are served but never cached.
const CACHE_BYTES = Number(process.env.CACHE_MAX_MB || 256) * 1048576;
const ENTRY_MAX_BYTES = 4 * 1048576;
let cachedBytes = 0;
function remember(key, entry) {
  if (entry.body.length > ENTRY_MAX_BYTES) return;
  const old = cache.get(key);
  if (old) cachedBytes -= old.body.length;
  cache.delete(key);
  cache.set(key, entry);
  cachedBytes += entry.body.length;
  while (cache.size > CACHE_MAX || cachedBytes > CACHE_BYTES) {
    const [oldest, value] = cache.entries().next().value;
    cachedBytes -= value.body.length;
    cache.delete(oldest);
  }
}
function pace() {
  const turn = queue.then(async () => {
    const wait = Math.max(0, last + INTERVAL - Date.now());
    if (wait) await new Promise(r => setTimeout(r, wait));
    last = Date.now();
  });
  queue = turn.catch(() => {});
  return turn;
}

async function upstream(provider, path, search) {
  const url = `${UPSTREAM[provider].base}${path}${search}`;
  const hit = cache.get(url);
  if (hit && hit.expires > Date.now()) return { ...hit, cache: 'HIT' };
  if (inflight.has(url)) return inflight.get(url);
  const task = (async () => {
    await pace();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT, Accept: '*/*' },
        signal: controller.signal,
      });
      const body = Buffer.from(await response.arrayBuffer());
      const entry = {
        status: response.status,
        type: response.headers.get('content-type') || 'application/json',
        body,
        expires: Date.now() + UPSTREAM[provider].ttl(path),
      };
      // 404 means "no such data" in PubChem and is worth caching too.
      if (response.ok || response.status === 404) remember(url, entry);
      else if (hit) return { ...hit, cache: 'STALE' };
      return { ...entry, cache: 'MISS' };
    } catch (error) {
      if (hit) return { ...hit, cache: 'STALE' };
      throw error;
    } finally {
      clearTimeout(timer);
    }
  })();
  inflight.set(url, task);
  try {
    return await task;
  } finally {
    inflight.delete(url);
  }
}

/* ---------- Per-client rate limit ---------- */
const clients = new Map();
function clientAddress(req) {
  const socket = req.socket.remoteAddress || '';
  if (!TRUST_PROXY) return socket;
  const hops = String(req.headers['x-forwarded-for'] || '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);
  return hops[hops.length - TRUST_PROXY] || hops[0] || socket;
}
function allowed(req) {
  const ip = clientAddress(req);
  const now = Date.now();
  const entry = clients.get(ip) || { start: now, count: 0 };
  if (now - entry.start > 60e3) {
    entry.start = now;
    entry.count = 0;
  }
  entry.count++;
  clients.set(ip, entry);
  if (clients.size > 10000) clients.clear();
  return entry.count <= CLIENT_LIMIT;
}

async function serveAPI(req, res, pathname, search) {
  if (!PROXY) return sendJSON(res, 404, { error: 'Proxy disabled' });
  if (pathname === '/api/health')
    return sendJSON(res, 200, { ok: true, proxy: true, version: VERSION, cached: cache.size });
  if (search.length > 2000) return sendJSON(res, 414, { error: 'Query too long' });
  const target = route(pathname.slice('/api/'.length), search);
  if (target.error === 404) return sendJSON(res, 404, { error: 'Unknown endpoint' });
  if (target.error === 403) return sendJSON(res, 403, { error: 'Endpoint not allowed' });
  if (!allowed(req))
    return sendJSON(res, 429, { error: 'Too many requests. Please slow down.' }, { 'Retry-After': '30' });
  try {
    const result = await upstream(target.provider, target.path, target.search);
    const { body, encoding } = pick(req, result.body, result.type, `${target.path}${target.search}`);
    res.writeHead(result.status, {
      ...SECURITY_HEADERS,
      'Content-Type': result.type,
      'Cache-Control': 'public, max-age=600',
      'X-Cache': result.cache,
      Vary: 'Accept-Encoding',
      ...(encoding ? { 'Content-Encoding': encoding } : {}),
      'Content-Length': body.length,
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    sendJSON(res, 502, { error: 'Upstream unavailable' });
    if (LOG) console.error('upstream error', target.path, error.message);
  }
}

/* ---------- Helpers ---------- */
function send(res, status, text) {
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(text);
}
function sendJSON(res, status, data, extra = {}) {
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extra,
  });
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  const started = Date.now();
  try {
    if (!['GET', 'HEAD'].includes(req.method)) return send(res, 405, 'Method not allowed');
    if ((req.url || '').length > 4096) return send(res, 414, 'URI too long');
    const url = new URL(req.url, 'http://localhost');
    let pathname;
    try {
      // Malformed percent-encoding (e.g. /%E0%A4%A) is a client error, never a crash.
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return send(res, 400, 'Bad request');
    }
    if (pathname.includes('\0')) return send(res, 400, 'Bad request');
    if (pathname.startsWith('/api/')) await serveAPI(req, res, url.pathname, url.search);
    else await serveStatic(req, res, pathname);
  } catch (error) {
    if (!res.headersSent) send(res, 500, 'Internal error');
    console.error(error);
  } finally {
    if (LOG) console.log(`${req.method} ${req.url} ${res.statusCode} ${Date.now() - started}ms`);
  }
});
// Slow or stalled clients cannot hold connections open for long.
server.requestTimeout = 30000;
server.headersTimeout = 20000;
server.keepAliveTimeout = 5000;
server.on('clientError', (error, socket) => {
  if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
});
server.listen(PORT, HOST, () =>
  console.log(`Alchemist ${VERSION} on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`)
);
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
