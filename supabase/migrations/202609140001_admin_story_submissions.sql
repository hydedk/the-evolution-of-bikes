-- The administration Edge Function uses the service role. Browser users never
-- receive direct table or storage access.
grant select, update on public.story_submissions to service_role;
grant select on public.story_submission_images to service_role;

