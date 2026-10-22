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
  `;
  document.head.appendChild(css);

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

  var harga = document.getElementById('harga');
  if (harga && !document.querySelector('.mps-testi')) {
    var sec = document.createElement('section');
    sec.className = 'mps-testi';
    sec.innerHTML = `
      <p class="eyebrow">Kata Pelanggan</p>
      <h2>Main Puas,<br><span class="neon">Balik Lagi.</span></h2>
      <div class="mps-grid">
        <div class="mps-card">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Antar cepat, stick bagus, game PES-nya lengkap banget. Sudah langganan sejak 2020."</p>
          <div class="mps-name">Rizky A.</div>
          <div class="mps-role">Pelanggan tetap · Bungkal</div>
        </div>
        <div class="mps-card">
          <div class="mps-stars">★★★★★</div>
          <p class="mps-quote">"Booking online gampang, unit datang lengkap + TV. Cocok buat nonton bareng teman."</p>
          <div class="mps-name">Dwi S.</div>
          <div class="mps-role">Sewa 24 jam · Ngrayun</div>
        </div>
        <div class="mps-card">
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
})();
