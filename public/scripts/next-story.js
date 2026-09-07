(() => {
  const path = window.location.pathname.replace(/\/+$/, '');
  const marker = '/historier/';
  const markerIndex = path.indexOf(marker);
  if (markerIndex < 0) return;

  const currentSlug = path.slice(markerIndex + marker.length);
  if (!currentSlug || currentSlug.includes('/')) return;

  const base = path.slice(0, markerIndex);
  fetch(`${base}/historier.json`)
    .then((response) => {
      if (!response.ok) throw new Error('Historieoversigten kunne ikke hentes');
      return response.json();
    })
    .then((stories) => {
      const currentIndex = stories.findIndex((story) => story.slug === currentSlug);
      if (currentIndex < 0 || stories.length < 2) return;

      const nextStory = stories[(currentIndex + 1) % stories.length];
      const card = document.createElement('aside');
      card.className = 'next-story-card';
      card.setAttribute('aria-labelledby', 'next-story-heading');

      const link = document.createElement('a');
      link.href = `${base}/historier/${nextStory.slug}/`;

      const image = document.createElement('img');
      image.src = `${base}/${nextStory.image}`;
      image.alt = '';
      image.loading = 'lazy';

      const copy = document.createElement('span');
      copy.className = 'next-story-copy';

      const label = document.createElement('small');
      label.textContent = `Læs videre · ${nextStory.year}`;

      const heading = document.createElement('strong');
      heading.id = 'next-story-heading';
      heading.textContent = nextStory.title;

      const summary = document.createElement('span');
      summary.textContent = nextStory.text;

      const action = document.createElement('i');
      action.textContent = 'Næste historie →';

      copy.append(label, heading, summary, action);
      link.append(image, copy);
      card.append(link);

      const bottomNav = document.querySelector('.era-bottom-nav');
      if (bottomNav) bottomNav.before(card);
      else document.querySelector('main')?.append(card);
    })
    .catch(() => {});
})();
