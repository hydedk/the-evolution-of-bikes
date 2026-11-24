import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { promotionIsDue, promotionLanguages } from '../src/data/storyPromotion.mjs';
import { isUnreleasedHref } from '../src/data/publicationBoundary.mjs';
const root = new URL('../dist/', import.meta.url);
const plan = JSON.parse(await readFile(new URL('../src/data/storyPromotions.json',import.meta.url),'utf8'));
const now = new Date();
const pending = plan.entries.filter(e=>!promotionIsDue(e,plan,now));
const htmlFiles = [];
async function collect(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const path = join(dir,entry.name);
    if (entry.isDirectory()) {
      await collect(path);
    } else if(entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}
// A direct existence check also works with Windows file URLs.
const top = await readdir(root);
if ((await readdir(new URL('en/',root))).includes('races')) throw new Error('English race work pages must not ship');
if(top.includes('loeb')) throw new Error('Race work pages must not ship');
const { fileURLToPath } = await import('node:url');
await collect(fileURLToPath(root));
for(const entry of plan.entries) {
  const prefixes = entry.publishAt ? promotionLanguages(entry).map(lang=>({da:'historier',en:'en/stories',de:'de/geschichten'}[lang])) : ['historier','en/stories'];
  if (entry.languages && !entry.languages.includes('de')) {
    if (await access(new URL('de/geschichten/'+entry.slug+'/index.html',root)).then(()=>true,()=>false)) throw Error('Unapproved German story generated: '+entry.slug);
  }
  if (entry.publishAt && pending.includes(entry)) {
    for (const prefix of prefixes) {
      const page = new URL(prefix+'/'+entry.slug+'/index.html',root);
      const exists = await access(page).then(()=>true, error=>{ if (error.code==='ENOENT') return false; throw error; });
      if (exists) throw new Error('Article generated before its publication time: '+page);
    }
    continue;
  }
  for(const prefix of prefixes) {
    await readFile(new URL(`${prefix}/${entry.slug}/index.html`,root));
  }
}
const publicHtml = [];
for(const file of htmlFiles) {
  const normalizedPath = file.replaceAll('\\','/');
  if (normalizedPath.includes('/dist/admin/')) continue;
  const html = await readFile(file,'utf8');
  const pagePath = '/' + normalizedPath.split('/dist/')[1].replace(/index\.html$/, '');
  if (isUnreleasedHref(pagePath)) throw new Error('Work page must not ship: '+pagePath);
  for (const [, href] of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    if (isUnreleasedHref(href)) throw new Error('Link to held section: '+href+' in '+file);
  }
  if (/<html\b/i.test(html) && !/name=["']robots["'][^>]*noindex/i.test(html) && !/http-equiv=["']refresh["']/i.test(html)) {
    const lang = html.match(/<html[^>]+lang=["']([^"']+)/)?.[1];
    const nav = html.match(/<nav\b[^>]*class=["']site-main-menu["'][^>]*>(.*?)<\/nav>/s)?.[1];
    const destinations = [...(nav || '').matchAll(/href=["']([^"']+)/g)].map(([, href])=>href);
    const expected = lang === 'en' ? ['/en/stories/','/en/periods/','/en/bikes/','/en/about/'] : ['/historier/','/perioder/','/cykler/','/om/'];
    if (JSON.stringify(destinations) !== JSON.stringify(expected)) throw new Error('Unexpected public menu: '+file);
    if ((html.match(/data-site-logo=/g)||[]).length !== 2) throw new Error('Header/footer logo missing: '+file);
    if (/<meta[^>]+property=["']og:image["'][^>]+teob-logo-2026/i.test(html)) throw new Error('Logo used instead of article image: '+file);
  }
  publicHtml.push({ path: normalizedPath, html });
  for(const entry of pending) {
    // The two direct article pages may link to each other via the language switch.
    const normalized = file.replaceAll('\\','/');
    if(normalized.endsWith(`/${entry.slug}/index.html`)) continue;
    for(const prefix of ['historier','en/stories']) {
      if(html.includes(`/${prefix}/${entry.slug}/`)) throw new Error(`Premature discovery link: ${entry.slug} in ${file}`);
    }
  }
}
const due = plan.entries.filter(e=>!pending.includes(e));
for (const entry of due) {
  for (const [prefix, archive, period, theme] of [
    ['historier','historier','perioder','tema'],
    ['en/stories','en/stories','en/periods','en/themes'],
  ]) {
    const link = `/${prefix}/${entry.slug}/`;
    const archiveHtml = await readFile(new URL(`${archive}/index.html`,root),'utf8');
    if (!archiveHtml.includes(link)) throw new Error(`Promoted story missing from archive: ${link}`);
    for (const section of [period,theme]) {
      if (!publicHtml.some(page=>page.path.includes(`/dist/${section}/`) && page.html.includes(link))) {
        throw new Error(`Promoted story missing from ${section}: ${link}`);
      }
    }
  }
}
const latest = [...due].sort((a,b)=>b.date.localeCompare(a.date))[0];
if (latest) for (const [home,prefix] of [['','historier'],['en/','en/stories']]) {
  const html = await readFile(new URL(`${home}index.html`,root),'utf8');
  if (!html.includes(`/${prefix}/${latest.slug}/`)) throw new Error('Latest promotion missing from homepage');
}
const sitemap = await readFile(new URL('sitemap.xml',root),'utf8');
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) if (isUnreleasedHref(url)) throw new Error('Held section in sitemap: '+url);
console.log('Promotion output check passed: timed publication, shared header/footer/logo, four public menu items, no held sections or links.');
