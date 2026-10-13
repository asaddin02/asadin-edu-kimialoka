// Security headers and PubChem proxy rules shared by server/server.mjs, the Cloudflare Pages Function
// (functions/api/[[path]].js) and the static build (scripts/build-site.mjs), so every way of hosting
// Kimialoka sends the same policy. No Node-only APIs: this module also runs on Cloudflare.

export const REPOSITORY = 'https://github.com/asaddin02/asadin-edu-kimialoka';
export const DEFAULT_USER_AGENT = `Kimialoka/3 (open-source chemistry encyclopedia and learning platform; +${REPOSITORY})`;

/** The app's page routes (first path segment); keep in step with PAGES in js/core/router.js. */
export const APP_ROUTES = [
  'home',
  'explore',
  'molecule',
  'classes',
  'table',
  'atom',
  'learn',
  'lab',
  'quiz',
  'compare',
  'around',
  'glossary',
  'saved',
  'teacher',
  'assignment',
  'about',
  'dukung',
  'search',
  'peta',
  'isotope',
  'ion',
  'reaction',
  'material',
];

export const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://pubchem.ncbi.nlm.nih.gov https://upload.wikimedia.org https://thumb.wikimedia.org https://cdn.rcsb.org",
  "connect-src 'self' https://pubchem.ncbi.nlm.nih.gov https://www.wikidata.org https://query.wikidata.org https://*.wikipedia.org https://commons.wikimedia.org",
  "font-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), camera=(), microphone=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
};

/** Read-only PubChem endpoints the proxy may forward, and how long a response stays fresh (ms). */
export const UPSTREAM = {
  pubchem: {
    base: 'https://pubchem.ncbi.nlm.nih.gov/',
    allow: [
      /^rest\/pug\/compound\/(cid|name)\/[^/]+\/(property\/[A-Za-z,]+\/JSON|synonyms\/JSON|description\/JSON|cids\/JSON|record\/SDF)$/,
      /^rest\/pug\/compound\/inchikey\/[A-Z]{14}-[A-Z]{10}-[A-Z]\/cids\/JSON$/,
      /^rest\/pug\/compound\/(smiles|inchi)\/cids\/JSON$/,
      /^rest\/pug\/compound\/fastformula\/[^/]+\/cids\/JSON$/,
      /^rest\/pug\/compound\/fastsubstructure\/smarts\/[^/]+\/cids\/JSON$/,
      /^rest\/pug_view\/data\/compound\/\d+\/JSON$/,
      /^rest\/autocomplete\/compound\/[^/]+\/json$/,
    ],
    params: ['heading', 'MaxRecords', 'limit', 'record_type', 'image_size', 'smiles', 'inchi'],
    ttl: path => (path.startsWith('rest/autocomplete') ? 3600e3 : 86400e3),
  },
};

/**
 * Maps "pubchem/rest/pug/…" (the part after /api/) and its query string to the upstream request.
 * Returns { provider, path, search } or { error } with an HTTP status when the request is refused.
 */
export function route(apiPath, search = '') {
  const match = apiPath.match(/^(pubchem)\/(.+)$/);
  if (!match) return { error: 404 };
  const [, provider, path] = match;
  const rule = UPSTREAM[provider];
  if (path.includes('..') || !rule.allow.some(re => re.test(path))) return { provider, path, error: 403 };
  const params = new URLSearchParams(search);
  for (const key of params.keys()) if (!rule.params.includes(key)) return { provider, path, error: 403 };
  const clean = params.toString();
  return { provider, path, search: clean ? `?${clean}` : '' };
}
