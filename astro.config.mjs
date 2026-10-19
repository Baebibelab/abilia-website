// @ts-check
import { defineConfig } from 'astro/config';

// Adresse publique du site, utilisée pour les liens canoniques, hreflang et Open Graph.
// À remplacer par le domaine définitif (ou à passer en variable SITE_URL au build).
const site = process.env.SITE_URL ?? 'https://abilia.app';

export default defineConfig({
  site,
  // Site entièrement statique : le dossier dist/ est envoyé tel quel sur l'hébergement OVH.
  output: 'static',
  trailingSlash: 'always',
  // Les feuilles de style (une dizaine de Ko compressés) vont dans la page : rien ne bloque le
  // premier affichage, pas même un aller-retour vers le serveur.
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    // Français à la racine (/), anglais sous /en/.
    routing: { prefixDefaultLocale: false },
  },
});
