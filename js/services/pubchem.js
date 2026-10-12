// Live PubChem client (NIH, free, no key) for any of PubChem's 100+ million compounds.
// Requests go through the site's caching proxy when it exists, otherwise straight to PubChem (CORS enabled).
// A small queue keeps each browser under PubChem's limit of 5 requests per second.
import { CONFIG } from '../config.js';
import {
  PROPERTY_LIST,
  parseProperties,
  parseExperimental,
  parseGHS,
  parseUses,
  parseDescriptions,
  parseSynonyms,
  casFromSynonyms,
  parseSDF,
} from './pugview.js';

let basePromise = null;
/** "api/pubchem/" behind our server or Cloudflare Function, else the public PubChem host. */
function base() {
  basePromise ||= fetch(new URL('api/health', location.origin), { signal: AbortSignal.timeout(2000) })
    .then(r => (r.ok ? r.json() : null))
    .then(j => (j?.proxy ? new URL(CONFIG.proxy, location.origin).href : CONFIG.pubchem))
    .catch(() => CONFIG.pubchem);
  return basePromise;
}

const cache = new Map();
let queue = Promise.resolve();
let last = 0;
const GAP = 220;

async function request(path, as = 'json') {
  const url = (await base()) + path;
  if (cache.has(url)) return cache.get(url);
  const turn = queue.then(async () => {
    const wait = Math.max(0, last + GAP - Date.now());
    if (wait) await new Promise(r => setTimeout(r, wait));
    last = Date.now();
  });
  queue = turn.catch(() => {});
  const task = turn.then(async () => {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (res.status === 404 || res.status === 400) return null;
    if (res.status === 503 || res.status === 429) throw new Error('busy');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return as === 'text' ? res.text() : res.json();
  });
  cache.set(url, task);
  task.catch(() => cache.delete(url));
  return task;
}

const soft = p => p.catch(() => null);
export const imageURL = (cid, size = 300) =>
  `${CONFIG.pubchem}rest/pug/compound/cid/${Number(cid)}/PNG?image_size=${size}x${size}`;
export const recordURL = cid => `${CONFIG.pubchem}compound/${Number(cid)}`;

/** Name suggestions (English) for a partial term. */
export async function autocomplete(term, limit = 8) {
  const data = await soft(
    request(`rest/autocomplete/compound/${encodeURIComponent(term)}/json?limit=${limit}`)
  );
  return data?.dictionary_terms?.compound || [];
}

export async function cidByName(name) {
  const data = await request(`rest/pug/compound/name/${encodeURIComponent(name)}/cids/JSON`);
  return data?.IdentifierList?.CID?.[0] || null;
}

/** PubChem answers an unknown but valid structure with CID 0; drop it. */
const cidList = data => (data?.IdentifierList?.CID || []).filter(c => c > 0);

export async function cidsByInchikey(key) {
  return cidList(await soft(request(`rest/pug/compound/inchikey/${encodeURIComponent(key)}/cids/JSON`)));
}

/** SMILES and InChI travel as query parameters because they contain "/" and "#". */
export async function cidsBySmiles(smiles) {
  return cidList(
    await soft(request(`rest/pug/compound/smiles/cids/JSON?smiles=${encodeURIComponent(smiles)}`))
  );
}

export async function cidsByInchi(inchi) {
  return cidList(await soft(request(`rest/pug/compound/inchi/cids/JSON?inchi=${encodeURIComponent(inchi)}`)));
}

/** Compounds with exactly this molecular formula (isomers). */
export async function cidsByFormula(formula, max = 20) {
  const data = await soft(
    request(`rest/pug/compound/fastformula/${encodeURIComponent(formula)}/cids/JSON?MaxRecords=${max}`)
  );
  return data?.IdentifierList?.CID || [];
}

/** More members of a class by substructure pattern. */
export async function cidsBySmarts(smarts, max = 40) {
  const data = await soft(
    request(
      `rest/pug/compound/fastsubstructure/smarts/${encodeURIComponent(smarts)}/cids/JSON?MaxRecords=${max}`
    )
  );
  return data?.IdentifierList?.CID || [];
}

/** Title, formula and weight for many CIDs at once. */
export async function summaries(cids) {
  if (!cids.length) return [];
  const data = await soft(
    request(
      `rest/pug/compound/cid/${cids.slice(0, 100).join(',')}/property/Title,MolecularFormula,MolecularWeight,IUPACName/JSON`
    )
  );
  return (data?.PropertyTable?.Properties || []).map(p => ({
    cid: p.CID,
    title: p.Title || p.IUPACName || `CID ${p.CID}`,
    formula: p.MolecularFormula,
    mw: Number(p.MolecularWeight),
  }));
}

export async function structure(cid) {
  const s3 = parseSDF(await soft(request(`rest/pug/compound/cid/${cid}/record/SDF?record_type=3d`, 'text')));
  if (s3) return { kind: '3d', ...s3 };
  const s2 = parseSDF(await soft(request(`rest/pug/compound/cid/${cid}/record/SDF?record_type=2d`, 'text')));
  return s2 ? { kind: '2d', ...s2 } : null;
}

/** A full record in the same shape as data/molecules/<id>.json. Throws when PubChem is unreachable. */
export async function compound(cid) {
  cid = Number(cid);
  const props = parseProperties(await request(`rest/pug/compound/cid/${cid}/property/${PROPERTY_LIST}/JSON`));
  if (!props) return null;
  const view = heading =>
    soft(request(`rest/pug_view/data/compound/${cid}/JSON?heading=${encodeURIComponent(heading)}`));
  const [syn, desc, exp, ghs, uses, struct] = await Promise.all([
    soft(request(`rest/pug/compound/cid/${cid}/synonyms/JSON`)),
    soft(request(`rest/pug/compound/cid/${cid}/description/JSON`)),
    view('Experimental Properties'),
    view('GHS Classification'),
    view('Uses'),
    structure(cid).catch(() => null),
  ]);
  return {
    id: `cid/${cid}`,
    cid,
    subject: 'self',
    live: true,
    props,
    cas: casFromSynonyms(syn),
    synonyms: parseSynonyms(syn),
    descriptions: parseDescriptions(desc),
    experimental: parseExperimental(exp),
    ghs: parseGHS(ghs),
    uses: parseUses(uses),
    structure: struct,
  };
}
