(() => {
  const section = document.querySelector('[data-story-comments]');
  const form = section?.querySelector('.story-comment-form');
  const status = section?.querySelector('.story-comment-status');
  if (!(section instanceof HTMLElement) || !(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) return;

  const title = form.elements.namedItem('title');
  const place = form.elements.namedItem('place');
  if (title instanceof HTMLInputElement) title.value = `Kommentar til: ${document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() || document.title}`.slice(0, 140);
  if (place instanceof HTMLInputElement) place.value = window.location.href.slice(0, 160);

  const commentsStatus = section.querySelector('.published-comments-status');
  const commentsList = section.querySelector('.published-comments-list');
  const commentsEndpoint = section.dataset.commentsUrl;
  const anonKey = section.dataset.anonKey;
  const canonicalUrl = section.dataset.canonicalUrl || `${window.location.origin}${window.location.pathname}`;

  const loadComments = async () => {
    if (!(commentsStatus instanceof HTMLElement) || !(commentsList instanceof HTMLElement) || !commentsEndpoint) return;
    try {
      const endpoint = new URL(commentsEndpoint);
      endpoint.searchParams.set('url', canonicalUrl);
      const response = await fetch(endpoint, {
        headers: anonKey ? { apikey: anonKey, authorization: `Bearer ${anonKey}` } : {},
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Kommentarerne kunne ikke hentes.');
      const comments = Array.isArray(result.comments) ? result.comments : [];
      commentsList.replaceChildren();
      if (!comments.length) {
        commentsStatus.textContent = 'Der er endnu ingen offentliggjorte kommentarer til historien.';
        return;
      }
      commentsStatus.hidden = true;
      comments.forEach((comment) => {
        const article = document.createElement('article');
        const text = document.createElement('p');
        const footer = document.createElement('footer');
        const name = document.createElement('strong');
        const date = document.createElement('time');
        text.textContent = String(comment.text || '');
        name.textContent = String(comment.name || 'Anonym læser');
        date.dateTime = String(comment.published_at || '');
        date.textContent = comment.published_at
          ? new Intl.DateTimeFormat('da-DK', { dateStyle: 'long' }).format(new Date(comment.published_at))
          : '';
        footer.append(name);
        if (date.textContent) footer.append(' · ', date);
        article.append(text, footer);
        commentsList.append(article);
      });
    } catch {
      commentsStatus.textContent = 'Kommentarerne kunne ikke hentes lige nu.';
    }
  };

  loadComments();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const endpoint = section.dataset.submissionUrl;
    if (!(button instanceof HTMLButtonElement) || !endpoint) return;

    button.disabled = true;
    status.hidden = false;
    status.textContent = 'Sender dit bidrag …';

    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Bidraget kunne ikke sendes.');
      form.reset();
      status.textContent = 'Tak. Dit bidrag er modtaget og bliver læst, før det eventuelt vises på siden.';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Bidraget kunne ikke sendes. Prøv igen senere.';
      button.disabled = false;
    }
  });
})();
