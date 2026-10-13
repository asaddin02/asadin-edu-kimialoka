# Keamanan / Security

Kimialoka tidak punya akun, basis data, atau data pribadi di server. Yang disimpan pengguna (simpanan, catatan,
kemajuan, jawaban tugas) hanya ada di `localStorage` perangkatnya.

Lapisan pengamanan:

- **Server** (`server/server.mjs`): hanya path yang diizinkan yang disajikan; `..`, byte nol, dan percent-encoding
  rusak ditolak (400) tanpa menghentikan proses; hanya GET/HEAD; batas panjang URL dan query; timeout permintaan;
  batas laju per klien; cache proxy dibatasi jumlah dan ukuran.
- **Proxy PubChem** (`server/policy.mjs`, dipakai juga oleh Cloudflare Function): hanya endpoint baca PubChem yang
  cocok dengan daftar izin dan parameter query yang diizinkan; tujuan tetap `pubchem.ncbi.nlm.nih.gov`.
- **Browser**: Content-Security-Policy tanpa skrip inline, `frame-ancestors 'none'`, `nosniff`, COOP. Semua teks
  dari API pihak ketiga di-escape; URL pihak ketiga hanya dipakai bila berskema http(s).

Menemukan celah? Mohon laporkan secara privat lewat
[GitHub Security Advisories](https://github.com/asaddin02/asadin-edu-kimialoka/security/advisories/new),
bukan lewat issue publik. Kami akan menanggapi secepatnya.
