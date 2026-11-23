import { isUnreleasedHref } from './publicationBoundary.mjs';
export type SiteLanguage = 'da' | 'en' | 'de';
export type PageTranslations = Partial<Record<SiteLanguage, string>>;

export const siteLanguages: SiteLanguage[] = ['da', 'en', 'de'];
export const languageNames = { da: 'Dansk', en: 'English', de: 'Deutsch' };

// Navigation destinations are explicit: German currently links to Danish pages.
export const siteChrome = {
  da: {
    home: '/', homeLabel: 'The Evolution of Bikes, forside', menuLabel: 'Hovedmenu',
    languageLabel: 'Vælg sprog', homeFallback: 'Engelsk forside',
    tagline: 'Cykler · Mennesker · Løb · Historie',
    navigation: [
      ['stories', 'Historier', '/historier/'], ['periods', 'Perioder', '/perioder/'],
      ['bikes', 'Cykler', '/cykler/'], ['about', 'Om', '/om/'],
    ],
    previewNavigation: [
      ['home', 'Forside', '/'], ['stories', 'Historier', '/historier/'],
      ['races', 'Løb', '/loeb/'], ['teams', 'Hold', '/teams/'],
      ['riders', 'Ryttere', '/ryttere/'], ['brands', 'Cykelmærker', '/bikes/'],
      ['periods', 'De gode gamle dage', '/perioder/'], ['about', 'Om siden', '/om/'],
    ],
    story: { label: 'Fortæl din historie', path: '/fortael-din-historie/' },
    footer: ['En personlig samling af vintagecykler,', 'historier, mærker og komponenter.'],
  },
  en: {
    home: '/en/', homeLabel: 'The Evolution of Bikes, home', menuLabel: 'Main menu',
    languageLabel: 'Choose language', homeFallback: 'Danish home',
    tagline: 'Bicycles · People · Racing · History',
    navigation: [
      ['stories', 'Stories', '/en/stories/'], ['periods', 'Periods', '/en/periods/'],
      ['bikes', 'Bikes', '/en/bikes/'], ['about', 'About', '/en/about/'],
    ],
    previewNavigation: [
      ['home', 'Home', '/en/'], ['stories', 'Stories', '/en/stories/'],
      ['races', 'Races', '/en/races/'], ['teams', 'Teams', '/en/teams/'],
      ['riders', 'Riders', '/en/riders/'], ['brands', 'Bicycle brands', '/en/brands/'],
      ['periods', 'The good old days', '/en/periods/'], ['about', 'About', '/en/about/'],
    ],
    story: { label: 'Share your story', path: '/en/share-your-story/' },
    footer: ['A personal collection of vintage bicycles,', 'stories, marques and components.'],
  },
  de: {
    home: '/', homeLabel: 'The Evolution of Bikes, Startseite auf Dänisch',
    menuLabel: 'Hauptmenü mit Links zu dänischen Seiten',
    languageLabel: 'Sprache wählen', homeFallback: 'Dänische Startseite',
    tagline: 'Fahrräder · Menschen · Rennen · Geschichte',
    navigation: [
      ['stories', 'Geschichten', '/historier/'], ['periods', 'Epochen', '/perioder/'],
      ['bikes', 'Fahrräder', '/cykler/'], ['about', 'Über die Website', '/om/'],
    ],
    previewNavigation: [
      ['home', 'Startseite', '/'], ['stories', 'Geschichten', '/historier/'],
      ['races', 'Rennen', '/loeb/'], ['teams', 'Teams', '/teams/'],
      ['riders', 'Fahrer', '/ryttere/'], ['brands', 'Fahrradmarken', '/bikes/'],
      ['periods', 'Die guten alten Zeiten', '/perioder/'], ['about', 'Über die Website', '/om/'],
    ],
    story: null,
    footer: ['Eine persönliche Sammlung historischer Fahrräder,', 'Geschichten, Marken und Komponenten.'],
  },
} as const;

export function sectionForPath(path: string): string {
  const section = path.replace(/^\/(?:en|de)(?=\/)/, '').split('/')[1];
  return ({ loeb: 'races', races: 'races', teams: 'teams', ryttere: 'riders', riders: 'riders',
    fahrer: 'riders', bikes: 'brands', brands: 'brands', historier: 'stories', stories: 'stories',
    perioder: 'periods', periods: 'periods', om: 'about', about: 'about' } as Record<string, string>)[section] ?? (section ? '' : 'home');
}

/** Only real translations belong here; homepage fallbacks are separate links. */
export function pageTranslations(lang: SiteLanguage, path: string, translations: PageTranslations = {}): PageTranslations {
  return Object.fromEntries(Object.entries({ ...translations, [lang]: path })
    .filter(([, href]) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
      && (import.meta.env.DEV || !isUnreleasedHref(href))));
}
