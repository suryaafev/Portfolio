/* Animasi: teks per huruf, hover bergulir, kursor, magnet, parallax, pita ikut gulir, layar pembuka.
   Setiap fitur bisa dimatikan di config.js → animasi. Hapus file ini = semua animasi tambahan mati. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var A = S.animasi || {};
  var on = function (k) { return A[k] !== false; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ================= 1. pecah teks per huruf / kata ================= */
  function split(el, mode, baseDelay) {
    if (!el || el.dataset.split) return;
    el.dataset.split = "1";
    var text = el.textContent.replace(/\s+/g, " ").trim();
    var i = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span");
            w.className = "w";
            if (mode === "words") {
              var wi = document.createElement("span");
              wi.className = "wi"; wi.style.setProperty("--i", i++); wi.textContent = part;
              w.appendChild(wi);
            } else {
              Array.prototype.forEach.call(part, function (ch) {
                var c = document.createElement("span");
                c.className = "c"; c.style.setProperty("--i", i++); c.textContent = ch;
                w.appendChild(c);
              });
            }
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR" && n.tagName !== "svg") {
          walk(n);
        }
      });
    };
    walk(el);
    /* pembaca layar tetap membaca teks utuh */
    $$(".w", el).forEach(function (w) { w.setAttribute("aria-hidden", "true"); });
    var sr = document.createElement("span");
    sr.className = "sr"; sr.textContent = text;
    el.appendChild(sr);
    el.classList.add("split");
    if (mode === "words") el.classList.add("split--words");
    if (baseDelay) el.style.setProperty("--d", baseDelay + "ms");
  }

  var animText = on("teks") && !reduce;
  if (animText) {
    $$(".hero__line").forEach(function (l, n) { split(l, "chars", n * 120); });
    $$(".works__title, .services__title, .feed__title, .footer__tagline").forEach(function (h) { split(h, "chars"); });
    $$(".quote, .about__statement").forEach(function (q) { split(q, "words"); });
  }
  /* huruf kartu besar selalu dipecah (untuk efek gelombang saat hover) */
  $$(".card-big__title").forEach(function (t) { split(t, "chars"); t.classList.add("is-in"); });

  /* tampilkan saat masuk layar */
  var splits = $$(".split").filter(function (el) { return !el.closest(".hero") && !el.closest(".card-big"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px" });
    splits.forEach(function (el) { io.observe(el); });
  } else splits.forEach(function (el) { el.classList.add("is-in"); });

  /* ================= 2. teks bergulir saat hover ================= */
  function roll(host) {
    var label = null;
    for (var k = 0; k < host.childNodes.length; k++) {
      var n = host.childNodes[k];
      if (n.nodeType === 3 && n.textContent.trim()) { label = n; break; }
      if (n.nodeType === 1 && n.tagName === "SPAN" && !n.classList.contains("sr") && n.textContent.trim()) { label = n; break; }
    }
    if (!label || (label.classList && label.classList.contains("roll"))) return;
    var wrap = document.createElement("span"); wrap.className = "roll";
    var t = document.createElement("span"); t.className = "roll__t";
    t.textContent = label.textContent.trim();
    wrap.appendChild(t);
    host.replaceChild(wrap, label);
  }
  if (!reduce) $$(".nav__links a, .btn, .chip-btn, .footer__cols a, .totop, .status__cta").forEach(roll);
  if (!reduce) $$("#status").forEach(function (s) { s.classList.add("roll-host"); });

  /* ================= 3. layar pembuka ================= */
  var intro = $("#intro");
  var startHero = function () { $$(".hero .split").forEach(function (el) { el.classList.add("is-in"); }); };
  if (intro && !root.classList.contains("intro-off")) {
    var nm = $("#introName"), cnt = $("#introCount");
    nm.textContent = [S.nama && S.nama.baris1, S.nama && S.nama.baris2].filter(Boolean).join(" ");
    var t0 = performance.now(), dur = 900;
    var tick = function (t) {
      var k = Math.min(1, (t - t0) / dur);
      cnt.textContent = Math.round((1 - Math.pow(1 - k, 3)) * 100);
      if (k < 1) requestAnimationFrame(tick);
      else {
        intro.classList.add("is-done");
        setTimeout(startHero, 350);
        setTimeout(function () { intro.hidden = true; }, 1100);
        try { sessionStorage.setItem("introDilihat", "1"); } catch (e) {}
      }
    };
    requestAnimationFrame(tick);
  } else {
    if (intro) intro.hidden = true;
    requestAnimationFrame(startHero);
  }

  if (reduce) return;   /* sisa efek di bawah murni gerakan */

  /* ================= 4. kursor khusus ================= */
  var cursor = null, cx = -100, cy = -100, tx = -100, ty = -100;
  if (on("kursor") && finePointer) {
    cursor = document.createElement("div");
    cursor.className = "cursor is-hidden";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML = "<span>Lihat</span>";
    document.body.appendChild(cursor);
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.remove("is-hidden");
      var el = e.target;
      var work = el.closest && el.closest(".work, .feed__grid a, .hl-item");
      cursor.classList.toggle("is-view", !!work);
      cursor.classList.toggle("is-link", !work && !!(el.closest && el.closest("a, button, [role=button]")));
      cursor.classList.toggle("on-dark", !!(el.closest && el.closest(".footer, .detail")) && !work);
      $("span", cursor).textContent = el.closest && el.closest(".feed__grid a") ? "Buka" : "Lihat";
    }, { passive: true });
    document.addEventListener("pointerleave", function () { cursor.classList.add("is-hidden"); });
    document.addEventListener("pointerdown", function () { cursor.style.scale = ".85"; });
    document.addEventListener("pointerup", function () { cursor.style.scale = ""; });
  }

  /* ================= 5. magnet ================= */
  if (on("magnet") && finePointer) {
    $$(".btn, .nav__logo, .nav__menu, .detail__close, .status").forEach(function (el) {
      el.classList.add("magnet");
      var kuat = el.classList.contains("status") ? 0.12 : 0.3;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.classList.add("is-pull");
        el.style.setProperty("--gx", ((e.clientX - r.left - r.width / 2) * kuat).toFixed(1) + "px");
        el.style.setProperty("--gy", ((e.clientY - r.top - r.height / 2) * kuat).toFixed(1) + "px");
      });
      el.addEventListener("pointerleave", function () {
        el.classList.remove("is-pull");
        el.style.setProperty("--gx", "0px"); el.style.setProperty("--gy", "0px");
      });
    });
    /* panah pada kartu besar ikut tertarik */
    $$(".card-big").forEach(function (card) {
      var arrow = $(".arrow", card);
      if (!arrow) return;
      arrow.classList.add("magnet");
      card.addEventListener("pointermove", function (e) {
        var r = arrow.getBoundingClientRect();
        arrow.classList.add("is-pull");
        arrow.style.setProperty("--gx", Math.max(-40, Math.min(40, (e.clientX - r.left - r.width / 2) * 0.15)) + "px");
        arrow.style.setProperty("--gy", Math.max(-40, Math.min(40, (e.clientY - r.top - r.height / 2) * 0.15)) + "px");
      });
      card.addEventListener("pointerleave", function () {
        arrow.classList.remove("is-pull");
        arrow.style.setProperty("--gx", "0px"); arrow.style.setProperty("--gy", "0px");
      });
    });
  }

  /* ================= 6. kartu karya miring ================= */
  if (on("miring") && finePointer) {
    var grid = $("#worksGrid");
    if (grid) {
      grid.addEventListener("pointermove", function (e) {
        var card = e.target.closest(".work");
        if (!card) return;
        var media = $(".work__media", card), r = media.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add("is-tilting");
        card.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
      });
      grid.addEventListener("pointerout", function (e) {
        var card = e.target.closest(".work");
        if (!card || card.contains(e.relatedTarget)) return;
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg");
      });
    }
  }

  /* ================= 7. parallax, progres, pita ikut gulir ================= */
  var hero = $(".hero"), line1 = $(".hero__line--1"), line2 = $(".hero__line--2"), photo = $(".hero__photo");
  var hlImgs = $$(".hl-item__img img"), drift = $$(".quote, .works__title, .services__title, .feed__title");
  var progress = $(".progress");
  var marquees = $$(".marquee");
  /* pita berjalan digerakkan JavaScript agar bisa berbalik arah & makin cepat saat digulir */
  var tapes = marquees.map(function (m) {
    m.classList.add("js-marquee");
    var ts = $$(".marquee__track", m);
    return { m: m, ts: ts, pos: 0, base: ts[0] && ts[0].classList.contains("marquee__track--reverse") ? -1 : 1, dir: 1 };
  });
  var mouseX = 0, mouseY = 0, smx = 0, smy = 0;
  if (finePointer && on("parallax")) {
    window.addEventListener("pointermove", function (e) {
      mouseX = e.clientX / innerWidth - 0.5; mouseY = e.clientY / innerHeight - 0.5;
    }, { passive: true });
  }
  var lastY = scrollY, vel = 0, smoothVel = 0;
  var parallax = on("parallax");

  function frame() {
    var y = scrollY, vh = innerHeight;
    vel = y - lastY; lastY = y;
    smoothVel += (vel - smoothVel) * 0.12;

    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    }

    /* pita berjalan: makin cepat & berbalik arah sesuai gulir, sedikit miring */
    var v = Math.max(-60, Math.min(60, smoothVel));
    tapes.forEach(function (t) {
      var w = t.ts[0] ? t.ts[0].offsetWidth : 0;
      if (!w) return;
      if (smoothVel > 1) t.dir = 1; else if (smoothVel < -1) t.dir = -1;
      var speed = (t.m.matches(":hover") ? 0.4 : 1.1) + Math.abs(v) * 0.35;
      t.pos -= speed * t.dir * t.base;
      if (t.pos <= -w) t.pos += w;
      if (t.pos > 0) t.pos -= w;
      var tf = "translate3d(" + t.pos.toFixed(1) + "px,0,0)";
      t.ts.forEach(function (el) { el.style.transform = tf; });
    });
    marquees.forEach(function (m) { m.style.setProperty("--skew", (-v * 0.12).toFixed(2) + "deg"); });

    if (parallax) {
      if (hero && y < vh * 1.3) {
        if (line1) line1.style.setProperty("--px", (-y * 0.35).toFixed(1) + "px");
        if (line2) line2.style.setProperty("--px", (y * 0.35).toFixed(1) + "px");
        if (photo) {
          photo.style.setProperty("--py", (y * 0.18).toFixed(1) + "px");
          photo.style.setProperty("--pr", (y * 0.012).toFixed(2) + "deg");
        }
      }
      if (photo && finePointer) {
        smx += (mouseX - smx) * 0.08; smy += (mouseY - smy) * 0.08;
        photo.style.setProperty("--mx", (smx * 30).toFixed(1) + "px");
        photo.style.setProperty("--my", (smy * 22).toFixed(1) + "px");
      }
      hlImgs.forEach(function (img) {
        var r = img.parentNode.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;      /* -1 .. 1 */
        img.style.setProperty("--py", (k * -60).toFixed(1) + "px");
      });
      drift.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--px", (k * (el.classList.contains("quote") ? -60 : 40)).toFixed(1) + "px");
      });
    }

    if (cursor) {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cursor.style.setProperty("--cx", cx.toFixed(1) + "px");
      cursor.style.setProperty("--cy", cy.toFixed(1) + "px");
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
