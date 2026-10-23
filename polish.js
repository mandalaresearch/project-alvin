(function(){
  if (window.__mpsPolish) return;
  window.__mpsPolish = true;

  var css = document.createElement('style');
  css.textContent = `
    /* ===== base polish ===== */
    .card-dark { transition: transform .35s cubic-bezier(.22,.8,.28,1), border-color .35s ease, box-shadow .35s ease; }
    .card-dark:hover { transform: translateY(-4px); border-color: rgba(43,255,136,.28); box-shadow: 0 20px 50px rgba(0,0,0,.35); }
    .btn-neon { position: relative; overflow: hidden; }
    .btn-neon::after { content:""; position:absolute; inset:0; background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%); transform:translateX(-120%); }
    .btn-neon:hover::after { animation: mpsShine .7s ease; }
    @keyframes mpsShine { to { transform:translateX(120%); } }
    .btn-neon:hover { box-shadow: 0 12px 40px rgba(43,255,136,.4) !important; }
    .btn-outline:hover { border-color: #2BFF88 !important; color: #2BFF88 !important; }

    /* ===== testimonials ===== */
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

    /* ===== DARKBLOOM-STYLE 3D SCROLL ===== */
    html { scroll-behavior: smooth; }
    body { perspective: none; }

    /* depth layers */
    .mps-depth {
      transform-style: preserve-3d;
      will-change: transform, opacity;
      transition: none;
    }

    /* sticky cinematic panels */
    .mps-sticky-wrap {
      position: relative;
      height: 180vh;
    }
    .mps-sticky-inner {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transform-style: preserve-3d;
    }

    /* parallax hero image */
    .hero-img, header img, #beranda img {
      will-change: transform;
      transform-style: preserve-3d;
      transition: none !important;
    }

    /* 3D card stack on scroll */
    .mps-3d-card {
      transform-style: preserve-3d;
      will-change: transform, opacity, filter;
      backface-visibility: hidden;
    }

    /* section title depth */
    .mps-title-3d {
      transform-style: preserve-3d;
      will-change: transform, opacity;
    }

    /* soft vignette that intensifies with scroll */
    .mps-scroll-vignette {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 40;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,.55) 100%);
      opacity: 0;
      transition: opacity .4s ease;
    }

    /* progress bar top */
    .mps-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, #2BFF88, #189a55);
      z-index: 60;
      box-shadow: 0 0 12px rgba(43,255,136,.6);
      transition: width .08s linear;
    }

    /* floating depth particles */
    .mps-particle {
      position: fixed;
      width: 2px;
      height: 2px;
      background: #2BFF88;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      opacity: .35;
      box-shadow: 0 0 6px #2BFF88;
    }

    @media (prefers-reduced-motion: reduce) {
      .mps-depth, .mps-3d-card, .mps-title-3d, .hero-img {
        transform: none !important;
        opacity: 1 !important;
      }
      .mps-sticky-wrap { height: auto; }
      .mps-sticky-inner { position: relative; height: auto; }
    }
  `;
  document.head.appendChild(css);

  /* progress bar */
  var progress = document.createElement('div');
  progress.className = 'mps-progress';
  document.body.appendChild(progress);

  var vignette = document.createElement('div');
  vignette.className = 'mps-scroll-vignette';
  document.body.appendChild(vignette);

  /* counter animation */
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
  var stats = document.querySelectorAll('.display.text-3xl');
  stats.forEach(function(el) {
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

  /* inject testimonials if missing */
  var harga = document.getElementById('harga');
  if (harga && !document.querySelector('.mps-testi')) {
    var sec = document.createElement('section');
    sec.className = 'mps-testi';
    sec.innerHTML = `
      <p class="eyebrow">Kata Pelanggan</p>
      <h2 class="mps-title-3d">Main Puas,<br><span class="neon">Balik Lagi.</span></h2>
      <div class="mps-grid">
        <div class="mps-card mps-3d-card">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Antar cepat, stick bagus, game PES-nya lengkap banget. Sudah langganan sejak 2020."</p>
          <div class="mps-name">Rizky A.</div>
          <div class="mps-role">Pelanggan tetap · Bungkal</div>
        </div>
        <div class="mps-card mps-3d-card">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Booking online gampang, unit datang lengkap + TV. Cocok buat nonton bareng teman."</p>
          <div class="mps-name">Dwi S.</div>
          <div class="mps-role">Sewa 24 jam · Ngrayun</div>
        </div>
        <div class="mps-card mps-3d-card">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Harga fair, respon WA cepat. PS4 HEN-nya mulus, gak lag. Recommended!"</p>
          <div class="mps-name">Fajar M.</div>
          <div class="mps-role">Pelanggan baru · Ponorogo</div>
        </div>
      </div>`;
    harga.parentNode.insertBefore(sec, harga);
  }

  /* tag hover */
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

  /* ========== 3D SCROLL ENGINE (Darkbloom-inspired) ========== */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // mark elements for depth
  var heroImg = document.querySelector('#beranda img, .hero-img, header img');
  if (heroImg) heroImg.classList.add('mps-depth');

  document.querySelectorAll('.card-dark, .hud, .mps-card').forEach(function(el, i) {
    el.classList.add('mps-3d-card');
    el.dataset.depth = (i % 5) * 0.15 + 0.2;
  });

  document.querySelectorAll('h1, h2.display, .display.d-hero, .display.d-h2').forEach(function(el) {
    el.classList.add('mps-title-3d');
  });

  // soft floating particles
  for (var i = 0; i < 18; i++) {
    var p = document.createElement('div');
    p.className = 'mps-particle';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (Math.random() * 100) + '%';
    p.dataset.speed = 0.15 + Math.random() * 0.45;
    p.dataset.x = Math.random() * 40 - 20;
    document.body.appendChild(p);
  }

  var ticking = false;
  var lastY = 0;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update3D);
  }

  function update3D() {
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    var maxScroll = docH - vh;
    var progressPct = maxScroll > 0 ? (y / maxScroll) * 100 : 0;

    progress.style.width = progressPct + '%';
    vignette.style.opacity = Math.min(0.7, progressPct / 120);

    // hero parallax + slight 3D tilt
    if (heroImg) {
      var heroRect = heroImg.getBoundingClientRect();
      var heroCenter = heroRect.top + heroRect.height / 2;
      var heroOff = (heroCenter - vh / 2) / vh;
      var py = heroOff * -48;
      var rotX = heroOff * 6;
      var rotY = (heroRect.left + heroRect.width / 2 - window.innerWidth / 2) / window.innerWidth * -8;
      heroImg.style.transform =
        'translate3d(0,' + py + 'px,0) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(' + (1 + Math.abs(heroOff) * 0.04) + ')';
    }

    // 3D cards – depth based on viewport position
    document.querySelectorAll('.mps-3d-card').forEach(function(el) {
      var r = el.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var n = (mid - vh / 2) / (vh * 0.75); // -1 .. 1
      n = Math.max(-1.2, Math.min(1.2, n));
      var depth = parseFloat(el.dataset.depth || 0.3);
      var tz = -Math.abs(n) * 80 * depth;
      var rx = n * -12 * depth;
      var ry = n * 6 * depth;
      var sc = 1 - Math.abs(n) * 0.06 * depth;
      var op = 1 - Math.abs(n) * 0.25 * depth;
      el.style.transform =
        'perspective(1200px) translateZ(' + tz + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(' + sc + ')';
      el.style.opacity = Math.max(0.35, op);
      el.style.filter = 'blur(' + (Math.abs(n) * 1.8 * depth) + 'px)';
    });

    // titles – rise & settle with depth
    document.querySelectorAll('.mps-title-3d').forEach(function(el) {
      var r = el.getBoundingClientRect();
      var n = (r.top + r.height / 2 - vh / 2) / vh;
      n = Math.max(-1, Math.min(1, n));
      var ty = n * 28;
      var tz = -Math.abs(n) * 40;
      var op = 1 - Math.abs(n) * 0.4;
      el.style.transform = 'translate3d(0,' + ty + 'px,' + tz + 'px)';
      el.style.opacity = Math.max(0.4, op);
    });

    // particles drift
    document.querySelectorAll('.mps-particle').forEach(function(p) {
      var speed = parseFloat(p.dataset.speed);
      var xOff = parseFloat(p.dataset.x);
      var py = (y * speed) % (vh + 40) - 20;
      p.style.transform = 'translate3d(' + (xOff * (y / 400)) + 'px,' + (-py) + 'px,0)';
    });

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update3D();

  // intersection reveal for smoother entrance
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv, .mps-3d-card, .mps-title-3d').forEach(function(el) {
      io.observe(el);
    });
  }
})();
