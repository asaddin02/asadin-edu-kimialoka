export default {
  id: 'atom',
  icon: 'atom',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Atom dan strukturnya', 'Atoms and their structure'],
  summary: [
    'Dari "butiran terkecil" Demokritus sampai orbital kuantum: proton, neutron, elektron, isotop, dan konfigurasi elektron.',
    'From Democritus’s "smallest grains" to quantum orbitals: protons, neutrons, electrons, isotopes and electron configuration.',
  ],
  body: {
    sd: [
      `Kalau sebutir garam kamu bagi terus-menerus, lama-lama kamu sampai pada butiran super kecil yang disebut [[atom]]. Atom sangat kecil: sehelai rambut setebal kira-kira satu juta atom!

Atom punya bagian tengah yang disebut **inti**, dan di sekelilingnya bergerak [[elektron]]. Setiap jenis atom disebut [[unsur]]. Ada 118 unsur, misalnya hidrogen, oksigen, besi, dan emas. Semuanya tersusun rapi di {{lab:orbital|lab atom}} dan [[tabel-periodik]].

Atom-atom bisa bergandengan membentuk [[molekul]]. Satu molekul {{m:water|air}} terdiri atas 2 atom hidrogen dan 1 atom oksigen.`,
      `If you kept cutting a grain of salt, you would eventually reach super-tiny pieces called [[atom|atoms]]. Atoms are so small that a single hair is about a million atoms thick!

An atom has a centre called the **nucleus**, and [[elektron|electrons]] move around it. Each kind of atom is an [[unsur|element]]. There are 118 elements, such as hydrogen, oxygen, iron and gold, all neatly arranged in the [[tabel-periodik|periodic table]].

Atoms can join to form [[molekul|molecules]]. One {{m:water|water}} molecule is made of 2 hydrogen atoms and 1 oxygen atom.`,
    ],
    smp: [
      `Atom tersusun atas tiga partikel subatom:

- [[proton|Proton]] (muatan +1) dan [[neutron]] (netral) berada di inti yang sangat kecil tetapi hampir memuat seluruh massa atom.
- [[elektron|Elektron]] (muatan −1, massanya sekitar 1/1836 proton) bergerak di [[kulit-elektron|kulit]] sekitar inti.

[[nomor-atom|Nomor atom]] (Z) adalah jumlah proton dan menentukan jenis unsur. [[nomor-massa|Nomor massa]] (A) adalah jumlah proton dan neutron. Atom netral memiliki jumlah elektron sama dengan jumlah proton. Atom yang melepas atau menerima elektron menjadi [[ion]].

[[isotop|Isotop]] adalah atom unsur sama dengan jumlah neutron berbeda, misalnya karbon-12 dan karbon-14 (dipakai untuk menentukan umur fosil).

Elektron mengisi kulit K (maks. 2), L (maks. 8), M, dan seterusnya. Elektron di kulit terluar disebut [[elektron-valensi]] dan menentukan cara atom bereaksi. Contoh: natrium (Z = 11) → 2 · 8 · 1.

Kuark penyusun proton dan neutron dibahas di {{learn:partikel|Partikel penyusun materi}}, sedangkan isotop radioaktif di {{learn:nuklir|kimia inti}}.`,
      `Atoms are made of three subatomic particles:

- [[proton|Protons]] (charge +1) and [[neutron|neutrons]] (neutral) sit in a tiny nucleus that holds almost all the mass.
- [[elektron|Electrons]] (charge −1, about 1/1836 of a proton’s mass) move in [[kulit-elektron|shells]] around it.

The [[nomor-atom|atomic number]] (Z) is the number of protons and defines the element. The [[nomor-massa|mass number]] (A) counts protons plus neutrons. A neutral atom has as many electrons as protons; atoms that lose or gain electrons become [[ion|ions]].

[[isotop|Isotopes]] are atoms of the same element with different neutron numbers, such as carbon-12 and carbon-14 (used to date fossils).

Electrons fill shells K (max 2), L (max 8), M and so on. The outermost ones are [[elektron-valensi|valence electrons]] and control how an atom reacts. Example: sodium (Z = 11) → 2 · 8 · 1.

The quarks inside protons and neutrons are in {{learn:partikel|The particles of matter}}; radioactive isotopes in {{learn:nuklir|nuclear chemistry}}.`,
    ],
    sma: [
      `Model atom berkembang seiring bukti percobaan:

1. **Dalton** (1803): atom bola pejal yang tidak dapat dibagi.
2. **Thomson** (1897): menemukan elektron; atom seperti roti kismis.
3. **Rutherford** (1911): hamburan sinar alfa pada emas menunjukkan inti kecil bermuatan positif.
4. **Bohr** (1913): elektron berada pada tingkat energi tertentu; loncatan antartingkat memancarkan cahaya berwarna (spektrum garis, lihat {{lab:nyala|uji nyala}}).
5. **Mekanika kuantum** (Schrödinger, 1926): elektron digambarkan sebagai [[orbital]], daerah peluang terbesar menemukan elektron.

Setiap elektron memiliki empat [[bilangan-kuantum]]: n (kulit), l (subkulit s, p, d, f), mₗ (orientasi orbital), dan mₛ (spin). [[konfigurasi-elektron|Konfigurasi elektron]] mengikuti prinsip Aufbau (energi terendah dulu: 1s 2s 2p 3s 3p 4s 3d …), larangan Pauli (maks. 2 elektron berlawanan spin per orbital), dan kaidah Hund (orbital setara diisi satu-satu dulu).

Contoh: {{e:Fe}} (Z = 26) = [Ar] 3d⁶ 4s². Kromium dan tembaga adalah pengecualian ([Ar] 3d⁵ 4s¹ dan [Ar] 3d¹⁰ 4s¹) karena subkulit setengah penuh dan penuh lebih stabil.`,
      `The model of the atom evolved with experimental evidence:

1. **Dalton** (1803): solid, indivisible spheres.
2. **Thomson** (1897): discovered the electron; the "plum pudding" atom.
3. **Rutherford** (1911): alpha particles scattered by gold foil revealed a tiny positive nucleus.
4. **Bohr** (1913): electrons occupy fixed energy levels; jumps between them emit coloured light (line spectra — see the {{lab:nyala|flame test}}).
5. **Quantum mechanics** (Schrödinger, 1926): electrons are described by [[orbital|orbitals]], regions where they are most likely found.

Each electron has four [[bilangan-kuantum|quantum numbers]]: n (shell), l (subshell s, p, d, f), mₗ (orbital orientation) and mₛ (spin). [[konfigurasi-elektron|Electron configuration]] follows the Aufbau principle (lowest energy first: 1s 2s 2p 3s 3p 4s 3d …), the Pauli exclusion principle (max 2 opposite-spin electrons per orbital) and Hund’s rule (fill equal orbitals singly first).

Example: {{e:Fe}} (Z = 26) = [Ar] 3d⁶ 4s². Chromium and copper are exceptions ([Ar] 3d⁵ 4s¹ and [Ar] 3d¹⁰ 4s¹) because half-filled and filled subshells are extra stable.`,
    ],
    kuliah: [
      `Persamaan Schrödinger untuk atom hidrogen menghasilkan fungsi gelombang ψₙₗₘ = Rₙₗ(r)·Yₗᵐ(θ,φ). Bagian radial menentukan jumlah simpul radial (n − l − 1) dan bagian sudut (harmonik bola) menentukan bentuk orbital: s bulat, p berbentuk halter dengan satu bidang simpul, d dengan dua bidang simpul.

Pada atom berelektron banyak, elektron saling menutupi (efek perisai) sehingga muatan inti efektif Z_eff = Z − S (aturan Slater). Penetrasi orbital s lebih besar daripada p dan d, sehingga pada kulit yang sama energi s < p < d. Inilah sebabnya 4s terisi sebelum 3d, tetapi saat membentuk ion transisi elektron 4s dilepas lebih dulu (Fe²⁺ = [Ar] 3d⁶).

Tren periodik (jari-jari, energi ionisasi, afinitas elektron, keelektronegatifan) dapat dijelaskan dari Z_eff dan bilangan kuantum utama. Untuk unsur berat, efek relativistik mengontraksi orbital s: inilah alasan emas berwarna kuning dan raksa cair pada suhu kamar.

Spektroskopi fotoelektron (PES) memberi bukti langsung energi tiap subkulit, sedangkan spektrum emisi atom dipakai dalam AAS dan ICP untuk analisis logam jejak.

Dasar kuantumnya diuraikan di {{learn:kuantum|Kimia kuantum & kimia fisik}}.`,
      `Solving the Schrödinger equation for hydrogen gives wavefunctions ψₙₗₘ = Rₙₗ(r)·Yₗᵐ(θ,φ). The radial part sets the number of radial nodes (n − l − 1); the angular part (spherical harmonics) sets the shape: spherical s, dumbbell p with one nodal plane, d with two nodal planes.

In many-electron atoms electrons shield each other, giving an effective nuclear charge Z_eff = Z − S (Slater’s rules). s orbitals penetrate more than p and d, so within a shell s < p < d in energy. That is why 4s fills before 3d, yet transition-metal ions lose 4s electrons first (Fe²⁺ = [Ar] 3d⁶).

Periodic trends (radius, ionisation energy, electron affinity, electronegativity) follow from Z_eff and the principal quantum number. In heavy elements relativistic effects contract s orbitals — the reason gold is yellow and mercury is liquid at room temperature.

Photoelectron spectroscopy (PES) directly measures subshell energies, while atomic emission spectra underpin AAS and ICP analysis of trace metals.

The quantum foundations are developed in {{learn:kuantum|Quantum & physical chemistry}}.`,
    ],
  },
  points: [
    ['Inti atom (proton + neutron) sangat kecil tetapi memuat hampir seluruh massa.', 'The nucleus (protons + neutrons) is tiny but holds nearly all the mass.'],
    ['Nomor atom = jumlah proton = identitas unsur.', 'Atomic number = number of protons = the element’s identity.'],
    ['Isotop berbeda jumlah neutron; ion berbeda jumlah elektron.', 'Isotopes differ in neutrons; ions differ in electrons.'],
    ['Elektron valensi menentukan sifat kimia dan letak unsur di tabel periodik.', 'Valence electrons set chemical behaviour and position in the periodic table.'],
  ],
  molecules: ['water', 'iron', 'gold', 'sodium'],
  labs: ['orbital', 'nyala'],
  activity: {
    sd: ['Buat model atom dari plastisin: bola besar di tengah (inti) dan bola kecil (elektron) pada lingkaran kawat.', 'Build an atom model from play dough: a big ball in the middle (nucleus) and small balls (electrons) on wire rings.'],
    smp: ['Pilih 5 unsur di tabel periodik Kimialoka, tentukan jumlah proton, neutron, elektron, dan susunan elektron per kulitnya.', 'Pick 5 elements in the Kimialoka periodic table and find their protons, neutrons, electrons and electrons per shell.'],
    sma: ['Gunakan lab Konfigurasi elektron untuk 10 unsur periode 4. Catat unsur yang menjadi pengecualian dan jelaskan alasannya.', 'Use the Electron configuration lab for 10 period-4 elements. Note the exceptions and explain them.'],
    kuliah: ['Hitung Z_eff elektron 2p pada C, N, O, F dengan aturan Slater, lalu hubungkan dengan tren energi ionisasi pertama dari data PubChem.', 'Compute Z_eff for 2p electrons in C, N, O, F with Slater’s rules and relate it to first ionisation energies from PubChem.'],
  },
  quiz: [
    { lv: 'sd', q: ['Bagian tengah atom disebut…', 'The centre of an atom is called the…'], options: [['Kulit', 'Shell'], ['Inti', 'Nucleus'], ['Molekul', 'Molecule'], ['Elektron', 'Electron']], answer: 1, explain: ['Inti atom berada di tengah dan berisi proton serta neutron.', 'The nucleus sits in the middle and contains protons and neutrons.'] },
    { lv: 'sd', q: ['Ada berapa unsur yang sudah dikenal manusia?', 'How many elements are known?'], options: [['12', '12'], ['50', '50'], ['118', '118'], ['1000', '1000']], answer: 2, explain: ['Saat ini dikenal 118 unsur, dari hidrogen (1) sampai oganeson (118).', '118 elements are known, from hydrogen (1) to oganesson (118).'] },
    { lv: 'smp', q: ['Partikel bermuatan negatif dalam atom adalah…', 'The negatively charged particle in an atom is the…'], options: [['Proton', 'Proton'], ['Neutron', 'Neutron'], ['Elektron', 'Electron'], ['Inti', 'Nucleus']], answer: 2, explain: ['Elektron bermuatan −1 dan bergerak di sekitar inti.', 'Electrons carry −1 charge and move around the nucleus.'] },
    { lv: 'smp', q: ['Atom natrium memiliki 11 proton dan 12 neutron. Nomor massanya adalah…', 'A sodium atom has 11 protons and 12 neutrons. Its mass number is…'], options: [['11', '11'], ['12', '12'], ['23', '23'], ['1', '1']], answer: 2, explain: ['A = proton + neutron = 11 + 12 = 23.', 'A = protons + neutrons = 11 + 12 = 23.'] },
    { lv: 'smp', q: ['Susunan elektron atom klorin (Z = 17) per kulit adalah…', 'The electrons per shell of chlorine (Z = 17) are…'], options: [['2 · 8 · 7', '2 · 8 · 7'], ['2 · 7 · 8', '2 · 7 · 8'], ['8 · 8 · 1', '8 · 8 · 1'], ['2 · 8 · 8', '2 · 8 · 8']], answer: 0, explain: ['K = 2, L = 8, sisanya 7 di kulit M; klorin punya 7 elektron valensi.', 'K = 2, L = 8, the remaining 7 in M; chlorine has 7 valence electrons.'] },
    { lv: 'sma', q: ['Percobaan hamburan sinar alfa Rutherford membuktikan bahwa…', 'Rutherford’s alpha-scattering experiment showed that…'], options: [['Elektron bergerak dalam orbit', 'Electrons move in orbits'], ['Atom sebagian besar ruang kosong dengan inti kecil bermuatan positif', 'Atoms are mostly empty space with a tiny positive nucleus'], ['Atom tidak dapat dibagi', 'Atoms cannot be divided'], ['Neutron ada di inti', 'Neutrons are in the nucleus']], answer: 1, explain: ['Hampir semua partikel alfa menembus lurus, sebagian kecil dipantulkan oleh inti yang padat dan positif.', 'Almost all alpha particles passed straight through; a few bounced off a dense positive nucleus.'] },
    { lv: 'sma', q: ['Konfigurasi elektron yang benar untuk Cu (Z = 29) adalah…', 'The correct configuration for Cu (Z = 29) is…'], options: [['[Ar] 3d⁹ 4s²', '[Ar] 3d⁹ 4s²'], ['[Ar] 3d¹⁰ 4s¹', '[Ar] 3d¹⁰ 4s¹'], ['[Ar] 4s² 4p⁹', '[Ar] 4s² 4p⁹'], ['[Kr] 3d¹', '[Kr] 3d¹']], answer: 1, explain: ['Subkulit 3d penuh lebih stabil, sehingga satu elektron 4s berpindah ke 3d.', 'A full 3d subshell is more stable, so one 4s electron moves into 3d.'] },
    { lv: 'sma', q: ['Maksimum elektron dalam satu orbital adalah…', 'The maximum number of electrons in one orbital is…'], options: [['1', '1'], ['2', '2'], ['6', '6'], ['8', '8']], answer: 1, explain: ['Larangan Pauli: satu orbital memuat paling banyak 2 elektron dengan spin berlawanan.', 'Pauli exclusion: one orbital holds at most 2 electrons of opposite spin.'] },
    { lv: 'kuliah', q: ['Jumlah simpul radial orbital 3p adalah…', 'The number of radial nodes in a 3p orbital is…'], options: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']], answer: 1, explain: ['Simpul radial = n − l − 1 = 3 − 1 − 1 = 1.', 'Radial nodes = n − l − 1 = 3 − 1 − 1 = 1.'] },
    { lv: 'kuliah', q: ['Ion Fe²⁺ memiliki konfigurasi…', 'Fe²⁺ has the configuration…'], options: [['[Ar] 3d⁴ 4s²', '[Ar] 3d⁴ 4s²'], ['[Ar] 3d⁶', '[Ar] 3d⁶'], ['[Ar] 3d⁵ 4s¹', '[Ar] 3d⁵ 4s¹'], ['[Ar] 4s² 3d⁶', '[Ar] 4s² 3d⁶']], answer: 1, explain: ['Logam transisi melepas elektron 4s lebih dulu saat membentuk kation.', 'Transition metals lose their 4s electrons first when forming cations.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan struktur atom, perkembangan model atom, dan konfigurasi elektron sebagai dasar sifat unsur.', 'Phases D–F: learners explain atomic structure, the history of atomic models and electron configuration as the basis of element properties.'],
    goals: [
      ['Menentukan jumlah proton, neutron, dan elektron dari notasi unsur.', 'Find protons, neutrons and electrons from isotope notation.'],
      ['Menjelaskan perkembangan model atom berdasarkan bukti eksperimen.', 'Explain how atomic models changed with evidence.'],
      ['Menuliskan konfigurasi elektron dan menghubungkannya dengan letak unsur.', 'Write configurations and link them to position in the table.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Pemantik: "Seberapa kecil sesuatu dapat dibagi?" Diskusi dengan sebutir garam.', 'Hook: "How small can you divide something?" Discuss with a grain of salt.'],
      ['Garis waktu model atom (kerja kelompok, tiap kelompok satu ilmuwan).', 'Atomic-model timeline (groups each present one scientist).'],
      ['Latihan terbimbing di lab Konfigurasi elektron Kimialoka.', 'Guided practice in the Kimialoka Electron configuration lab.'],
      ['Uji nyala virtual: hubungkan warna nyala dengan loncatan elektron.', 'Virtual flame test: link flame colours to electron jumps.'],
    ],
    misconceptions: [
      ['"Elektron beredar seperti planet di orbit tetap." Model kuantum menggambarkan orbital sebagai peluang.', '"Electrons orbit like planets." The quantum model describes orbitals as probabilities.'],
      ['"Atom bisa dilihat dengan mikroskop biasa." Atom terlalu kecil; hanya mikroskop khusus (STM) yang dapat "memetakannya".', '"Atoms are visible under an ordinary microscope." Only special instruments (STM) can map them.'],
    ],
    assessment: ['Kuis Kimialoka dan poster garis waktu model atom.', 'Kimialoka quiz and an atomic-model timeline poster.'],
  },
  refs: ["2-2-evolution-of-atomic-theory", "2-3-atomic-structure-and-symbolism", "6-2-the-bohr-model", "6-3-development-of-quantum-theory", "6-4-electronic-structure-of-atoms-electron-configurations"],
};
