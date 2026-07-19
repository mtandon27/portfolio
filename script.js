/* ============================================
   MANVI TANDON — Portfolio
   ============================================ */

/* ---- Theme: apply saved preference immediately ---- */
(function () {
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
})();

/* ---- Data ---- */
const WORK = [
  { href: 'beatdrop.html', img: 'assets/beatdropcover.png', year: '2025', title: 'BeatDrop', tag: 'Amazon Music Challenge Winner', desc: 'Collaborative AI music mixing feature for Amazon Music, reimagining how listeners create playlists together.' },
  { href: 'jbfc.html', img: 'assets/montagelight.gif', imgDark: 'assets/montagedark.gif', year: '2025', title: 'Montage', tag: 'Design System', desc: 'An accessible design system built for the Jacob Burns Film Center.' },
  { href: 'buckets.html', img: 'assets/bucketslight.gif', imgDark: 'assets/bucketsdark.gif', year: '2025', title: 'Buckets', tag: 'Product Design', desc: 'A friendship building app based on shared bucket list experiences.' },
  { href: 'keralamuseum.html', img: 'assets/keralamuseumcover.png', year: '2025', title: 'Kerala Art Museum', tag: 'UX Research', desc: 'Community focused mobile design for the Kerala Art Museum.' },
  { href: 'dsdelights.html', img: 'assets/dsdelightscover.png', year: '2024', title: "D's Delights", tag: 'Brand & Web Design', desc: 'Brand identity and website for D\u2019s Delights jewelry brand.' },
  { href: 'mathworks.html', img: 'assets/mathworkscover.png', year: '2022–24', title: 'MathWorks', tag: 'Enterprise UX', desc: 'System-modeling engineering software for Simulink.' }
];

const ARCHIVE = [
  { num: '01', href: 'chatgpt-adhd.html', target: '_self', img: 'chatgpt/chatgptcover.gif', tag: 'UX Research', year: '2024', title: 'ChatGPT for ADHD', desc: 'Exploring how AI assistants can support neurodivergent users through more intentional interactions.' },
  { num: '02', href: 'sva.html', target: '_self', img: 'assets/sva.gif', tag: 'UX Research', year: '2023', title: "Why Don't Students Scroll?", desc: 'An eye-tracking study revealing how students actually navigate a university library website.' },
  { num: '03', href: 'focusforward.html', target: '_self', img: 'assets/FFP.gif', tag: 'Service Design', year: '2023', title: 'Focus Forward Project', desc: 'Service design for a New York City nonprofit supporting individuals facing federal charges.' },
  { num: '04', href: 'traderjoes.html', target: '_self', img: 'assets/traderjoescover.png', tag: 'App Concept', year: '2022', title: "Trader Joe's App", desc: "Imagining a mobile app experience for Trader Joe's grocery shoppers." },
  { num: '05', href: 'spicelife.html', target: '_self', img: 'spicelife/spicelife.gif', tag: 'Illustration', year: '2022', title: 'Spice Life', desc: 'An illustrated cookbook celebrating the flavors and stories of South Asian cuisine.' },
  { num: '06', href: 'https://mtandon27.github.io/plantparent/index.html', target: '_blank', img: 'assets/plantparent.gif', tag: 'Coding', year: '2021', title: 'Plant Parent', desc: 'A plant-care tracker helping new and existing plant owners track their plants growth.' }
];

const VECTOR_POOL = [
  'vectors/vector1.png', 'vectors/vector3.png', 'vectors/vector6.png',
  'vectors/vector7.png', 'vectors/vector9.png', 'vectors/vector10.png', 'vectors/vector11.png'
];

const SKILLS = ['Product Design', 'UX Research', 'Illustration', 'Design Systems', 'Branding'];

/* ---- Render: work grid ---- */
(function renderWork() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  grid.innerHTML = WORK.map(p => `
    <a href="${p.href}" class="work-card reveal">
      <div class="work-card__img img-swap">${p.imgDark
        ? `<img class="is-light" loading="lazy" decoding="async" src="${p.img}" alt="${p.title}" /><img class="is-dark" loading="lazy" decoding="async" src="${p.imgDark}" alt="${p.title}" />`
        : `<img loading="lazy" decoding="async" src="${p.img}" alt="${p.title}" />`}</div>
      <div class="work-card__meta">
        <span class="work-card__title">${p.title} <span class="work-card__arrow">↗</span></span>
        <span class="work-card__year">${p.year}</span>
      </div>
      <span class="work-card__tag">${p.tag}</span>
      <p class="work-card__desc">${p.desc}</p>
    </a>`).join('');
})();

/* ---- Render: marquee band ---- */
(function renderBand() {
  const track = document.getElementById('bandTrack');
  if (!track) return;
  const items = [...SKILLS, ...SKILLS, ...SKILLS];
  track.innerHTML = items.map(s => `<span>${s} <span class="star">✳</span></span>`).join('');
})();

/* ---- Render: archive rows ---- */
(function renderArchive() {
  const list = document.getElementById('archiveList');
  if (!list) return;
  list.innerHTML = ARCHIVE.map(a => `
    <a href="${a.href}" target="${a.target}" class="arch-row" data-cover="${a.img}">
      <div class="arch-row__top">
        <span class="arch-row__num">${a.num}</span>
        <span class="arch-row__title">${a.title}</span>
        <span class="arch-row__year">${a.year}</span>
        <span class="arch-row__arrow">↗</span>
      </div>
      <div class="arch-panel">
        <div class="arch-panel__inner">
          <div class="arch-panel__img"><img loading="lazy" decoding="async" src="${a.img}" alt="${a.title}" /></div>
          <div>
            <span class="arch-tag">${a.tag}</span>
            <p class="arch-panel__desc">${a.desc}</p>
          </div>
        </div>
      </div>
    </a>`).join('');

  // Touch / mobile: tap to expand (first tap opens, second follows link)
  const isTouch = window.matchMedia('(hover:none)').matches;
  if (isTouch) {
    list.querySelectorAll('.arch-row').forEach(row => {
      row.addEventListener('click', e => {
        if (!row.classList.contains('open')) {
          e.preventDefault();
          list.querySelectorAll('.arch-row.open').forEach(r => { if (r !== row) r.classList.remove('open'); });
          row.classList.add('open');
        }
      });
    });
  }
})();

/* ---- Theme toggle ---- */
(function themeSetup() {
  const btn = document.getElementById('themeToggle');
  const sun = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');
  const logo = document.getElementById('logoFig');

  function sync() {
    const dark = document.body.classList.contains('dark');
    if (sun) sun.style.display = dark ? 'none' : 'block';
    if (moon) moon.style.display = dark ? 'block' : 'none';
    // legacy case-study pages use .icon-sun / .icon-moon (CSS handles display)
    if (logo) logo.src = dark ? 'assets/body6.svg' : 'assets/body6.svg';
    document.querySelectorAll('.photo, .walker').forEach(el => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (!img) return;
      const src = dark ? el.getAttribute('data-dark') : el.getAttribute('data-light');
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
  }
  // theme toggle may exist on both homepage (#themeToggle) and case pages
  if (btn) btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    sync();
  });
  sync();
})();

/* ---- Logo hover swap ---- */
(function logoHover() {
  // homepage (#logoFig / .nav__logo) and case pages (.nav-logo-fig / .nav-logo)
  const logo = document.getElementById('logoFig') || document.querySelector('.nav-logo-fig img');
  const wrap = logo && logo.closest('.nav__logo, .nav-logo');
  if (!logo || !wrap) return;
  wrap.addEventListener('mouseenter', () => { logo.src = 'assets/body3.svg'; });
  wrap.addEventListener('mouseleave', () => { logo.src = 'assets/body6.svg'; });
})();

/* ---- Mobile menu ---- */
(function menuSetup() {
  const menu = document.getElementById('menu');
  const open = document.getElementById('hamburger');
  const close = document.getElementById('menuClose');
  if (!menu) return;
  const setOpen = state => {
    menu.classList.toggle('open', state);
    document.body.classList.toggle('menu-open', state);
  };
  if (open) open.addEventListener('click', () => setOpen(true));
  if (close) close.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('[data-menu-link]').forEach(a => a.addEventListener('click', () => setOpen(false)));
})();

/* ---- Contact modal ---- */
(function contactSetup() {
  const modal = document.getElementById('contact');
  if (!modal) return;
  const setOpen = state => {
    modal.classList.toggle('open', state);
    document.body.classList.toggle('menu-open', state);
    if (state) { const i = modal.querySelector('input'); setTimeout(() => i && i.focus(), 120); }
  };
  document.querySelectorAll('[data-open-contact]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); document.getElementById('menu')?.classList.remove('open'); setOpen(true); }));
  modal.querySelectorAll('[data-close-contact]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); setOpen(false); }));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value || '', email = form.email.value || '', msg = form.message.value || '';
    const body = `From: ${name} (${email})\r\n\r\n${msg}`;
    window.location.href = `mailto:mtandon@pratt.edu?subject=${encodeURIComponent('Portfolio inquiry from ' + name)}&body=${encodeURIComponent(body)}`;
    form.reset();
    setTimeout(() => setOpen(false), 200);
  });
})();

/* ---- Scroll reveal ---- */
(function revealSetup() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const walk = document.getElementById('footerWalk');
  if (walk) {
    const wio = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (en.isIntersecting) {
          walk.querySelectorAll('.walker').forEach((w, i) => setTimeout(() => walk.classList.add('in'), i * 90));
          wio.disconnect();
        }
      });
    }, { threshold: 0.25 });
    wio.observe(walk);
  }
})();

/* ---- Scroll progress bar ---- */
(function progressSetup() {
  const bar = document.getElementById('progress');
  if (!bar) return;
  const onScroll = () => {
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Hero collage: glide on hover + drag ---- */
(function collageSetup() {
  const col = document.getElementById('collage');
  if (!col) return;
  const imgs = Array.from(col.querySelectorAll('.photo'));
  imgs.forEach(im => { im.dataset.mx = '0'; im.dataset.my = '0'; });
  let drag = null;

  const apply = (im, px, py) => {
    const mx = parseFloat(im.dataset.mx) || 0, my = parseFloat(im.dataset.my) || 0;
    im.style.transform = `translate(${(mx + px).toFixed(1)}px,${(my + py).toFixed(1)}px)`;
  };

  col.addEventListener('mousemove', e => {
    if (drag) return;
    const r = col.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    imgs.forEach(im => { const d = parseFloat(im.getAttribute('data-depth')) || 1; apply(im, nx * d * 30, ny * d * 30); });
  });
  col.addEventListener('mouseleave', () => { if (!drag) imgs.forEach(im => apply(im, 0, 0)); });

  imgs.forEach(im => {
    im.addEventListener('pointerdown', e => {
      e.preventDefault();
      drag = { im, sx: e.clientX, sy: e.clientY };
      im.style.transition = 'none';
      im.style.zIndex = '30';
      try { im.setPointerCapture(e.pointerId); } catch (_) {}
    });
    im.addEventListener('pointermove', e => {
      if (!drag || drag.im !== im) return;
      const mx = (parseFloat(im.dataset.mx) || 0) + (e.clientX - drag.sx);
      const my = (parseFloat(im.dataset.my) || 0) + (e.clientY - drag.sy);
      im.style.transform = `translate(${mx.toFixed(1)}px,${my.toFixed(1)}px)`;
    });
    const end = e => {
      if (!drag || drag.im !== im) return;
      im.dataset.mx = ((parseFloat(im.dataset.mx) || 0) + (e.clientX - drag.sx)).toFixed(1);
      im.dataset.my = ((parseFloat(im.dataset.my) || 0) + (e.clientY - drag.sy)).toFixed(1);
      im.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
      drag = null;
    };
    im.addEventListener('pointerup', end);
    im.addEventListener('pointercancel', end);
  });
})();

/* ---- Hero watercolor cursor trail ---- */
(function paintTrail() {
  const canvas = document.getElementById('heroPaint');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const blobs = [];
  let lastX = null, lastY = null;

  const palettes = {
    light: ['#9e1b3d', '#c8506e', '#d98b6a', '#e7b7c2', '#b23a58'],
    dark:  ['#8ea0ff', '#a9b6ff', '#6f83f0', '#c5cdff', '#7d92f5']
  };
  const pick = () => {
    const dark = document.body.classList.contains('dark');
    const p = palettes[dark ? 'dark' : 'light'];
    return p[Math.floor(Math.random() * p.length)];
  };

  function size() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener('resize', size);

  function add(cx, cy) {
    const r = canvas.getBoundingClientRect();
    const x = cx - r.left, y = cy - r.top;
    if (lastX !== null) { const d = Math.hypot(x - lastX, y - lastY); if (d < 14) return; }
    lastX = x; lastY = y;
    const n = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      blobs.push({
        x: x + (Math.random() * 2 - 1) * 18,
        y: y + (Math.random() * 2 - 1) * 18,
        r: 22 + Math.random() * 34,
        life: 1,
        decay: 0.010 + Math.random() * 0.010,
        color: pick()
      });
    }
    if (blobs.length > 140) blobs.splice(0, blobs.length - 140);
  }
  hero.addEventListener('mousemove', e => add(e.clientX, e.clientY));

  function loop() {
    ctx.clearRect(0, 0, W, H);
    ctx.filter = 'blur(16px)';
    ctx.globalCompositeOperation = document.body.classList.contains('dark') ? 'lighter' : 'multiply';
    for (const b of blobs) {
      b.life -= b.decay;
      if (b.life <= 0) continue;
      ctx.globalAlpha = Math.max(0, b.life) * 0.16;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r * (0.6 + (1 - b.life) * 0.6), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1; ctx.filter = 'none'; ctx.globalCompositeOperation = 'source-over';
    for (let i = blobs.length - 1; i >= 0; i--) if (blobs[i].life <= 0) blobs.splice(i, 1);
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---- Archive sneak-peek preview ---- */
(function archivePeek() {
  const peek = document.getElementById('archivePeek');
  const img = document.getElementById('archivePeekImg');
  const list = document.getElementById('archiveList');
  if (!peek || !img || !list) return;
  if (window.matchMedia('(hover:none)').matches) return;
  let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;

  const move = e => {
    tx = e.clientX + 26; ty = e.clientY - 20;
    if (!raf) raf = requestAnimationFrame(follow);
  };
  function follow() {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    peek.style.left = cx + 'px'; peek.style.top = cy + 'px';
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(follow);
    else raf = null;
  }

  list.querySelectorAll('.arch-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      const src = row.getAttribute('data-cover');
      if (src) { img.src = src; peek.classList.add('show'); }
    });
    row.addEventListener('mousemove', move);
    row.addEventListener('mouseleave', () => peek.classList.remove('show'));
  });
})();
(function vectorShuffle() {
  const grid = document.getElementById('vecgrid');
  if (!grid) return;
  grid.addEventListener('mouseenter', () => {
    const shuffled = [...VECTOR_POOL].sort(() => Math.random() - 0.5);
    const items = Array.from(grid.children);
    const order = items.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    items.forEach((it, i) => {
      it.style.transition = 'transform .45s cubic-bezier(.45,0,.55,1),opacity .45s cubic-bezier(.45,0,.55,1)';
      it.style.order = order[i];
      it.style.transform = 'scale(.9)';
      it.style.opacity = '0';
      setTimeout(() => {
        it.style.transition = 'transform .65s cubic-bezier(.22,1,.36,1),opacity .55s ease-out';
        it.setAttribute('src', shuffled[i % shuffled.length]);
        it.style.transform = '';
        it.style.opacity = '1';
      }, 420);
    });
  });
})();
