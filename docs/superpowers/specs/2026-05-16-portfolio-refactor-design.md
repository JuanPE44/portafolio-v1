# Portfolio Refactor Design — 2026-05-16

## Overview

Refactor the single-file `index.html` portfolio into a clean 3-file structure (`index.html` + `style.css` + `main.js`) with enhanced visual effects, improved section order, a sticky nav, light/dark mode, and full accessibility compliance. No build step, no external libraries beyond what's already loaded (OGL via esm.sh for the prism).

---

## File Structure

```
index.html   — markup + <script type="module"> for OGL prism (stays inline due to esm.sh import)
style.css    — all CSS including custom properties, animations, responsive styles
main.js      — i18n, chromatic aberration, sticky nav, theme toggle
```

---

## Section Order (top → bottom)

1. Hero (prism bg + name effect + role + social links)
2. Projects
3. Experience
4. Tech Stack
5. Education
6. CTA
7. Footer

---

## Hero — Chromatic Aberration

**Markup:**
```html
<div class="name-wrapper" id="name-wrapper">
  <h1 class="header-name">Juan Peñalba</h1>
  <span class="name-clone name-red" aria-hidden="true">Juan Peñalba</span>
  <span class="name-clone name-blue" aria-hidden="true">Juan Peñalba</span>
</div>
```

**CSS:**
- `.name-wrapper`: `position: relative; display: inline-block`
- `.name-clone`: `position: absolute; top: 0; left: 0; mix-blend-mode: screen; opacity: 0`
- `.name-red`: `color: #ff3333`
- `.name-blue`: `color: #3399ff`
- `@keyframes chroma-red`: `translate(-5px, 1px)` over 600ms then return to 0
- `@keyframes chroma-blue`: `translate(+6px, -1px)` over 600ms then return to 0
- Both clones: opacity 0 → 0.75 during animation → 0
- Class `.chroma-active` on wrapper triggers both keyframes
- `@media (prefers-reduced-motion: reduce)`: remove `.chroma-active` immediately, skip animation

**JS (`main.js`):**
- `mouseenter` on `#name-wrapper` → add `.chroma-active` → on `animationend` remove it → 300ms cooldown
- `DOMContentLoaded` + 800ms delay → trigger once on mobile
- tap/click on mobile → trigger (same cooldown logic)

---

## Projects — Cards

**Markup:** `<article class="project-card">` per project.

**Styling:**
- `border-left: 2px solid <accent>` — Exactamente: `var(--accent-cyan)`, Poky: `var(--accent-indigo)`
- Project name + `↗` as external link
- Context line: `<p class="project-context">Solo project · Active</p>`
- Metrics as `<span class="pill">200+ daily users</span>` — translucent bg, accent color text
- Description paragraph
- Tech tags (existing `.tag` style)

---

## Experience — Vertical Timeline

**Markup:** `<div class="timeline">` wrapping `<div class="timeline-item">` per role.

**Styling:**
- `.timeline::before`: `position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: rgba(255,255,255,0.2)`
- `.timeline-item::before`: dot on the line, `position: absolute; left: -4px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent-cyan)`
- Chabit + Primarket are concurrent — `<span class="concurrent-label" id="concurrent-label"></span>` with i18n text ("2 simultaneous roles" / "2 roles simultáneos")
- Dates in `<time datetime="YYYY-MM">`

---

## Tech Stack — Depth Bars

**Markup:** 2-column CSS grid on desktop, 1-column on mobile.

Each skill:
```html
<div class="skill-row">
  <span class="skill-name">TypeScript</span>
  <div class="depth-bar depth-daily"></div>
</div>
```

**CSS widths:**
- `.depth-daily`: `width: 100%`
- `.depth-proficient`: `width: 66%`
- `.depth-learning`: `width: 33%`

**Depth assignments:**
- Daily: TypeScript, React, Next.js, Astro, Node.js, Tailwind CSS, Git
- Proficient: Three.js, GSAP, Spline, NestJS, Express, Figma, Vite
- Learning: Go, Solidity, Ethereum, Drizzle ORM

Category labels kept. Grid: `grid-template-columns: 1fr 1fr` on `min-width: 640px`.

---

## Sticky Nav (desktop only)

**Markup:** `<nav class="site-nav" aria-label="Site navigation">` — placed at top of `<body>`, outside `<main>`.

**CSS:**
- `position: fixed; top: 0; left: 0; right: 0; z-index: 90`
- `background: rgba(13, 17, 23, 0.75); backdrop-filter: blur(12px)`
- `display: none` by default, `display: flex` when `.visible` and `min-width: 768px`
- Left: small "Juan Peñalba" text; Right: anchor links → Projects · Experience · Stack · Contact

**JS:**
- `IntersectionObserver` on `#hero` → add `.visible` to `.site-nav` when hero leaves viewport
- `scroll-behavior: smooth` on `<html>`

---

## Light/Dark Mode

**Implementation:**
- `data-theme="dark"` default on `<html>`
- CSS: `:root` defines dark vars; `[data-theme="light"]` overrides them
- `transition: background-color 250ms, color 250ms` on `*` selector
- Button with sun/moon icon next to EN/ES switcher
- `localStorage.setItem('theme', value)` on toggle; read on load, default `dark`

**Light mode color overrides (approximate):**
- `--bg-base: #f0f4f8`
- `--bg-surface: #e2e8f0`
- `--bg-card: #ffffff`
- `--text-primary: #0f172a`
- `--text-muted: #475569`
- `--border-color: rgba(0, 0, 0, 0.1)`

---

## CTA Section

```html
<section class="cta-section" id="contact">
  <h2 id="cta-heading"></h2>
  <p id="cta-subtext"></p>
  <div class="cta-buttons">
    <a href="mailto:juantandl123@gmail.com" class="btn-primary" id="cta-email"></a>
    <a href="https://github.com/JuanPE44" class="btn-secondary" target="_blank" id="cta-github"></a>
  </div>
</section>
```

i18n set via `id` + `applyLang()`, consistent with existing pattern.

Background: `var(--bg-surface)` (one shade lighter than page bg).

---

## Accessibility

- `aria-label` on all icon-only links (LinkedIn, GitHub, X, Instagram, Email)
- Chromatic aberration clones: `aria-hidden="true"`
- `:focus-visible` ring: `outline: 2px solid currentColor; outline-offset: 3px` on all interactive elements
- Semantic tags: `<main>`, `<section>`, `<nav>`, `<time datetime="YYYY-MM">`
- WCAG AA contrast minimum on all text (dark and light modes)
- All animations respect `prefers-reduced-motion`

---

## i18n

Same pattern as today — `t.en` / `t.es` objects in `main.js`. New keys to add:
- `concurrentLabel`: "2 simultaneous roles" / "2 roles simultáneos"
- `ctaHeading`, `ctaSubtext`, `ctaEmail`, `ctaGithub`
- `navProjects`, `navExperience`, `navStack`, `navContact`
- `themeLightLabel`, `themeDarkLabel`

`applyLang()` updated to set all new elements. EN/ES toggle keeps working.

---

## Constraints

- No build step
- No new external libraries (OGL stays via esm.sh)
- Mobile-first, works at 375px
- All animations respect `prefers-reduced-motion`
- Dark mode default, light mode opt-in via localStorage
