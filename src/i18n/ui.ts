// Textes de l'interface, en français et en anglais. Chaque clé existe dans les deux langues :
// le type `UIKey` vient du français, et l'anglais doit le satisfaire entièrement.

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const fr = {
  'meta.title': 'Abilia — Toute votre musique Jellyfin, dans votre poche',
  'meta.description':
    "Abilia est un lecteur de musique pour iPhone, Apple Watch et CarPlay qui joue votre serveur Jellyfin : rapide, beau, hors ligne, sans compte tiers ni pistage.",
  'nav.skip': 'Aller au contenu',
  'nav.features': 'Fonctionnalités',
  'nav.offline': 'Hors ligne',
  'nav.everywhere': 'Partout',
  'nav.privacy': 'Confidentialité',
  'nav.home': "Accueil d'Abilia",
  'nav.language': 'Langue',
  'cta.appStore': "Bientôt sur l'App Store",
  'cta.download': "Télécharger Abilia",
  'cta.discover': 'Découvrir',
  'hero.eyebrow': 'Lecteur de musique pour Jellyfin',
  'hero.title.1': 'Toute votre musique,',
  'hero.title.2': 'dans votre poche.',
  'hero.lead':
    "Abilia joue la bibliothèque de votre serveur Jellyfin avec une app pensée pour l'iPhone : belle, rapide, et qui se fond dans le système, jusque dans la voiture et sur l'Apple Watch.",
  'features.eyebrow': 'Fonctionnalités',
  'features.title': 'Écoutez, simplement.',
  'features.lead':
    "Touchez un morceau, la musique démarre. Grande pochette, spectre animé, format joué, paroles synchronisées : l'écran En lecture vous donne tout.",
  'offline.eyebrow': 'Hors ligne',
  'offline.title': 'Emportez votre musique.',
  'offline.lead':
    'Téléchargez albums, playlists ou tous vos favoris, et écoutez-les sans réseau. Les playlists téléchargées se tiennent à jour toutes seules.',
  'everywhere.eyebrow': 'Partout',
  'everywhere.title': 'Partout dans le système.',
  'everywhere.lead':
    'Écran verrouillé, AirPlay, widget, Siri, CarPlay et Apple Watch : votre musique vous suit, même quand l’iPhone reste à la maison.',
  'screenshot.nowPlaying': 'Écran En lecture : pochette, spectre, format joué et commandes',
  'screenshot.library': 'Accueil de la bibliothèque : stations, mix par humeur et catégories',
  'screenshot.downloads': 'Téléchargements : morceaux favoris gardés hors ligne',
  'screenshot.settings': 'Réglages : Apple Watch et taille du cache',
  'footer.tagline': 'Votre musique, votre serveur.',
  'footer.jellyfin': "Abilia n'est pas affiliée au projet Jellyfin.",
  'footer.apple': 'Apple, iPhone, Apple Watch, CarPlay et App Store sont des marques d’Apple Inc.',
  'footer.privacy': 'Politique de confidentialité',
};

export type UIKey = keyof typeof fr;

const en: Record<UIKey, string> = {
  'meta.title': 'Abilia — All your Jellyfin music, in your pocket',
  'meta.description':
    'Abilia is a music player for iPhone, Apple Watch and CarPlay that plays your Jellyfin server: fast, beautiful, offline-ready, with no third-party account and no tracking.',
  'nav.skip': 'Skip to content',
  'nav.features': 'Features',
  'nav.offline': 'Offline',
  'nav.everywhere': 'Everywhere',
  'nav.privacy': 'Privacy',
  'nav.home': 'Abilia home',
  'nav.language': 'Language',
  'cta.appStore': 'Coming soon to the App Store',
  'cta.download': 'Download Abilia',
  'cta.discover': 'Discover',
  'hero.eyebrow': 'Music player for Jellyfin',
  'hero.title.1': 'All your music,',
  'hero.title.2': 'in your pocket.',
  'hero.lead':
    'Abilia plays your Jellyfin server’s library in an app built for the iPhone: beautiful, fast, and at home everywhere in the system, from the car to the Apple Watch.',
  'features.eyebrow': 'Features',
  'features.title': 'Just press play.',
  'features.lead':
    'Tap a track and the music starts. Big artwork, a live spectrum, the format being played, synced lyrics: the Now Playing screen has it all.',
  'offline.eyebrow': 'Offline',
  'offline.title': 'Take your music with you.',
  'offline.lead':
    'Download albums, playlists or all your favorites and listen without a connection. Downloaded playlists keep themselves up to date.',
  'everywhere.eyebrow': 'Everywhere',
  'everywhere.title': 'At home across the system.',
  'everywhere.lead':
    'Lock screen, AirPlay, widget, Siri, CarPlay and Apple Watch: your music follows you, even when the iPhone stays at home.',
  'screenshot.nowPlaying': 'The Now Playing screen: artwork, spectrum, format being played and controls',
  'screenshot.library': 'The library home: stations, mood mixes and categories',
  'screenshot.downloads': 'Downloads: favorite tracks kept offline',
  'screenshot.settings': 'Settings: Apple Watch and cache size',
  'footer.tagline': 'Your music, your server.',
  'footer.jellyfin': 'Abilia is not affiliated with the Jellyfin project.',
  'footer.apple': 'Apple, iPhone, Apple Watch, CarPlay and App Store are trademarks of Apple Inc.',
  'footer.privacy': 'Privacy policy',
};

export const ui: Record<Lang, Record<UIKey, string>> = { fr, en };

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key];
}

// Pages du site et leur adresse dans chaque langue. Une page nouvelle s'ajoute ici, puis dans
// src/pages/ (français) et src/pages/en/ (anglais) ; le sélecteur de langue et les balises
// hreflang lisent cette table.
export const routes = {
  home: { fr: '/', en: '/en/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type Route = keyof typeof routes;

export function pathFor(route: Route, lang: Lang) {
  return routes[route][lang];
}
