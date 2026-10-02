(() => {
  // Local previews never send visits to the production property.
  const production = ['teob.dk', 'www.teob.dk'].includes(location.hostname);
  const id = document.querySelector('script[data-analytics-id]')?.dataset.analyticsId;
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
  const banner = document.querySelector('.analytics-consent');
  const settings = document.querySelector('[data-analytics-settings]');
  if (!banner) return;
  const key = 'teob-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let started = false;

  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(key));
      if (['granted', 'denied'].includes(choice?.value) && choice.expires > Date.now()) return choice.value;
    } catch { /* Storage may be unavailable. Ask again on the next page. */ }
    return null;
  }

  function clearCookies() {
    const domains = ['', location.hostname, `.${location.hostname}`, 'teob.dk', '.teob.dk'];
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax; Secure`;
      }
    }
  }

  function cleanUrl(value) {
    try { const url = new URL(value); return `${url.origin}${url.pathname}`; }
    catch { return ''; }
  }

  function start() {
    if (!production || started) return;
    started = true;
    window[`ga-disable-${id}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 180 * 24 * 60 * 60,
      page_location: cleanUrl(location.href),
      page_referrer: cleanUrl(document.referrer),
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(tag);
  }

  function choose(value) {
    try { localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + lifetime })); }
    catch { /* The current choice still applies even when storage is blocked. */ }
    banner.hidden = true;
    settings?.focus({ preventScroll: true });
    if (value === 'granted') start();
    else {
      window[`ga-disable-${id}`] = true;
      clearCookies();
      // Unload the tag on withdrawal so it cannot send cookieless events.
      if (started) location.reload();
    }
  }

  for (const button of banner.querySelectorAll('[data-analytics-choice]')) {
    button.addEventListener('click', () => choose(button.dataset.analyticsChoice));
  }
  settings?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button')?.focus({ preventScroll: true });
  });
  const choice = readChoice();
  if (choice === 'granted') start();
  else {
    window[`ga-disable-${id}`] = true;
    clearCookies();
    banner.hidden = choice === 'denied';
  }
})();
