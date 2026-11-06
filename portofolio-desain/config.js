/* ==========================================================================
   EDIT DI SINI — semua teks, foto, link, dan warna website ada di file ini.
   - Teks di antara tanda kutip boleh diganti bebas.
   - Foto: taruh file baru di folder assets/img, lalu ganti path-nya di bawah.
   - Warna: ganti kode hex di bagian "tema".
   Setelah disimpan, cukup refresh browser (atau push ke GitHub → Vercel update otomatis).
   ========================================================================== */

window.SITE = {
  /* ---------- SEO & tampilan saat link dibagikan (WhatsApp, LinkedIn, dll.) ---------- */
  meta: {
    judul: "Surya Abdi Febrianto — Graphic Designer",
    deskripsi:
      "Portofolio desain grafis: brand identity, poster, social media, dan kemasan.",
    url: "https://nama-kamu.vercel.app", // ganti setelah deploy
    gambarBagikan: "assets/img/og-image.jpg", // 1200×630 px
  },

  /* ---------- WARNA ----------
     latar     : warna dasar halaman
     tinta     : warna teks utama & latar footer
     aksen     : warna sorotan (tombol, marquee, kartu status)
     aksenTeks : warna teks DI ATAS warna aksen (pilih yang kontras)
     permukaan : warna kartu
     abu       : teks keterangan kecil                                          */
  tema: {
    latar: "#F8EFF8",
    tinta: "#32143D",

    aksen:
      "linear-gradient(135deg, #E1BEE7 0%, #C58BD0 35%, #9B4DB5 70%, #6A1B9A 100%)",
    aksenTeks: "#FFFFFF",

    permukaan: "#F0DDF2",
    abu: "#806B83",
  },

  /* ---------- IDENTITAS ---------- */
  nama: { baris1: "Surya", baris2: "Afev", inisial: "SA" },
  peran: "Graphic Designer",
  spesialis: "Brand Identity · Poster · Social Media",
  lokasi: "Samarinda, Indonesia",
  fotoProfil: "assets/img/foto-profil.webp", // potret 4:5, mis. 900×1125 px
  stikerFoto: "Hi mpruy!", // label kecil di samping foto

  status: {
    aktif: true, // false = sembunyikan kartu status
    label: "Open for collabs ✳",
    detail: "Got a cool idea? Let's make it happen.",
    tombol: "Let's Talk ↗",
    link: "#kontak",
  },

  /* ---------- PITA BERJALAN (marquee) ---------- */
  marquee: [
    "Brand Identity",
    "Poster",
    "Social Media",
    "Packaging",
    "Editorial",
    "Ilustrasi",
  ],

  /* ---------- TENTANG ----------
     Kata di antara <b> dan </b> akan diberi sorotan warna aksen. */
  tentang: {
    pernyataan:
      "I turn ideas into <b>meaningful experiences</b>, <b>thoughtful designs</b>, and <b>digital products</b> that make an impact.",

    bio: "I'm an Informatics student at Mulawarman University with a passion for UI/UX design, graphic design, and digital creativity. I enjoy turning ideas into visual experiences, exploring creative solutions, and building digital products that balance aesthetics with functionality. From branding and visual design to interface development, I'm always excited to create something meaningful.",

    cv: "assets/CV-Surya-Abdi-Febrianto.pdf",
    tombolCV: "Get My CV ↗",
  },

  /* ---------- SOROTAN (karya unggulan ukuran besar) ---------- */
  sorotan: [
    // {
    //   gambar: "assets/img/gallery/sorotan-01.webp",
    //   judul: "Identitas visual [Nama Brand]",
    //   keterangan: "Brand Identity — 2025",
    // },
    // {
    //   gambar: "assets/img/gallery/sorotan-02.webp",
    //   judul: "Kampanye poster [Nama Acara]",
    //   keterangan: "Poster Series — 2025",
    // },
    // {
    //   gambar: "assets/img/gallery/sorotan-03.webp",
    //   judul: "Kemasan [Nama Produk]",
    //   keterangan: "Packaging — 2024",
    // },
  ],
  kutipan: [
    "Desain yang baik terasa sederhana — prosesnya yang rumit.",
    "Setiap proyek dimulai dari mendengarkan.",
  ],

  /* ---------- DUA KARTU BESAR (klik = filter karya) ---------- */
  kartuBesar: [
    {
      baris1: "Branding",
      baris2: "& Identity",
      teks: "Logo, sistem visual, dan panduan brand.",
      filter: "branding",
    },
    {
      baris1: "Print",
      baris2: "& Digital",
      teks: "Poster, konten media sosial, dan kemasan.",
      filter: "poster",
    },
  ],

  /* ---------- KATEGORI FILTER (id harus sama dengan "kategori" di karya) ---------- */
  kategori: [
    { id: "semua", label: "Semua" },
    { id: "branding", label: "Branding" },
    { id: "poster", label: "Poster" },
    { id: "sosmed", label: "Social Media" },
    { id: "kemasan", label: "Kemasan" },
  ],

  /* ---------- KARYA ----------
     gambar      : gambar sampul (4:5, mis. 960×1200 px)
     gambarHover : gambar yang muncul saat kursor di atas kartu (boleh sama)
     link        : link Behance/Dribbble/Drive (kosongkan jika tidak ada)          */
  karya: [
    {
      judul: "[Nama Proyek 01]",
      klien: "[Klien]",
      kategori: "branding",
      tahun: "2025",
      gambar: "assets/img/works/karya-01.webp",
      gambarHover: "assets/img/works/karya-01-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Illustrator", "Photoshop"],
      link: "",
    },
    {
      judul: "[Nama Proyek 02]",
      klien: "[Klien]",
      kategori: "poster",
      tahun: "2025",
      gambar: "assets/img/works/karya-02.webp",
      gambarHover: "assets/img/works/karya-02-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Illustrator", "InDesign"],
      link: "",
    },
    {
      judul: "[Nama Proyek 03]",
      klien: "[Klien]",
      kategori: "sosmed",
      tahun: "2025",
      gambar: "assets/img/works/karya-03.webp",
      gambarHover: "assets/img/works/karya-03-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Figma", "Photoshop"],
      link: "",
    },
    {
      judul: "[Nama Proyek 04]",
      klien: "[Klien]",
      kategori: "kemasan",
      tahun: "2024",
      gambar: "assets/img/works/karya-04.webp",
      gambarHover: "assets/img/works/karya-04-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Illustrator", "Dimension"],
      link: "",
    },
    {
      judul: "[Nama Proyek 05]",
      klien: "[Klien]",
      kategori: "branding",
      tahun: "2024",
      gambar: "assets/img/works/karya-05.webp",
      gambarHover: "assets/img/works/karya-05-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Illustrator"],
      link: "",
    },
    {
      judul: "[Nama Proyek 06]",
      klien: "[Klien]",
      kategori: "poster",
      tahun: "2024",
      gambar: "assets/img/works/karya-06.webp",
      gambarHover: "assets/img/works/karya-06-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Photoshop"],
      link: "",
    },
    {
      judul: "[Nama Proyek 07]",
      klien: "[Klien]",
      kategori: "sosmed",
      tahun: "2023",
      gambar: "assets/img/works/karya-07.webp",
      gambarHover: "assets/img/works/karya-07-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Canva", "Photoshop"],
      link: "",
    },
    {
      judul: "[Nama Proyek 08]",
      klien: "[Klien]",
      kategori: "kemasan",
      tahun: "2023",
      gambar: "assets/img/works/karya-08.webp",
      gambarHover: "assets/img/works/karya-08-b.webp",
      deskripsi:
        "Ceritakan singkat: masalah klien, ide utamanya, dan hasil akhirnya.",
      tools: ["Illustrator", "Blender"],
      link: "",
    },
  ],

  /* ---------- LAYANAN ---------- */
  layanan: [
    {
      judul: "Brand Identity",
      teks: "Logo, palet warna, tipografi, dan brand guideline yang siap dipakai.",
      tag: ["Logo", "Guideline"],
    },
    {
      judul: "Poster & Publikasi",
      teks: "Poster acara, flyer, banner, dan materi cetak lainnya.",
      tag: ["Print", "Event"],
    },
    {
      judul: "Konten Media Sosial",
      teks: "Template feed dan story yang konsisten dengan brand.",
      tag: ["Instagram", "TikTok"],
    },
    {
      judul: "Desain Kemasan",
      teks: "Label dan kemasan produk yang menonjol di rak.",
      tag: ["Packaging", "Mockup"],
    },
  ],

  /* ---------- KLIEN / KOLABORASI (teks; boleh diganti nama asli) ---------- */
  klien: [
    "[Klien 1]",
    "[Klien 2]",
    "[Klien 3]",
    "[Klien 4]",
    "[Klien 5]",
    "[Klien 6]",
  ],

  /* ---------- MEDIA SOSIAL & KONTAK (kosongkan url untuk menyembunyikan) ---------- */
  email: "suryaafev@gmail.com",
  sosial: [
    { nama: "Instagram", url: "https://instagram.com/" },
    // { nama: "Behance", url: "https://behance.net/" },
    // { nama: "Dribbble", url: "" },
    { nama: "LinkedIn", url: "https://linkedin.com/" },
  ],
  instagram: { handle: "@suryaafev", url: "https://instagram.com/suryaafev" },
  feed: [
    "assets/img/social/post-01.webp",
    "assets/img/social/post-02.webp",
    "assets/img/social/post-03.webp",
    "assets/img/social/post-04.webp",
    "assets/img/social/post-05.webp",
    "assets/img/social/post-06.webp",
  ],

  /* ---------- ANIMASI (true = aktif, false = mati) ---------- */
  animasi: {
    intro: true, // layar pembuka warna aksen saat pertama dibuka (sekali per sesi)
    teks: true, // judul muncul huruf demi huruf
    parallax: true, // nama, foto, dan gambar bergerak saat digulir
    kursor: true, // kursor bulat khusus (laptop/PC saja)
    magnet: true, // tombol sedikit "tertarik" ke kursor
    miring: true, // kartu karya miring mengikuti kursor
  },

  /* ---------- FOOTER ---------- */
  footer: { baris1: "Mari bikin", baris2: "sesuatu yang", baris3: "diingat." },
};

/* Lewati layar pembuka bila dimatikan / sudah dilihat di sesi ini (jangan diubah). */
(function (a) {
  var lewati = !a || a.intro === false;
  try {
    lewati = lewati || sessionStorage.getItem("introDilihat") === "1";
  } catch (e) {}
  if (
    window.matchMedia &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    lewati = true;
  if (lewati) document.documentElement.classList.add("intro-off");
})(window.SITE.animasi);

/* Terapkan warna sebelum halaman tampil (jangan diubah). */
(function (t) {
  var r = document.documentElement.style;
  r.setProperty("--latar", t.latar);
  r.setProperty("--tinta", t.tinta);
  r.setProperty("--aksen", t.aksen);
  r.setProperty("--aksen-teks", t.aksenTeks);
  r.setProperty("--permukaan", t.permukaan);
  r.setProperty("--abu", t.abu);
})(window.SITE.tema);
