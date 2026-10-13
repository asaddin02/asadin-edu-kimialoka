// Molecule builder: combine atoms, check valence (degree of unsaturation) and find real isomers in PubChem.
import { esc } from '../core/dom.js';
import { S, pick, fmt, num } from '../core/prefs.js';
import { liveCard, moleculeCard } from '../components/cards.js';
import { loading, notice } from '../components/common.js';
import { MOLECULES } from '../data/curatedMolecules.js';
import { getElement } from '../data/periodicTable.js';
import { moleculeIndex } from '../services/data.js';
import { cidsByFormula, summaries } from '../services/pubchem.js';
import { hill, molarMass, formulaHTML } from '../services/formula.js';

const s = S({
  atoms: ['Atom penyusun', 'Atoms'],
  formula: ['Rumus', 'Formula'],
  mass: ['Massa molar', 'Molar mass'],
  dou: ['Derajat ketidakjenuhan (cincin + ikatan π)', 'Degree of unsaturation (rings + π bonds)'],
  valid: [
    'Kombinasi ini dapat membentuk molekul netral yang stabil.',
    'This combination can form a stable neutral molecule.',
  ],
  invalid: [
    'Jumlah atom H/halogen tidak cocok dengan valensi (derajat ketidakjenuhan harus bilangan bulat ≥ 0).',
    'The H/halogen count does not fit the valences (the degree of unsaturation must be a whole number ≥ 0).',
  ],
  search: ['Cari isomer di PubChem', 'Find isomers in PubChem'],
  found: ['{n} senyawa nyata dengan rumus {f}', '{n} real compounds with formula {f}'],
  none: ['PubChem tidak memiliki senyawa dengan rumus ini.', 'PubChem has no compound with this formula.'],
  error: ['PubChem tidak dapat dihubungi.', 'PubChem could not be reached.'],
  presets: ['Coba', 'Try'],
  valence: [
    'Valensi: C 4 · N 3 · O 2 · S 2 · H dan halogen 1',
    'Valence: C 4 · N 3 · O 2 · S 2 · H and halogens 1',
  ],
  inCatalog: ['Di katalog Kimialoka', 'In the Kimialoka catalogue'],
});

const ATOMS = ['C', 'H', 'O', 'N', 'S', 'P', 'F', 'Cl', 'Br'];
const PRESETS = ['C2H6O', 'C4H10', 'C3H6O', 'C2H4O2', 'C6H6', 'C6H12O6', 'C8H10N4O2', 'C9H8O4'];

function countsOf(text) {
  const out = Object.fromEntries(ATOMS.map(a => [a, 0]));
  for (const [, el, n] of text.matchAll(/([A-Z][a-z]?)(\d*)/g)) if (el in out) out[el] += n ? Number(n) : 1;
  return out;
}

export function mount(host) {
  let counts = countsOf('C2H6O');
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <h3 class="h-small">${esc(s.atoms)}</h3>
      <div class="atom-counters">${ATOMS.map(
        a => `<div class="counter"><span class="counter-el" title="${esc(pick([getElement(a).id, getElement(a).en]))}">${a}</span>
          <button type="button" class="icon-btn" data-dec="${a}" aria-label="− ${a}">−</button>
          <output data-count="${a}">0</output>
          <button type="button" class="icon-btn" data-inc="${a}" aria-label="+ ${a}">+</button></div>`
      ).join('')}</div>
      <p class="muted small">${esc(s.valence)}</p>
      <p>${esc(s.presets)}: ${PRESETS.map(p => `<button type="button" class="chip" data-preset="${p}">${formulaHTML(p)}</button>`).join(' ')}</p>
    </div>
    <div class="card" data-summary aria-live="polite"></div>
    <div class="lab-wide" data-results></div>
  </div>`;

  function summary() {
    const f = hill(Object.fromEntries(Object.entries(counts).filter(([, n]) => n > 0)));
    const X = counts.F + counts.Cl + counts.Br;
    const dou = counts.C + 1 + (counts.N + counts.P) / 2 - (counts.H + X) / 2;
    const ok = counts.C + counts.N + counts.O + counts.S + counts.P > 0 && dou >= 0 && Number.isInteger(dou);
    for (const a of ATOMS) host.querySelector(`[data-count="${a}"]`).textContent = counts[a];
    host.querySelector('[data-summary]').innerHTML =
      `<p class="formula formula-lg">${f ? formulaHTML(f) : '—'}</p>
      <p><strong>${esc(s.mass)}:</strong> ${num(molarMass(counts), 3)} g/mol</p>
      <p><strong>${esc(s.dou)}:</strong> ${Number.isInteger(dou) ? dou : num(dou, 1)}</p>
      ${notice(esc(ok ? s.valid : s.invalid), ok ? 'info' : 'warn')}
      <button class="btn btn-primary" type="button" data-find ${ok ? '' : 'disabled'}>${esc(s.search)}</button>`;
    return { f, ok };
  }

  async function search() {
    const { f } = summary();
    const box = host.querySelector('[data-results]');
    box.innerHTML = `<div class="card">${loading()}</div>`;
    try {
      const idx = await moleculeIndex();
      const local = MOLECULES.filter(m => idx.get(m.id)?.formula === f);
      const known = new Set(local.map(m => m.cid));
      const cids = (await cidsByFormula(f, 30)).filter(c => !known.has(c)).slice(0, 24);
      const rows = await summaries(cids);
      box.innerHTML = `<div class="card"><h3>${esc(fmt(s.found, { n: rows.length + local.length, f }))}</h3>
        ${local.length ? `<h4 class="h-small">${esc(s.inCatalog)}</h4><div class="grid grid-cards">${local.map(m => moleculeCard(m, idx.get(m.id))).join('')}</div>` : ''}
        ${rows.length ? `<div class="grid grid-cards">${rows.map(r => liveCard(r)).join('')}</div>` : local.length ? '' : `<p>${esc(s.none)}</p>`}</div>`;
    } catch {
      box.innerHTML = notice(esc(s.error), 'warn');
    }
  }

  host.addEventListener('click', e => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const preset = e.target.closest('[data-preset]');
    if (inc) counts[inc.dataset.inc] = Math.min(60, counts[inc.dataset.inc] + 1);
    if (dec) counts[dec.dataset.dec] = Math.max(0, counts[dec.dataset.dec] - 1);
    if (preset) counts = countsOf(preset.dataset.preset);
    if (inc || dec || preset) {
      summary();
      host.querySelector('[data-results]').innerHTML = '';
    }
    if (e.target.closest('[data-find]')) search();
  });
  summary();
}
