// Réglages du site partagés par les pages.

/** Lien App Store d'Abilia. Tant qu'il est `null`, le bouton affiche « Bientôt sur l'App Store ». */
export const APP_STORE_URL: string | null = null;

/** Site du projet Jellyfin, cité là où le site explique qu'il faut un serveur. */
export const JELLYFIN_URL = 'https://jellyfin.org';

/**
 * CarPlay attend encore l'autorisation d'Apple (droit `carplay-audio`, voir docs/LANCEMENT.md de
 * l'app) : tant que c'est `false`, le site le présente comme « Bientôt » et ne le promet pas.
 */
export const CARPLAY_AVAILABLE = false;
