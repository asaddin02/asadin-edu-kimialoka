// Explore: search the catalogue and all of PubChem; filter by family, level and place.
import { $, esc, debounce } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, loading, emptyState, notice } from '../components/common.js';
import { moleculeCard, liveCard, nameResult } from '../components/cards.js';
import {
  MOLECULES,
  LEVEL_ORDER,
  searchCatalog,
  normalize,
  getMoleculeByCid,
} from '../data/curatedMolecules.js';
import { CLASSES } from '../data/classes.js';
import { PLACES } from '../data/curriculum.js';
import { getElement } from '../data/periodicTable.js';
import { moleculeIndex, formulas } from '../services/data.js';
import { summaries } from '../services/pubchem.js';
import { liveLookup } from '../services/lookup.js';
import { kindLabel } from '../services/identify.js';

const s = S({
  title: ['Jelajah molekul', 'Explore molecules'],
  lead: [
    'Cari di katalog Alchemist dan di lebih dari 100 juta senyawa PubChem. Ketik nama (Indonesia atau Inggris), nama IUPAC, rumus kimia, nomor CAS, CID, SMILES, InChI, atau InChIKey.',
    'Search the Alchemist catalogue and over 100 million PubChem compounds. Type a name (Indonesian or English), IUPAC name, formula, CAS number, CID, SMILES, InChI or InChIKey.',
  ],
  q: ['Kata kunci', 'Search term'],
  placeholder: ['Contoh: cuka, C2H5OH, 64-17-5, CCO', 'e.g. vinegar, C2H5OH, 64-17-5, CCO'],
  family: ['Golongan', 'Class'],
  all: ['Semua', 'All'],
  level: ['Jenjang', 'Level'],
  place: ['Di sekitarku', 'Around me'],
  sort: ['Urutkan', 'Sort'],
  byName: ['Nama', 'Name'],
  byMass: ['Massa molar', 'Molar mass'],
  byLevel: ['Jenjang', 'Level'],
  catalog: ['Katalog Alchemist', 'Alchemist catalogue'],
  count: ['{n} molekul', '{n} molecules'],
  more: ['Tampilkan lebih banyak', 'Show more'],
  live: ['Hasil langsung dari PubChem', 'Live results from PubChem'],
  liveLead: [
    'Senyawa di luar katalog. Datanya diambil saat halaman dibuka.',
    'Compounds outside the catalogue, fetched when you open them.',
  ],
  suggestions: ['Nama yang mirip di PubChem', 'Similar names in PubChem'],
  none: ['Tidak ada molekul di katalog yang cocok.', 'No catalogue molecules match.'],
  noneLive: ['PubChem tidak menemukan senyawa yang cocok.', 'PubChem found no matching compound.'],
  liveError: [
    'PubChem tidak dapat dihubungi. Periksa koneksi internet.',
    'PubChem could not be reached. Check your connection.',
  ],
  elementHit: ['Unsur {name} ({s})', 'Element {name} ({s})'],
  recognised: ['Dikenali sebagai {kind}', 'Recognised as {kind}'],
  inCatalog: ['Ada di katalog Alchemist', 'In the Alchemist catalogue'],
  reset: ['Hapus filter', 'Clear filters'],
});

export const title = () => s.title;
const PAGE = 24;

export async function render({ main, params, isCurrent }) {
  const idx = await moleculeIndex();
  const formulaMap = await formulas();
  const state = {
    q: params.get('q') || '',
    cls: params.get('cls') || '',
    lv: params.get('lv') || '',
    ctx: params.get('ctx') || '',
    sort: params.get('sort') || '',
  };

  const classOptions = CLASSES.map(c => {
    const depth = c.parent ? '— ' : '';
    return `<option value="${c.id}" ${state.cls === c.id ? 'selected' : ''}>${depth}${esc(pick(c.name))}</option>`;
  }).join('');

  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <form class="filters" data-filters role="search">
      <div class="field field-grow">
        <label for="f-q">${esc(s.q)}</label>
        <input id="f-q" name="q" type="search" value="${esc(state.q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" />
      </div>
      <div class="field">
        <label for="f-cls">${esc(s.family)}</label>
        <select id="f-cls" name="cls"><option value="">${esc(s.all)}</option>${classOptions}</select>
      </div>
      <div class="field">
        <label for="f-lv">${esc(s.level)}</label>
        <select id="f-lv" name="lv"><option value="">${esc(s.all)}</option>${LEVEL_ORDER.map(
          l => `<option value="${l}" ${state.lv === l ? 'selected' : ''}>${esc(levelName(l))}</option>`
        ).join('')}</select>
      </div>
      <div class="field">
        <label for="f-ctx">${esc(s.place)}</label>
        <select id="f-ctx" name="ctx"><option value="">${esc(s.all)}</option>${PLACES.map(
          p => `<option value="${p.id}" ${state.ctx === p.id ? 'selected' : ''}>${esc(pick(p.name))}</option>`
        ).join('')}</select>
      </div>
      <div class="field">
        <label for="f-sort">${esc(s.sort)}</label>
        <select id="f-sort" name="sort">
          <option value="">${esc(s.byName)}</option>
          <option value="mw" ${state.sort === 'mw' ? 'selected' : ''}>${esc(s.byMass)}</option>
          <option value="lv" ${state.sort === 'lv' ? 'selected' : ''}>${esc(s.byLevel)}</option>
        </select>
      </div>
      <button class="btn" type="reset" data-reset>${esc(s.reset)}</button>
    </form>
    <div data-element-hit></div>
    <section aria-labelledby="cat-title">
      <div class="section-head"><h2 id="cat-title">${esc(s.catalog)}</h2><p class="muted" data-count aria-live="polite"></p></div>
      <div class="grid grid-cards" data-results></div>
      <div class="center"><button class="btn" type="button" data-more hidden>${esc(s.more)}</button></div>
    </section>
    <section data-live aria-live="polite"></section>
  </div>`;

  const form = $('[data-filters]', main);
  let shown = PAGE;
  let liveToken = 0;

  function filtered() {
    let list = state.q ? searchCatalog(state.q, formulaMap) : [...MOLECULES];
    if (state.cls) {
      const ids = new Set([state.cls, ...CLASSES.filter(c => c.parent === state.cls).map(c => c.id)]);
      list = list.filter(m => m.cls.some(c => ids.has(c)));
    }
    if (state.lv) list = list.filter(m => m.lv === state.lv);
    if (state.ctx) list = list.filter(m => m.ctx.includes(state.ctx));
    if (!state.q) {
      const name = m => normalize(pick(m.name));
      if (state.sort === 'mw') list.sort((a, b) => (idx.get(a.id)?.mw || 0) - (idx.get(b.id)?.mw || 0));
      else if (state.sort === 'lv')
        list.sort(
          (a, b) => LEVEL_ORDER.indexOf(a.lv) - LEVEL_ORDER.indexOf(b.lv) || name(a).localeCompare(name(b))
        );
      else list.sort((a, b) => name(a).localeCompare(name(b)));
    }
    return list;
  }

  function drawCatalog() {
    const list = filtered();
    $('[data-count]', main).textContent = fmt(s.count, { n: list.length });
    $('[data-results]', main).innerHTML = list.length
      ? list
          .slice(0, shown)
          .map(m => moleculeCard(m, idx.get(m.id)))
          .join('')
      : emptyState(s.none);
    $('[data-more]', main).hidden = list.length <= shown;
    const el = state.q && getElement(state.q.trim());
    $('[data-element-hit]', main).innerHTML = el
      ? notice(
          `${icon('atom', { size: 16 })} <a href="/atom/${el.s}">${esc(fmt(s.elementHit, { name: pick([el.id, el.en]), s: el.s }))}</a>`
        )
      : '';
  }

  async function drawLive() {
    const box = $('[data-live]', main);
    const q = state.q.trim();
    const mine = ++liveToken;
    if (q.length < 2) {
      box.innerHTML = '';
      return;
    }
    box.innerHTML = `<div class="section-head"><h2>${icon('globe', { size: 20 })} ${esc(s.live)}</h2></div>${loading()}`;
    try {
      const { kind, cids, labels, names } = await liveLookup(q);
      if (mine !== liveToken || !isCurrent()) return;
      // Identifier searches (CAS, SMILES, InChIKey…) can land on catalogue molecules the name search missed.
      const listed = new Set(filtered().map(m => m.id));
      const catalog = cids.map(getMoleculeByCid).filter(m => m && !listed.has(m.id));
      const fresh = cids.filter(c => !getMoleculeByCid(c)).slice(0, 16);
      const rows = await summaries(fresh);
      if (mine !== liveToken || !isCurrent()) return;
      const nameList = names.filter(n => !rows.some(r => r.title.toLowerCase() === n.toLowerCase()));
      box.innerHTML = `<div class="section-head"><h2>${icon('globe', { size: 20 })} ${esc(s.live)}</h2></div>
        ${catalog.length ? `<h3 class="h-small">${icon('check', { size: 16 })} ${esc(s.inCatalog)}</h3><div class="grid grid-cards">${catalog.map(m => moleculeCard(m, idx.get(m.id))).join('')}</div>` : ''}
        <p class="muted">${esc(s.liveLead)}${kind !== 'name' ? ` <span class="chip">${esc(fmt(s.recognised, { kind: kindLabel(kind) }))}</span>` : ''}</p>
        ${rows.length ? `<div class="grid grid-cards">${rows.map(r => liveCard({ ...r, label: labels.get(r.cid) })).join('')}</div>` : ''}
        ${nameList.length ? `<h3 class="h-small">${esc(s.suggestions)}</h3><ul class="suggest-list">${nameList.map(nameResult).join('')}</ul>` : ''}
        ${!catalog.length && !rows.length && !nameList.length ? `<p>${esc(s.noneLive)}</p>` : ''}`;
    } catch {
      if (mine === liveToken) box.innerHTML = notice(esc(s.liveError), 'warn');
    }
  }

  const liveLater = debounce(drawLive, 500);
  const update = debounce(() => {
    for (const key of Object.keys(state)) state[key] = form.elements[key]?.value ?? '';
    shown = PAGE;
    replaceQuery(state);
    drawCatalog();
    liveLater();
  }, 200);

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', e => {
    e.preventDefault();
    update();
  });
  form.addEventListener('reset', () => setTimeout(update, 0));
  $('[data-more]', main).addEventListener('click', () => {
    shown += PAGE;
    drawCatalog();
  });

  drawCatalog();
  if (state.q) drawLive();
}
