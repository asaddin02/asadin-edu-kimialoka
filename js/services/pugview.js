// Parsers for PubChem PUG REST / PUG View responses. Pure functions with no browser or Node APIs, shared by
// scripts/sync-molecules.mjs (build time) and services/pubchem.js (live lookups), so both give the same shape.

/** Experimental property headings Kimialoka shows, in display order. */
export const EXPERIMENTAL_HEADINGS = [
  'Physical Description',
  'Color/Form',
  'Odor',
  'Taste',
  'Melting Point',
  'Boiling Point',
  'Flash Point',
  'Density',
  'Solubility',
  'Vapor Pressure',
  'LogP',
  'Dissociation Constants',
  'pH',
  'Viscosity',
  'Refractive Index',
  'Heat of Combustion',
  'Heat of Vaporization',
  'Surface Tension',
  'Autoignition Temperature',
  'Decomposition',
  'Stability/Shelf Life',
  'Odor Threshold',
];

/** The computed properties requested from PUG REST, and their short keys. */
export const PROPERTY_KEYS = {
  Title: 'title',
  MolecularFormula: 'formula',
  MolecularWeight: 'mw',
  ExactMass: 'exactMass',
  IUPACName: 'iupac',
  SMILES: 'smiles',
  InChI: 'inchi',
  InChIKey: 'inchikey',
  XLogP: 'xlogp',
  TPSA: 'tpsa',
  Complexity: 'complexity',
  Charge: 'charge',
  HBondDonorCount: 'hbd',
  HBondAcceptorCount: 'hba',
  RotatableBondCount: 'rotb',
  HeavyAtomCount: 'heavy',
  AtomStereoCount: 'stereo',
  CovalentUnitCount: 'units',
};
export const PROPERTY_LIST = Object.keys(PROPERTY_KEYS).join(',');

export function parseProperties(json) {
  const p = json?.PropertyTable?.Properties?.[0];
  if (!p) return null;
  const out = { cid: p.CID };
  for (const [key, short] of Object.entries(PROPERTY_KEYS)) {
    if (p[key] == null) continue;
    out[short] = ['MolecularWeight', 'ExactMass'].includes(key) ? Number(p[key]) : p[key];
  }
  return out;
}

const clean = s =>
  String(s || '')
    .replace(/\s+/g, ' ')
    .trim();

/** Text of one PUG View Information value (strings, or numbers with their unit). */
export function valueText(value) {
  if (!value) return [];
  if (value.StringWithMarkup) return value.StringWithMarkup.map(s => clean(s.String)).filter(Boolean);
  if (value.Number) return [`${value.Number.join(', ')}${value.Unit ? ` ${value.Unit}` : ''}`];
  return [];
}

function walk(sections, visit) {
  for (const section of sections || []) {
    visit(section);
    walk(section.Section, visit);
  }
}

/** Selected experimental properties: [{ key, values: [≤3 strings], source }]. */
export function parseExperimental(json, max = 3) {
  const record = json?.Record;
  if (!record) return [];
  const refs = new Map((record.Reference || []).map(r => [r.ReferenceNumber, r.SourceName]));
  const found = new Map();
  walk(record.Section, section => {
    const key = section.TOCHeading;
    if (!EXPERIMENTAL_HEADINGS.includes(key) || found.has(key) || !section.Information) return;
    const values = [];
    const sources = new Set();
    for (const info of section.Information) {
      for (const text of valueText(info.Value)) {
        const short = text.length > 260 ? `${text.slice(0, 257).replace(/\s+\S*$/, '')}…` : text;
        if (!values.some(v => v.toLowerCase() === short.toLowerCase())) {
          values.push(short);
          if (refs.get(info.ReferenceNumber)) sources.add(refs.get(info.ReferenceNumber));
        }
        if (values.length >= max) break;
      }
      if (values.length >= max) break;
    }
    if (values.length) found.set(key, { key, values, source: [...sources].slice(0, 2).join(', ') });
  });
  return EXPERIMENTAL_HEADINGS.filter(h => found.has(h)).map(h => found.get(h));
}

/**
 * GHS hazard summary: { signal, pictograms: [{code,label}], hazards, reports, notMet (percent of reports
 * that found no hazard), notClassified, source }. PubChem lists one block per source; the block backed by
 * the most company reports to the ECHA C&L Inventory is preferred, so a single unusual notification does
 * not make table salt look corrosive.
 */
export function parseGHS(json) {
  let ghs = null;
  walk(json?.Record?.Section, section => {
    if (ghs || section.TOCHeading !== 'GHS Classification' || !section.Information) return;
    const refs = new Map((json.Record.Reference || []).map(r => [r.ReferenceNumber, r.SourceName]));
    const blocks = [];
    let current = null;
    for (const info of section.Information) {
      // Each reporting source (reference number) forms one block.
      if (!current || current.ref !== info.ReferenceNumber) {
        current = { ref: info.ReferenceNumber, items: [] };
        blocks.push(current);
      }
      current.items.push(info);
    }
    const reportsOf = block => {
      for (const info of block.items) {
        const text = valueText(info.Value).join(' ');
        const m = text.match(/per (\d+) reports/) || text.match(/\((\d+)\s+of\s+(\d+)\) of (all )?reports/);
        if (m) return Number(m[2] || m[1]);
      }
      return 0;
    };
    const chosen = blocks.reduce((best, b) => (reportsOf(b) > reportsOf(best) ? b : best), blocks[0]);
    if (!chosen) return;
    const out = {
      signal: null,
      pictograms: [],
      hazards: [],
      reports: reportsOf(chosen) || null,
      notMet: null,
      notClassified: false,
      source: refs.get(chosen.ref) || '',
    };
    for (const info of chosen.items) {
      const name = info.Name || '';
      const texts = valueText(info.Value);
      if (name.startsWith('Pictogram')) {
        for (const s of info.Value?.StringWithMarkup || [])
          for (const m of s.Markup || []) {
            const code = (m.URL || '').match(/(GHS\d{2})/)?.[1];
            if (code && !out.pictograms.some(p => p.code === code))
              out.pictograms.push({ code, label: m.Extra || code });
          }
      } else if (name === 'Signal') {
        out.signal = texts[0] || null;
      } else if (name === 'GHS Hazard Statements') {
        if (texts.some(t => /^Not Classified/i.test(t))) out.notClassified = true;
        out.hazards = texts
          .filter(t => /^H\d{3}/.test(t))
          .map(t => t.replace(/\s*\[[^\]]*\]\s*$/, ''))
          .slice(0, 12);
      }
      const pct = texts.join(' ').match(/does not meet GHS hazard criteria for ([\d.]+)%/);
      if (pct) out.notMet = Number(pct[1]);
    }
    if (out.pictograms.length || out.hazards.length || out.signal || out.notClassified) ghs = out;
  });
  return ghs;
}

const NOISE =
  /^(CIR ingredient|EPA |Cosmetics product|Food Additives|Pharmaceuticals|Hazard Classes|Human drug|Veterinary|Fragrance|Flavoring Agents|Drug indication|Other|Plasticizers|Solvents|Industrial)|please visit|Pesticide Code|\/SRP:|labels? match|for more uses/i;

/** Up to `max` readable sentences from the "Uses" section. */
export function parseUses(json, max = 5) {
  const out = [];
  walk(json?.Record?.Section, section => {
    if (section.TOCHeading !== 'Uses' || !section.Information) return;
    for (const info of section.Information)
      for (const text of valueText(info.Value)) {
        if (out.length >= max) return;
        if (text.length < 35 || text.length > 400 || NOISE.test(text) || /^[^:]{1,30}:/.test(text)) continue;
        if (!out.some(v => v.slice(0, 40) === text.slice(0, 40))) out.push(text);
      }
  });
  return out;
}

/** Descriptions from PUG REST /description: [{ text, source, url }], best (longest, ChEBI/NCIt first) first. */
export function parseDescriptions(json, max = 2) {
  const list = (json?.InformationList?.Information || [])
    .filter(i => i.Description && i.Description.length > 40)
    .map(i => ({
      text: clean(i.Description),
      source: i.DescriptionSourceName || 'PubChem',
      url: i.DescriptionURL || '',
    }));
  const rank = d => (/ChEBI|NCI Thesaurus|LOTUS|DrugBank|HSDB|MeSH/i.test(d.source) ? 0 : 1);
  list.sort((a, b) => rank(a) - rank(b) || b.text.length - a.text.length);
  const out = [];
  for (const d of list)
    if (!out.some(o => o.text.slice(0, 60) === d.text.slice(0, 60)) && out.length < max) out.push(d);
  return out;
}

export function parseSynonyms(json, max = 12) {
  const list = json?.InformationList?.Information?.[0]?.Synonym || [];
  // Registry numbers and long database codes are not useful as names.
  return list
    .filter(s => s.length < 60 && !/^[A-Z0-9-]{10,}$/.test(s) && !/^\d+-\d+-\d$/.test(s))
    .slice(0, max);
}

/** CAS registry number from the synonym list, when present. */
export function casFromSynonyms(json) {
  const list = json?.InformationList?.Information?.[0]?.Synonym || [];
  return list.find(s => /^\d{2,7}-\d{2}-\d$/.test(s)) || null;
}

/**
 * Minimal MDL molfile (V2000) parser for PubChem SDF records.
 * Returns { atoms: [[symbol, x, y, z]], bonds: [[a, b, order]] } with 0-based atom indices, or null.
 */
export function parseSDF(text) {
  if (!text || typeof text !== 'string') return null;
  const lines = text.split(/\r?\n/);
  const countsAt = lines.findIndex(l => /V2000\s*$/.test(l));
  if (countsAt < 0) return null;
  const counts = lines[countsAt];
  const nAtoms = parseInt(counts.slice(0, 3), 10);
  const nBonds = parseInt(counts.slice(3, 6), 10);
  if (!(nAtoms > 0) || Number.isNaN(nBonds)) return null;
  const atoms = [];
  const bonds = [];
  for (let i = 0; i < nAtoms; i++) {
    const l = lines[countsAt + 1 + i];
    if (!l) return null;
    const x = parseFloat(l.slice(0, 10));
    const y = parseFloat(l.slice(10, 20));
    const z = parseFloat(l.slice(20, 30));
    const symbol = l.slice(31, 34).trim();
    if (!symbol || [x, y, z].some(Number.isNaN)) return null;
    atoms.push([symbol, round(x), round(y), round(z)]);
  }
  for (let i = 0; i < nBonds; i++) {
    const l = lines[countsAt + 1 + nAtoms + i];
    if (!l) break;
    const a = parseInt(l.slice(0, 3), 10) - 1;
    const b = parseInt(l.slice(3, 6), 10) - 1;
    const order = parseInt(l.slice(6, 9), 10) || 1;
    if (a >= 0 && b >= 0 && a < nAtoms && b < nAtoms) bonds.push([a, b, order > 4 ? 1 : order]);
  }
  // Charges from "M  CHG" lines, so ions such as NH4+ are labelled correctly.
  for (const l of lines.slice(countsAt + 1 + nAtoms + nBonds)) {
    if (!l.startsWith('M  CHG')) continue;
    const parts = l.slice(6).trim().split(/\s+/).map(Number);
    for (let i = 1; i + 1 < parts.length; i += 2)
      if (atoms[parts[i] - 1]) atoms[parts[i] - 1][4] = parts[i + 1];
  }
  return { atoms, bonds };
}

const round = v => Math.round(v * 1000) / 1000;
