# Suivi des corrections de l'audit du site du 23 octobre 2026

Le rapport `docs/AUDIT-2026-10-23.md` ne se modifie pas : l'état de chaque constat se tient ici, mis
à jour par la PR qui le traite, dans le même commit. États : **à faire** · **décision** (attend un
choix, noté en note une fois pris) · **en cours** (PR ouverte) · **corrigé** · **infirmé** (avec la
raison) · **reporté** (avec la condition) · **doublon** · **app** (à reporter dans le dépôt de l'app).

Lots (ordre de correction suggéré du rapport) : 1 politique et promesses · 2 qui parle, à qui
écrire · 3 accessibilité et mise en page mesurées · 4 hero et animations sur téléphone · 5 anglais
et vocabulaire de l'app · 6 hébergement, déploiement et CI · 7 dette et outillage · app : dépôt de
l'app. Les décisions se prennent avant les lots 1, 2 et 6 (section « Décisions à prendre » du
rapport). Les prompts de chaque lot, le prompt de contexte du projet de correction et le prompt de
relecture sont dans `docs/AUDIT-2026-10-23-LOTS.md`.

| Lot | Constat | Sévérité | Titre | État | PR | Note |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | L1 | Bloquant | La politique de confidentialité publiée n'est plus celle de l'app | corrigé | #26 | Recopier `docs/PRIVACY.md` et `PRIVACY.en.md` du 22 octobre, `updated: '2026-10-22'` |
| 1 | F1 | Majeur | Tarifs oublie le scrobbling, sixième fonction Plus | corrigé | #26 | |
| 1 | F2 | Majeur | Cinq fonctions Plus présentées sans dire qu'elles sont payantes | corrigé | #26 | Décidé le 23 octobre : « Avec Andia Plus. » (égaliseur, fondu, Rewind, Apple Watch), pastille « Plus » sur « Égaliseur 10 bandes », Apple Watch retirée de `platforms()`, du chapeau du hero et de `og.html` ; images de partage régénérées |
| 1 | F3 | Majeur | La version d'iOS requise n'est dite nulle part | corrigé | #26 | |
| 1 | L4 | Mineur | La ligne des marques ne couvre pas tous les noms Apple employés | corrigé | #26 | |
| 1 | C4 | Mineur | Pastille « Votre musique reste sur votre serveur » inexacte | corrigé | #26 | |
| 2 | L2 | Majeur | Aucune adresse d'assistance ni de contact | reporté | #23 | Reporté : attend domaine/mail. Page `/assistance/` + `/en/support/` publiée par #23 (questions fréquentes, mentions légales) ; « Nous écrire » n'est construite qu'avec `SUPPORT_EMAIL` (à `null` dans `src/config.ts`), à remplir le jour où l'adresse existe |
| 2 | L3 | Majeur | Aucune mention légale | reporté | #23 | Reporté : attend l'identité de l'éditeur. #23 publie l'hébergeur (OVH SAS) et « Ce site » ; éditeur, adresse et directeur de la publication ne paraissent qu'avec `PUBLISHER` (à `null` dans `src/config.ts`) |
| 2 | L5 | Mineur | La politique ne dit rien du site lui-même | corrigé | #23 | Paragraphe « Ce site » dans les mentions légales, hors de la copie de l'app |
| 2 | L8 | Dette | « © 2026 Andia » : titulaire et année | reporté | #23 | Reporté avec L3 : années faites par #23 (« 2026 », puis « 2026–année ») ; le titulaire reste « Andia » tant que `PUBLISHER` est `null` |
| 2 | C5 | Mineur | Pas de questions fréquentes | corrigé | #23 | Les huit questions du README de l'app, réécrites, sur la page Assistance |
| 2 | D2 | Majeur | En maintenance, l'URL de confidentialité répond 503 | corrigé | #23 | `maintenance/.htaccess` laisse passer confidentialité, assistance, `/_astro/`, `/og/`, icônes ; il faut un envoi en mode « site » avant de repasser en maintenance pour que `/assistance/` existe sur le serveur |
| 3 | A1 | Majeur | axe : le texte visible du sélecteur de langue n'est pas dans son nom | corrigé | #27 | |
| 3 | V1 | Majeur | La page Confidentialité déborde à 320 px | corrigé | #27 | Cause mesurée : le chemin `~/Library/Containers/…` du texte, pas la grille du sommaire |
| 3 | A2 | Majeur | Texte blanc des cartes de Stations sous 4,5:1 | corrigé | #27 | Huit cartes : départ et arrivée assombris (même teinte, même saturation), A.12 ✓ sur les douze, ≥ 4,5 dès t = 0,36 |
| 3 | A4 | Mineur | Noms accessibles pauvres des illustrations | corrigé | #27 | Frise : `aria-label` descriptif (`gapless.diagram`) ; libellés des cartes du Rewind en h3 ; VoiceOver à confirmer sur appareil |
| 3 | A6 | Mineur | « Réduire la transparence » sans effet dans Safari ? | à confirmer sur appareil | | Plausible, non retracé (pas d'iPhone dans la session) : noté dans CONVENTIONS (« Règles »), rien à corriger côté code |
| 3 | V2 | Mineur | La pastille « Hors ligne » recouvre la barre d'état de l'iPhone | corrigé | #27 | Au-dessus du cadre, même glissement que l'iPhone : ≥ 9 px de l'écran à 320–1440 px, scroll compris |
| 3 | N6 | Mineur | Apparitions ratées lors d'un défilement rapide | corrigé | #27 | `threshold: 0` et filet à l'arrêt du défilement (déjà dépassé, ou bas de page) |
| 3 | A3 | Mineur | Sous 860 px, le menu disparaît sans remplaçant | corrigé | #27 | Décision du lot : menu `<details>` sous 860 px (ancres, Confidentialité, langue), clé `nav.menu` ; Tarifs en deux gestes à 390 px |
| 3 | A5 | Mineur | Animations de plus de cinq secondes sans pause sur la page | corrigé | #27 | Décision du lot : exemption assumée (décor, tout s'arrête avec « Réduire les animations »), écrite dans CONVENTIONS et CLAUDE.md ; aucun bouton |
| 3 | V3 | Mineur | Pas de feuille d'impression pour la confidentialité | corrigé | #27 | `@media print` dans global.css ; PDF Chromium regardé (clair et sombre) ; Safari à confirmer |
| 4 | N2 | Mineur | Sur téléphone, l'iPhone du hero et ses pastilles s'estompent avant d'être vus | corrigé | #28 | Sortie tirée du `--progress` de `.hero__visual` sous 860 px |
| 4 | V5 | Mineur | La pastille « Enchaînement sans blanc » est coupée entre 861 et ≈ 1 300 px | corrigé | #28 | Borne à 24 px du bord de la fenêtre, en largeur réelle de pastille ; « Égaliseur 10 bandes » (`.chip--br`) avait le même défaut à 870 et 1 000 px |
| 4 | N1 | Mineur | Le point « Bientôt » pulse sans fin dans l'en-tête, hors `data-loop` | corrigé | #28 | Pulsation sous `no-preference`, en `transform` + `opacity` d'un `::after`, dans le hero seulement (`pulse`, `data-loop`) ; l'en-tête garde un point fixe |
| 4 | N3 | Mineur | Si le moteur ne se charge pas, tout `data-reveal` reste invisible | corrigé | #28 | Filet de 3 s plutôt que classe posée par le module (qui clignotait sur réseau lent, mesuré) : choix à confirmer par Romain |
| 4 | N5 | Mineur | Le chapeau du hero est l'élément LCP, retardé par la chorégraphie | corrigé | #28 | = P1. Titre à 0 ms, chapeau à 200 ms, iPhone à 100 ms ; titre en ligne et titre + chapeau dès le premier rendu (opacité 0,3) ; `fetchpriority` retiré de la capture |
| 4 | P1 | Mineur | La chorégraphie du hero coûte du LCP | doublon | #28 | Voir N5 |
| 4 | P2 | Mineur | Spectre et halos tournent en permanence sur le hero | corrigé | #28 | Spectre à 15 i/s planifié par `setTimeout`, `will-change` retiré des 72 barres, arrêt après 30 s sans geste ; dégradé du titre glissé par la boucle (il forçait 60 images/s) ; mesures A.11 dans la PR |
| 4 | P4 | Mineur | Captures un peu floues en densité 3 | corrigé | #28 | Assumé (captures à 590 px), noté dans CONVENTIONS ; `widths` inchangé |
| 4 | N4 | Dette | Survols qui bougent hors de la préférence | corrigé | #28 |  |
| 4 | C2 | Mineur | « Bientôt sur l'App Store » a l'air d'un bouton ; rien pour être prévenu | corrigé | #28 | Décision du lot : verre + filet, sans ombre, `cursor: default`, point qui bat dans le hero seulement ; aucun formulaire, le lien de bêta viendra par `TESTFLIGHT_URL` |
| 4 | C1 | Mineur | La phrase du serveur de démo suppose l'app installée | corrigé | #28 | Phrase construite seulement avec `APP_STORE_URL` ou `TESTFLIGHT_URL` ; « Dès la sortie… » (`jellyfin.demo.soon`) tant que seule la bêta l'est |
| 5 | I1 | Mineur | L'anglais du site s'écarte du catalogue anglais de l'app | corrigé | #24 | Catalogue de l'app clé par clé ; « song » pour morceau partout en anglais, sauf les numéros (« Track 1 ») |
| 5 | I2 | Mineur | `everywhere.siri` différent dans les deux langues | corrigé | #24 | Phrase reconnue de AppShortcuts.xcstrings (« Play my favorites on ${applicationName} ») |
| 5 | I3 | Mineur | « Lock screen » / « Lock Screen » | corrigé | #24 | |
| 5 | I5 | Mineur | 404 : titre, description et langue français seulement | corrigé | #24 | Exception écrite dans CONVENTIONS (« Textes et langues ») |
| 5 | F4 | Mineur | « dès la première lettre » trop fort pour les morceaux | corrigé | #24 | D'après instantMatches : morceaux à la réponse du serveur |
| 5 | F5 | Mineur | « Toujours à jour » : favoris et playlists suivis seulement | corrigé | #24 | D'après AutoDownloads : favoris et playlists téléchargés seulement |
| 5 | F6 | Mineur | Pastilles de période du Rewind ≠ sélecteur de l'app | corrigé | #24 | Décision : 7 jours, 30 jours, année du build, Tout ; « All Time » en anglais, valeur du catalogue (« Tout (période) ») |
| 5 | C3 | Mineur | Aucune espace insécable en français | corrigé | #24 | Le constat comptait 0 insécable (grep sans locale UTF-8) : il y en avait 21, pas partout ; 58 désormais, règle dans CONVENTIONS |
| 5 | I4 | Dette | Virgule de série en anglais | corrigé | #24 | Décision : virgule de série en anglais (list.and.serial), rien en français |
| 6 | D1 | Majeur | Le déploiement accepte n'importe quelle clé d'hôte SFTP | corrigé | #22 | Secret `OVH_KNOWN_HOSTS` à créer avant le prochain déploiement ; FTP chiffré imposé |
| 6 | D3 | Mineur | Aucune Content-Security-Policy | corrigé | #22 | Décidé : stricte en Report-Only, empreintes au build (`scripts/csp.mjs`) ; mode strict après la réouverture (CONVENTIONS) |
| 6 | D4 | Mineur | Types compressés incomplets | corrigé | #22 | = P3 ; `content-encoding` à vérifier en production (A.9) |
| 6 | P3 | Mineur | `mod_deflate` sans xml ni txt | doublon | #22 | Voir D4 |
| 6 | D5 | Dette | CI : droits, outils d'audit, télémétrie, dépendances | corrigé | #22 | Job « Audit » avec A.1, A.2, A.7 ; secret `APP_REPO_TOKEN` à créer (Actions et Dependabot) ; A.7 rouge jusqu'à L1 |
| 6 | D6 | Mineur | Mise en ligne non atomique, pas de retour arrière écrit | corrigé | #22 | Deux `mirror` ; retour arrière dans CONVENTIONS ; essai en mode maintenance à faire |
| 6 | D7 | Dette | `Permissions-Policy` obsolète | corrigé | #22 | `browsing-topics=()` à la place d'`interest-cohort` |
| 6 | D8 | Dette | HSTS sans `includeSubDomains` ni `preload` | reporté | #22 | Décidé : inchangé jusqu'au changement de domaine (CONVENTIONS, « Vérifier et mettre en ligne ») |
| 6 | S1 | Mineur | La 404 déclare l'accueil comme canonique | corrigé | #22 | Ni canonique, ni hreflang, ni `og:url`, ni fiche schema.org sous `noindex` ; contrôlé par le job Audit |
| 6 | S2 | Dette | Fiche schema.org sans `offers` | corrigé | #22 | Décidé : `Offer` à 0 EUR, `OutOfStock` puis `InStock` selon `APP_STORE_URL` (pas `PreOrder` : rien ne se précommande) ; test des résultats enrichis après la réouverture |
| 7 | Q1 | Dette | Quatre clés de texte jamais lues | corrigé | #25 | |
| 7 | Q2 | Dette | Fichiers et dessins morts | corrigé | #25 | `artiste.jpg` employée par F9 ; `recherche.jpg` et `reglages.jpg` supprimées |
| 7 | Q3 | Dette | Commentaires et modèle de partage en retard | corrigé | #25 | |
| 7 | Q4 | Dette | Styles recopiés d'une section à l'autre | corrigé | #25 | `DeviceCard`, `.note`, `.card-row`, `.badge-soon`, `.visually-hidden-narrow` ; rendu identique (captures d'éléments avant / après) |
| 7 | Q5 | Dette | Calculs liés à une capture sans contrôle écrit | corrigé | #25 | `scripts/check-spectrum.mjs` dans `npm run check` ; `cards` de Rewind laissé (quatre articles écrits à la main) |
| 7 | Q6 | Dette | README et CONVENTIONS à tenir à jour | corrigé | #25 | Relus contre le code après ce lot ; assistance (L2) et insécables (C3) laissées aux lots 2 et 5 |
| 7 | F10 | Mineur | Le bloc bêta ne dit pas que l'achat TestFlight ne suit pas | corrigé | #25 | Phrase de `docs/monetisation/TESTFLIGHT.md` de l'app, fr et en |
| 7 | F11 | Dette | Configuration « app en français seulement » contradictoire | corrigé | #25 | Supprimés ; `inLanguage` tiré de `languages` ; variante `francais` retirée de `variants.sh` |
| 7 | V4 | Dette | Favicon sans variante sombre, `icon-dark.svg` inutilisé | corrigé | #25 | Icônes supprimées avec Q2, le favicon reste corail |
| 7 | P5 | Dette | Styles et scripts dans chaque page | corrigé | #25 | Seuil noté : plus de dix pages ou 100 Ko de CSS en ligne |
| 7 | F9 | Mineur | Fonctions marquantes absentes, captures fortes inutilisées | corrigé | #25 | Décision : `artiste.jpg` en cinquième étape de Listen, ligne playlists dans Tarifs › gratuit ; Discogs, anniversaires et Qobuz tus. À reporter dans le dépôt de l'app : `docs/screenshots/en/artiste.jpg` montre la biographie en français, non traduite |
| 7 | L7 | Mineur | Appareils Apple dessinés en CSS | corrigé | #25 | Décision : appareils dessinés conservés, règle écrite dans CONVENTIONS |
| app | F7 | Mineur | Capture du hero en MP3 sous une pastille FLAC ; un seul mix | app | | Serveur de démo : album FLAC, genres pour plusieurs humeurs ; captures à refaire |
| app | F8 | Mineur | Capture anglaise « En lecture » avec un artefact en bas | app | | `docs/screenshots/en/en-lecture.jpg` à refaire |
| app | L6 | Mineur | Serveur de démo : compte, domaine, disponibilité | app | | Plausible : documenter dans `docs/LANCEMENT.md` |
