/* Animasi: latar garis liquid, huruf nama, foto yang ikut gerak, dan teks yang dibuka blok warna.
   Bisa dimatikan satu per satu di config.js → animasi. Tidak perlu diedit. */
(function () {
  "use strict";
  var A = (window.SITE && window.SITE.animasi) || {};
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wrap = document.getElementById("heroWrap");
  var topo = document.getElementById("topo");
  var glow = document.getElementById("topoGlow");
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* ---------- Huruf nama satu per satu ---------- */
  if (A.hurufNama !== false && !reduce) {
    var n = 0;
    Array.prototype.forEach.call(document.querySelectorAll(".hero__name .line > span"), function (el) {
      var text = el.textContent;
      el.setAttribute("aria-label", text);
      el.innerHTML = Array.prototype.map.call(text, function (ch) {
        var safe = ch === " " ? "&nbsp;" : ch.replace(/[&<>"]/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; });
        return '<span class="ch" aria-hidden="true" style="--i:' + (n++) + '">' + safe + "</span>";
      }).join("");
    });
    root.classList.add("split-on");
    /* kembalikan jarak antar-huruf asli (kerning) yang hilang saat huruf dipisah */
    var kern = function () {
      var c = document.createElement("canvas").getContext("2d");
      Array.prototype.forEach.call(document.querySelectorAll(".hero__name .line > span"), function (el) {
        var chs = el.querySelectorAll(".ch");
        var cs = getComputedStyle(chs[0] || el);
        var size = parseFloat(cs.fontSize) || 100;
        c.font = cs.fontWeight + " " + size + "px " + cs.fontFamily;
        for (var i = 0; i < chs.length - 1; i++) {
          var a = chs[i].textContent, b = chs[i + 1].textContent;
          if (cs.textTransform === "uppercase") { a = a.toUpperCase(); b = b.toUpperCase(); }
          var k = c.measureText(a + b).width - c.measureText(a).width - c.measureText(b).width;
          chs[i].style.marginRight = (k / size).toFixed(3) + "em";
        }
      });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(kern); else kern();
    /* di HP: ketuk nama → huruf melompat bergelombang */
    var name = document.querySelector(".hero__name");
    if (name) name.addEventListener("click", function () {
      name.classList.remove("is-wave"); void name.offsetWidth; name.classList.add("is-wave");
    });
  }


  /* ---------- Latar garis "liquid" (garis kontur yang pelan berubah bentuk) ---------- */
  var NS = "http://www.w3.org/2000/svg";
  var svg = null, groups = [], built = { w: 0, h: 0 };
  var CENTERS = [  // posisi relatif layar, jari-jari relatif, jumlah garis, kedalaman parallax
    { x: .08, y: .14, r: .42, k: 3, d: 1 },
    { x: .98, y: .62, r: .50, k: 4, d: -1.4 },
    { x: .34, y: 1.06, r: .36, k: 3, d: .8 },
    { x: .78, y: .04, r: .16, k: 2, d: -.6 }
  ];
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function ring(cx, cy, R, amp, ph) {
    var N = 12, pts = [], i;
    for (i = 0; i < N; i++) {
      var t = i / N * Math.PI * 2, f = 1;
      for (var j = 0; j < amp.length; j++) f += amp[j] * Math.sin((j + 2) * t + ph[j]);
      pts.push([cx + Math.cos(t) * R * f, cy + Math.sin(t) * R * f]);
    }
    var P = function (k) { return pts[(k + N) % N]; }, r1 = function (v) { return Math.round(v * 10) / 10; };
    var d = "M" + r1(pts[0][0]) + " " + r1(pts[0][1]);
    for (i = 0; i < N; i++) {
      var p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += "C" + r1(p1[0] + (p2[0] - p0[0]) / 6) + " " + r1(p1[1] + (p2[1] - p0[1]) / 6) + " " +
           r1(p2[0] - (p3[0] - p1[0]) / 6) + " " + r1(p2[1] - (p3[1] - p1[1]) / 6) + " " + r1(p2[0]) + " " + r1(p2[1]);
    }
    return d + "Z";
  }
  function buildTopo() {
    var W = innerWidth, H = Math.max(innerHeight, 560), D = Math.max(W, H);
    built = { w: W, h: H };
    if (svg) svg.remove();
    svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    groups = [];
    var rand = rnd(7);
    CENTERS.forEach(function (c, gi) {
      var g = document.createElementNS(NS, "g");
      var cx = c.x * W, cy = c.y * H;
      var amp = [.10 + rand() * .10, .05 + rand() * .07, .03 + rand() * .04];
      var ph = [rand() * 6.3, rand() * 6.3, rand() * 6.3];
      for (var k = 1; k <= c.k; k++) {
        var R = c.r * Math.min(D, W * 1.3) * (.3 + .7 * k / c.k), shapes = [];
        for (var f = 0; f < 3; f++) {
          shapes.push(ring(cx, cy, R, amp.map(function (a, j) { return a * (1 + .25 * Math.sin(k + f * 1.7 + j)); }),
            ph.map(function (p, j) { return p + f * 2.1 * (j % 2 ? 1 : -1) + k * .22; })));
        }
        var path = document.createElementNS(NS, "path");
        path.setAttribute("d", shapes[0]);
        if (k === c.k - 1) path.setAttribute("class", "hi");
        if (!reduce) {
          var an = document.createElementNS(NS, "animate");
          an.setAttribute("attributeName", "d");
          an.setAttribute("dur", (22 + gi * 5) + "s");
          an.setAttribute("repeatCount", "indefinite");
          an.setAttribute("values", shapes.concat(shapes[0]).join(";"));
          an.setAttribute("keyTimes", "0;.33;.66;1");
          an.setAttribute("calcMode", "spline");
          an.setAttribute("keySplines", ".45 0 .55 1;.45 0 .55 1;.45 0 .55 1");
          path.appendChild(an);
        }
        g.appendChild(path);
      }
      svg.appendChild(g);
      groups.push({ el: g, cx: cx, cy: cy, d: c.d });
    });
    topo.insertBefore(svg, topo.firstChild);
  }
  if (topo) {
    if (A.latarCair === false) topo.hidden = true;
    else {
      buildTopo();
      var rt;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
          /* abaikan perubahan kecil tinggi layar HP (bilah alamat muncul/hilang) */
          if (Math.abs(innerWidth - built.w) > 60 || Math.abs(Math.max(innerHeight, 560) - built.h) > 200) { buildTopo(); if (!reduce && wrap) kick(true); }
        }, 250);
      });
      document.addEventListener("visibilitychange", function () {
        if (!svg || !svg.pauseAnimations) return;
        if (document.hidden) svg.pauseAnimations(); else svg.unpauseAnimations();
      });
    }
  }

  /* ---------- Teks dibuka blok warna saat digulir (About, Contact, judul) ---------- */
  var masks = $$(".mask");
  if (A.teksMuncul !== false && !reduce && masks.length && "IntersectionObserver" in window) {
    var wrapWords = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          if (!n.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "w";
            var t = document.createElement("span"); t.className = "w__t"; t.textContent = part;
            w.appendChild(t); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR" && !n.classList.contains("w") && n.tagName !== "svg") wrapWords(n);
      });
    };
    /* kelompokkan kata per baris, lalu buat satu blok warna untuk tiap baris */
    var layout = function (el) {
      $$(".mask__bar", el).forEach(function (b) { b.remove(); });
      var box = el.getBoundingClientRect(), words = $$(".w", el), lines = [];
      words.forEach(function (w) {
        var r = w.getBoundingClientRect(), line = null;
        if (!r.width) return;
        for (var i = 0; i < lines.length; i++) if (Math.abs(lines[i].top - r.top) < 6) { line = lines[i]; break; }
        if (!line) { line = { top: r.top, bottom: r.bottom, l: r.left, r: r.right, ws: [] }; lines.push(line); }
        line.l = Math.min(line.l, r.left); line.r = Math.max(line.r, r.right);
        line.bottom = Math.max(line.bottom, r.bottom); line.ws.push(w);
      });
      lines.sort(function (a, b) { return a.top - b.top; });
      lines.forEach(function (ln, li) {
        var d = li * 140 + "ms";
        var bar = document.createElement("span");
        bar.className = "mask__bar";
        bar.setAttribute("aria-hidden", "true");
        var h = ln.bottom - ln.top, pad = h * .06;
        bar.style.cssText = "left:" + (ln.l - box.left - pad) + "px;top:" + (ln.top - box.top + pad) + "px;width:" +
          (ln.r - ln.l + pad * 2) + "px;height:" + (h - pad * 1.5) + "px;--d:" + d;
        el.appendChild(bar);
        ln.ws.forEach(function (w) { w.style.setProperty("--d", d); });
      });
      el._dur = lines.length * 140 + 1100;
    };
    masks.forEach(function (el) { wrapWords(el); layout(el); });
    /* hitung ulang setelah font selesai dimuat (lebar kata bisa berubah) */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () {
      masks.forEach(function (el) { if (!el.classList.contains("is-in")) layout(el); });
    });
    root.classList.add("mask-on");
    var mrt;
    window.addEventListener("resize", function () {
      clearTimeout(mrt);
      mrt = setTimeout(function () { masks.forEach(function (el) { if (!el.classList.contains("is-in")) layout(el); }); }, 200);
    });
    var mio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("is-in");
        setTimeout(function () { el.classList.add("is-done"); }, el._dur || 1200);
        mio.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    masks.forEach(function (el) { mio.observe(el); });

    /* ikon & tombol muncul bergantian */
    var pops = $$(".pop");
    pops.forEach(function (el) { Array.prototype.forEach.call(el.children, function (c, i) { c.style.setProperty("--i", i); }); });
    var pio = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); pio.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    pops.forEach(function (el) { pio.observe(el); });
  }

  if (reduce || !wrap) return;

  /* ---------- Gerak mengikuti jari / kursor & gulir ---------- */
  var photo = document.querySelector(".hero__photo");
  var moveFoto = A.gerakFoto !== false;
  var tx = innerWidth * .7, ty = innerHeight * .4, x = tx, y = ty;   // posisi cahaya (koordinat layar)
  var nx = 0, ny = 0, cnx = 0, cny = 0, sy = 0, csy = 0;
  var running = false, lastInput = 0, idleT = 0;

  function point(cx, cy) {
    tx = cx; ty = cy;
    nx = (cx / innerWidth) * 2 - 1; ny = (cy / innerHeight) * 2 - 1;
    kick();
  }
  window.addEventListener("pointermove", function (e) { point(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener("touchstart", function (e) { if (e.touches[0]) point(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  window.addEventListener("touchmove", function (e) { if (e.touches[0]) point(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  window.addEventListener("scroll", function () { kick(true); }, { passive: true });

  /* cahaya jalan sendiri pelan saat tidak disentuh (penting di HP) */
  setInterval(function () {
    if (document.hidden || Date.now() - lastInput < 2500) return;
    idleT += 1;
    tx = innerWidth * (.5 + .34 * Math.cos(idleT * .9));
    ty = innerHeight * (.45 + .28 * Math.sin(idleT * 1.3));
    nx = Math.cos(idleT * .9) * .5; ny = Math.sin(idleT * 1.3) * .5;
    kick(true);
  }, 2200);

  function kick(auto) {
    if (!auto) lastInput = Date.now();
    if (!running) { running = true; requestAnimationFrame(frame); }
  }
  function frame() {
    x += (tx - x) * .06; y += (ty - y) * .06;
    cnx += (nx - cnx) * .06; cny += (ny - cny) * .06;
    sy = window.scrollY; csy += (sy - csy) * .12;
    if (glow) glow.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
    groups.forEach(function (g) {
      var dx = cnx * 16 * g.d, dy = cny * 16 * g.d, a = csy * .012 * g.d;
      g.el.setAttribute("transform", "translate(" + dx.toFixed(1) + " " + dy.toFixed(1) + ") rotate(" + a.toFixed(2) + " " + g.cx.toFixed(0) + " " + g.cy.toFixed(0) + ")");
    });
    var hs = Math.min(sy, (wrap.offsetHeight || 900) + 200);
    wrap.style.setProperty("--sy", hs.toFixed(1));
    if (photo && moveFoto && sy < (wrap.offsetHeight || 900) + 200) {
      photo.style.translate = (cnx * -14).toFixed(2) + "px " + (cny * -14 + hs * .12).toFixed(2) + "px";
      photo.style.rotate = (cnx * 2).toFixed(2) + "deg";
    }
    var still = Math.abs(tx - x) < .5 && Math.abs(ty - y) < .5 && Math.abs(nx - cnx) < .004 && Math.abs(ny - cny) < .004 && Math.abs(sy - csy) < .5;
    if (still) { running = false; return; }
    requestAnimationFrame(frame);
  }
  kick(true);
})();
