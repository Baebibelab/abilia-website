// Comportements du hero qui demandent du JavaScript (le reste est en CSS) :
// - l'iPhone, l'icône et les pastilles suivent doucement le pointeur (`--tx`, `--ty` de -1 à 1),
//   seulement avec une souris ou un trackpad et sans « Réduire les animations » ;
// - hors de l'écran, `is-idle` met en pause les animations en boucle (spectres, halos).

const hero = document.querySelector<HTMLElement>('.hero');

if (hero) {
  const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let frame = 0;

  const step = () => {
    // Lissage : le hero rattrape le pointeur en quelques images, sans à-coups.
    current.x += (target.x - current.x) * 0.08;
    current.y += (target.y - current.y) * 0.08;
    hero.style.setProperty('--tx', current.x.toFixed(4));
    hero.style.setProperty('--ty', current.y.toFixed(4));
    const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
    frame = settled ? 0 : requestAnimationFrame(step);
  };

  const follow = (x: number, y: number) => {
    target.x = x;
    target.y = y;
    if (!frame) frame = requestAnimationFrame(step);
  };

  hero.addEventListener('pointermove', (event) => {
    if (!motionAllowed.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight)) * 2 - 1;
    follow(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  });

  hero.addEventListener('pointerleave', () => follow(0, 0));
  motionAllowed.addEventListener('change', () => follow(0, 0));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      hero.classList.toggle('is-idle', !entry.isIntersecting);
    }).observe(hero);
  }
}
