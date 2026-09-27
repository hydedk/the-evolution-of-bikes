create table if not exists public.editorial_planning_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kind text not null check (kind in ('mangel', 'ide', 'naeste-skridt')),
  title text not null check (char_length(title) between 2 and 180),
  notes text,
  theme text check (theme is null or theme in (
    'loeb-og-store-oejeblikke', 'ryttere', 'teknik',
    'kost-traening-og-videnskab', 'cykelkultur',
    'samfund-og-tidsaand', 'menneskene-bag'
  )),
  priority text not null default 'normal' check (priority in ('hoej', 'normal', 'lav')),
  status text not null default 'aaben' check (status in ('aaben', 'i-arbejde', 'afsluttet'))
);

create index if not exists editorial_planning_notes_status_updated_idx
  on public.editorial_planning_notes (status, updated_at desc);

alter table public.editorial_planning_notes enable row level security;
revoke all on public.editorial_planning_notes from anon, authenticated;
grant select, insert, update, delete on public.editorial_planning_notes to service_role;
