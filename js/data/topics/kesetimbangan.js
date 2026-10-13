export default {
  id: 'kesetimbangan',
  icon: 'compare',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Kesetimbangan kimia', 'Chemical equilibrium'],
  summary: [
    'Reaksi bolak-balik, kesetimbangan dinamis, tetapan kesetimbangan, asas Le Chatelier, serta kesetimbangan kelarutan dan asam–basa.',
    'Reversible reactions, dynamic equilibrium, equilibrium constants, Le Chatelier’s principle, and solubility and acid–base equilibria.',
  ],
  body: {
    sd: [
      `Ada perubahan yang bisa bolak-balik. Air dapat membeku menjadi es, lalu es dapat mencair lagi menjadi air. Air dalam botol tertutup sebagian menguap menjadi uap, lalu uapnya mengembun lagi menjadi tetes air di dinding botol.

Dalam botol tertutup yang dibiarkan lama, jumlah air yang menguap setiap detik akhirnya sama dengan jumlah uap yang mengembun. Dari luar, botolnya tampak tidak berubah, padahal di dalamnya partikel terus bergerak ke dua arah. Keadaan seimbang yang tetap sibuk seperti ini disebut **kesetimbangan**.`,
      `Some changes can go both ways. Water can freeze into ice, and ice can melt back into water. In a closed bottle some water evaporates into vapour, and the vapour condenses back into droplets on the walls.

In a closed bottle left for a long time, the amount of water evaporating each second eventually equals the amount of vapour condensing. From outside nothing seems to change, yet inside particles keep moving both ways. This busy balance is called **equilibrium**.`,
    ],
    smp: [
      `Banyak reaksi kimia dapat berlangsung dua arah (reaksi bolak-balik), ditulis dengan tanda ⇌. Contohnya {{r:amonium-klorida-panas|amonium klorida}} yang terurai saat dipanaskan dan terbentuk kembali saat dingin.

Dalam wadah tertutup, reaksi maju mula-mula cepat karena pereaksi banyak. Seiring terbentuknya produk, reaksi balik makin cepat. Akhirnya laju maju sama dengan laju balik: tercapai [[kesetimbangan-kimia|kesetimbangan dinamis]]. Konsentrasi zat tidak berubah lagi, tetapi reaksi tetap berjalan ke dua arah.

Kesetimbangan dapat digeser. Menurut [[le-chatelier|asas Le Chatelier]], bila kesetimbangan diganggu, sistem bergeser untuk mengurangi gangguan itu: menambah pereaksi menggeser ke arah produk; memanaskan menggeser ke arah reaksi yang menyerap panas. Warna larutan {{r:kompleks-besi-tiosianat|besi(III) tiosianat}} berubah makin merah bila Fe³⁺ ditambah, sehingga pergeseran ini dapat dilihat langsung.`,
      `Many chemical reactions can go both ways (reversible reactions), written with ⇌. An example is {{r:amonium-klorida-panas|ammonium chloride}}, which splits when heated and re-forms when cool.

In a closed container the forward reaction starts fast because there is plenty of reactant. As product builds up, the reverse reaction speeds up. Eventually the forward and reverse rates are equal: [[kesetimbangan-kimia|dynamic equilibrium]]. Concentrations stop changing, yet the reaction keeps running both ways.

Equilibrium can be shifted. By [[le-chatelier|Le Chatelier’s principle]], when an equilibrium is disturbed the system shifts to reduce the disturbance: adding reactant shifts it towards products; heating shifts it towards the heat-absorbing direction. The colour of {{r:kompleks-besi-tiosianat|iron(III) thiocyanate}} deepens to red when Fe³⁺ is added, so the shift can be seen directly.`,
    ],
    sma: [
      `Untuk aA + bB ⇌ cC + dD, [[tetapan-kesetimbangan|tetapan kesetimbangan]]: **Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ**. Padatan dan cairan murni tidak dimasukkan. Untuk gas dipakai Kp dengan tekanan parsial; Kp = Kc(RT)^Δn, dengan Δn perubahan mol gas.

- K ≫ 1: campuran setimbang didominasi produk; K ≪ 1: didominasi pereaksi.
- Hasil bagi reaksi Q dihitung dengan rumus yang sama pada saat sembarang: Q < K → bergeser ke kanan; Q > K → ke kiri; Q = K → setimbang.
- Perhitungan memakai tabel ICE (awal, perubahan, setimbang).

Asas Le Chatelier:

- **Konsentrasi**: tambah pereaksi atau ambil produk → bergeser ke kanan.
- **Tekanan/volume** (gas): tekanan naik → bergeser ke ruas dengan mol gas lebih sedikit.
- **Suhu**: satu-satunya faktor yang mengubah nilai K. Untuk reaksi eksoterm, suhu naik membuat K turun.
- **Katalis**: mempercepat tercapainya kesetimbangan tetapi tidak menggesernya.

Industri memanfaatkannya: {{r:haber-bosch|proses Haber–Bosch}} memakai tekanan tinggi, suhu kompromi, dan mengambil amonia; {{r:proses-kontak|proses kontak}} membuat SO₃ untuk asam sulfat.

Kesetimbangan lain: [[tetapan-ionisasi-asam|ionisasi asam lemah]] (Ka, lihat {{r:ionisasi-asam-asetat|asam asetat}}) dan [[hasil-kali-kelarutan|kelarutan garam sukar larut]] (Ksp). Endapan terbentuk bila hasil kali ion melebihi Ksp; ion senama menurunkan kelarutan.`,
      `For aA + bB ⇌ cC + dD, the [[tetapan-kesetimbangan|equilibrium constant]] is **Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ**. Pure solids and liquids are left out. For gases Kp uses partial pressures; Kp = Kc(RT)^Δn, where Δn is the change in gas moles.

- K ≫ 1: the equilibrium mixture is mostly products; K ≪ 1: mostly reactants.
- The reaction quotient Q uses the same formula at any moment: Q < K → shifts right; Q > K → left; Q = K → at equilibrium.
- Calculations use an ICE table (initial, change, equilibrium).

Le Chatelier’s principle:

- **Concentration**: add reactant or remove product → shifts right.
- **Pressure/volume** (gases): higher pressure → shifts to the side with fewer gas moles.
- **Temperature**: the only factor that changes K. For an exothermic reaction, raising temperature lowers K.
- **Catalyst**: reaches equilibrium faster but does not shift it.

Industry uses this: the {{r:haber-bosch|Haber–Bosch process}} uses high pressure, a compromise temperature and removal of ammonia; the {{r:proses-kontak|contact process}} makes SO₃ for sulfuric acid.

Other equilibria: [[tetapan-ionisasi-asam|weak-acid ionisation]] (Ka, see {{r:ionisasi-asam-asetat|acetic acid}}) and the [[hasil-kali-kelarutan|solubility of sparingly soluble salts]] (Ksp). A precipitate forms when the ion product exceeds Ksp; a common ion lowers solubility.`,
    ],
    kuliah: [
      `Tetapan kesetimbangan termodinamika dinyatakan dengan aktivitas, K = Π aᵢ^νᵢ, sehingga tidak berdimensi; Kc dan Kp adalah pendekatannya untuk larutan encer dan gas ideal. Hubungannya dengan energi bebas: ΔG° = −RT ln K, dan ΔG = RT ln(Q/K) menunjukkan arah reaksi.

Ketergantungan suhu mengikuti persamaan van ’t Hoff: ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁). Kurva ln K terhadap 1/T memberi ΔH° dari kemiringannya dan ΔS° dari titik potongnya.

Kesetimbangan berganda (kopel) diselesaikan dengan neraca massa dan muatan: kelarutan garam dari asam lemah (misalnya CaCO₃, fosfat) naik dalam asam karena anionnya terprotonasi; kelarutan AgCl naik dalam amonia karena terbentuk kompleks [Ag(NH₃)₂]⁺ (tetapan pembentukan kompleks). Diagram spesiasi (fraksi tiap spesies terhadap pH) memperlihatkan asam poliprotik dan logam terhidrolisis sekaligus.

Pada sistem biologis, pengikatan O₂ oleh hemoglobin bersifat kooperatif (kurva sigmoid, persamaan Hill), dan efek Bohr menggambarkan pergeseran kesetimbangan oleh pH dan CO₂. Kesetimbangan juga menjadi dasar pemisahan analitik: ekstraksi cair–cair dengan koefisien distribusi dan kromatografi.`,
      `The thermodynamic equilibrium constant uses activities, K = Π aᵢ^νᵢ, so it is dimensionless; Kc and Kp approximate it for dilute solutions and ideal gases. Its link to free energy: ΔG° = −RT ln K, and ΔG = RT ln(Q/K) shows the direction of reaction.

Temperature dependence follows the van ’t Hoff equation: ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁). A plot of ln K against 1/T gives ΔH° from its slope and ΔS° from its intercept.

Coupled equilibria are solved with mass and charge balances: salts of weak acids (CaCO₃, phosphates) dissolve more in acid because their anions are protonated; AgCl dissolves more in ammonia because [Ag(NH₃)₂]⁺ forms (a complex formation constant). Speciation diagrams (fraction of each species against pH) show polyprotic acids and hydrolysed metals at a glance.

In biology, O₂ binding by haemoglobin is cooperative (a sigmoid curve, the Hill equation), and the Bohr effect is an equilibrium shift caused by pH and CO₂. Equilibria also underlie analytical separations: liquid–liquid extraction with distribution coefficients, and chromatography.`,
    ],
  },
  points: [
    ['Kesetimbangan dinamis: laju maju = laju balik; konsentrasi tetap tetapi reaksi terus berjalan.', 'Dynamic equilibrium: forward rate = reverse rate; concentrations stay constant while reactions continue.'],
    ['Kc = [produk]^koefisien / [pereaksi]^koefisien; padatan dan cairan murni tidak ditulis.', 'Kc = [products]^coefficients / [reactants]^coefficients; pure solids and liquids are omitted.'],
    ['Le Chatelier: sistem bergeser untuk mengurangi gangguan.', 'Le Chatelier: the system shifts to oppose a disturbance.'],
    ['Hanya suhu yang mengubah nilai K; katalis tidak menggeser kesetimbangan.', 'Only temperature changes K; catalysts do not shift equilibrium.'],
    ['Ksp dan Ka adalah tetapan kesetimbangan untuk kelarutan dan ionisasi asam lemah.', 'Ksp and Ka are equilibrium constants for solubility and weak-acid ionisation.'],
  ],
  molecules: ['ammonia', 'nitrogen', 'hydrogen', 'sulfur-trioxide', 'ammonium-chloride', 'silver-chloride'],
  labs: ['gas'],
  activity: {
    sd: ['Masukkan sedikit air hangat ke botol plastik bening lalu tutup rapat. Amati embun di dinding botol selama beberapa jam dan ceritakan mengapa airnya tidak habis.', 'Put a little warm water in a clear plastic bottle and close it tightly. Watch the droplets on the walls over a few hours and explain why the water does not dry up.'],
    smp: ['Simulasi kesetimbangan dengan dua kelompok siswa yang saling memindahkan bola kertas dengan kecepatan berbeda sampai jumlah di kedua sisi tetap.', 'Simulate equilibrium with two groups passing paper balls to each other at different rates until the numbers on both sides stay constant.'],
    sma: ['Amati warna larutan Fe³⁺ + SCN⁻ setelah ditambah FeCl₃, KSCN, dan NaOH (mengikat Fe³⁺). Jelaskan setiap perubahan dengan asas Le Chatelier.', 'Observe Fe³⁺ + SCN⁻ after adding FeCl₃, KSCN and NaOH (which removes Fe³⁺). Explain each change with Le Chatelier’s principle.'],
    kuliah: ['Buat diagram spesiasi asam fosfat (pKa 2,15; 7,20; 12,35) dari pH 0 sampai 14, lalu tentukan pH saat HPO₄²⁻ paling banyak.', 'Build a speciation diagram for phosphoric acid (pKa 2.15, 7.20, 12.35) from pH 0 to 14 and find the pH where HPO₄²⁻ peaks.'],
  },
  quiz: [
    { lv: 'sd', q: ["Air dapat membeku menjadi es dan es dapat mencair lagi. Perubahan ini…", "Water can freeze to ice and ice can melt again. This change is…"], options: [["Dapat bolak-balik", "Reversible"], ["Tidak dapat dibalik", "Irreversible"], ["Menghasilkan zat baru", "Makes a new substance"], ["Berbahaya", "Dangerous"]], answer: 0, explain: ["Membeku dan mencair saling berkebalikan.", "Freezing and melting are opposites."] },
    { lv: 'sd', q: ["Dalam botol tertutup, air menguap lalu mengembun lagi. Karena itu airnya…", "In a closed bottle, water evaporates and condenses again. So the water…"], options: [["Habis", "Runs out"], ["Tidak habis karena menguap dan mengembun seimbang", "Does not run out, because evaporating and condensing balance"], ["Menjadi es", "Turns to ice"], ["Berubah warna", "Changes colour"]], answer: 1, explain: ["Laju menguap dan mengembun menjadi sama: kesetimbangan.", "Evaporation and condensation reach equal rates: equilibrium."] },
    { lv: 'smp', q: ['Pada kesetimbangan dinamis…', 'At dynamic equilibrium…'], options: [['Reaksi berhenti', 'The reaction stops'], ['Laju reaksi maju sama dengan laju balik', 'The forward and reverse rates are equal'], ['Semua pereaksi habis', 'All reactants are used up'], ['Konsentrasi produk selalu sama dengan pereaksi', 'Product and reactant concentrations are always equal']], answer: 1, explain: ['Reaksi tetap berjalan ke dua arah dengan laju sama.', 'Both reactions continue at equal rates.'] },
    { lv: 'smp', q: ['Tanda ⇌ pada persamaan reaksi berarti…', 'The ⇌ sign in an equation means…'], options: [['Reaksi bolak-balik', 'A reversible reaction'], ['Reaksi sangat cepat', 'A very fast reaction'], ['Reaksi eksoterm', 'An exothermic reaction'], ['Reaksi nuklir', 'A nuclear reaction']], answer: 0, explain: ['Reaksi dapat berlangsung ke dua arah.', 'The reaction can go both ways.'] },
    { lv: 'sma', q: ['Untuk N₂ + 3H₂ ⇌ 2NH₃, rumus Kc adalah…', 'For N₂ + 3H₂ ⇌ 2NH₃, Kc is…'], options: [['[NH₃]² / [N₂][H₂]³', '[NH₃]² / [N₂][H₂]³'], ['[N₂][H₂]³ / [NH₃]²', '[N₂][H₂]³ / [NH₃]²'], ['2[NH₃] / [N₂]3[H₂]', '2[NH₃] / [N₂]3[H₂]'], ['[NH₃] / [N₂][H₂]', '[NH₃] / [N₂][H₂]']], answer: 0, explain: ['Produk di pembilang, pereaksi di penyebut, dipangkatkan koefisiennya.', 'Products on top, reactants below, each raised to its coefficient.'] },
    { lv: 'sma', q: ['Pada N₂ + 3H₂ ⇌ 2NH₃, menaikkan tekanan menggeser kesetimbangan ke…', 'For N₂ + 3H₂ ⇌ 2NH₃, raising pressure shifts the equilibrium…'], options: [['Kiri', 'Left'], ['Kanan', 'Right'], ['Tidak bergeser', 'Nowhere'], ['Bergantung katalis', 'Depending on the catalyst']], answer: 1, explain: ['Ruas kanan memiliki mol gas lebih sedikit (2 dibanding 4).', 'The right side has fewer gas moles (2 vs 4).'] },
    { lv: 'sma', q: ['Faktor yang mengubah nilai tetapan kesetimbangan K adalah…', 'Which factor changes the value of K?'], options: [['Konsentrasi', 'Concentration'], ['Tekanan', 'Pressure'], ['Suhu', 'Temperature'], ['Katalis', 'A catalyst']], answer: 2, explain: ['Hanya suhu yang mengubah K.', 'Only temperature changes K.'] },
    { lv: 'sma', q: ['Jika Q < K, reaksi akan…', 'If Q < K, the reaction will…'], options: [['Bergeser ke kanan (produk)', 'Shift right (to products)'], ['Bergeser ke kiri', 'Shift left'], ['Berhenti', 'Stop'], ['Meledak', 'Explode']], answer: 0, explain: ['Produk masih kurang dibanding keadaan setimbang.', 'There is less product than at equilibrium.'] },
    { lv: 'sma', q: ['Menambahkan NaCl ke larutan jenuh AgCl akan…', 'Adding NaCl to saturated AgCl solution will…'], options: [['Menambah kelarutan AgCl', 'Increase AgCl’s solubility'], ['Mengurangi kelarutan AgCl (efek ion senama)', 'Decrease AgCl’s solubility (common-ion effect)'], ['Tidak berpengaruh', 'Have no effect'], ['Mengubah Ksp', 'Change Ksp']], answer: 1, explain: ['Cl⁻ tambahan menggeser kesetimbangan ke arah endapan.', 'Extra Cl⁻ shifts the equilibrium towards the solid.'] },
    { lv: 'kuliah', q: ['Kp dan Kc untuk 2SO₂ + O₂ ⇌ 2SO₃ berhubungan menurut…', 'For 2SO₂ + O₂ ⇌ 2SO₃, Kp and Kc are related by…'], options: [['Kp = Kc(RT)⁻¹', 'Kp = Kc(RT)⁻¹'], ['Kp = Kc(RT)', 'Kp = Kc(RT)'], ['Kp = Kc', 'Kp = Kc'], ['Kp = Kc(RT)³', 'Kp = Kc(RT)³']], answer: 0, explain: ['Δn = 2 − 3 = −1.', 'Δn = 2 − 3 = −1.'] },
    { lv: 'kuliah', q: ['Kelarutan AgCl naik dalam larutan amonia karena…', 'AgCl dissolves more in ammonia because…'], options: [['Amonia asam', 'Ammonia is acidic'], ['Terbentuk kompleks [Ag(NH₃)₂]⁺ yang mengambil Ag⁺', '[Ag(NH₃)₂]⁺ forms, removing Ag⁺'], ['Ksp berubah', 'Ksp changes'], ['Cl⁻ menguap', 'Cl⁻ evaporates']], answer: 1, explain: ['Pembentukan kompleks menurunkan [Ag⁺] bebas sehingga lebih banyak AgCl larut.', 'Complex formation lowers free [Ag⁺], so more AgCl dissolves.'] },
    { lv: 'kuliah', q: ['Kemiringan grafik ln K terhadap 1/T sama dengan…', 'The slope of ln K against 1/T equals…'], options: [['−ΔH°/R', '−ΔH°/R'], ['ΔS°/R', 'ΔS°/R'], ['−ΔG°', '−ΔG°'], ['Eₐ/R', 'Eₐ/R']], answer: 0, explain: ['Persamaan van ’t Hoff: ln K = −ΔH°/RT + ΔS°/R.', 'van ’t Hoff: ln K = −ΔH°/RT + ΔS°/R.'] },
  ],
  teacher: {
    cp: ['Fase E–F: peserta didik menjelaskan kesetimbangan dinamis, menuliskan tetapan kesetimbangan, dan meramalkan pergeseran dengan asas Le Chatelier.', 'Phases E–F: learners explain dynamic equilibrium, write equilibrium constants and predict shifts with Le Chatelier’s principle.'],
    goals: [
      ['Menjelaskan kesetimbangan dinamis dengan model.', 'Explain dynamic equilibrium with a model.'],
      ['Menuliskan Kc dan Kp serta menghitungnya dengan tabel ICE.', 'Write and calculate Kc and Kp with ICE tables.'],
      ['Meramalkan pergeseran akibat konsentrasi, tekanan, dan suhu.', 'Predict shifts from concentration, pressure and temperature.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pemantik: simulasi bola kertas dua kelompok.', 'Hook: the two-group paper-ball simulation.'],
      ['Praktikum warna Fe³⁺/SCN⁻ dengan berbagai gangguan.', 'Practical: the Fe³⁺/SCN⁻ colour under different disturbances.'],
      ['Latihan tabel ICE dan hubungan Kp–Kc.', 'ICE-table practice and the Kp–Kc relation.'],
      ['Studi kasus pupuk: proses Haber–Bosch di pabrik pupuk Indonesia.', 'Case study: the Haber–Bosch process at Indonesian fertiliser plants.'],
    ],
    misconceptions: [
      ['"Pada kesetimbangan reaksi berhenti." Reaksi tetap berjalan dua arah dengan laju sama.', '"At equilibrium the reaction stops." Both directions continue at equal rates.'],
      ['"Pada kesetimbangan konsentrasi pereaksi = produk." Yang sama adalah lajunya, bukan konsentrasinya.', '"At equilibrium reactant and product concentrations are equal." The rates are equal, not the concentrations.'],
      ['"Katalis menambah hasil pada kesetimbangan." Katalis hanya mempercepat tercapainya kesetimbangan.', '"A catalyst increases the equilibrium yield." It only reaches equilibrium faster.'],
    ],
    assessment: ['Kuis Kimialoka, laporan praktikum Le Chatelier, dan soal hitungan Kc.', 'The Kimialoka quiz, a Le Chatelier practical report and Kc problems.'],
  },
  refs: ['13-1-chemical-equilibria', '13-2-equilibrium-constants', '13-3-shifting-equilibria-le-chateliers-principle', '13-4-equilibrium-calculations', '15-1-precipitation-and-dissolution', '15-3-coupled-equilibria'],
};
