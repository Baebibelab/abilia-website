// Rend les images de partage (og.html) dans public/og/ et les icônes PNG dans public/.
// Usage : node scripts/og/render.mjs (Playwright installé sur la machine, hors du projet ;
// sinon PLAYWRIGHT_MODULE=/chemin/vers/playwright/index.mjs).
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir, readFile } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const here = fileURLToPath(new URL('.', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
await mkdir(`${root}public/og`, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of ['fr', 'en']) {
  await page.goto(`${pathToFileURL(`${here}og.html`).href}?lang=${lang}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${root}public/og/andia-${lang}.jpg`, type: 'jpeg', quality: 86 });
}

// Icône de l'écran d'accueil iOS (carrée : iOS arrondit lui-même les coins) et repli PNG du favicon
// (public/favicon.ico en est la conversion, pour les robots qui la demandent d'office).
const icon = `data:image/svg+xml;base64,${(await readFile(`${root}public/favicon.svg`)).toString('base64')}`;
for (const [name, size] of [['apple-touch-icon.png', 180], ['favicon-32.png', 32]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>*{margin:0}</style><img src="${icon}" width="${size}" height="${size}">`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${root}public/${name}`, omitBackground: true });
}
await browser.close();
