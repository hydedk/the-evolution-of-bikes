import { createClient } from 'npm:@supabase/supabase-js@2';

const statuses = new Set([
  'modtaget', 'foerste-kontrol', 'under-research', 'kladde',
  'klar-til-godkendelse', 'godkendt', 'udgivet', 'afvist',
  'afventer-svar', 'trukket-tilbage',
]);
const planningKinds = new Set(['mangel', 'ide', 'naeste-skridt']);
const planningPriorities = new Set(['hoej', 'normal', 'lav']);
const planningStatuses = new Set(['aaben', 'i-arbejde', 'afsluttet']);
const planningThemes = new Set([
  'loeb-og-store-oejeblikke', 'ryttere', 'teknik',
  'kost-traening-og-videnskab', 'cykelkultur',
  'samfund-og-tidsaand', 'menneskene-bag',
]);

const corsHeaders = (origin: string) => ({
  'access-control-allow-origin': origin,
  'access-control-allow-methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type, apikey',
  'access-control-max-age': '86400',
  'cache-control': 'no-store',
  'vary': 'Origin',
});

const json = (body: unknown, status: number, origin: string) => new Response(
  status === 204 ? null : JSON.stringify(body),
  { status, headers: { 'content-type': 'application/json; charset=utf-8', ...corsHeaders(origin) } },
);

const cleanNullable = (value: unknown, max: number) => {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') throw new Error('Ugyldig tekstværdi.');
  const result = value.trim().slice(0, max);
  return result || null;
};

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get('origin') ?? '';
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
    .split(',').map((value) => value.trim()).filter(Boolean);
  const origin = allowedOrigins.includes(requestOrigin) ? requestOrigin : '';

  if (request.method === 'OPTIONS') {
    return origin ? json({}, 204, origin) : json({ error: 'Origin ikke tilladt.' }, 403, '');
  }
  if (!origin || !['GET', 'POST', 'PATCH', 'DELETE'].includes(request.method)) {
    return json({ error: 'Anmodningen blev afvist.' }, 403, origin);
  }

  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!token) return json({ error: 'Log ind for at fortsætte.' }, 401, origin);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  const email = authData.user?.email?.trim().toLowerCase();
  const adminEmails = new Set((Deno.env.get('ADMIN_EMAILS') ?? '')
    .split(',').map((value) => value.trim().toLowerCase()).filter(Boolean));
  if (authError || !email) {
    return json({ error: 'Din session er udløbet. Log ind igen.' }, 401, origin);
  }
  if (!adminEmails.has(email)) {
    return json({ error: 'Du har ikke adgang til administrationen.' }, 403, origin);
  }

  try {
    if (request.method === 'GET') {
      const { data, error } = await supabase
        .from('story_submissions')
        .select('id,created_at,updated_at,submission_type,status,title,place,period,story,editorial_title,editorial_story,submitter_name,submitter_email,credit_preference,image_notes,rights_confirmed,editorial_consent,privacy_consent,terms_version,canonical_url,published_at,internal_notes,story_submission_images(id,created_at,original_name,mime_type,size_bytes,storage_path)')
        .order('created_at', { ascending: false })
        .limit(250);
      if (error) throw error;

      const submissions = await Promise.all((data ?? []).map(async (submission) => {
        const images = await Promise.all((submission.story_submission_images ?? []).map(async (image) => {
          const { data: signed, error: signedError } = await supabase.storage
            .from('reader-story-images').createSignedUrl(image.storage_path, 15 * 60);
          return {
            id: image.id,
            created_at: image.created_at,
            original_name: image.original_name,
            mime_type: image.mime_type,
            size_bytes: image.size_bytes,
            url: signedError ? null : signed.signedUrl,
          };
        }));
        const { story_submission_images: _privatePaths, ...safeSubmission } = submission;
        return { ...safeSubmission, images };
      }));

      const { data: planningNotes, error: planningError } = await supabase
        .from('editorial_planning_notes')
        .select('id,created_at,updated_at,kind,title,notes,theme,priority,status')
        .order('updated_at', { ascending: false });
      if (planningError) throw planningError;

      return json({ submissions, planningNotes: planningNotes ?? [] }, 200, origin);
    }

    const body = await request.json();
    if (body.resource === 'planning_note') {
      if (request.method === 'DELETE') {
        const id = typeof body.id === 'string' ? body.id : '';
        if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'Ugyldigt notenummer.' }, 400, origin);
        const { error } = await supabase.from('editorial_planning_notes').delete().eq('id', id);
        if (error) throw error;
        return json({}, 204, origin);
      }

      const kind = typeof body.kind === 'string' ? body.kind : '';
      const priority = typeof body.priority === 'string' ? body.priority : '';
      const status = typeof body.status === 'string' ? body.status : '';
      const theme = cleanNullable(body.theme, 80);
      const title = cleanNullable(body.title, 180);
      const notes = cleanNullable(body.notes, 10000);
      if (!planningKinds.has(kind) || !planningPriorities.has(priority) || !planningStatuses.has(status) || !title || (theme && !planningThemes.has(theme))) {
        return json({ error: 'Udfyld titel, type, prioritet og status korrekt.' }, 400, origin);
      }
      const values = { kind, title, notes, theme, priority, status, updated_at: new Date().toISOString() };

      if (request.method === 'POST') {
        const { data, error } = await supabase.from('editorial_planning_notes').insert(values)
          .select('id,created_at,updated_at,kind,title,notes,theme,priority,status').single();
        if (error) throw error;
        return json({ planningNote: data }, 201, origin);
      }

      const id = typeof body.id === 'string' ? body.id : '';
      if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'Ugyldigt notenummer.' }, 400, origin);
      const { data, error } = await supabase.from('editorial_planning_notes').update(values).eq('id', id)
        .select('id,created_at,updated_at,kind,title,notes,theme,priority,status').single();
      if (error) throw error;
      return json({ planningNote: data }, 200, origin);
    }

    if (request.method !== 'PATCH') return json({ error: 'Anmodningen blev afvist.' }, 405, origin);
    const id = typeof body.id === 'string' ? body.id : '';
    const status = typeof body.status === 'string' ? body.status : '';
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) || !statuses.has(status)) {
      return json({ error: 'Ugyldigt indsendelsesnummer eller status.' }, 400, origin);
    }

    const canonicalUrl = cleanNullable(body.canonical_url, 500);
    if (canonicalUrl) {
      let parsed: URL;
      try { parsed = new URL(canonicalUrl); } catch { return json({ error: 'Den kanoniske adresse er ugyldig.' }, 400, origin); }
      if (parsed.protocol !== 'https:' || parsed.hostname !== 'teob.dk') {
        return json({ error: 'Den kanoniske adresse skal ligge på https://teob.dk.' }, 400, origin);
      }
    }

    const update: Record<string, unknown> = {
      status,
      internal_notes: cleanNullable(body.internal_notes, 20000),
      canonical_url: canonicalUrl,
      updated_at: new Date().toISOString(),
    };
    if (Object.hasOwn(body, 'editorial_title') || Object.hasOwn(body, 'editorial_story')) {
      const { data: existingSubmission, error: typeError } = await supabase
        .from('story_submissions').select('submission_type').eq('id', id).single();
      if (typeError) throw typeError;
      if (existingSubmission.submission_type !== 'story') {
        return json({ error: 'Redaktionel titel og tekst kan kun gemmes på historier.' }, 400, origin);
      }
      const editorialTitle = cleanNullable(body.editorial_title, 140);
      const editorialStory = cleanNullable(body.editorial_story, 40000);
      if (editorialStory && editorialStory.length < 20) {
        return json({ error: 'Den redigerede historie skal være på mindst 20 tegn.' }, 400, origin);
      }
      update.editorial_title = editorialTitle;
      update.editorial_story = editorialStory;
    }
    if (Object.hasOwn(body, 'submitter_name') || Object.hasOwn(body, 'story')) {
      const { data: existingSubmission, error: typeError } = await supabase
        .from('story_submissions').select('submission_type').eq('id', id).single();
      if (typeError) throw typeError;
      if (existingSubmission.submission_type !== 'comment') {
        return json({ error: 'Kun kommentarer kan redigeres her.' }, 400, origin);
      }
      const submitterName = cleanNullable(body.submitter_name, 160);
      const story = cleanNullable(body.story, 20000);
      if (!submitterName || !story || story.length < 20) {
        return json({ error: 'Navn og en kommentar på mindst 20 tegn er påkrævet.' }, 400, origin);
      }
      update.submitter_name = submitterName;
      update.story = story;
    }
    if (status === 'udgivet') {
      const { data: existing, error: existingError } = await supabase
        .from('story_submissions').select('published_at').eq('id', id).single();
      if (existingError) throw existingError;
      if (!existing.published_at) update.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase.from('story_submissions')
      .update(update).eq('id', id)
      .select('id,updated_at,status,internal_notes,canonical_url,published_at,submitter_name,story,editorial_title,editorial_story').single();
    if (error) throw error;
    return json({ submission: data }, 200, origin);
  } catch (error) {
    console.error('Admin story request failed', error);
    return json({ error: 'Administrationen kunne ikke hente eller gemme oplysningerne.' }, 500, origin);
  }
});
