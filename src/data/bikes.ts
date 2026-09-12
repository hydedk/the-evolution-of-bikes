export type BikeMeta = {
  slug: string;
  year: string;
  place: string;
  title: string;
  status?: string;
  text: string;
  image: string;
};

export const bikes: BikeMeta[] = [
  { slug: 'bernardi-ca-1980', year: 'ca. 1980', place: 'Italien', title: 'Bernardi', status: 'Tidligere i samlingen', text: 'En turkis italiensk stålracer med Campagnolo Nuovo Gran Sport, højflangenav og Universal-bremser, bevaret med en usikker forbindelse til Guido De Bernardi.', image: 'images/bikes/bernardi-ca-1980/hero.webp' },
  { slug: 'faggin-1986', year: '1986', place: 'Padova, Italien', title: 'Faggin', text: 'En italiensk Columbus Aelle-racer i original netlakering, bygget med Shimano 600 og Cinelli — et præcist møde mellem to cykelindustrier.', image: 'images/bikes/faggin-1986/hero.webp' },
  { slug: 'scapin-k6', year: '2013', place: 'Italien', title: 'Scapin K6', text: 'En moderne italiensk kulfiberracer med Campagnolo, Fulcrum-hjul og en konstruktion, hvor ramme, udstyr og position er tænkt sammen.', image: 'images/bikes/scapin-k6/hero.webp' },
  { slug: 'gios-super-record', year: '1975', place: 'Torino, Italien', title: 'GIOS Torino Super Record', text: 'En Gios-blå Columbus-racer med Campagnolo Super Record og detaljer fra Brooklyn-holdets storhedstid.', image: 'images/bikes/gios-super-record/hero.webp' },
  { slug: 'rossin-record', year: '1978', place: 'Cavenago Brianza, Italien', title: 'Rossin Record', text: 'En tidlig italiensk Columbus SL-racer med Campagnolo Record, pantograferede detaljer og en markant gul-blå lakering.', image: 'images/bikes/rossin-record/hero.webp' },
  { slug: 'asmussen-super-prestige', year: 'ca. 1988', place: 'Aarhus, Danmark', title: 'Asmussen Super Prestige', text: 'En dansk specialbygget enkeltstartscykel med lille forhjul, lav front og Campagnolo fra funny bike-perioden.', image: 'images/bikes/asmussen-super-prestige/hero.webp' },
  { slug: 'colnago-super-thron', year: '1995', place: 'Cambiago, Italien', title: 'Colnago Super Thron', status: 'Tidligere i samlingen', text: 'En klassisk muffebygget stålramme med Campagnolo Chorus og Shamal-hjul — midt i årtiet, hvor kulfiberen var ved at overtage.', image: 'images/bikes/colnago-super-thron/hero.webp' },
  { slug: 'colnago-1993-tange-prestige', year: '1993', place: 'Cambiago, Italien', title: 'Colnago', text: 'En italiensk racer i japanske Tange Prestige-stålrør med Shimano Dura-Ace 7400-serien og Campagnolo Shamal-højprofilhjul.', image: 'images/bikes/colnago-tange-prestige/hero.webp' },
  { slug: 'giame', year: 'Begyndelsen af 1950’erne', place: 'Torino, Italien', title: 'Giamé', text: 'En sjælden Torino-racer, hvor den borede sadelpind, Simplex-gearet og de bevarede Giamé-dele fortæller om jagten på lav vægt.', image: 'images/bikes/giame/hero.webp' },
  { slug: 'stella-veneta', year: '1947', place: 'Conegliano, Italien', title: 'Stella Veneta', text: 'En italiensk racer med Campagnolo Cambio Corsa — gearet, der krævede to lange stænger, balance og en ganske bestemt rækkefølge.', image: 'images/bikes/stella-veneta/hero.webp' },
  { slug: 'schroder-1965', year: '1965', place: 'København, Danmark', title: 'Schrøder', text: 'En københavnsk håndbygget Reynolds 531-racer, hvis værkstedsbog forbinder stelnummer PS 1018 B med Gert V. Nilsen og 22. maj 1965.', image: 'images/bikes/schroder-1965/hero.jpg' },
  { slug: 'koga-miyata-gentsracer-aero', year: '1983-model', place: 'Holland / Japan', title: 'Koga-Miyata Gentsracer-Aero', status: 'Tidligere i samlingen', text: 'En sølvgrøn stålcykel med Shimano 600 AX og Dyna-Drive fra aerodynamikkens første store komponentforsøg.', image: 'images/bikes/koga-miyata-gentsracer-aero/hero-right-side.jpg' },
  { slug: 'atala-sanremo', year: 'ca. 1978–1982', place: 'Italien', title: 'Atala Sanremo', status: 'Tidligere i samlingen', text: 'En rødlakeret italiensk racer med Campagnolo, Gipiemme og et navn, der trækker tråde tilbage til Giroens begyndelse.', image: 'images/bikes/atala-sanremo/hero.webp' },
  { slug: 'cycles-france-sport', year: 'ca. 1919', place: 'Toulouse, Frankrig', title: 'Cycles France-Sport', text: 'Cyklen, der ventede næsten 100 år i en lade — med et navn i messing og en flyer skjult i styret.', image: 'images/bikes/cycles-france-sport/hero.webp' },
  { slug: 'wonder-saint-etienne', year: '1937', place: 'Saint-Étienne, Frankrig', title: 'Wonder Saint-Étienne', text: 'Monsieur Pauberts racer til landevej og bane, bevaret med købskvittering, original lak og Super Champion Course.', image: 'images/bikes/wonder-saint-etienne/hero.webp' },
];
