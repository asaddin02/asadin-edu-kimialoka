export default {
  id: 'material',
  icon: 'cube',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Material: logam, keramik, polimer, dan nano', 'Materials: metals, ceramics, polymers and nano'],
  summary: [
    'Mengapa logam mengilap, kaca bening, plastik lentur, dan grafena sangat kuat? Susunan atom menentukan sifat material.',
    'Why are metals shiny, glass clear, plastic bendy and graphene so strong? Atomic arrangement decides a material’s properties.',
  ],
  body: {
    sd: [
      `Benda di sekitar kita dibuat dari berbagai **material**:

- **Logam** ({{m:iron|besi}}, {{m:copper|tembaga}}, {{m:aluminium|aluminium}}): kuat, mengilap, dan menghantarkan listrik. Kabel listrik dibuat dari tembaga.
- **Kaca dan keramik**: keras dan tahan panas, dibuat dari pasir ({{m:silicon-dioxide|silika}}) dan tanah liat ({{m:kaolinite|kaolin}}).
- **Plastik** ([[polimer]]): ringan dan mudah dibentuk, seperti botol dan ember. Sayangnya plastik sulit terurai, jadi kurangi, pakai ulang, dan daur ulang.
- **Karet** dari getah pohon karet: lentur untuk ban dan sandal.

Karbon bisa menjadi {{m:graphite|grafit}} yang lunak di pensil atau {{m:diamond|intan}} yang sangat keras. Atomnya sama, susunannya berbeda!`,
      `Things around us are made of different **materials**:

- **Metals** ({{m:iron|iron}}, {{m:copper|copper}}, {{m:aluminium|aluminium}}): strong, shiny and conduct electricity. Electric wires are copper.
- **Glass and ceramics**: hard and heat-proof, made from sand ({{m:silicon-dioxide|silica}}) and clay ({{m:kaolinite|kaolin}}).
- **Plastics** ([[polimer|polymers]]): light and easy to shape, like bottles and buckets. Sadly they break down very slowly, so reduce, reuse and recycle.
- **Rubber** from rubber-tree latex: stretchy for tyres and sandals.

Carbon can be soft {{m:graphite|graphite}} in pencils or super-hard {{m:diamond|diamond}}. Same atoms, different arrangement!`,
    ],
    smp: [
      `Sifat material ditentukan oleh jenis ikatan dan susunan partikelnya:

- **Logam**: [[ikatan-logam]] dengan lautan elektron. Atom tersusun dalam kisi kristal ([[kristal]]) sehingga logam dapat ditempa. Paduan (campuran logam) lebih kuat: baja (Fe + C), kuningan (Cu + Zn), perunggu (Cu + Sn).
- **Keramik**: senyawa ion atau jaringan kovalen seperti {{m:aluminium-oxide|alumina}} dan {{m:silicon-carbide|silikon karbida}}; keras, tahan panas, tetapi rapuh.
- **Polimer**: rantai panjang [[monomer]]. Termoplastik ({{m:polyethylene|PE}}, {{m:pet|PET}}) dapat dilelehkan ulang; termoset (bakelit, melamin) tidak.
- **[[komposit|Komposit]]**: gabungan dua bahan atau lebih yang saling melengkapi, misalnya beton bertulang (beton + baja), fiberglass (serat kaca + resin), dan serat karbon.
- **[[alotrop|Alotrop]] karbon**: {{m:diamond|intan}} (jaringan 3D), {{m:graphite|grafit}} (lembaran), {{m:graphene|grafena}}, dan {{m:fullerene-c60|fulerena}}.

Lihat susunan atomnya di {{lab:kristal|lab Kristal & material}}.`,
      `A material’s properties come from its bonding and particle arrangement:

- **Metals**: [[ikatan-logam|metallic bonding]] with an electron sea. Atoms sit in a crystal lattice ([[kristal|crystal]]), so metals can be hammered. Alloys are stronger: steel (Fe + C), brass (Cu + Zn), bronze (Cu + Sn).
- **Ceramics**: ionic or covalent-network compounds such as {{m:aluminium-oxide|alumina}} and {{m:silicon-carbide|silicon carbide}}; hard and heat-proof but brittle.
- **Polymers**: long chains of [[monomer|monomers]]. Thermoplastics ({{m:polyethylene|PE}}, {{m:pet|PET}}) can be re-melted; thermosets (Bakelite, melamine) cannot.
- **[[komposit|Composites]]**: two or more materials combined so each makes up for the other, such as reinforced concrete (concrete + steel), fibreglass (glass fibre + resin) and carbon fibre.
- **Carbon [[alotrop|allotropes]]**: {{m:diamond|diamond}} (3D network), {{m:graphite|graphite}} (sheets), {{m:graphene|graphene}} and {{m:fullerene-c60|fullerene}}.

See their atomic arrangements in the {{lab:kristal|Crystals & materials lab}}.`,
    ],
    sma: [
      `Padatan dibedakan menjadi kristal (teratur) dan amorf (tidak teratur, seperti kaca). Kristal dicirikan oleh [[sel-satuan]]; logam umumnya berkisi kubus pusat muka (fcc: Cu, Al, Au, Ni), kubus pusat badan (bcc: Fe, Na, W), atau heksagonal rapat (hcp: Ti, Mg, Zn). Susunan fcc dan hcp mengisi 74% ruang.

Kristal ion seperti {{m:sodium-chloride|NaCl}} (bilangan koordinasi 6 : 6) dan {{m:calcium-fluoride|CaF₂}} (8 : 4) keras tetapi rapuh karena pergeseran lapisan membuat ion sejenis berhadapan. Jaringan kovalen ({{m:diamond|intan}}, {{m:silicon-dioxide|kuarsa}}) sangat keras dan titik lelehnya sangat tinggi.

[[polimer|Polimerisasi]] ada dua jenis:

- Adisi: monomer berikatan rangkap terbuka dan bersambung, misalnya etena → {{m:polyethylene|polietilena}}, vinil klorida → {{m:pvc|PVC}}.
- Kondensasi: dua monomer bergabung sambil melepas molekul kecil (H₂O), misalnya {{m:nylon-66|nilon-6,6}} dan {{m:pet|PET}}.

[[semikonduktor|Semikonduktor]] seperti {{m:silicon|silikon}} didoping fosforus (tipe-n) atau boron (tipe-p) untuk membuat dioda dan transistor. [[nanomaterial|Nanomaterial]] memiliki luas permukaan sangat besar dan sifat kuantum.`,
      `Solids are crystalline (ordered) or amorphous (disordered, like glass). Crystals are described by a [[sel-satuan|unit cell]]; metals are usually face-centred cubic (fcc: Cu, Al, Au, Ni), body-centred cubic (bcc: Fe, Na, W) or hexagonal close-packed (hcp: Ti, Mg, Zn). fcc and hcp fill 74% of space.

Ionic crystals such as {{m:sodium-chloride|NaCl}} (coordination 6 : 6) and {{m:calcium-fluoride|CaF₂}} (8 : 4) are hard but brittle, because shifting layers push like charges together. Covalent networks ({{m:diamond|diamond}}, {{m:silicon-dioxide|quartz}}) are extremely hard with very high melting points.

[[polimer|Polymerisation]] comes in two kinds:

- Addition: monomers with double bonds open up and link, e.g. ethene → {{m:polyethylene|polyethylene}}, vinyl chloride → {{m:pvc|PVC}}.
- Condensation: two monomers join and release a small molecule (H₂O), e.g. {{m:nylon-66|nylon-6,6}} and {{m:pet|PET}}.

[[semikonduktor|Semiconductors]] such as {{m:silicon|silicon}} are doped with phosphorus (n-type) or boron (p-type) to make diodes and transistors. [[nanomaterial|Nanomaterials]] have huge surface areas and quantum effects.`,
    ],
    kuliah: [
      `Sifat mekanik logam ditentukan oleh cacat kristal: dislokasi memungkinkan deformasi plastis, dan paduan, batas butir, serta pengerasan regangan menghambat gerak dislokasi. Diagram fase Fe–C menjelaskan baja, besi tuang, austenit, ferit, martensit, dan perlakuan panas.

Teori pita menjelaskan konduktivitas: logam memiliki pita terisi sebagian; semikonduktor bercelah pita ~1 eV (Si 1,12 eV, {{m:gallium-arsenide|GaAs}} 1,42 eV) dan isolator > 4 eV. Celah pita lebar {{m:gallium-nitride|GaN}} (3,4 eV) memancarkan cahaya biru. Titik kuantum dan perovskit halida ({{m:calcium-titanate|struktur ABX₃}}) memungkinkan celah pita diatur.

Material energi: katode berlapis {{m:lithium-cobalt-oxide|LiCoO₂}}, olivin {{m:lithium-iron-phosphate|LiFePO₄}}, dan NMC berbasis {{m:nickel|nikel}}; anode {{m:graphite|grafit}} atau silikon. Kinerja dikendalikan difusi Li⁺, stabilitas struktur, dan antarmuka elektrolit padat (SEI).

Polimer dicirikan oleh distribusi massa molar, derajat kristalinitas, dan suhu transisi gelas (Tg). Karakterisasi material modern memakai difraksi sinar-X (XRD), mikroskop elektron (SEM/TEM), dan spektroskopi Raman (khas untuk grafena dan nanotube).`,
      `Metal mechanics are governed by crystal defects: dislocations allow plastic deformation, while alloying, grain boundaries and work hardening hinder them. The Fe–C phase diagram explains steel, cast iron, austenite, ferrite, martensite and heat treatment.

Band theory explains conductivity: metals have partly filled bands; semiconductors have gaps near 1 eV (Si 1.12 eV, {{m:gallium-arsenide|GaAs}} 1.42 eV) and insulators > 4 eV. Wide-gap {{m:gallium-nitride|GaN}} (3.4 eV) emits blue light. Quantum dots and halide perovskites ({{m:calcium-titanate|the ABX₃ structure}}) allow tunable band gaps.

Energy materials: layered {{m:lithium-cobalt-oxide|LiCoO₂}}, olivine {{m:lithium-iron-phosphate|LiFePO₄}} and {{m:nickel|nickel}}-rich NMC cathodes; {{m:graphite|graphite}} or silicon anodes. Performance depends on Li⁺ diffusion, structural stability and the solid–electrolyte interphase (SEI).

Polymers are characterised by molar-mass distribution, crystallinity and glass-transition temperature (Tg). Modern characterisation uses X-ray diffraction (XRD), electron microscopy (SEM/TEM) and Raman spectroscopy (a fingerprint for graphene and nanotubes).`,
    ],
  },
  points: [
    ['Sifat material ditentukan jenis ikatan dan susunan atomnya.', 'Properties come from bonding and atomic arrangement.'],
    ['Logam: fcc, bcc, hcp; keramik: keras tetapi rapuh; polimer: rantai monomer.', 'Metals: fcc, bcc, hcp; ceramics: hard but brittle; polymers: monomer chains.'],
    ['Alotrop karbon (intan, grafit, grafena) menunjukkan kuatnya pengaruh struktur.', 'Carbon allotropes (diamond, graphite, graphene) show how much structure matters.'],
  ],
  molecules: ['iron', 'copper', 'diamond', 'graphite', 'graphene', 'silicon', 'polyethylene', 'nylon-66', 'silicon-dioxide', 'lithium-cobalt-oxide'],
  labs: ['kristal'],
  activity: {
    sd: ['Kumpulkan 10 benda di kelas dan kelompokkan menurut materialnya (logam, kaca, plastik, kayu, karet). Uji mana yang ditarik magnet.', 'Collect 10 classroom objects and sort them by material (metal, glass, plastic, wood, rubber). Test which a magnet attracts.'],
    smp: ['Kumpulkan kemasan plastik di rumah dan kelompokkan berdasarkan kode daur ulang 1–7. Cari polimernya di Kimialoka.', 'Collect plastic packaging at home and sort by recycling code 1–7. Look up each polymer in Kimialoka.'],
    sma: ['Hitung jumlah atom per sel satuan fcc dan bcc serta efisiensi pengepakannya; bandingkan dengan model di lab Kristal.', 'Count atoms per fcc and bcc unit cell and their packing efficiency; compare with the Crystals lab models.'],
    kuliah: ['Presentasikan rantai pasok nikel Indonesia dari bijih laterit hingga katode NMC, termasuk dampak lingkungannya.', 'Present Indonesia’s nickel supply chain from laterite ore to NMC cathode, including its environmental impact.'],
  },
  quiz: [
    { lv: 'kuliah', q: ["GaN memancarkan cahaya biru karena celah pitanya sekitar…", "GaN emits blue light because its band gap is about…"], options: [["0,7 eV", "0.7 eV"], ["1,1 eV", "1.1 eV"], ["3,4 eV", "3.4 eV"], ["10 eV", "10 eV"]], answer: 2, explain: ["Celah 3,4 eV setara foton di ujung biru–UV spektrum tampak.", "A 3.4 eV gap matches photons at the blue–UV end of the visible spectrum."] },
    { lv: 'sd', q: ['Kabel listrik dibuat dari tembaga karena…', 'Electric wires are made of copper because it…'], options: [['Mudah pecah', 'Breaks easily'], ['Menghantarkan listrik dengan baik', 'Conducts electricity well'], ['Ringan sekali', 'Is very light'], ['Tembus pandang', 'Is transparent']], answer: 1, explain: ['Tembaga adalah penghantar listrik yang sangat baik dan murah.', 'Copper is an excellent, affordable conductor.'] },
    { lv: 'sd', q: ['Intan dan grafit sama-sama tersusun atas atom…', 'Diamond and graphite are both made of…'], options: [['Besi', 'Iron'], ['Karbon', 'Carbon'], ['Oksigen', 'Oxygen'], ['Emas', 'Gold']], answer: 1, explain: ['Keduanya karbon murni dengan susunan atom berbeda.', 'Both are pure carbon with different arrangements.'] },
    { lv: 'smp', q: ['Baja adalah paduan besi dengan…', 'Steel is an alloy of iron with…'], options: [['Karbon', 'Carbon'], ['Emas', 'Gold'], ['Plastik', 'Plastic'], ['Raksa', 'Mercury']], answer: 0, explain: ['Sedikit karbon membuat besi jauh lebih kuat.', 'A little carbon makes iron much stronger.'] },
    { lv: 'smp', q: ['Plastik yang dapat dilelehkan dan dibentuk ulang disebut…', 'Plastics that can be re-melted and reshaped are…'], options: [['Termoset', 'Thermosets'], ['Termoplastik', 'Thermoplastics'], ['Keramik', 'Ceramics'], ['Logam', 'Metals']], answer: 1, explain: ['Termoplastik seperti PE dan PET melunak saat dipanaskan.', 'Thermoplastics like PE and PET soften when heated.'] },
    { lv: 'sma', q: ['Nilon-6,6 terbentuk melalui polimerisasi…', 'Nylon-6,6 forms by…'], options: [['Adisi', 'Addition polymerisation'], ['Kondensasi', 'Condensation polymerisation'], ['Fermentasi', 'Fermentation'], ['Elektrolisis', 'Electrolysis']], answer: 1, explain: ['Diamina dan asam dikarboksilat bergabung sambil melepas air.', 'A diamine and a diacid join, releasing water.'] },
    { lv: 'sma', q: ['Bilangan koordinasi Na⁺ dalam kristal NaCl adalah…', 'The coordination number of Na⁺ in NaCl is…'], options: [['4', '4'], ['6', '6'], ['8', '8'], ['12', '12']], answer: 1, explain: ['Setiap Na⁺ dikelilingi 6 ion Cl⁻ secara oktahedral.', 'Each Na⁺ has 6 Cl⁻ neighbours arranged octahedrally.'] },
    { lv: 'sma', q: ['Silikon yang didoping fosforus menjadi semikonduktor…', 'Silicon doped with phosphorus becomes…'], options: [['Tipe-p', 'p-type'], ['Tipe-n', 'n-type'], ['Isolator', 'An insulator'], ['Superkonduktor', 'A superconductor']], answer: 1, explain: ['P punya 5 elektron valensi, menyumbang elektron bebas (pembawa negatif).', 'P has 5 valence electrons, donating free electrons (negative carriers).'] },
    { lv: 'kuliah', q: ['Efisiensi pengepakan kisi fcc adalah…', 'The packing efficiency of fcc is…'], options: [['52%', '52%'], ['68%', '68%'], ['74%', '74%'], ['100%', '100%']], answer: 2, explain: ['fcc dan hcp adalah susunan paling rapat bola sama besar: π/(3√2) ≈ 74%.', 'fcc and hcp are the densest packings of equal spheres: π/(3√2) ≈ 74%.'] },
  ],
  teacher: {
    cp: ['Fase C–F: peserta didik mengaitkan sifat material dengan struktur partikel dan menilai dampak penggunaannya.', 'Phases C–F: learners link material properties to particle structure and evaluate their impact.'],
    goals: [
      ['Mengelompokkan material dan sifatnya.', 'Classify materials and their properties.'],
      ['Menjelaskan sifat dari struktur kristal, jenis ikatan, dan polimerisasi.', 'Explain properties from crystal structure, bonding and polymerisation.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pos material: logam, keramik, polimer, komposit.', 'Material stations: metals, ceramics, polymers, composites.'],
      ['Eksplorasi lab Kristal: fcc, bcc, NaCl, intan, grafena.', 'Explore the Crystals lab: fcc, bcc, NaCl, diamond, graphene.'],
      ['Proyek pilah plastik dan audit sampah sekolah.', 'Plastic-sorting project and school waste audit.'],
    ],
    misconceptions: [['"Kaca adalah padatan kristal." Kaca adalah padatan amorf tanpa keteraturan jangka panjang.', '"Glass is a crystalline solid." Glass is amorphous, with no long-range order.']],
    assessment: ['Kuis Kimialoka dan laporan audit plastik.', 'Kimialoka quiz and a plastic-audit report.'],
  },
  refs: ["10-5-the-solid-state-of-matter", "10-6-lattice-structures-in-crystalline-solids", "oc:31-7-polymer-structure-and-physical-properties"],
};
