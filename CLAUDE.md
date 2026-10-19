# CLAUDE.md

Site vitrine d'Abilia (l'app iOS est dans le dépôt `Baebibelab/abilia`) : Astro statique,
français à la racine et anglais sous `/en/`, hébergé sur OVH. Lire
[docs/CONVENTIONS.md](docs/CONVENTIONS.md) avant de toucher au code : couleurs, composants,
moteur d'animation (`data-reveal`, `data-scroll`), textes dans `src/i18n/ui.ts`, découpage de
l'accueil en fichiers.

- Code, commentaires et messages de commit en français (`feat: …`, `fix: …`), comme l'app.
- Aucune dépendance côté navigateur sans en discuter ; Astro seul au build.
- Tout texte visible passe par `src/i18n/ui.ts`, dans les deux langues.
- Tout mouvement sous `prefers-reduced-motion: no-preference` ; rien de caché sans JavaScript.
- Avant une PR : `npm run check` et `npm run build`, puis un rendu en clair, en sombre, à 390 px
  de large (aucun défilement horizontal) et avec les animations réduites.
- Captures de l'app : `src/assets/screenshots/` en français, `src/assets/screenshots/en/` en
  anglais, sous les mêmes noms (copiées de `docs/screenshots/` et `docs/screenshots/en/` du dépôt
  de l'app ; les remplacer là-bas aussi quand elles changent). Les sections les prennent par
  `screenshots(lang)` (`src/assets/screenshots/index.ts`), jamais par un import direct.
