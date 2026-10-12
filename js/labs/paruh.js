// Half-life lab: a sample of radioactive atoms decays at random. Each atom has the same chance of decaying in
// each time step, yet the sample as a whole halves every half-life. Real nuclides and their half-lives and main
// decay modes come from data/isotopes.json (IAEA AMDC via PubChem). /lab/paruh?z=6&a=14 opens carbon-14.
import { esc, reducedMotion } from '../core/dom.js';
import { S, pick, fmt, num, atLeast } from '../core/prefs.js';
import { getElement } from '../data/periodicTable.js';
import { isotopeIndex } from '../services/data.js';
import {
  decayName,
  daughter,
  nuclideLabel,
  nuclideId,
  halfLifeText,
  durationText,
} from '../services/nuclide.js';
import { slider, readSlider, lineChart, fitCanvas } from './kit.js';

const s = S({
  nuclide: ['Nuklida', 'Nuclide'],
  atoms: ['Jumlah atom awal', 'Atoms at the start'],
  halfLife: ['Waktu paruh', 'Half-life'],
  decay: ['Peluruhan utama', 'Main decay'],
  becomes: ['menjadi', 'becomes'],
  step: ['Lewati 1 waktu paruh', 'Skip 1 half-life'],
  play: ['Putar', 'Play'],
  pause: ['Jeda', 'Pause'],
  reset: ['Ulangi', 'Reset'],
  elapsed: ['Waktu berlalu: {n} × waktu paruh = {t}', 'Time passed: {n} × half-life = {t}'],
  left: ['Atom induk tersisa: {n} dari {n0} ({pct}%)', 'Parent atoms left: {n} of {n0} ({pct}%)'],
  expected: ['Menurut rumus N = N₀ × (½)ⁿ: {e}', 'By N = N₀ × (½)ⁿ: {e}'],
  legend: [
    'Kotak biru penuh = atom induk (belum meluruh) · kotak oranye bergaris = atom hasil peluruhan',
    'Solid blue square = parent atom (not yet decayed) · orange outlined square = decay product',
  ],
  chart: ['Atom induk tersisa terhadap waktu', 'Parent atoms left over time'],
  xAxis: ['Waktu (kelipatan waktu paruh)', 'Time (in half-lives)'],
  yAxis: ['Atom induk', 'Parent atoms'],
  theory: ['Garis putus-putus: perhitungan N₀ × (½)ⁿ', 'Dashed line: the calculation N₀ × (½)ⁿ'],
  randomNote: [
    'Setiap atom meluruh secara acak: kita tidak bisa menebak atom mana yang berikutnya. Namun untuk banyak atom, jumlahnya selalu tinggal sekitar separuh setiap satu waktu paruh. Coba jumlah atom kecil lalu besar, dan bandingkan dengan garis rumus.',
    'Each atom decays at random: nobody can say which one goes next. But with many atoms, about half are always left after each half-life. Try a small sample and then a large one, and compare with the formula line.',
  ],
  dating: ['Kalkulator umur (penanggalan radiometrik)', 'Age calculator (radiometric dating)'],
  datingLead: [
    'Jika sisa atom induk dalam sampel tinggal sekian persen, berapa waktu yang sudah berlalu? t = t½ × log₂(100 / sisa%).',
    'If a sample has only this percentage of its parent atoms left, how much time has passed? t = t½ × log₂(100 / remaining %).',
  ],
  remaining: ['Sisa atom induk', 'Parent atoms remaining'],
  age: ['Waktu yang berlalu: {t} ({n} × waktu paruh)', 'Time passed: {t} ({n} half-lives)'],
  datingNote: [
    'Penanggalan karbon-14 dipakai untuk sisa makhluk hidup sampai sekitar 50 ribu tahun; batuan yang jauh lebih tua memakai nuklida berwaktu paruh panjang seperti uranium-238 atau kalium-40.',
    'Carbon-14 dating works for remains of living things up to about 50 thousand years; much older rocks use long-lived nuclides such as uranium-238 or potassium-40.',
  ],
  open: ['Buka halaman nuklida', 'Open the nuclide page'],
  source: [
    'Waktu paruh dan cara meluruh: IAEA Atomic Mass Data Center (NUBASE) melalui PubChem.',
    'Half-lives and decay modes: IAEA Atomic Mass Data Center (NUBASE) via PubChem.',
  ],
  notRadioactive: [
    'Nuklida yang diminta stabil atau waktu paruhnya belum diketahui, jadi dipakai karbon-14.',
    'The requested nuclide is stable or has no known half-life, so carbon-14 is used instead.',
  ],
});

/** Nuclides offered in the menu: [Z, A], from everyday uses and dating to medicine and energy. */
const CHOICES = [
  [6, 14],
  [1, 3],
  [9, 18],
  [15, 32],
  [53, 131],
  [27, 60],
  [38, 90],
  [55, 137],
  [86, 222],
  [88, 226],
  [84, 210],
  [94, 239],
  [95, 241],
  [19, 40],
  [92, 235],
  [92, 238],
];
const PARENT = '#2a78d6';
const PRODUCT = '#c2571a';

export function mount(host, { params } = {}) {
  host.innerHTML = `<div class="state-loading" role="status"><span class="spinner" aria-hidden="true"></span></div>`;
  let alive = true;
  let stop = () => {};
  isotopeIndex()
    .then(rows => {
      if (alive) stop = start(host, rows, params);
    })
    .catch(() => {
      if (alive)
        host.innerHTML = `<p class="notice notice-warn">${esc(pick(['Data isotop gagal dimuat.', 'Isotope data failed to load.']))}</p>`;
    });
  return () => {
    alive = false;
    stop();
  };
}

function start(host, rows, params) {
  const find = (z, A) => rows.find(r => r.z === z && r.A === A && !r.stable && r.seconds);
  const options = CHOICES.map(([z, A]) => find(z, A)).filter(Boolean);
  const wantZ = Number(params?.get('z'));
  const wantA = Number(params?.get('a'));
  const asked = wantZ && wantA ? rows.find(r => r.z === wantZ && r.A === wantA) : null;
  const usable = asked && !asked.stable && asked.seconds ? asked : null;
  if (usable && !options.includes(usable)) options.unshift(usable);
  const label = r => {
    const e = getElement(r.z);
    return `${nuclideLabel(r.A, e.s)} · ${pick([e.id, e.en])}-${r.A} (${halfLifeText(r.half)})`;
  };

  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      ${asked && !usable ? `<p class="notice notice-warn">${esc(s.notRadioactive)}</p>` : ''}
      <div class="field"><label for="p-nuc">${esc(s.nuclide)}</label>
        <select id="p-nuc">${options.map((r, i) => `<option value="${i}">${esc(label(r))}</option>`).join('')}</select></div>
      ${slider({ id: 'p-n', label: s.atoms, min: 25, max: 500, step: 25, value: 200 })}
      <div data-info></div>
      <p class="btn-row">
        <button class="btn btn-primary" type="button" data-step>${esc(s.step)}</button>
        <button class="btn" type="button" data-play aria-pressed="false">${esc(s.play)}</button>
        <button class="btn" type="button" data-reset>${esc(s.reset)}</button>
      </p>
      <div data-stats aria-live="polite"></div>
      <p class="muted small">${esc(s.legend)}</p>
    </div>
    <div class="card"><canvas class="lab-canvas" aria-hidden="true"></canvas></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.chart)}</h3><div data-chart></div><p class="muted small">${esc(s.theory)}</p>
      <p class="muted">${esc(s.randomNote)}</p></div>
    ${
      atLeast('smp')
        ? `<div class="card lab-wide"><h3 class="h-small">${esc(s.dating)}</h3><p class="muted">${esc(s.datingLead)}</p>
      ${slider({ id: 'p-rem', label: s.remaining, min: 1, max: 99, step: 1, value: 25, unit: '%' })}
      <p data-age aria-live="polite"></p><p class="muted small">${esc(s.datingNote)}</p></div>`
        : ''
    }
    <p class="muted small lab-wide">${esc(s.source)}</p>
  </div>`;

  const select = host.querySelector('#p-nuc');
  if (usable) select.value = String(options.indexOf(usable));
  const box = fitCanvas(host.querySelector('canvas'), () => draw());
  // A step is 1/20 of a half-life, so the animation shows the smooth random decline.
  const SUB = 20;
  const pStep = 1 - 2 ** (-1 / SUB);
  let atoms = [];
  let n0 = 0;
  let ticks = 0;
  let series = [];
  let frame = 0;
  let playing = false;
  let last = 0;

  const current = () => options[Number(select.value)] || options[0];

  function info() {
    const r = current();
    const e = getElement(r.z);
    const d = r.decay ? daughter(r.z, r.A, r.decay) : null;
    host.querySelector('[data-info]').innerHTML = `<table class="data-table"><tbody>
      <tr><th scope="row">${esc(s.halfLife)}</th><td>${esc(halfLifeText(r.half, true))}</td></tr>
      <tr><th scope="row">${esc(s.decay)}</th><td>${esc(r.decay ? decayName(r.decay) : '–')}${
        d
          ? ` · ${esc(nuclideLabel(r.A, e.s))} ${esc(s.becomes)} <a href="/isotope/${nuclideId(d.element.s, d.A)}">${esc(nuclideLabel(d.A, d.element.s))}</a>`
          : ''
      }</td></tr></tbody></table>
      <p><a href="/isotope/${nuclideId(e.s, r.A)}">${esc(s.open)}</a></p>`;
  }

  function reset() {
    n0 = readSlider(host, 'p-n');
    atoms = Array.from({ length: n0 }, () => false);
    ticks = 0;
    series = [[0, n0]];
    info();
    draw();
    stats();
    chart();
    age();
  }

  function tick() {
    for (let i = 0; i < atoms.length; i++) if (!atoms[i] && Math.random() < pStep) atoms[i] = true;
    ticks++;
    series.push([ticks / SUB, atoms.filter(x => !x).length]);
  }

  function draw() {
    const { ctx, w, h } = box;
    if (!w) return;
    ctx.clearRect(0, 0, w, h);
    // Columns chosen so the squares fill the canvas whatever its shape.
    const cols = Math.max(5, Math.min(n0, Math.round(Math.sqrt((n0 * w) / h))));
    const rowsN = Math.ceil(n0 / cols);
    const size = Math.min((w - 8) / cols, (h - 8) / Math.max(rowsN, 1));
    const gap = Math.max(1, size * 0.14);
    const ox = (w - size * cols) / 2;
    const oy = (h - size * rowsN) / 2;
    atoms.forEach((decayed, i) => {
      const x = ox + (i % cols) * size + gap / 2;
      const y = oy + Math.floor(i / cols) * size + gap / 2;
      const a = size - gap;
      if (decayed) {
        ctx.strokeStyle = PRODUCT;
        ctx.lineWidth = Math.max(1, a * 0.16);
        ctx.strokeRect(x + ctx.lineWidth / 2, y + ctx.lineWidth / 2, a - ctx.lineWidth, a - ctx.lineWidth);
      } else {
        ctx.fillStyle = PARENT;
        ctx.fillRect(x, y, a, a);
      }
    });
  }

  function stats() {
    const r = current();
    const left = atoms.filter(x => !x).length;
    const n = ticks / SUB;
    host.querySelector('[data-stats]').innerHTML =
      `<p>${esc(fmt(s.elapsed, { n: num(n, 2), t: durationText(n * r.seconds) }))}</p>
      <p><strong>${esc(fmt(s.left, { n: left, n0, pct: num((left / n0) * 100, 1) }))}</strong></p>
      <p class="muted">${esc(fmt(s.expected, { e: num(n0 * 0.5 ** n, 1) }))}</p>`;
  }

  function chart() {
    const maxX = Math.max(4, Math.ceil(ticks / SUB));
    const theory = Array.from({ length: maxX * 10 + 1 }, (_, i) => [i / 10, n0 * 0.5 ** (i / 10)]);
    host.querySelector('[data-chart]').innerHTML = lineChart({
      series: [{ points: theory, cls: 'series-theory' }, { points: series }],
      xMin: 0,
      xMax: maxX,
      yMin: 0,
      yMax: n0,
      xLabel: s.xAxis,
      yLabel: s.yAxis,
      // N₀/2, N₀/4, … at each whole half-life (the last one is left unlabelled so it is not cut off at the edge).
      marks: Array.from({ length: Math.min(maxX - 1, 6) }, (_, i) => ({
        x: i + 1,
        y: n0 * 0.5 ** (i + 1),
        label: `N₀/${2 ** (i + 1)}`,
      })),
      label: `${s.chart}: ${series.at(-1)[1]} / ${n0}`,
    });
  }

  function age() {
    const out = host.querySelector('[data-age]');
    if (!out) return;
    const rem = readSlider(host, 'p-rem', '%');
    const n = Math.log2(100 / rem);
    out.innerHTML = `<strong>${esc(fmt(s.age, { t: durationText(n * current().seconds), n: num(n, 2) }))}</strong>`;
  }

  function advance(steps) {
    for (let i = 0; i < steps; i++) tick();
    draw();
    stats();
    chart();
    if (atoms.every(Boolean)) pause();
  }

  function play() {
    playing = true;
    host.querySelector('[data-play]').setAttribute('aria-pressed', 'true');
    host.querySelector('[data-play]').textContent = s.pause;
    const loop = t => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || t - last < 60) return;
      last = t;
      advance(1);
    };
    frame = requestAnimationFrame(loop);
  }
  function pause() {
    playing = false;
    cancelAnimationFrame(frame);
    const b = host.querySelector('[data-play]');
    b.setAttribute('aria-pressed', 'false');
    b.textContent = s.play;
  }

  host.querySelector('[data-step]').addEventListener('click', () => advance(SUB));
  host.querySelector('[data-play]').addEventListener('click', () => {
    if (playing) pause();
    else if (reducedMotion()) advance(SUB);
    else play();
  });
  host.querySelector('[data-reset]').addEventListener('click', () => {
    pause();
    reset();
  });
  select.addEventListener('change', () => {
    pause();
    reset();
  });
  host.querySelector('#p-n').addEventListener('input', () => readSlider(host, 'p-n'));
  host.querySelector('#p-n').addEventListener('change', () => {
    pause();
    reset();
  });
  host.querySelector('#p-rem')?.addEventListener('input', age);
  reset();
  return () => {
    pause();
    box.stop();
  };
}
