---
# Copie de docs/PRIVACY.md du dépôt de l'app (Baebibelab/abilia), sans son titre ni sa date :
# même texte, à recopier ici à chaque modification là-bas (avec la date et la traduction anglaise).
updated: '2026-10-20'
---

Abilia ne collecte aucune donnée personnelle. L'app parle au serveur Jellyfin que vous lui
indiquez, à l'annuaire Radio Browser et aux radios que vous écoutez quand vous utilisez les radios
en direct, et, si vous lui donnez votre jeton Discogs ou votre clé Ticketmaster, à Discogs pour les
notes du public des albums et à Ticketmaster pour les concerts à venir des artistes ; à aucun autre
service : ni publicité, ni mesure d'audience, ni suivi.

## Votre serveur

L'adresse du serveur et le jeton de connexion sont gardés dans le trousseau de l'appareil, votre
nom d'utilisateur dans les réglages de l'app (pour préremplir la connexion suivante). Votre mot de
passe n'est envoyé qu'à votre serveur, au moment de la connexion, et n'est jamais enregistré. Pour
son fonctionnement, l'app envoie à votre serveur ce que tout client Jellyfin lui envoie : les
morceaux écoutés (pour l'historique et les compteurs d'écoute), les favoris, les modifications de
playlists.

## Sur l'appareil

Les réglages, la file de lecture, les copies de la bibliothèque, les pistes mises en cache et les
téléchargements restent sur l'appareil. La déconnexion supprime les téléchargements et révoque le
jeton. Sur iPhone et iPad, la suppression de l'app efface ses réglages et ses fichiers, mais pas le
trousseau, qui survit à la désinstallation : au premier lancement d'une app réinstallée, la session
précédente (dont le jeton est alors révoqué), le jeton Discogs et la clé Ticketmaster en sont
effacés ; y restent les certificats de serveur que vous avez approuvés et l'identifiant d'appareil
que l'app présente à votre serveur. Sur Mac, mettre l'app à la corbeille n'efface ni le trousseau
ni son dossier de données (~/Library/Containers/io.babilia.app) : supprimez ce dossier pour effacer
ses réglages et ses fichiers, et l'app redémarre alors comme réinstallée.

## Historique d'écoute (Rewind)

Pour vos statistiques d'écoute, l'app tient sur chaque appareil un journal des morceaux écoutés
dans Abilia (et, depuis l'iPhone, dans CarPlay et sur l'Apple Watch) : titre, artiste, album,
genres, date, source, au nom de votre compte. Il n'est jamais envoyé nulle part, ni à votre
serveur, ni ailleurs, ni d'un appareil à l'autre : les statistiques sont calculées sur l'appareil,
d'après ses propres écoutes. Quand un autre compte Jellyfin se connecte sur l'appareil, le journal
des comptes précédents est effacé. Vous pouvez l'effacer à tout moment dans Réglages › Stockage et
historique › Historique d'écoute ; la suppression de l'app l'efface aussi (sur Mac, celle de son
dossier de données).

## Notes du public (Discogs)

Seulement si vous saisissez votre propre jeton Discogs dans Réglages › Bibliothèque : quand vous
ouvrez la page d'un album, l'app demande alors sa note à Discogs (discogs.com), au plus une fois
par mois par album noté (le lendemain pour un album encore sans note). Sont envoyés le nom de
l'artiste et le titre de cet album, avec votre jeton (Discogs peut donc relier ces demandes à votre
compte Discogs) et l'adresse IP de l'appareil comme pour toute connexion ; ni votre compte
Jellyfin, ni le reste de la bibliothèque. Le jeton est gardé dans le trousseau de l'appareil et
n'est envoyé qu'à Discogs ; les notes reçues restent sur l'appareil. Sans jeton, ou avec « Notes du
public » désactivé, rien n'est envoyé à Discogs.

## Concerts à venir (Ticketmaster)

Seulement si vous saisissez votre propre clé Ticketmaster dans Réglages › Bibliothèque : quand vous
ouvrez la page d'un artiste, l'app demande alors ses prochains concerts à Ticketmaster
(ticketmaster.com), au plus une fois par jour par artiste. Est envoyé le nom de cet artiste, avec
votre clé (Ticketmaster peut donc relier ces demandes à votre compte développeur) et l'adresse IP
de l'appareil comme pour toute connexion ; ni votre compte Jellyfin, ni le reste de la
bibliothèque. La clé est gardée dans le trousseau de l'appareil et n'est envoyée qu'à Ticketmaster
; les dates reçues restent sur l'appareil. Sans clé, ou avec « Concerts à venir » désactivé, rien
n'est envoyé à Ticketmaster.

## Radios en direct

Seulement si vous ouvrez la tuile « Radios » (Réglages › Bibliothèque › Radios, « Radios en direct
», activé par défaut). L'app demande alors à l'annuaire ouvert Radio Browser (radio-browser.info)
les radios les plus écoutées de votre pays (d'après le réglage Région de l'appareil), puis le nom
que vous cherchez ; quand vous lancez une radio, elle le signale à l'annuaire (qui compte ainsi les
écoutes de chaque radio). La radio choisie, et le site qui héberge son logo, reçoivent l'adresse IP
de l'appareil, comme pour toute écoute en ligne. Ni votre compte Jellyfin, ni votre bibliothèque ne
sont envoyés. Vos radios favorites et récentes restent sur l'appareil. Avec « Radios en direct »
désactivé, rien n'est envoyé.

## Apple Watch

Les albums et playlists que vous envoyez à la montre passent directement de l'iPhone à la montre.
La montre ne contacte aucun serveur ; les écoutes faites sur la montre reviennent à l'iPhone, qui
les transmet à votre serveur.

## Siri et Raccourcis

Les noms de vos albums, artistes et playlists sont donnés au système (iOS, iPadOS ou macOS) pour
que Siri les reconnaisse. Ils sont traités par celui-ci comme pour toute app, pas par Abilia.

## Rapports de performance

Le système remet à l'app des mesures de performance et des rapports de plantage (MetricKit). Ils
restent sur l'appareil, et ne sont envoyés que si vous les partagez vous-même depuis Réglages › À
propos.

## Achats

Abilia Plus s'achète par l'App Store. Abilia ne reçoit aucune information de paiement ; l'achat
est vérifié sur l'appareil, sans serveur d'Abilia.

## Liens externes

Le lien « Chercher sur Qobuz » de la recherche ouvre le site de Qobuz seulement quand vous le
touchez ; rien ne lui est envoyé avant. De même, la note d'un album ouvre sa page sur discogs.com,
un concert sa page sur ticketmaster.com, et le lien « Découvrir Jellyfin » de l'écran de connexion
le site jellyfin.org, quand vous les touchez.
