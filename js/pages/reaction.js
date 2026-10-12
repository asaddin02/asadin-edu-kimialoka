// Reaction library: /reaction lists reactions by type and level; /reaction/<id> shows
// reactants → conditions → transformation → products, with an atom and charge tally computed from the formulas
// (every equation is also checked by scripts/check-data.mjs).
import { $, esc, debounce } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, levelBadge, extLink, emptyState } from '../components/common.js';
import { REACTION_TYPES, LIBRARY, NUCLEAR, ALL_REACTIONS, getReaction } from '../data/reactionLibrary.js';
import { getMolecule, normalize } from '../data/curatedMolecules.js';
import { getIon } from '../data/ions.js';
import { findTopic } from '../data/topics/index.js';
import { getElement } from '../data/periodicTable.js';
import { reference } from '../data/references.js';
import { parseFormula, formulaHTML } from '../services/formula.js';
import { nuclideId, nucHTML } from '../services/nuclide.js';

const s = S({
  title: ['Pustaka reaksi', 'Reaction library'],
  lead: [
    'Reaksi kimia dan reaksi inti yang setara, dari yang terjadi di dapur sampai di industri: pereaksi → kondisi → perubahan → hasil. Setiap persamaan diperiksa kesetaraan atom dan muatannya.',
    'Balanced chemical and nuclear reactions, from the kitchen to industry: reactants → conditions → transformation → products. Every equation is checked for atom and charge balance.',
  ],
  search: ['Cari reaksi', 'Find a reaction'],
  placeholder: ['Contoh: pembakaran, CO₂, esterifikasi', 'e.g. combustion, CO₂, esterification'],
  type: ['Jenis reaksi', 'Reaction type'],
  level: ['Jenjang', 'Level'],
  all: ['Semua', 'All'],
  reversible: ['Hanya reaksi bolak-balik (⇌)', 'Reversible reactions only (⇌)'],
  count: ['{n} reaksi', '{n} reactions'],
  none: ['Tidak ada reaksi yang cocok.', 'No reactions match.'],
  notFound: ['Reaksi tidak ditemukan.', 'Reaction not found.'],
  reactants: ['Pereaksi', 'Reactants'],
  products: ['Hasil reaksi', 'Products'],
  conditions: ['Kondisi', 'Conditions'],
  change: ['Apa yang berubah', 'What changes'],
  observe: ['Yang teramati', 'What you see'],
  tally: ['Neraca atom', 'Atom tally'],
  tallyNuc: ['Neraca inti', 'Nuclear tally'],
  left: ['Kiri', 'Left'],
  right: ['Kanan', 'Right'],
  charge: ['Muatan total', 'Total charge'],
  balanced: [
    'Setara: jumlah setiap atom dan muatan sama di kedua ruas.',
    'Balanced: every atom and the charge match on both sides.',
  ],
  balancedNuc: [
    'Setara: jumlah nomor massa (A) dan nomor atom (Z) sama di kedua ruas.',
    'Balanced: mass numbers (A) and atomic numbers (Z) match on both sides.',
  ],
  polymerNote: [
    'n = jumlah satuan ulang; neraca dihitung untuk satu satuan (n = 1).',
    'n = number of repeat units; the tally is for one unit (n = 1).',
  ],
  types: ['Jenis', 'Types'],
  lesson: ['Materi terkait', 'Related lesson'],
  tryLab: ['Setarakan sendiri di lab Penyetaraan', 'Balance it yourself in the Balancing lab'],
  refs: ['Rujukan', 'References'],
  states: {
    s: ['padat', 'solid'],
    l: ['cair', 'liquid'],
    g: ['gas', 'gas'],
    aq: ['larutan dalam air', 'aqueous solution'],
    alc: ['larutan dalam etanol', 'in ethanol'],
  },
  nuclear: ['Reaksi inti', 'Nuclear reactions'],
});

export const title = route =>
  route.id ? pick(getReaction(route.id)?.name || ['Reaksi', 'Reaction']) : s.title;

const coef = c => (c === 'n' ? 1 : typeof c === 'string' ? Number(c.replace('n', '')) || 1 : c);
const coefLabel = c => (c === 1 ? '' : `<span class="coef">${esc(c)}</span>`);
const isNuclear = r => r.types.includes('nuklir');

function speciesLink(sp) {
  const [, f, st, link, label] = sp;
  const shown = label ? esc(label) : formulaHTML(f);
  const state = st
    ? `<sub class="state" title="${esc(pick(s.states[st] || [st, st]))}">(${esc(st)})</sub>`
    : '';
  if (!link) return `${shown}${state}`;
  const [kind, id] = link.split(':');
  const href =
    kind === 'm' && getMolecule(id) ? `/molecule/${id}` : kind === 'i' && getIon(id) ? `/ion/${id}` : '';
  return href ? `<a href="${href}">${shown}</a>${state}` : `${shown}${state}`;
}

/** A nuclide in an equation, with its count: "3 ¹₀n". */
const nucTerm = ([A, Z, sym, n = 1]) =>
  `<span class="sp">${n > 1 ? `<span class="coef">${n}</span>` : ''}${nucHTML(A, Z, sym)}</span>`;
/** Σ count × A (k = 0) or Σ count × Z (k = 1) over one side of a nuclear equation. */
export const nucSum = (list, k) => list.reduce((a, x) => a + x[k] * (x[3] || 1), 0);

/** The equation as HTML with coefficients, states and links. */
export function equationHTML(r) {
  if (isNuclear(r)) {
    const nuc = sp => {
      const [A, Z, sym] = sp;
      const el = getElement(sym);
      return el && el.z === Z ? `<a href="/isotope/${nuclideId(sym, A)}">${nucTerm(sp)}</a>` : nucTerm(sp);
    };
    return `${r.r.map(nuc).join(' <span class="op">+</span> ')} <span class="op">→</span> ${r.p.map(nuc).join(' <span class="op">+</span> ')}`;
  }
  const side = list =>
    list
      .map(sp => `<span class="sp">${coefLabel(sp[0])}${speciesLink(sp)}</span>`)
      .join(' <span class="op">+</span> ');
  return `${side(r.r)} <span class="op">${r.eq === '⇌' ? '⇌' : '→'}</span> ${side(r.p)}`;
}

/** { element: [left, right] } and charges for a chemical reaction. */
export function tally(r) {
  const out = {};
  const charge = [0, 0];
  [r.r, r.p].forEach((list, side) => {
    for (const sp of list) {
      const f = parseFormula(sp[1]);
      for (const [el, n] of Object.entries(f.counts || {})) {
        out[el] ??= [0, 0];
        out[el][side] += n * coef(sp[0]);
      }
      charge[side] += (f.charge || 0) * coef(sp[0]);
    }
  });
  return { atoms: out, charge };
}

export function render({ id, main, params }) {
  if (id) return renderReaction(main, id);
  const state = {
    q: params.get('q') || '',
    type: params.get('type') || '',
    lv: params.get('lv') || '',
    eq: params.get('eq') === '1',
  };
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <form class="filters" role="search" data-filters>
      <div class="field field-grow"><label for="rx-q">${esc(s.search)}</label><input id="rx-q" name="q" type="search" value="${esc(state.q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" /></div>
      <div class="field"><label for="rx-type">${esc(s.type)}</label><select id="rx-type" name="type"><option value="">${esc(s.all)}</option>${Object.entries(
        REACTION_TYPES
      )
        .map(([k, t]) => `<option value="${k}">${esc(pick(t.name))}</option>`)
        .join('')}</select></div>
      <div class="field"><label for="rx-lv">${esc(s.level)}</label><select id="rx-lv" name="lv"><option value="">${esc(s.all)}</option>${['sd', 'smp', 'sma', 'kuliah'].map(l => `<option value="${l}">${esc(levelName(l))}</option>`).join('')}</select></div>
      <label class="check"><input type="checkbox" name="eq" ${state.eq ? 'checked' : ''} /> ${esc(s.reversible)}</label>
    </form>
    <div data-type-def></div>
    <p class="muted" data-count aria-live="polite"></p>
    <div class="rx-grid" data-list></div>
  </div>`;
  const form = $('[data-filters]', main);
  form.elements.type.value = state.type;
  form.elements.lv.value = state.lv;
  const draw = () => {
    const q = normalize(state.q);
    const list = ALL_REACTIONS.filter(
      r =>
        (!state.type || r.types.includes(state.type)) &&
        (!state.lv || r.lv === state.lv) &&
        (!state.eq || r.eq === '⇌') &&
        (!q ||
          normalize(
            `${r.name[0]} ${r.name[1]} ${r.id} ${[...r.r, ...r.p].map(x => (isNuclear(r) ? x[2] : x[1])).join(' ')}`
          ).includes(q))
    );
    const t = REACTION_TYPES[state.type];
    $('[data-type-def]', main).innerHTML = t ? `<p class="lead">${esc(pick(t.def))}</p>` : '';
    $('[data-count]', main).textContent = fmt(s.count, { n: list.length });
    $('[data-list]', main).innerHTML = list.length ? list.map(rxCard).join('') : emptyState(s.none);
  };
  const update = debounce(() => {
    state.q = form.elements.q.value;
    state.type = form.elements.type.value;
    state.lv = form.elements.lv.value;
    state.eq = form.elements.eq.checked;
    replaceQuery({ q: state.q, type: state.type, lv: state.lv, eq: state.eq ? '1' : '' });
    draw();
  }, 150);
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', e => e.preventDefault());
  draw();
}

export function rxCard(r) {
  return `<article class="card rx-card">
    <h3 class="card-title"><a href="/reaction/${r.id}">${esc(pick(r.name))}</a></h3>
    <p class="rx-eq rx-eq-sm">${equationHTML(r)}</p>
    <p class="topic-meta">${levelBadge(r.lv)} ${r.types.map(t => `<span class="chip">${esc(pick(REACTION_TYPES[t].name))}</span>`).join(' ')}</p>
  </article>`;
}

function renderReaction(main, id) {
  const r = getReaction(id);
  if (!r) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/reaction">${esc(s.title)}</a></section>`;
    return;
  }
  const nuclear = isNuclear(r);
  const topic = findTopic(r.topic);
  const refs = (r.src || []).map(reference).filter(Boolean);
  let tallyHTML;
  if (nuclear) {
    const sum = nucSum;
    tallyHTML = `<table class="data-table tally"><caption>${esc(s.tallyNuc)}</caption><thead><tr><th scope="col"></th><th scope="col">${esc(s.left)}</th><th scope="col">${esc(s.right)}</th></tr></thead><tbody>
      <tr class="ok"><th scope="row">A</th><td>${sum(r.r, 0)}</td><td>${sum(r.p, 0)}</td></tr>
      <tr class="ok"><th scope="row">Z</th><td>${sum(r.r, 1)}</td><td>${sum(r.p, 1)}</td></tr></tbody></table><p class="ok">${esc(s.balancedNuc)}</p>`;
  } else {
    const t = tally(r);
    const ok = Object.values(t.atoms).every(([a, b]) => a === b) && t.charge[0] === t.charge[1];
    tallyHTML = `<table class="data-table tally"><caption>${esc(s.tally)}</caption><thead><tr><th scope="col"></th><th scope="col">${esc(s.left)}</th><th scope="col">${esc(s.right)}</th></tr></thead><tbody>${Object.entries(
      t.atoms
    )
      .map(
        ([el, [a, b]]) =>
          `<tr class="${a === b ? 'ok' : 'no'}"><th scope="row"><a href="/atom/${el}">${esc(el)}</a></th><td>${a}</td><td>${b}</td></tr>`
      )
      .join(
        ''
      )}${t.charge[0] || t.charge[1] ? `<tr class="${t.charge[0] === t.charge[1] ? 'ok' : 'no'}"><th scope="row">${esc(s.charge)}</th><td>${t.charge[0]}</td><td>${t.charge[1]}</td></tr>` : ''}</tbody></table>
      ${ok ? `<p class="ok">${icon('check', { size: 16 })} ${esc(s.balanced)}</p>` : ''}
      ${[...r.r, ...r.p].some(x => typeof x[0] === 'string') ? `<p class="muted small">${esc(s.polymerNote)}</p>` : ''}`;
  }
  const labEq =
    !nuclear && ![...r.r, ...r.p].some(x => typeof x[0] === 'string' || /[⁺⁻]/.test(x[1]))
      ? `${r.r.map(x => x[1]).join(' + ')} → ${r.p.map(x => x[1]).join(' + ')}`
      : '';

  main.innerHTML = `<article class="container reaction-page">
    ${breadcrumbs([
      [s.title, '/reaction'],
      [pick(r.name), ''],
    ])}
    <header class="page-head">
      <p class="eyebrow">${icon(REACTION_TYPES[r.types[0]].icon, { size: 18 })} ${esc(s.title)}</p>
      <h1>${esc(pick(r.name))}</h1>
      <p class="mol-badges">${levelBadge(r.lv)} ${r.types.map(t => `<a class="chip" href="/reaction?type=${t}">${esc(pick(REACTION_TYPES[t].name))}</a>`).join(' ')}</p>
    </header>
    <div class="card rx-equation"><p class="rx-eq rx-eq-lg">${equationHTML(r)}</p></div>
    <ol class="rx-flow">
      <li class="card"><h2 class="h-small">${icon('beaker', { size: 18 })} ${esc(s.reactants)}</h2><p>${r.r.map(sp => (nuclear ? nucTerm(sp) : speciesLink(sp))).join(', ')}</p></li>
      <li class="card"><h2 class="h-small">${icon('thermometer', { size: 18 })} ${esc(s.conditions)}</h2><p>${esc(pick(r.cond))}</p></li>
      <li class="card"><h2 class="h-small">${icon('sparkles', { size: 18 })} ${esc(s.change)}</h2><p>${esc(pick(r.change))}</p>${r.obs ? `<p class="muted"><strong>${esc(s.observe)}:</strong> ${esc(pick(r.obs))}</p>` : ''}</li>
      <li class="card"><h2 class="h-small">${icon('flask', { size: 18 })} ${esc(s.products)}</h2><p>${r.p.map(sp => (nuclear ? nucTerm(sp) : speciesLink(sp))).join(', ')}</p></li>
    </ol>
    <div class="grid grid-2">
      <section class="card">${tallyHTML}</section>
      <section class="card"><h2 class="h-small">${esc(s.types)}</h2><ul>${r.types.map(t => `<li><strong>${esc(pick(REACTION_TYPES[t].name))}</strong>: ${esc(pick(REACTION_TYPES[t].def))}</li>`).join('')}</ul>
        ${labEq ? `<p><a class="btn" href="/lab/setara?eq=${encodeURIComponent(labEq)}">${icon('compare', { size: 16 })} ${esc(s.tryLab)}</a></p>` : ''}
        ${topic ? `<p>${esc(s.lesson)}: <a href="/learn/${topic.id}">${esc(pick(topic.title))}</a></p>` : ''}
      </section>
    </div>
    <section class="mol-section refs"><h2 class="h-small">${esc(s.refs)}</h2><ul class="ref-list">${refs.map(x => `<li>${extLink(x.url, x.label)}</li>`).join('')}</ul></section>
  </article>`;
}

export const reactionCount = () => LIBRARY.length + NUCLEAR.length;
