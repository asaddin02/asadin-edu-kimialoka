// The Kimialoka catalogue: hand-written learning cards for molecules, materials and minerals.
// Structures, properties, hazards, photos and encyclopedia text come from PubChem, Wikidata, Wikipedia
// and Wikimedia Commons (see scripts/sync-molecules.mjs → data/molecules/<id>.json).
// Content license: CC BY-SA 4.0.
//
// Fields
//   id      route id (English kebab-case)          cid   PubChem Compound ID (verified by the sync script)
//   cls     class ids from classes.js, main first    lv    first level: sd · smp · sma · kuliah
//   ctx     places in "Kimia di sekitarku" (places.js)
//   name, about, uses, fun: [Bahasa Indonesia, English]
//   geo     VSEPR shape key for small molecules (see labs/vsepr.js)
//   ion     'lattice' (ionic solid) or 'network' (covalent network): the formula is a ratio, not a molecule
//   lattice { type, el } crystal model drawn instead of a PubChem conformer (services/lattice.js)
//   poly    { unit, kind: adisi | kondensasi, monomer } for polymers; the 3D view shows the monomer
//
// To add a molecule: add an entry to one of the files in ./molecules/, then run `npm run sync:molecules`
// (fetches and checks its PubChem record) and `npm run data:check`.
import unsur from './molecules/unsur.js';
import anorganik from './molecules/anorganik.js';
import organik from './molecules/organik.js';
import biomolekul from './molecules/biomolekul.js';
import obatMaterial from './molecules/obat-material.js';

export const MOLECULES = [...unsur, ...anorganik, ...organik, ...biomolekul, ...obatMaterial];
export const LEVEL_ORDER = ['sd', 'smp', 'sma', 'kuliah'];

const byId = new Map(MOLECULES.map(m => [m.id, m]));
const byCid = new Map();
for (const m of MOLECULES) if (!byCid.has(m.cid)) byCid.set(m.cid, m);

/** Removes accents, turns subscript digits into plain digits and lowercases, for matching. */
export function normalize(text) {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[₀-₉]/g, d => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(d)))
    .replace(/[⁺⁻]/g, '')
    .toLowerCase()
    .trim();
}

export const getMolecule = id => byId.get(String(id)) || null;
export const getMoleculeByCid = cid => byCid.get(Number(cid)) || null;
export const moleculesInClass = cls => MOLECULES.filter(m => m.cls.includes(cls));
export const moleculesInPlace = place => MOLECULES.filter(m => m.ctx.includes(place));
/** Molecules suitable up to a level (SD sees SD cards; Kuliah and Guru see everything). */
export const atLevel = level => {
  const max = LEVEL_ORDER.indexOf(level);
  return max < 0 ? MOLECULES : MOLECULES.filter(m => LEVEL_ORDER.indexOf(m.lv) <= max);
};

let index = null;
/** Local search over names (both languages), ids and the `formula` field when data is loaded. */
export function searchCatalog(query, formulas = {}) {
  const q = normalize(query);
  if (!q) return [];
  index ||= MOLECULES.map(m => ({
    m,
    names: normalize(`${m.name[0]} ${m.name[1]} ${m.id.replace(/-/g, ' ')}`),
  }));
  const scored = [];
  for (const { m, names } of index) {
    const formula = normalize(formulas[m.id] || '');
    let score = 0;
    if (formula && formula === q) score = 100;
    else if (names.startsWith(q)) score = 80;
    else if (names.split(/[\s(),/-]+/).some(w => w.startsWith(q))) score = 60;
    else if (names.includes(q)) score = 40;
    else if (q.length >= 3 && normalize(m.about[0] + ' ' + m.about[1]).includes(q)) score = 10;
    if (score) scored.push({ m, score });
  }
  return scored.sort((a, b) => b.score - a.score).map(s => s.m);
}
