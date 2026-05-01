/* ═══════════════════════════════════════════════════
   ANUP DATTA – TABLA MAESTRO | script.js
   ═══════════════════════════════════════════════════ */

'use strict';

/* ─── VIDEO DATA ─── */
const VIDEOS = [
  {
    id: 'TNSu2N0-LbA',
    title: 'Shri Anup Datta | Tabla Journey',
    featured: true
  },
  {
    id: 'tnjoVuP62Cc',
    title: 'Dhere Dhere Rela | Anup Datta | Tabla Solo | Part-1'
  },
  {
    id: '_G31HonS2Ps',
    title: 'Tabla Solo | Part-2 | Anup Datta | Farrukhabad Gharana'
  },
  {
    id: 'q9vEg9DX8Qc',
    title: 'Tabla Solo | Part-3 | Anup Datta | Farrukhabad Gharana'
  },
  {
    id: 'R3jywv1b1Pw',
    title: 'Ustad Shahid Parvez Khan | Anup Datta | Part-2'
  },
  {
    id: 'EuMv1HhUpDQ',
    title: 'Dhere Dhere Rela | Anup Datta | Tabla Solo'
  },
  {
    id: 'zkODTRebVx4',
    title: 'Ustad Shahid Parvez Khan | Anup Datta'
  },
  {
    id: '3-kJosK9KJo',
    title: 'Padmabhushan Pandit Debu Chaudhuri | Sitar | Raag-Jhinjhoti'
  }
];

/* ─── GALLERY IMAGES ─── */
const GALLERY_IMAGES = [];
(function buildGallery() {
  const skip = [35]; // adjust if any files are missing
  for (let i = 1; i <= 37; i++) {
    if (skip.includes(i)) continue;
    // variants: 12-1, 12-2, 19-1, 21-1, 28-1
    if (i === 12) {
      GALLERY_IMAGES.push({ src: `images/gallery-12.webp`,   alt: `Anup Datta – Moment ${i}` });
      GALLERY_IMAGES.push({ src: `images/gallery-12-1.webp`, alt: `Anup Datta – Moment ${i}b` });
      GALLERY_IMAGES.push({ src: `images/gallery-12-2.webp`, alt: `Anup Datta – Moment ${i}c` });
    } else if (i === 19) {
      GALLERY_IMAGES.push({ src: `images/gallery-19.webp`,   alt: `Anup Datta – Moment ${i}` });
      GALLERY_IMAGES.push({ src: `images/gallery-19-1.webp`, alt: `Anup Datta – Moment ${i}b` });
    } else if (i === 21) {
      GALLERY_IMAGES.push({ src: `images/gallery-21.webp`,   alt: `Anup Datta – Moment ${i}` });
      GALLERY_IMAGES.push({ src: `images/gallery-21-1.webp`, alt: `Anup Datta – Moment ${i}b` });
    } else if (i === 28) {
      GALLERY_IMAGES.push({ src: `images/gallery-28.webp`,   alt: `Anup Datta – Moment ${i}` });
      GALLERY_IMAGES.push({ src: `images/gallery-28-1.webp`, alt: `Anup Datta – Moment ${i}b` });
    } else {
      GALLERY_IMAGES.push({ src: `images/gallery-${i}.webp`, alt: `Anup Datta – Moment ${i}` });
    }
  }
})();

/* ─── DOM HELPERS ─── */
const qs  = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];

/* ═══════════════════════════════════════
   INIT ON DOM READY
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCustomCursor();
  initHeader();
  initMobileMenu();
  initHeroGSAP();
  buildVideoGrid();
  loadYouTubeThumbnails(); // YT Thumbnail Fallback Check
  initVideoModal();
  initFeaturedVideo();
  buildGalleryGrid();
  initLightbox();
  initRevealAnimations();
  initBannerParticles();
  initGSAPScrollAnimations();
  initNavActiveLinks();
  initMobileHeroSlide(); // Initialize Mobile Hero Slide
  initBackgroundMusic(); // Added Background Music Init
});

/* ═══════════════════════════════════════
   YOUTUBE THUMBNAIL FALLBACK FIX
═══════════════════════════════════════ */
function loadYouTubeThumbnails() {
    const thumbs = qsa('.yt-fallback-loader');
    thumbs.forEach(thumb => {
        const videoId = thumb.getAttribute('data-video');
        const img = thumb.querySelector('.yt-thumb-img');
        if(!videoId || !img) return;

        const maxres = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const hq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const mq = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        const testImg = new Image();
        testImg.onload = function() {
            if (this.width > 120) {
                img.src = maxres;
            } else {
                img.src = hq;
            }
        };
        testImg.onerror = function() {
            img.src = mq;
        };
        testImg.src = maxres;
    });
}

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════ */
function initScrollProgress() {
  const bar = qs('#scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
function initCustomCursor() {
  const dot  = qs('#cursor');
  const ring = qs('#cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function loop() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Enlarge on interactive elements
  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t.closest('a, button, [role="button"], .gallery-item, .video-card, .featured-video-thumb')) {
      ring.style.width  = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'var(--gold-light)';
    }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target;
    if (t.closest('a, button, [role="button"], .gallery-item, .video-card, .featured-video-thumb')) {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--gold)';
    }
  });
}

/* ═══════════════════════════════════════
   HEADER – SCROLL STATE
═══════════════════════════════════════ */
function initHeader() {
  const header = qs('#header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
function initMobileMenu() {
  const btn  = qs('#hamburger');
  const menu = qs('#mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });

  // Close on nav link click
  qsa('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      menu.setAttribute('aria-hidden', true);
    });
  });
}

/* ═══════════════════════════════════════
   HERO GSAP
═══════════════════════════════════════ */
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Subtle hero content parallax on scroll (Desktop mainly)
  gsap.to('#hero-content', {
    y: -60,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ═══════════════════════════════════════
   MOBILE HERO SLIDE LOGIC
═══════════════════════════════════════ */
function initMobileHeroSlide() {
    const mobileHeroCover = qs('#mobile-hero-cover');
    const heroContent = qs('#hero-content');
    const isMobile = window.innerWidth <= 992;
    
    // Only execute on mobile
    if(isMobile && mobileHeroCover && heroContent) {
        
        // This is handled entirely by CSS animation defined in style.css now!
        // You requested not to use scroll animation, so the CSS keyframes 
        // handle the 10 second loop (Video -> Phone2 -> Video) smoothly.

        // Play video manually just in case autoplay fails
        const video = document.getElementById("mobile-hero-video");
        if(video) {
            video.muted = true;
            video.play().catch(e => console.log("Auto-play prevented by browser"));
        }
    }
}


/* ═══════════════════════════════════════
   GSAP SCROLL ANIMATIONS
═══════════════════════════════════════ */
function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Section titles stagger
  qsa('.section-header').forEach(header => {
    gsap.from(header.children, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Achievement chips
  gsap.from('.achievement-chip', {
    x: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.achievements-grid',
      start: 'top 85%',
      once: true
    }
  });

  // Video cards
  gsap.from('.video-card', {
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#video-grid, #custom-video-grid',
      start: 'top 85%',
      once: true
    }
  });

  // Special-3 Cinematic Zoom (10 Sec Total: 5 In, 5 Out - Smooth Loop)
  gsap.to(".zoom-target", {
      scale: 1.08, 
      duration: 5,
      ease: "sine.inOut",
      yoyo: true, // Will reverse perfectly (5 sec out)
      repeat: -1  // Infinite loop
  });
}

/* ═══════════════════════════════════════
   REVEAL ANIMATIONS (intersection observer)
═══════════════════════════════════════ */
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  qsa('[data-reveal]').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════
   NAV ACTIVE LINKS
═══════════════════════════════════════ */
function initNavActiveLinks() {
  const sections = qsa('section[id]');
  const links    = qsa('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════
   PERFORMANCE – BUILD VIDEO GRID
═══════════════════════════════════════ */
function buildVideoGrid() {
  const grid = qs('#video-grid');
  if (!grid) return;

  const gridVideos = VIDEOS.filter(v => !v.featured);

  gridVideos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card yt-fallback-loader';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Play: ${v.title}`);
    card.dataset.videoId = v.id;
    card.dataset.video   = v.id; // Added for fallback
    card.dataset.title   = v.title;

    card.innerHTML = `
      <div class="video-thumb">
        <img
          src="" 
          class="yt-thumb-img"
          alt="${v.title}"
          loading="lazy"
        />
        <div class="play-btn" aria-hidden="true">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>
      <div class="video-card-info">
        <h4>${v.title}</h4>
      </div>
    `;

    card.addEventListener('click',   () => openVideoModal(v.id, v.title));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideoModal(v.id, v.title); } });

    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════
   FEATURED VIDEO CLICK
═══════════════════════════════════════ */
function initFeaturedVideo() {
  const thumb = qs('.featured-video-thumb');
  if (!thumb) return;
  const id    = thumb.dataset.video || thumb.dataset.videoId;
  const title = VIDEOS[0].title;

  thumb.addEventListener('click',   () => openVideoModal(id, title));
  thumb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideoModal(id, title); } });
}

/* ═══════════════════════════════════════
   VIDEO MODAL
═══════════════════════════════════════ */
function initVideoModal() {
  const modal    = qs('#video-modal');
  const backdrop = qs('#modal-backdrop');
  const closeBtn = qs('#close-modal');
  if (!modal) return;

  closeBtn.addEventListener('click', closeVideoModal);
  backdrop.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeVideoModal();
  });
}

function openVideoModal(id, title) {
  const modal   = qs('#video-modal');
  const iframe  = qs('#modal-iframe');
  const titleEl = qs('#modal-title');
  if (!modal || !iframe) return;

  // Pause Background Music when video starts
  const bgMusic = qs('#bg-music');
  if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
      bgMusic.dataset.wasPlaying = "true";
  }

  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  titleEl.textContent = title || '';
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  qs('#close-modal').focus();
}

function closeVideoModal() {
  const modal  = qs('#video-modal');
  const iframe = qs('#modal-iframe');
  if (!modal) return;
  iframe.src = '';
  modal.hidden = true;
  document.body.style.overflow = '';

  // Resume Background Music when video closes
  const bgMusic = qs('#bg-music');
  if (bgMusic && bgMusic.dataset.wasPlaying === "true") {
      bgMusic.play().catch(e => console.log("Audio playback failed:", e));
  }
}

/* ═══════════════════════════════════════
   GALLERY – BUILD MASONRY GRID
═══════════════════════════════════════ */
function buildGalleryGrid() {
  const grid = qs('#gallery-grid');
  if (!grid) return;

  GALLERY_IMAGES.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item' + (i === 0 || i === 7 ? ' large' : '');
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View photo: ${img.alt}`);
    item.dataset.index = i;

    item.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" loading="lazy" />
      <div class="gallery-item-overlay" aria-hidden="true">
        <i class="fa-solid fa-expand"></i>
      </div>
    `;

    item.addEventListener('click',   () => openLightbox(i));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });

    grid.appendChild(item);
  });
}

/* ═══════════════════════════════════════
   LIGHTBOX & TOUCH SWIPE
═══════════════════════════════════════ */
let currentLightboxIndex = 0;

function initLightbox() {
  const lb       = qs('#lightbox');
  const backdrop = qs('#lightbox-backdrop');
  const prevBtn  = qs('#lightbox-prev');
  const nextBtn  = qs('#lightbox-next');
  const closeBtn = qs('#lightbox-close');
  if (!lb) return;

  backdrop.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
  });

  // Touch Swipe Integration
  let touchstartX = 0;
  let touchendX = 0;
  lb.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lb.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      if (touchendX < touchstartX - 50) navigateLightbox(1); // Swipe left
      if (touchendX > touchstartX + 50) navigateLightbox(-1); // Swipe right
  }, { passive: true });
}

function openLightbox(index) {
  const lb   = qs('#lightbox');
  const img  = qs('#lightbox-img');
  const cap  = qs('#lightbox-caption');
  if (!lb) return;

  currentLightboxIndex = index;
  const item = GALLERY_IMAGES[index];
  img.src = item.src;
  img.alt = item.alt;
  cap.textContent = item.alt;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  qs('#lightbox-close').focus();
}

function closeLightbox() {
  const lb  = qs('#lightbox');
  const img = qs('#lightbox-img');
  if (!lb) return;
  img.src = '';
  lb.hidden = true;
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  const item = GALLERY_IMAGES[currentLightboxIndex];
  const img  = qs('#lightbox-img');
  const cap  = qs('#lightbox-caption');
  img.src = item.src;
  img.alt = item.alt;
  cap.textContent = item.alt;
}

/* ═══════════════════════════════════════
   BANNER PARTICLES
═══════════════════════════════════════ */
function initBannerParticles() {
  const container = qs('#banner-particles');
  if (!container) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = Math.random() * 30 + 5 + '%';
    p.style.setProperty('--dur',   (4 + Math.random() * 6) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.width  = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL for anchor links
═══════════════════════════════════════ */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = qs(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const offset = 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
});

/* ═══════════════════════════════════════
   BACKGROUND MUSIC SCRIPT
═══════════════════════════════════════ */
function initBackgroundMusic() {
  const bgMusic = document.getElementById('bg-music');
  if (!bgMusic) return;
  
  bgMusic.volume = 0.5; // Medium Volume
  
  const playAudio = () => {
    bgMusic.play().catch(e => console.log("Audio playback requires user interaction first."));
  };

  // Attempt to play automatically
  let playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser blocks autoplay, wait for the first click/scroll
      document.addEventListener('click', playAudio, { once: true });
      document.addEventListener('scroll', playAudio, { once: true });
      document.addEventListener('touchstart', playAudio, { once: true });
    });
  }
}