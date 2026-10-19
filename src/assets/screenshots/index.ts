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
