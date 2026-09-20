import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name === 'index.html') files.push(path);
  }
}

const text = (html, pattern) => html.match(pattern)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
const unescapeHtml = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");

await collect(root);
const pages = await Promise.all(files.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const path = `/${relative(root, file).split(sep).join('/').replace(/index\.html$/, '')}`.replace('//', '/');
  const images = [...html.matchAll(/<img\b[^>]*>/gis)].map(([tag]) => ({
    tag,
    src: tag.match(/\bsrc=["'](.*?)["']/is)?.[1] || '',
    hasAlt: /\balt=["']/i.test(tag),
    alt: unescapeHtml(tag.match(/\balt=["'](.*?)["']/is)?.[1]?.trim() || ''),
  }));
  const jsonLdSource = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is)?.[1];
  let jsonLd = null;
  try { jsonLd = jsonLdSource ? JSON.parse(jsonLdSource) : null; } catch { /* Reported below. */ }
  return {
    path,
    redirect: /http-equiv=["']refresh["']/i.test(html) || /name=["']robots["'][^>]*noindex/i.test(html),
    title: unescapeHtml(text(html, /<title>(.*?)<\/title>/is)),
    description: unescapeHtml(text(html, /<meta\s+name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/is)),
    h1: (html.match(/<h1(?:\s|>)/gi) || []).length,
    canonical: text(html, /<link\s+rel=["']canonical["'][^>]*href=["'](.*?)["'][^>]*>/is),
    links: [...html.matchAll(/<a\b[^>]*\bhref=["'](.*?)["'][^>]*>/gis)].map((match) => unescapeHtml(match[1])),
    images,
    jsonLd,
  };
}));

const publicPages = pages.filter((page) => !page.redirect);

const errors = [];
const publicPaths = new Set(publicPages.map((page) => page.path));
for (const page of publicPages) {
  if (!page.title) errors.push(`${page.path}: mangler title`);
  if (!page.description) errors.push(`${page.path}: mangler meta description`);
  if (page.h1 !== 1) errors.push(`${page.path}: har ${page.h1} H1-overskrifter`);
  if (!page.canonical) errors.push(`${page.path}: mangler canonical URL`);
  if (!page.jsonLd) errors.push(`${page.path}: mangler gyldig JSON-LD`);
  else {
    const graph = page.jsonLd['@graph'] || [page.jsonLd];
    const types = graph.flatMap((node) => Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).filter(Boolean);
    const expectedType = page.path === '/' || page.path === '/en/' ? 'WebSite'
      : ['/om/', '/en/about/'].includes(page.path) ? 'AboutPage'
      : /^\/(?:en\/bikes|cykler)\/[^/]+\/$/.test(page.path) ? 'ItemPage'
      : /^\/(?:en\/components|komponenter)\/[^/]+\/$/.test(page.path) ? 'TechArticle'
      : /^\/(?:en\/(?:stories|periods)|historier|perioder)\/[^/]+\/$/.test(page.path) ? 'Article'
      : ['/historier/', '/perioder/', '/cykler/', '/komponenter/', '/en/stories/', '/en/periods/', '/en/bikes/', '/en/components/'].includes(page.path) ? 'CollectionPage'
      : 'WebPage';
    if (!types.includes(expectedType)) errors.push(`${page.path}: forventede Schema.org-typen ${expectedType}, fandt ${types.join(', ')}`);
    if (/^\/(?:en\/bikes|cykler)\/[^/]+\/$/.test(page.path)) {
      const itemPage = graph.find((node) => node['@type'] === 'ItemPage');
      if (itemPage?.mainEntity?.['@type'] !== 'IndividualProduct') errors.push(`${page.path}: mangler IndividualProduct som hovedgenstand`);
    }
    if (['/om/', '/en/about/'].includes(page.path)) {
      const aboutPage = graph.find((node) => node['@type'] === 'AboutPage');
      const canonical = `https://teob.dk${page.path}`;
      if (aboutPage?.breadcrumb?.['@id'] !== `${canonical}#breadcrumb`) errors.push(`${page.path}: AboutPage mangler reference til BreadcrumbList`);
      if (aboutPage?.publisher?.['@id'] !== 'https://teob.dk/#organization') errors.push(`${page.path}: AboutPage mangler publisher-reference`);
      if (aboutPage?.about?.['@id'] !== 'https://teob.dk/#collection') errors.push(`${page.path}: AboutPage mangler reference til samlingen`);
      if (!graph.some((node) => node['@id'] === 'https://teob.dk/#henning-renita-yde' && node['@type'] === 'Person')) errors.push(`${page.path}: mangler Person-entitet for samlingens kurator`);
    }
    if (page.path !== '/' && page.path !== '/en/' && !types.includes('BreadcrumbList')) errors.push(`${page.path}: mangler BreadcrumbList`);
  }
  for (const image of page.images) {
    const label = image.src || 'billede uden src';
    if (!image.hasAlt) errors.push(`${page.path}: ${label} mangler alt-attribut`);
    else if (/^(?:image|photo|picture|billede|foto)(?:\s+af)?$/i.test(image.alt)) {
      errors.push(`${page.path}: ${label} har generisk alt-tekst: ${image.alt}`);
    } else if (/^(?:img[_-]?\d+|dsc[_-]?\d+|[\w-]+\.(?:jpe?g|png|webp|gif|svg))$/i.test(image.alt)) {
      errors.push(`${page.path}: ${label} bruger et filnavn som alt-tekst: ${image.alt}`);
    }
  }
  for (const href of page.links) {
    if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript):/i.test(href)) continue;
    let target;
    try { target = new URL(href, `https://teob.dk${page.path}`); } catch { continue; }
    if (target.hostname !== 'teob.dk' || !target.pathname.endsWith('/')) continue;
    if (!publicPaths.has(target.pathname)) errors.push(`${page.path}: internt link peger på en manglende side: ${target.pathname}`);
  }
}

for (const field of ['title', 'description']) {
  const values = new Map();
  for (const page of publicPages) {
    if (!page[field]) continue;
    values.set(page[field], [...(values.get(page[field]) || []), page.path]);
  }
  for (const [value, paths] of values) {
    if (paths.length > 1) errors.push(`Dublet ${field}: ${paths.join(', ')} (${value})`);
  }
}

if (errors.length) {
  console.error(`SEO-kontrollen fandt ${errors.length} fejl:\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  const imageCount = publicPages.reduce((total, page) => total + page.images.length, 0);
  console.log(`SEO- og billedkontrol bestået: ${publicPages.length} offentlige sider og ${imageCount} billeder har gyldige metadata.`);
}
