const storyModules = import.meta.glob('../pages/en/stories/*.astro');
const bikeModules = import.meta.glob('../pages/en/bikes/*.astro');

const slugsFrom = (paths: string[]) => new Set(
  paths
    .map((path) => path.split('/').pop()?.replace(/\.astro$/, ''))
    .filter((slug): slug is string => Boolean(slug && slug !== 'index')),
);

export const englishStorySlugs = slugsFrom(Object.keys(storyModules));
export const englishBikeSlugs = slugsFrom(Object.keys(bikeModules));
