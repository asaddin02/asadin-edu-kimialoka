// Molecule profile. Works for catalogue entries (/molecule/water), any PubChem compound (/molecule/cid/2244)
// and names (/molecule/name/aspirin). Content depth follows the learner's level.
import { $, $$, esc, toast, debounce, safeURL } from '../core/dom.js';
import { S, pick, fmt, num, depth, atLeast, lang } from '../core/prefs.js';
import { ui } from '../i18n/ui.js';
import { replace } from '../core/router.js';
import { icon } from '../components/icons.js';
import { breadcrumbs, loading, notice, levelBadge, extLink, errorState } from '../components/common.js';
import { bookmarkButton, moleculeCard } from '../components/cards.js';
import { Viewer3D, atomColor } from '../components/moleculeViewer3D.js';
import { ghsPanel } from '../components/ghs.js';
import { getMolecule, getMoleculeByCid, MOLECULES } from '../data/curatedMolecules.js';
import { getClass, classPath } from '../data/classes.js';
import { getElement, CATEGORIES } from '../data/periodicTable.js';
import { ionsWith, ionsFromAcid } from '../data/ions.js';
import { reactionsWith } from '../data/reactionLibrary.js';
import { materialsWith } from '../data/materials.js';
import { topicsLinking } from '../data/topics/index.js';
import { GEOMETRIES, POLARITY, POLARITY_REF } from '../data/geometry.js';
import { reference } from '../data/references.js';
import { moleculeRecord, moleculeIndex, depiction } from '../services/data.js';
import { depictSVG } from '../components/depict.js';
import { compound, cidByName, imageURL, recordURL } from '../services/pubchem.js';
import { extrasForCid } from '../services/wiki.js';
import { buildLattice, LATTICES } from '../services/lattice.js';
import { parseFormula, composition, formulaHTML, formulaUnicode, totalAtoms } from '../services/formula.js';
import { speak, stopSpeaking, canSpeak } from '../services/speech.js';
import { getNote, setNote, trackVisit } from '../core/userdata.js';

const s = S({
  notFound: ['Molekul tidak ditemukan', 'Molecule not found'],
  notFoundText: [
    'Coba cari dengan nama lain, rumus, atau nomor CID PubChem.',
    'Try another name, a formula or a PubChem CID.',
  ],
  backExplore: ['Kembali ke Jelajah', 'Back to Explore'],
  view3d: ['Model 3D', '3D model'],
  ball: ['Bola & batang', 'Ball & stick'],
  space: ['Ruang penuh', 'Space-filling'],
  wire: ['Rangka', 'Wireframe'],
  labels: ['Label atom', 'Atom labels'],
  spin: ['Putar otomatis', 'Auto-rotate'],
  reset: ['Atur ulang', 'Reset'],
  zoomIn: ['Perbesar', 'Zoom in'],
  zoomOut: ['Perkecil', 'Zoom out'],
  hint: [
    'Seret untuk memutar · gulir atau cubit untuk zoom · klik atom untuk info · tombol panah juga bisa.',
    'Drag to rotate · scroll or pinch to zoom · click an atom for info · arrow keys work too.',
  ],
  pickAtom: ['Klik sebuah atom untuk melihat unsurnya.', 'Click an atom to see its element.'],
  atomInfo: [
    '{name} ({s}) · nomor atom {z} · {bonds} ikatan pada model ini',
    '{name} ({s}) · atomic number {z} · {bonds} bonds in this model',
  ],
  openElement: ['Profil unsur', 'Element profile'],
  s2d: ['Struktur 2D (PubChem)', '2D structure (PubChem)'],
  kind2d: [
    'PubChem belum memiliki konformer 3D untuk senyawa ini; model menampilkan koordinat 2D (datar).',
    'PubChem has no 3D conformer for this compound; the model shows flat 2D coordinates.',
  ],
  noStructure: ['Model 3D belum tersedia untuk zat ini.', 'No 3D model is available for this substance.'],
  latticeNote: [
    'Model kisi kristal dibangun dari sel satuan dan konstanta kisi terukur.',
    'The crystal model is built from the unit cell and measured lattice constants.',
  ],
  monomer: [
    'Model 3D dan data PubChem di halaman ini adalah unit penyusun/monomernya ({title}). Polimernya adalah rantai panjang {unit}.',
    'The 3D model and PubChem data here are for the building unit/monomer ({title}). The polymer is a long chain {unit}.',
  ],
  element: [
    'Data PubChem di halaman ini adalah untuk unsur {title}; model 3D menunjukkan susunan atom bentuk ini.',
    'The PubChem data here are for the element {title}; the 3D model shows this form’s atomic arrangement.',
  ],
  ionic: [
    'Zat ini berupa kisi ion atau jaringan raksasa, jadi rumusnya menyatakan perbandingan, bukan satu molekul tunggal.',
    'This substance is an ionic lattice or giant network, so its formula is a ratio, not a single molecule.',
  ],
  sectionAbout: ['Kenali', 'Get to know it'],
  forLevel: ['Penjelasan untuk jenjang {level}', 'Explained for {level}'],
  uses: ['Kegunaan', 'Uses'],
  fun: ['Tahukah kamu?', 'Did you know?'],
  sectionWiki: ['Ensiklopedia', 'Encyclopedia'],
  wikiFrom: ['Dari Wikipedia ({lang}), CC BY-SA 4.0', 'From Wikipedia ({lang}), CC BY-SA 4.0'],
  wikiNone: ['Belum ada artikel ensiklopedia yang terhubung.', 'No linked encyclopedia article yet.'],
  sectionProps: ['Sifat fisika & kimia', 'Physical & chemical properties'],
  computed: ['Dihitung PubChem', 'Computed by PubChem'],
  experimental: ['Data eksperimen', 'Experimental data'],
  expNote: [
    'Nilai asli dari sumber yang dikurasi PubChem (bahasa Inggris).',
    'Original values from PubChem-curated sources (in English).',
  ],
  sectionSafety: ['Keamanan (GHS)', 'Safety (GHS)'],
  safetyTip: [
    'Bahan kimia di laboratorium hanya digunakan dengan pengawasan guru dan alat pelindung.',
    'Use lab chemicals only with a teacher’s supervision and protective equipment.',
  ],
  pubchemUses: ['Kegunaan menurut PubChem', 'Uses according to PubChem'],
  sectionId: ['Nama & identitas kimia', 'Names & chemical identity'],
  sectionLinks: ['Terhubung dengan', 'Connected to'],
  linkElements: ['Unsur penyusun', 'Elements it contains'],
  linkIons: ['Ion', 'Ions'],
  linkReactions: ['Reaksi', 'Reactions'],
  linkMaterials: ['Material & campuran', 'Materials & mixtures'],
  linkLessons: ['Materi yang membahasnya', 'Lessons that cover it'],
  spectra: ['Spektrum (IR, NMR, MS)', 'Spectra (IR, NMR, MS)'],
  spectraLink: [
    'Informasi spektrum di PubChem, bila tersedia',
    'Spectral information in PubChem, where available',
  ],
  synonyms: ['Nama lain', 'Other names'],
  descriptions: ['Deskripsi ilmiah', 'Scientific description'],
  related: ['Molekul segolongan', 'Related molecules'],
  notes: ['Catatan belajarku', 'My study notes'],
  notesHint: ['Tersimpan otomatis di perangkat ini.', 'Saved automatically on this device.'],
  notesSaved: ['Catatan tersimpan.', 'Note saved.'],
  compare: ['Bandingkan', 'Compare'],
  live: ['Data langsung PubChem', 'Live PubChem data'],
  loadingExtras: ['Mencari artikel dan foto…', 'Looking for articles and photos…'],
  photoBy: [
    'Foto: {author} · {license} · Wikimedia Commons',
    'Photo: {author} · {license} · Wikimedia Commons',
  ],
  atoms: ['{n} atom', '{n} atoms'],
  sdMade: ['{name} tersusun atas {parts}.', '{name} is made of {parts}.'],
  sdRatio: [
    'Rumus {formula} menunjukkan perbandingan atomnya: {parts}.',
    'The formula {formula} shows the ratio of atoms: {parts}.',
  ],
  and: ['dan', 'and'],
  smpFormula: [
    'Rumus molekul {formula} dengan massa molekul relatif (Mr) {mw}. Unsur penyusunnya: {els}.',
    'Molecular formula {formula} with relative molecular mass (Mr) {mw}. Elements: {els}.',
  ],
  bondIonic: [
    'Jenis ikatan utama: ikatan ion (kation dan anion saling tarik).',
    'Main bonding: ionic (cations and anions attract).',
  ],
  bondNetwork: ['Jenis ikatan utama: jaringan kovalen raksasa.', 'Main bonding: a giant covalent network.'],
  bondMetal: [
    'Jenis ikatan utama: ikatan logam (lautan elektron).',
    'Main bonding: metallic (a sea of electrons).',
  ],
  bondCovalent: [
    'Jenis ikatan utama: ikatan kovalen (atom berbagi elektron).',
    'Main bonding: covalent (atoms share electrons).',
  ],
  geometry: [
    'Bentuk molekul (VSEPR): {name}, {axe}, sudut {angle}, hibridisasi atom pusat {hyb}.',
    'Shape (VSEPR): {name}, {axe}, angle {angle}, central-atom hybridisation {hyb}.',
  ],
  groups: ['Golongan/gugus: {list}.', 'Classes/groups: {list}.'],
  polarity: {
    same: [
      'Kepolaran: nonpolar, karena semua atomnya unsur yang sama sehingga tidak ada ikatan yang polar.',
      'Polarity: nonpolar, because every atom is the same element, so no bond is polar.',
    ],
    symmetric: [
      'Kepolaran: nonpolar. Walaupun ikatannya polar, bentuknya simetris sehingga momen dipol ikatan saling meniadakan.',
      'Polarity: nonpolar. Even if its bonds are polar, the shape is symmetric, so the bond dipoles cancel.',
    ],
    diatomic: [
      'Kepolaran: polar, karena kedua atomnya berbeda keelektronegatifan sehingga ikatannya polar.',
      'Polarity: polar, because its two atoms differ in electronegativity, so the bond is polar.',
    ],
    shape: [
      'Kepolaran: polar. Momen dipol ikatannya tidak saling meniadakan karena bentuk molekul atau atom-atom yang terikat tidak simetris.',
      'Polarity: polar. Its bond dipoles do not cancel because the shape or the bonded atoms are not symmetric.',
    ],
    ozone: [
      'Kepolaran: sedikit polar walaupun semua atomnya oksigen: bentuknya bengkok dan atom pusatnya bermuatan formal berbeda dari atom ujung.',
      'Polarity: slightly polar although all its atoms are oxygen: the shape is bent and the central atom carries a different formal charge from the end atoms.',
    ],
  },
  xlogp: ['XLogP {v}: {hint}', 'XLogP {v}: {hint}'],
  lipophilic: ['cenderung larut dalam lemak (lipofilik).', 'tends to dissolve in fats (lipophilic).'],
  hydrophilic: ['cenderung larut dalam air (hidrofilik).', 'tends to dissolve in water (hydrophilic).'],
  kuliahDesc: [
    'Deskriptor PubChem: TPSA {tpsa} Å², donor ikatan H {hbd}, akseptor {hba}, ikatan dapat berputar {rotb}, kompleksitas {cx}.',
    'PubChem descriptors: TPSA {tpsa} Å², H-bond donors {hbd}, acceptors {hba}, rotatable bonds {rotb}, complexity {cx}.',
  ],
  composition: ['Komposisi massa', 'Mass composition'],
  offlineRecord: [
    'Data rinci belum tersedia (mungkin sedang offline). Kartu belajar tetap bisa dibaca.',
    'Detailed data is unavailable (you may be offline). The learning card is still here.',
  ],
});

const EXP = {
  'Physical Description': ['Deskripsi fisik', 'Physical description'],
  'Color/Form': ['Warna & bentuk', 'Colour & form'],
  Odor: ['Bau', 'Odour'],
  Taste: ['Rasa', 'Taste'],
  'Melting Point': ['Titik leleh', 'Melting point'],
  'Boiling Point': ['Titik didih', 'Boiling point'],
  'Flash Point': ['Titik nyala', 'Flash point'],
  Density: ['Massa jenis', 'Density'],
  Solubility: ['Kelarutan', 'Solubility'],
  'Vapor Pressure': ['Tekanan uap', 'Vapour pressure'],
  LogP: ['LogP (oktanol–air)', 'LogP (octanol–water)'],
  'Dissociation Constants': ['Tetapan disosiasi (pKa)', 'Dissociation constants (pKa)'],
  pH: ['pH', 'pH'],
  Viscosity: ['Viskositas', 'Viscosity'],
  'Refractive Index': ['Indeks bias', 'Refractive index'],
  'Heat of Combustion': ['Kalor pembakaran', 'Heat of combustion'],
  'Heat of Vaporization': ['Kalor penguapan', 'Heat of vaporisation'],
  'Surface Tension': ['Tegangan permukaan', 'Surface tension'],
  'Autoignition Temperature': ['Suhu penyalaan sendiri', 'Autoignition temperature'],
  Decomposition: ['Penguraian', 'Decomposition'],
  'Stability/Shelf Life': ['Stabilitas', 'Stability'],
  'Odor Threshold': ['Ambang bau', 'Odour threshold'],
};
const BASIC_EXP = [
  'Physical Description',
  'Color/Form',
  'Odor',
  'Melting Point',
  'Boiling Point',
  'Density',
  'Solubility',
];

let pageTitle = '';
export const title = () => pageTitle || pick(['Molekul', 'Molecule']);

export async function render({ id, main, cleanup, isCurrent }) {
  main.innerHTML = `<div class="container">${loading(ui.loading)}</div>`;
  let m = null;
  let rec = null;
  let live = false;

  if (id?.startsWith('name/')) {
    const name = id.slice(5);
    let cid = null;
    try {
      cid = await cidByName(name);
    } catch {}
    if (!isCurrent()) return;
    if (!cid) return notFound(main);
    const cur = getMoleculeByCid(cid);
    replace(cur ? `/molecule/${cur.id}` : `/molecule/cid/${cid}`);
    return;
  }
  if (id?.startsWith('cid/')) {
    const cid = Number(id.slice(4));
    const cur = getMoleculeByCid(cid);
    if (cur) {
      replace(`/molecule/${cur.id}`);
      return;
    }
    main.innerHTML = `<div class="container">${loading(ui.loadingLive)}</div>`;
    try {
      rec = await compound(cid);
    } catch {
      if (isCurrent()) main.innerHTML = `<div class="container">${errorState(ui.error)}</div>`;
      return;
    }
    if (!isCurrent()) return;
    if (!rec) return notFound(main);
    live = true;
  } else {
    m = getMolecule(id);
    if (!m) return notFound(main);
    rec = await moleculeRecord(m.id).catch(() => null);
    if (!isCurrent()) return;
  }

  const props = rec?.props || {};
  const name = m ? pick(m.name) : props.title || `CID ${rec.cid}`;
  const other = m ? pick([m.name[1], m.name[0]]) : props.iupac || '';
  pageTitle = name;
  const idx = await moleculeIndex();
  const cid = m?.cid || rec?.cid;
  const key = m ? m.id : `cid:${cid}`;
  trackVisit(m ? `mol:${m.id}` : `cid:${cid}`, name);

  const lv = depth();
  const formula = props.formula || '';
  const parsed = formula ? parseFormula(formula) : { counts: {} };
  const comp = parsed.counts ? composition(parsed.counts) : [];
  const cls = (m?.cls || []).map(getClass).filter(Boolean);
  const mainPath = cls[0] ? classPath(cls[0].id) : [];

  const structure = m?.lattice ? buildLattice(m.lattice.type, m.lattice.el) : rec?.structure || null;
  const lattice = m?.lattice ? LATTICES[m.lattice.type] : null;
  const photo = rec?.photo?.kind === 'photo' ? rec.photo : null;

  const crumbs = [
    [pick(['Jelajah', 'Explore']), '/explore'],
    ...mainPath.map(c => [pick(c.name), `/classes/${c.id}`]),
    [name, ''],
  ];

  main.innerHTML = `<article class="container molecule" data-molecule="${esc(key)}">
    ${breadcrumbs(crumbs)}
    <header class="mol-head">
      <div class="mol-titles">
        ${formula ? `<p class="formula formula-lg">${formulaHTML(formula)}</p>` : ''}
        <h1>${esc(name)}</h1>
        ${other && other !== name ? `<p class="mol-other">${esc(other)}</p>` : ''}
        <p class="mol-badges">
          ${m ? levelBadge(m.lv) : `<span class="badge badge-live">${icon('globe', { size: 14 })} ${esc(s.live)}</span>`}
          ${cls.map(c => `<a class="chip" href="/classes/${c.id}" style="--accent:${c.color}">${esc(pick(c.name))}</a>`).join('')}
        </p>
      </div>
      <div class="mol-actions">
        ${canSpeak() ? `<button class="btn" type="button" data-speak aria-pressed="false">${icon('speaker', { size: 18 })}<span>${esc(ui.listen)}</span></button>` : ''}
        ${bookmarkButton(key, name, false)}
        <a class="btn" href="/compare?a=${encodeURIComponent(m ? m.id : `cid/${cid}`)}">${icon('compare', { size: 18 })}<span>${esc(s.compare)}</span></a>
        <button class="btn" type="button" data-share>${icon('share', { size: 18 })}<span>${esc(ui.share)}</span></button>
        <button class="btn" type="button" data-print>${icon('print', { size: 18 })}<span>${esc(ui.print)}</span></button>
      </div>
    </header>

    ${m?.poly ? notice(esc(fmt(s.monomer, { title: props.title || '', unit: m.poly.unit }))) : ''}
    ${rec?.subject === 'element' ? notice(esc(fmt(s.element, { title: props.title || '' }))) : ''}
    ${!rec && m ? notice(esc(s.offlineRecord), 'warn') : ''}

    <section class="mol-stage" aria-label="${esc(s.view3d)}">
      <div class="viewer-box">
        <div class="viewer-toolbar" role="toolbar" aria-label="${esc(s.view3d)}">
          <div class="seg" role="group">
            <button type="button" class="seg-btn" data-mode="ball" aria-pressed="true">${esc(s.ball)}</button>
            <button type="button" class="seg-btn" data-mode="space" aria-pressed="false">${esc(s.space)}</button>
            <button type="button" class="seg-btn" data-mode="wire" aria-pressed="false">${esc(s.wire)}</button>
          </div>
          <div class="tool-group">
            <button type="button" class="icon-btn" data-v="labels" aria-pressed="true" title="${esc(s.labels)}" aria-label="${esc(s.labels)}">${icon('eye', { size: 18 })}</button>
            <button type="button" class="icon-btn" data-v="spin" aria-pressed="true" title="${esc(s.spin)}" aria-label="${esc(s.spin)}">${icon('rotate', { size: 18 })}</button>
            <button type="button" class="icon-btn" data-v="in" title="${esc(s.zoomIn)}" aria-label="${esc(s.zoomIn)}">${icon('zoomIn', { size: 18 })}</button>
            <button type="button" class="icon-btn" data-v="out" title="${esc(s.zoomOut)}" aria-label="${esc(s.zoomOut)}">${icon('zoomOut', { size: 18 })}</button>
            <button type="button" class="icon-btn" data-v="reset" title="${esc(s.reset)}" aria-label="${esc(s.reset)}">${icon('reset', { size: 18 })}</button>
          </div>
        </div>
        <div class="viewer" data-viewer></div>
        <p class="viewer-hint">${esc(s.hint)}</p>
        <p class="atom-info" data-atom-info aria-live="polite">${esc(s.pickAtom)}</p>
        ${structure ? legend(structure.atoms) : ''}
        ${structure?.kind === '2d' ? `<p class="muted small">${esc(s.kind2d)}</p>` : ''}
        ${lattice ? `<div class="lattice-note"><strong>${esc(pick(lattice.name))}</strong> · ${esc(pick(['Bilangan koordinasi', 'Coordination number']))} ${esc(lattice.cn)}${lattice.pack ? ` · ${lattice.pack}% ${esc(pick(['ruang terisi', 'space filled']))}` : ''}<p>${esc(pick(lattice.note))}</p><p class="muted small">${esc(s.latticeNote)}</p></div>` : ''}
      </div>
      <div class="mol-side">
        ${photo ? photoFigure(photo, name) : '<div data-photo></div>'}
        <figure class="structure-2d">
          ${
            m && depiction(m.id)
              ? `<div class="depict-box">${depictSVG(depiction(m.id), { title: `${pick(['Struktur 2D', '2D structure'])}: ${name}`, size: 320 })}</div>`
              : `<img src="${imageURL(cid, 400)}" alt="${esc(pick(['Struktur 2D', '2D structure']))}: ${esc(name)}" width="300" height="300" loading="lazy" data-fallback="icon" data-retry="2" />`
          }
          <figcaption>${esc(s.s2d)} · CID ${cid}${m && depiction(m.id) ? ` · <a href="${imageURL(cid, 500)}" target="_blank" rel="noopener">PNG</a>` : ''}</figcaption>
        </figure>
      </div>
    </section>

    <nav class="jump" aria-label="${esc(pick(['Bagian halaman', 'On this page']))}">
      ${[
        ['sec-about', s.sectionAbout],
        ['sec-wiki', s.sectionWiki],
        atLeast('smp') ? ['sec-props', s.sectionProps] : null,
        ['sec-safety', s.sectionSafety],
        atLeast('sma') ? ['sec-id', s.sectionId] : null,
        ['sec-links', s.sectionLinks],
        ['sec-notes', s.notes],
      ]
        .filter(Boolean)
        .map(([href, label]) => `<a class="chip" href="#${href}" data-jump>${esc(label)}</a>`)
        .join('')}
    </nav>

    <section id="sec-about" class="mol-section">
      <h2>${esc(s.sectionAbout)}</h2>
      ${m ? `<p class="lead">${esc(pick(m.about))}</p>` : ''}
      <div class="card explain">
        <h3>${esc(fmt(s.forLevel, { level: pick([levelLabel(lv), levelLabel(lv, 'en')]) }))}</h3>
        ${explain({ m, name, formula, parsed, comp, props, cls, lv })}
      </div>
      ${
        m
          ? `<div class="grid grid-2">
        <div class="card"><h3>${icon('bulb', { size: 18 })} ${esc(s.uses)}</h3><p>${esc(pick(m.uses))}</p></div>
        <div class="card fun"><h3>${icon('sparkles', { size: 18 })} ${esc(s.fun)}</h3><p>${esc(pick(m.fun))}</p></div>
      </div>`
          : ''
      }
      ${atLeast('smp') && comp.length ? compositionBar(comp) : ''}
    </section>

    <section id="sec-wiki" class="mol-section" data-wiki>${wikiSection(rec, live)}</section>

    ${atLeast('smp') ? `<section id="sec-props" class="mol-section">${propsSection(props, rec, lv)}</section>` : ''}

    <section id="sec-safety" class="mol-section">${safetySection(rec?.ghs, lv)}${usesSection(rec, lv)}</section>

    ${atLeast('sma') ? `<section id="sec-id" class="mol-section">${identitySection(props, rec, cid, lv)}</section>` : ''}

    <section id="sec-links" class="mol-section">${linksSection(m, parsed)}</section>

    ${m ? relatedSection(m, idx) : ''}

    <section id="sec-notes" class="mol-section">
      <h2>${esc(s.notes)}</h2>
      <label class="sr-only" for="mol-note">${esc(s.notes)}</label>
      <textarea id="mol-note" rows="4" placeholder="${esc(pick(['Tulis apa yang kamu pelajari tentang molekul ini…', 'Write what you learned about this molecule…']))}">${esc(getNote(`mol:${key}`))}</textarea>
      <p class="muted small">${esc(s.notesHint)}</p>
    </section>

    <p class="source-line">${esc(ui.source)}: ${extLink(recordURL(cid), `PubChem CID ${cid}`)}${
      rec?.wikidata
        ? ` · ${extLink(`https://www.wikidata.org/wiki/${rec.wikidata}`, `Wikidata ${rec.wikidata}`)}`
        : ''
    }${rec?.synced ? ` · ${esc(pick(['diperbarui', 'updated']))} ${esc(rec.synced)}` : ''}</p>
  </article>`;

  // ---------- 3D viewer ----------
  const host = $('[data-viewer]', main);
  let viewer = null;
  if (structure?.atoms?.length) {
    viewer = new Viewer3D(host, {
      label: `${s.view3d}: ${name}`,
      mode: m?.lattice && ['fcc', 'bcc', 'hcp'].includes(m.lattice.type) ? 'space' : 'ball',
      onPick: a => {
        const e = a.element;
        $('[data-atom-info]', main).innerHTML = e
          ? `${esc(fmt(s.atomInfo, { name: pick([e.id, e.en]), s: e.s, z: e.z, bonds: a.neighbours }))} · <a href="/atom/${e.s}">${esc(s.openElement)}</a>`
          : esc(a.symbol);
      },
    });
    viewer.setData(structure);
    if (viewer.opts.mode === 'space') setSeg(main, 'space');
    cleanup(() => viewer.destroy());
  } else {
    host.innerHTML = `<div class="viewer-empty">${icon('molecule', { size: 48 })}<p>${esc(s.noStructure)}</p></div>`;
  }
  main.querySelector('.viewer-toolbar').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || !viewer) return;
    if (b.dataset.mode) {
      viewer.setMode(b.dataset.mode);
      setSeg(main, b.dataset.mode);
    }
    const v = b.dataset.v;
    if (v === 'labels' || v === 'spin') {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      if (v === 'labels') viewer.setLabels(on);
      else viewer.setSpin(on);
    }
    if (v === 'in') viewer.zoomBy(1.2);
    if (v === 'out') viewer.zoomBy(0.83);
    if (v === 'reset') viewer.reset();
  });
  if (viewer && !viewer.opts.spin) $('[data-v="spin"]', main).setAttribute('aria-pressed', 'false');

  // ---------- Actions ----------
  const speakBtn = $('[data-speak]', main);
  speakBtn?.addEventListener('click', () => {
    if (speakBtn.getAttribute('aria-pressed') === 'true') {
      stopSpeaking();
      return;
    }
    const wikiText = pick([rec?.wiki?.id?.extract, rec?.wiki?.en?.extract]) || '';
    const text = [
      name,
      m ? pick(m.about) : '',
      m ? pick(m.fun) : '',
      lv === 'sd' ? '' : wikiText.split('\n')[0],
    ]
      .filter(Boolean)
      .join('. ');
    speakBtn.setAttribute('aria-pressed', 'true');
    speakBtn.querySelector('span').textContent = ui.stop;
    speak(text, () => {
      speakBtn.setAttribute('aria-pressed', 'false');
      speakBtn.querySelector('span').textContent = ui.listen;
    });
  });
  cleanup(stopSpeaking);
  $('[data-share]', main).addEventListener('click', async () => {
    const url = location.href;
    try {
      if (navigator.share)
        await navigator.share({ title: `${name} · Alchemist`, text: formulaUnicode(formula), url });
      else {
        await navigator.clipboard.writeText(url);
        toast(ui.copied);
      }
    } catch {}
  });
  $('[data-print]', main).addEventListener('click', () => window.print());
  for (const a of $$('[data-jump]', main))
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = main.querySelector(a.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target?.querySelector('h2')?.setAttribute('tabindex', '-1');
      target?.querySelector('h2')?.focus({ preventScroll: true });
    });
  const note = $('#mol-note', main);
  const saveNote = debounce(() => setNote(`mol:${key}`, note.value, name) && toast(s.notesSaved), 700);
  note.addEventListener('input', saveNote);

  // ---------- Live extras: Wikipedia and a Commons photo ----------
  if (live) {
    $('[data-wiki]', main).innerHTML = `<h2>${esc(s.sectionWiki)}</h2>${loading(s.loadingExtras)}`;
    extrasForCid(cid)
      .then(extra => {
        if (!isCurrent()) return;
        const merged = { ...rec, ...(extra || {}) };
        $('[data-wiki]', main).innerHTML = wikiSection(merged, true);
        if (extra?.photo?.kind === 'photo')
          $('[data-photo]', main).outerHTML = photoFigure(extra.photo, name);
        const raw = extra?.label?.[lang()];
        const better = raw ? raw[0].toUpperCase() + raw.slice(1) : null;
        if (better) {
          $('.mol-other', main)?.remove();
          $('h1', main).insertAdjacentHTML('afterend', `<p class="mol-other">${esc(props.title)}</p>`);
          $('h1', main).textContent = better;
        }
      })
      .catch(() => {
        if (isCurrent()) $('[data-wiki]', main).innerHTML = wikiSection(rec, true);
      });
  }
}

function setSeg(main, mode) {
  for (const b of $$('[data-mode]', main)) b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
}

function levelLabel(lv, l = 'id') {
  const map = {
    sd: ['SD', 'primary'],
    smp: ['SMP', 'junior high'],
    sma: ['SMA', 'senior high'],
    kuliah: ['kuliah', 'university'],
  };
  return map[lv][l === 'en' ? 1 : 0];
}

function notFound(main) {
  main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><p>${esc(s.notFoundText)}</p>
    <a class="btn btn-primary" href="/explore">${esc(s.backExplore)}</a></section>`;
}

function legend(atoms) {
  const els = [...new Set(atoms.map(a => a[0]))].slice(0, 12);
  return `<ul class="legend" aria-label="${esc(pick(['Warna atom', 'Atom colours']))}">${els
    .map(el => {
      const e = getElement(el);
      return `<li><span class="dot" style="background:${atomColor(el)}"></span>${esc(el)}${e ? ` · ${esc(pick([e.id, e.en]))}` : ''}</li>`;
    })
    .join('')}</ul>`;
}

function photoFigure(photo, name) {
  return `<figure class="mol-photo">
    <img src="${esc(safeURL(photo.thumb))}" alt="${esc(pick(['Foto', 'Photo']))}: ${esc(name)}" width="${photo.width || 640}" height="${photo.height || 480}" loading="lazy" data-fallback="remove" />
    <figcaption>${esc(fmt(s.photoBy, { author: photo.author, license: photo.license || '—' }))} ${safeURL(photo.page) ? `· <a href="${esc(safeURL(photo.page))}" target="_blank" rel="noopener">${esc(pick(['sumber', 'source']))}</a>` : ''}</figcaption>
  </figure>`;
}

function explain({ m, name, formula, parsed, comp, props, cls, lv }) {
  const counts = parsed.counts || {};
  const els = comp.map(c => getElement(c.el)).filter(Boolean);
  const parts = Object.entries(counts).map(([el, n]) => {
    const e = getElement(el);
    return `${n} ${pick(['atom', 'atom'])} ${e ? pick([e.id.toLowerCase(), e.en.toLowerCase()]) : el}${lang() === 'en' && n > 1 ? 's' : ''}`;
  });
  const list =
    parts.length > 1
      ? `${parts.slice(0, -1).join(', ')} ${s.and} ${parts[parts.length - 1]}`
      : parts[0] || '';
  const out = [];
  const isRatio = m?.ion || m?.lattice || m?.poly;
  if (formula && list) {
    if (totalAtoms(counts) > 40)
      out.push(esc(fmt(s.atoms, { n: totalAtoms(counts) })) + ` · ${formulaHTML(formula)}`);
    else
      out.push(
        esc(fmt(isRatio ? s.sdRatio : s.sdMade, { name, formula: formulaUnicode(formula), parts: list }))
      );
  }
  if (lv !== 'sd' && formula) {
    out.push(
      esc(
        fmt(s.smpFormula, {
          formula: formulaUnicode(formula),
          mw: props.mw ? `${num(props.mw, 2)} g/mol` : '–',
          els: els
            .map(e => `${pick([e.id, e.en])} (${e.s}, ${pick(CATEGORIES[e.cat].name).toLowerCase()})`)
            .join(', '),
        })
      )
    );
    const metal = m?.cls?.includes('logam');
    out.push(
      esc(
        metal
          ? s.bondMetal
          : m?.ion === 'lattice'
            ? s.bondIonic
            : m?.ion === 'network'
              ? s.bondNetwork
              : s.bondCovalent
      )
    );
    if (m?.ion || m?.lattice) out.push(esc(s.ionic));
  }
  if ((lv === 'sma' || lv === 'kuliah') && m?.geo && GEOMETRIES[m.geo]) {
    const g = GEOMETRIES[m.geo];
    out.push(
      esc(fmt(s.geometry, { name: pick(g.name), axe: g.axe, angle: g.angle, hyb: g.hyb })) +
        ` <a href="/lab/vsepr?shape=${m.geo}">${esc(pick(['Coba di lab VSEPR', 'Try it in the VSEPR lab']))}</a>`
    );
  }
  const polarity = m ? POLARITY[m.id] : null;
  if (polarity && lv !== 'sd') {
    const ref = reference(POLARITY_REF);
    out.push(
      `${esc(pick(s.polarity[polarity]))} <a class="term" href="/glossary/molekul-polar">${esc(pick(['Apa itu molekul polar?', 'What is a polar molecule?']))}</a>${
        lv === 'sma' || lv === 'kuliah'
          ? ` <small class="muted">(${extLink(ref.url, ref.label)})</small>`
          : ''
      }`
    );
  }
  if ((lv === 'sma' || lv === 'kuliah') && cls.length)
    out.push(esc(fmt(s.groups, { list: cls.map(c => pick(c.name)).join(', ') })));
  if ((lv === 'sma' || lv === 'kuliah') && props.xlogp != null)
    out.push(
      esc(fmt(s.xlogp, { v: num(props.xlogp, 1), hint: props.xlogp > 1 ? s.lipophilic : s.hydrophilic }))
    );
  if (lv === 'kuliah' && props.tpsa != null)
    out.push(
      esc(
        fmt(s.kuliahDesc, {
          tpsa: num(props.tpsa, 1),
          hbd: props.hbd ?? '–',
          hba: props.hba ?? '–',
          rotb: props.rotb ?? '–',
          cx: num(props.complexity, 0),
        })
      )
    );
  return out.map(p => `<p>${p}</p>`).join('');
}

function compositionBar(comp) {
  return `<div class="card composition"><h3>${esc(s.composition)}</h3>
    <div class="comp-bar" role="img" aria-label="${esc(comp.map(c => `${c.el} ${c.pct.toFixed(1)}%`).join(', '))}">${comp
      .map(
        c =>
          `<span style="flex-basis:${Math.max(c.pct, 0.8)}%;background:${atomColor(c.el)}" title="${c.el} ${c.pct.toFixed(1)}%"></span>`
      )
      .join('')}</div>
    <ul class="comp-list">${comp.map(c => `<li><span class="dot" style="background:${atomColor(c.el)}"></span>${esc(c.el)} × ${c.n} · ${num(c.pct, 1)}%</li>`).join('')}</ul></div>`;
}

function wikiSection(rec, live) {
  const order = lang() === 'en' ? ['en', 'id'] : ['id', 'en'];
  const w = order.map(l => [l, rec?.wiki?.[l]]).find(([, v]) => v?.extract);
  const second = order.map(l => [l, rec?.wiki?.[l]]).filter(([, v]) => v?.extract)[1];
  if (!w) return `<h2>${esc(s.sectionWiki)}</h2><p class="muted">${esc(s.wikiNone)}</p>`;
  const [l, v] = w;
  const paras = v.extract.split('\n').filter(Boolean);
  const short = depth() === 'sd' ? paras.slice(0, 1) : depth() === 'smp' ? paras.slice(0, 2) : paras;
  return `<h2>${esc(s.sectionWiki)}</h2>
    <div class="wiki" lang="${l}">${short.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <p class="source-line">${esc(fmt(s.wikiFrom, { lang: l === 'id' ? 'Bahasa Indonesia' : 'English' }))} · ${extLink(v.url, v.title)}${
      second ? ` · ${extLink(second[1].url, `${second[1].title} (${second[0].toUpperCase()})`)}` : ''
    }</p>`;
}

function propsSection(props, rec, lv) {
  const rows = [
    [pick(['Rumus molekul', 'Molecular formula']), props.formula ? formulaHTML(props.formula) : '–'],
    [pick(['Massa molar', 'Molar mass']), props.mw ? `${num(props.mw, 3)} g/mol` : '–'],
    lv !== 'smp'
      ? [pick(['Massa eksak', 'Exact mass']), props.exactMass ? `${num(props.exactMass, 4)} Da` : '–']
      : null,
    lv !== 'smp' ? ['XLogP', props.xlogp ?? '–'] : null,
    lv !== 'smp'
      ? [
          pick(['Donor / akseptor ikatan H', 'H-bond donors / acceptors']),
          `${props.hbd ?? '–'} / ${props.hba ?? '–'}`,
        ]
      : null,
    lv === 'kuliah' ? ['TPSA', props.tpsa != null ? `${num(props.tpsa, 1)} Å²` : '–'] : null,
    lv === 'kuliah' ? [pick(['Ikatan dapat berputar', 'Rotatable bonds']), props.rotb ?? '–'] : null,
    lv === 'kuliah' ? [pick(['Atom berat', 'Heavy atoms']), props.heavy ?? '–'] : null,
    lv === 'kuliah'
      ? [pick(['Kompleksitas', 'Complexity']), props.complexity != null ? num(props.complexity, 0) : '–']
      : null,
    lv === 'kuliah' ? [pick(['Pusat stereo', 'Stereocentres']), props.stereo ?? '–'] : null,
    lv === 'kuliah' ? [pick(['Muatan formal', 'Formal charge']), props.charge ?? 0] : null,
  ].filter(Boolean);
  const exp = (rec?.experimental || []).filter(
    e => lv === 'kuliah' || lv === 'sma' || BASIC_EXP.includes(e.key)
  );
  return `<h2>${esc(s.sectionProps)}</h2>
    <div class="grid grid-2">
      <div class="card"><h3>${esc(s.computed)}</h3><table class="data-table"><tbody>${rows
        .map(
          ([k, v]) =>
            `<tr><th scope="row">${esc(k)}</th><td>${typeof v === 'string' && v.includes('<sub') ? v : esc(v)}</td></tr>`
        )
        .join('')}</tbody></table></div>
      <div class="card"><h3>${esc(s.experimental)}</h3>${
        exp.length
          ? `<table class="data-table"><tbody>${exp
              .map(
                e =>
                  `<tr><th scope="row">${esc(pick(EXP[e.key] || [e.key, e.key]))}</th><td lang="en">${(lv ===
                  'kuliah'
                    ? e.values
                    : e.values.slice(0, 1)
                  )
                    .map(v => `<p>${esc(v)}</p>`)
                    .join(
                      ''
                    )}${lv === 'kuliah' && e.source ? `<small class="muted">${esc(e.source)}</small>` : ''}</td></tr>`
              )
              .join('')}</tbody></table><p class="muted small">${esc(s.expNote)}</p>`
          : `<p class="muted">–</p>`
      }</div>
    </div>`;
}

function safetySection(ghs, lv) {
  return `<h2>${esc(s.sectionSafety)}</h2>${ghsPanel(ghs, lv)}<p class="muted small">${icon('shield', { size: 14 })} ${esc(s.safetyTip)} ${esc(ui.eduNote)}</p>`;
}

function usesSection(rec, lv) {
  if (!rec?.uses?.length || lv === 'sd' || lv === 'smp') return '';
  return `<h3>${esc(s.pubchemUses)}</h3><ul class="uses" lang="en">${rec.uses
    .slice(0, lv === 'kuliah' ? 5 : 3)
    .map(u => `<li>${esc(u)}</li>`)
    .join('')}</ul>`;
}

function identitySection(props, rec, cid, lv) {
  const ids = [
    ['PubChem CID', extLink(recordURL(cid), String(cid))],
    rec?.cas ? [pick(['Nomor CAS', 'CAS number']), esc(rec.cas)] : null,
    props.iupac ? [pick(['Nama IUPAC', 'IUPAC name']), esc(props.iupac)] : null,
    props.smiles ? ['SMILES', `<code>${esc(props.smiles)}</code>`] : null,
    lv === 'kuliah' && props.inchi ? ['InChI', `<code class="wrap">${esc(props.inchi)}</code>`] : null,
    props.inchikey ? ['InChIKey', `<code>${esc(props.inchikey)}</code>`] : null,
    [s.spectra, extLink(`${recordURL(cid)}#section=Spectral-Information`, s.spectraLink)],
    rec?.wikidata
      ? ['Wikidata', extLink(`https://www.wikidata.org/wiki/${rec.wikidata}`, rec.wikidata)]
      : null,
  ].filter(Boolean);
  const desc = lv === 'kuliah' ? rec?.descriptions || [] : (rec?.descriptions || []).slice(0, 1);
  return `<h2>${esc(s.sectionId)}</h2>
    <div class="grid grid-2">
      <div class="card"><table class="data-table"><tbody>${ids.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`).join('')}</tbody></table></div>
      <div class="card">
        ${rec?.synonyms?.length ? `<h3>${esc(s.synonyms)}</h3><p class="synonyms">${rec.synonyms.map(n => `<span class="chip">${esc(n)}</span>`).join(' ')}</p>` : ''}
        ${desc.length ? `<h3>${esc(s.descriptions)}</h3>${desc.map(d => `<blockquote lang="en"><p>${esc(d.text)}</p><footer>${d.url ? extLink(d.url, d.source) : esc(d.source)}</footer></blockquote>`).join('')}` : ''}
      </div>
    </div>`;
}

/** Everything in Alchemist this compound is part of: its elements, ions, reactions, materials and lessons. */
function linksSection(m, parsed) {
  const chips = (list, href, label) =>
    `<p class="chip-grid">${list.map(x => `<a class="chip" href="${href(x)}">${label(x)}</a>`).join(' ')}</p>`;
  const els = Object.keys(parsed.counts || {})
    .map(getElement)
    .filter(Boolean);
  const ions = m ? [...new Set([...ionsWith(m.id), ...ionsFromAcid(m.id)])] : [];
  const reactions = m ? reactionsWith(`m:${m.id}`) : [];
  const materials = m ? materialsWith(`m:${m.id}`) : [];
  const lessons = m ? topicsLinking('m', m.id) : [];
  const blocks = [
    els.length
      ? `<h3 class="h-small">${esc(s.linkElements)}</h3>${chips(
          els,
          e => `/atom/${e.s}`,
          e => `${esc(e.s)} · ${esc(pick([e.id, e.en]))}`
        )}`
      : '',
    ions.length
      ? `<h3 class="h-small">${esc(s.linkIons)}</h3>${chips(
          ions,
          i => `/ion/${i.id}`,
          i => `${esc(i.f)} · ${esc(pick(i.name))}`
        )}`
      : '',
    reactions.length
      ? `<h3 class="h-small">${esc(s.linkReactions)}</h3>${chips(
          reactions,
          r => `/reaction/${r.id}`,
          r => esc(pick(r.name))
        )}`
      : '',
    materials.length
      ? `<h3 class="h-small">${esc(s.linkMaterials)}</h3>${chips(
          materials,
          x => `/material/${x.id}`,
          x => esc(pick(x.name))
        )}`
      : '',
    lessons.length
      ? `<h3 class="h-small">${esc(s.linkLessons)}</h3>${chips(
          lessons,
          t => `/learn/${t.id}`,
          t => `${icon(t.icon, { size: 14 })} ${esc(pick(t.title))}`
        )}`
      : '',
  ].join('');
  return `<h2>${esc(s.sectionLinks)}</h2>${blocks || `<p class="muted">${esc(pick(['Belum ada tautan lain di Alchemist.', 'No other links in Alchemist yet.']))}</p>`}`;
}

function relatedSection(m, idx) {
  const list = MOLECULES.filter(x => x.id !== m.id && x.cls[0] === m.cls[0]).slice(0, 8);
  if (!list.length) return '';
  return `<section class="mol-section" aria-labelledby="rel-title"><h2 id="rel-title">${esc(s.related)}</h2><div class="grid grid-cards" data-related>${list
    .map(x => moleculeCard(x, idx.get(x.id)))
    .join('')}</div></section>`;
}
