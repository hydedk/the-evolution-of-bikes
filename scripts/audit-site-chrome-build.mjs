import { readdir, readFile, stat } from 'node:fs/promises';
import { basename, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ELEMENT_NODE, TEXT_NODE, parse } from 'ultrahtml';

const inert = new Set(['script', 'style', 'template', 'noscript']);
const name = node => node.name?.toLowerCase();
const attribute = (node, key) => Object.entries(node.attributes || {}).find(([k]) => k.toLowerCase() === key)?.[1];
const hasAttribute = (node, key) => attribute(node, key) !== undefined;
const hasClass = (node, token) => (attribute(node, 'class') || '').split(/\s+/).includes(token);

function elements(node, result = []) {
  if (node.type === ELEMENT_NODE) {
    if (inert.has(name(node))) return result;
    result.push(node);
  }
  for (const child of node.children || []) elements(child, result);
  return result;
}

function textContent(node) {
  if (node.type === TEXT_NODE) return node.value;
  if (inert.has(name(node))) return '';
  return (node.children || []).map(textContent).join(' ');
}

function inside(node, ancestor) {
  for (let parent = node.parent; parent; parent = parent.parent) if (parent === ancestor) return true;
  return false;
}

function hidden(node) {
  for (let p = node; p; p = p.parent) {
    if (hasAttribute(p, 'hidden') || attribute(p, 'aria-hidden')?.toLowerCase() === 'true'
      || /(?:display\s*:\s*none\b|visibility\s*:\s*(?:hidden|collapse)\b)/i.test(attribute(p, 'style') || '')) return true;
  }
  return false;
}

function exception(nodes, html, path) {
  // The Google verification response is a token, not an editorial HTML page.
  if (path === '/google5ead39beb003baf8.html'
    && html.trim() === 'google-site-verification: google5ead39beb003baf8.html') return 'verification';
  const head = nodes.find(n => name(n) === 'head');
  const meta = nodes.filter(n => name(n) === 'meta' && head && inside(n, head));
  const noindex = meta.some(n => attribute(n, 'name')?.toLowerCase() === 'robots'
    && /\bnoindex\b/i.test(attribute(n, 'content') || ''));
  // Only an immediate, explicitly non-indexed HTTP(S) redirect is exempt.
  const refresh = meta.filter(n => attribute(n, 'http-equiv')?.toLowerCase() === 'refresh');
  const destination = refresh.length === 1
    && attribute(refresh[0], 'content')?.match(/^\s*0(?:\.0+)?\s*;\s*url\s*=\s*(.+?)\s*$/i)?.[1];
  if (noindex && destination) {
    try {
      const current = new URL('https://teob.dk' + path);
      const target = new URL(destination.replace(/^['"]|['"]$/g, ''), current);
      if (['http:', 'https:'].includes(target.protocol) && target.href !== current.href) return 'redirect';
    } catch { /* Malformed redirects must pass the normal checks. */ }
  }
  // Keep the pre-existing minimal diagnostic page, without exempting new
  // noindex pages, new /test/... routes, or editorial content added to /test/.
  const body = nodes.find(n => name(n) === 'body');
  if (path === '/test/' && noindex && body
    && elements(body).map(name).join(',') === 'body,main,h1,p'
    && textContent(body).replace(/\s+/g, ' ').trim() === 'Test Testsiden virker.') return 'diagnostic';
  return null;
}

function logoPath(src, path) {
  try {
    const url = new URL(src.replaceAll('&amp;', '&'), 'https://teob.dk' + path);
    const pathname = decodeURIComponent(url.pathname);
    if (!['https:', 'http:'].includes(url.protocol) || !['teob.dk', 'www.teob.dk'].includes(url.hostname)
      || !/^teob-logo-2026(?:[._-][a-z0-9_-]+)*\.(?:png|webp|avif)$/i.test(basename(pathname))) return null;
    return pathname;
  } catch { return null; }
}

/** Validate the rendered component contract, independent of page name/language. */
export function inspectSiteChrome(html, path) {
  const nodes = elements(parse(html));
  const exempt = exception(nodes, html, path);
  if (exempt) return { errors: [], assets: [], exempt };
  const errors = [];
  const assets = new Set();
  const error = message => errors.push(`${path}: ${message}`);
  const body = nodes.filter(n => name(n) === 'body');
  if (nodes.filter(n => name(n) === 'html').length !== 1 || body.length !== 1) error('mangler et gyldigt HTML-dokument med body');
  const regions = {};
  for (const [tag, marker, classes] of [
    ['header', 'data-site-header', ['site-header', 'site-header--shared']],
    ['footer', 'data-site-footer', ['site-footer']],
  ]) {
    const marked = nodes.filter(n => hasAttribute(n, marker));
    if (marked.length !== 1) {
      error(`forventede én fælles ${tag}, fandt ${marked.length}`);
      continue;
    }
    const region = marked[0];
    regions[tag] = region;
    if (name(region) !== tag || attribute(region, marker) !== 'shared' || !classes.every(c => hasClass(region, c))) {
      error(`ugyldig fælles ${tag}; brug Site${tag === 'header' ? 'Header' : 'Footer'}.astro`);
    }
    if (body.length === 1 && !inside(region, body[0])) error(`fælles ${tag} ligger uden for body`);
    if (hidden(region)) error(`fælles ${tag} er skjult`);
    if (nodes.some(n => hasClass(n, 'brand-mark') && inside(n, region))) error(`${tag}: det gamle HTML-monogram må ikke erstatte eller supplere 2026-logoet`);
    const logos = nodes.filter(n => hasAttribute(n, 'data-site-logo') && inside(n, region));
    if (logos.length !== 1) {
      error(`${tag} skal indeholde ét 2026-logo, fandt ${logos.length}`);
      continue;
    }
    const logo = logos[0];
    if (name(logo) !== 'img' || attribute(logo, 'data-site-logo') !== 'true') error(`${tag}: logomarkeringen skal sidde på SiteBrands billede`);
    if (hidden(logo)) error(`${tag}: logoet er skjult`);
    if (!attribute(logo, 'alt')?.trim()) error(`${tag}: logoet mangler alt-tekst`);
    const brand = nodes.find(n => name(n) === 'a' && hasClass(n, 'site-brand')
      && hasClass(n, `site-brand--${tag}`) && inside(logo, n) && inside(n, region));
    if (!brand) error(`${tag}: logoet mangler den fælles SiteBrand-komponent`);
    const sources = new Set([attribute(logo, 'src') || '']);
    const picture = nodes.find(n => name(n) === 'picture' && inside(logo, n) && inside(n, region));
    for (const node of [logo, ...(picture ? elements(picture).filter(n => name(n) === 'source') : [])]) {
      for (const item of (attribute(node, 'srcset') || '').split(',').filter(s => s.trim())) sources.add(item.trim().split(/\s+/)[0]);
    }
    for (const src of sources) {
      const asset = logoPath(src, path);
      if (!src || !asset) error(`${tag}: forkert eller manglende logo; forventede teob-logo-2026 (PNG/WebP/AVIF)`);
      else assets.add(asset);
    }
  }
  if (regions.header && regions.footer && (inside(regions.header, regions.footer) || inside(regions.footer, regions.header))) error('fælles header og footer må ikke ligge inden i hinanden');
  if (nodes.filter(n => hasAttribute(n, 'data-site-logo')).length !== 2) error('siden skal have præcis to fælles logoer: ét i header og ét i footer');
  return { errors, assets: [...assets], exempt: null };
}

/** Scan every emitted HTML file, including routes absent from menus/sitemap. */
export async function auditSiteChrome(outputDirectory) {
  const root = resolve(outputDirectory);
  const files = [];
  async function collect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await collect(path);
      else if (/\.html?$/i.test(entry.name)) files.push(path);
    }
  }
  await collect(root);
  const errors = [];
  const exemptions = [];
  const assets = new Map();
  let pages = 0;
  for (const file of files.sort()) {
    const path = '/' + relative(root, file).split(sep).join('/').replace(/index\.html?$/i, '');
    const result = inspectSiteChrome(await readFile(file, 'utf8'), path);
    errors.push(...result.errors);
    if (result.exempt) exemptions.push({ path, reason: result.exempt });
    else pages++;
    for (const asset of result.assets) {
      if (!assets.has(asset)) assets.set(asset, await (async () => {
        const target = resolve(root, '.' + asset);
        const rel = relative(root, target);
        if (isAbsolute(rel) || rel === '..' || rel.startsWith('..' + sep)) return false;
        try { const info = await stat(target); return info.isFile() && info.size > 0; }
        catch (error) { if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return false; throw error; }
      })());
      if (!assets.get(asset)) errors.push(`${path}: logoets billedfil mangler eller er tom: ${asset}`);
    }
  }
  if (!pages) errors.push('Bygningen indeholder ingen almindelige HTML-sider at kontrollere');
  return { pages, htmlFiles: files.length, exemptions, logoAssets: assets.size, errors };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const result = await auditSiteChrome(process.argv[2] || fileURLToPath(new URL('../dist/', import.meta.url)));
  if (result.errors.length) {
    console.error(`Header/footer-kontrollen fandt ${result.errors.length} fejl:\n- ${result.errors.join('\n- ')}`);
    process.exitCode = 1;
  } else {
    console.log(`Header/footer-kontrol bestået: ${result.pages} sider, ${result.logoAssets} logo-billedfiler og ${result.exemptions.length} tekniske undtagelser. Alle nye HTML-adresser kontrolleres automatisk.`);
  }
}
