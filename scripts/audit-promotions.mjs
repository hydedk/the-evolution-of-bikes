import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { promotionIsDue } from '../src/data/storyPromotion.mjs';
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
  const prefixes = entry.publishAt ? ['historier','en/stories','de/geschichten'] : ['historier','en/stories'];
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
if(sitemap.includes('/loeb/') || sitemap.includes('/en/races/')) throw new Error('Race work pages in sitemap');
console.log('Promotion output check passed: direct DA/EN pages, no early discovery links, no race work pages.');
