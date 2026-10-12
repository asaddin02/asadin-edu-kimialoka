// Crystals & materials: explore lattices and nanostructures in 3D with their coordination and packing.
import { esc } from '../core/dom.js';
import { S, pick } from '../core/prefs.js';
import { Viewer3D } from '../components/moleculeViewer3D.js';
import { buildLattice, LATTICES } from '../services/lattice.js';
import { getMolecule } from '../data/curatedMolecules.js';

const s = S({
  choose: ['Pilih struktur', 'Choose a structure'],
  cn: ['Bilangan koordinasi', 'Coordination number'],
  pack: ['Efisiensi pengepakan', 'Packing efficiency'],
  atoms: ['{n} atom ditampilkan', '{n} atoms shown'],
  cell: ['Garis putus-putus menandai satu sel satuan.', 'Dashed lines mark one unit cell.'],
  open: ['Buka profil', 'Open profile'],
  style: ['Tampilan', 'Style'],
  ball: ['Bola & batang', 'Ball & stick'],
  space: ['Ruang penuh', 'Space-filling'],
});

const PRESETS = [
  { key: 'nacl', type: 'rocksalt', el: ['Na', 'Cl'], mol: 'sodium-chloride', label: 'NaCl' },
  { key: 'cscl', type: 'cscl', el: ['Cs', 'Cl'], label: 'CsCl' },
  { key: 'caf2', type: 'fluorite', el: ['Ca', 'F'], mol: 'calcium-fluoride', label: 'CaF₂' },
  { key: 'gaas', type: 'zincblende', el: ['Ga', 'As'], mol: 'gallium-arsenide', label: 'GaAs' },
  { key: 'zno', type: 'wurtzite', el: ['Zn', 'O'], mol: 'zinc-oxide', label: 'ZnO' },
  { key: 'diamond', type: 'diamond', el: ['C'], mol: 'diamond', label: 'C (intan/diamond)' },
  { key: 'si', type: 'diamond', el: ['Si'], mol: 'silicon', label: 'Si' },
  { key: 'sio2', type: 'cristobalite', el: ['Si', 'O'], mol: 'silicon-dioxide', label: 'SiO₂' },
  { key: 'graphite', type: 'graphite', el: ['C'], mol: 'graphite', label: 'C (grafit/graphite)' },
  { key: 'graphene', type: 'graphene', el: ['C'], mol: 'graphene', label: 'C (grafena/graphene)' },
  { key: 'c60', type: 'c60', el: ['C'], mol: 'fullerene-c60', label: 'C₆₀' },
  { key: 'cnt', type: 'nanotube', el: ['C'], mol: 'carbon-nanotube', label: 'CNT (10,0)' },
  { key: 'cu', type: 'fcc', el: ['Cu'], mol: 'copper', label: 'Cu (fcc)' },
  { key: 'fe', type: 'bcc', el: ['Fe'], mol: 'iron', label: 'Fe (bcc)' },
  { key: 'ti', type: 'hcp', el: ['Ti'], mol: 'titanium', label: 'Ti (hcp)' },
  { key: 'tio2', type: 'rutile', el: ['Ti', 'O'], mol: 'titanium-dioxide', label: 'TiO₂ (rutil/rutile)' },
  { key: 'catio3', type: 'perovskite', el: ['Ca', 'Ti', 'O'], mol: 'calcium-titanate', label: 'CaTiO₃' },
];

export function mount(host) {
  let current = PRESETS[0];
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="field"><label for="k-pick">${esc(s.choose)}</label><select id="k-pick">${PRESETS.map(p => `<option value="${p.key}">${esc(p.label)} · ${esc(pick(LATTICES[p.type].name))}</option>`).join('')}</select></div>
      <div class="seg" role="group" aria-label="${esc(s.style)}"><button type="button" class="seg-btn" data-mode="ball" aria-pressed="true">${esc(s.ball)}</button><button type="button" class="seg-btn" data-mode="space" aria-pressed="false">${esc(s.space)}</button></div>
      <div data-info aria-live="polite"></div>
    </div>
    <div class="card"><div class="viewer" data-viewer></div><p class="muted small">${esc(s.cell)}</p></div>
  </div>`;
  const viewer = new Viewer3D(host.querySelector('[data-viewer]'), { label: s.choose });
  function draw() {
    const data = buildLattice(current.type, current.el);
    const info = LATTICES[current.type];
    const metal = ['fcc', 'bcc', 'hcp'].includes(current.type);
    setMode(metal ? 'space' : 'ball');
    viewer.setData(data);
    const mol = current.mol && getMolecule(current.mol);
    host.querySelector('[data-info]').innerHTML = `<h3>${esc(pick(info.name))}</h3>
      <p><strong>${esc(s.cn)}:</strong> ${esc(info.cn)}${info.pack ? ` · <strong>${esc(s.pack)}:</strong> ${info.pack}%` : ''}</p>
      <p>${esc(pick(info.note))}</p>
      <p class="muted small">${esc(s.atoms.replace('{n}', data.atoms.length))}</p>
      ${mol ? `<a class="btn btn-small" href="/molecule/${mol.id}">${esc(s.open)}: ${esc(pick(mol.name))}</a>` : ''}`;
  }
  function setMode(mode) {
    viewer.setMode(mode);
    for (const b of host.querySelectorAll('[data-mode]'))
      b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
  }
  host.querySelector('#k-pick').addEventListener('change', e => {
    current = PRESETS.find(p => p.key === e.target.value);
    draw();
  });
  host.querySelector('.seg').addEventListener('click', e => {
    const b = e.target.closest('[data-mode]');
    if (b) setMode(b.dataset.mode);
  });
  draw();
  return () => viewer.destroy();
}
