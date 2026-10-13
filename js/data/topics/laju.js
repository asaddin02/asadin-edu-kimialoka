export default {
  id: 'laju',
  icon: 'clock',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Laju reaksi dan kesetimbangan', 'Reaction rates and equilibrium'],
  summary: [
    'Teori tumbukan, faktor yang mempercepat reaksi, katalis dan enzim, serta kesetimbangan dinamis dan asas Le Chatelier.',
    'Collision theory, what speeds reactions up, catalysts and enzymes, and dynamic equilibrium with Le Chatelier’s principle.',
  ],
  body: {
    sd: [
      `Ada reaksi yang sangat cepat dan ada yang lambat sekali. Soda kue dan cuka langsung berbuih, kembang api menyala dalam sekejap, sedangkan besi berkarat dan buah membusuk perlahan-lahan selama berhari-hari.

Kita bisa membuat reaksi lebih cepat atau lebih lambat:

- **Suhu**: makanan di kulkas lebih awet karena dingin memperlambat pembusukan. Teh manis lebih cepat larut gulanya di air panas.
- **Ukuran butiran**: gula halus lebih cepat larut daripada gula batu.
- **Bantuan khusus**: air liur mengandung [[enzim]] yang mempercepat pencernaan nasi menjadi gula. Kunyah nasi lama-lama, rasanya jadi agak manis!

Seberapa cepat reaksi berlangsung disebut [[laju-reaksi|laju reaksi]].`,
      `Some reactions are very fast and some are very slow. Baking soda and vinegar fizz at once and fireworks flash in an instant, while iron rusts and fruit rots slowly over days.

We can make reactions faster or slower:

- **Temperature**: food keeps longer in the fridge because cold slows spoiling. Sugar dissolves faster in hot tea.
- **Grain size**: caster sugar dissolves faster than sugar cubes.
- **Special helpers**: saliva contains an [[enzim|enzyme]] that speeds up turning rice into sugar. Chew rice for a long time and it starts to taste a little sweet!

How fast a reaction goes is its [[laju-reaksi|reaction rate]].`,
    ],
    smp: [
      `Mengapa makanan di kulkas lebih awet? Karena [[laju-reaksi|laju reaksi]] pembusukan melambat pada suhu rendah. Reaksi terjadi saat partikel bertumbukan dengan energi cukup. Empat hal mempercepat reaksi:

- **Suhu** lebih tinggi: partikel bergerak lebih cepat.
- **Konsentrasi** lebih besar: tumbukan lebih sering.
- **Luas permukaan** lebih besar: gula halus larut lebih cepat daripada gula batu.
- **[[katalis|Katalis]]**: mempercepat reaksi tanpa ikut habis. Di tubuh, katalis disebut [[enzim]], misalnya amilase di ludah.

Coba atur suhu dan konsentrasi di {{lab:laju|lab Laju reaksi}}.`,
      `Why does food last longer in the fridge? Because the [[laju-reaksi|rate]] of spoiling reactions drops at low temperature. Reactions happen when particles collide with enough energy. Four things speed them up:

- Higher **temperature**: particles move faster.
- Higher **concentration**: more frequent collisions.
- Larger **surface area**: powdered sugar dissolves faster than sugar cubes.
- **[[katalis|Catalysts]]**: speed reactions without being used up. In the body they are [[enzim|enzymes]], like amylase in saliva.

Adjust temperature and concentration in the {{lab:laju|Reaction rate lab}}.`,
    ],
    sma: [
      `Menurut teori tumbukan, hanya tumbukan dengan orientasi tepat dan energi ≥ [[energi-aktivasi]] (Eₐ) yang menghasilkan reaksi. Kenaikan suhu 10 °C sering melipatduakan laju karena fraksi partikel berenergi tinggi meningkat tajam (distribusi Maxwell–Boltzmann). Katalis menyediakan jalur dengan Eₐ lebih rendah.

Hukum laju: v = k[A]ᵐ[B]ⁿ, dengan m dan n (orde reaksi) ditentukan dari percobaan, bukan dari koefisien. Contoh klasik: {{m:sodium-thiosulfate|natrium tiosulfat}} + HCl membentuk endapan belerang; waktu hilangnya tanda silang mengukur laju.

Banyak reaksi dapat balik. Saat laju maju sama dengan laju balik tercapai [[kesetimbangan-kimia|kesetimbangan dinamis]]: Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ. Menurut [[le-chatelier|asas Le Chatelier]], sistem bergeser untuk melawan gangguan:

- Tambah reaktan → bergeser ke produk.
- Tekanan naik → bergeser ke sisi dengan mol gas lebih sedikit.
- Suhu naik → bergeser ke arah endoterm.

Proses Haber–Bosch pembuatan {{m:ammonia|amonia}} (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ) memakai tekanan tinggi (~200 atm), suhu kompromi (~450 °C), dan katalis besi.

Kesetimbangan dibahas lengkap di {{learn:kesetimbangan|Kesetimbangan kimia}}.`,
      `By collision theory, only collisions with the right orientation and energy ≥ the [[energi-aktivasi|activation energy]] (Eₐ) react. A 10 °C rise often doubles the rate because the fraction of energetic particles grows sharply (Maxwell–Boltzmann distribution). Catalysts offer a lower-Eₐ pathway.

The rate law v = k[A]ᵐ[B]ⁿ has orders m and n found by experiment, not from coefficients. A classic example: {{m:sodium-thiosulfate|sodium thiosulfate}} + HCl forms a sulfur precipitate; the time for a cross to vanish measures the rate.

Many reactions are reversible. When forward and reverse rates are equal, [[kesetimbangan-kimia|dynamic equilibrium]] is reached: Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ. By [[le-chatelier|Le Chatelier’s principle]] the system shifts to oppose a change:

- Add reactant → shifts towards products.
- Raise pressure → shifts to the side with fewer gas moles.
- Raise temperature → shifts in the endothermic direction.

The Haber–Bosch process for {{m:ammonia|ammonia}} (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ) uses high pressure (~200 atm), a compromise temperature (~450 °C) and an iron catalyst.

Equilibrium is treated fully in {{learn:kesetimbangan|Chemical equilibrium}}.`,
    ],
    kuliah: [
      `Persamaan Arrhenius k = A·e^(−Eₐ/RT) menghubungkan tetapan laju dengan suhu; plot ln k terhadap 1/T memberi Eₐ. Teori keadaan transisi (Eyring) menafsirkan A melalui entalpi dan entropi aktivasi.

Hukum laju terintegrasi: orde nol [A] = [A]₀ − kt; orde satu ln[A] = ln[A]₀ − kt dengan waktu paruh t½ = 0,693/k (peluruhan radioaktif, eliminasi obat); orde dua 1/[A] = 1/[A]₀ + kt. Mekanisme reaksi terdiri atas tahap elementer; tahap paling lambat menentukan laju, dan pendekatan keadaan tunak dipakai untuk zat antara.

Enzim mengikuti kinetika Michaelis–Menten: v = Vmax[S]/(Km + [S]). Inhibitor kompetitif meningkatkan Km, nonkompetitif menurunkan Vmax. Banyak obat, seperti {{m:aspirin|aspirin}} dan {{m:simvastatin|simvastatin}}, adalah inhibitor enzim.

Hubungan K dengan ΔG° (ΔG° = −RT ln K) dan persamaan van ’t Hoff (d ln K/dT = ΔH°/RT²) menjelaskan pergeseran kesetimbangan terhadap suhu secara kuantitatif.`,
      `The Arrhenius equation k = A·e^(−Eₐ/RT) links rate constants to temperature; a plot of ln k vs 1/T gives Eₐ. Transition-state (Eyring) theory interprets A through the enthalpy and entropy of activation.

Integrated rate laws: zero order [A] = [A]₀ − kt; first order ln[A] = ln[A]₀ − kt with half-life t½ = 0.693/k (radioactive decay, drug elimination); second order 1/[A] = 1/[A]₀ + kt. Mechanisms consist of elementary steps; the slowest step controls the rate, and the steady-state approximation treats intermediates.

Enzymes follow Michaelis–Menten kinetics: v = Vmax[S]/(Km + [S]). Competitive inhibitors raise Km; non-competitive ones lower Vmax. Many drugs, such as {{m:aspirin|aspirin}} and {{m:simvastatin|simvastatin}}, are enzyme inhibitors.

K relates to ΔG° (ΔG° = −RT ln K) and the van ’t Hoff equation (d ln K/dT = ΔH°/RT²) quantifies how equilibria shift with temperature.`,
    ],
  },
  points: [
    ['Reaksi butuh tumbukan dengan energi ≥ energi aktivasi dan orientasi tepat.', 'Reactions need collisions with energy ≥ activation energy and the right orientation.'],
    ['Suhu, konsentrasi, luas permukaan, dan katalis mempercepat reaksi.', 'Temperature, concentration, surface area and catalysts speed reactions.'],
    ['Kesetimbangan bersifat dinamis; Le Chatelier meramalkan arah pergeseran.', 'Equilibrium is dynamic; Le Chatelier predicts the shift.'],
  ],
  molecules: ['sodium-thiosulfate', 'hydrogen-peroxide', 'ammonia', 'nitrogen-dioxide'],
  labs: ['laju', 'gas'],
  activity: {
    sd: ["Larutkan gula batu dan gula pasir dalam air dingin dan air hangat. Catat mana yang paling cepat habis larut.", "Dissolve a sugar cube and granulated sugar in cold and warm water. Note which disappears fastest."],
    smp: ['Larutkan tablet vitamin C effervescent dalam air dingin, air suhu ruang, dan air hangat. Catat waktunya sampai buih berhenti.', 'Dissolve effervescent vitamin C tablets in cold, room-temperature and warm water. Time how long the fizzing lasts.'],
    sma: ['Percobaan tanda silang: tiosulfat + HCl pada lima konsentrasi. Buat grafik 1/waktu terhadap konsentrasi untuk menentukan orde reaksi.', 'Disappearing-cross experiment: thiosulfate + HCl at five concentrations. Plot 1/time vs concentration to find the order.'],
    kuliah: ['Tentukan Eₐ dekomposisi H₂O₂ berkatalis KI dari laju pada 4 suhu (plot Arrhenius).', 'Find Eₐ for KI-catalysed H₂O₂ decomposition from rates at 4 temperatures (Arrhenius plot).'],
  },
  quiz: [
    { lv: 'sd', q: ["Makanan lebih awet di kulkas karena…", "Food keeps longer in the fridge because…"], options: [["Dingin memperlambat pembusukan", "Cold slows spoiling"], ["Kulkas gelap", "The fridge is dark"], ["Kulkas berbau", "The fridge smells"], ["Makanan menjadi keras", "The food gets hard"]], answer: 0, explain: ["Suhu rendah memperlambat reaksi, termasuk kerja kuman.", "Low temperature slows reactions, including germs’ activity."] },
    { lv: 'sd', q: ["Gula pasir lebih cepat larut daripada gula batu karena…", "Granulated sugar dissolves faster than a sugar cube because…"], options: [["Butirannya kecil sehingga permukaannya luas", "Its small grains have a larger surface"], ["Lebih manis", "It is sweeter"], ["Lebih berat", "It is heavier"], ["Berwarna putih", "It is white"]], answer: 0, explain: ["Permukaan yang luas mempercepat pelarutan.", "A larger surface speeds up dissolving."] },
    { lv: 'smp', q: ['Mengapa makanan lebih awet di kulkas?', 'Why does food last longer in the fridge?'], options: [['Kulkas membunuh kuman', 'The fridge kills germs'], ['Suhu rendah memperlambat reaksi pembusukan', 'Low temperature slows spoiling reactions'], ['Kulkas menambah oksigen', 'The fridge adds oxygen'], ['Makanan menjadi kering', 'Food dries out']], answer: 1, explain: ['Partikel bergerak lebih lambat sehingga tumbukan efektif lebih jarang.', 'Particles move slower, so effective collisions are rarer.'] },
    { lv: 'smp', q: ['Enzim di dalam tubuh berfungsi sebagai…', 'Enzymes in the body act as…'], options: [['Bahan bakar', 'Fuel'], ['Katalis', 'Catalysts'], ['Pelarut', 'Solvents'], ['Indikator', 'Indicators']], answer: 1, explain: ['Enzim adalah katalis hayati yang mempercepat reaksi tanpa habis.', 'Enzymes are biological catalysts that speed reactions without being used up.'] },
    { lv: 'smp', q: ['Gula halus lebih cepat larut daripada gula batu karena…', 'Caster sugar dissolves faster than sugar cubes because…'], options: [['Lebih manis', 'It is sweeter'], ['Luas permukaannya lebih besar', 'It has a larger surface area'], ['Lebih berat', 'It is heavier'], ['Lebih dingin', 'It is colder']], answer: 1, explain: ['Butiran kecil memberi lebih banyak permukaan untuk bertumbukan dengan air.', 'Small grains give more surface for water to hit.'] },
    { lv: 'sma', q: ['Katalis mempercepat reaksi dengan cara…', 'A catalyst speeds up a reaction by…'], options: [['Menaikkan suhu', 'Raising the temperature'], ['Menurunkan energi aktivasi', 'Lowering the activation energy'], ['Menambah konsentrasi', 'Increasing concentration'], ['Mengubah ΔH', 'Changing ΔH']], answer: 1, explain: ['Katalis memberi jalur reaksi lain dengan Eₐ lebih rendah; ΔH tidak berubah.', 'It offers another path with lower Eₐ; ΔH is unchanged.'] },
    { lv: 'sma', q: ['Pada N₂ + 3H₂ ⇌ 2NH₃, tekanan dinaikkan. Kesetimbangan bergeser ke…', 'For N₂ + 3H₂ ⇌ 2NH₃, raising pressure shifts equilibrium to…'], options: [['Kiri', 'The left'], ['Kanan', 'The right'], ['Tidak bergeser', 'No shift'], ['Kedua arah', 'Both ways']], answer: 1, explain: ['Sisi kanan memiliki mol gas lebih sedikit (2 dibanding 4).', 'The right side has fewer gas moles (2 vs 4).'] },
    { lv: 'sma', q: ['Pada reaksi eksoterm, suhu dinaikkan. Nilai K akan…', 'For an exothermic reaction, raising temperature makes K…'], options: [['Naik', 'Increase'], ['Turun', 'Decrease'], ['Tetap', 'Stay the same'], ['Nol', 'Become zero']], answer: 1, explain: ['Kesetimbangan bergeser ke arah endoterm (reaktan) sehingga K mengecil.', 'Equilibrium shifts towards the endothermic side (reactants), so K falls.'] },
    { lv: 'kuliah', q: ['Waktu paruh reaksi orde satu dengan k = 0,0693 s⁻¹ adalah…', 'The half-life of a first-order reaction with k = 0.0693 s⁻¹ is…'], options: [['1 s', '1 s'], ['10 s', '10 s'], ['69,3 s', '69.3 s'], ['100 s', '100 s']], answer: 1, explain: ['t½ = 0,693/k = 0,693/0,0693 = 10 s.', 't½ = 0.693/k = 0.693/0.0693 = 10 s.'] },
    { lv: 'kuliah', q: ['Inhibitor kompetitif enzim akan…', 'A competitive enzyme inhibitor…'], options: [['Menaikkan Km, Vmax tetap', 'Raises Km, leaves Vmax'], ['Menurunkan Vmax, Km tetap', 'Lowers Vmax, leaves Km'], ['Menurunkan keduanya', 'Lowers both'], ['Tidak berpengaruh', 'Has no effect']], answer: 0, explain: ['Inhibitor bersaing di sisi aktif; substrat berlebih tetap dapat mencapai Vmax.', 'It competes for the active site; excess substrate still reaches Vmax.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan faktor laju reaksi dengan teori tumbukan serta menerapkan asas Le Chatelier.', 'Phases D–F: learners explain rate factors with collision theory and apply Le Chatelier’s principle.'],
    goals: [
      ['Menjelaskan pengaruh suhu, konsentrasi, luas permukaan, dan katalis.', 'Explain the effects of temperature, concentration, surface area and catalysts.'],
      ['Meramalkan arah pergeseran kesetimbangan.', 'Predict the direction of equilibrium shifts.'],
    ],
    duration: ['5 × 45 menit', '5 × 45 min'],
    steps: [
      ['Demonstrasi tablet effervescent pada tiga suhu air.', 'Demo effervescent tablets at three water temperatures.'],
      ['Simulasi tumbukan di lab Laju reaksi; siswa mencatat jumlah tumbukan efektif.', 'Collision simulation in the Reaction rate lab; learners count effective collisions.'],
      ['Diskusi industri: proses Haber–Bosch dan pabrik pupuk di Indonesia.', 'Industry discussion: Haber–Bosch and Indonesian fertiliser plants.'],
    ],
    misconceptions: [['"Saat setimbang reaksi berhenti." Reaksi terus berjalan ke dua arah dengan laju sama.', '"At equilibrium the reaction stops." Both directions continue at equal rates.']],
    assessment: ['Kuis Kimialoka dan laporan percobaan laju.', 'Kimialoka quiz and a rate experiment report.'],
  },
  refs: ["12-1-chemical-reaction-rates", "12-2-factors-affecting-reaction-rates", "12-3-rate-laws", "12-5-collision-theory", "12-7-catalysis"],
};
