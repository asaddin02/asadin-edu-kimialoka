// Atoms: /atom is the hub for atomic structure; /atom/<symbol> is an element profile: properties, isotopes and
// the IUPAC standard atomic weight, history, uses and occurrence from the reference sources PubChem gathers, GHS
// hazards of the elemental substance, and everything in Kimialoka that contains the element (ions, molecules,
// reactions, materials, lessons).
import { $, esc, safeURL } from '../core/dom.js';
import { S, pick, fmt, num, atLeast, depth } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, extLink } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { ghsPanel } from '../components/ghs.js';
import { bohrSVG, orbitalBoxes, subshells, configText, valenceOf } from '../components/bohr.js';
import { ELEMENTS, CATEGORIES, getElement } from '../data/periodicTable.js';
import { MOLECULES, getMolecule } from '../data/curatedMolecules.js';
import { IONS } from '../data/ions.js';
import { ALL_REACTIONS } from '../data/reactionLibrary.js';
import { materialsWith, MATERIAL_TYPES } from '../data/materials.js';
import { topicsLinking, findTopic } from '../data/topics/index.js';
import { getDomain } from '../data/ontology.js';
import { moleculeIndex, elementRecord } from '../services/data.js';
import { parseFormula, formulaUnicode } from '../services/formula.js';
import { nuclideLabel, nuclideId } from '../services/nuclide.js';
import { recordURL } from '../services/pubchem.js';
import { trackVisit } from '../core/userdata.js';
import { ionCard } from './ion.js';
import { rxCard } from './reaction.js';

const s = S({
  hubTitle: ['Atom: batu bata alam semesta', 'Atoms: the building blocks of everything'],
  hubLead: [
    'Setiap zat tersusun atas atom. Kenali partikel penyusunnya, cara elektron tersusun, dan mengapa unsur berbeda-beda.',
    'Everything is made of atoms. Meet their particles, how electrons are arranged and why elements differ.',
  ],
  particles: ['Tiga partikel penyusun atom', 'Three particles inside an atom'],
  proton: [
    'Proton (p⁺): bermuatan +1, di inti. Jumlahnya = nomor atom, menentukan jenis unsur.',
    'Proton (p⁺): charge +1, in the nucleus. Their number = atomic number, deciding the element.',
  ],
  neutron: [
    'Neutron (n⁰): netral, di inti. Jumlahnya membedakan isotop.',
    'Neutron (n⁰): neutral, in the nucleus. Their number distinguishes isotopes.',
  ],
  electron: [
    'Elektron (e⁻): bermuatan −1, bergerak di kulit/orbital. Elektron terluar menentukan reaksi.',
    'Electron (e⁻): charge −1, in shells/orbitals. The outermost ones decide reactions.',
  ],
  scale: [
    'Jika inti atom sebesar kelereng di tengah lapangan sepak bola, elektronnya beredar sejauh tribun penonton. Atom hampir seluruhnya ruang kosong!',
    'If the nucleus were a marble at the centre of a football pitch, the electrons would be out in the stands. Atoms are almost entirely empty space!',
  ],
  tryElement: ['Coba unsur', 'Try an element'],
  explore: ['Jelajahi lebih lanjut', 'Explore further'],
  // element page
  notFound: ['Unsur tidak ditemukan.', 'Element not found.'],
  atomicNumber: ['Nomor atom', 'Atomic number'],
  mass: ['Massa atom relatif', 'Relative atomic mass'],
  group: ['Golongan', 'Group'],
  period: ['Periode', 'Period'],
  block: ['Blok', 'Block'],
  category: ['Kategori', 'Category'],
  state: ['Wujud (25 °C)', 'State (25 °C)'],
  config: ['Konfigurasi elektron', 'Electron configuration'],
  shells: ['Elektron per kulit', 'Electrons per shell'],
  valence: ['Elektron valensi', 'Valence electrons'],
  eneg: ['Keelektronegatifan (Pauling)', 'Electronegativity (Pauling)'],
  radius: ['Jari-jari atom', 'Atomic radius'],
  ie: ['Energi ionisasi pertama', 'First ionisation energy'],
  ea: ['Afinitas elektron', 'Electron affinity'],
  ox: ['Bilangan oksidasi', 'Oxidation states'],
  mp: ['Titik leleh', 'Melting point'],
  bp: ['Titik didih', 'Boiling point'],
  density: ['Massa jenis', 'Density'],
  year: ['Ditemukan', 'Discovered'],
  ancient: ['Zaman kuno', 'Antiquity'],
  bohr: ['Model atom Bohr', 'Bohr model'],
  orbitals: ['Diagram orbital', 'Orbital diagram'],
  molecules: ['Molekul yang mengandung {name}', 'Molecules containing {name}'],
  noMolecules: [
    'Belum ada molekul katalog dengan unsur ini. Cari di PubChem lewat halaman Jelajah.',
    'No catalogue molecules with this element yet. Search PubChem from Explore.',
  ],
  wiki: ['Ensiklopedia', 'Encyclopedia'],
  photoBy: [
    'Foto: {author} · {license} · Wikimedia Commons',
    'Photo: {author} · {license} · Wikimedia Commons',
  ],
  labLink: ['Buka di lab Konfigurasi elektron', 'Open in the Electron configuration lab'],
  prev: ['Unsur sebelumnya', 'Previous element'],
  next: ['Unsur berikutnya', 'Next element'],
  states: { solid: ['Padat', 'Solid'], liquid: ['Cair', 'Liquid'], gas: ['Gas', 'Gas'] },
  // isotopes and atomic weight
  isotopes: ['Isotop & berat atom', 'Isotopes & atomic weight'],
  isoCount: [
    '{name} memiliki {n} nuklida yang dikenal; {stable} di antaranya stabil.',
    '{name} has {n} known nuclides; {stable} of them are stable.',
  ],
  isoNone: [
    '{name} memiliki {n} nuklida yang dikenal dan semuanya radioaktif: tidak ada isotop yang stabil.',
    '{name} has {n} known nuclides and all of them are radioactive: none is stable.',
  ],
  isoSimple: [
    'Atom-atom {name} tidak semuanya sama berat: jumlah neutronnya bisa berbeda. Atom seperti itu disebut isotop.',
    'Not all {name} atoms weigh the same: their number of neutrons can differ. Such atoms are called isotopes.',
  ],
  weight: ['Berat atom standar (IUPAC CIAAW)', 'Standard atomic weight (IUPAC CIAAW)'],
  weightStd: [
    'Angka dalam kurung adalah ketidakpastian pada digit terakhir, misalnya 55,845(2) berarti 55,845 ± 0,002.',
    'The number in brackets is the uncertainty in the last digit: 55.845(2) means 55.845 ± 0.002.',
  ],
  weightInterval: [
    'Ditulis sebagai rentang karena komposisi isotop {name} di alam berbeda-beda menurut asal sampelnya. Untuk perhitungan sehari-hari dipakai nilai konvensional {m}.',
    'Given as an interval because the isotopic make-up of {name} varies with where a sample comes from. Everyday calculations use the conventional value {m}.',
  ],
  noWeight: ['Berat atom standar', 'Standard atomic weight'],
  noWeightText: [
    'Tidak ada: {name} tidak memiliki isotop stabil dengan komposisi alami yang tetap, sehingga IUPAC tidak menetapkan berat atom standarnya.',
    'None: {name} has no stable isotopes with a characteristic natural composition, so IUPAC gives it no standard atomic weight.',
  ],
  massNumber: [
    'NIST mencantumkan [{a}]: nomor massa isotop acuan {name}, bukan berat atom rata-rata.',
    'NIST lists [{a}]: the mass number of a reference isotope of {name}, not an average atomic weight.',
  ],
  isotopeMass: [
    'NIST mencantumkan {v}: massa atom relatif isotop {nuc}, bukan berat atom rata-rata.',
    'NIST lists {v}: the relative atomic mass of the isotope {nuc}, not an average atomic weight.',
  ],
  estimated: ['Tanda # berarti nilai perkiraan.', 'A # marks an estimated value.'],
  natural: ['Isotop di alam (IUPAC CIAAW)', 'Isotopes in nature (IUPAC CIAAW)'],
  naturalNist: ['Isotop di alam (NIST)', 'Isotopes in nature (NIST)'],
  nuclide: ['Isotop', 'Isotope'],
  isoMass: ['Massa atom (u)', 'Atomic mass (u)'],
  isoAbundance: ['Kelimpahan (fraksi jumlah atom)', 'Abundance (amount fraction)'],
  isoIntervalNote: [
    'Kelimpahan dalam kurung siku adalah rentang yang teramati di alam.',
    'Abundances in square brackets are the ranges observed in nature.',
  ],
  allIsotopes: ['Semua {n} isotop di penjelajah isotop', 'All {n} isotopes in the isotope explorer'],
  // text from reference sources
  story: ['Sejarah, kegunaan, dan keberadaan', 'History, uses and occurrence'],
  storyNote: [
    'Teks asli berbahasa Inggris dari lembaga rujukan yang dihimpun PubChem.',
    'Original text from the reference institutions that PubChem compiles.',
  ],
  texts: {
    history: ['Sejarah penemuan', 'History'],
    uses: ['Kegunaan', 'Uses'],
    sources: ['Sumber di alam & cara memperoleh', 'Sources and production'],
    description: ['Deskripsi', 'Description'],
    handling: ['Penanganan & penyimpanan', 'Handling & storage'],
  },
  abundance: ['Kelimpahan di Bumi', 'Abundance on Earth'],
  crust: ['Kerak bumi (perkiraan)', 'Earth’s crust (estimated)'],
  ocean: ['Air laut (perkiraan)', 'Seawater (estimated)'],
  notApplicable: [
    'Tidak berlaku (tidak terdapat secara alami dalam jumlah terukur)',
    'Not applicable (not found naturally in measurable amounts)',
  ],
  physical: ['Wujud menurut sumber', 'Physical description'],
  // hazards, ions, related
  safety: ['Keamanan zat unsurnya (GHS)', 'Safety of the elemental substance (GHS)'],
  safetyFor: [
    'Klasifikasi untuk {what} (PubChem CID {cid}).',
    'Classification for {what} (PubChem CID {cid}).',
  ],
  safetyNone: [
    'PubChem belum memiliki klasifikasi GHS untuk zat unsur ini. Data belum tersedia.',
    'PubChem has no GHS classification for this elemental substance. No data available.',
  ],
  ions: ['Ion dari {name}', 'Ions containing {name}'],
  forms: ['Bentuk ion yang tercatat di PubChem', 'Ionic forms recorded in PubChem'],
  reactions: ['Reaksi yang melibatkan {name}', 'Reactions involving {name}'],
  materials: ['Material & campuran yang mengandung {name}', 'Materials & mixtures containing {name}'],
  lessons: ['Pelajari lebih lanjut', 'Learn more'],
  lessonsLead: [
    'Materi dan cabang ilmu kimia yang membahas unsur ini.',
    'Lessons and branches of chemistry that cover this element.',
  ],
  refs: ['Sumber data unsur ini', 'Data sources for this element'],
});

const TEXT_ORDER = ['history', 'uses', 'sources', 'description', 'handling'];

/** "5.63×10^4 milligrams per kilogram" → "5,63 × 10⁴ mg/kg" as HTML. */
function abundanceHTML(raw) {
  if (!raw) return esc(pick(['Data belum tersedia', 'No data available']));
  if (/not applicable/i.test(raw)) return esc(s.notApplicable);
  return esc(raw)
    .replace(/×10\^(-?\d+)/g, (_, p) => ` × 10<sup>${p.replace('-', '−')}</sup>`)
    .replace(/milligrams per kilogram/i, 'mg/kg')
    .replace(/milligrams per liter/i, 'mg/L');
}

/** The atomic-weight block: the CIAAW standard atomic weight, or why the element has none. */
function weightHTML(e, w) {
  const name = pick([e.id, e.en]);
  if (!w) return `<p class="muted">${esc(pick(['Data belum tersedia.', 'No data available.']))}</p>`;
  if (w.kind === 'standard' || w.kind === 'interval')
    return `<p class="big-value"><span class="mono">${esc(w.value)}</span></p>
      <p class="muted small">${esc(w.kind === 'interval' ? fmt(s.weightInterval, { name, m: e.m }) : s.weightStd)}</p>`;
  const detail =
    w.kind === 'mass-number'
      ? fmt(s.massNumber, { a: w.A, name })
      : fmt(s.isotopeMass, { v: w.value, nuc: nuclideLabel(w.A, e.s) });
  return `<p><strong>–</strong> ${esc(fmt(s.noWeightText, { name }))}</p>
    <p class="muted small">${esc(detail)}${w.estimated ? ` ${esc(s.estimated)}` : ''}</p>`;
}

export const title = route => {
  if (!route.id) return pick(['Atom', 'Atoms']);
  const e = getElement(route.id);
  return e ? pick([e.id, e.en]) : pick(['Unsur', 'Element']);
};

export async function render({ id, main, isCurrent }) {
  if (!id) return renderHub(main);
  const e = getElement(id);
  if (!e) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="/table">${esc(pick(['Tabel periodik', 'Periodic table']))}</a></section>`;
    return;
  }
  trackVisit(`el:${e.s}`, pick([e.id, e.en]));
  main.innerHTML = `<div class="container">${loading()}</div>`;
  const [rec, idx] = await Promise.all([elementRecord(e.z).catch(() => null), moleculeIndex()]);
  if (!isCurrent()) return;
  const parts = subshells(e.conf, e.z);
  const cat = CATEGORIES[e.cat];
  const withEl = MOLECULES.filter(m => {
    const f = idx.get(m.id)?.formula;
    return f && parseFormula(f).counts?.[e.s];
  });
  const lv = depth();
  const prev = ELEMENTS[e.z - 2];
  const next = ELEMENTS[e.z];
  const wiki = pick([rec?.wiki?.id, rec?.wiki?.en]) || rec?.wiki?.en || rec?.wiki?.id;
  const paras = wiki?.extract?.split('\n').filter(Boolean) || [];
  const photo =
    rec?.photo && rec.photo.kind !== 'diagram' && !/\.svg$/i.test(rec.photo.file) ? rec.photo : null;
  const stateName = s.states?.[e.state] ? pick(s.states[e.state]) : e.state || '–';
  const name = pick([e.id, e.en]);
  const has = formula => (parseFormula(formula).counts?.[e.s] || 0) > 0;
  const ions = IONS.filter(i => has(i.f)).sort(
    (a, b) => Number(a.poly || a.complex || 0) - Number(b.poly || b.complex || 0)
  );
  const ionForms = (rec?.forms || []).filter(f => f.charge !== 0);
  const reactions = ALL_REACTIONS.filter(r =>
    r.types.includes('nuklir')
      ? [...r.r, ...r.p].some(x => x[2] === e.s)
      : [...r.r, ...r.p].some(x => has(x[1]))
  );
  const materials = materialsWith(`e:${e.s}`);
  const substance = rec?.substance ? getMolecule(rec.substance) : null;
  const radioactive = rec?.stableCount === 0;
  const lessonIds = new Set([
    ...topicsLinking('e', e.s).map(t => t.id),
    ...ions.flatMap(i => topicsLinking('i', i.id).map(t => t.id)),
    'periodik',
    'atom',
    ...(radioactive ? ['nuklir'] : []),
  ]);
  const lessons = [...lessonIds].map(findTopic).filter(Boolean).slice(0, 8);
  const domains = [
    'tabel-periodik',
    'struktur-atom',
    radioactive ? 'inti' : null,
    e.s === 'C' ? 'organik' : 'anorganik',
  ]
    .map(d => d && getDomain(d))
    .filter(Boolean);
  const texts = TEXT_ORDER.filter(k => rec?.texts?.[k]?.length).filter(k =>
    lv === 'kuliah' ? true : lv === 'sma' ? k !== 'handling' : ['history', 'uses'].includes(k)
  );
  const refName = key => rec?.refs?.[key]?.name || key;
  const refLink = key =>
    safeURL(rec?.refs?.[key]?.url) ? extLink(rec.refs[key].url, refName(key)) : esc(refName(key));
  const nuclideCount = rec?.nuclides?.length || 0;
  const w = rec?.weight;
  const weightTitle = w && (w.kind === 'standard' || w.kind === 'interval') ? s.weight : s.noWeight;

  const facts = [
    [s.atomicNumber, e.z],
    [s.mass, e.m != null ? `${e.m} u` : '–'],
    [s.category, pick(cat.name)],
    [s.group, e.group ?? `${pick(['deret', 'series'])} ${e.block}`],
    [s.period, e.period],
    [s.block, e.block],
    [s.state, stateName],
    atLeast('smp') ? [s.shells, e.shells.join(' · ')] : null,
    atLeast('smp') && ['s', 'p'].includes(e.block) ? [s.valence, valenceOf(parts)] : null,
    atLeast('sma') ? [s.config, `${configText(parts)}`] : null,
    atLeast('sma') ? [s.eneg, e.eneg ?? '–'] : null,
    atLeast('sma') ? [s.radius, e.rad ? `${e.rad} pm` : '–'] : null,
    atLeast('sma') ? [s.ie, e.ie ? `${num(e.ie, 3)} eV` : '–'] : null,
    lv === 'kuliah' ? [s.ea, e.ea != null ? `${num(e.ea, 3)} eV` : '–'] : null,
    atLeast('sma') ? [s.ox, e.ox || '–'] : null,
    atLeast('smp') ? [s.mp, e.mp ? `${num(e.mp, 1)} K (${num(e.mp - 273.15, 1)} °C)` : '–'] : null,
    atLeast('smp') ? [s.bp, e.bp ? `${num(e.bp, 1)} K (${num(e.bp - 273.15, 1)} °C)` : '–'] : null,
    atLeast('smp') ? [s.density, e.d != null ? `${num(e.d, e.d < 0.01 ? 6 : 3)} g/cm³` : '–'] : null,
    [s.year, e.year === 0 ? s.ancient : (e.year ?? '–')],
  ].filter(Boolean);

  main.innerHTML = `<article class="container element-page" style="--accent:${cat.color}">
    ${breadcrumbs([
      [pick(['Tabel periodik', 'Periodic table']), '/table'],
      [pick([e.id, e.en]), ''],
    ])}
    <header class="element-head">
      <div class="element-big" aria-hidden="true"><span class="z">${e.z}</span><span class="sym">${esc(e.s)}</span><span class="nm">${esc(pick([e.id, e.en]))}</span><span class="m">${e.m ?? ''}</span></div>
      <div>
        <p class="eyebrow">${esc(pick(cat.name))}</p>
        <h1>${esc(pick([e.id, e.en]))} <span class="muted">(${esc(e.s)})</span></h1>
        <p class="mol-other">${esc(pick([e.en, e.id]))}</p>
        <nav class="el-nav" aria-label="${esc(pick(['Unsur lain', 'Other elements']))}">
          ${prev ? `<a class="btn btn-small" href="/atom/${prev.s}" aria-label="${esc(s.prev)}: ${esc(pick([prev.id, prev.en]))}">${`← ${esc(prev.s)}`}</a>` : ''}
          ${next ? `<a class="btn btn-small" href="/atom/${next.s}" aria-label="${esc(s.next)}: ${esc(pick([next.id, next.en]))}">${`${esc(next.s)} →`}</a>` : ''}
        </nav>
      </div>
    </header>
    <div class="element-grid">
      <div class="card">
        <table class="data-table"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
        <p class="source-line">${esc(pick(['Sumber', 'Source']))}: ${extLink(`https://pubchem.ncbi.nlm.nih.gov/element/${e.z}`, 'PubChem Periodic Table')}</p>
      </div>
      <div class="element-visuals">
        ${photo ? `<figure class="mol-photo"><img src="${esc(safeURL(photo.thumb))}" alt="${esc(pick(['Foto', 'Photo']))}: ${esc(pick([e.id, e.en]))}" width="${photo.width || 640}" height="${photo.height || 480}" loading="lazy" data-fallback="remove" /><figcaption>${esc(fmt(s.photoBy, { author: photo.author, license: photo.license || '—' }))}${safeURL(photo.page) ? ` · <a href="${esc(safeURL(photo.page))}" target="_blank" rel="noopener">${esc(pick(['sumber', 'source']))}</a>` : ''}</figcaption></figure>` : ''}
        <figure class="card bohr-card"><figcaption class="h-small">${esc(s.bohr)}</figcaption>${bohrSVG(e.shells, e.s, 240)}</figure>
      </div>
    </div>
    ${atLeast('sma') ? `<section class="card"><h2 class="h-small">${esc(s.orbitals)}</h2>${orbitalBoxes(parts)}<p><a href="/lab/orbital?z=${e.z}">${esc(s.labLink)}</a></p></section>` : ''}
    ${rec ? isotopeSection(e, rec, lv, { name, nuclideCount, w, weightTitle }) : ''}
    ${
      paras.length
        ? `<section class="mol-section"><h2>${esc(s.wiki)}</h2><div class="wiki">${(lv === 'sd' ? paras.slice(0, 1) : lv === 'smp' ? paras.slice(0, 2) : paras).map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <p class="source-line">Wikipedia, CC BY-SA 4.0 · ${extLink(wiki.url, wiki.title)}</p></section>`
        : ''
    }
    ${
      texts.length && lv !== 'sd'
        ? `<section class="mol-section" aria-labelledby="story-title"><h2 id="story-title">${esc(s.story)}</h2>
      <p class="muted small">${esc(s.storyNote)}</p>
      <div class="grid grid-2">${texts
        .map(
          k =>
            `<div class="card"><h3 class="h-small">${esc(pick(s.texts[k]))}</h3>${rec.texts[k]
              .slice(0, lv === 'smp' ? 1 : lv === 'sma' ? 2 : 4)
              .map(
                t =>
                  `<blockquote lang="en"><p>${esc(t.text)}</p><footer>${refLink(t.source)}</footer></blockquote>`
              )
              .join('')}</div>`
        )
        .join('')}</div></section>`
        : ''
    }
    ${
      rec?.abundance && atLeast('smp')
        ? `<section class="mol-section" aria-labelledby="abund-title"><h2 id="abund-title">${esc(s.abundance)}</h2>
      <div class="card"><table class="data-table"><tbody>
        <tr><th scope="row">${esc(s.crust)}</th><td>${abundanceHTML(rec.abundance.crust)}</td></tr>
        <tr><th scope="row">${esc(s.ocean)}</th><td>${abundanceHTML(rec.abundance.ocean)}</td></tr>
        ${rec.physical ? `<tr><th scope="row">${esc(s.physical)}</th><td lang="en">${esc(rec.physical)}</td></tr>` : ''}
      </tbody></table>
      ${rec.abundance.source ? `<p class="source-line">${esc(pick(['Sumber', 'Source']))}: ${refLink(rec.abundance.source)}</p>` : ''}</div></section>`
        : ''
    }
    <section class="mol-section" aria-labelledby="safety-title"><h2 id="safety-title">${esc(s.safety)}</h2>
      ${
        rec?.ghs
          ? `<p class="muted small">${esc(fmt(s.safetyFor, { what: substance ? pick(substance.name) : name, cid: rec.ghsCid }))}${substance ? ` <a href="/molecule/${substance.id}">${esc(pick(['Buka kartu zatnya', 'Open its substance card']))}</a>` : ''}</p>${ghsPanel(rec.ghs, lv)}`
          : `<p class="muted">${esc(s.safetyNone)}</p>`
      }
    </section>
    ${
      ions.length || (ionForms.length && atLeast('sma'))
        ? `<section class="mol-section" aria-labelledby="ions-title"><h2 id="ions-title">${esc(fmt(s.ions, { name }))}</h2>
      ${ions.length ? `<div class="grid grid-4">${ions.map(ionCard).join('')}</div>` : ''}
      ${
        ionForms.length && atLeast('sma')
          ? `<p class="muted small">${esc(s.forms)}: ${ionForms
              .map(f => extLink(recordURL(f.cid), formulaUnicode(f.formula.replace(/([+-])(\d*)$/, ' $2$1'))))
              .join(', ')}</p>`
          : ''
      }</section>`
        : ''
    }
    <section class="mol-section">
      <h2>${esc(fmt(s.molecules, { name: pick([e.id, e.en]) }))}</h2>
      ${
        withEl.length
          ? `<div class="grid grid-cards">${withEl
              .slice(0, 16)
              .map(m => moleculeCard(m, idx.get(m.id)))
              .join('')}</div>`
          : `<p class="muted">${esc(s.noMolecules)}</p>`
      }
      <p><a class="link-more" href="/explore?q=${encodeURIComponent(e.s)}">${icon('search', { size: 16 })} ${esc(pick(['Cari senyawa lain di PubChem', 'Search more compounds in PubChem']))}</a></p>
    </section>
    ${
      reactions.length
        ? `<section class="mol-section" aria-labelledby="rx-title"><h2 id="rx-title">${esc(fmt(s.reactions, { name }))}</h2>
      <div class="rx-grid">${reactions.slice(0, 6).map(rxCard).join('')}</div>
      ${reactions.length > 6 ? `<p><a class="link-more" href="/reaction?q=${encodeURIComponent(e.s)}">${esc(pick(['Lihat semua reaksi', 'See all reactions']))} (${reactions.length})</a></p>` : ''}</section>`
        : ''
    }
    ${
      materials.length
        ? `<section class="mol-section" aria-labelledby="mat-title"><h2 id="mat-title">${esc(fmt(s.materials, { name }))}</h2>
      <p class="chip-grid">${materials.map(m => `<a class="chip" href="/material/${m.id}">${esc(pick(m.name))} · ${esc(pick(MATERIAL_TYPES[m.type].name))}</a>`).join(' ')}</p></section>`
        : ''
    }
    <section class="mol-section" aria-labelledby="learn-title"><h2 id="learn-title">${esc(s.lessons)}</h2>
      <p class="muted">${esc(s.lessonsLead)}</p>
      <div class="grid grid-cards">${lessons
        .map(
          t =>
            `<a class="card topic-card" href="/learn/${t.id}"><span class="topic-icon">${icon(t.icon, { size: 22 })}</span><span class="card-title">${esc(pick(t.title))}</span><span class="card-text">${esc(pick(t.summary))}</span></a>`
        )
        .join('')}</div>
      <p class="chip-row">${domains.map(d => `<a class="chip" href="/peta/${d.id}">${icon(d.icon, { size: 14 })} ${esc(pick(d.name))}</a>`).join(' ')}</p>
    </section>
    <section class="mol-section refs" aria-labelledby="ref-title"><h2 class="h-small" id="ref-title">${esc(s.refs)}</h2>
      <ul class="ref-list">
        <li>${extLink(`https://pubchem.ncbi.nlm.nih.gov/element/${e.z}`, `PubChem Element ${e.z} (${e.en})`)}</li>
        ${Object.keys(rec?.refs || {})
          .filter(k => safeURL(rec.refs[k].url))
          .map(k => `<li>${extLink(rec.refs[k].url, rec.refs[k].name)}</li>`)
          .join('')}
        ${wiki?.url ? `<li>${extLink(wiki.url, `Wikipedia: ${wiki.title}`)}</li>` : ''}
      </ul>
      ${rec?.refs?.iptei ? `<p class="muted small">${esc(pick(['Teks IUPAC IPTEI berlisensi CC BY-NC-ND 4.0 dan ditampilkan tanpa diubah.', 'IUPAC IPTEI text is licensed CC BY-NC-ND 4.0 and shown unmodified.']))}</p>` : ''}
    </section>
  </article>`;
}

/** Isotopes and the atomic weight: CIAAW standard atomic weight, natural isotopes and the nuclide count. */
function isotopeSection(e, rec, lv, { name, nuclideCount, w, weightTitle }) {
  const natural = rec.natural || [];
  const stable = rec.stableCount ?? 0;
  const count = nuclideCount ? fmt(stable ? s.isoCount : s.isoNone, { name, n: nuclideCount, stable }) : '';
  const intervals = natural.some(x => /^\[/.test(x.abundance));
  const table =
    natural.length && atLeast('smp')
      ? `<h3 class="h-small">${esc(rec.naturalSource === 'nist' ? s.naturalNist : s.natural)}</h3>
      <div class="table-wrap"><table class="data-table iso-table"><thead><tr><th scope="col">${esc(s.nuclide)}</th>${lv !== 'smp' ? `<th scope="col">${esc(s.isoMass)}</th>` : ''}<th scope="col">${esc(s.isoAbundance)}</th></tr></thead>
      <tbody>${natural
        .map(
          x =>
            `<tr><th scope="row"><a href="/isotope/${nuclideId(e.s, x.A)}">${esc(nuclideLabel(x.A, e.s))}</a></th>${lv !== 'smp' ? `<td class="mono">${esc(x.mass)}</td>` : ''}<td class="mono">${esc(x.abundance)}</td></tr>`
        )
        .join('')}</tbody></table></div>
      ${intervals ? `<p class="muted small">${esc(s.isoIntervalNote)}</p>` : ''}`
      : '';
  return `<section class="mol-section" aria-labelledby="iso-title"><h2 id="iso-title">${icon('nucleus', { size: 22 })} ${esc(s.isotopes)}</h2>
    ${lv === 'sd' ? `<p>${esc(fmt(s.isoSimple, { name }))}</p>` : ''}
    <div class="grid grid-2">
      <div class="card">
        <h3 class="h-small">${esc(weightTitle)}</h3>
        ${atLeast('smp') ? weightHTML(e, w) : `<p class="big-value">${e.m ?? '–'}</p>`}
        ${w?.source && atLeast('smp') ? `<p class="source-line">${esc(pick(['Sumber', 'Source']))}: ${extLink(rec.refs?.[w.source]?.url || '', rec.refs?.[w.source]?.name || w.source)}</p>` : ''}
      </div>
      <div class="card">
        ${count ? `<p>${esc(count)}</p>` : ''}
        ${table}
        <p><a class="btn btn-small" href="/isotope?q=${encodeURIComponent(e.s)}">${icon('nucleus', { size: 16 })} ${esc(fmt(s.allIsotopes, { n: nuclideCount }))}</a></p>
      </div>
    </div>
  </section>`;
}

function renderHub(main) {
  const sample = ['H', 'C', 'O', 'Na', 'Fe', 'Au'].map(getElement);
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.hubTitle), lead: esc(s.hubLead) })}
    <section class="grid grid-2">
      <div class="card">
        <h2 class="h-small">${esc(s.particles)}</h2>
        <ul class="particles">
          <li><span class="dot dot-p" aria-hidden="true"></span>${esc(s.proton)}</li>
          <li><span class="dot dot-n" aria-hidden="true"></span>${esc(s.neutron)}</li>
          <li><span class="dot dot-e" aria-hidden="true"></span>${esc(s.electron)}</li>
        </ul>
        <p class="muted">${esc(s.scale)}</p>
      </div>
      <div class="card center">
        <label class="field"><span>${esc(s.tryElement)}</span>
          <select data-pick>${ELEMENTS.map(e => `<option value="${e.s}" ${e.s === 'C' ? 'selected' : ''}>${e.z}. ${esc(pick([e.id, e.en]))} (${e.s})</option>`).join('')}</select></label>
        <div data-bohr>${bohrSVG(getElement('C').shells, 'C', 240)}</div>
        <p data-shells class="formula">${getElement('C').shells.join(' · ')}</p>
      </div>
    </section>
    <section>
      <h2>${esc(s.explore)}</h2>
      <div class="grid grid-4">
        <a class="card lab-card" href="/table"><span class="topic-icon">${icon('table', { size: 24 })}</span><span class="card-title">${esc(pick(['Tabel periodik', 'Periodic table']))}</span><span class="card-text">${esc(pick(['118 unsur dengan data PubChem', '118 elements with PubChem data']))}</span></a>
        <a class="card lab-card" href="/lab/orbital"><span class="topic-icon">${icon('atom', { size: 24 })}</span><span class="card-title">${esc(pick(['Lab konfigurasi elektron', 'Electron configuration lab']))}</span><span class="card-text">${esc(pick(['Aufbau, Pauli, Hund, dan bentuk orbital', 'Aufbau, Pauli, Hund and orbital shapes']))}</span></a>
        <a class="card lab-card" href="/lab/nyala"><span class="topic-icon">${icon('flame', { size: 24 })}</span><span class="card-title">${esc(pick(['Uji nyala logam', 'Flame tests']))}</span><span class="card-text">${esc(pick(['Warna nyala dari loncatan elektron', 'Flame colours from electron jumps']))}</span></a>
        <a class="card lab-card" href="/learn/atom"><span class="topic-icon">${icon('book', { size: 24 })}</span><span class="card-title">${esc(pick(['Materi: Atom dan strukturnya', 'Lesson: Atoms and their structure']))}</span><span class="card-text">${esc(pick(['Dari Dalton sampai mekanika kuantum', 'From Dalton to quantum mechanics']))}</span></a>
      </div>
      <p class="hero-try">${sample.map(e => `<a class="chip" href="/atom/${e.s}">${esc(e.s)} · ${esc(pick([e.id, e.en]))}</a>`).join(' ')}</p>
    </section>
  </div>`;
  const select = $('[data-pick]', main);
  select.addEventListener('change', () => {
    const e = getElement(select.value);
    $('[data-bohr]', main).innerHTML = bohrSVG(e.shells, e.s, 240);
    $('[data-shells]', main).textContent = e.shells.join(' · ');
  });
}
