# Sebelum upload ke GitHub

1. **Buat repo di GitHub** bernama persis `belajarkode` (akun `MRBl4z3`), lalu push isi folder ini.
   Repo harus public supaya GitHub Pages gratis jalan.
2. **Aktifkan GitHub Pages**: Settings > Pages > Source: *GitHub Actions*. Situs akan tampil di
   https://mrbl4z3.github.io/belajarkode/
3. **Install pakai bun** (`bun install`, `bun run dev`). Kalau pakai npm: `npm install --legacy-peer-deps`.

# Masih kosong dengan sengaja

- **Analytics / iklan** (`GA_ID`, `GTM_ID`, `ADSENSE_CLIENT_ID` di `src/config/site.ts`): kosong = nonaktif.
  Halaman legal masih menyebut iklan dan analytics; sesuaikan kalau memang tidak dipakai.
- **Komentar Giscus** (`repoId`, `categoryId` di `src/config/site.ts`): isi dari https://giscus.app setelah repo jadi
  dan Discussions diaktifkan. Kosong = bagian komentar disembunyikan.

# Yang sebaiknya diganti nanti

- `public/logo.png` dan `public/favicon.svg` masih bawaan project asli.
- Post dan news contoh di `src/content` itu placeholder. Ganti dengan kontenmu.
- Halaman legal (`src/content/legal`) itu template. Baca ulang dan sesuaikan.
- **LICENSE**: jangan dihapus. MIT mewajibkan notice copyright asli tetap ada.
