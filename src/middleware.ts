import { defineMiddleware } from 'astro:middleware';

const submissionUrl = import.meta.env.PUBLIC_STORY_SUBMISSION_URL
  ?? 'https://fmxiyfhncvhnwzwipnxu.supabase.co/functions/v1/submit-reader-story';

const commentSection = (base: string) => `
<section class="story-comments" aria-labelledby="story-comments-title" data-story-comments data-submission-url="${submissionUrl}">
  <div class="story-comments-copy">
    <p class="section-label">Kommentarer og erindringer</p>
    <h2 id="story-comments-title">Har du noget at tilføje?</h2>
    <p>En rettelse, en detalje eller en erindring kan gøre historien bedre. Bidrag bliver læst og godkendt, før de eventuelt vises på siden.</p>
  </div>
  <form class="story-comment-form" aria-describedby="story-comment-note story-comment-status">
    <label class="form-honeypot" aria-hidden="true">Hjemmeside<input name="website" tabindex="-1" autocomplete="off" /></label>
    <input name="title" type="hidden" />
    <input name="place" type="hidden" />
    <input name="period" type="hidden" value="Kommentar til en historie" />
    <input name="credit" type="hidden" value="name" />
    <input name="rights_confirmed" type="hidden" value="yes" />
    <input name="editorial_consent" type="hidden" value="yes" />
    <div class="story-comment-fields">
      <label>Navn <span>påkrævet</span><input name="name" required maxlength="160" autocomplete="name" /></label>
      <label>E-mail <span>påkrævet</span><input name="email" type="email" required maxlength="320" autocomplete="email" /></label>
    </div>
    <label>Dit bidrag <span>påkrævet</span><textarea name="story" required minlength="20" maxlength="4000" rows="6" placeholder="Skriv din kommentar, rettelse eller erindring her."></textarea></label>
    <label class="story-comment-consent"><input name="privacy_consent" value="yes" type="checkbox" required /><span>Jeg har ret til at dele teksten og accepterer, at The Evolution of Bikes må gennemgå, redigere og eventuelt offentliggøre bidraget. Navn, e-mail og tekst behandles som beskrevet i <a href="${base}/privatliv/">privatlivspolitikken</a>. Min e-mailadresse bliver aldrig vist.</span></label>
    <p id="story-comment-note" class="story-comment-note">Kommentarer offentliggøres ikke automatisk. Redaktionen kan forkorte eller sprogligt tilpasse et bidrag og kontakter dig ved større ændringer.</p>
    <p id="story-comment-status" class="story-comment-status" role="status" aria-live="polite" hidden></p>
    <button type="submit">Send til godkendelse <span aria-hidden="true">→</span></button>
  </form>
</section>`;

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;
  const marker = '/historier/';
  const markerIndex = pathname.indexOf(marker);
  const isStoryPage = markerIndex >= 0 && /^\/[^/]+\/$/.test(pathname.slice(markerIndex + marker.length - 1));

  if (!isStoryPage || !response.headers.get('content-type')?.includes('text/html')) return response;

  const base = pathname.slice(0, markerIndex);
  const html = await response.text();
  const scripts = `<script src="${base}/scripts/story-comments.js" defer></script><script src="${base}/scripts/next-story.js" defer></script>`;
  const withComments = html.replace('</main>', `${commentSection(base)}</main>`);
  const body = withComments.replace('</body>', `${scripts}</body>`);

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
