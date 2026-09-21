import { stories } from './stories';
import { bikes } from './bikes';
import { englishStories, englishBikes } from './english';

export const themeIds = [
  'loeb-og-store-oejeblikke',
  'ryttere',
  'teknik',
  'kost-traening-og-videnskab',
  'cykelkultur',
  'samfund-og-tidsaand',
  'menneskene-bag',
] as const;

export type ThemeId = typeof themeIds[number];
export type ContentType = 'historie' | 'cykel' | 'komponent';

export const themes: Record<ThemeId, { da: string; en: string; daIntro: string; enIntro: string }> = {
  'loeb-og-store-oejeblikke': { da: 'Løb og store øjeblikke', en: 'Races and defining moments', daIntro: 'Løb, afgørelser og episoder, hvor resultatlisten kun fortæller en del af historien.', enIntro: 'Races, decisions and episodes in which the result sheet tells only part of the story.' },
  ryttere: { da: 'Periodens ryttere', en: 'Riders of the period', daIntro: 'Rytterne som mennesker, konkurrenter og produkter af deres tid.', enIntro: 'Riders as people, competitors and products of their time.' },
  teknik: { da: 'Cykler og tekniske nybrud', en: 'Bicycles and technical change', daIntro: 'Mekanik, materialer og løsninger, der ændrede cyklen eller måden, den blev kørt på.', enIntro: 'Mechanics, materials and solutions that changed the bicycle or the way it was ridden.' },
  'kost-traening-og-videnskab': { da: 'Kost, træning og videnskab', en: 'Nutrition, training and science', daIntro: 'Fra koteletter og mavefornemmelse til energiplaner, laboratorier og watt.', enIntro: 'From chops and instinct to fuelling plans, laboratories and watts.' },
  cykelkultur: { da: 'Cykelkultur og hverdagsliv', en: 'Cycling culture and everyday life', daIntro: 'Cykling uden for resultatlisten: samlere, tilskuere, motionsryttere og daglig brug.', enIntro: 'Cycling beyond the results: collectors, spectators, amateur riders and everyday use.' },
  'samfund-og-tidsaand': { da: 'Samfund og tidsånd', en: 'Society and the times', daIntro: 'Politik, medier, arbejde og de vilkår, der formede cyklingen omkring banen og landevejen.', enIntro: 'Politics, media, work and the conditions that shaped cycling beyond road and track.' },
  'menneskene-bag': { da: 'Menneskene bag cyklingen', en: 'The people behind cycling', daIntro: 'Mekanikere, soigneurs, arrangører og andre, som fik løb og cykler til at fungere.', enIntro: 'Mechanics, soigneurs, organisers and others who kept races and bicycles working.' },
};

export const periods = [
  ['1800-1899', 'Før 1900', 'Before 1900'], ['1900-1920', '1900–1920', '1900–1920'],
  ['1920-1930', '1920–1929', '1920–1929'], ['1930-1939', '1930–1939', '1930–1939'],
  ['1940-1949', '1940–1949', '1940–1949'], ['1950-1959', '1950–1959', '1950–1959'],
  ['1960-1969', '1960–1969', '1960–1969'], ['1970-1979', '1970–1979', '1970–1979'],
  ['1980-1989', '1980–1989', '1980–1989'], ['1990-1999', '1990–1999', '1990–1999'],
  ['2000-2009', '2000–2009', '2000–2009'], ['2010-2019', '2010–2019', '2010–2019'],
] as const;

type Classification = { period: string; primary: ThemeId; secondary?: ThemeId[] };

const storyClassifications: Record<string, Classification> = {
  'stifinderen-der-sendte-touren-over-tourmalet': { period: '1900-1920', primary: 'menneskene-bag', secondary: ['loeb-og-store-oejeblikke', 'samfund-og-tidsaand'] },
  'eugene-christophe-smedjen-1913': { period: '1900-1920', primary: 'teknik', secondary: ['loeb-og-store-oejeblikke', 'ryttere'] },
  'henri-desgrange-og-den-selvhjulpne-rytter': { period: '1900-1920', primary: 'menneskene-bag', secondary: ['samfund-og-tidsaand', 'loeb-og-store-oejeblikke'] },
  'apoteket-paa-styret': { period: '1900-1920', primary: 'kost-traening-og-videnskab', secondary: ['cykelkultur', 'samfund-og-tidsaand'] },
  'to-tandhjul-og-en-skruenoegle': { period: '1900-1920', primary: 'teknik', secondary: ['cykelkultur', 'menneskene-bag'] },
  'gemmelegen-om-giroens-sorte-troeje': { period: '1940-1949', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere', 'cykelkultur'] },
  'marco-pantani-manden-bag-piraten': { period: '1990-1999', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke', 'samfund-og-tidsaand'] },
  'herning-seksdagesloeb-1974': { period: '1970-1979', primary: 'cykelkultur', secondary: ['loeb-og-store-oejeblikke', 'samfund-og-tidsaand'] },
  'mogens-frey-tour-1970': { period: '1970-1979', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere'] },
  'niels-fredborg-mexico-1968': { period: '1960-1969', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke'] },
  'christine-lueber-tour-2015': { period: '2010-2019', primary: 'menneskene-bag', secondary: ['samfund-og-tidsaand'] },
  'colnago-magni-pedalarm-1955': { period: '1950-1959', primary: 'menneskene-bag', secondary: ['teknik', 'loeb-og-store-oejeblikke'] },
  'bartali-italien-1948': { period: '1940-1949', primary: 'samfund-og-tidsaand', secondary: ['ryttere', 'loeb-og-store-oejeblikke'] },
  'fredsloebet-1948': { period: '1940-1949', primary: 'samfund-og-tidsaand', secondary: ['loeb-og-store-oejeblikke'] },
  'paris-brest-paris-1891-charles-terront': { period: '1800-1899', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere', 'teknik'] },
  'paris-roubaix-1949-to-vindere': { period: '1940-1949', primary: 'loeb-og-store-oejeblikke', secondary: ['samfund-og-tidsaand'] },
  'drillium-vaegtbesparelse': { period: '1960-1969', primary: 'teknik', secondary: ['cykelkultur'] },
  'banecykling-ellegaard-1912': { period: '1900-1920', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke', 'cykelkultur'] },
  'da-vaekkeuret-kostede-20-minutter-paa-paris-roubaix-ruten': { period: '2010-2019', primary: 'cykelkultur', secondary: ['loeb-og-store-oejeblikke'] },
  'da-tour-de-france-flyttede-ind-paa-boernevaerelset': { period: '1930-1939', primary: 'cykelkultur', secondary: ['samfund-og-tidsaand'] },
  'christian-christensen-tour-de-france-1913': { period: '1900-1920', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke'] },
  'den-hvide-oedemark-og-hoensefarmerens-toerst': { period: '2000-2009', primary: 'cykelkultur', secondary: ['kost-traening-og-videnskab'] },
  'tom-simpson-mont-ventoux-1967': { period: '1960-1969', primary: 'kost-traening-og-videnskab', secondary: ['ryttere', 'samfund-og-tidsaand'] },
  'beryl-burton-12-timersrekord-1967': { period: '1960-1969', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke', 'samfund-og-tidsaand'] },
  'bordeaux-paris-1965': { period: '1960-1969', primary: 'loeb-og-store-oejeblikke', secondary: ['teknik'] },
  'tour-feltets-dopingprotest-1966': { period: '1960-1969', primary: 'samfund-og-tidsaand', secondary: ['kost-traening-og-videnskab', 'loeb-og-store-oejeblikke'] },
  'anquetil-poulidor-puy-de-dome-1964': { period: '1960-1969', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere'] },
  'da-regntoejet-kom-med-op-i-solen': { period: '2010-2019', primary: 'cykelkultur', secondary: ['kost-traening-og-videnskab'] },
  'coppi-stelvio-1953': { period: '1950-1959', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere'] },
  'soevnloeshed-smoer-og-kolde-oel': { period: '1920-1930', primary: 'kost-traening-og-videnskab', secondary: ['cykelkultur'] },
  'cykelsportens-vilde-vesten': { period: '1900-1920', primary: 'samfund-og-tidsaand', secondary: ['loeb-og-store-oejeblikke', 'cykelkultur'] },
  'snyd-soem-tour-de-france-1904': { period: '1900-1920', primary: 'loeb-og-store-oejeblikke', secondary: ['samfund-og-tidsaand'] },
  'da-gearene-kom-og-oel-narrede-feltet': { period: '1930-1939', primary: 'teknik', secondary: ['loeb-og-store-oejeblikke', 'cykelkultur'] },
  'campagnolo-quick-release': { period: '1920-1930', primary: 'teknik', secondary: ['ryttere'] },
  'aldo-bini-maglia-nera-1948': { period: '1940-1949', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke'] },
  'leroica-gamle-cykler-nye-veje': { period: '1990-1999', primary: 'cykelkultur', secondary: ['samfund-og-tidsaand'] },
  'skibby-koppenberg-1987': { period: '1980-1989', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere'] },
  'festina-sagen-tour-de-france-1998': { period: '1990-1999', primary: 'samfund-og-tidsaand', secondary: ['kost-traening-og-videnskab', 'loeb-og-store-oejeblikke'] },
  'ivo-faltoni-mekaniker-giro-1954': { period: '1950-1959', primary: 'menneskene-bag', secondary: ['teknik'] },
  'da-michelin-navnet-blev-et-problem': { period: '1940-1949', primary: 'menneskene-bag', secondary: ['samfund-og-tidsaand'] },
  'suntour-shimano-gearkrigen': { period: '1960-1969', primary: 'teknik', secondary: ['samfund-og-tidsaand'] },
  'gunnar-asmussen-funny-bike': { period: '1980-1989', primary: 'teknik', secondary: ['ryttere'] },
  'alfonsina-strada-giro-1924': { period: '1920-1930', primary: 'ryttere', secondary: ['samfund-og-tidsaand', 'loeb-og-store-oejeblikke'] },
  'tour-de-france-1926-den-laengste': { period: '1920-1930', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere', 'samfund-og-tidsaand'] },
  'peter-schroder-vaerksted-1920': { period: '1920-1930', primary: 'menneskene-bag', secondary: ['teknik', 'cykelkultur'] },
  'wim-van-est-aubisque-1951': { period: '1950-1959', primary: 'loeb-og-store-oejeblikke', secondary: ['ryttere', 'teknik'] },
  'alfredo-binda-giro-1930': { period: '1920-1930', primary: 'ryttere', secondary: ['loeb-og-store-oejeblikke', 'samfund-og-tidsaand'] },
};

const bikePeriods: Record<string, string> = {
  'olympia-1978': '1970-1979', 'bernardi-ca-1980': '1980-1989', 'faggin-1986': '1980-1989', 'scapin-k6': '2010-2019',
  'principia-evolution': '2000-2009', 'gios-super-record': '1970-1979', 'rossin-record': '1970-1979', 'asmussen-super-prestige': '1980-1989',
  'colnago-super-thron': '1990-1999', 'colnago-1993-tange-prestige': '1990-1999', 'giame': '1950-1959', 'stella-veneta': '1940-1949',
  'schroder-1965': '1960-1969', 'koga-miyata-gentsracer-aero': '1980-1989', 'atala-sanremo': '1970-1979',
  'cycles-france-sport': '1900-1920', 'wonder-saint-etienne': '1930-1939',
};

export const components = [
  { slug: 'campagnolo-cambio-corsa', year: '1946', title: 'Campagnolo Cambio Corsa', text: 'To håndtag, et løst baghjul og et gearskift, der krævede både mod og balance.', enText: 'Two levers, a released rear wheel and a gear change that demanded balance and a particular sequence.', period: '1940-1949' },
  { slug: 'campagnolo-valentino', year: '1967', title: 'Campagnolo Valentino', text: 'Da Campagnolo forsøgte at bygge til andre end eliten.', enText: 'Campagnolo’s attempt to build a derailleur for riders outside the professional elite.', period: '1960-1969' },
  { slug: 'shimano-600-ex-arabesque', year: '1978', title: 'Shimano 600 EX Arabesque', text: 'Japansk præcision klædt på til den europæiske racercykel.', enText: 'Japanese engineering dressed for the European racing bicycle.', period: '1970-1979' },
] as const;

export type ContentItem = {
  id: string; type: ContentType; year: string; sortYear: number; title: string; text: string;
  period: string; primaryTheme: ThemeId; secondaryThemes: ThemeId[]; themes: ThemeId[];
  canonicalUrl: string; englishUrl: string; image?: string;
};

const numberFrom = (year: string) => Number(year.match(/\d{4}/)?.[0] ?? 0);
const siteImagePath = (image: string) => /^(?:https?:)?\/\//.test(image) || image.startsWith('/') ? image : `/${image}`;

const knownPeriods = new Set(periods.map(([id]) => id));
const validateClassification = (id: string, classification: Classification) => {
  if (!knownPeriods.has(classification.period as typeof periods[number][0])) throw new Error(`${id} har en ukendt periode: ${classification.period}`);
  const assignedThemes = [classification.primary, ...(classification.secondary ?? [])];
  if (new Set(assignedThemes).size !== assignedThemes.length) throw new Error(`${id} har samme tema mere end én gang`);
  if ((classification.secondary?.length ?? 0) > 2) throw new Error(`${id} har mere end to sekundære temaer`);
  return classification;
};

export const contentItems: ContentItem[] = [
  ...stories.map((story) => {
    const c = storyClassifications[story.slug];
    if (!c) throw new Error(`Historien ${story.slug} mangler periode- og temaklassifikation`);
    validateClassification(story.slug, c);
    return { id: story.slug, type: 'historie' as const, year: story.year, sortYear: numberFrom(story.year), title: story.title, text: story.text, period: c.period, primaryTheme: c.primary, secondaryThemes: c.secondary ?? [], themes: [c.primary, ...(c.secondary ?? [])], canonicalUrl: `/historier/${story.slug}/`, englishUrl: `/en/stories/${story.slug}/`, image: siteImagePath(typeof story.image === 'string' ? story.image : story.image.src) };
  }),
  ...bikes.map((bike) => {
    const period = bikePeriods[bike.slug];
    if (!period || !knownPeriods.has(period as typeof periods[number][0])) throw new Error(`Cyklen ${bike.slug} mangler en gyldig periode`);
    return { id: bike.slug, type: 'cykel' as const, year: bike.year, sortYear: numberFrom(bike.year), title: bike.title, text: bike.text, period, primaryTheme: 'teknik' as const, secondaryThemes: ['cykelkultur'] as ThemeId[], themes: ['teknik', 'cykelkultur'] as ThemeId[], canonicalUrl: `/cykler/${bike.slug}/`, englishUrl: `/en/bikes/${bike.slug}/`, image: `/${bike.image}` };
  }),
  ...components.map((component) => ({ id: component.slug, type: 'komponent' as const, year: component.year, sortYear: numberFrom(component.year), title: component.title, text: component.text, period: component.period, primaryTheme: 'teknik' as const, secondaryThemes: [] as ThemeId[], themes: ['teknik'] as ThemeId[], canonicalUrl: `/komponenter/${component.slug}/`, englishUrl: `/en/components/${component.slug}/` })),
];

export const contentForPeriod = (period: string) => contentItems.filter((item) => item.period === period);
export const contentForTheme = (theme: ThemeId) => contentItems.filter((item) => item.themes.includes(theme));

const englishStoryBySlug = new Map(englishStories.map((item) => [item.slug, item]));
const englishBikeBySlug = new Map(englishBikes.map((item) => [item.slug, item]));

export const localizeContent = (items: ContentItem[], language: 'da' | 'en') => language === 'da' ? items : items
  .filter((item) => item.type !== 'historie' || englishStoryBySlug.has(item.id))
  .map((item) => {
  const translated = item.type === 'historie' ? englishStoryBySlug.get(item.id) : item.type === 'cykel' ? englishBikeBySlug.get(item.id) : undefined;
  const component = item.type === 'komponent' ? components.find((entry) => entry.slug === item.id) : undefined;
  return { ...item, year: translated?.year ?? item.year, title: translated?.title ?? item.title, text: translated?.text ?? component?.enText ?? item.text };
});
