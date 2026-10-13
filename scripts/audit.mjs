#!/usr/bin/env node
// Coverage audit of Kimialoka against the chemistry scope (docs/AUDIT-CHEMISTRY.md, part B). Recomputed from the
// data every time, so the numbers in the audit can be reproduced. It measures concept coverage per domain (the same
// 194 concepts and Indonesian/English keyword patterns as the initial audit in part A), entities, metadata,
// sources, relations and education. Keyword presence is an upper bound: a word that appears is not necessarily
// explained. Output is Markdown.
// Usage: npm run audit
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GLOSSARY } from '../js/data/glossary.js';
import { TOPICS, loadTopics } from '../js/data/topics/index.js';
import { MOLECULES } from '../js/data/curatedMolecules.js';
import { CLASSES } from '../js/data/classes.js';
import { ELEMENTS } from '../js/data/periodicTable.js';
import { LABS } from '../js/data/curriculum.js';
import { IONS } from '../js/data/ions.js';
import { LIBRARY, NUCLEAR, REACTION_TYPES } from '../js/data/reactionLibrary.js';
import { MATERIALS, MATERIAL_TYPES } from '../js/data/materials.js';
import { DOMAINS } from '../js/data/ontology.js';
import { POLARITY } from '../js/data/geometry.js';
import { parseFormula } from '../js/services/formula.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const readJSON = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const LV = ['sd', 'smp', 'sma', 'kuliah'];
const plain = s =>
  String(s || '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => b || a)
    .replace(/\{\{[^:]+:([^}|]+)(?:\|([^}]+))?\}\}/g, (_, a, b) => b || a);
const pct = (n, d) => `${n}/${d} (${Math.round((100 * n) / (d || 1))}%)`;
const out = [];
const log = (...x) => out.push(x.join(' '));

const topics = await loadTopics();
const gloss = GLOSSARY.map(g => ({ key: g.key, term: g.term.join(' ').toLowerCase() }));
const bodies = topics.flatMap(t =>
  LV.filter(l => t.body[l]).map(l => ({ t: t.id, l, text: plain(t.body[l].join(' ')).toLowerCase() }))
);

// Domain → concept → pattern (Indonesian or English wording), identical to the initial audit.
const D = {
  '4 Matter': {
    matter: /\bmateri\b|\bmatter\b/,
    substance: /\bzat\b|substance/,
    'pure substance': /zat tunggal|zat murni|pure substance/,
    mixture: /campuran|mixture/,
    solution: /larutan|solution/,
    suspension: /suspensi|suspension/,
    colloid: /koloid|colloid/,
    solid: /padat|solid/,
    liquid: /\bcair\b|liquid/,
    gas: /\bgas\b/,
    plasma: /plasma/,
    phase: /\bfase\b|\bphase\b/,
    'phase transition':
      /mencair|membeku|menguap|mengembun|menyublim|melting|freezing|evaporat|condens|sublimat|perubahan wujud|phase change|phase transition/,
  },
  '5 Particles': {
    'fundamental particle': /partikel (elementer|fundamental|dasar)|(fundamental|elementary) particle/,
    electron: /elektron|electron/,
    proton: /proton/,
    neutron: /neutron/,
    quark: /quark|kuark/,
    lepton: /lepton/,
    'particle≠atom≠ion≠molecule':
      /(partikel.{0,80}atom.{0,80}ion.{0,80}molekul)|(particle.{0,80}atom.{0,80}ion.{0,80}molecule)/,
  },
  '6 Atomic structure': {
    nucleus: /inti atom|nucleus/,
    'atomic number': /nomor atom|atomic number/,
    'mass number': /nomor massa|mass number/,
    isotope: /isotop/,
    'electron configuration': /konfigurasi elektron|electron configuration/,
    shell: /kulit|shell/,
    subshell: /subkulit|subshell/,
    orbital: /orbital/,
    'quantum numbers': /bilangan kuantum|quantum number/,
    'valence electrons': /elektron valensi|valence electron/,
    'atomic radius': /jari-jari atom|atomic radius/,
    'ionization energy': /energi ionisasi|ioni[sz]ation energy/,
    'electron affinity': /afinitas elektron|electron affinity/,
    electronegativity: /keelektronegatifan|electronegativity/,
    'periodic trends': /(sifat|tren) (keperiodikan|periodik)|periodic trend/,
  },
  '8 Isotopes & nuclear': {
    'stable isotope': /isotop stabil|stable isotope/,
    'radioactive isotope': /radioisotop|isotop radioaktif|radioactive isotope|radioisotope/,
    abundance: /kelimpahan|abundance/,
    'half-life': /waktu paruh|half-life/,
    decay: /peluruhan|decay/,
    'alpha decay': /(peluruhan|radiasi|sinar|partikel) alfa|alpha (decay|particle|radiation)/,
    'beta decay': /(peluruhan|radiasi|sinar|partikel) beta|beta (decay|particle|radiation)/,
    'gamma decay': /(sinar|radiasi) gamma|gamma (ray|radiation|decay)/,
    'nuclear transformation': /fisi|fusi|transmutasi|fission|fusion|transmutation/,
  },
  '9 Ions': {
    cation: /kation|cation/,
    anion: /anion/,
    'polyatomic ion': /ion poliatom|polyatomic ion/,
    'ion charge': /muatan ion|ion(ic)? charge/,
  },
  '10 Bonding': {
    'ionic bond': /ikatan ion|ionic bond/,
    'covalent bond': /ikatan kovalen|covalent bond/,
    'metallic bond': /ikatan logam|metallic bond/,
    'coordinate bond': /kovalen koordinasi|koordinat|dative|coordinate (covalent )?bond/,
    polarity: /kepolaran|polar/,
    'Lewis structure': /struktur lewis|lewis structure/,
    resonance: /resonansi|resonance/,
    'molecular geometry': /bentuk molekul|geometri|molecular (shape|geometry)/,
    VSEPR: /vsepr/,
    hybridization: /hibridisasi|hybridi[sz]ation/,
    'intermolecular forces': /gaya antarmolekul|intermolecular force/,
    'hydrogen bond': /ikatan hidrogen|hydrogen bond/,
    'van der Waals': /van der waals|gaya london|london (dispersion)? ?force|dispersion force/,
  },
  '12 Organic': {
    alkane: /alkana|alkane/,
    alkene: /alkena|alkene/,
    alkyne: /alkuna|alkyne/,
    aromatic: /aromatik|aromatic/,
    alcohol: /alkohol|alcohol/,
    ether: /\beter\b|\bether/,
    aldehyde: /aldehida|aldehyde/,
    ketone: /keton/,
    'carboxylic acid': /asam karboksilat|carboxylic acid/,
    ester: /\bester/,
    amine: /\bamina\b|\bamine/,
    amide: /\bamida\b|\bamide/,
    nitrile: /nitril/,
    thiol: /\btiol|\bthiol/,
    'alkyl halide': /haloalkana|alkil halida|alkyl halide|haloalkane/,
    heterocycle: /heterosiklik|heterocycl/,
    substitution: /substitusi|substitution/,
    addition: /adisi|addition/,
    elimination: /eliminasi|elimination/,
    'organic oxidation/reduction':
      /oksidasi alkohol|oxidi[sz]ation of alcohol|reduksi (aldehida|keton)|reduc(e|tion) (of )?(aldehyde|ketone)/,
    polymerization: /polimerisasi|polymeri[sz]ation/,
  },
  '13 Inorganic': {
    acid: /\basam\b|\bacid/,
    base: /\bbasa\b|\bbase/,
    salt: /garam|\bsalt/,
    oxide: /oksida|oxide/,
    hydroxide: /hidroksida|hydroxide/,
    sulfide: /sulfida|sulfide/,
    nitrate: /nitrat|nitrate/,
    sulfate: /sulfat|sulfate/,
    carbonate: /karbonat|carbonate/,
    phosphate: /fosfat|phosphate/,
    halide: /halida|halide|klorida|chloride/,
    'coordination compound': /koordinasi|coordination/,
    mineral: /mineral/,
  },
  '14 Biochemistry': {
    'amino acid': /asam amino|amino acid/,
    peptide: /peptida|peptide/,
    protein: /protein/,
    carbohydrate: /karbohidrat|carbohydrate/,
    lipid: /lipid|lemak|\bfat/,
    nucleotide: /nukleotida|nucleotide/,
    DNA: /\bdna\b/,
    RNA: /\brna\b/,
    vitamin: /vitamin/,
    metabolite: /metabolit/,
    enzyme: /enzim|enzyme/,
  },
  '15 Materials': {
    metal: /logam|metal/,
    alloy: /paduan|aloi|alloy/,
    polymer: /polimer|polymer/,
    ceramic: /keramik|ceramic/,
    glass: /\bkaca\b|\bglass/,
    crystal: /kristal|crystal/,
    composite: /komposit|composite/,
    nanomaterial: /nano/,
    'carbon material': /grafena|graphene|nanotube|fulleren/,
    semiconductor: /semikonduktor|semiconductor/,
  },
  '16 Reactions': {
    synthesis: /sintesis|synthesis|kombinasi|combination/,
    decomposition: /penguraian|dekomposisi|decomposition/,
    combustion: /pembakaran|combustion/,
    'acid-base': /netralisasi|neutrali[sz]ation/,
    redox: /redoks|redox/,
    precipitation: /pengendapan|endapan|precipitat/,
    hydrolysis: /hidrolisis|hydrolysis/,
    esterification: /esterifikasi|esterification/,
    'single/double displacement': /pergantian|displacement|replacement|penggantian/,
  },
  '17 Stoichiometry': {
    mole: /\bmol\b|\bmole\b/,
    'molar mass': /massa molar|molar mass/,
    'Avogadro constant': /avogadro/,
    'balanced equation': /setara|balanc/,
    'limiting reagent': /pereaksi pembatas|limiting (reagent|reactant)/,
    'excess reagent': /(pereaksi|zat) (berlebih|sisa)|excess (reagent|reactant)/,
    'theoretical yield': /hasil teoretis|theoretical yield/,
    'actual yield': /hasil (nyata|sebenarnya|aktual)|actual yield/,
    'percent yield': /persen hasil|rendemen|percent(age)? yield/,
    concentration: /konsentrasi|concentration/,
    molarity: /molaritas|molarity/,
    molality: /molalitas|molality/,
  },
  '18 Thermochemistry': {
    heat: /kalor|\bheat\b/,
    work: /\bkerja\b|\bwork\b/,
    'internal energy': /energi dalam|internal energy/,
    enthalpy: /entalpi|enthalpy/,
    entropy: /entropi|entropy/,
    'Gibbs energy': /gibbs/,
    'laws of thermodynamics':
      /hukum (pertama|kedua|ketiga)? ?termodinamika|law of thermodynamics|laws of thermodynamics/,
    exothermic: /eksoterm|exotherm/,
    endothermic: /endoterm|endotherm/,
    'Hess law': /hukum hess|hess.s law/,
  },
  '19 Kinetics': {
    'reaction rate': /laju reaksi|reaction rate/,
    'rate law': /hukum laju|persamaan laju|rate law|rate equation/,
    'activation energy': /energi aktivasi|activation energy/,
    catalyst: /katalis|catalyst/,
    'reaction mechanism': /mekanisme reaksi|reaction mechanism/,
    Arrhenius: /arrhenius/,
  },
  '20 Equilibrium': {
    'dynamic equilibrium': /kesetimbangan dinamis|dynamic equilibrium/,
    'equilibrium constant': /tetapan kesetimbangan|equilibrium constant|\bkc\b|\bkp\b/,
    'Le Chatelier': /le chatelier/,
    'acid-base equilibrium': /\bka\b|\bkb\b|ionisasi asam lemah|weak acid equilibrium|tetapan ionisasi/,
    'solubility equilibrium': /ksp|hasil kali kelarutan|solubility product/,
  },
  '21 Acids & bases': {
    Arrhenius: /arrhenius/,
    'Brønsted-Lowry': /br[øo]nsted/,
    Lewis: /lewis (acid|base|asam|basa)|(asam|basa) lewis/,
    pH: /\bph\b/,
    pOH: /\bpoh\b/,
    pKa: /pka/,
    buffer: /penyangga|dapar|buffer/,
    titration: /titrasi|titration/,
    'strong/weak acid': /asam (kuat|lemah)|(strong|weak) acid/,
    'strong/weak base': /basa (kuat|lemah)|(strong|weak) base/,
  },
  '22 Electrochemistry': {
    oxidation: /oksidasi|oxidation/,
    reduction: /reduksi|reduction/,
    redox: /redoks|redox/,
    'galvanic cell': /sel volta|sel galvani|galvanic|voltaic/,
    'electrolytic cell': /sel elektrolisis|electrolytic cell/,
    'electrode potential': /potensial elektrode|electrode potential/,
    'standard potential': /potensial (reduksi )?standar|standard (reduction )?potential|e°/,
    battery: /baterai|battery/,
    electrolysis: /elektrolisis|electrolysis/,
  },
  '23 Analytical': {
    'qualitative analysis': /analisis kualitatif|qualitative analysis/,
    'quantitative analysis': /analisis kuantitatif|quantitative analysis/,
    titration: /titrasi|titration/,
    spectroscopy: /spektroskopi|spectroscop/,
    chromatography: /kromatografi|chromatograph/,
    'mass spectrometry': /spektrometri massa|mass spectrometr/,
    electroanalysis: /elektroanalisis|potensiometri|electroanaly|potentiometr/,
  },
  '24 Spectroscopy': {
    'UV-Vis': /uv-vis|uv–vis|ultraviolet/,
    IR: /inframerah|infrared|\bir\b/,
    NMR: /nmr|resonansi magnetik inti/,
    'mass spec': /spektrometri massa|mass spectrometr/,
    Raman: /raman/,
    'spectral interpretation':
      /interpretasi spektrum|spectr(um|al) interpret|membaca spektrum|read(ing)? (a|the) spectrum/,
  },
  '25 Physical chemistry': {
    'quantum chemistry': /kimia kuantum|quantum chemistry|schrödinger|schrodinger/,
    'molecular orbital': /orbital molekul|molecular orbital/,
    'statistical mechanics': /mekanika statistik|statistical mechanics|boltzmann/,
    'molecular energetics': /energi ikatan|bond energy|bond enthalp/,
  },
};
// ---------- Concept coverage ----------
log('## Cakupan konsep per domain\n');
log('| Domain | Konsep | Di teks materi | Di kamus | Di keempat lapis | Belum ada |');
log('| --- | --- | --- | --- | --- | --- |');
let totals = [0, 0, 0, 0];
for (const [dom, concepts] of Object.entries(D)) {
  const rows = Object.entries(concepts).map(([c, re]) => ({
    c,
    gloss: gloss.some(g => re.test(g.term) || re.test(g.key.replace(/-/g, ' '))),
    lv: LV.filter(l => bodies.some(b => b.l === l && re.test(b.text))),
  }));
  const n = rows.length;
  const text = rows.filter(r => r.lv.length).length;
  const inGloss = rows.filter(r => r.gloss).length;
  const all4 = rows.filter(r => r.lv.length === 4).length;
  totals = [totals[0] + n, totals[1] + text, totals[2] + inGloss, totals[3] + all4];
  const missing = rows
    .filter(r => !r.lv.length || !r.gloss)
    .map(r => `${r.c}${r.lv.length ? ' (kamus)' : r.gloss ? ' (teks)' : ''}`);
  log(`| §${dom} | ${n} | ${text} | ${inGloss} | ${all4} | ${missing.join(', ') || '–'} |`);
}
log(`| **Total** | **${totals[0]}** | **${totals[1]}** | **${totals[2]}** | **${totals[3]}** | |`);

// ---------- Entities ----------
const isotopes = readJSON('data/isotopes.json').rows;
log('\n## Entitas\n');
log('| Entitas | Jumlah |');
log('| --- | --- |');
for (const [k, v] of [
  ['Unsur', ELEMENTS.length],
  [
    'Nuklida (keadaan dasar, IAEA AMDC)',
    `${isotopes.length} (${isotopes.filter(r => r[3] === -1).length} stabil, ${isotopes.filter(r => r[5]).length} ada di alam)`,
  ],
  [
    'Ion',
    `${IONS.length} (${IONS.filter(i => i.kind === 'cation').length} kation, ${IONS.filter(i => i.kind === 'anion').length} anion, ${IONS.filter(i => i.poly).length} poliatom, ${IONS.filter(i => i.complex).length} kompleks)`,
  ],
  ['Molekul & senyawa katalog', MOLECULES.length],
  ['Golongan senyawa', CLASSES.length],
  [
    'Reaksi terstruktur',
    `${LIBRARY.length} kimia + ${NUCLEAR.length} inti, ${Object.keys(REACTION_TYPES).length} jenis`,
  ],
  [
    'Material & campuran',
    `${MATERIALS.length} (${Object.keys(MATERIAL_TYPES)
      .map(t => `${t} ${MATERIALS.filter(m => m.type === t).length}`)
      .join(', ')})`,
  ],
  ['Domain peta kimia', `${DOMAINS.length} dengan ${new Set(DOMAINS.flatMap(d => d.concepts)).size} konsep`],
  ['Istilah kamus', GLOSSARY.length],
  ['Topik materi', TOPICS.length],
  ['Lab virtual', LABS.length],
])
  log(`| ${k} | ${v} |`);

// ---------- Metadata ----------
const el = ELEMENTS.map(e => readJSON(`data/elements/${e.z}.json`));
const E = f => el.filter(f).length;
log('\n## Kelengkapan metadata\n');
log('| Ukuran | Hasil |');
log('| --- | --- |');
log(
  `| Berat atom standar IUPAC CIAAW | ${pct(
    E(r => r.weight?.source === 'ciaaw'),
    118
  )} (sisanya tidak punya berat atom standar; dicatat nomor massa atau massa isotop NIST) |`
);
log(
  `| Komposisi isotop alami (CIAAW/NIST) | ${pct(
    E(r => r.natural?.length),
    118
  )} |`
);
log(
  `| Data nuklida (IAEA AMDC) | ${pct(
    E(r => r.nuclides?.length),
    118
  )} |`
);
for (const [k, name] of [
  ['history', 'Sejarah'],
  ['uses', 'Kegunaan'],
  ['sources', 'Sumber di alam'],
  ['description', 'Deskripsi'],
  ['handling', 'Penanganan'],
])
  log(
    `| ${name} (teks sumber) | ${pct(
      E(r => r.texts?.[k]?.length),
      118
    )} |`
  );
log(
  `| Kelimpahan kerak/laut (Jefferson Lab) | ${pct(
    E(r => r.abundance?.crust && !/not applicable/i.test(r.abundance.crust)),
    118
  )} (sisanya tidak terdapat alami) |`
);
log(
  `| Klasifikasi GHS zat unsur | ${pct(
    E(r => r.ghs),
    118
  )} |`
);
log(
  `| Pemakaian isotop (IUPAC IPTEI) | ${pct(
    E(r => r.isotopeUses?.length),
    118
  )} |`
);
log(
  `| Foto berlisensi · Wikipedia | ${pct(
    E(r => r.photo),
    118
  )} · ${pct(
    E(r => r.wiki?.id || r.wiki?.en),
    118
  )} |`
);
const mol = MOLECULES.map(m => readJSON(`data/molecules/${m.id}.json`));
const idx = new Map(readJSON('data/molecules/index.json').map(r => [r.id, r]));
const M = f => mol.filter(f).length;
log(
  `| Molekul: SMILES · InChIKey · CAS | ${pct(
    M(r => r.props?.smiles),
    mol.length
  )} · ${pct(
    M(r => r.props?.inchikey),
    mol.length
  )} · ${pct(
    M(r => r.cas),
    mol.length
  )} |`
);
log(
  `| Molekul: CAS dan InChIKey di indeks pencarian | ${pct(MOLECULES.filter(m => idx.get(m.id)?.cas).length, mol.length)} · ${pct(MOLECULES.filter(m => idx.get(m.id)?.inchikey).length, mol.length)} |`
);
log(
  `| Molekul: struktur · data eksperimen · GHS | ${pct(
    M(r => r.structure),
    mol.length
  )} · ${pct(
    M(r => r.experimental?.length),
    mol.length
  )} · ${pct(
    M(r => r.ghs),
    mol.length
  )} |`
);
log(
  `| Molekul: geometri VSEPR · kepolaran beralasan (OpenStax 7.6) | ${pct(MOLECULES.filter(m => m.geo).length, mol.length)} · ${pct(Object.keys(POLARITY).length, mol.length)} (molekul kecil berbentuk VSEPR; molekul besar, ionik, dan polimer tidak diberi label) |`
);
const ionRecs = IONS.filter(i => !i.noRecord).length;
log(
  `| Ion dengan rekaman PubChem yang cocok rumus & muatannya | ${pct(ionRecs, IONS.length)} (nitrida dan peroksida tidak punya rekaman ion bebas) |`
);

// ---------- Sources ----------
log('\n## Kelengkapan sumber\n');
log('| Data | Dengan rujukan |');
log('| --- | --- |');
log(
  `| Topik materi (OpenStax) | ${pct(topics.filter(t => t.refs?.length).length, topics.length)} · ${topics.reduce((a, t) => a + (t.refs?.length || 0), 0)} rujukan |`
);
log(
  `| Reaksi | ${pct([...LIBRARY, ...NUCLEAR].filter(r => r.src?.length).length, LIBRARY.length + NUCLEAR.length)} |`
);
log(`| Material | ${pct(MATERIALS.filter(m => m.src?.length).length, MATERIALS.length)} |`);
log(`| Ion | ${pct(IONS.filter(i => i.src?.length).length, IONS.length)} |`);
log(`| Domain peta | ${pct(DOMAINS.filter(d => d.src?.length).length, DOMAINS.length)} |`);

// ---------- Relations ----------
const linkedTerms = new Set(topics.flatMap(t => t.links?.g || []));
const inDomain = new Set(DOMAINS.flatMap(d => d.concepts));
const back = new Set(GLOSSARY.flatMap(g => g.see || []));
const deadTerms = GLOSSARY.filter(
  g => !g.see?.length && !g.m?.length && !inDomain.has(g.key) && !linkedTerms.has(g.key) && !back.has(g.key)
);
const molUsed = new Set([
  ...topics.flatMap(t => t.links?.m || []),
  ...GLOSSARY.flatMap(g => g.m || []),
  ...IONS.flatMap(i => [...(i.cmp || []), i.acid].filter(Boolean)),
  ...[...LIBRARY].flatMap(r =>
    [...r.r, ...r.p]
      .map(x => x[3])
      .filter(l => l?.startsWith('m:'))
      .map(l => l.slice(2))
  ),
  ...MATERIALS.flatMap(m =>
    m.comp
      .map(c => c[0])
      .filter(l => l.startsWith('m:'))
      .map(l => l.slice(2))
  ),
]);
const has = (formula, sym) => (parseFormula(formula || '').counts?.[sym] || 0) > 0;
const inMolecule = e => MOLECULES.some(m => has(idx.get(m.id)?.formula, e.s));
const inIon = e => IONS.some(i => has(i.f, e.s));
const inReaction = e =>
  LIBRARY.some(r => [...r.r, ...r.p].some(x => has(x[1], e.s))) ||
  NUCLEAR.some(r => [...r.r, ...r.p].some(x => x[2] === e.s));
const inMaterial = e => MATERIALS.some(m => m.comp.some(c => c[0] === `e:${e.s}`));
const elementUsed = ELEMENTS.filter(e => inMolecule(e) || inIon(e) || inReaction(e) || inMaterial(e)).length;
log('\n## Kelengkapan relasi\n');
log('| Ukuran | Hasil |');
log('| --- | --- |');
log(
  `| Istilah kamus yang buntu (tanpa istilah terkait, contoh, domain, materi, atau rujukan balik) | ${deadTerms.length}/${GLOSSARY.length} |`
);
log(`| Istilah kamus yang ditautkan dari materi | ${pct(linkedTerms.size, GLOSSARY.length)} |`);
log(
  `| Istilah kamus yang masuk peta domain | ${pct(GLOSSARY.filter(g => inDomain.has(g.key)).length, GLOSSARY.length)} |`
);
log(
  `| Molekul katalog yang dirujuk materi, kamus, ion, reaksi, atau material | ${pct(MOLECULES.filter(m => molUsed.has(m.id)).length, MOLECULES.length)} |`
);
log(
  `| Unsur yang muncul di molekul, ion, reaksi, atau material katalog (semua unsur punya halaman, isotop, dan rujukan) | ${pct(elementUsed, 118)} |`
);
log('| Halaman unsur | isotop, ion, molekul, reaksi, material, materi, domain, rujukan |');
log(
  '| Halaman molekul | unsur penyusun, ion, reaksi, material, materi yang membahasnya, tautan spektrum PubChem |'
);
log('| Halaman istilah | domain peta, materi yang memakainya, istilah yang merujuknya |');

// ---------- Education ----------
log('\n## Kelengkapan pendidikan\n');
log('| Topik | Lapis (SD/SMP/SMA/Kuliah) kata | Soal per jenjang | Rujukan |');
log('| --- | --- | --- | --- |');
const words = [];
for (const t of topics) {
  const w = LV.map(l => (t.body[l] ? plain(t.body[l][0]).split(/\s+/).filter(Boolean).length : 0));
  words.push(w);
  log(
    `| ${t.id} | ${w.join(' / ')} | ${LV.map(l => t.quiz.filter(q => q.lv === l).length).join(' / ')} | ${t.refs?.length || 0} |`
  );
}
const median = list => {
  const s = [...list].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : 0;
};
const gaps = topics.flatMap(t => LV.filter(l => !t.body[l]).map(l => `${t.id}/${l}`));
log(
  `\nKombinasi topik–jenjang tanpa teks: ${gaps.length}${gaps.length ? ` (${gaps.join(', ')})` : ''}. Median kata per lapis (teks Indonesia): ${LV.map((l, i) => `${l} ${median(words.map(w => w[i]).filter(Boolean))}`).join(' · ')}. Soal: ${topics.reduce((a, t) => a + t.quiz.length, 0)} (${LV.map(l => `${l} ${topics.reduce((a, t) => a + t.quiz.filter(q => q.lv === l).length, 0)}`).join(' · ')}). Catatan guru: ${topics.filter(t => t.teacher).length}/${topics.length}.`
);

console.log(out.join('\n'));
