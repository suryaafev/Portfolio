/* Mengisi halaman dari config.js. Tidak perlu diedit — ubah isi di config.js saja. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var root = document.documentElement;
  var $ = function (s, el) {
    return (el || document).querySelector(s);
  };
  var $$ = function (s, el) {
    return Array.prototype.slice.call((el || document).querySelectorAll(s));
  };

  function get(path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? o : o[k];
    }, S);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  /* hanya <b>, <i>, <br> yang diizinkan di teks HTML */
  function safeHtml(s) {
    return esc(s).replace(/&lt;(\/?)(b|i|br)\s*\/?&gt;/g, "<$1$2>");
  }

  /* ---------- Ikon media sosial ---------- */
  var ICONS = {
    instagram:
      '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>',
    linkedin:
      '<path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
    tiktok:
      '<path fill="currentColor" d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-4.2-.97c-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75a7.6 7.6 0 0 1-1.35 3.94 7.47 7.47 0 0 1-5.91 3.21 7.3 7.3 0 0 1-4.08-1.03 7.55 7.55 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.42 7.42 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.4 3.4 0 0 0-3.02.37 3.4 3.4 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.3 3.3 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
    youtube:
      '<path fill="currentColor" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>',
    github:
      '<path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/>',
    link: '<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1 1M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  };
  function icon(name) {
    var key = String(name || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");
    return (
      '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' +
      (ICONS[key] || ICONS.link) +
      "</svg>"
    );
  }

  /* ---------- Isi teks & gambar sederhana ---------- */
  $$("[data-text]").forEach(function (el) {
    var v = get(el.getAttribute("data-text"));
    if (v != null && v !== "") el.textContent = v;
  });
  $$("[data-html]").forEach(function (el) {
    var v = get(el.getAttribute("data-html"));
    if (v) el.innerHTML = safeHtml(v);
  });
  $$("[data-src]").forEach(function (el) {
    var v = get(el.getAttribute("data-src"));
    if (v) el.src = v;
  });

  /* ---------- Daftar (marquee, sosial, galeri, dll.) ---------- */
  var gallery = (S.galeri || []).filter(function (g) {
    return g && g.gambar;
  });
  var catLabel = {};
  (S.kategori || []).forEach(function (k) {
    catLabel[k.id] = k.label;
  });

  var render = {
    marquee: function (items) {
      var one = items
        .map(function (t) {
          return "<span>" + esc(t) + '</span><i aria-hidden="true">✦</i>';
        })
        .join("");
      one += one; /* diulang supaya pita tetap penuh di layar lebar */
      return (
        '<div class="marquee__group">' +
        one +
        '</div><div class="marquee__group">' +
        one +
        "</div>"
      );
    },
    sosial: function (items) {
      return items
        .filter(function (s) {
          return s && s.url;
        })
        .map(function (s) {
          return (
            '<a href="' +
            esc(s.url) +
            '" target="_blank" rel="noopener" aria-label="' +
            esc(s.nama) +
            '">' +
            icon(s.nama) +
            '<span class="social__name">' +
            esc(s.nama) +
            "</span></a>"
          );
        })
        .join("");
    },
    kategori: function (items) {
      return items
        .map(function (k, i) {
          return (
            '<button class="chip" type="button" data-filter="' +
            esc(k.id) +
            '" aria-pressed="' +
            (i === 0) +
            '">' +
            esc(k.label) +
            "</button>"
          );
        })
        .join("");
    },
    galeri: function () {
      var eye =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
      return gallery
        .map(function (g, i) {
          var cat = catLabel[g.kategori] || g.kategori || "";
          var initial = (
            String(g.klien || g.judul || "?")
              .replace(/[^A-Za-z0-9]/g, "")
              .charAt(0) || "?"
          ).toUpperCase();
          var logo = g.logo
            ? '<img src="' + esc(g.logo) + '" alt="" loading="lazy">'
            : esc(initial);
          var tools = (g.tools || [])
            .map(function (t) {
              return '<span class="tag">' + esc(t) + "</span>";
            })
            .join("");
          var stat = g.dilihat
            ? '<span class="tag tag--stat">' + eye + esc(g.dilihat) + "</span>"
            : "";
          var n = Number(g.nilai);
          var bar =
            isFinite(n) && g.nilai !== "" && g.nilai != null
              ? '<span class="card__bar"><span class="card__barhead"><span>' +
                esc(S.labelBar || "Progress") +
                "</span><b>" +
                Math.max(0, Math.min(100, n)) +
                "%</b></span>" +
                '<span class="card__track"><span style="width:' +
                Math.max(0, Math.min(100, n)) +
                '%"></span></span></span>'
              : "";
          return (
            '<button class="pin card reveal" type="button" data-i="' +
            i +
            '" data-cat="' +
            esc(g.kategori || "") +
            '" aria-label="' +
            esc((g.judul || "Project") + (cat ? " — " + cat : "")) +
            '">' +
            '<span class="card__media"><img src="' +
            esc(g.gambar) +
            '" alt="' +
            esc(g.judul || "") +
            '" loading="lazy" decoding="async">' +
            (g.tahun
              ? '<span class="card__year">' + esc(g.tahun) + "</span>"
              : "") +
            '<span class="card__over">' +
            (g.klien
              ? '<span class="card__client"><span class="card__avatar">' +
                logo +
                "</span><span>" +
                esc(g.klien) +
                "</span></span>"
              : "<span></span>") +
            (cat ? '<span class="card__cat">' + esc(cat) + "</span>" : "") +
            "</span></span>" +
            '<span class="card__body"><span class="card__title">' +
            esc(g.judul || "") +
            "</span>" +
            (tools || stat
              ? '<span class="card__tags">' + tools + stat + "</span>"
              : "") +
            bar +
            "</span></button>"
          );
        })
        .join("");
    },
    layanan: function (items) {
      return items
        .map(function (l, i) {
          return (
            '<li class="service reveal"><span class="service__no">' +
            String(i + 1).padStart(2, "0") +
            "</span>" +
            '<svg class="service__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>' +
            "<h3>" +
            esc(l.judul) +
            '</h3><p class="muted">' +
            esc(l.teks) +
            "</p></li>"
          );
        })
        .join("");
    },
  };
  $$("[data-list]").forEach(function (el) {
    var key = el.getAttribute("data-list");
    var items = get(key);
    if (render[key] && Array.isArray(items)) el.innerHTML = render[key](items);
  });

  /* gambar galeri muncul halus setelah termuat */
  $$(".card__media > img").forEach(function (img) {
    function done() {
      img.classList.add("is-loaded");
    }
    if (img.complete && img.naturalWidth) done();
    else {
      img.addEventListener("load", done);
      img.addEventListener("error", done);
    }
  });

  /* ---------- Meta, status, CV, email, tahun ---------- */
  if (S.meta) {
    if (S.meta.judul) document.title = S.meta.judul;
    var setMeta = function (sel, val) {
      var m = $(sel);
      if (m && val) m.setAttribute("content", val);
    };
    setMeta('meta[name="description"]', S.meta.deskripsi);
    setMeta('meta[property="og:title"]', S.meta.judul);
    setMeta('meta[property="og:description"]', S.meta.deskripsi);
    if (S.meta.gambarBagikan)
      setMeta(
        'meta[property="og:image"]',
        new URL(S.meta.gambarBagikan, S.meta.url || location.href).href,
      );
  }
  var status = $("#status");
  if (status) {
    if (!S.status || S.status.aktif === false) status.hidden = true;
    else if (S.status.link) status.href = S.status.link;
  }
  /* tombol Download CV (navigasi, hero, tentang) — muncul bila "cv" di config.js diisi */
  var cv = S.tentang && S.tentang.cv;
  $$("[data-cv]").forEach(function (a) {
    if (!cv) return;
    a.href = cv;
    a.hidden = false;
  });
  var mail = $("#emailLink");
  if (mail && S.email) mail.href = "mailto:" + S.email;
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  var toast = $("#toast"),
    toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-show");
    }, 2200);
  }
  var copyBtn = $("#copyBtn");
  if (copyBtn)
    copyBtn.addEventListener("click", function () {
      var ok = function () {
        showToast("Email copied to clipboard");
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(S.email || "").then(ok, function () {
          location.href = "mailto:" + S.email;
        });
      } else location.href = "mailto:" + S.email;
    });

  /* ---------- Mode terang / gelap ---------- */
  var themeBtn = $("#themeBtn");
  var metaTheme = $('meta[name="theme-color"]');
  function syncTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (themeBtn)
      themeBtn.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode",
      );
    if (metaTheme)
      metaTheme.setAttribute(
        "content",
        getComputedStyle(root).getPropertyValue("--latar").trim() ||
          (dark ? "#140A18" : "#F8EFF8"),
      );
  }
  syncTheme();
  if (themeBtn)
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("tema", next);
      } catch (e) {}
      syncTheme();
      setTimeout(function () {
        root.classList.remove("theme-anim");
      }, 400);
    });
  /* ikut perubahan pengaturan perangkat selama pengunjung belum memilih sendiri */
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      var saved = null;
      try {
        saved = localStorage.getItem("tema");
      } catch (err) {}
      if (saved || (S.tema && S.tema.awal && S.tema.awal !== "auto")) return;
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      syncTheme();
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }

  /* ---------- Menu ponsel ---------- */
  var nav = $("#nav"),
    menuBtn = $("#menuBtn");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    $$("#navLinks a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }
  /* bayangan tipis pada navigasi saat halaman digulir */
  var onScroll = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Filter galeri ---------- */
  var grid = $("#gallery"),
    empty = $("#galleryEmpty");
  var visible = gallery.map(function (_, i) {
    return i;
  });
  $$("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-filter");
      var all =
        id === ($$("[data-filter]")[0] || btn).getAttribute("data-filter");
      $$("[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      visible = [];
      $$(".pin", grid).forEach(function (pin) {
        var show = all || pin.getAttribute("data-cat") === id;
        pin.hidden = !show;
        if (show) {
          visible.push(+pin.getAttribute("data-i"));
          pin.classList.add("is-in");
        }
      });
      if (empty) empty.hidden = visible.length > 0;
    });
  });

  /* ---------- Lightbox ---------- */
  var viewer = $("#viewer"),
    current = 0;
  function show(i) {
    var g = gallery[i];
    if (!g) return;
    current = i;
    var img = $("#viewerImg");
    img.src = g.gambar;
    img.alt = g.judul || "";
    $("#viewerTitle").textContent = g.judul || "";
    $("#viewerMeta").textContent = [
      catLabel[g.kategori] || g.kategori,
      g.klien,
      g.tahun,
    ]
      .filter(Boolean)
      .join(" · ");
    var vt = $("#viewerTools");
    if (vt)
      vt.innerHTML = (g.tools || [])
        .map(function (t) {
          return '<li class="tag">' + esc(t) + "</li>";
        })
        .join("");
    $("#viewerDesc").textContent = g.deskripsi || "";
    var link = $("#viewerLink");
    link.hidden = !g.link;
    if (g.link) link.href = g.link;
    var many = visible.length > 1;
    $("#viewerPrev").hidden = !many;
    $("#viewerNext").hidden = !many;
  }
  function step(d) {
    var pos = visible.indexOf(current);
    if (pos < 0) return;
    show(visible[(pos + d + visible.length) % visible.length]);
  }
  if (viewer && grid) {
    grid.addEventListener("click", function (e) {
      var pin = e.target.closest(".pin");
      if (!pin) return;
      show(+pin.getAttribute("data-i"));
      if (viewer.showModal) viewer.showModal();
      else viewer.setAttribute("open", "");
      document.body.classList.add("no-scroll");
    });
    var close = function () {
      if (viewer.open) viewer.close();
    };
    $("#viewerClose").addEventListener("click", close);
    $("#viewerPrev").addEventListener("click", function () {
      step(-1);
    });
    $("#viewerNext").addEventListener("click", function () {
      step(1);
    });
    viewer.addEventListener("click", function (e) {
      if (e.target === viewer) close();
    });
    viewer.addEventListener("close", function () {
      document.body.classList.remove("no-scroll");
      var pin = $('.pin[data-i="' + current + '"]');
      if (pin) pin.focus({ preventScroll: true });
    });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    /* geser kiri/kanan di HP */
    var x0 = null;
    viewer.addEventListener(
      "touchstart",
      function (e) {
        x0 = e.touches[0].clientX;
      },
      { passive: true },
    );
    viewer.addEventListener("touchend", function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  /* ---------- Teks bergulir saat di-hover (menu & tombol) ---------- */
  function roll(el) {
    var t = el.querySelector(":scope > span:not(.roll)");
    if (!t) {
      var nodes = Array.prototype.filter.call(el.childNodes, function (n) {
        return n.nodeType === 3 && n.textContent.trim();
      });
      if (!nodes.length) return;
      t = document.createElement("span");
      t.textContent = nodes
        .map(function (n) {
          return n.textContent.trim();
        })
        .join(" ");
      nodes.forEach(function (n, i) {
        if (i === 0) el.replaceChild(t, n);
        else el.removeChild(n);
      });
    }
    var outer = document.createElement("span");
    outer.className = "roll";
    t.parentNode.insertBefore(outer, t);
    outer.appendChild(t);
    t.classList.add("roll__in");
    el.classList.add("has-roll");
  }
  $$(".nav__links a, .btn, .totop, .nav__logo").forEach(roll);

  /* ---------- Garis progres (atas) & penanda bagian (samping) ---------- */
  var bar = $("#progressBar"),
    fill = $("#railFill"),
    pct = $("#railPct");
  var railLinks = $$("#rail a");
  var secs = railLinks.map(function (a) {
    return document.getElementById(a.getAttribute("data-sec"));
  });
  var navLinks = $$("#navLinks a[href^='#']");
  var ticking = false,
    lastSec = -1,
    flashT;
  function progress() {
    ticking = false;
    var y = window.scrollY,
      max = document.documentElement.scrollHeight - innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    if (pct) pct.textContent = Math.round(p * 100) + "%";
    if (!secs.length) return;
    var n = secs.length,
      mark = y + innerHeight * 0.4,
      i = 0;
    var tops = secs.map(function (el) {
      return el ? el.getBoundingClientRect().top + y : 0;
    });
    for (var k = 0; k < n; k++) if (tops[k] <= mark) i = k;
    var end = y >= max - 2;
    if (end) i = n - 1;
    var frac =
      end || i === n - 1
        ? 0
        : Math.min(1, Math.max(0, (mark - tops[i]) / (tops[i + 1] - tops[i])));
    if (fill)
      fill.style.transform =
        "scaleY(" + (end ? 1 : (i + frac) / (n - 1)).toFixed(4) + ")";
    var id = secs[i] && secs[i].id;
    /* di HP: nama bagian muncul sebentar di samping saat berpindah bagian */
    if (i !== lastSec) {
      if (lastSec !== -1 && innerWidth <= 820 && railLinks[i]) {
        var link = railLinks[i];
        railLinks.forEach(function (a) {
          a.classList.remove("is-flash");
        });
        link.classList.add("is-flash");
        clearTimeout(flashT);
        flashT = setTimeout(function () {
          link.classList.remove("is-flash");
        }, 1400);
      }
      lastSec = i;
    }
    railLinks.forEach(function (a, k) {
      a.classList.toggle("is-active", k === i);
      a.classList.toggle("is-passed", k < i);
      if (k === i) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
    });
  }
  function queue() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(progress);
    }
  }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  window.addEventListener("load", queue);
  progress();

  /* ---------- Cahaya neon mengikuti kursor di kartu layanan ---------- */
  $$(".service, .card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--gx", e.clientX - r.left + "px");
      card.style.setProperty("--gy", e.clientY - r.top + "px");
    });
  });

  /* ---------- Muncul saat digulir ---------- */
  var reveals = $$(".reveal");
  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  root.classList.add("js-ready");
})();
