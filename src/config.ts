// Réglages du site partagés par les pages.

/** Lien App Store d'Abilia. Tant qu'il est `null`, le bouton affiche « Bientôt sur l'App Store ». */
export const APP_STORE_URL: string | null = null;

/**
 * Identifiant numérique de l'app sur l'App Store (le nombre après `id` dans `APP_STORE_URL`).
 * Renseigné, il ajoute la bannière d'app de Safari sur iPhone (`apple-itunes-app`).
 */
export const APP_STORE_ID: string | null = null;

/**
 * Langues de l'interface de l'app, qui ont chacune leurs captures (`src/assets/screenshots/`). Une
 * page dans une autre langue prévient ses visiteurs que l'app (et donc les captures) est en
 * français.
 */
export const APP_LANGUAGES: readonly string[] = ['fr', 'en'];

/** Site du projet Jellyfin, cité là où le site explique qu'il faut un serveur. */
export const JELLYFIN_URL = 'https://jellyfin.org';

/**
 * CarPlay attend encore l'autorisation d'Apple (droit `carplay-audio`, voir docs/LANCEMENT.md de
 * l'app) : tant que c'est `false`, le site le présente comme « Bientôt » et ne le promet pas.
 * Le passer à `true` fait aussi parler de CarPlay la description et le hero (les clés
 * `….carplay` de src/i18n/ui.ts) ; ajouter alors CarPlay à la ligne « Pour iPhone et Apple
 * Watch » de scripts/og/og.html et régénérer les images de partage.
 */
export const CARPLAY_AVAILABLE = false;
