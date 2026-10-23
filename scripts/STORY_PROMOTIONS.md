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

GitHub starter første forsøg kl. 07:17 UTC (09:17 dansk sommertid / 08:17
vintertid). Reservestarter ligger hvert 20. minut til og med 11:57 UTC.
Cron: `17,37,57 7-11 * * *`. GitHub kan forsinke eller miste planlagte starter;
flere forsøg mindsker risikoen, men giver ingen garanti for et præcist tidspunkt.

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
