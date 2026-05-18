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
    job2Period: 'Apr 2025 – Sept 2025',
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
    job2Period: 'Abr 2025 – Sept 2025',
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
}

applyLang('en');

// ── GRADUAL BLUR ──
function getGradDir(pos) {
  return { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' }[pos];
}

function createGradualBlur(container, opts) {
  const cfg = Object.assign({
    position: 'bottom',
    strength: 1,
    height: '4rem',
    divCount: 2,
    exponential: false,
    curve: 'bezier',
    zIndex: 10
  }, opts);

  const wrap = document.createElement('div');
  wrap.style.cssText = `
    position: absolute; pointer-events: none;
    height: ${cfg.height}; width: 100%;
    ${cfg.position}: 0; left: 0; right: 0;
    overflow: hidden; z-index: ${cfg.zIndex};
  `;

  const inner = document.createElement('div');
  inner.style.cssText = 'position:relative;width:100%;height:100%;';

  const curves = {
    linear: p => p,
    bezier: p => p * p * (3 - 2 * p),
    'ease-in': p => p * p,
    'ease-out': p => 1 - Math.pow(1 - p, 2)
  };
  const curveFn = curves[cfg.curve] || curves.bezier;
  const inc = 100 / cfg.divCount;

  for (let i = 1; i <= cfg.divCount; i++) {
    const progress = curveFn(i / cfg.divCount);
    const blurVal = cfg.exponential
      ? Math.pow(2, progress * 4) * 0.0625 * cfg.strength
      : 0.0625 * (progress * cfg.divCount + 1) * cfg.strength;

    const p1 = Math.round((inc * i - inc) * 10) / 10;
    const p2 = Math.round(inc * i * 10) / 10;
    const p3 = Math.round((inc * i + inc) * 10) / 10;
    const p4 = Math.round((inc * i + inc * 2) * 10) / 10;

    let grad = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) grad += `, black ${p3}%`;
    if (p4 <= 100) grad += `, transparent ${p4}%`;

    const dir = getGradDir(cfg.position);
    const mask = `linear-gradient(${dir}, ${grad})`;

    const d = document.createElement('div');
    d.style.cssText = `
      position: absolute; inset: 0;
      mask-image: ${mask};
      -webkit-mask-image: ${mask};
      backdrop-filter: blur(${blurVal.toFixed(3)}rem);
      -webkit-backdrop-filter: blur(${blurVal.toFixed(3)}rem);
    `;
    inner.appendChild(d);
  }

  wrap.appendChild(inner);
  container.appendChild(wrap);
}

const prismBg = document.getElementById('prism-bg');
if (prismBg) createGradualBlur(prismBg, { position: 'bottom', strength: 1, height: '6rem', divCount: 4 });


// ── SCROLL REVEAL ──
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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

