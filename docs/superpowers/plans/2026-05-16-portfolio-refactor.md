# Portfolio Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor single-file portfolio into index.html + style.css + main.js with chromatic aberration hero, project cards, experience timeline, depth-bar tech stack, sticky nav, light/dark mode, CTA, and full accessibility.

**Architecture:** CSS extracted to style.css (all existing + new styles), JS logic to main.js (i18n + chromatic aberration + sticky nav + theme toggle), OGL prism stays as inline `<script type="module">` in index.html because it uses an esm.sh import. Sections reordered: Hero → Projects → Experience → Tech → Education → CTA → Footer.

**Tech Stack:** Vanilla JS, CSS custom properties, IntersectionObserver, CSS @keyframes, localStorage.

---

### Task 1: Create style.css

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create style.css with complete styles**

Write the file at `style.css`:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── CUSTOM PROPERTIES ── */
:root {
  --bg-base:       #0A0E1A;
  --bg-surface:    #111827;
  --bg-card:       #1C2333;
  --accent-cyan:   #00F5C4;
  --accent-indigo: #5E5AFF;
  --accent-pink:   #FF2D78;
  --text-primary:  #E8EEF4;
  --text-muted:    #AABCCE;
  --border-color:  rgba(255, 255, 255, 0.08);
}

[data-theme="light"] {
  --bg-base:      #f0f4f8;
  --bg-surface:   #e2e8f0;
  --bg-card:      #ffffff;
  --text-primary: #0f172a;
  --text-muted:   #475569;
  --border-color: rgba(0, 0, 0, 0.10);
}

* { transition: background-color 250ms, color 250ms; }

html { font-size: 16px; scroll-behavior: smooth; }

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  min-height: 100vh;
}

#prism-bg canvas { opacity: 0.18; }

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

/* ── FOCUS ── */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

/* ── STICKY NAV ── */
.site-nav {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  background: rgba(10, 14, 26, 0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
}

.site-nav.visible { display: flex; }

@media (max-width: 767px) { .site-nav { display: none !important; } }

[data-theme="light"] .site-nav { background: rgba(240, 244, 248, 0.85); }

.site-nav-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.site-nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.site-nav-links a {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  transition: color 0.2s;
}

.site-nav-links a:hover { color: var(--text-primary); }

/* ── CONTROLS ── */
.controls {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-switcher {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 99px;
  overflow: hidden;
  background: var(--bg-surface);
}

.lang-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.lang-btn:hover:not(.active) { color: var(--text-primary); }

.theme-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 99px;
  color: var(--text-muted);
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: color 0.2s, background 0.2s;
}

.theme-btn:hover { color: var(--text-primary); }

/* ── LAYOUT ── */
.wrap {
  position: relative;
  z-index: 1;
  max-width: 660px;
  margin: 0 auto;
  padding: 5rem 2rem 4rem;
}

/* ── HERO ── */
.header {
  margin-bottom: 4.5rem;
}

.name-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 0.4rem;
  cursor: default;
}

.header-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  position: relative;
  z-index: 2;
  color: white;
}

.name-clone {
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  mix-blend-mode: screen;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.name-red  { color: #ff3333; }
.name-blue { color: #3399ff; }

@keyframes chroma-red {
  0%   { transform: translate(0, 0);     opacity: 0; }
  15%  { opacity: 0.75; }
  50%  { transform: translate(-5px, 1px); opacity: 0.75; }
  85%  { opacity: 0.75; }
  100% { transform: translate(0, 0);     opacity: 0; }
}

@keyframes chroma-blue {
  0%   { transform: translate(0, 0);    opacity: 0; }
  15%  { opacity: 0.75; }
  50%  { transform: translate(6px, -1px); opacity: 0.75; }
  85%  { opacity: 0.75; }
  100% { transform: translate(0, 0);    opacity: 0; }
}

.chroma-active .name-red  { animation: chroma-red  600ms ease forwards; }
.chroma-active .name-blue { animation: chroma-blue 600ms ease forwards; }

.header-role {
  font-size: 0.88rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.header-bio {
  font-size: 1rem;
  color: rgba(232, 238, 244, 0.82);
  line-height: 1.75;
  max-width: 480px;
  border-left: 2px solid rgba(0, 245, 196, 0.4);
  padding-left: 1.1rem;
}

.header-bio:empty { display: none; }

.links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1.75rem;
}

.links a {
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: border-color 0.2s, color 0.2s;
  font-family: 'JetBrains Mono', monospace;
}

.links a:hover { border-bottom-color: rgba(255, 255, 255, 0.2); }

/* ── SECTIONS ── */
section { margin-bottom: 4rem; }

.section-label {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-indigo);
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(94, 90, 255, 0.4), transparent);
}

/* ── PROJECT CARDS ── */
.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
}

.project-card:last-child { margin-bottom: 0; }
.project-card.accent-cyan   { border-left: 3px solid var(--accent-cyan); }
.project-card.accent-indigo { border-left: 3px solid var(--accent-indigo); }

.project-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.project-name a { color: var(--accent-cyan); text-decoration: none; }
.project-name a:hover { color: #7ffce0; }

.project-context {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.65rem;
  font-family: 'JetBrains Mono', monospace;
}

.project-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.65rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 245, 196, 0.08);
  border: 1px solid rgba(0, 245, 196, 0.25);
  color: var(--accent-cyan);
  padding: 0.15rem 0.6rem;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 500;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.02em;
}

.project-desc {
  font-size: 0.93rem;
  color: rgba(232, 238, 244, 0.82);
  line-height: 1.75;
  margin-bottom: 0.75rem;
}

/* ── EXPERIENCE TIMELINE ── */
.concurrent-label {
  display: inline-block;
  background: rgba(94, 90, 255, 0.12);
  border: 1px solid rgba(94, 90, 255, 0.3);
  color: var(--accent-indigo);
  font-size: 0.65rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.55rem;
  border-radius: 99px;
  margin-bottom: 1rem;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.15);
}

.timeline-item {
  position: relative;
  margin-bottom: 2.25rem;
  padding-bottom: 2.25rem;
  border-bottom: 1px dashed var(--border-color);
}

.timeline-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.87rem;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  border: 2px solid var(--bg-base);
  box-shadow: 0 0 0 1px var(--accent-cyan);
}

.timeline-item-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.15rem;
}

.item-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
}

.item-period {
  font-size: 0.78rem;
  color: var(--text-muted);
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
}

.item-company {
  font-size: 0.83rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.item-bullets { list-style: none; padding: 0; margin: 0.2rem 0 0; }

.item-bullets li {
  font-size: 0.93rem;
  color: rgba(232, 238, 244, 0.82);
  line-height: 1.75;
  padding: 0.2rem 0 0.2rem 1.1rem;
  position: relative;
}

.item-bullets li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: rgba(0, 245, 196, 0.5);
}

/* ── TECH STACK ── */
.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 2.5rem;
}

@media (max-width: 600px) { .tech-grid { grid-template-columns: 1fr; } }

.tech-category { margin-bottom: 1.75rem; }

.tech-cat-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent-indigo);
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 0.65rem;
}

.skill-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 0.83rem;
  color: var(--text-primary);
  min-width: 90px;
  flex-shrink: 0;
}

.depth-track {
  flex: 1;
  height: 3px;
  background: var(--border-color);
  border-radius: 99px;
  overflow: hidden;
}

.depth-bar {
  height: 100%;
  background: var(--accent-cyan);
  border-radius: 99px;
  opacity: 0.65;
}

.depth-daily      { width: 100%; }
.depth-proficient { width: 66%; }
.depth-learning   { width: 33%; }

/* ── SHARED TAGS ── */
.item-stack {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background: rgba(94, 90, 255, 0.10);
  border: 1px solid rgba(94, 90, 255, 0.25);
  color: var(--text-muted);
  padding: 0.15rem 0.55rem;
  border-radius: 99px;
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  font-family: 'JetBrains Mono', monospace;
}

/* ── EDUCATION ── */
.edu-item { margin-bottom: 1.4rem; }

.edu-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.edu-sub { font-size: 0.82rem; color: var(--text-muted); }

/* ── CTA ── */
.cta-section {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.cta-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.cta-subtext {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.75rem;
}

.cta-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.65rem 1.4rem;
  border-radius: 6px;
  transition: opacity 0.2s, transform 0.15s;
  display: inline-block;
}

.btn-primary {
  background: var(--accent-cyan);
  color: #0A0E1A;
  font-weight: 600;
}

.btn-secondary {
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

/* ── FOOTER ── */
.footer {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer a { color: var(--text-muted); text-decoration: none; }
.footer a:hover { color: var(--text-primary); }

/* ── ANIMATIONS ── */
@keyframes rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.header                { animation: rise 0.6s ease both 0s; }
section:nth-of-type(1) { animation: rise 0.6s ease both 0.10s; }
section:nth-of-type(2) { animation: rise 0.6s ease both 0.18s; }
section:nth-of-type(3) { animation: rise 0.6s ease both 0.26s; }
section:nth-of-type(4) { animation: rise 0.6s ease both 0.34s; }
section:nth-of-type(5) { animation: rise 0.6s ease both 0.42s; }
.cta-section           { animation: rise 0.6s ease both 0.50s; }
.footer                { animation: rise 0.6s ease both 0.58s; }

.wrap { transition: opacity 0.18s ease; }
.wrap.switching { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .name-red, .name-blue { display: none; }
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit --author="juanpe44 <juanpe44@users.noreply.github.com>" -m "feat: add style.css with full design system, animations, and new component styles"
```

---

### Task 2: Create main.js

**Files:**
- Create: `main.js`

- [ ] **Step 1: Create main.js**

Write the file at `main.js`:

```javascript
const t = {
  en: {
    bio: '',
    email: 'Email',
    labelProjects: 'Projects',
    labelExperience: 'Experience',
    labelTech: 'Technologies',
    labelEducation: 'Education',
    job1Title: 'Software Developer',
    job1Period: 'Sept 2025 – Present',
    job1Mode: 'Hybrid',
    job1Bullets: [
      'Led website development using Astro and React, designing a scalable and performance-optimized architecture.',
      'Implemented 3D visual experiences and advanced animations with Three.js, Spline and GSAP, applying lazy loading and resource optimization strategies.',
      'Collaborated on UX/UI decisions ensuring visual and technical consistency between design and development.',
      'Maintained direct communication and frequent meetings with clients, participating in product decisions and clearly conveying technical progress.',
      'Developed an internal reusable UI component library with React and React Native, documented with Storybook and distributed as a private package via GitHub Packages.',
    ],
    job2Title: 'Frontend Developer',
    job2Period: 'Jul 2025 – Present',
    job2Mode: 'Remote',
    job2Bullets: [
      'Participated in Scrum teams developing and implementing web interfaces with Next.js and Material UI.',
      'Built reusable components based on team specifications and feedback.',
      'Developed scalable views, optimized performance, and ensured responsive and accessible layouts.',
    ],
    proj1Context: 'Solo project · Active',
    proj1Desc: 'Collaborative platform for university students to search, share and manage academic resources. Currently scaling to support multiple universities.',
    proj2Context: 'ETHGlobal Hackathon · Buenos Aires',
    proj2Desc: 'Open knowledge protocol storing modular content on IPFS/Filecoin with on-chain metadata. I contributed to the idea and built the reference frontend — a Next.js app that reads modules and tracks directly from the protocol with no backend. Competed against teams from around the world at ETHGlobal Buenos Aires.',
    catLang: 'Languages',
    cat3d: '3D & Motion',
    catTools: 'Tools',
    concurrentLabel: '2 simultaneous roles',
    ctaHeading: "Let's build something.",
    ctaSubtext: 'Open to full-time roles and freelance projects.',
    ctaEmail: 'Send an email',
    ctaGithub: 'View GitHub',
    navProjects: 'Projects',
    navExperience: 'Experience',
    navStack: 'Stack',
    navContact: 'Contact',
    edu1Title: 'Systems Engineering',
    edu2Title: 'Technical Degree in Computer Programming',
    presentLabel: 'Present',
    themeLightLabel: 'Switch to light mode',
    themeDarkLabel: 'Switch to dark mode',
  },
  es: {
    bio: '',
    email: 'Email',
    labelProjects: 'Proyectos',
    labelExperience: 'Experiencia',
    labelTech: 'Tecnologías',
    labelEducation: 'Educación',
    job1Title: 'Desarrollador de Software',
    job1Period: 'Sept 2025 – Presente',
    job1Mode: 'Híbrido',
    job1Bullets: [
      'Lideré el desarrollo del sitio web utilizando Astro y React, diseñando una arquitectura escalable y optimizada para performance.',
      'Implementé experiencias visuales 3D y animaciones avanzadas con Three.js, Spline y GSAP, aplicando estrategias de carga diferida y optimización de recursos.',
      'Colaboré en decisiones de UX/UI asegurando coherencia visual y técnica entre diseño y desarrollo.',
      'Mantuve comunicación directa y reuniones frecuentes con clientes, participando en decisiones de producto y transmitiendo avances técnicos de forma clara.',
      'Desarrollé una librería interna de componentes UI reutilizables con React y React Native, documentada con Storybook y distribuida como paquete privado a través de GitHub Packages.',
    ],
    job2Title: 'Desarrollador Frontend',
    job2Period: 'Jul 2025 – Presente',
    job2Mode: 'Remoto',
    job2Bullets: [
      'Participé en equipos Scrum desarrollando e implementando interfaces web con Next.js y Material UI.',
      'Creé componentes reutilizables según especificaciones y feedback del equipo.',
      'Construí vistas escalables, optimicé rendimiento y aseguré maquetación responsive y accesible.',
    ],
    proj1Context: 'Proyecto personal · Activo',
    proj1Desc: 'Plataforma colaborativa para estudiantes universitarios para buscar, compartir y gestionar recursos académicos. Actualmente escalando para soportar múltiples universidades.',
    proj2Context: 'Hackathon ETHGlobal · Buenos Aires',
    proj2Desc: 'Protocolo abierto de conocimiento que almacena contenido modular en IPFS/Filecoin con metadata on-chain. Participé en la idea y desarrollé el frontend de referencia — una app en Next.js que lee módulos y tracks directamente del protocolo sin backend. Competí contra equipos de todo el mundo en ETHGlobal Buenos Aires.',
    catLang: 'Lenguajes',
    cat3d: '3D & Animación',
    catTools: 'Herramientas',
    concurrentLabel: '2 roles simultáneos',
    ctaHeading: 'Construyamos algo.',
    ctaSubtext: 'Abierto a roles full-time y proyectos freelance.',
    ctaEmail: 'Enviar un email',
    ctaGithub: 'Ver GitHub',
    navProjects: 'Proyectos',
    navExperience: 'Experiencia',
    navStack: 'Stack',
    navContact: 'Contacto',
    edu1Title: 'Ingeniería de Sistemas',
    edu2Title: 'Técnico en Programación',
    presentLabel: 'Presente',
    themeLightLabel: 'Cambiar a modo claro',
    themeDarkLabel: 'Cambiar a modo oscuro',
  }
};

let current = 'en';

function setBullets(id, items) {
  const ul = document.getElementById(id);
  if (!ul) return;
  ul.innerHTML = items.map(i => `<li>${i}</li>`).join('');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setLang(lang) {
  if (lang === current) return;
  current = lang;
  const wrap = document.getElementById('wrap');
  wrap.classList.add('switching');
  setTimeout(() => {
    applyLang(lang);
    wrap.classList.remove('switching');
  }, 180);
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
}

function applyLang(lang) {
  const d = t[lang];
  setText('bio', d.bio);
  setText('link-email', d.email);
  setText('label-projects', d.labelProjects);
  setText('label-experience', d.labelExperience);
  setText('label-tech', d.labelTech);
  setText('label-education', d.labelEducation);
  setText('job1-title', d.job1Title);
  setText('job1-period', d.job1Period);
  setText('job1-mode', d.job1Mode);
  setBullets('job1-bullets', d.job1Bullets);
  setText('job2-title', d.job2Title);
  setText('job2-period', d.job2Period);
  setText('job2-mode', d.job2Mode);
  setBullets('job2-bullets', d.job2Bullets);
  setText('proj1-context', d.proj1Context);
  setText('proj1-desc', d.proj1Desc);
  setText('proj2-context', d.proj2Context);
  setText('proj2-desc', d.proj2Desc);
  setText('cat-lang', d.catLang);
  setText('cat-3d', d.cat3d);
  setText('cat-tools', d.catTools);
  setText('concurrent-label', d.concurrentLabel);
  setText('cta-heading', d.ctaHeading);
  setText('cta-subtext', d.ctaSubtext);
  setText('cta-email', d.ctaEmail);
  setText('cta-github', d.ctaGithub);
  setText('nav-projects', d.navProjects);
  setText('nav-experience', d.navExperience);
  setText('nav-stack', d.navStack);
  setText('nav-contact', d.navContact);
  setText('edu1-title', d.edu1Title);
  setText('edu2-title', d.edu2Title);
  setText('present-label', d.presentLabel);
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    themeBtn.setAttribute('aria-label', isDark ? d.themeLightLabel : d.themeDarkLabel);
  }
}

applyLang('en');

// ── THEME TOGGLE ──
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const saved = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);
  btn.textContent = saved === 'dark' ? '☀' : '☾';

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '☀' : '☾';
    const d = t[current];
    btn.setAttribute('aria-label', next === 'dark' ? d.themeLightLabel : d.themeDarkLabel);
  });
})();

// ── STICKY NAV ──
(function () {
  const nav = document.querySelector('.site-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;
  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('visible', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
})();

// ── CHROMATIC ABERRATION ──
(function () {
  const wrapper = document.getElementById('name-wrapper');
  if (!wrapper) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cooldown = false;

  function trigger() {
    if (cooldown || reducedMotion.matches) return;
    cooldown = true;
    wrapper.classList.add('chroma-active');
    setTimeout(() => {
      wrapper.classList.remove('chroma-active');
      setTimeout(() => { cooldown = false; }, 300);
    }, 600);
  }

  wrapper.addEventListener('mouseenter', trigger);

  if (window.matchMedia('(hover: none)').matches) {
    setTimeout(trigger, 800);
    wrapper.addEventListener('click', trigger);
  }
})();
```

- [ ] **Step 2: Commit**

```bash
git add main.js
git commit --author="juanpe44 <juanpe44@users.noreply.github.com>" -m "feat: add main.js with i18n, theme toggle, sticky nav, and chromatic aberration"
```

---

### Task 3: Rewrite index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace index.html with new markup**

Replace the entire file with:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Juan Peñalba</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- PRISM BACKGROUND -->
  <div id="prism-bg" style="position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;"></div>

  <!-- STICKY NAV -->
  <nav class="site-nav" aria-label="Site navigation">
    <span class="site-nav-name">Juan Peñalba</span>
    <ul class="site-nav-links">
      <li><a href="#projects" id="nav-projects"></a></li>
      <li><a href="#experience" id="nav-experience"></a></li>
      <li><a href="#stack" id="nav-stack"></a></li>
      <li><a href="#contact" id="nav-contact"></a></li>
    </ul>
  </nav>

  <!-- CONTROLS -->
  <div class="controls">
    <button id="theme-btn" class="theme-btn" aria-label="Switch to light mode">☀</button>
    <div class="lang-switcher">
      <button class="lang-btn active" id="btn-en" onclick="setLang('en')">EN</button>
      <button class="lang-btn" id="btn-es" onclick="setLang('es')">ES</button>
    </div>
  </div>

  <div class="wrap" id="wrap">
    <main>

      <!-- HERO -->
      <header class="header" id="hero">
        <div class="name-wrapper" id="name-wrapper">
          <h1 class="header-name">Juan Peñalba</h1>
          <span class="name-clone name-red" aria-hidden="true">Juan Peñalba</span>
          <span class="name-clone name-blue" aria-hidden="true">Juan Peñalba</span>
        </div>
        <p class="header-role">Software Developer &nbsp;·&nbsp; Buenos Aires, Argentina</p>
        <p class="header-bio" id="bio"></p>
        <nav class="links" aria-label="Social links">
          <a href="https://www.linkedin.com/in/juan-pe%C3%B1alba-0025b6246/" target="_blank" rel="noopener" aria-label="LinkedIn profile">LinkedIn</a>
          <a href="https://github.com/JuanPE44" target="_blank" rel="noopener" aria-label="GitHub profile">GitHub</a>
          <a href="https://x.com/Juanpealba9" target="_blank" rel="noopener" aria-label="X (Twitter) profile">X</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram profile">Instagram</a>
          <a href="mailto:juantandil123@gmail.com" id="link-email" aria-label="Send email"></a>
        </nav>
      </header>

      <!-- PROJECTS -->
      <section id="projects">
        <h2 class="section-label" id="label-projects"></h2>

        <article class="project-card accent-cyan">
          <p class="project-name">
            <a href="https://www.exactamente.com.ar" target="_blank" rel="noopener" aria-label="Exactamente — opens in new tab">Exactamente ↗</a>
          </p>
          <p class="project-context" id="proj1-context"></p>
          <div class="project-metrics">
            <span class="pill">200+ daily users</span>
            <span class="pill">4,000+ resources</span>
          </div>
          <p class="project-desc" id="proj1-desc"></p>
          <div class="item-stack">
            <span class="tag">React</span><span class="tag">Astro</span><span class="tag">Tailwind CSS</span><span class="tag">Node.js</span><span class="tag">Hono</span><span class="tag">Drizzle ORM</span><span class="tag">PostgreSQL</span>
          </div>
        </article>

        <article class="project-card accent-indigo">
          <p class="project-name">
            <a href="https://ethglobal.com/showcase/poky-xiko4" target="_blank" rel="noopener" aria-label="Poky — opens in new tab">Poky ↗</a>
          </p>
          <p class="project-context" id="proj2-context"></p>
          <p class="project-desc" id="proj2-desc"></p>
          <div class="item-stack">
            <span class="tag">Next.js</span><span class="tag">Solidity</span><span class="tag">IPFS</span><span class="tag">Wagmi</span><span class="tag">The Graph</span><span class="tag">Filecoin</span>
          </div>
        </article>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience">
        <h2 class="section-label" id="label-experience"></h2>
        <span class="concurrent-label" id="concurrent-label"></span>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-item-top">
              <span class="item-title" id="job1-title"></span>
              <time class="item-period" id="job1-period" datetime="2025-09"></time>
            </div>
            <p class="item-company">Chabit · <span id="job1-mode"></span></p>
            <ul class="item-bullets" id="job1-bullets"></ul>
            <div class="item-stack">
              <span class="tag">Astro</span><span class="tag">React</span><span class="tag">React Native</span><span class="tag">Three.js</span><span class="tag">GSAP</span><span class="tag">Storybook</span>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-item-top">
              <span class="item-title" id="job2-title"></span>
              <time class="item-period" id="job2-period" datetime="2025-07"></time>
            </div>
            <p class="item-company">Primarket · <span id="job2-mode"></span></p>
            <ul class="item-bullets" id="job2-bullets"></ul>
            <div class="item-stack">
              <span class="tag">Next.js</span><span class="tag">Material UI</span><span class="tag">TypeScript</span>
            </div>
          </div>
        </div>
      </section>

      <!-- TECH STACK -->
      <section id="stack">
        <h2 class="section-label" id="label-tech"></h2>
        <div class="tech-grid">

          <div class="tech-category">
            <p class="tech-cat-label" id="cat-lang"></p>
            <div class="skill-row"><span class="skill-name">TypeScript</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">JavaScript</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">HTML / CSS</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">Go</span><div class="depth-track"><div class="depth-bar depth-learning"></div></div></div>
          </div>

          <div class="tech-category">
            <p class="tech-cat-label">Frontend</p>
            <div class="skill-row"><span class="skill-name">React</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">Next.js</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">Astro</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">Tailwind CSS</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
          </div>

          <div class="tech-category">
            <p class="tech-cat-label">Backend</p>
            <div class="skill-row"><span class="skill-name">Node.js</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">NestJS</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
            <div class="skill-row"><span class="skill-name">Express</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
            <div class="skill-row"><span class="skill-name">Drizzle ORM</span><div class="depth-track"><div class="depth-bar depth-learning"></div></div></div>
          </div>

          <div class="tech-category">
            <p class="tech-cat-label" id="cat-3d"></p>
            <div class="skill-row"><span class="skill-name">Three.js</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
            <div class="skill-row"><span class="skill-name">GSAP</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
            <div class="skill-row"><span class="skill-name">Spline</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
          </div>

          <div class="tech-category">
            <p class="tech-cat-label" id="cat-tools"></p>
            <div class="skill-row"><span class="skill-name">Git</span><div class="depth-track"><div class="depth-bar depth-daily"></div></div></div>
            <div class="skill-row"><span class="skill-name">Figma</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
            <div class="skill-row"><span class="skill-name">Vite</span><div class="depth-track"><div class="depth-bar depth-proficient"></div></div></div>
          </div>

          <div class="tech-category">
            <p class="tech-cat-label">Web3</p>
            <div class="skill-row"><span class="skill-name">Solidity</span><div class="depth-track"><div class="depth-bar depth-learning"></div></div></div>
            <div class="skill-row"><span class="skill-name">Ethereum</span><div class="depth-track"><div class="depth-bar depth-learning"></div></div></div>
          </div>

        </div>
      </section>

      <!-- EDUCATION -->
      <section id="education">
        <h2 class="section-label" id="label-education"></h2>

        <div class="edu-item">
          <p class="edu-title" id="edu1-title"></p>
          <p class="edu-sub">Universidad Nacional del Centro de la Provincia de Buenos Aires · <time datetime="2024">2024</time> – <span id="present-label"></span></p>
        </div>

        <div class="edu-item">
          <p class="edu-title" id="edu2-title"></p>
          <p class="edu-sub">Escuela Técnica N.º 2 Ing. Felipe Senillosa · <time datetime="2020">2020</time> – <time datetime="2023">2023</time></p>
        </div>
      </section>

    </main>

    <!-- CTA -->
    <section class="cta-section" id="contact">
      <h2 class="cta-heading" id="cta-heading"></h2>
      <p class="cta-subtext" id="cta-subtext"></p>
      <div class="cta-buttons">
        <a href="mailto:juantandl123@gmail.com" class="btn-primary" id="cta-email"></a>
        <a href="https://github.com/JuanPE44" class="btn-secondary" target="_blank" rel="noopener" aria-label="View GitHub profile" id="cta-github"></a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <span>Juan Peñalba · Buenos Aires, Argentina</span>
      <a href="mailto:juantandil123@gmail.com">juantandil123@gmail.com</a>
    </footer>

  </div>

  <script src="main.js" defer></script>

  <script type="module">
    import { Renderer, Triangle, Program, Mesh } from 'https://esm.sh/ogl@1.0.11';

    const container = document.getElementById('prism-bg');

    const H        = 3.5;
    const BW       = 5.5;
    const BASE_HALF = BW * 0.5;
    const GLOW     = 1;
    const NOISE    = 0.5;
    const offX = 0, offY = 0;
    const SAT  = 1.5;
    const SCALE = 3.6;
    const HUE   = 0;
    const CFREQ = 1;
    const BLOOM = 1;
    const TS    = 0.5;
    const HOVSTR = 2;
    const INERT  = 0.05;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const renderer = new Renderer({ dpr, alpha: true, antialias: false });
    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block'
    });
    container.appendChild(gl.canvas);

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragment = `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){ vec4 e2x=exp(2.0*x); return (e2x-1.0)/(e2x+1.0); }
      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453123); }

      float sdOctaAnisoInv(vec3 p){
        vec3 q=vec3(abs(p.x)*uInvBaseHalf,abs(p.y)*uInvHeight,abs(p.z)*uInvBaseHalf);
        float m=q.x+q.y+q.z-1.0;
        return m*uMinAxis*0.5773502691896258;
      }
      float sdPyramidUpInv(vec3 p){ return max(sdOctaAnisoInv(p),-p.y); }

      mat3 hueRotation(float a){
        float c=cos(a),s=sin(a);
        mat3 W=mat3(0.299,0.587,0.114,0.299,0.587,0.114,0.299,0.587,0.114);
        mat3 U=mat3(0.701,-0.587,-0.114,-0.299,0.413,-0.114,-0.300,-0.588,0.886);
        mat3 V=mat3(0.168,-0.331,0.500,0.328,0.035,-0.500,-0.497,0.296,0.201);
        return W+U*c+V*s;
      }

      void main(){
        vec2 f=(gl_FragCoord.xy-0.5*iResolution.xy-uOffsetPx)*uPxScale;
        float z=5.0,d=0.0;
        vec3 p; vec4 o=vec4(0.0);
        mat2 wob=mat2(1.0);
        if(uUseBaseWobble==1){
          float t=iTime*uTimeScale;
          float c0=cos(t+0.0),c1=cos(t+33.0),c2=cos(t+11.0);
          wob=mat2(c0,c1,c2,c0);
        }
        for(int i=0;i<100;i++){
          p=vec3(f,z);
          p.xz=p.xz*wob;
          p=uRot*p;
          vec3 q=p; q.y+=uCenterShift;
          d=0.1+0.2*abs(sdPyramidUpInv(q));
          z-=d;
          o+=(sin((p.y+z)*uColorFreq+vec4(0.0,1.0,2.0,3.0))+1.0)/d;
        }
        o=tanh4(o*o*(uGlow*uBloom)/1e5);
        vec3 col=o.rgb;
        float n=rand(gl_FragCoord.xy+vec2(iTime));
        col+=(n-0.5)*uNoise;
        col=clamp(col,0.0,1.0);
        float L=dot(col,vec3(0.2126,0.7152,0.0722));
        col=clamp(mix(vec3(L),col,uSaturation),0.0,1.0);
        if(abs(uHueShift)>0.0001) col=clamp(hueRotation(uHueShift)*col,0.0,1.0);
        gl_FragColor=vec4(col,o.a);
      }
    `;

    const geometry  = new Triangle(gl);
    const iResBuf   = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);
    const rotBuf    = new Float32Array([1,0,0,0,1,0,0,0,1]);

    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        iResolution:  { value: iResBuf },
        iTime:        { value: 0 },
        uHeight:      { value: H },
        uBaseHalf:    { value: BASE_HALF },
        uUseBaseWobble: { value: 1 },
        uRot:         { value: rotBuf },
        uGlow:        { value: GLOW },
        uOffsetPx:    { value: offsetPxBuf },
        uNoise:       { value: NOISE },
        uSaturation:  { value: SAT },
        uScale:       { value: SCALE },
        uHueShift:    { value: HUE },
        uColorFreq:   { value: CFREQ },
        uBloom:       { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight:   { value: 1 / H },
        uMinAxis:     { value: Math.min(BASE_HALF, H) },
        uPxScale:     { value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE) },
        uTimeScale:   { value: TS },
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      iResBuf[0] = gl.drawingBufferWidth;
      iResBuf[1] = gl.drawingBufferHeight;
      offsetPxBuf[0] = offX * dpr;
      offsetPxBuf[1] = offY * dpr;
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    function randRotMat() {
      const ax = Math.random() * Math.PI * 2;
      const ay = Math.random() * Math.PI * 2;
      const az = Math.random() * Math.PI * 2;
      const cx = Math.cos(ax), sx = Math.sin(ax);
      const cy = Math.cos(ay), sy = Math.sin(ay);
      const cz = Math.cos(az), sz = Math.sin(az);
      return [
        cy*cz,              cy*sz,              -sy,
        sx*sy*cz - cx*sz,  sx*sy*sz + cx*cz,   sx*cy,
        cx*sy*cz + sx*sz,  cx*sy*sz - sx*cz,   cx*cy
      ];
    }

    rotBuf.set(randRotMat());
    let virtualTime = Math.random() * 500;
    const dirSign = Math.random() > 0.5 ? 1 : -1;

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity += dy * 0.00075 * dirSign;
    }, { passive: true });

    const render = () => {
      scrollVelocity *= 0.90;
      virtualTime += scrollVelocity;
      program.uniforms.iTime.value = virtualTime;
      renderer.render({ scene: mesh });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  </script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit --author="juanpe44 <juanpe44@users.noreply.github.com>" -m "feat: restructure index.html — new section order, cards, timeline, depth bars, CTA, accessibility"
```

---

### Task 4: Verify and final commit

- [ ] **Step 1: Open in browser and verify**

Open `index.html` in a browser (e.g. `open index.html` on macOS). Check:
- Prism background renders
- Hero name renders in white with gradient removed (now solid white — the gradient was on the old h1, new one uses `color: white`)
- Hover on name triggers red/blue chromatic aberration
- Projects section shows cards with left border accent and pills
- Experience shows vertical timeline with dots
- Tech stack shows depth bars in 2-column grid
- Sticky nav appears after scrolling past hero (desktop only)
- Theme toggle switches between dark/light
- EN/ES toggle keeps working for all new text
- CTA section visible with two buttons
- Mobile layout works at 375px width

- [ ] **Step 2: Commit plan doc**

```bash
git add docs/superpowers/plans/2026-05-16-portfolio-refactor.md
git commit --author="juanpe44 <juanpe44@users.noreply.github.com>" -m "docs: add portfolio refactor implementation plan"
```
