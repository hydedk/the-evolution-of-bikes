# The Evolution of Bikes

En personlig hjemmeside om vintagecykler, cykelhistorier, mærker og komponenter.

## Lokal udvikling

```sh
pnpm install
pnpm dev
```

## Produktion

```sh
pnpm build
```

## Administration af læserhistorier og kommentarer

Den private side ligger på `/admin/indsendelser/` og kræver en bruger i
Supabase Auth. Browseren får kun den offentlige anon/publishable key. Adgang til
indsendelser og private billeder går gennem Edge Functionen
`admin-story-submissions`, som kontrollerer brugerens e-mail mod den private
secret `ADMIN_EMAILS`.

Indbakken opdeler historier og kommentarer i hver sin fane. Migreringen
`202609140002_comment_administration.sql` tilføjer indsendelsestypen og mærker
eksisterende kommentarer ud fra deres hidtidige titel og periode. Kommentarer
skal altid gennemgås manuelt og offentliggøres aldrig direkte fra formularen.
Når en kommentar får status `Udgivet` og den kanoniske adresse på historiesiden,
vises navn, kommentartekst og udgivelsesdato på netop den side. E-mail og
redaktionelle noter udleveres aldrig af den offentlige funktion.

Før siden tages i brug:

1. Kør migrationerne `202609140001_admin_story_submissions.sql` og
   `202609140002_comment_administration.sql`.
2. Deploy Edge Functionerne `admin-story-submissions` og `public-story-comments`.
3. Sæt `ADMIN_EMAILS` og den eksisterende `ALLOWED_ORIGINS` som private secrets.
4. Opret redaktøren som bruger i Supabase Auth.
5. Sæt `PUBLIC_SUPABASE_ANON_KEY` som GitHub Actions-variable ved build.

`SUPABASE_SERVICE_ROLE_KEY` må aldrig tilføjes som en `PUBLIC_*`-variabel.
