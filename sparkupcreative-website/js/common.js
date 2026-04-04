/* ═══════════════════════════════════════════════════════════
   SPARKUP CREATIVE — common.js
   IMPORTANT: window exports are at line 1.
   JavaScript hoists function declarations, so assigning them
   to window here works even though the bodies appear later.
═══════════════════════════════════════════════════════════ */

/* ── STEP 1: Export all shared functions to window FIRST ── */
window.fillMarquee  = fillMarquee;
window.initCounters = initCounters;
window.initTilt     = initTilt;
window.spawnBurst   = spawnBurst;

/* ── STEP 2: Determine active page ──────────────────────── */
var _page = (function () {
  var p = location.pathname;
  if (p.indexOf('services') > -1) return 'services';
  if (p.indexOf('about')    > -1) return 'about';
  if (p.indexOf('contact')  > -1) return 'contact';
  return 'home';
}());

/* ── STEP 3: Inject nav + cursor + burst canvas ─────────── */
document.body.insertAdjacentHTML('afterbegin', [
  '<div id="cur-dot"></div>',
  '<div id="cur-ring"></div>',
  '<canvas id="burst-canvas" style="position:fixed;inset:0;z-index:8999;pointer-events:none;"></canvas>',
  '<div id="preloader">',
  '  <div class="pre-wordmark">SPARK<span class="hl">UP</span></div>',
  '  <div class="pre-track"><div class="pre-fill"></div></div>',
  '  <div class="pre-status">Loading Creative Engine...</div>',
  '</div>',
  '<nav id="nav">',
  '  <a href="index.html" class="nav-logo">',
  '    <img src="assets/logo.png" style="height:64px;width:auto;" alt="SparkUp Creative"/>',
  '    <span class="logo-text">SparkUp <em>Creative</em></span>',
  '  </a>',
  '  <ul class="nav-links">',
  '    <li><a href="index.html"    ' + (_page === 'home'     ? 'class="active"' : '') + '>Home</a></li>',
  '    <li><a href="services.html" ' + (_page === 'services' ? 'class="active"' : '') + '>Services</a></li>',
  '    <li><a href="about.html"    ' + (_page === 'about'    ? 'class="active"' : '') + '>About Us</a></li>',
  '    <li><a href="contact.html"  ' + (_page === 'contact'  ? 'class="active"' : '') + '>Contact</a></li>',
  '  </ul>',
  '  <a href="contact.html" class="nav-cta">Spark Up \u2192</a>',
  '  <div class="nav-ham" id="navHam"><span></span><span></span><span></span></div>',
  '</nav>',
  '<div class="nav-drawer" id="navDrawer">',
  '  <ul>',
  '    <li><a href="index.html">Home</a></li>',
  '    <li><a href="services.html">Services</a></li>',
  '    <li><a href="about.html">About Us</a></li>',
  '    <li><a href="contact.html">Contact</a></li>',
  '  </ul>',
  '  <a href="contact.html" class="drawer-cta">Spark Up \u2192</a>',
  '</div>'
].join(''));

/* ── STEP 4: Inject footer ───────────────────────────────── */
document.body.insertAdjacentHTML('beforeend', [
  '<footer id="footer">',
  '  <div class="container">',
  '    <div class="footer-top">',
  '      <div class="ft-brand">',
  '        <div class="logo-text">SparkUp <em>Creative</em></div>',
  '        <p>AI-Powered Creativity. People-Powered Growth. We help businesses automate, create, and dominate with artificial intelligence.</p>',
  '        <span class="ft-tagline">Build with AI. Grow with Purpose. Lead with Vision.</span>',
  '      </div>',
  '      <div class="footer-col"><h4>Navigation</h4><ul>',
  '        <li><a href="index.html">Home</a></li>',
  '        <li><a href="services.html">Services</a></li>',
  '        <li><a href="about.html">About Us</a></li>',
  '        <li><a href="contact.html">Contact</a></li>',
  '      </ul></div>',
  '      <div class="footer-col"><h4>Services</h4><ul>',
  '        <li><a href="services.html#automation">AI Automation</a></li>',
  '        <li><a href="services.html#content">AI Content</a></li>',
  '        <li><a href="services.html#training">AI Training</a></li>',
  '        <li><a href="services.html#social">Social Automation</a></li>',
  '        <li><a href="services.html#marketing">AI Marketing</a></li>',
  '      </ul></div>',
  '      <div class="footer-col"><h4>Connect</h4>',
  '        <div class="ft-contact">',
  '          <p>hello@sparkupcreative.com</p>',
  '          <p>nas.io/sparkupacademy</p>',
  '          <p>Wyoming, USA &amp; India</p>',
  '        </div>',
  '      </div>',
  '    </div>',
  '    <div class="footer-bottom">',
  '      <div class="footer-copy">&copy; 2024 SparkUp Creative LLC &mdash; Wyoming, USA.</div>',
  '      <div class="footer-socials">',
  '        <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/></svg></a>',
  '        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8" width="14" height="14"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>',
  '        <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8" width="14" height="14"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</footer>'
].join(''));

/* ── STEP 5: Preloader ───────────────────────────────────── */
window.addEventListener('load', function () {
  setTimeout(function () {
    var pre = document.getElementById('preloader');
    if (!pre) return;
    pre.style.transition = 'opacity .6s';
    pre.style.opacity    = '0';
    setTimeout(function () {
      pre.remove();
      var pb = document.querySelector('.page-body');
      if (pb) pb.style.opacity = '1';
    }, 600);
  }, 1400);
});

/* ── STEP 6: Custom cursor ───────────────────────────────── */
(function () {
  var dot  = document.getElementById('cur-dot');
  var ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;
  var mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function tick() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }());
  document.querySelectorAll('a, button, .btn').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('hovering'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('hovering'); });
  });
}());

/* ── STEP 7: Mobile nav ──────────────────────────────────── */
(function () {
  var ham    = document.getElementById('navHam');
  var drawer = document.getElementById('navDrawer');
  if (!ham || !drawer) return;
  ham.addEventListener('click', function () {
    ham.classList.toggle('open');
    drawer.classList.toggle('open');
  });
}());

/* ── STEP 8: Nav scroll highlight ───────────────────────── */
window.addEventListener('scroll', function () {
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('active', window.scrollY > 50);
});

/* ── STEP 9: Scroll reveal ───────────────────────────────── */
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
}());

/* ── STEP 10: Magnetic buttons ───────────────────────────── */
document.querySelectorAll('.btn, .nav-cta').forEach(function (btn) {
  btn.addEventListener('mousemove', function (e) {
    var r = btn.getBoundingClientRect();
    var x = (e.clientX - r.left - r.width  / 2) * 0.28;
    var y = (e.clientY - r.top  - r.height / 2) * 0.28;
    btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  });
  btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
});

/* ── STEP 11: Burst canvas ───────────────────────────────── */
(function () {
  var canvas = document.getElementById('burst-canvas');
  if (!canvas) return;
  var ctx    = canvas.getContext('2d');
  var bursts = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* Override placeholder spawnBurst with real implementation */
  window.spawnBurst = function (x, y) {
    var b = [];
    for (var i = 0; i < 80; i++) {
      var a = Math.random() * Math.PI * 2;
      var s = Math.random() * 9 + 2;
      b.push({ x:x, y:y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, r:Math.random()*5+2, a:1, c:Math.random()<0.65?'#C8FF00':'#fff' });
    }
    bursts.push(b);
  };

  (function animBurst() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bursts.forEach(function (b, bi) {
      b.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.a -= 0.02; p.r *= 0.97;
        if (p.a <= 0) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.a;
        ctx.fillStyle   = p.c;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      if (b[0] && b[0].a <= 0) bursts.splice(bi, 1);
    });
    requestAnimationFrame(animBurst);
  }());
}());

/* ════════════════════════════════════════════════════════════
   SHARED UTILITY FUNCTIONS
   Declared with `function` keyword so JS hoists them.
   window.X = X assignments at line 1 already point to these.
════════════════════════════════════════════════════════════ */

function fillMarquee(id, items) {
  var el = document.getElementById(id);
  if (!el) return;
  var html = items.map(function (t) {
    return '<div class="mq-item">' + t + '<span class="star">\u2726</span></div>';
  }).join('');
  el.innerHTML = html + html;
}

function initCounters() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el   = e.target;
      var end  = parseInt(el.dataset.count, 10);
      var v    = 0;
      var step = end / 70;
      var t = setInterval(function () {
        v = Math.min(v + step, end);
        el.textContent = Math.round(v);
        if (v >= end) clearInterval(t);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(function (el) { io.observe(el); });
}

function initTilt(sel) {
  document.querySelectorAll(sel).forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'perspective(700px) rotateX(' + (-y * 9) + 'deg) rotateY(' + (x * 9) + 'deg) translateZ(6px)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });
}

/* Placeholder — real burst overrides this in STEP 11 above */
function spawnBurst(x, y) { /* no-op until canvas initialises */ }
