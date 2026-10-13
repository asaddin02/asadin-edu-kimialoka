// VSEPR: choose bonding and lone pairs, see the 3D electron-domain geometry and the molecular shape.
import { esc } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { Viewer3D } from '../components/moleculeViewer3D.js';
import { GEOMETRIES } from '../data/geometry.js';
import { MOLECULES } from '../data/curatedMolecules.js';

const s = S({
  bonds: ['Pasangan elektron ikatan (X)', 'Bonding pairs (X)'],
  lone: ['Pasangan elektron bebas (E)', 'Lone pairs (E)'],
  shape: ['Bentuk molekul', 'Molecular shape'],
  domains: ['{n} domain elektron', '{n} electron domains'],
  angle: ['Sudut ikatan', 'Bond angle'],
  hyb: ['Hibridisasi atom pusat', 'Central-atom hybridisation'],
  examples: ['Contoh di Kimialoka', 'Examples in Kimialoka'],
  exampleText: ['Contoh lain', 'Other examples'],
  legend: [
    'A = atom pusat · X = atom terikat · E = pasangan elektron bebas',
    'A = central atom · X = bonded atom · E = lone pair',
  ],
  invalid: [
    'Kombinasi ini tidak umum; coba jumlah domain 2–6.',
    'This combination is unusual; try 2–6 domains.',
  ],
  lpNote: [
    'Pasangan bebas menolak lebih kuat sehingga sudut ikatan sedikit mengecil dari nilai ideal.',
    'Lone pairs repel more strongly, so bond angles shrink slightly from the ideal.',
  ],
});

const KEY = {
  '2,0': 'linear',
  '3,0': 'trigonal-planar',
  '2,1': 'bent',
  '4,0': 'tetrahedral',
  '3,1': 'trigonal-pyramidal',
  '2,2': 'bent',
  '5,0': 'trigonal-bipyramidal',
  '4,1': 'seesaw',
  '3,2': 't-shaped',
  '2,3': 'linear',
  '6,0': 'octahedral',
  '5,1': 'square-pyramidal',
  '4,2': 'square-planar',
};
const EXTRA = {
  linear: 'CO₂, BeCl₂, HCN, XeF₂ (AX₂E₃)',
  'trigonal-planar': 'BF₃, SO₃, CH₂O',
  bent: 'H₂O, H₂S (AX₂E₂) · SO₂, O₃ (AX₂E)',
  tetrahedral: 'CH₄, CCl₄, NH₄⁺, SiH₄',
  'trigonal-pyramidal': 'NH₃, PH₃, H₃O⁺',
  'trigonal-bipyramidal': 'PCl₅, PF₅',
  seesaw: 'SF₄',
  't-shaped': 'ClF₃',
  octahedral: 'SF₆',
  'square-pyramidal': 'BrF₅, IF₅',
  'square-planar': 'XeF₄, [PtCl₄]²⁻',
};

function domains(total) {
  const t = 1 / Math.sqrt(3);
  switch (total) {
    case 2:
      return [
        [1, 0, 0],
        [-1, 0, 0],
      ];
    case 3:
      return [0, 120, 240].map(a => [Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180), 0]);
    case 4:
      return [
        [t, t, t],
        [t, -t, -t],
        [-t, t, -t],
        [-t, -t, t],
      ];
    // Equatorial positions first (lone pairs prefer them), then the two axial ones.
    case 5:
      return [
        ...[0, 120, 240].map(a => [Math.cos((a * Math.PI) / 180), Math.sin((a * Math.PI) / 180), 0]),
        [0, 0, 1],
        [0, 0, -1],
      ];
    // Axial pair first so that two lone pairs sit opposite each other (square planar).
    case 6:
      return [
        [0, 0, 1],
        [0, 0, -1],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
      ];
    default:
      return [];
  }
}

function model(bonds, lone) {
  const dirs = domains(bonds + lone);
  // Lone pairs take the first positions (equatorial for 5, trans pair for 6).
  const lp = bonds + lone === 5 || bonds + lone === 6 ? dirs.slice(0, lone) : dirs.slice(bonds);
  const bp = bonds + lone === 5 || bonds + lone === 6 ? dirs.slice(lone) : dirs.slice(0, bonds);
  const atoms = [
    ['A', 0, 0, 0],
    ...bp.map(d => ['X', d[0] * 1.6, d[1] * 1.6, d[2] * 1.6]),
    ...lp.map(d => ['E', d[0] * 1.0, d[1] * 1.0, d[2] * 1.0]),
  ];
  const links = bp.map((_, i) => [0, i + 1, 1]);
  return { atoms, bonds: links };
}

export function mount(host, { params }) {
  let bonds = 4;
  let lone = 0;
  const want = params?.get('shape');
  const found = Object.entries(KEY).find(([, v]) => v === want);
  if (found) [bonds, lone] = found[0].split(',').map(Number);
  if (want === 'bent') [bonds, lone] = [2, 2];

  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <fieldset><legend>${esc(s.bonds)}</legend><div class="seg" data-bonds>${[2, 3, 4, 5, 6].map(n => `<button type="button" class="seg-btn" data-n="${n}">${n}</button>`).join('')}</div></fieldset>
      <fieldset><legend>${esc(s.lone)}</legend><div class="seg" data-lone>${[0, 1, 2, 3].map(n => `<button type="button" class="seg-btn" data-n="${n}">${n}</button>`).join('')}</div></fieldset>
      <div data-info aria-live="polite"></div>
      <p class="muted small">${esc(s.legend)}</p>
    </div>
    <div class="card"><div class="viewer" data-viewer></div></div>
  </div>`;
  const viewer = new Viewer3D(host.querySelector('[data-viewer]'), { label: s.shape });

  function draw() {
    for (const b of host.querySelectorAll('[data-bonds] [data-n]'))
      b.setAttribute('aria-pressed', String(Number(b.dataset.n) === bonds));
    for (const b of host.querySelectorAll('[data-lone] [data-n]')) {
      const n = Number(b.dataset.n);
      b.setAttribute('aria-pressed', String(n === lone));
      b.disabled = !KEY[`${bonds},${n}`];
    }
    const key = KEY[`${bonds},${lone}`];
    const info = host.querySelector('[data-info]');
    if (!key) {
      info.innerHTML = `<p>${esc(s.invalid)}</p>`;
      return;
    }
    const g = GEOMETRIES[key];
    const axe = `AX${bonds > 1 ? String(bonds).replace(/\d/g, d => '₀₁₂₃₄₅₆'[d]) : ''}${lone ? `E${lone > 1 ? '₀₁₂₃'[lone] : ''}` : ''}`;
    const examples = MOLECULES.filter(m => m.geo === key).slice(0, 8);
    info.innerHTML = `<h3>${esc(pick(g.name))}</h3>
      <p><strong>${esc(axe)}</strong> · ${esc(fmt(s.domains, { n: bonds + lone }))}</p>
      <p><strong>${esc(s.angle)}:</strong> ${esc(g.angle)} · <strong>${esc(s.hyb)}:</strong> ${esc(g.hyb)}</p>
      ${lone ? `<p class="muted small">${esc(s.lpNote)}</p>` : ''}
      ${examples.length ? `<p><strong>${esc(s.examples)}:</strong> ${examples.map(m => `<a class="chip" href="/molecule/${m.id}">${esc(pick(m.name))}</a>`).join(' ')}</p>` : ''}
      <p class="muted small">${esc(s.exampleText)}: ${esc(EXTRA[key] || '')}</p>`;
    viewer.setData(model(bonds, lone));
    replaceQuery({ shape: key });
  }
  host.querySelector('[data-bonds]').addEventListener('click', e => {
    const b = e.target.closest('[data-n]');
    if (!b) return;
    bonds = Number(b.dataset.n);
    if (!KEY[`${bonds},${lone}`]) lone = 0;
    draw();
  });
  host.querySelector('[data-lone]').addEventListener('click', e => {
    const b = e.target.closest('[data-n]');
    if (!b || b.disabled) return;
    lone = Number(b.dataset.n);
    draw();
  });
  draw();
  return () => viewer.destroy();
}
