// Compare two molecules side by side: 3D models and key PubChem properties.
import { $, esc } from '../core/dom.js';
import { S, pick, num } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { pageHead, loading, notice } from '../components/common.js';
import { Viewer3D } from '../components/moleculeViewer3D.js';
import { pictogram } from '../components/ghs.js';
import { MOLECULES, getMolecule, normalize } from '../data/curatedMolecules.js';
import { moleculeRecord } from '../services/data.js';
import { compound } from '../services/pubchem.js';
import { buildLattice } from '../services/lattice.js';
import { formulaHTML } from '../services/formula.js';

const s = S({
  title: ['Bandingkan molekul', 'Compare molecules'],
  lead: [
    'Pilih dua molekul untuk membandingkan bentuk 3D, rumus, dan sifatnya dari PubChem.',
    'Pick two molecules to compare their 3D shapes, formulas and PubChem properties.',
  ],
  a: ['Molekul pertama', 'First molecule'],
  b: ['Molekul kedua', 'Second molecule'],
  choose: ['Pilih molekul', 'Choose a molecule'],
  property: ['Sifat', 'Property'],
  suggest: ['Pasangan menarik', 'Interesting pairs'],
  empty: ['Pilih dua molekul di atas.', 'Choose two molecules above.'],
  error: ['Data salah satu molekul tidak dapat dimuat.', 'One of the molecules could not be loaded.'],
});
const PAIRS = [
  ['water', 'hydrogen-sulfide'],
  ['ethanol', 'dimethyl-ether'],
  ['diamond', 'graphite'],
  ['butane', 'isobutane'],
  ['glucose', 'fructose'],
  ['stearic-acid', 'oleic-acid'],
  ['caffeine', 'theobromine'],
  ['carbon-dioxide', 'sulfur-dioxide'],
  ['testosterone', 'estradiol'],
  ['heme', 'chlorophyll-a'],
];

export const title = () => s.title;

async function load(key) {
  if (!key) return null;
  if (key.startsWith('cid/')) {
    const rec = await compound(Number(key.slice(4)));
    return rec ? { name: rec.props.title, rec, structure: rec.structure } : null;
  }
  const m = getMolecule(key);
  if (!m) return null;
  const rec = await moleculeRecord(m.id).catch(() => null);
  return {
    m,
    name: pick(m.name),
    rec,
    structure: m.lattice ? buildLattice(m.lattice.type, m.lattice.el) : rec?.structure,
  };
}

const first = (rec, key) => rec?.experimental?.find(e => e.key === key)?.values?.[0] || '–';

export async function render({ main, params, cleanup, isCurrent }) {
  const sorted = [...MOLECULES].sort((x, y) =>
    normalize(pick(x.name)).localeCompare(normalize(pick(y.name)))
  );
  const options = sel =>
    sorted
      .map(m => `<option value="${m.id}" ${sel === m.id ? 'selected' : ''}>${esc(pick(m.name))}</option>`)
      .join('');
  let a = params.get('a') || '';
  let b = params.get('b') || '';
  const liveOpt = key =>
    key.startsWith('cid/')
      ? `<option value="${esc(key)}" selected>PubChem ${esc(key.slice(4))}</option>`
      : '';

  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <div class="filters">
      <div class="field field-grow"><label for="c-a">${esc(s.a)}</label><select id="c-a"><option value="">${esc(s.choose)}</option>${liveOpt(a)}${options(a)}</select></div>
      <div class="field field-grow"><label for="c-b">${esc(s.b)}</label><select id="c-b"><option value="">${esc(s.choose)}</option>${liveOpt(b)}${options(b)}</select></div>
    </div>
    <p class="hero-try">${esc(s.suggest)}: ${PAIRS.map(([x, y]) => `<a class="chip" href="/compare?a=${x}&b=${y}">${esc(pick(getMolecule(x).name))} · ${esc(pick(getMolecule(y).name))}</a>`).join(' ')}</p>
    <div data-compare></div>
  </div>`;

  const viewers = [];
  cleanup(() => viewers.forEach(v => v.destroy()));

  async function draw() {
    viewers.splice(0).forEach(v => v.destroy());
    const box = $('[data-compare]', main);
    if (!a || !b) {
      box.innerHTML = `<p class="muted">${esc(s.empty)}</p>`;
      return;
    }
    box.innerHTML = loading();
    let A;
    let B;
    try {
      [A, B] = await Promise.all([load(a), load(b)]);
    } catch {}
    if (!isCurrent()) return;
    if (!A || !B) {
      box.innerHTML = notice(esc(s.error), 'warn');
      return;
    }
    const rows = [
      [
        pick(['Rumus', 'Formula']),
        x => (x.rec?.props?.formula ? formulaHTML(x.rec.props.formula) : '–'),
        true,
      ],
      [
        pick(['Massa molar', 'Molar mass']),
        x => (x.rec?.props?.mw ? `${num(x.rec.props.mw, 2)} g/mol` : '–'),
      ],
      [pick(['Titik leleh', 'Melting point']), x => first(x.rec, 'Melting Point')],
      [pick(['Titik didih', 'Boiling point']), x => first(x.rec, 'Boiling Point')],
      [pick(['Massa jenis', 'Density']), x => first(x.rec, 'Density')],
      [pick(['Kelarutan', 'Solubility']), x => first(x.rec, 'Solubility')],
      ['XLogP', x => x.rec?.props?.xlogp ?? '–'],
      [
        pick(['Donor/akseptor ikatan H', 'H-bond donors/acceptors']),
        x => `${x.rec?.props?.hbd ?? '–'} / ${x.rec?.props?.hba ?? '–'}`,
      ],
      ['TPSA (Å²)', x => (x.rec?.props?.tpsa != null ? num(x.rec.props.tpsa, 1) : '–')],
      [
        'GHS',
        x =>
          x.rec?.ghs?.pictograms?.length
            ? x.rec.ghs.pictograms.map(p => pictogram(p.code, 40)).join('')
            : x.rec?.ghs?.notClassified
              ? pick(['Tidak diklasifikasikan', 'Not classified'])
              : '–',
        true,
      ],
    ];
    box.innerHTML = `<div class="compare-grid">
      ${[A, B].map((x, i) => `<div class="card"><h2 class="h-small"><a href="/molecule/${esc(i ? b : a)}">${esc(x.name)}</a></h2><div class="viewer viewer-sm" data-v="${i}"></div></div>`).join('')}
    </div>
    <div class="table-wrap"><table class="data-table compare-table"><thead><tr><th scope="col">${esc(s.property)}</th><th scope="col">${esc(A.name)}</th><th scope="col">${esc(B.name)}</th></tr></thead>
      <tbody>${rows.map(([k, f, html]) => `<tr><th scope="row">${esc(k)}</th>${[A, B].map(x => `<td lang="${html ? '' : 'en'}">${html ? f(x) : esc(f(x))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="source-line">PubChem · ${esc(pick(['nilai eksperimen dalam bahasa aslinya', 'experimental values as published']))}</p>`;
    [A, B].forEach((x, i) => {
      const host = box.querySelector(`[data-v="${i}"]`);
      if (!x.structure?.atoms?.length) return;
      const v = new Viewer3D(host, { label: x.name });
      v.setData(x.structure);
      viewers.push(v);
    });
  }

  const onChange = () => {
    a = $('#c-a', main).value;
    b = $('#c-b', main).value;
    replaceQuery({ a, b });
    draw();
  };
  $('#c-a', main).addEventListener('change', onChange);
  $('#c-b', main).addEventListener('change', onChange);
  draw();
}
