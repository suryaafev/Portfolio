/* Mengisi halaman dari config.js dan mengatur interaksi. Tidak perlu diubah untuk mengganti isi. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var get = function (path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  /* hanya <b>, <i>, <br> yang diizinkan pada teks bertanda data-html */
  var safeHtml = function (s) {
    return esc(s).replace(/&lt;(\/?)(b|i|br)\s*\/?&gt;/g, "<$1$2>");
  };
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"></path></svg>';

  /* ---------- meta ---------- */
  if (S.meta) {
    document.title = S.meta.judul || document.title;
    var setMeta = function (sel, val) { var m = $(sel); if (m && val) m.setAttribute("content", val); };
    setMeta('meta[name="description"]', S.meta.deskripsi);
    setMeta('meta[property="og:title"]', S.meta.judul);
    setMeta('meta[property="og:description"]', S.meta.deskripsi);
    setMeta('meta[property="og:image"]', S.meta.gambarBagikan);
    setMeta('meta[name="theme-color"]', S.tema && S.tema.latar);
  }

  /* ---------- teks tunggal ---------- */
  $$("[data-text]").forEach(function (el) {
    var v = get(el.getAttribute("data-text"));
    if (v != null && v !== "") el.textContent = v; else if (v === "") el.hidden = true;
  });
  $$("[data-html]").forEach(function (el) {
    var v = get(el.getAttribute("data-html"));
    if (v != null) el.innerHTML = safeHtml(v);
  });
  $$("[data-src]").forEach(function (el) {
    var v = get(el.getAttribute("data-src"));
    if (v && el.getAttribute("src") !== v) el.src = v;
  });
  var foto = $(".hero__photo img");
  if (foto) foto.alt = "Foto " + [get("nama.baris1"), get("nama.baris2")].join(" ");

  /* ---------- daftar ---------- */
  var render = {
    marquee: function (list) {
      return list.map(function (t) { return '<span class="marquee__item">' + esc(t) + STAR + "</span>"; }).join("");
    },
    klien: function (list) {
      return list.map(function (t) { return '<span class="marquee__item">' + esc(t) + STAR + "</span>"; }).join("");
    },
    sorotan: function (list) {
      var q = S.kutipan || [];
      return list.map(function (it, i) {
        var html = '<figure class="hl-item reveal"><div class="hl-item__img"><img src="' + esc(it.gambar) +
          '" alt="' + esc(it.judul) + '" width="1600" height="1000" loading="lazy" decoding="async"></div>' +
          '<figcaption><span class="hl-item__title">' + esc(it.judul) + '</span><span class="hl-item__meta">' +
          esc(it.keterangan) + "</span></figcaption></figure>";
        if (q[i] && i < list.length - 1) html += '<blockquote class="quote reveal">' + esc(q[i]) + "</blockquote>";
        return html;
      }).join("");
    },
    kartuBesar: function (list) {
      return list.map(function (k) {
        return '<button class="card-big reveal" type="button" data-filter-go="' + esc(k.filter) + '">' +
          '<span class="display card-big__title">' + esc(k.baris1) + "<br>" + esc(k.baris2) + "</span>" +
          '<span class="card-big__foot"><span>' + esc(k.teks) + '</span><span class="arrow">' + ARROW + "</span></span></button>";
      }).join("");
    },
    kategori: function (list) {
      return list.map(function (k, i) {
        return '<button class="chip-btn" type="button" data-filter="' + esc(k.id) + '" aria-pressed="' + (i === 0) + '">' + esc(k.label) + "</button>";
      }).join("");
    },
    karya: function (list) {
      var label = {};
      (S.kategori || []).forEach(function (k) { label[k.id] = k.label; });
      return list.map(function (w, i) {
        var hover = w.gambarHover && w.gambarHover !== w.gambar
          ? '<img src="' + esc(w.gambarHover) + '" alt="" width="960" height="1200" loading="lazy" decoding="async">' : "";
        return '<button class="work reveal" type="button" data-index="' + i + '" data-cat="' + esc(w.kategori) + '">' +
          '<span class="work__media"><span class="work__num">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<img src="' + esc(w.gambar) + '" alt="' + esc(w.judul) + '" width="960" height="1200" loading="lazy" decoding="async">' + hover +
          '<span class="work__view">Lihat detail</span></span>' +
          '<span class="work__info"><span class="work__title">' + esc(w.judul) + '</span><span class="work__meta">' +
          esc(label[w.kategori] || w.kategori) + " · " + esc(w.tahun) + "</span></span></button>";
      }).join("");
    },
    layanan: function (list) {
      return list.map(function (l, i) {
        return '<li class="service reveal"><span class="service__num">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="service__title">' + esc(l.judul) + '</span><span class="service__text">' + esc(l.teks) + "</span>" +
          '<ul class="chips">' + (l.tag || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></li>";
      }).join("");
    },
    feed: function (list) {
      var ig = S.instagram || {};
      return list.map(function (src, i) {
        return '<a class="reveal" href="' + esc(ig.url || "#") + '" target="_blank" rel="noopener" aria-label="Postingan ' + (i + 1) + ' di Instagram">' +
          '<img src="' + esc(src) + '" alt="" width="600" height="600" loading="lazy" decoding="async"></a>';
      }).join("");
    },
    sosial: function (list) {
      return list.filter(function (s) { return s.url; }).map(function (s) {
        return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.nama) + "</a>";
      }).join("");
    }
  };
  $$("[data-list]").forEach(function (el) {
    var key = el.getAttribute("data-list");
    var list = get(key);
    if (!Array.isArray(list) || !render[key]) return;
    el.innerHTML = render[key](list);
  });

  /* marquee: gandakan isi agar berputar tanpa jeda */
  $$(".marquee").forEach(function (m) {
    var track = $(".marquee__track", m);
    if (!track) return;
    var copy = track.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    m.appendChild(copy);
  });

  /* ---------- status, CV, email, instagram ---------- */
  var st = S.status || {};
  var statusEl = $("#status");
  if (statusEl) { if (st.aktif === false) statusEl.hidden = true; else if (st.link) statusEl.href = st.link; }
  var cv = $("#cvBtn");
  if (cv && S.tentang && S.tentang.cv) { cv.href = S.tentang.cv; cv.hidden = false; }
  var mail = $("#emailLink");
  if (mail && S.email) mail.href = "mailto:" + S.email;
  var ig = $("#igLink");
  if (ig) { if (S.instagram && S.instagram.url) ig.href = S.instagram.url; else ig.hidden = true; }
  var tahun = $("#tahun");
  if (tahun) tahun.textContent = new Date().getFullYear();

  /* ---------- salin email ---------- */
  var toast = $("#toast"), toastTimer;
  var showToast = function (msg) {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-show"); }, 2200);
  };
  var copyBtn = $("#copyBtn");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var done = function () { showToast("Email disalin: " + S.email); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(S.email).then(done, function () { location.href = "mailto:" + S.email; });
    else location.href = "mailto:" + S.email;
  });

  /* ---------- filter karya ---------- */
  var grid = $("#worksGrid");
  var setFilter = function (id) {
    $$(".chip-btn").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === id)); });
    $$(".work", grid).forEach(function (w) {
      var show = id === "semua" || w.getAttribute("data-cat") === id;
      w.hidden = !show;
      if (show) w.classList.add("is-in");
    });
  };
  document.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-filter]");
    if (chip) setFilter(chip.getAttribute("data-filter"));
    var go = e.target.closest("[data-filter-go]");
    if (go) {
      setFilter(go.getAttribute("data-filter-go"));
      $("#karya").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ---------- pop-up detail karya ---------- */
  var dialog = $("#detail");
  var lastFocus = null;
  var openWork = function (i) {
    var w = (S.karya || [])[i];
    if (!w || !dialog) return;
    var label = {};
    (S.kategori || []).forEach(function (k) { label[k.id] = k.label; });
    var imgs = [w.gambar];
    if (w.gambarHover && w.gambarHover !== w.gambar) imgs.push(w.gambarHover);
    $("#detailMedia").innerHTML = imgs.map(function (src, n) {
      return '<img src="' + esc(src) + '" alt="' + esc(w.judul) + " — gambar " + (n + 1) + '" width="960" height="1200" decoding="async">';
    }).join("");
    $("#detailMeta").textContent = [w.klien, label[w.kategori] || w.kategori, w.tahun].filter(Boolean).join(" · ");
    $("#detailJudul").textContent = w.judul;
    $("#detailDesk").textContent = w.deskripsi || "";
    $("#detailTools").innerHTML = (w.tools || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var link = $("#detailLink");
    if (w.link) { link.href = w.link; link.hidden = false; } else link.hidden = true;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  };
  var closeWork = function () {
    if (dialog.close) dialog.close(); else dialog.removeAttribute("open");
  };
  if (grid) grid.addEventListener("click", function (e) {
    var card = e.target.closest(".work");
    if (card) openWork(+card.getAttribute("data-index"));
  });
  if (dialog) {
    $("#detailTutup").addEventListener("click", closeWork);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeWork(); });
    dialog.addEventListener("close", function () { if (lastFocus) lastFocus.focus(); });
  }

  /* ---------- menu ponsel ---------- */
  var menuBtn = $("#menuBtn"), panel = $("#menuPanel");
  var setMenu = function (open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    $(".sr", menuBtn).textContent = open ? "Tutup menu" : "Buka menu";
    panel.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (menuBtn && panel) {
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) setMenu(false); });
  }

  /* ---------- navigasi: sembunyi saat gulir ke bawah, muncul saat ke atas ---------- */
  var nav = $("#nav"), lastY = window.scrollY, ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      var menuOpen = menuBtn && menuBtn.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("nav--hide", !menuOpen && y > lastY && y > 200);
      lastY = y;
      ticking = false;
    });
  }, { passive: true });

  /* tandai menu aktif sesuai bagian yang sedang terlihat */
  var links = $$(".nav__links a");
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["karya", "tentang", "layanan", "kontak"].forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });

    /* animasi muncul saat digulir */
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { revObs.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
