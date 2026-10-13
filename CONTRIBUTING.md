# Berkontribusi

Terima kasih! Kimialoka dipakai pelajar dan guru, jadi ketepatan kimia dan kejelasan bahasa paling penting.

1. `npm ci`, lalu `npm run dev`.
2. Konten ditulis berpasangan `[Bahasa Indonesia, English]`. Tulis untuk pembaca jenjang yang dituju; hindari
   jargon di mode SD/SMP.
3. Setiap fakta baru sebaiknya punya sumber tepercaya (PubChem, buku teks, jurnal).
4. **Molekul baru**: tambahkan entri di `js/data/molecules/*.js`, jalankan
   `npm run sync:molecules -- --only <id>`, lalu periksa halaman molekulnya.
5. **Topik/kuis**: satu berkas per topik di `js/data/topics/` (tambahkan id-nya di `order.js`). Tulis keempat lapis
   (`sd`, `smp`, `sma`, `kuliah`), poin, kegiatan, kuis per jenjang, catatan guru, dan `refs` (kode bagian OpenStax,
   mis. `'13-3-shifting-equilibria-le-chateliers-principle'`, `'oc:11-2-the-sn2-reaction'`, `'bio:3-4-proteins'`).
   Tautan dalam teks: `[[istilah]]`, `{{m:molekul}}`, `{{e:Fe}}`, `{{i:ion}}`, `{{r:reaksi}}`, `{{mat:material}}`,
   `{{lab:id}}`, `{{learn:id}}`, `{{page:id}}`; tabel ditulis `| a | b |`. Semua diperiksa `npm run data:check`.
6. **Ion** (`js/data/ions.js`, lalu `npm run sync:ions`), **reaksi** (`js/data/reactionLibrary.js`; persamaan harus
   setara atom dan muatan, reaksi inti setara A dan Z), **material** (`js/data/materials.js`), dan **peta kimia**
   (`js/data/ontology.js`; setiap konsep harus berupa kunci kamus). Setiap entri memerlukan sumber (`src`).
7. Jangan menulis angka ilmiah tanpa sumber. Bila sumber tidak punya datanya, tulis "Data belum tersedia".
8. Sebelum pull request: `npm run build` (materi, rujukan, precache), `npm run check`, dan bila perlu `npm run audit`.

Aplikasi sengaja tanpa framework dan tanpa dependensi produksi. Mohon jangan menambah pustaka pihak ketiga ke
browser; semua harus tetap berjalan offline dan di perangkat sekolah yang sederhana.
