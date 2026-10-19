# Conventions du site Abilia

Ce qu'il faut savoir pour ajouter ou modifier une page, une section ou une animation. Le site
est un site **statique** Astro (aucun serveur, aucune dépendance côté navigateur), en français
à la racine et en anglais sous `/en/`, mis en ligne sur l'hébergement mutualisé OVH.

## Arborescence

```
src/
  assets/screenshots/   captures de l'app (590 × 1278), optimisées par astro:assets : en
                        français, en anglais dans en/, servies par screenshots(lang) (index.ts)
                        ; ipad.jpg et mac.jpg (facultatives, bigScreenshots(lang)) : tant
                        qu'elles manquent, la section iPad et Mac dessine l'écran en CSS
  components/           briques partagées (Header, Footer, Section, PhoneFrame, AppIcon…)
  components/home/      l'accueil : Home.astro assemble Hero.astro puis sections/*.astro
  components/privacy/   la page Confidentialité (mise en page commune aux deux langues)
  content/privacy/      le texte de la politique : fr.md (copie de l'app), en.md (traduction)
  i18n/ui.ts            tous les textes (fr + en) et la table des pages (`routes`)
  layouts/Base.astro    <head> (SEO, Open Graph, icônes), fond animé, en-tête, pied de page
  pages/                pages françaises ; pages/en/ leurs équivalents anglais ;
                        robots.txt.ts et sitemap.xml.ts, générés à partir de `routes`
  scripts/motion.ts     moteur d'animation au scroll (data-reveal, data-scroll)
  styles/global.css     couleurs, typographie, boutons, verre
  styles/motion.css     états des apparitions data-reveal
public/                 copié tel quel : .htaccess (OVH), favicons, apple-touch-icon,
                        og/ (images de partage)
scripts/og/             modèle des images de partage et rendu des icônes PNG (render.mjs)
```

L'accueil est découpé pour que plusieurs personnes y travaillent sans se marcher dessus :
`Hero.astro` pour le haut de page, un fichier par section dans `components/home/sections/`, et
`Home.astro` qui ne fait que les mettre dans l'ordre. Une nouvelle section = un nouveau fichier
dans `sections/` + une ligne dans `Home.astro`. Les composants propres à une section restent
dans son dossier (`sections/<nom>/…`, `hero/` pour le hero) tant qu'une autre section ne s'en sert pas.

## Direction artistique

Reprise de l'app (`Utilities/Theme.swift`, `AccentColor`, l'icône) : le **corail** de l'icône,
la **sarcelle** de la couleur d'accent, des **halos** sarcelle / indigo / violet très flous, des
cartes en **verre**. Clair et sombre suivent le système, comme l'app.

Variables CSS (`src/styles/global.css`), toujours elles plutôt qu'une couleur en dur :

| Variable | Rôle |
| --- | --- |
| `--coral`, `--coral-strong` | couleur de la marque (icône), points d'accent, dégradés |
| `--coral-text` | le corail pour du **texte** (surtitres, « Bientôt ») : plus sombre en clair |
| `--teal` | couleur d'accent de l'app : icônes, états actifs, focus |
| `--teal-text` | la sarcelle pour du **texte** (liens) : plus sombre en clair |
| `--teal-strong`, `--purple-strong` | pastilles sous une icône blanche |
| `--indigo`, `--purple` | couleurs des halos et des dégradés |
| `--bg`, `--bg-elevated` | fond de page, fond d'un élément posé dessus |
| `--text`, `--text-secondary`, `--text-tertiary` | texte principal, secondaire, discret |
| `--border` | filets |
| `--glass-bg`, `--glass-border`, `--glass-shadow` | cartes en verre |
| `--halo-*` | couleurs (avec transparence) des halos du fond |
| `--radius-card`, `--radius-pill` | coins des cartes (28 px), des pastilles |
| `--gutter`, `--content-width`, `--header-height` | mise en page |
| `--ease-out` | courbe de toutes les transitions |

Classes utilitaires : `.container` (largeur de contenu + marges, 16 px minimum sur téléphone),
`.glass` (carte en verre, comme `glassCard()`), `.gradient-text` (corail → violet → sarcelle,
pour un mot ou une ligne de titre, pas un paragraphe), `.button` + `.button--primary` /
`.button--ghost`, `.visually-hidden`.

Contraste : tout texte atteint 4,5:1 (WCAG AA) en clair comme en sombre. `--coral` et `--teal`
n'y arrivent pas sur le fond clair : pour un texte, prendre `--coral-text` / `--teal-text`, et
`--text-tertiary` plutôt que des opacités maison. Vérifier avec axe ou Lighthouse (Accessibilité).

Typographie : la police système (SF Pro sur les appareils Apple, comme l'app), aucune police
téléchargée. Titres en `font-weight: 800`, interlettrage négatif, tailles en `clamp()`.

Le fond (`components/Halos.astro`) est commun à toutes les pages : ne pas en ajouter un autre
par section. Une section peut poser ses propres halos ou dégradés locaux par-dessus.

## Composants partagés

- `Section` : `id`, `eyebrow`, `title`, `lead`, `align` (`start` / `center`), puis le contenu ;
  l'en-tête apparaît au scroll. Les ancres du menu sont `features`, `offline`, `everywhere`.
- `PhoneFrame` : un iPhone dessiné en CSS avec une capture (`src`, `alt`, `width`, `loading`).
  La largeur se règle aussi par `--phone-width` sur un parent. Le contenu passé entre ses
  balises se pose par-dessus la capture, dans l'écran (le hero y anime le spectre).
- `AppStoreButton` : pastille « Bientôt sur l'App Store » tant que `APP_STORE_URL`
  (`src/config.ts`) est vide. Le jour du lancement, utiliser le **badge officiel d'Apple**, tel
  quel ; ne jamais dessiner un faux badge ni utiliser le logo Apple ailleurs.
- `AppIcon` : l'icône en SVG (`size`, `label` si elle doit être lue).
- `Glyph` : petites icônes au trait (`name`, `size`), décoratives ; en ajouter une = un tracé
  24 × 24 de plus dans la table du composant.
- `FeatureCard` : carte en verre avec une icône blanche sur pastille de couleur (`icon`, `tone`,
  `title`, `text`), comme les catégories des Réglages de l'app.

Réglages dans `src/config.ts` :

- `APP_STORE_URL` et `APP_STORE_ID` : le jour du lancement, le lien et l'identifiant de l'app ;
  le bouton devient un lien, la fiche schema.org reçoit l'adresse, Safari sur iPhone affiche sa
  bannière d'app.
- `CARPLAY_AVAILABLE`, à passer à `true` le jour où Apple accorde le droit CarPlay. D'ici là, la
  section « Partout » le marque « Bientôt » et rien d'autre n'en parle : une clé de `ui.ts` qui a
  une variante `<clé>.carplay` (description, hero) la donne à la place quand c'est vrai, sans
  rien changer aux composants. Penser alors à l'image de partage (voir plus bas).
- `IPAD_AVAILABLE` et `MAC_AVAILABLE`, à passer à `true` le jour où l'app sort sur iPad, sur Mac
  (PR #222 et #223 de l'app). D'ici là, la section « iPad et Mac » n'est construite qu'avec
  `npm run dev` (pour la relire) et aucune page publiée n'en parle ; ensuite, la plateforme rejoint
  `{platforms}` (« Pour iPhone, iPad, Mac et Apple Watch », description) et `{devices}`
  (« pensée pour l'iPhone, l'iPad et le Mac », chapeau du hero), que `useTranslations` remplit
  dans tous les textes de `ui.ts`, et la section paraît, l'autre plateforme y portant « Bientôt ».
  Penser alors à la ligne des plateformes de `scripts/og/og.html` et aux images de partage.
- `APP_LANGUAGES` : langues de l'interface de l'app (`['fr']`). Une page dans une autre langue le
  dit sous l'appel du hero, puisque l'app et ses captures sont en français.
- `JELLYFIN_URL`.

Les sections de l'accueil, dans l'ordre : `Jellyfin` (`#features`), `Listen` (visite épinglée
En lecture, paroles, égaliseur, page d'album), `Gapless` (enchaînement et fondu), `Stations`,
`Offline` (`#offline`), `Rewind`, `BigScreens` (`#ipad-mac`, iPad et Mac, voir
`IPAD_AVAILABLE`), `Everywhere` (`#everywhere`, Apple Watch et CarPlay).

## Animations

Le moteur (`src/scripts/motion.ts`, chargé par `Base.astro`) se pilote par attributs HTML.

### Apparition : `data-reveal`

```astro
<h2 data-reveal>…</h2>                        <!-- monte en fondu (défaut : up) -->
<div data-reveal="scale" data-reveal-delay="200">…</div>
<ul data-reveal-stagger="80">                 <!-- les enfants data-reveal se suivent -->
  <li data-reveal>…</li>
  <li data-reveal>…</li>
</ul>
<p data-reveal="fade" data-reveal-repeat>…</p>  <!-- disparaît en quittant l'écran -->
```

Valeurs : `up`, `down`, `left`, `right`, `scale`, `fade`, `blur`. Distance et durée se règlent
par `--reveal-distance` (40 px) et `--reveal-duration` (0,9 s) sur l'élément.

### Progression du scroll : `data-scroll`

L'élément reçoit `--progress` : 0 quand son haut touche le bas de l'écran, 1 quand son bas
quitte le haut. Le CSS en fait ce qu'il veut :

```css
@media (prefers-reduced-motion: no-preference) {
  .visual .phone {
    transform: translateY(calc((var(--progress, 0.5) - 0.5) * -80px));
  }
}
```

`data-scroll="pin"` sert aux passages épinglés : un conteneur haut (par ex. `height: 300vh`)
dont l'enfant est `position: sticky; top: 0`. `--progress` va alors de 0 (le conteneur arrive
en haut) à 1 (sa fin arrive en bas) : c'est le temps pendant lequel l'enfant reste à l'écran,
idéal pour faire défiler des écrans dans un iPhone fixe ou enchaîner des titres.

Pour changer de contenu pendant un passage épinglé sans JavaScript à soi, voir
`sections/Listen.astro` : chaque étape fait un écran de haut, donc
`--t: calc(var(--progress) * (N - 1) + 0.5)` vaut l'indice de l'étape centrée, et chaque calque
en tire son opacité avec `clamp()`. Le passage épinglé ne s'applique que sous `html.js` (sans
JavaScript, chaque étape montre son propre visuel).

`data-page-progress` donne à l'élément `--page-progress`, la progression de la page entière (0 en
haut, 1 en bas) : le fond (`Halos.astro`) s'en sert. Le poser sur l'élément qui l'utilise, pas
sur `<html>` : une variable qui change à la racine fait recalculer les styles de toute la page à
chaque image. `<html>` porte la classe `is-scrolled` dès que la page a défilé.

### Règles

- **Accessibilité** : tout mouvement (translation, rotation, échelle, parallaxe) va dans
  `@media (prefers-reduced-motion: no-preference)`. Avec « Réduire les animations », le moteur
  révèle tout d'emblée ; seuls des fondus de couleur ou d'opacité restent permis. Les effets de
  flou et de verre ont un repli sous `prefers-reduced-transparency: reduce`.
- **Sans JavaScript**, rien ne doit rester caché : les états de départ ne valent que sous
  `html.js` (déjà le cas pour `data-reveal` ; à respecter pour toute animation maison).
- **Performance** : n'animer que `transform`, `opacity` (et `filter` pour une apparition). Pas
  d'écouteur `scroll` à soi : passer par `data-scroll` et `--progress`, que le moteur ne calcule
  que pour les éléments proches de l'écran, une fois par image.
- Une boucle infinie (halos, pulsation) se coupe aussi avec « Réduire les animations ».
  Le bloc qui la contient porte `data-loop` : le moteur la met en pause tant qu'il est loin de
  l'écran (le fond, toujours visible, n'en a pas besoin).
- Pas de bibliothèque d'animation (GSAP, Lenis…) sans en discuter : le site n'a aujourd'hui
  aucune dépendance côté navigateur.

## Textes et langues

Tous les textes sont dans `src/i18n/ui.ts`, en français puis en anglais. Le type de l'objet
anglais oblige à traduire chaque clé : `npm run check` échoue sinon. Les clés sont préfixées par
leur zone (`hero.`, `features.`, `offline.`…). Dans un composant :

```astro
---
import { type Lang, useTranslations } from '../i18n/ui';
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<h2>{t('features.title')}</h2>
```

Les composants reçoivent toujours `lang` en prop. Les textes alternatifs des captures vont
aussi dans `ui.ts` (`screenshot.*`).

**Nouvelle page** : l'ajouter à `routes` dans `ui.ts` avec son adresse dans chaque langue (les
adresses peuvent différer, par ex. `/confidentialite/` et `/en/privacy/`), puis créer
`src/pages/<page>.astro` et `src/pages/en/<page>.astro`, qui passent `alternates={routes.<page>}`,
`title` et `description` à `Base` (sélecteur de langue, balises hreflang, Open Graph). Le plan du
site (`/sitemap.xml`) la reprend tout seul.

**Politique de confidentialité** : `src/content/privacy/fr.md` est la copie de
`docs/PRIVACY.md` de l'app (sans son titre ni sa date, reportée dans `updated`), à recopier mot
pour mot à chaque changement là-bas : c'est l'adresse donnée à App Store Connect, et le texte
doit rester celui de l'app (`PrivacyPolicyView`). `en.md` est de même la copie de
`docs/PRIVACY.en.md` (la politique anglaise de l'app, depuis qu'elle est traduite), dans le même
commit ; le français fait foi.

**Images de partage** : `public/og/abilia-<langue>.jpg` (1200 × 630), rendues depuis
`scripts/og/og.html` par `node scripts/og/render.mjs` (Playwright installé sur la machine, pas
dans le projet), qui refait aussi `apple-touch-icon.png` et `favicon-32.png`. Les régénérer quand
le titre, la capture En lecture ou les plateformes changent.

Ton : celui du README de l'app, chaleureux et concret, en vouvoyant ; l'anglais est une vraie
traduction, pas un mot à mot.

## Vérifier et mettre en ligne

```bash
npm install
npm run dev       # http://localhost:4321, rechargement à chaud
npm run check     # types et textes manquants
npm run build     # site statique dans dist/
npm run preview   # sert dist/ comme en production
```

Avant une PR : `npm run check` et `npm run build` sans erreur, et un coup d'œil en clair, en
sombre, sur téléphone (390 px, aucun défilement horizontal) et avec « Réduire les animations ».
Un halo ou une pastille qui déborde d'une section doit être coupé par elle (`overflow-x: clip`,
qui garde les passages épinglés, contrairement à `hidden`) : vérifier aussi vers 1024 px, la
largeur où les colonnes sont les plus serrées. Repères à garder : Lighthouse à 100 sur les quatre
catégories, aucune erreur axe, CLS à 0.

La CI (`.github/workflows/ci.yml`) refait `check` et `build` sur chaque PR. Le déploiement
(`.github/workflows/deploy.yml`) envoie `dist/` sur OVH à chaque push sur `main`, une fois les
secrets `OVH_HOST`, `OVH_USER`, `OVH_PASSWORD` définis (détails en tête du fichier). Les règles
Apache (redirection vers le domaine principal, HTTPS, cache, page 404, en-têtes de sécurité) sont
dans `public/.htaccess`.

Domaine principal : `https://abilia-music.app` (`site` dans `astro.config.mjs`, repris par les
liens canoniques, hreflang, Open Graph, `robots.txt` et le plan du site). `abilia-music.fr` et les
« www » sont rattachés au même hébergement OVH (multisite, dossier `www`, certificat SSL activé
pour chacun) et redirigent en 301 vers le domaine principal, même chemin.
