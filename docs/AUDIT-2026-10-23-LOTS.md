# Prompts des lots de correction de l'audit du site du 23 octobre 2026

Un prompt par lot, à coller tel quel comme premier message d'une conversation du projet de
correction. Le **prompt de contexte** (instructions du projet, à coller une fois dans le projet) est
juste en dessous. Les identifiants renvoient à `docs/AUDIT-2026-10-23.md` ; l'état de chaque constat se
tient dans `docs/AUDIT-2026-10-23-SUIVI.md`. Lots 1 et 2 avant toute soumission de l'app (politique,
assistance, mentions légales, promesses), lots 3 et 4 avant la réouverture du site, 5 à 7 avant le
lancement ou au fil de l'eau ; le lot « app » se traite dans le dépôt de l'app. Le prompt de relecture
d'un lot est en fin de fichier.

Chaque prompt de lot porte une ligne « Décisions prises pour ce lot » : elle reprend la
recommandation du rapport (section « Décisions à prendre »). La remplacer avant de coller si le
choix est autre, ou la supprimer pour laisser le constat en « décision » dans le suivi.

## Prompt de contexte du projet (instructions du projet, à coller une fois)

```
Tu corriges les constats de l'audit `docs/AUDIT-2026-10-23.md` du site d'Andia (dépôt
`Baebibelab/abilia-website`), lot par lot. Chaque conversation de ce projet traite UN lot (une PR),
désigné dans son premier message ; tu ne touches à aucun autre constat, même voisin, et tu ne relis
pas le rapport entier.

Méthode pour chaque lot :
1. Lis `CLAUDE.md`, `docs/CONVENTIONS.md` et `docs/AUDIT-2026-10-23-SUIVI.md` (ton lot, l'état des
   constats, les décisions prises). Extrais du rapport les seules sections de tes constats :
   `grep -n "^#### <ID>\." docs/AUDIT-2026-10-23.md`, puis `sed -n <début>,<fin>p`. Un constat marqué
   « doublon » dans le suivi se corrige avec celui qu'il cite ; cite les deux dans le commit.
2. Pour chaque constat, dans l'ordre donné par le prompt du lot : retrace-le avant de modifier (le
   site a pu bouger, les numéros de ligne ont pu glisser : les noms de fichiers, de clés de `ui.ts`
   et de classes CSS sont l'ancre ; s'il ne tient plus, ne corrige rien et marque-le « infirmé » avec
   la raison). Applique la correction proposée, ou une meilleure que tu justifies en une phrase dans
   la PR. Un constat « décision » ne se corrige que si la décision est écrite dans le suivi ou dans le
   message du lot ; sinon il reste « décision ». Un constat « plausible » se corrige seulement si tu
   le retraces ; sinon il reste « à confirmer sur appareil » dans le suivi.
3. Règles du dépôt, non négociables : code, commentaires et commits en français (`fix: …`,
   `feat: …`, `perf: …`, `docs: …`) ; aucune dépendance côté navigateur, Astro seul au build ; tout
   texte visible dans `src/i18n/ui.ts`, dans les deux langues, l'anglais étant une vraie traduction
   qui suit le glossaire et le catalogue anglais de l'app (`Abilia/Resources/Localizable.xcstrings`
   du dépôt `Baebibelab/abilia` : Title Case pour les titres et les libellés, « song » pour morceau) ;
   tout mouvement sous `prefers-reduced-motion: no-preference`, rien de caché sans JavaScript,
   `data-loop` sur toute boucle ; couleurs par les variables de `src/styles/global.css` ; captures
   par `screenshots(lang)` ; espaces insécables en français devant « : ; ! ? » et entre un nombre et
   son unité. La politique de confidentialité ne se modifie jamais ici seule : elle change d'abord
   dans l'app (`docs/PRIVACY.md`, `docs/PRIVACY.en.md`, `PrivacyPolicyView`), puis se recopie mot pour
   mot (sans le titre ni la ligne de date, la date dans `updated`). Une phrase sur une fonctionnalité
   se corrige d'après l'app (`CLAUDE.md`, `docs/APPSTORE.md`, `docs/monetisation/README.md` du dépôt
   de l'app) ; si c'est l'app ou sa fiche qui a tort, ne corrige pas le site : note « à reporter dans
   le dépôt de l'app » dans le suivi. Le site ne vend rien : jamais de bouton d'achat, jamais de faux
   badge App Store ni de logo Apple. Toute règle qui change met à jour `docs/CONVENTIONS.md` (et
   `CLAUDE.md`) dans la même PR.
4. Avant de pousser : `npm run check` et `npm run build` sans erreur ni avertissement nouveau ; dans
   une copie de travail hors du dépôt (`git archive HEAD | tar -x -C $W/site`, puis `npm ci`), les
   outils de l'annexe A de `docs/AUDIT-TRAME.md` qui couvrent le lot, extraits par la boucle en tête
   de l'annexe : `i18n-check` (A.1) pour tout texte, `dist-check` (A.2) pour toute page ou balise,
   `variants.sh` (A.3) pour ce qui dépend de `src/config.ts`, `browser-pass` (A.4) et `page-strip`
   (A.10, les captures qu'on regarde) pour la mise en page, `axe-pass` (A.5) pour l'accessibilité,
   Lighthouse (A.6) et `idle-cost` (A.11) pour la performance, le diff de la politique (A.7),
   `gradient-contrast` (A.12) pour les cartes de Stations. Playwright et Chromium sont ceux de la
   machine (`PLAYWRIGHT_MODULE=/opt/node-tools/node_modules/playwright/index.mjs`,
   `CHROME_PATH=/opt/pw-browsers/chromium` dans les sessions cloud). Regarde le rendu en clair, en
   sombre, à 390 px, 1024 px et 1440 px, avec animations réduites et sans JavaScript. Les résultats
   (sorties des outils, captures regardées) vont dans la PR.
5. Branche `claude/audit-site-lot-<n>-<sujet>` depuis `main` à jour ; un commit par constat ou par
   groupe cohérent, le message cite les identifiants (`fix: A1 – nom accessible du sélecteur de
   langue (audit du 23 octobre)`). Dans le même commit que la correction, mets à jour la ligne du
   constat dans `docs/AUDIT-2026-10-23-SUIVI.md` : état « en cours » + numéro de PR (puis « corrigé »
   à la fusion, par la relecture). Ne modifie jamais `docs/AUDIT-2026-10-23.md`.
6. Ouvre la PR vers `main` : titre `audit site lot <n> : <sujet>`, corps = tableau constat → ce qui
   a été fait → vérification faite (outil, résultat) → à vérifier sur appareil ; les constats
   infirmés ou reportés avec leur raison. Ne lance jamais le workflow Deploy.
7. Termine par un message court : constats traités, infirmés, reportés, et ce que la relecture doit
   regarder en priorité.
```

## Lot 1 — politique de confidentialité et promesses

```
Lot 1 de l'audit du site du 23 octobre : politique de confidentialité et promesses (la politique
du 22 octobre recopiée de l'app, le scrobbling dans Tarifs, les fonctions Andia Plus annoncées
comme telles, la version d'iOS requise, les marques, la pastille du résumé).
Constats à traiter, dans cet ordre : L1, F1, F2, F3, L4, C4 (voir `docs/AUDIT-2026-10-23-SUIVI.md`,
colonne Lot = 1). Branche : `claude/audit-site-lot-1-politique-promesses`.
Décisions prises pour ce lot : F2 = une phrase courte par section sur le modèle de
`jellyfin.library.text` (« Avec Andia Plus. » / « With Andia Plus. ») pour l'étape « Un égaliseur dix
bandes », la carte « Fondu enchaîné », le chapeau de la section Rewind et la carte Apple Watch ; une
pastille « Plus » sur la pastille « Égaliseur 10 bandes » du hero (même rendu que le badge « Bientôt »,
même clé `everywhere.soon` déclinée en `plus.badge`) ; l'Apple Watch retirée de `hero.platforms`, de
`hero.lead`, de `meta.description` et de la ligne des plateformes de `scripts/og/og.html` (« Pour
iPhone » / « For iPhone »), `platforms()` de `ui.ts` ne la listant plus ; images de partage
régénérées (`node scripts/og/render.mjs` avec le Playwright de la machine).
Contraintes propres à ce lot : L1 d'abord et seul dans son commit (copie mot pour mot de
`docs/PRIVACY.md` et `docs/PRIVACY.en.md` du dépôt de l'app au commit de `main` le plus récent, sans
titre ni ligne de date, `updated: '2026-10-22'` dans les deux ; le diff A.7 doit sortir « fr
identique » et « en identique », et `dist-check` doit voir les nouvelles ancres du sommaire) ; F3 dans
`jellyfin.note` (« Il vous faut un iPhone sous iOS 17 ou plus récent et un serveur Jellyfin 10.9 ou
plus récent… »), traduit ; L4 : « Apple, iPhone, iPad, Mac, macOS, iOS, Apple Watch, CarPlay,
AirPlay, AirPods, Siri, TestFlight et App Store sont des marques d'Apple Inc. » ; C4 : « Votre
musique ne passe que par votre serveur » / « Your music only goes through your server » ; chaque
texte nouveau dans les deux langues, `i18n-check` sans clé sans anglais ; `variants.sh` relancé pour
`tout` et `carplay` (les phrases « Pour … » restent grammaticales sans l'Apple Watch).
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 2 — qui parle, à qui écrire

```
Lot 2 de l'audit du site du 23 octobre : qui parle, à qui écrire (page d'assistance avec contact,
questions fréquentes et mentions légales, le site dans la politique, le titulaire du ©, la politique
joignable pendant la maintenance).
Constats à traiter, dans cet ordre : L2, L3, C5, L5, L8, D2 (voir `docs/AUDIT-2026-10-23-SUIVI.md`,
colonne Lot = 2). Branche : `claude/audit-site-lot-2-assistance`.
Décisions prises pour ce lot : L2 = une page `/assistance/` (fr) et `/en/support/` (en), ajoutée à
`routes` de `ui.ts`, liée depuis le pied de page (et le menu : clé `nav.support`), avec l'adresse
e-mail <ADRESSE À FOURNIR> (écrite via `mailto:` encodé en entités HTML, jamais en clair dans le
texte visible), les questions fréquentes (C5 : les huit du `README.md` de l'app, réécrites pour le
site, dans les deux langues) et une section « Mentions légales » (L3) ; L3 et L8 = éditeur
<NOM, ADRESSE OU « adresse communiquée à l'hébergeur »>, directeur de la publication <NOM>,
hébergeur OVH SAS, 2 rue Kellermann, 59100 Roubaix, France, +33 9 72 10 10 07 ; le « © » du pied de
page au même nom que l'éditeur ; L5 = un paragraphe « Ce site » dans les mentions légales (pas de
cookie, pas de mesure d'audience, journaux d'accès de l'hébergeur avec l'adresse IP, durée légale),
hors du texte copié de l'app ; D2 = `maintenance/.htaccess` laisse passer `/confidentialite/`,
`/en/privacy/`, `/assistance/`, `/en/support/`, `/_astro/`, `/og/` et les icônes pendant la
maintenance (les fichiers du site restent sur le serveur).
Contraintes propres à ce lot : suivre la procédure « Nouvelle page » de `docs/CONVENTIONS.md` (routes,
`src/pages/assistance.astro` et `src/pages/en/support.astro`, `alternates`, `title`, `description`) ;
la page partage la mise en page de la confidentialité (`PrivacyPage.astro` servant de modèle : même
en-tête, même carte en verre, sommaire tiré des titres) ; `sitemap.xml` et `dist-check` doivent la
voir, `axe-pass` sans violation, `page-strip` à 390 et 1440 px regardé ; `docs/CONVENTIONS.md` dit où
vivent l'adresse de contact et les mentions légales, et le § 9 de `docs/AUDIT-TRAME.md` (liste de
contrôle du changement de domaine) ajoute l'URL d'assistance à donner à App Store Connect ; ne
modifie pas `src/content/privacy/*.md` (L1, lot 1).
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 3 — accessibilité et mise en page mesurées

```
Lot 3 de l'audit du site du 23 octobre : accessibilité et mise en page mesurées (sélecteur de
langue signalé par axe, débordement de la confidentialité à 320 px, contraste des cartes de
Stations, noms des illustrations, pastille « Hors ligne », impression, apparitions ratées, menu sur
téléphone, pause des animations).
Constats à traiter, dans cet ordre : A1, V1, A2, A4, V2, N6, V3, A6, A3, A5 (voir
`docs/AUDIT-2026-10-23-SUIVI.md`, colonne Lot = 3). Branche : `claude/audit-site-lot-3-accessibilite`.
Décisions prises pour ce lot : A3 = un bouton « Menu » dans l'en-tête sous 860 px (un `<details>`
ou un bouton `aria-expanded` sans dépendance, qui ouvre les quatre ancres, Confidentialité et la
langue ; clés `nav.menu`, `nav.privacy` déjà présente) ; A5 = exemption assumée (décor, tout
s'arrête avec « Réduire les animations »), écrite dans `docs/CONVENTIONS.md` (« Animations »,
« Règles ») — aucun bouton de pause.
Contraintes propres à ce lot : A1 par un texte visuellement caché complétant « EN » / « FR », sans
`aria-label` ; A2 en assombrissant le départ des dégradés (ou leur point d'origine), jamais par une
ombre de texte seule : `gradient-contrast` (A.12) doit donner ✓ sur les douze cartes et les cartes
doivent rester vives (regarder le rendu à 1440 px, clair et sombre) ; V1 : trouver la vraie cause
dans la grille du sommaire (`auto-fill` + `min(220px, 100%)` dans un ancêtre flexible) et vérifier à
320 px dans les deux langues avec `WIDTHS=320 PAGES=/confidentialite/,/en/privacy/` ; A4 :
`aria-label` descriptif sur la frise de `Gapless` (ou `aria-hidden`), libellés des cartes du Rewind en
`<h3>` ; V2 : la pastille « En ligne / Hors ligne » hors de l'écran de l'iPhone, à toutes les
largeurs ; N6 : `threshold: 0` et révélation forcée des éléments déjà dépassés dans `motion.ts`,
`browser-pass` relancé trois fois sans « texte invisible » ; V3 : un bloc `@media print` minimal dans
`global.css` ; A6 : à ne corriger que si confirmé (sinon noter dans `CONVENTIONS.md` et laisser « à
confirmer sur appareil ») ; `axe-pass` à 0 violation sur les 20 passes, Lighthouse Accessibilité 100
conservé.
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 4 — hero et animations

```
Lot 4 de l'audit du site du 23 octobre : hero et animations (sortie du hero sur téléphone, pastille
coupée sur portable, point qui pulse dans l'en-tête, moteur qui ne charge pas, LCP retardé par la
chorégraphie, coût du spectre, netteté des captures, survols, bouton « Bientôt », phrase du serveur de
démo).
Constats à traiter, dans cet ordre : N2, V5, N5 (P1 est son doublon), P2, N1, N3, N4, P4, C2, C1
(voir `docs/AUDIT-2026-10-23-SUIVI.md`, colonne Lot = 4). Branche : `claude/audit-site-lot-4-hero`.
Décisions prises pour ce lot : C2 = « Bientôt sur l'App Store » prend un style distinct du bouton
principal (fond de verre, bordure, sans ombre portée, `cursor: default`, point qui pulse conservé
dans le hero seulement) ; aucun formulaire ni adresse (le lien TestFlight viendra par
`TESTFLIGHT_URL`) ; C1 = la phrase du serveur de démo n'est construite que si `APP_STORE_URL` ou
`TESTFLIGHT_URL` est renseigné, et son texte commence par « Dès la sortie » tant que seul
`TESTFLIGHT_URL` l'est ; P4 = assumé (captures 590 px), noté dans `docs/CONVENTIONS.md`, pas de
changement de `widths`.
Contraintes propres à ce lot : N2 par une sortie calculée depuis le visuel sous 860 px (un
`data-scroll` sur `.hero__visual`, `--exit` dérivé de son `--progress`), le bureau inchangé ;
vérifier par `page-strip` à 390 px que le deuxième écran montre l'iPhone et les pastilles entières à
pleine opacité ; V5 : borne de `.chip--r` en largeur de pastille, vérifiée à 870, 1000, 1280 et
1440 px (fr et en) ; N5 : titre à 0 ms et visible dès le premier rendu (fondu depuis une opacité non
nulle ou pas de `blur` sur les mots), chapeau à 200 ms, iPhone à 100 ms ; Lighthouse mobile : LCP ≤
1,0 s, élément LCP `h1` ou `img`, score 100 conservé ; P2 : barres du spectre à 15 images par seconde
au plus, `will-change` retiré des 72 barres, arrêt de la boucle après 30 s sans interaction ; `idle-cost`
(A.11) avant et après dans la PR, objectif : moitié des 152 ms/s de tâches au repos sur le hero ;
N1 : `pulse` sous `no-preference`, animé par `transform` et `opacity` d'un pseudo-élément, `data-loop`
sur le bouton du hero ; N3 : la classe `js` posée par `motion.ts` lui-même (plus de script en ligne
dans `Base.astro`), `browser-pass` sans JS toujours propre ; N4 : les deux survols dans un bloc
`no-preference` ; `docs/CONVENTIONS.md` mis à jour pour N3 (« Sans JavaScript ») et P4.
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 5 — anglais et vocabulaire de l'app

```
Lot 5 de l'audit du site du 23 octobre : anglais et vocabulaire de l'app (libellés anglais alignés
sur le catalogue de l'app, Siri, « Lock Screen », 404 bilingue, recherche, « Toujours à jour »,
périodes du Rewind, espaces insécables, virgule de série).
Constats à traiter, dans cet ordre : I1, I2, I3, F4, F5, F6, I5, C3, I4 (voir
`docs/AUDIT-2026-10-23-SUIVI.md`, colonne Lot = 5). Branche : `claude/audit-site-lot-5-anglais`.
Décisions prises pour ce lot : I4 = virgule de série en anglais (« iPhone, iPad, Mac, and Apple
Watch »), rien ne change en français ; F6 = pastilles « 7 jours, 30 jours, <année courante>, Tout »
(« 7 Days, 30 Days, <année>, All »), l'année calculée au build comme le « © ».
Contraintes propres à ce lot : I1 clé par clé contre `Abilia/Resources/Localizable.xcstrings` du
dépôt de l'app (valeurs `en` : « Random Mix », « Not Played in a While », « Never Played », « Feel
Good », « Party », « Mixes », « Favorite Songs », « %lld songs », « Recently Added », « Recently
Played », « On the Watch », « Live Radio », « Songs », « 212h », « Privacy Policy ») ; I2 = « “Hey
Siri, play my favorites on Andia” » ; F4 et F5 reformulés d'après `CLAUDE.md` de l'app
(`instantMatches`, `AutoDownloads`), dans les deux langues ; I5 : titre et description bilingues de
la 404, exception documentée dans `docs/CONVENTIONS.md` ; C3 : insécables (`U+00A0`) dans tout le
dictionnaire `fr` de `ui.ts` et dans `PLUS_PRICE` de `config.ts`, apostrophes droites partout en
français, règle écrite dans `docs/CONVENTIONS.md` (« Textes et langues ») ; `i18n-check` sans clé
sans anglais ni repères différents, rendu à 320 et 390 px regardé (aucune ligne ne commence par
« : », « € » ou « % »), `variants.sh` relancé pour `tout` (phrases « For … »).
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 6 — hébergement, déploiement et CI

```
Lot 6 de l'audit du site du 23 octobre : hébergement, déploiement et CI (clé d'hôte SFTP, CSP,
types compressés, droits et outils d'audit en CI, mise en ligne non atomique, Permissions-Policy,
HSTS, canonique de la 404, fiche schema.org).
Constats à traiter, dans cet ordre : D1, D5, D4 (P3 est son doublon), D6, D7, S1, D3, S2, D8 (voir
`docs/AUDIT-2026-10-23-SUIVI.md`, colonne Lot = 6). Branche : `claude/audit-site-lot-6-hebergement`.
Décisions prises pour ce lot : D3 = une Content-Security-Policy stricte en
`Content-Security-Policy-Report-Only` dans `public/.htaccess` (`default-src 'none'; img-src 'self'
data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'sha256-…' ; base-uri 'none';
form-action 'none'; frame-ancestors 'none'`), les empreintes des scripts en ligne calculées à chaque
build par un petit script de `scripts/` appelé par `npm run build`, et documentée pour passer en mode
strict après la réouverture ; S2 = `offers` ajouté au JSON-LD (`@type: Offer`, `price: "0"`,
`priceCurrency: "EUR"`, `availability` selon `APP_STORE_URL`) ; D8 = HSTS inchangé jusqu'au
changement de domaine (noter dans `docs/CONVENTIONS.md`, constat « reporté »).
Contraintes propres à ce lot : D1 par un secret `OVH_KNOWN_HOSTS` (documenté en tête de
`deploy.yml` avec la commande `ssh-keyscan`), `set sftp:auto-confirm no`, `ftp:ssl-force yes` et
`ssl:verify-certificate yes` pour l'offre FTP ; D5 : `permissions: { contents: read }` dans les deux
workflows, `ASTRO_TELEMETRY_DISABLED: 1`, un job « Audit » de `ci.yml` qui extrait de la trame et lance
`i18n-check`, `dist-check` et le diff A.7 contre un checkout partiel de `Baebibelab/abilia`
(`docs/PRIVACY.md` et `docs/PRIVACY.en.md` seulement, avec un jeton en lecture si le dépôt est privé :
documenter le secret), `dependabot.yml` npm hebdomadaire ; D6 : deux `mirror` (d'abord `_astro/`,
puis le reste) et la procédure de retour arrière écrite dans `docs/CONVENTIONS.md` ; D4 :
`application/xml text/xml text/plain application/manifest+json` ; D7 : `browsing-topics=()` ;
S1 : plus de `canonical`, `hreflang` ni `og:url` quand `noindex` est vrai, `dist-check` le confirme.
Tu ne peux pas tester OVH : relis `.htaccess` contre la documentation d'Apache 2.4 (fusion des
sections, `Header always`), et liste dans la PR ce que A.9 doit vérifier en production. Ne lance
jamais le workflow Deploy.
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot 7 — dette et outillage

```
Lot 7 de l'audit du site du 23 octobre : dette et outillage (clés et fichiers morts, commentaires
et modèle de partage, styles recopiés, calculs liés aux captures, docs, bloc de la bêta,
configuration « app en français », favicon, styles dans la page, captures et fonctions absentes,
appareils dessinés).
Constats à traiter, dans cet ordre : Q1, Q2, Q3, Q4, Q5, F10, F11, V4, Q6, P5, F9, L7 (voir
`docs/AUDIT-2026-10-23-SUIVI.md`, colonne Lot = 7). Branche : `claude/audit-site-lot-7-dette`.
Décisions prises pour ce lot : F9 = la capture `artiste.jpg` (et `en/artiste.jpg`) de l'app ajoutée
à `src/assets/screenshots/` et à `screenshots(lang)`, montrée dans la carte « Toute votre
bibliothèque » de `Jellyfin.astro` ou comme cinquième étape de `Listen` (« Les pages d'artiste » :
photo, biographie traduite sur l'appareil, concerts), au choix du rendu le plus beau à 390 et
1440 px ; une ligne « Playlists créées et modifiées sur votre serveur » dans Tarifs › gratuit ; le
reste (Discogs, anniversaires, Qobuz) reste tu ; L7 = appareils dessinés conservés, décision notée
dans `docs/CONVENTIONS.md` (« jamais de logo Apple, dessins stylisés sans nom de modèle ») ; F11 =
`hero.appLanguage`, `APP_LANGUAGES` et le bloc `hero__language` supprimés, `docs/CONVENTIONS.md` et
`variants.sh` de la trame (variante `francais`) mis à jour ; V4 = `src/assets/icon.svg` et
`icon-dark.svg` supprimés (le favicon reste corail).
Contraintes propres à ce lot : Q2 supprime `recherche.jpg` et `reglages.jpg` (fr et en) sauf si F9
les emploie, et les glyphes `wifiOff` et `waveform` ; Q3 : `og.html` lit la capture selon `lang` et
la ligne des plateformes depuis `platforms()` de `ui.ts` (par `render.mjs`), commentaires corrigés
(`.jpg`, ancres de `Section.astro`), police « Inter » retirée ; Q4 : un composant `DeviceCard.astro`
partagé par `BigScreens` et `Everywhere`, classes `.note` et `.badge-soon` dans `global.css`,
`.visually-hidden` pour `.hero__name` — aucun changement de rendu (comparer les captures A.10 avant
et après) ; Q5 : un script `scripts/check-spectrum.mjs` qui lit `en-lecture.jpg` (fr et en), vérifie
la couleur et la ligne des points contre les constantes de `PhoneSpectrum.astro`, lancé par `npm run
check` ; F10 : la phrase « Cet achat de test ne suivra pas sur l'App Store » dans
`pricing.beta.text` ; P5 : seuil noté dans `docs/CONVENTIONS.md` ; Q6 : README et CONVENTIONS relus
contre le code après ce lot ; `i18n-check` sans « jamais lue », la boucle « jamais importée » du § 6
de la trame sans résultat, `npm run check` et `build` verts, `screenshots-check` ✓ sur les nouvelles
captures.
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

## Lot « app » — à traiter dans le dépôt de l'app (projet de correction de l'app)

```
Trois constats de l'audit du site du 23 octobre (dépôt `Baebibelab/abilia-website`,
`docs/AUDIT-2026-10-23.md`, lignes « app » de `docs/AUDIT-2026-10-23-SUIVI.md`) relèvent du dépôt de
l'app : F7, F8 et L6. Extrais leurs sections du rapport du site (`grep -n "^#### F7\." …`).
À faire ici, dans une PR `claude/site-audit-captures` : F7 — un album libre de droits en FLAC (24 bits
si possible) sur le serveur de démo pour la piste en cours des captures, et des genres couvrant au
moins trois humeurs de `RadioStation.Mood` ; F8 — refaire `docs/screenshots/en/en-lecture.jpg` dans
le même état que la française (sans badge ni coche en bas de l'écran) ; puis refaire `en-lecture`,
`bibliotheque` et `paroles` dans les deux langues avec la recette de `docs/LANCEMENT.md` §7 (serveur de
démo, `simctl status_bar override --time 9:41`, 590 × 1282 pour le site), et noter dans
`docs/LANCEMENT.md` qu'elles sont à recopier dans `src/assets/screenshots/` du site (images de partage
à régénérer là-bas). L6 — documenter le serveur de démo dans `docs/LANCEMENT.md` §7 : domaine
(`demo.andia-music.app` aujourd'hui, ce qu'il devient au changement de nom), certificat public,
droits du compte `demo` (mot de passe non modifiable, pas de suppression, ce que voient les autres
visiteurs), surveillance de disponibilité. Rien d'autre ne change dans l'app. Reporte l'état des trois
constats dans le suivi du site une fois la PR fusionnée (note « fait dans abilia#<PR> »).
```

## Prompt de relecture d'un lot (autre modèle ou autre session)

```
Relis la PR #<numéro> (lot <n> de l'audit `docs/AUDIT-2026-10-23.md` du site d'Andia) constat par
constat. Pour chaque constat du lot (colonne Lot = <n> de `docs/AUDIT-2026-10-23-SUIVI.md`) :
1. extrais sa section du rapport ; 2. vérifie dans le diff que la cause est corrigée (pas seulement
le symptôme, et dans les deux langues) et que la vérification demandée par le constat a été faite
(outil de l'annexe A cité, résultat dans la PR) ; 3. cherche ce que la correction peut casser :
autres largeurs (320, 390, 1024, 1280, 1440 px), thème sombre, animations réduites, sans JavaScript,
configurations futures de `src/config.ts` (`variants.sh`), l'autre langue, la cohérence avec l'app
(`CLAUDE.md`, `docs/APPSTORE.md`, `docs/monetisation/README.md` du dépôt `Baebibelab/abilia`), les
règles de `docs/CONVENTIONS.md` (textes dans `ui.ts`, mouvements sous `no-preference`, `data-loop`,
couleurs par variables, insécables) et `CONVENTIONS.md` lui-même à mettre à jour ; 4. relance dans une
copie de travail hors du dépôt `npm run check`, `npm run build`, puis les outils de l'annexe A
concernés par le lot (`i18n-check`, `dist-check`, `axe-pass`, `browser-pass`, `page-strip` regardé,
Lighthouse ou `idle-cost` pour un lot de performance, le diff A.7 pour la politique,
`gradient-contrast` pour Stations) ; 5. vérifie que le suivi est à jour (état « en cours », numéro de
PR) et que `docs/AUDIT-2026-10-23.md` n'a pas été modifié.
Rends : par constat, « corrigé / partiel / faux / cassant » avec la ligne du diff en cause ; les
remarques bloquantes d'abord ; puis ce qu'il faut vérifier sur appareil avant de fusionner (Safari
sur iPhone, VoiceOver, production après la réouverture pour le lot 6).
Ne modifie rien : les corrections reviennent à la session du lot. Après la fusion, passe les lignes
du lot à « corrigé » (ou « infirmé » / « reporté » avec la note) dans le suivi, sur `main`, dans un
commit `docs: suivi de l'audit du site, lot <n> fusionné`.
```
