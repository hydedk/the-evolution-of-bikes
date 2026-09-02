export type StoryMeta = {
  slug: string;
  type: 'historie';
  year: string;
  title: string;
  text: string;
  image: string;
  periods: string[];
  topics: string[];
  relatedBikes: string[];
  relatedComponents: string[];
};

export const stories: StoryMeta[] = [
  { slug: 'coppi-stelvio-1953', type: 'historie', year: '1953', title: 'Da Coppi fandt et hul i aftalen på Stelvio', text: 'Koblet førte Giroen med næsten to minutter. Så sendte Coppi en ung holdkammerat frem på Stelvio.', image: 'images/stories/coppi-stelvio-1953/coppi-stelvio-1953.webp', periods: ['1950-1959'], topics: ['giro-ditalia', 'stelvio', 'taktik'], relatedBikes: [], relatedComponents: [] },
  { slug: 'soevnloeshed-smoer-og-kolde-oel', type: 'historie', year: '1890’erne–1930’erne', title: 'Søvnløshed, smør og kolde øl', text: 'Koteletter, cigaretter og efterligning: da én rytters måltid kunne blive til hele feltets ernæringslære.', image: 'images/stories/kost-overtro/kost-overtro-illustration.jpg', periods: ['1900-1920', '1920-1930', '1930-1939'], topics: ['kost', 'overtro', 'tour-de-france', 'anekdote'], relatedBikes: [], relatedComponents: [] },
  { slug: 'cykelsportens-vilde-vesten', type: 'historie', year: '1890–1903', title: 'Da cykelsporten var et vildt vesten', text: 'Heltene, maskinerne, seksdagesløbene og kroppens grænser før den moderne cykelsport.', image: 'images/periods/1900-1920/wild-west/exhausted-rider.webp', periods: ['1900-1920'], topics: ['pionertid', 'banecykling', 'tour-de-france'], relatedBikes: [], relatedComponents: [] },
  { slug: 'snyd-soem-tour-de-france-1904', type: 'historie', year: '1904', title: 'Snyd, søm og Tour de France i kaos', text: 'Skandalen, der næsten dræbte Touren, og vejen fra omrejsende cirkus til organiseret sport.', image: 'images/periods/1900-1920/rytter-ved-maal.webp', periods: ['1900-1920'], topics: ['tour-de-france', 'snyd', 'regler'], relatedBikes: [], relatedComponents: [] },
  { slug: 'da-gearene-kom-og-oel-narrede-feltet', type: 'historie', year: '1935–1937', title: 'Da gearene kom – og øl narrede feltet', text: 'Om Tourens modstand mod gear og Julien Moineaus usædvanlige udbrud mod Bordeaux.', image: 'images/stories/tour-gears-beer/drikkestation.webp', periods: ['1930-1939'], topics: ['tour-de-france', 'gear', 'anekdote'], relatedBikes: [], relatedComponents: [] },
  { slug: 'campagnolo-quick-release', type: 'historie', year: '1927', title: 'Da kulden skabte quick release', text: 'Tullio Campagnolos fastfrosne hjulskift blev begyndelsen på en mekanisk revolution.', image: 'images/stories/campagnolo-quick-release/quick-release-detail.webp', periods: ['1920-1930'], topics: ['opfindelser', 'bjergpas'], relatedBikes: [], relatedComponents: ['campagnolo-quick-release'] },
  { slug: 'aldo-bini-maglia-nera-1948', type: 'historie', year: '1948', title: 'Stjernen der faldt fra toppen', text: 'Aldo Bini gennemførte Giro d’Italia med en brækket hånd og fandt hæder i den sorte trøje.', image: 'images/stories/aldo-bini/aldo-bini-archive.webp', periods: ['1940-1949'], topics: ['giro-ditalia', 'maglia-nera'], relatedBikes: [], relatedComponents: [] },
  { slug: 'leroica-gamle-cykler-nye-veje', type: 'historie', year: '1997', title: 'Da gamle cykler fandt nye veje', text: 'L’Eroica begyndte med 92 ryttere på Toscanas hvide grusveje.', image: 'images/stories/leroica/toscana-illustration.webp', periods: ['1990-1999'], topics: ['leroica', 'strade-bianche'], relatedBikes: [], relatedComponents: [] },
  { slug: 'skibby-koppenberg-1987', type: 'historie', year: '1987', title: 'Da løbsbilen kørte over Skibbys cykel', text: 'I Flandern Rundt 1987 førte Jesper Skibby alene på Koppenberg, da en officiel følgebil kørte over hans cykel.', image: 'images/stories/skibby-koppenberg-1987/illustration.webp', periods: ['1980-1989'], topics: ['flandern-rundt', 'koppenberg', 'dansk-cykling', 'brosten'], relatedBikes: [], relatedComponents: [] },
  { slug: 'festina-sagen-tour-de-france-1998', type: 'historie', year: '1998', title: 'Da Festina-sagen fik Tour de France til at gå i opløsning', text: 'En bil fuld af dopingmidler blev standset før Touren. Tre uger senere var et hold udelukket, rytterne i protest og feltet næsten halveret.', image: 'images/stories/festina-tour-1998/illustration.webp', periods: ['1990-1999'], topics: ['tour-de-france', 'doping', 'rytterprotest'], relatedBikes: [], relatedComponents: [] },
  { slug: 'ivo-faltoni-mekaniker-giro-1954', type: 'historie', year: '1954', title: 'Den 16-årige mekaniker, der blev to år ældre på én nat', text: 'Ivo Faltoni var 16, dygtig til at bygge hjul og for ung til Giroens servicekaravane. Et falsk dokument gjorde ham atten på papiret.', image: 'images/stories/ivo-faltoni-giro-1954/illustration.webp', periods: ['1950-1959'], topics: ['giro-ditalia', 'mekanikere', 'hjulbygning'], relatedBikes: [], relatedComponents: [] },
  { slug: 'da-michelin-navnet-blev-et-problem', type: 'historie', year: '1948', title: 'Da Michelin-navnet næsten blev et problem', text: 'Historien om Stella Veneta, Ferdinando Michelin og navnet MICHE.', image: 'images/stories/michelin-navnet/michelin-aftalen.webp', periods: ['1940-1949'], topics: ['mærker', 'italien'], relatedBikes: ['stella-veneta'], relatedComponents: [] },
];

export const storiesForPeriod = (period: string) => stories.filter((story) => story.periods.includes(period));
