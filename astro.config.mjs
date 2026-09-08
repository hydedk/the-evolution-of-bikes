import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://teob.dk';

const socialMetadata = {
  name: 'social-metadata',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outputDir = fileURLToPath(dir);
      const htmlFiles = [];

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
        const description = metaContent('name', 'description') || 'Vintagecykling fortalt gennem cyklerne, løbene og menneskene.';
        const existingImage = metaContent('property', 'og:image');
        const firstImage = html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
        const imagePath = existingImage || firstImage || '/og.png';
        const image = imagePath.startsWith('http') ? imagePath : new URL(imagePath, `${siteUrl}/`).href;
        const relativePath = relative(outputDir, file).split(sep).join('/');
        const pagePath = relativePath === 'index.html' ? '/' : `/${relativePath.replace(/index\.html$/, '')}`;
        const canonical = new URL(pagePath, `${siteUrl}/`).href;
        const type = pagePath === '/' || /\/(historier|perioder|cykler|komponenter)\/$/.test(pagePath) ? 'website' : 'article';
        const escape = (value) => value.replace(/&(?!(?:amp|quot|#39|lt|gt);)/g, '&amp;').replace(/"/g, '&quot;');

        html = html
          .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
          .replace(/<meta\s+(?:property=["']og:[^"']+["']|name=["']twitter:[^"']+["'])[^>]*>\s*/gi, '');

        const tags = [
          `<link rel="canonical" href="${canonical}">`,
          `<meta property="og:locale" content="da_DK">`,
          `<meta property="og:type" content="${type}">`,
          `<meta property="og:site_name" content="The Evolution of Bikes">`,
          `<meta property="og:title" content="${escape(title)}">`,
          `<meta property="og:description" content="${escape(description)}">`,
          `<meta property="og:url" content="${canonical}">`,
          `<meta property="og:image" content="${image}">`,
          `<meta property="og:image:alt" content="${escape(title)}">`,
          `<meta name="twitter:card" content="summary_large_image">`,
          `<meta name="twitter:title" content="${escape(title)}">`,
          `<meta name="twitter:description" content="${escape(description)}">`,
          `<meta name="twitter:image" content="${image}">`,
        ].join('');

        html = html.replace(/<title>/i, `${tags}<title>`);
        await writeFile(file, html);
      }
    },
  },
};

export default defineConfig({
  site: siteUrl,
  base: '',
  output: 'static',
  integrations: [socialMetadata],
});
