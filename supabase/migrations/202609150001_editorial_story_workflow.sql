-- Bevar læserens titel og tekst urørt i title/story. Redaktionens bearbejdede
-- version ligger i egne felter og kan derfor altid sammenholdes med originalen.
alter table public.story_submissions
  add column if not exists editorial_title text,
  add column if not exists editorial_story text;

alter table public.story_submissions
  drop constraint if exists story_submissions_editorial_title_length;
alter table public.story_submissions
  add constraint story_submissions_editorial_title_length
  check (editorial_title is null or char_length(editorial_title) between 1 and 140);

alter table public.story_submissions
  drop constraint if exists story_submissions_editorial_story_length;
alter table public.story_submissions
  add constraint story_submissions_editorial_story_length
  check (editorial_story is null or char_length(editorial_story) between 20 and 40000);
