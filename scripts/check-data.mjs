#!/usr/bin/env node
// Content integrity checks: every link in lessons and data points at something that exists, every quiz answer
// is valid, every catalogue molecule and ion has its synced PubChem record, every reaction balances (atoms and
// charge; A and Z for nuclear reactions), every textbook reference is a real OpenStax section, and the element
// and isotope records have the fields the pages read.
// Usage: npm run data:check
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOLECULES, getMolecule } from '../js/data/curatedMolecules.js';
import { CLASSES, getClass } from '../js/data/classes.js';
import { ELEMENTS, getElement } from '../js/data/periodicTable.js';
import { GLOSSARY, GLOSSARY_CATS, findTerm } from '../js/data/glossary.js';
import { TOPICS, findTopic, loadTopics } from '../js/data/topics/index.js';
import { TOPIC_ORDER } from '../js/data/topics/order.js';
import { LABS, PLACES, PATHS, findLab } from '../js/data/curriculum.js';
import { GEOMETRIES, POLARITY, POLARITY_REF } from '../js/data/geometry.js';
import { REACTIONS } from '../js/data/reactions.js';
import { IONS, getIon } from '../js/data/ions.js';
import { REACTION_TYPES, LIBRARY, NUCLEAR, getReaction } from '../js/data/reactionLibrary.js';
import { MATERIALS, MATERIAL_TYPES, getMaterial } from '../js/data/materials.js';
import { CHAIN, DOMAINS, GROUPS, getDomain } from '../js/data/ontology.js';
import { BOOKS } from '../js/data/references.js';
import { PAGE_LINKS } from '../js/components/richtext.js';
import { LATTICES } from '../js/services/lattice.js';
import { parseFormula, molarMass, balance, hill } from '../js/services/formula.js';
import { validCAS, INCHIKEY } from '../js/services/identify.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = path => readFileSync(join(root, path), 'utf8');
const readJSON = path => JSON.parse(read(path));
const errors = [];
const warnings = [];
const fail = msg => errors.push(msg);
const LEVELS = ['sd', 'smp', 'sma', 'kuliah'];
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const pair = (v, where) => {
  if (!Array.isArray(v) || v.length !== 2 || v.some(x => typeof x !== 'string' || !x.trim()))
    fail(`${where}: needs [id, en] text`);
};
const unique = (list, what) => {
  const seen = new Set();
  for (const x of list) {
    if (seen.has(x.id)) fail(`${what} ${x.id}: duplicate id`);
    seen.add(x.id);
    if (!KEBAB.test(x.id)) fail(`${what} ${x.id}: id must be kebab-case`);
  }
};

// Router pages (read as text: router.js touches `window` when imported).
const PAGES = new Set([...read('js/core/router.js').matchAll(/^\s{4}'([a-z]+)',$/gm)].map(m => m[1]));
for (const p of PAGES)
  if (!existsSync(join(root, 'js/pages', `${p}.js`))) fail(`router: missing js/pages/${p}.js`);
/** "/page/id?x=1" → does the page exist (and the id, for pages with their own data)? */
function routeOK(href) {
  const m = String(href).match(/^\/([a-z]*)(?:\/([^?]+))?/);
  if (!m) return false;
  const [, page, id] = m;
  if (!page) return true;
  if (!PAGES.has(page)) return false;
  if (!id) return true;
  const check = {
    peta: getDomain,
    learn: findTopic,
    lab: findLab,
    ion: getIon,
    reaction: getReaction,
    material: getMaterial,
    molecule: getMolecule,
    atom: getElement,
    glossary: findTerm,
    classes: getClass,
  }[page];
  return check ? Boolean(check(decodeURIComponent(id))) : true;
}

// OpenStax sections from each book's own table of contents.
const SECTIONS = readJSON('scripts/data/openstax-sections.json').books;
let refCount = 0;
function checkRef(code, where) {
  refCount++;
  const text = String(code);
  if (text.startsWith('wiki:')) {
    if (!/^wiki:[^\s/][^/]*$/.test(text)) fail(`${where}: bad Wikipedia reference ${text}`);
    return;
  }
  const [prefix, slug] = text.includes(':') ? text.split(':') : ['chem', text];
  const book = BOOKS[prefix]?.slug;
  if (!book) fail(`${where}: unknown book prefix in reference ${text}`);
  else if (!Object.hasOwn(SECTIONS[book] || {}, slug)) fail(`${where}: ${book} has no section "${slug}"`);
}

// ---------- Molecules ----------
unique(MOLECULES, 'molecule');
const index = existsSync(join(root, 'data/molecules/index.json'))
  ? readJSON('data/molecules/index.json')
  : [];
const indexById = new Map(index.map(r => [r.id, r]));
let photos = 0;
for (const m of MOLECULES) {
  const w = `molecule ${m.id}`;
  if (!Number.isInteger(m.cid) || m.cid <= 0) fail(`${w}: invalid cid`);
  if (!m.cls?.length || m.cls.some(c => !getClass(c))) fail(`${w}: unknown class in ${m.cls}`);
  if (!LEVELS.includes(m.lv)) fail(`${w}: invalid level ${m.lv}`);
  for (const c of m.ctx || []) if (!PLACES.some(p => p.id === c)) fail(`${w}: unknown place ${c}`);
  for (const k of ['name', 'about', 'uses', 'fun']) pair(m[k], `${w}.${k}`);
  if (m.geo && !GEOMETRIES[m.geo]) fail(`${w}: unknown geometry ${m.geo}`);
  if (m.lattice && !LATTICES[m.lattice.type]) fail(`${w}: unknown lattice ${m.lattice.type}`);
  if (m.lattice)
    for (const el of m.lattice.el) if (!getElement(el)) fail(`${w}: unknown lattice element ${el}`);
  const file = join(root, 'data/molecules', `${m.id}.json`);
  if (!existsSync(file)) {
    fail(`${w}: missing data/molecules/${m.id}.json (run npm run sync:molecules)`);
    continue;
  }
  const rec = JSON.parse(readFileSync(file, 'utf8'));
  if (rec.cid !== m.cid) fail(`${w}: record cid ${rec.cid} ≠ ${m.cid} (re-sync)`);
  const row = indexById.get(m.id);
  if (!row) fail(`${w}: missing from data/molecules/index.json`);
  else {
    if (row.cas && !validCAS(row.cas)) fail(`${w}: CAS ${row.cas} fails its check digit`);
    if (row.inchikey && !INCHIKEY.test(row.inchikey)) fail(`${w}: malformed InChIKey ${row.inchikey}`);
  }
  if (!rec.structure && !m.lattice) warnings.push(`${w}: no structure`);
  if (rec.photo?.kind === 'photo') photos++;
  const formula = rec.props?.formula;
  const parsed = formula ? parseFormula(formula) : { error: 'none' };
  if (parsed.error) fail(`${w}: PubChem formula "${formula}" does not parse`);
  else if (rec.props.mw && Math.abs(molarMass(parsed.counts) - rec.props.mw) / rec.props.mw > 0.01)
    fail(`${w}: molar mass ${molarMass(parsed.counts).toFixed(2)} ≠ PubChem ${rec.props.mw}`);
}

const POLARITY_KINDS = ['same', 'symmetric', 'diatomic', 'shape', 'ozone'];
for (const [id, kind] of Object.entries(POLARITY)) {
  if (!getMolecule(id)) fail(`polarity: molecule ${id} not in catalogue`);
  else if (!getMolecule(id).geo) fail(`polarity: ${id} has no VSEPR shape`);
  if (!POLARITY_KINDS.includes(kind)) fail(`polarity: ${id} has unknown kind ${kind}`);
}
checkRef(POLARITY_REF, 'polarity');

// ---------- Classes ----------
const classIds = new Set();
for (const c of CLASSES) {
  if (classIds.has(c.id)) fail(`class ${c.id}: duplicate`);
  classIds.add(c.id);
  if (c.parent && !getClass(c.parent)) fail(`class ${c.id}: unknown parent ${c.parent}`);
  pair(c.name, `class ${c.id}.name`);
  pair(c.def, `class ${c.id}.def`);
  if (!LEVELS.includes(c.level)) fail(`class ${c.id}: invalid level`);
}

// ---------- Elements and isotopes ----------
if (ELEMENTS.length !== 118) fail(`periodic table: ${ELEMENTS.length} elements, expected 118`);
const cells = new Set();
const WEIGHT_KINDS = ['standard', 'interval', 'mass-number', 'isotope-mass'];
let ciaaw = 0;
for (const e of ELEMENTS) {
  const w = `element ${e.s}`;
  const key = `${e.x},${e.y}`;
  if (cells.has(key)) fail(`${w}: position ${key} taken`);
  cells.add(key);
  if (e.shells.reduce((a, b) => a + b, 0) !== e.z) fail(`${w}: shells do not add up to Z`);
  // PubChem has no CPK colour for some heavy elements (null); the 3D viewer then uses a neutral grey.
  if (e.cpk !== null && !/^#[0-9a-f]{6}$/i.test(e.cpk)) fail(`${w}: CPK colour ${e.cpk} is not #rrggbb`);
  const file = `data/elements/${e.z}.json`;
  if (!existsSync(join(root, file))) {
    fail(`${w}: missing ${file}`);
    continue;
  }
  const rec = readJSON(file);
  if (!rec.weight || !WEIGHT_KINDS.includes(rec.weight.kind))
    fail(`${w}: atomic weight missing or of unknown kind`);
  else if (rec.weight.source === 'ciaaw') ciaaw++;
  else if (['standard', 'interval'].includes(rec.weight.kind))
    fail(`${w}: only CIAAW gives standard atomic weights`);
  if (!Array.isArray(rec.nuclides) || !rec.nuclides.length) fail(`${w}: no nuclides`);
  for (const n of rec.natural || [])
    if (!n.A || !n.abundance) fail(`${w}: natural isotope without A or abundance`);
  for (const [k, list] of Object.entries(rec.texts || {}))
    for (const t of list) if (!rec.refs?.[t.source]) fail(`${w}: ${k} text cites unknown source ${t.source}`);
  if (rec.abundance?.source && !rec.refs?.[rec.abundance.source]) fail(`${w}: abundance source not in refs`);
  if (rec.substance && !getMolecule(rec.substance))
    fail(`${w}: substance card ${rec.substance} not in catalogue`);
}
if (ciaaw !== 84) warnings.push(`CIAAW standard atomic weights for ${ciaaw} elements (IUPAC lists 84)`);
const isotopes = readJSON('data/isotopes.json');
const nuclideKeys = new Set();
for (const [z, A, half, seconds] of isotopes.rows) {
  if (!getElement(z) || !Number.isInteger(A) || A < z) fail(`isotopes.json: bad row ${z}/${A}`);
  if (nuclideKeys.has(`${z}-${A}`)) fail(`isotopes.json: duplicate ${z}-${A}`);
  nuclideKeys.add(`${z}-${A}`);
  if (!(seconds === -1 || seconds === null || (typeof seconds === 'number' && seconds > 0)))
    fail(`isotopes.json: ${z}-${A} has invalid seconds ${seconds}`);
  if (typeof half !== 'string') fail(`isotopes.json: ${z}-${A} half-life text missing`);
}

// ---------- Glossary ----------
const keys = new Set();
for (const g of GLOSSARY) {
  if (keys.has(g.key)) fail(`glossary ${g.key}: duplicate`);
  keys.add(g.key);
  if (!GLOSSARY_CATS[g.cat]) fail(`glossary ${g.key}: unknown category ${g.cat}`);
  for (const k of ['term', 'simple', 'sci']) pair(g[k], `glossary ${g.key}.${k}`);
  for (const s of g.see || []) if (!findTerm(s)) fail(`glossary ${g.key}: see-also ${s} not found`);
  for (const m of g.m || []) if (!getMolecule(m)) fail(`glossary ${g.key}: molecule ${m} not found`);
}

// ---------- Lesson text links ----------
const LINK_CHECK = {
  m: getMolecule,
  e: getElement,
  i: getIon,
  r: getReaction,
  mat: getMaterial,
  lab: findLab,
  learn: findTopic,
  page: id => PAGE_LINKS.includes(id) && PAGES.has(id),
};
function checkText(text, where) {
  for (const [, key] of text.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g))
    if (!findTerm(key)) fail(`${where}: glossary term [[${key}]] not found`);
  for (const [, kind, id] of text.matchAll(/\{\{(m|e|i|r|mat|lab|learn|page):([^}|]+)(?:\|[^}]+)?\}\}/g))
    if (!LINK_CHECK[kind](id)) fail(`${where}: link {{${kind}:${id}}} not found`);
  const rest = text.replace(/\{\{(m|e|i|r|mat|lab|learn|page):[^}]+\}\}/g, '');
  if (/\{\{|\}\}/.test(rest)) fail(`${where}: malformed {{…}} link`);
}
const texts = value =>
  typeof value === 'string'
    ? [value]
    : value && typeof value === 'object'
      ? Object.values(value).flatMap(texts)
      : [];

// ---------- Topics ----------
if (TOPICS.map(t => t.id).join() !== TOPIC_ORDER.join())
  fail('topics/meta.js does not match order.js: run npm run build');
const topics = await loadTopics();
let questions = 0;
for (const t of topics) {
  const w = `topic ${t.id}`;
  pair(t.title, `${w}.title`);
  pair(t.summary, `${w}.summary`);
  for (const l of t.levels) if (!LEVELS.includes(l)) fail(`${w}: unknown level ${l}`);
  for (const l of Object.keys(t.body)) {
    if (!LEVELS.includes(l)) fail(`${w}: body for unknown level ${l}`);
    pair(t.body[l], `${w}.body.${l}`);
  }
  for (const l of t.levels) if (!t.body[l]) fail(`${w}: recommended for ${l} but has no ${l} layer`);
  for (const text of texts([t.body, t.points, t.activity])) checkText(text, w);
  for (const p of t.points) pair(p, `${w}.points`);
  for (const [l, a] of Object.entries(t.activity || {})) {
    if (!LEVELS.includes(l)) fail(`${w}: activity for unknown level ${l}`);
    pair(a, `${w}.activity.${l}`);
  }
  for (const m of t.molecules || []) if (!getMolecule(m)) fail(`${w}: molecule ${m} not found`);
  for (const l of t.labs || []) if (!findLab(l)) fail(`${w}: lab ${l} not found`);
  if (!t.refs?.length) fail(`${w}: no textbook references`);
  for (const r of t.refs || []) checkRef(r, w);
  if (t.quiz.length < 5) fail(`${w}: only ${t.quiz.length} quiz questions`);
  for (const [i, q] of t.quiz.entries()) {
    questions++;
    const qw = `${w} quiz ${i + 1}`;
    if (!t.body[q.lv]) fail(`${qw}: level ${q.lv} has no lesson layer`);
    pair(q.q, `${qw}.q`);
    if (q.options.length < 2) fail(`${qw}: needs options`);
    q.options.forEach(o => pair(o, `${qw}.option`));
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
      fail(`${qw}: answer out of range`);
    if (q.explain) pair(q.explain, `${qw}.explain`);
  }
  for (const l of Object.keys(t.body))
    if (!t.quiz.some(q => q.lv === l)) warnings.push(`${w}: no ${l} quiz questions`);
  const n = t.teacher;
  if (!n) fail(`${w}: missing teacher notes`);
  else {
    for (const k of ['cp', 'duration', 'assessment']) pair(n[k], `${w}.teacher.${k}`);
    for (const k of ['goals', 'steps', 'misconceptions'])
      if (!n[k]?.length) fail(`${w}.teacher.${k}: empty`);
      else n[k].forEach(x => pair(x, `${w}.teacher.${k}`));
  }
}

// ---------- Ions ----------
unique(IONS, 'ion');
let ionRecords = 0;
for (const i of IONS) {
  const w = `ion ${i.id}`;
  const f = parseFormula(i.f);
  if (f.error) {
    fail(`${w}: formula ${i.f} does not parse`);
    continue;
  }
  if (!f.charge) fail(`${w}: formula ${i.f} has no charge`);
  if ((i.kind === 'cation') !== f.charge > 0 || !['cation', 'anion'].includes(i.kind))
    fail(`${w}: kind ${i.kind} does not match charge ${f.charge}`);
  const atoms = Object.values(f.counts).reduce((a, b) => a + b, 0);
  if (!i.poly && !i.complex && atoms > 1 && Object.keys(f.counts).length > 1)
    fail(`${w}: several elements but not poly`);
  if (!LEVELS.includes(i.lv)) fail(`${w}: invalid level ${i.lv}`);
  for (const k of ['name', 'about', 'found']) pair(i[k], `${w}.${k}`);
  if (i.test) pair(i.test, `${w}.test`);
  for (const s of i.see || []) if (!getIon(s)) fail(`${w}: see-also ion ${s} not found`);
  if (i.acid && !getMolecule(i.acid)) fail(`${w}: acid ${i.acid} not in catalogue`);
  for (const c of i.cmp || []) {
    const m = getMolecule(c);
    const row = indexById.get(c);
    if (!m) fail(`${w}: compound ${c} not in catalogue`);
    else if (row?.formula) {
      const counts = parseFormula(row.formula).counts || {};
      const missing = Object.keys(f.counts).filter(el => !counts[el]);
      if (missing.length) fail(`${w}: compound ${c} (${row.formula}) lacks ${missing.join(', ')}`);
    }
  }
  if (!i.src?.length) fail(`${w}: no references`);
  for (const r of i.src || []) checkRef(r, w);
  if (i.noRecord) continue;
  const file = `data/ions/${i.id}.json`;
  if (!existsSync(join(root, file))) {
    fail(`${w}: missing ${file} (run npm run sync:ions)`);
    continue;
  }
  const rec = readJSON(file);
  ionRecords++;
  const pf = rec.props?.formula ? parseFormula(rec.props.formula) : null;
  if (pf && !pf.error && (hill(pf.counts) !== hill(f.counts) || (pf.charge || 0) !== f.charge))
    fail(`${w}: PubChem record ${rec.props.formula} (CID ${rec.cid}) does not match ${i.f}`);
}

// ---------- Reaction library ----------
unique(ALL(), 'reaction');
function ALL() {
  return [...LIBRARY, ...NUCLEAR];
}
const STATES = ['s', 'l', 'g', 'aq', 'alc'];
const coef = c => (c === 'n' ? 1 : typeof c === 'string' ? Number(c.replace('n', '')) || 1 : c);
for (const r of LIBRARY) {
  const w = `reaction ${r.id}`;
  if (!r.types?.length || r.types.some(t => !REACTION_TYPES[t] || t === 'nuklir'))
    fail(`${w}: bad types ${r.types}`);
  if (!LEVELS.includes(r.lv)) fail(`${w}: invalid level ${r.lv}`);
  if (!findTopic(r.topic)) fail(`${w}: unknown topic ${r.topic}`);
  if (r.eq && r.eq !== '⇌') fail(`${w}: eq must be ⇌`);
  for (const k of ['name', 'cond', 'change']) pair(r[k], `${w}.${k}`);
  if (r.obs) pair(r.obs, `${w}.obs`);
  const atoms = {};
  const charge = [0, 0];
  [r.r, r.p].forEach((list, side) => {
    if (!list.length) fail(`${w}: empty side`);
    for (const [c, formula, state, link] of list) {
      if (!(Number.isInteger(c) && c > 0) && !['n', '2n'].includes(c)) fail(`${w}: bad coefficient ${c}`);
      if (!STATES.includes(state)) fail(`${w}: ${formula} has unknown state ${state}`);
      const f = parseFormula(formula);
      if (f.error) {
        fail(`${w}: ${formula} does not parse`);
        continue;
      }
      for (const [el, n] of Object.entries(f.counts)) {
        atoms[el] ??= [0, 0];
        atoms[el][side] += n * coef(c);
      }
      charge[side] += (f.charge || 0) * coef(c);
      if (!link) continue;
      const [kind, id] = link.split(':');
      if (kind === 'm') {
        if (!getMolecule(id)) fail(`${w}: molecule ${id} not found`);
        const row = indexById.get(id);
        const pf = row?.formula ? parseFormula(row.formula) : null;
        // Polymers are written per repeat unit and ionic solids as formula units, so only warn.
        if (pf && !pf.error && hill(pf.counts) !== hill(f.counts))
          warnings.push(`${w}: ${formula} is linked to ${id} (${row.formula})`);
      } else if (kind === 'i') {
        // The species is the ion itself or a compound containing it (KClO₃ links to chlorate).
        const ion = getIon(id);
        const ic = ion ? parseFormula(ion.f).counts : null;
        if (!ion) fail(`${w}: ion ${id} not found`);
        else if (Object.entries(ic).some(([el, n]) => (f.counts[el] || 0) < n))
          fail(`${w}: ${formula} does not contain ion ${ion.f}`);
      } else fail(`${w}: unknown link ${link}`);
    }
  });
  for (const [el, [a, b]] of Object.entries(atoms)) if (a !== b) fail(`${w}: ${el} ${a} ≠ ${b}`);
  if (charge[0] !== charge[1]) fail(`${w}: charge ${charge[0]} ≠ ${charge[1]}`);
  if (!r.src?.length) fail(`${w}: no references`);
  for (const s of r.src || []) checkRef(s, w);
}
const PARTICLES = { e: [0, -1], n: [1, 0], p: [1, 1] };
for (const r of NUCLEAR) {
  const w = `nuclear reaction ${r.id}`;
  if (!r.types.includes('nuklir')) fail(`${w}: missing type nuklir`);
  if (!LEVELS.includes(r.lv)) fail(`${w}: invalid level ${r.lv}`);
  if (!findTopic(r.topic)) fail(`${w}: unknown topic ${r.topic}`);
  for (const k of ['name', 'cond', 'change']) pair(r[k], `${w}.${k}`);
  const sum = (list, k) => list.reduce((a, x) => a + x[k] * (x[3] || 1), 0);
  if (sum(r.r, 0) !== sum(r.p, 0)) fail(`${w}: mass numbers ${sum(r.r, 0)} ≠ ${sum(r.p, 0)}`);
  if (sum(r.r, 1) !== sum(r.p, 1)) fail(`${w}: atomic numbers ${sum(r.r, 1)} ≠ ${sum(r.p, 1)}`);
  for (const [A, Z, sym, count = 1] of [...r.r, ...r.p]) {
    if (!Number.isInteger(count) || count < 1) fail(`${w}: bad count ${count} for ${sym}`);
    const particle = PARTICLES[sym];
    if (particle) {
      if (particle[1] !== Z || (sym !== 'e' && particle[0] !== A))
        fail(`${w}: ${A}/${Z} ${sym} is not a ${sym}`);
    } else if (getElement(sym)?.z !== Z) fail(`${w}: ${sym} does not have Z = ${Z}`);
    else if (!nuclideKeys.has(`${Z}-${A}`)) fail(`${w}: ${sym}-${A} is not a known nuclide`);
  }
  for (const s of r.src || []) checkRef(s, w);
}

// ---------- Materials ----------
unique(MATERIALS, 'material');
for (const m of MATERIALS) {
  const w = `material ${m.id}`;
  if (!MATERIAL_TYPES[m.type]) fail(`${w}: unknown type ${m.type}`);
  if (!LEVELS.includes(m.lv)) fail(`${w}: invalid level ${m.lv}`);
  for (const k of ['name', 'about', 'props', 'uses']) pair(m[k], `${w}.${k}`);
  if (m.sep) pair(m.sep, `${w}.sep`);
  if (m.pdb && !/^[0-9][A-Z0-9]{3}$/.test(m.pdb)) fail(`${w}: bad PDB id ${m.pdb}`);
  if (!m.comp?.length) fail(`${w}: no composition`);
  for (const [link, share] of m.comp || []) {
    pair(share, `${w}.comp share`);
    if (!link) continue;
    const [kind, id] = link.split(':');
    const ok = { e: getElement, m: getMolecule, i: getIon, mat: getMaterial }[kind]?.(id);
    if (!ok) fail(`${w}: composition link ${link} not found`);
  }
  if (!m.src?.length) fail(`${w}: no references`);
  for (const s of m.src || []) checkRef(s, w);
}

// ---------- Knowledge map ----------
for (const c of CHAIN) {
  pair(c.name, `chain ${c.id}.name`);
  if (!routeOK(c.go)) fail(`chain ${c.id}: route ${c.go} not found`);
  if (!getDomain(c.domain)) fail(`chain ${c.id}: unknown domain ${c.domain}`);
}
unique(DOMAINS, 'domain');
const concepts = new Set();
for (const d of DOMAINS) {
  const w = `domain ${d.id}`;
  if (!GROUPS[d.group]) fail(`${w}: unknown group ${d.group}`);
  if (!LEVELS.includes(d.level)) fail(`${w}: invalid level ${d.level}`);
  pair(d.name, `${w}.name`);
  pair(d.lead, `${w}.lead`);
  for (const k of d.concepts) {
    concepts.add(k);
    if (!keys.has(k)) fail(`${w}: concept ${k} is not a glossary key`);
  }
  for (const t of d.topics) if (!findTopic(t)) fail(`${w}: topic ${t} not found`);
  for (const l of d.labs) if (!findLab(l)) fail(`${w}: lab ${l} not found`);
  for (const [href, label] of d.explorers) {
    if (!routeOK(href)) fail(`${w}: explorer ${href} not found`);
    pair(label, `${w}.explorer`);
  }
  for (const s of d.src) checkRef(s, w);
}

// ---------- Labs, places, paths, practice reactions ----------
const labPage = read('js/pages/lab.js');
for (const l of LABS) {
  if (!existsSync(join(root, 'js/labs', `${l.id}.js`))) fail(`lab ${l.id}: missing js/labs/${l.id}.js`);
  if (!labPage.includes(`import('../labs/${l.id}.js')`))
    fail(`lab ${l.id}: not registered in js/pages/lab.js`);
  if (!findTopic(l.topic)) fail(`lab ${l.id}: unknown topic ${l.topic}`);
  for (const lv of l.levels) if (!LEVELS.includes(lv)) fail(`lab ${l.id}: unknown level ${lv}`);
  pair(l.title, `lab ${l.id}.title`);
  pair(l.summary, `lab ${l.id}.summary`);
}
for (const p of PLACES)
  if (!MOLECULES.some(m => m.ctx.includes(p.id))) warnings.push(`place ${p.id}: no molecules`);
for (const lv of LEVELS) {
  const list = PATHS[lv] || [];
  for (const id of list) {
    const t = findTopic(id);
    if (!t) fail(`path ${lv}: topic ${id} not found`);
    else if (!t.levels.includes(lv)) fail(`path ${lv}: topic ${id} is not recommended for ${lv}`);
  }
  if (new Set(list).size !== list.length) fail(`path ${lv}: duplicate topics`);
  for (const t of TOPICS)
    if (t.levels.includes(lv) && !list.includes(t.id)) fail(`path ${lv}: missing ${t.id}`);
}
for (const r of REACTIONS) {
  const res = balance(r.r, r.p);
  if (res.error) fail(`practice reaction ${r.r.join('+')}: ${res.error}`);
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(
  [
    'Content OK:',
    `${MOLECULES.length} molecules (${photos} with photos), ${CLASSES.length} classes,`,
    `118 elements (${ciaaw} CIAAW standard atomic weights), ${isotopes.rows.length} nuclides,`,
    `${IONS.length} ions (${ionRecords} PubChem records), ${LIBRARY.length} reactions + ${NUCLEAR.length} nuclear,`,
    `${MATERIALS.length} materials, ${DOMAINS.length} domains with ${concepts.size} concepts, ${GLOSSARY.length} glossary terms,`,
    `${topics.length} topics with ${questions} quiz questions, ${refCount} references checked,`,
    `${LABS.length} labs, ${REACTIONS.length} practice reactions.`,
  ].join(' ')
);
