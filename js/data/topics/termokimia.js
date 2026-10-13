export default {
  id: 'termokimia',
  icon: 'flame',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Termokimia: kalor & entalpi', 'Thermochemistry: heat & enthalpy'],
  summary: [
    'Reaksi eksoterm dan endoterm, kalor dan kalorimetri, entalpi, hukum Hess, entalpi pembentukan, dan energi ikatan.',
    'Exothermic and endothermic reactions, heat and calorimetry, enthalpy, Hess’s law, enthalpies of formation and bond energies.',
  ],
  body: {
    sd: [
      `Setiap perubahan melibatkan energi. Ada perubahan yang **melepaskan panas** dan ada yang **menyerap panas**:

- Kompor gas menyala: gas terbakar dan melepaskan panas untuk memasak.
- Tubuh kita "membakar" makanan pelan-pelan sehingga badan tetap hangat dan kita bisa bergerak. Energi makanan ditulis dalam kalori (kkal) pada kemasan.
- Es batu mencair di tangan: es menyerap panas dari tanganmu, jadi tanganmu terasa dingin.
- Kompres dingin instan untuk cedera olahraga menjadi dingin karena zat di dalamnya menyerap panas saat larut dalam air.

Panas selalu mengalir dari benda yang lebih panas ke benda yang lebih dingin. Karena itu segelas teh panas lama-lama menjadi hangat, dan es teh lama-lama tidak dingin lagi.`,
      `Every change involves energy. Some changes **give out heat** and some **take in heat**:

- A gas stove burns: the gas releases heat for cooking.
- Our bodies "burn" food slowly, keeping us warm and letting us move. Food energy is printed on packets in calories (kcal).
- An ice cube melts in your hand: the ice takes heat from your hand, so your hand feels cold.
- Instant cold packs for sports injuries get cold because the substance inside takes in heat as it dissolves in water.

Heat always flows from a hotter object to a cooler one. That is why hot tea slowly becomes warm and iced tea slowly stops being cold.`,
    ],
    smp: [
      `Dalam termokimia, zat yang bereaksi disebut **sistem** dan semua di luarnya **lingkungan**.

- [[eksoterm|Reaksi eksoterm]]: sistem melepaskan kalor ke lingkungan, sehingga lingkungan menjadi panas. Contoh: {{r:pembakaran-metana|pembakaran metana}}, respirasi, {{r:pemadaman-kapur|kapur tohor dengan air}}.
- [[endoterm|Reaksi endoterm]]: sistem menyerap kalor dari lingkungan, sehingga lingkungan menjadi dingin. Contoh: melarutkan {{m:ammonium-nitrate|amonium nitrat}} dalam air, {{r:fotosintesis|fotosintesis}}, {{r:kalsinasi-kapur|penguraian batu kapur}}.

[[kalor|Kalor]] berbeda dengan suhu. Suhu menunjukkan seberapa panas benda, sedangkan kalor adalah energi yang berpindah. Satuannya joule (J); 1 kalori = 4,184 J.

Kalor yang diserap air dapat dihitung: q = m · c · ΔT. Kalor jenis air c = 4,18 J/(g °C), artinya 4,18 J diperlukan untuk memanaskan 1 g air sebanyak 1 °C. Cara mengukur kalor reaksi disebut [[kalorimetri]]; di sekolah cukup dengan gelas plastik berpenutup dan termometer.`,
      `In thermochemistry the reacting substances are the **system** and everything else is the **surroundings**.

- [[eksoterm|Exothermic reactions]]: the system releases heat to the surroundings, which get hot. Examples: {{r:pembakaran-metana|burning methane}}, respiration, {{r:pemadaman-kapur|quicklime with water}}.
- [[endoterm|Endothermic reactions]]: the system takes heat from the surroundings, which get cold. Examples: dissolving {{m:ammonium-nitrate|ammonium nitrate}} in water, {{r:fotosintesis|photosynthesis}}, {{r:kalsinasi-kapur|decomposing limestone}}.

[[kalor|Heat]] is not the same as temperature. Temperature says how hot something is; heat is energy on the move. Its unit is the joule (J); 1 calorie = 4.184 J.

Heat absorbed by water can be calculated: q = m · c · ΔT. Water’s specific heat is c = 4.18 J/(g °C): 4.18 J warms 1 g of water by 1 °C. Measuring reaction heat is [[kalorimetri|calorimetry]]; at school a lidded plastic cup and a thermometer are enough.`,
    ],
    sma: [
      `[[entalpi|Perubahan entalpi]] (ΔH) adalah kalor reaksi pada tekanan tetap. ΔH < 0 untuk reaksi eksoterm dan ΔH > 0 untuk endoterm. Persamaan termokimia mencantumkan wujud zat dan ΔH-nya:

CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)   ΔH° = −890 kJ

Bila persamaan dikali 2, ΔH dikali 2; bila dibalik, tanda ΔH dibalik.

Empat cara menentukan ΔH:

1. **Kalorimetri**: q = m·c·ΔT, lalu ΔH = −q per mol pereaksi pembatas.
2. **[[hukum-hess|Hukum Hess]]**: ΔH tidak bergantung pada jalannya reaksi, jadi persamaan-persamaan termokimia dapat dijumlahkan.
3. **Entalpi pembentukan standar** (ΔHf°, unsur dalam wujud standarnya = 0): ΔH° = ΣΔHf°(produk) − ΣΔHf°(pereaksi). Dengan ΔHf° CH₄ = −74,6, CO₂ = −393,5, dan H₂O(l) = −285,8 kJ/mol: ΔH° = −393,5 + 2(−285,8) − (−74,6) ≈ −890 kJ.
4. **[[energi-ikatan|Energi ikatan]] rata-rata**: ΔH ≈ Σ ikatan diputus − Σ ikatan dibentuk (hasilnya perkiraan karena memakai nilai rata-rata).

Keadaan standar: 1 bar dan biasanya 25 °C. Nilai kalor bahan bakar (kJ/g) membantu membandingkan: hidrogen sekitar 142, metana sekitar 55, etanol sekitar 30. Bandingkan pembakaran di {{page:reaction|pustaka reaksi}}.`,
      `The [[entalpi|enthalpy change]] (ΔH) is the heat of reaction at constant pressure. ΔH < 0 for exothermic reactions, ΔH > 0 for endothermic ones. Thermochemical equations show states and ΔH:

CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)   ΔH° = −890 kJ

Doubling the equation doubles ΔH; reversing it flips the sign.

Four ways to find ΔH:

1. **Calorimetry**: q = m·c·ΔT, then ΔH = −q per mole of limiting reagent.
2. **[[hukum-hess|Hess’s law]]**: ΔH does not depend on the route, so thermochemical equations can be added.
3. **Standard enthalpies of formation** (ΔHf°, elements in their standard states = 0): ΔH° = ΣΔHf°(products) − ΣΔHf°(reactants). With ΔHf° CH₄ = −74.6, CO₂ = −393.5 and H₂O(l) = −285.8 kJ/mol: ΔH° = −393.5 + 2(−285.8) − (−74.6) ≈ −890 kJ.
4. **Average [[energi-ikatan|bond energies]]**: ΔH ≈ Σ bonds broken − Σ bonds formed (an estimate, because the values are averages).

Standard state: 1 bar and usually 25 °C. Fuel values (kJ/g) help comparisons: hydrogen about 142, methane about 55, ethanol about 30. Compare combustions in the {{page:reaction|reaction library}}.`,
    ],
    kuliah: [
      `Hukum pertama termodinamika: ΔU = q + w, dengan kerja ekspansi w = −PΔV (konvensi IUPAC). Entalpi didefinisikan H = U + PV, sehingga pada tekanan tetap ΔH = q_p, sedangkan pada volume tetap (bom kalorimeter) ΔU = q_v. Untuk reaksi gas ideal ΔH = ΔU + Δn_gas·RT.

Kapasitas kalor: C_p = (∂H/∂T)_p dan C_v = (∂U/∂T)_v; untuk gas ideal C_p − C_v = R per mol. **Hukum Kirchhoff** memberi ΔH pada suhu lain: ΔH(T₂) = ΔH(T₁) + ∫ΔC_p dT.

**Siklus Born–Haber** memakai hukum Hess untuk memperoleh energi kisi yang tidak dapat diukur langsung. Entalpi pelarutan adalah jumlah energi kisi dan entalpi hidrasi ion. Energi ikatan rata-rata berbeda dari entalpi disosiasi ikatan tertentu: melepas H pertama dari CH₄ memerlukan energi berbeda dari H terakhir.

Data termokimia rujukan (ΔHf°, S°, C_p) dikumpulkan misalnya dalam NIST Chemistry WebBook dan lampiran buku OpenStax *Chemistry 2e*; nilai "Heat of Combustion" untuk ribuan senyawa juga tercantum di data eksperimen PubChem pada halaman molekul Kimialoka. Kimia komputasi (metode ab initio dan DFT) dapat memperkirakan entalpi reaksi yang belum diukur.`,
      `The first law: ΔU = q + w, with expansion work w = −PΔV (IUPAC convention). Enthalpy is H = U + PV, so at constant pressure ΔH = q_p, while at constant volume (bomb calorimeter) ΔU = q_v. For ideal-gas reactions ΔH = ΔU + Δn_gas·RT.

Heat capacities: C_p = (∂H/∂T)_p and C_v = (∂U/∂T)_v; for an ideal gas C_p − C_v = R per mole. **Kirchhoff’s law** gives ΔH at another temperature: ΔH(T₂) = ΔH(T₁) + ∫ΔC_p dT.

The **Born–Haber cycle** uses Hess’s law to obtain lattice energies that cannot be measured directly. The enthalpy of solution is the sum of lattice energy and ion hydration enthalpy. Average bond energies differ from specific bond-dissociation enthalpies: removing the first H from CH₄ takes a different energy from the last.

Reference thermochemical data (ΔHf°, S°, C_p) are collected in, for example, the NIST Chemistry WebBook and the appendices of OpenStax *Chemistry 2e*; "Heat of Combustion" values for thousands of compounds also appear in the PubChem experimental data on Kimialoka molecule pages. Computational chemistry (ab initio and DFT methods) can estimate reaction enthalpies not yet measured.`,
    ],
  },
  points: [
    ['Eksoterm: kalor dilepas, ΔH < 0; endoterm: kalor diserap, ΔH > 0.', 'Exothermic: heat released, ΔH < 0; endothermic: heat absorbed, ΔH > 0.'],
    ['Kalor ≠ suhu; q = m·c·ΔT (air: c = 4,18 J g⁻¹ °C⁻¹).', 'Heat ≠ temperature; q = m·c·ΔT (water: c = 4.18 J g⁻¹ °C⁻¹).'],
    ['Hukum Hess: ΔH tidak bergantung pada jalan reaksi.', 'Hess’s law: ΔH does not depend on the route.'],
    ['ΔH° = ΣΔHf°(produk) − ΣΔHf°(pereaksi); ΔHf° unsur standar = 0.', 'ΔH° = ΣΔHf°(products) − ΣΔHf°(reactants); ΔHf° of standard elements = 0.'],
  ],
  molecules: ['methane', 'ammonium-nitrate', 'calcium-oxide', 'hydrogen', 'ethanol'],
  labs: ['wujud'],
  activity: {
    sd: ['Pegang es batu dalam plastik dan rasakan tanganmu. Lalu genggam kemasan penghangat tangan (bila ada). Mana yang menyerap panas dan mana yang melepas panas?', 'Hold an ice cube in a bag and feel your hand. Then hold a hand-warmer pack (if available). Which takes in heat and which gives it out?'],
    smp: ['Campurkan 50 mL air dengan satu sendok soda kue lalu tambahkan cuka; ukur suhunya sebelum dan sesudah. Tentukan apakah reaksinya eksoterm atau endoterm.', 'Mix 50 mL water with a spoon of baking soda, then add vinegar; measure the temperature before and after. Decide whether the reaction is exothermic or endothermic.'],
    sma: ['Tentukan ΔH penetralan HCl dan NaOH dengan kalorimeter gelas plastik, lalu bandingkan dengan nilai buku dan hitung persen galatnya.', 'Measure ΔH of neutralising HCl with NaOH in a plastic-cup calorimeter, compare it with the textbook value and find the percentage error.'],
    kuliah: ['Hitung ΔH° pembakaran propana dari ΔHf° (lampiran OpenStax) lalu dari energi ikatan rata-rata. Jelaskan mengapa kedua hasil berbeda.', 'Compute ΔH° for burning propane from ΔHf° values (OpenStax appendix) and from average bond energies. Explain why the results differ.'],
  },
  quiz: [
    { lv: 'sd', q: ['Es batu yang digenggam membuat tangan terasa dingin karena…', 'An ice cube makes your hand feel cold because…'], options: [['Es memberi dingin ke tangan', 'Ice gives cold to your hand'], ['Es menyerap panas dari tangan', 'Ice takes heat from your hand'], ['Tangan membeku', 'Your hand freezes'], ['Es tidak berubah', 'The ice does not change']], answer: 1, explain: ['Panas mengalir dari tangan yang hangat ke es.', 'Heat flows from your warm hand into the ice.'] },
    { lv: 'sd', q: ['Contoh perubahan yang melepaskan panas adalah…', 'An example of a change that gives out heat is…'], options: [['Es mencair', 'Ice melting'], ['Kayu terbakar', 'Wood burning'], ['Air menguap di jemuran', 'Water drying on a clothes line'], ['Kompres dingin instan', 'An instant cold pack']], answer: 1, explain: ['Pembakaran melepaskan panas dan cahaya.', 'Burning releases heat and light.'] },
    { lv: 'smp', q: ['Pada reaksi endoterm, lingkungan menjadi…', 'In an endothermic reaction the surroundings become…'], options: [['Lebih panas', 'Hotter'], ['Lebih dingin', 'Colder'], ['Tetap', 'Unchanged'], ['Menyala', 'Alight']], answer: 1, explain: ['Sistem menyerap kalor dari lingkungan.', 'The system takes heat from the surroundings.'] },
    { lv: 'smp', q: ['Kalor untuk memanaskan 200 g air dari 20 °C ke 30 °C (c = 4,18 J/g °C) adalah…', 'Heat to warm 200 g of water from 20 °C to 30 °C (c = 4.18 J/g °C) is…'], options: [['836 J', '836 J'], ['8360 J', '8360 J'], ['418 J', '418 J'], ['41 800 J', '41 800 J']], answer: 1, explain: ['q = 200 × 4,18 × 10 = 8360 J.', 'q = 200 × 4.18 × 10 = 8360 J.'] },
    { lv: 'smp', q: ['1 kalori setara dengan…', '1 calorie equals…'], options: [['1 J', '1 J'], ['4,184 J', '4.184 J'], ['1000 J', '1000 J'], ['0,24 J', '0.24 J']], answer: 1, explain: ['1 cal = 4,184 J.', '1 cal = 4.184 J.'] },
    { lv: 'sma', q: ['Jika A → B ΔH = −100 kJ, maka 2B → 2A memiliki ΔH…', 'If A → B has ΔH = −100 kJ, then 2B → 2A has ΔH…'], options: [['−200 kJ', '−200 kJ'], ['+200 kJ', '+200 kJ'], ['+100 kJ', '+100 kJ'], ['−100 kJ', '−100 kJ']], answer: 1, explain: ['Dibalik (tanda berubah) dan dikali 2: +200 kJ.', 'Reversed (sign flips) and doubled: +200 kJ.'] },
    { lv: 'sma', q: ['ΔHf° untuk O₂(g) adalah…', 'ΔHf° of O₂(g) is…'], options: [['0', '0'], ['−285,8 kJ/mol', '−285.8 kJ/mol'], ['+249 kJ/mol', '+249 kJ/mol'], ['Tidak dapat ditentukan', 'Cannot be defined']], answer: 0, explain: ['Unsur dalam wujud standarnya memiliki ΔHf° = 0.', 'An element in its standard state has ΔHf° = 0.'] },
    { lv: 'sma', q: ['Hukum Hess berlaku karena entalpi adalah…', 'Hess’s law holds because enthalpy is…'], options: [['Fungsi keadaan', 'A state function'], ['Selalu negatif', 'Always negative'], ['Sama dengan suhu', 'Equal to temperature'], ['Fungsi jalan', 'A path function']], answer: 0, explain: ['Fungsi keadaan hanya bergantung pada keadaan awal dan akhir.', 'A state function depends only on the initial and final states.'] },
    { lv: 'sma', q: ['Energi ikatan memberi ΔH yang…', 'Bond energies give a ΔH that is…'], options: [['Tepat sama dengan kalorimetri', 'Exactly equal to calorimetry'], ['Perkiraan, karena nilainya rata-rata', 'An estimate, because the values are averages'], ['Selalu positif', 'Always positive'], ['Tidak berguna', 'Useless']], answer: 1, explain: ['Energi ikatan rata-rata dari banyak molekul, jadi hasilnya pendekatan.', 'Average bond energies come from many molecules, so the result is approximate.'] },
    { lv: 'kuliah', q: ['Untuk N₂ + 3H₂ → 2NH₃ (semua gas), hubungan ΔH dan ΔU adalah…', 'For N₂ + 3H₂ → 2NH₃ (all gases), ΔH and ΔU are related by…'], options: [['ΔH = ΔU − 2RT', 'ΔH = ΔU − 2RT'], ['ΔH = ΔU + 2RT', 'ΔH = ΔU + 2RT'], ['ΔH = ΔU', 'ΔH = ΔU'], ['ΔH = ΔU − 4RT', 'ΔH = ΔU − 4RT']], answer: 0, explain: ['Δn_gas = 2 − 4 = −2, jadi ΔH = ΔU − 2RT.', 'Δn_gas = 2 − 4 = −2, so ΔH = ΔU − 2RT.'] },
    { lv: 'kuliah', q: ['Energi kisi NaCl diperoleh secara tidak langsung dengan…', 'The lattice energy of NaCl is found indirectly with…'], options: [['Titrasi', 'A titration'], ['Siklus Born–Haber', 'A Born–Haber cycle'], ['Spektroskopi NMR', 'NMR spectroscopy'], ['Hukum Henry', 'Henry’s law']], answer: 1, explain: ['Siklus Born–Haber menerapkan hukum Hess pada langkah-langkah pembentukan kristal ion.', 'The Born–Haber cycle applies Hess’s law to the steps of forming an ionic crystal.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik membedakan reaksi eksoterm dan endoterm serta menentukan ΔH dengan kalorimetri, hukum Hess, data pembentukan, dan energi ikatan.', 'Phases D–F: learners distinguish exothermic and endothermic reactions and find ΔH by calorimetry, Hess’s law, formation data and bond energies.'],
    goals: [
      ['Mengelompokkan reaksi menjadi eksoterm dan endoterm dari pengamatan.', 'Classify reactions as exothermic or endothermic from observations.'],
      ['Menghitung kalor dengan q = m·c·ΔT.', 'Calculate heat with q = m·c·ΔT.'],
      ['Menentukan ΔH dengan hukum Hess dan ΔHf°.', 'Find ΔH with Hess’s law and ΔHf°.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Pemantik: kompres dingin instan dan penghangat tangan.', 'Hook: an instant cold pack and a hand warmer.'],
      ['Praktikum kalorimeter gelas plastik (penetralan atau pelarutan).', 'Practical: plastic-cup calorimeter (neutralisation or dissolving).'],
      ['Latihan hukum Hess dengan diagram tingkat energi.', 'Hess’s law practice with energy-level diagrams.'],
      ['Diskusi nilai kalor bahan bakar dan emisi CO₂.', 'Discussion of fuel values and CO₂ emissions.'],
    ],
    misconceptions: [
      ['"Kalor dan suhu sama." Suhu adalah ukuran panas benda; kalor adalah energi yang berpindah.', '"Heat and temperature are the same." Temperature measures hotness; heat is energy transferred.'],
      ['"Memutus ikatan melepaskan energi." Memutus ikatan selalu memerlukan energi; energi dilepas saat ikatan terbentuk.', '"Breaking bonds releases energy." Breaking bonds always needs energy; energy is released when bonds form.'],
      ['"Reaksi eksoterm tidak perlu pemicu." Banyak reaksi eksoterm tetap memerlukan energi aktivasi (korek api).', '"Exothermic reactions need no start." Many still need activation energy (a match).'],
    ],
    assessment: ['Laporan praktikum kalorimetri, kuis Kimialoka, dan soal hukum Hess.', 'A calorimetry report, the Kimialoka quiz and Hess’s-law problems.'],
  },
  refs: ['5-1-energy-basics', '5-2-calorimetry', '5-3-enthalpy', '7-5-strengths-of-ionic-and-covalent-bonds'],
};
