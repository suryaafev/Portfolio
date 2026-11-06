# Portofolio Surya Afev — Template Statis

Website portofolio satu halaman: ringan (HTML + CSS + JavaScript murni, tanpa framework),
responsif di HP, tablet, dan laptop, punya mode terang/gelap, dan siap di-deploy gratis ke **Vercel**.

## Isi folder

```
index.html          struktur halaman (tidak perlu diubah)
config.js           ← SEMUA teks, foto, link, dan warna diedit di sini
404.html            halaman "tidak ditemukan"
favicon.svg         ikon tab browser (inisial "SA")
vercel.json         pengaturan cache untuk Vercel
assets/css          gaya tampilan
assets/js/main.js   logika halaman (galeri, filter, mode gelap, menu)
assets/js/motion.js animasi bagian atas (latar cair, huruf nama, foto)
assets/fonts        font Inter (lisensi OFL, gratis)
assets/img          foto profil & gambar galeri
```

## 1. Mengganti teks, warna, dan link

Buka `config.js` dengan VS Code. Semua bagian sudah diberi keterangan.

- **Nama & peran**: `nama`, `peran`, `spesialis`, `lokasi`, `stikerFoto`
- **Warna**: bagian `tema` punya dua set, `terang` dan `gelap`. Cukup ganti kode hex.
  - `aksen` harus **satu warna** (mis. `"#9B4DB5"`), karena dipakai untuk teks & garis.
  - Gradien taruh di `gradien` (dipakai untuk tombol, pita berjalan, kartu status, logo).
  - `awal: "auto"` = mengikuti pengaturan HP/laptop pengunjung. Bisa diganti `"terang"` atau `"gelap"`.
- **Media sosial**: bagian `sosial`. Ikon Instagram, LinkedIn, TikTok, YouTube, GitHub muncul otomatis
  dari `nama`. Isi `url` dengan link profilmu; kosongkan (`""`) untuk menyembunyikan.
- **CV**: taruh file PDF di `assets/CV-Surya-Abdi-Febrianto.pdf`. Tombol "Download CV" otomatis muncul
  kalau file-nya ada (kalau belum ada, tombolnya disembunyikan).
- Kata yang diapit `<b>...</b>` di `tentang.pernyataan` diberi warna aksen.

## 2. Menambah gambar galeri (gaya Pinterest)

1. Kompres gambar di [squoosh.app](https://squoosh.app) → format **WebP**, kualitas 70–80, lebar ±800 px.
   Ukuran tinggi bebas — gambar tinggi, kotak, atau melebar akan tersusun rapi otomatis.
2. Taruh di `assets/img/gallery/`.
3. Di `config.js` → `galeri`, salin satu blok `{ gambar: ..., judul: ... }`, tempel di bawahnya, lalu ganti isinya.
   `kategori` harus sama dengan salah satu `id` di bagian `kategori`.

Isi kartu galeri:

| Isian | Muncul di kartu |
|---|---|
| `klien` (+ `logo` opsional) | logo bulat + nama klien di kiri bawah gambar (tanpa logo → huruf pertama nama klien) |
| `kategori` | label di kanan bawah gambar (di HP pindah ke kanan atas) |
| `tahun` | label di kanan atas gambar (laptop) |
| `judul` | judul tebal di bawah gambar |
| `tools`, `dilihat` | label-label kecil (aplikasi & jumlah dilihat) |
| `nilai` | garis bawah kartu 0–100%, labelnya diatur di `labelBar` (hapus `nilai` untuk menyembunyikan) |

Gambar diklik → muncul tampilan besar (bisa geser kiri/kanan di HP atau tombol panah di laptop).

Foto profil: ganti file `assets/img/foto-profil.webp` (potret, lebar ±900 px). Kalau namanya diganti,
ubah juga dua baris di `index.html` yang memuat `foto-profil.webp`.

## Animasi bagian atas

Semua ada di `assets/js/motion.js` dan bisa dimatikan di `config.js` → `animasi`:

| Pengaturan | Efek |
|---|---|
| `latarCair` | garis "liquid" tipis yang pelan berubah bentuk di latar **seluruh halaman**; ada cahaya lembut yang mengikuti jari (HP) atau kursor (laptop), dan garisnya ikut berputar sedikit saat digulir |
| `hurufNama` | huruf nama muncul satu per satu; di HP ketuk nama → huruf melompat bergelombang, di laptop huruf naik saat disorot |
| `gerakFoto` | foto melayang pelan dan sedikit bergeser mengikuti jari/kursor dan gulir |
| `teksMuncul` | teks About, Contact, dan judul besar ditutup blok warna per baris lalu terbuka saat digulir; kata tebal & judul diberi kilau berjalan; ikon kontak muncul bergantian |

Warna garis latar diatur di `tema` → `garisCair` (untuk mode terang & gelap).
Kalimat singkat di bawah nama diatur di `deskripsiSingkat`.
Animasi latar berhenti sendiri saat tab tidak dibuka (hemat baterai), dan semua gerakan
mati bila pengunjung mengaktifkan "kurangi gerakan" di perangkatnya.

## Fitur lain

- **Garis progres** tipis di atas layar dan **penanda bagian** di sisi kanan (juga di HP, versi lebih tipis):
  titiknya bisa diklik untuk lompat ke bagian itu, ada angka persen di bawahnya. Di HP, nama bagian
  muncul sebentar setiap kali berpindah bagian.
- Teks menu & tombol **bergulir ke atas** saat di-hover; menu yang sedang dibaca diberi titik neon.
- Kartu **How I can help** punya garis tepi & cahaya neon tipis, makin terang saat di-hover.
- Tombol **Download CV** ada di navigasi, bagian atas, menu HP, dan bagian About.
  Taruh file PDF-nya sesuai `tentang.cv` di `config.js`; kosongkan `cv` untuk menyembunyikan semua tombolnya.

## 3. Mencoba di komputer sendiri

Pasang ekstensi **Live Server** di VS Code → klik kanan `index.html` → *Open with Live Server*.

## 4. Upload ke GitHub & deploy ke Vercel

1. Di [github.com](https://github.com) → **New repository** → nama mis. `portofolio` → **Create repository**.
2. Klik **uploading an existing file**, seret **isi** folder ini (termasuk folder `assets`), lalu **Commit changes**.
3. Masuk [vercel.com](https://vercel.com) dengan akun GitHub → **Add New… → Project** → pilih repository → **Import**.
4. Framework Preset: **Other**, lainnya biarkan kosong → **Deploy**.
5. Salin alamat `https://nama-project.vercel.app` ke `meta.url` di `config.js`.

Setiap perubahan di GitHub otomatis memperbarui website di Vercel.

## Catatan

- Gambar di galeri saat ini masih placeholder — ganti dengan karya asli.
- Gambar dimuat belakangan (*lazy load*), jadi halaman tetap cepat walau galerinya panjang.
- Pilihan mode terang/gelap pengunjung disimpan di browser mereka.
- Animasi otomatis mati untuk pengunjung yang mengaktifkan "kurangi gerakan" di perangkatnya.
