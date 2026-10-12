// Periodic table of all 118 elements (PubChem data), coloured by category or by a property heat map.
import { $, $$, esc } from '../core/dom.js';
import { S, pick, num, fmt } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { pageHead } from '../components/common.js';
import { ELEMENTS, CATEGORIES } from '../data/periodicTable.js';

const s = S({
  title: ['Tabel periodik unsur', 'Periodic table of the elements'],
  lead: [
    'Semua 118 unsur dengan data resmi tabel periodik PubChem (NIH). Pilih unsur untuk melihat foto, struktur atom, sifat, dan molekul yang mengandungnya.',
    'All 118 elements with official data from the PubChem (NIH) periodic table. Choose an element for its photo, atomic structure, properties and molecules.',
  ],
  colour: ['Warnai menurut', 'Colour by'],
  category: ['Kategori', 'Category'],
  state: ['Wujud pada 25 °C', 'State at 25 °C'],
  block: ['Blok', 'Block'],
  eneg: ['Keelektronegatifan', 'Electronegativity'],
  rad: ['Jari-jari atom (pm)', 'Atomic radius (pm)'],
  ie: ['Energi ionisasi (eV)', 'Ionisation energy (eV)'],
  mp: ['Titik leleh (K)', 'Melting point (K)'],
  d: ['Massa jenis (g/cm³)', 'Density (g/cm³)'],
  year: ['Tahun ditemukan', 'Year discovered'],
  solid: ['Padat', 'Solid'],
  liquid: ['Cair', 'Liquid'],
  gas: ['Gas', 'Gas'],
  unknownState: ['Belum diketahui', 'Unknown'],
  noData: ['tidak ada data', 'no data'],
  ancient: ['sejak zaman kuno', 'known since antiquity'],
  listView: ['Tampilkan sebagai daftar', 'Show as a list'],
  filter: ['Cari unsur', 'Find element'],
  all: ['Semua', 'All'],
  shown: ['{n} dari 118 unsur ditampilkan', '{n} of 118 elements shown'],
  clear: ['Hapus filter', 'Clear filters'],
  lanth: ['Lantanida', 'Lanthanides'],
  act: ['Aktinida', 'Actinides'],
  low: ['rendah', 'low'],
  high: ['tinggi', 'high'],
});

export const title = () => s.title;

const HEAT = ['eneg', 'rad', 'ie', 'mp', 'd', 'year'];
const STATE_COLORS = { solid: '#7c8aa5', liquid: '#3f8fd6', gas: '#e0913c' };
const BLOCK_COLORS = { s: '#e8663d', p: '#d4b83a', d: '#3fb5a3', f: '#b36fd6' };

function heat(t) {
  // Perceptually ordered blue → teal → yellow → red ramp.
  const stops = [
    [49, 99, 181],
    [45, 170, 160],
    [233, 196, 70],
    [214, 79, 60],
  ];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  const f = x - i;
  const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f));
  return `rgb(${c.join(',')})`;
}

const STATES = ['solid', 'liquid', 'gas'];

export function render({ main, params }) {
  let mode = params.get('by') || 'category';
  if (![...HEAT, 'category', 'state', 'block'].includes(mode)) mode = 'category';
  const filters = {
    q: params.get('q') || '',
    cat: Object.hasOwn(CATEGORIES, params.get('cat') || '') ? params.get('cat') : '',
    blk: ['s', 'p', 'd', 'f'].includes(params.get('blk')) ? params.get('blk') : '',
    st: STATES.includes(params.get('st')) ? params.get('st') : '',
  };

  const tile = e =>
    `<a class="el-tile" href="/atom/${e.s}" data-z="${e.z}" style="grid-column:${e.x};grid-row:${e.y}" aria-label="${esc(
      `${pick([e.id, e.en])}, ${e.s}, ${pick(['nomor atom', 'atomic number'])} ${e.z}`
    )}"><span class="z">${e.z}</span><span class="sym">${esc(e.s)}</span><span class="nm">${esc(pick([e.id, e.en]))}</span><span class="val" data-val></span></a>`;

  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <div class="table-tools">
      <div class="field"><label for="pt-by">${esc(s.colour)}</label>
        <select id="pt-by">
          <option value="category">${esc(s.category)}</option>
          <option value="state">${esc(s.state)}</option>
          <option value="block">${esc(s.block)}</option>
          ${HEAT.map(k => `<option value="${k}">${esc(s[k])}</option>`).join('')}
        </select></div>
      <div class="field"><label for="pt-find">${esc(s.filter)}</label><input id="pt-find" type="search" value="${esc(filters.q)}" placeholder="Fe, emas, oxygen…" autocomplete="off" /></div>
      <div class="field"><label for="pt-cat">${esc(s.category)}</label><select id="pt-cat"><option value="">${esc(s.all)}</option>${Object.entries(
        CATEGORIES
      )
        .map(([k, c]) => `<option value="${k}">${esc(pick(c.name))}</option>`)
        .join('')}</select></div>
      <div class="field"><label for="pt-blk">${esc(s.block)}</label><select id="pt-blk"><option value="">${esc(s.all)}</option>${['s', 'p', 'd', 'f'].map(b => `<option value="${b}">${esc(pick(['Blok', 'Block']))} ${b}</option>`).join('')}</select></div>
      <div class="field"><label for="pt-st">${esc(s.state)}</label><select id="pt-st"><option value="">${esc(s.all)}</option>${STATES.map(k => `<option value="${k}">${esc(s[k])}</option>`).join('')}</select></div>
    </div>
    <p class="muted small" data-shown aria-live="polite"></p>
    <div class="pt-scroll" tabindex="0" aria-label="${esc(s.title)}">
      <div class="ptable" data-ptable>
        ${ELEMENTS.map(tile).join('')}
        <span class="pt-gap" style="grid-column:3;grid-row:6" aria-hidden="true">57–71</span>
        <span class="pt-gap" style="grid-column:3;grid-row:7" aria-hidden="true">89–103</span>
        <span class="pt-rowlabel" style="grid-column:1 / span 2;grid-row:9">${esc(s.lanth)}</span>
        <span class="pt-rowlabel" style="grid-column:1 / span 2;grid-row:10">${esc(s.act)}</span>
      </div>
    </div>
    <div class="pt-legend" data-legend aria-live="polite"></div>
    <details class="pt-list"><summary>${esc(s.listView)}</summary>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th scope="col">Z</th><th scope="col">${esc(pick(['Lambang', 'Symbol']))}</th><th scope="col">${esc(pick(['Nama', 'Name']))}</th><th scope="col">${esc(s.category)}</th><th scope="col">${esc(pick(['Massa (u)', 'Mass (u)']))}</th><th scope="col">${esc(s.eneg)}</th></tr></thead>
        <tbody>${ELEMENTS.map(
          e =>
            `<tr><td>${e.z}</td><td><a href="/atom/${e.s}">${esc(e.s)}</a></td><td>${esc(pick([e.id, e.en]))}</td><td>${esc(pick(CATEGORIES[e.cat].name))}</td><td>${e.m ?? '–'}</td><td>${e.eneg ?? '–'}</td></tr>`
        ).join('')}</tbody>
      </table></div>
    </details>
  </div>`;

  const select = $('#pt-by', main);
  select.value = mode;
  const tiles = $$('.el-tile', main);

  function paint() {
    const legend = $('[data-legend]', main);
    if (mode === 'category' || mode === 'state' || mode === 'block') {
      for (const t of tiles) {
        const e = ELEMENTS[t.dataset.z - 1];
        const color =
          mode === 'category'
            ? CATEGORIES[e.cat].color
            : mode === 'state'
              ? STATE_COLORS[e.state] || '#9aa3b2'
              : BLOCK_COLORS[e.block];
        t.style.setProperty('--tile', color);
        t.querySelector('[data-val]').textContent = '';
        t.classList.remove('no-data');
      }
      const items =
        mode === 'category'
          ? Object.values(CATEGORIES).map(c => [c.color, pick(c.name)])
          : mode === 'state'
            ? [
                ['solid', s.solid],
                ['liquid', s.liquid],
                ['gas', s.gas],
              ]
                .map(([k, l]) => [STATE_COLORS[k], l])
                .concat([['#9aa3b2', s.unknownState]])
            : Object.entries(BLOCK_COLORS).map(([k, c]) => [c, `${pick(['Blok', 'Block'])} ${k}`]);
      legend.innerHTML = `<ul class="legend">${items.map(([c, l]) => `<li><span class="dot" style="background:${c}"></span>${esc(l)}</li>`).join('')}</ul>`;
      return;
    }
    const values = ELEMENTS.map(e => (mode === 'year' ? (e.year === 0 ? 1600 : e.year) : e[mode])).filter(
      v => v != null
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const scale = v =>
      mode === 'd' || mode === 'mp'
        ? Math.log(v - min + 1) / Math.log(max - min + 1)
        : (v - min) / (max - min || 1);
    for (const t of tiles) {
      const e = ELEMENTS[t.dataset.z - 1];
      const raw = mode === 'year' ? (e.year === 0 ? 1600 : e.year) : e[mode];
      const val = t.querySelector('[data-val]');
      if (raw == null) {
        t.style.setProperty('--tile', '#9aa3b2');
        t.classList.add('no-data');
        val.textContent = '';
      } else {
        t.style.setProperty('--tile', heat(scale(raw)));
        t.classList.remove('no-data');
        val.textContent =
          mode === 'year' ? (e.year === 0 ? '…' : e.year) : num(raw, mode === 'd' || mode === 'eneg' ? 2 : 1);
      }
    }
    legend.innerHTML = `<div class="heat-legend"><span>${esc(s.low)} ${mode === 'year' ? '(…)' : num(min, 2)}</span><span class="heat-bar" aria-hidden="true"></span><span>${esc(s.high)} ${num(max, 2)}</span></div>
      <p class="muted small">${esc(s[mode])}${mode === 'year' ? ` · … = ${esc(s.ancient)}` : ''} · ${esc(pick(['abu-abu', 'grey']))} = ${esc(s.noData)} · PubChem</p>`;
  }

  select.addEventListener('change', () => {
    mode = select.value;
    replaceQuery({ by: mode === 'category' ? '' : mode, ...filters });
    paint();
  });
  function filter() {
    const q = filters.q.trim().toLowerCase();
    let shown = 0;
    for (const t of tiles) {
      const el = ELEMENTS[t.dataset.z - 1];
      const hit =
        (!q ||
          el.s.toLowerCase() === q ||
          el.id.toLowerCase().includes(q) ||
          el.en.toLowerCase().includes(q) ||
          String(el.z) === q) &&
        (!filters.cat || el.cat === filters.cat) &&
        (!filters.blk || el.block === filters.blk) &&
        (!filters.st || el.state === filters.st);
      t.classList.toggle('is-dim', !hit);
      if (hit) {
        t.removeAttribute('tabindex');
        shown++;
      } else t.setAttribute('tabindex', '-1');
    }
    const any = filters.q || filters.cat || filters.blk || filters.st;
    $('[data-shown]', main).innerHTML = any
      ? `${esc(fmt(s.shown, { n: shown }))} · <button class="btn-link" type="button" data-clear>${esc(s.clear)}</button>`
      : '';
  }
  const setFilter = (key, value) => {
    filters[key] = value;
    replaceQuery({ by: mode === 'category' ? '' : mode, ...filters });
    filter();
  };
  $('#pt-find', main).addEventListener('input', e => setFilter('q', e.target.value));
  for (const [id, key] of [
    ['#pt-cat', 'cat'],
    ['#pt-blk', 'blk'],
    ['#pt-st', 'st'],
  ]) {
    $(id, main).value = filters[key];
    $(id, main).addEventListener('change', e => setFilter(key, e.target.value));
  }
  $('[data-shown]', main).addEventListener('click', e => {
    if (!e.target.closest('[data-clear]')) return;
    for (const k of Object.keys(filters)) filters[k] = '';
    for (const id of ['#pt-find', '#pt-cat', '#pt-blk', '#pt-st']) $(id, main).value = '';
    replaceQuery({ by: mode === 'category' ? '' : mode });
    filter();
  });
  paint();
  filter();
}
