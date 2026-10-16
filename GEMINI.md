# Tugas Gemini: memperkaya materi Kimialoka

> Berkas ini adalah instruksi tugas untuk Gemini. Baca seluruhnya di awal setiap sesi, lalu baca `materi-gemini/README.md` (kalau sudah ada) untuk melanjutkan dari tempat sesi sebelumnya berhenti.

Repo: https://github.com/asaddin02/asadin-edu-kimialoka
Situs: https://kimialoka.asadinedu.com

## Latar

Kimialoka adalah ensiklopedia kimia interaktif dalam bahasa Indonesia dan Inggris. Isinya:

- 118 unsur;
- 29 materi, masing-masing untuk empat jenjang (SD, SMP, SMA, kuliah);
- 292 molekul;
- ion, reaksi, dan material;
- kamus istilah;
- lab virtual.

Masalahnya, **banyak teks masih pendek.** Lapisan materi rata-rata hanya 90–170 kata, dan banyak molekul, unsur, dan reaksi yang ceritanya hanya satu atau dua kalimat. Selain itu, baru 47 dari 118 unsur yang muncul di molekul, ion, reaksi, atau material.

Tugasmu: **riset sebebas dan seluas mungkin, lalu tulis materi kimia yang lebih panjang, lebih dalam, dan lebih menarik di satu folder baru.** Kamu cukup menulis materinya. Setelah itu, Claude Code memindahkan materimu ke struktur data Kimialoka supaya tampil di situs, dan Codex merapikan tampilannya.

## Cari sendiri apa yang kurang

- Jelajahi situsnya dan isi repo, terutama:
  - `js/data/topics/*.js` (materi);
  - `js/data/molecules/*.js` (molekul);
  - `js/data/reactionLibrary.js`, `js/data/materials.js`, `js/data/ions.js`;
  - `js/data/glossary*.js` (kamus).
- Baca juga `docs/AUDIT-CHEMISTRY.md`.
- Yang bisa kamu tulis, misalnya:
  - **materi yang diperdalam** per jenjang: penjelasan lebih panjang, contoh sehari-hari di Indonesia, sejarah penemuan, aplikasi, percobaan aman, soal latihan, miskonsepsi;
  - **materi baru** untuk topik yang belum ada;
  - **cerita molekul dan unsur:** penemuan, kegunaan, keberadaan di alam dan di Indonesia, fakta menarik, keselamatan;
  - **senyawa, ion, reaksi, dan material baru** yang penting untuk sekolah, terutama yang memuat unsur yang belum terwakili. Sertakan nomor CID PubChem untuk setiap senyawa;
  - **istilah kamus baru** beserta definisinya.

## Tempat menulis

Tulis semuanya di folder **`materi-gemini/`** di akar repo, dalam Markdown. Susunan yang disarankan (boleh kamu kembangkan):

```
materi-gemini/
  README.md            status, daftar isi, dan catatan untuk Claude
  materi/              satu berkas per materi (perdalaman materi lama atau materi baru)
  molekul/             satu berkas per molekul atau kelompok molekul
  unsur/
  reaksi/
  kamus/
```

Untuk materi, tulis per jenjang (SD, SMP, SMA, kuliah). Sertakan soal pilihan ganda dengan kunci dan pembahasan kalau bisa.

## Beberapa aturan saja

1. **Bahasa Indonesia** yang baku sebagai bahasa utama. Kalau sempat, sertakan versi bahasa Inggris (ejaan British); kalau tidak, Claude yang menerjemahkan.
2. Rumus memakai subskrip dan superskrip Unicode (`H₂SO₄`, `SO₄²⁻`). Desimal di teks Indonesia memakai koma.
3. **Persamaan reaksi harus setara**, baik atomnya maupun muatannya.
4. **Tulis dengan kata-katamu sendiri.** Jangan menyalin teks dari situs lain.
5. **Setiap berkas ditutup dengan bagian "Sumber"** berisi tautan halaman yang benar-benar kamu baca. Utamakan OpenStax Chemistry 2e, PubChem, IUPAC, NIST, Royal Society of Chemistry, dan universitas atau lembaga resmi.
6. **Jangan menulis nilai sifat fisik atau data bahaya dari ingatan.** Kalau menyebut angka, angkanya harus ada di sumber.
7. Kimialoka adalah alat belajar, bukan nasihat medis atau keselamatan. Percobaan yang kamu sarankan harus aman untuk jenjangnya.
8. Kalau ragu akan suatu fakta, tandai dengan `> Perlu dicek:` daripada menebak.
9. **Hanya tulis di dalam `materi-gemini/`.** Jangan mengubah berkas atau folder lain di repo.
10. **Kamu tidak bisa push ke repo.** Di akhir setiap sesi, sediakan **seluruh folder `materi-gemini/`** sebagai satu berkas zip untuk diunduh pemilik (nama yang disarankan: `materi-gemini-<repo>.zip`). Isinya: semua berkas yang sudah ada di repo, ditambah berkas baru dan berkas yang kamu ubah. Jangan hanya berkas baru. Claude memasukkan isi zip ke repo; folder ini tidak ikut ter-deploy ke situs.

## Status dan tanda selesai

Baris pertama `materi-gemini/README.md` selalu berisi status:

- `Status: BERJALAN`, selama kamu masih menambah materi;
- `Status: SELESAI`, **hanya kalau menurutmu informasinya sudah lebih dari cukup**.

Claude baru mulai mengecek dan memindahkan materi ke situs setelah status berubah menjadi `SELESAI`. Jadi tidak perlu terburu-buru: lanjutkan riset di sesi berikutnya sampai kamu sendiri yakin materinya lengkap.

README juga berisi:

- daftar semua berkas;
- yang belum sempat ditulis;
- semua tanda `Perlu dicek`;
- catatan sampai mana sesi terakhir berhenti.
