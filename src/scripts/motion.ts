// Moteur d'animation au scroll du site, sans dépendance. Deux outils, déclarés en HTML :
//
// 1. `data-reveal` : l'élément apparaît quand il entre dans l'écran.
//    Valeurs : `up` (défaut), `down`, `left`, `right`, `scale`, `fade`, `blur`.
//    - `data-reveal-delay="150"` : délai en ms.
//    - `data-reveal-stagger` sur un parent : ses enfants `data-reveal` apparaissent l'un après
//      l'autre (`--reveal-index`, pas de `data-reveal-stagger="80"` ms, 90 par défaut).
//    - `data-reveal-repeat` : l'élément disparaît de nouveau quand il quitte l'écran, et
//      réapparaît au retour (sinon il reste affiché une fois révélé).
//    - Filet : à l'arrêt du défilement, un élément déjà dépassé (ou à l'écran en bas de page)
//      qui n'a jamais été vu dans la zone est révélé quand même.
//
// 2. `data-scroll` : l'élément reçoit `--progress`, de 0 (son haut touche le bas de l'écran)
//    à 1 (son bas quitte le haut de l'écran), mis à jour à chaque image pendant le scroll.
//    Le CSS en tire ce qu'il veut (parallaxe, échelle, couleur, sections épinglées…), par ex.
//    `transform: translateY(calc((var(--progress) - 0.5) * -80px))`.
//    - `data-scroll="pin"` : pour un conteneur haut dont l'enfant est `position: sticky`, la
//      progression va de 0 (haut du conteneur en haut de l'écran) à 1 (bas du conteneur en bas
//      de l'écran) : la durée pendant laquelle l'enfant reste épinglé.
//    - `data-page-progress` : l'élément reçoit `--page-progress`, la progression de la page
//      entière (0 en haut, 1 en bas). Le poser au plus près de qui s'en sert (le fond, par ex.) :
//      sur <html>, chaque image recalculerait les styles de toute la page.
//
// 3. `data-loop` : les animations CSS en boucle de l'élément et de ses descendants (flottement,
//    pulsation, dégradé qui glisse…) se mettent en pause tant qu'il est loin de l'écran (classe
//    `is-paused`), au lieu de tourner pendant toute la visite. À poser sur chaque bloc qui en a.
//
// À chaque image, toutes les mesures sont lues avant la moindre écriture, et une valeur
// inchangée n'est pas réécrite : écrire puis mesurer forcerait un recalcul des styles par élément.
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

  // Éléments pas encore révélés (hors `data-reveal-repeat`), pour le filet ci-dessous.
  const pending = new Set(elements.filter((el) => !('revealRepeat' in el.dataset)));

  const reveal = (el: HTMLElement) => {
    el.classList.add('is-revealed');
    if (pending.delete(el)) observer.unobserve(el);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) reveal(el);
        else if ('revealRepeat' in el.dataset) el.classList.remove('is-revealed');
      }
    },
    // Révélé un peu après être entré dans l'écran, pour que l'animation se voie. Seuil 0 : un
    // seul pixel dans la zone suffit (avec 5 %, un grand bloc traversé vite pouvait n'y être
    // jamais assez à un rendu).
    { rootMargin: '0px 0px -12% 0px', threshold: 0 },
  );
  elements.forEach((el) => observer.observe(el));

  // Filet : un défilement très rapide, une ancre ou un retour arrière peuvent faire passer un
  // élément au-dessus de l'écran sans qu'il ait jamais été dans la zone ; arrêté en bas de
  // page, un élément peut rester sous la ligne des 88 %. Une fois le défilement arrêté, on
  // révèle ce qui est déjà dépassé, et en bas de page ce qui est à l'écran : toutes les mesures
  // d'abord, les classes ensuite.
  let timer = 0;
  const sweep = () => {
    if (pending.size === 0) return;
    const viewport = window.innerHeight;
    const atBottom = window.scrollY + viewport >= document.documentElement.scrollHeight - 2;
    const late = Array.from(pending).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.bottom < 0 || (atBottom && rect.top < viewport);
    });
    late.forEach(reveal);
  };
  const scheduleSweep = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(sweep, 150);
  };
  window.addEventListener('scroll', scheduleSweep, { passive: true });
  window.addEventListener('load', scheduleSweep);
}

function setupScrollProgress() {
  const root = document.documentElement;
  const tracked = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll]'));
  const pageTracked = Array.from(document.querySelectorAll<HTMLElement>('[data-page-progress]'));
  // Seuls les éléments proches de l'écran sont recalculés.
  const visible = new Set<HTMLElement>();
  // Dernière valeur écrite par élément, pour ne pas réécrire la même.
  const written = new WeakMap<HTMLElement, string>();
  let scheduled = false;

  const clamp = (value: number) => Math.min(1, Math.max(0, value));

  function write(el: HTMLElement, name: string, value: number) {
    const text = clamp(value).toFixed(4);
    if (written.get(el) === text) return;
    written.set(el, text);
    el.style.setProperty(name, text);
  }

  function update() {
    scheduled = false;
    // Lectures d'abord…
    const viewport = window.innerHeight;
    const scrollable = root.scrollHeight - viewport;
    const page = scrollable > 0 ? window.scrollY / scrollable : 0;
    const measures = Array.from(visible, (el) => {
      const rect = el.getBoundingClientRect();
      const progress =
        el.dataset.scroll === 'pin'
          ? -rect.top / Math.max(1, rect.height - viewport)
          : (viewport - rect.top) / (viewport + rect.height);
      return [el, progress] as const;
    });

    // … écritures ensuite.
    for (const el of pageTracked) write(el, '--page-progress', page);
    for (const [el, progress] of measures) write(el, '--progress', progress);
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

function setupLoops() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-paused', !entry.isIntersecting);
    },
    // Un peu de marge : la boucle tourne déjà quand le bloc arrive à l'écran.
    { rootMargin: '25% 0px 25% 0px' },
  );
  document.querySelectorAll('[data-loop]').forEach((el) => observer.observe(el));
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
setupLoops();
setupScrolledFlag();
