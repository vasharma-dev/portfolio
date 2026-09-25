/* ===== year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== nav: scrolled state + scroll progress + mobile menu ===== */
const nav = document.getElementById('nav');
const prog = document.getElementById('scroll-progress');
const links = document.querySelector('.nav-links');
const burger = document.getElementById('burger');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ===== typed role text ===== */
const phrases = ['AI Engineer.', 'Full-Stack Developer.', 'LLM Tinkerer.', 'Agentic-System Builder.'];
const typed = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
(function type() {
  const word = phrases[pi];
  typed.textContent = word.substring(0, ci);
  if (!deleting && ci < word.length) { ci++; }
  else if (deleting && ci > 0) { ci--; }
  else if (!deleting && ci === word.length) { deleting = true; return setTimeout(type, 1600); }
  else { deleting = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, deleting ? 45 : 95);
})();

/* ===== swap in real photo if assets/profile.jpg exists (else keep the SVG avatar) ===== */
(function () {
  const av = document.getElementById('avatar');
  const probe = new Image();
  probe.onload = () => { av.style.setProperty('--img', "url('assets/profile.jpg')"); };
  probe.src = 'assets/profile.jpg';
})();

/* ===== project hover glow follows cursor ===== */
document.querySelectorAll('.project').forEach(p => {
  p.addEventListener('mousemove', e => {
    const r = p.getBoundingClientRect();
    p.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    p.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  });
});

/* ===== GSAP scroll reveals + counters ===== */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // hero reveals (immediate, staggered)
  gsap.to('.hero .reveal', { opacity: 1, y: 0, duration: .9, stagger: .12, ease: 'power3.out', delay: .2 });

  // section reveals on scroll
  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.to(el, {
      opacity: 1, y: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // animated counters
  gsap.utils.toArray('.num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; }
        });
      }
    });
  });
} else {
  // graceful fallback if CDN blocked
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  document.querySelectorAll('.num[data-target]').forEach(el => el.textContent = el.dataset.target + (el.dataset.suffix || ''));
}

/* ===== particle network canvas ===== */
const canvas = document.getElementById('net');
const ctx = canvas.getContext('2d');
let w, h, pts, mouse = { x: -999, y: -999 };
function resize() {
  w = canvas.width = innerWidth; h = canvas.height = innerHeight;
  const count = Math.min(90, Math.floor(w * h / 16000));
  pts = Array.from({ length: count }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4
  }));
}
addEventListener('resize', resize); resize();
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7);
    ctx.fillStyle = 'rgba(139,92,246,.8)'; ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * .22})`; ctx.stroke();
      }
    }
    // link to cursor
    const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
    if (dm < 180) {
      ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(139,92,246,${(1 - dm / 180) * .4})`; ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}
draw();
