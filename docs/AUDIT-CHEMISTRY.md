# Audit cakupan dan akurasi Kimia Kimialoka

Dokumen ini mencatat dua audit terhadap Kimialoka sesuai lingkup "ensiklopedia
Kimia interaktif + platform belajar": dari materi, partikel, atom, unsur, isotop, ion, molekul, senyawa, material,
sifat, ikatan, reaksi, sampai cabang-cabang ilmu kimia.

- **Bagian A** adalah audit awal, dibuat sebelum kode diubah.
- **Bagian B** adalah audit ulang setelah perubahan, dihitung ulang dari data dengan `npm run audit`.

Kelengkapan tidak dinilai dari jumlah molekul. Yang diukur: cakupan konsep, cakupan entitas, kelengkapan metadata,
kelengkapan sumber, kelengkapan relasi, dan kelengkapan pendidikan.

## A. Audit awal (28 September 2026, versi 2.0.0)

### A.1 Cara audit

1. Membaca seluruh kode sumber: router (16 halaman), komponen, layanan PubChem/Wikimedia, proxy
   (`server/policy.mjs`, Cloudflare Function), service worker, skrip sinkronisasi, dan tes.
2. Menghitung isi data langsung dari modul: 292 molekul katalog beserta rekaman PubChem-nya, 118 unsur, 48
   golongan, 126 istilah kamus, 14 topik, 13 lab, 15 reaksi latihan.
3. Mencocokkan daftar konsep dari lingkup yang diminta (bagian 4–25 spesifikasi, 194 konsep) dengan kamus dan
   teks materi per jenjang. Kehadiran dicari dengan kata kunci Indonesia dan Inggris. Hasilnya batas atas:
   kata yang muncul belum tentu dijelaskan.
4. Membaca seluruh teks materi (keempat jenjang), definisi ilmiah kamus, dan semua klaim angka di kartu molekul
   untuk memeriksa akurasi. Angka dicocokkan dengan rekaman PubChem yang sudah ada di aplikasi.
5. Memeriksa ketersediaan sumber resmi untuk data yang belum ada: PubChem PUG View per unsur (CIAAW, IAEA
   AMDC, NIST, LANL, Jefferson Lab), pencarian PubChem berdasarkan SMILES/InChI/InChIKey/CAS, dan daftar isi
   OpenStax _Chemistry 2e_, _Organic Chemistry_, dan _Biology 2e_.

### A.2 Yang sudah ada dan dipertahankan (KEEP)

- Arsitektur tanpa framework dan tanpa dependensi produksi, router hash dengan halaman yang dimuat saat dibutuhkan.
- Data referensi disinkronkan dari sumber resmi ke berkas JSON per entitas (`data/molecules/<id>.json`,
  `data/elements/<Z>.json`) yang dimuat saat dibuka dan di-cache service worker.
- Pencarian langsung ke lebih dari 100 juta senyawa PubChem lewat proxy ber-cache (server Node dan Cloudflare
  Function) dengan daftar izin endpoint.
- Rekaman molekul sangat lengkap: SMILES, InChI, InChIKey, dan CAS 100%; IUPAC 99%; data eksperimen 97%;
  GHS 96%; struktur 2D/3D 89% (sisanya kisi kristal/polimer yang digambar dengan model sel satuan).
- Tabel periodik 118 unsur yang dapat diklik, dicari, dan diwarnai menurut kategori, wujud, blok, atau sifat.
- 13 lab virtual, 5 mode jenjang, ruang guru, kuis, kamus, PWA offline, dan tes otomatis.

### A.3 Matriks audit awal

Kolom _Konsep_ = konsep lingkup yang muncul di teks materi / yang punya entri kamus. _4 lapis_ = konsep yang
muncul di keempat jenjang teks.

| Domain                         | Yang ada                                                                                                   | Cakupan konsep (teks / kamus / 4 lapis)                                                                            | Belum ada                                                                                                                               | Salah                                                                                                       | Tanpa sumber                           | Tindakan                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Materi (§4)                    | Topik `zat` (SD–SMA), lab Partikel & wujud                                                                 | 10/13 · 8/13 · 5                                                                                                   | suspensi, plasma (hanya di poin kunci), lapis kuliah `zat`                                                                              | –                                                                                                           | Topik tanpa rujukan                    | EXPAND `zat`, BUILD topik larutan & campuran, BUILD entitas campuran/koloid                                            |
| Partikel (§5)                  | Proton, neutron, elektron di topik `atom`                                                                  | 4/7 · 3/7 · 1                                                                                                      | partikel fundamental, kuark, lepton, pembedaan partikel ≠ atom ≠ ion ≠ molekul ≠ unsur ≠ senyawa                                        | –                                                                                                           | –                                      | BUILD topik partikel penyusun materi                                                                                   |
| Struktur atom (§6)             | Topik `atom` 4 jenjang, lab Konfigurasi elektron                                                           | 15/15 · 11/15 · 0                                                                                                  | Entri kamus inti atom, subkulit, afinitas elektron, tren periodik                                                                       | –                                                                                                           | –                                      | EXPAND kamus dan teks                                                                                                  |
| Tabel periodik & unsur (§7)    | 118 unsur dari PubChem: massa, konfigurasi, biloks, wujud, titik leleh/didih, massa jenis, kategori, tahun | Metadata: keelektronegatifan 95/118, titik leleh 103, titik didih 93, massa jenis 96 (sisanya memang tidak diukur) | Isotop, sejarah penemuan, kegunaan, sumber alam, bahaya, massa atom standar CIAAW, filter kategori/blok                                 | Warna CPK Pd tersimpan `#6985` (rusak), 10 unsur tanpa warna                                                | Sejarah/kegunaan belum ada sama sekali | BUILD data unsur dari PubChem PUG View (CIAAW, IAEA, NIST, LANL, JLab), FIX CPK, EXPAND halaman unsur dan filter tabel |
| Isotop & inti (§8)             | Kata "isotop" dan "karbon-14" di topik `atom`                                                              | 4/9 · 1/9 · 0                                                                                                      | Isotop stabil/radioaktif, kelimpahan, waktu paruh, peluruhan α/β/γ, transmutasi, data isotop per unsur                                  | –                                                                                                           | –                                      | BUILD penjelajah isotop (data AMDC/IAEA + CIAAW via PubChem), BUILD topik kimia inti                                   |
| Ion (§9)                       | Istilah ion, kation, anion                                                                                 | 1/4 · 2/4 · 0                                                                                                      | Ion poliatom, muatan ion, jumlah elektron, penjelajah ion                                                                               | –                                                                                                           | –                                      | BUILD penjelajah ion (data PubChem), BUILD topik ion                                                                   |
| Ikatan (§10)                   | Topik `ikatan`, `bentuk`, lab VSEPR                                                                        | 13/13 · 11/13 · 0                                                                                                  | Lapis SD, kamus resonansi dan geometri molekul, kepolaran per molekul                                                                   | –                                                                                                           | –                                      | EXPAND                                                                                                                 |
| Molekul & senyawa (§11)        | 292 molekul, 48 golongan, pencarian nama/rumus/CID                                                         | Identitas lengkap                                                                                                  | Pencarian SMILES, InChI, InChIKey, CAS, IUPAC; relasi ke unsur, konsep, reaksi, ion                                                     | Topik `karbon` menyebut spektrum rujukan "ditautkan di setiap halaman molekul", padahal tautannya tidak ada | –                                      | BUILD pencarian identitas, BUILD relasi, FIX tautan spektrum                                                           |
| Organik (§12)                  | Topik `karbon`, 19 golongan organik                                                                        | 17/21 · 1/21 · 0                                                                                                   | Nitril, alkil halida, heterosiklik sebagai konsep; reaksi organik (substitusi, adisi, eliminasi, oksidasi/reduksi) di luar lapis kuliah | –                                                                                                           | –                                      | BUILD topik gugus fungsi dan reaksi organik, EXPAND kamus                                                              |
| Anorganik (§13)                | Golongan asam, basa, garam, oksida, hidrida, kompleks, mineral                                             | 11/13 · 5/13 · 3                                                                                                   | Hidroksida dan sulfida sebagai konsep, pengelompokan garam menurut anion, tata nama anorganik                                           | –                                                                                                           | –                                      | BUILD topik kimia anorganik, BUILD relasi ion → senyawa                                                                |
| Biokimia (§14)                 | Topik `biomolekul`, 7 golongan biomolekul                                                                  | 10/11 · 4/11 · 2                                                                                                   | Metabolit, entri kamus asam amino, peptida, nukleotida, DNA/RNA, vitamin                                                                | Klaim "enzim mempercepat reaksi hingga jutaan kali" (batas bawah, bukan batas atas)                         | –                                      | CORRECT, EXPAND                                                                                                        |
| Material (§15)                 | Topik `material`, golongan polimer, keramik, semikonduktor, nanomaterial, material energi                  | 9/10 · 7/10 · 3                                                                                                    | Paduan logam, kaca, komposit, larutan, dan campuran sebagai entitas (bukan senyawa tunggal)                                             | –                                                                                                           | –                                      | BUILD katalog material & campuran                                                                                      |
| Reaksi (§16)                   | 15 reaksi latihan penyetaraan; topik `reaksi`                                                              | 8/9 · 5/9 · 0                                                                                                      | Sistem reaksi: pereaksi → kondisi → perubahan → produk, jenis reaksi, hidrolisis, pengendapan                                           | –                                                                                                           | Reaksi tanpa sumber                    | BUILD pustaka reaksi dengan pemeriksaan setara atom dan muatan                                                         |
| Stoikiometri (§17)             | Topik `stoikiometri`, lab Penyetaraan dan Massa molar                                                      | 11/12 · 5/12 · 1                                                                                                   | Molalitas, hasil teoretis/nyata di kamus, lapis SD                                                                                      | –                                                                                                           | –                                      | EXPAND                                                                                                                 |
| Termokimia/termodinamika (§18) | Di dalam topik `reaksi`                                                                                    | 8/10 · 3/10 · 1                                                                                                    | Energi dalam, hukum termodinamika, topik tersendiri                                                                                     | –                                                                                                           | –                                      | BUILD topik termokimia dan termodinamika                                                                               |
| Kinetika (§19)                 | Topik `laju`, lab Laju reaksi                                                                              | 6/6 · 3/6 · 0                                                                                                      | Lapis SD, kamus hukum laju, mekanisme, Arrhenius                                                                                        | –                                                                                                           | –                                      | EXPAND                                                                                                                 |
| Kesetimbangan (§20)            | Di dalam topik `laju`                                                                                      | 5/5 · 1/5 · 0                                                                                                      | Topik tersendiri, Ksp, kesetimbangan asam–basa                                                                                          | –                                                                                                           | –                                      | BUILD topik kesetimbangan                                                                                              |
| Asam–basa (§21)                | Topik `asam-basa`, lab pH dan Titrasi                                                                      | 9/10 · 4/10 · 1                                                                                                    | Asam basa Lewis di kamus, pOH, pKa                                                                                                      | –                                                                                                           | –                                      | EXPAND                                                                                                                 |
| Elektrokimia (§22)             | Topik `redoks`, lab Sel volta                                                                              | 7/9 · 4/9 · 0                                                                                                      | Sel elektrolisis, potensial elektrode, topik tersendiri                                                                                 | –                                                                                                           | –                                      | BUILD topik elektrokimia                                                                                               |
| Kimia analitik (§23)           | Titrasi                                                                                                    | 4/7 · 1/7 · 0                                                                                                      | Analisis kualitatif/kuantitatif, kromatografi, elektroanalisis                                                                          | –                                                                                                           | –                                      | BUILD topik kimia analitik                                                                                             |
| Spektroskopi (§24)             | Satu paragraf di lapis kuliah `karbon`                                                                     | 4/6 · 0/6 · 0                                                                                                      | UV-Vis, interpretasi spektrum, kamus                                                                                                    | –                                                                                                           | –                                      | BUILD topik spektroskopi                                                                                               |
| Kimia fisik (§25)              | Paragraf kuliah di `atom`, `ikatan`, `laju`                                                                | 4/4 · 0/4 · 0                                                                                                      | Topik kimia kuantum/fisik, kamus                                                                                                        | –                                                                                                           | –                                      | BUILD topik kimia kuantum & fisik                                                                                      |

### A.4 Kelengkapan metadata, sumber, relasi, dan pendidikan

| Ukuran           | Hasil awal                                                                                                                                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entitas          | 118 unsur · 292 molekul · 48 golongan · **0 isotop · 0 ion · 0 reaksi terstruktur · 0 material/campuran**                                                                                                                                                                     |
| Metadata unsur   | Isotop 0/118 · sejarah 0/118 · kegunaan 0/118 · bahaya 0/118 · foto 106/118 · Wikipedia 118/118                                                                                                                                                                               |
| Metadata molekul | Geometri VSEPR 39/292 · kepolaran 0/292 · foto berlisensi 118/292                                                                                                                                                                                                             |
| Sumber materi    | **0 dari 14 topik** mencantumkan rujukan bacaan                                                                                                                                                                                                                               |
| Relasi           | 61 dari 126 istilah kamus buntu (tanpa istilah terkait atau contoh molekul) · 22 istilah tidak pernah ditautkan dari materi · 151 molekul tidak dirujuk materi atau kamus · halaman unsur tidak menaut ke konsep · halaman molekul tidak menaut ke unsur, konsep, atau reaksi |
| Pendidikan       | 9 kombinasi topik–jenjang tanpa teks (7 topik tanpa lapis SD, `zat` tanpa lapis kuliah) · median 86–137 kata per jenjang · 116 soal (lapis kuliah hanya 1–2 soal per topik) · catatan guru 14/14                                                                              |

### A.5 Temuan akurasi ilmiah (CORRECT)

1. `ikatan` (kuliah) dan kartu `magnesium-oxide`: titik leleh MgO ditulis 2852 °C, sedangkan rekaman PubChem di
   aplikasi (HSDB/CAMEO) mencantumkan 2825 °C dan 2800 °C.
2. `periodik` (kuliah): "unsur superberat … dengan waktu paruh milidetik" terlalu umum; sebagian nuklida superberat
   berwaktu paruh detik sampai jam (data AMDC di PubChem).
3. `karbon` (kuliah): klaim spektrum rujukan PubChem ditautkan di setiap halaman molekul belum benar.
4. `biomolekul` (kuliah): "hingga jutaan kali" menyiratkan batas atas; percepatan oleh enzim umumnya jutaan kali
   atau lebih dan dapat melebihi 10¹⁷ kali.
5. Kartu `acetylene`: suhu nyala oksiasetilena "sekitar 3000 °C" terlalu rendah; nyala ini melebihi 3000 °C.
6. Tabel periodik: warna CPK paladium tersimpan sebagai `#6985` karena angka nol di depan terpotong saat sinkronisasi.

Teks lain yang diperiksa (tahun penemuan, potensi pemanasan global, celah pita, titik leleh, konstanta asam) sesuai
sumber. Kamus tidak memuat definisi yang salah.

### A.6 Prioritas pekerjaan

1. Peta pengetahuan kimia (ontologi) dengan materi sebagai titik masuk, dipakai halaman peta, pencarian, dan audit.
2. Entitas baru dari sumber resmi: isotop, ion, reaksi terstruktur, material & campuran; data unsur lengkap.
3. Materi: topik baru untuk domain yang belum ada, empat lapis untuk semua topik, rujukan OpenStax terverifikasi,
   kuis per jenjang, dan perbaikan akurasi.
4. Pencarian terpadu (nama, rumus, lambang, CAS, CID, SMILES, InChI, InChIKey, IUPAC, konsep, reaksi, materi) dan
   relasi antarhalaman agar tidak ada halaman buntu.
5. Mengganti nama lama menjadi Kimialoka di seluruh aplikasi dan dokumen.
6. Audit ulang dari data setelah implementasi.

## B. Audit ulang setelah implementasi (29 September 2026, versi 3.0.0)

### B.1 Cara audit ulang

1. `npm run audit` menghitung ulang semua angka di bawah langsung dari data, dengan **194 konsep dan pola kata kunci
   yang sama persis** dengan audit awal, sehingga Bagian A dan B dapat dibandingkan. Kehadiran kata kunci tetap batas
   atas: kata yang muncul belum tentu dijelaskan, jadi setiap domain juga dibaca ulang.
2. `npm run data:check` memeriksa integritas: setiap tautan di materi, kamus, peta, ion, reaksi, dan material; kuis;
   rekaman PubChem molekul dan ion (rumus dan muatan harus cocok); 440+ rujukan OpenStax terhadap daftar isi resmi;
   kesetaraan atom dan muatan setiap reaksi kimia, A dan Z setiap reaksi inti; data isotop dan berat atom.
3. Setiap rute (272 rute: semua domain, ion, reaksi, material, materi, lab) dibuka di browser pada empat jenjang dan
   dua bahasa, di lebar 1280 px dan 375 px: tidak ada error skrip dan tidak ada gulir horizontal. Audit aksesibilitas
   axe (WCAG 2.1 AA) mencakup halaman baru; tes unit 18/18 dan tes browser 50/50 lulus.
4. Klaim ilmiah baru diperiksa ulang terhadap sumbernya (rekaman PubChem PUG View unsur, NUBASE/AMDC, CIAAW,
   OpenStax), dan tampilan diperiksa dari tangkapan layar.

### B.2 Matriks audit akhir

_Konsep_ dibaca "teks / kamus" dengan pola audit awal (A → B). Kolom _Salah_ dan _Tanpa sumber_ menunjukkan keadaan
akhir.

| Domain                         | Yang ada sekarang                                                                                                                                                                                        | Konsep A → B                               | Sisa celah                                          | Salah                 | Tanpa sumber | Tindakan yang dilakukan                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- | --------------------- | ------------ | --------------------------------------------------------- |
| Materi (§4)                    | Topik `zat` dan `larutan` (4 lapis), 20 material jenis larutan/koloid/suspensi/campuran, lab Partikel & wujud                                                                                            | 10/8 → 13/13                               | –                                                   | –                     | –            | EXPAND `zat`, BUILD topik larutan, BUILD katalog campuran |
| Partikel (§5)                  | Topik `partikel`, istilah partikel materi dan partikel elementer                                                                                                                                         | 4/3 → 7/7                                  | –                                                   | –                     | –            | BUILD                                                     |
| Struktur atom (§6)             | Topik `atom` dan `kuantum`, lab Konfigurasi elektron                                                                                                                                                     | 15/11 → 15/15                              | –                                                   | –                     | –            | EXPAND                                                    |
| Tabel periodik & unsur (§7)    | Tabel dapat diklik, dicari, disaring (kategori, blok, wujud), peta panas; halaman unsur dengan berat atom CIAAW, isotop alami, sejarah, kegunaan, sumber, kelimpahan, GHS, ion, reaksi, material, materi | metadata lengkap sesuai sumber (lihat B.4) | teks sumber berbahasa Inggris                       | –                     | –            | BUILD data unsur, FIX CPK, CORRECT label berat atom Am–Md |
| Isotop & inti (§8)             | Penjelajah isotop (3.557 nuklida), halaman nuklida, 6 reaksi inti, topik `nuklir`, lab Waktu paruh                                                                                                       | 4/1 → 9/9                                  | keadaan isomer hanya di halaman nuklida (kuliah)    | –                     | –            | BUILD                                                     |
| Ion (§9)                       | Penjelajah ion (60), topik `ion`                                                                                                                                                                         | 1/2 → 4/4                                  | 2 ion tanpa rekaman PubChem (dinyatakan)            | –                     | –            | BUILD                                                     |
| Ikatan (§10)                   | Topik `ikatan`, `bentuk`, `antarmolekul`; kepolaran beralasan untuk 39 molekul                                                                                                                           | 13/11 → 13/13                              | –                                                   | –                     | –            | EXPAND, BUILD kepolaran                                   |
| Molekul & senyawa (§11)        | Pencarian nama, IUPAC, rumus, CAS, CID, SMILES, InChI, InChIKey; halaman molekul tersambung ke unsur, ion, reaksi, material, materi; tautan spektrum                                                     | identitas 100%                             | kepolaran hanya untuk molekul kecil berbentuk VSEPR | –                     | –            | BUILD, FIX tautan spektrum                                |
| Organik (§12)                  | Topik `karbon`, `gugus-fungsi`, `reaksi-organik`                                                                                                                                                         | 17/1 → 21/21                               | –                                                   | –                     | –            | BUILD                                                     |
| Anorganik (§13)                | Topik `anorganik`, ion → senyawa                                                                                                                                                                         | 11/5 → 13/13                               | –                                                   | –                     | –            | BUILD                                                     |
| Biokimia (§14)                 | Topik `biomolekul`, 9 makromolekul PDB                                                                                                                                                                   | 10/4 → 11/11                               | –                                                   | CORRECT (enzim)       | –            | EXPAND                                                    |
| Material (§15)                 | Topik `material`, 46 material & campuran                                                                                                                                                                 | 9/7 → 10/10                                | –                                                   | –                     | –            | BUILD                                                     |
| Reaksi (§16)                   | Pustaka 76 reaksi setara, 18 jenis, alur pereaksi → kondisi → perubahan → hasil                                                                                                                          | 8/5 → 9/9                                  | –                                                   | CORRECT (notasi fisi) | –            | BUILD                                                     |
| Stoikiometri (§17)             | Topik `stoikiometri`, lab Penyetaraan & Massa molar                                                                                                                                                      | 11/5 → 12/12                               | –                                                   | –                     | –            | EXPAND                                                    |
| Termokimia/termodinamika (§18) | Topik `termokimia`, `termodinamika`                                                                                                                                                                      | 8/3 → 10/10                                | –                                                   | –                     | –            | BUILD                                                     |
| Kinetika (§19)                 | Topik `laju`, lab Laju reaksi                                                                                                                                                                            | 6/3 → 6/6                                  | –                                                   | –                     | –            | EXPAND                                                    |
| Kesetimbangan (§20)            | Topik `kesetimbangan`                                                                                                                                                                                    | 5/1 → 5/5                                  | –                                                   | –                     | –            | BUILD                                                     |
| Asam–basa (§21)                | Topik `asam-basa`, lab pH & Titrasi                                                                                                                                                                      | 9/4 → 10/10                                | –                                                   | –                     | –            | EXPAND                                                    |
| Elektrokimia (§22)             | Topik `elektrokimia`, lab Sel volta                                                                                                                                                                      | 7/4 → 9/9                                  | –                                                   | –                     | –            | BUILD                                                     |
| Kimia analitik (§23)           | Topik `analitik`                                                                                                                                                                                         | 4/1 → 7/7                                  | –                                                   | –                     | –            | BUILD                                                     |
| Spektroskopi (§24)             | Topik `spektroskopi`, tautan spektrum PubChem                                                                                                                                                            | 4/0 → 6/6                                  | spektrum tidak digambar di aplikasi                 | –                     | –            | BUILD                                                     |
| Kimia fisik (§25)              | Topik `kuantum`, `termodinamika`                                                                                                                                                                         | 4/0 → 4/4                                  | –                                                   | –                     | –            | BUILD                                                     |

### B.3 Hasil hitungan `npm run audit`

#### Cakupan konsep per domain

| Domain                 | Konsep  | Di teks materi | Di kamus | Di keempat lapis | Belum ada |
| ---------------------- | ------- | -------------- | -------- | ---------------- | --------- |
| §4 Matter              | 13      | 13             | 13       | 9                | –         |
| §5 Particles           | 7       | 7              | 7        | 1                | –         |
| §6 Atomic structure    | 15      | 15             | 15       | 1                | –         |
| §8 Isotopes & nuclear  | 9       | 9              | 9        | 1                | –         |
| §9 Ions                | 4       | 4              | 4        | 1                | –         |
| §10 Bonding            | 13      | 13             | 13       | 1                | –         |
| §12 Organic            | 21      | 21             | 21       | 2                | –         |
| §13 Inorganic          | 13      | 13             | 13       | 5                | –         |
| §14 Biochemistry       | 11      | 11             | 11       | 2                | –         |
| §15 Materials          | 10      | 10             | 10       | 4                | –         |
| §16 Reactions          | 9       | 9              | 9        | 0                | –         |
| §17 Stoichiometry      | 12      | 12             | 12       | 1                | –         |
| §18 Thermochemistry    | 10      | 10             | 10       | 1                | –         |
| §19 Kinetics           | 6       | 6              | 6        | 0                | –         |
| §20 Equilibrium        | 5       | 5              | 5        | 0                | –         |
| §21 Acids & bases      | 10      | 10             | 10       | 3                | –         |
| §22 Electrochemistry   | 9       | 9              | 9        | 1                | –         |
| §23 Analytical         | 7       | 7              | 7        | 1                | –         |
| §24 Spectroscopy       | 6       | 6              | 6        | 2                | –         |
| §25 Physical chemistry | 4       | 4              | 4        | 0                | –         |
| **Total**              | **194** | **194**        | **194**  | **36**           |           |

#### Entitas

| Entitas                            | Jumlah                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Unsur                              | 118                                                                                                       |
| Nuklida (keadaan dasar, IAEA AMDC) | 3557 (253 stabil, 289 ada di alam)                                                                        |
| Ion                                | 60 (27 kation, 33 anion, 29 poliatom, 3 kompleks)                                                         |
| Molekul & senyawa katalog          | 292                                                                                                       |
| Golongan senyawa                   | 48                                                                                                        |
| Reaksi terstruktur                 | 70 kimia + 6 inti, 18 jenis                                                                               |
| Material & campuran                | 46 (paduan 12, kaca 2, keramik 2, komposit 5, larutan 5, koloid 7, suspensi 1, heterogen 3, biopolimer 9) |
| Domain peta kimia                  | 23 dengan 309 konsep                                                                                      |
| Istilah kamus                      | 309                                                                                                       |
| Topik materi                       | 29                                                                                                        |
| Lab virtual                        | 14                                                                                                        |

#### Kelengkapan metadata

| Ukuran                                                       | Hasil                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Berat atom standar IUPAC CIAAW                               | 84/118 (71%) (sisanya tidak punya berat atom standar; dicatat nomor massa atau massa isotop NIST)                 |
| Komposisi isotop alami (CIAAW/NIST)                          | 84/118 (71%)                                                                                                      |
| Data nuklida (IAEA AMDC)                                     | 118/118 (100%)                                                                                                    |
| Sejarah (teks sumber)                                        | 118/118 (100%)                                                                                                    |
| Kegunaan (teks sumber)                                       | 116/118 (98%)                                                                                                     |
| Sumber di alam (teks sumber)                                 | 69/118 (58%)                                                                                                      |
| Deskripsi (teks sumber)                                      | 111/118 (94%)                                                                                                     |
| Penanganan (teks sumber)                                     | 39/118 (33%)                                                                                                      |
| Kelimpahan kerak/laut (Jefferson Lab)                        | 88/118 (75%) (sisanya tidak terdapat alami)                                                                       |
| Klasifikasi GHS zat unsur                                    | 84/118 (71%)                                                                                                      |
| Pemakaian isotop (IUPAC IPTEI)                               | 96/118 (81%)                                                                                                      |
| Foto berlisensi · Wikipedia                                  | 106/118 (90%) · 118/118 (100%)                                                                                    |
| Molekul: SMILES · InChIKey · CAS                             | 292/292 (100%) · 292/292 (100%) · 292/292 (100%)                                                                  |
| Molekul: CAS dan InChIKey di indeks pencarian                | 292/292 (100%) · 292/292 (100%)                                                                                   |
| Molekul: struktur · data eksperimen · GHS                    | 260/292 (89%) · 284/292 (97%) · 281/292 (96%)                                                                     |
| Molekul: geometri VSEPR · kepolaran beralasan (OpenStax 7.6) | 39/292 (13%) · 39/292 (13%) (molekul kecil berbentuk VSEPR; molekul besar, ionik, dan polimer tidak diberi label) |
| Ion dengan rekaman PubChem yang cocok rumus & muatannya      | 58/60 (97%) (nitrida dan peroksida tidak punya rekaman ion bebas)                                                 |

#### Kelengkapan sumber

| Data                    | Dengan rujukan             |
| ----------------------- | -------------------------- |
| Topik materi (OpenStax) | 29/29 (100%) · 146 rujukan |
| Reaksi                  | 76/76 (100%)               |
| Material                | 46/46 (100%)               |
| Ion                     | 60/60 (100%)               |
| Domain peta             | 23/23 (100%)               |

#### Kelengkapan relasi

| Ukuran                                                                                                            | Hasil                                                                                   |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Istilah kamus yang buntu (tanpa istilah terkait, contoh, domain, materi, atau rujukan balik)                      | 0/309                                                                                   |
| Istilah kamus yang ditautkan dari materi                                                                          | 222/309 (72%)                                                                           |
| Istilah kamus yang masuk peta domain                                                                              | 309/309 (100%)                                                                          |
| Molekul katalog yang dirujuk materi, kamus, ion, reaksi, atau material                                            | 208/292 (71%)                                                                           |
| Unsur yang muncul di molekul, ion, reaksi, atau material katalog (semua unsur punya halaman, isotop, dan rujukan) | 47/118 (40%)                                                                            |
| Halaman unsur                                                                                                     | isotop, ion, molekul, reaksi, material, materi, domain, rujukan                         |
| Halaman molekul                                                                                                   | unsur penyusun, ion, reaksi, material, materi yang membahasnya, tautan spektrum PubChem |
| Halaman istilah                                                                                                   | domain peta, materi yang memakainya, istilah yang merujuknya                            |

#### Kelengkapan pendidikan

| Topik          | Lapis (SD/SMP/SMA/Kuliah) kata | Soal per jenjang | Rujukan |
| -------------- | ------------------------------ | ---------------- | ------- |
| zat            | 102 / 130 / 129 / 171          | 3 / 3 / 2 / 2    | 4       |
| larutan        | 105 / 158 / 218 / 186          | 3 / 3 / 4 / 2    | 6       |
| partikel       | 126 / 182 / 188 / 193          | 3 / 3 / 3 / 2    | 4       |
| atom           | 77 / 141 / 152 / 170           | 2 / 3 / 3 / 2    | 5       |
| periodik       | 125 / 109 / 120 / 151          | 2 / 3 / 4 / 2    | 3       |
| nuklir         | 105 / 182 / 198 / 218          | 2 / 3 / 4 / 3    | 6       |
| ion            | 87 / 155 / 184 / 161           | 2 / 3 / 4 / 2    | 5       |
| ikatan         | 90 / 100 / 118 / 147           | 2 / 3 / 4 / 2    | 6       |
| bentuk         | 72 / 108 / 149 / 133           | 2 / 2 / 6 / 2    | 4       |
| antarmolekul   | 91 / 148 / 168 / 167           | 2 / 3 / 4 / 2    | 4       |
| stoikiometri   | 92 / 101 / 139 / 133           | 2 / 2 / 5 / 2    | 5       |
| reaksi         | 75 / 96 / 124 / 108            | 2 / 2 / 3 / 2    | 3       |
| termokimia     | 109 / 125 / 169 / 173          | 2 / 3 / 4 / 2    | 4       |
| termodinamika  | 93 / 116 / 210 / 172           | 2 / 3 / 4 / 3    | 5       |
| laju           | 97 / 79 / 157 / 132            | 2 / 3 / 3 / 2    | 5       |
| kesetimbangan  | 78 / 110 / 186 / 152           | 2 / 2 / 5 / 3    | 6       |
| asam-basa      | 98 / 94 / 148 / 143            | 3 / 2 / 3 / 2    | 6       |
| redoks         | 81 / 87 / 160 / 123            | 2 / 2 / 4 / 2    | 4       |
| elektrokimia   | 96 / 132 / 238 / 189           | 2 / 3 / 4 / 3    | 7       |
| karbon         | 66 / 92 / 145 / 126            | 2 / 2 / 5 / 2    | 4       |
| gugus-fungsi   | 85 / 121 / 230 / 203           | 2 / 3 / 5 / 3    | 6       |
| reaksi-organik | 84 / 89 / 187 / 188            | 2 / 3 / 5 / 3    | 8       |
| anorganik      | 79 / 106 / 202 / 196           | 2 / 3 / 5 / 3    | 7       |
| biomolekul     | 86 / 92 / 130 / 151            | 2 / 2 / 3 / 2    | 6       |
| material       | 89 / 117 / 139 / 136           | 2 / 2 / 3 / 2    | 3       |
| analitik       | 118 / 108 / 154 / 177          | 2 / 3 / 4 / 2    | 4       |
| spektroskopi   | 100 / 110 / 169 / 248          | 2 / 2 / 4 / 4    | 8       |
| kuantum        | 88 / 108 / 212 / 194           | 2 / 2 / 4 / 3    | 5       |
| lingkungan     | 78 / 95 / 137 / 154            | 2 / 2 / 3 / 2    | 3       |

Kombinasi topik–jenjang tanpa teks: 0. Median kata per lapis (teks Indonesia): sd 90 · smp 109 · sma 160 · kuliah 167. Soal: 319 (sd 62 · smp 75 · sma 114 · kuliah 68). Catatan guru: 29/29.

_Di keempat lapis_ menghitung konsep yang kata kuncinya muncul di teks SD, SMP, SMA, **dan** kuliah. Angkanya sengaja
rendah: istilah seperti entalpi atau hibridisasi memang tidak dipakai di teks SD. Yang dijamin berlapis empat adalah
setiap **topik** (29/29 punya teks SD, SMP, SMA, dan kuliah); setiap **istilah** punya definisi sederhana dan ilmiah
yang tampil sesuai jenjang di kamus dan peta.

### B.4 Temuan akurasi (CORRECT) dan statusnya

| Temuan                                                        | Status                                                                                                                                                                                                                |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A.5-1 Titik leleh MgO 2852 °C                                 | Diperbaiki menjadi sekitar 2825 °C (PubChem) di materi dan kartu molekul                                                                                                                                              |
| A.5-2 "Unsur superberat … milidetik"                          | Diperbaiki menjadi "sebagian besar isotopnya hanya bertahan beberapa detik atau kurang" (data AMDC: yang terlama, ²⁶⁸Db, sekitar 29 jam)                                                                              |
| A.5-3 Klaim tautan spektrum                                   | Diperbaiki: halaman molekul (SMA ke atas) kini menaut ke Informasi Spektrum PubChem                                                                                                                                   |
| A.5-4 Batas percepatan enzim                                  | Diperbaiki: jutaan kali atau lebih, dapat melebihi 10¹⁷                                                                                                                                                               |
| A.5-5 Nyala oksiasetilena                                     | Diperbaiki: di atas 3000 °C                                                                                                                                                                                           |
| A.5-6 Warna CPK Pd `#6985`                                    | Diperbaiki menjadi `#006985` (nol di depan tidak lagi terpotong)                                                                                                                                                      |
| B-1 Am sampai Md berlabel "berat atom standar"                | Diperbaiki: nilai NIST untuk unsur tanpa berat atom standar CIAAW adalah massa satu isotop (mis. ²⁴¹Am) atau nomor massa acuan; halaman unsur menjelaskannya dan `data:check` menolak label standar dari selain CIAAW |
| B-2 Fisi U-235 tertulis ³₀n                                   | Diperbaiki: spesies inti punya jumlah, ditulis 3 ¹₀n; neraca A dan Z memperhitungkannya                                                                                                                               |
| B-3 Rumus bermuatan dalam teks biasa tertulis `SO₄^2-`        | Diperbaiki: muatan menjadi superskrip (SO₄²⁻) di judul, suara, kuis, dan halaman unsur                                                                                                                                |
| B-4 Sumber kelimpahan kerak/laut tidak tercatat               | Diperbaiki: tercatat Jefferson Lab untuk 118 unsur dan ditampilkan                                                                                                                                                    |
| B-5 Daftar cakupan di halaman peta memakai `<dl>` tidak valid | Diperbaiki (ditemukan axe)                                                                                                                                                                                            |

Tidak ada nilai sifat, rumus, struktur, pengenal, reaksi, atau bahaya yang dibuat sendiri. Bila sumber tidak punya
datanya, halaman menulis "Data belum tersedia" (misalnya GHS unsur tanpa klasifikasi, ion tanpa rekaman PubChem).

### B.5 Definition of Done

| Syarat                                        | Status | Bukti                                                                                                                            |
| --------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Ontologi kimia jelas                          | Ya     | `js/data/ontology.js`: rantai 15 langkah, 23 domain, 309 konsep = seluruh kamus; `#/peta`                                        |
| Cakupan materi (matter) jelas                 | Ya     | Domain Materi & Partikel, topik `zat`, `larutan`, `partikel`, 20 campuran                                                        |
| Struktur atom lengkap sesuai lingkup          | Ya     | 15/15 konsep di teks dan kamus; topik `atom`, `kuantum`                                                                          |
| Tabel periodik berfungsi                      | Ya     | Klik, cari, saring kategori/blok/wujud, peta panas; tes browser                                                                  |
| Penjelajah unsur                              | Ya     | `#/atom/<lambang>` dengan semua metadata §7 yang tersedia di sumber                                                              |
| Penjelajah ion                                | Ya     | `#/ion`, 60 ion                                                                                                                  |
| Penjelajah molekul dan senyawa                | Ya     | `#/explore`, `#/search`, `#/molecule/…`, golongan; semua identitas §11 dapat dicari                                              |
| Cakupan material                              | Ya     | `#/material`, 46 entri, 9 jenis                                                                                                  |
| Sistem reaksi                                 | Ya     | `#/reaction`, 76 reaksi setara dengan alur empat langkah                                                                         |
| Sistem pendidikan                             | Ya     | 5 mode, 29 topik empat lapis, jalur belajar per jenjang, 319 soal, 9 kuis tantangan, 14 lab, ruang guru dengan rujukan           |
| Pencarian                                     | Ya     | `#/search`: nama, rumus, lambang, pengenal, nama IUPAC, konsep, reaksi, materi, lab                                              |
| Pengetahuan terkait (tanpa halaman buntu)     | Ya     | 0/309 istilah buntu; halaman unsur, molekul, ion, reaksi, material, istilah, dan materi saling menaut                            |
| Atribusi sumber                               | Ya     | 100% topik, reaksi, material, ion, dan domain punya rujukan; data unsur menyimpan sumber per nilai                               |
| Caching dan pengambilan yang dapat berkembang | Ya     | PubChem langsung lewat proxy ber-cache, rekaman per entitas dimuat saat dibuka, materi dimuat per topik, precache service worker |
| Responsif                                     | Ya     | 272 rute tanpa gulir horizontal di 375 px; tes 320 px; target sentuh 44 px                                                       |
| Tanpa error runtime besar                     | Ya     | Smoke test semua rute, 4 jenjang × 2 bahasa, tanpa error; tes browser 50/50                                                      |
| Tanpa data ilmiah palsu                       | Ya     | Lihat B.4 dan `data:check`                                                                                                       |
| Analisis celah akhir                          | Ya     | Bagian ini                                                                                                                       |

### B.6 Sisa celah dan saran berikutnya

1. **Bahasa sumber.** Teks sejarah, kegunaan, dan pemakaian isotop dari LANL, Jefferson Lab, dan IUPAC IPTEI
   ditampilkan dalam bahasa Inggris aslinya. Teks IPTEI berlisensi CC BY-NC-ND sehingga tidak boleh diterjemahkan.
2. **Kepolaran** baru diberikan untuk 39 molekul kecil berbentuk VSEPR. Molekul besar dan polimer perlu analisis
   per gugus, bukan label tunggal.
3. **Spektrum** hanya ditautkan ke PubChem; menampilkan spektrum di aplikasi memerlukan sumber data dengan lisensi
   yang jelas.
4. **Data termokimia per molekul** (ΔHf°, S°) belum ada; NIST Chemistry WebBook adalah kandidat sumber, dengan
   ketentuan pemakaiannya diperiksa dulu.
5. **Relasi katalog.** 84 molekul katalog belum dirujuk materi, ion, reaksi, atau material (masih dapat dicari dan
   dijelajahi per golongan). 87 istilah kamus belum ditautkan langsung dari teks materi, tetapi semuanya masuk peta.
6. **Identitas merek.** Selesai: logo huruf "m" yang lama sudah diganti dengan labu kimia berbentuk "A"
   (`assets/brand/mark.svg` dan ikon turunannya).
