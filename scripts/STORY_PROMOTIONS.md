# Daglig fremhævelse

`_vintage/redaktion/Artikeloverblik.md` er den autoritative kalender.
`src/data/storyPromotions.json` er et begrænset build-udtræk.

## Klargøring og godkendelse

1. Opret danske og engelske artikelsider og metadata i `allStories`.
2. Registrér historie-ID, slug og kalenderdato i `storyPromotions.json` med
   `approved: false` i samme ændring. Bevar den aktive plans `enabled: true`.
3. Registrér perioder og temaer. Offentlige oversigter bruger den filtrerede `stories`-liste.
4. Kør produktionsbygning, kvalitetskontrol og visuel kontrol.
5. Sæt først `approved: true` efter brugerens udgivelsesgodkendelse.
   Bevar tidligere entries: fjernes de, bliver historien vist uden datofilter.

De syv historier blev godkendt 22. oktober 2026. Deres datoer er 23., 24. og
26.–30. oktober. Ingen er planlagt den 25.; der indsættes ingen erstatning.
Direkte DA/EN-adresser og sitemap er tilgængelige før fremhævelsesdatoen.

## Automatisk drift

Målet er synlig fremhævelse omkring kl. 09:17 dansk tid. GitHub forsøger
kl. 09:15, med reserver kl. 09:20 og 09:25, alle i `Europe/Copenhagen`.
De tre cron-entries er særskilte: `15 9 * * *`, `20 9 * * *`, `25 9 * * *`.
Det giver omtrent to minutter til bygning og deployment og følger automatisk
sommer- og vintertid. Den gamle UTC-plan ville starte kl. 08:17 om vinteren.

GitHub kan forsinke eller miste planlagte starter; dette er et mål og ingen
garanti for et præcist klokkeslæt. Kørslens titel viser den udløsende cron.
Kontroljobbets log og Summary viser event, cron, tidszone, faktisk UTC-start,
dansk dato og beslutningen om genbygning. En manglende kørsel er ikke et
bevis på en fejl i artikelkode eller cache.

`promotion-check` læser `https://teob.dk/promotion-deployment.json` og sammenligner
bygningens danske dato og Git-commit. Er dagens commit allerede live, springes
build og deployment over ved planlagte starter. Manglende eller ugyldigt mærke
og netværksfejl tillader en genbygning. Push og manuel Run workflow genbygger altid.
Mærket skrives først efter build, SEO-kontrol og fremhævelseskontrol er bestået.
Billedcachen genbruges ved nødvendige bygninger; reservestarter uden bygning
behandler ingen billeder. Ingen nye secrets kræves.

Fremhævelse bruger `Europe/Copenhagen`. En godkendt og datomoden historie
kommer først; tidligere rækkefølge bevares ellers. Forside, DA/EN-arkiv,
perioder og temaer følger listen. Ugyldige planer og for tidlige links stopper
build; deploy kræver et bestået build. Kun én historie pr. dato understøttes.

## Løb og registrering

Løbsoversigten og løbssiderne er arbejdsfiler. Produktionsbygningen fjerner
`dist/loeb` før sitemap, og `audit-promotions.mjs` stopper, hvis løbssider
alligevel indgår. Kildearbejdsfiler må ikke medtages ved udgivelse.

Publiceret-status følger faktisk deployment af artikelsiderne. Daglig fremhævelse
ændrer ikke denne status. Der skrives ikke automatisk tilbage til OneDrive.
Efter ny artikelpublicering følges projektets sædvanlige efterregistrering.

## Kontrol og fejlsøgning

Kør `node scripts/test-story-promotion.mjs`,
`node scripts/test-promotion-deployment.mjs` og `pnpm build`.
På GitHub: Actions → Deploy to GitHub Pages. En kørsel med event `schedule`
viser en automatisk start; `push` og `workflow_dispatch` beviser ikke dette.
Et sprunget build er normalt, når `promotion-check` bekræfter dagens version.
Ved fejl: læs det fejlede trin; brug Run workflow efter rettelse. Kontrollér
forside, oversigter, mærkefil og at `/loeb/` stadig giver 404.

23. oktober manglede morgenens schedule-event, selv om workflowet var aktivt
på main. Der blev ikke fundet en fejlet bygning. Cron blev ændret for at
registrere tidsplanen på ny og give reservestarter. GitHubs interne årsag kan
ikke udledes af repositoryets logs.


24. oktober blev kun én automatisk kørsel registreret: 13:59:41 dansk tid,
med vellykket deployment 14:01:09. Den gamle cron var gyldig POSIX-syntaks;
GitHubs API viser ikke, om dette var en forsinket tidligere trigger eller
sidste reservestart. Den interne årsag til de manglende morgenstarter er
ikke dokumenteret. Tidsplanen er ændret til tre særskilte morgenforsøg med
udtrykkelig dansk tidszone og bedre diagnoselogning; ingen aftenkørsel eller
løbsudgivelse indføres som en del af den permanente løsning.
