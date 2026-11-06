/* ==========================================================================
   EDIT DI SINI — semua teks, foto, link, dan warna website ada di file ini.
   - Teks di antara tanda kutip boleh diganti bebas.
   - Foto: taruh file baru di folder assets/img, lalu ganti path-nya di bawah.
   - Warna: ganti kode hex di bagian "tema" (ada versi terang & gelap).
   Setelah disimpan, cukup refresh browser (atau push ke GitHub → Vercel update otomatis).
   ========================================================================== */

window.SITE = {
  /* ---------- SEO & tampilan saat link dibagikan (WhatsApp, LinkedIn, dll.) ---------- */
  meta: {
    judul: "Surya Abdi Febrianto | Graphic & UI/UX Designer",
    deskripsi:
      "Portfolio of Surya Abdi Febrianto, a graphic and UI/UX designer based in Samarinda, Indonesia.",
    url: "https://suryaafev.vercel.app", // ganti setelah deploy
    gambarBagikan: "assets/img/og-image.jpg", // 1200×630 px
  },

  /* ---------- WARNA ----------
     Dua set warna: "terang" (light mode) dan "gelap" (dark mode).
     latar     : warna dasar halaman
     tinta     : warna teks utama
     aksen     : warna sorotan (tombol, ikon, garis) — WAJIB satu warna hex
     aksenTeks : warna teks DI ATAS aksen/gradien (pilih yang kontras)
     permukaan : warna kartu & kotak
     abu       : teks keterangan kecil
     gradien   : latar pita berjalan & kartu status (boleh diisi satu warna saja)
     garisCair : warna garis "liquid" tipis yang bergerak di latar seluruh halaman      */
  tema: {
    awal: "auto", // "auto" = ikut pengaturan HP/laptop pengunjung, atau "terang" / "gelap"
    terang: {
      latar: "#F8EFF8",
      tinta: "#32143D",
      aksen: "#9B4DB5",
      aksenTeks: "#FFFFFF",
      permukaan: "#F0DDF2",
      abu: "#806B83",
      gradien: "linear-gradient(135deg, #C58BD0 0%, #9B4DB5 50%, #6A1B9A 100%)",
      garisCair: "#EBD9EF",
    },
    gelap: {
      latar: "#140A18",
      tinta: "#F6EAF8",
      aksen: "#C58BD0",
      aksenTeks: "#FFFFFF",
      permukaan: "#221329",
      abu: "#B39DB8",
      gradien: "linear-gradient(135deg, #9B4DB5 0%, #6A1B9A 55%, #4A1170 100%)",
      garisCair: "#2B1734",
    },
  },

  /* ---------- IDENTITAS ---------- */
  nama: {
    baris1: "Surya",
    baris2: "Abdi F.",
    inisial: "SA",
    logo: "Surya Abdi F.",
    lengkap: "Surya Abdi Febrianto",
  },
  peran: "Graphic & UI/UX Designer",
  spesialis: "Branding · Social Media · UI Design",
  lokasi: "Samarinda, Indonesia",
  fotoProfil: "assets/img/foto-profil.webp", // potret, mis. 900×1200 px
  stikerFoto: "U can call me Ayrus too!", // label kecil di samping foto
  deskripsiSingkat:
    "Informatics student at Mulawarman University designing brands, social visuals, and interfaces that look good and work even better.",

  status: {
    aktif: false, // false = sembunyikan kartu status
    label: "Open for collaborations",
    detail: "Got an idea worth building? Let's bring it to life together.",
    tombol: "Let's talk",
    link: "#contact",
  },

  /* ---------- PITA BERJALAN ---------- */
  marquee: [
    "Brand Identity",
    "Social Media",
    "UI/UX Design",
    "Poster",
    "Visual Design",
    "Illustration",
  ],

  /* ---------- TENTANG ----------
     Kata di antara <b> dan </b> akan diberi sorotan warna aksen. */
  tentang: {
    pernyataan:
      "I turn ideas into <b>clear visuals</b>, <b>thoughtful interfaces</b>, and <b>digital products</b> people enjoy using.",
    bio: "I'm an Informatics student at Mulawarman University who lives somewhere between design and code. I work on branding, social media visuals, and user interfaces — always looking for the sweet spot where things look good and work even better.",
    cv: "assets/CV-Surya-Abdi-Febrianto.pdf", // tombol otomatis muncul kalau file PDF-nya ada di folder assets
    tombolCV: "Download CV",
  },

  /* ---------- KATEGORI GALERI (id harus sama dengan "kategori" di galeri) ---------- */
  kategori: [
    { id: "semua", label: "All" },
    { id: "branding", label: "Branding" },
    { id: "poster", label: "Poster" },
    { id: "sosmed", label: "Social Media" },
    { id: "ui", label: "UI Design" },
  ],

  /* ---------- GALERI (gaya Pinterest, kartu bergaris tepi) ----------
     gambar   : gambar karya (tinggi/pendek bebas, tersusun rapi otomatis)
     judul    : nama proyek          klien  : nama klien/brand (huruf pertamanya jadi logo bulat)
     logo     : (opsional) path logo klien bulat, mis. "assets/img/logo-klien.webp"
     kategori : harus sama dengan salah satu id di "kategori"      tahun : tahun proyek
     tools    : aplikasi yang dipakai (muncul sebagai label kecil)
     dilihat  : (opsional) jumlah dilihat/suka, mis. "2.4K"
     nilai    : (opsional) angka 0–100 untuk garis bawah kartu (label diatur di "labelBar")
     deskripsi & link : muncul saat gambar diklik. Kosongkan link jika tidak ada.
     Mau tambah karya? Salin satu blok { ... }, tempel di bawahnya, lalu ganti isinya. */
  labelBar: "Client satisfaction",
  galeri: [
    {
      gambar: "assets/img/gallery/karya-01.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "branding",
      tahun: "2025",
      tools: ["Illustrator", "Photoshop"],
      nilai: 96,
      dilihat: "2.4K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-02.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "poster",
      tahun: "2025",
      tools: ["Photoshop", "Illustrator"],
      nilai: 88,
      dilihat: "1.8K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-03.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "sosmed",
      tahun: "2025",
      tools: ["Figma", "Canva"],
      nilai: 92,
      dilihat: "5.1K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-04.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "ui",
      tahun: "2025",
      tools: ["Figma"],
      nilai: 100,
      dilihat: "3.2K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-05.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "branding",
      tahun: "2025",
      tools: ["Illustrator", "Photoshop"],
      nilai: 90,
      dilihat: "1.1K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-06.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "poster",
      tahun: "2025",
      tools: ["Photoshop", "Illustrator"],
      nilai: 95,
      dilihat: "2.9K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-07.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "sosmed",
      tahun: "2025",
      tools: ["Figma", "Canva"],
      nilai: 85,
      dilihat: "7.6K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-08.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "ui",
      tahun: "2025",
      tools: ["Figma"],
      nilai: 98,
      dilihat: "4.3K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-09.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "branding",
      tahun: "2024",
      tools: ["Illustrator", "Photoshop"],
      nilai: 93,
      dilihat: "1.5K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-10.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "poster",
      tahun: "2024",
      tools: ["Photoshop", "Illustrator"],
      nilai: 89,
      dilihat: "2.2K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-11.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "sosmed",
      tahun: "2024",
      tools: ["Figma", "Canva"],
      nilai: 97,
      dilihat: "6.8K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-12.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "ui",
      tahun: "2024",
      tools: ["Figma"],
      nilai: 91,
      dilihat: "3.7K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-13.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "branding",
      tahun: "2024",
      tools: ["Illustrator", "Photoshop"],
      nilai: 94,
      dilihat: "1.9K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-14.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "poster",
      tahun: "2024",
      tools: ["Photoshop", "Illustrator"],
      nilai: 87,
      dilihat: "2.6K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-15.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "sosmed",
      tahun: "2024",
      tools: ["Figma", "Canva"],
      nilai: 99,
      dilihat: "4.9K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-16.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "ui",
      tahun: "2024",
      tools: ["Figma"],
      nilai: 90,
      dilihat: "3.1K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-17.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "branding",
      tahun: "2023",
      tools: ["Illustrator", "Photoshop"],
      nilai: 92,
      dilihat: "1.3K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-18.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "poster",
      tahun: "2023",
      tools: ["Photoshop", "Illustrator"],
      nilai: 96,
      dilihat: "2.0K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-19.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "sosmed",
      tahun: "2023",
      tools: ["Figma", "Canva"],
      nilai: 88,
      dilihat: "5.5K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
    {
      gambar: "assets/img/gallery/karya-20.webp",
      judul: "[Project title]",
      klien: "[Client]",
      kategori: "ui",
      tahun: "2023",
      tools: ["Figma"],
      nilai: 95,
      dilihat: "2.8K",
      deskripsi:
        "One or two sentences about the brief, the idea, and the result.",
      link: "",
    },
  ],

  /* ---------- LAYANAN ---------- */
  layanan: [
    {
      judul: "Brand Identity",
      teks: "Logos, color palettes, and type systems that give a brand a voice people remember.",
    },
    {
      judul: "Social Media Design",
      teks: "Feed and story templates that stay consistent, on-brand, and scroll-stopping.",
    },
    {
      judul: "UI/UX Design",
      teks: "Clean, intuitive interfaces for websites and apps — from wireframe to prototype.",
    },
    {
      judul: "Poster & Print",
      teks: "Event posters, flyers, and banners designed to grab attention at first glance.",
    },
  ],

  /* ---------- KONTAK & MEDIA SOSIAL ----------
     Ikon dipilih otomatis dari "nama": Instagram, LinkedIn, TikTok, YouTube, GitHub.
     Kosongkan url ("") untuk menyembunyikan salah satunya.                            */
  email: "suryaafev@gmail.com",
  sosial: [
    { nama: "Instagram", url: "https://instagram.com/suryaafev" },
    { nama: "LinkedIn", url: "https://linkedin.com/in/" },
    { nama: "TikTok", url: "https://tiktok.com/@" },
    { nama: "YouTube", url: "https://youtube.com/@" },
    { nama: "GitHub", url: "https://github.com/" },
  ],

  /* ---------- ANIMASI (true = aktif, false = mati) ---------- */
  animasi: {
    latarCair: true, // garis "liquid" tipis yang bergerak di latar seluruh halaman (ikut jari/kursor)
    hurufNama: true, // huruf nama muncul satu per satu & melompat saat disentuh
    gerakFoto: true, // foto melayang & sedikit bergeser mengikuti jari/kursor/gulir
    teksMuncul: true, // teks About & Contact dibuka oleh blok warna saat digulir + efek kilau
  },

  /* ---------- FOOTER ---------- */
  footer: { baris1: "Let's create", baris2: "something", baris3: "memorable." },
};

/* Terapkan warna & mode terang/gelap sebelum halaman tampil (jangan diubah). */
(function (t) {
  var keys = {
    latar: "--latar",
    tinta: "--tinta",
    aksen: "--aksen",
    aksenTeks: "--aksen-teks",
    permukaan: "--permukaan",
    abu: "--abu",
    gradien: "--gradien",
    garisCair: "--garis-cair",
  };
  function block(sel, set) {
    var css = sel + "{";
    for (var k in keys) if (set && set[k]) css += keys[k] + ":" + set[k] + ";";
    return css + "}";
  }
  var s = document.createElement("style");
  s.textContent =
    block(":root,[data-theme=light]", t.terang) +
    block("[data-theme=dark]", t.gelap);
  document.head.appendChild(s);

  var mode = null;
  try {
    mode = localStorage.getItem("tema");
  } catch (e) {}
  if (mode !== "light" && mode !== "dark") {
    if (t.awal === "terang") mode = "light";
    else if (t.awal === "gelap") mode = "dark";
    else
      mode =
        window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
  }
  document.documentElement.setAttribute("data-theme", mode);
})(window.SITE.tema);
