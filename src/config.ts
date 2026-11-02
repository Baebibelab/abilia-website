// Réglages du site partagés par les pages.

/** Lien App Store d'Andia. Tant qu'il est `null`, le bouton affiche « Bientôt sur l'App Store ». */
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
 * Serveur Jellyfin de démo (musique libre de droits), proposé sous la note Jellyfin pour essayer
 * l'app sans serveur. Les valeurs remplacent `{server}`, `{user}` et `{password}` dans
 * `jellyfin.demo` ; mettre `null` pour retirer la phrase. Elle ne paraît qu'une fois l'app
 * installable : avec `APP_STORE_URL`, ou, précédée de « Dès la sortie » (`jellyfin.demo.soon`),
 * avec seulement `TESTFLIGHT_URL`.
 */
export const DEMO_SERVER: { url: string; user: string; password: string } | null = {
  url: 'https://demo.andia-music.app',
  user: 'demo',
  password: 'demo',
};

/**
 * CarPlay attend encore l'autorisation d'Apple (droit `carplay-audio`, voir docs/LANCEMENT.md de
 * l'app) : tant que c'est `false`, le site le présente comme « Bientôt » et ne le promet pas.
 * Le passer à `true` fait aussi parler de CarPlay la description et le hero (les clés
 * `….carplay` de src/i18n/ui.ts) ; ajouter alors CarPlay à la ligne « Pour iPhone et Apple
 * Watch » de scripts/og/og.html et régénérer les images de partage.
 */
export const CARPLAY_AVAILABLE = false;

/**
 * Andia sur iPad et sur Mac (Mac Catalyst, même fiche App Store que l'iPhone) : PR #222 et #223
 * du dépôt de l'app. Tant que les deux sont `false`, la section « iPad et Mac » n'est construite
 * qu'en développement (`npm run dev`, pour la relire) et aucune page publiée n'en parle. Passer
 * une plateforme à `true` le jour où elle sort : elle rejoint « Pour iPhone, … » du hero, la
 * description et le chapeau du hero, et la section paraît (l'autre plateforme y porte alors
 * « Bientôt »). Ajouter aussi la plateforme à la ligne « Pour iPhone et Apple Watch » de
 * scripts/og/og.html et régénérer les images de partage. Les captures attendues sont décrites
 * dans src/assets/screenshots/index.ts.
 */
export const IPAD_AVAILABLE = false;
export const MAC_AVAILABLE = false;

/**
 * Prix d'Andia Plus affiché par la section « Tarifs », dans chaque langue. Le vrai prix est celui
 * de l'App Store (docs/monetisation/ du dépôt de l'app : 7,99 € au lancement, puis 12,99 €) : le
 * changer ici le même jour. `null` : la section dit « Achat unique » sans prix.
 */
export const PLUS_PRICE: Record<'fr' | 'en', string> | null = { fr: '7,99 €', en: '$7.99' };

/**
 * Lien public de la bêta TestFlight (App Store Connect › TestFlight › groupe externe › lien
 * public). Renseigné, la section « Tarifs » propose « Rejoindre la bêta » ; à remettre à `null`
 * si la bêta ferme.
 */
export const TESTFLIGHT_URL: string | null = null;
