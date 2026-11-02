// Contrôle des mesures du spectre du hero contre les captures En lecture (constat Q5 de l'audit
// du 23 octobre). PhoneSpectrum.astro pose ses barres et un aplat qui efface les points de la
// capture à des positions en pixels relevées à la main sur `en-lecture.jpg` : une nouvelle
// capture (autre morceau, autre mise en page) les décalerait sans erreur de build. Ce script lit
// les constantes dans le CSS du composant et vérifie, pour chaque langue :
//   - la taille de la capture (le rapport de `aspect-ratio`) ;
//   - la rangée de points : 24 points (BAND_COUNT), de la gauche à la droite de `.bars`, posés
//     sur son bas, tous sous l'aplat `.dots-cover` ;
//   - la couleur de l'aplat, à quelques unités près du fond de la capture autour des points.
// Lancé par `npm run check` ; sharp est celui qu'Astro installe pour ses images.
// Après un échec : remesurer sur la capture et corriger les nombres de PhoneSpectrum.astro (et
// son commentaire), ou demander une capture à la même mise en page.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const component = readFileSync(`${root}src/components/home/hero/PhoneSpectrum.astro`, 'utf8');
const bandCount = Number(readFileSync(`${root}src/components/home/hero/spectrum.ts`, 'utf8').match(/BAND_COUNT = (\d+)/)[1]);

/** Déclarations d'un sélecteur du `<style>` du composant. */
function rule(selector) {
  const body = component.match(new RegExp(`\\n\\s*\\${selector} \\{([^}]*)\\}`))?.[1];
  if (!body) throw new Error(`règle ${selector} introuvable dans PhoneSpectrum.astro`);
  return body;
}
/** `calc(<n> / <total> * 100%)` d'une propriété : n en pixels de la capture. */
function px(body, property) {
  const m = body.match(new RegExp(`\\n\\s*${property}: calc\\(([\\d.]+) / ([\\d.]+) \\* 100%\\)`));
  if (!m) throw new Error(`${property} introuvable`);
  return Number(m[1]);
}

const [width, height] = rule('.screen-overlay').match(/aspect-ratio: (\d+) \/ (\d+)/).slice(1).map(Number);
const coverRule = rule('.dots-cover');
const cover = { left: px(coverRule, 'left'), top: px(coverRule, 'top') };
cover.right = cover.left + px(coverRule, 'width');
cover.bottom = cover.top + px(coverRule, 'height');
const coverColor = coverRule.match(/background: rgb\((\d+) (\d+) (\d+)\)/).slice(1).map(Number);
const barsRule = rule('.bars');
const bars = { left: px(barsRule, 'left') };
bars.right = bars.left + px(barsRule, 'width');
bars.bottom = px(barsRule, 'top') + px(barsRule, 'height');

const TOLERANCE_PX = 2; // arrondis du JPEG et anticrénelage des points
const TOLERANCE_COLOR = 8; // par composante, sur 255
const bright = (r, g, b) => r + g + b > 360; // points blancs translucides sur le fond violet

let failures = 0;
const fail = (message) => {
  failures++;
  console.log(`✗ ${message}`);
};

for (const file of ['src/assets/screenshots/en-lecture.jpg', 'src/assets/screenshots/en/en-lecture.jpg']) {
  const before = failures;
  const { data, info } = await sharp(`${root}${file}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== width || info.height !== height) {
    fail(`${file} : ${info.width} × ${info.height}, PhoneSpectrum.astro attend ${width} × ${height}`);
    continue;
  }
  const pixel = (x, y) => {
    const i = (y * width + x) * 3;
    return [data[i], data[i + 1], data[i + 2]];
  };

  // Points clairs autour de l'aplat (marge de 20 px, sous la pochette, au-dessus du titre).
  let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
  const background = [];
  for (let y = Math.floor(cover.top) - 20; y < Math.ceil(cover.bottom) + 20; y++) {
    for (let x = Math.floor(cover.left) - 20; x < Math.ceil(cover.right) + 20; x++) {
      const p = pixel(x, y);
      if (bright(...p)) {
        xMin = Math.min(xMin, x); xMax = Math.max(xMax, x + 1);
        yMin = Math.min(yMin, y); yMax = Math.max(yMax, y + 1);
      } else if (x >= cover.left && x < cover.right && y >= cover.top && y < cover.bottom) {
        background.push(p);
      }
    }
  }
  if (xMin === Infinity) {
    fail(`${file} : aucun point clair autour de y = ${cover.top}–${cover.bottom}`);
    continue;
  }
  const near = (a, b) => Math.abs(a - b) <= TOLERANCE_PX;
  if (!near(xMin, bars.left) || !near(xMax, bars.right))
    fail(`${file} : points de x = ${xMin} à ${xMax}, barres de ${bars.left} à ${bars.right}`);
  if (!near(yMax, bars.bottom)) fail(`${file} : bas des points à y = ${yMax}, bas des barres à ${bars.bottom}`);
  if (xMin < cover.left || xMax > cover.right || yMin < cover.top || yMax > cover.bottom)
    fail(`${file} : points dans x = ${xMin}–${xMax}, y = ${yMin}–${yMax}, hors de l'aplat (${cover.left}–${cover.right}, ${cover.top}–${cover.bottom})`);

  // Nombre de points : passages du fond au clair sur une ligne juste au-dessus de leur bas.
  const y = Math.round(bars.bottom) - 6;
  let dots = 0;
  for (let x = Math.floor(cover.left), was = false; x < cover.right; x++) {
    const is = bright(...pixel(x, y));
    if (is && !was) dots++;
    was = is;
  }
  if (dots !== bandCount) fail(`${file} : ${dots} points sur la ligne y = ${y}, BAND_COUNT = ${bandCount}`);

  // Couleur de l'aplat : médiane du fond de la capture sous l'aplat, points exclus.
  const median = [0, 1, 2].map((c) => background.map((p) => p[c]).sort((a, b) => a - b)[background.length >> 1]);
  if (median.some((v, c) => Math.abs(v - coverColor[c]) > TOLERANCE_COLOR))
    fail(`${file} : fond rgb(${median.join(' ')}) sous les points, aplat rgb(${coverColor.join(' ')})`);

  if (failures === before) console.log(`✓ ${file} : ${dots} points de x = ${xMin} à ${xMax}, bas à y = ${yMax}, fond rgb(${median.join(' ')})`);
}

if (failures) {
  console.log('Le spectre du hero ne tombe plus sur les points de la capture : voir l’en-tête de scripts/check-spectrum.mjs.');
  process.exit(1);
}
