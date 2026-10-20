// Textes de l'interface, en français et en anglais. Chaque clé existe dans les deux langues :
// le type `UIKey` vient du français, et l'anglais doit le satisfaire entièrement.

import { CARPLAY_AVAILABLE, IPAD_AVAILABLE, MAC_AVAILABLE } from '../config';

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const fr = {
  'meta.title': 'Andia — Toute votre musique Jellyfin, dans votre poche',
  'meta.description':
    "Andia est un lecteur de musique pour {platforms} qui joue votre serveur Jellyfin : rapide, beau, hors ligne, sans compte tiers ni pistage.",
  'meta.ogImageAlt': "L'icône d'Andia, « Toute votre musique, dans votre poche » et l'écran En lecture de l'app",
  'nav.skip': 'Aller au contenu',
  'nav.main': "Sections de l'accueil",
  'nav.features': 'Fonctionnalités',
  'nav.offline': 'Hors ligne',
  'nav.everywhere': 'Partout',
  'nav.pricing': 'Tarifs',
  'nav.privacy': 'Confidentialité',
  'nav.home': "Accueil d'Andia",
  'nav.language': 'Langue',
  'cta.appStore': "Bientôt sur l'App Store",
  'cta.download': "Télécharger Andia",
  'cta.discover': 'Découvrir',
  'hero.eyebrow': 'Lecteur de musique pour Jellyfin',
  'hero.title.1': 'Toute votre musique,',
  'hero.title.2': 'dans votre poche.',
  'hero.lead':
    "Andia joue la bibliothèque de votre serveur Jellyfin avec une app pensée pour {devices} : belle, rapide, et qui se fond dans le système, jusque sur l'Apple Watch.",
  'hero.lead.carplay':
    "Andia joue la bibliothèque de votre serveur Jellyfin avec une app pensée pour {devices} : belle, rapide, et qui se fond dans le système, jusque dans la voiture et sur l'Apple Watch.",
  'hero.platforms': 'Pour {platforms}',
  'hero.appLanguage': "L'app est en français.",
  'hero.chip.format': 'FLAC · 24 bits / 96 kHz',
  'hero.chip.gapless': 'Enchaînement sans blanc',
  'hero.chip.offline': 'Hors ligne',
  'hero.chip.eq': 'Égaliseur 10 bandes',
  'jellyfin.eyebrow': 'Votre serveur Jellyfin',
  'jellyfin.title.1': 'Votre musique,',
  'jellyfin.title.2': 'chez vous.',
  'jellyfin.lead':
    "Andia se connecte directement à votre serveur Jellyfin, chez vous ou sur Internet. Pas de compte à créer, pas d'abonnement, pas de publicité : juste votre bibliothèque, rangée comme à la maison.",
  'jellyfin.library.title': 'Toute votre bibliothèque',
  'jellyfin.library.text':
    "Albums, artistes, playlists et genres, avec un index A–Z. Les pages d'artiste ont leur photo et leur biographie, les albums sur plusieurs disques se lisent d'un seul tenant.",
  'jellyfin.search.title': 'Une recherche instantanée',
  'jellyfin.search.text': "Morceaux, albums, artistes et playlists s'affichent dès la première lettre.",
  'jellyfin.secure.title': 'Une connexion sûre',
  'jellyfin.secure.text':
    "Vos identifiants restent dans le trousseau de votre appareil. Certificat auto-signé ? Andia vous montre son empreinte, puis n'accepte que lui.",
  'jellyfin.chip.home': 'Chez vous',
  'jellyfin.chip.away': 'Sur Internet',
  'jellyfin.chip.keychain': 'Trousseau iOS',
  'jellyfin.chip.noAccount': 'Aucun compte tiers',
  'jellyfin.note': "Il vous faut un serveur Jellyfin 10.9 ou plus récent. Pas encore de serveur ? C'est gratuit et open source :",
  'jellyfin.noteLink': 'découvrir Jellyfin',
  'listen.eyebrow': 'En lecture',
  'listen.title.1': 'Écoutez,',
  'listen.title.2': 'simplement.',
  'listen.lead': 'Touchez un morceau, la musique démarre. Ensuite, tout est là, sous le pouce.',
  'listen.nowPlaying.title': 'La pochette en grand',
  'listen.nowPlaying.text':
    "Un fond flou aux couleurs de l'album, un spectre qui danse avec la musique et le format joué, de « MP3 · 256 kbps » à « FLAC · 24 bits / 96 kHz ».",
  'listen.lyrics.title': 'Des paroles qui suivent',
  'listen.lyrics.text':
    'Les paroles synchronisées défilent sous les commandes, au rythme du morceau. Un geste sur le mini-lecteur passe au suivant.',
  'listen.eq.title': 'Un égaliseur dix bandes',
  'listen.eq.text':
    'De 31 Hz à 16 kHz, avec des préréglages. Les bandes renforcées sont compensées par une légère baisse du volume, pour ne jamais saturer.',
  'listen.album.title': 'Chaque page a ses couleurs',
  'listen.album.text':
    'Albums, artistes et playlists prennent la teinte de leur pochette. Un cœur, et le morceau est marqué en favori sur votre serveur.',
  'listen.steps': 'Étapes de la visite',
  'gapless.eyebrow': 'Moteur audio',
  'gapless.title.1': 'Pas un blanc.',
  'gapless.title.2': 'Comme sur le disque.',
  'gapless.lead':
    "Andia a son propre moteur audio : les pistes s'enchaînent sans silence, et les suivantes sont préparées à l'avance pour démarrer sans attendre.",
  'gapless.gapless.title': 'Sans blanc',
  'gapless.gapless.text': "La dernière note d'une piste touche la première de la suivante, comme l'artiste l'a voulu.",
  'gapless.crossfade.title': 'Fondu enchaîné',
  'gapless.crossfade.text':
    "Si vous le souhaitez, un morceau s'efface pendant que le suivant monte. Réglable, et jamais à l'intérieur d'un même album.",
  'gapless.trackA': 'Piste 1',
  'gapless.trackB': 'Piste 2',
  'gapless.fact.prepared': "Les pistes suivantes sont prêtes avant d'arriver",
  'gapless.fact.normalized': 'Volume normalisé, sans saturation',
  'gapless.fact.sleep': 'Minuterie de sommeil, après un délai ou à la fin du morceau',
  'stations.eyebrow': 'Stations et mix',
  'stations.title.1': 'Laissez-vous',
  'stations.title.2': 'porter.',
  'stations.lead':
    "Pas d'idée ? Une station pioche dans votre bibliothèque : des morceaux oubliés, jamais écoutés, une décennie ou une humeur.",
  'stations.rowStations': 'Stations',
  'stations.rowMoods': 'Mix par humeur',
  'stations.random': 'Mix aléatoire',
  'stations.forgotten': 'Pas écoutés depuis longtemps',
  'stations.never': 'Jamais écoutés',
  'stations.decade80': 'Années 80',
  'stations.decade90': 'Années 90',
  'stations.decade00': 'Années 2000',
  'stations.mood.happy': 'Bonne humeur',
  'stations.mood.evening': 'Soirée',
  'stations.mood.chill': 'Chill',
  'stations.mood.melancholy': 'Mélancolie',
  'stations.mood.energy': 'Énergie',
  'stations.mood.focus': 'Concentration',
  'stations.radio.title': 'Radio',
  'stations.radio.text': "Depuis n'importe quel morceau, album ou artiste, ou depuis le morceau en cours.",
  'stations.continue.title': 'Lecture continue',
  'stations.continue.text': 'À la fin de la file, des morceaux proches du dernier écouté prennent le relais.',
  'stations.live.title': 'Radios en direct',
  'stations.live.text':
    "Les plus écoutées de votre pays, une recherche par nom et vos favorites, avec le titre en cours sur l'écran verrouillé.",
  'stations.moodsNote': "Les mix par humeur se composent d'après les genres de votre bibliothèque.",
  'offline.eyebrow': 'Hors ligne',
  'offline.title.1': 'Emportez',
  'offline.title.2': 'votre musique.',
  'offline.lead':
    "Téléchargez albums, playlists ou tous vos favoris, et écoutez-les sans réseau : dans le métro, en voyage, ou pour ménager votre forfait.",
  'offline.status.online': 'En ligne',
  'offline.status.offline': 'Hors ligne',
  'offline.progress.title': 'Morceaux favoris',
  'offline.progress.detail': '42 pistes',
  'offline.sync.title': 'Toujours à jour',
  'offline.sync.text':
    "Un nouveau cœur, un morceau ajouté à la playlist : il arrive tout seul sur votre appareil. Un morceau partagé par deux albums ou playlists n'est stocké qu'une fois.",
  'offline.cache.title': 'Un cache qui se souvient',
  'offline.cache.text':
    "Ce que vous écoutez reste sur votre appareil, de 1 à 10 Go au choix, vos favoris en dernier à partir. Réécouter ne re-télécharge rien.",
  'offline.mode.title': 'Le mode hors ligne',
  'offline.mode.text':
    "Un geste, et la bibliothèque n'affiche et ne joue que ce qui est téléchargé, même avec du réseau. Les stations piochent dans ce qui est sur votre appareil.",
  'offline.quality.title': 'La qualité qui vous va',
  'offline.quality.text':
    "Réglée à part en Wi-Fi, en 4G/5G et pour les téléchargements, de l'original jusqu'à 128 kb/s.",
  'rewind.eyebrow': 'Rewind',
  'rewind.title.1': 'Votre musique,',
  'rewind.title.2': 'en rétrospective.',
  'rewind.lead':
    "Temps d'écoute, artistes et albums favoris, genres, heures préférées : un récap à feuilleter toute l'année, sur 7 jours, 30 jours, une année ou depuis le début.",
  'rewind.private': "Calculé sur votre appareil, jamais envoyé nulle part.",
  'rewind.example': "Chiffres d'exemple.",
  'rewind.time.label': "Temps d'écoute",
  'rewind.time.value': '212 h',
  'rewind.time.detail': 'soit 318 albums entiers',
  'rewind.time.trend': '+32 % sur l\'an dernier',
  'rewind.genres.label': 'Vos genres',
  'rewind.genres.list': 'Rock,Électro,Jazz,Pop,Folk,Hip-hop',
  'rewind.periods': '7 jours,30 jours,Cette année,Depuis le début',
  'rewind.hours.label': 'Moment préféré',
  'rewind.hours.value': 'Le soir',
  'rewind.loop.label': 'En boucle',
  'rewind.loop.value': '7 écoutes',
  'rewind.loop.detail': 'du même morceau, en une journée',
  'everywhere.eyebrow': 'Partout',
  'everywhere.title.1': 'Partout',
  'everywhere.title.2': 'avec vous.',
  'everywhere.lead':
    "Écran verrouillé, AirPlay, widget, Siri : votre musique vous suit dans tout le système. Et sur l'Apple Watch, même quand l'iPhone reste à la maison.",
  'everywhere.watch.title': 'Apple Watch',
  'everywhere.watch.text':
    "Envoyez des albums, des playlists ou vos favoris sur la montre, puis écoutez-les avec des écouteurs Bluetooth, sans iPhone ni réseau. Vos écoutes remontent ensuite à votre serveur.",
  'everywhere.carplay.title': 'CarPlay',
  'everywhere.carplay.text':
    "Accueil, albums, artistes et playlists sur l'écran de la voiture, avec la lecture aléatoire et « À suivre ».",
  'everywhere.soon': 'Bientôt',
  'everywhere.lockScreen': 'Écran verrouillé et Centre de contrôle',
  'everywhere.airplay': 'AirPods, enceintes et AirPlay',
  'everywhere.widget': "Widget sur l'écran d'accueil",
  'everywhere.siri': '« Dis Siri, joue mes favoris sur Andia »',
  'everywhere.a11y': 'VoiceOver et grandes tailles de texte',
  'everywhere.home': 'Accueil',
  'everywhere.albums': 'Albums',
  'everywhere.artists': 'Artistes',
  'everywhere.playlists': 'Playlists',
  'everywhere.favorites': 'Morceaux favoris',
  'everywhere.recent': 'Ajoutés récemment',
  'everywhere.played': 'Écoutés récemment',
  'everywhere.genres': 'Genres',
  'pricing.eyebrow': 'Tarifs',
  'pricing.title.1': 'Gratuite.',
  'pricing.title.2': 'Et encore plus avec Plus.',
  'pricing.lead':
    "Toute l'écoute est gratuite, sans abonnement ni publicité. Andia Plus, un achat unique dans l'app, ajoute ce qui fait plaisir aux passionnés.",
  'pricing.free.name': 'Andia',
  'pricing.free.price': 'Gratuite',
  'pricing.free.library': 'Toute votre bibliothèque, la recherche et les paroles',
  'pricing.free.playback': 'Lecture sans blanc, haute résolution, volume normalisé',
  'pricing.free.offline': 'Téléchargements hors ligne, sans limite',
  'pricing.free.stations': 'Stations, mix et radios en direct',
  'pricing.free.system': 'Widget, écran verrouillé, AirPlay et Siri',
  'pricing.plus.name': 'Andia Plus',
  'pricing.plus.price': '{price}, une fois',
  'pricing.plus.priceUnknown': 'Achat unique',
  'pricing.plus.rewind': "Rewind : vos statistiques d'écoute et le récap de l'année",
  'pricing.plus.watch': "Votre musique sur l'Apple Watch, sans l'iPhone",
  'pricing.plus.eq': 'Égaliseur 10 bandes et préréglages',
  'pricing.plus.crossfade': 'Fondu enchaîné réglable',
  'pricing.plus.family': 'Partagé avec votre famille, sur tous vos appareils',
  'pricing.note': "Andia Plus s'achète dans l'app (Réglages › Andia Plus) et se restaure sur vos autres appareils. Le prix peut varier selon le pays.",
  'pricing.beta.title': "Envie de l'essayer avant tout le monde ?",
  'pricing.beta.text': "Rejoignez la bêta sur TestFlight. Pendant la bêta, Andia Plus est offert : l'achat est simulé, rien n'est prélevé.",
  'pricing.beta.cta': 'Rejoindre la bêta',
  'everywhere.watchList': 'Sur la montre',
  'list.and': ' et ',
  'device.iphone': "l'iPhone",
  'device.ipad': "l'iPad",
  'device.mac': 'le Mac',
  'screens.eyebrow': 'iPad et Mac',
  'screens.title.1': 'Sur grand écran',
  'screens.title.2': 'aussi.',
  'screens.lead':
    "La même app, à la taille de l'écran, et une seule fiche sur l'App Store pour tous vos appareils.",
  'screens.ipad.title': 'iPad',
  'screens.ipad.text':
    "En portrait ou en paysage, en Split View, en Slide Over ou dans plusieurs fenêtres : la bibliothèque prend la place qu'on lui donne, et En lecture s'ouvre en grand.",
  'screens.mac.title': 'Mac',
  'screens.mac.text':
    "Dans sa fenêtre, avec la barre des menus, les raccourcis clavier et les touches multimédia : Espace pour lire ou mettre en pause, ⌘→ pour le morceau suivant. Sur macOS 14 ou plus récent.",
  'screens.note': "Le widget et l'Apple Watch restent sur l'iPhone.",
  'screens.note.carplay': "Le widget, CarPlay et l'Apple Watch restent sur l'iPhone.",
  'screens.mock.library': 'Bibliothèque',
  'screens.mock.radios': 'Radios',
  'screenshot.ipad': "Andia sur iPad en paysage : l'accueil de la bibliothèque et le mini-lecteur",
  'screenshot.mac': "Andia sur Mac : la page d'un album dans une fenêtre",
  'screenshot.nowPlaying': 'Écran En lecture : pochette, spectre, format joué et commandes',
  'screenshot.library': 'Accueil de la bibliothèque : stations, mix par humeur et catégories',
  'screenshot.downloads': 'Téléchargements : des albums gardés hors ligne',
  'screenshot.settings': 'Réglages, rangés par thème',
  'screenshot.lyrics': 'Paroles synchronisées sous les commandes de lecture',
  'screenshot.equalizer': 'Égaliseur dix bandes avec le préréglage Rock',
  'screenshot.album': "Page d'un album aux couleurs de sa pochette",
  'footer.tagline': 'Votre musique, votre serveur.',
  'footer.jellyfin': "Andia n'est pas affiliée au projet Jellyfin.",
  'footer.apple': 'Apple, iPhone, iPad, Mac, Apple Watch, CarPlay et App Store sont des marques d’Apple Inc.',
  'footer.privacy': 'Politique de confidentialité',
  'footer.nav': 'Liens du pied de page',
  'privacy.title': 'Politique de confidentialité',
  'privacy.description':
    "Andia ne collecte aucune donnée personnelle : ce que l'app envoie, à qui, et ce qui reste sur votre appareil.",
  'privacy.eyebrow': 'Confidentialité',
  'privacy.updated': 'Mise à jour :',
  'privacy.summary.title': "L'essentiel",
  'privacy.summary.noData': 'Aucune donnée collectée',
  'privacy.summary.noTracking': 'Ni publicité, ni pistage',
  'privacy.summary.onDevice': 'Statistiques calculées sur l’appareil',
  'privacy.summary.yourServer': 'Votre musique reste sur votre serveur',
  'privacy.toc': 'Sur cette page',
  'privacy.translationNote': '',
  'privacy.back': "Retour à l'accueil",
};

export type UIKey = keyof typeof fr;

const en: Record<UIKey, string> = {
  'meta.title': 'Andia — All your Jellyfin music, in your pocket',
  'meta.description':
    'Andia is a music player for {platforms} that plays your Jellyfin server: fast, beautiful, offline-ready, with no third-party account and no tracking.',
  'meta.ogImageAlt': 'The Andia icon, “All your music, in your pocket” and the app’s Now Playing screen',
  'nav.skip': 'Skip to content',
  'nav.main': 'Home sections',
  'nav.features': 'Features',
  'nav.offline': 'Offline',
  'nav.everywhere': 'Everywhere',
  'nav.pricing': 'Pricing',
  'nav.privacy': 'Privacy',
  'nav.home': 'Andia home',
  'nav.language': 'Language',
  'cta.appStore': 'Coming soon to the App Store',
  'cta.download': 'Download Andia',
  'cta.discover': 'Discover',
  'hero.eyebrow': 'Music player for Jellyfin',
  'hero.title.1': 'All your music,',
  'hero.title.2': 'in your pocket.',
  'hero.lead':
    'Andia plays your Jellyfin server’s library in an app built for {devices}: beautiful, fast, and at home everywhere in the system, right down to your Apple Watch.',
  'hero.lead.carplay':
    'Andia plays your Jellyfin server’s library in an app built for {devices}: beautiful, fast, and at home everywhere in the system, from the car to the Apple Watch.',
  'hero.platforms': 'For {platforms}',
  'hero.appLanguage': 'Good to know: the app itself is in French for now, as in the screenshots on this page.',
  'hero.chip.format': 'FLAC · 24-bit / 96 kHz',
  'hero.chip.gapless': 'Gapless playback',
  'hero.chip.offline': 'Works offline',
  'hero.chip.eq': '10-band equalizer',
  'jellyfin.eyebrow': 'Your Jellyfin server',
  'jellyfin.title.1': 'Your music,',
  'jellyfin.title.2': 'at home.',
  'jellyfin.lead':
    'Andia connects straight to your Jellyfin server, at home or over the internet. No account to create, no subscription, no ads: just your library, organized the way you like it.',
  'jellyfin.library.title': 'Your whole library',
  'jellyfin.library.text':
    'Albums, artists, playlists and genres, with an A–Z index. Artist pages have their photo and biography, and multi-disc albums play straight through.',
  'jellyfin.search.title': 'Instant search',
  'jellyfin.search.text': 'Tracks, albums, artists and playlists show up from the very first letter.',
  'jellyfin.secure.title': 'A secure connection',
  'jellyfin.secure.text':
    'Your credentials stay in your device’s keychain. Self-signed certificate? Andia shows you its fingerprint, then trusts that one alone.',
  'jellyfin.chip.home': 'At home',
  'jellyfin.chip.away': 'Over the internet',
  'jellyfin.chip.keychain': 'iOS keychain',
  'jellyfin.chip.noAccount': 'No third-party account',
  'jellyfin.note': 'You need a Jellyfin server, version 10.9 or later. No server yet? It’s free and open source:',
  'jellyfin.noteLink': 'discover Jellyfin',
  'listen.eyebrow': 'Now Playing',
  'listen.title.1': 'Just',
  'listen.title.2': 'press play.',
  'listen.lead': 'Tap a track and the music starts. Everything else is right there, under your thumb.',
  'listen.nowPlaying.title': 'Artwork, front and center',
  'listen.nowPlaying.text':
    'A blurred backdrop in the album’s colors, a spectrum that dances with the music, and the format being played, from “MP3 · 256 kbps” to “FLAC · 24-bit / 96 kHz”.',
  'listen.lyrics.title': 'Lyrics that keep up',
  'listen.lyrics.text':
    'Synced lyrics scroll beneath the controls, in time with the song. A swipe on the mini player skips to the next track.',
  'listen.eq.title': 'A ten-band equalizer',
  'listen.eq.text':
    'From 31 Hz to 16 kHz, with presets. Boosted bands are balanced by a slight volume cut, so the sound never clips.',
  'listen.album.title': 'Every page in its own colors',
  'listen.album.text':
    'Albums, artists and playlists take on the hue of their artwork. Tap the heart and the track is saved as a favorite on your server.',
  'listen.steps': 'Tour steps',
  'gapless.eyebrow': 'Audio engine',
  'gapless.title.1': 'Not a gap.',
  'gapless.title.2': 'Just like the record.',
  'gapless.lead':
    'Andia has its own audio engine: tracks flow into each other without silence, and upcoming ones are prepared ahead of time so they start right away.',
  'gapless.gapless.title': 'Gapless',
  'gapless.gapless.text': 'The last note of one track meets the first note of the next, the way the artist intended.',
  'gapless.crossfade.title': 'Crossfade',
  'gapless.crossfade.text':
    'If you like, one song fades out as the next one rises. Adjustable, and never within the same album.',
  'gapless.trackA': 'Track 1',
  'gapless.trackB': 'Track 2',
  'gapless.fact.prepared': 'Upcoming tracks are ready before they’re due',
  'gapless.fact.normalized': 'Normalized volume, without clipping',
  'gapless.fact.sleep': 'Sleep timer, after a delay or at the end of the track',
  'stations.eyebrow': 'Stations and mixes',
  'stations.title.1': 'Sit back and',
  'stations.title.2': 'listen.',
  'stations.lead':
    'Out of ideas? A station digs into your library: forgotten tracks, songs you’ve never played, a decade or a mood.',
  'stations.rowStations': 'Stations',
  'stations.rowMoods': 'Mood mixes',
  'stations.random': 'Random mix',
  'stations.forgotten': 'Not played in a while',
  'stations.never': 'Never played',
  'stations.decade80': 'The ’80s',
  'stations.decade90': 'The ’90s',
  'stations.decade00': 'The 2000s',
  'stations.mood.happy': 'Feel good',
  'stations.mood.evening': 'Night out',
  'stations.mood.chill': 'Chill',
  'stations.mood.melancholy': 'Melancholy',
  'stations.mood.energy': 'Energy',
  'stations.mood.focus': 'Focus',
  'stations.radio.title': 'Radio',
  'stations.radio.text': 'From any track, album or artist, or from the song that’s playing.',
  'stations.continue.title': 'Autoplay',
  'stations.continue.text': 'When the queue ends, tracks close to the last one you heard take over.',
  'stations.live.title': 'Live radio',
  'stations.live.text':
    'Your country’s most popular stations, search by name and your favorites, with the current song on the lock screen.',
  'stations.moodsNote': 'Mood mixes are built from the genres in your library.',
  'offline.eyebrow': 'Offline',
  'offline.title.1': 'Take your music',
  'offline.title.2': 'with you.',
  'offline.lead':
    'Download albums, playlists or all your favorites and listen without a connection: on the subway, while traveling, or to spare your data plan.',
  'offline.status.online': 'Online',
  'offline.status.offline': 'Offline',
  'offline.progress.title': 'Favorite tracks',
  'offline.progress.detail': '42 tracks',
  'offline.sync.title': 'Always up to date',
  'offline.sync.text':
    'A new heart, a track added to a playlist: it lands on your device by itself. A track shared by two albums or playlists is stored only once.',
  'offline.cache.title': 'A cache that remembers',
  'offline.cache.text':
    'What you play stays on your device, from 1 to 10 GB as you choose, with your favorites the last to go. Replaying downloads nothing again.',
  'offline.mode.title': 'Offline mode',
  'offline.mode.text':
    'One tap, and the library shows and plays only what’s downloaded, even with a connection. Stations pick from what’s on your device.',
  'offline.quality.title': 'The quality you want',
  'offline.quality.text':
    'Set separately for Wi-Fi, 4G/5G and downloads, from the original file down to 128 kbps.',
  'rewind.eyebrow': 'Rewind',
  'rewind.title.1': 'Your music,',
  'rewind.title.2': 'looking back.',
  'rewind.lead':
    'Listening time, top artists and albums, genres, favorite hours: a recap to flip through all year long, over 7 days, 30 days, a year or since the very beginning.',
  'rewind.private': 'Computed on your device, never sent anywhere.',
  'rewind.example': 'Example figures.',
  'rewind.time.label': 'Listening time',
  'rewind.time.value': '212 h',
  'rewind.time.detail': 'that’s 318 full albums',
  'rewind.time.trend': '+32% on last year',
  'rewind.genres.label': 'Your genres',
  'rewind.genres.list': 'Rock,Electronic,Jazz,Pop,Folk,Hip-hop',
  'rewind.periods': '7 days,30 days,This year,All time',
  'rewind.hours.label': 'Favorite time',
  'rewind.hours.value': 'Evenings',
  'rewind.loop.label': 'On repeat',
  'rewind.loop.value': '7 plays',
  'rewind.loop.detail': 'of the same song, in a single day',
  'everywhere.eyebrow': 'Everywhere',
  'everywhere.title.1': 'Wherever',
  'everywhere.title.2': 'you go.',
  'everywhere.lead':
    'Lock screen, AirPlay, widget, Siri: your music follows you across the system. And on Apple Watch, even when your iPhone stays at home.',
  'everywhere.watch.title': 'Apple Watch',
  'everywhere.watch.text':
    'Send albums, playlists or your favorites to the watch, then listen with Bluetooth headphones, no iPhone or network needed. Your plays sync back to your server afterwards.',
  'everywhere.carplay.title': 'CarPlay',
  'everywhere.carplay.text':
    'Home, albums, artists and playlists on your car’s screen, with shuffle and “Up Next”.',
  'everywhere.soon': 'Coming soon',
  'everywhere.lockScreen': 'Lock screen and Control Center',
  'everywhere.airplay': 'AirPods, speakers and AirPlay',
  'everywhere.widget': 'Home Screen widget',
  'everywhere.siri': 'Siri and Shortcuts',
  'everywhere.a11y': 'VoiceOver and larger text sizes',
  'everywhere.home': 'Home',
  'everywhere.albums': 'Albums',
  'everywhere.artists': 'Artists',
  'everywhere.playlists': 'Playlists',
  'everywhere.favorites': 'Favorite tracks',
  'everywhere.recent': 'Recently added',
  'everywhere.played': 'Recently played',
  'everywhere.genres': 'Genres',
  'pricing.eyebrow': 'Pricing',
  'pricing.title.1': 'Free.',
  'pricing.title.2': 'And even more with Plus.',
  'pricing.lead':
    'Listening is free, with no subscription and no ads. Andia Plus, a one-time in-app purchase, adds the extras music lovers enjoy.',
  'pricing.free.name': 'Andia',
  'pricing.free.price': 'Free',
  'pricing.free.library': 'Your whole library, search and lyrics',
  'pricing.free.playback': 'Gapless, hi-res playback with volume normalization',
  'pricing.free.offline': 'Unlimited offline downloads',
  'pricing.free.stations': 'Stations, mixes and live radio',
  'pricing.free.system': 'Widget, Lock Screen, AirPlay and Siri',
  'pricing.plus.name': 'Andia Plus',
  'pricing.plus.price': '{price}, once',
  'pricing.plus.priceUnknown': 'One-time purchase',
  'pricing.plus.rewind': 'Rewind: your listening stats and year in review',
  'pricing.plus.watch': 'Your music on Apple Watch, without your iPhone',
  'pricing.plus.eq': 'Ten-band equalizer with presets',
  'pricing.plus.crossfade': 'Adjustable crossfade',
  'pricing.plus.family': 'Shared with your family, on all your devices',
  'pricing.note': 'Andia Plus is bought in the app (Settings › Andia Plus) and restored on your other devices. Prices may vary by country.',
  'pricing.beta.title': 'Want to try it before everyone else?',
  'pricing.beta.text': 'Join the beta on TestFlight. During the beta, Andia Plus is on us: the purchase is simulated and you won’t be charged.',
  'pricing.beta.cta': 'Join the Beta',
  'everywhere.watchList': 'On the watch',
  'list.and': ' and ',
  'device.iphone': 'iPhone',
  'device.ipad': 'iPad',
  'device.mac': 'Mac',
  'screens.eyebrow': 'iPad and Mac',
  'screens.title.1': 'On the big screen',
  'screens.title.2': 'too.',
  'screens.lead': 'The same app, sized to the screen, with a single App Store listing for all your devices.',
  'screens.ipad.title': 'iPad',
  'screens.ipad.text':
    'Portrait or landscape, Split View, Slide Over or several windows: the library fills the space it’s given, and Now Playing opens up big.',
  'screens.mac.title': 'Mac',
  'screens.mac.text':
    'In its own window, with the menu bar, keyboard shortcuts and media keys: Space to play or pause, ⌘→ for the next song. On macOS 14 or later.',
  'screens.note': 'The widget and Apple Watch stay with your iPhone.',
  'screens.note.carplay': 'The widget, CarPlay and Apple Watch stay with your iPhone.',
  'screens.mock.library': 'Library',
  'screens.mock.radios': 'Radio',
  'screenshot.ipad': 'Andia on iPad in landscape: the library home and the mini player',
  'screenshot.mac': 'Andia on Mac: an album page in a window',
  'screenshot.nowPlaying': 'The Now Playing screen: artwork, spectrum, format being played and controls',
  'screenshot.library': 'The library home: stations, mood mixes and categories',
  'screenshot.downloads': 'Downloads: albums kept offline',
  'screenshot.settings': 'Settings, grouped by topic',
  'screenshot.lyrics': 'Synced lyrics beneath the playback controls',
  'screenshot.equalizer': 'Ten-band equalizer with the Rock preset',
  'screenshot.album': 'An album page in the colors of its artwork',
  'footer.tagline': 'Your music, your server.',
  'footer.jellyfin': 'Andia is not affiliated with the Jellyfin project.',
  'footer.apple': 'Apple, iPhone, iPad, Mac, Apple Watch, CarPlay and App Store are trademarks of Apple Inc.',
  'footer.privacy': 'Privacy policy',
  'footer.nav': 'Footer links',
  'privacy.title': 'Privacy policy',
  'privacy.description':
    'Andia collects no personal data: what the app sends, to whom, and what stays on your device.',
  'privacy.eyebrow': 'Privacy',
  'privacy.updated': 'Last updated:',
  'privacy.summary.title': 'In short',
  'privacy.summary.noData': 'No data collected',
  'privacy.summary.noTracking': 'No ads, no tracking',
  'privacy.summary.onDevice': 'Stats computed on your device',
  'privacy.summary.yourServer': 'Your music stays on your server',
  'privacy.toc': 'On this page',
  'privacy.translationNote':
    'This is a translation for your convenience; the French version is the reference.',
  'privacy.back': 'Back to home',
};

export const ui: Record<Lang, Record<UIKey, string>> = { fr, en };

/**
 * Plateformes où l'app est disponible, dans l'ordre où le site les cite : l'iPad, le Mac et
 * CarPlay n'y entrent que le jour où leur réglage de src/config.ts passe à vrai.
 */
export function platforms(): string[] {
  return [
    'iPhone',
    ...(IPAD_AVAILABLE ? ['iPad'] : []),
    ...(MAC_AVAILABLE ? ['Mac'] : []),
    'Apple Watch',
    ...(CARPLAY_AVAILABLE ? ['CarPlay'] : []),
  ];
}

/** « a, b et c » / « a, b and c ». */
function joinList(items: string[], and: string) {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')}${and}${items.at(-1)}`;
}

/**
 * Textes d'une langue. Une clé qui a une variante `<clé>.carplay` la donne à la place quand
 * `CARPLAY_AVAILABLE` (src/config.ts) est vrai : d'ici là, le site ne promet CarPlay nulle part,
 * sauf dans la section « Partout » qui le marque « Bientôt ». `{platforms}` devient la liste des
 * plateformes disponibles (« iPhone, iPad et Apple Watch ») et `{devices}` celle des appareils
 * qui font tourner l'app elle-même, avec leur article en français (« l'iPhone et l'iPad »).
 */
export function useTranslations(lang: Lang) {
  const dict = ui[lang];
  const and = dict['list.and'];
  const devices = [
    dict['device.iphone'],
    ...(IPAD_AVAILABLE ? [dict['device.ipad']] : []),
    ...(MAC_AVAILABLE ? [dict['device.mac']] : []),
  ];
  const values: Record<string, string> = {
    platforms: joinList(platforms(), and),
    devices: joinList(devices, and),
  };
  return (key: UIKey): string => {
    const variant = `${key}.carplay`;
    const text = CARPLAY_AVAILABLE && variant in dict ? dict[variant as UIKey] : dict[key];
    return text.replace(/\{(platforms|devices)\}/g, (_, name: string) => values[name]);
  };
}

// Pages du site et leur adresse dans chaque langue. Une page nouvelle s'ajoute ici, puis dans
// src/pages/ (français) et src/pages/en/ (anglais) ; le sélecteur de langue et les balises
// hreflang lisent cette table.
export const routes = {
  home: { fr: '/', en: '/en/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type Route = keyof typeof routes;

export function pathFor(route: Route, lang: Lang) {
  return routes[route][lang];
}
