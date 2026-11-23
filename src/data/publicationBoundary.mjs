import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const workPrefixes = ['/loeb/', '/bikes/', '/ryttere/', '/teams/', '/en/races/', '/en/brands/', '/en/riders/', '/en/teams/', '/de/fahrer/'];
// Only existing static collection pages may use /en/bikes/. This also works in
// the public checkout, without importing the local, unpublished brand registry.
const collectionPaths = new Set(readdirSync(resolve('src/pages/en/bikes'))
  .filter(file => file.endsWith('.astro') && !file.startsWith('[') && file !== 'index.astro')
  .map(file => `/en/bikes/${file.slice(0, -6)}/`));

export function isUnreleasedHref(href) {
  try {
    const url = new URL(href.replaceAll('&amp;', '&'), 'https://teob.dk');
    if (!['teob.dk', 'www.teob.dk'].includes(url.hostname)) return false;
    const path = decodeURIComponent(url.pathname).replace(/\/+$/, '') + '/';
    return workPrefixes.some(prefix => path.startsWith(prefix))
      || (path.startsWith('/en/bikes/') && path !== '/en/bikes/' && !collectionPaths.has(path));
  } catch {
    return false;
  }
}
