// Moteur d'animation au scroll du site, sans dépendance. Deux outils, déclarés en HTML :
//
// 1. `data-reveal` : l'élément apparaît quand il entre dans l'écran.
//    Valeurs : `up` (défaut), `down`, `left`, `right`, `scale`, `fade`, `blur`.
//    - `data-reveal-delay="150"` : délai en ms.
//    - `data-reveal-stagger` sur un parent : ses enfants `data-reveal` apparaissent l'un après
//      l'autre (`--reveal-index`, pas de `data-reveal-stagger="80"` ms, 90 par défaut).
//    - `data-reveal-repeat` : l'élément disparaît de nouveau quand il quitte l'écran, et
//      réapparaît au retour (sinon il reste affiché une fois révélé).
//
// 2. `data-scroll` : l'élément reçoit `--progress`, de 0 (son haut touche le bas de l'écran)
//    à 1 (son bas quitte le haut de l'écran), mis à jour à chaque image pendant le scroll.
//    Le CSS en tire ce qu'il veut (parallaxe, échelle, couleur, sections épinglées…), par ex.
//    `transform: translateY(calc((var(--progress) - 0.5) * -80px))`.
//    - `data-scroll="pin"` : pour un conteneur haut dont l'enfant est `position: sticky`, la
//      progression va de 0 (haut du conteneur en haut de l'écran) à 1 (bas du conteneur en bas
//      de l'écran) : la durée pendant laquelle l'enfant reste épinglé.
//    La page entière expose aussi `--page-progress` sur <html> (0 en haut, 1 en bas).
//
// Avec « Réduire les animations », tout est révélé d'emblée ; `--progress` reste calculé (utile
// pour une couleur ou une opacité), mais le CSS doit réserver les mouvements à
// `@media (prefers-reduced-motion: no-preference)`. Sans JavaScript, rien n'est caché : les
// états de départ ne s'appliquent que sous `html.js`.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupReveal() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((parent) => {
    const step = Number(parent.dataset.revealStagger) || 90;
    parent.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((child, index) => {
      child.style.setProperty('--reveal-index', String(index));
      child.style.setProperty('--reveal-step', `${step}ms`);
    });
  });

  elements.forEach((el) => {
    if (el.dataset.revealDelay) el.style.setProperty('--reveal-delay', `${el.dataset.revealDelay}ms`);
  });

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          if (!('revealRepeat' in el.dataset)) observer.unobserve(el);
        } else if ('revealRepeat' in el.dataset) {
          el.classList.remove('is-revealed');
        }
      }
    },
    // Révélé un peu après être entré dans l'écran, pour que l'animation se voie.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );
  elements.forEach((el) => observer.observe(el));
}

function setupScrollProgress() {
  const root = document.documentElement;
  const tracked = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll]'));
  // Seuls les éléments proches de l'écran sont recalculés.
  const visible = new Set<HTMLElement>();
  let scheduled = false;

  const clamp = (value: number) => Math.min(1, Math.max(0, value));

  function update() {
    scheduled = false;
    const viewport = window.innerHeight;
    const scrollable = root.scrollHeight - viewport;
    root.style.setProperty('--page-progress', (scrollable > 0 ? clamp(window.scrollY / scrollable) : 0).toFixed(4));

    for (const el of visible) {
      const rect = el.getBoundingClientRect();
      const progress =
        el.dataset.scroll === 'pin'
          ? -rect.top / Math.max(1, rect.height - viewport)
          : (viewport - rect.top) / (viewport + rect.height);
      el.style.setProperty('--progress', clamp(progress).toFixed(4));
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        schedule();
      },
      // Une marge d'un demi-écran : la valeur est juste dès que l'élément arrive.
      { rootMargin: '50% 0px 50% 0px' },
    );
    tracked.forEach((el) => observer.observe(el));
  } else {
    tracked.forEach((el) => visible.add(el));
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
}

/** Ajoute `is-scrolled` sur <html> dès que la page a défilé (en-tête en verre, par exemple). */
function setupScrolledFlag() {
  const root = document.documentElement;
  const sync = () => root.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', sync, { passive: true });
  sync();
}

setupReveal();
setupScrollProgress();
setupScrolledFlag();
