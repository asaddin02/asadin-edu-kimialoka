export default {
  id: 'termodinamika',
  icon: 'thermometer',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Termodinamika: entropi & energi bebas', 'Thermodynamics: entropy & free energy'],
  summary: [
    'Hukum-hukum termodinamika, entropi, energi bebas Gibbs, kespontanan reaksi, dan hubungannya dengan kesetimbangan.',
    'The laws of thermodynamics, entropy, Gibbs free energy, spontaneity and the link to equilibrium.',
  ],
  body: {
    sd: [
      `Ada perubahan yang terjadi dengan sendirinya dan sulit dibalik:

- Wangi parfum menyebar ke seluruh ruangan, tetapi tidak pernah berkumpul kembali ke dalam botol.
- Gula yang sudah larut dalam teh tidak kembali menjadi butiran gula.
- Es batu di ruangan hangat mencair, tetapi air di ruangan hangat tidak membeku sendiri.
- Teh panas mendingin sampai suhunya sama dengan udara di sekitarnya.

Alam cenderung membuat energi dan partikel **menyebar** dan bercampur. Kecenderungan menyebar ini dipelajari dalam termodinamika. Untuk membalik perubahan seperti itu, misalnya membuat es di kulkas, kita harus terus memakai energi (listrik).`,
      `Some changes happen by themselves and are hard to undo:

- Perfume spreads through a room but never gathers back into the bottle.
- Sugar dissolved in tea does not turn back into grains.
- Ice melts in a warm room, but water in a warm room does not freeze by itself.
- Hot tea cools until it matches the air around it.

Nature tends to make energy and particles **spread out** and mix. This tendency is studied in thermodynamics. To reverse such a change, like making ice in a fridge, we have to keep using energy (electricity).`,
    ],
    smp: [
      `Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk: energi kimia bensin menjadi energi gerak dan panas di mesin. Ini adalah [[hukum-termodinamika|hukum pertama termodinamika]].

Namun perubahan energi punya arah. Kalor selalu mengalir sendiri dari benda panas ke benda dingin, dan setiap mesin selalu membuang sebagian energinya sebagai panas. Tidak ada mesin yang dapat mengubah seluruh panas menjadi kerja.

Proses yang dapat berlangsung sendiri tanpa terus didorong disebut **proses [[spontan]]**: besi berkarat, kayu terbakar setelah dinyalakan, gula larut. "Spontan" tidak berarti cepat; berkarat itu spontan tetapi lambat.

Para ilmuwan mengukur kecenderungan menyebar dengan besaran [[entropi]]. Gas memiliki entropi lebih besar daripada cairan, dan cairan lebih besar daripada padatan. Karena itu mencair, menguap, dan melarut biasanya menaikkan entropi.`,
      `Energy cannot be created or destroyed, only changed in form: the chemical energy of petrol becomes motion and heat in an engine. This is the [[hukum-termodinamika|first law of thermodynamics]].

But energy changes have a direction. Heat flows by itself only from hot to cold, and every engine loses some energy as heat. No engine can turn all its heat into work.

A process that can carry on by itself without a continual push is **[[spontan|spontaneous]]**: iron rusting, wood burning once lit, sugar dissolving. "Spontaneous" does not mean fast; rusting is spontaneous but slow.

Scientists measure the tendency to spread out with [[entropi|entropy]]. Gases have more entropy than liquids, and liquids more than solids. So melting, evaporating and dissolving usually raise entropy.`,
    ],
    sma: [
      `**Hukum kedua termodinamika**: pada setiap proses spontan, entropi alam semesta (sistem + lingkungan) bertambah. **Hukum ketiga**: entropi kristal sempurna pada 0 K adalah nol, sehingga entropi mutlak (S°) setiap zat dapat ditabelkan.

Arah perubahan entropi sistem (ΔS):

- Naik (ΔS > 0): padat → cair → gas, zat melarut, jumlah mol gas bertambah, suhu naik.
- Turun (ΔS < 0): gas mengembun, mol gas berkurang (misalnya {{r:haber-bosch|N₂ + 3H₂ → 2NH₃}}).

Untuk sistemnya sendiri, [[energi-bebas-gibbs|energi bebas Gibbs]] menggabungkan entalpi dan entropi: **ΔG = ΔH − TΔS**. Reaksi spontan (pada T dan P tetap) bila ΔG < 0.

| ΔH | ΔS | Kespontanan |
|---|---|---|
| − | + | Spontan pada semua suhu |
| + | − | Tidak spontan pada semua suhu |
| − | − | Spontan pada suhu rendah |
| + | + | Spontan pada suhu tinggi |

Contoh: melarutkan {{m:ammonium-nitrate|NH₄NO₃}} endotermik (ΔH > 0) tetapi spontan karena entropi naik besar. {{r:kalsinasi-kapur|Penguraian CaCO₃}} endotermik dan ΔS > 0, sehingga baru spontan pada suhu tinggi di tungku kapur.

ΔG° juga menentukan posisi kesetimbangan: ΔG° = −RT ln K. ΔG° negatif berarti K > 1 (produk dominan). Di dalam sel, reaksi yang tidak spontan dijalankan dengan dipasangkan pada hidrolisis {{m:atp|ATP}} (ΔG°′ sekitar −30,5 kJ/mol).`,
      `**The second law**: in every spontaneous process the entropy of the universe (system + surroundings) increases. **The third law**: a perfect crystal at 0 K has zero entropy, so absolute entropies (S°) of substances can be tabulated.

Direction of the system’s entropy change (ΔS):

- Up (ΔS > 0): solid → liquid → gas, dissolving, more moles of gas, rising temperature.
- Down (ΔS < 0): gases condensing, fewer moles of gas (e.g. {{r:haber-bosch|N₂ + 3H₂ → 2NH₃}}).

For the system alone, [[energi-bebas-gibbs|Gibbs free energy]] combines enthalpy and entropy: **ΔG = ΔH − TΔS**. A reaction is spontaneous (at constant T and P) when ΔG < 0.

| ΔH | ΔS | Spontaneity |
|---|---|---|
| − | + | Spontaneous at all temperatures |
| + | − | Never spontaneous |
| − | − | Spontaneous at low temperature |
| + | + | Spontaneous at high temperature |

Example: dissolving {{m:ammonium-nitrate|NH₄NO₃}} is endothermic (ΔH > 0) yet spontaneous because entropy rises a lot. {{r:kalsinasi-kapur|Decomposing CaCO₃}} is endothermic with ΔS > 0, so it only becomes spontaneous at the high temperature of a lime kiln.

ΔG° also sets the position of equilibrium: ΔG° = −RT ln K. A negative ΔG° means K > 1 (products dominate). In cells, non-spontaneous reactions are driven by coupling them to the hydrolysis of {{m:atp|ATP}} (ΔG°′ about −30.5 kJ/mol).`,
    ],
    kuliah: [
      `Entropi statistik (Boltzmann): S = k ln W, dengan W jumlah keadaan mikro yang sesuai dengan keadaan makro. Menambah volume, jumlah partikel, atau energi menambah W. Secara termodinamika klasik, dS = δq_rev/T; untuk perubahan fase pada suhu transisi ΔS = ΔH_trans/T.

Mesin kalor dibatasi hukum kedua: efisiensi Carnot η = 1 − T_dingin/T_panas. Karena itu pembangkit listrik termal selalu membuang sebagian kalor ke lingkungan.

Energi bebas dan potensial kimia: μᵢ = (∂G/∂nᵢ)_{T,P}. Untuk campuran reaksi yang belum setimbang, ΔG = ΔG° + RT ln Q; reaksi berjalan ke arah yang menurunkan G sampai Q = K (ΔG = 0). Persamaan van ’t Hoff, d ln K/dT = ΔH°/RT², menjelaskan pergeseran kesetimbangan akibat suhu; persamaan Gibbs–Helmholtz menghubungkan G dan H terhadap suhu.

Hubungan dengan elektrokimia: ΔG° = −nFE°, sehingga potensial sel standar dapat diubah menjadi tetapan kesetimbangan. Hubungan dengan kinetika: termodinamika menentukan **apakah** reaksi dapat terjadi dan seberapa jauh, sedangkan kinetika menentukan **seberapa cepat**. Intan secara termodinamika tidak stabil terhadap grafit pada kondisi kamar, tetapi perubahannya sangat lambat karena energi aktivasinya sangat besar.`,
      `Statistical entropy (Boltzmann): S = k ln W, where W is the number of microstates consistent with the macrostate. More volume, particles or energy increase W. Classically, dS = δq_rev/T; for a phase change at the transition temperature ΔS = ΔH_trans/T.

Heat engines are limited by the second law: Carnot efficiency η = 1 − T_cold/T_hot. That is why thermal power stations always reject some heat to the surroundings.

Free energy and chemical potential: μᵢ = (∂G/∂nᵢ)_{T,P}. For a reaction mixture not at equilibrium, ΔG = ΔG° + RT ln Q; the reaction moves in the direction that lowers G until Q = K (ΔG = 0). The van ’t Hoff equation, d ln K/dT = ΔH°/RT², explains how temperature shifts equilibria; the Gibbs–Helmholtz equation links G and H with temperature.

Links to electrochemistry: ΔG° = −nFE°, so a standard cell potential converts into an equilibrium constant. Links to kinetics: thermodynamics decides **whether** and how far a reaction can go; kinetics decides **how fast**. Diamond is thermodynamically unstable relative to graphite at room conditions, but the change is extremely slow because its activation energy is very high.`,
    ],
  },
  points: [
    ['Hukum pertama: energi kekal. Hukum kedua: entropi alam semesta naik pada proses spontan.', 'First law: energy is conserved. Second law: the entropy of the universe rises in spontaneous processes.'],
    ['Entropi: gas > cair > padat; melarut dan bertambahnya mol gas menaikkan entropi.', 'Entropy: gas > liquid > solid; dissolving and more gas moles raise entropy.'],
    ['ΔG = ΔH − TΔS; reaksi spontan bila ΔG < 0.', 'ΔG = ΔH − TΔS; a reaction is spontaneous when ΔG < 0.'],
    ['ΔG° = −RT ln K = −nFE°: termodinamika, kesetimbangan, dan elektrokimia saling terhubung.', 'ΔG° = −RT ln K = −nFE°: thermodynamics, equilibrium and electrochemistry are linked.'],
    ['Spontan tidak berarti cepat; kecepatan diatur kinetika.', 'Spontaneous does not mean fast; speed is a matter of kinetics.'],
  ],
  molecules: ['ammonium-nitrate', 'calcium-carbonate', 'atp', 'diamond', 'graphite'],
  labs: ['wujud', 'gas'],
  activity: {
    sd: ['Teteskan pewarna ke air lalu amati penyebarannya selama 10 menit tanpa diaduk. Dapatkah warnanya berkumpul kembali sendiri?', 'Drop food colouring into water and watch it spread for 10 minutes without stirring. Can the colour gather back by itself?'],
    smp: ['Daftarkan 10 perubahan sehari-hari lalu kelompokkan menjadi "terjadi sendiri" dan "perlu terus diberi energi". Diskusikan contoh yang spontan tetapi lambat.', 'List 10 everyday changes and sort them into "happens by itself" and "needs a constant energy supply". Discuss examples that are spontaneous but slow.'],
    sma: ['Dengan data ΔH° dan S° dari lampiran OpenStax, hitung suhu minimum agar penguraian CaCO₃ spontan, lalu bandingkan dengan suhu tungku kapur.', 'Using ΔH° and S° from the OpenStax appendix, calculate the minimum temperature for CaCO₃ decomposition to be spontaneous and compare it with lime-kiln temperatures.'],
    kuliah: ['Dari E°sel sel Daniell (+1,10 V), hitung ΔG° dan K pada 25 °C, lalu jelaskan mengapa reaksinya praktis berjalan sempurna.', 'From the Daniell cell E° (+1.10 V), calculate ΔG° and K at 25 °C and explain why the reaction goes essentially to completion.'],
  },
  quiz: [
    { lv: 'sd', q: ["Es di ruangan hangat akan…", "Ice in a warm room will…"], options: [["Mencair dengan sendirinya", "Melt by itself"], ["Bertambah besar", "Grow bigger"], ["Tetap beku selamanya", "Stay frozen forever"], ["Menjadi batu", "Turn to stone"]], answer: 0, explain: ["Panas mengalir dari udara hangat ke es sehingga es mencair.", "Heat flows from the warm air into the ice, so it melts."] },
    { lv: 'sd', q: ["Wangi parfum menyebar ke seluruh ruangan karena…", "Perfume spreads through a whole room because…"], options: [["Partikelnya bergerak dan menyebar", "Its particles move and spread out"], ["Parfum berat", "Perfume is heavy"], ["Ruangan dingin", "The room is cold"], ["Parfum mencair", "Perfume melts"]], answer: 0, explain: ["Partikel cenderung menyebar dan tidak berkumpul kembali sendiri.", "Particles tend to spread out and never gather back by themselves."] },
    { lv: 'smp', q: ['Hukum pertama termodinamika menyatakan bahwa energi…', 'The first law of thermodynamics says energy…'], options: [['Dapat diciptakan', 'Can be created'], ['Kekal: hanya berubah bentuk', 'Is conserved: it only changes form'], ['Selalu hilang', 'Is always lost'], ['Hanya berupa panas', 'Is only heat']], answer: 1, explain: ['Energi tidak dapat diciptakan atau dimusnahkan.', 'Energy cannot be created or destroyed.'] },
    { lv: 'smp', q: ['Wujud dengan entropi terbesar adalah…', 'The state with the greatest entropy is…'], options: [['Padat', 'Solid'], ['Cair', 'Liquid'], ['Gas', 'Gas'], ['Semua sama', 'All equal']], answer: 2, explain: ['Partikel gas paling bebas bergerak dan tersebar.', 'Gas particles are the freest and most spread out.'] },
    { lv: 'smp', q: ['Besi berkarat adalah proses spontan yang…', 'Iron rusting is a spontaneous process that is…'], options: [['Sangat cepat', 'Very fast'], ['Lambat', 'Slow'], ['Tidak mungkin', 'Impossible'], ['Menyerap cahaya', 'Absorbing light']], answer: 1, explain: ['Spontan tidak berarti cepat.', 'Spontaneous does not mean fast.'] },
    { lv: 'sma', q: ['Reaksi dengan ΔH < 0 dan ΔS > 0 bersifat…', 'A reaction with ΔH < 0 and ΔS > 0 is…'], options: [['Spontan pada semua suhu', 'Spontaneous at all temperatures'], ['Tidak pernah spontan', 'Never spontaneous'], ['Spontan hanya pada suhu tinggi', 'Spontaneous only at high T'], ['Spontan hanya pada suhu rendah', 'Spontaneous only at low T']], answer: 0, explain: ['ΔG = ΔH − TΔS selalu negatif.', 'ΔG = ΔH − TΔS is always negative.'] },
    { lv: 'sma', q: ['Perubahan yang menurunkan entropi sistem adalah…', 'Which change lowers the system’s entropy?'], options: [['Es mencair', 'Ice melting'], ['Garam larut', 'Salt dissolving'], ['N₂ + 3H₂ → 2NH₃', 'N₂ + 3H₂ → 2NH₃'], ['Air menguap', 'Water evaporating']], answer: 2, explain: ['Mol gas berkurang dari 4 menjadi 2.', 'Gas moles fall from 4 to 2.'] },
    { lv: 'sma', q: ['ΔG° negatif berarti tetapan kesetimbangan K…', 'A negative ΔG° means the equilibrium constant K is…'], options: [['Kurang dari 1', 'Less than 1'], ['Lebih dari 1', 'Greater than 1'], ['Sama dengan 0', 'Equal to 0'], ['Negatif', 'Negative']], answer: 1, explain: ['ΔG° = −RT ln K; ln K > 0 sehingga K > 1.', 'ΔG° = −RT ln K; ln K > 0 so K > 1.'] },
    { lv: 'sma', q: ['NH₄NO₃ larut spontan walaupun endoterm karena…', 'NH₄NO₃ dissolves spontaneously though endothermic because…'], options: [['ΔS naik cukup besar sehingga TΔS > ΔH', 'ΔS rises enough that TΔS > ΔH'], ['ΔH negatif', 'ΔH is negative'], ['Air bereaksi dengannya', 'Water reacts with it'], ['Suhunya naik', 'Its temperature rises']], answer: 0, explain: ['Kenaikan entropi mengalahkan entalpi yang positif.', 'The entropy gain outweighs the positive enthalpy.'] },
    { lv: 'kuliah', q: ['Efisiensi Carnot mesin antara 600 K dan 300 K adalah…', 'The Carnot efficiency between 600 K and 300 K is…'], options: [['25%', '25%'], ['50%', '50%'], ['75%', '75%'], ['100%', '100%']], answer: 1, explain: ['η = 1 − 300/600 = 0,5.', 'η = 1 − 300/600 = 0.5.'] },
    { lv: 'kuliah', q: ['Pada kesetimbangan kimia berlaku…', 'At chemical equilibrium…'], options: [['ΔG = ΔG°', 'ΔG = ΔG°'], ['ΔG = 0 dan Q = K', 'ΔG = 0 and Q = K'], ['ΔH = 0', 'ΔH = 0'], ['ΔS = 0', 'ΔS = 0']], answer: 1, explain: ['ΔG = ΔG° + RT ln Q = 0 ketika Q = K.', 'ΔG = ΔG° + RT ln Q = 0 when Q = K.'] },
    { lv: 'kuliah', q: ['Menurut Boltzmann, entropi bergantung pada…', 'By Boltzmann, entropy depends on…'], options: [['Warna zat', 'The substance’s colour'], ['Jumlah keadaan mikro W', 'The number of microstates W'], ['Massa molar', 'Molar mass'], ['Tekanan saja', 'Pressure only']], answer: 1, explain: ['S = k ln W.', 'S = k ln W.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan arah perubahan dengan konsep entropi dan meramalkan kespontanan reaksi dengan ΔG.', 'Phases D–F: learners explain the direction of change with entropy and predict spontaneity with ΔG.'],
    goals: [
      ['Menyatakan hukum pertama dan kedua termodinamika dengan contoh.', 'State the first and second laws with examples.'],
      ['Meramalkan tanda ΔS dari perubahan wujud dan jumlah mol gas.', 'Predict the sign of ΔS from state changes and gas moles.'],
      ['Memakai ΔG = ΔH − TΔS untuk menentukan kespontanan.', 'Use ΔG = ΔH − TΔS to judge spontaneity.'],
    ],
    duration: ['2 × 45 menit', '2 × 45 min'],
    steps: [
      ['Pemantik: pewarna yang menyebar dan es yang mencair.', 'Hook: spreading dye and melting ice.'],
      ['Diskusi arah perubahan sehari-hari dan peran energi.', 'Discuss the direction of everyday changes and the role of energy.'],
      ['Latihan tabel tanda ΔH, ΔS, dan ΔG.', 'Practice with the ΔH, ΔS and ΔG sign table.'],
      ['Studi kasus: tungku kapur, kompres dingin, dan ATP.', 'Case studies: lime kilns, cold packs and ATP.'],
    ],
    misconceptions: [
      ['"Reaksi spontan pasti cepat." Kecepatan ditentukan energi aktivasi (kinetika).', '"Spontaneous reactions are fast." Speed is set by activation energy (kinetics).'],
      ['"Reaksi endoterm tidak mungkin spontan." Bisa, bila kenaikan entropinya cukup besar.', '"Endothermic reactions cannot be spontaneous." They can, if the entropy gain is large enough.'],
      ['"Entropi hanya berarti ketidakteraturan." Lebih tepat: ukuran penyebaran energi di antara keadaan mikro.', '"Entropy just means disorder." More precisely: how energy is spread among microstates.'],
    ],
    assessment: ['Kuis Kimialoka dan tugas analisis ΔG untuk tiga reaksi industri.', 'The Kimialoka quiz and a ΔG analysis of three industrial reactions.'],
  },
  refs: ['16-1-spontaneity', '16-2-entropy', '16-3-the-second-and-third-laws-of-thermodynamics', '16-4-free-energy', '17-4-potential-free-energy-and-equilibrium'],
};
