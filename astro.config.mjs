import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://teob.dk';
const languagePairs = {
  '/': '/en/', '/om/': '/en/about/', '/historier/': '/en/stories/',
  '/perioder/': '/en/periods/', '/cykler/': '/en/bikes/', '/komponenter/': '/en/components/',
  '/historier/cykelsportens-vilde-vesten/': '/en/stories/cykelsportens-vilde-vesten/',
  '/historier/snyd-soem-tour-de-france-1904/': '/en/stories/snyd-soem-tour-de-france-1904/',
  '/historier/alfonsina-strada-giro-1924/': '/en/stories/alfonsina-strada-giro-1924/',
  '/historier/campagnolo-quick-release/': '/en/stories/campagnolo-quick-release/',
  '/historier/alfredo-binda-giro-1930/': '/en/stories/alfredo-binda-giro-1930/',
  '/historier/da-gearene-kom-og-oel-narrede-feltet/': '/en/stories/da-gearene-kom-og-oel-narrede-feltet/',
  '/historier/soevnloeshed-smoer-og-kolde-oel/': '/en/stories/soevnloeshed-smoer-og-kolde-oel/',
  '/historier/aldo-bini-maglia-nera-1948/': '/en/stories/aldo-bini-maglia-nera-1948/',
  '/historier/da-michelin-navnet-blev-et-problem/': '/en/stories/da-michelin-navnet-blev-et-problem/',
  '/historier/wim-van-est-aubisque-1951/': '/en/stories/wim-van-est-aubisque-1951/',
  '/historier/coppi-stelvio-1953/': '/en/stories/coppi-stelvio-1953/',
  '/historier/ivo-faltoni-mekaniker-giro-1954/': '/en/stories/ivo-faltoni-mekaniker-giro-1954/',
  '/historier/den-hvide-oedemark-og-hoensefarmerens-toerst/': '/en/stories/den-hvide-oedemark-og-hoensefarmerens-toerst/',
  '/historier/anquetil-poulidor-puy-de-dome-1964/': '/en/stories/anquetil-poulidor-puy-de-dome-1964/',
  '/historier/tour-feltets-dopingprotest-1966/': '/en/stories/tour-feltets-dopingprotest-1966/',
  '/historier/tom-simpson-mont-ventoux-1967/': '/en/stories/tom-simpson-mont-ventoux-1967/',
  '/historier/suntour-shimano-gearkrigen/': '/en/stories/suntour-shimano-gearkrigen/',
  '/historier/gunnar-asmussen-funny-bike/': '/en/stories/gunnar-asmussen-funny-bike/',
  '/historier/skibby-koppenberg-1987/': '/en/stories/skibby-koppenberg-1987/',
  '/historier/leroica-gamle-cykler-nye-veje/': '/en/stories/leroica-gamle-cykler-nye-veje/',
  '/historier/festina-sagen-tour-de-france-1998/': '/en/stories/festina-sagen-tour-de-france-1998/',
  '/historier/da-regntoejet-kom-med-op-i-solen/': '/en/stories/da-regntoejet-kom-med-op-i-solen/',
  '/perioder/1900-1920/': '/en/periods/1900-1920/',
  '/perioder/1920-1930/': '/en/periods/1920-1930/',
  '/perioder/1930-1939/': '/en/periods/1930-1939/',
  '/perioder/1940-1949/': '/en/periods/1940-1949/',
  '/perioder/1950-1959/': '/en/periods/1950-1959/',
  '/perioder/1960-1969/': '/en/periods/1960-1969/',
  '/perioder/1970-1979/': '/en/periods/1970-1979/',
  '/perioder/1980-1989/': '/en/periods/1980-1989/',
  '/perioder/1990-1999/': '/en/periods/1990-1999/',
  '/perioder/2000-2009/': '/en/periods/2000-2009/',
  '/perioder/2010-2019/': '/en/periods/2010-2019/',
};
const pairedPages = Object.fromEntries(Object.entries(languagePairs).flatMap(([da, en]) => [[da, { da, en }], [en, { da, en }]]));
const seoTitleOverrides = {
  '/historier/alfredo-binda-giro-1930/': 'Giroen betalte Binda for at blive hjemme · The Evolution of Bikes',
  '/historier/anquetil-poulidor-puy-de-dome-1964/': 'Anquetil og Poulidor på Puy de Dôme · The Evolution of Bikes',
  '/historier/coppi-stelvio-1953/': 'Coppi og aftalen på Stelvio · The Evolution of Bikes',
  '/historier/da-michelin-navnet-blev-et-problem/': 'Da Michelin-navnet blev et problem · The Evolution of Bikes',
  '/historier/den-hvide-oedemark-og-hoensefarmerens-toerst/': 'Den hvide ødemark · The Evolution of Bikes',
  '/historier/festina-sagen-tour-de-france-1998/': 'Da Festina-sagen opløste Touren · The Evolution of Bikes',
  '/historier/ivo-faltoni-mekaniker-giro-1954/': 'Den 16-årige mekaniker i Giroen · The Evolution of Bikes',
  '/historier/tour-feltets-dopingprotest-1966/': 'Da Tour-feltet protesterede i 1966 · The Evolution of Bikes',
  '/historier/wim-van-est-aubisque-1951/': 'Wim van Est forsvandt ned ad bjerget · The Evolution of Bikes',
};
const seoDescriptionOverrides = {
  '/komponenter/': 'Mekanik med betydning: komponenter og opfindelser, der ændrede racercyklen og måden, rytterne brugte den på.',
  '/om/': 'Om den personlige cykelsamling bag The Evolution of Bikes og arbejdet med at bevare cyklernes historier, teknik og menneskelige spor.',
};

const socialMetadata = {
  name: 'social-metadata',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outputDir = fileURLToPath(dir);
      const htmlFiles = [];
      const sitemapUrls = [];

      const collectHtml = async (directory) => {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          const path = join(directory, entry.name);
          if (entry.isDirectory()) await collectHtml(path);
          else if (entry.name.endsWith('.html')) htmlFiles.push(path);
        }
      };

      await collectHtml(outputDir);

      for (const file of htmlFiles) {
        let html = await readFile(file, 'utf8');
        if (/name=["']robots["'][^>]*noindex/i.test(html) || /http-equiv=["']refresh["']/i.test(html)) continue;

        const metaContent = (attribute, value) => {
          const tag = html.match(new RegExp(`<meta[^>]+${attribute}=["']${value}["'][^>]*>`, 'i'))?.[0];
          return tag?.match(/content=(["'])(.*?)\1/i)?.[2];
        };
        const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'The Evolution of Bikes';
        const sourceDescription = metaContent('name', 'description') || 'Vintagecykling fortalt gennem cyklerne, løbene og menneskene.';
        const existingImage = metaContent('property', 'og:image');
        const firstImage = html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
        const imagePath = existingImage || firstImage || '/og.png';
        const image = imagePath.startsWith('http') ? imagePath : new URL(imagePath, `${siteUrl}/`).href;
        const relativePath = relative(outputDir, file).split(sep).join('/');
        const pagePath = relativePath === 'index.html' ? '/' : `/${relativePath.replace(/index\.html$/, '')}`;
        const canonical = new URL(pagePath, `${siteUrl}/`).href;
        const isEnglish = pagePath.startsWith('/en/');
        const language = isEnglish ? 'en-GB' : 'da-DK';
        const locale = isEnglish ? 'en_GB' : 'da_DK';
        const type = pairedPages[pagePath] ? 'website' : 'article';
        const escape = (value) => value.replace(/&(?!(?:amp|quot|#39|lt|gt);)/g, '&amp;').replace(/"/g, '&quot;');
        const pageTitle = seoTitleOverrides[pagePath] || title;
        const description = seoDescriptionOverrides[pagePath] || sourceDescription;
        const schemaTitle = pageTitle.replace(/\s+·\s+The Evolution of Bikes$/, '');

        html = html
          .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escape(description)}">`)
          .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
          .replace(/<meta\s+(?:property=["']og:[^"']+["']|name=["']twitter:[^"']+["'])[^>]*>\s*/gi, '')
          .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>.*?<\/script>\s*/gis, '');

        const tags = [
          `<link rel="canonical" href="${canonical}">`,
          ...(pairedPages[pagePath] ? [
            `<link rel="alternate" hreflang="da" href="${new URL(pairedPages[pagePath].da, `${siteUrl}/`).href}">`,
            `<link rel="alternate" hreflang="en" href="${new URL(pairedPages[pagePath].en, `${siteUrl}/`).href}">`,
            `<link rel="alternate" hreflang="x-default" href="${new URL(pairedPages[pagePath].da, `${siteUrl}/`).href}">`,
          ] : []),
          `<meta property="og:locale" content="${locale}">`,
          `<meta property="og:type" content="${type}">`,
          `<meta property="og:site_name" content="The Evolution of Bikes">`,
          `<meta property="og:title" content="${escape(pageTitle)}">`,
          `<meta property="og:description" content="${escape(description)}">`,
          `<meta property="og:url" content="${canonical}">`,
          `<meta property="og:image" content="${image}">`,
          `<meta property="og:image:alt" content="${escape(pageTitle)}">`,
          `<meta name="twitter:card" content="summary_large_image">`,
          `<meta name="twitter:title" content="${escape(pageTitle)}">`,
          `<meta name="twitter:description" content="${escape(description)}">`,
          `<meta name="twitter:image" content="${image}">`,
        ].join('');

        const schema = pagePath === '/' || pagePath === '/en/'
          ? { '@context': 'https://schema.org', '@type': 'WebSite', name: 'The Evolution of Bikes', url: canonical, description, inLanguage: language }
          : type === 'article'
            ? { '@context': 'https://schema.org', '@type': 'Article', headline: schemaTitle, description, image, url: canonical, mainEntityOfPage: canonical, inLanguage: language, author: { '@type': 'Person', name: 'Henning Renita Yde' }, publisher: { '@type': 'Organization', name: 'The Evolution of Bikes', url: siteUrl } }
            : { '@context': 'https://schema.org', '@type': 'CollectionPage', name: schemaTitle, description, url: canonical, image, inLanguage: language, isPartOf: { '@type': 'WebSite', name: 'The Evolution of Bikes', url: siteUrl } };
        const structuredData = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;

        html = html.replace(/<title>.*?<\/title>/is, `${tags}${structuredData}<title>${pageTitle}</title>`);
        await writeFile(file, html);
        sitemapUrls.push(canonical);
      }

      const xmlEscape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.sort().map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
      await writeFile(join(outputDir, 'sitemap.xml'), sitemap);
    },
  },
};

export default defineConfig({
  site: siteUrl,
  base: '',
  output: 'static',
  integrations: [socialMetadata],
});
