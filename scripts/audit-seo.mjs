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
  return {
    path,
    redirect: /http-equiv=["']refresh["']/i.test(html) || /name=["']robots["'][^>]*noindex/i.test(html),
    title: unescapeHtml(text(html, /<title>(.*?)<\/title>/is)),
    description: unescapeHtml(text(html, /<meta\s+name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/is)),
    h1: (html.match(/<h1(?:\s|>)/gi) || []).length,
    canonical: text(html, /<link\s+rel=["']canonical["'][^>]*href=["'](.*?)["'][^>]*>/is),
  };
}));

const publicPages = pages.filter((page) => !page.redirect);

const errors = [];
for (const page of publicPages) {
  if (!page.title) errors.push(`${page.path}: mangler title`);
  if (!page.description) errors.push(`${page.path}: mangler meta description`);
  if (page.h1 !== 1) errors.push(`${page.path}: har ${page.h1} H1-overskrifter`);
  if (!page.canonical) errors.push(`${page.path}: mangler canonical URL`);
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
  console.log(`SEO-kontrol bestået: ${publicPages.length} offentlige sider har unik titel og beskrivelse, canonical URL og præcis én H1.`);
}
