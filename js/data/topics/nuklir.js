export default {
  id: 'nuklir',
  icon: 'atom',
  levels: ['sd', 'smp', 'sma', 'kuliah'],
  title: ['Isotop, radioaktivitas & kimia inti', 'Isotopes, radioactivity & nuclear chemistry'],
  summary: [
    'Isotop stabil dan radioaktif, peluruhan α, β, γ, waktu paruh, penanggalan karbon, fisi, fusi, serta pemakaian radioisotop.',
    'Stable and radioactive isotopes, α, β and γ decay, half-life, carbon dating, fission, fusion and the uses of radioisotopes.',
  ],
  body: {
    sd: [
      `Sebagian besar atom di sekitar kita tidak pernah berubah. Namun ada atom yang inti atomnya tidak stabil: sedikit demi sedikit intinya pecah sambil memancarkan energi yang disebut radiasi. Atom seperti ini disebut [[radioaktif]].

Radiasi terdengar menakutkan, padahal banyak manfaatnya bila dipakai dengan aman:

- Dokter memakai zat radioaktif untuk melihat bagian dalam tubuh dan mengobati kanker.
- Ilmuwan menghitung umur fosil dan benda purba dengan karbon radioaktif (karbon-14).
- Matahari bersinar karena inti-inti atom kecil di dalamnya bergabung (fusi) dan melepaskan energi sangat besar.

Tempat yang menyimpan bahan radioaktif diberi tanda khusus berbentuk baling-baling berwarna hitam dan kuning. Jangan mendekati atau menyentuh benda bertanda itu.`,
      `Most atoms around us never change. But some atoms have unstable nuclei: little by little the nucleus breaks down, giving off energy called radiation. Such atoms are [[radioaktif|radioactive]].

Radiation sounds scary, but it is very useful when handled safely:

- Doctors use radioactive substances to see inside the body and to treat cancer.
- Scientists work out the age of fossils and ancient objects with radioactive carbon (carbon-14).
- The Sun shines because tiny nuclei inside it join together (fusion) and release enormous energy.

Places that store radioactive materials carry a special black-and-yellow propeller sign. Never go near or touch anything with that sign.`,
    ],
    smp: [
      `[[isotop|Isotop]] adalah atom-atom unsur yang sama (jumlah protonnya sama) tetapi jumlah neutronnya berbeda. Isotop ditulis dengan nomor massa di kiri atas dan nomor atom di kiri bawah, misalnya ¹²₆C, ¹³₆C, dan ¹⁴₆C. Sifat kimianya hampir sama karena jumlah elektronnya sama. Persentase setiap isotop dalam sampel alami disebut [[kelimpahan-isotop|kelimpahan isotop]]; misalnya sekitar 99% atom karbon di alam adalah karbon-12.

Sebagian isotop stabil ([[isotop-stabil]]), sebagian radioaktif ([[radioisotop]]). Inti radioaktif meluruh dan memancarkan tiga jenis radiasi utama:

- **Alfa (α)**: inti helium; dapat dihentikan selembar kertas atau kulit.
- **Beta (β)**: elektron berkecepatan tinggi; dapat dihentikan lempeng aluminium beberapa milimeter.
- **Gamma (γ)**: gelombang elektromagnetik berenergi tinggi; perlu timbal atau beton tebal.

[[waktu-paruh|Waktu paruh]] adalah waktu agar separuh inti radioaktif meluruh. Setelah satu waktu paruh tersisa ½, setelah dua waktu paruh ¼, dan seterusnya. Waktu paruh karbon-14 sekitar 5700 tahun, iodin-131 sekitar 8 hari.

Pemakaian radioisotop: diagnosis dan terapi di rumah sakit, pemeriksaan las pipa (radiografi), sterilisasi alat medis, pemuliaan tanaman, dan penanggalan. Di Indonesia, BRIN mengoperasikan reaktor riset serbaguna G.A. Siwabessy di Serpong untuk riset dan produksi radioisotop. Jelajahi semua isotop dengan {{page:isotope|penjelajah isotop}}.`,
      `[[isotop|Isotopes]] are atoms of the same element (same number of protons) with different numbers of neutrons. They are written with the mass number at top left and the atomic number at bottom left, such as ¹²₆C, ¹³₆C and ¹⁴₆C. Their chemistry is almost the same because their electron count is the same. The share of each isotope in a natural sample is its [[kelimpahan-isotop|isotopic abundance]]; about 99% of the carbon atoms in nature are carbon-12, for example.

Some isotopes are stable ([[isotop-stabil|stable isotopes]]) and some are radioactive ([[radioisotop|radioisotopes]]). Radioactive nuclei decay, giving off three main kinds of radiation:

- **Alpha (α)**: helium nuclei; stopped by a sheet of paper or skin.
- **Beta (β)**: fast electrons; stopped by a few millimetres of aluminium.
- **Gamma (γ)**: high-energy electromagnetic waves; needs lead or thick concrete.

The [[waktu-paruh|half-life]] is the time for half of the radioactive nuclei to decay. After one half-life ½ remains, after two ¼, and so on. Carbon-14’s half-life is about 5700 years; iodine-131’s about 8 days.

Radioisotopes are used for diagnosis and therapy in hospitals, checking pipe welds (radiography), sterilising medical tools, plant breeding and dating. In Indonesia, BRIN runs the G.A. Siwabessy multipurpose research reactor in Serpong for research and radioisotope production. Explore every isotope with the {{page:isotope|isotope explorer}}.`,
    ],
    sma: [
      `Kestabilan inti ditentukan perbandingan neutron terhadap proton (N/Z). Untuk inti ringan N/Z ≈ 1; untuk inti berat stabil ≈ 1,5. Inti di luar "pita kestabilan" meluruh ke arah pita itu, dan semua inti dengan Z ≥ 83 radioaktif.

Jenis peluruhan dan persamaannya (nomor massa A dan nomor atom Z harus setara di kedua ruas):

- [[peluruhan-alfa|Alfa]]: ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He (A turun 4, Z turun 2). {{r:peluruhan-alfa-uranium-238|Lihat reaksinya}}.
- [[peluruhan-beta|Beta minus]]: ¹⁴₆C → ¹⁴₇N + ⁰₋₁e (neutron → proton). {{r:peluruhan-beta-karbon-14|Lihat reaksinya}}.
- Beta plus dan [[penangkapan-elektron|penangkapan elektron]]: proton → neutron, Z turun 1 (inti kaya proton).
- [[sinar-gamma|Gamma]]: inti tereksitasi melepas energi tanpa mengubah A dan Z.

Jumlah inti tersisa: N = N₀ (½)^(t/t½). **Penanggalan radiokarbon**: makhluk hidup terus menyerap ¹⁴C; setelah mati jumlahnya berkurang. Bila tersisa ¼, umurnya sekitar 2 × 5700 = 11 400 tahun. Deret peluruhan ²³⁸U berakhir di ²⁰⁶Pb yang stabil setelah beberapa peluruhan α dan β.

[[fisi|Fisi]]: ²³⁵U menyerap neutron lalu terbelah dan melepas 2–3 neutron baru, yang dapat memicu reaksi berantai; reaktor mengendalikannya dengan batang kendali. [[fusi|Fusi]] menggabungkan inti ringan (deuterium dan tritium menjadi helium) dan menyalakan bintang. [[transmutasi|Transmutasi]] buatan menghasilkan semua unsur setelah uranium. Uji peluruhan di {{lab:paruh|lab Waktu paruh}}.`,
      `Nuclear stability depends on the neutron-to-proton ratio (N/Z). Light nuclei are stable near N/Z ≈ 1; heavy stable ones near 1.5. Nuclei outside the "band of stability" decay towards it, and every nucleus with Z ≥ 83 is radioactive.

Decay types and their equations (mass number A and atomic number Z must balance):

- [[peluruhan-alfa|Alpha]]: ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He (A falls by 4, Z by 2). {{r:peluruhan-alfa-uranium-238|See the reaction}}.
- [[peluruhan-beta|Beta minus]]: ¹⁴₆C → ¹⁴₇N + ⁰₋₁e (neutron → proton). {{r:peluruhan-beta-karbon-14|See the reaction}}.
- Beta plus and [[penangkapan-elektron|electron capture]]: proton → neutron, Z falls by 1 (proton-rich nuclei).
- [[sinar-gamma|Gamma]]: an excited nucleus releases energy without changing A or Z.

Nuclei remaining: N = N₀ (½)^(t/t½). **Radiocarbon dating**: living things keep taking in ¹⁴C; after death it runs down. If ¼ remains, the age is about 2 × 5700 = 11 400 years. The ²³⁸U decay series ends at stable ²⁰⁶Pb after several α and β decays.

[[fisi|Fission]]: ²³⁵U absorbs a neutron, splits and releases 2–3 new neutrons, which can start a chain reaction; reactors control it with control rods. [[fusi|Fusion]] joins light nuclei (deuterium and tritium into helium) and powers the stars. Artificial [[transmutasi|transmutation]] makes every element beyond uranium. Try decay in the {{lab:paruh|Half-life lab}}.`,
    ],
    kuliah: [
      `Peluruhan radioaktif mengikuti kinetika orde satu: −dN/dt = λN, N = N₀e^(−λt), t½ = ln 2/λ. Aktivitas A = λN diukur dalam becquerel (1 Bq = 1 peluruhan per detik). Waktu paruh tidak dipengaruhi suhu, tekanan, atau ikatan kimia (kecuali sedikit untuk penangkapan elektron).

Energi ikat inti berasal dari defek massa: E = Δm·c², dengan 1 u setara 931,5 MeV. Energi ikat per nukleon mencapai puncak sekitar 8,8 MeV di sekitar besi dan nikel; karena itu inti berat melepaskan energi bila terbelah dan inti ringan bila bergabung. Model tetes cairan (rumus massa semi-empiris) menjelaskan tren ini, sedangkan bilangan ajaib 2, 8, 20, 28, 50, 82, dan 126 menunjukkan struktur kulit inti.

Kimia radiasi dan dosimetri: dosis serap dalam gray (Gy, J/kg), dosis ekuivalen dalam sievert (Sv) dengan faktor bobot radiasi (α jauh lebih merusak di dalam tubuh). Radiofarmaka menggabungkan kimia koordinasi dan kimia inti, misalnya ⁹⁹ᵐTc (waktu paruh sekitar 6 jam) yang dikompleksasi ligan untuk pencitraan organ, dan ¹⁸F-fluorodeoksiglukosa untuk PET.

Isotop stabil juga penting: rasio δ¹³C dan δ¹⁸O merekam iklim purba dan asal pangan, efek isotop kinetik (ikatan C–D lebih lambat putus daripada C–H) membuktikan mekanisme reaksi, dan analisis aktivasi neutron menentukan unsur jejak tanpa merusak sampel. Data massa, waktu paruh, dan mode peluruhan seluruh nuklida di Kimialoka berasal dari IAEA Atomic Mass Data Center melalui PubChem.`,
      `Radioactive decay follows first-order kinetics: −dN/dt = λN, N = N₀e^(−λt), t½ = ln 2/λ. Activity A = λN is measured in becquerels (1 Bq = one decay per second). Half-lives are not changed by temperature, pressure or chemical bonding (except slightly for electron capture).

Nuclear binding energy comes from the mass defect: E = Δm·c², where 1 u corresponds to 931.5 MeV. Binding energy per nucleon peaks at about 8.8 MeV around iron and nickel, so heavy nuclei release energy by splitting and light ones by merging. The liquid-drop model (semi-empirical mass formula) explains the trend, while the magic numbers 2, 8, 20, 28, 50, 82 and 126 reveal nuclear shell structure.

Radiation chemistry and dosimetry: absorbed dose in grays (Gy, J/kg), equivalent dose in sieverts (Sv) with radiation weighting factors (α is far more damaging inside the body). Radiopharmaceuticals join coordination and nuclear chemistry, such as ⁹⁹ᵐTc (half-life about 6 hours) complexed with ligands for organ imaging, and ¹⁸F-fluorodeoxyglucose for PET.

Stable isotopes matter too: δ¹³C and δ¹⁸O ratios record past climates and food origin, the kinetic isotope effect (C–D bonds break more slowly than C–H) proves reaction mechanisms, and neutron activation analysis measures trace elements without destroying a sample. The masses, half-lives and decay modes of every nuclide in Kimialoka come from the IAEA Atomic Mass Data Center via PubChem.`,
    ],
  },
  points: [
    ['Isotop: jumlah proton sama, neutron berbeda; sifat kimianya hampir sama.', 'Isotopes: same protons, different neutrons; almost the same chemistry.'],
    ['Radiasi α dihentikan kertas, β oleh aluminium tipis, γ perlu timbal atau beton tebal.', 'α is stopped by paper, β by thin aluminium, γ needs lead or thick concrete.'],
    ['Waktu paruh tetap untuk tiap nuklida: N = N₀(½)^(t/t½).', 'Each nuclide has a fixed half-life: N = N₀(½)^(t/t½).'],
    ['Persamaan inti harus setara nomor massa dan nomor atomnya.', 'Nuclear equations must balance mass number and atomic number.'],
    ['Fisi membelah inti berat; fusi menggabungkan inti ringan; keduanya mengubah sebagian massa menjadi energi.', 'Fission splits heavy nuclei; fusion joins light ones; both turn some mass into energy.'],
  ],
  molecules: ['helium', 'water'],
  labs: ['paruh'],
  activity: {
    sd: ['Cari tanda radiasi di sekitar rumah sakit atau di buku, lalu buat poster "radiasi yang bermanfaat" dengan tiga contoh pemakaian.', 'Find the radiation sign in a hospital or a book, then make a "useful radiation" poster with three uses.'],
    smp: ['Simulasi waktu paruh dengan 100 koin: lempar, singkirkan yang "gambar", ulangi. Catat sisa koin tiap lemparan dan buat grafiknya.', 'Half-life simulation with 100 coins: toss, remove the tails, repeat. Record the coins left after each toss and graph them.'],
    sma: ['Pilih tiga radioisotop di penjelajah isotop Kimialoka (misalnya ¹⁴C, ¹³¹I, ⁹⁹Tc), tuliskan persamaan peluruhannya, dan hitung sisa setelah 3 waktu paruh.', 'Pick three radioisotopes in the Kimialoka isotope explorer (e.g. ¹⁴C, ¹³¹I, ⁹⁹Tc), write their decay equations and find what remains after 3 half-lives.'],
    kuliah: ['Hitung energi ikat per nukleon ⁵⁶Fe dan ²³⁵U dari massa atom (data AMDC di halaman unsur Kimialoka) dan jelaskan mengapa fisi uranium melepaskan energi.', 'Compute the binding energy per nucleon of ⁵⁶Fe and ²³⁵U from atomic masses (AMDC data on Kimialoka’s element pages) and explain why uranium fission releases energy.'],
  },
  quiz: [
    { lv: 'sd', q: ['Matahari bersinar karena…', 'The Sun shines because…'], options: [['Ada api biasa yang membakar kayu', 'Ordinary fire burning wood'], ['Inti-inti atom kecil bergabung (fusi)', 'Tiny nuclei join together (fusion)'], ['Memantulkan cahaya Bulan', 'It reflects moonlight'], ['Ada listrik di dalamnya', 'It has electricity inside']], answer: 1, explain: ['Di inti Matahari, inti hidrogen bergabung menjadi helium dan melepaskan energi.', 'In the Sun’s core, hydrogen nuclei fuse into helium, releasing energy.'] },
    { lv: 'sd', q: ['Karbon radioaktif (karbon-14) dipakai untuk…', 'Radioactive carbon (carbon-14) is used to…'], options: [['Menentukan umur fosil', 'Find the age of fossils'], ['Membuat gula', 'Make sugar'], ['Mewarnai kain', 'Dye cloth'], ['Membuat balon', 'Make balloons']], answer: 0, explain: ['Jumlah karbon-14 berkurang teratur sejak makhluk hidup mati, jadi dapat dipakai menghitung umur.', 'Carbon-14 runs down steadily after a living thing dies, so it can date it.'] },
    { lv: 'smp', q: ['¹²C dan ¹⁴C berbeda dalam jumlah…', '¹²C and ¹⁴C differ in their number of…'], options: [['Proton', 'Protons'], ['Elektron', 'Electrons'], ['Neutron', 'Neutrons'], ['Kulit elektron', 'Electron shells']], answer: 2, explain: ['Isotop berbeda jumlah neutron: 6 dan 8.', 'Isotopes differ in neutrons: 6 and 8.'] },
    { lv: 'smp', q: ['Radiasi yang paling mudah dihentikan (oleh selembar kertas) adalah…', 'The radiation most easily stopped (by paper) is…'], options: [['Alfa', 'Alpha'], ['Beta', 'Beta'], ['Gamma', 'Gamma'], ['Sinar-X', 'X-rays']], answer: 0, explain: ['Partikel alfa besar dan bermuatan +2, sehingga cepat kehilangan energi.', 'Alpha particles are large and +2 charged, so they lose energy fast.'] },
    { lv: 'smp', q: ['Sampel 80 g radioisotop berwaktu paruh 2 hari. Setelah 6 hari tersisa…', 'An 80 g radioisotope sample has a 2-day half-life. After 6 days there is…'], options: [['40 g', '40 g'], ['20 g', '20 g'], ['10 g', '10 g'], ['0 g', '0 g']], answer: 2, explain: ['6 hari = 3 waktu paruh: 80 → 40 → 20 → 10 g.', '6 days = 3 half-lives: 80 → 40 → 20 → 10 g.'] },
    { lv: 'sma', q: ['²²⁶₈₈Ra memancarkan partikel alfa. Intinya menjadi…', '²²⁶₈₈Ra emits an alpha particle. It becomes…'], options: [['²²²₈₆Rn', '²²²₈₆Rn'], ['²²⁶₈₉Ac', '²²⁶₈₉Ac'], ['²²²₈₈Ra', '²²²₈₈Ra'], ['²³⁰₉₀Th', '²³⁰₉₀Th']], answer: 0, explain: ['A turun 4 (226 → 222) dan Z turun 2 (88 → 86): radon.', 'A falls by 4 (226 → 222) and Z by 2 (88 → 86): radon.'] },
    { lv: 'sma', q: ['Dalam peluruhan β⁻, nomor atom…', 'In β⁻ decay the atomic number…'], options: [['Naik 1', 'Rises by 1'], ['Turun 1', 'Falls by 1'], ['Turun 2', 'Falls by 2'], ['Tetap', 'Stays the same']], answer: 0, explain: ['Neutron menjadi proton sehingga Z naik 1, A tetap.', 'A neutron becomes a proton, so Z rises by 1 and A stays.'] },
    { lv: 'sma', q: ['Fosil kayu tinggal memiliki ¼ ¹⁴C semula (t½ ≈ 5700 tahun). Umurnya sekitar…', 'Fossil wood keeps ¼ of its original ¹⁴C (t½ ≈ 5700 years). Its age is about…'], options: [['2850 tahun', '2850 years'], ['5700 tahun', '5700 years'], ['11 400 tahun', '11 400 years'], ['22 800 tahun', '22 800 years']], answer: 2, explain: ['¼ = (½)²: dua waktu paruh = 11 400 tahun.', '¼ = (½)²: two half-lives = 11 400 years.'] },
    { lv: 'sma', q: ['Reaksi berantai pada reaktor fisi terjadi karena…', 'A fission chain reaction happens because…'], options: [['Fisi melepaskan neutron baru yang membelah inti lain', 'Fission releases new neutrons that split other nuclei'], ['Uranium terbakar dengan oksigen', 'Uranium burns in oxygen'], ['Suhu reaktor rendah', 'The reactor is cold'], ['Elektron berpindah antarinti', 'Electrons jump between nuclei']], answer: 0, explain: ['Setiap fisi ²³⁵U melepaskan 2–3 neutron yang dapat memicu fisi berikutnya.', 'Each ²³⁵U fission releases 2–3 neutrons that can trigger more fissions.'] },
    { lv: 'kuliah', q: ['Tetapan peluruhan λ radioisotop dengan t½ = 6,0 jam adalah…', 'The decay constant λ of a radioisotope with t½ = 6.0 h is…'], options: [['0,116 jam⁻¹', '0.116 h⁻¹'], ['0,5 jam⁻¹', '0.5 h⁻¹'], ['4,16 jam⁻¹', '4.16 h⁻¹'], ['6,0 jam⁻¹', '6.0 h⁻¹']], answer: 0, explain: ['λ = ln 2/t½ = 0,693/6,0 ≈ 0,116 jam⁻¹.', 'λ = ln 2/t½ = 0.693/6.0 ≈ 0.116 h⁻¹.'] },
    { lv: 'kuliah', q: ['Energi ikat per nukleon terbesar dimiliki inti di sekitar…', 'Binding energy per nucleon is highest for nuclei near…'], options: [['Hidrogen', 'Hydrogen'], ['Besi dan nikel', 'Iron and nickel'], ['Uranium', 'Uranium'], ['Helium', 'Helium']], answer: 1, explain: ['Puncak kurva sekitar 8,8 MeV per nukleon di sekitar Fe dan Ni.', 'The curve peaks at about 8.8 MeV per nucleon around Fe and Ni.'] },
    { lv: 'kuliah', q: ['Satuan yang memperhitungkan jenis radiasi terhadap kerusakan jaringan adalah…', 'The unit that accounts for the type of radiation in tissue damage is the…'], options: [['Becquerel', 'Becquerel'], ['Gray', 'Gray'], ['Sievert', 'Sievert'], ['Curie', 'Curie']], answer: 2, explain: ['Sievert = dosis serap × faktor bobot radiasi.', 'Sievert = absorbed dose × radiation weighting factor.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan isotop, radioaktivitas, waktu paruh, serta manfaat dan risiko teknologi nuklir.', 'Phases D–F: learners explain isotopes, radioactivity, half-life, and the benefits and risks of nuclear technology.'],
    goals: [
      ['Menuliskan notasi isotop dan menentukan jumlah proton, neutron, dan elektron.', 'Write isotope notation and find proton, neutron and electron counts.'],
      ['Menyetarakan persamaan peluruhan α, β, dan γ.', 'Balance α, β and γ decay equations.'],
      ['Menghitung sisa zat radioaktif dan umur dengan waktu paruh.', 'Use half-lives to find remaining amounts and ages.'],
    ],
    duration: ['3 × 45 menit', '3 × 45 min'],
    steps: [
      ['Pemantik: foto rontgen dan artefak purba; bagaimana umurnya diketahui?', 'Hook: an X-ray and an ancient artefact — how do we know its age?'],
      ['Simulasi waktu paruh dengan koin atau lab Waktu paruh Kimialoka.', 'Half-life simulation with coins or the Kimialoka Half-life lab.'],
      ['Latihan menyetarakan persamaan inti dengan kartu nuklida.', 'Balancing nuclear equations with nuclide cards.'],
      ['Debat singkat: PLTN untuk Indonesia, pro dan kontra berbasis data.', 'Short debate: nuclear power for Indonesia, pros and cons from data.'],
    ],
    misconceptions: [
      ['"Semua radiasi berasal dari bahan nuklir buatan." Radiasi latar berasal dari batuan, udara (radon), sinar kosmik, bahkan tubuh (⁴⁰K).', '"All radiation comes from man-made nuclear material." Background radiation comes from rocks, air (radon), cosmic rays and even our bodies (⁴⁰K).'],
      ['"Setelah dua waktu paruh zat habis." Tersisa ¼, bukan nol.', '"After two half-lives it is all gone." A quarter remains, not zero.'],
      ['"Benda yang terkena radiasi menjadi radioaktif." Penyinaran gamma untuk sterilisasi tidak membuat benda radioaktif.', '"Irradiated objects become radioactive." Gamma sterilisation does not make things radioactive.'],
    ],
    assessment: ['Kuis Kimialoka, laporan simulasi waktu paruh, dan esai singkat tentang satu pemakaian radioisotop di Indonesia.', 'The Kimialoka quiz, a half-life simulation report and a short essay on one use of radioisotopes in Indonesia.'],
  },
  refs: ['21-1-nuclear-structure-and-stability', '21-2-nuclear-equations', '21-3-radioactive-decay', '21-4-transmutation-and-nuclear-energy', '21-5-uses-of-radioisotopes', '21-6-biological-effects-of-radiation'],
};
