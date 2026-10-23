(() => {
  // Local previews never send visits to the production property.
  const production = ['teob.dk', 'www.teob.dk'].includes(location.hostname);
  const id = document.querySelector('script[data-analytics-id]')?.dataset.analyticsId;
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
  const adsId = document.querySelector('script[data-ads-id]')?.dataset.adsId;
  const banner = document.querySelector('.analytics-consent');
  const settings = document.querySelector('[data-analytics-settings]');
  if (!banner) return;
  const key = 'teob-measurement-consent-v2';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let started = false;

  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(key));
      if (typeof choice?.value?.statistics === 'boolean' && typeof choice?.value?.ads === 'boolean' && choice.expires > Date.now()) return choice.value;
    } catch { /* Storage may be unavailable. Ask again on the next page. */ }
    return null;
  }

  function clearCookies() {
    const domains = ['', location.hostname, `.${location.hostname}`, 'teob.dk', '.teob.dk'];
    for (const item of document.cookie.split(';')) {
      const name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)|^_gcl_/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax; Secure`;
      }
    }
  }

  function cleanUrl(value) {
    try { const url = new URL(value); return `${url.origin}${url.pathname}`; }
    catch { return ''; }
  }

  function start(choice) {
    if (!production || started || (!choice.statistics && !choice.ads)) return;
    started = true;
    window[`ga-disable-${id}`] = !choice.statistics;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('consent', 'update', { analytics_storage: choice.statistics ? 'granted' : 'denied', ad_storage: choice.ads ? 'granted' : 'denied', ad_user_data: choice.ads ? 'granted' : 'denied' });
    window.gtag('js', new Date());
    if (choice.statistics) window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 180 * 24 * 60 * 60,
      page_location: cleanUrl(location.href),
      page_referrer: cleanUrl(document.referrer),
    });
    if (choice.ads && /^AW-\d+$/.test(adsId || '')) window.gtag('config', adsId, { allow_ad_personalization_signals: false });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${choice.ads ? adsId : id}`;
    document.head.append(tag);
  }

  function choose(action) {
    const value = {
      statistics: action === 'all' || (action === 'granted' && banner.querySelector('[data-statistics-consent]').checked),
      ads: action === 'all' || (action === 'granted' && banner.querySelector('[data-ads-consent]').checked),
    };
    try { localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + lifetime })); }
    catch { /* The current choice still applies even when storage is blocked. */ }
    banner.hidden = true;
    settings?.focus({ preventScroll: true });
    window[`ga-disable-${id}`] = true;
    clearCookies();
    // Reload when a loaded destination changes, including partial withdrawal.
    if (started) location.reload();
    else start(value);
  }

  for (const button of banner.querySelectorAll('[data-analytics-choice]')) {
    button.addEventListener('click', () => choose(button.dataset.analyticsChoice));
  }
  settings?.addEventListener('click', () => {
    const saved = readChoice();
    banner.querySelector('[data-statistics-consent]').checked = saved?.statistics || false;
    banner.querySelector('[data-ads-consent]').checked = saved?.ads || false;
    banner.hidden = false;
    banner.querySelector('button')?.focus({ preventScroll: true });
  });
  const choice = readChoice();
  if (choice) {
    banner.hidden = true;
    start(choice);
  } else {
    window[`ga-disable-${id}`] = true;
    clearCookies();
    banner.hidden = false;
  }
})();
