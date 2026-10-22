# Daglig fremhævelse

Artikeloverblik.md i _vintage/redaktion er fortsat den autoritative kalender.
Ingen datoer eller godkendelser er indlæst endnu. storyPromotions.json er et
begrænset build-udtræk, ikke en ny redaktionel kalender.

Ved klargøring af de syv historier:
1. Opret DA/EN-siderne med eksisterende komponenter og metadata i allStories i stories.ts.
2. Registrér hvert historie-ID og slug i src/data/storyPromotions.json med dato
   fra Artikeloverblik.md og approved: false. Gør dette i samme ændring som metadata,
   så historien ikke lækker til oversigterne. enabled skal forblive false nu.
3. Registrér perioder, temaer og løbsrelationer på forhånd. Brug den filtrerede
   stories-liste til visninger; allStories er kun det komplette metadataregister.
4. Kør build. audit-promotions stopper også hårdkodede links til ventende historier.
5. Godkend siderne og fremhævelsesdatoerne separat. approved må først sættes true
   efter brugerens godkendelse. En ændret artikel skal vurderes igen.

Når aktivering senere godkendes: sæt enabled true og tilføj dagligt schedule til
DET EKSISTERENDE deploy-workflow. Det er ikke ændret i denne opgave. Rebuild bruger
Europe/Copenhagen. GitHub schedules kan være forsinkede; vælg et tidspunkt efter
ønsket dansk datoskift. Ingen API-nøgle kræves til fremhævelse. Et fejlet build
må ikke deployes. Et nyt build samme dato giver samme resultat. Ingen køfiler skrives.

En godkendt og datomoden historie kommer først i historielisten; eksisterende
rækkefølge bevares ellers. Forside, EN, arkiv, temaer, perioder og lokale løbs-
relationer bruger denne liste. Direkte artikelroutes og sitemap holdes tilgængelige.
Hvis et planlagt entry mangler metadata, har forkert dato, dublet-ID eller dubletdato,
stopper build. Kun én fremhævelse pr. dato understøttes i denne første version.

Løbssiderne under /loeb/ forbliver lokale arbejdsfiler: produktionsbuild fjerner
HTML-mappen før sitemap genereres. Arbejdsfilerne og dev-visningen ændres ikke.
Deres importerede billeder kan stadig ligge som ikke-linkede build-assets.

Redaktionel publiceret-status sættes først efter faktisk deployment af artikelsiderne.
Fremhævelse ændrer ikke publiceret-status. Efter publicering følges projektets
sædvanlige efterregistrering; automatiseret tilbageskrivning til OneDrive er ikke indført.

Kontrol: node scripts/test-story-promotion.mjs og pnpm build.

Lokal kontrol 22. oktober 2026: enhedskontroller bestået; fuldt build med tom,
deaktiveret plan bestået (333 offentlige sider). En eksisterende DA/EN-historie
blev midlertidigt sat til 2099 i en lokal test: direkte sider blev bevaret,
mens offentlige discovery-links forsvandt. Testen bestod. Planen blev gendannet
til enabled: false og entries: [], og normalt build blev kørt igen med succes.
Løbs-HTML og løbsadresser i sitemap var fraværende. Ingen workflow ændret.


## Godkendt aktivering 22. oktober 2026

Brugeren har godkendt publicering af de syv sider og daglig fremhævelse.
Planens syv entries er godkendt, og enabled er true. Det eksisterende deploy-
workflow genbygger dagligt 07:17 UTC (08:17 vintertid / 09:17 sommertid).
Datoerne følger Artikeloverblik: 23., 24. og 26.–30. oktober. Den 25. oktober
er ingen af disse syv historier planlagt; der indsættes ingen automatisk erstatning.
Løbssider og løbsoversigt er fortsat arbejdsfiler og holdes ude af udgivelsen.
