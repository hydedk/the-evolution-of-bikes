const storyModules = import.meta.glob('../pages/en/stories/*.astro');
const bikeModules = import.meta.glob('../pages/en/bikes/*.astro');

const slugsFrom = (paths: string[]) => new Set(
  paths
    .map((path) => path.split('/').pop()?.replace(/\.astro$/, ''))
    .filter((slug): slug is string => Boolean(slug && slug !== 'index')),
);

const dynamicEnglishStorySlugs = [
  'circuit-de-france-1942',
  'gino-bartali-kurer-under-krigen',
  'fausto-coppi-fra-krigsfange-til-comeback',
  'jean-robic-vender-touren-1947',
  'campagnolo-gran-sport-parallelogram',
  'roger-walkowiak-tour-1956',
  'charly-gaul-monte-bondone-1956',
  'tour-start-amsterdam-1954',
  'fausto-coppi-la-bomba',
  'soigneuren-og-maden-i-1970erne',
  'moser-timerekord-1984',
  'look-klikpedal-hinault-1985',
  'gavia-sneetapen-1988',
  'lemond-fignon-otte-sekunder-1989',
  'boonen-paris-roubaix-2009',
  'operacion-puerto-2006',
  'bjarne-riis-team-csc',
  'carbon-og-68-kilo',
];

export const englishStorySlugs = new Set([
  ...slugsFrom(Object.keys(storyModules)),
  ...dynamicEnglishStorySlugs,
]);
export const englishBikeSlugs = slugsFrom(Object.keys(bikeModules));
