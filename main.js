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
