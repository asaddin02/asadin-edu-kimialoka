# Changelog

## Belum dirilis

- Berganti nama menjadi **Kimialoka** dan pindah ke https://kimialoka.asadinedu.com. Data yang tersimpan di browser
  pada alamat lama tidak ikut pindah: ekspor cadangan di situs lama, lalu impor di alamat baru.
- Alamat halaman kini berupa path (`/atom/Fe`, `/molecule/water`, `/learn/zat`, `/search?q=…`), bukan `#/…`;
  tautan lama `#/…` tetap bekerja dan diarahkan otomatis.
- Setiap halaman publik dirender di awal saat build (`scripts/prerender.mjs`) menjadi HTML statis dengan judul,
  deskripsi, URL kanonis, Open Graph, JSON-LD, dan isi yang terbaca tanpa JavaScript, sehingga mesin pencari dapat
  mengindeksnya; `sitemap.xml` memuat semua URL, `robots.txt` mengizinkan `/data/`, dan `404.html` memuat aplikasi.

## 3.0.0 — Kimialoka (2026-09-29)

Atlas molekul diperluas menjadi **ensiklopedia kimia**
interaktif dan platform belajar. Audit cakupan sebelum dan sesudah perubahan: [docs/AUDIT-CHEMISTRY.md](docs/AUDIT-CHEMISTRY.md).

### Konten

- Peta kimia (`#/peta`): rantai Materi → … → Transformasi dan 23 cabang kimia dengan 309 konsep, materi, penjelajah,
  lab, dan rujukan.
- 29 topik (sebelumnya 14), semuanya dalam empat lapis SD/SMP/SMA/kuliah; topik baru: partikel, larutan & koloid,
  kimia inti, ion, gaya antarmolekul, termokimia, termodinamika, kesetimbangan, elektrokimia, gugus fungsi, reaksi
  organik, kimia anorganik, kimia analitik, spektroskopi, kimia kuantum. 319 soal kuis (sebelumnya 116), rujukan
  OpenStax pada setiap topik dengan judul bagian resmi.
- Kamus 309 istilah (sebelumnya 126); setiap istilah masuk peta domain atau tersambung ke istilah lain.
- Entitas baru: 3.557 nuklida (IAEA AMDC), 60 ion (PubChem), 76 reaksi setara (70 kimia + 6 inti), 46 material dan
  campuran (termasuk 9 makromolekul hayati dengan struktur RCSB PDB).
- Data unsur dari PubChem PUG View: berat atom standar IUPAC CIAAW, komposisi isotop alami, sejarah, kegunaan,
  sumber di alam, kelimpahan, bahaya GHS zat unsur, dan pemakaian isotop, semuanya dengan sumber.

### Fitur

- Pencarian terpadu (`#/search`) untuk semua entitas, dengan pengenalan CID, CAS (cek digit), InChI, InChIKey,
  SMILES, rumus, dan nuklida, serta pencarian PubChem langsung.
- Penjelajah isotop dengan peta nuklida, penjelajah ion, pustaka reaksi, katalog material, dan lab baru
  **Waktu paruh & peluruhan**.
- Halaman unsur, molekul, dan istilah kini saling menaut ke ion, reaksi, material, materi, dan domain; tautan
  informasi spektrum PubChem di halaman molekul; filter kategori, blok, dan wujud di tabel periodik.
- Kuis tantangan baru: nama & rumus ion, jenis reaksi. Modul ajar guru mencantumkan rujukan.
- Materi dimuat saat dibuka (`meta.js` hasil build) sehingga daftar materi, pencarian, dan beranda tetap ringan.

### Perbaikan ketepatan

- Titik leleh MgO (2825 °C, sesuai PubChem), klaim unsur superberat, klaim tautan spektrum, batas percepatan enzim,
  suhu nyala oksiasetilena, dan warna CPK paladium (`#006985`).
- Am sampai Md tidak lagi disebut punya berat atom standar: nilai NIST untuknya adalah massa satu isotop.
- Fisi uranium-235 menulis tiga neutron sebagai 3 ¹₀n (bukan ³₀n).
- Rumus bermuatan dalam teks biasa ditulis dengan superskrip (SO₄²⁻, bukan SO₄^2-).

### Produksi

- Server dan precache menyajikan `data/ions/` dan `data/isotopes.json`; proxy mengizinkan pencarian PubChem per
  InChIKey, SMILES, dan InChI; CSP mengizinkan gambar RCSB PDB.
- `npm run build` kini juga membuat indeks materi dan judul rujukan; `npm run audit` baru; `data:check` memeriksa
  topik empat lapis, ion, reaksi (atom, muatan, A dan Z), material, peta kimia, rujukan OpenStax, dan data isotop.

## 2.0.0 (2026-09-26)

Atlas molekul dibangun ulang dari awal.

### Konten

- Katalog 292 molekul, mineral, dan material (sebelumnya 49) dengan CID yang diverifikasi ke PubChem.
- Data resmi tersinkron per molekul: sifat terhitung, data eksperimen, GHS, kegunaan, sinonim, struktur 3D/2D,
  artikel Wikipedia ID/EN, dan foto Commons berlisensi.
- Tabel periodik lengkap 118 unsur dari PubChem (sebelumnya 43), dengan foto, model Bohr, dan diagram orbital.
- Pohon golongan: 7 keluarga, 41 golongan, dan anggota tambahan dari PubChem.
- 14 topik Kurikulum Merdeka bertingkat (sebelumnya 8), 116 soal kuis berpembahasan, catatan guru.
- Kamus 126 istilah (sebelumnya 12). "Kimia di sekitarku" dengan 10 tempat.

### Fitur

- Mode Guru (5 mode), pencarian ke seluruh PubChem (nama Indonesia, rumus, CID), halaman untuk senyawa apa pun.
- 13 lab virtual, kuis tantangan dari data, lencana, bandingkan molekul, ruang guru (modul ajar, LKPD, kartu flash,
  tautan tugas), baca-suara, cetak, ekspor/impor data.
- Penampil 3D baru (pointer, sentuh, keyboard), gambar struktur 2D SVG, model kisi kristal.
- PWA: app shell dan data di-precache; "Simpan semua untuk offline".

### Produksi

- Server aman: daftar path yang diizinkan, 400 untuk URL rusak, proxy PubChem ber-cache dan bertempo, batas laju,
  header keamanan, HOST 0.0.0.0.
- Dockerfile, CI (lint, cek konten, tes unit, Playwright + axe, image Docker), deploy Cloudflare Pages,
  penyegaran data bulanan.
