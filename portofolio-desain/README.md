# Portofolio Desain Grafis — Template Statis

Website portofolio satu halaman: ringan (HTML + CSS + JavaScript murni, tanpa framework),
rapi di HP maupun laptop, dan siap di-deploy gratis ke **Vercel**.

## Isi folder

```
index.html          struktur halaman (tidak perlu diubah)
config.js           ← SEMUA teks, foto, link, dan warna diedit di sini
404.html            halaman "tidak ditemukan"
favicon.svg         ikon tab browser (ganti inisial "NK" di dalamnya)
vercel.json         pengaturan cache untuk Vercel
assets/css          gaya tampilan
assets/js           logika halaman
assets/fonts        font Inter (lisensi OFL, boleh dipakai gratis)
assets/img          foto & gambar karya (ganti dengan milikmu)
```

## 1. Mengganti teks, warna, dan link

Buka `config.js` dengan VS Code, lalu ganti isinya. Setiap bagian sudah diberi keterangan.

- **Nama & peran**: `nama`, `peran`, `spesialis`, `lokasi`
- **Warna**: bagian `tema` — cukup ganti kode hex (mis. `aksen: "#C8F031"`)
  - Pastikan `aksenTeks` kontras dengan `aksen` (teks gelap untuk aksen terang, teks putih untuk aksen gelap)
- **Karya**: bagian `karya` — tiap karya punya judul, klien, kategori, tahun, gambar, deskripsi, tools, link
- **Kontak & sosial media**: `email`, `sosial`, `instagram`
- Kata yang diapit `<b>...</b>` di `tentang.pernyataan` akan diberi sorotan warna aksen.

Ganti juga judul dan deskripsi di bagian `meta` supaya rapi saat link dibagikan.

## 2. Mengganti foto

1. Siapkan gambar dengan ukuran ini:
   | Kegunaan | Rasio | Ukuran disarankan |
   |---|---|---|
   | Foto profil (`fotoProfil`) | 4:5 | 900 × 1125 px |
   | Karya (`gambar`, `gambarHover`) | 4:5 | 960 × 1200 px |
   | Sorotan (`sorotan`) | 16:10 | 1600 × 1000 px |
   | Feed Instagram (`feed`) | 1:1 | 600 × 600 px |
   | Gambar bagikan (`gambarBagikan`) | 1200 × 630 px | JPG |
2. **Kompres dulu** di [squoosh.app](https://squoosh.app) → pilih format **WebP**, kualitas 70–80.
   Usahakan tiap gambar di bawah 200 KB agar website tetap cepat.
3. Taruh file di folder `assets/img/...`, lalu ganti path-nya di `config.js`.
4. Kalau kamu mengganti nama file foto profil, ganti juga dua baris di `index.html`
   yang memuat `foto-profil.webp` (baris `preload` dan `<img>` di hero).

Mau menambah karya? Salin satu blok `{ judul: ... }` di bagian `karya`, tempel di bawahnya,
lalu ubah isinya. Kategori harus sama dengan salah satu `id` di bagian `kategori`.

## Animasi

Semua animasi ada di `assets/js/motion.js` dan bisa dimatikan satu per satu di `config.js` → `animasi`:

| Pengaturan | Efek |
|---|---|
| `intro` | layar pembuka warna aksen dengan hitungan 0–100 (muncul sekali per sesi) |
| `teks` | judul, kutipan, dan pernyataan muncul huruf/kata demi huruf saat digulir |
| `parallax` | nama di hero bergeser ke kiri & kanan, foto ikut gerak mouse, gambar sorotan bergerak saat digulir |
| `kursor` | kursor bulat yang membesar jadi "Lihat" di atas karya (laptop/PC saja) |
| `magnet` | tombol sedikit tertarik ke arah kursor |
| `miring` | kartu karya miring mengikuti kursor |

Efek lain yang selalu aktif: teks tombol & menu bergulir saat di-hover, pita berjalan makin cepat
dan berbalik arah mengikuti gulir, baris layanan terisi warna dari bawah, dan garis progres di atas layar.
Semua gerakan otomatis mati bila pengunjung mengaktifkan "kurangi gerakan" di perangkatnya.

## 3. Mencoba di komputer sendiri

Cara termudah: pasang ekstensi **Live Server** di VS Code, klik kanan `index.html` → *Open with Live Server*.
(Bisa juga langsung klik dua kali `index.html`, tetapi beberapa fitur seperti salin email hanya jalan lewat server.)

## 4. Upload ke GitHub

1. Buat akun di [github.com](https://github.com) → klik **New repository** → beri nama, mis. `portofolio` → **Create repository**.
2. Di halaman repository, klik **uploading an existing file**.
3. Seret **isi** folder ini (bukan foldernya) ke halaman tersebut, termasuk folder `assets`.
4. Klik **Commit changes**.

(Kalau sudah terbiasa dengan Git: `git init`, `git add .`, `git commit -m "portofolio"`, lalu `git push` ke repository tadi.)

## 5. Deploy ke Vercel

1. Masuk ke [vercel.com](https://vercel.com) dengan akun GitHub.
2. Klik **Add New… → Project** → pilih repository `portofolio` → **Import**.
3. Framework Preset: **Other**. Build Command & Output Directory dibiarkan kosong.
4. Klik **Deploy**. Dalam 1 menit website online di `https://nama-project.vercel.app`.
5. Salin alamat itu ke `meta.url` di `config.js`.

Setiap kali kamu mengubah file di GitHub (edit langsung di github.com juga bisa), Vercel otomatis memperbarui website.
Domain sendiri (mis. `namakamu.com`) bisa ditambahkan di Vercel → Project → **Settings → Domains**.

## Catatan

- Gambar di bawah layar dimuat belakangan (*lazy load*), jadi halaman tetap cepat walau karyanya banyak.
- Animasi otomatis dimatikan untuk pengunjung yang mengaktifkan "kurangi gerakan" di perangkatnya.
- Gambar contoh di folder `assets/img` hanya placeholder — ganti semuanya dengan karya asli.
