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

## Administration af læserhistorier

Den private side ligger på `/admin/indsendelser/` og kræver en bruger i
Supabase Auth. Browseren får kun den offentlige anon/publishable key. Adgang til
indsendelser og private billeder går gennem Edge Functionen
`admin-story-submissions`, som kontrollerer brugerens e-mail mod den private
secret `ADMIN_EMAILS`.

Før siden tages i brug:

1. Kør migrationen `202609140001_admin_story_submissions.sql`.
2. Deploy Edge Functionen `admin-story-submissions`.
3. Sæt `ADMIN_EMAILS` og den eksisterende `ALLOWED_ORIGINS` som private secrets.
4. Opret redaktøren som bruger i Supabase Auth.
5. Sæt `PUBLIC_SUPABASE_ANON_KEY` som GitHub Actions-variable ved build.

`SUPABASE_SERVICE_ROLE_KEY` må aldrig tilføjes som en `PUBLIC_*`-variabel.
