alter table public.story_submissions
  add column if not exists submission_type text not null default 'story';

update public.story_submissions
set submission_type = 'comment'
where submission_type = 'story'
  and (title like 'Kommentar til:%' or period = 'Kommentar til en historie');

alter table public.story_submissions
  drop constraint if exists story_submissions_submission_type_check;

alter table public.story_submissions
  add constraint story_submissions_submission_type_check
  check (submission_type in ('story', 'comment'));

create index if not exists story_submissions_type_status_created_idx
  on public.story_submissions (submission_type, status, created_at desc);
