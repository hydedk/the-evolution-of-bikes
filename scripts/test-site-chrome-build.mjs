import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { auditSiteChrome, inspectSiteChrome } from './audit-site-chrome-build.mjs';

const logo = '/_astro/teob-logo-2026.fixture.png';
const image = `<picture><source srcset="${logo} 160w" type="image/png"><img data-site-logo="true" src="${logo}" alt="The Evolution of Bikes — EB · teob.dk"></picture>`;
const header = `<header class="site-header site-header--shared" data-site-header="shared"><a class="site-brand site-brand--header" href="/">${image}</a></header>`;
const footer = `<footer class="site-footer" data-site-footer="shared"><a class="site-brand site-brand--footer" href="/">${image}</a></footer>`;
const page = ({ lang = 'da', top = header, bottom = footer, head = '', content = '<main><h1>Ny side</h1></main>' } = {}) =>
  `<!doctype html><html lang="${lang}"><head>${head}</head><body>${top}${content}${bottom}</body></html>`;
const errors = (html, path = '/helt-ny-side/') => inspectSiteChrome(html, path).errors.join('\n');

async function fixture(t, pages) {
  const directory = await mkdtemp(join(tmpdir(), 'teob-chrome-build-'));
  t.after(async () => {
    assert.equal(dirname(directory), resolve(tmpdir()));
    assert.ok(basename(directory).startsWith('teob-chrome-build-'));
    await rm(directory, { recursive: true, force: true });
  });
  await mkdir(join(directory, '_astro'), { recursive: true });
  // A valid tiny PNG; fixture assets never replace the user's approved logo.
  await writeFile(join(directory, logo.slice(1)), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
  for (const [path, html] of Object.entries(pages)) {
    const target = join(directory, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
  }
  return directory;
}

test('new Danish, English and German routes are discovered without menu or sitemap registration', async t => {
  const directory = await fixture(t, {
    'index.html': page(),
    'helt-ny-sektion/ny-side/index.html': page(),
    'en/new-story/index.html': page({ lang: 'en' }),
    'de/neue-geschichte/index.html': page({ lang: 'de' }),
    'ny-hjaelpeside.htm': page(),
  });
  await writeFile(join(directory, 'sitemap.xml'), '<urlset><url><loc>https://teob.dk/</loc></url></urlset>');
  const result = await auditSiteChrome(directory);
  assert.deepEqual(result.errors, []);
  assert.equal(result.pages, 5);
  assert.equal(result.logoAssets, 1);
});

for (const [label, html, expected] of [
  ['header', page({ top: '' }), /én fælles header/],
  ['footer', page({ bottom: '' }), /én fælles footer/],
  ['copied header without component marker', page({ top: header.replace(' data-site-header="shared"', '') }), /én fælles header/],
  ['copied footer without component marker', page({ bottom: footer.replace(' data-site-footer="shared"', '') }), /én fælles footer/],
  ['duplicate header', page({ top: header + header }), /fælles header, fandt 2/],
  ['duplicate footer', page({ bottom: footer + footer }), /fælles footer, fandt 2/],
  ['incorrect marker element', page({ top: header.replace('<header ', '<div ').replace('</header>', '</div>') }), /ugyldig fælles header/],
]) {
  test(`rejects missing or invalid ${label}`, () => assert.match(errors(html), expected));
}

for (const placement of ['header', 'footer']) {
  const region = placement === 'header' ? header : footer;
  const withRegion = replacement => page(placement === 'header' ? { top: replacement } : { bottom: replacement });
  test(`rejects an old logo in ${placement} even with two data-site-logo markers`, () => {
    const html = withRegion(region.replaceAll(logo, '/_astro/old-eb-monogram.svg'));
    assert.equal((html.match(/data-site-logo=/g) || []).length, 2);
    assert.match(errors(html), new RegExp(`${placement}: forkert eller manglende logo`));
  });
  test(`rejects missing logo, wrong image marker and hidden logo in ${placement}`, () => {
    assert.match(errors(withRegion(region.replace(image, ''))), new RegExp(`${placement} skal indeholde ét 2026-logo`));
    assert.match(errors(withRegion(region.replace('data-site-logo="true"', 'data-site-logo="false"'))), /logomarkeringen/);
    assert.match(errors(withRegion(region.replace('<img ', '<img hidden '))), /logoet er skjult/);
  });
}

test('two logos in the header do not make up for a missing footer logo', () => {
  const html = page({ top: header.replace(image, image + image), bottom: footer.replace(image, '') });
  assert.equal((html.match(/data-site-logo=/g) || []).length, 2);
  assert.match(errors(html), /header skal indeholde ét 2026-logo, fandt 2/);
  assert.match(errors(html), /footer skal indeholde ét 2026-logo, fandt 0/);
});

test('correct fallback image cannot hide an old logo in a picture source or srcset', () => {
  const badSource = header.replace(`srcset="${logo} 160w"`, 'srcset="/_astro/old-eb.svg 160w"');
  assert.match(errors(page({ top: badSource })), /header: forkert eller manglende logo/);
  const badFallbackSet = footer.replace('<img ', '<img srcset="/_astro/old-eb.svg 320w" ');
  assert.match(errors(page({ bottom: badFallbackSet })), /footer: forkert eller manglende logo/);
});

test('the old HTML monogram is rejected even alongside correctly marked 2026 logos', () => {
  assert.match(errors(page({ top: header.replace('</header>', '<span class="brand-mark">EB</span></header>') })), /gamle HTML-monogram/);
});

test('commented, scripted and inert copies do not count as rendered shared components', () => {
  for (const fake of [
    `<!-- ${header}${footer} -->`,
    `<script>const markup = ${JSON.stringify(header + footer)};</script>`,
    `<style>/* ${header}${footer} */</style>`,
    `<template>${header}${footer}</template>`,
    `<noscript>${header}${footer}</noscript>`,
  ]) {
    const result = errors(page({ top: fake, bottom: '' }));
    assert.match(result, /én fælles header/);
    assert.match(result, /én fælles footer/);
  }
});

test('attribute order, single quotes and additional CSS classes are accepted', () => {
  const top = header.replace('<header class="site-header site-header--shared" data-site-header="shared">', "<HEADER data-site-header='shared' class='extra site-header--shared site-header'>").replace('</header>', '</HEADER>');
  assert.equal(errors(page({ top })), '');
});

test('missing and empty physical logo files fail with the affected route', async t => {
  const directory = await fixture(t, { 'en/new-story/index.html': page({ lang: 'en' }) });
  const target = join(directory, logo.slice(1));
  await rm(target);
  assert.match((await auditSiteChrome(directory)).errors.join('\n'), /\/en\/new-story\/: logoets billedfil mangler eller er tom/);
  await writeFile(target, '');
  assert.match((await auditSiteChrome(directory)).errors.join('\n'), /logoets billedfil mangler eller er tom/);
});

test('noindex does not exempt new editorial pages or changed diagnostic content', () => {
  const head = '<meta name="robots" content="noindex, nofollow">';
  assert.match(errors(page({ head, top: '', bottom: '' })), /én fælles header/);
  assert.equal(inspectSiteChrome(page({ head }), '/ny-noindex-side/').exempt, null);
  const diagnostic = page({ head, top: '', bottom: '', content: '<main><h1>Test</h1><p>Testsiden virker.</p></main>' });
  assert.equal(inspectSiteChrome(diagnostic, '/test/').exempt, 'diagnostic');
  assert.match(errors(diagnostic, '/test/ny-side/'), /én fælles header/);
  assert.match(errors(diagnostic.replace('Testsiden virker.', 'Nyt redaktionelt indhold.'), '/test/'), /én fælles header/);
});

test('technical exemptions are limited to the actual verification token and immediate noindex redirects', () => {
  const path = '/google5ead39beb003baf8.html';
  const token = 'google-site-verification: google5ead39beb003baf8.html\n';
  assert.equal(inspectSiteChrome(token, path).exempt, 'verification');
  assert.ok(errors(token, '/ny-side.html'));
  assert.ok(errors(token + '<main>Ny side</main>', path));
  const redirect = delay => page({ top: '', bottom: '', head: `<meta name="robots" content="noindex"><meta http-equiv="refresh" content="${delay};url=/historier/">` });
  assert.equal(inspectSiteChrome(redirect(0), '/gammel-adresse/').exempt, 'redirect');
  assert.match(errors(redirect(5)), /én fælles header/);
  assert.match(errors(redirect(0).replace('noindex', 'index')), /én fælles header/);
  assert.match(errors(redirect(0).replace('url=/historier/', 'url=/helt-ny-side/')), /én fælles header/);
});

test('the CLI exits nonzero for an unlisted new page and succeeds after the page is corrected', async t => {
  const directory = await fixture(t, { 'index.html': page(), 'ikke-i-sitemap/index.html': page({ bottom: '' }) });
  const cli = fileURLToPath(new URL('./audit-site-chrome-build.mjs', import.meta.url));
  const run = () => spawnSync(process.execPath, [cli, directory], { encoding: 'utf8' });
  const failed = run();
  assert.equal(failed.status, 1);
  assert.match(failed.stderr, /\/ikke-i-sitemap\/: forventede én fælles footer/);
  await writeFile(join(directory, 'ikke-i-sitemap/index.html'), page());
  const passed = run();
  assert.equal(passed.status, 0, passed.stderr);
  assert.match(passed.stdout, /2 sider/);
});

test('an empty output directory cannot produce a successful audit', async t => {
  const directory = await fixture(t, {});
  assert.match((await auditSiteChrome(directory)).errors.join('\n'), /ingen almindelige HTML-sider/);
});
