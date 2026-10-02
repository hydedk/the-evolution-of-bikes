export const measurementId = 'G-17SK11ZTPX';

export function addAnalytics(html, base = '') {
  if (/name=["']robots["'][^>]*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html) || html.includes('data-analytics-id=')) return html;
  const english = /<html\b[^>]*\blang=["']en(?:-[^"']*)?["']/i.test(html);
  const privacy = `${base}${english ? '/en/privacy/' : '/privatliv/'}`;
  const markup = `
<section class="analytics-consent" aria-labelledby="analytics-consent-title" hidden>
  <div><h2 id="analytics-consent-title">${english ? 'Visitor statistics' : 'Besøgsstatistik'}</h2>
  <p>${english ? 'May we use Google Analytics cookies to see which pages are read and where visitors come from? The website works equally well without them.' : 'Må vi bruge Google Analytics-cookies til at se, hvilke sider der bliver læst, og hvor besøgende kommer fra? Siden virker lige godt uden.'} <a href="${privacy}">${english ? 'Privacy' : 'Privatliv'}</a></p></div>
  <div class="analytics-consent-actions"><button type="button" data-analytics-choice="denied">${english ? 'Reject statistics' : 'Afvis statistik'}</button><button type="button" data-analytics-choice="granted">${english ? 'Accept statistics' : 'Acceptér statistik'}</button></div>
</section>
<script src="${base}/scripts/analytics.js" data-analytics-id="${measurementId}" defer></script>`;
  const settings = `<button type="button" class="analytics-settings" data-analytics-settings>${english ? 'Cookie settings' : 'Cookieindstillinger'}</button>`;
  const withSettings = html.includes('</footer>') ? html.replace('</footer>', `${settings}</footer>`)
    : html.replace('</body>', `<div class="analytics-settings-fallback">${settings}</div></body>`);
  return withSettings.replace('</head>', `<link rel="stylesheet" href="${base}/styles/analytics.css"></head>`)
    .replace('</body>', `${markup}</body>`);
}
