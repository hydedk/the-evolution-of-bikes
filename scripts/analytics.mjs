import promotionPlan from '../src/data/storyPromotions.json' with { type: 'json' };
import { promotionIsDue } from '../src/data/storyPromotion.mjs';
export const measurementId = 'G-17SK11ZTPX';

export function addAnalytics(html, base = '') {
  if (/name=["']robots["'][^>]*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html) || html.includes('data-analytics-id=')) return html;
  const english = /<html\b[^>]*\blang=["']en(?:-[^"']*)?["']/i.test(html);
  const willardEntry = promotionPlan.entries.find(entry => entry.id === 'hist-000540');
  const willardReady = process.env.NODE_ENV !== 'production' || (willardEntry && promotionIsDue(willardEntry, promotionPlan));
  const german = willardReady && /<html\b[^>]*\blang=["']de(?:-[^"']*)?["']/i.test(html);
  const privacy = `${base}${english ? '/en/privacy/' : '/privatliv/'}`;
  const markup = `
<section class="analytics-consent" aria-labelledby="analytics-consent-title" hidden>
  <div><h2 id="analytics-consent-title">${english ? 'Cookies and measurement' : german ? 'Cookies und Messung' : 'Cookies og måling'}</h2>
  <p>${english ? 'May we use Google Analytics cookies to see which pages are read and where visitors come from? The website works equally well without them.' : german ? 'Dürfen wir Cookies von Google Analytics verwenden, um zu sehen, welche Seiten gelesen werden und woher unsere Besucher kommen? Die Website funktioniert auch ohne diese Cookies.' : 'Må vi bruge Google Analytics-cookies til at se, hvilke sider der bliver læst, og hvor besøgende kommer fra? Siden virker lige godt uden.'} <a href="${privacy}">${english ? 'Privacy' : german ? 'Datenschutz (auf Dänisch)' : 'Privatliv'}</a></p></div>
  <p><label><input type="checkbox" data-statistics-consent> ${english ? 'Visitor statistics (Google Analytics)' : german ? 'Besucherstatistik (Google Analytics)' : 'Besøgsstatistik (Google Analytics)'}</label><br><label><input type="checkbox" data-ads-consent> ${english ? 'Advertising measurement (Google Ads): allow cookies and sharing visit data with Google to measure our ads.' : german ? 'Anzeigenmessung (Google Ads): Cookies und die Weitergabe von Besuchsdaten an Google erlauben, um die Wirkung unserer Anzeigen zu messen.' : 'Annoncemåling (Google Ads): tillad cookies og deling af besøgsdata med Google for at måle vores annoncer.'}</label></p>
  <div class="analytics-consent-actions"><button type="button" data-analytics-choice="denied">${english ? 'Reject all' : german ? 'Alle ablehnen' : 'Afvis alle'}</button><button type="button" data-analytics-choice="granted">${english ? 'Save selected' : german ? 'Auswahl speichern' : 'Gem valgte'}</button><button type="button" data-analytics-choice="all">${english ? 'Accept all' : german ? 'Alle akzeptieren' : 'Acceptér alle'}</button></div>
</section>
<script src="${base}/scripts/analytics.js" data-analytics-id="${measurementId}" data-ads-id="AW-17314847179" defer></script>`;
  const settings = `<button type="button" class="analytics-settings" data-analytics-settings>${english ? 'Cookie settings' : german ? 'Cookie-Einstellungen' : 'Cookieindstillinger'}</button>`;
  const withSettings = html.includes('</footer>') ? html.replace('</footer>', `${settings}</footer>`)
    : html.replace('</body>', `<div class="analytics-settings-fallback">${settings}</div></body>`);
  return withSettings.replace('</head>', `<link rel="stylesheet" href="${base}/styles/analytics.css"></head>`)
    .replace('</body>', `${markup}</body>`);
}
