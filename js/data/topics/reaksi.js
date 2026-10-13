export default {
  id: 'reaksi',
  icon: 'flame',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Reaksi kimia dan energi', 'Chemical reactions and energy'],
  summary: [
    'Ciri-ciri reaksi, jenis-jenis reaksi, reaksi eksoterm dan endoterm, entalpi, dan hukum Hess.',
    'Signs of reactions, reaction types, exothermic and endothermic reactions, enthalpy and Hess’s law.',
  ],
  body: {
    sd: [
      `Ada perubahan yang hanya mengubah bentuk (es mencair, kertas digunting) dan ada yang menghasilkan zat baru. Perubahan yang menghasilkan zat baru disebut [[reaksi-kimia|reaksi kimia]].

Tanda-tanda reaksi kimia:

- Muncul gas atau gelembung (soda kue + cuka).
- Warna berubah (apel yang dipotong menjadi cokelat).
- Suhu berubah (kayu terbakar terasa panas).
- Terbentuk endapan atau bau baru (makanan basi).

Contoh di sekitar kita: besi berkarat, kayu terbakar, nasi basi, dan tumbuhan membuat makanan lewat [[fotosintesis]].`,
      `Some changes only alter shape (ice melting, paper being cut), while others make new substances. A change that makes new substances is a [[reaksi-kimia|chemical reaction]].

Signs of a chemical reaction:

- Gas or bubbles appear (baking soda + vinegar).
- The colour changes (a cut apple turns brown).
- The temperature changes (burning wood feels hot).
- A solid or a new smell appears (food going off).

Around us: iron rusting, wood burning, rice going stale, and plants making food by [[fotosintesis|photosynthesis]].`,
    ],
    smp: [
      `Reaksi kimia memutus ikatan lama dan membentuk ikatan baru. Jenis reaksi yang umum:

- Pembentukan (sintesis): A + B → AB, misalnya 2H₂ + O₂ → 2H₂O.
- Penguraian: AB → A + B, misalnya 2H₂O₂ → 2H₂O + O₂.
- Pergantian (tunggal/ganda): Zn + CuSO₄ → ZnSO₄ + Cu.
- [[reaksi-pembakaran|Pembakaran]]: CH₄ + 2O₂ → CO₂ + 2H₂O.

Energi selalu ikut berubah. [[eksoterm|Reaksi eksoterm]] melepaskan panas ke lingkungan (pembakaran {{m:methane|metana}} di kompor, respirasi). [[endoterm|Reaksi endoterm]] menyerap panas (kompres dingin berisi {{m:ammonium-nitrate|amonium nitrat}}, fotosintesis). Kecepatan reaksi dipercepat oleh suhu tinggi, konsentrasi tinggi, bentuk serbuk, dan [[katalis]].`,
      `Chemical reactions break old bonds and form new ones. Common types:

- Synthesis: A + B → AB, e.g. 2H₂ + O₂ → 2H₂O.
- Decomposition: AB → A + B, e.g. 2H₂O₂ → 2H₂O + O₂.
- Displacement (single/double): Zn + CuSO₄ → ZnSO₄ + Cu.
- [[reaksi-pembakaran|Combustion]]: CH₄ + 2O₂ → CO₂ + 2H₂O.

Energy always changes too. [[eksoterm|Exothermic reactions]] release heat (burning {{m:methane|methane}} on a stove, respiration). [[endoterm|Endothermic reactions]] absorb heat (cold packs with {{m:ammonium-nitrate|ammonium nitrate}}, photosynthesis). Reactions speed up with higher temperature, higher concentration, powders and [[katalis|catalysts]].`,
    ],
    sma: [
      `[[entalpi|Perubahan entalpi]] (ΔH) adalah kalor reaksi pada tekanan tetap: ΔH < 0 eksoterm, ΔH > 0 endoterm. Persamaan termokimia mencantumkan ΔH, misalnya:

CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) ΔH = −890 kJ

ΔH dapat ditentukan dengan tiga cara:

1. **Kalorimetri**: q = m·c·ΔT (c air = 4,18 J g⁻¹ °C⁻¹).
2. **Hukum Hess**: ΔH reaksi tidak bergantung jalur; jumlahkan persamaan yang diketahui.
3. **Entalpi pembentukan standar**: ΔH° = ΣΔHf°(produk) − ΣΔHf°(reaktan).
4. **Energi ikatan**: ΔH ≈ Σ energi ikatan diputus − Σ energi ikatan dibentuk.

Pembakaran menjadi sumber energi utama dunia, tetapi menghasilkan {{m:carbon-dioxide|CO₂}}. Nilai kalor bahan bakar (kJ/g) membantu membandingkan: {{m:hydrogen|hidrogen}} ≈ 142, {{m:methane|metana}} ≈ 55, {{m:ethanol|etanol}} ≈ 30.

Termokimia diuraikan di {{learn:termokimia|Termokimia}}; contoh setara setiap jenis reaksi ada di {{page:reaction|pustaka reaksi}}.`,
      `The [[entalpi|enthalpy change]] (ΔH) is the heat of reaction at constant pressure: ΔH < 0 exothermic, ΔH > 0 endothermic. Thermochemical equations include ΔH, for example:

CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) ΔH = −890 kJ

ΔH can be found four ways:

1. **Calorimetry**: q = m·c·ΔT (c of water = 4.18 J g⁻¹ °C⁻¹).
2. **Hess’s law**: ΔH is path-independent; add known equations.
3. **Standard enthalpies of formation**: ΔH° = ΣΔHf°(products) − ΣΔHf°(reactants).
4. **Bond energies**: ΔH ≈ Σ bonds broken − Σ bonds formed.

Combustion is the world’s main energy source but produces {{m:carbon-dioxide|CO₂}}. Fuel values (kJ/g) help compare: {{m:hydrogen|hydrogen}} ≈ 142, {{m:methane|methane}} ≈ 55, {{m:ethanol|ethanol}} ≈ 30.

Thermochemistry is developed in {{learn:termokimia|Thermochemistry}}; balanced examples of every reaction type are in the {{page:reaction|reaction library}}.`,
    ],
    kuliah: [
      `Kespontanan reaksi ditentukan energi bebas Gibbs: ΔG = ΔH − TΔS. Reaksi spontan bila ΔG < 0. Reaksi endoterm dapat spontan bila entropi naik cukup besar (pelarutan NH₄NO₃, penguapan air), dan reaksi eksoterm dapat tidak spontan pada suhu tinggi bila entropinya turun.

ΔG° berhubungan dengan tetapan kesetimbangan: ΔG° = −RT ln K, dan dengan potensial sel: ΔG° = −nFE°. Dengan demikian termokimia, kesetimbangan, dan elektrokimia adalah satu kerangka.

Kapasitas kalor dan hukum Kirchhoff (dΔH/dT = ΔCp) memungkinkan ΔH dihitung pada suhu lain. Di tingkat molekuler, entalpi reaksi dapat diperkirakan dengan kimia komputasi (DFT), sedangkan data eksperimen seperti "Heat of Combustion" untuk ribuan senyawa tersedia di PubChem dan NIST.`,
      `Spontaneity is set by Gibbs free energy: ΔG = ΔH − TΔS; a reaction is spontaneous when ΔG < 0. Endothermic reactions can be spontaneous if entropy rises enough (dissolving NH₄NO₃, evaporating water), and exothermic ones can become non-spontaneous at high temperature if entropy falls.

ΔG° links to the equilibrium constant, ΔG° = −RT ln K, and to cell potential, ΔG° = −nFE°, so thermochemistry, equilibrium and electrochemistry form one framework.

Heat capacities and Kirchhoff’s law (dΔH/dT = ΔCp) give ΔH at other temperatures. At the molecular level reaction enthalpies can be estimated computationally (DFT), while experimental data such as "Heat of Combustion" for thousands of compounds are available in PubChem and NIST.`,
    ],
  },
  points: [
    ['Reaksi kimia menghasilkan zat baru dengan memutus dan membentuk ikatan.', 'Reactions make new substances by breaking and forming bonds.'],
    ['Eksoterm melepas kalor (ΔH < 0); endoterm menyerap kalor (ΔH > 0).', 'Exothermic releases heat (ΔH < 0); endothermic absorbs it (ΔH > 0).'],
    ['Hukum Hess: ΔH tidak bergantung pada jalur reaksi.', 'Hess’s law: ΔH does not depend on the path.'],
  ],
  molecules: ['methane', 'hydrogen-peroxide', 'ammonium-nitrate', 'glucose', 'iron-oxide', 'ethanol'],
  labs: ['setara', 'laju'],
  activity: {
    sd: ['Masukkan satu sendok soda kue ke dalam cuka di botol, lalu pasang balon di mulut botol. Apa yang terjadi pada balon?', 'Put a spoon of baking soda into vinegar in a bottle and cover it with a balloon. What happens to the balloon?'],
    smp: ['Celupkan paku besi ke larutan terusi (CuSO₄). Amati lapisan tembaga yang terbentuk dan tuliskan persamaan reaksinya.', 'Dip an iron nail in copper sulfate solution. Observe the copper coating and write the equation.'],
    sma: ['Tentukan ΔH penetralan HCl + NaOH dengan kalorimeter gelas styrofoam.', 'Find ΔH of neutralisation for HCl + NaOH with a foam-cup calorimeter.'],
    kuliah: ['Hitung ΔG° pembakaran glukosa pada 25 °C dari data ΔHf° dan S° lalu tafsirkan efisiensi respirasi seluler.', 'Compute ΔG° for glucose combustion at 25 °C from ΔHf° and S° data and interpret the efficiency of cellular respiration.'],
  },
  quiz: [
    { lv: 'kuliah', q: ["Reaksi dengan ΔG° sangat negatif memiliki tetapan kesetimbangan…", "A reaction with a very negative ΔG° has an equilibrium constant…"], options: [["K ≫ 1", "K ≫ 1"], ["K ≪ 1", "K ≪ 1"], ["K = 1", "K = 1"], ["K negatif", "Negative K"]], answer: 0, explain: ["ΔG° = −RT ln K; ΔG° negatif besar berarti ln K besar positif.", "ΔG° = −RT ln K; a large negative ΔG° means a large positive ln K."] },
    { lv: 'sd', q: ['Manakah yang merupakan reaksi kimia?', 'Which is a chemical reaction?'], options: [['Es mencair', 'Ice melting'], ['Kertas digunting', 'Cutting paper'], ['Kayu terbakar', 'Wood burning'], ['Garam larut dalam air', 'Salt dissolving']], answer: 2, explain: ['Pembakaran menghasilkan zat baru (abu, CO₂, uap air).', 'Burning makes new substances (ash, CO₂, water vapour).'] },
    { lv: 'sd', q: ['Gelembung yang muncul saat soda kue dicampur cuka adalah gas…', 'The bubbles when baking soda meets vinegar are…'], options: [['Oksigen', 'Oxygen'], ['Karbon dioksida', 'Carbon dioxide'], ['Hidrogen', 'Hydrogen'], ['Nitrogen', 'Nitrogen']], answer: 1, explain: ['Reaksi asam dengan karbonat menghasilkan gas CO₂.', 'An acid reacting with a carbonate releases CO₂.'] },
    { lv: 'smp', q: ['Reaksi yang melepaskan panas ke lingkungan disebut…', 'A reaction that releases heat is…'], options: [['Endoterm', 'Endothermic'], ['Eksoterm', 'Exothermic'], ['Netral', 'Neutral'], ['Penguraian', 'Decomposition']], answer: 1, explain: ['Eksoterm: kalor keluar dari sistem sehingga lingkungan menjadi panas.', 'Exothermic: heat leaves the system and warms the surroundings.'] },
    { lv: 'smp', q: ['Zn + CuSO₄ → ZnSO₄ + Cu termasuk reaksi…', 'Zn + CuSO₄ → ZnSO₄ + Cu is a…'], options: [['Pembakaran', 'Combustion'], ['Pergantian tunggal', 'Single displacement'], ['Penguraian', 'Decomposition'], ['Penetralan', 'Neutralisation']], answer: 1, explain: ['Seng menggantikan tembaga dalam senyawanya.', 'Zinc takes copper’s place in the compound.'] },
    { lv: 'sma', q: ['Jika ΔH = −890 kJ, reaksinya…', 'If ΔH = −890 kJ, the reaction is…'], options: [['Menyerap kalor', 'Absorbing heat'], ['Melepaskan kalor', 'Releasing heat'], ['Tidak ada perubahan energi', 'Energy-neutral'], ['Tidak mungkin terjadi', 'Impossible']], answer: 1, explain: ['ΔH negatif berarti eksoterm.', 'Negative ΔH means exothermic.'] },
    { lv: 'sma', q: ['100 g air dipanaskan dari 25 °C ke 35 °C (c = 4,18 J/g°C). Kalor yang diserap…', '100 g of water is heated from 25 °C to 35 °C (c = 4.18 J/g°C). Heat absorbed is…'], options: [['418 J', '418 J'], ['4180 J', '4180 J'], ['41,8 J', '41.8 J'], ['14 630 J', '14 630 J']], answer: 1, explain: ['q = m·c·ΔT = 100 × 4,18 × 10 = 4180 J.', 'q = m·c·ΔT = 100 × 4.18 × 10 = 4180 J.'] },
    { lv: 'sma', q: ['Hukum Hess menyatakan bahwa…', 'Hess’s law states that…'], options: [['Massa kekal', 'Mass is conserved'], ['ΔH tidak bergantung jalur reaksi', 'ΔH is independent of the path'], ['Energi aktivasi selalu positif', 'Activation energy is always positive'], ['Reaksi eksoterm selalu cepat', 'Exothermic reactions are always fast']], answer: 1, explain: ['ΔH adalah fungsi keadaan, hanya bergantung keadaan awal dan akhir.', 'ΔH is a state function depending only on initial and final states.'] },
    { lv: 'kuliah', q: ['Reaksi endoterm dapat berlangsung spontan bila…', 'An endothermic reaction can be spontaneous when…'], options: [['ΔS > 0 dan suhu cukup tinggi', 'ΔS > 0 and the temperature is high enough'], ['ΔS < 0', 'ΔS < 0'], ['Selalu', 'Always'], ['Tidak pernah', 'Never']], answer: 0, explain: ['ΔG = ΔH − TΔS menjadi negatif bila TΔS > ΔH.', 'ΔG = ΔH − TΔS turns negative when TΔS > ΔH.'] },
  ],
  teacher: {
    cp: ['Fase C–F: peserta didik mengenali reaksi kimia, jenisnya, serta perubahan energinya.', 'Phases C–F: learners recognise reactions, their types and energy changes.'],
    goals: [
      ['Membedakan perubahan fisika dan kimia berdasarkan bukti.', 'Tell physical from chemical changes using evidence.'],
      ['Mengklasifikasikan reaksi dan menentukan ΔH.', 'Classify reactions and determine ΔH.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pos-pos pengamatan reaksi sehari-hari (soda kue, paku di terusi, lilin).', 'Stations with everyday reactions (baking soda, nail in copper sulfate, candle).'],
      ['Diagram tingkat energi eksoterm/endoterm.', 'Energy-level diagrams for exo/endothermic reactions.'],
      ['Praktikum kalorimeter sederhana.', 'Simple calorimetry practical.'],
    ],
    misconceptions: [['"Pembakaran menghancurkan materi." Materi berubah menjadi gas dan abu; massa kekal.', '"Burning destroys matter." It becomes gases and ash; mass is conserved.']],
    assessment: ['Kuis Kimialoka dan laporan kalorimetri.', 'Kimialoka quiz and a calorimetry report.'],
  },
  refs: ["4-2-classifying-chemical-reactions", "5-3-enthalpy", "16-4-free-energy"],
};
