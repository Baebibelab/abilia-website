---
# Copie de docs/PRIVACY.en.md du dépôt de l'app (Baebibelab/abilia), traduction de
# src/content/privacy/fr.md, sans son titre ni sa date : même texte que la politique en anglais de
# l'app, à recopier ici à chaque modification là-bas. Le français fait foi.
updated: '2026-11-07'
---

Andia doesn’t collect any personal data. The app talks to the Jellyfin server you point it to, to
the Radio Browser directory and the stations you listen to when you use live radio, to Discogs for
public album ratings (unless you turn them off), to Ticketmaster for artists’ upcoming concerts if
you give it your Ticketmaster key, and, if you link your Last.fm or ListenBrainz account (Andia
Plus), to that service for your listens. It talks to no other service: no ads, no analytics, no
tracking.

## Your Server

The server address and the sign-in token are kept in the device’s keychain, your username in the
app’s settings (to prefill the next sign-in). Your password is only sent to your server, when you
sign in, and is never stored. To work, the app sends your server what any Jellyfin client sends:
the songs you play (for history and play counts), your favorites, and changes to playlists.

## On Your Device

Settings, the playback queue, copies of the library, each account’s last ten searches (the text
typed, to suggest them in the Search tab), cached songs and downloads stay on the device. Like any
app’s data, the settings, playback queue, library copies, recent searches and listening log are part
of the device’s backup (iCloud or computer; Time Machine on Mac) when it’s turned on; cached songs
and downloads are left out of it. Signing out from Settings › Server deletes downloads and recent
searches, removes the music sent to Apple Watch and revokes the token. Signing out from the
first-load screen, and signing in again after an expired session, also revoke the token but keep
downloads, the watch’s music, the library copy and recent searches for signing back in to the same
account: they’re erased when another account signs in. On iPhone and iPad, deleting the app erases
its settings and files, but not the keychain, which survives uninstalling: the first time a
reinstalled app launches, the previous session (whose token is then revoked), the Ticketmaster key
and the linked Last.fm and ListenBrainz accounts are erased from it; what stays there are the server
certificates you approved and the device identifier the app presents to your server. On Mac, moving
the app to the Trash erases neither the keychain nor its data folder
(~/Library/Containers/io.babilia.app): delete that folder to erase its settings and files, and the
app then starts as if reinstalled.

## Listening History (Rewind)

For your listening stats, the app keeps a log on each device of the songs played in Andia (and, from
the iPhone, in CarPlay and on Apple Watch): title, artist, album, genres, date, source, under your
account. Andia never sends it anywhere, neither to your server, nor elsewhere, nor from one device
to another: stats are calculated on the device, from its own plays. Only the device’s backup, if
turned on, keeps a copy of it, as with the app’s other data (above). Sending your listens to Last.fm
or ListenBrainz, if you link an account, is separate (below). When another Jellyfin account signs in
on the device, the log of previous accounts is erased. You can clear it at any time in Settings ›
Storage & History › Listening History; deleting the app erases it too (on Mac, deleting its data
folder).

## Public Ratings (Discogs)

Unless you turn off “Public Ratings” in Settings › Library: when you open an album’s page, the app
asks Discogs (discogs.com) for its rating, at most once a month per rated album (the next day for
an album with no rating yet). What’s sent is the artist name and the title of that album, along
with the Andia app’s identifier with Discogs and the device’s IP address, as with any connection;
no Discogs account, nor your Jellyfin account, nor the rest of your library. The ratings received
stay on the device. With “Public Ratings” turned off, nothing is sent to Discogs.

## Upcoming Concerts (Ticketmaster)

Only if you enter your own Ticketmaster key in Settings › Library: when you open an artist’s page,
the app then asks Ticketmaster (ticketmaster.com) for their upcoming concerts, at most once a day
per artist. What’s sent is that artist’s name, along with your key (so Ticketmaster can link these
requests to your developer account) and the device’s IP address, as with any connection; neither
your Jellyfin account nor the rest of your library. The key is kept in the device’s keychain and is
only sent to Ticketmaster: once to check it when you save it (with a test search, “music”), then
with each concert request; the dates received stay on the device. Without a key, or with “Upcoming
Concerts” turned off, no concerts are requested from Ticketmaster.

## Last.fm and ListenBrainz

Only if you link your account in Settings › Scrobbling (Andia Plus): every song played in Andia,
CarPlay or on Apple Watch past its halfway point (4 minutes at most) is then sent to the linked
service, Last.fm (last.fm) or ListenBrainz (listenbrainz.org), along with the song playing while you
listen. What’s sent is the title, artists, album, duration, track number and start time, along with
the Last.fm session key or the ListenBrainz token (so the service files them under your account,
which is its purpose) and the device’s IP address, as with any connection; neither your Jellyfin
account nor the rest of your library. Last.fm is linked through its own sign-in page: your Last.fm
password is never entered in Andia. The key or token is kept in the device’s keychain and is only
sent to its service; listens not sent yet (offline) wait on the device. Unlinking the account stops
all sending and erases those waiting listens. Without a linked account, or without Andia Plus,
nothing is sent.

## Live Radio

Only if you open the “Radio” tile (Settings › Library › Radio, “Live Radio”, on by default). The app
then asks the open Radio Browser directory (radio-browser.info) for the most popular stations in
your country (based on the device’s Region setting; the world’s when it has none for that country),
then for the name you search; when you start a station, it reports it to the directory (which counts
each station’s plays this way). The chosen station, and the site hosting its logo, receive the
device’s IP address, as with any online listening; no cookies are kept for these logos. Neither your
Jellyfin account nor your library is sent. Your favorite and recent stations stay on the device.
With “Live Radio” turned off, nothing is sent.

## Andia Horizon (Coming Soon)

Andia Horizon, a separate subscription, isn’t available yet: for now, the app sends nothing to its
server, and what follows will only apply once it’s released. Only if you subscribe to Andia Horizon
and agree on its welcome screen (Library › Discover). The app then sends the Andia Horizon server
(hosted by OVH), once a month: the title, artist, album, year and genres of your 500 most played
songs, with their play counts and your favorites; for the rest of your library, fingerprints
(SHA-256 of “artist|title” and “artist|album”), from which names can’t be read back directly, used
only to avoid suggesting what you already have. It also sends your discovery settings, the app’s
language and the songs you keep in your wishlist. The server recognizes your subscription from the
App Store’s signed transaction, with no account or email address, and keeps its App Store country or
region (France, for example) to look for your previews in that country’s iTunes Store; it doesn’t
receive your Jellyfin server’s address, your username, your files or the rest of your listening
history. To write your portrait and pick your suggestions, it passes this listening data, your
portrait, your settings and your feedback to Claude, Anthropic’s AI (anthropic.com), which under its
commercial terms doesn’t use it to train its models. To check suggestions and find their previews,
it queries its copy of MusicBrainz, then iTunes Search (Apple) or Deezer, with only the suggested
artist and title (and, for iTunes, your store’s country or region). With the “Recent Releases” era,
it also asks Deezer, with only artist names (some of those you listen to most), for related artists
and their latest releases, so suggestions rest on real new music. Previews and artwork come from
Apple or Deezer, which receive the device’s IP address as with any online listening; no cookie is
kept for this artwork. “Erase My Horizon Data” (Discover › Settings) erases all of this at once and
withdraws your consent. While you’re subscribed, the server keeps only the last two monthly
listening reports, the last 90 days of suggestions (always the latest list), with the date you
opened each list, and the past year’s portraits (always the latest one); everything is erased 90
days after the subscription ends or is refunded (the server’s backups, kept for 14 days, hold a copy
until then). Without a subscription, nothing is sent; once you subscribe, until you agree, only the
App Store’s signed transaction is presented to the server, to recognize your subscription (when you
open Discover, or when the subscription changes; see “Purchases”): no listening data and no names
are sent before “I Agree, Let’s Go.” Each Jellyfin account signed in on the device gives its own
consent: another account, even with the same subscription, sees the consent screen before anything
of its own is sent.

## Apple Watch

The albums and playlists you send to the watch go directly from the iPhone to the watch. The watch
doesn’t contact any server; plays made on the watch come back to the iPhone, which passes them on to
your server (and to Last.fm or ListenBrainz if you linked them).

## System Features

The names of your albums, artists and playlists are given to the system (iOS, iPadOS or macOS) so
that Siri can recognize them. They’re handled by the system as for any app, not by Andia. An
artist’s biography written in another language than the app’s can be translated by the system’s
translation feature (iOS, iPadOS or macOS), on the device: the text doesn’t leave the device, but
the system downloads the languages it lacks from Apple when you tap “Translate Bio”.

## Performance Reports

The system gives the app performance metrics and crash reports (MetricKit). They stay on the device
and are only sent if you share them yourself from Settings › About.

## Purchases

Andia Plus is bought through the App Store. Andia doesn’t receive any payment information. Andia
Plus is verified on the device, with no Andia server. Once released, Andia Horizon will also be
bought through the App Store; its server will then receive the transaction signed by the App Store
(its identifier, the chosen subscription, its end date and the App Store country or region), with no
name or payment method.

## External Links

The “Search on Qobuz” link in Search opens the Qobuz website only when you tap it; nothing is sent
to it before. Likewise, an album’s rating opens its page on discogs.com, a concert its page on
ticketmaster.com, and the “Discover Jellyfin” link on the sign-in screen the jellyfin.org website,
when you tap them.
