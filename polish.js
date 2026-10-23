(function(){
  if (window.__mpsPolish) return;
  window.__mpsPolish = true;

  var css = document.createElement('style');
  css.textContent = `
    .card-dark { transition: transform .35s cubic-bezier(.22,.8,.28,1), border-color .35s ease, box-shadow .35s ease; }
    .card-dark:hover { transform: translateY(-4px); border-color: rgba(43,255,136,.28); box-shadow: 0 20px 50px rgba(0,0,0,.35); }
    .btn-neon { position: relative; overflow: hidden; }
    .btn-neon::after { content:""; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%); transform:translateX(-120%); }
    .btn-neon:hover::after { animation: mpsShine .7s ease; }
    @keyframes mpsShine { to { transform:translateX(120%); } }
    .btn-neon:hover { box-shadow: 0 12px 40px rgba(43,255,136,.4) !important; }
    .btn-outline:hover { border-color: #2BFF88 !important; color: #2BFF88 !important; }
    .mps-testi { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem 4rem; }
    .mps-testi .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: #8b8b93; margin-bottom: .75rem; }
    .mps-testi h2 { font-family: 'Alte Haas Grotesk', 'Barlow Condensed', sans-serif; font-style: italic; font-weight: 800; text-transform: uppercase; font-size: clamp(2rem,5vw,3rem); line-height: .95; margin-bottom: 2.5rem; }
    .mps-testi .neon { color: #2BFF88; }
    .mps-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 1.25rem; }
    .mps-card { background: #141417; border: 1px solid rgba(255,255,255,.08); border-radius: 1.25rem; padding: 1.5rem; transition: all .35s ease; }
    .mps-card:hover { border-color: rgba(43,255,136,.3); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.3); }
    .mps-stars { color: #2BFF88; letter-spacing: .15em; font-size: .85rem; }
    .mps-quote { color: #c8c8d0; font-size: .95rem; line-height: 1.55; margin: .75rem 0 1rem; }
    .mps-name { font-weight: 700; font-size: .85rem; }
    .mps-role { color: #6b6b75; font-size: .75rem; }
    .pulse-ring { position: relative; }
    .pulse-ring::before { content:""; position:absolute; inset:-4px; border-radius:9999px; border:1px solid rgba(43,255,136,.45); animation: mpsRing 2s ease-out infinite; }
    @keyframes mpsRing { 0% { transform:scale(.9); opacity:.8; } 100% { transform:scale(1.4); opacity:0; } }

    html { scroll-behavior: smooth; }
    .mps-progress {
      position: fixed; top: 0; left: 0; height: 2px; width: 0%;
      background: linear-gradient(90deg, #2BFF88, #189a55);
      z-index: 100; box-shadow: 0 0 12px rgba(43,255,136,.6);
      transition: width .06s linear;
    }
    .mps-scroll-vignette {
      position: fixed; inset: 0; pointer-events: none; z-index: 50;
      background: radial-gradient(ellipse at center, transparent 35%, rgba(5,5,8,.65) 100%);
      opacity: 0; transition: opacity .3s ease;
    }
    .mps-particle {
      position: fixed; width: 2px; height: 2px; background: #2BFF88;
      border-radius: 50%; pointer-events: none; z-index: -1;
      opacity: .3; box-shadow: 0 0 6px #2BFF88;
    }
    .mps-cinematic { position: relative; height: 220vh; margin: 0; }
    .mps-cinematic-pin {
      position: sticky; top: 0; height: 100vh; width: 100%;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; transform-style: preserve-3d; perspective: 1600px;
    }
    .mps-cinematic-content {
      width: 100%; max-width: 72rem; margin: 0 auto; padding: 0 1.5rem;
      transform-style: preserve-3d; will-change: transform, opacity, filter;
    }
    .mps-cinematic-bg {
      position: absolute; inset: -10%;
      background: radial-gradient(ellipse at 30% 40%, rgba(43,255,136,.06), transparent 60%),
                  radial-gradient(ellipse at 70% 60%, rgba(43,255,136,.04), transparent 50%);
      pointer-events: none; will-change: transform, opacity;
    }
    .mps-cinematic-label {
      position: absolute; top: 5.5rem; left: 1.5rem;
      font-size: 11px; font-weight: 700; letter-spacing: .35em;
      text-transform: uppercase; color: rgba(43,255,136,.7); z-index: 2;
    }
    .mps-3d-card, .mps-title-3d, .hero-img, #beranda img, header img {
      transform-style: preserve-3d; will-change: transform, opacity, filter;
      backface-visibility: hidden;
    }
    .hero-img, #beranda img, header img { transition: none !important; }
    .mps-sticky-headline { position: relative; height: 160vh; }
    .mps-sticky-headline-inner {
      position: sticky; top: 0; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 2rem; overflow: hidden;
    }
    .mps-sticky-headline h2 {
      font-family: 'Alte Haas Grotesk', 'Barlow Condensed', sans-serif;
      font-style: italic; font-weight: 800; text-transform: uppercase;
      font-size: clamp(2.8rem, 9vw, 6.5rem); line-height: .92;
      letter-spacing: -.02em; margin: 0; will-change: transform, opacity;
    }
    .mps-sticky-headline .sub {
      margin-top: 1.5rem; max-width: 28rem; color: #9a9aa3;
      font-size: 1.05rem; line-height: 1.55; will-change: transform, opacity;
    }
    @media (prefers-reduced-motion: reduce) {
      .mps-3d-card, .mps-title-3d, .hero-img, .mps-cinematic-content {
        transform: none !important; opacity: 1 !important; filter: none !important;
      }
      .mps-cinematic, .mps-sticky-headline { height: auto; }
      .mps-cinematic-pin, .mps-sticky-headline-inner { position: relative; height: auto; }
    }
    @media (max-width: 767px) {
      .mps-cinematic { height: 180vh; }
      .mps-sticky-headline { height: 140vh; }
    }
  `;
  document.head.appendChild(css);

  var progress = document.createElement('div');
  progress.className = 'mps-progress';
  document.body.appendChild(progress);
  var vignette = document.createElement('div');
  vignette.className = 'mps-scroll-vignette';
  document.body.appendChild(vignette);

  function animateCount(el, target, suffix) {
    var dur = 1400, start = performance.now();
    function frame(t) {
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  document.querySelectorAll('.display.text-3xl').forEach(function(el) {
    var t = el.textContent.trim();
    if (t === '500+') { el.textContent = '0'; animateCount(el, 500, '+'); }
    else if (t === '100+') { el.textContent = '0'; animateCount(el, 100, '+'); }
  });

  document.querySelectorAll('span').forEach(function(s) {
    if (s.textContent.trim() === 'LARIS') {
      s.textContent = 'PALING LARIS';
      s.classList.add('pulse-ring');
    }
  });

  var harga = document.getElementById('harga');
  if (harga && !document.querySelector('.mps-testi')) {
    var sec = document.createElement('section');
    sec.className = 'mps-testi';
    sec.innerHTML = `
      <p class="eyebrow">Kata Pelanggan</p>
      <h2 class="mps-title-3d">Main Puas,<br><span class="neon">Balik Lagi.</span></h2>
      <div class="mps-grid">
        <div class="mps-card mps-3d-card" data-depth="0.35">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Antar cepat, stick bagus, game PES-nya lengkap banget. Sudah langganan sejak 2020."</p>
          <div class="mps-name">Rizky A.</div>
          <div class="mps-role">Pelanggan tetap · Bungkal</div>
        </div>
        <div class="mps-card mps-3d-card" data-depth="0.5">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Booking online gampang, unit datang lengkap + TV. Cocok buat nonton bareng teman."</p>
          <div class="mps-name">Dwi S.</div>
          <div class="mps-role">Sewa 24 jam · Ngrayun</div>
        </div>
        <div class="mps-card mps-3d-card" data-depth="0.65">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Harga fair, respon WA cepat. PS4 HEN-nya mulus, gak lag. Recommended!"</p>
          <div class="mps-name">Fajar M.</div>
          <div class="mps-role">Pelanggan baru · Ponorogo</div>
        </div>
      </div>`;
    harga.parentNode.insertBefore(sec, harga);
  }

  document.querySelectorAll('#game span, section span').forEach(function(s) {
    if (s.className.indexOf('rounded-full') >= 0 && s.className.indexOf('border') >= 0) {
      s.style.transition = 'all .25s ease';
      s.addEventListener('mouseenter', function() {
        s.style.borderColor = 'rgba(43,255,136,.55)';
        s.style.color = '#2BFF88';
        s.style.background = 'rgba(43,255,136,.08)';
      });
      s.addEventListener('mouseleave', function() {
        s.style.borderColor = '';
        s.style.color = '';
        s.style.background = '';
      });
    }
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function wrapCinematic(selector, label) {
    var el = document.querySelector(selector);
    if (!el || el.closest('.mps-cinematic')) return null;
    var wrap = document.createElement('div');
    wrap.className = 'mps-cinematic';
    var pin = document.createElement('div');
    pin.className = 'mps-cinematic-pin';
    var bg = document.createElement('div');
    bg.className = 'mps-cinematic-bg';
    var content = document.createElement('div');
    content.className = 'mps-cinematic-content';
    if (label) {
      var lab = document.createElement('div');
      lab.className = 'mps-cinematic-label';
      lab.textContent = label;
      pin.appendChild(lab);
    }
    el.parentNode.insertBefore(wrap, el);
    content.appendChild(el);
    pin.appendChild(bg);
    pin.appendChild(content);
    wrap.appendChild(pin);
    return wrap;
  }

  function insertStickyHeadline(beforeSel, titleHtml, subText) {
    var before = document.querySelector(beforeSel);
    if (!before) return;
    var wrap = document.createElement('div');
    wrap.className = 'mps-sticky-headline';
    wrap.innerHTML = `
      <div class="mps-sticky-headline-inner">
        <h2 class="mps-hl">${titleHtml}</h2>
        <p class="sub">${subText}</p>
      </div>`;
    before.parentNode.insertBefore(wrap, before);
  }

  insertStickyHeadline('#harga',
    'Sewa PS.<br><span class="neon">Main tanpa ribet.</span>',
    'Pilih paket, booking online, unit diantar. Stick + kabel lengkap.'
  );
  insertStickyHeadline('#booking',
    'Satu klik.<br><span class="neon">Langsung main.</span>',
    'Isi form, konfirmasi WA, unit siap di depan pintu.'
  );

  wrapCinematic('#harga', '01 — Harga');
  wrapCinematic('#booking', '02 — Booking');

  var heroImg = document.querySelector('#beranda img, .hero-img, header img');
  if (heroImg) heroImg.classList.add('mps-depth');

  document.querySelectorAll('.card-dark, .hud, .mps-card').forEach(function(el, i) {
    el.classList.add('mps-3d-card');
    if (!el.dataset.depth) el.dataset.depth = ((i % 5) * 0.12 + 0.25).toFixed(2);
  });
  document.querySelectorAll('h1, h2.display, .display.d-hero, .display.d-h2, .mps-title-3d').forEach(function(el) {
    el.classList.add('mps-title-3d');
  });

  for (var i = 0; i < 22; i++) {
    var p = document.createElement('div');
    p.className = 'mps-particle';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (Math.random() * 100) + '%';
    p.dataset.speed = 0.12 + Math.random() * 0.5;
    p.dataset.x = Math.random() * 50 - 25;
    document.body.appendChild(p);
  }

  var ticking = false;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update3D);
  }

  function update3D() {
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    var maxScroll = Math.max(1, docH - vh);
    var progressPct = (y / maxScroll) * 100;

    progress.style.width = progressPct + '%';
    vignette.style.opacity = Math.min(0.85, progressPct / 100);

    if (heroImg) {
      var hr = heroImg.getBoundingClientRect();
      var hoff = (hr.top + hr.height / 2 - vh / 2) / vh;
      var py = hoff * -70;
      var rx = hoff * 9;
      var ry = ((hr.left + hr.width / 2) - window.innerWidth / 2) / window.innerWidth * -12;
      var sc = 1 + Math.abs(hoff) * 0.06;
      heroImg.style.transform =
        'translate3d(0,' + py + 'px,40px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(' + sc + ')';
    }

    document.querySelectorAll('.mps-cinematic').forEach(function(wrap) {
      var wr = wrap.getBoundingClientRect();
      var total = wrap.offsetHeight - vh;
      if (total <= 0) return;
      var scrolled = clamp(-wr.top, 0, total);
      var p = scrolled / total;
      var content = wrap.querySelector('.mps-cinematic-content');
      var bg = wrap.querySelector('.mps-cinematic-bg');
      if (content) {
        var ease = p < 0.5 ? p * 2 : (1 - p) * 2;
        var tz = (1 - ease) * -180;
        var sc2 = 0.88 + ease * 0.12;
        var op = 0.25 + ease * 0.75;
        var blur = (1 - ease) * 4;
        content.style.transform = 'translate3d(0,0,' + tz + 'px) scale(' + sc2 + ')';
        content.style.opacity = op;
        content.style.filter = 'blur(' + blur + 'px)';
      }
      if (bg) {
        bg.style.transform = 'scale(' + (1.05 + p * 0.15) + ')';
        bg.style.opacity = 0.4 + p * 0.5;
      }
    });

    document.querySelectorAll('.mps-sticky-headline').forEach(function(wrap) {
      var wr = wrap.getBoundingClientRect();
      var total = wrap.offsetHeight - vh;
      if (total <= 0) return;
      var scrolled = clamp(-wr.top, 0, total);
      var p = scrolled / total;
      var h = wrap.querySelector('.mps-hl');
      var sub = wrap.querySelector('.sub');
      var enter = clamp(p * 2.2, 0, 1);
      var exit = clamp((p - 0.55) / 0.45, 0, 1);
      var sc = 0.75 + enter * 0.3 - exit * 0.15;
      var ty = (1 - enter) * 80 - exit * 60;
      var op = enter * (1 - exit * 0.9);
      var tz = (1 - enter) * -120 - exit * 80;
      if (h) {
        h.style.transform = 'translate3d(0,' + ty + 'px,' + tz + 'px) scale(' + sc + ')';
        h.style.opacity = Math.max(0.05, op);
      }
      if (sub) {
        sub.style.transform = 'translate3d(0,' + (ty * 0.6) + 'px,' + (tz * 0.5) + 'px)';
        sub.style.opacity = Math.max(0, op * 0.9);
      }
    });

    document.querySelectorAll('.mps-3d-card').forEach(function(el) {
      if (el.closest('.mps-cinematic')) return;
      var r = el.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var n = clamp((mid - vh / 2) / (vh * 0.7), -1.3, 1.3);
      var depth = parseFloat(el.dataset.depth || 0.4);
      var tz = -Math.abs(n) * 110 * depth;
      var rx = n * -14 * depth;
      var ry = n * 7 * depth;
      var sc = 1 - Math.abs(n) * 0.08 * depth;
      var op = 1 - Math.abs(n) * 0.3 * depth;
      el.style.transform =
        'perspective(1400px) translateZ(' + tz + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(' + sc + ')';
      el.style.opacity = Math.max(0.3, op);
      el.style.filter = 'blur(' + (Math.abs(n) * 2.2 * depth) + 'px)';
    });

    document.querySelectorAll('.mps-title-3d').forEach(function(el) {
      if (el.closest('.mps-sticky-headline')) return;
      var r = el.getBoundingClientRect();
      var n = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
      var ty = n * 36;
      var tz = -Math.abs(n) * 55;
      var op = 1 - Math.abs(n) * 0.45;
      el.style.transform = 'translate3d(0,' + ty + 'px,' + tz + 'px)';
      el.style.opacity = Math.max(0.35, op);
    });

    document.querySelectorAll('.mps-particle').forEach(function(p) {
      var speed = parseFloat(p.dataset.speed);
      var xOff = parseFloat(p.dataset.x);
      var py = (y * speed) % (vh + 50) - 25;
      p.style.transform = 'translate3d(' + (xOff * (y / 350)) + 'px,' + (-py) + 'px,0)';
    });

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  setTimeout(update3D, 80);
  update3D();
})();
