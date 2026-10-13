// Unified search (/search?q=): one box for everything in Kimialoka (elements, nuclides, ions, catalogue
// molecules, compound classes, reactions, materials, lessons, glossary concepts, knowledge-map domains and labs)
// plus live PubChem results for names, IUPAC names, CAS numbers, formulas, CIDs, SMILES, InChI and InChIKeys.
import { $, esc, debounce } from '../core/dom.js';
import { S, pick, fmt, atLeast } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { icon } from '../components/icons.js';
import { pageHead, loading, notice, levelBadge } from '../components/common.js';
import { liveCard, nameResult } from '../components/cards.js';
import { identify, kindLabel } from '../services/identify.js';
import { liveLookup } from '../services/lookup.js';
import { summaries } from '../services/pubchem.js';
import { moleculeIndex, isotopeIndex } from '../services/data.js';
import { parseFormula, hill, formulaHTML } from '../services/formula.js';
import { nuclideId, nuclideLabel, halfLifeText, decayName } from '../services/nuclide.js';
import { ELEMENTS, CATEGORIES } from '../data/periodicTable.js';
import { MOLECULES, normalize, getMoleculeByCid } from '../data/curatedMolecules.js';
import { CLASSES } from '../data/classes.js';
import { TOPICS } from '../data/topics/index.js';
import { GLOSSARY } from '../data/glossary.js';
import { IONS } from '../data/ions.js';
import { ALL_REACTIONS, REACTION_TYPES } from '../data/reactionLibrary.js';
import { MATERIALS, MATERIAL_TYPES } from '../data/materials.js';
import { LABS } from '../data/curriculum.js';
import { DOMAINS } from '../data/ontology.js';

const s = S({
  title: ['Cari di Kimialoka', 'Search Kimialoka'],
  lead: [
    'Satu kotak untuk semuanya: unsur, isotop, ion, molekul, reaksi, material, konsep, materi pelajaran, dan laboratorium. Juga menerima nama IUPAC, rumus, nomor CAS, CID, SMILES, InChI, dan InChIKey untuk mencari di PubChem.',
    'One box for everything: elements, isotopes, ions, molecules, reactions, materials, concepts, lessons and labs. It also takes IUPAC names, formulas, CAS numbers, CIDs, SMILES, InChI and InChIKeys to search PubChem.',
  ],
  label: ['Kata kunci', 'Search term'],
  placeholder: ['Contoh: besi, C-14, sulfat, C6H12O6, 64-17-5', 'e.g. iron, C-14, sulfate, C6H12O6, 64-17-5'],
  submit: ['Cari', 'Search'],
  recognised: ['Dikenali sebagai {kind}', 'Recognised as {kind}'],
  casInvalid: [
    'Digit pemeriksa nomor CAS ini tidak cocok; periksa kembali ketikanmu.',
    'This CAS number’s check digit does not match; check what you typed.',
  ],
  top: ['Hasil teratas', 'Top result'],
  count: ['{n} hasil di Kimialoka', '{n} results in Kimialoka'],
  none: ['Tidak ada yang cocok di Kimialoka.', 'Nothing in Kimialoka matches.'],
  seeAll: ['Lihat semua ({n})', 'See all ({n})'],
  showAll: ['Tampilkan semua ({n})', 'Show all ({n})'],
  live: ['Hasil langsung dari PubChem', 'Live results from PubChem'],
  liveLead: [
    'Senyawa di luar katalog; datanya diambil saat dibuka.',
    'Compounds outside the catalogue, fetched when opened.',
  ],
  inCatalog: ['Ada di katalog Kimialoka', 'In the Kimialoka catalogue'],
  suggestions: ['Nama yang mirip di PubChem', 'Similar names in PubChem'],
  noneLive: [
    'PubChem tidak menemukan senyawa yang cocok, atau PubChem sedang tidak dapat dihubungi.',
    'PubChem found no matching compound, or PubChem cannot be reached right now.',
  ],
  offline: [
    'Pencarian PubChem memerlukan internet; hasil di atas berasal dari data Kimialoka.',
    'PubChem search needs a connection; the results above come from Kimialoka’s own data.',
  ],
  tryTitle: ['Coba cari', 'Try searching for'],
  browse: ['Atau jelajahi', 'Or browse'],
  stable: ['Stabil', 'Stable'],
  halfLife: ['Waktu paruh {t}', 'Half-life {t}'],
  unknownNuclide: [
    '{n} tidak ada dalam data nuklida (IAEA AMDC).',
    '{n} is not in the nuclide data (IAEA AMDC).',
  ],
  element: ['Unsur', 'Element'],
  cation: ['Kation', 'Cation'],
  anion: ['Anion', 'Anion'],
  isomer: ['rumus sama', 'same formula'],
});

/** Result groups in their default order. `more` builds a link to the full explorer for the query. */
const GROUPS = {
  element: { name: ['Unsur', 'Elements'], icon: 'atom', more: () => '/table' },
  nuclide: {
    name: ['Isotop (nuklida)', 'Isotopes (nuclides)'],
    icon: 'nucleus',
    more: q => `/isotope?q=${encodeURIComponent(q)}`,
  },
  ion: { name: ['Ion', 'Ions'], icon: 'charge', more: q => `/ion?q=${encodeURIComponent(q)}` },
  molecule: {
    name: ['Molekul & senyawa', 'Molecules & compounds'],
    icon: 'molecule',
    more: q => `/explore?q=${encodeURIComponent(q)}`,
  },
  class: { name: ['Golongan senyawa', 'Compound classes'], icon: 'layers', more: () => '/classes' },
  reaction: {
    name: ['Reaksi', 'Reactions'],
    icon: 'swap',
    more: q => `/reaction?q=${encodeURIComponent(q)}`,
  },
  material: {
    name: ['Material & campuran', 'Materials & mixtures'],
    icon: 'gem',
    more: q => `/material?q=${encodeURIComponent(q)}`,
  },
  topic: { name: ['Materi pelajaran', 'Lessons'], icon: 'book', more: () => '/learn' },
  concept: {
    name: ['Konsep (kamus)', 'Concepts (glossary)'],
    icon: 'bulb',
    more: q => `/glossary?q=${encodeURIComponent(q)}`,
  },
  domain: { name: ['Peta ilmu kimia', 'Chemistry map'], icon: 'map', more: () => '/peta' },
  lab: { name: ['Laboratorium virtual', 'Virtual labs'], icon: 'flask', more: () => '/lab' },
};
const ORDER = Object.keys(GROUPS);
const SHOW = 5;

const EXAMPLES = [
  'besi',
  'C-14',
  'sulfat',
  'C6H12O6',
  '64-17-5',
  'CC(=O)O',
  'fotosintesis',
  'baja',
  'asam kuat',
  'kesetimbangan',
];
const BROWSE = [
  ['/peta', 'map', ['Peta ilmu kimia', 'Chemistry map']],
  ['/table', 'table', ['Tabel periodik', 'Periodic table']],
  ['/isotope', 'nucleus', ['Isotop', 'Isotopes']],
  ['/ion', 'charge', ['Ion', 'Ions']],
  ['/explore', 'molecule', ['Molekul', 'Molecules']],
  ['/reaction', 'swap', ['Reaksi', 'Reactions']],
  ['/material', 'gem', ['Material', 'Materials']],
  ['/glossary', 'bulb', ['Kamus', 'Glossary']],
];

export const title = () => s.title;

// ---------- Matching ----------

const words = t =>
  normalize(t)
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const compact = t => normalize(t).replace(/[^a-z0-9]/g, '');
const clip = (text, n = 120) => (text.length > n ? `${text.slice(0, n).replace(/\s+\S*$/, '')}…` : text);

/**
 * 105 exact (same case), 100 exact, 80 prefix, 60 word prefix, 40 substring, 10 found in the description.
 * `names` are what the item is called (names, symbols, formulas, ids); `extra` is descriptive text.
 */
function score(query, names, extra = '') {
  const qw = words(query);
  const qc = compact(query);
  if (!qc) return 0;
  let best = 0;
  for (const raw of names) {
    if (!raw) continue;
    const c = compact(raw);
    if (c === qc) return String(raw).trim() === query.trim() ? 105 : 100;
    const w = words(raw);
    if (qc.length >= 2 && c.startsWith(qc)) best = Math.max(best, 80);
    else if (qw && qc.length >= 2 && ` ${w}`.includes(` ${qw}`)) best = Math.max(best, 60);
    else if (qc.length >= 3 && w.includes(qw)) best = Math.max(best, 40);
  }
  if (!best && qc.length >= 4 && qw && words(extra).includes(qw)) best = 10;
  return best;
}

const hillOf = text => {
  const { counts, error } = parseFormula(text || '');
  return error || !Object.keys(counts).length ? null : hill(counts);
};

/** Everything local that matches, as { group, score, href, title (HTML), sub (text), badge (HTML) }. */
function searchLocal(q, id, idx, nuclide) {
  const out = [];
  const add = (group, sc, item) => sc > 0 && out.push({ group, score: sc, ...item });

  for (const e of ELEMENTS) {
    let sc = score(q, [e.s, e.id, e.en]);
    if (id.kind === 'cid' && id.value === e.z) sc = Math.max(sc, 90);
    add('element', sc, {
      href: `/atom/${e.s}`,
      title: `${esc(e.s)} · ${esc(pick([e.id, e.en]))}`,
      sub: `Z = ${e.z} · ${pick(CATEGORIES[e.cat]?.name || ['', ''])}`,
    });
  }

  if (nuclide) out.push({ group: 'nuclide', score: 110, ...nuclide });

  for (const i of IONS) {
    const sc = score(q, [i.f, i.name[0], i.name[1], i.id, ...(i.q || [])], `${i.about[0]} ${i.about[1]}`);
    add('ion', sc, {
      href: `/ion/${i.id}`,
      title: `<span class="ion-formula">${esc(i.f)}</span> ${esc(pick(i.name))}`,
      sub: `${i.kind === 'cation' ? s.cation : s.anion} · ${clip(pick(i.about), 90)}`,
    });
  }

  const queryHill = id.kind === 'formula' || id.alsoFormula ? hillOf(id.value) : null;
  for (const m of MOLECULES) {
    const r = idx.get(m.id) || {};
    let sc = score(
      q,
      [m.name[0], m.name[1], m.id.replace(/-/g, ' '), r.formula, r.iupac, r.cas, r.inchikey],
      `${m.about[0]} ${m.about[1]}`
    );
    if (id.kind === 'cid' && id.value === m.cid) sc = 100;
    let isomer = false;
    if (queryHill && sc < 95 && r.formula && hillOf(r.formula) === queryHill) {
      sc = 95;
      isomer = true;
    }
    add('molecule', sc, {
      href: `/molecule/${m.id}`,
      title: esc(pick(m.name)),
      sub: [r.cas, isomer ? s.isomer : ''].filter(Boolean).join(' · '),
      formula: r.formula,
      badge: levelBadge(m.lv),
    });
  }

  for (const c of CLASSES)
    add('class', score(q, [c.name[0], c.name[1], c.id.replace(/-/g, ' ')], `${c.def[0]} ${c.def[1]}`), {
      href: `/classes/${c.id}`,
      title: esc(pick(c.name)),
      sub: clip(pick(c.def)),
    });

  for (const r of ALL_REACTIONS) {
    const nuclear = r.types.includes('nuklir');
    const species = [...r.r, ...r.p].map(x => (nuclear ? `${x[2]}-${x[0]}` : x[1]));
    // A formula in the equation is a weaker hit than the reaction's own name: water is in dozens of reactions.
    const sc = Math.max(
      score(q, [r.name[0], r.name[1], r.id.replace(/-/g, ' ')], `${pick(r.change || ['', ''])}`),
      Math.min(50, score(q, species))
    );
    add('reaction', sc, {
      href: `/reaction/${r.id}`,
      title: esc(pick(r.name)),
      sub: r.types.map(t => pick(REACTION_TYPES[t]?.name || [t, t])).join(' · '),
      badge: levelBadge(r.lv),
    });
  }

  for (const m of MATERIALS)
    add(
      'material',
      score(q, [m.name[0], m.name[1], m.id.replace(/-/g, ' '), m.pdb], `${m.about[0]} ${m.about[1]}`),
      {
        href: `/material/${m.id}`,
        title: esc(pick(m.name)),
        sub: `${pick(MATERIAL_TYPES[m.type].name)} · ${clip(pick(m.about), 90)}`,
        badge: levelBadge(m.lv),
      }
    );

  for (const t of TOPICS)
    add(
      'topic',
      score(q, [t.title[0], t.title[1], t.id.replace(/-/g, ' ')], `${t.summary[0]} ${t.summary[1]}`),
      {
        href: `/learn/${t.id}`,
        title: esc(pick(t.title)),
        sub: clip(pick(t.summary)),
      }
    );

  const deep = atLeast('sma');
  for (const g of GLOSSARY)
    add(
      'concept',
      score(
        q,
        [g.term[0], g.term[1], g.key.replace(/-/g, ' ')],
        `${g.simple[0]} ${g.simple[1]} ${g.sci[0]} ${g.sci[1]}`
      ),
      {
        href: `/glossary/${g.key}`,
        title: esc(pick(g.term)),
        sub: clip(pick(deep ? g.sci : g.simple)),
      }
    );

  for (const d of DOMAINS)
    add('domain', score(q, [d.name[0], d.name[1], d.id.replace(/-/g, ' ')], `${d.lead[0]} ${d.lead[1]}`), {
      href: `/peta/${d.id}`,
      title: esc(pick(d.name)),
      sub: clip(pick(d.lead)),
    });

  for (const l of LABS)
    add('lab', score(q, [l.title[0], l.title[1], l.id], `${l.summary[0]} ${l.summary[1]}`), {
      href: `/lab/${l.id}`,
      title: esc(pick(l.title)),
      sub: clip(pick(l.summary)),
    });

  return out;
}

/** The nuclide result for "C-14", "14C" or "uranium-235", from the IAEA AMDC table. */
async function nuclideHit(value) {
  const { element: e, A } = value;
  const rows = await isotopeIndex().catch(() => []);
  const row = rows.find(r => r.z === e.z && r.A === A);
  const name = `${pick([e.id, e.en])}-${A}`;
  if (!row) return { missing: fmt(s.unknownNuclide, { n: name }) };
  const half = row.stable ? s.stable : fmt(s.halfLife, { t: halfLifeText(row.half) });
  return {
    href: `/isotope/${nuclideId(e.s, A)}`,
    title: `<span class="nuc">${esc(nuclideLabel(A, e.s))}</span> ${esc(name)}`,
    sub: [half, row.decay ? decayName(row.decay) : '', row.abundance ? `${row.abundance} %` : '']
      .filter(Boolean)
      .join(' · '),
  };
}

// ---------- Rendering ----------

const row = r =>
  `<li><a class="result-row" href="${r.href}"><span class="result-body"><span class="result-title">${r.title}${
    r.formula ? ` <span class="result-formula">${formulaHTML(r.formula)}</span>` : ''
  }</span>${r.sub ? `<span class="result-sub">${esc(r.sub)}</span>` : ''}</span>${r.badge || ''}</a></li>`;

function groupHTML(key, items, q, expanded) {
  const g = GROUPS[key];
  const list = expanded ? items : items.slice(0, SHOW);
  const rest = items.length - list.length;
  const more = g.more(q);
  const moreLink =
    rest > 0
      ? more.includes('?')
        ? `<a class="btn btn-small" href="${esc(more)}">${esc(fmt(s.seeAll, { n: items.length }))} ${icon('arrowRight', { size: 14 })}</a>`
        : `<button class="btn btn-small" type="button" data-expand="${key}">${esc(fmt(s.showAll, { n: items.length }))}</button>`
      : '';
  return `<section class="result-group" aria-labelledby="rg-${key}">
    <h2 class="h-small" id="rg-${key}">${icon(g.icon, { size: 18 })} ${esc(pick(g.name))} <span class="muted">(${items.length})</span></h2>
    <ul class="result-list">${list.map(row).join('')}</ul>${moreLink}
  </section>`;
}

function startHTML() {
  return `<section class="search-start">
    <h2 class="h-small">${esc(s.tryTitle)}</h2>
    <p class="chip-row">${EXAMPLES.map(e => `<a class="chip" href="/search?q=${encodeURIComponent(e)}">${esc(e)}</a>`).join('')}</p>
    <h2 class="h-small">${esc(s.browse)}</h2>
    <div class="grid grid-4">${BROWSE.map(([href, ic, name]) => `<a class="card browse-card" href="${href}">${icon(ic, { size: 22 })}<span class="card-title">${esc(pick(name))}</span></a>`).join('')}</div>
  </section>`;
}

export async function render({ main, params, isCurrent }) {
  const idx = await moleculeIndex();
  let q = params.get('q') || '';
  const expanded = new Set();
  let liveToken = 0;
  let localToken = 0;

  main.innerHTML = `<div class="container search-page">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <form class="filters search-form" role="search" data-search-form>
      <div class="field field-grow"><label for="q-all">${esc(s.label)}</label>
        <input id="q-all" name="q" type="search" value="${esc(q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" spellcheck="false" /></div>
      <button class="btn btn-primary" type="submit">${icon('search', { size: 18 })} ${esc(s.submit)}</button>
    </form>
    <div data-kind aria-live="polite"></div>
    <div data-top></div>
    <p class="muted" data-count aria-live="polite"></p>
    <div data-local></div>
    <section data-live aria-live="polite"></section>
  </div>`;

  const input = $('#q-all', main);

  async function drawLocal() {
    const mine = ++localToken;
    const term = q.trim();
    const id = identify(term);
    const kindBox = $('[data-kind]', main);
    if (!term) {
      kindBox.innerHTML = '';
      $('[data-top]', main).innerHTML = '';
      $('[data-count]', main).textContent = '';
      $('[data-local]', main).innerHTML = startHTML();
      return;
    }
    const chipText =
      id.kind !== 'name'
        ? `<span class="chip">${esc(fmt(s.recognised, { kind: kindLabel(id.kind) }))}</span>`
        : '';
    const casNote = id.kind === 'cas' && !id.valid ? notice(esc(s.casInvalid), 'warn') : '';
    let nuclide = null;
    let missing = '';
    if (id.kind === 'nuclide') {
      const hit = await nuclideHit(id.value);
      if (mine !== localToken || !isCurrent()) return;
      if (hit.missing) missing = notice(esc(hit.missing), 'warn');
      else nuclide = hit;
    }
    kindBox.innerHTML = `${chipText ? `<p>${chipText}</p>` : ''}${casNote}${missing}`;

    const results = searchLocal(term, id, idx, nuclide);
    const byGroup = new Map();
    for (const r of results.sort((a, b) => b.score - a.score)) {
      if (!byGroup.has(r.group)) byGroup.set(r.group, []);
      byGroup.get(r.group).push(r);
    }
    const groups = [...byGroup.entries()].sort(
      ([a, x], [b, y]) => y[0].score - x[0].score || ORDER.indexOf(a) - ORDER.indexOf(b)
    );
    const best = groups[0]?.[1][0];
    $('[data-top]', main).innerHTML =
      best && best.score >= 80
        ? `<a class="card result-top" href="${best.href}"><span class="eyebrow">${icon(GROUPS[best.group].icon, { size: 16 })} ${esc(s.top)} · ${esc(pick(GROUPS[best.group].name))}</span>
            <span class="card-title">${best.title}${best.formula ? ` <span class="result-formula">${formulaHTML(best.formula)}</span>` : ''}</span>${best.sub ? `<span class="card-text">${esc(best.sub)}</span>` : ''}</a>`
        : '';
    $('[data-count]', main).textContent = fmt(s.count, { n: results.length });
    $('[data-local]', main).innerHTML = groups.length
      ? groups.map(([key, items]) => groupHTML(key, items, term, expanded.has(key))).join('')
      : `<p>${esc(s.none)}</p>`;
  }

  async function drawLive() {
    const box = $('[data-live]', main);
    const term = q.trim();
    const mine = ++liveToken;
    const kind = identify(term).kind;
    if (term.length < 2 || kind === 'nuclide') {
      box.innerHTML = '';
      return;
    }
    const head = `<div class="section-head"><h2>${icon('globe', { size: 20 })} ${esc(s.live)}</h2></div>`;
    if (!navigator.onLine) {
      box.innerHTML = head + notice(esc(s.offline), 'info');
      return;
    }
    box.innerHTML = head + loading();
    const { cids, labels, names } = await liveLookup(term);
    if (mine !== liveToken || !isCurrent()) return;
    const known = cids.map(getMoleculeByCid).filter(Boolean);
    const fresh = cids.filter(c => !getMoleculeByCid(c)).slice(0, 16);
    const rows = await summaries(fresh);
    if (mine !== liveToken || !isCurrent()) return;
    const nameList = names.filter(n => !rows.some(r => r.title.toLowerCase() === n.toLowerCase()));
    box.innerHTML = `${head}
      ${known.length ? `<h3 class="h-small">${icon('check', { size: 16 })} ${esc(s.inCatalog)}</h3><ul class="result-list">${known.map(m => row({ href: `/molecule/${m.id}`, title: esc(pick(m.name)), formula: idx.get(m.id)?.formula, sub: `CID ${m.cid}`, badge: levelBadge(m.lv) })).join('')}</ul>` : ''}
      ${rows.length ? `<p class="muted">${esc(s.liveLead)}</p><div class="grid grid-cards">${rows.map(r => liveCard({ ...r, label: labels.get(r.cid) })).join('')}</div>` : ''}
      ${nameList.length ? `<h3 class="h-small">${esc(s.suggestions)}</h3><ul class="suggest-list">${nameList.map(nameResult).join('')}</ul>` : ''}
      ${!known.length && !rows.length && !nameList.length ? `<p>${esc(s.noneLive)}</p>` : ''}`;
  }

  const liveLater = debounce(drawLive, 600);
  const update = debounce(() => {
    q = input.value;
    expanded.clear();
    replaceQuery({ q: q.trim() });
    drawLocal();
    liveLater();
  }, 200);

  input.addEventListener('input', update);
  $('[data-search-form]', main).addEventListener('submit', e => {
    e.preventDefault();
    update();
  });
  $('[data-local]', main).addEventListener('click', e => {
    const btn = e.target.closest('[data-expand]');
    if (!btn) return;
    expanded.add(btn.dataset.expand);
    drawLocal();
  });

  await drawLocal();
  if (q.trim()) drawLive();
}
