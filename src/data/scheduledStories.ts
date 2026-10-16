import james from '../assets/stories/paris-brest-paris-1891/terront-le-petit-journal-1891.jpg';
import merckx from '../assets/stories/upcoming-week/felice-gimondi-1965.jpg';
import coppiBartali from '../assets/stories/upcoming-week/coppi-bartali-1940.jpg';
import olympics1984 from '../assets/stories/upcoming-week/cycling-1984.jpg';
import motorpace from '../assets/stories/upcoming-week/motorpace-bordeaux-paris.jpg';
import coppi from '../assets/stories/coppi-krigsfange/fausto-coppi-1957.jpg';
import guangxi from '../assets/stories/tour-of-guangxi-2026/nongla-editorial-illustration.png';
import guangxiTeams from '../assets/stories/tour-of-guangxi-2026/teams-2026.png';
import guangxiStage4 from '../assets/stories/tour-of-guangxi-2026/stage-4-map.png';
import guangxiStage6Map from '../assets/stories/tour-of-guangxi-2026/stage-6-map.png';
import guangxiStage6Profile from '../assets/stories/tour-of-guangxi-2026/stage-6-profile.png';

export const scheduledStories = {
  'tour-of-guangxi-2026': {
    year:'2017–2026', period:'2010-2019', track:'race', image:guangxi,
    credit:'Redaktionel illustration af finalen mod NongLa. Motivet er ikke et fotografi fra en bestemt etape.',
    source:'https://www.uci.org/calendar/road/2ruOnavHX0dMGTCRozdYAU?discipline=ROA&searchTerm=Gua',
    visuals:[
      {after:2, image:guangxiStage4, altDa:'Rutkort for 4. etape fra Bama til Tian’e', altEn:'Route map for stage 4 from Bama to Tian’e', captionDa:'Den nye fjerde etape fra Bama til Tian’e fører løbet gennem et langt, kuperet terræn. Rutegrafik leveret af redaktionen.', captionEn:'The new fourth stage from Bama to Tian’e takes the race through a long stretch of rolling terrain. Route graphic supplied by the editorial team.'},
      {after:3, image:guangxiStage6Map, altDa:'Rutkort for 6. etape fra Yizhou til NongLa', altEn:'Route map for stage 6 from Yizhou to NongLa', captionDa:'Sjette etape fra Yizhou til NongLa. Den afgørende stigning ligger helt til sidst. Rutegrafik leveret af redaktionen.', captionEn:'Stage 6 from Yizhou to NongLa. The decisive climb comes at the very end. Route graphic supplied by the editorial team.'},
      {after:3, image:guangxiStage6Profile, altDa:'Højdeprofil for 6. etape med afslutningen i NongLa', altEn:'Elevation profile for stage 6 finishing at NongLa', captionDa:'Højdeprofilen viser kontrasten mellem den lange indkørsel og den stejle afslutning mod NongLa. Profilgrafik leveret af redaktionen.', captionEn:'The profile shows the contrast between the long approach and the steep finish towards NongLa. Profile graphic supplied by the editorial team.'},
      {after:4, image:guangxiTeams, altDa:'Oversigt over de tilmeldte holds trøjer til Tour of Guangxi 2026', altEn:'Overview of the jerseys of teams entered for the 2026 Tour of Guangxi', captionDa:'Holdoversigten før Tour of Guangxi 2026. Deltagelsen kan ændre sig frem mod starten. Grafik leveret af redaktionen.', captionEn:'Team overview ahead of the 2026 Tour of Guangxi. Participation may change before the start. Graphic supplied by the editorial team.'}
    ],
    da:{
      title:'Tour of Guangxi: Seks dage og én stejl afslutning',
      description:'Tour of Guangxi blev født direkte ind i WorldTouren i 2017. I 2026 afgøres sæsonens sidste etapeløb over seks etaper og på den stejle vej til NongLa.',
      deck:'Det meste af ugen kan sprinterne regne på sekunder og placeringer. Så drejer vejen ind i NongLa, og de sidste stejle ramper gør regnestykket ganske kort.',
      sections:[
        ['Et løb født på øverste hylde',[
          'Tour of Guangxi begyndte ikke som et lille lokalløb, der langsomt arbejdede sig op. I december 2016 indgik UCI, Wanda Sports og Guangxi-regionens myndigheder en aftale om et nyt kinesisk etapeløb. Allerede den første udgave i oktober 2017 var en del af WorldTouren. Det var en usædvanlig genvej til cykelsportens øverste kalender.',
          'Kina havde prøvet modellen før med Tour of Beijing fra 2011 til 2014. Guangxi fik en anden rolle. Løbet blev lagt helt sidst på sæsonen, efter de europæiske endagsløb, og fik både et herreløb og et kvindeløb. For WorldTour-holdene betød det en lang rejse på et tidspunkt, hvor mange ryttere ellers var begyndt at tænke på vinterpause.'
        ]],
        ['Vinderne og den lange pause',[
          'Tim Wellens vandt den første udgave i 2017. Gianni Moscon fulgte året efter, og Enric Mas tog sejren i 2019. Fælles for dem var evnen til at overleve sprinterdagene og stadig have et skarpt ryk, når vejen rejste sig. Løbet har sjældent givet plads til store bjergminutter. Det handler oftere om få sekunder og den rigtige placering før den sidste bakke.',
          'Pandemien standsede løbet i 2020, 2021 og 2022. Da det vendte tilbage i 2023, vandt Milan Vader. Lennert Van Eetvelt fulgte i 2024, og Paul Double vandt i 2025. Seks afholdte udgaver gav dermed seks forskellige vindere. Det fortæller også noget om løbets form: Kort nok til at mange kan håbe, stejlt nok til at de rene sprintere ikke kan tage det hele.'
        ]],
        ['Årets seks etaper',[
          'I 2026 køres Tour of Guangxi fra 13. til 18. oktober. Ruten er omtrent 1.043 kilometer fordelt på seks etaper. Første dag begynder og slutter i Chongzuo over 149,4 kilometer og ligner en dag for sprinterne. Derefter følger 179,7 kilometer til Jingxi og løbets længste dag, 212,3 kilometer fra Jingxi til Bama. Begge etaper har nok småstigninger til at gøre benene tunge uden nødvendigvis at sprænge feltet.',
          'Fjerde etape går 165,7 kilometer fra Bama til Tian’e på nye og urolige veje. Femte etape fra Jinchengjiang til Yizhou er 170,1 kilometer med tre kategoriserede stigninger, men en flad afslutning. På papiret endnu en sprinterchance. I praksis skal holdene først hente udbruddene og holde deres hurtige mand frisk gennem bakkerne. Det lyder enkelt, indtil nogen mangler ti meter efter en rundkørsel.'
        ]],
        ['NongLa tager sekunderne',[
          'Sjette etape går 165,8 kilometer fra Yizhou til NongLa. Det meste af dagen er forholdsvis fladt, men finalen ender i naturparken. Den præcise opmåling varierer lidt efter, hvor man sætter stigningens begyndelse, men de afgørende cirka 3,2 kilometer stiger omkring 7,3 procent i gennemsnit. De sidste 1,2 kilometer kommer tæt på 15 procent på de stejleste steder.',
          'Det kræver ikke en dieselklatrer, der kan male i en time. Det kræver en rytter, som kan sidde rigtigt placeret, når vejen snævrer ind, tåle et hårdt hjælpertempo og stadig levere tre til otte minutter nær grænsen. Angriber man for tidligt, bliver rampen lang. Venter man for længe, er der ikke vej nok tilbage. De afgørende ryk kommer derfor ofte inden for de sidste 500 til 800 meter.'
        ]],
        ['Feltet før start',[
          'Startlisten er endnu foreløbig. De fleste WorldTour-hold ventes til start sammen med inviterede ProTeams og det kinesiske landshold. Blandt de navne, der er meldt til løbet, er Tom Pidcock, mens sprinterfeltet foreløbig rummer blandt andre Paul Magnier, Olav Kooij og Jordi Meeus. Ændringer i dagene før starten er almindelige, især så sent på sæsonen.',
          'Det giver løbet to historier på én gang. De første fem dage handler om sprinttog, sidevind, udbrud og om at undgå det dumme tidstab. Den sidste handler om en kort vej op gennem NongLa. Efter en hel WorldTour-sæson kan tre stejle kilometer være rigeligt.'
        ]]
      ]
    },
    en:{
      title:'Tour of Guangxi: Six days and one steep finish',
      description:'The Tour of Guangxi entered the WorldTour directly in 2017. In 2026 the season-closing stage race unfolds over six stages and the steep road to NongLa.',
      deck:'For most of the week the sprinters can calculate seconds and positions. Then the road turns into NongLa and the final ramps make the arithmetic rather short.',
      sections:[
        ['Born at the top level',['The Tour of Guangxi did not grow slowly from a small local race. In December 2016 the UCI, Wanda Sports and the Guangxi regional authorities agreed to create a new Chinese stage race. Its first edition in October 2017 was already part of the WorldTour.','China had tested the model with the Tour of Beijing from 2011 to 2014. Guangxi was given a different place: at the very end of the season, after the European one-day races, with events for both men and women.']],
        ['Winners and interruption',['Tim Wellens won in 2017, followed by Gianni Moscon in 2018 and Enric Mas in 2019. The race usually rewards a rider who survives the sprint days and still has an explosive effort when the road rises.','The pandemic cancelled the 2020, 2021 and 2022 editions. Milan Vader won the return in 2023, Lennert Van Eetvelt followed in 2024 and Paul Double in 2025. Six editions produced six different winners.']],
        ['Six stages in 2026',['The 2026 race runs from 13 to 18 October over roughly 1,043 kilometres. A 149.4-kilometre circuit around Chongzuo opens the race, followed by 179.7 kilometres to Jingxi and the longest stage, 212.3 kilometres from Jingxi to Bama.','Stage four covers 165.7 rolling kilometres from Bama to Tian’e. Stage five runs 170.1 kilometres from Jinchengjiang to Yizhou, with three classified climbs but a flat finish. It looks like another sprint, provided the teams can control the breakaways.']],
        ['NongLa takes the seconds',['The final stage covers 165.8 kilometres from Yizhou to NongLa. Most of the route is relatively flat before the decisive climb. Depending on where it is measured, the key section is about 3.2 kilometres at roughly 7.3 per cent, with the last 1.2 kilometres approaching 15 per cent at its steepest.','This is not a one-hour diesel climb. It rewards positioning, a fierce lead-in and an effort of three to eight minutes near the limit. Go too early and the ramp becomes very long; wait too long and there is no road left. The winning move often comes inside the final 500 to 800 metres.']],
        ['Before the start',['The start list remains provisional. Most WorldTour teams are expected alongside invited ProTeams and the Chinese national team. Tom Pidcock is among the announced contenders, while the provisional sprinter list includes Paul Magnier, Olav Kooij and Jordi Meeus.','The race therefore contains two stories. Five days of sprint trains, crosswinds, breakaways and avoiding needless time loss, then one short road through NongLa. After an entire WorldTour season, three steep kilometres can be enough.']]
      ]
    }
  },
  'james-moore-foerste-cykelloeb-1868': {year:'1868',period:'1800-1899',track:'race',image:james,credit:'Historisk illustration af tidlig cykelsport; motivet viser Paris–Brest–Paris 1891, ikke løbet i Saint-Cloud.',source:'https://collection.sciencemuseumgroup.org.uk/objects/co8362250/velocipede-bicycle-owned-and-ridden-by-james-moore-to-win-first-formal-bicycle-race',da:{title:'Løbet der blev kaldt det første',description:'James Moore vandt et velocipèdeløb i Saint-Cloud i 1868. Senere blev det kaldt verdens første cykelløb, men programmet fortæller en mere nuanceret historie.',deck:'På en grussti i parken ved Saint-Cloud kørte en 19-årig englænder sig ind i cykelhistorien. Det vanskelige spørgsmål er ikke, hvem der vandt, men hvad løbet egentlig var det første af.',sections:[['En tur til fontænen og tilbage',['Den 31. maj 1868 samledes ryttere og publikum i Parc de Saint-Cloud vest for Paris. James Moore vandt et løb på omtrent 1.200 meter på en pedaldrevet velocipède med massive dæk.','Moores sejr blev siden fejret som den første formelle cykelkonkurrence. Science Museum beskriver stadig hans maskine som cyklen fra den efter sigende første formelle konkurrence. Formuleringen er vigtig: Der blev kørt flere løb samme dag, og historikere er uenige om rækkefølgen.']],['Det sikre og det usikre',['Det sikre er datoen, stedet og Moores sejr. Det mindre sikre er den store titel som historiens allerførste cykelløb. Tidligere kappestrider fandtes, og en anden rytter kan have vundet dagens første nummer.','Saint-Cloud står alligevel som et klart begyndelsespunkt. Cyklen var ikke længere kun et nyt transportmiddel. Den var blevet noget, man kunne måle, konkurrere og skabe publikum omkring.']] ]},en:{title:'The race that became known as the first',description:'James Moore won a velocipede race at Saint-Cloud in 1868. It was later called the first cycle race, although the programme tells a more nuanced story.',deck:'On a gravel path at Saint-Cloud, a 19-year-old Englishman rode into cycling history. The difficult question is not who won, but what the race was actually the first of.',sections:[['To the fountain and back',['On 31 May 1868 riders and spectators gathered in Parc de Saint-Cloud west of Paris. James Moore won a race of about 1,200 metres on a pedal-driven velocipede with solid tyres.','The victory was later celebrated as the first formal cycle race. The Science Museum still describes Moore’s machine as the bicycle from the reputedly first formal race. That qualification matters: several events were held that day and historians disagree about their order.']],['What can be said safely',['The date, place and Moore’s victory are secure. The grand title as the first cycle race ever is less certain. Earlier contests existed, and another rider may have won the first event on the programme.','Saint-Cloud nevertheless marks a clear beginning. The bicycle was no longer merely a new means of transport. It had become something people could time, race and gather to watch.']] ]}},
  'merckx-gimondi-mendrisio-1971': {year:'1971',period:'1970-1979',track:'race',image:merckx,credit:'Felice Gimondi i 1965. Foto fra det godkendte billedregister; billedet viser ikke VM i 1971.',source:'https://www.mundialciclismoponferrada.com/imagenes/tinyMCE/Files/programa-oficial-mundial-ciclismo.pdf',da:{title:'Da Gimondi åbnede spurten mod Merckx',description:'Ved VM i Mendrisio i 1971 kom Eddy Merckx og Felice Gimondi alene til mål. Italieneren åbnede, men Merckx tog sin anden regnbuetrøje.',deck:'Efter næsten 269 kilometer stod verdensmesterskabet mellem to ryttere. Gimondi forsøgte at komme først. Merckx ventede lige længe nok.',sections:[['To mestre alene',['VM-ruten i Mendrisio var teknisk og kuperet. Da afgørelsen nærmede sig, sad Eddy Merckx og Felice Gimondi foran, mens Cyrille Guimard måtte nøjes med kampen om bronzen.','Gimondi havde allerede vundet Touren og Giroen. Merckx var midt i sin mest dominerende periode. Finalen samlede derfor to af tidens mest komplette ryttere i en direkte spurt.']],['De sidste meter',['Gimondi åbnede først. Det var hans mulighed for at overraske en hurtigere rival, men Merckx holdt hjulet og kom forbi før stregen. Dermed vandt belgieren sin anden professionelle VM-titel efter 1967.','To år senere blev rollerne vendt i Barcelona, hvor Gimondi tog regnbuetrøjen og Merckx blev nummer fire. Mendrisio står som det reneste billede på deres rivalisering: to ryttere, én lige vej og ingen steder at gemme sig.']] ]},en:{title:'When Gimondi opened the sprint against Merckx',description:'At the 1971 World Championships in Mendrisio, Eddy Merckx and Felice Gimondi reached the finish alone. Gimondi opened, but Merckx took his second rainbow jersey.',deck:'After almost 269 kilometres the world title came down to two riders. Gimondi tried to go first. Merckx waited just long enough.',sections:[['Two champions alone',['The Mendrisio course was technical and hilly. When the race was decided, Eddy Merckx and Felice Gimondi were clear while Cyrille Guimard was left to contest bronze.','Gimondi had already won the Tour and Giro. Merckx was in the middle of his most dominant years. The final therefore put two of the era’s most complete riders into a direct sprint.']],['The final metres',['Gimondi opened first. It was his chance to surprise the faster rival, but Merckx held the wheel and came past before the line to win his second professional world title after 1967.','Two years later the roles were reversed in Barcelona, where Gimondi won the rainbow jersey and Merckx finished fourth. Mendrisio remains the cleanest image of their rivalry: two riders, one straight road and nowhere to hide.']] ]}},
  'coppi-bartali-et-delt-italien': {
    year:'1940–1952', period:'1940-1949', track:'people', image:coppiBartali,
    credit:'Fausto Coppi og Gino Bartali under Giro d’Italia 1940. Public domain.',
    source:'',
    da:{
      title:'Coppi, Bartali og et delt Italien',
      description:'Fausto Coppi og Gino Bartali begyndte som holdkammerater og blev rivaler, som efterkrigstidens Italien brugte til at fortælle om sig selv.',
      deck:'Den ene blev gjort til den fromme traditionalist. Den anden til den moderne og rastløse. På landevejen var forholdet mere sammensat end den pæne opdeling.',
      sections:[
        ['Hjælperen tager den lyserøde trøje',[
          'Fausto Coppi var 20 år og ansat til at hjælpe Gino Bartali, da Giro d’Italia i 1940 nåede bjergene. Bartali var Legnano-holdets kaptajn, dobbelt Giro-vinder og manden, der to år tidligere havde vundet Tour de France. Coppi var det spinkle nye navn. Han skulle hente flasker, lukke huller og ellers kende sin plads.',
          'Men Bartali var mærket af et styrt. På etapen til Modena den 29. maj kørte Coppi væk over Abetone og tog den lyserøde trøje. Da løbet senere ramte Pordoi, var rollerne byttet. Bartali vandt etapen og hjalp sin unge holdkammerat gennem krisen. Coppi vandt Giroen som den yngste nogensinde. Rivaliseringen begyndte altså ikke med to fjender, men med en kaptajn, der endte som hjælper for sin egen hjælper.'
        ]],
        ['Syvogfyrre sekunder efter krigen',[
          'Krigen satte de store etapeløb på pause. Da Giroen vendte tilbage i 1946, var Italien mærket af ødelagte veje, politiske brud og en hverdag, der skulle samles igen. Bartali kørte stadig for Legnano. Coppi var nu kaptajn hos Bianchi. De kendte hinandens rytme, svagheder og små vaner fra tiden på samme hold.',
          'Afgørelsen blev tæt. Coppi vandt fire etaper, men Bartali holdt fast og vandt Giroen med 47 sekunder. Året efter tog Coppi revanche. Derfra kunne næsten enhver bakke blive gjort til en folkeafstemning: Bartali eller Coppi? Det var til at forstå. Man behøvede hverken radioforklaring eller wattmåler. Man skulle blot vælge den ene og mistænke den anden.'
        ]],
        ['To mænd gjort til to slags Italien',[
          'Bartali var åbent katolsk, alvorlig i ansigtet og allerede en mester fra før krigen. Coppi virkede lettere, hurtigere og mere moderne. Han talte om kost, træning og materiel med en anden nysgerrighed. Pressen og tilhængerne gjorde resten. Bartali blev landets traditionsbundne, kirkelige side. Coppi blev den verdslige fremtid og blev ofte gjort til venstrefløjens mand.',
          'Den opdeling var nyttig, men for pæn. Coppi var ikke et partiprogram på to hjul, og Bartali var mere end en katolsk figur med kors om halsen. De var først og fremmest professionelle ryttere med kontrakter, holdkammerater og løb, der skulle vindes. Efter min mening bliver de mere interessante, når man lader dem være besværlige mennesker i stedet for rene symboler.'
        ]],
        ['Rivaler, når det passede — allierede, når det krævedes',[
          'I 1949 skulle de køre Tour de France på samme italienske landshold. Alfredo Binda havde den utaknemmelige opgave at få to kaptajner til at arbejde i nogenlunde samme retning. Coppi mistede tid tidligt i løbet, men kom tilbage. I Alperne skiftede de mellem angreb og hjælp, og Paris endte med Coppi som vinder og Bartali som nummer to.',
          'Det var ikke varmt kammeratskab. Der blev forhandlet om roller, ventetider og ære. Men de kunne samarbejde, når løbet og landsholdet krævede det. Det passer dårligt i den enkle fortælling om et Italien delt i to lejre. Til gengæld passer det glimrende til cykelløb: Dagens rival kan være den eneste mand, der kan hjælpe dig i morgen.'
        ]],
        ['Flasken uden et sikkert svar',[
          'Det mest kendte billede af de to er fra Touren i 1952. På Galibier rækker en hånd en flaske mellem Coppi og Bartali. Hvem gav, og hvem tog? Begge versioner er blevet fortalt, og fotografiet afgør det ikke. Måske er det netop derfor, billedet stadig virker. Det viser både konkurrence og nødvendighed i samme lille bevægelse.',
          'Coppi vandt Touren det år. Bartali blev nummer fire og nærmede sig afslutningen på sin karriere. Italien havde stadig sine coppiani og bartaliani, men ude på bjerget var der kun to trætte ryttere og én flaske. Resten kunne aviserne skændes om dagen efter.'
        ]]
      ]
    },
    en:{
      title:'Coppi, Bartali and a divided Italy',
      description:'Fausto Coppi and Gino Bartali began as team-mates and became rivals through whom post-war Italy told stories about itself.',
      deck:'One was cast as the devout traditionalist, the other as modern and restless. On the road their relationship was less tidy than the division.',
      sections:[
        ['The helper takes the pink jersey',[
          'Fausto Coppi was twenty and employed to help Gino Bartali when the 1940 Giro d’Italia reached the mountains. Bartali was Legnano’s captain, a double Giro winner and the man who had won the Tour de France two years earlier. Coppi was the thin new name, expected to fetch bottles, close gaps and remember his place.',
          'Bartali, however, was suffering after a crash. On the stage to Modena on 29 May, Coppi rode away over the Abetone and took the pink jersey. When the race later reached the Pordoi, their roles had changed. Bartali won the stage and helped his young team-mate through a crisis. Coppi became the Giro’s youngest winner. The rivalry therefore began not with two enemies, but with a captain who became the helper of his own helper.'
        ]],
        ['Forty-seven seconds after the war',[
          'War interrupted the grand tours. When the Giro returned in 1946, Italy was marked by broken roads, political division and an everyday life that had to be assembled again. Bartali still rode for Legnano. Coppi was now the leader at Bianchi. They knew one another’s rhythm, weaknesses and small habits from their years on the same team.',
          'The result was close. Coppi won four stages, but Bartali held on to win the Giro by 47 seconds. Coppi took revenge the following year. From then on almost any hill could be turned into a public vote: Bartali or Coppi? It was easy to understand. No radio explanation or power meter was required. You chose one and distrusted the other.'
        ]],
        ['Two men turned into two versions of Italy',[
          'Bartali was openly Catholic, stern-faced and already a champion before the war. Coppi appeared lighter, faster and more modern. He approached food, training and equipment with a different curiosity. The press and supporters completed the picture. Bartali became the traditional, church-going Italy. Coppi became the secular future and was often presented as the man of the political left.',
          'The division was useful, but too neat. Coppi was not a party programme on two wheels, and Bartali was more than a Catholic figure with a cross around his neck. They were professional riders with contracts, team-mates and races to win. They become more interesting when allowed to remain difficult people rather than tidy symbols.'
        ]],
        ['Rivals when possible, allies when necessary',[
          'In 1949 they rode the Tour de France for the same Italian national team. Alfredo Binda had the thankless job of pointing two captains in roughly the same direction. Coppi lost time early, then recovered. In the Alps they alternated between attacking and helping, and Paris ended with Coppi first and Bartali second.',
          'It was not warm comradeship. Roles, waiting and honour all had to be negotiated. Yet they could cooperate when the race and the national team demanded it. That sits awkwardly with the simple tale of an Italy divided into two camps. It fits bicycle racing rather well: today’s rival may be the only man able to help you tomorrow.'
        ]],
        ['The bottle without a certain answer',[
          'The best-known photograph of the pair comes from the 1952 Tour. On the Galibier a bottle passes between Coppi and Bartali. Who gave and who received? Both versions have been told, and the photograph does not settle it. Perhaps that is why the image still works. Competition and necessity occupy the same small gesture.',
          'Coppi won the Tour that year. Bartali finished fourth and was nearing the end of his career. Italy still had its coppiani and bartaliani, but on the mountain there were simply two tired riders and one bottle. The newspapers could argue about the rest the following morning.'
        ]]
      ]
    }
  },
  'blodtransfusioner-ol-1984': {
    year:'1984', period:'1980-1989', track:'people', image:olympics1984,
    credit:'Landevejscykling i 1984. Fotoet viser Laurent Fignon i Touren, ikke det amerikanske OL-hold.',
    source:'',
    da:{
      title:'Blodposerne ved OL i 1984',
      description:'Det amerikanske cykelholds transfusionsprogram i 1984 lå mellem medicinsk eksperiment, sportslig ambition og regler, der endnu ikke var fulgt med.',
      deck:'Et par dage før OL-løbene lå ryttere på senge i et hotel ved velodromen. En læge fandt venerne frem. Blodet kom fra poser, og ingen havde travlt med at fortælle om det.',
      sections:[
        ['Et hotelværelse ved banen',[
          'Der var ikke meget olympisk glans over rummet. En seng, noget medicinsk udstyr og blodposer, der skulle tømmes ind i ryttere, som snart skulle køre om medaljer. Det foregik på et hotel nær velodromen i Los Angeles. Flere på det amerikanske cykelhold modtog transfusioner kort før deres konkurrencer.',
          'Ideen var enkel nok. Flere røde blodlegemer kunne transportere mere ilt ud til de arbejdende muskler. Det var interessant for en forfølgelsesrytter, der skulle holde en voldsom fart i fire kilometer og helst stadig kunne se lige, når klokken ringede for sidste omgang. Metoden var ikke ny. Finske løbere havde talt om den tidligere, og forskere havde undersøgt den. Men nu blev den brugt midt i et olympisk program.'
        ]],
        ['Planen, der kom sent',[
          'Det amerikanske hold havde forberedt sig grundigt. Hjemmebane, aerodynamik, træningslejre og et velodromepublikum, der endelig tog banecykling alvorligt. Træneren Eddie Borysewicz og sportsfysiologen Ed Burke kendte diskussionen om bloddoping. Ifølge den senere undersøgelse blev transfusionerne gennemført af lægen Herman Falsetti, som ikke havde været en fast del af holdets normale medicinske stab.',
          'Forløbet var ikke det rene laboratoriearbejde, man måske forestiller sig. Nogle ryttere fik deres eget tidligere tappede blod tilbage. Andre modtog blod fra forligelige donorer. Det sidste kaldes en homolog transfusion og kræver sikker blodtypebestemmelse og krydsprøvning. Ellers kan kroppen reagere voldsomt. Der var også risiko for smitte og for, at blodet var håndteret forkert. Det var ikke kønt, men det blev gjort.'
        ]],
        ['Fem medaljetagere og et større hold',[
          'Den amerikanske olympiske komités undersøgelse fastslog senere, at omtrent en tredjedel af den 24 mand store cykeltrup havde modtaget transfusioner. Blandt de navngivne var Steve Hegg, Brent Emery, Pat McDonough, Leonard Nitz og Rebecca Twigg. De vandt alle medaljer. Hegg tog guld i individuel forfølgelse og sølv med holdet. Twigg tog sølv i kvindernes landevejsløb.',
          'USA vandt ni cykelmedaljer ved legene, fire af dem guld. Det var landets første olympiske cykelmedaljer siden 1912. Men regnestykket kan ikke laves så let, at en pose blod bliver lig med en medalje. Østblokkens boykot fjernede stærke modstandere, amerikanerne havde satset målrettet i flere år, og de kørte hjemme. Transfusionerne var en del af billedet. De var ikke hele billedet.'
        ]],
        ['Et hul med kanter',[
          'I 1984 stod bloddoping ikke tydeligt på de internationale forbudslister. Falsetti og rytteren Brent Emery forsvarede senere proceduren med, at den ikke havde været forbudt. Men den amerikanske olympiske organisation havde allerede taget afstand fra metoden, og dens undersøgelse beskrev forløbet som et brud på organisationens regler. Det var altså ikke en pæn, tom gråzone. Der stod folk rundt om kanten og sagde nej.',
          'Ingen ryttere mistede medaljer. De ansvarlige ledere fik forholdsvis beskedne sanktioner, og sagen blev først offentlig kendt efter legene. Det gav den en særlig, tør eftersmag. Publikum havde set stopure, skinnende skivehjul og ni medaljer. Først bagefter fik de at vide, at der også havde været kanyler og blodposer på et hotelværelse.'
        ]],
        ['Da listen endelig fulgte med',[
          'I 1985 forbød IOC bloddoping udtrykkeligt. Et forbud løste dog ikke det praktiske problem: Der fandtes endnu ingen enkel prøve, der kunne afsløre en transfusion. Sporten havde skrevet en regel, men læger og ryttere kunne stadig arbejde i det skjulte. Senere kom EPO og gjorde det muligt at øge mængden af røde blodlegemer uden poser på et hotelbord. Det er en anden historie, og den skal ikke lægges baglæns ned over Los Angeles.',
          'Sagen fra 1984 står bedst, hvis man lader den være konkret. En gruppe ledere traf en beslutning. En læge fandt venerne. Rytterne sagde ja. Da medaljerne var delt ud, begyndte ansvaret at vandre rundt mellem regler, etik og resultater. Blodposerne var væk fra værelset. Spørgsmålene blev liggende.'
        ]]
      ]
    },
    en:{
      title:'The blood bags at the 1984 Olympics',
      description:'The US cycling team’s transfusion programme in 1984 sat between medical experiment, sporting ambition and rules that had not caught up.',
      deck:'A few days before the Olympic races, riders lay on beds in a hotel near the velodrome. A doctor found their veins. The blood came from bags, and nobody hurried to tell the public.',
      sections:[
        ['A hotel room near the track',[
          'There was little Olympic splendour in the room: a bed, medical equipment and bags of blood to be emptied into riders who would soon compete for medals. It happened at a hotel near the Los Angeles velodrome. Several members of the United States cycling team received transfusions shortly before their events.',
          'The idea was simple enough. More red blood cells could carry more oxygen to working muscles. That interested a pursuit rider expected to hold a violent pace for four kilometres and, preferably, still see straight when the bell rang for the final lap. The method was not new. Finnish runners had discussed it before, and researchers had studied it. Now it was being used inside an Olympic programme.'
        ]],
        ['The late-arriving plan',[
          'The American team had prepared carefully. Home advantage, aerodynamics, training camps and a velodrome crowd that finally took track cycling seriously. Coach Eddie Borysewicz and exercise physiologist Ed Burke knew the discussion around blood doping. According to the later investigation, the transfusions were administered by Dr Herman Falsetti, who had not been a regular member of the team’s medical staff.',
          'The procedure was not the clean laboratory exercise one might imagine. Some riders received their own previously stored blood. Others received blood from compatible donors. The latter is a homologous transfusion and requires reliable blood typing and cross-matching. Otherwise the body can react violently. Infection and poor handling were further risks. It was not pretty, but it was done.'
        ]],
        ['Five medallists and a larger team',[
          'The United States Olympic Committee investigation later concluded that roughly a third of the 24-member cycling squad had received transfusions. Those named included Steve Hegg, Brent Emery, Pat McDonough, Leonard Nitz and Rebecca Twigg. All five won medals. Hegg took gold in the individual pursuit and silver with the team. Twigg won silver in the women’s road race.',
          'The United States collected nine cycling medals, four of them gold, its first Olympic cycling medals since 1912. Yet the arithmetic cannot be reduced to one bag of blood equalling one medal. The Eastern Bloc boycott removed powerful opponents, the Americans had prepared purposefully for years, and they were racing at home. The transfusions were part of the picture. They were not the whole picture.'
        ]],
        ['A gap with edges',[
          'In 1984 blood doping was not stated clearly on the international banned lists. Falsetti and the rider Brent Emery later defended the procedure by saying it had not been prohibited. The US Olympic organisation, however, had already rejected the method, and its investigation described the programme as a breach of its rules. This was not a neat, empty grey area. People were standing around its edges saying no.',
          'No rider lost a medal. The officials responsible received relatively modest sanctions, and the affair became public only after the Games. That left a dry aftertaste. Spectators had seen stopwatches, gleaming disc wheels and nine medals. Only later were they told there had also been needles and blood bags in a hotel room.'
        ]],
        ['When the list caught up',[
          'The IOC explicitly prohibited blood doping in 1985. A ban did not solve the practical problem: no simple test could yet detect a transfusion. The sport had written a rule, while doctors and riders could still work out of sight. EPO later offered another way to raise red-cell mass without bags on a hotel table. That is a different story and should not be laid backwards across Los Angeles.',
          'The 1984 affair works best when kept concrete. A group of officials made a decision. A doctor found the veins. The riders agreed. Once the medals had been presented, responsibility began moving between rules, ethics and results. The blood bags had left the room. The questions remained.'
        ]]
      ]
    }
  },
  'gresse-nasq-motorpace': {
    year:'ca. 1900', period:'1900-1920', track:'mechanics', image:motorpace,
    credit:'Romain Gyssels bag en motorpacer ved målet i Bordeaux–Paris 1932. Foto: Agence Mondial Photo-Presse/BnF.',
    source:'https://www.wpcycling.com/wp-content/uploads/2015/09/UCI-Track-Regulations-English.pdf',
    da:{
      title:'Centimeterne mellem Gresse og Nasq',
      description:'Et overleveret postkort med stayeren Gresse og paceren Nasq åbner historien om motorpace, hvor to mennesker og to maskiner skulle arbejde som én.',
      deck:'Rytteren så næsten kun motorcyklens ryg og rullen bag baghjulet. Resten måtte han høre, mærke og stole på.',
      sections:[
        ['Få centimeter fra rullen',[
          'Gresse ligger bøjet over styret med forhjulet tæt på rullen bag Nasqs motorcykel. Sådan beskrives et overleveret postkort fra de tidlige stayerløb. Navnene står på kortet, men den fulde identitet på de to mænd, banen og den præcise datering har ikke kunnet fastslås sikkert. Det skal vi ikke pynte på. Til gengæld viser motivet en arbejdsform, som prægede banecyklingen i årtier.',
          'Den ene mand sad på cyklen. Den anden styrede motoren. De blev præsenteret som et par, fordi det var sådan, løbet fungerede. Gresse kunne have nok så stærke ben; hvis Nasq skiftede linje brat eller åbnede gassen på det forkerte tidspunkt, forsvandt læet. Og hvis Gresse mistede rullen, voksede afstanden hurtigt. Så kom vinden, farten faldt, og konkurrenterne kørte forbi.'
        ]],
        ['Paceren arbejdede foran',[
          'Motorcyklen var ikke blot et fartøj. Den var en bevægelig læmur. Paceren sad oprejst og gjorde sig bred, mens rytteren søgte ind i det rolige område bag maskinen. Den bagerste rulle holdt cyklens forhjul væk fra motorcyklens bagdæk og gav rytteren et tydeligt punkt at placere sig efter. Rullen fjernede ikke faren. Den gjorde bare de sidste centimeter nogenlunde håndterlige.',
          'Samarbejdet foregik med motorlarm, publikum og lufttryk omkring sig. Lange forklaringer var ikke meget værd i et skråt sving. Parret måtte på forhånd kende tegnene for hurtigere, langsommere og ind eller ud på banen. Paceren skulle læse trafikken foran. Stayeren skulle mærke en lille fartændring, før hullet blev stort. Det krævede sit herreår.'
        ]],
        ['Cyklen blev trukket fremad',[
          'Også stayercyklen afslørede opgaven. Et mindre forhjul og en omvendt forgaffel kunne flytte rytteren frem og tættere på motorens læ. Styret og sadelstillingen lagde kroppen lavt. Gearingen var stor, for når farten først var oppe, skulle benene omsætte motorcyklens tempo til jævne, tunge tråd. Det var ikke en cykel, man havde lyst til at starte på ved bagerens kantsten.',
          'Den mærkelige geometri gav mening på banen. Hver centimeter frem mod rullen kunne betyde mindre vindmodstand. Men den gjorde også rytteren afhængig af paceren. Der var ingen fri luft at køre sig varm i, hvis samarbejdet gik skævt. Man sad i maskinens rytme og tog de bevægelser, der kom.'
        ]],
        ['Et parløb forklædt som sololøb',[
          'Resultatlisten satte rytterens navn forrest, men publikum kendte pacerne. En god pacer kunne holde en jævn fart, beskytte sin rytter i positionskampen og vælge den linje, hvor læet virkede bedst. Han skulle samtidig undgå at lukke andre par inde eller blive fanget bag en langsommere motor. Der blev kørt om placering med langt mere end pedaler.',
          'Spørger du mig, er det netop derfor, motorpace stadig fascinerer. Det ser voldsomt mekanisk ud, men præstationen beroede på tillid mellem to mennesker. Rytteren kunne ikke kontrollere hele situationen. Paceren kunne ikke levere resultatet alene. De skulle ramme samme tempo, omgang efter omgang, mens motoren rystede under den ene og det store gear trak i benene på den anden.'
        ]],
        ['Det kortet faktisk fortæller',[
          'Vi kan altså ikke bruge postkortet som sikker dokumentation for en bestemt sejr eller en bestemt dag. Dets tekst giver os navnene Gresse og Nasq og beskriver den ene som engelsk stayer, pacet af den anden. Mere bør man ikke presse ud af det, før originalen og dens historie er bedre belyst.',
          'Men afstanden mellem dem kan vi godt læse. Gresse ligger, hvor en stayer skulle ligge, og Nasq udfører det arbejde, der gjorde farten mulig. Et par centimeter bag en rulle, et stort gear og to mænd, der var nødt til at stole på hinanden. Det er ikke hele historien om motorpace. Det er et ganske godt sted at begynde.'
        ]]
      ]
    },
    en:{
      title:'The centimetres between Gresse and Nasq',
      description:'A surviving postcard naming stayer Gresse and pacer Nasq opens the story of motor-paced racing, where two people and two machines had to work as one.',
      deck:'The rider saw little beyond the motorcyclist’s back and the roller behind the rear wheel. Everything else had to be heard, felt and trusted.',
      sections:[
        ['Centimetres from the roller',[
          'Gresse is bent over the bars, his front wheel close to the roller behind Nasq’s motorcycle. That is how a surviving postcard from the early years of motor-paced racing is described. The names appear on the card, but the two men’s full identities, the track and the precise date have not been established securely. There is no reason to decorate the gaps. What the scene does show is a method of working that shaped track racing for decades.',
          'One man rode the bicycle. The other controlled the motor. They were presented as a pair because that was how the race worked. Gresse could have all the strength in the world; if Nasq changed line abruptly or opened the throttle at the wrong moment, the shelter disappeared. If Gresse lost the roller, the gap grew quickly. The wind arrived, his speed fell and the other combinations went past.'
        ]],
        ['The pacer worked in front',[
          'The motorcycle was more than a vehicle. It was a moving windbreak. The pacer sat upright and made himself broad while the rider searched for the calmer air behind the machine. A roller behind the rear wheel kept the bicycle’s front tyre away from the motorcycle and gave the rider a clear point to follow. It did not remove the danger. It merely made the final few centimetres manageable.',
          'The partnership operated amid engine noise, spectators and air pressure. Long explanations were of little use on a banked bend. The pair had to agree beforehand on signals for faster, slower, higher or lower on the track. The pacer read the traffic ahead. The stayer had to feel a small change of speed before the gap opened. It was a proper trade.'
        ]],
        ['A bicycle pulled forwards',[
          'The stayer bicycle revealed its purpose too. A smaller front wheel and reversed fork could move the rider forwards and deeper into the motorcycle’s shelter. The bars and saddle put the body low. Gearing was large because, once up to speed, the legs had to turn the motorcycle’s pace into steady, heavy strokes. It was not a bicycle one would choose for setting off from the baker’s kerb.',
          'The odd geometry made sense on the track. Every centimetre gained towards the roller could reduce air resistance. It also made the rider dependent on the pacer. There was no open air in which to settle down if the partnership went wrong. The rider sat inside the machine’s rhythm and accepted the movements it produced.'
        ]],
        ['A pair race disguised as a solo event',[
          'The results placed the cyclist’s name first, but spectators knew the pacers. A good pacer held a steady speed, protected his rider in the battle for position and chose the line where the shelter worked best. He also had to avoid boxing in another pair or becoming trapped behind a slower motorcycle. Position was contested with much more than pedals.',
          'That, to my mind, is why motor pacing remains fascinating. It looks thoroughly mechanical, yet the performance depended on trust between two people. The rider could not control the whole situation. The pacer could not produce the result alone. They had to find the same tempo lap after lap, with the engine shaking beneath one and the huge gear pulling at the other’s legs.'
        ]],
        ['What the card can tell us',[
          'The postcard cannot safely document a particular victory or day. Its caption gives us the names Gresse and Nasq and describes the former as an English stayer paced by the latter. Until the original card and its history are better understood, it should not be made to say more.',
          'The distance between them, however, is readable. Gresse occupies the place a stayer needed, and Nasq performs the work that made the speed possible. A few centimetres behind a roller, a huge gear and two men obliged to trust one another. It is not the whole history of motor pacing. It is a sound place to begin.'
        ]]
      ]
    }
  },
  'bert-oosterbosch-winschoten-1985': {year:'1985',period:'1980-1989',track:'people',image:olympics1984,credit:'Landevejscykling i 1984. Fotoet er et tidsbillede og viser ikke Bert Oosterbosch eller prologen i Winschoten.',source:'https://www.winschoterarchief.nl/sec-archief/winschoten-25-jaar-geleden/augustus-1985/',da:{title:'Da Oosterbosch fandt enkeltstarten igen',description:'På 6,6 våde kilometer i Winschoten slog Bert Oosterbosch holdkammeraten Eric Vanderaerden med 11 sekunder og brød en vanskelig sæson.',deck:'Han var blevet vant til andenpladser, netop når alle ventede en sejr. På de glatte bygader i Winschoten kom specialiteten tilbage.',sections:[['Otte minutter og 25 sekunder',['Den 19. august 1985 åbnede Nederland Rundt med en 6,6 kilometer lang prolog i Winschoten. Bert Oosterbosch kørte på 8 minutter og 25 sekunder. Eric Vanderaerden, hans belgiske holdkammerat og dagens favorit, var 11 sekunder langsommere.','Det lokale arkiv anslår, at næsten 25.000 så enkeltstarten. For Oosterbosch var sejren mere end en prolog. Sæsonen havde givet mange andenpladser og få bekræftelser på den fart, der tidligere havde gjort ham til verdensmester i forfølgelsesløb.']],['Specialisten vender tilbage',['Avisudklippet beskriver ham som genfødt. Ordet er stort, men scenen forklarer det: en kort, våd rute, en tid på tavlen og ventetiden på, om Vanderaerden kunne slå den.','Det kunne han ikke. Oosterbosch bar førertrøjen ud af Winschoten, mens Vanderaerden senere vandt løbet samlet. Prologen blev et lille selvstændigt øjeblik, hvor specialisten igen var den hurtigste.']] ]},en:{title:'When Oosterbosch found the time trial again',description:'Over 6.6 wet kilometres in Winschoten, Bert Oosterbosch beat team-mate Eric Vanderaerden by eleven seconds and interrupted a difficult season.',deck:'He had become accustomed to second places just when everybody expected a win. On the slippery streets of Winschoten, his speciality returned.',sections:[['Eight minutes and 25 seconds',['On 19 August 1985 the Tour of the Netherlands opened with a 6.6-kilometre prologue in Winschoten. Bert Oosterbosch recorded 8 minutes 25 seconds. Eric Vanderaerden, his Belgian team-mate and the day’s favourite, was eleven seconds slower.','The local archive estimates that almost 25,000 watched. For Oosterbosch the win was more than a prologue. The season had produced many second places and few reminders of the speed that had once made him world pursuit champion.']],['The specialist returns',['The newspaper clipping described him as reborn. The word is large, but the scene explains it: a short wet course, a time on the board, and the wait to see whether Vanderaerden could beat it.','He could not. Oosterbosch carried the leader’s jersey out of Winschoten, although Vanderaerden later won the race overall. The prologue remained a small moment of its own, when the specialist was fastest again.']] ]}},
  'fausto-coppi-malaria-1960': {year:'1959–1960',period:'1960-1969',track:'people',image:coppi,credit:'Fausto Coppi i 1957. Foto: Joop van Bilsen/Anefo, CC0.',source:'https://www.lemonde.fr/archives/article/1960/01/04/fausto-coppi-est-mort-a-l-hopital-de-tortona-ou-il-venait-d-etre-transporte_2096628_1819218.html',da:{title:'Coppis sidste rejse og den oversete malaria',description:'Fausto Coppi kom syg hjem fra en rejse til Øvre Volta i 1959. Malaria blev først erkendt, da behandlingen kom for sent.',deck:'Han kom hjem med feber efter en rejse til Afrika. Lægerne ledte efter andre forklaringer, mens den sygdom, rejsefællerne også bar med hjem, fik tid.',sections:[['Rejsen efter karrieren',['I december 1959 rejste Fausto Coppi med andre europæiske sportsfolk til Øvre Volta, det nuværende Burkina Faso. Turen omfattede cykelløb og jagt. Efter hjemkomsten blev flere i selskabet syge.','Coppi fik høj feber omkring jul. Hans tilstand blev først behandlet som en anden sygdom. Rejsefællen Raphaël Géminiani blev også alvorligt syg, men her førte forbindelsen til Afrika til behandling mod malaria.']],['Diagnosen kom for sent',['Da malaria blev overvejet hos Coppi, var sygdomsforløbet langt fremskredent. Han døde på hospitalet i Tortona den 2. januar 1960, 40 år gammel.','Historien er siden blevet omgivet af forklaringer om præcis hvor smitten skete, og hvem der advarede hvem. Kernen er enklere og veldokumenteret: En behandlingsbar tropesygdom blev ikke genkendt i tide. Cykelsportens største italienske navn døde ikke på cyklen, men efter en diagnose, der kom for sent.']] ]},en:{title:'Coppi’s last journey and the missed malaria',description:'Fausto Coppi returned ill from Upper Volta in 1959. Malaria was recognised only when effective treatment came too late.',deck:'He came home with fever after a journey to Africa. Doctors looked for other explanations while the illness also carried by his companions was given time.',sections:[['The journey after the season',['In December 1959 Fausto Coppi travelled with other European sportsmen to Upper Volta, now Burkina Faso. The visit included bicycle races and hunting. Several members of the party became ill after returning home.','Coppi developed a high fever around Christmas. His condition was initially treated as another illness. Fellow traveller Raphaël Géminiani also became gravely ill, but in his case the African connection led to treatment for malaria.']],['The diagnosis came too late',['By the time malaria was considered in Coppi’s case, the illness was far advanced. He died in hospital in Tortona on 2 January 1960, aged forty.','The story later accumulated claims about exactly where infection occurred and who warned whom. The core is simpler and well documented: a treatable tropical illness was not recognised in time. Italy’s greatest cycling name died not on the bicycle, but after a diagnosis that came too late.']] ]}}
} as const;
