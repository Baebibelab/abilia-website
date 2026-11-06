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
    "Andia est un lecteur de musique pour {platforms} qui joue votre serveur Jellyfin : rapide, beau, hors ligne, sans compte tiers ni pistage.",
  'meta.ogImageAlt': "L'icône d'Andia, « Toute votre musique, dans votre poche » et l'écran En lecture de l'app",
  'nav.skip': 'Aller au contenu',
  'nav.main': 'Menu principal',
  'nav.features': 'Fonctionnalités',
  'nav.offline': 'Hors ligne',
  'nav.everywhere': 'Partout',
  'nav.pricing': 'Tarifs',
  'nav.privacy': 'Confidentialité',
  'nav.support': 'Assistance',
  'nav.menu': 'Menu',
  'nav.home': "Accueil d'Andia",
  'cta.appStore': "Bientôt sur l'App Store",
  'cta.download': "Télécharger Andia",
  'cta.discover': 'Découvrir',
  'hero.eyebrow': 'Lecteur de musique pour Jellyfin',
  'hero.title.1': 'Toute votre musique,',
  'hero.title.2': 'dans votre poche.',
  'hero.lead':
    "Andia joue la bibliothèque de votre serveur Jellyfin avec une app pensée pour {devices} : belle, rapide, et qui se fond dans le système.",
  'hero.lead.carplay':
    "Andia joue la bibliothèque de votre serveur Jellyfin avec une app pensée pour {devices} : belle, rapide, et qui se fond dans le système, jusque dans la voiture.",
  'hero.platforms': 'Pour {platforms}',
  'hero.chip.format': 'FLAC · 24 bits / 96 kHz',
  'hero.chip.gapless': 'Enchaînement sans blanc',
  'hero.chip.offline': 'Hors ligne',
  'hero.chip.eq': 'Égaliseur 10 bandes',
  'jellyfin.eyebrow': 'Votre serveur Jellyfin',
  'jellyfin.title.1': 'Votre musique,',
  'jellyfin.title.2': 'chez vous.',
  'jellyfin.lead':
    "Andia se connecte directement à votre serveur Jellyfin, chez vous ou sur Internet. Pas de compte à créer, pas d'abonnement, pas de publicité : juste votre bibliothèque, rangée comme à la maison.",
  'jellyfin.library.title': 'Toute votre bibliothèque',
  'jellyfin.library.text':
    "Albums, artistes, playlists et genres, avec un index A–Z. Les pages d'artiste ont leur photo et leur biographie, les albums sur plusieurs disques se lisent d'un seul tenant. Toutes les bibliothèques musicales du serveur s'affichent par défaut ; avec Andia Plus, choisissez celles à afficher.",
  'jellyfin.search.title': 'Une recherche instantanée',
  'jellyfin.search.text':
    "Albums, artistes et playlists s'affichent dès la première lettre, les morceaux dès la réponse du serveur.",
  'jellyfin.secure.title': 'Une connexion sûre',
  'jellyfin.secure.text':
    "Vos identifiants restent dans le trousseau de votre appareil. Certificat auto-signé ? Andia vous montre son empreinte, puis n'accepte que lui.",
  'jellyfin.chip.home': 'Chez vous',
  'jellyfin.chip.away': 'Sur Internet',
  'jellyfin.chip.keychain': 'Trousseau iOS',
  'jellyfin.chip.noAccount': 'Aucun compte tiers',
  'jellyfin.note':
    "Il vous faut un iPhone sous iOS 17 ou plus récent et un serveur Jellyfin 10.9 ou plus récent. Pas encore de serveur ? C'est gratuit et open source :",
  'jellyfin.noteLink': 'découvrir Jellyfin',
  'jellyfin.demo':
    "Envie d'essayer d'abord ? Dans l'app, connectez-vous au serveur de démo {server} avec l'identifiant {user} et le mot de passe {password}.",
  'jellyfin.demo.soon':
    "Dès la sortie, vous pourrez essayer sans serveur : dans l'app, connectez-vous au serveur de démo {server} avec l'identifiant {user} et le mot de passe {password}.",
  'listen.eyebrow': 'En lecture',
  'listen.title.1': 'Écoutez,',
  'listen.title.2': 'simplement.',
  'listen.lead': 'Touchez un morceau, la musique démarre. Ensuite, tout est là, sous le pouce.',
  'listen.nowPlaying.title': 'La pochette en grand',
  'listen.nowPlaying.text':
    "Un fond flou aux couleurs de l'album, un spectre qui danse avec la musique et le format joué, de « MP3 · 256 kbps » à « FLAC · 24 bits / 96 kHz ».",
  'listen.lyrics.title': 'Des paroles qui suivent',
  'listen.lyrics.text':
    'Les paroles synchronisées défilent sous les commandes, au rythme du morceau. Un geste sur le mini-lecteur passe au suivant.',
  'listen.eq.title': 'Un égaliseur dix bandes',
  'listen.eq.text':
    'De 31 Hz à 16 kHz, avec des préréglages. Les bandes renforcées sont compensées par une légère baisse du volume, pour ne jamais saturer. Avec Andia Plus.',
  'listen.album.title': 'Chaque page a ses couleurs',
  'listen.album.text':
    'Albums, artistes et playlists prennent la teinte de leur pochette. Un cœur, et le morceau est marqué en favori sur votre serveur.',
  'listen.artist.title': "Les pages d'artiste",
  'listen.artist.text':
    "La photo de l'artiste, sa biographie (traduite sur l'appareil avec iOS 18), ses morceaux les plus écoutés et ses albums dans l'ordre de sortie. Avec votre clé Ticketmaster, ses prochains concerts.",
  'listen.visualizer.title': 'Un visualiseur plein écran',
  'listen.visualizer.text':
    "Touchez la pochette : une lumière liquide suit le tempo, s'ouvre au refrain et laisse passer les paroles synchronisées. L'écran reste allumé, pour la recopier sur une télé avec AirPlay.",
  'listen.queue.title': 'À suivre, comme vous voulez',
  'listen.queue.text':
    "Lire ensuite, ajouter à la file d'attente, réordonner ou retirer d'un glissement. Aléatoire et répétition, aussi depuis l'écran verrouillé.",
  'listen.autoplay.title': 'La musique continue',
  'listen.autoplay.text':
    "À la fin de la file d'attente, Andia enchaîne sur des morceaux proches, choisis par votre serveur. Un appui long sur un morceau lance sa radio.",
  'gapless.eyebrow': 'Moteur audio',
  'gapless.title.1': 'Pas un blanc.',
  'gapless.title.2': 'Comme sur le disque.',
  'gapless.lead':
    "Andia a son propre moteur audio : les pistes s'enchaînent sans silence, et les suivantes sont préparées à l'avance pour démarrer sans attendre.",
  'gapless.gapless.title': 'Sans blanc',
  'gapless.gapless.text': "La dernière note d'une piste touche la première de la suivante, comme l'artiste l'a voulu.",
  'gapless.crossfade.title': 'Fondu enchaîné',
  'gapless.crossfade.text':
    "Si vous le souhaitez, un morceau s'efface pendant que le suivant monte. Réglable, et jamais à l'intérieur d'un même album. Avec Andia Plus.",
  'gapless.trackA': 'Piste 1',
  'gapless.trackB': 'Piste 2',
  'gapless.diagram':
    "Frise de deux pistes : la piste 1 s'achève là où la piste 2 commence, sans blanc, et leurs volumes se croisent pendant le fondu enchaîné.",
  'gapless.fact.prepared': "Les pistes suivantes sont prêtes avant d'arriver",
  'gapless.fact.normalized': 'Volume normalisé, sans saturation',
  'gapless.fact.sleep': 'Minuterie de sommeil, après un délai ou à la fin du morceau',
  'stations.eyebrow': 'Stations et mix',
  'stations.title.1': 'Laissez-vous',
  'stations.title.2': 'porter.',
  'stations.lead':
    "Pas d'idée ? Une station pioche dans votre bibliothèque : des morceaux oubliés, jamais écoutés, une décennie ou une humeur.",
  'stations.rowStations': 'Stations',
  'stations.rowMoods': 'Humeurs',
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
  'offline.progress.detail': '42 pistes',
  'offline.sync.title': 'Toujours à jour',
  'offline.sync.text':
    "Vos favoris et les playlists téléchargés se tiennent à jour : un nouveau cœur, un morceau ajouté, et il arrive tout seul sur votre appareil. Un morceau partagé par deux albums ou playlists n'est stocké qu'une fois.",
  'offline.cache.title': 'Un cache qui se souvient',
  'offline.cache.text':
    "Ce que vous écoutez reste sur votre appareil, de 1 à 10 Go au choix, vos favoris en dernier à partir. Réécouter ne re-télécharge rien.",
  'offline.mode.title': 'Le mode hors ligne',
  'offline.mode.text':
    "Un geste, et la bibliothèque n'affiche et ne joue que ce qui est téléchargé, même avec du réseau. Les stations piochent dans ce qui est sur votre appareil.",
  'offline.quality.title': 'La qualité qui vous va',
  'offline.quality.text':
    "Réglée à part en Wi-Fi, en 4G/5G et pour les téléchargements, de l'original jusqu'à 128 kb/s.",
  'rewind.eyebrow': 'Rewind',
  'rewind.title.1': 'Votre musique,',
  'rewind.title.2': 'en rétrospective.',
  'rewind.lead':
    "Temps d'écoute, artistes et albums favoris, genres, heures préférées : un récap à feuilleter toute l'année, sur 7 jours, 30 jours, une année ou depuis le début. Avec Andia Plus.",
  'rewind.private': "Calculé sur votre appareil, jamais envoyé nulle part.",
  'rewind.example': "Chiffres d'exemple.",
  'rewind.time.label': "Temps d'écoute",
  'rewind.time.value': '212 h',
  'rewind.time.detail': 'soit 318 albums entiers',
  'rewind.time.trend': '+32 % sur l\'an dernier',
  'rewind.genres.label': 'Votre son',
  'rewind.genres.list': 'Rock,Électro,Jazz,Pop,Folk,Hip-hop',
  'rewind.periods': '7 jours,30 jours,{year},Tout',
  'rewind.hours.label': 'Votre rythme',
  'rewind.hours.value': 'Le soir',
  'rewind.loop.label': 'En boucle',
  'rewind.loop.value': '7 écoutes',
  'rewind.loop.detail': 'du même morceau, en une journée',
  'everywhere.eyebrow': 'Partout',
  'everywhere.title.1': 'Partout',
  'everywhere.title.2': 'avec vous.',
  'everywhere.lead':
    "Écran verrouillé, AirPlay, widget, Siri : votre musique vous suit dans tout le système. Et, avec Andia Plus, sur l'Apple Watch, même quand l'iPhone reste à la maison.",
  'everywhere.watch.title': 'Apple Watch',
  'everywhere.watch.text':
    "Envoyez des albums, des playlists ou vos favoris sur la montre, puis écoutez-les avec des écouteurs Bluetooth, sans iPhone ni réseau. Vos écoutes remontent ensuite à votre serveur. Avec Andia Plus.",
  'everywhere.carplay.title': 'CarPlay',
  'everywhere.carplay.text':
    "Accueil, albums, artistes et playlists sur l'écran de la voiture, avec la lecture aléatoire et « À suivre ».",
  'everywhere.soon': 'Bientôt',
  'plus.badge': 'Plus',
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
  'pricing.free.playlists': 'Playlists créées et modifiées sur votre serveur',
  'pricing.free.playback': 'Lecture sans blanc, haute résolution, volume normalisé',
  'pricing.free.offline': 'Téléchargements hors ligne, sans limite',
  'pricing.free.stations': 'Stations, mix et radios en direct',
  'pricing.free.system': 'Widget, écran verrouillé, AirPlay et Siri',
  'pricing.plus.name': 'Andia Plus',
  'pricing.plus.price': '{price}, une fois',
  'pricing.plus.priceUnknown': 'Achat unique',
  'pricing.plus.rewind': "Rewind : vos statistiques d'écoute et le récap de l'année",
  'pricing.plus.watch': "Votre musique sur l'Apple Watch, sans l'iPhone",
  'pricing.plus.eq': 'Égaliseur 10 bandes et préréglages',
  'pricing.plus.crossfade': 'Fondu enchaîné réglable',
  'pricing.plus.libraries': 'Le choix des bibliothèques musicales affichées',
  'pricing.plus.scrobbling': 'Vos écoutes envoyées à Last.fm et ListenBrainz, même hors ligne',
  'pricing.plus.family': 'Partagé avec votre famille, sur tous vos appareils',
  'pricing.note': "Andia Plus s'achète dans l'app (Réglages › Achats et abonnements) et se restaure sur vos autres appareils. Le prix peut varier selon le pays.",
  'pricing.beta.title': "Envie de l'essayer avant tout le monde ?",
  'pricing.beta.text': "Rejoignez la bêta sur TestFlight. Pendant la bêta, Andia Plus est offert : l'achat est simulé, rien n'est prélevé. Cet achat de test ne suivra pas sur l'App Store.",
  'pricing.beta.cta': 'Rejoindre la bêta',
  'everywhere.watchList': 'Sur la montre',
  'list.and': ' et ',
  'list.and.serial': ' et ',
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
    "En portrait ou en paysage, en Split View, en Slide Over ou dans plusieurs fenêtres : la bibliothèque prend la place qu'on lui donne, et En lecture s'ouvre en grand.",
  'screens.mac.title': 'Mac',
  'screens.mac.text':
    "Dans sa fenêtre, avec la barre des menus, les raccourcis clavier et les touches multimédia : Espace pour lire ou mettre en pause, ⌘→ pour le morceau suivant. Sur macOS 14 ou plus récent.",
  'screens.note': "Le widget et l'Apple Watch restent sur l'iPhone.",
  'screens.note.carplay': "Le widget, CarPlay et l'Apple Watch restent sur l'iPhone.",
  'screens.mock.library': 'Bibliothèque',
  'screens.mock.radios': 'Radios',
  'screenshot.ipad': "Andia sur iPad en portrait : l'accueil de la bibliothèque, ses stations et ses catégories",
  'screenshot.mac': "Andia sur Mac : l'accueil de la bibliothèque dans une fenêtre",
  'screenshot.nowPlaying': 'Écran En lecture : pochette, spectre, format joué et commandes',
  'screenshot.library': 'Accueil de la bibliothèque : stations, mix par humeur et catégories',
  'screenshot.downloads': 'Téléchargements : des albums gardés hors ligne',
  'screenshot.lyrics': 'Paroles synchronisées sous les commandes de lecture',
  'screenshot.equalizer': 'Égaliseur dix bandes avec le préréglage Rock',
  'screenshot.album': "Page d'un album aux couleurs de sa pochette",
  'screenshot.artist': "Page d'un artiste : photo, biographie et morceaux les plus écoutés",
  'footer.tagline': 'Votre musique, votre serveur.',
  'footer.jellyfin': "Andia n'est pas affiliée au projet Jellyfin.",
  'footer.apple':
    "Apple, iPhone, iPad, Mac, macOS, iOS, iPadOS, Apple Watch, CarPlay, AirPlay, AirPods, Siri, VoiceOver, iCloud, Time Machine, TestFlight et App Store sont des marques d'Apple Inc., déposées aux États-Unis et dans d'autres pays et régions.",
  'footer.privacy': 'Politique de confidentialité',
  'footer.support': 'Assistance',
  'footer.legal': 'Mentions légales',
  'footer.nav': 'Liens du pied de page',
  'privacy.title': 'Politique de confidentialité',
  'privacy.description':
    "Andia ne collecte aucune donnée personnelle : ce que l'app envoie, à qui, et ce qui reste sur votre appareil.",
  'privacy.eyebrow': 'Confidentialité',
  'privacy.updated': 'Mise à jour :',
  'privacy.summary.title': "L'essentiel",
  'privacy.summary.noData': 'Aucune donnée collectée',
  'privacy.summary.noTracking': 'Ni publicité, ni pistage',
  'privacy.summary.onDevice': "Statistiques calculées sur l'appareil",
  'privacy.summary.yourServer': 'Votre musique ne passe que par votre serveur',
  'privacy.toc': 'Sur cette page',
  'privacy.translationNote': '',
  'privacy.back': "Retour à l'accueil",
  'support.title': 'Assistance',
  'support.description':
    "Questions fréquentes sur Andia, l'adresse pour nous écrire et les mentions légales du site.",
  'support.description.noContact': 'Questions fréquentes sur Andia et mentions légales du site.',
  'support.eyebrow': 'Assistance',
  'support.heading': "Besoin d'aide ?",
  'support.lead': 'Les réponses aux questions les plus fréquentes, comment nous écrire, et qui édite ce site.',
  'support.lead.noContact': 'Les réponses aux questions les plus fréquentes, et qui héberge ce site.',
  'support.toc': 'Sur cette page',
  'support.contact.title': 'Nous écrire',
  'support.contact.text':
    "Une question, un problème, une idée ? Écrivez-nous, en français ou en anglais. Pour un problème, indiquez la version d'Andia (Réglages › À propos) et celle de votre serveur Jellyfin : cela nous aide à comprendre ce qui se passe.",
  'support.contact.cta': "Écrire à l'assistance",
  'support.faq.title': 'Questions fréquentes',
  'support.faq.server.q': "Ai-je besoin d'un serveur Jellyfin ?",
  'support.faq.server.a':
    "Oui. Andia est un lecteur pour votre propre serveur Jellyfin : il vous faut un serveur Jellyfin 10.9 ou plus récent, et un iPhone sous iOS 17 ou plus récent. Pas encore de serveur ? Jellyfin est gratuit et open source.",
  'support.faq.server.link': 'Découvrir Jellyfin',
  'support.faq.free.q': 'Est-ce gratuit ?',
  'support.faq.free.a':
    "Oui : écouter votre bibliothèque, télécharger, les stations, les radios en direct, le widget et Siri sont gratuits, sans abonnement ni publicité. Andia Plus, un achat unique dans l'app, partagé avec votre famille, ajoute le Rewind, l'envoi à l'Apple Watch, l'égaliseur, le fondu enchaîné, le choix des bibliothèques musicales affichées et l'envoi de vos écoutes à Last.fm et ListenBrainz.",
  'support.faq.offline.q': 'Ça marche hors ligne ?',
  'support.faq.offline.a':
    "Oui : téléchargez vos albums, vos playlists ou vos favoris (bouton de téléchargement sur leur page, ou appui long) et écoutez-les sans connexion. Le mode hors ligne de la bibliothèque n'affiche et ne joue alors que ce qui est téléchargé.",
  'support.faq.normalization.q': 'La normalisation du volume ne change rien ?',
  'support.faq.normalization.a':
    "Elle s'appuie sur l'analyse de votre serveur : Jellyfin 10.9 ou plus récent, avec la tâche planifiée « Normalisation audio » exécutée au moins une fois.",
  'support.faq.watch.q': "L'Apple Watch se connecte-t-elle à mon serveur ?",
  'support.faq.watch.a':
    "Non : c'est l'iPhone qui télécharge la musique et l'envoie à la montre (en MP3 à 256 kb/s, ou telle quelle si elle est déjà téléchargée sur l'iPhone en MP3 ou en AAC). La montre la lit ensuite sans iPhone ni réseau, avec des écouteurs Bluetooth. L'envoi à l'Apple Watch fait partie d'Andia Plus.",
  'support.faq.certificate.q': 'Mon serveur utilise un certificat auto-signé : ça marche ?',
  'support.faq.certificate.a':
    "Oui. À la première connexion, Andia vous montre l'empreinte du certificat ; une fois que vous lui faites confiance, ce certificat précis est accepté pour ce serveur, et lui seul. S'il change un jour, Andia vous prévient avant de continuer.",
  'support.faq.http.q': 'Et un serveur en simple http:// sur Internet ?',
  'support.faq.http.a':
    "Oui. Andia se connecte à l'adresse que vous lui donnez, en http:// comme en https://, par nom de domaine ou par adresse IP. Hors de votre réseau local, une connexion en http:// fait circuler votre mot de passe et votre musique en clair : Andia vous en avertit avant que vous tapiez le mot de passe, puis vous laisse choisir. Si votre serveur répond aussi en https://, préférez cette adresse.",
  'support.faq.data.q': 'Ma musique est-elle envoyée quelque part ?',
  'support.faq.data.a':
    "Non. Votre musique ne passe que par votre serveur, sans service intermédiaire. Seuls des services facultatifs reçoivent quelque chose : l'annuaire Radio Browser (les radios en direct), Discogs (le titre et l'artiste d'un album, pour sa note), Ticketmaster (le nom d'un artiste, pour ses concerts) et, si vous reliez un compte, Last.fm ou ListenBrainz (le titre, l'artiste, l'album et la date de vos écoutes).",
  'support.faq.data.link': 'Lire la politique de confidentialité',
  'support.legal.title': 'Mentions légales',
  'support.legal.publisher': 'Éditeur',
  'support.legal.publisherAddressAtHost': "Adresse communiquée à l'hébergeur.",
  'support.legal.contact': 'Contact :',
  'support.legal.director': 'Directeur de la publication',
  'support.legal.host': 'Hébergeur',
  'support.legal.site': 'Ce site',
  'support.legal.siteText':
    "Ce site ne dépose aucun cookie, n'enregistre rien dans votre navigateur, ne mesure pas son audience et ne charge rien depuis un autre site. Comme tout hébergeur, OVH tient des journaux d'accès (adresse IP, page demandée, date et heure, navigateur), conservés pendant la durée légale d'un an. La politique de confidentialité, elle, porte sur l'app.",
};

export type UIKey = keyof typeof fr;

const en: Record<UIKey, string> = {
  'meta.title': 'Andia — All your Jellyfin music, in your pocket',
  'meta.description':
    'Andia is a music player for {platforms} that plays your Jellyfin server: fast, beautiful, offline-ready, with no third-party account and no tracking.',
  'meta.ogImageAlt': 'The Andia icon, “All your music, in your pocket” and the app’s Now Playing screen',
  'nav.skip': 'Skip to content',
  'nav.main': 'Main menu',
  'nav.features': 'Features',
  'nav.offline': 'Offline',
  'nav.everywhere': 'Everywhere',
  'nav.pricing': 'Pricing',
  'nav.privacy': 'Privacy',
  'nav.support': 'Support',
  'nav.menu': 'Menu',
  'nav.home': 'Andia home',
  'cta.appStore': 'Coming soon to the App Store',
  'cta.download': 'Download Andia',
  'cta.discover': 'Discover',
  'hero.eyebrow': 'Music player for Jellyfin',
  'hero.title.1': 'All your music,',
  'hero.title.2': 'in your pocket.',
  'hero.lead':
    'Andia plays your Jellyfin server’s library in an app built for {devices}: beautiful, fast, and at home everywhere in the system.',
  'hero.lead.carplay':
    'Andia plays your Jellyfin server’s library in an app built for {devices}: beautiful, fast, and at home everywhere in the system, even in your car.',
  'hero.platforms': 'For {platforms}',
  'hero.chip.format': 'FLAC · 24-bit / 96 kHz',
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
    'Albums, artists, playlists and genres, with an A–Z index. Artist pages have their photo and biography, and multi-disc albums play straight through. All the music libraries on your server show up by default; with Andia Plus, choose which ones to show.',
  'jellyfin.search.title': 'Instant search',
  'jellyfin.search.text':
    'Albums, artists and playlists show up from the very first letter, songs as soon as the server answers.',
  'jellyfin.secure.title': 'A secure connection',
  'jellyfin.secure.text':
    'Your credentials stay in your device’s keychain. Self-signed certificate? Andia shows you its fingerprint, then trusts that one alone.',
  'jellyfin.chip.home': 'At home',
  'jellyfin.chip.away': 'Over the internet',
  'jellyfin.chip.keychain': 'iOS keychain',
  'jellyfin.chip.noAccount': 'No third-party account',
  'jellyfin.note':
    'You need an iPhone running iOS 17 or later and a Jellyfin server, version 10.9 or later. No server yet? It’s free and open source:',
  'jellyfin.noteLink': 'discover Jellyfin',
  'jellyfin.demo': 'Want to try it first? In the app, sign in to the demo server {server} with the username {user} and the password {password}.',
  'jellyfin.demo.soon':
    'Once it’s out, you can try it without a server: in the app, sign in to the demo server {server} with the username {user} and the password {password}.',
  'listen.eyebrow': 'Now Playing',
  'listen.title.1': 'Just',
  'listen.title.2': 'press play.',
  'listen.lead': 'Tap a song and the music starts. Everything else is right there, under your thumb.',
  'listen.nowPlaying.title': 'Artwork, front and center',
  'listen.nowPlaying.text':
    'A blurred backdrop in the album’s colors, a spectrum that dances with the music, and the format being played, from “MP3 · 256 kbps” to “FLAC · 24-bit / 96 kHz”.',
  'listen.lyrics.title': 'Lyrics that keep up',
  'listen.lyrics.text':
    'Synced lyrics scroll beneath the controls, in time with the song. A swipe on the mini player skips to the next song.',
  'listen.eq.title': 'A ten-band equalizer',
  'listen.eq.text':
    'From 31 Hz to 16 kHz, with presets. Boosted bands are balanced by a slight volume cut, so the sound never clips. With Andia Plus.',
  'listen.album.title': 'Every page in its own colors',
  'listen.album.text':
    'Albums, artists and playlists take on the hue of their artwork. Tap the heart and the song is saved as a favorite on your server.',
  'listen.artist.title': 'Artist pages',
  'listen.artist.text':
    'The artist’s photo, their bio (translated on your device with iOS 18), their most played songs and their albums in release order. Add your Ticketmaster key to see upcoming concerts.',
  'listen.visualizer.title': 'A full-screen visualizer',
  'listen.visualizer.text':
    'Tap the artwork: liquid light follows the tempo, opens up on the chorus and carries the synced lyrics. The screen stays on, so you can mirror it to a TV with AirPlay.',
  'listen.queue.title': 'Up Next, your way',
  'listen.queue.text':
    'Play Next, add to the queue, reorder or swipe to remove. Shuffle and repeat, from the Lock Screen too.',
  'listen.autoplay.title': 'The music keeps going',
  'listen.autoplay.text':
    'When the queue ends, Autoplay carries on with similar songs picked by your server. Touch and hold a song to start its radio.',
  'gapless.eyebrow': 'Audio engine',
  'gapless.title.1': 'Not a gap.',
  'gapless.title.2': 'Just like the record.',
  'gapless.lead':
    'Andia has its own audio engine: songs flow into each other without silence, and upcoming ones are prepared ahead of time so they start right away.',
  'gapless.gapless.title': 'Gapless',
  'gapless.gapless.text': 'The last note of one song meets the first note of the next, the way the artist intended.',
  'gapless.crossfade.title': 'Crossfade',
  'gapless.crossfade.text':
    'If you like, one song fades out as the next one rises. Adjustable, and never within the same album. With Andia Plus.',
  'gapless.trackA': 'Track 1',
  'gapless.trackB': 'Track 2',
  'gapless.diagram':
    'Diagram of two tracks: track 1 ends right where track 2 begins, with no gap, and their volumes cross during the crossfade.',
  'gapless.fact.prepared': 'Upcoming songs are ready before they’re due',
  'gapless.fact.normalized': 'Normalized volume, without clipping',
  'gapless.fact.sleep': 'Sleep timer, after a delay or at the end of the song',
  'stations.eyebrow': 'Stations and mixes',
  'stations.title.1': 'Sit back and',
  'stations.title.2': 'listen.',
  'stations.lead':
    'Out of ideas? A station digs into your library: forgotten songs, ones you’ve never played, a decade or a mood.',
  'stations.rowStations': 'Stations',
  'stations.rowMoods': 'Moods',
  'stations.random': 'Random Mix',
  'stations.forgotten': 'Not Played in a While',
  'stations.never': 'Never Played',
  'stations.decade80': '’80s',
  'stations.decade90': '’90s',
  'stations.decade00': 'The 2000s',
  'stations.mood.happy': 'Feel Good',
  'stations.mood.evening': 'Party',
  'stations.mood.chill': 'Chill',
  'stations.mood.melancholy': 'Melancholy',
  'stations.mood.energy': 'Energy',
  'stations.mood.focus': 'Focus',
  'stations.radio.title': 'Radio',
  'stations.radio.text': 'From any song, album or artist, or from the song that’s playing.',
  'stations.continue.title': 'Autoplay',
  'stations.continue.text': 'When the queue ends, songs close to the last one you heard take over.',
  'stations.live.title': 'Live Radio',
  'stations.live.text':
    'Your country’s most popular stations, search by name and your favorites, with the current song on the Lock Screen.',
  'stations.moodsNote': 'Mood mixes are built from the genres in your library.',
  'offline.eyebrow': 'Offline',
  'offline.title.1': 'Take your music',
  'offline.title.2': 'with you.',
  'offline.lead':
    'Download albums, playlists or all your favorites and listen without a connection: on the subway, while traveling, or to spare your data plan.',
  'offline.status.online': 'Online',
  'offline.status.offline': 'Offline',
  'offline.progress.title': 'Favorite Songs',
  'offline.progress.detail': '42 songs',
  'offline.sync.title': 'Always up to date',
  'offline.sync.text':
    'Downloaded favorites and playlists keep themselves up to date: a new heart, a song added, and it lands on your device by itself. A song shared by two albums or playlists is stored only once.',
  'offline.cache.title': 'A cache that remembers',
  'offline.cache.text':
    'What you play stays on your device, from 1 to 10 GB as you choose, with your favorites the last to go. Replaying downloads nothing again.',
  'offline.mode.title': 'Offline mode',
  'offline.mode.text':
    'One tap, and the library shows and plays only what’s downloaded, even with a connection. Stations pick from what’s on your device.',
  'offline.quality.title': 'The quality you want',
  'offline.quality.text':
    'Set separately for Wi-Fi, 4G/5G and downloads, from the original file down to 128 kbps.',
  'rewind.eyebrow': 'Rewind',
  'rewind.title.1': 'Your music,',
  'rewind.title.2': 'looking back.',
  'rewind.lead':
    'Listening time, top artists and albums, genres, favorite hours: a recap to flip through all year long, over 7 days, 30 days, a year or since the very beginning. With Andia Plus.',
  'rewind.private': 'Computed on your device, never sent anywhere.',
  'rewind.example': 'Example figures.',
  'rewind.time.label': 'Listening Time',
  'rewind.time.value': '212h',
  'rewind.time.detail': 'that’s 318 full albums',
  'rewind.time.trend': '+32% on last year',
  'rewind.genres.label': 'Your Sound',
  'rewind.genres.list': 'Rock,Electronic,Jazz,Pop,Folk,Hip-hop',
  'rewind.periods': '7 Days,30 Days,{year},All Time',
  'rewind.hours.label': 'Your Rhythm',
  'rewind.hours.value': 'Evenings',
  'rewind.loop.label': 'On Repeat',
  'rewind.loop.value': '7 plays',
  'rewind.loop.detail': 'of the same song, in a single day',
  'everywhere.eyebrow': 'Everywhere',
  'everywhere.title.1': 'Wherever',
  'everywhere.title.2': 'you go.',
  'everywhere.lead':
    'Lock Screen, AirPlay, widget, Siri: your music follows you across the system. And with Andia Plus, on Apple Watch, even when your iPhone stays at home.',
  'everywhere.watch.title': 'Apple Watch',
  'everywhere.watch.text':
    'Send albums, playlists or your favorites to the watch, then listen with Bluetooth headphones, no iPhone or network needed. Your plays sync back to your server afterwards. With Andia Plus.',
  'everywhere.carplay.title': 'CarPlay',
  'everywhere.carplay.text':
    'Home, albums, artists and playlists on your car’s screen, with shuffle and “Up Next”.',
  'everywhere.soon': 'Coming soon',
  'plus.badge': 'Plus',
  'everywhere.lockScreen': 'Lock Screen and Control Center',
  'everywhere.airplay': 'AirPods, speakers and AirPlay',
  'everywhere.widget': 'Home Screen widget',
  'everywhere.siri': '“Hey Siri, play my favorites on Andia”',
  'everywhere.a11y': 'VoiceOver and larger text sizes',
  'everywhere.home': 'Home',
  'everywhere.albums': 'Albums',
  'everywhere.artists': 'Artists',
  'everywhere.playlists': 'Playlists',
  'everywhere.favorites': 'Favorite Songs',
  'everywhere.recent': 'Recently Added',
  'everywhere.played': 'Recently Played',
  'everywhere.genres': 'Genres',
  'pricing.eyebrow': 'Pricing',
  'pricing.title.1': 'Free.',
  'pricing.title.2': 'And even more with Plus.',
  'pricing.lead':
    'Listening is free, with no subscription and no ads. Andia Plus, a one-time in-app purchase, adds the extras music lovers enjoy.',
  'pricing.free.name': 'Andia',
  'pricing.free.price': 'Free',
  'pricing.free.library': 'Your whole library, search and lyrics',
  'pricing.free.playlists': 'Playlists created and edited on your server',
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
  'pricing.plus.libraries': 'Choose which music libraries to show',
  'pricing.plus.scrobbling': 'Your listens sent to Last.fm and ListenBrainz, even offline',
  'pricing.plus.family': 'Shared with your family, on all your devices',
  'pricing.note': 'Andia Plus is bought in the app (Settings › Purchases & Subscriptions) and restored on your other devices. Prices may vary by country.',
  'pricing.beta.title': 'Want to try it before everyone else?',
  'pricing.beta.text': 'Join the beta on TestFlight. During the beta, Andia Plus is on us: the purchase is simulated and you won’t be charged. This test purchase won’t carry over to the App Store.',
  'pricing.beta.cta': 'Join the Beta',
  'everywhere.watchList': 'On the Watch',
  'list.and': ' and ',
  'list.and.serial': ', and ',
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
  'screenshot.ipad': 'Andia on iPad in portrait: the library home with its stations and categories',
  'screenshot.mac': 'Andia on Mac: the library home in a window',
  'screenshot.nowPlaying': 'The Now Playing screen: artwork, spectrum, format being played and controls',
  'screenshot.library': 'The library home: stations, mood mixes and categories',
  'screenshot.downloads': 'Downloads: albums kept offline',
  'screenshot.lyrics': 'Synced lyrics beneath the playback controls',
  'screenshot.equalizer': 'Ten-band equalizer with the Rock preset',
  'screenshot.album': 'An album page in the colors of its artwork',
  'screenshot.artist': 'An artist page: photo, bio and most played songs',
  'footer.tagline': 'Your music, your server.',
  'footer.jellyfin': 'Andia is not affiliated with the Jellyfin project.',
  'footer.apple':
    'Apple, iPhone, iPad, Mac, macOS, iOS, iPadOS, Apple Watch, CarPlay, AirPlay, AirPods, Siri, VoiceOver, iCloud, Time Machine, TestFlight and App Store are trademarks of Apple Inc., registered in the U.S. and other countries and regions.',
  'footer.privacy': 'Privacy Policy',
  'footer.support': 'Support',
  'footer.legal': 'Legal Notice',
  'footer.nav': 'Footer links',
  'privacy.title': 'Privacy Policy',
  'privacy.description':
    'Andia collects no personal data: what the app sends, to whom, and what stays on your device.',
  'privacy.eyebrow': 'Privacy',
  'privacy.updated': 'Last updated:',
  'privacy.summary.title': 'In short',
  'privacy.summary.noData': 'No data collected',
  'privacy.summary.noTracking': 'No ads, no tracking',
  'privacy.summary.onDevice': 'Stats computed on your device',
  'privacy.summary.yourServer': 'Your music only goes through your server',
  'privacy.toc': 'On this page',
  'privacy.translationNote':
    'This is a translation for your convenience; the French version is the reference.',
  'privacy.back': 'Back to home',
  'support.title': 'Support',
  'support.description': 'Frequently asked questions about Andia, how to reach us, and the legal notice for this website.',
  'support.description.noContact': 'Frequently asked questions about Andia, and the legal notice for this website.',
  'support.eyebrow': 'Support',
  'support.heading': 'Need Help?',
  'support.lead': 'Answers to the most frequent questions, how to reach us, and who publishes this website.',
  'support.lead.noContact': 'Answers to the most frequent questions, and who hosts this website.',
  'support.toc': 'On this page',
  'support.contact.title': 'Contact Us',
  'support.contact.text':
    "A question, a problem, an idea? Write to us, in English or in French. If something isn't working, include your Andia version (Settings › About) and your Jellyfin server version: it helps us understand what's going on.",
  'support.contact.cta': 'Email Support',
  'support.faq.title': 'Frequently Asked Questions',
  'support.faq.server.q': 'Do I need a Jellyfin server?',
  'support.faq.server.a':
    'Yes. Andia plays music from your own Jellyfin server: you need Jellyfin 10.9 or later, and an iPhone running iOS 17 or later. No server yet? Jellyfin is free and open source.',
  'support.faq.server.link': 'Discover Jellyfin',
  'support.faq.free.q': 'Is it free?',
  'support.faq.free.a':
    'Yes: listening to your library, downloads, stations, live radio, the widget and Siri are free, with no subscription and no ads. Andia Plus, a one-time in-app purchase shared with your family, adds Rewind, sending music to your Apple Watch, the equalizer, crossfade, choosing which music libraries to show, and scrobbling your listens to Last.fm and ListenBrainz.',
  'support.faq.offline.q': 'Does it work offline?',
  'support.faq.offline.a':
    "Yes: download your albums, playlists or favorites (the download button on their page, or a long press) and listen without a connection. The library's Offline Mode then shows and plays only what's downloaded.",
  'support.faq.normalization.q': 'Volume normalization makes no difference?',
  'support.faq.normalization.a':
    'It relies on your server’s analysis: Jellyfin 10.9 or later, with the “Audio Normalization” scheduled task run at least once.',
  'support.faq.watch.q': 'Does the Apple Watch connect to my server?',
  'support.faq.watch.a':
    "No: your iPhone downloads the music and sends it to the watch (as 256 kbps MP3, or as is if it's already downloaded on the iPhone as MP3 or AAC). The watch then plays it without your iPhone or a network, with Bluetooth headphones. Sending music to the Apple Watch is part of Andia Plus.",
  'support.faq.certificate.q': 'My server uses a self-signed certificate. Does that work?',
  'support.faq.certificate.a':
    "Yes. The first time you connect, Andia shows you the certificate's fingerprint; once you trust it, that exact certificate is accepted for that server, and only that one. If it ever changes, Andia warns you before going any further.",
  'support.faq.http.q': 'What about a plain http:// server on the internet?',
  'support.faq.http.a':
    "Yes. Andia connects to the address you give it, over http:// or https://, by domain name or IP address. Outside your local network, an http:// connection sends your password and your music unencrypted: Andia warns you before you type your password, then lets you choose. If your server also answers over https://, use that address instead.",
  'support.faq.data.q': 'Is my music sent anywhere?',
  'support.faq.data.a':
    "No. Your music only goes through your server, with no service in between. Only optional services receive anything: the Radio Browser directory (live radio), Discogs (an album's title and artist, for its rating), Ticketmaster (an artist's name, for their concerts) and, if you link an account, Last.fm or ListenBrainz (the title, artist, album and date of your listens).",
  'support.faq.data.link': 'Read the Privacy Policy',
  'support.legal.title': 'Legal Notice',
  'support.legal.publisher': 'Publisher',
  'support.legal.publisherAddressAtHost': 'Address provided to the hosting provider.',
  'support.legal.contact': 'Contact:',
  'support.legal.director': 'Director of Publication',
  'support.legal.host': 'Hosting Provider',
  'support.legal.site': 'This Website',
  'support.legal.siteText':
    "This website sets no cookies, stores nothing in your browser, doesn't measure its audience and loads nothing from any other site. Like any hosting provider, OVH keeps access logs (IP address, page requested, date and time, browser), retained for the legal period of one year. The privacy policy itself is about the app.",
};

export const ui: Record<Lang, Record<UIKey, string>> = { fr, en };

/**
 * Plateformes où l'app est disponible, dans l'ordre où le site les cite : l'iPad, le Mac et
 * CarPlay n'y entrent que le jour où leur réglage de src/config.ts passe à vrai. L'Apple Watch
 * n'y est pas : l'envoi de musique sur la montre est une fonction d'Andia Plus, que le site ne
 * présente qu'avec « Avec Andia Plus. » (audit du 23 octobre, F2).
 */
export function platforms(): string[] {
  return [
    'iPhone',
    ...(IPAD_AVAILABLE ? ['iPad'] : []),
    ...(MAC_AVAILABLE ? ['Mac'] : []),
    ...(CARPLAY_AVAILABLE ? ['CarPlay'] : []),
  ];
}

/**
 * « a et b », « a, b et c » / « a and b », « a, b, and c » : à partir de trois éléments, le
 * dernier se joint par `list.and.serial` (la virgule de série en anglais, rien de plus en
 * français).
 */
function joinList(items: string[], and: string, serialAnd: string) {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')}${items.length > 2 ? serialAnd : and}${items.at(-1)}`;
}

/**
 * Textes d'une langue. Une clé qui a une variante `<clé>.carplay` la donne à la place quand
 * `CARPLAY_AVAILABLE` (src/config.ts) est vrai : d'ici là, le site ne promet CarPlay nulle part,
 * sauf dans la section « Partout » qui le marque « Bientôt ». `{platforms}` devient la liste des
 * plateformes disponibles (« iPhone, iPad et Mac ») et `{devices}` celle des appareils
 * qui font tourner l'app elle-même, avec leur article en français (« l'iPhone et l'iPad »).
 */
export function useTranslations(lang: Lang) {
  const dict = ui[lang];
  const and = dict['list.and'];
  const serialAnd = dict['list.and.serial'];
  const devices = [
    dict['device.iphone'],
    ...(IPAD_AVAILABLE ? [dict['device.ipad']] : []),
    ...(MAC_AVAILABLE ? [dict['device.mac']] : []),
  ];
  const values: Record<string, string> = {
    platforms: joinList(platforms(), and, serialAnd),
    devices: joinList(devices, and, serialAnd),
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
  support: { fr: '/assistance/', en: '/en/support/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type Route = keyof typeof routes;

export function pathFor(route: Route, lang: Lang) {
  return routes[route][lang];
}

// Ancres des sections de la page Assistance, dans chaque langue : le pied de page lie les
// mentions légales, et l'adresse d'assistance donnée à App Store Connect peut viser le contact.
export const supportSections = {
  contact: { fr: 'nous-ecrire', en: 'contact' },
  faq: { fr: 'questions-frequentes', en: 'faq' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
} as const satisfies Record<string, Record<Lang, string>>;
