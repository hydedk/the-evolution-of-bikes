import { createClient } from 'npm:@supabase/supabase-js@2';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxFileSize = 10 * 1024 * 1024;
const maxTotalSize = 30 * 1024 * 1024;
const termsVersion = '2026-09-06';

const json = (body: unknown, status = 200, origin = '') => new Response(status === 204 ? null : JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin',
  },
});

const clean = (value: FormDataEntryValue | null, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const hasValidSignature = async (file: File) => {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === 'image/png') return bytes.slice(0, 8).every((byte, i) => byte === [137, 80, 78, 71, 13, 10, 26, 10][i]);
  if (file.type === 'image/webp') return new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP';
  return false;
};

const digest = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const notifyEditorialTeam = async (submission: { id: string; title: string; place: string }) => {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('EDITORIAL_NOTIFICATION_EMAIL');
  const from = Deno.env.get('EDITORIAL_FROM_EMAIL');
  if (!apiKey || !to || !from) return;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${apiKey}`,
      'content-type': 'application/json',
      'user-agent': 'the-evolution-of-bikes/1.0',
      'idempotency-key': `reader-story-${submission.id}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Ny læserhistorie: ${submission.title}`,
      text: [
        'Der er modtaget en ny læserhistorie.',
        '',
        `Overskrift: ${submission.title}`,
        `Sted: ${submission.place}`,
        `Nummer: ${submission.id}`,
        '',
        'Historien og billederne ligger i det private redaktionelle system.',
      ].join('\n'),
    }),
  });

  if (!response.ok) throw new Error(`Resend svarede med HTTP ${response.status}`);
};

Deno.serve(async (request) => {
  const requestOrigin = request.headers.get('origin') ?? '';
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
    .split(',').map((value) => value.trim()).filter(Boolean);
  const origin = allowedOrigins.includes(requestOrigin) ? requestOrigin : '';

  if (request.method === 'OPTIONS') return origin ? json({}, 204, origin) : json({ error: 'Origin ikke tilladt.' }, 403);
  if (request.method !== 'POST' || !origin) return json({ error: 'Anmodningen blev afvist.' }, 403);

  try {
    const form = await request.formData();
    if (clean(form.get('website'), 200)) return json({ ok: true }, 202, origin);

    const title = clean(form.get('title'), 140);
    const place = clean(form.get('place'), 160);
    const period = clean(form.get('period'), 80) || null;
    const story = clean(form.get('story'), 20000);
    const submitterName = clean(form.get('name'), 160);
    const submitterEmail = clean(form.get('email'), 320).toLowerCase();
    const creditPreference = clean(form.get('credit'), 20);
    const imageNotes = clean(form.get('image_notes'), 4000) || null;
    const consents = ['rights_confirmed', 'editorial_consent', 'privacy_consent']
      .every((name) => form.get(name) === 'yes');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitterEmail);

    if (!title || !place || story.length < 20 || !submitterName || !emailValid ||
        !['name', 'anonymous', 'ask'].includes(creditPreference) || !consents) {
      return json({ error: 'Kontrollér de påkrævede felter og tilladelser.' }, 400, origin);
    }

    const files = form.getAll('images').filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (files.length > 8 || files.some((file) => !allowedTypes.has(file.type) || file.size > maxFileSize) ||
        files.reduce((total, file) => total + file.size, 0) > maxTotalSize) {
      return json({ error: 'Billederne overskrider de tilladte grænser.' }, 400, origin);
    }
    for (const file of files) {
      if (!(await hasValidSignature(file))) return json({ error: 'En billedfil har et ugyldigt format.' }, 400, origin);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const ipHash = await digest(`${Deno.env.get('IP_HASH_SALT') ?? ''}:${ip}`);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase.from('story_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('source_ip_hash', ipHash).gte('created_at', oneHourAgo);
    if ((count ?? 0) >= 5) return json({ error: 'Der er sendt for mange historier. Prøv igen senere.' }, 429, origin);

    const { data: submission, error: insertError } = await supabase.from('story_submissions').insert({
      title, place, period, story, submitter_name: submitterName,
      submitter_email: submitterEmail, credit_preference: creditPreference,
      image_notes: imageNotes, rights_confirmed: true, editorial_consent: true,
      privacy_consent: true, terms_version: termsVersion, source_ip_hash: ipHash,
    }).select('id').single();
    if (insertError) throw insertError;

    for (const file of files) {
      const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
      const path = `${submission.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from('reader-story-images')
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { error: imageError } = await supabase.from('story_submission_images').insert({
        submission_id: submission.id, storage_path: path,
        original_name: file.name.slice(0, 255), mime_type: file.type, size_bytes: file.size,
      });
      if (imageError) throw imageError;
    }

    try {
      await notifyEditorialTeam({ id: submission.id, title, place });
    } catch (notificationError) {
      // E-mailen er kun en besked. En allerede gemt historie må ikke gå tabt,
      // hvis mailtjenesten midlertidigt er utilgængelig.
      console.error('Editorial notification failed', notificationError);
    }

    return json({ ok: true, id: submission.id }, 201, origin);
  } catch (error) {
    console.error(error);
    return json({ error: 'Historien kunne ikke gemmes. Prøv igen senere.' }, 500, origin);
  }
});
