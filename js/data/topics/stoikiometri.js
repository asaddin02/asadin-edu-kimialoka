export default {
  id: 'stoikiometri',
  icon: 'gauge',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Persamaan reaksi dan stoikiometri', 'Equations and stoichiometry'],
  summary: [
    'Hukum dasar kimia, menyetarakan reaksi, konsep mol, massa molar, dan pereaksi pembatas.',
    'The basic laws of chemistry, balancing equations, the mole, molar mass and limiting reactants.',
  ],
  body: {
    sd: [
      `Dalam reaksi kimia, atom tidak hilang dan tidak muncul begitu saja; atom hanya berganti pasangan. Bayangkan menyusun ulang balok mainan: bentuk bangunannya berubah, tetapi jumlah baloknya tetap.

Karena itu, jika reaksi terjadi di dalam wadah tertutup rapat, berat seluruh isinya sebelum dan sesudah reaksi sama. Inilah [[hukum-kekekalan-massa|hukum kekekalan massa]] yang ditemukan Antoine Lavoisier.

Reaksi juga punya "resep" perbandingan, seperti resep kue: 2 butir telur untuk 1 cangkir tepung. Air selalu terbentuk dari 2 bagian hidrogen dan 1 bagian oksigen. Kalau salah satu bahan habis lebih dulu, kue berhenti dibuat, begitu juga reaksi.`,
      `In a chemical reaction atoms are never lost and never appear from nowhere; they just change partners. Picture rebuilding with toy bricks: the building changes shape, but the number of bricks stays the same.

So if a reaction happens in a tightly closed container, everything inside weighs the same before and after. This is the [[hukum-kekekalan-massa|law of conservation of mass]], discovered by Antoine Lavoisier.

Reactions also have a "recipe" ratio, like a cake recipe: 2 eggs for 1 cup of flour. Water always forms from 2 parts hydrogen to 1 part oxygen. When one ingredient runs out, you stop making cakes, and the reaction stops too.`,
    ],
    smp: [
      `Dalam [[reaksi-kimia]], atom tidak hilang dan tidak muncul begitu saja; atom hanya bertukar pasangan. Karena itu massa sebelum dan sesudah reaksi sama ([[hukum-kekekalan-massa]], Lavoisier).

[[persamaan-reaksi|Persamaan reaksi]] ditulis dengan [[reaktan]] di kiri dan [[produk]] di kanan. Persamaan harus **setara**: jumlah tiap jenis atom di kiri sama dengan di kanan. Kita menyetarakannya dengan mengubah [[koefisien]] (angka di depan rumus), bukan angka kecil di dalam rumus.

Contoh: gas hidrogen terbakar membentuk air.
H₂ + O₂ → H₂O (belum setara: O kiri 2, kanan 1)
2H₂ + O₂ → 2H₂O (setara: H 4 = 4, O 2 = 2)

Latih dirimu di {{lab:setara|lab Penyetaraan reaksi}}.`,
      `In a [[reaksi-kimia|chemical reaction]] atoms are not created or destroyed; they only swap partners. So mass before and after a reaction is the same (the [[hukum-kekekalan-massa|law of conservation of mass]], Lavoisier).

A [[persamaan-reaksi|chemical equation]] puts [[reaktan|reactants]] on the left and [[produk|products]] on the right. It must be **balanced**: the number of each kind of atom is equal on both sides. We balance with [[koefisien|coefficients]] (numbers in front of formulas), never by changing the small numbers inside formulas.

Example: hydrogen burns to form water.
H₂ + O₂ → H₂O (not balanced: 2 O on the left, 1 on the right)
2H₂ + O₂ → 2H₂O (balanced: H 4 = 4, O 2 = 2)

Practise in the {{lab:setara|Balancing equations lab}}.`,
    ],
    sma: [
      `[[mol|Mol]] adalah satuan jumlah zat: 1 mol berisi 6,022 × 10²³ partikel ([[bilangan-avogadro]]). [[massa-molar|Massa molar]] (g/mol) sama dengan jumlah massa atom relatif (Ar) dalam rumus, misalnya {{m:glucose|C₆H₁₂O₆}}: 6(12,011) + 12(1,008) + 6(15,999) = 180,16 g/mol.

Rumus penting:

- n = m / Mr (mol dari massa)
- n = N / Nₐ (mol dari jumlah partikel)
- n = V / 22,4 L untuk gas pada STP (0 °C, 1 atm); 24,5 L pada 25 °C
- M = n / V (molaritas larutan)

Koefisien persamaan setara adalah perbandingan mol. Pada pembakaran {{m:propane|propana}}, C₃H₈ + 5O₂ → 3CO₂ + 4H₂O: 1 mol propana memerlukan 5 mol oksigen. Bila salah satu reaktan habis lebih dulu, ia menjadi [[pereaksi-pembatas]] yang menentukan jumlah produk maksimum. Hasil nyata dibanding hasil teoretis disebut rendemen (%).

Hitung Mr zat apa pun di {{lab:stoikiometri|lab Massa molar}}.`,
      `The [[mol|mole]] is the unit of amount: 1 mol contains 6.022 × 10²³ particles ([[bilangan-avogadro|Avogadro’s number]]). [[massa-molar|Molar mass]] (g/mol) is the sum of relative atomic masses in the formula, e.g. {{m:glucose|C₆H₁₂O₆}}: 6(12.011) + 12(1.008) + 6(15.999) = 180.16 g/mol.

Key relationships:

- n = m / Mr (moles from mass)
- n = N / Nₐ (moles from particles)
- n = V / 22.4 L for gases at STP (0 °C, 1 atm); 24.5 L at 25 °C
- M = n / V (molarity)

Coefficients in a balanced equation are mole ratios. When {{m:propane|propane}} burns, C₃H₈ + 5O₂ → 3CO₂ + 4H₂O: 1 mol propane needs 5 mol oxygen. The reactant that runs out first is the [[pereaksi-pembatas|limiting reactant]] and sets the maximum product. Actual yield over theoretical yield is the percentage yield.

Calculate the Mr of anything in the {{lab:stoikiometri|Molar mass lab}}.`,
    ],
    kuliah: [
      `Penyetaraan dapat diformulasikan sebagai aljabar linear: matriks komposisi A (unsur × spesi) dengan koefisien positif x sehingga Ax = 0. Ruang nol berdimensi satu memberi satu reaksi yang unik; dimensi lebih besar berarti beberapa reaksi independen dapat terjadi bersamaan. Lab Penyetaraan Kimialoka memakai eliminasi Gauss dengan pecahan eksak untuk mencari solusi bilangan bulat terkecil.

Reaksi redoks kompleks disetarakan dengan metode setengah reaksi (ion-elektron) di suasana asam atau basa, yang juga menjaga kekekalan muatan. Contoh: 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O.

Dalam kimia industri, stoikiometri dikaitkan dengan ekonomi atom (persentase massa reaktan yang menjadi produk yang diinginkan) dan faktor-E (massa limbah per massa produk), dua indikator [[kimia-hijau]]. Proses Haber–Bosch (N₂ + 3H₂ ⇌ 2NH₃) memiliki ekonomi atom 100%, tetapi konversi per lintasan hanya sekitar 15% sehingga gas didaur ulang.`,
      `Balancing can be framed as linear algebra: a composition matrix A (elements × species) with positive coefficients x such that Ax = 0. A one-dimensional null space gives a unique reaction; a larger one means several independent reactions can run together. Kimialoka’s balancing lab uses exact-fraction Gaussian elimination to find the smallest whole-number solution.

Complex redox reactions are balanced by the half-equation (ion–electron) method in acidic or basic solution, which also conserves charge. Example: 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O.

In industry, stoichiometry links to atom economy (the percentage of reactant mass ending in the desired product) and the E-factor (waste mass per product mass), two [[kimia-hijau|green chemistry]] metrics. The Haber–Bosch process (N₂ + 3H₂ ⇌ 2NH₃) has 100% atom economy but only about 15% conversion per pass, so gases are recycled.`,
    ],
  },
  points: [
    ['Atom kekal dalam reaksi: persamaan harus setara.', 'Atoms are conserved: equations must balance.'],
    ['Setarakan dengan koefisien, jangan mengubah rumus.', 'Balance with coefficients; never change formulas.'],
    ['n = m/Mr = N/Nₐ = V/22,4 L (gas, STP).', 'n = m/Mr = N/Nₐ = V/22.4 L (gas, STP).'],
    ['Pereaksi pembatas menentukan jumlah produk.', 'The limiting reactant decides how much product forms.'],
  ],
  molecules: ['water', 'glucose', 'propane', 'hydrogen', 'ammonia', 'potassium-permanganate'],
  labs: ['setara', 'stoikiometri'],
  activity: {
    sd: ["Timbang botol plastik berisi sedikit cuka dan balon berisi soda kue. Campurkan tanpa melepas balon, lalu timbang lagi. Apakah beratnya berubah?", "Weigh a plastic bottle holding some vinegar with a balloon of baking soda on top. Mix them without removing the balloon, then weigh again. Did the mass change?"],
    smp: ['Timbang gelas berisi cuka dan sebungkus soda kue yang diikat balon di mulut gelas sebelum dan sesudah bereaksi. Apakah massanya berubah?', 'Weigh a cup of vinegar with baking soda sealed under a balloon before and after reacting. Does the mass change?'],
    sma: ['Hitung massa CO₂ yang dihasilkan dari pembakaran 1 kg LPG (anggap 50% propana, 50% butana).', 'Calculate the CO₂ produced by burning 1 kg of LPG (assume 50% propane, 50% butane).'],
    kuliah: ['Hitung ekonomi atom sintesis aspirin dari asam salisilat dan anhidrida asetat, lalu bandingkan dengan asetil klorida.', 'Compute the atom economy of aspirin synthesis from salicylic acid with acetic anhydride vs acetyl chloride.'],
  },
  quiz: [
    { lv: 'sd', q: ["Membuat air selalu memerlukan hidrogen dan oksigen dengan perbandingan…", "Making water always takes hydrogen and oxygen in the ratio…"], options: [["Acak", "Any ratio"], ["Tetap, 2 atom H untuk 1 atom O", "Fixed, 2 H atoms to 1 O atom"], ["1 banding 1", "1 to 1"], ["3 banding 1", "3 to 1"]], answer: 1, explain: ["Rumus H₂O menunjukkan perbandingan tetap 2 : 1.", "The formula H₂O shows a fixed 2 : 1 ratio."] },
    { lv: 'sd', q: ["Reaksi terjadi dalam wadah tertutup rapat. Berat seluruh isinya setelah reaksi…", "A reaction happens in a sealed container. Afterwards the total mass is…"], options: [["Bertambah", "Greater"], ["Berkurang", "Smaller"], ["Tetap sama", "The same"], ["Menjadi nol", "Zero"]], answer: 2, explain: ["Atom tidak hilang dan tidak bertambah: hukum kekekalan massa.", "No atoms are lost or gained: the law of conservation of mass."] },
    { lv: 'kuliah', q: ["Hasil teoretis 10,0 g dan hasil nyata 8,0 g. Persen hasilnya…", "The theoretical yield is 10.0 g and the actual yield 8.0 g. The percent yield is…"], options: [["8%", "8%"], ["80%", "80%"], ["125%", "125%"], ["20%", "20%"]], answer: 1, explain: ["(8,0/10,0) × 100% = 80%.", "(8.0/10.0) × 100% = 80%."] },
    { lv: 'smp', q: ['Koefisien yang benar untuk __H₂ + O₂ → __H₂O adalah…', 'The right coefficients for __H₂ + O₂ → __H₂O are…'], options: [['1 dan 1', '1 and 1'], ['2 dan 2', '2 and 2'], ['2 dan 1', '2 and 1'], ['1 dan 2', '1 and 2']], answer: 1, explain: ['2H₂ + O₂ → 2H₂O: 4 atom H dan 2 atom O di kedua sisi.', '2H₂ + O₂ → 2H₂O: 4 H and 2 O on each side.'] },
    { lv: 'smp', q: ['Hukum kekekalan massa dikemukakan oleh…', 'The law of conservation of mass was stated by…'], options: [['Dalton', 'Dalton'], ['Lavoisier', 'Lavoisier'], ['Mendeleev', 'Mendeleev'], ['Avogadro', 'Avogadro']], answer: 1, explain: ['Antoine Lavoisier menimbang reaksi dalam wadah tertutup (1789).', 'Antoine Lavoisier weighed reactions in sealed vessels (1789).'] },
    { lv: 'sma', q: ['Massa molar CO₂ (Ar C = 12, O = 16) adalah…', 'The molar mass of CO₂ (Ar C = 12, O = 16) is…'], options: [['28 g/mol', '28 g/mol'], ['32 g/mol', '32 g/mol'], ['44 g/mol', '44 g/mol'], ['60 g/mol', '60 g/mol']], answer: 2, explain: ['12 + 2 × 16 = 44 g/mol.', '12 + 2 × 16 = 44 g/mol.'] },
    { lv: 'sma', q: ['Berapa mol dalam 90 g air (Mr 18)?', 'How many moles are in 90 g of water (Mr 18)?'], options: [['2', '2'], ['5', '5'], ['18', '18'], ['90', '90']], answer: 1, explain: ['n = m/Mr = 90/18 = 5 mol.', 'n = m/Mr = 90/18 = 5 mol.'] },
    { lv: 'sma', q: ['Volume 2 mol gas O₂ pada STP adalah…', 'The volume of 2 mol O₂ at STP is…'], options: [['11,2 L', '11.2 L'], ['22,4 L', '22.4 L'], ['44,8 L', '44.8 L'], ['67,2 L', '67.2 L']], answer: 2, explain: ['V = n × 22,4 L = 2 × 22,4 = 44,8 L.', 'V = n × 22.4 L = 2 × 22.4 = 44.8 L.'] },
    { lv: 'sma', q: ['Pada C₃H₈ + 5O₂ → 3CO₂ + 4H₂O, 2 mol propana menghasilkan … mol CO₂.', 'In C₃H₈ + 5O₂ → 3CO₂ + 4H₂O, 2 mol propane gives … mol CO₂.'], options: [['3', '3'], ['4', '4'], ['6', '6'], ['10', '10']], answer: 2, explain: ['Perbandingan koefisien 1 : 3, jadi 2 × 3 = 6 mol.', 'The ratio is 1 : 3, so 2 × 3 = 6 mol.'] },
    { lv: 'sma', q: ['4 mol H₂ direaksikan dengan 1 mol O₂ (2H₂ + O₂ → 2H₂O). Pereaksi pembatasnya…', '4 mol H₂ react with 1 mol O₂ (2H₂ + O₂ → 2H₂O). The limiting reactant is…'], options: [['H₂', 'H₂'], ['O₂', 'O₂'], ['Keduanya', 'Both'], ['H₂O', 'H₂O']], answer: 1, explain: ['1 mol O₂ hanya cukup untuk 2 mol H₂; O₂ habis lebih dulu.', '1 mol O₂ only uses 2 mol H₂, so O₂ runs out first.'] },
    { lv: 'kuliah', q: ['Ekonomi atom reaksi adisi seperti H₂C=CH₂ + H₂ → C₂H₆ adalah…', 'The atom economy of an addition such as H₂C=CH₂ + H₂ → C₂H₆ is…'], options: [['50%', '50%'], ['75%', '75%'], ['100%', '100%'], ['Tidak dapat dihitung', 'Cannot be calculated']], answer: 2, explain: ['Semua atom reaktan masuk ke produk yang diinginkan.', 'Every reactant atom ends up in the desired product.'] },
  ],
  teacher: {
    cp: ['Fase E: peserta didik menerapkan hukum dasar kimia dan konsep mol dalam perhitungan kimia.', 'Phase E: learners apply the basic laws and the mole concept in chemical calculations.'],
    goals: [
      ['Menyetarakan persamaan reaksi sederhana dan kompleks.', 'Balance simple and complex equations.'],
      ['Menghitung mol, massa, volume gas, dan jumlah partikel.', 'Calculate moles, mass, gas volume and particle numbers.'],
      ['Menentukan pereaksi pembatas dan rendemen.', 'Find the limiting reactant and percentage yield.'],
    ],
    duration: ['5 × 45 menit', '5 × 45 min'],
    steps: [
      ['Demonstrasi kekekalan massa dengan balon dan soda kue.', 'Conservation-of-mass demo with a balloon and baking soda.'],
      ['Permainan penyetaraan di lab Penyetaraan reaksi (level bertahap).', 'Balancing game in the Balancing lab (graded levels).'],
      ['Latihan soal konsep mol dengan kalkulator massa molar Kimialoka.', 'Mole-concept practice with the Kimialoka molar-mass calculator.'],
    ],
    misconceptions: [['"Menyetarakan boleh mengubah indeks rumus." Mengubah indeks berarti mengubah zatnya.', '"You can balance by changing subscripts." That changes the substance itself.']],
    assessment: ['Kuis Kimialoka dan tugas proyek jejak karbon LPG keluarga.', 'Kimialoka quiz and a family LPG carbon-footprint project.'],
  },
  refs: ["3-1-formula-mass-and-the-mole-concept", "3-3-molarity", "4-1-writing-and-balancing-chemical-equations", "4-3-reaction-stoichiometry", "4-4-reaction-yields"],
};
