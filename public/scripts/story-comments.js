(() => {
  const section = document.querySelector('[data-story-comments]');
  const form = section?.querySelector('.story-comment-form');
  const status = section?.querySelector('.story-comment-status');
  if (!(section instanceof HTMLElement) || !(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) return;

  const title = form.elements.namedItem('title');
  const place = form.elements.namedItem('place');
  if (title instanceof HTMLInputElement) title.value = `Kommentar til: ${document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() || document.title}`.slice(0, 140);
  if (place instanceof HTMLInputElement) place.value = window.location.href.slice(0, 160);

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
