// Isotope explorer: /isotope shows the chart of nuclides (N against Z, coloured by half-life) and an element's
// isotopes as a table; /isotope/<Symbol>-<A> is one nuclide: half-life, decay modes, daughter, abundance, uses.
// Data: IAEA Atomic Mass Data Center (NUBASE) and IUPAC CIAAW via PubChem (data/isotopes.json, data/elements/).
import { $, esc, debounce } from '../core/dom.js';
import { S, pick, fmt, num, atLeast } from '../core/prefs.js';
import { go, replaceQuery } from '../core/router.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, notice, extLink, errorState } from '../components/common.js';
import { getElement } from '../data/periodicTable.js';
import { NUCLEAR } from '../data/reactionLibrary.js';
import { isotopeIndex, elementRecord } from '../services/data.js';
import {
  DECAY,
  decayName,
  daughter,
  nuclideLabel,
  nuclideId,
  parseNuclide,
  halfLifeText,
  halfLifeBand,
  BANDS,
  nucHTML,
} from '../services/nuclide.js';

const s = S({
  title: ['Penjelajah isotop', 'Isotope explorer'],
  lead: [
    'Semua nuklida yang dikenal, dari hidrogen sampai oganeson: isotop stabil dan radioaktif, waktu paruh, cara meluruh, dan kelimpahan alaminya. Data IAEA Atomic Mass Data Center dan IUPAC CIAAW melalui PubChem.',
    'Every known nuclide, from hydrogen to oganesson: stable and radioactive isotopes, half-lives, decay modes and natural abundance. Data from the IAEA Atomic Mass Data Center and IUPAC CIAAW via PubChem.',
  ],
  search: ['Cari unsur atau isotop', 'Find an element or isotope'],
  placeholder: ['Contoh: karbon, U, C-14, 131I', 'e.g. carbon, U, C-14, 131I'],
  band: ['Waktu paruh', 'Half-life'],
  all: ['Semua', 'All'],
  natural: ['Hanya yang ada di alam', 'Naturally occurring only'],
  chart: ['Peta nuklida', 'Chart of nuclides'],
  chartLead: [
    'Setiap kotak adalah satu nuklida: ke kanan jumlah neutron (N), ke atas jumlah proton (Z). Nuklida stabil membentuk "lembah kestabilan"; makin jauh darinya, makin pendek waktu paruhnya. Arahkan kursor untuk detail, klik untuk membuka.',
    'Each square is one nuclide: neutrons (N) to the right, protons (Z) upwards. Stable nuclides form the "valley of stability"; the further away, the shorter the half-life. Hover for details, click to open.',
  ],
  tableHint: ['Pilih unsur untuk melihat tabel isotopnya.', 'Pick an element to see its isotope table.'],
  stats: [
    '{total} nuklida · {stable} stabil · {natural} ada di alam',
    '{total} nuclides · {stable} stable · {natural} occur in nature',
  ],
  isotopesOf: ['Isotop {name}', 'Isotopes of {name}'],
  nuclide: ['Nuklida', 'Nuclide'],
  halfLife: ['Waktu paruh', 'Half-life'],
  decay: ['Peluruhan utama', 'Main decay'],
  abundance: ['Kelimpahan alami', 'Natural abundance'],
  featured: ['Isotop yang sering dibahas', 'Isotopes you will meet'],
  notFound: ['Isotop tidak ditemukan.', 'Isotope not found.'],
  protons: ['Proton (Z)', 'Protons (Z)'],
  neutrons: ['Neutron (N)', 'Neutrons (N)'],
  massNumber: ['Nomor massa (A)', 'Mass number (A)'],
  atomicMass: ['Massa atom', 'Atomic mass'],
  discovered: ['Ditemukan', 'Discovered'],
  stable: ['Stabil (tidak pernah teramati meluruh)', 'Stable (never observed to decay)'],
  modes: ['Cara meluruh', 'Decay modes'],
  equation: ['Persamaan inti', 'Nuclear equation'],
  daughter: ['Hasil peluruhan', 'Decay product'],
  uses: ['Pemakaian isotop unsur ini', 'Uses of this element’s isotopes'],
  usesNote: [
    'Teks IUPAC Periodic Table of the Elements and Isotopes (CC BY-NC-ND 4.0), bahasa Inggris.',
    'Text from the IUPAC Periodic Table of the Elements and Isotopes (CC BY-NC-ND 4.0).',
  ],
  others: ['Isotop lain unsur ini', 'Other isotopes of this element'],
  estimated: ['Nilai perkiraan (belum terukur langsung)', 'Estimated value (not directly measured)'],
  source: ['Sumber data', 'Data source'],
  lesson: ['Materi: Isotop & kimia inti', 'Lesson: Isotopes & nuclear chemistry'],
  lab: ['Coba di lab Waktu paruh', 'Try it in the Half-life lab'],
  pctUnknown: ['persentase belum diketahui', 'branching not known'],
  unknownHalf: [
    'Waktu paruh belum diketahui (digambar sebagai kotak garis)',
    'Half-life not known (drawn as an outline)',
  ],
});

export const title = route => {
  if (!route.id) return s.title;
  const p = parseNuclide(route.id);
  return p ? `${p.element.s}-${p.A}` : s.title;
};

/** Ordinal ramp for half-life bands (one hue, light → dark; validated with the dataviz palette checker). */
const BAND_COLORS = {
  'sub-second': '#86b6ef',
  day: '#5598e7',
  millennium: '#2a78d6',
  long: '#1c5cab',
  stable: '#0d366b',
};
const BAND_ORDER = ['stable', 'long', 'millennium', 'day', 'sub-second', 'unknown'];
const FEATURED = [
  'H-1',
  'H-2',
  'H-3',
  'C-12',
  'C-14',
  'N-15',
  'O-18',
  'F-18',
  'K-40',
  'Co-60',
  'Sr-90',
  'Tc-99',
  'I-131',
  'Cs-137',
  'Rn-222',
  'Ra-226',
  'U-235',
  'U-238',
  'Pu-239',
];

export async function render({ id, main, params, isCurrent }) {
  main.innerHTML = `<div class="container">${loading()}</div>`;
  let rows;
  try {
    rows = await isotopeIndex();
  } catch {
    if (isCurrent()) main.innerHTML = `<div class="container">${errorState()}</div>`;
    return;
  }
  if (!isCurrent()) return;
  if (id) return renderNuclide(main, id, rows, isCurrent);

  const state = {
    q: params.get('q') || params.get('el') || '',
    band: params.get('band') || '',
    nat: params.get('nat') === '1',
  };
  const stats = {
    total: rows.length.toLocaleString(),
    stable: rows.filter(r => r.stable).length,
    natural: rows.filter(r => r.abundance).length,
  };
  main.innerHTML = `<div class="container isotope-page">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <p class="muted">${esc(fmt(s.stats, stats))}</p>
    <form class="filters" role="search" data-filters>
      <div class="field field-grow"><label for="iso-q">${esc(s.search)}</label><input id="iso-q" name="q" type="search" value="${esc(state.q)}" placeholder="${esc(s.placeholder)}" autocomplete="off" /></div>
      <div class="field"><label for="iso-band">${esc(s.band)}</label><select id="iso-band" name="band"><option value="">${esc(s.all)}</option>${BAND_ORDER.map(b => `<option value="${b}">${esc(pick(BANDS[b]))}</option>`).join('')}</select></div>
      <label class="check"><input type="checkbox" name="nat" ${state.nat ? 'checked' : ''} /> ${esc(s.natural)}</label>
    </form>
    <div data-hit></div>
    <section aria-labelledby="chart-title">
      <h2 id="chart-title">${esc(s.chart)}</h2>
      <p class="muted small">${esc(s.chartLead)}</p>
      <div class="nuclide-chart" data-chart></div>
      <ul class="legend" aria-label="${esc(s.band)}">${BAND_ORDER.map(
        b =>
          `<li><span class="dot ${b === 'unknown' ? 'dot-outline' : ''}" style="${b === 'unknown' ? '' : `background:${BAND_COLORS[b]}`}"></span>${esc(pick(BANDS[b]))}</li>`
      ).join('')}</ul>
    </section>
    <section aria-labelledby="table-title">
      <h2 id="table-title" data-table-title>${esc(s.featured)}</h2>
      <div data-table></div>
    </section>
  </div>`;
  const form = $('[data-filters]', main);
  form.elements.band.value = state.band;
  const tip = document.createElement('div');
  tip.className = 'chart-tip';
  tip.hidden = true;
  $('[data-chart]', main).append(tip);

  const draw = () => {
    const hit = parseNuclide(state.q);
    const el = hit ? hit.element : state.q.trim() ? getElement(state.q.trim()) : null;
    const filtered = rows.filter(
      r => (!state.band || halfLifeBand(r.seconds, r.stable) === state.band) && (!state.nat || r.abundance)
    );
    drawChart($('[data-chart]', main), filtered, el?.z, tip);
    const box = $('[data-hit]', main);
    box.innerHTML = hit
      ? `<p><a class="btn btn-primary" href="/isotope/${nuclideId(hit.element.s, hit.A)}">${esc(nuclideLabel(hit.A, hit.element.s))} · ${esc(pick([hit.element.id, hit.element.en]))}-${hit.A} ${icon('arrowRight', { size: 16 })}</a></p>`
      : '';
    const titleEl = $('[data-table-title]', main);
    if (el) {
      titleEl.textContent = fmt(s.isotopesOf, { name: pick([el.id, el.en]) });
      $('[data-table]', main).innerHTML = isotopeTable(
        filtered.filter(r => r.z === el.z),
        el
      );
    } else {
      titleEl.textContent = s.featured;
      const feat = FEATURED.map(parseNuclide)
        .filter(Boolean)
        .map(p => rows.find(r => r.z === p.element.z && r.A === p.A))
        .filter(Boolean);
      $('[data-table]', main).innerHTML =
        `${isotopeTable(feat)}<p class="muted small">${esc(s.tableHint)}</p>`;
    }
  };
  const update = debounce(() => {
    state.q = form.elements.q.value;
    state.band = form.elements.band.value;
    state.nat = form.elements.nat.checked;
    replaceQuery({ q: state.q, band: state.band, nat: state.nat ? '1' : '' });
    draw();
  }, 200);
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', e => e.preventDefault());
  draw();
}

function isotopeTable(list, el = null) {
  if (!list.length)
    return `<p class="muted">${esc(pick(['Tidak ada isotop yang cocok.', 'No isotopes match.']))}</p>`;
  return `<div class="table-wrap"><table class="data-table iso-table">
    <thead><tr><th scope="col">${esc(s.nuclide)}</th>${el ? '' : `<th scope="col">${esc(pick(['Unsur', 'Element']))}</th>`}<th scope="col">${esc(s.halfLife)}</th><th scope="col">${esc(s.decay)}</th><th scope="col">${esc(s.abundance)}</th></tr></thead>
    <tbody>${list
      .map(r => {
        const e = el || getElement(r.z);
        const band = halfLifeBand(r.seconds, r.stable);
        return `<tr>
          <th scope="row"><a href="/isotope/${nuclideId(e.s, r.A)}"><span class="dot ${band === 'unknown' ? 'dot-outline' : ''}" style="${band === 'unknown' ? '' : `background:${BAND_COLORS[band]}`}" aria-hidden="true"></span> ${esc(nuclideLabel(r.A, e.s))}</a></th>
          ${el ? '' : `<td><a href="/atom/${e.s}">${esc(pick([e.id, e.en]))}</a></td>`}
          <td>${esc(halfLifeText(r.half))}</td>
          <td>${r.stable ? '–' : esc(r.decay ? decayName(r.decay) : '–')}</td>
          <td>${r.abundance ? `<span class="mono">${esc(r.abundance)}</span>` : '–'}</td>
        </tr>`;
      })
      .join('')}</tbody></table></div>`;
}

/** Chart of nuclides as SVG: x = N, y = Z (upwards). The highlighted element's row is outlined. */
function drawChart(host, list, highlightZ, tip) {
  const cell = 5;
  const maxN = 180;
  const maxZ = 118;
  const pad = 26;
  const w = pad + maxN * cell + 8;
  const h = maxZ * cell + pad + 6;
  const y = z => h - pad - z * cell;
  const rects = list
    .map(r => {
      const n = r.A - r.z;
      const band = halfLifeBand(r.seconds, r.stable);
      const fill = BAND_COLORS[band];
      return `<rect x="${pad + n * cell}" y="${y(r.z)}" width="${cell - 0.6}" height="${cell - 0.6}" rx="0.8" ${fill ? `fill="${fill}"` : 'fill="none" stroke="#8b93a3" stroke-width="0.6"'} data-z="${r.z}" data-a="${r.A}"/>`;
    })
    .join('');
  const ticks = [0, 20, 40, 60, 80, 100, 120, 140, 160]
    .map(n => `<text x="${pad + n * cell}" y="${h - 8}" class="tick">${n}</text>`)
    .join('');
  const zticks = [0, 20, 40, 60, 80, 100]
    .map(z => `<text x="${pad - 4}" y="${y(z) + 4}" class="tick" text-anchor="end">${z}</text>`)
    .join('');
  const band = highlightZ
    ? `<rect x="${pad}" y="${y(highlightZ) - 1}" width="${maxN * cell}" height="${cell + 1}" class="row-highlight"/>`
    : '';
  const svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(s.chart)}: ${list.length} ${esc(pick(['nuklida', 'nuclides']))}">
    ${band}
    <line x1="${pad}" y1="${h - pad + 2}" x2="${w - 4}" y2="${h - pad + 2}" class="axis"/>
    <line x1="${pad - 2}" y1="4" x2="${pad - 2}" y2="${h - pad + 2}" class="axis"/>
    ${rects}${ticks}${zticks}
    <text x="${w - 6}" y="${h - 14}" class="axis-label" text-anchor="end">N →</text>
    <text x="${pad + 4}" y="12" class="axis-label">↑ Z</text>
  </svg>`;
  host.querySelector('svg')?.remove();
  host.insertAdjacentHTML('afterbegin', svg);
  const svgEl = host.querySelector('svg');
  const show = e => {
    const t = e.target.closest('rect[data-z]');
    if (!t) {
      tip.hidden = true;
      return;
    }
    const r = list.find(x => x.z === Number(t.dataset.z) && x.A === Number(t.dataset.a));
    const el = getElement(r.z);
    tip.innerHTML = `<strong>${esc(nuclideLabel(r.A, el.s))}</strong> · ${esc(pick([el.id, el.en]))}<br>Z ${r.z} · N ${r.A - r.z}<br>${esc(halfLifeText(r.half))}${r.decay && !r.stable ? ` · ${esc(r.decay)}` : ''}${r.abundance ? `<br>${esc(s.abundance)}: ${esc(r.abundance)}` : ''}`;
    const box = host.getBoundingClientRect();
    tip.style.left = `${Math.min(e.clientX - box.left + 12, box.width - 180)}px`;
    tip.style.top = `${e.clientY - box.top + 12}px`;
    tip.hidden = false;
  };
  svgEl.addEventListener('pointermove', show);
  svgEl.addEventListener('pointerleave', () => (tip.hidden = true));
  svgEl.addEventListener('click', e => {
    const t = e.target.closest('rect[data-z]');
    if (t) go(`/isotope/${nuclideId(getElement(Number(t.dataset.z)).s, t.dataset.a)}`);
  });
}

async function renderNuclide(main, id, rows, isCurrent) {
  const p = parseNuclide(id);
  const row = p && rows.find(r => r.z === p.element.z && r.A === p.A);
  if (!row) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/isotope">${esc(s.title)}</a></section>`;
    return;
  }
  const el = p.element;
  const rec = await elementRecord(el.z).catch(() => null);
  if (!isCurrent()) return;
  const detail = rec?.nuclides?.find(n => n.A === row.A && !n.iso) || null;
  const isomers = rec?.nuclides?.filter(n => n.A === row.A && n.iso) || [];
  const natural = rec?.natural?.find(n => n.A === row.A) || null;
  const band = halfLifeBand(row.seconds, row.stable);
  const modes = detail?.decay || (row.decay ? [{ mode: row.decay, pct: null, op: null }] : []);
  const label = nuclideLabel(row.A, el.s);
  const name = `${pick([el.id, el.en])}-${row.A}`;
  const others = rows.filter(r => r.z === el.z && r.A !== row.A);
  const nearest = others
    .filter(r => r.stable || r.abundance || (r.seconds && r.seconds > 86400))
    .slice(0, 16);
  const reaction = NUCLEAR.find(r => r.r[0][0] === row.A && r.r[0][1] === el.z);
  const isoUses = (rec?.isotopeUses || []).filter(u =>
    new RegExp(`(^|\\D)${row.A}\\s?${el.s}\\b`).test(u.text)
  );
  const refs = rec?.refs || {};

  const facts = [
    [s.protons, el.z],
    [s.neutrons, row.A - el.z],
    [s.massNumber, row.A],
    detail?.mass ? [s.atomicMass, `${detail.mass} u${detail.est ? ` (${s.estimated})` : ''}`] : null,
    [s.halfLife, row.stable ? s.stable : halfLifeText(row.half, atLeast('sma'))],
    row.abundance
      ? [
          s.abundance,
          `${row.abundance}${natural?.mass && atLeast('kuliah') ? ` · ${pick(['massa', 'mass'])} ${natural.mass} u` : ''}`,
        ]
      : null,
    detail?.year ? [s.discovered, detail.year] : null,
  ].filter(Boolean);

  const modeRows = modes
    .map(m => {
      const d = daughter(el.z, row.A, m.mode);
      const pct =
        m.pct != null
          ? `${m.op && m.op !== '=' ? `${m.op} ` : ''}${num(m.pct, 4)}%`
          : m.op === '?'
            ? s.pctUnknown
            : '';
      return `<tr><td>${DECAY[m.mode]?.glossary ? `<a href="/glossary/${DECAY[m.mode].glossary}">${esc(decayName(m.mode))}</a>` : esc(decayName(m.mode))}</td><td>${esc(pct)}</td><td>${
        d
          ? `<a href="/isotope/${nuclideId(d.element.s, d.A)}">${esc(nuclideLabel(d.A, d.element.s))}</a> (${esc(pick([d.element.id, d.element.en]))})`
          : '–'
      }</td></tr>`;
    })
    .join('');
  const main1 = modes[0] ? daughter(el.z, row.A, modes[0].mode) : null;
  const eq = main1 ? equation(row.A, el, main1, modes[0].mode) : '';

  main.innerHTML = `<article class="container nuclide-page">
    ${breadcrumbs([
      [s.title, '/isotope'],
      [pick([el.id, el.en]), `/isotope?q=${el.s}`],
      [label, ''],
    ])}
    <header class="mol-head">
      <div class="mol-titles">
        <p class="formula formula-lg">${esc(label)}</p>
        <h1>${esc(name)}</h1>
        <p class="mol-badges"><span class="chip"><span class="dot ${band === 'unknown' ? 'dot-outline' : ''}" style="${band === 'unknown' ? '' : `background:${BAND_COLORS[band]}`}" aria-hidden="true"></span> ${esc(pick(BANDS[band]))}</span> <a class="chip" href="/atom/${el.s}">${esc(pick(['Profil unsur', 'Element profile']))}: ${esc(pick([el.id, el.en]))}</a></p>
      </div>
    </header>
    <div class="grid grid-2">
      <div class="card"><table class="data-table"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>
      <div class="card">
        <h2 class="h-small">${esc(s.modes)}</h2>
        ${row.stable ? `<p>${esc(s.stable)}.</p>` : modes.length ? `<table class="data-table"><thead><tr><th scope="col">${esc(pick(['Mode', 'Mode']))}</th><th scope="col">%</th><th scope="col">${esc(s.daughter)}</th></tr></thead><tbody>${modeRows}</tbody></table>` : `<p class="muted">–</p>`}
        ${eq ? `<p><strong>${esc(s.equation)}:</strong> <span class="equation-inline">${eq}</span></p>` : ''}
        ${!row.stable ? `<p><a href="/lab/paruh?z=${el.z}&a=${row.A}">${icon('flask', { size: 16 })} ${esc(s.lab)}</a></p>` : ''}
      </div>
    </div>
    ${isomers.length && atLeast('kuliah') ? notice(esc(pick([`Nuklida ini juga punya ${isomers.length} keadaan isomer (tereksitasi), misalnya ${row.A}${el.s}${isomers[0].iso} dengan waktu paruh ${halfLifeText(isomers[0].half)}.`, `This nuclide also has ${isomers.length} isomeric (excited) state(s), e.g. ${row.A}${el.s}${isomers[0].iso} with a half-life of ${halfLifeText(isomers[0].half)}.`]))) : ''}
    ${reaction ? `<p><a class="chip chip-lg" href="/reaction/${reaction.id}">${icon('flask', { size: 14 })} ${esc(pick(reaction.name))}</a></p>` : ''}
    ${
      isoUses.length
        ? `<section class="mol-section"><h2>${esc(s.uses)}</h2>${isoUses
            .map(
              u =>
                `<blockquote lang="en"><p>${esc(u.text)}</p><footer>${esc(u.topic)} · ${refs[u.source] ? extLink(refs[u.source].url, refs[u.source].name) : esc(u.source)}</footer></blockquote>`
            )
            .join('')}<p class="muted small">${esc(s.usesNote)}</p></section>`
        : ''
    }
    <section class="mol-section"><h2>${esc(s.others)}</h2>
      <p class="chip-grid">${nearest.map(r => `<a class="chip" href="/isotope/${nuclideId(el.s, r.A)}">${esc(nuclideLabel(r.A, el.s))}${r.stable ? ` · ${esc(pick(['stabil', 'stable']))}` : ''}</a>`).join(' ')}</p>
      <p><a href="/isotope?q=${el.s}">${esc(fmt(s.isotopesOf, { name: pick([el.id, el.en]) }))} (${others.length + 1})</a></p>
    </section>
    <p class="source-line">${esc(s.source)}: ${[refs.amdc ? extLink(refs.amdc.url, 'IAEA Atomic Mass Data Center') : 'IAEA AMDC', refs.ciaaw ? extLink(refs.ciaaw.url, 'IUPAC CIAAW') : '', extLink(`https://pubchem.ncbi.nlm.nih.gov/element/${el.z}#section=Isotopes`, 'PubChem')].filter(Boolean).join(' · ')} · <a href="/learn/nuklir">${esc(s.lesson)}</a></p>
  </article>`;
}

/** "¹⁴₆C → ¹⁴₇N + ⁰₋₁e" for the main decay mode. */
function equation(A, el, d, mode) {
  const nuc = nucHTML;
  const emitted = {
    'β-': nuc(0, '−1', 'e'),
    'β+': nuc(0, '+1', 'e'),
    α: nuc(4, 2, 'He'),
    p: nuc(1, 1, 'p'),
    '2p': `2 ${nuc(1, 1, 'p')}`,
    n: nuc(1, 0, 'n'),
    '2n': `2 ${nuc(1, 0, 'n')}`,
    IT: 'γ',
    '2β-': `2 ${nuc(0, '−1', 'e')}`,
    '2β+': `2 ${nuc(0, '+1', 'e')}`,
    'β-n': `${nuc(0, '−1', 'e')} + ${nuc(1, 0, 'n')}`,
    'β+p': `${nuc(0, '+1', 'e')} + ${nuc(1, 1, 'p')}`,
  };
  const left =
    mode === 'ε' || mode === 'EC' ? `${nuc(A, el.z, el.s)} + ${nuc(0, '−1', 'e')}` : nuc(A, el.z, el.s);
  const right =
    mode === 'ε' || mode === 'EC'
      ? nuc(d.A, d.z, d.element.s)
      : `${nuc(d.A, d.z, d.element.s)}${emitted[mode] ? ` + ${emitted[mode]}` : ''}`;
  return `${left} → ${right}`;
}
