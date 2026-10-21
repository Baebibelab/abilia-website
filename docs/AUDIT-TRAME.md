# Trame d'audit du site d'Andia

Comment auditer le site vitrine d'Andia de A à Z, de façon reproductible : quoi chercher, où,
comment, et sous quelle forme rendre les constats. Elle reprend la méthode de `docs/AUDIT-TRAME.md`
du dépôt de l'app (`Baebibelab/abilia`), adaptée à un site statique : ici, on peut construire le
site, le servir et l'ouvrir dans un vrai navigateur, donc l'audit **mesure** ce qu'il peut au lieu
de le supposer.

À dérouler avant la fin de la maintenance (nouveau domaine), avant le lancement de l'app sur l'App
Store, puis après chaque changement important : nouvelle section, fonctionnalité de l'app annoncée,
changement de prix ou de plateforme, refonte d'une animation. Les rapports vont dans
`docs/AUDIT-<AAAA-MM-JJ>.md`, avec leur suivi `docs/AUDIT-<AAAA-MM-JJ>-SUIVI.md`, puis dans
`docs/archive/` une fois clos.

Aucun audit du site n'a encore été mené (trame créée le 21 octobre 2026) : le premier part de zéro,
tout se lit et rien ne se présume sain. **Pour lancer un audit, le prompt prêt à coller est au § 10.**

## 1. Principes

- **Lecture seule, puis correction à part.** L'audit ne modifie rien : il écrit son rapport et son
  suivi, et aucun autre fichier du dépôt, pas même une faute de frappe (elle devient un constat). Il
  ne déploie pas, ne lance pas le workflow Deploy, ne touche ni à l'hébergement OVH ni aux réglages
  du dépôt, et n'ouvre ni issue ni PR. Les essais (build, configurations futures, outils de
  l'annexe A) se font dans une copie de travail hors du dépôt. Les corrections viennent ensuite,
  par lots (§ 4 bis) : mélanger les deux fait perdre la vue d'ensemble.
- **Le site promet, l'app tient.** La vérité sur les fonctionnalités est dans le dépôt de l'app, à
  un commit noté en tête du rapport : `CLAUDE.md` (le comportement réel), `README.md`,
  `docs/APPSTORE.md` (la fiche : le site ne promet rien de plus qu'elle), `docs/monetisation/`
  (gratuit ou Andia Plus, prix, bêta), `docs/PRIVACY.md` et `docs/PRIVACY.en.md`,
  `docs/LANCEMENT.md` (ce qui n'est pas encore sorti : CarPlay, iPad, Mac, nouveau domaine),
  `docs/ROADMAP.md` (ce qui est prévu, donc pas encore à promettre), `docs/STATISTIQUES.md`
  (Rewind), et le code en cas de doute. Une phrase du site fausse dans l'app d'aujourd'hui est un
  constat ; une fonction marquante de l'app absente du site aussi (omission, souvent une décision).
- **Un constat = un endroit et une preuve.** Il cite `fichier:lignes` et dit où il se voit : page,
  langue, largeur, thème, préférence (animations réduites, transparence réduite, sans JavaScript),
  navigateur. La preuve est un extrait de code, une sortie de commande, une mesure ou une capture
  décrite. Une impression sans preuve n'est pas un constat : elle va dans « Zones fragiles » ou
  « À vérifier sur appareil ».
- **Vérifié, mesuré ou plausible.** *Vérifié* : lu dans le code ou dans `dist/`, chemin tracé.
  *Mesuré* : obtenu par un outil de l'annexe A, commande citée, reproductible ; les chiffres de
  performance d'un conteneur sont indicatifs (médiane de trois passages, à comparer entre eux plus
  qu'à l'absolu). *Plausible* : dépend d'un vrai navigateur, d'un appareil ou de l'hébergeur
  (Safari sur iPhone, VoiceOver, Android d'entrée de gamme, Apache d'OVH) ; à confirmer avant de
  corriger.
- **Lire en entier, dans les deux langues.** Chaque fichier de `src/` se lit du début à la fin, et
  chaque texte de `src/i18n/ui.ts` en français *et* en anglais. Les défauts de ce site se cachent
  dans une règle CSS hors de `prefers-reduced-motion`, un `--progress` absent sans JavaScript, une
  variante `.carplay` oubliée, une phrase anglaise qui promet autre chose que la française.
- **`CLAUDE.md` et `docs/CONVENTIONS.md` sont le contrat du code.** Toute divergence entre eux et le
  code est un constat : un bug, ou une documentation fausse (dette, à corriger aussi).
- **Auditer aussi l'avenir.** Une partie du site dort derrière les réglages de `src/config.ts`
  (CarPlay, iPad, Mac, lien App Store, bêta, prix, serveur de démo, langues de l'app). Chaque
  configuration qui arrivera un jour se construit et se relit (zone 1, point 5) : sinon, c'est le
  jour du lancement qui découvre les défauts.
- **Dire ce qui a été exécuté.** Le rapport dit en tête : commit du site, commit de l'app de
  référence, version de Node, outils lancés avec leurs versions, et ce qui n'a pas pu l'être (pas
  de Safari, pas d'appareil, pas de réseau, production en maintenance).
- **Re-vérifier les corrections précédentes.** À partir du deuxième audit, une correction
  incomplète ou une régression depuis le précédent est un constat ; ce qui est correctement corrigé
  n'est pas relisté.

## 2. Sévérités

| Sévérité | Définition | Délai |
| --- | --- | --- |
| **Bloquant** | La mise en ligne ou la soumission de l'app échoue, ou devient risquée : build ou déploiement en échec ; URL de confidentialité ou d'assistance absente, injoignable, ou dont le texte diffère de celui de l'app ; page vide ou illisible sans JavaScript ou dans un navigateur courant ; lien d'achat, faux badge ou logo Apple (guideline 3.1.1, règles marketing d'Apple) ; secret publié ; fausse promesse sur ce qui fonde l'app (serveur Jellyfin requis, hors ligne, gratuité). | Avant toute mise en ligne. |
| **Majeur** | Un visiteur le rencontre dès sa première visite, ou il est trompé : fonctionnalité annoncée absente, payante présentée comme gratuite (ou l'inverse), plateforme pas encore sortie présentée comme disponible, condition passée sous silence ; une section inaccessible au clavier ou au lecteur d'écran, texte courant sous 4,5:1 ; défilement horizontal ou texte coupé à 390 px ; LCP > 2,5 s ou CLS > 0,1 en mobile ; une langue incomplète ou qui contredit l'autre ; référencement cassé (canonique, hreflang, `noindex`, page inconnue servie en 200) ; appel à l'action qui ne mène nulle part. | Avant la réouverture du site. |
| **Mineur** | Gênant, visible, sans tromper : vocabulaire différent de celui de l'app, traduction maladroite, typographie, texte alternatif imprécis, animation gênante (mais coupée par « Réduire les animations »), élément décoratif qui déborde, perte de performance modérée. | Avant le lancement de l'app. |
| **Dette** | Sans effet visible : code, image ou clé de texte morts, commentaire ou doc faux, convention non suivie, fragilité qui attend la prochaine modification, outil de vérification manquant. | Quand on touche la zone. |

Un constat de **confidentialité, de légalité ou de sécurité** (requête vers un tiers, cookie ou
stockage, mention légale manquante, politique désynchronisée de l'app, en-tête de sécurité absent
qui expose, déploiement attaquable) est au moins **Majeur**, quel que soit son effet visible.

## 3. Format d'un constat

````
#### F3. Titre court à l'indicatif — Majeur, vérifié
`src/i18n/ui.ts:138` · `src/components/home/sections/Offline.astro:62` — accueil fr et en, toutes largeurs
**Constat.** Ce que dit ou fait le site, et ce qui le contredit (source : `Abilia/…:lignes` de l'app, une doc, une mesure).
**Effet.** Ce que le visiteur croit, voit, ou ne peut pas faire.
**Correction.** Quoi changer, précisément (fichier, clé de texte, règle CSS), sans l'implémenter ; « décision » quand c'est un choix produit, avec les options.
**Vérification.** Comment prouver la correction : commande, grep, outil de l'annexe A et résultat attendu, ou « manuel : … ».
````

Préfixes par zone : **F** fonctionnalités et cohérence avec l'app, **C** clarté et contenu,
**I** langues, **A** accessibilité, **V** mise en page et navigateurs, **N** animations,
**P** performance, **S** référencement et partage, **L** légal, confidentialité et App Store,
**D** hébergement, déploiement et sécurité, **Q** code et documentation. Les numéros ne sont jamais
réattribués dans un même rapport. Les constats sont des titres de niveau 4 (`#### F3.`), pour que
`grep -n "^#### F3\." docs/AUDIT-<date>.md` les retrouve.

## 4. Déroulé

0. **Préparer (15 min).** Les deux dépôts côte à côte, l'app servant de référence :

   ```bash
   git -C ../abilia log -1 --format='%h %cs %s'   # commit de l'app, noté en tête du rapport
   git log -1 --format='%h %cs %s'                # commit du site
   node -v                                        # .nvmrc : 22 (engines : >= 22.22.0)
   W=<dossier de travail hors du dépôt>           # le scratchpad de la session
   mkdir -p $W/site $W/tools && git archive HEAD | tar -x -C $W/site
   cd $W/site && npm ci && npm run check && npm run build   # durée et avertissements : à noter
   npx astro preview --port 4321 &                # sert dist/ (sans le .htaccess d'Apache)
   ```

   Extraire les outils de l'annexe A dans `$W/tools` (la boucle en tête de l'annexe, lancée depuis
   la racine du site). Ils supposent Playwright et Chromium
   (préinstallés dans les sessions cloud de Claude Code : `/opt/node-tools/node_modules/playwright`,
   `/opt/pw-browsers/chromium`), axe-core et Lighthouse (installés par `npm` / `npx` dans `$W`) ; ce
   qui manque se dit dans le rapport. `astro preview` n'applique pas `public/.htaccess` :
   redirections, en-têtes, cache et page 404 d'Apache se vérifient à la lecture (zone 10), et en
   production une fois le site rouvert (annexe A.9).
1. **Cadrage (15 min).** `git log --oneline <dernier audit>..HEAD` et les PR fusionnées depuis ;
   `CLAUDE.md`, `docs/CONVENTIONS.md` et `README.md` du site ; dans l'app, les documents du § 1
   (deuxième principe) et `git -C ../abilia log --oneline --since=<date du dernier audit>` pour les
   fonctionnalités ajoutées, renommées ou retirées depuis. Le verdict et le suivi du rapport
   précédent, s'il y en a un. Les zones nouvelles ou très modifiées se lisent en premier.
2. **Tableau des promesses (45 min, le cœur de la zone 1).** Une ligne par affirmation vérifiable
   du site : chaque clé de `ui.ts` qui énonce un fait (fonction, chiffre, plateforme, prix, version,
   limite, condition), chaque visuel qui montre l'app (captures, dessins CSS de CarPlay, de la
   montre et d'`AppMock`, cartes de `Stations` et de `Rewind`, frise de `Gapless`, carte de
   téléchargement d'`Offline`), le JSON-LD, le texte de l'image de partage, les textes alternatifs.
   Colonnes : n°, clé ou élément, texte (français, abrégé), l'anglais dit-il la même chose, source
   dans l'app (fichier ou doc), verdict — **✔** exact, **≈** imprécis ou trop fort, **✘** faux,
   **⏳** pas encore sorti, **€** fonction d'Andia Plus présentée sans le dire, **?** invérifiable —,
   constat lié. Le tableau entier va dans le rapport (annexe) : il prouve que chaque phrase a été
   confrontée à l'app.
3. **Lecture par zone (en parallèle s'il y a plusieurs relecteurs).** Onze zones, chacune avec ses
   fichiers, son contrat et ses points de contrôle (§ 5). Chaque relecteur rend ses constats au
   format du § 3, plus : points sains, zones fragiles, trous d'outillage.
4. **Mesures (1 h).** Les outils de l'annexe A, dans cet ordre : `i18n-check`, `dist-check`,
   `screenshots-check`, les configurations futures (`variants.sh`, puis `dist-check` et une lecture
   de chaque `dist-<variante>/`), `browser-pass` (matrice complète, captures dans `$W/shots`,
   **regardées** une par une aux largeurs 390 et 1440, clair et sombre), `axe-pass`, Lighthouse
   (quatre pages, mobile et bureau, trois passages, médiane). Les sorties brutes restent dans `$W` ;
   le rapport reprend les tableaux et les lignes en défaut.
5. **Parcours de compréhension (30 min, zone 2).** Les personas et les huit questions du visiteur,
   en lisant le site comme eux, à 390 px puis à 1440 px, en français puis en anglais.
6. **Vérification croisée.** Chaque constat Bloquant ou Majeur est retracé par quelqu'un d'autre
   que son auteur (autre agent, autre session) ; un constat qui ne se retrace pas redescend en
   « plausible », ou disparaît.
7. **Transversal.** Les greps du § 6, en une fois ; chaque résultat inattendu est expliqué ou
   devient un constat.
8. **Rapport.** Un seul fichier `docs/AUDIT-<AAAA-MM-JJ>.md` selon le gabarit du § 8, et son suivi
   `docs/AUDIT-<AAAA-MM-JJ>-SUIVI.md` (une ligne par constat, lots proposés).
9. **Correction, plus tard.** Par lots (§ 4 bis), chaque PR citant ses constats (`F3`, `A7`…). Le
   rapport ne se modifie plus une fois publié ; l'état de chaque constat vit dans le suivi. Le
   rapport et son suivi sont archivés ensemble quand tout ce qui est Bloquant et Majeur y est
   corrigé, infirmé ou reporté par décision.
10. **Mise à jour de la trame.** Tout constat qui a surpris (une classe de défaut qu'aucun point de
    contrôle ne visait) ajoute un point ici ; tout outil de l'annexe A qui a menti (faux positif,
    faux négatif) se corrige ici. C'est ce qui rend l'audit suivant meilleur.

## 4 bis. Corriger par lots, une session par lot

Un rapport d'audit touche toutes les zones : le corriger dans une seule conversation noie le
contexte et rend la relecture impossible. La règle, celle de l'app :

- **Un lot = une PR = une session de correction, sans mémoire des autres.** Les lots suivent
  l'« ordre de correction suggéré » du rapport et sont listés dans le suivi. Un lot tient en une PR
  relisible : une quinzaine de constats liés au plus, moins quand ils touchent le moteur
  d'animation, `ui.ts` dans les deux langues ou la politique de confidentialité.
- **La session ne lit que ses constats** (`grep -n "^#### <ID>\."` puis `sed -n`), plus `CLAUDE.md`,
  `docs/CONVENTIONS.md` et les fichiers visés.
- **Le rapport ne bouge pas ; le suivi, si**, dans le même commit que la correction.
- **Une relecture par un autre modèle ou une autre session** valide chaque PR avant la fusion.
- **Les décisions d'abord.** Un constat « décision » (page d'assistance, badge « Plus » sur les
  fonctions payantes, langue par défaut, CSP…) ne part en lot qu'une fois tranché ; la décision est
  écrite dans le suivi.

### Instructions de projet (à coller une fois dans le projet de correction)

```
Tu corriges les constats de l'audit `docs/AUDIT-<date>.md` du site d'Andia (dépôt
Baebibelab/abilia-website), lot par lot. Chaque conversation traite UN lot (une PR), désigné dans
son premier message ; tu ne touches à aucun autre constat, même voisin, et tu ne relis pas le
rapport entier.

Méthode pour chaque lot :
1. Lis `CLAUDE.md`, `docs/CONVENTIONS.md` et `docs/AUDIT-<date>-SUIVI.md` (ton lot, l'état des
   constats, les décisions prises). Extrais du rapport les seules sections de tes constats :
   `grep -n "^#### <ID>\." docs/AUDIT-<date>.md`, puis `sed -n <début>,<fin>p`.
2. Pour chaque constat, dans l'ordre de sévérité : retrace-le avant de modifier (le site a pu
   bouger ; s'il ne tient plus, ne corrige rien et marque-le « infirmé » avec la raison). Applique
   la correction proposée, ou une meilleure que tu justifies en une phrase dans la PR. Un constat
   « décision » ne se corrige que si la décision est écrite dans le suivi ou dans le message du lot.
3. Règles du dépôt, non négociables : code, commentaires et commits en français (`fix: …`,
   `feat: …`, `perf: …`, `docs: …`) ; aucune dépendance côté navigateur, Astro seul au build ; tout
   texte visible dans `src/i18n/ui.ts`, dans les deux langues, l'anglais étant une vraie
   traduction ; tout mouvement sous `prefers-reduced-motion: no-preference`, rien de caché sans
   JavaScript, `data-loop` sur toute boucle ; couleurs par les variables de `src/styles/global.css` ;
   captures par `screenshots(lang)`. La politique de confidentialité ne se modifie jamais ici seule :
   elle change d'abord dans l'app (`docs/PRIVACY.md`, `docs/PRIVACY.en.md`, `PrivacyPolicyView`),
   puis se recopie mot pour mot. Une phrase sur une fonctionnalité se corrige d'après l'app
   (`CLAUDE.md`, `docs/APPSTORE.md`, `docs/monetisation/README.md`) ; si c'est l'app ou sa fiche qui
   a tort, ne corrige pas le site : note « à reporter dans le dépôt de l'app » dans le suivi. Toute
   règle qui change met à jour `docs/CONVENTIONS.md` (et `CLAUDE.md`) dans la même PR.
4. Avant de pousser : `npm run check` et `npm run build` sans erreur ; dans une copie de travail,
   les outils de l'annexe A de `docs/AUDIT-TRAME.md` qui couvrent le lot (passe navigateur des pages
   touchées, axe, Lighthouse pour la performance, `i18n-check` pour un texte, `variants.sh` pour ce
   qui dépend de `src/config.ts`) ; rendu clair, sombre, 390 px, 1024 px, animations réduites et
   sans JavaScript. Les résultats vont dans la PR.
5. Branche `claude/audit-site-lot-<n>-<sujet>` depuis `main` à jour ; un commit par constat ou par
   groupe cohérent, le message cite les identifiants (`fix: A3 – navigation au clavier sous 860 px
   (audit)`). Dans le même commit, mets à jour la ligne du constat dans `docs/AUDIT-<date>-SUIVI.md`
   (« en cours » et numéro de PR). Ne modifie jamais `docs/AUDIT-<date>.md`.
6. Ouvre la PR vers `main` : titre `audit lot <n> : <sujet>`, corps = tableau constat → ce qui a
   été fait → vérification faite → à vérifier sur appareil ; les constats infirmés ou reportés avec
   leur raison.
7. Termine par un message court : constats traités, infirmés, reportés, et ce que la relecture doit
   regarder en priorité.
```

### Prompt de lot (un par conversation)

```
Lot <n> de l'audit du site : <sujet du lot>.
Constats à traiter, dans cet ordre : <ID1>, <ID2>, … (voir `docs/AUDIT-<date>-SUIVI.md`, colonne
Lot = <n>). Branche : `claude/audit-site-lot-<n>-<sujet>`.
Décisions prises pour ce lot : <ex. « page Assistance avec l'adresse de contact X »,
« pas de CSP pour l'instant », « badge Plus sur les fonctions payantes »>.
Contraintes propres au lot : <ex. « ne touche pas à src/scripts/motion.ts », « textes à faire
valider avant la fusion »>.
Commence par extraire les sections de ces constats du rapport, retrace chacun, puis corrige dans
l'ordre. Ouvre la PR et mets le suivi à jour comme le demandent les instructions du projet.
```

### Prompt de relecture d'un lot (autre modèle ou autre session)

```
Relis la PR #<numéro> (lot <n> de l'audit `docs/AUDIT-<date>.md` du site) constat par constat.
Pour chaque constat du lot (colonne Lot = <n> de `docs/AUDIT-<date>-SUIVI.md`) :
1. extrais sa section du rapport ; 2. vérifie dans le diff que la cause est corrigée (pas seulement
le symptôme, et dans les deux langues) et que la vérification demandée a été faite ; 3. cherche ce
que la correction peut casser : autres largeurs, thème sombre, animations réduites, sans
JavaScript, configurations futures de `src/config.ts`, l'autre langue, la cohérence avec l'app,
`docs/CONVENTIONS.md` à mettre à jour ; 4. relance `npm run check`, `npm run build` et les outils
de l'annexe A concernés ; 5. vérifie que le suivi est à jour et que le rapport n'a pas été modifié.
Rends : par constat, « corrigé / partiel / faux / cassant » avec la ligne du diff en cause ; les
remarques bloquantes d'abord ; puis ce qu'il faut vérifier sur appareil avant de fusionner.
Ne modifie rien : les corrections reviennent à la session du lot.
```

### Après la fusion d'un lot

- La relecture passe les lignes du lot à « corrigé » (ou « infirmé » / « reporté » avec la note)
  dans le suivi, sur `main`, dans un commit `docs: suivi de l'audit du site, lot <n> fusionné`.
- Les constats « plausibles » gardent « à confirmer sur appareil » dans la note jusqu'à ce que
  quelqu'un l'ait fait.
- Ce qui revient à l'app (« à reporter dans le dépôt de l'app ») est recopié dans
  `docs/LANCEMENT.md` de l'app ou dans une issue de ce dépôt-là, et la note du suivi dit où.
- Quand plus aucune ligne Bloquant ou Majeur n'est « à faire » ou « en cours », le rapport et son
  suivi vont dans `docs/archive/`.

## 5. Les onze zones

Pour chaque zone : les fichiers à lire en entier, le contrat, les points de contrôle. Les points
sont des questions à trancher, pas des constats présumés : une réponse « sain » va dans les points
sains du rapport, qui valent inventaire de ce qu'il ne faut pas casser. Les zones se recoupent
(une promesse fausse est aussi un problème de clarté) : le constat va dans la zone de sa cause, et
les autres le citent.

### Zone 1. Fonctionnalités annoncées et cohérence avec l'app (F)

**Fichiers** : `src/i18n/ui.ts` (en entier, les deux langues), `src/config.ts`,
`src/components/home/Hero.astro`, `src/components/home/sections/*.astro` et
`sections/bigscreens/AppMock.astro`, `src/components/home/hero/spectrum.ts`,
`src/layouts/Base.astro` (JSON-LD), `src/assets/screenshots/` (chaque image, regardée) et son
`index.ts`, `scripts/og/og.html` et `public/og/*.jpg` (regardées). Dans l'app : `CLAUDE.md`,
`README.md` (« Ce que vous pouvez faire avec Andia », « Questions fréquentes »), `docs/APPSTORE.md`,
`docs/monetisation/README.md` et `TESTFLIGHT.md`, `docs/LANCEMENT.md` (§ 0, 3, 4 et 7),
`docs/ROADMAP.md`, `docs/STATISTIQUES.md`, `docs/screenshots/`, `project.yml`, et le code cité
ci-dessous (par `grep` du nom).

**Contrat** : `docs/CONVENTIONS.md` (« Réglages dans src/config.ts », ordre des sections) ;
`docs/monetisation/README.md` (ce qui sert à écouter reste gratuit ; le site dit qu'Andia Plus
existe et son prix, sans bouton d'achat).

**Points de contrôle** :

1. **Tableau des promesses complet** (§ 4, étape 2) : aucune clé factuelle de `ui.ts` sans sa ligne,
   aucun visuel de l'app sans la sienne ; chaque ligne ✘, ≈ ou € est un constat, chaque ⏳ est
   vérifiée par le point 4.
2. **Chiffres, noms et limites**, chacun confronté à sa source dans l'app :
   - serveur « Jellyfin 10.9 ou plus récent » ↔ `isSupportedVersion` ; iOS 17, watchOS 10 et
     macOS 14 ↔ `deploymentTarget` de `project.yml`, le JSON-LD (`operatingSystem`) et
     `screens.mac.text` ; la configuration requise de l'iPhone est-elle dite quelque part, pour un
     humain ?
   - égaliseur « dix bandes, de 31 Hz à 16 kHz, avec des préréglages », « les bandes renforcées
     compensées par une légère baisse du volume » ↔ `AudioEqualizer`, `EqualizerView` (quels
     préréglages, et celui de la capture) ;
   - spectre à 24 bandes (`hero/spectrum.ts`) ↔ `SpectrumAnalyzer` ; format « MP3 · 256 kbps » à
     « FLAC · 24 bits / 96 kHz » ↔ `AudioFormat` (libellés exacts dans les deux langues) ;
   - cache « de 1 à 10 Go au choix, vos favoris en dernier à partir » ↔
     `AppSettings.audioCacheGigabytes`, `AudioCache.protect` ; qualité « réglée à part en Wi-Fi, en
     4G/5G et pour les téléchargements, de l'original jusqu'à 128 kb/s » ↔ `StreamingQuality`
     (`Utilities/Helpers.swift`), `AppSettings.downloadQuality` ;
   - « Toujours à jour : un nouveau cœur, un morceau ajouté à la playlist arrive tout seul » ↔
     `AutoDownloads` (ce qui est suivi, et à quelle condition : téléchargé depuis sa page ? les
     albums ?) ; « un morceau partagé n'est stocké qu'une fois » ↔ `DownloadCollections` ; le mode
     hors ligne « en un geste », et « les stations piochent dans ce qui est sur votre appareil » ↔
     `playsDownloadsOnly`, `LibraryStore.stationTracks` ;
   - stations (« Mix aléatoire », « Pas écoutés depuis longtemps », « Jamais écoutés », décennies)
     et mix par humeur (six noms, dans cet ordre) ↔ `RadioStation`, `RadioStation.Mood` et le
     catalogue de l'app (`Abilia/Resources/Localizable.xcstrings`) : mêmes noms, en français et en
     anglais ; les décennies et les humeurs dépendent de la bibliothèque : le site le dit-il ?
   - « Radio » (« depuis n'importe quel morceau, album ou artiste, ou depuis le morceau en
     cours ») ↔ « Lancer la radio » des menus et d'En lecture ; « Lecture continue » ↔
     `continuesWithRadio` ; radios en direct (« les plus écoutées de votre pays, une recherche par
     nom et vos favorites, avec le titre en cours sur l'écran verrouillé ») ↔ `LiveRadioStore`,
     `LiveStreamTitle`, `NowPlayingInfoController.updateLive` ;
   - fondu enchaîné (« réglable, et jamais à l'intérieur d'un même album ») ↔ `CrossfadePolicy`,
     `AppSettings.crossfadeDuration` ; « les pistes suivantes sont prêtes avant d'arriver » ↔
     préchargement et anticipation de `PlayerStore` ; « volume normalisé, sans saturation » ↔
     `VolumeNormalization`, `PeakLimiter` ; minuterie « après un délai ou à la fin du morceau » ;
     « son propre moteur audio » ↔ `SampleBufferAudioEngine` (moteur par défaut) ;
   - « Un geste sur le mini-lecteur passe au suivant » ↔ glissements du mini-lecteur ; « Un cœur,
     et le morceau est marqué en favori sur votre serveur » ↔ `markFavorite` ; « paroles
     synchronisées » ↔ `LyricsView` (et les paroles non synchronisées ?) ;
   - recherche « instantanée », « dès la première lettre » ↔ `LibraryStore.instantMatches` puis la
     requête : la promesse tient-elle hors ligne et sur une grosse bibliothèque ?
   - « Vos identifiants restent dans le trousseau » ↔ `KeychainStore` (et le nom d'utilisateur dans
     les réglages, d'après la politique) ; « Certificat auto-signé ? Andia vous montre son
     empreinte, puis n'accepte que lui » ↔ `ServerTrust` ; « Pas de compte à créer » ↔ connexion
     directe au serveur ;
   - « Toutes les bibliothèques musicales du serveur s'affichent par défaut ; avec Andia Plus,
     choisissez » ↔ `MusicLibrarySelection`, `PlusFeature.libraries` ;
   - Rewind : périodes (« 7 jours, 30 jours, Cette année, Depuis le début ») ↔ `StatsPeriod` ;
     chaque indicateur des quatre cartes (temps d'écoute « soit N albums entiers », « +N % sur
     l'an dernier », genres en pourcentages, « Moment préféré », « En boucle : N écoutes du même
     morceau, en une journée ») ↔ `ListeningSummary` et `docs/STATISTIQUES.md` : existe-t-il, sous
     ce nom ? « Calculé sur votre appareil, jamais envoyé nulle part » ↔ politique ;
   - Apple Watch (« albums, playlists ou favoris, écouteurs Bluetooth, sans iPhone ni réseau ; vos
     écoutes remontent ensuite à votre serveur ») ↔ `WatchSync`, `WatchPlay` ; CarPlay (onglets et
     lignes dessinés, « lecture aléatoire et À suivre ») ↔ `CarPlaySceneDelegate` ;
   - « Dis Siri, joue mes favoris sur Andia » ↔ phrases d'`AbiliaShortcuts` et
     `Abilia/Resources/AppShortcuts.xcstrings` (la phrase citée est-elle une phrase reconnue ? et en
     anglais ?) ; widget ↔ `AbiliaWidget` ; « VoiceOver et grandes tailles de texte » ↔ section
     « Accessibility » de `CLAUDE.md` ;
   - iPad (« portrait ou paysage, Split View, Slide Over, plusieurs fenêtres ») et Mac (« barre des
     menus, raccourcis clavier, touches multimédia : Espace, ⌘→ ; macOS 14 ») ↔ `AbiliaCommands`,
     `DeviceLayout`, section « Mac » de `CLAUDE.md` ; « Le widget et l'Apple Watch restent sur
     l'iPhone » ↔ `platformFilter` du widget et de la montre dans `project.yml` ; « une seule fiche
     sur l'App Store » ↔ achat universel, `DERIVE_MACCATALYST_PRODUCT_BUNDLE_IDENTIFIER`.
3. **Gratuit et Andia Plus.**
   - Les deux listes de `Pricing.astro` ↔ le tableau « Résumé » de `docs/monetisation/README.md` ↔
     les cas de `PlusFeature` (`Abilia/Core/Store/AbiliaPlus.swift`) : les mêmes fonctions payantes,
     rien de payant dans la colonne gratuite, rien de gratuit présenté comme payant ; ce que la
     monétisation déclare gratuit (CarPlay, iPad et Mac, paroles, playlists…) et que le site tait.
   - Chaque mention d'une fonction Plus hors de « Tarifs » (pastille « Égaliseur 10 bandes » du
     hero, étape « Un égaliseur dix bandes » de `Listen`, « Fondu enchaîné » de `Gapless`, section
     `Rewind`, Apple Watch dans `Everywhere`, choix des bibliothèques dans `jellyfin.library.text`) :
     un visiteur qui ne lit que cette section sait-il que c'est payant ? (verdict **€** ; souvent une
     décision : badge « Plus », mention, ou rien.)
   - Prix : `PLUS_PRICE` ↔ `docs/monetisation/README.md` (7,99 € au lancement, puis 12,99 € ; le
     vrai prix vient de StoreKit) ; « $7.99 » cohérent avec le palier choisi pour les États-Unis ;
     « une fois » / « Achat unique » ; « Partagé avec votre famille, sur tous vos appareils » ↔
     partage familial activé et achat universel (alors que l'iPad et le Mac ne sont pas sortis ?) ;
     « se restaure sur vos autres appareils » ↔ « Restaurer les achats ».
   - Bêta (quand `TESTFLIGHT_URL` est renseigné) : « Andia Plus est offert : l'achat est simulé, rien
     n'est prélevé » ↔ `docs/monetisation/TESTFLIGHT.md` ; dit-il qu'un achat fait en bêta ne suit
     pas sur l'App Store ?
4. **Plateformes et disponibilité.**
   - Chaque réglage de `config.ts` ↔ la réalité (`docs/LANCEMENT.md`) : droit CarPlay accordé ?
     iPad et Mac sortis ? app publiée ? lien TestFlight public ? serveur de démo en ligne, avec de la
     musique libre de droits seulement ?
   - Le site construit ne parle que de ce qui est sorti : `grep -o "CarPlay\|iPad\|Mac\b"` sur
     `dist/index.html` et `dist/en/index.html`, chaque occurrence lue (ligne des marques, « Bientôt »).
   - L'Apple Watch est une fonction Plus, mais elle est dans le chapeau du hero (« jusque sur
     l'Apple Watch »), dans `{platforms}` (« Pour iPhone et Apple Watch »), la description et
     l'image de partage : la promesse est-elle juste pour un utilisateur gratuit ? (décision.)
   - « Bientôt sur l'App Store » tant que l'app n'est pas publiée : aucune date promise ; la phrase
     du serveur de démo (« Dans l'app, connectez-vous… ») alors que l'app ne se télécharge pas
     encore (voir aussi zone 2, point 5).
5. **Configurations futures** (annexe A.3), une par une, dans `dist-<variante>/` : construite sans
   erreur ; textes produits (`{platforms}`, `{devices}`, variantes `.carplay`) justes et grammaticaux
   dans les deux langues (articles, « et » / « and ») ; section « iPad et Mac » présente, avec
   « Bientôt » sur la plateforme pas encore sortie ; `screens.note` / `screens.note.carplay` ;
   JSON-LD (`operatingSystem` quand le Mac sort, `downloadUrl`, `installUrl`), balise
   `apple-itunes-app` ; bouton App Store devenu lien (badge officiel exigé, zone 9, point 6) ; bloc de
   la bêta ; tarifs sans prix ; note Jellyfin sans le serveur de démo ; `hero.appLanguage` affiché
   sur la page anglaise (son texte anglais est-il encore vrai ?). Ce que `config.ts` demande de faire
   à la main ce jour-là (ligne des plateformes de `scripts/og/og.html`, images de partage) figure
   dans les listes de contrôle du § 9.
6. **Captures.**
   - `screenshots-check.sh` (annexe A.8) : chaque capture identique à celle de l'app (hors
     recadrage du Mac), aucune manquante ; les captures de l'app que le site n'utilise pas (omission
     ou choix ?) ; les captures du dossier que `index.ts` n'importe pas (dette, ou oubli).
   - Chaque image regardée, en français et en anglais : l'app d'aujourd'hui (nom Andia, interface
     actuelle), le même écran dans le même état dans les deux langues, de la musique et des
     pochettes libres de droits seulement (serveur de démo, `docs/LANCEMENT.md` § 7), heure 9:41,
     rien de personnel (adresse de serveur, nom d'utilisateur) ; le texte alternatif
     (`screenshot.*`) décrit ce que montre l'image (« avec le préréglage Rock » : visible ?).
   - Le spectre posé sur la capture En lecture (`PhoneSpectrum.astro` : coordonnées en pixels et
     couleur de `dots-cover`, `rgb(75 16 90)`) tombe encore exactement sur la rangée de points de
     `en-lecture.jpg`, française **et** anglaise : rendu du hero à 390 et 1440 px, zoom sur la
     rangée (aucun point visible sous les barres, aucune barre décalée) ; le rapport 590 × 1282 de
     `PhoneFrame` ↔ la taille réelle des captures (`file`), l'îlot dynamique sur la barre d'état.
7. **Dessins et chiffres d'exemple** : CarPlay (onglets « Accueil, Albums, Artistes, Playlists »,
   lignes « Morceaux favoris, Genres, Ajoutés récemment, Écoutés récemment »), montre (« Sur la
   montre »), `AppMock` (tuiles, « Ajoutés récemment », mini-lecteur), carte d'`Offline`
   (« Morceaux favoris · 42 pistes », « En ligne » / « Hors ligne »), cartes de `Stations`, cartes de
   `Rewind` (« Chiffres d'exemple » visible près d'elles, dans les deux langues), frise de `Gapless`
   (« Piste 1 / Piste 2 ») : chaque libellé est celui de l'app (même mot que son catalogue, en
   français et en anglais), ou se lit clairement comme une illustration.
8. **Omissions** : les fonctions du `README.md` et de `docs/APPSTORE.md` de l'app absentes du site
   (notes du public Discogs, concerts Ticketmaster, anniversaires d'albums, édition des playlists,
   paroles et pochettes gardées hors ligne, raccourcis Siri sur un album ou un artiste, rapports de
   performance…) : pour chacune, omission voulue (service facultatif, détail) ou argument perdu
   face aux autres clients Jellyfin (décision, avec la liste).
9. **Fiche App Store ↔ site** : mêmes promesses, mêmes mots pour la même fonction
   (`docs/APPSTORE.md`, français et anglais, iPhone et Mac) ; une affirmation du site absente de la
   fiche est suspecte (la fiche passe en review) ; sous-titre et texte promotionnel de la fiche ↔
   titre et chapeau du hero.
10. **Liens et noms externes** : lien Jellyfin ; serveur de démo (`DEMO_SERVER` : le domaine
    `andia-music.app` face au domaine du site `abilia-music.app` et au plan de changement de nom ;
    joignable, HTTPS valide, `demo` / `demo` accepté, compte en lecture seule — si le réseau le
    permet, sinon « plausible ») ; adresse App Store au bon format le jour venu.
11. **Menu ↔ contenu** : « Fonctionnalités » (`#features`, la section Jellyfin : ce qui suit
    correspond-il au libellé ?), « Hors ligne », « Partout », « Tarifs » ; sections sans entrée de
    menu (Listen, Gapless, Stations, Rewind) : est-ce gênant pour s'orienter ?

### Zone 2. Clarté du message, contenu et rédaction (C)

**Fichiers** : `src/i18n/ui.ts`, l'ordre de `src/components/home/Home.astro`, `Section.astro`,
`Hero.astro`, l'en-tête de `PrivacyPage.astro`, `src/pages/404.astro`, `maintenance/maintenance.html`,
`README.md` du site. Dans l'app : `README.md` (ton, questions fréquentes) et la section
« Localization » de `CLAUDE.md` (glossaire anglais).

**Contrat** : `docs/CONVENTIONS.md` (« Ton : celui du README de l'app, chaleureux et concret, en
vouvoyant ; l'anglais est une vraie traduction, pas un mot à mot ») ; le vocabulaire de l'app
(`docs/AUDIT-TRAME.md` de l'app, zone 6, point 18).

**Points de contrôle** :

1. **Les huit questions du visiteur.** Pour chacune : où est la réponse (section, profondeur en
   écrans à 390 et à 1440 px — `scrollY / innerHeight`), est-elle claire sans jargon, est-elle
   juste ? (1) Qu'est-ce que c'est ? (2) Pour qui, et que me faut-il (un serveur Jellyfin, sa
   version, un iPhone et sa version d'iOS) ? (3) Combien ça coûte, et qu'est-ce qui est payant ?
   (4) Où et quand l'obtenir ? (5) Puis-je essayer sans serveur ? (6) Que deviennent mes données ?
   (7) Qui le fait, et à qui écrire en cas de problème ? (8) Pourquoi celui-ci plutôt qu'un autre
   client Jellyfin ? Une réponse absente, introuvable sans tout lire ou contredite plus bas est un
   constat.
2. **Test des cinq secondes sur le hero** (fr et en, 390 et 1440 px, animations normales puis
   réduites) : que retient-on du titre, du chapeau, des pastilles et du bouton ? Le mot « Jellyfin »
   est-il vu (le titre `<h1>` ne le porte pas, le surtitre si) ? Un visiteur sans serveur
   comprend-il qu'il lui en faut un avant de descendre ? Les pastilles (« FLAC · 24 bits / 96 kHz »,
   « Enchaînement sans blanc », « Hors ligne », « Égaliseur 10 bandes ») parlent-elles à un non-
   audiophile ? Sur téléphone, que reste-t-il au-dessus de la ligne de flottaison ?
3. **Personas** (parcours écrits, dix minutes chacun, à rendre dans le rapport) : l'utilisateur de
   Jellyfin averti venu d'un forum (formats, transcodage, hors ligne, prix, comparaison) ; le
   curieux sans serveur (comprend-il ce qu'est Jellyfin, ce qu'il faut installer, le chemin du
   serveur de démo ?) ; l'anglophone (la page anglaise se lit-elle comme un texte écrit en
   anglais ?) ; la personne qui navigue au lecteur d'écran (le contenu, pas la technique :
   zone 4) ; le relecteur de l'App Store qui ouvre l'URL de confidentialité et celle d'assistance ;
   le journaliste ou le blogueur (résumé, visuels, contact).
4. **Jargon** : relever chaque terme technique de `ui.ts` (Jellyfin, sans blanc / gapless, FLAC,
   24 bits / 96 kHz, kb/s, cache, trousseau, certificat auto-signé, empreinte, normalisation,
   TestFlight, Split View, Slide Over, AirPlay…) : expliqué, évident d'après le contexte, ou opaque
   pour le public visé ? Les termes d'Apple sont-ils les noms actuels et officiels, en français
   (« Centre de contrôle », « écran verrouillé », « écran d'accueil ») et en anglais (« Lock Screen »,
   « Home Screen », « Control Center »), et les fonctions de l'iPad citées existent-elles encore
   sous ce nom dans la version d'iPadOS en cours ?
5. **Appels à l'action** : chacun fait-il quelque chose aujourd'hui ? « Bientôt sur l'App Store »
   n'est pas un lien (comprend-on qu'il ne se touche pas : curseur, survol ?) ; « Découvrir » mène à
   `#features` ; rien ne permet d'être prévenu du lancement (décision : rien, une adresse, un lien
   TestFlight) ; la phrase du serveur de démo suppose l'app installée ; le bloc bêta n'existe que
   si `TESTFLIGHT_URL` est renseigné.
6. **Ordre et rythme** : l'ordre des sections suit-il l'ordre des questions du visiteur (les
   conditions tôt ? les prix à la fin ?) ; longueur de la page (nombre d'écrans à 390 px) ;
   répétitions d'une section à l'autre (hors ligne : pastille du hero, section, tarifs ; égaliseur :
   pastille, étape de `Listen`, tarifs) ; chaque titre de section dit-il un bénéfice ; les surtitres
   et le menu emploient-ils les mêmes mots (« Partout » / « Everywhere »…) ?
7. **Mots absolus** : « jamais saturer », « sans attendre », « instantanée », « dès la première
   lettre », « sûre », « Toujours à jour », « sans limite », « jamais envoyé nulle part » : chacun
   tient-il dans l'app (zone 1) ? Les chiffres d'exemple du Rewind sont-ils plausibles (212 h pour
   318 albums entiers) et présentés comme des exemples ?
8. **Français** : typographie (espaces avant « : ; ! ? », dans « « » », « 7,99 € », « 10 Go »,
   « 31 Hz », « +32 % » — insécables, `U+00A0` ou `U+202F`, pour qu'une ligne ne commence pas par
   « : » ou « € » ; à relever dans `ui.ts` et à vérifier aux largeurs étroites), apostrophes (’ ou ',
   cohérentes), majuscules à la française dans les titres, capitales accentuées (« À suivre »,
   « Écoutez »), accords, vouvoiement constant, ponctuation des listes.
9. **Anglais** : naturel et américain (« favorite », « color », « traveling »), Title Case pour les
   titres et les boutons et sentence case pour les phrases, comme l'app (CLAUDE.md de l'app,
   « Localization ») ; guillemets et apostrophes typographiques ; glossaire de l'app (morceau →
   *song*, piste → *track* seulement pour les numéros et ⏮ ⏭, « À suivre » → *Up Next*, « Lecture
   continue » → *Autoplay*, « Mode hors ligne » → *Offline Mode*) ; chaque phrase anglaise dit la même
   chose que la française, ni plus ni moins (les écarts relevés par paire, comme
   `everywhere.siri` qui cite une phrase en français et non en anglais).
10. **Vocabulaire commun avec l'app** : le site nomme les fonctions comme l'interface de l'app
    (« Lecture continue », « Stations », « Mix », « Radios en direct », « Mode hors ligne »,
    « Rewind », « Andia Plus », « Morceaux favoris », « À suivre », « Réglages › Andia Plus ») : le
    visiteur cherchera ces mots dans l'app. Le chemin cité (« Réglages › Andia Plus ») existe-t-il
    tel quel ?
11. **Pages secondaires** : les quatre pastilles du résumé de la confidentialité (« Aucune donnée
    collectée », « Ni publicité, ni pistage », « Votre musique reste sur votre serveur » — alors que
    le cache et les téléchargements la copient sur l'appareil —, « Statistiques calculées sur
    l'appareil ») sont-elles exactes et fidèles au texte ? La 404 (bilingue) aide-t-elle à
    repartir ? La page de maintenance dit-elle ce qui se passe, dans les deux langues, sans
    promettre de date ?
12. **Ce qui manque** : questions fréquentes (le README de l'app en a), page d'assistance ou de
    contact (exigée par App Store Connect, zone 9), configuration requise, nouveautés, dossier de
    presse : manque réel ou choix assumé (décision) ?

### Zone 3. Langues et traductions (I)

**Fichiers** : `src/i18n/ui.ts` (dont `routes`, `useTranslations`, `platforms()`),
`src/components/Header.astro` (sélecteur), `src/layouts/Base.astro` (`lang`, hreflang,
`og:locale`), `src/pages/404.astro`, `src/content/privacy/*.md`, `src/assets/screenshots/index.ts`,
`src/config.ts` (`APP_LANGUAGES`), `scripts/og/og.html`.

**Contrat** : `CLAUDE.md` du site (« Tout texte visible passe par `src/i18n/ui.ts`, dans les deux
langues ») ; `docs/CONVENTIONS.md` (« Textes et langues »).

**Points de contrôle** :

1. `i18n-check.mjs` (annexe A.1) : clés jamais lues, clés sans anglais, repères `{…}` différents
   entre les deux langues, textes identiques (souvent des noms propres : à relire).
2. Paire par paire, le même sens (zone 2, point 9) : chaque écart est un constat, rangé ici.
3. **Textes hors de `ui.ts`** (greps du § 6) : texte entre balises, `aria-label`, `alt`, `title`
   écrits en dur, chaînes CSS `content: '…'`, nombres et unités assemblés dans le code (le `%` de
   `Rewind.astro`, `toUpperCase()` des codes de langue), dates (`Intl.DateTimeFormat`). Exceptions
   à justifier : noms propres, 404 bilingue par construction (le commentaire de `404.astro` le
   dit-il, et `CONVENTIONS.md` ?).
4. **Attribut `lang`** : `<html lang>` de chaque page, parties dans l'autre langue (`lang="en"` de la
   404, `lang="fr"` du badge « FR » du hero), lien du sélecteur (`hreflang`, `lang`) ; un lecteur
   d'écran prononce-t-il chaque passage dans la bonne langue ?
5. **Sélecteur de langue** : mène à la même page dans l'autre langue (`alternates`) sur chaque page,
   404 comprise ; visible à 320 px ; nom accessible (« English ») contenant le texte visible
   (« EN ») — WCAG 2.5.3 ; aucune redirection automatique selon `Accept-Language` (choix à
   confirmer) ; aucun cookie.
6. **Contenus par langue** : captures françaises et anglaises (mêmes noms, paires complètes, servies
   par `screenshots(lang)`), images de partage (texte de l'image dans la bonne langue), `og:locale`
   et `og:locale:alternate`, `inLanguage` du JSON-LD (langues de l'app, pas de la page : voulu ?),
   note « traduction, le français fait foi » de la politique anglaise (`privacy.translationNote`) —
   encore juste maintenant que l'app a sa politique anglaise ? —, `privacy.translationNote` vide en
   français (voulu).
7. **Listes et variantes** : `{platforms}` et `{devices}` donnent des phrases justes dans chaque
   configuration future (zone 1, point 5) : articles (« l'iPhone, l'iPad et le Mac »), « et » /
   « and », virgule de série (décision) ; chaque clé `.carplay` existe dans les deux langues.
8. **Nombres, monnaies, unités** : « 7,99 € » / « $7.99 », « 10 Go » / « 10 GB », « kb/s » /
   « kbps », « 24 bits » / « 24-bit », « 212 h », « +32 % » / « +32% », « Années 80 » / « The ’80s » ;
   chaque langue suit ses règles, de façon constante.
9. **Langue par défaut** : `defaultLang`, `x-default` vers le français : est-ce le bon choix pour un
   visiteur ni francophone ni anglophone (décision) ? Que voit un visiteur dont le navigateur est en
   anglais et qui arrive sur `/` par un lien partagé ?

### Zone 4. Accessibilité (A)

**Fichiers** : tous les composants ; `src/styles/global.css` (focus, `.visually-hidden`, blocs
`prefers-reduced-motion` et `prefers-reduced-transparency`), `src/layouts/Base.astro` (lien
d'évitement), `Header.astro` (menu masqué sous 860 px), `Section.astro` et `FeatureCard.astro`
(niveaux de titres), `Glyph.astro`, `PhoneFrame.astro` (`alt`), `Listen.astro` (contenu doublé,
scène `aria-hidden`), `Stations.astro` (copie `aria-hidden`), `Gapless.astro` (SVG `role="img"`),
`Rewind.astro`, `Everywhere.astro`, `PrivacyPage.astro`.

**Contrat** : WCAG 2.2 niveau AA ; `docs/CONVENTIONS.md` (« Contraste », « Règles » des animations,
« Repères à garder : aucune erreur axe ») ; l'exigence de l'app (cibles de 44 pt, rien par la seule
couleur).

**Points de contrôle** :

1. **axe** (annexe A.5) sur chaque page, à 390 et 1440 px, en clair et en sombre : zéro violation
   attendue ; chaque résultat « à vérifier à la main » tranché. Contraste remesuré à la main au pire
   endroit, là où axe ne sait pas : texte sur le halo le plus clair, sur le verre, `.gradient-text`
   (chaque extrémité du dégradé contre le fond), `--text-tertiary`, textes corail et sarcelle,
   pastilles posées sur les captures, texte blanc des cartes de `Stations` sur l'extrémité claire de
   leur dégradé, badge « Bientôt », états survolés.
2. **Structure** : un seul `h1` par page ; titres sans saut de niveau (sections en `h2`, cartes en
   `h3`) ; repères (`header`, deux `nav` aux noms distincts, `main`, `footer`) ; listes stylées
   gardant leur sémantique (`role="list"` pour Safari) ; chaque `article` a-t-il un titre ?
3. **Clavier** : parcourir chaque page à la tabulation, à 390 et à 1440 px : lien d'évitement
   visible et efficace (le focus entre dans `main`) ; focus visible sur chaque élément actif, sur le
   verre et en sombre ; focus jamais caché sous l'en-tête fixe (WCAG 2.4.11) ; ordre logique, y
   compris dans le passage épinglé de `Listen` ; aucun piège. Sous 860 px, le menu disparaît :
   comment un visiteur au clavier ou sur téléphone atteint-il « Tarifs » ou la confidentialité
   autrement qu'en faisant tout défiler ?
4. **Lecteur d'écran** (VoiceOver sur iPhone et sur Mac, NVDA sous Windows ; plausible tant que non
   fait) : ordre de lecture ; décor masqué (dessins, halos, pastilles du hero) et rien d'utile
   masqué sans copie lisible ; contenu doublé lu une seule fois (`Listen` : texte des étapes et
   scène `aria-hidden` sur grand écran ; sur grand écran, les captures des étapes sont-elles encore
   annoncées quelque part ? `Stations` : liste puis copie masquée) ; frise de `Gapless`
   (`role="img"`, nom « Piste 1, Piste 2 » : utile ?) ; chiffres et graphiques du Rewind lus en
   clair (« 212 h », « 34 % ») ; listes des tarifs ; valeurs en `<code>` du serveur de démo ; lien
   de la marque (nom « Accueil d'Andia », texte visible « Andia » masqué : 2.5.3) ; contenu révélé
   par `data-reveal` lu avant d'apparaître (sans gêne ?), contenu de `data-reveal-repeat` masqué
   quand il quitte l'écran.
5. **Images** : chaque `alt` décrit la capture dans son contexte et dans la langue de la page ;
   images décoratives à `alt` vide (Astro écrit `alt` seul, valide) ; aucun texte en image sans
   équivalent.
6. **Mouvement** : avec `prefers-reduced-motion: reduce`, plus aucune translation, rotation, mise à
   l'échelle ni parallaxe nulle part (la règle globale de `global.css` raccourcit animations et
   transitions, mais pas un `transform` calculé depuis `--progress` ni une position de repos :
   chaque occurrence se vérifie, zone 6, point 1) ; WCAG 2.2.2 (Mettre en pause, arrêter,
   masquer) : sans « Réduire les animations », du contenu bouge seul plus de cinq secondes (halos,
   dégradé du titre, anneau du hero, impulsion du fil, LED, égaliseur de la montre, flottements) ;
   y a-t-il un moyen de l'arrêter, ou est-ce un décor exempté (à argumenter) ? 2.3.1 : aucun
   clignotement au-delà de trois par seconde.
7. **Autres préférences** : `prefers-reduced-transparency` (repli plein de tout le verre, en-tête
   compris) ; `prefers-contrast: more` ; `forced-colors: active` (mode contraste élevé de Windows :
   un texte en `color: transparent` sur `background-clip: text` reste-t-il visible ? les pastilles
   et les bordures ?) ; changement de thème page ouverte.
8. **Zoom et redistribution** : zoom 200 % à 1280 px ; 400 % (320 px CSS) sans défilement
   horizontal (1.4.10, recoupe la zone 5) ; espacement du texte (1.4.12 : interligne 1,5, lettres
   0,12 em, mots 0,16 em, paragraphes 2 em — les pastilles en `white-space: nowrap` et les hauteurs
   fixes coupent-elles ?) ; réglage « Taille du texte » de Safari.
9. **Cibles** : au moins 24 × 24 px (2.5.8), et 44 px comme le reste du site : liens dans le texte
   (lien Jellyfin de la note), sommaire de la confidentialité, lien du pied de page, sélecteur de
   langue, menu.
10. **Couleur seule** : rien ne passe que par la couleur (période active du Rewind, points du
    passage épinglé : masqués, donc sans enjeu ? à confirmer).
11. **Titres de page et liens** : titres uniques et descriptifs (2.4.2) ; chaque lien dit où il mène
    (2.4.4).
12. **Sans JavaScript** : tout est lisible (passe `browser-pass` sans JS) ; `Listen` montre chaque
    étape avec sa capture.

### Zone 5. Mise en page, responsive, thèmes et navigateurs (V)

**Fichiers** : `src/styles/global.css`, les `@media` de chaque section, `PhoneFrame.astro`,
`Halos.astro`, `Header.astro`, `Hero.astro` (positions des pastilles), `Jellyfin.astro` (scène et
pastilles en position absolue), `Listen.astro` (passage épinglé), `BigScreens.astro` et `AppMock.astro`
(unités `cqi`), dessins d'`Everywhere.astro`, `PrivacyPage.astro`.

**Contrat** : `docs/CONVENTIONS.md` (« Direction artistique », « Vérifier et mettre en ligne » :
390 px sans défilement horizontal, 1024 px, `overflow-x: clip`) ; `CLAUDE.md` du site.

**Points de contrôle** :

1. **Matrice `browser-pass`** (annexe A.4) : 320, 390, 768, 1024, 1440 px (ajouter 360, 430, 834,
   1280, 1920 et 2560 si le temps le permet), clair et sombre, animations normales et réduites :
   aucun défilement horizontal ; les captures pleine page regardées. Plus : téléphone en paysage
   (844 × 390 : hero en `100svh`, étapes épinglées), écran bas (1280 × 720 : formule de taille de
   l'iPhone épinglé), très grand écran (halos en `vmax`, `--content-width` de 1180 px).
2. **Points de rupture** : 520, 600, 760, 860, 900 et 1100 px selon les sections — cohérents entre
   eux ? Les états intermédiaires (861 à 1000 px : deux colonnes serrées de `Listen`, pastilles du
   hero sur le texte, scène de `Jellyfin` où les pastilles absolues chevauchent l'iPhone ou le
   serveur) regardés à 870, 920 et 1000 px.
3. **Clair et sombre** : chaque page dans les deux ; chaque couleur en dur (§ 6) lisible dans les
   deux (dégradés fixes de `Stations`, dessins toujours sombres de la montre, de CarPlay et
   d'`AppMock` : voulu) ; `theme-color` égal à `--bg` ; `color-scheme`.
4. **Replis** : sans `backdrop-filter`, le verre reste-t-il lisible ? Avec « Réduire la
   transparence », `--bg-elevated` partout où il y a du verre (cartes, pastilles, en-tête,
   `.plan--plus`, sommaire) ? Fonctions CSS employées (`color-mix` et `oklab`, `text-wrap: balance`
   et `pretty`, unités `svh` et `cqi`, propriétés `translate` / `rotate` / `scale`, `mask-image`,
   `clamp()` avec des nombres sans unité dans `--in` / `--out` de `Listen`, `inset`,
   `aspect-ratio`) : les lister et fixer le navigateur le plus ancien visé (au moins Safari 17, celui
   des iPhone qui font tourner l'app ; Chrome et Firefox des deux dernières années), puis vérifier
   chaque fonction contre lui et son repli quand elle manque.
5. **Safari en particulier** (plausible sans Safari) : `position: sticky` sous un ancêtre en
   `overflow-x: clip`, `perspective` et `preserve-3d` dans un hero en `overflow: clip` (aplatis ?),
   `100vh` et `100svh` avec la barre d'outils mobile, `background-clip: text` préfixé, en-tête fixe
   en `backdrop-filter` pendant le défilement, rebond du défilement sous les halos fixes.
6. **Captures et cadres** : netteté aux densités 2 et 3 (largeurs générées 300 à 590 px pour un
   iPhone affiché jusqu'à 320 px CSS : 960 px utiles en densité 3 — flou, ou compromis assumé ?),
   attribut `sizes` juste pour chaque `Picture`, recadrage par `object-fit: cover`.
7. **Direction artistique** : sarcelle et corail égaux à `AccentColor` (clair et sombre) et à l'icône
   de l'app (`docs/icon/`) ; icônes `Glyph` de même trait ; favicon et icône d'écran d'accueil égaux
   à l'icône actuelle d'Andia (et `icon-dark.svg` : utilisé ?).
8. **Impression** de la page de confidentialité (texte juridique qu'on enregistre en PDF) : halos,
   en-tête fixe, verre, sommaire, liens.
9. **Lecture et traduction** : mode lecture de Safari sur l'accueil et sur la confidentialité ;
   traduction automatique de Chrome sur la page française (le titre découpé mot à mot du hero
   survit-il ?).
10. **En-tête** à toutes les largeurs : marque, menu (masqué sous 860 px), langue et bouton (masqué
    sous 600 px) ne se chevauchent pas ; état `is-scrolled` lisible au-dessus de chaque section.

### Zone 6. Animations et moteur de mouvement (N)

**Fichiers** : `src/scripts/motion.ts`, `src/styles/motion.css`, `src/styles/global.css` (bloc
`reduce`), le script de `Hero.astro`, `hero/spectrum.ts`, `PhoneSpectrum.astro`,
`WaveSpectrum.astro`, `Halos.astro`, `AppStoreButton.astro`, et chaque bloc
`@media (prefers-reduced-motion: no-preference)` des sections.

**Contrat** : `docs/CONVENTIONS.md` (« Animations » et « Règles ») et `CLAUDE.md` du site (« Tout
mouvement sous `prefers-reduced-motion: no-preference` ; rien de caché sans JavaScript »).

**Points de contrôle** :

1. **Mouvement hors préférence** : chaque `animation`, `transform`, `translate`, `rotate`, `scale`
   et `transition` de `transform` du dépôt (grep du § 6) est dans un bloc
   `prefers-reduced-motion: no-preference`, ou ne bouge pas. La règle globale « reduce » ne retire
   ni un `transform` lié à `--progress` ni une position de repos (`--rest-y` du hero) : chacune se
   vérifie dans le CSS construit et dans la passe « reduce » de `browser-pass`.
2. **Rien de caché sans JavaScript** : états de départ seulement sous `html.js` ; `browser-pass` sans
   JS sans texte invisible. Et si JavaScript tourne mais que le module échoue (erreur, script
   bloqué, navigateur sans module) ? `html.js` est posé avant le chargement du moteur : tout ce qui
   attend `is-revealed` resterait invisible. Le tracer, et le chemin sans `IntersectionObserver`.
3. **`data-loop`** : chaque bloc qui contient une boucle infinie le porte (exceptions : le fond,
   documenté ; la pastille de `AppStoreButton` : justifiée ?) ; la pause loin de l'écran se constate
   (panneau Animations des outils du navigateur) ; la boucle `requestAnimationFrame` du hero
   s'arrête hors de l'écran, onglet caché et avec « Réduire les animations » ; celle de
   l'inclinaison s'arrête une fois posée.
4. **Écouteurs** : `docs/CONVENTIONS.md` interdit un écouteur `scroll` à soi hors du moteur : relever
   ceux du moteur (défilement, redimensionnement, `is-scrolled`) et du hero (`pointermove`, passif ?)
   et vérifier que chacun est nécessaire, passif et sans travail lourd.
5. **Coût par image** : `motion.ts` lit tout puis écrit ; combien d'éléments `data-scroll`, combien
   de descendants dépendent de `--progress` (une propriété personnalisée héritée fait recalculer les
   styles de tout le sous-arbre) ? Mesurer dans le panneau Performance pendant un défilement, à
   processeur ralenti quatre fois : durée de « Recalculate Style » et de « Layout » par image, images
   perdues (plausible hors d'un vrai téléphone).
6. **Passage épinglé de `Listen`** : formule de `--t`, opacités aux frontières, points ; retour en
   arrière du navigateur ou lien d'ancre qui atterrit au milieu ; redimensionnement pendant
   l'épinglage ; écran très bas ; focus clavier dans une étape ; `data-reveal-repeat` qui masque le
   texte d'une étape quittée (la recherche dans la page le trouve-t-elle encore ?).
7. **Apparitions** : seuil et marge (`rootMargin: -12 %`, `threshold: 0.05`) pour les éléments très
   hauts et ceux du bas de page sur un écran très haut (sont-ils révélés ?) ; une ancre du menu
   (`#pricing`) qui saute directement à une section : contenu là à l'arrivée, sans vide ;
   `scroll-behavior: smooth` coupé avec « Réduire les animations ».
8. **Hero** : le titre et le chapeau démarrent invisibles et apparaissent avec des délais (jusqu'à
   700 ms, plus 0,9 s de transition) : effet sur le LCP (zone 7) et sur la première lecture ; entrée
   de l'iPhone (1,6 s) ; superposition du spectre ; inclinaison seulement avec une souris ;
   « Réduire les animations » activé page ouverte : retour à l'image figée.
9. **Changement de préférence page ouverte** : ce qui suit tout seul (le CSS) et ce qui ne suit pas
   (le moteur ne relit pas `prefers-reduced-motion` après le chargement : des éléments encore cachés
   restent-ils cachés jusqu'au défilement ?).
10. **Confort** : durées (apparitions de 0,9 s et décalages) qui ne ralentissent pas la lecture,
    amplitudes de parallaxe et d'inclinaison, texte qui bouge pendant qu'on le lit (le texte du hero
    remonte et s'estompe en le quittant).

### Zone 7. Performance et poids (P)

**Fichiers** : `astro.config.mjs` (`inlineStylesheets: 'always'`, `format: 'directory'`),
`PhoneFrame.astro` et les `Picture` de `BigScreens.astro` (formats, `widths`, `sizes`, `loading`,
`fetchpriority`), `Halos.astro` (couches fixes de 70 vmax, `will-change`, grain en SVG
`feTurbulence`), `.glass` de `global.css` (`backdrop-filter`), scripts du hero et du moteur,
`public/.htaccess` (cache, compression), `dist/`.

**Contrat** : `docs/CONVENTIONS.md` (« Performance » ; « Repères à garder : Lighthouse à 100 sur les
quatre catégories, aucune erreur axe, CLS à 0 ») ; le commentaire d'`astro.config.mjs` (styles dans
la page, « rien ne bloque le premier affichage »).

**Points de contrôle** :

1. **Lighthouse** (annexe A.6) : `/`, `/en/`, `/confidentialite/`, `/en/privacy/`, mobile et bureau,
   trois passages, médiane ; tableau dans le rapport (quatre scores, LCP, CLS, TBT, Speed Index,
   poids) face aux repères de `CONVENTIONS.md` ; les principales pistes de Lighthouse, avec leur
   gain estimé. L'élément LCP de chaque page, nommé.
2. **Budgets** (à adopter ou à ajuster dans le rapport, puis à inscrire dans `CONVENTIONS.md`) :
   HTML de l'accueil, styles compris, ≤ 40 Ko compressé ; JavaScript du site ≤ 10 Ko compressé, sans
   tiers ; images au-dessus de la ligne de flottaison ≤ 150 Ko en mobile ; première visite de
   l'accueil en mobile ≤ 600 Ko ; LCP ≤ 2,0 s et TBT ≤ 150 ms (Lighthouse mobile), CLS = 0,
   INP ≤ 200 ms ; aucune requête hors du site.
3. **HTML et CSS dans la page** : avec `inlineStylesheets: 'always'`, les styles se répètent dans
   chaque page et ne se mettent jamais en cache à part, et le HTML est en `no-cache` : poids
   compressé de chaque page (`gzip -9c | wc -c`), part des styles inutilisés par page (onglet
   Coverage), taille du DOM (rectangles de `Gapless`, listes doublées de `Stations`, 72 barres de
   spectre, huit iPhone de `Listen`).
4. **JavaScript** : poids des modules dans la page ; travail au chargement (requêtes de tous les
   `[data-reveal]`, observateurs) et à chaque image (moteur, hero à 30 images par seconde qui écrit
   72 `transform` et les pulsations) ; tâches longues (TBT) ; coût au repos sur le hero (moniteur de
   performance : processeur en % page immobile, à processeur ralenti ; impact énergétique dans
   Safari, plausible).
5. **Composition** : nombre d'éléments en `backdrop-filter` à l'écran en même temps, `will-change`
   (une couche par barre de spectre ?), couches fixes animées de grande taille (halos, grain
   `feTurbulence` recalculé ?), `mask-image` sur l'anneau qui tourne, `filter: drop-shadow` animé du
   fil ; panneau Layers et « Paint flashing » pendant le défilement et au repos.
6. **Images** : AVIF et WebP servis, `widths` face aux tailles affichées × densité (zone 5,
   point 6), chargement différé sous la ligne de flottaison, `eager` et `fetchpriority="high"` pour
   l'iPhone du hero seulement ; doublons cachés (`Listen` : les iPhone des étapes, masqués sur grand
   écran, et ceux de la scène, masqués sur téléphone — téléchargés quand même ? onglet Réseau à 390 et
   à 1440 px) ; poids des images de partage et des icônes ; `decoding="async"`.
7. **Réseau et cache** (à la lecture de `.htaccess`, puis en production) : `/_astro/` immuable un
   an, images et icônes une semaine, HTML revalidé ; compression (types de `mod_deflate` : HTML,
   CSS, JS, SVG, JSON — et `application/xml` du plan du site, `text/plain` de `robots.txt` ?) ;
   Brotli, HTTP/2 ou HTTP/3 chez OVH ; temps de première réponse ; `ETag` et 304.
8. **Polices** : aucune police téléchargée (pas de `@font-face`, pas de Google Fonts).
9. **Réseau lent** (« Slow 4G » des outils du navigateur) : quand le titre du hero est-il lisible ?
10. **Build** : durée de `npm run build`, avertissements, journal d'optimisation des images.

### Zone 8. Référencement, partage et découvrabilité (S)

**Fichiers** : `src/layouts/Base.astro`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`,
`src/pages/404.astro`, `astro.config.mjs` (`site`, `trailingSlash`), `public/og/`, `scripts/og/`,
icônes de `public/`, redirections de `public/.htaccess`.

**Contrat** : `docs/CONVENTIONS.md` (« Nouvelle page », « Images de partage », domaine principal).

**Points de contrôle** :

1. **`dist-check`** (annexe A.2), par page : `lang`, titre (≤ 60 caractères), description (≤ 160),
   canonique absolue avec la barre finale, hreflang fr / en / x-default réciproques, `og:image` de
   la langue, `robots` ; titres et descriptions uniques.
2. **Plan du site et robots** : toutes les pages indexables, pas la 404, adresses absolues avec la
   barre finale, alternates réciproques ; `robots.txt` pointe vers le plan ; types servis par
   Apache (`.xml`, `.txt`).
3. **Page inconnue** : vrai statut 404 par `ErrorDocument` (pas de « soft 404 ») ; `noindex` ;
   canonique vers l'accueil sur une 404 : voulu ?
4. **Adresses** : barre finale cohérente (`trailingSlash: 'always'` et `DirectorySlash` d'Apache :
   `/confidentialite` → 301 vers `/confidentialite/`) ; anciens domaines et « www » vers le domaine
   principal ; http vers https ; le jour du changement de nom, chaque ancienne adresse en 301 vers la
   nouvelle, même chemin (plan de `docs/CONVENTIONS.md`).
5. **Données structurées** : JSON-LD valide (validateur Schema.org, Rich Results Test de Google) ;
   `MobileApplication` sans `offers` ni avis n'est pas éligible aux extraits enrichis : manque, ou
   choix ? `operatingSystem`, `applicationCategory`, `inLanguage`, `image` justes ; seulement sur
   l'accueil (voulu) ; `Organization` ou `WebSite` utiles ?
6. **Partage** : balises Open Graph et Twitter complètes ; texte de l'image de partage à jour (nom,
   « Pour iPhone et Apple Watch » écrit en dur dans `og.html`, capture) ; aperçu réel dans Messages,
   WhatsApp, Slack, Discord, Mastodon, LinkedIn (plausible tant que non fait).
7. **Icônes** : `favicon.svg` (variante sombre ?), `favicon.ico`, `favicon-32.png`,
   `apple-touch-icon.png` (180 px, fond opaque) ; pas de manifeste web (voulu ?).
8. **Mots cherchés** : les mots que tape le public (« Jellyfin », « lecteur Jellyfin iPhone »,
   « client Jellyfin iOS », « Jellyfin music player iPhone », « FLAC », « hors ligne », « offline »)
   dans le titre, le `h1`, les `h2` et le texte, dans chaque langue ; textes des liens internes.
9. **Bannière d'app de Safari** (`apple-itunes-app`) le jour où `APP_STORE_ID` est renseigné ;
   fichier `apple-app-site-association` (liens universels) : sans objet tant que l'app n'ouvre pas
   de liens du site (à noter, pas à corriger).
10. **Outils des moteurs** : vérification du domaine dans Google Search Console et Bing Webmaster
    Tools après la réouverture (liste de contrôle, pas de code).

### Zone 9. Légal, confidentialité, App Store et marques (L)

**Fichiers** : `src/content/privacy/fr.md` et `en.md`, `PrivacyPage.astro`, `Footer.astro`,
`AppStoreButton.astro`, `Pricing.astro`, `src/config.ts`, `Everywhere.astro` et `PhoneFrame.astro`
(appareils dessinés), `scripts/og/og.html`, `maintenance/`. Dans l'app : `docs/PRIVACY.md`,
`docs/PRIVACY.en.md`, `PrivacyPolicyView` (`PrivacyPolicy.lastUpdated`), `docs/LANCEMENT.md` (§ 3
et 7), « Règles de l'App Store à respecter » de `docs/monetisation/README.md`.

**Contrat** : `docs/CONVENTIONS.md` (« Politique de confidentialité » : copie mot pour mot ;
`AppStoreButton` : badge officiel, jamais de faux) ; guidelines 3.1.1, 5.1.1 et 2.3.2 de l'App
Store ; règles marketing d'Apple (developer.apple.com/app-store/marketing/guidelines/) ; droit
français (LCEN) et RGPD.

**Points de contrôle** :

1. **La politique est celle de l'app** (Bloquant si elle diverge) : diff de l'annexe A.7, en
   français et en anglais ; `updated` égale à la date des documents de l'app et à
   `PrivacyPolicy.lastUpdated` ; sommaire tiré des titres ; rien réécrit par `PrivacyPage.astro`
   au-delà de la mise en page ; les quatre pastilles du résumé fidèles au texte (zone 2, point 11).
2. **URL donnée à App Store Connect** : `/confidentialite/` et `/en/privacy/` stables, conservées par
   les redirections du changement de domaine ; et pendant la maintenance ? `maintenance/.htaccess`
   répond 503 à toute adresse : la politique est alors injoignable (à trancher avant toute
   soumission tant que le site est en maintenance).
3. **URL d'assistance** : App Store Connect exige une URL d'assistance (et propose une URL
   marketing) ; le site offre-t-il une page ou au moins un moyen de contact ? Sinon, laquelle sera
   donnée (`docs/LANCEMENT.md` de l'app en parle) ?
4. **Le site et ses visiteurs** : aucun cookie, aucun stockage local, aucune requête vers un tiers
   (`browser-pass`, `dist-check`, greps du § 6), aucune mesure d'audience : pas de bandeau de
   consentement à prévoir — à confirmer. Les journaux d'accès d'OVH (adresses IP) existent : la
   politique publiée, qui est celle de l'app, dit-elle quelque chose du site lui-même (RGPD,
   information des visiteurs) ? (décision : une phrase « Ce site » dans la politique de l'app, ou
   une mention à part.)
5. **Mentions légales** (LCEN, art. 6 III) : un site édité en France identifie son éditeur (nom ou
   raison sociale, adresse, contact ; pour un particulier, il peut ne donner que l'hébergeur, à qui
   il a confié son identité), son directeur de la publication et son hébergeur (nom, adresse,
   téléphone) : une page ou une section existe-t-elle ? Cohérence avec le statut de commerçant
   déclaré à Apple (`docs/LANCEMENT.md` § 7, DSA) et avec le nom du vendeur sur la fiche.
6. **Apple** : aucun logo Apple, aucun faux badge ; le jour du lancement, le badge officiel dans la
   langue de la page, tel quel ; « Bientôt sur l'App Store » conforme aux règles d'Apple (formule
   permise avant la sortie ?) ; noms de produits écrits exactement (iPhone, iPad, Mac, Apple Watch,
   CarPlay, AirPlay, AirPods, Siri, App Store, TestFlight, macOS), jamais au pluriel ni au
   possessif en anglais ; la ligne des marques du pied de page couvre-t-elle tous les noms employés
   (AirPlay, AirPods, Siri, TestFlight, macOS) ? ; appareils dessinés en CSS (iPhone avec îlot
   dynamique, montre, écran CarPlay) face aux règles d'Apple sur la représentation de ses produits
   (décision).
7. **Prix et achat** (3.1.1) : aucun bouton ni lien d'achat d'Andia Plus sur le site ; prix
   affiché toutes taxes comprises avec sa devise, « Le prix peut varier selon le pays » ; le jour de
   la hausse (12,99 €), pas de prix barré ni de « prix de lancement » sans les règles des prix de
   référence ; phrase de la bêta exacte (bac à sable).
8. **Jellyfin** : « Andia n'est pas affiliée au projet Jellyfin » sur chaque page ; nom employé pour
   désigner le serveur, sans logo ; lien juste.
9. **Contenus tiers des captures** : musique, pochettes et paroles libres de droits seulement
   (serveur de démo ; les paroles de la capture sont un texte écrit pour la démo,
   `docs/LANCEMENT.md` § 7) ; aucune pochette commerciale.
10. **Accessibilité légale** : déclaration d'accessibilité (loi de 2005, directive européenne sur
    l'accessibilité en vigueur depuis juin 2025) : le site entre-t-il dans le champ (il ne vend
    rien) ? Noter la réponse et sa raison.
11. **Droits** : `© {année}` calculé au build (vieillit si le site n'est pas reconstruit) ; titulaire
    « Andia », un produit et non une personne : quel nom doit y figurer (décision, lié au point 5) ?
12. **Serveur de démo** : identifiants publiés (`demo` / `demo`) ; le compte peut-il modifier quoi
    que ce soit (mot de passe, playlists, favoris partagés, suppression) ? Ce qui se voit d'un
    visiteur à l'autre (favoris, écoutes « récentes ») ? (Côté serveur : plausible, à confirmer par
    son propriétaire.)

### Zone 10. Hébergement, déploiement, sécurité HTTP et CI (D)

**Fichiers** : `public/.htaccess`, `maintenance/.htaccess`, `maintenance/maintenance.html`,
`.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `astro.config.mjs` (`SITE_URL`),
`package.json`, `package-lock.json`, `.nvmrc`, `.gitignore`.

**Contrat** : `docs/CONVENTIONS.md` (« Vérifier et mettre en ligne », domaine principal, mode
maintenance).

**Points de contrôle** :

1. **`.htaccess` ligne par ligne** : ordre des règles (anciens domaines avant le passage en https) ;
   détection du http par `%{SERVER_PORT} 80` derrière l'infrastructure d'OVH (la recommandation
   d'OVH est-elle encore celle-là, ou `%{HTTP:X-Forwarded-Proto}` ?) ; 301 mis en cache par les
   navigateurs (prudence au changement de domaine) ; `ErrorDocument 404 /404.html` (le fichier
   existe dans `dist/`) ; `DirectoryIndex`, `Options -Indexes` ; en-têtes `always` (aussi sur les 3xx
   et 4xx) ; affirmation du commentaire sur l'ordre `<If>` / `<FilesMatch>` (vraie d'après la
   documentation d'Apache sur la fusion des sections ?) ; types de `mod_deflate` ; `AddType` d'AVIF
   et de WebP.
2. **En-têtes de sécurité** : HSTS sans `includeSubDomains` ni `preload` (décision, en pensant au
   sous-domaine du serveur de démo) ; aucune Content-Security-Policy : en proposer une stricte,
   compatible avec les scripts en ligne d'Astro (empreintes), les styles en ligne et le JSON-LD, à
   essayer d'abord en `Content-Security-Policy-Report-Only` ; `X-Frame-Options` ou
   `frame-ancestors` ; `Permissions-Policy` (`interest-cohort` est obsolète) ;
   `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` ; contrôle en production avec
   Mozilla Observatory ou securityheaders.com une fois le site rouvert (annexe A.9).
3. **Maintenance** : bascule (le mode « maintenance » remplace seulement `.htaccess` et la page, les
   fichiers du site restent) ; 503 avec `Retry-After` et `noindex` ; page autonome, bilingue,
   accessible (contraste, `lang` de la partie anglaise), clair et sombre ; retour au site (le mode
   « site » remet le vrai `.htaccess`) ; `maintenance.html` laissée sur le serveur ensuite
   (inoffensive ?) ; politique de confidentialité injoignable pendant la maintenance (zone 9,
   point 2).
4. **Déploiement** : à la demande seulement (documenté) ; secrets par l'environnement
   (`LFTP_PASSWORD`) ; `set sftp:auto-confirm yes` accepte n'importe quelle clé d'hôte (attaque de
   l'intermédiaire possible : épingler la clé dans un secret `known_hosts`) ; `ftp:ssl-allow yes`
   permet le chiffrement sans l'imposer en FTP (`ftp:ssl-force`) ; `--delete` réservé au mode
   « site » ; envoi en parallèle et site à moitié à jour pendant l'envoi (pages nouvelles et
   anciennes ressources, ou l'inverse : ordre de `mirror`, effet de `--delete`) ; procédure de retour
   arrière (relancer le workflow sur un commit précédent ?) documentée ?
5. **CI** : `check` et `build` sur chaque PR et sur `main` ; Node pris de `.nvmrc` (22, face à
   `engines` ≥ 22.22.0) ; actions épinglées par étiquette majeure et non par empreinte (choix) ;
   `permissions:` non restreintes (le jeton par défaut : `contents: read` suffit) ; aucun
   `npm audit`, aucun Dependabot ou Renovate ; les outils de l'annexe A ne tournent pas en CI
   (décision : lesquels y ajouter, `i18n-check` et `dist-check` coûtent peu).
6. **Dépendances** : `astro` épinglé exactement, outils de développement en `^` ; verrou cohérent
   (`npm ci` passe) ; `npm audit` (complet et `--omit=dev`) et `npm outdated` notés ; télémétrie
   d'Astro pendant le build en CI (`ASTRO_TELEMETRY_DISABLED`, décision).
7. **Domaines** : `site` par défaut et variable `SITE_URL` ; domaine du serveur de démo ;
   certificats des quatre noms (renouvellement) ; si une adresse de contact est publiée sur le
   domaine : SPF, DKIM, DMARC contre l'usurpation.
8. **Secrets** : greps du § 6 ; historique (`git log -p -S` sur les motifs de mot de passe) ;
   `.gitignore` couvre `.env*`.
9. **Surveillance** : disponibilité du site et du serveur de démo (le relecteur de l'App Store
   l'utilise à chaque version, `docs/LANCEMENT.md` § 7) ; rien n'est prévu pour le site (décision).
10. **Reproductibilité** : deux `npm ci && npm run build` donnent-ils le même `dist/` (empreintes des
    fichiers stables) ? Le build de la CI est-il celui qu'on envoie (le déploiement reconstruit : même
    commit, même Node) ?

### Zone 11. Code, conventions et documentation (Q)

**Fichiers** : tout `src/`, `scripts/`, `CLAUDE.md`, `README.md`, `docs/CONVENTIONS.md`.

**Contrat** : `docs/CONVENTIONS.md` en entier et `CLAUDE.md` du site.

**Points de contrôle** :

1. **Conventions** : couleurs par variables (couleurs en dur du § 6 : palettes des cartes, dessins,
   et `rgb(75 16 90)` de `PhoneSpectrum`, prélevé sur une capture — fragile) ; textes par `ui.ts` ;
   `lang` passé à chaque composant ; règles d'animation ; une section = un fichier + une ligne de
   `Home.astro` ; composants propres à une section dans son dossier ; captures par
   `screenshots(lang)`.
2. **Mort** : clés jamais lues (`i18n-check`), captures jamais importées, icônes de `Glyph` jamais
   employées, sélecteurs CSS sans élément, exports inutilisés.
3. **Commentaires et docs face au code** : commentaire de `Section.astro` (ancres citées), de
   `config.ts` (prix, CarPlay), de `screenshots/index.ts`, de `PhoneSpectrum.astro` (mesures), de
   `.htaccess`, du hero ; `README.md` (« iPhone et Apple Watch (bientôt iPad et Mac) ») ;
   `CONVENTIONS.md` (ordre des sections, `APP_LANGUAGES` : « aujourd'hui, aucune ») ; `CLAUDE.md`.
4. **TypeScript** : `astro check` à zéro erreur, avertissement et suggestion ; pas de `any`, peu de
   `as`, aucune assertion non nulle injustifiée.
5. **Fragilités** : calculs liés à une capture précise (spectre du hero) ou à un nombre d'éléments
   (`--n` de `Listen`, positions des cartes du Rewind) qui casseraient sans bruit ; une procédure de
   contrôle écrite pour chacune ?
6. **Doublons** : styles de `.note` et du badge « Bientôt » recopiés d'une section à l'autre, dessins
   sombres (montre, CarPlay, `AppMock`), textes de la 404 ; `visually-hidden` de `global.css` et
   masquage maison de `.hero__name`.
7. **Outils du dépôt** : `scripts/og/render.mjs` fonctionne (chemin de Playwright) et refait aussi
   les icônes ; la ligne des plateformes de `og.html` est écrite à la main (dérive possible avec
   `config.ts`).
8. **Pour la personne suivante** : changer une capture, ajouter une section, changer le domaine,
   lancer cet audit — chaque procédure est écrite et juste.

## 6. Greps transversaux

À lancer en une fois depuis la racine du site, le dépôt de l'app à côté (`../abilia`), après
`npm run build` dans la copie de travail (`$W/site/dist`). Chaque résultat inattendu est à expliquer
ou à relever.

```bash
APP=../abilia; DIST=$W/site/dist
# Ancien nom visible (le dépôt, le domaine actuel et io.babilia.* le gardent ; le texte, non)
grep -rniE "abilia" src public scripts maintenance README.md docs/CONVENTIONS.md --include=*.astro --include=*.ts --include=*.md --include=*.html --include=*.svg --include=*.mjs | grep -viE "abilia-music\.(app|fr)|Baebibelab/abilia|io\.babilia"
grep -c "Abilia" $DIST/index.html $DIST/en/index.html            # 0 attendu
# Domaines et adresses : un seul domaine public, cohérent avec le plan de changement de nom
grep -rhoE "https?://[a-z0-9.-]+\.[a-z]{2,}" src public scripts maintenance astro.config.mjs .github | sort | uniq -c
# Textes en dur hors de ui.ts (noms propres et 404 bilingue mis à part)
grep -rnE ">[^<>{}]*[A-Za-zÀ-ÿ]{4,}[^<>{}]*<" src/components src/pages src/layouts
grep -rnE "(aria-label|alt|title)=\"[^\"{]*[A-Za-zÀ-ÿ]{4,}" src/components src/pages src/layouts
# Plateformes pas encore sorties dans le site construit (chaque occurrence lue)
grep -oE "CarPlay|iPad|Mac\b|macOS" $DIST/index.html $DIST/en/index.html | sort | uniq -c
# Couleurs en dur hors de global.css (palettes et dessins : à justifier)
grep -rnoE "#[0-9a-fA-F]{3,8}\b|rgba?\([0-9][^)]*\)" src --include=*.astro | grep -v "^src/styles/"
# Mouvements : chaque ligne dans un bloc prefers-reduced-motion: no-preference, ou immobile
grep -rnE "animation:|transform:|translate:|rotate:|scale:|transition:.*transform" src --include=*.astro --include=*.css
# Boucles infinies sans data-loop dans le même fichier (Halos : exception documentée)
grep -rlE "infinite" src | xargs grep -L "data-loop"
# Écouteurs à soi (CONVENTIONS : pas d'écouteur scroll hors du moteur)
grep -rnE "addEventListener\('(scroll|resize|pointermove|wheel|touchmove|mousemove)'" src
# Coûts de composition
grep -rnE "backdrop-filter|will-change|filter: *(blur|drop-shadow)|mask-image|feTurbulence" src --include=*.astro --include=*.css
# Captures : importées seulement par index.ts, et toutes utilisées
grep -rn "screenshots/.*\.jpg" src | grep -v "src/assets/screenshots/index.ts"
for f in $(cd src/assets/screenshots && ls *.jpg en/*.jpg); do grep -q "./$f'" src/assets/screenshots/index.ts || echo "jamais importée : $f"; done
# Liens externes et leurs attributs (la liste complète vient de dist-check)
grep -rnE "href=\{[A-Z_]+\}|target=|rel=" src
# Contenu masqué aux lecteurs d'écran : décoratif, ou avec une copie lisible ailleurs
grep -rn 'aria-hidden="true"' src/components src/pages
# Ce qui part vers un tiers ou reste chez le visiteur (attendu : rien)
grep -rhoE "(src|href|srcset|action)=\"https?://[^\"]+" $DIST | sort -u
grep -rlE "localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|fetch\(|XMLHttpRequest" src
# Dette
grep -rnE "TODO|FIXME|XXX|console\.(log|debug|warn)|debugger" src scripts
# Secrets (les identifiants publics du serveur de démo sont attendus)
grep -rniE "(password|passwd|secret|token|api[_-]?key)\s*[:=]" src scripts .github astro.config.mjs maintenance
git ls-files | grep -iE "(^|/)\.env|\.pem$|\.key$|id_rsa"
# Prix, plateformes et fonctions Plus : mêmes valeurs que l'app
grep -n "PLUS_PRICE\|AVAILABLE =" src/config.ts; grep -n "7,99\|12,99" $APP/docs/monetisation/README.md | head -5
grep -n "case " $APP/Abilia/Core/Store/AbiliaPlus.swift | head -12
```

En résumé, ce que ces greps doivent donner : aucun « Abilia » visible, un seul domaine public et
celui du serveur de démo assumé, aucun texte visible hors de `ui.ts` sauf les exceptions écrites,
aucune plateforme pas encore sortie dans le site construit hors de « Bientôt » et des marques,
aucune animation hors de sa préférence, aucune boucle sans `data-loop` hors du fond, aucun écouteur
de défilement hors du moteur, aucune capture importée en direct ni oubliée, aucune requête vers un
tiers, aucun stockage, aucun `console.log`, aucun secret, et des prix et fonctions Plus égaux à ceux
de l'app.

## 7. À vérifier dans un vrai navigateur et sur appareil

Ce qu'un conteneur ne tranche pas et qui doit être fait avant la réouverture du site ; chaque
« plausible » du rapport y est repris, avec le résultat noté dans le suivi.

- **Safari sur iPhone** : un iPhone SE (375 px) et un grand iPhone (430 px), iOS 17 et la dernière
  version : défilement fluide (hero, passage épinglé de `Listen`, halos), barre d'outils qui se
  replie (`svh`), verre de l'en-tête, apparitions, aucune zone blanche ; « Réduire les animations »,
  « Réduire la transparence », « Augmenter le contraste », taille du texte de Safari à 200 % ;
  VoiceOver sur l'accueil et la confidentialité (rotor des titres, des liens, des repères).
- **iPad** (Safari, Split View) et **Mac** (Safari, Chrome, Firefox) : 1024 px et plus, survol,
  inclinaison de l'iPhone à la souris, focus au clavier, VoiceOver de macOS.
- **Android d'entrée de gamme** (Chrome) : fluidité, chaleur, batterie après deux minutes sur le
  hero ; TalkBack sur l'accueil.
- **Windows** : Edge en mode contraste élevé (`forced-colors`), NVDA avec Firefox.
- **Réseau** : 3G lente réelle ou simulée, première visite puis visite suivante (cache).
- **Production, une fois le site rouvert** : en-têtes (annexe A.9), redirections des anciens
  domaines et des « www », http vers https, 404 réelle, compression, HTTP/2, certificat de chaque
  nom ; PageSpeed Insights sur `/` et `/en/` (données de terrain quand elles existent) ; Mozilla
  Observatory.
- **Partage** : coller l'adresse de l'accueil (fr, puis en) dans Messages, WhatsApp, Slack,
  Discord, Mastodon et LinkedIn : image, titre, description dans la bonne langue.
- **Impression** et **enregistrement en PDF** de la page de confidentialité ; **mode lecture** de
  Safari ; **traduction** de Chrome sur la page française.
- **Serveur de démo** depuis l'app (TestFlight ou Xcode) : la phrase du site suffit-elle pour s'y
  connecter du premier coup ?

## 8. Gabarit du rapport et du suivi

### Rapport : `docs/AUDIT-<AAAA-MM-JJ>.md`

````markdown
# Audit du site — <jour mois année>

Audit du site vitrine d'Andia (dépôt `abilia-website`), mené selon `docs/AUDIT-TRAME.md`.
Site au commit `<hash>` ; app de référence (`abilia`) au commit `<hash>`. Exécuté : <npm ci, check,
build (durée), outils de l'annexe A et leurs versions, Lighthouse <version>, Chromium <version>>.
Non exécuté : <Safari, appareils, production en maintenance, réseau…>.

Chaque constat porte un fichier et des lignes, une sévérité, et la mention **vérifié**, **mesuré**
ou **plausible**. Ce rapport ne corrige rien et ne se modifie plus : l'état de chaque constat se
tient dans `docs/AUDIT-<date>-SUIVI.md`.

## Verdict

<3 à 6 phrases : le site peut-il rouvrir, que manque-t-il avant la soumission de l'app, les
quelques constats qui comptent le plus.>

## Synthèse

| Zone | Bloquant | Majeur | Mineur | Dette |
| --- | ---: | ---: | ---: | ---: |
| 1. Fonctionnalités (F) | | | | |
| … | | | | |
| **Total** | | | | |

## Mesures

<Lighthouse : page × mobile / bureau → quatre scores, LCP, CLS, TBT, poids (médianes).
Poids compressé de chaque page ; JavaScript ; images de la première vue.
axe : violations par page. browser-pass : lignes en défaut. Configurations futures : résultat.>

## Ordre de correction suggéré

<Lots : n°, sujet, constats, décisions préalables.>

## Décisions à prendre

<Chaque constat « décision », avec les options et une recommandation.>

## 1. Fonctionnalités annoncées et cohérence avec l'app
### Constats
#### F1. … — Majeur, vérifié
### Points sains
### Zones fragiles

<… une section par zone, jusqu'à 11 …>

## À vérifier dans un vrai navigateur et sur appareil

## Trous d'outillage

<Ce qu'un outil aurait dû voir et n'a pas vu, ce qui mériterait d'entrer en CI.>

## Annexe : tableau des promesses

| N° | Clé ou élément | Texte (fr) | Anglais fidèle ? | Source dans l'app | Verdict | Constat |
| ---: | --- | --- | --- | --- | --- | --- |
````

### Suivi : `docs/AUDIT-<AAAA-MM-JJ>-SUIVI.md`

````markdown
# Suivi des corrections de l'audit du site du <date>

Le rapport `docs/AUDIT-<date>.md` ne se modifie pas : l'état de chaque constat se tient ici, mis à
jour par la PR qui le traite, dans le même commit. États : **à faire** · **décision** (attend un
choix, noté en note une fois pris) · **en cours** (PR ouverte) · **corrigé** · **infirmé** (avec la
raison) · **reporté** (avec la condition) · **doublon** · **app** (à reporter dans le dépôt de l'app).

| Lot | Constat | Sévérité | Titre | État | PR | Note |
| ---: | --- | --- | --- | --- | --- | --- |
````

## 9. Listes de contrôle

### Avant chaque mise en ligne (mode « site » du workflow Deploy)

1. `main` à jour, PR fusionnées, CI verte sur le commit envoyé.
2. `npm ci && npm run check && npm run build` sans erreur ni avertissement nouveau.
3. Annexe A : `i18n-check`, `dist-check` (aucun lien mort, aucune ressource externe),
   `browser-pass` à 390 et 1440 px au moins, `axe-pass` sans violation, politique identique à
   celle de l'app (A.7).
4. Rendu regardé : clair, sombre, 390 px, 1024 px, animations réduites, sans JavaScript.
5. Après l'envoi : accueil, `/en/`, confidentialité dans les deux langues, une adresse inconnue
   (404), un ancien domaine (301), les en-têtes (A.9).

### Le jour du changement de domaine

Les quatre endroits de `docs/CONVENTIONS.md` (`site` d'`astro.config.mjs`, `SITE_URL` par défaut de
`deploy.yml`, redirections de `public/.htaccess`, le paragraphe lui-même), plus : `DEMO_SERVER` si
son domaine change, les images de partage régénérées, l'URL de confidentialité (et d'assistance)
donnée à App Store Connect, les anciennes adresses testées en 301 avec leur chemin, Search Console.

### Le jour du lancement sur l'App Store

`APP_STORE_URL` et `APP_STORE_ID` (bouton devenu lien avec le badge officiel d'Apple dans la langue
de la page, bannière de Safari, JSON-LD) ; `TESTFLIGHT_URL` remis à `null` si la bêta ferme ;
`PLUS_PRICE` égal au prix réel ; plus aucun « Bientôt sur l'App Store » ; phrase du serveur de démo
toujours juste ; configurations futures relues (zone 1, point 5) ; image de partage.

### Le jour où CarPlay, l'iPad ou le Mac sortent

Le réglage de `src/config.ts` ; la ligne des plateformes de `scripts/og/og.html` et les images de
partage régénérées ; les variantes `.carplay` relues dans les deux langues ; la section « iPad et
Mac » avec ses vraies captures ; `operatingSystem` du JSON-LD ; les phrases qui disent ce qui reste
sur l'iPhone (`screens.note`).

## 10. Lancer l'audit (prompt pour l'auditeur)

À coller tel quel dans une session neuve (Fable ou un autre modèle), avec les deux dépôts
accessibles. L'audit est long : c'est une lecture en profondeur, pas un survol.

```
Audite le site vitrine d'Andia (dépôt Baebibelab/abilia-website) selon `docs/AUDIT-TRAME.md`, en
entier et dans l'ordre de son déroulé (§ 4). Lis d'abord la trame en entier, puis `CLAUDE.md` et
`docs/CONVENTIONS.md`.

Règles :
- L'audit est en lecture seule. Tu ne corriges rien, même une faute de frappe, tu ne déploies rien,
  tu n'ouvres ni issue ni PR. Les seuls fichiers que tu écris dans le dépôt sont
  `docs/AUDIT-<date du jour>.md` et `docs/AUDIT-<date du jour>-SUIVI.md`. Les essais (build,
  configurations futures, outils de l'annexe A) se font dans ton dossier de travail, hors du dépôt.
- Le dépôt de l'app (Baebibelab/abilia) est la source de vérité des fonctionnalités : clone-le à
  côté du site (ou ajoute-le à la session) et note son commit en tête du rapport.
- Lis chaque fichier de `src/` en entier, chaque texte de `src/i18n/ui.ts` dans les deux langues, et
  regarde chaque capture et chaque image de partage.
- Exécute tout ce que l'environnement permet : `npm ci`, `npm run check`, `npm run build`,
  `npx astro preview`, les outils de l'annexe A (copiés dans ton dossier de travail), Lighthouse.
  Dis en tête du rapport ce qui a été exécuté, avec les versions, et ce qui ne l'a pas été.
- Tiens le tableau des promesses de bout en bout (§ 4, étape 2) : chaque phrase factuelle et
  chaque visuel du site a sa ligne et sa source dans l'app.
- Chaque constat suit le format du § 3, sa sévérité le § 2, et il est vérifié, mesuré ou
  plausible. Pas de constat sans preuve ; les doutes vont dans « Zones fragiles » ou « À vérifier
  sur appareil ». Les choix produit sont des « décisions », avec options et recommandation.
- Si tu peux lancer des sous-agents : un par zone ou groupe de zones (1 et 2 ; 3 ; 4 ; 5 et 6 ; 7 ;
  8 ; 9 et 10 ; 11), chacun lisant ses fichiers en entier, puis une vérification croisée de chaque
  constat Bloquant ou Majeur par un autre agent que son auteur (§ 4, étape 6).
- Rédige le rapport selon le gabarit du § 8, constats triés par zone puis par sévérité, avec la
  synthèse, les mesures, les décisions à prendre, l'ordre de correction en lots et le tableau des
  promesses en annexe ; puis le suivi (une ligne par constat, lot proposé, état « à faire » ou
  « décision »).
- Commite ces deux fichiers sur la branche `claude/audit-site-<date du jour>` (message
  `docs: audit du site du <date du jour>`) et pousse-la. Pas de PR sauf demande.

Termine par un message court : le verdict, le nombre de constats par sévérité, les cinq qui
comptent le plus, les décisions à prendre, et ce qui reste à vérifier sur appareil.
```

## Annexe A. Outils d'aide à l'audit

Des scripts sans dépendance du projet, à copier dans le dossier de travail (`$W/tools`), jamais
dans le dépôt : l'audit ne change pas le code. Ils ont été écrits et essayés sur ce dépôt le 21
octobre 2026 (Node 22, Playwright 1.56, axe-core 4, Lighthouse 13) ; un outil qui se trompe se
corrige ici (§ 4, étape 10). Leur sortie suit une convention : « ✗ » à expliquer, « · » mesure ou
résultat attendu, « ✓ » rien à signaler.

Extraire tous les outils d'un coup, depuis la racine du site :

```bash
mkdir -p $W/tools
for pair in A.1:js:i18n-check.mjs A.2:js:dist-check.mjs A.3:bash:variants.sh A.4:js:browser-pass.mjs \
            A.5:js:axe-pass.mjs A.6:js:lh-summary.mjs A.8:bash:screenshots-check.sh; do
  IFS=: read -r sec lang name <<< "$pair"
  awk -v sec="^### $sec " -v fence="^\`\`\`$lang\$" '$0 ~ sec {f=1} f && $0 ~ fence {p=1; next} p && /^```$/ {exit} p' \
    docs/AUDIT-TRAME.md > "$W/tools/$name"
done
```

Le site servi pour les outils A.4 à A.6 :

```bash
cd $W/site && (nohup npx astro preview --port 4321 > $W/preview.log 2>&1 &) && sleep 5
export PLAYWRIGHT_MODULE=/opt/node-tools/node_modules/playwright/index.mjs   # ou celui de la machine
# Arrêt à la fin : le processus node dont la ligne contient « preview »
for p in $(ps -eo pid,comm,args | awk '$2 ~ /^(node|npm|npx)/ && /preview/ {print $1}'); do kill $p; done
```

### A.1 Textes : `i18n-check.mjs`

Clés de `ui.ts` jamais lues (clés construites comprises : `` `listen.${step.key}.title` ``), sans
anglais, aux repères `{…}` différents, ou au texte identique dans les deux langues.
`node $W/tools/i18n-check.mjs .` depuis la racine du site.

```js
// Textes de src/i18n/ui.ts : clé jamais lue, clé sans anglais, repères {…} différents entre fr et
// en, texte identique dans les deux langues (souvent normal : noms propres, à relire).
// Usage : node i18n-check.mjs <racine du site>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = process.argv[2] ?? '.';
const ui = readFileSync(join(root, 'src/i18n/ui.ts'), 'utf8');
const block = (name) => { const start = ui.indexOf(`const ${name}`); return ui.slice(start, ui.indexOf('\n};', start)); };
const entries = (src) => Object.fromEntries([...src.matchAll(/^\s*'([^']+)':\s*\n?\s*('(?:[^'\\]|\\.)*'|"[^"]*"|`[^`]*`)/gm)].map((m) => [m[1], m[2]]));
const fr = entries(block('fr')), en = entries(block('en'));
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(astro|ts|mjs)$/.test(p) && !p.endsWith('i18n/ui.ts') && files.push(p); });
walk(join(root, 'src'));
// Le code qui lit les clés : les autres fichiers, plus ui.ts après ses deux dictionnaires.
const code = files.map((f) => readFileSync(f, 'utf8')).join('\n') + ui.slice(ui.indexOf('export const ui'));
// Clés construites (`listen.${step.key}.title`) : premier segment + ${…} + dernier segment.
const templates = [...code.matchAll(/`([a-z]+)\.\$\{[^}]+\}\.([a-zA-Z]+)`/g)].map((m) => [m[1], m[2]]);
const holes = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
for (const key of Object.keys(fr)) {
  const base = key.replace(/\.carplay$/, '');
  const parts = base.split('.');
  const used = code.includes(`'${base}'`) || code.includes(`"${base}"`) ||
    templates.some(([first, last]) => parts[0] === first && parts.at(-1) === last);
  if (!used) console.log(`jamais lue : ${key}`);
  if (!(key in en)) console.log(`sans anglais : ${key}`);
  else if (holes(fr[key]) !== holes(en[key])) console.log(`repères différents : ${key} (fr ${holes(fr[key])} / en ${holes(en[key])})`);
  else if (fr[key] === en[key]) console.log(`identique en fr et en en : ${key} = ${fr[key]}`);
}
for (const key of Object.keys(en)) if (!(key in fr)) console.log(`anglais sans français : ${key}`);
console.log(`${Object.keys(fr).length} clés fr, ${Object.keys(en).length} clés en`);
```

### A.2 Site construit : `dist-check.mjs`

Par page de `dist/` : `lang`, titre, longueur de la description, canonique, hreflang, image de
partage, `robots`, nombre de `h1` et d'images, poids ; liens internes morts, ancres absentes,
identifiants en double, images sans `alt`, ressources hors du site ; liste des liens externes.
`node $W/tools/dist-check.mjs $W/site/dist https://abilia-music.app` (puis sur chaque
`dist-<variante>/`).

```js
// Contrôles du site construit (dist/) : liens internes et ancres, liens externes, et pour chaque
// page : lang, title, description, canonical, hreflang, og:image, nombre de h1, img sans alt,
// identifiants en double, ressources hors du site.
// Usage : node dist-check.mjs <dossier dist> [adresse publique, ex. https://abilia-music.app]
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const dist = process.argv[2] ?? 'dist';
const site = (process.argv[3] ?? 'https://abilia-music.app').replace(/\/$/, '');
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(dist);
const urlOf = (file) => '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');
const html = Object.fromEntries(pages.map((p) => [urlOf(p), readFileSync(p, 'utf8')]));
const ids = (h) => [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const attr = (h, re) => (h.match(re) ?? [])[1];
const external = new Set();
for (const [url, h] of Object.entries(html)) {
  const problems = [];
  const all = ids(h);
  const dup = all.filter((id, i) => all.indexOf(id) !== i);
  if (dup.length) problems.push(`id en double : ${[...new Set(dup)].join(', ')}`);
  for (const [, href] of h.matchAll(/\shref="([^"]+)"/g)) {
    if (/^(https?:)?\/\//.test(href)) { if (!href.startsWith(site)) external.add(href); continue; }
    if (/^(mailto|tel):/.test(href)) { external.add(href); continue; }
    const [path, hash] = href.split('#');
    const target = path === '' ? url : path;
    if (!(target in html) && !existsSync(join(dist, target))) problems.push(`lien mort : ${href}`);
    else if (hash && target in html && !ids(html[target]).includes(hash)) problems.push(`ancre absente : ${href}`);
  }
  for (const [, src] of h.matchAll(/\s(?:src|srcset)="([^"]+)"/g))
    for (const part of src.split(',').map((s) => s.trim().split(' ')[0]))
      if (/^(https?:)?\/\//.test(part) && !part.startsWith(site)) problems.push(`ressource externe : ${part}`);
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/\salt(?=[\s=>])/.test(i)).length;
  if (noAlt) problems.push(`${noAlt} img sans attribut alt`);
  const info = {
    lang: attr(h, /<html[^>]*\slang="([^"]+)"/),
    h1: (h.match(/<h1\b/g) ?? []).length,
    title: attr(h, /<title>([^<]*)<\/title>/),
    description: attr(h, /<meta name="description" content="([^"]*)"/)?.length + ' car.',
    canonical: attr(h, /<link rel="canonical" href="([^"]+)"/),
    hreflang: [...h.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]}=${m[2].replace(site, '')}`).join(' '),
    ogImage: attr(h, /property="og:image" content="([^"]+)"/)?.replace(site, ''),
    robots: attr(h, /<meta name="robots" content="([^"]+)"/) ?? '-',
    imgs: imgs.length,
    poids: `${Buffer.byteLength(h)} o`,
  };
  console.log(`\n${url}\n  ${Object.entries(info).map(([k, v]) => `${k}: ${v}`).join('\n  ')}`);
  problems.forEach((p) => console.log(`  ✗ ${p}`));
}
console.log(`\nLiens externes (à ouvrir un par un) :\n  ${[...external].join('\n  ')}`);
```

### A.3 Configurations futures : `variants.sh`

Construit le site sous chaque configuration à venir de `src/config.ts` (CarPlay, iPad, Mac, tout,
lien App Store, bêta, sans prix, sans serveur de démo, app en français seulement), un
`dist-<variante>/` chacune, dans la copie de travail ; `config.ts` est remis en place à la fin.
Une substitution qui ne change rien (le fichier a évolué) est signalée : adapter alors la ligne
`sed`. `bash $W/tools/variants.sh $W/site` (une à deux minutes).

```bash
#!/usr/bin/env bash
# Construit le site sous chaque configuration future de src/config.ts, dans la copie de travail
# (jamais dans le dépôt) : un dossier dist-<variante>/ par cas, config.ts remis en place à la fin.
# Usage : bash variants.sh <copie de travail du site, node_modules installés>
set -u
cd "$1"
mkdir -p audit-logs && cp src/config.ts .audit-config.ts.orig
declare -A variants=(
  [carplay]='s/CARPLAY_AVAILABLE = false/CARPLAY_AVAILABLE = true/'
  [ipad]='s/IPAD_AVAILABLE = false/IPAD_AVAILABLE = true/'
  [mac]='s/MAC_AVAILABLE = false/MAC_AVAILABLE = true/'
  [tout]='s/\(CARPLAY\|IPAD\|MAC\)_AVAILABLE = false/\1_AVAILABLE = true/'
  [appstore]='s#APP_STORE_URL: string | null = null#APP_STORE_URL: string | null = "https://apps.apple.com/app/id0000000000"#; s#APP_STORE_ID: string | null = null#APP_STORE_ID: string | null = "0000000000"#'
  [testflight]='s#TESTFLIGHT_URL: string | null = null#TESTFLIGHT_URL: string | null = "https://testflight.apple.com/join/XXXXXXXX"#'
  [sansprix]="s#PLUS_PRICE: Record<'fr' | 'en', string> | null = {[^}]*}#PLUS_PRICE: Record<'fr' | 'en', string> | null = null#"
  [sansdemo]='/DEMO_SERVER:/,/};/c\export const DEMO_SERVER: { url: string; user: string; password: string } | null = null;'
  [francais]="s#APP_LANGUAGES: readonly string\[\] = \['fr', 'en'\]#APP_LANGUAGES: readonly string[] = ['fr']#"
)
for name in "${!variants[@]}"; do
  cp .audit-config.ts.orig src/config.ts
  sed -i "${variants[$name]}" src/config.ts
  if cmp -s src/config.ts .audit-config.ts.orig; then echo "✗ $name : la substitution n'a rien changé (config.ts a bougé ?)"; continue; fi
  if npx astro check >audit-logs/check-$name.log 2>&1 && npx astro build --outDir "dist-$name" >audit-logs/build-$name.log 2>&1
  then echo "✓ $name → dist-$name/"; else echo "✗ $name : voir audit-logs/check-$name.log et audit-logs/build-$name.log"; fi
done
cp .audit-config.ts.orig src/config.ts && rm .audit-config.ts.orig
```

### A.4 Passe navigateur : `browser-pass.mjs`

Chaque page × 320 / 390 / 768 / 1024 / 1440 px × clair / sombre × animations normales / réduites,
plus sans JavaScript à 390 et 1440 px, plus une mesure de LCP, CLS et blocage à 390 px sous un
processeur ralenti quatre fois : défilement horizontal (et les éléments qui débordent), texte resté
invisible après avoir tout fait défiler (hors `data-reveal-repeat`, voulu), erreurs de la console,
requêtes en échec ou hors du site, statut de la page inconnue. Les captures pleine page (second
argument) se regardent. `node $W/tools/browser-pass.mjs http://localhost:4321 $W/shots` (une
dizaine de minutes ; `PAGES=/,/en/ WIDTHS=390` pour restreindre).

```js
// Passe navigateur du site servi par `npm run preview` : pour chaque page × largeur × thème ×
// animations (et sans JavaScript : les <script> du site sont retirés du HTML servi), défilement
// horizontal, texte resté invisible, erreurs de la console, requêtes hors du site ; à 390 px, LCP,
// CLS et temps de blocage sous un processeur ralenti quatre fois.
// Usage : PLAYWRIGHT_MODULE=/chemin/playwright/index.mjs node browser-pass.mjs [base] [dossier de captures]
// (PAGES=/,/en/ et WIDTHS=390,1440 pour restreindre). « ✗ » : à expliquer ; « · » : mesure ou attendu.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const shots = process.argv[3];
const pages = (process.env.PAGES ?? '/,/en/,/confidentialite/,/en/privacy/,/page-inconnue/').split(',');
const widths = (process.env.WIDTHS ?? '320,390,768,1024,1440').split(',').map(Number);
const browser = await chromium.launch();

async function visit(path, { width, colorScheme, reducedMotion, noScript = false, perf = false }) {
  const label = `${path} ${width}px ${colorScheme} ${reducedMotion}${noScript ? ' sans-JS' : ''}`;
  const context = await browser.newContext({ viewport: { width, height: 844 }, colorScheme, reducedMotion, deviceScaleFactor: 2 });
  const page = await context.newPage();
  // Sans JavaScript : la page arrive sans ses scripts (le JSON-LD reste), `html.js` n'est jamais posé.
  if (noScript)
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const response = await route.fetch();
      const body = (await response.text()).replace(/<script\b(?![^>]*application\/ld\+json)[\s\S]*?<\/script>/g, '');
      await route.fulfill({ response, body });
    });
  const notes = [];
  const infos = [];
  const unknown = path.includes('inconnue');
  page.on('console', (m) => m.type() === 'error' && (unknown && m.text().includes('404') ? infos : notes).push(`console : ${m.text()}`));
  page.on('pageerror', (e) => notes.push(`exception : ${e.message}`));
  page.on('requestfailed', (r) => notes.push(`requête en échec : ${r.url()}`));
  page.on('request', (r) => !r.url().startsWith(base) && !r.url().startsWith('data:') && notes.push(`requête hors du site : ${r.url()}`));
  if (perf) {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      window.__perf = { lcp: 0, lcpNode: '', cls: 0, longTasks: 0 };
      new PerformanceObserver((l) => l.getEntries().forEach((e) => { __perf.lcp = e.startTime; __perf.lcpNode = e.element ? e.element.tagName + '.' + e.element.className : '?'; })).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) __perf.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((l) => l.getEntries().forEach((e) => { __perf.longTasks += Math.max(0, e.duration - 50); })).observe({ type: 'longtask', buffered: true });
    });
  }
  const response = await page.goto(base + path, { waitUntil: 'load' });
  if (perf) {
    await page.waitForTimeout(3000);
    const p = await page.evaluate(() => window.__perf);
    infos.push(`perf (CPU ÷4) : LCP ${Math.round(p.lcp)} ms sur ${p.lcpNode}, CLS ${p.cls.toFixed(3)}, blocage ${Math.round(p.longTasks)} ms`);
  }
  // Tout faire défiler, pour déclencher les apparitions, puis revenir en haut.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 1500));
  });
  const found = await page.evaluate(() => {
    const out = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > doc.clientWidth + 1) {
      const wide = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1 && !el.closest('[aria-hidden="true"]'));
      out.push(`défilement horizontal : ${doc.scrollWidth} > ${doc.clientWidth} (${wide.slice(0, 4).map((el) => el.tagName.toLowerCase() + '.' + [...el.classList].join('.')).join(', ')})`);
    }
    const hidden = [...document.querySelectorAll('main *, header *, footer *')].filter((el) => {
      if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
      // `data-reveal-repeat` se cache de nouveau hors de l'écran : voulu, relu à la main.
      if (el.closest('[aria-hidden="true"], .visually-hidden, [data-reveal-repeat]')) return false;
      for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.display === 'none' || s.visibility === 'hidden') return false; if (Number(s.opacity) < 0.05) return true; }
      return false;
    });
    if (hidden.length) out.push(`texte invisible après défilement : ${hidden.length} (${hidden.slice(0, 3).map((el) => `« ${el.textContent.trim().slice(0, 40)} »`).join(', ')})`);
    return out;
  });
  notes.push(...found);
  if (unknown) (response?.status() === 404 ? infos : notes).push(`statut de la page inconnue : ${response?.status()}`);
  else if (response && response.status() >= 400) notes.push(`statut HTTP ${response.status()}`);
  if (shots) await page.screenshot({ path: `${shots}/${label.replace(/[^\w-]+/g, '_')}.png`, fullPage: true });
  console.log(`${notes.length ? '✗' : '✓'} ${label}${notes.map((n) => `\n    ✗ ${n}`).join('')}${infos.map((n) => `\n    · ${n}`).join('')}`);
  await context.close();
}

for (const path of pages) {
  for (const width of widths)
    for (const colorScheme of ['light', 'dark'])
      for (const reducedMotion of ['no-preference', 'reduce'])
        await visit(path, { width, colorScheme, reducedMotion });
  for (const width of [390, 1440]) await visit(path, { width, colorScheme: 'light', reducedMotion: 'no-preference', noScript: true });
  await visit(path, { width: 390, colorScheme: 'light', reducedMotion: 'no-preference', perf: true });
}
await browser.close();
```

### A.5 Accessibilité automatique : `axe-pass.mjs`

axe-core (règles WCAG 2.0 à 2.2 A et AA, plus les bonnes pratiques) sur chaque page, à 390 et
1440 px, en clair et en sombre, après avoir tout fait défiler et être revenu en haut. axe ne voit
ni l'ordre de lecture, ni le sens des textes alternatifs, ni le contraste sur un dégradé ou du
verre : la zone 4 le fait à la main.

```bash
mkdir -p $W/axe && (cd $W/axe && npm init -y >/dev/null && npm i --no-audit --no-fund axe-core@4)
AXE=$W/axe/node_modules/axe-core/axe.min.js node $W/tools/axe-pass.mjs http://localhost:4321
```

```js
// axe-core (WCAG 2.2 A et AA) sur chaque page, en clair et en sombre, à 390 et 1440 px, après
// avoir tout fait défiler puis être revenu en haut (les apparitions révélées, le hero au repos).
// Un contraste signalé sur un élément animé (dégradé, verre, fondu) se revérifie à la main.
// Usage : PLAYWRIGHT_MODULE=… AXE=/chemin/axe-core/axe.min.js node axe-pass.mjs [base]
import { readFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const axe = readFileSync(process.env.AXE, 'utf8');
const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const browser = await chromium.launch();
for (const path of (process.env.PAGES ?? '/,/en/,/confidentialite/,/en/privacy/,/page-inconnue/').split(','))
  for (const width of [390, 1440])
    for (const colorScheme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, colorScheme });
      const page = await context.newPage();
      await page.goto(base + path, { waitUntil: 'load' });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
        // Retour en haut : le hero s'estompe quand on le quitte, son contraste se mesure au repos.
        scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 1500));
      });
      await page.addScriptTag({ content: axe });
      const { violations, incomplete } = await page.evaluate(() =>
        axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }));
      console.log(`${violations.length ? '✗' : '✓'} ${path} ${width}px ${colorScheme} : ${violations.length} violation(s), ${incomplete.length} à vérifier à la main`);
      for (const v of violations) console.log(`    ${v.id} (${v.impact}) × ${v.nodes.length} : ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
      await context.close();
    }
await browser.close();
```

### A.6 Lighthouse et `lh-summary.mjs`

Quatre pages, mobile (réglage par défaut : processeur et réseau simulés) et bureau, trois passages
chacune ; le rapport donne la médiane. `CHROME_PATH` : le Chromium de Playwright, ou le Chrome de
la machine.

```bash
mkdir -p $W/lh && export CHROME_PATH=/opt/pw-browsers/chromium
for page in / /en/ /confidentialite/ /en/privacy/; do
  for mode in mobile desktop; do
    for run in 1 2 3; do
      npx --yes lighthouse@13 "http://localhost:4321$page" --quiet \
        --only-categories=performance,accessibility,best-practices,seo \
        $([ $mode = desktop ] && echo --preset=desktop) \
        --output=json --output-path="$W/lh/$(echo "$page" | tr '/' '_')$mode-$run.json" \
        --chrome-flags="--headless=new --no-sandbox"
    done
  done
done
node $W/tools/lh-summary.mjs $W/lh/*.json
```

```js
// Résumé de rapports Lighthouse (JSON) : scores des quatre catégories et mesures principales.
// Usage : node lh-summary.mjs <rapport.json>…
import { readFileSync } from 'node:fs';
const audits = ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index', 'total-byte-weight'];
for (const file of process.argv.slice(2)) {
  const report = JSON.parse(readFileSync(file, 'utf8'));
  const scores = Object.values(report.categories).map((c) => `${c.title} ${Math.round(c.score * 100)}`).join(' · ');
  const values = audits.map((a) => `${a} ${report.audits[a]?.displayValue ?? '?'}`).join(' · ');
  console.log(`${file.split('/').pop()}\n  ${scores}\n  ${values}`);
}
```

### A.7 Politique de confidentialité : copie exacte de l'app

Le texte du site, sans son en-tête, contre celui de l'app, sans son titre, sa date ni son
commentaire HTML ; les deux doivent sortir « identique ». Puis comparer les dates à la main.

```bash
APP=../abilia
diff <(awk 'f>=2; /^---$/{f++}' src/content/privacy/fr.md | sed '/./,$!d' | cat -s) \
     <(sed '1,/^\*Mise à jour/d' $APP/docs/PRIVACY.md | grep -v '^<!--' | sed '/./,$!d' | cat -s) && echo "fr identique"
diff <(awk 'f>=2; /^---$/{f++}' src/content/privacy/en.md | sed '/./,$!d' | cat -s) \
     <(sed '1,/^\*Last updated/d' $APP/docs/PRIVACY.en.md | grep -v '^<!--' | sed '/./,$!d' | cat -s) && echo "en identique"
grep -m1 "updated:" src/content/privacy/fr.md src/content/privacy/en.md
grep -m1 "Mise à jour" $APP/docs/PRIVACY.md; grep -m1 "Last updated" $APP/docs/PRIVACY.en.md
grep -n "lastUpdatedDate" -A4 $APP/Abilia/Features/Settings/PrivacyPolicyView.swift | head -6
```

### A.8 Captures : `screenshots-check.sh`

Chaque capture du site comparée octet par octet à celle de l'app (le Mac, recadré, à l'œil), puis
les captures de l'app que le site n'utilise pas. `bash $W/tools/screenshots-check.sh ../abilia`
depuis la racine du site.

```bash
#!/usr/bin/env bash
# Captures du site (src/assets/screenshots/) comparées octet par octet à celles de l'app
# (docs/screenshots/), et captures de l'app que le site n'utilise pas (à relire : omission ?).
# Usage, depuis la racine du site : bash screenshots-check.sh <dépôt de l'app>
APP=${1:-../abilia}
for f in $(cd src/assets/screenshots && find . -name '*.jpg' | sort); do
  f=${f#./}
  case $f in
    ipad.jpg | en/ipad.jpg) src=$APP/docs/screenshots/${f%.jpg}/bibliotheque.jpg ;;
    # La fenêtre du Mac est recadrée pour le site (src/assets/screenshots/index.ts) : comparer à l'œil.
    mac.jpg | en/mac.jpg) echo "· $f : recadrage de ${f%.jpg}/bibliotheque.jpg, à comparer à l'œil"; continue ;;
    *) src=$APP/docs/screenshots/$f ;;
  esac
  if [ ! -f "$src" ]; then echo "✗ $f : absente de l'app ($src)"
  elif cmp -s "src/assets/screenshots/$f" "$src"; then echo "✓ $f"
  else echo "✗ $f : différente de $src"; fi
done
for f in $(cd "$APP/docs/screenshots" && find . -maxdepth 2 -name '*.jpg' -not -path './ipad/*' -not -path './mac/*' | sort); do
  [ -f "src/assets/screenshots/${f#./}" ] || echo "· ${f#./} : capture de l'app que le site n'utilise pas"
done
```

### A.9 Production, une fois le site rouvert

À ne lancer que si le réseau de la session le permet, et à noter comme tel (sans réseau : la zone
10 se juge à la lecture de `.htaccess`, en « plausible »). Lecture seule : de simples requêtes
`HEAD` et `GET`.

```bash
SITE=https://abilia-music.app      # le domaine du moment
for url in "$SITE/" "$SITE/en/" "$SITE/confidentialite/" "$SITE/en/privacy/" "$SITE/confidentialite" \
           "$SITE/page-inconnue/" "$SITE/sitemap.xml" "$SITE/robots.txt" "http://abilia-music.app/" \
           "https://www.abilia-music.app/" "https://abilia-music.fr/en/" "https://www.abilia-music.fr/"; do
  echo "== $url"; curl -sS -o /dev/null -D - --compressed "$url" | grep -iE "^(HTTP|location|cache-control|content-type|content-encoding|strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy|retry-after|x-robots)"
done
# Ressources hachées : un an, immuables ; une image du build
curl -sSI "$SITE$(curl -sS "$SITE/" | grep -oE '/_astro/[^"]+\.(avif|webp|jpg)' | head -1)" | grep -iE "^(HTTP|cache-control|content-type)"
```
