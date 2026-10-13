export default {
  id: 'bentuk',
  icon: 'cube',
  levels: ['sma', 'kuliah'],
  title: ['Bentuk molekul dan gaya antarmolekul', 'Molecular shape and intermolecular forces'],
  summary: [
    'Teori VSEPR, hibridisasi, dan gaya antarmolekul yang menentukan titik didih dan kelarutan.',
    'VSEPR theory, hybridisation, and the intermolecular forces that set boiling points and solubility.',
  ],
  body: {
    sd: [
      `Molekul tidak datar seperti gambar di buku. Molekul punya bentuk tiga dimensi, seperti mainan yang bisa diputar:

- {{m:water|Air}} berbentuk bengkok seperti huruf V.
- {{m:carbon-dioxide|Karbon dioksida}} lurus seperti tongkat.
- {{m:methane|Metana}} (gas kompor) seperti limas segitiga dengan empat kaki.

Bentuk molekul menentukan sifatnya. Karena bentuk air bengkok, air bisa menarik partikel gula dan garam sehingga keduanya larut.

Di setiap [[bentuk-molekul|halaman molekul]] Kimialoka kamu bisa memutar model 3D-nya dengan jari atau tetikus.`,
      `Molecules are not flat like pictures in a book. They have 3D shapes, like toys you can turn around:

- {{m:water|Water}} is bent like the letter V.
- {{m:carbon-dioxide|Carbon dioxide}} is straight like a stick.
- {{m:methane|Methane}} (cooking gas) is like a three-sided pyramid on four legs.

A molecule’s shape decides how it behaves. Because water is bent, it can pull on sugar and salt particles so they dissolve.

On every [[bentuk-molekul|molecule page]] in Kimialoka you can spin the 3D model with a finger or mouse.`,
    ],
    smp: [
      `Atom-atom dalam molekul tersusun dengan sudut tertentu, bukan asal menempel. Pasangan elektron di sekitar atom pusat saling tolak dan menjauh sejauh mungkin, sehingga muncul bentuk khas:

- **Linear** (lurus, 180°): {{m:carbon-dioxide|CO₂}}.
- **Segitiga datar** (120°): {{m:boron-trifluoride|BF₃}}.
- **Tetrahedral** (limas segitiga, 109,5°): {{m:methane|CH₄}}.
- **Piramida trigonal**: {{m:ammonia|NH₃}}, karena nitrogen punya satu pasangan elektron bebas.
- **Bengkok**: {{m:water|H₂O}}, karena oksigen punya dua pasangan elektron bebas.

Bentuk menentukan apakah molekul [[molekul-polar|polar]]. Air bengkok sehingga punya kutub positif dan negatif; karena itu air melarutkan garam dan gula, tetapi tidak melarutkan minyak. CO₂ lurus sehingga tarikan kedua oksigennya saling meniadakan.

Putar bentuk-bentuk ini di {{lab:vsepr|lab Bentuk molekul}} dan di model 3D halaman molekul.`,
      `The atoms in a molecule sit at particular angles; they do not stick on just anyhow. Electron pairs around the central atom repel and spread as far apart as they can, giving typical shapes:

- **Linear** (straight, 180°): {{m:carbon-dioxide|CO₂}}.
- **Trigonal planar** (120°): {{m:boron-trifluoride|BF₃}}.
- **Tetrahedral** (three-sided pyramid, 109.5°): {{m:methane|CH₄}}.
- **Trigonal pyramidal**: {{m:ammonia|NH₃}}, because nitrogen has one lone pair.
- **Bent**: {{m:water|H₂O}}, because oxygen has two lone pairs.

Shape decides whether a molecule is [[molekul-polar|polar]]. Water is bent, so it has positive and negative ends; that is why it dissolves salt and sugar but not oil. CO₂ is straight, so the pulls of its two oxygens cancel.

Spin these shapes in the {{lab:vsepr|Molecular shapes lab}} and in the 3D models on molecule pages.`,
    ],
    sma: [
      `Menurut teori [[vsepr|VSEPR]], pasangan elektron di sekitar atom pusat saling tolak dan mengambil posisi sejauh mungkin. Domain elektron dapat berupa pasangan ikatan (tunggal atau rangkap dihitung satu) maupun [[pasangan-elektron-bebas]] (PEB).

Rumus notasi AXₘEₙ (A atom pusat, X atom terikat, E PEB) menentukan bentuk:

- AX₂ linear 180° ({{m:carbon-dioxide|CO₂}}, {{m:beryllium-chloride|BeCl₂}})
- AX₃ segitiga datar 120° ({{m:boron-trifluoride|BF₃}}, {{m:sulfur-trioxide|SO₃}})
- AX₄ tetrahedral 109,5° ({{m:methane|CH₄}})
- AX₃E piramida segitiga ≈107° ({{m:ammonia|NH₃}})
- AX₂E₂ bengkok ≈104,5° ({{m:water|H₂O}})
- AX₅ bipiramida segitiga ({{m:phosphorus-pentachloride|PCl₅}}), AX₆ oktahedral ({{m:sulfur-hexafluoride|SF₆}})

PEB menolak lebih kuat daripada pasangan ikatan, sehingga sudut H–N–H dan H–O–H mengecil. Cobalah semuanya di {{lab:vsepr|lab Bentuk molekul}}.

Bentuk menentukan kepolaran, dan kepolaran menentukan [[gaya-antarmolekul]]: gaya London (semua molekul), dipol–dipol (molekul polar), dan [[ikatan-hidrogen]] (H pada F, O, N). Makin kuat gayanya, makin tinggi titik didihnya. Prinsip "like dissolves like": zat polar larut dalam pelarut polar.

Untuk titik didih dan kelarutan, lanjutkan ke {{learn:antarmolekul|Gaya antarmolekul & sifat zat}}.`,
      `By [[vsepr|VSEPR]] theory, electron pairs around a central atom repel and spread as far apart as possible. An electron domain is a bonding pair (single or multiple counts as one) or a [[pasangan-elektron-bebas|lone pair]].

The AXₘEₙ notation (A central atom, X bonded atoms, E lone pairs) gives the shape:

- AX₂ linear 180° ({{m:carbon-dioxide|CO₂}}, {{m:beryllium-chloride|BeCl₂}})
- AX₃ trigonal planar 120° ({{m:boron-trifluoride|BF₃}}, {{m:sulfur-trioxide|SO₃}})
- AX₄ tetrahedral 109.5° ({{m:methane|CH₄}})
- AX₃E trigonal pyramidal ≈107° ({{m:ammonia|NH₃}})
- AX₂E₂ bent ≈104.5° ({{m:water|H₂O}})
- AX₅ trigonal bipyramidal ({{m:phosphorus-pentachloride|PCl₅}}), AX₆ octahedral ({{m:sulfur-hexafluoride|SF₆}})

Lone pairs repel more than bonding pairs, squeezing the H–N–H and H–O–H angles. Try them all in the {{lab:vsepr|Molecular shapes lab}}.

Shape decides polarity, and polarity decides [[gaya-antarmolekul|intermolecular forces]]: London forces (all molecules), dipole–dipole (polar molecules) and [[ikatan-hidrogen|hydrogen bonds]] (H on F, O, N). Stronger forces mean higher boiling points. "Like dissolves like": polar substances dissolve in polar solvents.

For boiling points and solubility, continue with {{learn:antarmolekul|Intermolecular forces & properties}}.`,
    ],
    kuliah: [
      `[[hibridisasi|Hibridisasi]] menghubungkan VSEPR dengan orbital: sp (linear), sp² (segitiga datar), sp³ (tetrahedral), sp³d dan sp³d² untuk oktet diperluas (meskipun kini ikatan pada PCl₅ dan SF₆ lebih tepat dijelaskan dengan ikatan 3-pusat 4-elektron tanpa orbital d). Pada karbon, sp³ memberi ikatan tunggal, sp² ikatan rangkap dua (1 [[ikatan-sigma-pi|σ + 1 π]]) seperti etena, dan sp ikatan rangkap tiga seperti {{m:acetylene|asetilena}}.

Bentuk molekul berukuran besar ditentukan analisis konformasi: rotasi C–C pada {{m:ethane|etana}} (terhuyung vs gerhana), bentuk kursi {{m:cyclohexane|sikloheksana}}, dan [[kiral|kiralitas]] yang membedakan enantiomer obat seperti {{m:ibuprofen|ibuprofen}}.

Gaya antarmolekul dapat dikuantifikasi: energi dispersi ∝ α²/r⁶ (polarisabilitas), dipol–dipol ∝ μ²/r³ (rata-rata termal ∝ μ⁴/(kT·r⁶)), ikatan hidrogen 10–40 kJ/mol. Ikatan hidrogen menjelaskan struktur heliks ganda DNA, lipatan protein, dan anomali air.

Koordinat 3D di Kimialoka adalah konformer hasil perhitungan PubChem (MMFF94); bandingkan sudut hasil perhitungan dengan prediksi VSEPR.`,
      `[[hibridisasi|Hybridisation]] links VSEPR to orbitals: sp (linear), sp² (trigonal planar), sp³ (tetrahedral), sp³d and sp³d² for expanded octets (though bonding in PCl₅ and SF₆ is now better described by 3-centre 4-electron bonds without d orbitals). For carbon, sp³ gives single bonds, sp² double bonds (1 [[ikatan-sigma-pi|σ + 1 π]]) as in ethene, and sp triple bonds as in {{m:acetylene|acetylene}}.

The shape of larger molecules comes from conformational analysis: C–C rotation in {{m:ethane|ethane}} (staggered vs eclipsed), the chair of {{m:cyclohexane|cyclohexane}}, and [[kiral|chirality]] separating drug enantiomers such as {{m:ibuprofen|ibuprofen}}.

Intermolecular forces can be quantified: dispersion ∝ α²/r⁶ (polarisability), dipole–dipole ∝ μ²/r³ (thermal average ∝ μ⁴/(kT·r⁶)), hydrogen bonds 10–40 kJ/mol. Hydrogen bonding explains DNA’s double helix, protein folding and water’s anomalies.

Kimialoka’s 3D coordinates are PubChem’s computed conformers (MMFF94); compare the computed angles with VSEPR predictions.`,
    ],
  },
  points: [
    ['Pasangan elektron saling menjauh: itulah asal bentuk molekul.', 'Electron pairs push apart — that is where shape comes from.'],
    ['PEB menolak lebih kuat sehingga memperkecil sudut ikatan.', 'Lone pairs repel more strongly and shrink bond angles.'],
    ['Ikatan hidrogen > dipol–dipol > gaya London (untuk molekul seukuran).', 'Hydrogen bonds > dipole–dipole > London forces (for similar-sized molecules).'],
  ],
  molecules: ['methane', 'ammonia', 'water', 'carbon-dioxide', 'boron-trifluoride', 'phosphorus-pentachloride', 'sulfur-hexafluoride', 'xenon-tetrafluoride'],
  labs: ['vsepr', 'rakit'],
  activity: {
    smp: ["Buat model CO₂, BF₃, CH₄, NH₃, dan H₂O dari balon atau plastisin; ukur sudutnya dengan busur derajat dan bandingkan dengan lab VSEPR.", "Make CO₂, BF₃, CH₄, NH₃ and H₂O models from balloons or play dough; measure the angles with a protractor and compare with the VSEPR lab."],
    sd: ["Buat model air (bengkok), karbon dioksida (lurus), dan metana (limas) dari bola plastisin dan tusuk gigi. Putar model 3D-nya di Kimialoka dan bandingkan.", "Make water (bent), carbon dioxide (straight) and methane (pyramid) models from play-dough balls and toothpicks. Spin the 3D models in Kimialoka and compare."],
    sma: ['Buat model VSEPR dari balon (2–6 balon diikat di tengah) dan bandingkan dengan lab Bentuk molekul.', 'Build VSEPR models from balloons (2–6 tied together) and compare with the Molecular shapes lab.'],
    kuliah: ['Ukur sudut H–O–H dan H–N–H pada model 3D PubChem di Kimialoka (klik atom), bandingkan dengan nilai eksperimen.', 'Measure the H–O–H and H–N–H angles on PubChem 3D models in Kimialoka and compare with experiment.'],
  },
  quiz: [
    { lv: 'smp', q: ["Molekul CO₂ berbentuk…", "The CO₂ molecule is…"], options: [["Bengkok", "Bent"], ["Lurus (linear)", "Straight (linear)"], ["Tetrahedral", "Tetrahedral"], ["Piramida", "Pyramidal"]], answer: 1, explain: ["Dua ikatan C=O di kiri dan kanan atom karbon membentuk sudut 180°.", "The two C=O bonds on either side of carbon make a 180° angle."] },
    { lv: 'smp', q: ["Air melarutkan garam tetapi tidak melarutkan minyak karena…", "Water dissolves salt but not oil because…"], options: [["Air bengkok dan polar", "Water is bent and polar"], ["Air lurus", "Water is straight"], ["Minyak lebih berat", "Oil is heavier"], ["Garam berwarna putih", "Salt is white"]], answer: 0, explain: ["Molekul polar menarik ion dan zat polar, bukan minyak yang nonpolar.", "Polar molecules attract ions and polar substances, not non-polar oil."] },
    { lv: 'sd', q: ["Bentuk molekul karbon dioksida adalah…", "The shape of a carbon dioxide molecule is…"], options: [["Lurus seperti tongkat", "Straight like a stick"], ["Bulat", "Round"], ["Seperti huruf V", "Like a letter V"], ["Kotak", "Square"]], answer: 0, explain: ["CO₂ lurus: oksigen di kiri dan kanan karbon.", "CO₂ is straight: oxygen on each side of carbon."] },
    { lv: 'sd', q: ["Bentuk molekul air adalah…", "The shape of a water molecule is…"], options: [["Lurus", "Straight"], ["Bengkok seperti huruf V", "Bent like a V"], ["Bulat", "Round"], ["Kotak", "Square"]], answer: 1, explain: ["Air bengkok; sudutnya sekitar 104,5°.", "Water is bent, about 104.5°."] },
    { lv: 'sma', q: ['Bentuk molekul NH₃ adalah…', 'The shape of NH₃ is…'], options: [['Segitiga datar', 'Trigonal planar'], ['Piramida segitiga', 'Trigonal pyramidal'], ['Tetrahedral', 'Tetrahedral'], ['Bengkok', 'Bent']], answer: 1, explain: ['AX₃E: tiga ikatan dan satu PEB menghasilkan piramida segitiga.', 'AX₃E: three bonds and one lone pair give a trigonal pyramid.'] },
    { lv: 'sma', q: ['Sudut ikatan CH₄ adalah…', 'The bond angle in CH₄ is…'], options: [['90°', '90°'], ['104,5°', '104.5°'], ['109,5°', '109.5°'], ['120°', '120°']], answer: 2, explain: ['Empat pasangan ikatan tersusun tetrahedral dengan sudut 109,5°.', 'Four bonding pairs form a tetrahedron with 109.5° angles.'] },
    { lv: 'sma', q: ['Notasi VSEPR untuk H₂O adalah…', 'The VSEPR notation for H₂O is…'], options: [['AX₂', 'AX₂'], ['AX₂E', 'AX₂E'], ['AX₂E₂', 'AX₂E₂'], ['AX₄', 'AX₄']], answer: 2, explain: ['O terikat pada 2 atom H dan memiliki 2 PEB.', 'O bonds to 2 H atoms and has 2 lone pairs.'] },
    { lv: 'sma', q: ['Molekul SF₆ berbentuk…', 'SF₆ is shaped…'], options: [['Oktahedral', 'Octahedral'], ['Tetrahedral', 'Tetrahedral'], ['Segi empat datar', 'Square planar'], ['Bipiramida segitiga', 'Trigonal bipyramidal']], answer: 0, explain: ['Enam pasangan ikatan tanpa PEB membentuk oktahedron.', 'Six bonding pairs and no lone pairs make an octahedron.'] },
    { lv: 'sma', q: ['Gaya antarmolekul terkuat pada etanol adalah…', 'The strongest intermolecular force in ethanol is…'], options: [['Gaya London', 'London forces'], ['Ikatan hidrogen', 'Hydrogen bonding'], ['Ikatan ion', 'Ionic bonding'], ['Ikatan logam', 'Metallic bonding']], answer: 1, explain: ['Gugus –OH etanol membentuk ikatan hidrogen antarmolekul.', 'Ethanol’s –OH group forms hydrogen bonds between molecules.'] },
    { lv: 'sma', q: ['Minyak tidak larut dalam air karena…', 'Oil does not dissolve in water because…'], options: [['Minyak lebih berat', 'Oil is heavier'], ['Minyak nonpolar sedangkan air polar', 'Oil is nonpolar but water is polar'], ['Air terlalu dingin', 'Water is too cold'], ['Minyak bermuatan listrik', 'Oil is electrically charged']], answer: 1, explain: ['Like dissolves like: molekul nonpolar tidak dapat menggantikan ikatan hidrogen antarmolekul air.', 'Like dissolves like: nonpolar molecules cannot replace water’s hydrogen bonds.'] },
    { lv: 'kuliah', q: ['Hibridisasi atom C pada asetilena (C₂H₂) adalah…', 'The hybridisation of C in acetylene (C₂H₂) is…'], options: [['sp', 'sp'], ['sp²', 'sp²'], ['sp³', 'sp³'], ['sp³d', 'sp³d']], answer: 0, explain: ['Setiap C memiliki dua domain (linear), sehingga sp dengan dua ikatan π.', 'Each C has two domains (linear), so sp with two π bonds.'] },
    { lv: 'kuliah', q: ['Pada SF₄ (AX₄E), PEB menempati posisi…', 'In SF₄ (AX₄E) the lone pair sits in…'], options: [['Aksial', 'An axial position'], ['Ekuatorial', 'An equatorial position'], ['Di pusat', 'The centre'], ['Tidak ada', 'Nowhere']], answer: 1, explain: ['Posisi ekuatorial hanya memiliki dua tetangga pada 90°, sehingga tolakannya lebih kecil.', 'Equatorial positions have only two 90° neighbours, so less repulsion.'] },
  ],
  teacher: {
    cp: ['Fase F: peserta didik meramalkan bentuk molekul dengan teori VSEPR dan menghubungkannya dengan sifat zat.', 'Phase F: learners predict molecular shapes with VSEPR and link them to properties.'],
    goals: [
      ['Menentukan notasi AXₘEₙ dan bentuk molekul.', 'Determine AXₘEₙ notation and molecular shape.'],
      ['Menjelaskan pengaruh gaya antarmolekul pada titik didih dan kelarutan.', 'Explain how intermolecular forces affect boiling points and solubility.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Model balon VSEPR.', 'Balloon VSEPR models.'],
      ['Lab Bentuk molekul: siswa mengisi tabel AXₘEₙ–bentuk–sudut.', 'Molecular shapes lab: fill in an AXₘEₙ–shape–angle table.'],
      ['Diskusi data titik didih dari halaman molekul Kimialoka (PubChem).', 'Discuss boiling-point data from Kimialoka molecule pages (PubChem).'],
    ],
    misconceptions: [['"Ikatan hidrogen adalah ikatan antara atom H di dalam molekul." Ikatan hidrogen adalah gaya antarmolekul.', '"A hydrogen bond is the bond to H inside a molecule." It is an intermolecular force.']],
    assessment: ['Kuis Kimialoka dan tabel prediksi bentuk 10 molekul.', 'Kimialoka quiz and a shape-prediction table for 10 molecules.'],
  },
  refs: ["7-6-molecular-structure-and-polarity", "8-1-valence-bond-theory", "8-2-hybrid-atomic-orbitals", "10-1-intermolecular-forces"],
};
