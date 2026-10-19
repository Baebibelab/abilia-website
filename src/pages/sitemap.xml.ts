// Plan du site pour les moteurs de recherche : chaque page de `routes` (src/i18n/ui.ts) dans
// chaque langue, avec ses équivalents (hreflang). Sans dépendance : quelques pages suffisent.
import type { APIRoute } from 'astro';
import { type Lang, defaultLang, languages, routes } from '../i18n/ui';

export const GET: APIRoute = ({ site }) => {
  const langs = Object.keys(languages) as Lang[];
  const url = (path: string) => new URL(path, site).href;

  const entries = Object.values(routes).flatMap((route) =>
    langs.map((lang) => {
      const alternates = [
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(route[l])}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(route[defaultLang])}"/>`,
      ];
      return `  <url>\n    <loc>${url(route[lang])}</loc>\n${alternates.join('\n')}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
