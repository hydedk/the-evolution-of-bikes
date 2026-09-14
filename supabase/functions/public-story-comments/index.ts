import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = (origin: string) => ({
  'access-control-allow-origin': origin,
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type, apikey',
  'access-control-max-age': '86400',
  'cache-control': 'public, max-age=60, stale-while-revalidate=300',
  'vary': 'Origin',
});

const json = (body: unknown, status: number, origin: string) => new Response(
  status === 204 ? null : JSON.stringify(body),
  { status, headers: { 'content-type': 'application/json; charset=utf-8', ...corsHeaders(origin) } },
);

const normalizedStoryUrl = (value: string) => {
  let parsed: URL;
  try { parsed = new URL(value); } catch { return null; }
  if (parsed.protocol !== 'https:' || !['teob.dk', 'www.teob.dk'].includes(parsed.hostname)) return null;
  if (!/^\/historier\/[^/]+\/$/.test(parsed.pathname)) return null;
  return `https://teob.dk${parsed.pathname}`;
};

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get('origin') ?? '';
  const allowedOrigins = new Set([
    'https://teob.dk',
    'https://www.teob.dk',
    ...(Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((value) => value.trim()).filter(Boolean),
  ]);
  const origin = allowedOrigins.has(requestOrigin) ? requestOrigin : '';

  if (request.method === 'OPTIONS') {
    return origin ? json({}, 204, origin) : json({ error: 'Origin ikke tilladt.' }, 403, '');
  }
  if (request.method !== 'GET' || !origin) return json({ error: 'Anmodningen blev afvist.' }, 403, origin);

  const url = normalizedStoryUrl(new URL(request.url).searchParams.get('url') ?? '');
  if (!url) return json({ error: 'Historieadressen er ugyldig.' }, 400, origin);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { data, error } = await supabase
    .from('story_submissions')
    .select('story,submitter_name,credit_preference,published_at')
    .eq('submission_type', 'comment')
    .eq('status', 'udgivet')
    .eq('canonical_url', url)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: true })
    .limit(100);

  if (error) {
    console.error('Public comments request failed', error);
    return json({ error: 'Kommentarerne kunne ikke hentes.' }, 500, origin);
  }

  const comments = (data ?? []).map((comment) => ({
    text: comment.story,
    name: comment.credit_preference === 'name' ? comment.submitter_name : 'Anonym læser',
    published_at: comment.published_at,
  }));
  return json({ comments }, 200, origin);
});
