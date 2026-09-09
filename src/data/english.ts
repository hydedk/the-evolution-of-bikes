import { stories } from './stories';
import { bikes } from './bikes';

const storyCopy: Record<string, [string, string]> = {
  'den-hvide-oedemark-og-hoensefarmerens-toerst': ['The white wilderness and the chicken farmer’s thirst', 'The bottle was empty on Mont Ventoux. Then a Danish Tour rider from 1958 helped decide whether the reader should accept water.'],
  'tom-simpson-mont-ventoux-1967': ['The day Tom Simpson died on Mont Ventoux', 'Heat, dehydration, exhaustion and stimulants came together on the bare mountain during the 1967 Tour de France.'],
  'tour-feltets-dopingprotest-1966': ['When the Tour peloton protested against doping controls', 'Shortly after leaving Bordeaux, the riders stopped. New doping controls had entered an old working culture.'],
  'anquetil-poulidor-puy-de-dome-1964': ['When Anquetil and Poulidor rode shoulder to shoulder', 'Poulidor won the duel on the Puy de Dôme, but Anquetil kept the yellow jersey by fourteen seconds.'],
  'da-regntoejet-kom-med-op-i-solen': ['When the rainwear came up in the sunshine', 'A rucksack full of dry clothes, long trousers and a jacket travelled about 30 kilometres up the Großglockner — in 28-degree heat.'],
  'coppi-stelvio-1953': ['When Coppi found a loophole in the Stelvio agreement', 'Koblet led the Giro by almost two minutes. Then Coppi sent a young team-mate up the road on the Stelvio.'],
  'soevnloeshed-smoer-og-kolde-oel': ['Insomnia, butter and cold beer', 'Chops, cigarettes and imitation: when one rider’s meal could become the entire peloton’s nutrition theory.'],
  'cykelsportens-vilde-vesten': ['When cycle racing was the Wild West', 'The heroes, machines, six-day races and physical limits before modern cycle racing.'],
  'snyd-soem-tour-de-france-1904': ['Cheating, nails and chaos at the 1904 Tour de France', 'The scandal that nearly killed the Tour, and the road from travelling circus to organised sport.'],
  'da-gearene-kom-og-oel-narrede-feltet': ['When gears arrived — and beer fooled the peloton', 'The Tour’s resistance to gears and Julien Moineau’s unusual breakaway towards Bordeaux.'],
  'campagnolo-quick-release': ['When the cold created the quick release', 'Tullio Campagnolo’s frozen wheel change became the beginning of a new mechanical solution.'],
  'aldo-bini-maglia-nera-1948': ['The star who fell from the top', 'Aldo Bini completed the Giro d’Italia with a broken hand and found distinction in the black jersey.'],
  'leroica-gamle-cykler-nye-veje': ['When old bicycles found new roads', 'L’Eroica began with 92 riders on Tuscany’s white gravel roads.'],
  'skibby-koppenberg-1987': ['When the race car drove over Skibby’s bicycle', 'Jesper Skibby led alone on the Koppenberg in the 1987 Tour of Flanders when an official car drove over his bicycle.'],
  'festina-sagen-tour-de-france-1998': ['When the Festina affair brought the Tour de France apart', 'A car full of doping products was stopped before the Tour. Three weeks later a team was expelled, riders were protesting and the peloton was nearly halved.'],
  'ivo-faltoni-mekaniker-giro-1954': ['The 16-year-old mechanic who became two years older overnight', 'Ivo Faltoni was 16, good at building wheels and too young for the Giro service caravan. A false document made him eighteen on paper.'],
  'da-michelin-navnet-blev-et-problem': ['When the Michelin name nearly became a problem', 'The story of Stella Veneta, Ferdinando Michelin and the name MICHE.'],
  'suntour-shimano-gearkrigen': ['The patent headache that lasted twenty years', 'SunTour found the slant movement. Shimano answered with indexing, cables and a complete system whose parts had to work together.'],
  'gunnar-asmussen-funny-bike': ['When Gunnar Asmussen made the bicycle lower', 'From Olympic gold in Mexico City to a yellow-and-black funny bike from a bicycle workshop in Aarhus.'],
  'alfonsina-strada-giro-1924': ['The woman the Giro could not get rid of', 'Alfonsina Strada arrived outside the time limit in Perugia. Even so, she continued all the way to Milan.'],
  'wim-van-est-aubisque-1951': ['The yellow jersey disappeared down the mountainside', 'Wim van Est crashed over the Aubisque and was hauled back up with an improvised rope made from inner tubes.'],
  'alfredo-binda-giro-1930': ['When the Giro paid Binda to stay at home', 'Alfredo Binda had made the Giro so predictable that the organisers paid him 22,500 lire not to start.'],
};

const bikeCopy: Record<string, [string, string?, string?]> = {
  'bernardi-ca-1980': ['A turquoise Italian steel racer with Campagnolo Nuovo Gran Sport, high-flange hubs and Universal brakes, preserved with an uncertain connection to Guido De Bernardi.', 'Italy', 'Previously in the collection'],
  'faggin-1986': ['An Italian Columbus Aelle racer in its original net-pattern paint, built with Shimano 600 and Cinelli — a precise meeting of two bicycle industries.', 'Padua, Italy'],
  'scapin-k6': ['A modern Italian carbon racer with Campagnolo, Fulcrum wheels and a design in which frame, equipment and riding position were conceived together.', 'Italy'],
  'gios-super-record': ['A Gios-blue Columbus racer with Campagnolo Super Record and details from the heyday of the Brooklyn team.', 'Turin, Italy'],
  'asmussen-super-prestige': ['A Danish custom-built time-trial bicycle with a small front wheel, low front end and Campagnolo equipment from the funny-bike period.', 'Aarhus, Denmark'],
  'colnago-super-thron': ['A classic lugged steel frame with Campagnolo Chorus and Shamal wheels — from the decade in which carbon fibre was taking over.', 'Cambiago, Italy', 'Previously in the collection'],
  'giame': ['A rare Turin racer whose drilled seatpost, Simplex derailleur and surviving Giamé parts show the pursuit of low weight.', 'Turin, Italy'],
  'stella-veneta': ['An Italian racer with Campagnolo Cambio Corsa — a gear system that required two long levers, balance and a very particular sequence.', 'Conegliano, Italy'],
  'koga-miyata-gentsracer-aero': ['A silver-green steel bicycle with Shimano 600 AX and Dyna-Drive from the first major experiments with aerodynamic components.', 'Netherlands / Japan', 'Previously in the collection'],
  'atala-sanremo': ['A red Italian racer with Campagnolo, Gipiemme and a name that reaches back to the early Giro.', 'Italy', 'Previously in the collection'],
  'cycles-france-sport': ['The bicycle that waited almost 100 years in a barn — with a brass nameplate and a flyer hidden inside the handlebar.', 'Toulouse, France'],
  'wonder-saint-etienne': ['Monsieur Paubert’s bicycle for road and track, preserved with its purchase receipt, original paint and Super Champion Course derailleur.', 'Saint-Étienne, France'],
};

const englishYear = (year: string) => year
  .replace('1890’erne–1930’erne', '1890s–1930s')
  .replace('1983-model', '1983 model')
  .replace('Begyndelsen af', 'Early')
  .replace('ca.', 'c.');

export const englishStories = stories.map((story) => ({ ...story, year: englishYear(story.year), title: storyCopy[story.slug][0], text: storyCopy[story.slug][1] }));
export const englishBikes = bikes.map((bike) => {
  const [text, place, status] = bikeCopy[bike.slug];
  return { ...bike, text, place: place || bike.place, status, year: englishYear(bike.year) };
});
