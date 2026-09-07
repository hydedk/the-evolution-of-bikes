import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;
  const marker = '/historier/';
  const markerIndex = pathname.indexOf(marker);
  const isStoryPage = markerIndex >= 0 && /^\/[^/]+\/$/.test(pathname.slice(markerIndex + marker.length - 1));

  if (!isStoryPage || !response.headers.get('content-type')?.includes('text/html')) return response;

  const base = pathname.slice(0, markerIndex);
  const html = await response.text();
  const script = `<script src="${base}/scripts/next-story.js" defer></script>`;
  const body = html.replace('</body>', `${script}</body>`);

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
});
