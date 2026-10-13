export default {
  id: 'analitik',
  icon: 'beaker',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Kimia analitik: mengenali & mengukur zat', 'Analytical chemistry: identifying & measuring'],
  summary: [
    'Analisis kualitatif dan kuantitatif: uji warna dan endapan, kromatografi, gravimetri, titrasi, spektrofotometri, instrumen modern, akurasi, dan presisi.',
    'Qualitative and quantitative analysis: colour and precipitate tests, chromatography, gravimetry, titration, spectrophotometry, modern instruments, accuracy and precision.',
  ],
  body: {
    sd: [
      `Ahli kimia bisa menjadi detektif: mereka mencari tahu zat apa saja yang ada di dalam sesuatu, dan berapa banyak.

- **Indikator alami**: air rebusan kol ungu berubah merah muda bila diberi cuka dan hijau bila diberi sabun. Kita jadi tahu mana yang asam dan mana yang basa. Coba di {{lab:ph|lab pH}}.
- **Kromatografi kertas**: tinta spidol hitam diteteskan di kertas saring lalu ujung kertas dicelupkan ke air. Tinta terpisah menjadi beberapa warna karena tiap zat warna bergerak dengan kecepatan berbeda.
- **Uji nyala**: garam logam yang dibakar memberi warna nyala berbeda. Lihat di {{lab:nyala|lab Uji nyala}}.

Di laboratorium, pemeriksaan seperti ini dipakai untuk memastikan air minum aman, makanan tidak mengandung bahan berbahaya, dan obat berisi zat yang benar.`,
      `Chemists can be detectives: they find out which substances are in something, and how much.

- **Natural indicators**: red-cabbage water turns pink with vinegar and green with soap, so we know which is acidic and which is basic. Try it in the {{lab:ph|pH lab}}.
- **Paper chromatography**: black felt-tip ink is dotted on filter paper and the paper’s end dipped in water. The ink splits into several colours because each dye travels at a different speed.
- **Flame tests**: metal salts in a flame give different colours. See the {{lab:nyala|Flame test lab}}.

In laboratories, tests like these make sure drinking water is safe, food has no harmful additives and medicines contain the right substance.`,
    ],
    smp: [
      `Kimia analitik punya dua pertanyaan:

- **[[analisis-kualitatif|Analisis kualitatif]]**: zat apa yang ada? Contohnya uji nyala, uji ion dengan pereaksi yang membentuk endapan berwarna ({{r:perak-klorida|klorida dengan perak nitrat}}), uji gas CO₂ dengan {{r:air-kapur-keruh|air kapur}}, dan uji amilum dengan iodin.
- **[[analisis-kuantitatif|Analisis kuantitatif]]**: berapa banyak? Contohnya menimbang, mengukur volume, dan [[titrasi]].

[[kromatografi|Kromatografi]] memisahkan zat dalam campuran berdasarkan perbedaan kecepatan merambat. Pada kromatografi kertas, nilai **Rf** = jarak tempuh zat ÷ jarak tempuh pelarut; zat yang sama memiliki Rf sama pada kondisi yang sama.

Hasil pengukuran harus dapat dipercaya. [[akurasi-presisi|Akurasi]] berarti dekat dengan nilai sebenarnya; presisi berarti hasil ulangan saling berdekatan. Pengukuran yang presisi belum tentu akurat bila alatnya salah dikalibrasi.`,
      `Analytical chemistry asks two questions:

- **[[analisis-kualitatif|Qualitative analysis]]**: what is there? Examples: flame tests, ion tests with reagents that form coloured precipitates ({{r:perak-klorida|chloride with silver nitrate}}), testing for CO₂ with {{r:air-kapur-keruh|limewater}}, and the starch test with iodine.
- **[[analisis-kuantitatif|Quantitative analysis]]**: how much? Examples: weighing, measuring volumes and [[titrasi|titration]].

[[kromatografi|Chromatography]] separates the substances in a mixture by how fast they travel. In paper chromatography, **Rf** = distance moved by the substance ÷ distance moved by the solvent; the same substance has the same Rf under the same conditions.

Measurements must be trustworthy. [[akurasi-presisi|Accuracy]] means close to the true value; precision means repeat results are close to each other. Precise measurements are not necessarily accurate if the instrument is badly calibrated.`,
    ],
    sma: [
      `**[[gravimetri|Gravimetri]]**: analit diendapkan sebagai zat murni berumus tertentu, disaring, dikeringkan, dan ditimbang. Contoh: sulfat diendapkan sebagai {{r:barium-sulfat|BaSO₄}}; massa sulfat dihitung dari perbandingan massa molar.

**Volumetri (titrasi)**: larutan baku dengan konsentrasi diketahui ditambahkan dari buret sampai titik ekuivalen, ditandai indikator (titik akhir). Jenisnya:

- Titrasi asam–basa (lihat {{lab:titrasi|lab Titrasi}}).
- Titrasi redoks: {{r:permanganometri|permanganometri}} (KMnO₄ sebagai indikator sendiri) dan {{r:iodometri|iodometri}} (indikator kanji).
- Titrasi kompleksometri dengan EDTA untuk kesadahan air (Ca²⁺, Mg²⁺).
- Titrasi pengendapan (argentometri) untuk klorida.

Perhitungan memakai stoikiometri: mol titran = M × V, lalu perbandingan koefisien.

**Metode instrumen**:

- [[spektroskopi|Spektrofotometri]] UV-Vis dengan [[hukum-beer-lambert|hukum Beer–Lambert]] (A = ε·b·c): konsentrasi dibaca dari kurva kalibrasi larutan standar.
- Spektrometri serapan atom (AAS) untuk logam berat dalam air dan makanan.
- [[kromatografi|Kromatografi]] lapis tipis (KLT), kromatografi gas (GC), dan kromatografi cair kinerja tinggi (HPLC).
- [[spektrometri-massa|Spektrometri massa]] (MS), sering digabung dengan GC atau HPLC.

Laporan hasil memuat nilai rata-rata, simpangan baku, dan angka penting yang sesuai.`,
      `**[[gravimetri|Gravimetry]]**: the analyte is precipitated as a pure substance of known formula, filtered, dried and weighed. Example: sulfate precipitated as {{r:barium-sulfat|BaSO₄}}; the sulfate mass follows from the molar-mass ratio.

**Volumetric analysis (titration)**: a standard solution of known concentration is added from a burette to the equivalence point, shown by an indicator (the endpoint). Kinds:

- Acid–base titration (see the {{lab:titrasi|Titration lab}}).
- Redox titration: {{r:permanganometri|permanganometry}} (KMnO₄ is its own indicator) and {{r:iodometri|iodometry}} (starch indicator).
- Complexometric titration with EDTA for water hardness (Ca²⁺, Mg²⁺).
- Precipitation titration (argentometry) for chloride.

Calculations use stoichiometry: moles of titrant = M × V, then the coefficient ratio.

**Instrumental methods**:

- UV-Vis [[spektroskopi|spectrophotometry]] with the [[hukum-beer-lambert|Beer–Lambert law]] (A = ε·b·c): concentration is read from a calibration curve of standards.
- Atomic absorption spectrometry (AAS) for heavy metals in water and food.
- [[kromatografi|Chromatography]]: thin-layer (TLC), gas (GC) and high-performance liquid chromatography (HPLC).
- [[spektrometri-massa|Mass spectrometry]] (MS), often coupled to GC or HPLC.

Results are reported with a mean, a standard deviation and suitable significant figures.`,
    ],
    kuliah: [
      `**Kalibrasi dan validasi**: kurva kalibrasi dibuat dari larutan standar dan diuji linearitasnya (koefisien korelasi, residu). Batas deteksi (LOD) dan batas kuantitasi (LOQ) umumnya diperkirakan dari 3 dan 10 kali simpangan baku blanko terhadap kemiringan. Metode adisi standar mengatasi efek matriks; standar internal mengoreksi variasi injeksi dan detektor. Validasi metode meliputi selektivitas, linearitas, akurasi (uji perolehan kembali), presisi (keterulangan dan ketertiruan, dinyatakan RSD), dan ketahanan.

**Statistik**: galat sistematik memengaruhi akurasi dan dikenali dengan bahan acuan bersertifikat; galat acak memengaruhi presisi. Uji t membandingkan rata-rata dengan nilai acuan atau antar-metode; uji Q atau uji Grubbs menilai data pencilan.

**Teknik tergabung dan unsur**: GC–MS dan LC–MS/MS memadukan pemisahan dan identifikasi (dipakai untuk residu pestisida, doping, dan forensik); ICP-OES dan ICP-MS mengukur banyak unsur sekaligus pada kadar sangat rendah.

**[[elektroanalisis|Elektroanalisis]]**: potensiometri (elektrode pH dan elektrode selektif ion, mengikuti persamaan Nernst), konduktometri, voltametri siklik, dan sensor amperometri seperti glukometer berbasis enzim glukosa oksidase.

Laboratorium pengujian bekerja dalam sistem mutu (misalnya ISO/IEC 17025) agar hasilnya tertelusur ke satuan SI; di Indonesia hasil seperti ini mendasari pengawasan pangan dan obat, air minum, dan lingkungan.`,
      `**Calibration and validation**: a calibration curve is made from standards and checked for linearity (correlation, residuals). The limit of detection (LOD) and limit of quantitation (LOQ) are commonly estimated as 3 and 10 times the blank’s standard deviation divided by the slope. Standard addition overcomes matrix effects; an internal standard corrects for injection and detector drift. Method validation covers selectivity, linearity, accuracy (recovery tests), precision (repeatability and reproducibility, as RSD) and robustness.

**Statistics**: systematic error affects accuracy and is revealed with certified reference materials; random error affects precision. The t-test compares a mean with a reference value or two methods; Q or Grubbs tests judge outliers.

**Hyphenated and elemental techniques**: GC–MS and LC–MS/MS combine separation with identification (for pesticide residues, doping and forensics); ICP-OES and ICP-MS measure many elements at once at very low levels.

**[[elektroanalisis|Electroanalysis]]**: potentiometry (pH and ion-selective electrodes, following the Nernst equation), conductometry, cyclic voltammetry, and amperometric sensors such as glucose meters based on glucose oxidase.

Testing laboratories work under quality systems (such as ISO/IEC 17025) so results are traceable to SI units; in Indonesia such results underpin food and drug control, drinking water and environmental monitoring.`,
    ],
  },
  points: [
    ['Kualitatif: zat apa yang ada; kuantitatif: berapa banyak.', 'Qualitative: what is present; quantitative: how much.'],
    ['Rf = jarak zat ÷ jarak pelarut pada kromatografi.', 'Rf = substance distance ÷ solvent distance in chromatography.'],
    ['Titrasi: mol titran = M × V, lalu perbandingan koefisien reaksi.', 'Titration: moles of titrant = M × V, then the reaction’s coefficient ratio.'],
    ['Beer–Lambert: A = ε·b·c; konsentrasi dari kurva kalibrasi.', 'Beer–Lambert: A = ε·b·c; concentration from a calibration curve.'],
    ['Akurasi = dekat nilai benar; presisi = ulangan saling dekat.', 'Accuracy = close to the true value; precision = repeats close together.'],
  ],
  molecules: ['silver-nitrate', 'barium-sulfate', 'potassium-permanganate', 'sodium-thiosulfate', 'iodine', 'calcium-hydroxide'],
  labs: ['titrasi', 'ph', 'nyala'],
  activity: {
    sd: ['Lakukan kromatografi kertas dengan spidol hitam, cokelat, dan ungu di atas kertas saring atau tisu. Bandingkan warna-warna yang muncul.', 'Do paper chromatography with black, brown and purple felt-tips on filter paper or tissue. Compare the colours that appear.'],
    smp: ['Hitung nilai Rf setiap warna dari kromatogram spidolmu. Ulangi dua kali dan bahas apakah hasilnya presisi.', 'Calculate the Rf of each colour in your felt-tip chromatogram. Repeat twice and discuss whether your results are precise.'],
    sma: ['Tentukan kadar asam asetat dalam cuka dapur dengan titrasi NaOH 0,1 M dan indikator fenolftalein (tiga kali ulangan), lalu hitung rata-rata dan simpangan bakunya.', 'Find the acetic acid content of kitchen vinegar by titration with 0.1 M NaOH and phenolphthalein (three repeats), then calculate the mean and standard deviation.'],
    kuliah: ['Rancang validasi sederhana metode spektrofotometri untuk besi dalam air (kurva kalibrasi, LOD, uji perolehan kembali) dan tentukan parameter yang harus dilaporkan.', 'Design a simple validation of a spectrophotometric method for iron in water (calibration, LOD, recovery test) and list the parameters to report.'],
  },
  quiz: [
    { lv: 'sd', q: ['Air kol ungu dipakai untuk mengetahui…', 'Red-cabbage water is used to find out…'], options: [['Asam atau basa', 'Acid or base'], ['Berat benda', 'How heavy something is'], ['Suhu', 'Temperature'], ['Warna daun', 'Leaf colour']], answer: 0, explain: ['Kol ungu adalah indikator alami yang berubah warna menurut pH.', 'Red cabbage is a natural indicator that changes colour with pH.'] },
    { lv: 'sd', q: ['Tinta spidol hitam terpisah menjadi beberapa warna pada kertas basah karena…', 'Black felt-tip ink splits into colours on wet paper because…'], options: [['Kertasnya berwarna', 'The paper is coloured'], ['Tiap zat warna bergerak dengan kecepatan berbeda', 'Each dye travels at a different speed'], ['Airnya berwarna', 'The water is coloured'], ['Tintanya terbakar', 'The ink burns']], answer: 1, explain: ['Ini prinsip kromatografi.', 'This is the principle of chromatography.'] },
    { lv: 'smp', q: ['Menentukan berapa banyak zat dalam sampel disebut analisis…', 'Finding how much of a substance is in a sample is…'], options: [['Kualitatif', 'Qualitative analysis'], ['Kuantitatif', 'Quantitative analysis'], ['Sintesis', 'Synthesis'], ['Distilasi', 'Distillation']], answer: 1, explain: ['Kuantitatif = jumlah; kualitatif = jenis.', 'Quantitative = amount; qualitative = identity.'] },
    { lv: 'smp', q: ['Zat bergerak 3 cm dan pelarut 6 cm. Nilai Rf-nya…', 'A spot moves 3 cm and the solvent 6 cm. Its Rf is…'], options: [['0,5', '0.5'], ['2', '2'], ['3', '3'], ['18', '18']], answer: 0, explain: ['Rf = 3/6 = 0,5.', 'Rf = 3/6 = 0.5.'] },
    { lv: 'smp', q: ['Tiga penimbangan memberi 5,01; 5,02; 5,01 g, padahal massa sebenarnya 5,50 g. Hasilnya…', 'Three weighings give 5.01, 5.02, 5.01 g, but the true mass is 5.50 g. The results are…'], options: [['Akurat dan presisi', 'Accurate and precise'], ['Presisi tetapi tidak akurat', 'Precise but not accurate'], ['Akurat tetapi tidak presisi', 'Accurate but not precise'], ['Tidak keduanya', 'Neither']], answer: 1, explain: ['Nilainya saling dekat (presisi) tetapi jauh dari nilai benar (tidak akurat).', 'The values agree (precise) but are far from the true value (not accurate).'] },
    { lv: 'sma', q: ['Pada gravimetri sulfat, sulfat diendapkan sebagai…', 'In gravimetric sulfate analysis, sulfate is precipitated as…'], options: [['AgCl', 'AgCl'], ['BaSO₄', 'BaSO₄'], ['CaCO₃', 'CaCO₃'], ['PbI₂', 'PbI₂']], answer: 1, explain: ['BaSO₄ sangat sukar larut dan rumusnya pasti.', 'BaSO₄ is very insoluble with a definite formula.'] },
    { lv: 'sma', q: ['25,0 mL NaOH 0,100 M tepat menetralkan 20,0 mL HCl. Molaritas HCl…', '25.0 mL of 0.100 M NaOH exactly neutralises 20.0 mL of HCl. The HCl molarity is…'], options: [['0,080 M', '0.080 M'], ['0,125 M', '0.125 M'], ['0,100 M', '0.100 M'], ['0,250 M', '0.250 M']], answer: 1, explain: ['mol NaOH = 0,00250 = mol HCl; 0,00250/0,0200 L = 0,125 M.', 'mol NaOH = 0.00250 = mol HCl; 0.00250/0.0200 L = 0.125 M.'] },
    { lv: 'sma', q: ['Titrasi permanganometri tidak memerlukan indikator tambahan karena…', 'Permanganate titrations need no extra indicator because…'], options: [['KMnO₄ ungu dan hasil reduksinya hampir tak berwarna', 'KMnO₄ is purple and its reduced form nearly colourless'], ['Reaksinya lambat', 'The reaction is slow'], ['Larutannya basa', 'The solution is basic'], ['Tidak ada titik akhir', 'There is no endpoint']], answer: 0, explain: ['Tetes pertama MnO₄⁻ berlebih memberi warna merah muda.', 'The first excess drop of MnO₄⁻ turns the solution pink.'] },
    { lv: 'sma', q: ['Menurut hukum Beer–Lambert, absorbans sebanding dengan…', 'By the Beer–Lambert law, absorbance is proportional to…'], options: [['Konsentrasi', 'Concentration'], ['Suhu', 'Temperature'], ['Volume', 'Volume'], ['Massa wadah', 'Container mass']], answer: 0, explain: ['A = ε·b·c.', 'A = ε·b·c.'] },
    { lv: 'kuliah', q: ['Metode adisi standar terutama dipakai untuk mengatasi…', 'The standard-addition method mainly overcomes…'], options: [['Efek matriks', 'Matrix effects'], ['Galat pembulatan', 'Rounding errors'], ['Suhu ruang', 'Room temperature'], ['Kekurangan pelarut', 'A lack of solvent']], answer: 0, explain: ['Standar ditambahkan ke sampel sehingga matriksnya sama.', 'Standards are added to the sample so the matrix is the same.'] },
    { lv: 'kuliah', q: ['Galat sistematik paling baik dideteksi dengan…', 'Systematic error is best detected with…'], options: [['Mengulang pengukuran', 'Repeating measurements'], ['Bahan acuan bersertifikat', 'A certified reference material'], ['Menambah angka penting', 'More significant figures'], ['Menaikkan suhu', 'Raising the temperature']], answer: 1, explain: ['Ulangan hanya mengungkap galat acak; bahan acuan mengungkap bias.', 'Repeats only reveal random error; a reference material reveals bias.'] },
  ],
  teacher: {
    cp: ['Fase A–F: peserta didik mengenali zat dengan uji sederhana, memisahkan campuran dengan kromatografi, dan menentukan kadar dengan titrasi serta instrumen.', 'Phases A–F: learners identify substances with simple tests, separate mixtures by chromatography and measure amounts by titration and instruments.'],
    goals: [
      ['Membedakan analisis kualitatif dan kuantitatif dengan contoh.', 'Distinguish qualitative and quantitative analysis with examples.'],
      ['Melakukan dan menghitung titrasi serta Rf kromatografi.', 'Perform and calculate titrations and chromatography Rf values.'],
      ['Menilai data dengan konsep akurasi, presisi, dan angka penting.', 'Judge data with accuracy, precision and significant figures.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Pemantik: "detektif kimia" — sampel misterius untuk diuji.', 'Hook: "chemistry detectives" — a mystery sample to test.'],
      ['Praktikum kromatografi kertas dan uji ion.', 'Practical: paper chromatography and ion tests.'],
      ['Titrasi cuka dengan NaOH dan pengolahan data statistik sederhana.', 'Titrating vinegar with NaOH and simple statistics.'],
      ['Diskusi pengawasan pangan dan air minum.', 'Discussion of food and drinking-water monitoring.'],
    ],
    misconceptions: [
      ['"Titik akhir sama dengan titik ekuivalen." Titik akhir adalah perubahan indikator, sedikit berbeda dari titik ekuivalen.', '"The endpoint is the equivalence point." The endpoint is the indicator change, slightly different from the equivalence point.'],
      ['"Data yang presisi pasti akurat." Alat yang salah kalibrasi memberi data presisi tetapi bias.', '"Precise data must be accurate." A miscalibrated instrument gives precise but biased data.'],
      ['"Nilai Rf hanya bergantung pada zatnya." Rf juga bergantung pada pelarut dan fase diam.', '"Rf depends only on the substance." It also depends on the solvent and the stationary phase.'],
    ],
    assessment: ['Laporan titrasi dengan analisis galat, kuis Kimialoka, dan kromatogram berlabel.', 'A titration report with error analysis, the Kimialoka quiz and a labelled chromatogram.'],
  },
  refs: ['1-5-measurement-uncertainty-accuracy-and-precision', '4-5-quantitative-chemical-analysis', '14-7-acid-base-titrations', '15-1-precipitation-and-dissolution'],
};
