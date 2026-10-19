// Captures de l'app dans la langue de la page : françaises ici, anglaises dans `en/`, sous le
// même nom de fichier (copiées de `docs/screenshots/` et `docs/screenshots/en/` du dépôt de
// l'app ; 590 × 1278).
import type { ImageMetadata } from 'astro';
import type { Lang } from '../../i18n/ui';

import album from './album.jpg';
import bibliotheque from './bibliotheque.jpg';
import egaliseur from './egaliseur.jpg';
import enLecture from './en-lecture.jpg';
import paroles from './paroles.jpg';
import telechargements from './telechargements.jpg';
import enAlbum from './en/album.jpg';
import enBibliotheque from './en/bibliotheque.jpg';
import enEgaliseur from './en/egaliseur.jpg';
import enEnLecture from './en/en-lecture.jpg';
import enParoles from './en/paroles.jpg';
import enTelechargements from './en/telechargements.jpg';

export interface Screenshots {
  album: ImageMetadata;
  library: ImageMetadata;
  equalizer: ImageMetadata;
  nowPlaying: ImageMetadata;
  lyrics: ImageMetadata;
  downloads: ImageMetadata;
}

const shots: Record<Lang, Screenshots> = {
  fr: {
    album,
    library: bibliotheque,
    equalizer: egaliseur,
    nowPlaying: enLecture,
    lyrics: paroles,
    downloads: telechargements,
  },
  en: {
    album: enAlbum,
    library: enBibliotheque,
    equalizer: enEgaliseur,
    nowPlaying: enEnLecture,
    lyrics: enParoles,
    downloads: enTelechargements,
  },
};

export function screenshots(lang: Lang): Screenshots {
  return shots[lang];
}

/*
 * Captures iPad et Mac, à fournir (section « iPad et Mac », sections/BigScreens.astro) : il suffit
 * de déposer le fichier sous ce nom, aucun code à changer. Tant qu'il manque, la section dessine
 * l'écran en CSS à la place, et `npm run dev` le signale sur l'emplacement.
 *
 *   ipad.jpg, en/ipad.jpg  iPad en paysage, écran entier sans cadre (4:3, au moins 2048 × 1536 :
 *                          simulateur « iPad Pro 13 pouces », ⌘S) : l'accueil de la Bibliothèque
 *                          avec le mini-lecteur en train de jouer (texte `screenshot.ipad`).
 *   mac.jpg, en/mac.jpg    Mac, la fenêtre seule sans son ombre (⇧⌘4, Espace, ⌥ + clic), vers
 *                          1440 × 900 points, donc 2880 × 1800 pixels sur un écran Retina : la
 *                          page d'un album (texte `screenshot.mac`).
 *
 * Même rangement que les autres : en français ici, en anglais dans en/, et copiées aussi dans
 * docs/screenshots/ (et docs/screenshots/en/) du dépôt de l'app.
 */
const optional = import.meta.glob<{ default: ImageMetadata }>(['./ipad.jpg', './mac.jpg', './en/ipad.jpg', './en/mac.jpg'], {
  eager: true,
});

export interface BigScreenshots {
  ipad: ImageMetadata | null;
  mac: ImageMetadata | null;
}

export function bigScreenshots(lang: Lang): BigScreenshots {
  const dir = lang === 'fr' ? './' : `./${lang}/`;
  return {
    ipad: optional[`${dir}ipad.jpg`]?.default ?? null,
    mac: optional[`${dir}mac.jpg`]?.default ?? null,
  };
}
