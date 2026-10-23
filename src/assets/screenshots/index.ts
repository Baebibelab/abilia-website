// Captures de l'app dans la langue de la page : françaises ici, anglaises dans `en/`, sous le
// même nom de fichier (copiées de `docs/screenshots/` et `docs/screenshots/en/` du dépôt de
// l'app ; 590 × 1282).
import type { ImageMetadata } from 'astro';
import type { Lang } from '../../i18n/ui';

import album from './album.jpg';
import artiste from './artiste.jpg';
import bibliotheque from './bibliotheque.jpg';
import egaliseur from './egaliseur.jpg';
import enLecture from './en-lecture.jpg';
import paroles from './paroles.jpg';
import telechargements from './telechargements.jpg';
import enAlbum from './en/album.jpg';
import enArtiste from './en/artiste.jpg';
import enBibliotheque from './en/bibliotheque.jpg';
import enEgaliseur from './en/egaliseur.jpg';
import enEnLecture from './en/en-lecture.jpg';
import enParoles from './en/paroles.jpg';
import enTelechargements from './en/telechargements.jpg';

export interface Screenshots {
  album: ImageMetadata;
  artist: ImageMetadata;
  library: ImageMetadata;
  equalizer: ImageMetadata;
  nowPlaying: ImageMetadata;
  lyrics: ImageMetadata;
  downloads: ImageMetadata;
}

const shots: Record<Lang, Screenshots> = {
  fr: {
    album,
    artist: artiste,
    library: bibliotheque,
    equalizer: egaliseur,
    nowPlaying: enLecture,
    lyrics: paroles,
    downloads: telechargements,
  },
  en: {
    album: enAlbum,
    artist: enArtiste,
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
 * Captures iPad et Mac (section « iPad et Mac », sections/BigScreens.astro) : copiées de
 * docs/screenshots/ipad/bibliotheque.jpg et docs/screenshots/mac/bibliotheque.jpg du dépôt de l'app
 * (et de leurs versions en/). Si l'une manque, la section dessine l'écran en CSS à la place, et
 * `npm run dev` le signale sur l'emplacement.
 *
 *   ipad.jpg, en/ipad.jpg  iPad tenu verticalement, écran entier sans cadre (3:4, 1000 × 1333) :
 *                          l'accueil de la Bibliothèque (texte `screenshot.ipad`).
 *   mac.jpg, en/mac.jpg    Mac, la fenêtre seule, recadrée au bord de la fenêtre (sans l'ombre ni
 *                          le fond blanc de la capture de l'app, 902 × 675) : l'accueil de la
 *                          Bibliothèque (texte `screenshot.mac`).
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
