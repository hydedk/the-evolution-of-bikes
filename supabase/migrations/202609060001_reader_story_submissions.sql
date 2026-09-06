create extension if not exists pgcrypto;

create type public.story_submission_status as enum (
  'modtaget',
  'foerste-kontrol',
  'under-research',
  'kladde',
  'klar-til-godkendelse',
  'godkendt',
  'udgivet',
  'afvist',
  'afventer-svar',
  'trukket-tilbage'
);

create table public.story_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.story_submission_status not null default 'modtaget',
  title text not null check (char_length(title) between 1 and 140),
  place text not null check (char_length(place) between 1 and 160),
  period text check (period is null or char_length(period) <= 80),
  story text not null check (char_length(story) between 20 and 20000),
  submitter_name text not null check (char_length(submitter_name) between 1 and 160),
  submitter_email text not null check (char_length(submitter_email) between 3 and 320),
  credit_preference text not null check (credit_preference in ('name', 'anonymous', 'ask')),
  image_notes text check (image_notes is null or char_length(image_notes) <= 4000),
  rights_confirmed boolean not null check (rights_confirmed),
  editorial_consent boolean not null check (editorial_consent),
  privacy_consent boolean not null check (privacy_consent),
  terms_version text not null,
  source_ip_hash text,
  canonical_url text,
  published_at timestamptz,
  internal_notes text
);

create table public.story_submission_images (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.story_submissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760)
);

create index story_submissions_status_created_idx
  on public.story_submissions (status, created_at desc);
create index story_submission_images_submission_idx
  on public.story_submission_images (submission_id);
create index story_submissions_rate_idx
  on public.story_submissions (source_ip_hash, created_at desc);

alter table public.story_submissions enable row level security;
alter table public.story_submission_images enable row level security;

revoke all on public.story_submissions from anon, authenticated;
revoke all on public.story_submission_images from anon, authenticated;

-- The public form never talks directly to the tables. Its Edge Function uses
-- the server-only service role and receives only the privileges needed by the
-- submission flow.
grant select, insert on public.story_submissions to service_role;
grant insert on public.story_submission_images to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'reader-story-images',
  'reader-story-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No public storage policy is created. Only the server-side service role can
-- upload or read files. Selected images are copied into the website repository
-- only after editorial approval.
