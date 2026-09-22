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
];

export const englishStorySlugs = new Set([
  ...slugsFrom(Object.keys(storyModules)),
  ...dynamicEnglishStorySlugs,
]);
export const englishBikeSlugs = slugsFrom(Object.keys(bikeModules));
