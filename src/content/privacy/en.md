---
# Traduction de src/content/privacy/fr.md (copie de docs/PRIVACY.md de l'app) : la tenir à jour
# avec le français, qui fait foi. Les libellés de l'app restent en français (elle n'est pas
# traduite), suivis de leur traduction entre parenthèses.
updated: '2026-10-19'
---

Abilia collects no personal data. The app talks to the Jellyfin server you point it to, to the
Radio Browser directory and the stations you listen to when you use live radio, and, if you give it
your Discogs token or your Ticketmaster key, to Discogs for public album ratings and to
Ticketmaster for artists' upcoming concerts; to no other service: no advertising, no analytics, no
tracking.

## Your server

The server address and the sign-in token are kept in the iPhone's keychain, your username in the
app's settings (to prefill your next sign-in). Your password is only sent to your server, when you
sign in, and is never stored. To work, the app sends your server what any Jellyfin client sends it:
the tracks you play (for its history and play counts), your favorites, and your playlist changes.

## On your iPhone

Settings, the play queue, copies of the library, cached tracks and downloads stay on the device.
Signing out deletes the downloads and revokes the token. Deleting the app erases its settings and
files, but not the iPhone's keychain, which outlives the app: the first time a reinstalled app
launches, it erases the previous session (whose token is then revoked), the Discogs token and the
Ticketmaster key from it; what stays there is the server certificates you approved and the device
identifier the app presents to your server.

## Listening history (Rewind)

For your listening stats, the app keeps on the iPhone a journal of the tracks played in Abilia,
CarPlay and on the Apple Watch (title, artist, album, genres, date, source), under your account. It
is never sent anywhere, neither to your server nor elsewhere: the stats are computed on the iPhone.
When another Jellyfin account signs in on the iPhone, the journal of the previous accounts is
erased. You can erase it at any time in Réglages › Stockage et historique › Historique d'écoute (Settings › Storage and history ›
Listening history);
deleting the app erases it too.

## Public ratings (Discogs)

Only if you enter your own Discogs token in Réglages › Bibliothèque (Settings › Library): when you open an album's page, the
app then asks Discogs (discogs.com) for its rating, at most once a month per rated album (the next
day for an album without a rating yet). What is sent is the artist's name and the title of that
album, with your token (so Discogs can link these requests to your Discogs account) and the
iPhone's IP address, as with any connection; neither your Jellyfin account nor the rest of your
library. The token is kept in the iPhone's keychain and only sent to Discogs; the ratings received
stay on the iPhone. Without a token, or with “Notes du public” (public ratings) turned off, nothing is sent to
Discogs.

## Upcoming concerts (Ticketmaster)

Only if you enter your own Ticketmaster key in Réglages › Bibliothèque (Settings › Library): when you open an artist's page,
the app then asks Ticketmaster (ticketmaster.com) for their next concerts, at most once a day per
artist. What is sent is that artist's name, with your key (so Ticketmaster can link these requests
to your developer account) and the iPhone's IP address, as with any connection; neither your
Jellyfin account nor the rest of your library. The key is kept in the iPhone's keychain and only
sent to Ticketmaster; the dates received stay on the iPhone. Without a key, or with “Concerts à
venir” (upcoming concerts) turned off, nothing is sent to Ticketmaster.

## Live radio

Only if you open the “Radios” tile (Réglages › Bibliothèque › Radios, “Radios en direct”, on by
default). The
app then asks the open Radio Browser directory (radio-browser.info) for the most listened-to
stations in your country (based on the iPhone's Region setting), then for the name you search for;
when you start a station, the app tells the directory (which counts each station's plays that way).
The chosen station, and the site hosting its logo, receive the iPhone's IP address, as with any
online listening. Neither your Jellyfin account nor your library is sent. Your favorite and recent
stations stay on the iPhone. With “Radios en direct” turned off, nothing is sent.

## Apple Watch

The albums and playlists you send to the watch go straight from the iPhone to the watch. The watch
contacts no server; what you play on the watch comes back to the iPhone, which passes it on to your
server.

## Siri and Shortcuts

The names of your albums, artists and playlists are given to iOS so that Siri recognizes them. They
are handled by the system as for any app, not by Abilia.

## Performance reports

iOS hands the app performance measurements and crash reports (MetricKit). They stay on the iPhone,
and are only sent if you share them yourself from Réglages › À propos (Settings › About).

## Tips

Tips go through the App Store. Abilia receives no payment information.

## External links

The “Chercher sur Qobuz” (search on Qobuz) link in search opens the Qobuz website only when you tap it; nothing is sent
to it before. Likewise, an album's rating opens its page on discogs.com, a concert its page on
ticketmaster.com, and the “Découvrir Jellyfin” link on the sign-in screen the jellyfin.org website,
when you tap them.
