# Kimialoka · Asadin Edu

**Ensiklopedia kimia interaktif dan platform belajar** untuk pelajar SD sampai mahasiswa, serta guru: dari
materi, partikel, atom, unsur, isotop, ion, molekul, senyawa, material, dan campuran sampai sifat, ikatan, reaksi,
dan cabang-cabang ilmu kimia. Dwibahasa (Bahasa Indonesia dan English), tanpa akun, tanpa iklan, tanpa analitik,
dan bisa dipakai offline. Saudara dari [Biotaloka](https://github.com/asaddin02/asadin-edu-biotaloka) dalam keluarga
Asadin Edu.

> _English summary:_ Kimialoka is an open, bilingual interactive chemistry encyclopedia and learning platform. A
> knowledge map leads from matter to transformation across 23 branches of chemistry (309 concepts); 118 elements
> with IUPAC standard atomic weights, natural isotopes and history/uses from reference institutions; 3,557 nuclides;
> 60 ions; 292 curated molecules and materials plus search across 100+ million PubChem compounds by name, formula,
> CAS, CID, SMILES, InChI or InChIKey; 76 balanced reactions; 46 materials and mixtures; 29 lessons written in four
> layers (primary → university) with 319 quiz questions and OpenStax references; 14 virtual labs; a teacher room.
> No framework, no build step for the browser, no tracking.

## Isi

| Bagian                  | Isi                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Peta kimia**          | Titik masuk dari materi: rantai Materi → Partikel → Atom → Unsur → Isotop → Ion → Molekul → Senyawa → Material → Campuran → Sifat → Struktur → Ikatan → Reaksi → Transformasi, dan 23 cabang kimia (dasar, struktur, perubahan, cabang ilmu) dengan 309 konsep, materi, penjelajah, lab, dan rujukan.                                                      |
| **Pencarian terpadu**   | Satu kotak untuk unsur, isotop ("C-14"), ion, molekul, golongan, reaksi, material, materi, konsep, domain, dan lab. Mengenali nama, nama IUPAC, rumus (termasuk isomer), nomor CAS (dengan cek digit), CID, SMILES, InChI, dan InChIKey, lalu mencari juga di PubChem.                                                                                     |
| **Unsur**               | 118 unsur: tabel periodik yang dapat diklik, dicari, dan disaring (kategori, blok, wujud) atau diwarnai peta panas. Halaman unsur: berat atom standar IUPAC CIAAW (atau alasan tidak ada), isotop alami, sejarah, kegunaan, sumber di alam, kelimpahan, bahaya GHS, ion, molekul, reaksi, material, dan materi terkait, semuanya dengan sumber.            |
| **Isotop**              | 3.557 nuklida dari IAEA AMDC: peta nuklida interaktif berwarna menurut waktu paruh, tabel isotop per unsur, dan halaman nuklida (waktu paruh, cara meluruh, hasil peluruhan, persamaan inti, kelimpahan, pemakaian).                                                                                                                                       |
| **Ion**                 | 60 kation dan anion (monoatom, poliatom, kompleks) dengan muatan, jumlah elektron, cara menemukan dan mengujinya, senyawa katalog, reaksi, dan rekaman PubChem yang dicocokkan rumus dan muatannya.                                                                                                                                                        |
| **Molekul & senyawa**   | 292 kartu molekul, mineral, dan material, masing-masing tersambung ke unsur penyusun, ion, reaksi, material, dan materi yang membahasnya. Sifat, struktur 2D/3D, data eksperimen, GHS, sinonim, dan tautan spektrum dari **PubChem (NIH)**; uraian **Wikipedia**; foto **Wikimedia Commons**. Senyawa lain dari 100+ juta senyawa PubChem dibuka langsung. |
| **Golongan**            | Pohon golongan materi: 7 keluarga dan 41 golongan dengan definisi, ciri, rumus umum, tata nama, dan anggota.                                                                                                                                                                                                                                               |
| **Reaksi**              | 70 reaksi kimia dan 6 reaksi inti, 18 jenis: pereaksi → kondisi → perubahan → hasil, neraca atom dan muatan (atau A dan Z), dan tautan ke lab Penyetaraan. Semua persamaan diperiksa setara secara otomatis.                                                                                                                                               |
| **Material & campuran** | 46 paduan, kaca, keramik, komposit, larutan, koloid, suspensi, campuran heterogen, dan makromolekul hayati (dengan struktur RCSB PDB), lengkap dengan komposisi, sifat, kegunaan, dan cara memisahkan.                                                                                                                                                     |
| **Materi**              | 29 topik dari zat dan partikel sampai kimia kuantum, spektroskopi, dan kimia anorganik. Setiap topik ditulis dalam **empat lapis**: Sederhana (SD), Standar (SMP), Lanjutan (SMA), Mendalam (kuliah), dengan kegiatan, **319 soal kuis**, catatan guru, dan rujukan OpenStax terverifikasi. Jalur belajar per jenjang.                                     |
| **14 lab virtual**      | Partikel & wujud zat, konfigurasi elektron, uji nyala, VSEPR 3D, perakit molekul & isomer, kristal & material, penyetaraan reaksi, massa molar & mol, pH & indikator, titrasi, hukum gas, laju reaksi, sel volta, dan **waktu paruh & peluruhan** (dengan kalkulator penanggalan radiometrik).                                                             |
| **5 mode**              | SD, SMP, SMA, Kuliah, dan Guru. Kedalaman teks, data, kuis, dan lab menyesuaikan mode.                                                                                                                                                                                                                                                                     |
| **Lainnya**             | Kamus 309 istilah (definisi sederhana dan ilmiah, domain, dan materi yang memakainya), 9 kuis tantangan dari data, "Kimia di sekitarku", bandingkan molekul, koleksi & catatan, lencana, ruang guru (modul ajar dengan rujukan, LKPD, kartu flash, tautan tugas), baca-suara, cetak.                                                                       |

Struktur 3D digambar dengan penampil Canvas buatan sendiri (tanpa pustaka), struktur 2D digambar sebagai SVG
dari koordinat 2D PubChem, dan kisi kristal (NaCl, intan, grafit, grafena, C₆₀, tabung nano, logam fcc/bcc/hcp,
rutil, perovskit, dll.) dibangun dari sel satuan dengan konstanta kisi terukur.

## Menjalankan

Tidak ada dependensi produksi dan browser memuat kode sumbernya langsung. Butuh Node.js 20+.

```bash
npm start            # server produksi: http://localhost:8080
npm run dev          # http://127.0.0.1:8086 dengan log permintaan
```

Atau buka dengan server statis apa pun (`npm run start:static`). Tanpa server Node, aplikasi memanggil PubChem
langsung dari browser (PubChem mendukung CORS).

## Deploy

Pilih salah satu:

1. **Cloudflare Pages (disarankan).** Isi variable `CLOUDFLARE_PAGES_PROJECT` serta secret `CLOUDFLARE_API_TOKEN`
   dan `CLOUDFLARE_ACCOUNT_ID` di GitHub (opsional: variable `SITE_URL`). Workflow **Deploy** berjalan setiap CI di
   `main` lulus, atau jalankan manual. Proxy PubChem berjalan sebagai Pages Function dengan cache di edge. Proyek ini
   memakai nama `kimialoka` dan terbit di https://kimialoka.asadinedu.com (custom domain; `kimialoka.pages.dev` dialihkan ke sana).
2. **Docker / server sekolah.**
   ```bash
   docker build -t kimialoka .
   docker run -d -p 8080:8080 --restart unless-stopped kimialoka
   ```
3. **Hosting statis** (GitHub Pages, Netlify, dll.): `npm run build:site`, lalu unggah folder `dist/`.

### Pengaturan server (`server/server.mjs`)

| Variabel                             | Bawaan         | Arti                                                             |
| ------------------------------------ | -------------- | ---------------------------------------------------------------- |
| `PORT`                               | `8080`         | Port HTTP                                                        |
| `HOST`                               | `0.0.0.0`      | Alamat yang didengarkan (`127.0.0.1` untuk lokal saja)           |
| `PROXY`                              | `1`            | `0` mematikan proxy PubChem; browser memanggil PubChem langsung  |
| `PUBCHEM_INTERVAL_MS`                | `250`          | Jeda minimal antarpermintaan ke PubChem (batas PubChem: 5/detik) |
| `CACHE_MAX_ENTRIES` / `CACHE_MAX_MB` | `4000` / `256` | Batas cache proxy                                                |
| `CLIENT_LIMIT_PER_MIN`               | `300`          | Batas permintaan API per klien per menit                         |
| `TRUST_PROXY`                        | `0`            | Jumlah reverse proxy di depan server (untuk IP klien yang benar) |
| `HSTS`                               | –              | `1` bila di belakang HTTPS                                       |
| `LOG`                                | –              | `1` untuk log setiap permintaan                                  |

Server hanya menyajikan path yang diizinkan (`/`, `index.html`, `css/`, `js/`, `assets/`, `data/…`); berkas lain
seperti `.git/`, `package.json`, `server/`, atau `scripts/` selalu 404. URL rusak dijawab 400 tanpa mematikan
server. Proxy hanya meneruskan endpoint baca PubChem yang ada di daftar izin (`server/policy.mjs`).

## Memperbarui data

Data referensi disinkronkan dari sumber resmi dan disimpan di repo agar cepat, bisa offline, dan hasil tes pasti:

```bash
npm run sync            # molekul, lalu unsur & isotop (PubChem PUG View, Wikidata/Wikipedia/Commons), lalu ion
npm run sync:molecules -- --only water,caffeine
npm run sync:ions       # ion (PubChem, dicocokkan rumus dan muatannya)
npm run data:check      # cek tautan, kuis, rekaman, rujukan OpenStax, kesetaraan reaksi, isotop
npm run audit           # audit cakupan kimia (Markdown), dasar docs/AUDIT-CHEMISTRY.md bagian B
npm run build           # indeks materi (meta.js), judul rujukan, dan daftar precache service worker
```

Workflow **Refresh data** menjalankan sinkronisasi setiap bulan dan membuka pull request untuk ditinjau.
Rincian sumber dan lisensi: [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md).

**Menambah molekul:** tambahkan entri di salah satu berkas `js/data/molecules/*.js` (lihat keterangan field di
`js/data/curatedMolecules.js`), lalu `npm run sync:molecules -- --only <id>` dan `npm run data:check`.
**Menambah materi, ion, reaksi, atau material:** lihat [CONTRIBUTING.md](CONTRIBUTING.md).

## Kualitas

```bash
npm run lint         # ESLint + Prettier
npm run data:check   # integritas konten
npm run test:unit    # kimia, pengenal identitas, nuklida, parser PubChem, rujukan, kebijakan proxy, keamanan server
npm run test:e2e     # Playwright: halaman, lab, kuis, guru, PWA offline, axe WCAG 2.1 AA (tema terang, termasuk preferensi gelap lama)
npm run check        # semuanya
```

Tes browser men-stub jaringan PubChem/Wikimedia sehingga berjalan offline dan deterministik.

## Struktur

```
index.html · sw.js · manifest.webmanifest
css/            style.css (token & komponen) · layouts.css (halaman, lab, cetak) · kimialoka.css (tampilan)
                · explorer.css (peta, pencarian, isotop, ion, reaksi, material)
js/app.js       shell, router, service worker
js/core/        router, preferensi, penyimpanan lokal, data pengguna
js/components/  penampil 3D, gambar 2D, GHS, model Bohr, kartu, kuis, rich text
js/pages/       beranda, pencarian, peta, jelajah, molekul, golongan, tabel, atom/unsur, isotop, ion, reaksi,
                material, belajar, lab, kuis, bandingkan, di sekitarku, kamus, tersimpan, guru, tugas, tentang
js/labs/        14 laboratorium virtual
js/data/        molekul, golongan, tabel periodik (hasil sinkronisasi), kamus, ion, reaksi, material, peta kimia
                (ontology.js), rujukan, topik (satu berkas per topik + meta.js hasil build), kurikulum
js/services/    klien PubChem & Wikimedia, pengenal identitas, parser PUG View dan rekaman unsur, nuklida,
                rumus kimia, kisi kristal, suara
data/           rekaman per molekul, unsur, dan ion; isotopes.json (semua nuklida); gambar 2D; anggota golongan
server/         server produksi dan kebijakan keamanan bersama
functions/      Cloudflare Pages Function (proxy PubChem di edge)
scripts/        sinkronisasi data, build (materi, rujukan, precache), cek konten, audit, ikon
tests/          tes unit (Node) dan tes browser (Playwright)
docs/           sumber data, audit kimia (AUDIT-CHEMISTRY.md), desain
```

## Lisensi

- Kode: [MIT](LICENSE).
- Materi belajar (kartu, topik, kuis, kamus): [CC BY-SA 4.0](LICENSE-CONTENT.md).
- Data dan media pihak ketiga mengikuti lisensi sumbernya; lihat [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md).

Kimialoka adalah alat belajar, bukan petunjuk medis, farmasi, atau keselamatan kerja.
