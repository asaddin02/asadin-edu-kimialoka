export default {
  id: 'asam-basa',
  icon: 'acid',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Asam, basa, garam, dan pH', 'Acids, bases, salts and pH'],
  summary: [
    'Cuka, sabun, dan obat maag: kenali asam dan basa, indikator alami, skala pH, penetralan, dan larutan penyangga.',
    'Vinegar, soap and antacids: meet acids and bases, natural indicators, the pH scale, neutralisation and buffers.',
  ],
  body: {
    sd: [
      `Coba cicipi sedikit jeruk nipis: rasanya masam karena mengandung [[asam]], yaitu {{m:citric-acid|asam sitrat}}. {{m:acetic-acid|Cuka}} juga asam. Sebaliknya, sabun terasa licin karena bersifat [[basa]]. Hati-hati, jangan pernah mencicipi bahan kimia di laboratorium!

Untuk mengetahui asam atau basa tanpa mencicipi, kita memakai [[indikator]]:

- Kertas lakmus: asam memerahkan lakmus biru, basa membirukan lakmus merah.
- Indikator alami: air rebusan kol ungu atau bunga telang berubah merah muda dalam asam dan hijau kebiruan dalam basa. Air {{m:curcumin|kunyit}} berubah merah kecokelatan dalam basa.

Ukuran asam–basa disebut [[ph|pH]], dari 0 sampai 14. Air murni pH 7 (netral). Coba mainkan {{lab:ph|lab pH & indikator}}!`,
      `Taste a little lime: it is sour because it contains an [[asam|acid]], {{m:citric-acid|citric acid}}. {{m:acetic-acid|Vinegar}} is an acid too. Soap feels slippery because it is a [[basa|base]]. Careful — never taste chemicals in a lab!

To tell acids from bases without tasting, we use [[indikator|indicators]]:

- Litmus paper: acids turn blue litmus red, bases turn red litmus blue.
- Natural indicators: red-cabbage or butterfly-pea water turns pink in acid and blue-green in base. {{m:curcumin|Turmeric}} water turns red-brown in base.

The acid–base scale is [[ph|pH]], from 0 to 14. Pure water is pH 7 (neutral). Try the {{lab:ph|pH & indicators lab}}!`,
    ],
    smp: [
      `Menurut Arrhenius, [[asam]] melepaskan ion H⁺ dalam air, sedangkan [[basa]] melepaskan ion OH⁻.

- Asam: {{m:hydrogen-chloride|HCl}} (asam lambung), {{m:sulfuric-acid|H₂SO₄}} (air aki), {{m:acetic-acid|CH₃COOH}} (cuka), {{m:citric-acid|asam sitrat}}.
- Basa: {{m:sodium-hydroxide|NaOH}} (soda api), {{m:calcium-hydroxide|Ca(OH)₂}} (kapur sirih), {{m:magnesium-hydroxide|Mg(OH)₂}} (obat maag), {{m:ammonia|NH₃}}.

Skala [[ph|pH]]: di bawah 7 asam, 7 netral, di atas 7 basa. Makin kecil pH, makin asam.

Asam dan basa saling menetralkan membentuk [[garam]] dan air: HCl + NaOH → NaCl + H₂O. Contoh [[netralisasi|penetralan]] sehari-hari: obat maag menetralkan asam lambung, kapur pertanian menetralkan tanah asam, dan pasta gigi yang sedikit basa menetralkan asam dari sisa makanan.`,
      `In Arrhenius’s definition, [[asam|acids]] release H⁺ ions in water and [[basa|bases]] release OH⁻ ions.

- Acids: {{m:hydrogen-chloride|HCl}} (stomach acid), {{m:sulfuric-acid|H₂SO₄}} (battery acid), {{m:acetic-acid|CH₃COOH}} (vinegar), {{m:citric-acid|citric acid}}.
- Bases: {{m:sodium-hydroxide|NaOH}} (caustic soda), {{m:calcium-hydroxide|Ca(OH)₂}} (slaked lime), {{m:magnesium-hydroxide|Mg(OH)₂}} (antacid), {{m:ammonia|NH₃}}.

On the [[ph|pH]] scale, below 7 is acidic, 7 neutral, above 7 basic. The lower the pH, the more acidic.

Acids and bases neutralise each other, making a [[garam|salt]] and water: HCl + NaOH → NaCl + H₂O. Everyday [[netralisasi|neutralisation]]: antacids neutralise stomach acid, farm lime neutralises acidic soil, and slightly basic toothpaste neutralises acid from food.`,
    ],
    sma: [
      `Teori Brønsted–Lowry lebih luas: asam adalah donor proton dan basa akseptor proton. Setiap asam memiliki basa konjugasi: CH₃COOH / CH₃COO⁻, NH₄⁺ / NH₃, H₂O / OH⁻. Teori Lewis lebih luas lagi: asam menerima pasangan elektron ({{m:boron-trifluoride|BF₃}}), basa mendonorkannya.

pH = −log[H⁺] dan pOH = −log[OH⁻]; pada 25 °C, pH + pOH = 14 (Kw = 1,0 × 10⁻¹⁴).

- [[asam-kuat|Asam kuat]] terionisasi sempurna: 0,01 M HCl → [H⁺] = 10⁻² → pH 2.
- Asam lemah hanya sebagian: [H⁺] = √(Ka·Ma). Untuk 0,1 M CH₃COOH (Ka 1,8 × 10⁻⁵), [H⁺] ≈ 1,3 × 10⁻³ → pH ≈ 2,9.

[[titrasi|Titrasi]] mengukur kadar asam atau basa. Titik ekuivalen asam kuat–basa kuat berada di pH 7, sedangkan asam lemah–basa kuat di atas 7, sehingga fenolftalein lebih tepat daripada metil jingga. Coba di {{lab:titrasi|lab Titrasi}}.

[[larutan-penyangga|Larutan penyangga]] mempertahankan pH: pH = pKa + log([A⁻]/[HA]). Darah dijaga pada pH 7,35–7,45 oleh sistem {{m:carbonic-acid|H₂CO₃}}/HCO₃⁻.`,
      `Brønsted–Lowry theory is broader: acids donate protons and bases accept them. Every acid has a conjugate base: CH₃COOH / CH₃COO⁻, NH₄⁺ / NH₃, H₂O / OH⁻. Lewis theory is broader still: acids accept electron pairs ({{m:boron-trifluoride|BF₃}}) and bases donate them.

pH = −log[H⁺] and pOH = −log[OH⁻]; at 25 °C, pH + pOH = 14 (Kw = 1.0 × 10⁻¹⁴).

- [[asam-kuat|Strong acids]] ionise fully: 0.01 M HCl → [H⁺] = 10⁻² → pH 2.
- Weak acids only partly: [H⁺] = √(Ka·Ca). For 0.1 M CH₃COOH (Ka 1.8 × 10⁻⁵), [H⁺] ≈ 1.3 × 10⁻³ → pH ≈ 2.9.

[[titrasi|Titration]] measures acid or base concentration. A strong acid–strong base titration has its equivalence point at pH 7; weak acid–strong base lies above 7, so phenolphthalein fits better than methyl orange. Try the {{lab:titrasi|Titration lab}}.

[[larutan-penyangga|Buffers]] hold pH steady: pH = pKa + log([A⁻]/[HA]). Blood is kept at pH 7.35–7.45 by the {{m:carbonic-acid|H₂CO₃}}/HCO₃⁻ system.`,
    ],
    kuliah: [
      `Kekuatan asam dijelaskan oleh stabilitas basa konjugasinya: elektronegativitas dan ukuran atom (HF lemah, HI kuat), resonansi (asam karboksilat lebih asam daripada alkohol), dan efek induktif (asam trikloroasetat pKa 0,7 dibanding asam asetat 4,76). Asam poliprotik seperti {{m:phosphoric-acid|H₃PO₄}} memiliki pKa bertahap (2,15; 7,20; 12,35), sehingga fosfat menjadi penyangga penting di sel.

Perhitungan pH yang tepat memerlukan kesetimbangan massa, muatan, dan proton; untuk larutan sangat encer, autoionisasi air tidak dapat diabaikan (10⁻⁸ M HCl memiliki pH ≈ 6,98, bukan 8). Kurva titrasi dan diagram spesiasi (fraksi α tiap spesi terhadap pH) memudahkan membaca sistem poliprotik.

Konsep asam–basa keras–lunak (HSAB, Pearson) meramalkan kestabilan kompleks: ion keras (Mg²⁺, Al³⁺) menyukai ligan O dan F, ion lunak (Hg²⁺, Ag⁺) menyukai S dan I. Inilah sebabnya raksa terikat kuat pada gugus tiol protein dan bersifat toksik.

Superasam seperti HSbF₆ lebih asam daripada asam sulfat 100% dan dapat memprotonasi hidrokarbon.`,
      `Acid strength follows the stability of the conjugate base: electronegativity and atom size (HF weak, HI strong), resonance (carboxylic acids beat alcohols) and induction (trichloroacetic acid pKa 0.7 vs acetic acid 4.76). Polyprotic acids such as {{m:phosphoric-acid|H₃PO₄}} have stepwise pKa values (2.15, 7.20, 12.35), making phosphate a key cellular buffer.

Exact pH calculations need mass, charge and proton balances; in very dilute solutions water autoionisation matters (10⁻⁸ M HCl has pH ≈ 6.98, not 8). Titration curves and speciation diagrams (fraction α of each species vs pH) make polyprotic systems easy to read.

Hard–soft acid–base theory (HSAB, Pearson) predicts complex stability: hard ions (Mg²⁺, Al³⁺) prefer O and F ligands, soft ions (Hg²⁺, Ag⁺) prefer S and I. That is why mercury binds strongly to protein thiol groups and is toxic.

Superacids such as HSbF₆ are more acidic than 100% sulfuric acid and can protonate hydrocarbons.`,
    ],
  },
  points: [
    ['pH < 7 asam, pH = 7 netral, pH > 7 basa.', 'pH < 7 acidic, pH = 7 neutral, pH > 7 basic.'],
    ['Asam + basa → garam + air (penetralan).', 'Acid + base → salt + water (neutralisation).'],
    ['Asam kuat terionisasi sempurna; asam lemah sebagian (Ka kecil).', 'Strong acids ionise fully; weak acids partly (small Ka).'],
    ['Indikator alami: kol ungu, bunga telang, kunyit.', 'Natural indicators: red cabbage, butterfly pea, turmeric.'],
  ],
  molecules: ['acetic-acid', 'citric-acid', 'hydrogen-chloride', 'sodium-hydroxide', 'calcium-hydroxide', 'magnesium-hydroxide', 'cyanidin', 'curcumin'],
  labs: ['ph', 'titrasi'],
  activity: {
    sd: ['Buat indikator dari air rebusan kol ungu atau bunga telang. Teteskan ke air jeruk, air sabun, cuka, dan air soda kue. Catat warnanya.', 'Make an indicator from red-cabbage or butterfly-pea water. Add it to lime juice, soapy water, vinegar and baking-soda water. Record the colours.'],
    smp: ['Uji pH 8 bahan rumah tangga dengan kertas indikator universal dan urutkan dari paling asam ke paling basa.', 'Test the pH of 8 household products with universal indicator paper and order them from most acidic to most basic.'],
    sma: ['Titrasi cuka dapur dengan larutan NaOH 0,1 M dan fenolftalein untuk menentukan kadar asam asetat, lalu bandingkan dengan label.', 'Titrate kitchen vinegar with 0.1 M NaOH and phenolphthalein to find its acetic acid content, and compare with the label.'],
    kuliah: ['Susun diagram spesiasi H₃PO₄ (α vs pH) dan tentukan pH penyangga fosfat 1 : 1 untuk media kultur.', 'Build the H₃PO₄ speciation diagram (α vs pH) and find the pH of a 1 : 1 phosphate buffer for culture media.'],
  },
  quiz: [
    { lv: 'kuliah', q: ["Larutan penyangga paling efektif menahan perubahan pH ketika…", "A buffer resists pH change best when…"], options: [["pH = pKa ([A⁻] = [HA])", "pH = pKa ([A⁻] = [HA])"], ["pH = 7 selalu", "pH is always 7"], ["[HA] = 0", "[HA] = 0"], ["Asamnya kuat", "The acid is strong"]], answer: 0, explain: ["Kapasitas penyangga maksimum saat perbandingan asam dan basa konjugat 1:1.", "Buffer capacity peaks when acid and conjugate base are 1:1."] },
    { lv: 'sd', q: ['Air jeruk nipis terasa masam karena bersifat…', 'Lime juice tastes sour because it is…'], options: [['Asam', 'Acidic'], ['Basa', 'Basic'], ['Netral', 'Neutral'], ['Garam', 'A salt']], answer: 0, explain: ['Jeruk nipis mengandung asam sitrat.', 'Limes contain citric acid.'] },
    { lv: 'sd', q: ['Air murni memiliki pH…', 'Pure water has a pH of…'], options: [['0', '0'], ['5', '5'], ['7', '7'], ['14', '14']], answer: 2, explain: ['pH 7 berarti netral, tidak asam dan tidak basa.', 'pH 7 means neutral, neither acidic nor basic.'] },
    { lv: 'sd', q: ['Air rebusan kol ungu berubah hijau kebiruan saat diberi…', 'Red-cabbage water turns blue-green when mixed with…'], options: [['Cuka', 'Vinegar'], ['Air jeruk', 'Lime juice'], ['Air sabun', 'Soapy water'], ['Air murni', 'Pure water']], answer: 2, explain: ['Sabun bersifat basa; antosianin kol ungu menjadi hijau kebiruan dalam basa.', 'Soap is basic; red-cabbage anthocyanin turns blue-green in base.'] },
    { lv: 'smp', q: ['Obat maag bekerja dengan cara…', 'Antacids work by…'], options: [['Menambah asam lambung', 'Adding stomach acid'], ['Menetralkan asam lambung', 'Neutralising stomach acid'], ['Membunuh kuman', 'Killing germs'], ['Mendinginkan lambung', 'Cooling the stomach']], answer: 1, explain: ['Basa lemah seperti Mg(OH)₂ bereaksi dengan HCl membentuk garam dan air.', 'Weak bases like Mg(OH)₂ react with HCl to form salt and water.'] },
    { lv: 'smp', q: ['Hasil reaksi HCl + NaOH adalah…', 'HCl + NaOH gives…'], options: [['NaCl + H₂O', 'NaCl + H₂O'], ['NaOH + Cl₂', 'NaOH + Cl₂'], ['H₂ + NaClO', 'H₂ + NaClO'], ['Na + HCl', 'Na + HCl']], answer: 0, explain: ['Penetralan: asam + basa → garam + air.', 'Neutralisation: acid + base → salt + water.'] },
    { lv: 'sma', q: ['pH larutan HCl 0,001 M adalah…', 'The pH of 0.001 M HCl is…'], options: [['1', '1'], ['2', '2'], ['3', '3'], ['11', '11']], answer: 2, explain: ['Asam kuat: [H⁺] = 10⁻³ M, jadi pH = 3.', 'Strong acid: [H⁺] = 10⁻³ M, so pH = 3.'] },
    { lv: 'sma', q: ['Basa konjugasi dari NH₄⁺ adalah…', 'The conjugate base of NH₄⁺ is…'], options: [['NH₃', 'NH₃'], ['NH₂⁻', 'NH₂⁻'], ['H₂O', 'H₂O'], ['OH⁻', 'OH⁻']], answer: 0, explain: ['NH₄⁺ melepas satu proton menjadi NH₃.', 'NH₄⁺ loses one proton to become NH₃.'] },
    { lv: 'sma', q: ['Indikator yang tepat untuk titrasi CH₃COOH dengan NaOH adalah…', 'The right indicator for titrating CH₃COOH with NaOH is…'], options: [['Metil jingga (3,1–4,4)', 'Methyl orange (3.1–4.4)'], ['Fenolftalein (8,2–10)', 'Phenolphthalein (8.2–10)'], ['Tidak perlu indikator', 'No indicator needed'], ['Lakmus merah saja', 'Red litmus only']], answer: 1, explain: ['Titik ekuivalen asam lemah–basa kuat berada di pH sekitar 8,7.', 'The weak acid–strong base equivalence point is around pH 8.7.'] },
    { lv: 'kuliah', q: ['pH larutan HCl 1,0 × 10⁻⁸ M (25 °C) paling dekat dengan…', 'The pH of 1.0 × 10⁻⁸ M HCl (25 °C) is closest to…'], options: [['8,0', '8.0'], ['7,0', '7.0'], ['6,98', '6.98'], ['6,0', '6.0']], answer: 2, explain: ['Ion H⁺ dari autoionisasi air (10⁻⁷ M) lebih besar daripada dari HCl, sehingga pH sedikit di bawah 7.', 'H⁺ from water (10⁻⁷ M) outweighs that from HCl, so the pH is just below 7.'] },
  ],
  teacher: {
    cp: ['Fase C–F: peserta didik mengidentifikasi sifat asam–basa, menggunakan indikator, dan menghitung pH larutan.', 'Phases C–F: learners identify acid–base properties, use indicators and calculate pH.'],
    goals: [
      ['Membedakan asam, basa, dan garam dari sifat dan contohnya.', 'Distinguish acids, bases and salts by properties and examples.'],
      ['Membuat dan menggunakan indikator alami.', 'Make and use natural indicators.'],
      ['Menghitung pH asam dan basa kuat maupun lemah.', 'Calculate the pH of strong and weak acids and bases.'],
    ],
    duration: ['2 × 35 menit (SD) · 3 × 40 menit (SMP) · 5 × 45 menit (SMA)', '2 × 35 min (primary) · 3 × 40 min (junior) · 5 × 45 min (senior)'],
    steps: [
      ['Praktikum indikator alami (kol ungu, bunga telang, kunyit).', 'Natural indicator practical (red cabbage, butterfly pea, turmeric).'],
      ['Eksplorasi lab pH: hubungan konsentrasi, kekuatan asam, dan pH.', 'Explore the pH lab: concentration, acid strength and pH.'],
      ['Titrasi virtual lalu titrasi nyata cuka dapur.', 'Virtual then real titration of kitchen vinegar.'],
    ],
    misconceptions: [
      ['"Semua asam berbahaya dan korosif." Banyak asam lemah aman dimakan (sitrat, askorbat).', '"All acids are dangerous." Many weak acids are edible (citric, ascorbic).'],
      ['"pH 0 berarti tidak ada asam." Justru sangat asam.', '"pH 0 means no acid." It means very acidic.'],
    ],
    assessment: ['Kuis Kimialoka dan laporan titrasi cuka.', 'Kimialoka quiz and a vinegar titration report.'],
  },
  refs: ["14-1-bronsted-lowry-acids-and-bases", "14-2-ph-and-poh", "14-3-relative-strengths-of-acids-and-bases", "14-6-buffers", "14-7-acid-base-titrations", "15-2-lewis-acids-and-bases"],
};
