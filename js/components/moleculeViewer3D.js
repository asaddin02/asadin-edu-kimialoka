// Kimialoka 3D viewer: a dependency-free Canvas 2D renderer for molecules and crystal models.
// Drag / touch to rotate, wheel / pinch / +− to zoom, arrow keys to turn, Home to reset.
// Styles: ball-and-stick, space-filling (van der Waals radii) and wireframe. Atoms use CPK colours from PubChem.
import { getElement } from '../data/periodicTable.js';
import { reducedMotion } from '../core/dom.js';

// Van der Waals radii (Å, Bondi/Alvarez) for common elements; other elements fall back to 1.8 Å.
const VDW = {
  H: 1.2,
  He: 1.4,
  C: 1.7,
  N: 1.55,
  O: 1.52,
  F: 1.47,
  Ne: 1.54,
  Na: 2.27,
  Mg: 1.73,
  Al: 1.84,
  Si: 2.1,
  P: 1.8,
  S: 1.8,
  Cl: 1.75,
  Ar: 1.88,
  K: 2.75,
  Ca: 2.31,
  Ti: 2.11,
  Fe: 2.04,
  Co: 2.0,
  Ni: 1.63,
  Cu: 1.4,
  Zn: 1.39,
  Ga: 1.87,
  As: 1.85,
  Br: 1.85,
  Ag: 1.72,
  Sn: 2.17,
  I: 1.98,
  Xe: 2.16,
  W: 2.1,
  Pt: 1.75,
  Au: 1.66,
  Hg: 1.55,
  Pb: 2.02,
  Li: 1.82,
  B: 1.92,
  Be: 1.53,
  Cs: 3.43,
  A: 1.9,
  X: 1.6,
  E: 1.3,
};
const DARK_TEXT = new Set([
  'E',
  'H',
  'He',
  'F',
  'Cl',
  'S',
  'Ne',
  'Ar',
  'Li',
  'Na',
  'Mg',
  'Al',
  'Si',
  'Ca',
  'Zn',
  'Ag',
  'Pt',
  'Au',
  'Sn',
  'Ni',
  'B',
  'Be',
  'Ga',
  'Ti',
]);

// Pseudo-atoms for teaching models: A = central atom, X = bonded atom, E = lone pair.
const PSEUDO = { A: '#5b7bd5', X: '#3fb58c', E: '#c4b5fd' };

export function atomColor(symbol) {
  if (PSEUDO[symbol]) return PSEUDO[symbol];
  const e = getElement(symbol);
  if (!e?.cpk) return '#b0b7c3';
  // PubChem gives carbon as #909090 and hydrogen as white; both read well on light and dark stages.
  return e.cpk === '#ffffff' ? '#f4f6f8' : e.cpk;
}

export class Viewer3D {
  /**
   * @param {HTMLElement} host
   * @param {{mode?: string, labels?: boolean, spin?: boolean, label?: string, onPick?: Function}} options
   */
  constructor(host, options = {}) {
    this.host = host;
    this.opts = { mode: 'ball', labels: true, spin: !reducedMotion(), onPick: null, ...options };
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'viewer-canvas';
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', options.label || '3D model');
    host.replaceChildren(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.atoms = [];
    this.bonds = [];
    this.cell = null;
    this.rot = this.baseRot();
    this.zoom = 1;
    this.fit = 40;
    this.hover = -1;
    this.picked = -1;
    this.pointers = new Map();
    this.frame = 0;
    this.listeners = [];
    this.bind();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    this.loop();
  }

  baseRot() {
    return this.rotation(-0.35, 0.55);
  }

  /** Rotation matrix from two Euler angles (x then y). */
  rotation(ax, ay) {
    const [cx, sx, cy, sy] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay)];
    return [
      [cy, 0, sy],
      [sx * sy, cx, -sx * cy],
      [-cx * sy, sx, cx * cy],
    ];
  }

  turn(dx, dy) {
    const r = this.rotation(dy, dx);
    this.rot = r.map(row =>
      [0, 1, 2].map(j => row[0] * this.rot[0][j] + row[1] * this.rot[1][j] + row[2] * this.rot[2][j])
    );
    this.dirty = true;
  }

  /** atoms: [[symbol, x, y, z, charge?]], bonds: [[a, b, order]], cell: lattice vectors or null. */
  setData({ atoms = [], bonds = [], cell = null } = {}) {
    const n = atoms.length || 1;
    const c = atoms.reduce((acc, a) => [acc[0] + a[1] / n, acc[1] + a[2] / n, acc[2] + a[3] / n], [0, 0, 0]);
    this.center = c;
    this.atoms = atoms.map(a => ({ el: a[0], p: [a[1] - c[0], a[2] - c[1], a[3] - c[2]], q: a[4] || 0 }));
    this.bonds = bonds;
    this.cell = cell;
    const radius = Math.max(1.5, ...this.atoms.map(a => Math.hypot(...a.p) + (VDW[a.el] || 1.8) * 0.5));
    this.radius = radius;
    this.picked = -1;
    this.rot = this.baseRot();
    this.zoom = 1;
    this.resize();
  }

  setMode(mode) {
    this.opts.mode = mode;
    this.dirty = true;
  }
  setLabels(on) {
    this.opts.labels = on;
    this.dirty = true;
  }
  setSpin(on) {
    this.opts.spin = on;
  }
  reset() {
    this.rot = this.baseRot();
    this.zoom = 1;
    this.dirty = true;
  }
  zoomBy(f) {
    this.zoom = Math.min(6, Math.max(0.3, this.zoom * f));
    this.dirty = true;
  }

  on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    this.listeners.push(() => target.removeEventListener(type, fn, opts));
  }

  bind() {
    const cv = this.canvas;
    this.on(cv, 'pointerdown', e => {
      cv.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY });
      this.opts.spin = false;
    });
    this.on(cv, 'pointermove', e => {
      const prev = this.pointers.get(e.pointerId);
      if (!prev) return this.hoverAt(e);
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        const before = Math.hypot(a.x - b.x, a.y - b.y);
        prev.x = e.clientX;
        prev.y = e.clientY;
        const [c, d] = [...this.pointers.values()];
        const after = Math.hypot(c.x - d.x, c.y - d.y);
        if (before > 0) this.zoomBy(after / before);
        return;
      }
      this.turn((e.clientX - prev.x) * 0.01, (e.clientY - prev.y) * 0.01);
      prev.x = e.clientX;
      prev.y = e.clientY;
    });
    const end = e => {
      const p = this.pointers.get(e.pointerId);
      this.pointers.delete(e.pointerId);
      if (p && Math.hypot(e.clientX - p.sx, e.clientY - p.sy) < 5) this.pick(e);
    };
    this.on(cv, 'pointerup', end);
    this.on(cv, 'pointercancel', e => this.pointers.delete(e.pointerId));
    this.on(cv, 'pointerleave', () => {
      this.hover = -1;
      this.dirty = true;
    });
    this.on(
      cv,
      'wheel',
      e => {
        e.preventDefault();
        this.zoomBy(e.deltaY < 0 ? 1.1 : 0.9);
      },
      { passive: false }
    );
    this.on(cv, 'keydown', e => {
      const step = 0.12;
      const keys = {
        ArrowLeft: () => this.turn(-step, 0),
        ArrowRight: () => this.turn(step, 0),
        ArrowUp: () => this.turn(0, -step),
        ArrowDown: () => this.turn(0, step),
        '+': () => this.zoomBy(1.15),
        '=': () => this.zoomBy(1.15),
        '-': () => this.zoomBy(0.87),
        Home: () => this.reset(),
      };
      if (keys[e.key]) {
        e.preventDefault();
        this.opts.spin = false;
        keys[e.key]();
      }
    });
  }

  resize() {
    const rect = this.host.getBoundingClientRect();
    const w = Math.max(200, rect.width);
    const h = Math.max(200, rect.height || w * 0.75);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.fit = (Math.min(w, h) * 0.44) / (this.radius || 3);
    this.dirty = true;
  }

  project(p) {
    const r = this.rot;
    const x = r[0][0] * p[0] + r[0][1] * p[1] + r[0][2] * p[2];
    const y = r[1][0] * p[0] + r[1][1] * p[1] + r[1][2] * p[2];
    const z = r[2][0] * p[0] + r[2][1] * p[1] + r[2][2] * p[2];
    const s = this.fit * this.zoom;
    const persp = 1 / (1 - z / ((this.radius || 3) * 8));
    return { x: this.w / 2 + x * s * persp, y: this.h / 2 - y * s * persp, z, s: s * persp };
  }

  radiusOf(a, s) {
    const vdw = VDW[a.el] || 1.8;
    if (this.opts.mode === 'space') return vdw * s;
    if (this.opts.mode === 'wire') return Math.max(2, 0.12 * s);
    return (a.el === 'H' ? 0.22 : 0.3) * vdw * s * 0.95;
  }

  hoverAt(e) {
    const i = this.hitTest(e);
    if (i !== this.hover) {
      this.hover = i;
      this.canvas.style.cursor = i >= 0 ? 'pointer' : 'grab';
      this.dirty = true;
    }
  }

  hitTest(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best = -1;
    let bestZ = -Infinity;
    (this.projected || []).forEach((p, i) => {
      if (Math.hypot(p.x - mx, p.y - my) <= Math.max(p.r, 6) && p.z > bestZ) {
        best = i;
        bestZ = p.z;
      }
    });
    return best;
  }

  pick(e) {
    const i = this.hitTest(e);
    this.picked = i;
    this.dirty = true;
    if (i >= 0 && this.opts.onPick) {
      const a = this.atoms[i];
      const neighbours = this.bonds.filter(b => b[0] === i || b[1] === i).length;
      this.opts.onPick({ index: i, symbol: a.el, charge: a.q, neighbours, element: getElement(a.el) });
    }
  }

  loop() {
    this.frame = requestAnimationFrame(() => this.loop());
    if (this.opts.spin && !this.pointers.size && !document.hidden) this.turn(0.006, 0);
    if (this.dirty) {
      this.dirty = false;
      this.draw();
    }
  }

  draw() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    if (!this.atoms.length) return;
    const pts = this.atoms.map(a => {
      const p = this.project(a.p);
      return { ...p, r: this.radiusOf(a, p.s) };
    });
    this.projected = pts;
    const style = getComputedStyle(this.host);
    const bondColor = style.getPropertyValue('--bond').trim() || '#8b93a3';
    const labelOn = this.opts.labels && this.opts.mode !== 'wire';

    if (this.cell) this.drawCell(bondColor);

    const items = [];
    if (this.opts.mode !== 'space')
      for (const b of this.bonds) {
        const p = pts[b[0]];
        const q = pts[b[1]];
        if (p && q) items.push({ z: (p.z + q.z) / 2 - 0.01, bond: b, p, q });
      }
    pts.forEach((p, i) => items.push({ z: p.z, atom: i }));
    items.sort((a, b) => a.z - b.z);

    for (const it of items) {
      if (it.bond) this.drawBond(it, bondColor);
      else this.drawAtom(it.atom, pts[it.atom], labelOn);
    }
  }

  drawCell(color) {
    const { ctx } = this;
    const [a, b, c] = this.cell;
    const o = this.center.map(v => -v);
    const corner = (i, j, k) => [0, 1, 2].map(d => o[d] + i * a[d] + j * b[d] + k * c[d]);
    const edges = [
      [
        [0, 0, 0],
        [1, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 1],
      ],
      [
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [1, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 1],
        [1, 0, 0],
      ],
      [
        [1, 0, 1],
        [0, 0, 1],
      ],
      [
        [1, 0, 1],
        [1, 1, 1],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 1],
      ],
    ];
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 1.2;
    for (const [p, q] of edges) {
      const P = this.project(corner(...p));
      const Q = this.project(corner(...q));
      ctx.beginPath();
      ctx.moveTo(P.x, P.y);
      ctx.lineTo(Q.x, Q.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBond({ bond, p, q }, color) {
    const { ctx } = this;
    const order = bond[2] || 1;
    const wire = this.opts.mode === 'wire';
    const width = wire ? 2 : Math.max(1.5, 0.16 * ((p.s + q.s) / 2));
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const offsets = order === 2 ? [-1, 1] : order === 3 ? [-1.6, 0, 1.6] : [0];
    ctx.save();
    ctx.lineCap = 'round';
    for (const o of offsets) {
      const ox = nx * o * width * 0.9;
      const oy = ny * o * width * 0.9;
      if (wire) {
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2;
        ctx.lineWidth = width;
        ctx.strokeStyle = atomColor(this.atoms[bond[0]].el);
        ctx.beginPath();
        ctx.moveTo(p.x + ox, p.y + oy);
        ctx.lineTo(mx + ox, my + oy);
        ctx.stroke();
        ctx.strokeStyle = atomColor(this.atoms[bond[1]].el);
        ctx.beginPath();
        ctx.moveTo(mx + ox, my + oy);
        ctx.lineTo(q.x + ox, q.y + oy);
        ctx.stroke();
      } else {
        ctx.lineWidth = order > 1 ? width * 0.6 : width;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p.x + ox, p.y + oy);
        ctx.lineTo(q.x + ox, q.y + oy);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawAtom(i, p, labelOn) {
    if (this.opts.mode === 'wire' && this.bonds.some(b => b[0] === i || b[1] === i)) return;
    const { ctx } = this;
    const a = this.atoms[i];
    const color = atomColor(a.el);
    const g = ctx.createRadialGradient(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.1, p.x, p.y, p.r);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.3, color);
    g.addColorStop(1, shade(color, -0.45));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    if (i === this.hover || i === this.picked) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = i === this.picked ? '#f59e0b' : '#38bdf8';
      ctx.stroke();
    }
    if (labelOn && p.r >= 9) {
      ctx.fillStyle = DARK_TEXT.has(a.el) ? '#1f2430' : '#ffffff';
      ctx.font = `600 ${Math.min(16, Math.max(9, p.r * 0.75))}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const charge = a.q ? (a.q > 0 ? '+' : '−') : '';
      ctx.fillText(a.el + charge, p.x, p.y + 0.5);
    }
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.ro.disconnect();
    for (const off of this.listeners) off();
    this.listeners = [];
  }
}

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v + v * amount)));
  return `rgb(${f(n >> 16)}, ${f((n >> 8) & 255)}, ${f(n & 255)})`;
}
