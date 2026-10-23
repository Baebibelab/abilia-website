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
| 1 | L1 | Bloquant | La politique de confidentialité publiée n'est plus celle de l'app | à faire | | Recopier `docs/PRIVACY.md` et `PRIVACY.en.md` du 22 octobre, `updated: '2026-10-22'` |
| 1 | F1 | Majeur | Tarifs oublie le scrobbling, sixième fonction Plus | à faire | | |
| 1 | F2 | Majeur | Cinq fonctions Plus présentées sans dire qu'elles sont payantes | décision | | Pastille « Plus », phrase par section, Apple Watch retirée de « Pour … » ; images de partage à régénérer |
| 1 | F3 | Majeur | La version d'iOS requise n'est dite nulle part | à faire | | |
| 1 | L4 | Mineur | La ligne des marques ne couvre pas tous les noms Apple employés | à faire | | |
| 1 | C4 | Mineur | Pastille « Votre musique reste sur votre serveur » inexacte | à faire | | |
| 2 | L2 | Majeur | Aucune adresse d'assistance ni de contact | décision | | Page `/assistance/` + `/en/support/` recommandée |
| 2 | L3 | Majeur | Aucune mention légale | décision | | Éditeur, directeur de la publication, hébergeur OVH ; lié au statut DSA |
| 2 | L5 | Mineur | La politique ne dit rien du site lui-même | décision | | Paragraphe « Ce site » hors de la copie de l'app |
| 2 | L8 | Dette | « © 2026 Andia » : titulaire et année | décision | | Avec L3 |
| 2 | C5 | Mineur | Pas de questions fréquentes | décision | | Reprendre le README de l'app |
| 2 | D2 | Majeur | En maintenance, l'URL de confidentialité répond 503 | décision | | Laisser passer `/confidentialite/`, `/en/privacy/` et l'assistance, ou rouvrir avant la soumission |
| 3 | A1 | Majeur | axe : le texte visible du sélecteur de langue n'est pas dans son nom | en cours | | |
| 3 | V1 | Majeur | La page Confidentialité déborde à 320 px | en cours | | Cause mesurée : le chemin `~/Library/Containers/…` du texte, pas la grille du sommaire |
| 3 | A2 | Majeur | Texte blanc des cartes de Stations sous 4,5:1 | en cours | | Huit cartes : départ et arrivée assombris (même teinte, même saturation), A.12 ✓ sur les douze, ≥ 4,5 dès t = 0,36 |
| 3 | A4 | Mineur | Noms accessibles pauvres des illustrations | à faire | | |
| 3 | A6 | Mineur | « Réduire la transparence » sans effet dans Safari ? | à faire | | Plausible : à confirmer sur iPhone avant de corriger |
| 3 | V2 | Mineur | La pastille « Hors ligne » recouvre la barre d'état de l'iPhone | à faire | | |
| 3 | N6 | Mineur | Apparitions ratées lors d'un défilement rapide | à faire | | |
| 3 | A3 | Mineur | Sous 860 px, le menu disparaît sans remplaçant | décision | | |
| 3 | A5 | Mineur | Animations de plus de cinq secondes sans pause sur la page | décision | | Exemption à écrire dans CONVENTIONS, ou bouton |
| 3 | V3 | Mineur | Pas de feuille d'impression pour la confidentialité | à faire | | Plausible : à confirmer par une impression |
| 4 | N2 | Mineur | Sur téléphone, l'iPhone du hero et ses pastilles s'estompent avant d'être vus | à faire | | |
| 4 | V5 | Mineur | La pastille « Enchaînement sans blanc » est coupée entre 861 et ≈ 1 300 px | à faire | | |
| 4 | N1 | Mineur | Le point « Bientôt » pulse sans fin dans l'en-tête, hors `data-loop` | à faire | | |
| 4 | N3 | Mineur | Si le moteur ne se charge pas, tout `data-reveal` reste invisible | à faire | | |
| 4 | N5 | Mineur | Le chapeau du hero est l'élément LCP, retardé par la chorégraphie | à faire | | = P1 |
| 4 | P1 | Mineur | La chorégraphie du hero coûte du LCP | doublon | | Voir N5 |
| 4 | P2 | Mineur | Spectre et halos tournent en permanence sur le hero | à faire | | Mesures de l'outil A.11 dans le rapport |
| 4 | P4 | Mineur | Captures un peu floues en densité 3 | à faire | | Captures à 1 179 × 2 556 côté app, sinon assumer |
| 4 | N4 | Dette | Survols qui bougent hors de la préférence | à faire | | |
| 4 | C2 | Mineur | « Bientôt sur l'App Store » a l'air d'un bouton ; rien pour être prévenu | décision | | Style distinct tout de suite ; lien TestFlight dès qu'il existe |
| 4 | C1 | Mineur | La phrase du serveur de démo suppose l'app installée | à faire | | Avec C2 |
| 5 | I1 | Mineur | L'anglais du site s'écarte du catalogue anglais de l'app | à faire | | Liste dans le constat |
| 5 | I2 | Mineur | `everywhere.siri` différent dans les deux langues | à faire | | |
| 5 | I3 | Mineur | « Lock screen » / « Lock Screen » | à faire | | |
| 5 | I5 | Mineur | 404 : titre, description et langue français seulement | à faire | | |
| 5 | F4 | Mineur | « dès la première lettre » trop fort pour les morceaux | à faire | | |
| 5 | F5 | Mineur | « Toujours à jour » : favoris et playlists suivis seulement | à faire | | |
| 5 | F6 | Mineur | Pastilles de période du Rewind ≠ sélecteur de l'app | à faire | | |
| 5 | C3 | Mineur | Aucune espace insécable en français | à faire | | Règle à écrire dans CONVENTIONS |
| 5 | I4 | Dette | Virgule de série en anglais | décision | | |
| 6 | D1 | Majeur | Le déploiement accepte n'importe quelle clé d'hôte SFTP | à faire | | Secret `OVH_KNOWN_HOSTS` |
| 6 | D3 | Mineur | Aucune Content-Security-Policy | décision | | Report-Only d'abord |
| 6 | D4 | Mineur | Types compressés incomplets | à faire | | = P3 |
| 6 | P3 | Mineur | `mod_deflate` sans xml ni txt | doublon | | Voir D4 |
| 6 | D5 | Dette | CI : droits, outils d'audit, télémétrie, dépendances | à faire | | Job « Audit » avec A.1, A.2, A.7 |
| 6 | D6 | Mineur | Mise en ligne non atomique, pas de retour arrière écrit | à faire | | |
| 6 | D7 | Dette | `Permissions-Policy` obsolète | à faire | | |
| 6 | D8 | Dette | HSTS sans `includeSubDomains` ni `preload` | décision | | Au changement de domaine |
| 6 | S1 | Mineur | La 404 déclare l'accueil comme canonique | à faire | | |
| 6 | S2 | Dette | Fiche schema.org sans `offers` | décision | | |
| 7 | Q1 | Dette | Quatre clés de texte jamais lues | à faire | | |
| 7 | Q2 | Dette | Fichiers et dessins morts | à faire | | Ou utiliser `recherche.jpg` (F9) |
| 7 | Q3 | Dette | Commentaires et modèle de partage en retard | à faire | | |
| 7 | Q4 | Dette | Styles recopiés d'une section à l'autre | à faire | | |
| 7 | Q5 | Dette | Calculs liés à une capture sans contrôle écrit | à faire | | |
| 7 | Q6 | Dette | README et CONVENTIONS à tenir à jour | à faire | | Avec les lots 1, 2, 5 |
| 7 | F10 | Mineur | Le bloc bêta ne dit pas que l'achat TestFlight ne suit pas | à faire | | Visible seulement avec `TESTFLIGHT_URL` |
| 7 | F11 | Dette | Configuration « app en français seulement » contradictoire | à faire | | Supprimer `hero.appLanguage` et `APP_LANGUAGES` |
| 7 | V4 | Dette | Favicon sans variante sombre, `icon-dark.svg` inutilisé | à faire | | Avec Q2 |
| 7 | P5 | Dette | Styles et scripts dans chaque page | à faire | | Noter le seuil dans CONVENTIONS, rien d'autre |
| 7 | F9 | Mineur | Fonctions marquantes absentes, captures fortes inutilisées | décision | | |
| 7 | L7 | Mineur | Appareils Apple dessinés en CSS | décision | | |
| app | F7 | Mineur | Capture du hero en MP3 sous une pastille FLAC ; un seul mix | app | | Serveur de démo : album FLAC, genres pour plusieurs humeurs ; captures à refaire |
| app | F8 | Mineur | Capture anglaise « En lecture » avec un artefact en bas | app | | `docs/screenshots/en/en-lecture.jpg` à refaire |
| app | L6 | Mineur | Serveur de démo : compte, domaine, disponibilité | app | | Plausible : documenter dans `docs/LANCEMENT.md` |
