export default {
  id: 'zat',
  icon: 'drop',
  levels: ['sd', 'smp', 'sma'],
  title: ['Zat dan wujudnya', 'Matter and its states'],
  summary: [
    'Padat, cair, gas: mengapa es mencair dan air mendidih? Kenali zat tunggal, campuran, dan cara memisahkannya.',
    'Solid, liquid, gas: why does ice melt and water boil? Meet pure substances, mixtures and how to separate them.',
  ],
  body: {
    sd: [
      `Semua benda di sekitarmu adalah [[materi|zat]]: punya berat dan menempati ruang. Zat punya tiga [[wujud-zat|wujud]] utama:

- **Padat**: bentuknya tetap, seperti batu, es, dan kayu.
- **Cair**: mengikuti bentuk wadah, seperti {{m:water|air}}, minyak, dan susu.
- **Gas**: memenuhi seluruh ruang dan sering tidak terlihat, seperti {{m:oxygen|oksigen}} dan uap air.

Wujud zat bisa berubah bila dipanaskan atau didinginkan. Es batu [[mencair]] menjadi air, air [[menguap]] saat jemuran kering, dan uap air mengembun menjadi titik air di gelas es. Kapur barus mengecil karena [[menyublim]], berubah langsung dari padat menjadi gas.

Coba lihat simulasi {{lab:wujud|Partikel & wujud zat}} untuk melihat "tarian" partikel di setiap wujud.`,
      `Everything around you is [[materi|matter]]: it has weight and takes up space. Matter has three main [[wujud-zat|states]]:

- **Solid**: keeps its shape, like stone, ice and wood.
- **Liquid**: takes the shape of its container, like {{m:water|water}}, oil and milk.
- **Gas**: fills all the space and is often invisible, like {{m:oxygen|oxygen}} and water vapour.

States can change when heated or cooled. Ice [[mencair|melts]] into water, water [[menguap|evaporates]] as washing dries, and vapour condenses into droplets on a cold glass. Mothballs shrink because they [[menyublim|sublime]], going straight from solid to gas.

Try the {{lab:wujud|Particles & states}} simulation to see how particles "dance" in each state.`,
    ],
    smp: [
      `Menurut **teori partikel**, zat tersusun atas partikel (atom, ion, atau molekul) yang selalu bergerak dan saling tarik.

- Pada zat padat partikel tersusun rapat dan hanya bergetar di tempatnya.
- Pada zat cair partikel masih berdekatan tetapi bisa bergeser.
- Pada gas partikel berjauhan dan bergerak cepat ke segala arah.

Saat dipanaskan, partikel mendapat energi kinetik lebih besar. Selama zat [[mencair]] atau mendidih, suhunya tetap karena kalor dipakai untuk melawan gaya tarik antarpartikel. Perubahan wujud adalah **perubahan fisika**: zatnya tetap sama.

Zat dibedakan menjadi [[zat-tunggal]] ([[unsur]] dan [[senyawa]]) serta [[campuran]]. Campuran homogen (larutan gula, udara) tampak menyatu, campuran heterogen (pasir dalam air) tidak. Campuran dipisahkan secara fisika: penyaringan, penguapan, distilasi (penyulingan minyak atsiri seperti {{m:eugenol|minyak cengkeh}}), kromatografi, dan sublimasi.

Jenis campuran, konsentrasi, dan koloid dibahas di {{learn:larutan|Larutan, koloid & suspensi}}.`,
      `According to **particle theory**, matter is made of particles (atoms, ions or molecules) that are always moving and attract each other.

- In solids particles are packed tightly and only vibrate in place.
- In liquids they stay close but can slide past each other.
- In gases they are far apart and move fast in all directions.

Heating gives particles more kinetic energy. While a substance [[mencair|melts]] or boils its temperature stays constant, because the heat is used to overcome attractions between particles. Changes of state are **physical changes**: the substance stays the same.

Matter is either a [[zat-tunggal|pure substance]] ([[unsur|elements]] and [[senyawa|compounds]]) or a [[campuran|mixture]]. Homogeneous mixtures (sugar solution, air) look uniform; heterogeneous ones (sand in water) do not. Mixtures are separated physically: filtration, evaporation, distillation (as in extracting essential oils like {{m:eugenol|clove oil}}), chromatography and sublimation.

Types of mixture, concentration and colloids are covered in {{learn:larutan|Solutions, colloids & suspensions}}.`,
    ],
    sma: [
      `Wujud zat ditentukan oleh persaingan antara energi kinetik partikel dan [[gaya-antarmolekul]]. Zat dengan gaya tarik kuat, seperti air dengan [[ikatan-hidrogen]], memiliki [[titik-didih]] tinggi dibanding molekul seukuran seperti {{m:hydrogen-sulfide|H₂S}}.

Diagram fase menunjukkan wujud stabil pada setiap suhu dan tekanan. Titik tripel adalah kondisi ketika padat, cair, dan gas berada bersama; titik kritis adalah batas di atasnya cair dan gas tidak dapat dibedakan (fluida superkritis, dipakai untuk dekafeinasi kopi dengan {{m:carbon-dioxide|CO₂}}).

Kurva pemanasan air memiliki dua dataran: saat melebur (kalor lebur 6,01 kJ/mol) dan saat mendidih (kalor uap 40,7 kJ/mol). Titik didih turun di dataran tinggi karena tekanan udara lebih rendah, itulah sebabnya memasak di puncak gunung lebih lama.

Sifat koligatif larutan (penurunan tekanan uap, kenaikan titik didih, penurunan titik beku, tekanan osmotik) hanya bergantung pada jumlah partikel terlarut, bukan jenisnya.`,
      `The state of a substance comes from the competition between particle kinetic energy and [[gaya-antarmolekul|intermolecular forces]]. Substances with strong attractions, like water with its [[ikatan-hidrogen|hydrogen bonds]], have higher [[titik-didih|boiling points]] than similar-sized molecules such as {{m:hydrogen-sulfide|H₂S}}.

A phase diagram shows the stable state at each temperature and pressure. The triple point is where solid, liquid and gas coexist; above the critical point liquid and gas become indistinguishable (a supercritical fluid, used to decaffeinate coffee with {{m:carbon-dioxide|CO₂}}).

Water’s heating curve has two plateaus: melting (heat of fusion 6.01 kJ/mol) and boiling (heat of vaporisation 40.7 kJ/mol). Water boils at a lower temperature in the mountains because air pressure is lower, so cooking takes longer.

Colligative properties (vapour-pressure lowering, boiling-point elevation, freezing-point depression, osmotic pressure) depend only on the number of dissolved particles, not their identity.`,
    ],
    kuliah: [
      `Diagram fase merangkum keadaan setimbang zat murni. Aturan fase Gibbs, F = C − P + 2, memberi derajat kebebasan: di titik tripel air (273,16 K; 611,657 Pa) tiga fase hidup berdampingan dan F = 0. Garis padat–cair air miring ke kiri karena es lebih renggang daripada air cair, sehingga tekanan tinggi menurunkan titik leleh; hampir semua zat lain miring ke kanan. Di atas titik kritis air (sekitar 647 K dan 22,1 MPa) cair dan gas tidak dapat dibedakan lagi: fluida superkritis, pelarut hijau untuk ekstraksi.

Kemiringan setiap garis fase diberikan persamaan Clapeyron, dP/dT = ΔH/(TΔV). Keadaan metastabil juga penting: cairan dapat didinginkan di bawah titik bekunya (pendinginan super) atau dipanaskan di atas titik didihnya tanpa berubah fase, sampai ada inti kristal atau gelembung.

Selain padat, cair, gas, dan [[plasma]] ada fase antara seperti kristal cair ({{m:liquid-crystal-5cb|5CB}} pada layar LCD) yang molekulnya searah tetapi dapat mengalir, serta [[padatan-amorf|padatan amorf]] yang melunak pada suhu transisi gelas. Kemurnian zat diuji dengan titik leleh tajam; campuran meleleh dalam rentang suhu dan dapat membentuk eutektik.`,
      `A phase diagram summarises the equilibrium states of a pure substance. Gibbs’ phase rule, F = C − P + 2, gives the degrees of freedom: at water’s triple point (273.16 K; 611.657 Pa) three phases coexist and F = 0. Water’s solid–liquid line slopes left because ice is more open than liquid water, so high pressure lowers its melting point; almost every other substance slopes right. Above water’s critical point (about 647 K and 22.1 MPa) liquid and gas can no longer be told apart: a supercritical fluid, a green solvent for extraction.

The slope of each phase line is given by the Clapeyron equation, dP/dT = ΔH/(TΔV). Metastable states matter too: a liquid can be cooled below its freezing point (supercooling) or heated above its boiling point without changing phase, until a crystal seed or bubble appears.

Besides solid, liquid, gas and [[plasma]] there are intermediate phases such as liquid crystals ({{m:liquid-crystal-5cb|5CB}} in LCD screens), whose molecules line up yet can flow, and [[padatan-amorf|amorphous solids]] that soften at a glass-transition temperature. Purity is tested by a sharp melting point; mixtures melt over a range and can form eutectics.`,
    ],
  },
  points: [
    ['Tiga wujud utama: padat, cair, gas; plasma adalah wujud keempat di bintang dan petir.', 'Three main states: solid, liquid, gas; plasma is a fourth state in stars and lightning.'],
    ['Perubahan wujud adalah perubahan fisika; tidak ada zat baru yang terbentuk.', 'Changes of state are physical changes; no new substance forms.'],
    ['Suhu tetap selama melebur dan mendidih karena kalor dipakai melawan gaya antarpartikel.', 'Temperature stays constant while melting and boiling because heat overcomes particle attractions.'],
    ['Campuran dapat dipisahkan secara fisika; senyawa hanya dapat diuraikan secara kimia.', 'Mixtures separate physically; compounds only break down chemically.'],
  ],
  molecules: ['water', 'oxygen', 'carbon-dioxide', 'naphthalene', 'iodine', 'eugenol'],
  labs: ['wujud'],
  activity: {
    sd: ['Masukkan es batu ke tiga gelas: di bawah matahari, di dalam ruangan, dan di dalam kotak styrofoam. Catat mana yang paling cepat mencair dan jelaskan mengapa.', 'Put ice cubes in three cups: in the sun, indoors, and inside a foam box. Record which melts fastest and explain why.'],
    smp: ['Pisahkan campuran garam, pasir, dan serbuk besi memakai magnet, penyaringan, dan penguapan. Tulis urutan langkah dan alasannya.', 'Separate a mixture of salt, sand and iron filings using a magnet, filtration and evaporation. Write the steps and why.'],
    sma: ['Ukur suhu air yang dipanaskan setiap 30 detik hingga mendidih 3 menit. Buat grafik suhu–waktu dan jelaskan dataran pada kurva.', 'Measure the temperature of heated water every 30 s until it has boiled for 3 minutes. Plot temperature vs time and explain the plateau.'],
  },
  quiz: [
    { lv: 'kuliah', q: ["Di titik tripel air murni, derajat kebebasan menurut aturan fase Gibbs adalah…", "At the triple point of pure water, the degrees of freedom by Gibbs’ phase rule are…"], options: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]], answer: 0, explain: ["F = C − P + 2 = 1 − 3 + 2 = 0: suhu dan tekanan tertentu.", "F = C − P + 2 = 1 − 3 + 2 = 0: a fixed temperature and pressure."] },
    { lv: 'kuliah', q: ["Garis padat–cair air miring negatif karena…", "Water’s solid–liquid line slopes negatively because…"], options: [["Es lebih rapat daripada air", "Ice is denser than water"], ["Es kurang rapat daripada air cair", "Ice is less dense than liquid water"], ["Air tidak punya titik tripel", "Water has no triple point"], ["Kalor lebur air negatif", "Water’s heat of fusion is negative"]], answer: 1, explain: ["ΔV leleh negatif sehingga dP/dT = ΔH/(TΔV) negatif.", "ΔV of melting is negative, so dP/dT = ΔH/(TΔV) is negative."] },
    { lv: 'sd', q: ['Wujud zat apa yang bentuknya mengikuti wadahnya?', 'Which state takes the shape of its container?'], options: [['Padat', 'Solid'], ['Cair', 'Liquid'], ['Batu', 'Stone'], ['Kayu', 'Wood']], answer: 1, explain: ['Zat cair mengalir dan mengikuti bentuk wadah, tetapi volumenya tetap.', 'Liquids flow and take their container’s shape but keep their volume.'] },
    { lv: 'sd', q: ['Kapur barus di lemari lama-lama mengecil. Peristiwa ini disebut…', 'Mothballs in a wardrobe slowly shrink. This is called…'], options: [['Mencair', 'Melting'], ['Membeku', 'Freezing'], ['Menyublim', 'Sublimation'], ['Mengembun', 'Condensation']], answer: 2, explain: ['Kapur barus berubah langsung dari padat menjadi gas: menyublim.', 'Mothballs go straight from solid to gas: sublimation.'] },
    { lv: 'sd', q: ['Titik-titik air di luar gelas berisi es terjadi karena…', 'Droplets outside a glass of ice form because…'], options: [['Air merembes dari gelas', 'Water leaks through the glass'], ['Uap air di udara mengembun', 'Water vapour in the air condenses'], ['Es mencair ke luar', 'Ice melts outwards'], ['Gelas berkeringat', 'The glass sweats']], answer: 1, explain: ['Uap air di udara bersentuhan dengan permukaan dingin lalu berubah menjadi cair (mengembun).', 'Water vapour touches the cold surface and turns liquid (condenses).'] },
    { lv: 'smp', q: ['Mengapa suhu air tetap 100 °C selama mendidih walau terus dipanaskan?', 'Why does boiling water stay at 100 °C while heated?'], options: [['Termometernya rusak', 'The thermometer is broken'], ['Kalor dipakai untuk memutus gaya tarik antarpartikel', 'Heat is used to overcome attractions between particles'], ['Api menjadi lebih kecil', 'The flame gets smaller'], ['Air berubah menjadi zat baru', 'Water becomes a new substance']], answer: 1, explain: ['Energi dipakai untuk mengubah wujud (kalor uap), bukan menaikkan energi kinetik rata-rata.', 'The energy goes into changing state (heat of vaporisation), not into raising average kinetic energy.'] },
    { lv: 'smp', q: ['Manakah yang termasuk campuran homogen?', 'Which is a homogeneous mixture?'], options: [['Air gula', 'Sugar water'], ['Pasir dan air', 'Sand and water'], ['Es campur', 'Mixed ice dessert'], ['Minyak dan air', 'Oil and water']], answer: 0, explain: ['Gula larut sempurna sehingga campuran tampak menyatu di semua bagian.', 'Sugar dissolves completely so the mixture looks the same throughout.'] },
    { lv: 'smp', q: ['Cara terbaik memisahkan minyak atsiri dari daun serai adalah…', 'The best way to get essential oil from lemongrass leaves is…'], options: [['Penyaringan', 'Filtration'], ['Distilasi uap', 'Steam distillation'], ['Magnet', 'Magnet'], ['Pengendapan', 'Settling']], answer: 1, explain: ['Minyak atsiri menguap bersama uap air lalu diembunkan kembali dan dipisahkan.', 'The oil evaporates with steam and is condensed and separated.'] },
    { lv: 'sma', q: ['Air (Mr 18) mendidih pada 100 °C, sedangkan H₂S (Mr 34) pada −60 °C. Penyebab utamanya adalah…', 'Water (Mr 18) boils at 100 °C but H₂S (Mr 34) at −60 °C. The main reason is…'], options: [['Massa molar air lebih besar', 'Water has a larger molar mass'], ['Air memiliki ikatan hidrogen antarmolekul', 'Water forms hydrogen bonds between molecules'], ['H₂S berbentuk linear', 'H₂S is linear'], ['Ikatan O–H lebih panjang', 'The O–H bond is longer']], answer: 1, explain: ['Ikatan hidrogen O–H···O jauh lebih kuat daripada gaya dipol pada H₂S.', 'O–H···O hydrogen bonds are much stronger than the dipole forces in H₂S.'] },
    { lv: 'sma', q: ['Di puncak gunung air mendidih di bawah 100 °C karena…', 'On a mountain top water boils below 100 °C because…'], options: [['Suhu udara dingin', 'The air is cold'], ['Tekanan udara lebih rendah', 'Air pressure is lower'], ['Oksigen lebih sedikit', 'There is less oxygen'], ['Airnya lebih murni', 'The water is purer']], answer: 1, explain: ['Air mendidih saat tekanan uapnya sama dengan tekanan luar; tekanan luar lebih rendah sehingga titik didih turun.', 'Water boils when its vapour pressure equals outside pressure; lower pressure means a lower boiling point.'] },
  ],
  teacher: {
    cp: ['Fase A–D: peserta didik mengidentifikasi sifat dan perubahan wujud zat serta menjelaskannya dengan model partikel.', 'Phases A–D: learners identify properties and changes of state and explain them with the particle model.'],
    goals: [
      ['Mengelompokkan benda menurut wujudnya dan menyebutkan cirinya.', 'Sort objects by state and describe each state.'],
      ['Menjelaskan perubahan wujud dengan model partikel dan energi.', 'Explain changes of state with the particle model and energy.'],
      ['Membedakan zat tunggal dan campuran serta memilih metode pemisahan yang tepat.', 'Tell pure substances from mixtures and choose a suitable separation method.'],
    ],
    duration: ['2–3 × 35 menit (SD) · 2 × 40 menit (SMP) · 2 × 45 menit (SMA)', '2–3 × 35 min (primary) · 2 × 40 min (junior) · 2 × 45 min (senior)'],
    steps: [
      ['Pemantik: tunjukkan es batu, air, dan uap dari teko. Tanyakan: "Apakah ketiganya zat yang sama?"', 'Hook: show ice, water and steam from a kettle. Ask: "Are they the same substance?"'],
      ['Eksplorasi simulasi Partikel & wujud zat; siswa menggambar susunan partikel.', 'Explore the Particles & states simulation; learners draw particle arrangements.'],
      ['Praktikum pemisahan campuran dalam kelompok.', 'Group practical on separating mixtures.'],
      ['Refleksi dan kuis singkat Kimialoka.', 'Reflection and a short Kimialoka quiz.'],
    ],
    misconceptions: [
      ['"Gelembung air mendidih berisi udara." Sebenarnya berisi uap air.', '"Bubbles in boiling water are air." They are water vapour.'],
      ['"Gas tidak punya massa." Gas punya massa; balon berisi udara lebih berat daripada balon kempis.', '"Gases have no mass." They do; an inflated balloon weighs more than a flat one.'],
    ],
    assessment: ['Kuis Kimialoka + laporan praktikum pemisahan campuran (rubrik: prosedur, data, kesimpulan).', 'Kimialoka quiz + separation practical report (rubric: method, data, conclusion).'],
  },
  refs: ["1-2-phases-and-classification-of-matter", "1-3-physical-and-chemical-properties", "10-3-phase-transitions", "10-4-phase-diagrams"],
};
