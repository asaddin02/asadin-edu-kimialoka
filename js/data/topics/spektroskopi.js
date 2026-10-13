export default {
  id: 'spektroskopi',
  icon: 'eye',
  levels: ['sma', 'kuliah'],
  title: ['Spektroskopi: membaca zat dari cahaya', 'Spectroscopy: reading matter with light'],
  summary: [
    'Spektrum elektromagnetik, spektrum emisi atom, UV-Vis dan hukum Beer–Lambert, inframerah, NMR, spektrometri massa, Raman, dan cara membaca spektrum.',
    'The electromagnetic spectrum, atomic emission, UV-Vis and the Beer–Lambert law, infrared, NMR, mass spectrometry, Raman and how to read spectra.',
  ],
  body: {
    sd: [
      `Cahaya putih Matahari sebenarnya campuran banyak warna. Bila melewati prisma atau tetes air hujan, cahaya itu terurai menjadi pelangi: merah, jingga, kuning, hijau, biru, nila, ungu.

Benda tampak berwarna karena menyerap sebagian warna dan memantulkan sisanya. Daun hijau menyerap cahaya merah dan biru untuk fotosintesis, lalu memantulkan cahaya hijau ke mata kita.

Ada juga "cahaya" yang tidak terlihat mata: sinar ultraviolet (UV) dari Matahari yang dapat membuat kulit terbakar, sinar inframerah yang terasa sebagai panas, dan sinar-X untuk foto rontgen. Ilmuwan memakai berbagai jenis cahaya ini untuk "membaca" zat, misalnya mengetahui isi bintang yang sangat jauh dari cahaya yang dipancarkannya.`,
      `White sunlight is really a mix of many colours. Passing through a prism or raindrops, it splits into a rainbow: red, orange, yellow, green, blue, indigo, violet.

Objects look coloured because they absorb some colours and reflect the rest. Green leaves absorb red and blue light for photosynthesis and reflect green light to our eyes.

There is also "light" our eyes cannot see: ultraviolet (UV) from the Sun, which can burn skin; infrared, which we feel as heat; and X-rays for medical images. Scientists use all of these to "read" substances, even working out what faraway stars are made of from the light they give off.`,
    ],
    smp: [
      `[[spektrum-elektromagnetik|Spektrum elektromagnetik]] disusun menurut panjang gelombang: gelombang radio, gelombang mikro, inframerah, cahaya tampak (sekitar 400–700 nm), ultraviolet, sinar-X, dan sinar gamma. Makin pendek panjang gelombang, makin besar energinya; karena itu UV dan sinar-X dapat merusak sel, sedangkan gelombang radio aman.

Warna zat berasal dari cahaya yang diserapnya. Larutan tembaga(II) sulfat menyerap cahaya jingga-merah sehingga tampak biru; {{m:beta-carotene|beta-karoten}} pada wortel menyerap biru sehingga tampak jingga.

Atom yang dipanaskan memancarkan warna khas (spektrum emisi): natrium kuning, tembaga hijau-biru, stronsium merah. Inilah dasar {{lab:nyala|uji nyala}} dan warna kembang api. Tabir surya bekerja dengan menyerap sinar UV sebelum mencapai kulit.

[[spektroskopi|Spektroskopi]] adalah ilmu yang memakai interaksi cahaya dan materi untuk mengenali dan mengukur zat.`,
      `The [[spektrum-elektromagnetik|electromagnetic spectrum]] is ordered by wavelength: radio waves, microwaves, infrared, visible light (about 400–700 nm), ultraviolet, X-rays and gamma rays. The shorter the wavelength, the higher the energy; that is why UV and X-rays can damage cells while radio waves are harmless.

A substance’s colour comes from the light it absorbs. Copper(II) sulfate solution absorbs orange-red light, so it looks blue; {{m:beta-carotene|beta-carotene}} in carrots absorbs blue, so it looks orange.

Heated atoms give off characteristic colours (emission spectra): sodium yellow, copper blue-green, strontium red. This is the basis of the {{lab:nyala|flame test}} and firework colours. Sunscreen works by absorbing UV before it reaches the skin.

[[spektroskopi|Spectroscopy]] is the science of using the interaction of light and matter to identify and measure substances.`,
    ],
    sma: [
      `Energi foton: **E = hν = hc/λ**. Tiap daerah spektrum menyelidiki hal berbeda:

- **Emisi atom**: elektron yang turun tingkat energinya memancarkan garis-garis tajam (model Bohr). Setiap unsur punya "sidik jari" garis sendiri.
- **[[uv-vis|UV-Vis]] (200–800 nm)**: elektron molekul tereksitasi. Kadar zat berwarna diukur dengan [[hukum-beer-lambert|hukum Beer–Lambert]], A = ε·b·c.
- **[[spektroskopi-ir|Inframerah]] (bilangan gelombang 4000–400 cm⁻¹)**: ikatan bergetar. Pita khas: O–H alkohol lebar sekitar 3300 cm⁻¹, O–H asam karboksilat sangat lebar 2500–3300 cm⁻¹, N–H 3300–3500, C–H sekitar 2850–3100, C≡N sekitar 2250, C=O tajam sekitar 1700 cm⁻¹.
- **[[nmr|NMR]]**: inti ¹H atau ¹³C dalam medan magnet kuat menyerap gelombang radio. Jumlah sinyal menunjukkan jumlah lingkungan hidrogen yang berbeda; posisinya (geseran kimia, ppm) menunjukkan lingkungannya, dengan tetrametilsilana (TMS) sebagai acuan 0 ppm.
- **[[spektrometri-massa|Spektrometri massa]]**: molekul diionkan dan dipisahkan menurut m/z. Puncak ion molekul (M⁺) memberi massa molekul; pola fragmen memberi petunjuk struktur.

Contoh membaca: senyawa C₂H₆O dengan pita IR lebar sekitar 3300 cm⁻¹ adalah {{m:ethanol|etanol}}, bukan {{m:dimethyl-ether|dimetil eter}}; ¹H NMR etanol menunjukkan tiga jenis hidrogen, sedangkan dimetil eter hanya satu.`,
      `Photon energy: **E = hν = hc/λ**. Each spectral region probes something different:

- **Atomic emission**: electrons dropping in energy emit sharp lines (the Bohr model). Every element has its own line "fingerprint".
- **[[uv-vis|UV-Vis]] (200–800 nm)**: molecular electrons are excited. The concentration of coloured substances is measured with the [[hukum-beer-lambert|Beer–Lambert law]], A = ε·b·c.
- **[[spektroskopi-ir|Infrared]] (wavenumbers 4000–400 cm⁻¹)**: bonds vibrate. Typical bands: broad alcohol O–H near 3300 cm⁻¹, very broad carboxylic-acid O–H 2500–3300 cm⁻¹, N–H 3300–3500, C–H about 2850–3100, C≡N near 2250, sharp C=O near 1700 cm⁻¹.
- **[[nmr|NMR]]**: ¹H or ¹³C nuclei in a strong magnetic field absorb radio waves. The number of signals shows the number of distinct hydrogen environments; their position (chemical shift, ppm) shows the environment, with tetramethylsilane (TMS) as the 0 ppm reference.
- **[[spektrometri-massa|Mass spectrometry]]**: molecules are ionised and sorted by m/z. The molecular-ion peak (M⁺) gives the molecular mass; the fragment pattern gives structural clues.

Reading example: a C₂H₆O compound with a broad IR band near 3300 cm⁻¹ is {{m:ethanol|ethanol}}, not {{m:dimethyl-ether|dimethyl ether}}; the ¹H NMR of ethanol shows three kinds of hydrogen, dimethyl ether only one.`,
    ],
    kuliah: [
      `**UV-Vis**: transisi π → π* dan n → π*; konjugasi menurunkan selisih energi HOMO–LUMO sehingga λmaks bergeser ke panjang gelombang lebih besar. Karena itu polien panjang seperti {{m:beta-carotene|β-karoten}} dan {{m:lycopene|likopen}} berwarna, sedangkan etena menyerap di UV jauh. Pada kompleks logam transisi, warna berasal dari transisi d–d dan transfer muatan.

**Inframerah**: getaran dimodelkan sebagai osilator harmonik, ν̃ = (1/2πc)√(k/μ); ikatan lebih kuat (k besar) dan atom lebih ringan (μ kecil) bergetar pada bilangan gelombang lebih tinggi, sehingga C≡C > C=C > C–C dan O–H jauh di atas O–D. Getaran aktif IR bila momen dipolnya berubah; **Raman** aktif bila polarisabilitas berubah, sehingga keduanya saling melengkapi (misalnya getaran simetris CO₂ hanya aktif Raman).

**NMR**: geseran kimia ¹H tipikal — alkil 0,9–1,5 ppm; H di sebelah C=O sekitar 2–2,5; H pada C–O 3,3–4,5; aromatik 6,5–8; aldehida 9–10; asam karboksilat 10–12 ppm. Integrasi sinyal sebanding dengan jumlah H; kopling spin–spin memecah sinyal menjadi n + 1 puncak untuk n hidrogen tetangga setara. ¹³C NMR mencakup 0–220 ppm dengan karbonil pada 160–220 ppm.

**Spektrometri massa**: pola isotop membantu identifikasi — senyawa berklorin menunjukkan puncak M dan M+2 dengan rasio sekitar 3:1, berbromin sekitar 1:1; resolusi tinggi memberi rumus molekul dari massa eksak (bandingkan dengan "Exact Mass" PubChem di halaman molekul).

Dalam [[interpretasi-spektrum|interpretasi spektrum]], penentuan struktur modern menggabungkan MS (rumus), IR (gugus fungsi), ¹H/¹³C NMR dan NMR 2D (kerangka dan konektivitas), serta kristalografi sinar-X untuk struktur tiga dimensi. Data spektrum rujukan tersedia di bagian "Spectral Information" rekaman PubChem, yang ditautkan dari setiap halaman molekul Kimialoka.`,
      `**UV-Vis**: π → π* and n → π* transitions; conjugation narrows the HOMO–LUMO gap, shifting λmax to longer wavelengths. That is why long polyenes such as {{m:beta-carotene|β-carotene}} and {{m:lycopene|lycopene}} are coloured while ethene absorbs in the far UV. In transition-metal complexes colour comes from d–d and charge-transfer transitions.

**Infrared**: vibrations are modelled as harmonic oscillators, ν̃ = (1/2πc)√(k/μ); stronger bonds (large k) and lighter atoms (small μ) vibrate at higher wavenumbers, so C≡C > C=C > C–C and O–H lies far above O–D. A vibration is IR-active if its dipole moment changes; **Raman**-active if its polarisability changes, so the two complement each other (the symmetric stretch of CO₂ is Raman-active only).

**NMR**: typical ¹H chemical shifts — alkyl 0.9–1.5 ppm; H next to C=O about 2–2.5; H on C–O 3.3–4.5; aromatic 6.5–8; aldehyde 9–10; carboxylic acid 10–12 ppm. Signal integrals are proportional to the number of H; spin–spin coupling splits a signal into n + 1 peaks for n equivalent neighbouring hydrogens. ¹³C NMR spans 0–220 ppm, with carbonyls at 160–220 ppm.

**Mass spectrometry**: isotope patterns help identification — chlorine compounds show M and M+2 peaks in about a 3:1 ratio, bromine compounds about 1:1; high resolution gives the molecular formula from the exact mass (compare PubChem’s "Exact Mass" on the molecule page).

In [[interpretasi-spektrum|spectral interpretation]], modern structure determination combines MS (formula), IR (functional groups), ¹H/¹³C and 2D NMR (skeleton and connectivity), and X-ray crystallography for 3D structures. Reference spectra are available in the "Spectral Information" section of PubChem records, linked from every Kimialoka molecule page.`,
    ],
  },
  points: [
    ['Panjang gelombang makin pendek, energi foton makin besar (E = hc/λ).', 'Shorter wavelength means higher photon energy (E = hc/λ).'],
    ['Warna zat = cahaya yang tidak diserapnya (warna komplementer dari yang diserap).', 'A substance’s colour is the light it does not absorb (the complement of what it absorbs).'],
    ['IR mengenali gugus fungsi: O–H lebar ~3300, C=O tajam ~1700 cm⁻¹.', 'IR identifies functional groups: broad O–H ~3300, sharp C=O ~1700 cm⁻¹.'],
    ['NMR menunjukkan lingkungan dan jumlah atom H (geseran kimia, integrasi, pemecahan).', 'NMR shows hydrogen environments and numbers (chemical shift, integration, splitting).'],
    ['MS memberi massa molekul (M⁺) dan pola fragmen.', 'MS gives the molecular mass (M⁺) and fragment pattern.'],
  ],
  molecules: ['beta-carotene', 'lycopene', 'ethanol', 'dimethyl-ether', 'acetone', 'copper-sulfate'],
  labs: ['nyala'],
  activity: {
    sd: ['Buat pelangi dengan gelas berisi air di bawah sinar Matahari atau dengan CD bekas. Gambar urutan warnanya.', 'Make a rainbow with a glass of water in sunlight or an old CD. Draw the order of colours.'],
    smp: ['Amati larutan berwarna (teh, sirup, terusi) di depan layar ponsel yang menampilkan warna merah, hijau, dan biru. Warna mana yang diserap tiap larutan?', 'Hold coloured solutions (tea, syrup, blue vitriol) in front of a phone screen showing red, green and blue. Which colour does each absorb?'],
    sma: ['Diberikan data IR dan ¹H NMR untuk tiga isomer C₃H₆O (dari buku atau basis data), tentukan mana propanal, propanon, dan prop-2-en-1-ol. Cek strukturnya di Kimialoka.', 'Given IR and ¹H NMR data for three C₃H₆O isomers (from a book or database), decide which is propanal, propanone and prop-2-en-1-ol. Check the structures in Kimialoka.'],
    kuliah: ['Ramalkan jumlah sinyal, geseran kimia, integrasi, dan pola pemecahan ¹H NMR etil asetat, lalu bandingkan dengan spektrum rujukan yang ditautkan PubChem.', 'Predict the number of ¹H NMR signals, shifts, integrals and splitting for ethyl acetate, then compare with the reference spectrum linked from PubChem.'],
  },
  quiz: [
    { lv: 'sd', q: ["Pelangi terbentuk karena cahaya Matahari…", "A rainbow forms because sunlight…"], options: [["Terurai menjadi banyak warna", "Splits into many colours"], ["Berubah menjadi hujan", "Turns into rain"], ["Hilang", "Disappears"], ["Menjadi panas", "Becomes heat"]], answer: 0, explain: ["Cahaya putih adalah campuran warna yang terurai oleh tetes air.", "White light is a mix of colours that raindrops split apart."] },
    { lv: 'sd', q: ['Daun tampak hijau karena…', 'Leaves look green because they…'], options: [['Menyerap cahaya hijau', 'Absorb green light'], ['Memantulkan cahaya hijau', 'Reflect green light'], ['Memancarkan cahaya sendiri', 'Give off their own light'], ['Tidak menyerap cahaya', 'Absorb no light']], answer: 1, explain: ['Klorofil menyerap merah dan biru, hijau dipantulkan.', 'Chlorophyll absorbs red and blue; green is reflected.'] },
    { lv: 'smp', q: ['Radiasi dengan energi paling besar adalah…', 'The radiation with the most energy is…'], options: [['Gelombang radio', 'Radio waves'], ['Inframerah', 'Infrared'], ['Cahaya tampak', 'Visible light'], ['Sinar gamma', 'Gamma rays']], answer: 3, explain: ['Panjang gelombang terpendek, energi terbesar.', 'Shortest wavelength, highest energy.'] },
    { lv: 'smp', q: ['Warna nyala natrium adalah…', 'The flame colour of sodium is…'], options: [['Kuning', 'Yellow'], ['Merah tua', 'Crimson'], ['Hijau', 'Green'], ['Ungu', 'Lilac']], answer: 0, explain: ['Natrium memancarkan garis kuning-oranye yang kuat.', 'Sodium emits strong yellow-orange lines.'] },
    { lv: 'sma', q: ['Pita IR tajam sekitar 1700 cm⁻¹ menunjukkan gugus…', 'A sharp IR band near 1700 cm⁻¹ indicates…'], options: [['O–H', 'O–H'], ['C=O', 'C=O'], ['C–H', 'C–H'], ['N–H', 'N–H']], answer: 1, explain: ['Regangan karbonil C=O muncul sekitar 1650–1750 cm⁻¹.', 'The C=O stretch appears around 1650–1750 cm⁻¹.'] },
    { lv: 'sma', q: ['Acuan geseran kimia 0 ppm pada NMR adalah…', 'The 0 ppm reference in NMR is…'], options: [['Air', 'Water'], ['Tetrametilsilana (TMS)', 'Tetramethylsilane (TMS)'], ['Benzena', 'Benzene'], ['Kloroform', 'Chloroform']], answer: 1, explain: ['TMS memberi satu sinyal tajam yang dipakai sebagai 0 ppm.', 'TMS gives one sharp signal used as 0 ppm.'] },
    { lv: 'sma', q: ['Puncak ion molekul (M⁺) pada spektrum massa memberi…', 'The molecular-ion peak (M⁺) in a mass spectrum gives…'], options: [['Titik didih', 'The boiling point'], ['Massa molekul', 'The molecular mass'], ['Warna', 'The colour'], ['Kelarutan', 'The solubility']], answer: 1, explain: ['m/z ion molekul sama dengan massa molekul (untuk muatan +1).', 'The molecular ion’s m/z equals the molecular mass (for charge +1).'] },
    { lv: 'sma', q: ['Jumlah sinyal ¹H NMR dimetil eter (CH₃OCH₃) adalah…', 'How many ¹H NMR signals does dimethyl ether (CH₃OCH₃) give?'], options: [['1', '1'], ['2', '2'], ['3', '3'], ['6', '6']], answer: 0, explain: ['Keenam H setara karena molekulnya simetris.', 'All six H are equivalent because the molecule is symmetric.'] },
    { lv: 'kuliah', q: ['Konjugasi yang lebih panjang pada polien menggeser λmaks ke…', 'Longer conjugation in polyenes shifts λmax to…'], options: [['Panjang gelombang lebih pendek', 'Shorter wavelengths'], ['Panjang gelombang lebih panjang', 'Longer wavelengths'], ['Tidak bergeser', 'No shift'], ['Daerah sinar-X', 'The X-ray region']], answer: 1, explain: ['Celah HOMO–LUMO mengecil sehingga cahaya berenergi lebih rendah diserap.', 'The HOMO–LUMO gap narrows, so lower-energy light is absorbed.'] },
    { lv: 'kuliah', q: ['Sinyal CH₃ pada CH₃CH₂– terpecah menjadi…', 'The CH₃ signal of CH₃CH₂– is split into a…'], options: [['Singlet', 'Singlet'], ['Doublet', 'Doublet'], ['Triplet', 'Triplet'], ['Kuartet', 'Quartet']], answer: 2, explain: ['Dua H tetangga: n + 1 = 3 puncak.', 'Two neighbouring H: n + 1 = 3 peaks.'] },
    { lv: 'kuliah', q: ['Puncak M dan M+2 dengan rasio sekitar 1:1 menunjukkan adanya…', 'M and M+2 peaks in about a 1:1 ratio suggest…'], options: [['Klorin', 'Chlorine'], ['Bromin', 'Bromine'], ['Nitrogen', 'Nitrogen'], ['Oksigen', 'Oxygen']], answer: 1, explain: ['⁷⁹Br dan ⁸¹Br hampir sama banyak; klorin memberi sekitar 3:1.', '⁷⁹Br and ⁸¹Br are nearly equally abundant; chlorine gives about 3:1.'] },
    { lv: 'kuliah', q: ['Getaran regang simetris CO₂ bersifat…', 'The symmetric stretch of CO₂ is…'], options: [['Aktif IR saja', 'IR-active only'], ['Aktif Raman saja', 'Raman-active only'], ['Aktif keduanya', 'Active in both'], ['Tidak aktif keduanya', 'Active in neither']], answer: 1, explain: ['Momen dipolnya tidak berubah (tidak aktif IR) tetapi polarisabilitasnya berubah (aktif Raman).', 'Its dipole does not change (IR-inactive) but its polarisability does (Raman-active).'] },
  ],
  teacher: {
    cp: ['Fase E–F dan kuliah: peserta didik menjelaskan interaksi cahaya dan materi serta memakai data UV-Vis, IR, NMR, dan MS untuk mengenali senyawa.', 'Phases E–F and university: learners explain how light interacts with matter and use UV-Vis, IR, NMR and MS data to identify compounds.'],
    goals: [
      ['Menghubungkan panjang gelombang, frekuensi, dan energi foton.', 'Relate wavelength, frequency and photon energy.'],
      ['Mengenali gugus fungsi dari pita IR khas.', 'Identify functional groups from typical IR bands.'],
      ['Menafsirkan spektrum NMR dan MS sederhana.', 'Interpret simple NMR and mass spectra.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Pemantik: pelangi, kembang api, dan tabir surya.', 'Hook: rainbows, fireworks and sunscreen.'],
      ['Lab virtual uji nyala dan kaitannya dengan spektrum emisi.', 'Virtual flame-test lab and emission spectra.'],
      ['Stasiun spektrum: IR, NMR, dan MS untuk isomer yang sama.', 'Spectrum stations: IR, NMR and MS for isomers.'],
      ['Tantangan menebak struktur dari tiga spektrum.', 'Challenge: deduce a structure from three spectra.'],
    ],
    misconceptions: [
      ['"Benda merah menyerap cahaya merah." Benda merah memantulkan merah dan menyerap warna lain.', '"Red objects absorb red light." They reflect red and absorb the other colours.'],
      ['"Semua radiasi berbahaya." Bahayanya bergantung pada energi; gelombang radio dan cahaya tampak tidak mengionkan.', '"All radiation is dangerous." It depends on energy; radio waves and visible light are non-ionising.'],
      ['"NMR memakai radiasi pengion." NMR memakai gelombang radio dan medan magnet, bukan radiasi pengion.', '"NMR uses ionising radiation." NMR uses radio waves and a magnetic field.'],
    ],
    assessment: ['Kuis Kimialoka dan tugas penentuan struktur dari data spektrum.', 'The Kimialoka quiz and a structure-from-spectra task.'],
  },
  refs: ['6-1-electromagnetic-energy', '6-2-the-bohr-model', 'oc:12-2-interpreting-mass-spectra', 'oc:12-5-spectroscopy-and-the-electromagnetic-spectrum', 'oc:12-7-interpreting-infrared-spectra', 'oc:13-3-chemical-shifts', 'oc:13-6-spin-spin-splitting-in-1h-nmr-spectra', 'oc:14-7-ultraviolet-spectroscopy'],
};
