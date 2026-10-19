// Spectre simulé du hero : 24 bandes, comme `SpectrumAnalyzer.bandCount` dans l'app, de la
// plus grave (0) à la plus aiguë (23). Pas d'audio sur la page : un morceau imaginaire à
// 116 BPM (grosse caisse à chaque temps, caisse claire sur les temps 2 et 4, charleston aux
// croches) plus des ondulations propres à chaque bande, pour que les barres respirent comme
// dans l'app plutôt que de sauter au hasard.
//
// Partagé par le rendu (une image figée, affichée sans JavaScript ou avec « Réduire les
// animations ») et par le script du hero (l'animation).

export const BAND_COUNT = 24;

const BPM = 116;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Niveaux bruts (0…1) des bandes à l'instant `t`, en secondes. */
export function spectrumAt(t: number, out: number[] = new Array(BAND_COUNT)): number[] {
  const beat = (t * BPM) / 60;
  const phase = beat % 1;
  const step = Math.floor(beat) % 4;
  const kick = Math.exp(-phase * 7);
  const snare = step === 1 || step === 3 ? Math.exp(-phase * 9) : 0;
  const hat = Math.exp(-((beat * 2) % 1) * 14);

  for (let i = 0; i < BAND_COUNT; i++) {
    const x = i / (BAND_COUNT - 1);
    const bass = Math.max(0, 1 - x * 3.2);
    const mid = Math.exp(-(((x - 0.45) / 0.2) ** 2));
    const high = Math.max(0, (x - 0.55) / 0.45);
    const wobble =
      0.14 * Math.sin(t * (1.3 + i * 0.37) + i * 1.7) +
      0.09 * Math.sin(t * (2.9 + i * 0.23) + i * 0.6) +
      0.06 * Math.sin(t * (5.3 + i * 0.11) + i * 2.3);
    const melody = 0.2 * mid * (0.5 + 0.5 * Math.sin(t * 0.9 + i * 0.8));
    out[i] = clamp(0.55 - 0.32 * x + wobble + melody + 0.5 * kick * bass + 0.3 * snare * mid + 0.24 * hat * high);
  }
  return out;
}

/**
 * Lissage des niveaux d'une image à la suivante : montée rapide, descente lente, comme les
 * barres de l'app. `frames` : nombre d'images à 30 i/s écoulées (peut être fractionnaire).
 */
export function smooth(current: number[], target: number[], frames: number) {
  for (let i = 0; i < current.length; i++) {
    const rate = target[i] > current[i] ? 0.55 : 0.14;
    current[i] += (target[i] - current[i]) * (1 - (1 - rate) ** frames);
  }
}

/** Instant choisi pour l'image figée : des barres variées, juste après un temps fort. */
export const STILL_TIME = 7.33;

/** Intensité de la grosse caisse à l'instant `t` (0…1), pour faire battre les halos. */
export function kickAt(t: number): number {
  return Math.exp(-(((t * BPM) / 60) % 1) * 7);
}
