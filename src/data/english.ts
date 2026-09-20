import { stories } from './stories';
import { bikes } from './bikes';

const storyCopy: Record<string, [string, string]> = {
  'herning-seksdagesloeb-1974': ['When Herning acquired its own wooden track', 'A wooden track from London, a new six-day race in Herning and Ole Ritter as the rider the crowd came to see.'],
  'mogens-frey-tour-1970': ['When Mogens Frey won after a hand on the handlebars', 'Joaquim Agostinho crossed first in Mulhouse, but the jury awarded victory to team-mate Mogens Frey after visible interference in the sprint.'],
  'niels-fredborg-mexico-1968': ['When Fredborg equalled the world record and won silver', 'Niels Fredborg equalled the world record in the Olympic kilometre in Mexico City. Eleven starters later, Pierre Trentin went faster.'],
  'christine-lueber-tour-2015': ["When the peloton finished, Christine Lueber's working day began again", 'A day of musettes, Alpine driving, laundry and massage reveals the part of the Tour de France that the results do not measure.'],
  'colnago-magni-pedalarm-1955': ['When a bent crank gave Colnago access to the Giro', "Ernesto Colnago was 23 when a mechanical observation on Fiorenzo Magni's bicycle took him into the Giro service crew."],
  'bartali-italien-1948': ['Did Bartali really bring peace back to Italy?', 'After the attempt on Palmiro Togliatti, Gino Bartali won three consecutive Tour stages. His victories gave a political crisis its most enduring hero.'],
  'fredsloebet-1948': ['The Peace Race – two pelotons going opposite ways', 'In May 1948, two fields raced simultaneously between Warsaw and Prague. The future Peace Race began with two routes and two Yugoslav winners.'],
  'paris-brest-paris-1891-charles-terront': ["Paris–Brest–Paris 1891 – Charles Terront's three days", 'Charles Terront covered 1,200 kilometres in 71 hours 37 minutes. The newspaper race tested both the rider and the young safety bicycle.'],
  'paris-roubaix-1949-to-vindere': ['Paris–Roubaix 1949 – one race, two winners', 'André Mahé crossed first after being misdirected at the track. Serse Coppi protested. Months later, the race had two winners.'],
  'drillium-vaegtbesparelse': ['Drillium – when the drill became a weight-saving tool', 'Chainrings, brake levers and derailleurs went under the drill. Drillium became weight saving, workshop craft and decoration.'],
  'banecykling-ellegaard-1912': ['Three men held at the start on the Buffalo track', 'A press photograph from Paris shows Thorvald Ellegaard, André Perchicot and Gabriel Poulain in the still moment before a sprint match.'],
  'da-vaekkeuret-kostede-20-minutter-paa-paris-roubaix-ruten': ['When the alarm clock cost twenty minutes on the Paris–Roubaix route', 'Jonas B. Hansen woke up 45 minutes late in Roubaix. By the time he reached the start, the others had left and the rest of his day became one long chase.'],
  'da-tour-de-france-flyttede-ind-paa-boernevaerelset': ['When the Tour de France moved into the children’s room', 'Small cast cyclists turned pavements, sandpits and carpets into stage races — and later became collectibles with their own moulds, poses and peculiarities.'],
  'christian-christensen-tour-de-france-1913': ['Christian Christensen – out of the Tour, but on to Paris', 'Christian Christensen missed the time limit in the 1913 Tour. Later accounts describe how the Danish dairy worker continued to Paris outside the classification.'],
  'den-hvide-oedemark-og-hoensefarmerens-toerst': ['The white wilderness and the chicken farmer’s thirst', 'The bottle was empty on Mont Ventoux. Then a Danish Tour rider from 1958 helped decide whether the reader should accept water.'],
  'tom-simpson-mont-ventoux-1967': ['The day Tom Simpson died on Mont Ventoux', 'Heat, dehydration, exhaustion and stimulants came together on the bare mountain during the 1967 Tour de France.'],
  'beryl-burton-12-timersrekord-1967': ['Beryl Burton, twelve hours and a liquorice allsort', 'Beryl Burton rode 277.25 miles in twelve hours, broke the British men’s record and handed Mike McNamara a liquorice allsort as she passed.'],
  'bordeaux-paris-1965': ['Bordeaux–Paris — with a motor pacer ahead', 'Jacques Anquetil won the Dauphiné and, a few hours later, began the 557-kilometre Bordeaux–Paris with motor pacing over the final part of the race.'],
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
  'olympia-1978': ['An orange Italian steel racer with Campagnolo Nuovo Gran Sport, Universal brakes and an Ofmega chainset, preserved in the owner’s photographs.', 'Italy', 'Previously in the collection'],
  'bernardi-ca-1980': ['A turquoise Italian steel racer with Campagnolo Nuovo Gran Sport, high-flange hubs and Universal brakes, preserved with an uncertain connection to Guido De Bernardi.', 'Italy', 'Previously in the collection'],
  'faggin-1986': ['An Italian Columbus Aelle racer in its original net-pattern paint, built with Shimano 600 and Cinelli — a precise meeting of two bicycle industries.', 'Padua, Italy'],
  'scapin-k6': ['A modern Italian carbon racer with Campagnolo, Fulcrum wheels and a design in which frame, equipment and riding position were conceived together.', 'Italy'],
  'principia-evolution': ['A Danish aluminium racer with large shaped tubes, a WEAVE carbon fork and Dura-Ace components from the years around Principia’s change of ownership.', 'Denmark'],
  'gios-super-record': ['A Gios-blue Columbus racer with Campagnolo Super Record and details from the heyday of the Brooklyn team.', 'Turin, Italy'],
  'rossin-record': ['An early Italian Columbus SL racer with Campagnolo Record, pantographed details and a distinctive yellow-and-blue finish.', 'Cavenago Brianza, Italy'],
  'asmussen-super-prestige': ['A Danish custom-built time-trial bicycle with a small front wheel, low front end and Campagnolo equipment from the funny-bike period.', 'Aarhus, Denmark'],
  'colnago-super-thron': ['A classic lugged steel frame with Campagnolo Chorus and Shamal wheels — from the decade in which carbon fibre was taking over.', 'Cambiago, Italy', 'Previously in the collection'],
  'colnago-1993-tange-prestige': ['An Italian racer in Japanese Tange Prestige steel, equipped with Shimano Dura-Ace 7400-series components and Campagnolo Shamal deep-section wheels.', 'Cambiago, Italy'],
  'giame': ['A rare Turin racer whose drilled seatpost, Simplex derailleur and surviving Giamé parts show the pursuit of low weight.', 'Turin, Italy'],
  'stella-veneta': ['An Italian racer with Campagnolo Cambio Corsa — a gear system that required two long levers, balance and a very particular sequence.', 'Conegliano, Italy'],
  'schroder-1965': ['A Copenhagen-built Reynolds 531 racer whose workshop ledger links frame PS 1018 B to Gert V. Nilsen and 22 May 1965.', 'Copenhagen, Denmark'],
  'koga-miyata-gentsracer-aero': ['A silver-green steel bicycle with Shimano 600 AX and Dyna-Drive from the first major experiments with aerodynamic components.', 'Netherlands / Japan', 'Previously in the collection'],
  'atala-sanremo': ['A red Italian racer with Campagnolo, Gipiemme and a name that reaches back to the early Giro.', 'Italy', 'Previously in the collection'],
  'cycles-france-sport': ['The bicycle that waited almost 100 years in a barn — with a brass nameplate and a flyer hidden inside the handlebar.', 'Toulouse, France'],
  'wonder-saint-etienne': ['Monsieur Paubert’s bicycle for road and track, preserved with its purchase receipt, original paint and Super Champion Course derailleur.', 'Saint-Étienne, France'],
};

const englishYear = (year: string) => year
  .replace('1930’erne–i dag', '1930s–today')
  .replace('1890’erne–1930’erne', '1890s–1930s')
  .replace('1950’erne', '1950s')
  .replace('1983-model', '1983 model')
  .replace('Begyndelsen af', 'Early')
  .replace('ca.', 'c.');

export const englishStories = stories.map((story) => ({ ...story, year: englishYear(story.year), title: storyCopy[story.slug][0], text: storyCopy[story.slug][1] }));
export const englishBikes = bikes.map((bike) => {
  const [text, place, status] = bikeCopy[bike.slug];
  return { ...bike, text, place: place || bike.place, status, year: englishYear(bike.year) };
});
