// Polite HTTP client for the sync scripts: one queue per host, retries with back-off, and a disk cache
// (data/.sync-cache/) so a re-run only fetches what changed. Delete the cache folder to refetch all.
//   PubChem asks for at most 5 requests per second; Wikimedia asks for a descriptive User-Agent.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const CACHE_DIR = join(ROOT, 'data', '.sync-cache');
const USER_AGENT =
  'Kimialoka-sync/3.0 (Asadin Edu chemistry encyclopedia; https://github.com/asaddin02/asadin-edu-kimialoka)';
const INTERVAL = { 'pubchem.ncbi.nlm.nih.gov': 260, 'query.wikidata.org': 1200 };
const DEFAULT_INTERVAL = 150;
const TTL = Number(process.env.SYNC_CACHE_DAYS || 30) * 86400e3;

const queues = new Map();
function pace(host) {
  const prev = queues.get(host) || Promise.resolve(0);
  const turn = prev.then(async last => {
    const wait = Math.max(0, last + (INTERVAL[host] ?? DEFAULT_INTERVAL) - Date.now());
    if (wait) await new Promise(r => setTimeout(r, wait));
    return Date.now();
  });
  queues.set(
    host,
    turn.catch(() => Date.now())
  );
  return turn;
}

const keyOf = (url, body) =>
  createHash('sha1')
    .update(url + (body || ''))
    .digest('hex');

/**
 * Fetches a URL as text or JSON. Returns null for 404 (PubChem uses it for "no data").
 * options: { json, body (POST form string), accept, cache: false }
 */
export async function get(url, options = {}) {
  const { json = true, body = null, accept, cache = true } = options;
  const key = keyOf(url, body);
  const file = join(CACHE_DIR, `${key}.json`);
  if (cache) {
    try {
      const hit = JSON.parse(await readFile(file, 'utf8'));
      if (Date.now() - hit.at < TTL)
        return hit.status === 404 ? null : json ? JSON.parse(hit.text) : hit.text;
    } catch {
      // No cached copy yet: fetch it below.
    }
  }
  const host = new URL(url).hostname;
  for (let attempt = 1; ; attempt++) {
    await pace(host);
    let response;
    try {
      response = await fetch(url, {
        method: body ? 'POST' : 'GET',
        headers: {
          'User-Agent': USER_AGENT,
          Accept: accept || (json ? 'application/json' : '*/*'),
          ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
        },
        body: body || undefined,
        signal: AbortSignal.timeout(60000),
      });
    } catch (error) {
      if (attempt >= 5) throw new Error(`${url}: ${error.message}`, { cause: error });
      await new Promise(r => setTimeout(r, 1500 * attempt));
      continue;
    }
    if (response.status === 404 || response.status === 400) {
      await store(file, 404, '');
      return null;
    }
    if (response.status === 429 || response.status === 503 || response.status >= 500) {
      if (attempt >= 6) throw new Error(`${url}: HTTP ${response.status}`);
      await new Promise(r => setTimeout(r, 2500 * attempt));
      continue;
    }
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    const text = await response.text();
    await store(file, response.status, text);
    return json ? JSON.parse(text) : text;
  }
}

async function store(file, status, text) {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(file, JSON.stringify({ at: Date.now(), status, text }));
}

/** Runs tasks with limited concurrency, keeping result order. */
export async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

export const sparql = query =>
  get('https://query.wikidata.org/sparql', {
    body: `query=${encodeURIComponent(query)}`,
    accept: 'application/sparql-results+json',
  });

/** Commons file metadata (thumbnail URL, author, license) for up to 50 file names per request. */
export async function commonsInfo(files, width = 640) {
  const out = new Map();
  const unique = [...new Set(files.filter(Boolean))];
  for (let i = 0; i < unique.length; i += 40) {
    const batch = unique.slice(i, i + 40);
    const titles = batch.map(f => `File:${f}`).join('|');
    const url =
      'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo' +
      `&iiprop=url|size|extmetadata&iiurlwidth=${width}` +
      '&iiextmetadatafilter=LicenseShortName|LicenseUrl|Artist|Credit|UsageTerms|AttributionRequired' +
      `&titles=${encodeURIComponent(titles)}`;
    const data = await get(url);
    const normalized = new Map((data?.query?.normalized || []).map(n => [n.to, n.from]));
    for (const page of data?.query?.pages || []) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const meta = info.extmetadata || {};
      const original = (normalized.get(page.title) || page.title).replace(/^File:/, '');
      out.set(original, {
        file: page.title.replace(/^File:/, ''),
        thumb: info.thumburl || info.url,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        page: info.descriptionurl,
        author: plain(meta.Artist?.value) || plain(meta.Credit?.value) || 'Wikimedia Commons',
        license: plain(meta.LicenseShortName?.value) || plain(meta.UsageTerms?.value) || '',
        licenseUrl: meta.LicenseUrl?.value || '',
      });
    }
  }
  return out;
}

/** Wikipedia page summary (plain-text lead paragraph) or null. */
export async function wikiSummary(lang, title) {
  if (!title) return null;
  const data = await get(
    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}?redirect=true`
  );
  if (!data?.extract || data.type === 'disambiguation') return null;
  return {
    title: data.title,
    extract: data.extract.replace(/\s+/g, ' ').trim(),
    url:
      data.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`,
  };
}

/**
 * The whole lead section of a Wikipedia article as plain text (longer than the REST summary),
 * trimmed at a sentence boundary to at most `max` characters.
 */
export async function wikiIntro(lang, title, max = 2200) {
  if (!title) return null;
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts|info` +
    `&inprop=url&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(title)}`;
  const page = (await get(url))?.query?.pages?.[0];
  if (!page || page.missing || !page.extract || page.extract.length < 40) return null;
  if (/may refer to|dapat merujuk pada|adalah nama dari beberapa/i.test(page.extract.slice(0, 200)))
    return null;
  let text = page.extract
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
  if (text.length > max) {
    const cut = text.slice(0, max);
    const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('.\n'));
    text = end > max * 0.5 ? cut.slice(0, end + 1) : `${cut.replace(/\s+\S*$/, '')}…`;
  }
  return {
    title: page.title,
    extract: text,
    url: page.fullurl || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
  };
}

export function plain(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
}

export const fileFromCommonsURL = url =>
  url
    ? decodeURIComponent(url.replace(/^https?:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//, ''))
    : null;

export { ROOT };
