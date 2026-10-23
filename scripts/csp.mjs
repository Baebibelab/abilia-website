// Empreintes des scripts en ligne pour la Content-Security-Policy, après `astro build` (lancé par
// `npm run build`) : chaque <script> en ligne exécutable des pages de dist/ (le script `js` de
// Base.astro, ceux qu'Astro met dans la page) est haché en SHA-256, et les empreintes remplacent
// {{CSP_SCRIPT_HASHES}} dans dist/.htaccess. Elles changent dès qu'un script change : ne jamais les
// recopier à la main dans public/.htaccess. Les blocs de données (application/ld+json) ne
// s'exécutent pas et n'en ont pas besoin.
// Échoue si le repère manque, si une page charge un script d'ailleurs que du site ou porte un
// attribut `on…=`, que la politique bloquerait.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const marker = '{{CSP_SCRIPT_HASHES}}';
const executable = new Set(['', 'module', 'text/javascript', 'application/javascript']);

const pages = [];
const walk = (dir) =>
  readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.html')) pages.push(path);
  });
walk(dist);

const hashes = new Set();
const problems = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const where = relative(dist, page);
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const type = (attrs.match(/\stype="([^"]*)"/)?.[1] ?? '').toLowerCase();
    const src = attrs.match(/\ssrc="([^"]*)"/)?.[1];
    if (src !== undefined) {
      if (/^(https?:)?\/\//.test(src)) problems.push(`${where} : script hors du site (${src})`);
      continue;
    }
    if (!executable.has(type)) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  for (const [attr] of html.matchAll(/\son[a-z]+="/g)) problems.push(`${where} : attribut ${attr.trim()}…`);
}

const htaccess = join(dist, '.htaccess');
const config = readFileSync(htaccess, 'utf8');
if (config.split(marker).length !== 2) problems.push(`${marker} absent de ${htaccess}, ou présent plusieurs fois`);

if (problems.length) {
  problems.forEach((p) => console.error(`✗ ${p}`));
  process.exit(1);
}

const sources = [...hashes].sort();
writeFileSync(htaccess, config.replace(marker, sources.join(' ')));
console.log(`CSP : ${sources.length} empreinte(s) de script en ligne, ${pages.length} pages, écrites dans ${htaccess}`);
