export default {
  id: 'kuantum',
  icon: 'atom',
  levels: ['sma', 'kuliah'],
  title: ['Kimia kuantum & kimia fisik', 'Quantum & physical chemistry'],
  summary: [
    'Foton dan tingkat energi, dualitas gelombang–partikel, orbital dan bilangan kuantum, teori orbital molekul, teori kinetik gas, dan distribusi Boltzmann.',
    'Photons and energy levels, wave–particle duality, orbitals and quantum numbers, molecular orbital theory, kinetic theory of gases and the Boltzmann distribution.',
  ],
  body: {
    sd: [
      `Di dunia yang sangat-sangat kecil, alam bekerja dengan cara yang mengejutkan. Cahaya ternyata datang dalam "paket-paket" kecil energi yang disebut foton.

Elektron di dalam atom juga tidak boleh berada di sembarang tempat. Elektron hanya boleh menempati "anak tangga" energi tertentu. Bila atom dipanaskan, elektron melompat naik ke anak tangga yang lebih tinggi, lalu turun lagi sambil memancarkan cahaya berwarna. Itulah sebabnya kembang api dan lampu neon punya warna-warni yang khas.

Lampu LED, laser di pemutar musik, dan panel surya bekerja berkat perilaku elektron yang aneh namun teratur ini.`,
      `In the world of the very, very small, nature works in surprising ways. Light turns out to come in tiny "packets" of energy called photons.

Electrons in atoms cannot be just anywhere either. They may only sit on certain energy "steps". When an atom is heated, an electron jumps up to a higher step and then drops back, giving off coloured light. That is why fireworks and neon lights have their own special colours.

LED lamps, lasers and solar panels all work thanks to this strange but orderly behaviour of electrons.`,
    ],
    smp: [
      `Menurut **model Bohr**, elektron atom hidrogen hanya boleh berada pada tingkat energi tertentu (n = 1, 2, 3, …). Saat elektron turun dari tingkat tinggi ke tingkat rendah, selisih energinya dipancarkan sebagai satu foton dengan warna tertentu. Karena tingkat energinya tetap, cahaya yang dipancarkan atom membentuk garis-garis warna (spektrum garis), bukan pelangi utuh.

Energi foton sebanding dengan frekuensinya: cahaya biru dan ungu berenergi lebih besar daripada cahaya merah. Inilah dasar {{lab:nyala|uji nyala}}: tiap logam memiliki tangga energi berbeda sehingga warna nyalanya berbeda.

Teknologi yang memanfaatkannya: lampu LED (elektron turun tingkat di semikonduktor), laser, sel surya (foton menaikkan elektron sehingga arus mengalir), dan pencitraan bintang untuk mengetahui unsur penyusunnya.`,
      `In the **Bohr model**, the hydrogen atom’s electron may only occupy certain energy levels (n = 1, 2, 3, …). When it drops from a higher level to a lower one, the energy difference is emitted as one photon of a particular colour. Because the levels are fixed, the light an atom gives off forms coloured lines (a line spectrum), not a full rainbow.

A photon’s energy is proportional to its frequency: blue and violet light carry more energy than red. This is the basis of the {{lab:nyala|flame test}}: each metal has a different energy ladder, so a different flame colour.

Technologies built on it: LEDs (electrons dropping levels in a semiconductor), lasers, solar cells (photons lift electrons so a current flows), and starlight analysis to find which elements stars contain.`,
    ],
    sma: [
      `**Dualitas gelombang–partikel**: cahaya bersifat gelombang sekaligus partikel (efek fotolistrik, Einstein); elektron pun bersifat gelombang dengan panjang gelombang de Broglie λ = h/(mv). Menurut prinsip ketidakpastian Heisenberg, posisi dan momentum elektron tidak dapat diketahui tepat bersamaan, sehingga elektron digambarkan sebagai [[orbital]]: daerah peluang terbesar.

Energi elektron atom hidrogen: Eₙ = −13,6 eV/n². Loncatan dari n = 3 ke n = 2 memancarkan foton merah (656 nm) pada spektrum hidrogen.

**[[bilangan-kuantum|Bilangan kuantum]]**: n = 1, 2, 3, …; l = 0 sampai n − 1 (s, p, d, f); mₗ = −l sampai +l; mₛ = +½ atau −½. Orbital s bulat, p berbentuk halter pada sumbu x, y, z. Lihat konfigurasinya di {{lab:orbital|lab Konfigurasi elektron}}.

**[[orbital-molekul|Teori orbital molekul]]**: orbital atom bergabung menjadi orbital ikatan (energi lebih rendah) dan antiikatan (lebih tinggi). Orde ikatan = ½(elektron ikatan − elektron antiikatan): H₂ = 1, N₂ = 3, O₂ = 2. Teori ini menjelaskan mengapa {{m:oxygen|O₂}} paramagnetik (dua elektron tak berpasangan di orbital π*), hal yang tidak dapat dijelaskan struktur Lewis.

**[[teori-kinetik-gas|Teori kinetik gas]]**: partikel gas bergerak acak dan energi kinetik rata-ratanya sebanding dengan suhu mutlak; teori ini menurunkan [[hukum-gas-ideal|PV = nRT]] ({{lab:gas|lab Hukum gas}}). Pada suhu tertentu tidak semua partikel sama cepat: sebarannya mengikuti **distribusi Maxwell–Boltzmann**, yang juga menjelaskan mengapa sedikit kenaikan suhu mempercepat reaksi.`,
      `**Wave–particle duality**: light is both wave and particle (the photoelectric effect, Einstein); electrons are waves too, with de Broglie wavelength λ = h/(mv). By Heisenberg’s uncertainty principle, an electron’s position and momentum cannot both be known exactly, so electrons are described by [[orbital|orbitals]]: regions of highest probability.

Hydrogen’s electron energies: Eₙ = −13.6 eV/n². The jump from n = 3 to n = 2 emits a red photon (656 nm) in the hydrogen spectrum.

**[[bilangan-kuantum|Quantum numbers]]**: n = 1, 2, 3, …; l = 0 to n − 1 (s, p, d, f); mₗ = −l to +l; mₛ = +½ or −½. s orbitals are spherical, p orbitals dumbbells along x, y, z. See configurations in the {{lab:orbital|Electron configuration lab}}.

**[[orbital-molekul|Molecular orbital theory]]**: atomic orbitals combine into bonding (lower-energy) and antibonding (higher-energy) orbitals. Bond order = ½(bonding − antibonding electrons): H₂ = 1, N₂ = 3, O₂ = 2. It explains why {{m:oxygen|O₂}} is paramagnetic (two unpaired electrons in π* orbitals), which Lewis structures cannot.

**[[teori-kinetik-gas|Kinetic theory of gases]]**: gas particles move randomly and their average kinetic energy is proportional to absolute temperature; the theory derives [[hukum-gas-ideal|PV = nRT]] (the {{lab:gas|Gas laws lab}}). At a given temperature not all particles move equally fast: their spread follows the **Maxwell–Boltzmann distribution**, which also explains why a small temperature rise speeds reactions up.`,
    ],
    kuliah: [
      `**[[persamaan-schrodinger|Persamaan Schrödinger]]** Ĥψ = Eψ. Contoh terpecahkan: partikel dalam kotak satu dimensi, Eₙ = n²h²/(8mL²), model sederhana untuk warna molekul terkonjugasi (kotak makin panjang, celah energi makin kecil); osilator harmonik untuk getaran molekul (tingkat energi berjarak sama, dasar spektroskopi IR); dan atom hidrogen, ψₙₗₘ = Rₙₗ(r)Yₗᵐ(θ,φ).

Untuk atom dan molekul berelektron banyak dipakai pendekatan: Born–Oppenheimer (inti dianggap diam), metode Hartree–Fock (tiap elektron dalam medan rata-rata elektron lain), dan teori fungsional kerapatan (DFT) yang kini menjadi alat utama [[kimia-kuantum|kimia komputasi]] untuk meramalkan struktur, energi reaksi, dan spektrum. Teori Hückel memperkirakan orbital π benzena dan menjelaskan kestabilan aromatik (4n + 2 elektron π).

**Diagram orbital molekul diatomik periode 2**: untuk B₂, C₂, dan N₂, orbital π₂p lebih rendah dari σ₂p (karena percampuran s–p), sedangkan untuk O₂ dan F₂ urutannya terbalik; diagram ini meramalkan orde ikatan dan sifat magnetik dengan tepat.

**[[mekanika-statistik|Mekanika statistik]]** menghubungkan molekul dengan termodinamika. Populasi tingkat energi mengikuti distribusi Boltzmann, Nᵢ/N = e^(−Eᵢ/kT)/q, dengan fungsi partisi q = Σ e^(−Eᵢ/kT). Dari q diperoleh energi dalam, entropi (S = k ln W), dan tetapan kesetimbangan. Teorema ekuipartisi memberi ½kT per derajat kebebasan kuadratik, dan fraksi tumbukan berenergi ≥ Eₐ, e^(−Eₐ/RT), muncul langsung dalam [[persamaan-arrhenius|persamaan Arrhenius]].`,
      `**The [[persamaan-schrodinger|Schrödinger equation]]** Ĥψ = Eψ. Solved examples: the particle in a one-dimensional box, Eₙ = n²h²/(8mL²), a simple model for the colour of conjugated molecules (a longer box gives a smaller gap); the harmonic oscillator for molecular vibrations (evenly spaced levels, the basis of IR spectroscopy); and the hydrogen atom, ψₙₗₘ = Rₙₗ(r)Yₗᵐ(θ,φ).

Many-electron atoms and molecules need approximations: Born–Oppenheimer (nuclei treated as fixed), Hartree–Fock (each electron in the average field of the others), and density functional theory (DFT), now the workhorse of [[kimia-kuantum|computational chemistry]] for predicting structures, reaction energies and spectra. Hückel theory estimates benzene’s π orbitals and explains aromatic stability (4n + 2 π electrons).

**MO diagrams of period-2 diatomics**: for B₂, C₂ and N₂ the π₂p orbitals lie below σ₂p (because of s–p mixing), while for O₂ and F₂ the order is reversed; the diagrams correctly predict bond orders and magnetism.

**[[mekanika-statistik|Statistical mechanics]]** links molecules to thermodynamics. Energy-level populations follow the Boltzmann distribution, Nᵢ/N = e^(−Eᵢ/kT)/q, with the partition function q = Σ e^(−Eᵢ/kT). From q come the internal energy, entropy (S = k ln W) and equilibrium constants. The equipartition theorem gives ½kT per quadratic degree of freedom, and the fraction of collisions with energy ≥ Eₐ, e^(−Eₐ/RT), appears directly in the [[persamaan-arrhenius|Arrhenius equation]].`,
    ],
  },
  points: [
    ['Energi atom terkuantisasi; loncatan elektron memancarkan atau menyerap foton E = hν.', 'Atomic energies are quantised; electron jumps emit or absorb photons E = hν.'],
    ['Elektron bersifat gelombang; posisinya digambarkan sebagai orbital (peluang).', 'Electrons behave as waves; their position is described by orbitals (probability).'],
    ['Empat bilangan kuantum n, l, mₗ, mₛ menggambarkan setiap elektron.', 'Four quantum numbers n, l, mₗ, mₛ describe every electron.'],
    ['Orde ikatan MO = ½(ikatan − antiikatan); O₂ paramagnetik.', 'MO bond order = ½(bonding − antibonding); O₂ is paramagnetic.'],
    ['Energi kinetik rata-rata gas ∝ T; sebaran energi mengikuti distribusi Boltzmann.', 'Average gas kinetic energy ∝ T; energies spread per the Boltzmann distribution.'],
  ],
  molecules: ['hydrogen', 'oxygen', 'nitrogen', 'benzene', 'beta-carotene'],
  labs: ['orbital', 'nyala', 'gas'],
  activity: {
    sd: ['Amati lampu hias atau layar melalui kisi difraksi sederhana (atau sisi CD). Gambar warna-warna yang terlihat dari lampu yang berbeda.', 'Look at different lamps or screens through a simple diffraction grating (or the side of a CD). Draw the colours each one shows.'],
    smp: ['Di lab Uji nyala, catat warna lima logam dan urutkan dari energi foton terendah ke tertinggi.', 'In the Flame test lab, record the colours of five metals and rank them from lowest to highest photon energy.'],
    sma: ['Hitung panjang gelombang foton saat elektron hidrogen turun dari n = 3, 4, 5, dan 6 ke n = 2 dengan Eₙ = −13,6 eV/n², lalu cocokkan dengan warna garis Balmer.', 'Calculate photon wavelengths for hydrogen electrons dropping from n = 3, 4, 5 and 6 to n = 2 with Eₙ = −13.6 eV/n², and match them to the Balmer line colours.'],
    kuliah: ['Gambar diagram MO untuk N₂, O₂, dan O₂⁺, tentukan orde ikatan dan sifat magnetiknya, lalu hubungkan dengan panjang dan energi ikatan.', 'Draw MO diagrams for N₂, O₂ and O₂⁺, find their bond orders and magnetism, and relate them to bond lengths and energies.'],
  },
  quiz: [
    { lv: 'sd', q: ["Lampu LED menyala karena…", "An LED lights up because…"], options: [["Elektron melompat turun dan memancarkan cahaya", "Electrons drop down and give off light"], ["Ada api di dalamnya", "There is a flame inside"], ["Lampu memantulkan cahaya", "The lamp reflects light"], ["Lampu berisi air", "The lamp contains water"]], answer: 0, explain: ["Di semikonduktor, elektron turun tingkat energi dan melepaskan foton.", "In a semiconductor, electrons drop energy levels and release photons."] },
    { lv: 'sd', q: ['Kembang api berwarna-warni karena…', 'Fireworks are colourful because…'], options: [['Elektron atom yang panas melompat lalu memancarkan cahaya', 'Hot atoms’ electrons jump and give off light'], ['Dicat warna', 'They are painted'], ['Memantulkan cahaya bulan', 'They reflect moonlight'], ['Mengandung air', 'They contain water']], answer: 0, explain: ['Tiap logam memancarkan warna khas saat elektronnya turun tingkat energi.', 'Each metal gives its own colour as its electrons drop energy levels.'] },
    { lv: 'smp', q: ['Menurut model Bohr, atom memancarkan cahaya saat elektron…', 'In the Bohr model, an atom gives off light when an electron…'], options: [['Turun ke tingkat energi lebih rendah', 'Drops to a lower energy level'], ['Keluar dari inti', 'Leaves the nucleus'], ['Berhenti bergerak', 'Stops moving'], ['Menjadi proton', 'Becomes a proton']], answer: 0, explain: ['Selisih energi dilepas sebagai satu foton.', 'The energy difference is released as one photon.'] },
    { lv: 'smp', q: ['Cahaya dengan energi foton lebih besar adalah…', 'Which light has more energetic photons?'], options: [['Merah', 'Red'], ['Ungu', 'Violet'], ['Inframerah', 'Infrared'], ['Gelombang radio', 'Radio waves']], answer: 1, explain: ['Frekuensi lebih tinggi berarti energi lebih besar.', 'Higher frequency means higher energy.'] },
    { lv: 'sma', q: ['Untuk n = 2, nilai l yang mungkin adalah…', 'For n = 2, the allowed l values are…'], options: [['0', '0'], ['0 dan 1', '0 and 1'], ['1 dan 2', '1 and 2'], ['0, 1, dan 2', '0, 1 and 2']], answer: 1, explain: ['l = 0 sampai n − 1: subkulit 2s dan 2p.', 'l = 0 to n − 1: the 2s and 2p subshells.'] },
    { lv: 'sma', q: ['Orde ikatan N₂ menurut teori orbital molekul adalah…', 'The MO bond order of N₂ is…'], options: [['1', '1'], ['2', '2'], ['3', '3'], ['0', '0']], answer: 2, explain: ['½(8 − 2) = 3, sesuai ikatan rangkap tiga.', '½(8 − 2) = 3, matching a triple bond.'] },
    { lv: 'sma', q: ['O₂ bersifat paramagnetik karena…', 'O₂ is paramagnetic because…'], options: [['Memiliki dua elektron tak berpasangan di orbital π*', 'It has two unpaired electrons in π* orbitals'], ['Semua elektronnya berpasangan', 'All its electrons are paired'], ['Bermuatan listrik', 'It is charged'], ['Berwujud gas', 'It is a gas']], answer: 0, explain: ['Diagram MO menempatkan dua elektron sendiri-sendiri di dua orbital π*.', 'The MO diagram places two single electrons in two π* orbitals.'] },
    { lv: 'sma', q: ['Menurut teori kinetik gas, energi kinetik rata-rata partikel sebanding dengan…', 'By kinetic theory, the average kinetic energy of gas particles is proportional to…'], options: [['Tekanan', 'Pressure'], ['Suhu mutlak', 'Absolute temperature'], ['Volume', 'Volume'], ['Massa molar', 'Molar mass']], answer: 1, explain: ['Eₖ rata-rata = (3/2)kT per partikel.', 'Average Eₖ = (3/2)kT per particle.'] },
    { lv: 'kuliah', q: ['Untuk partikel dalam kotak, bila panjang kotak L bertambah, selisih tingkat energi…', 'For a particle in a box, as the box length L increases the energy spacing…'], options: [['Membesar', 'Grows'], ['Mengecil', 'Shrinks'], ['Tetap', 'Stays the same'], ['Menjadi negatif', 'Becomes negative']], answer: 1, explain: ['Eₙ ∝ 1/L²; itulah sebabnya polien panjang menyerap cahaya tampak.', 'Eₙ ∝ 1/L²; that is why long polyenes absorb visible light.'] },
    { lv: 'kuliah', q: ['Pada N₂, orbital π₂p berada di bawah σ₂p karena…', 'In N₂, π₂p lies below σ₂p because of…'], options: [['Percampuran s–p', 's–p mixing'], ['Efek relativistik', 'Relativistic effects'], ['Ikatan hidrogen', 'Hydrogen bonding'], ['Hibridisasi sp³d', 'sp³d hybridisation']], answer: 0, explain: ['Interaksi orbital 2s dan 2p menaikkan σ₂p pada unsur awal periode 2.', 'Interaction between 2s and 2p raises σ₂p for the early period-2 elements.'] },
    { lv: 'kuliah', q: ['Fungsi partisi q digunakan untuk menghitung…', 'The partition function q is used to calculate…'], options: [['Hanya warna', 'Only colour'], ['Besaran termodinamika dari tingkat energi molekul', 'Thermodynamic quantities from molecular energy levels'], ['Hanya massa', 'Only mass'], ['Titik leleh saja', 'Only melting points']], answer: 1, explain: ['Energi dalam, entropi, dan K dapat diturunkan dari q.', 'Internal energy, entropy and K can be derived from q.'] },
  ],
  teacher: {
    cp: ['Fase F dan kuliah: peserta didik menjelaskan kuantisasi energi, orbital, dan teori orbital molekul, serta menghubungkan perilaku molekul dengan sifat gas dan laju reaksi.', 'Phase F and university: learners explain energy quantisation, orbitals and molecular orbital theory, and link molecular behaviour to gas properties and reaction rates.'],
    goals: [
      ['Menjelaskan spektrum garis dengan tingkat energi terkuantisasi.', 'Explain line spectra with quantised energy levels.'],
      ['Menentukan bilangan kuantum dan orde ikatan MO.', 'Assign quantum numbers and MO bond orders.'],
      ['Mengaitkan distribusi Boltzmann dengan suhu dan laju reaksi.', 'Relate the Boltzmann distribution to temperature and reaction rate.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Pemantik: warna kembang api dan lampu jalan natrium.', 'Hook: firework colours and sodium street lamps.'],
      ['Lab virtual uji nyala dan konfigurasi elektron.', 'Virtual flame-test and electron-configuration labs.'],
      ['Latihan diagram orbital molekul O₂ dan N₂.', 'Practice with O₂ and N₂ molecular orbital diagrams.'],
      ['Diskusi: mengapa sedikit kenaikan suhu mempercepat reaksi (distribusi Boltzmann).', 'Discussion: why a small temperature rise speeds reactions (Boltzmann distribution).'],
    ],
    misconceptions: [
      ['"Orbital adalah lintasan elektron seperti orbit planet." Orbital adalah daerah peluang, bukan lintasan.', '"An orbital is a planet-like path." It is a region of probability, not a path.'],
      ['"Semua partikel gas bergerak sama cepat." Kecepatannya tersebar menurut distribusi Maxwell–Boltzmann.', '"All gas particles move equally fast." Their speeds spread per the Maxwell–Boltzmann distribution.'],
      ['"Struktur Lewis selalu benar." Struktur Lewis O₂ tidak menjelaskan sifat paramagnetiknya; teori MO bisa.', '"Lewis structures are always right." O₂’s Lewis structure misses its paramagnetism; MO theory explains it.'],
    ],
    assessment: ['Kuis Kimialoka, perhitungan garis Balmer, dan tugas diagram MO.', 'The Kimialoka quiz, Balmer-line calculations and an MO-diagram task.'],
  },
  refs: ['6-1-electromagnetic-energy', '6-2-the-bohr-model', '6-3-development-of-quantum-theory', '8-4-molecular-orbital-theory', '9-5-the-kinetic-molecular-theory'],
};
