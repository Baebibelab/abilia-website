---
# Copie de docs/PRIVACY.en.md du dépôt de l'app (Baebibelab/abilia), traduction de
# src/content/privacy/fr.md, sans son titre ni sa date : même texte que la politique en anglais de
# l'app, à recopier ici à chaque modification là-bas. Le français fait foi.
updated: '2026-10-20'
---

Abilia doesn’t collect any personal data. The app talks to the Jellyfin server you point it to, to
the Radio Browser directory and the stations you listen to when you use live radio, and, if you
give it your Discogs token or your Ticketmaster key, to Discogs for public album ratings and to
Ticketmaster for artists’ upcoming concerts. It talks to no other service: no ads, no analytics, no
tracking.

## Your Server

The server address and the sign-in token are kept in the device’s keychain, your username in the
app’s settings (to prefill the next sign-in). Your password is only sent to your server, when you
sign in, and is never stored. To work, the app sends your server what any Jellyfin client sends:
the songs you play (for history and play counts), your favorites, and changes to playlists.

## On Your Device

Settings, the playback queue, copies of the library, cached songs and downloads stay on the device.
Signing out deletes downloads and revokes the token. On iPhone and iPad, deleting the app erases
its settings and files, but not the keychain, which survives uninstalling: the first time a
reinstalled app launches, the previous session (whose token is then revoked), the Discogs token and
the Ticketmaster key are erased from it; what stays there are the server certificates you approved
and the device identifier the app presents to your server. On Mac, moving the app to the Trash
erases neither the keychain nor its data folder (~/Library/Containers/io.babilia.app): delete that
folder to erase its settings and files, and the app then starts as if reinstalled.

## Listening History (Rewind)

For your listening stats, the app keeps a log on each device of the songs played in Abilia (and,
from the iPhone, in CarPlay and on Apple Watch): title, artist, album, genres, date, source, under
your account. It’s never sent anywhere, neither to your server, nor elsewhere, nor from one device
to another: stats are calculated on the device, from its own plays. When another Jellyfin account
signs in on the device, the log of previous accounts is erased. You can clear it at any time in
Settings › Storage & History › Listening History; deleting the app erases it too (on Mac, deleting
its data folder).

## Public Ratings (Discogs)

Only if you enter your own Discogs token in Settings › Library: when you open an album’s page, the
app then asks Discogs (discogs.com) for its rating, at most once a month per rated album (the next
day for an album with no rating yet). What’s sent is the artist name and the title of that album,
along with your token (so Discogs can link these requests to your Discogs account) and the device’s
IP address, as with any connection; neither your Jellyfin account nor the rest of your library. The
token is kept in the device’s keychain and is only sent to Discogs; the ratings received stay on
the device. Without a token, or with “Public Ratings” turned off, nothing is sent to Discogs.

## Upcoming Concerts (Ticketmaster)

Only if you enter your own Ticketmaster key in Settings › Library: when you open an artist’s page,
the app then asks Ticketmaster (ticketmaster.com) for their upcoming concerts, at most once a day
per artist. What’s sent is that artist’s name, along with your key (so Ticketmaster can link these
requests to your developer account) and the device’s IP address, as with any connection; neither
your Jellyfin account nor the rest of your library. The key is kept in the device’s keychain and is
only sent to Ticketmaster; the dates received stay on the device. Without a key, or with “Upcoming
Concerts” turned off, nothing is sent to Ticketmaster.

## Live Radio

Only if you open the “Radio” tile (Settings › Library › Radio, “Live Radio”, on by default). The
app then asks the open Radio Browser directory (radio-browser.info) for the most popular stations
in your country (based on the device’s Region setting), then for the name you search; when you
start a station, it reports it to the directory (which counts each station’s plays this way). The
chosen station, and the site hosting its logo, receive the device’s IP address, as with any online
listening. Neither your Jellyfin account nor your library is sent. Your favorite and recent
stations stay on the device. With “Live Radio” turned off, nothing is sent.

## Apple Watch

The albums and playlists you send to the watch go directly from the iPhone to the watch. The watch
doesn’t contact any server; plays made on the watch come back to the iPhone, which passes them on
to your server.

## Siri and Shortcuts

The names of your albums, artists and playlists are given to the system (iOS, iPadOS or macOS) so
that Siri can recognize them. They’re handled by the system as for any app, not by Abilia.

## Performance Reports

The system gives the app performance metrics and crash reports (MetricKit). They stay on the device
and are only sent if you share them yourself from Settings › About.

## Purchases

Abilia Plus is bought through the App Store. Abilia doesn’t receive any payment information; the
purchase is verified on the device, with no Abilia server.

## External Links

The “Search on Qobuz” link in Search opens the Qobuz website only when you tap it; nothing is sent
to it before. Likewise, an album’s rating opens its page on discogs.com, a concert its page on
ticketmaster.com, and the “Discover Jellyfin” link on the sign-in screen the jellyfin.org website,
when you tap them.
