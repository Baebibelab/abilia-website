// Tirage pseudo-aléatoire reproductible (mulberry32) : les spectres du hero ont des barres
// irrégulières, mais identiques d'un build à l'autre (pas de différence de HTML sans raison).
export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Arrondi à deux décimales, pour garder des styles en ligne courts. */
export const round = (value: number) => Math.round(value * 100) / 100;
