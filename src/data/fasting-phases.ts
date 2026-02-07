export interface FastingPhase {
  id: string;
  hourStart: number;
  hourEnd: number;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  body: {
    title: string;
    description: string;
  };
  feelings: {
    physical: string[];
    mental: string[];
  };
  tips: string[];
  drinks: string[];
  warnings: string[];
  mascotMessage: string;
  fatBurn: {
    male: string;
    female: string;
  };
  mentalJourney: string;
  // New fields
  science: {
    insulin: string;
    glucagon: string;
    hgh: string;
    cortisol: string;
    ketones: string;
    autophagy: number; // 0-100
    inflammation: number; // 0-100
  };
  didYouKnow: string[];
  difficulty: number; // 1-10
  challenge: {
    title: string;
    description: string;
    type: "breathing" | "journaling" | "movement" | "mindfulness" | "gratitude";
    durationMinutes: number;
  };
  journalPrompt: string;
  quote: { text: string; author: string };
  bodyProcesses: { process: string; description: string; icon: string }[];
  mascotMood: "excited" | "encouraging" | "warning" | "celebrating" | "calm";
}

export const FASTING_PHASES: FastingPhase[] = [
  {
    id: "phase-0-4",
    hourStart: 0,
    hourEnd: 4,
    title: "Trávení posledního jídla",
    shortTitle: "Start",
    icon: "🌅",
    color: "from-green-400 to-teal-500",
    body: {
      title: "Trávicí systém dokončuje práci",
      description:
        "Tělo ještě zpracovává poslední jídlo. Žaludek tráví, střeva vstřebávají živiny. Glukóza z jídla je hlavním zdrojem energie. Inzulín je stále zvýšený.",
    },
    feelings: {
      physical: ["Normální stav", "Mírná sytost", "Žádné nepříjemné pocity"],
      mental: ["Odhodlání", "Možná mírná nervozita", "Vzrušení z výzvy"],
    },
    tips: [
      "Dopijte dostatek vody",
      "Připravte si prostředí — ukliďte lednici, schováte svačiny",
      "Řekněte blízkým o svém plánu",
      "Připravte si elektrolyty na další dny",
    ],
    drinks: ["Čistá voda", "Bylinkový čaj (bez cukru)"],
    warnings: [],
    mascotMessage:
      "Výborně! Právě jsi začal svou cestu. Jsem s tebou krok za krokem!",
    fatBurn: {
      male: "~0 kg — tělo čerpá z posledního jídla",
      female: "~0 kg — tělo čerpá z posledního jídla",
    },
    mentalJourney: "Odhodlání a nadšení. Začátek nové kapitoly.",
    science: {
      insulin: "Zvýšený — zpracovává glukózu z jídla",
      glucagon: "Nízký — potlačen inzulínem",
      hgh: "Bazální úroveň",
      cortisol: "Normální denní rytmus",
      ketones: "< 0.1 mmol/L",
      autophagy: 0,
      inflammation: 0,
    },
    didYouKnow: [
      "Žaludek pojme až 1,5 litru jídla a tráví ho 4-6 hodin.",
      "Inzulín je anabolický hormon — když je vysoký, tělo ukládá energii, nespaluje ji.",
      "Vaše poslední jídlo by ideálně mělo být bohaté na tuky a vlákninu — dodá delší pocit sytosti.",
    ],
    difficulty: 2,
    challenge: {
      title: "Nastavení záměru",
      description:
        "Zapište si na papír 3 důvody, proč začínáte půst. Přečtěte si je nahlas. Tento papír si schovejte na těžké chvíle.",
      type: "journaling",
      durationMinutes: 10,
    },
    journalPrompt: "Proč jsem se rozhodl/a pro tento půst? Co od něj očekávám?",
    quote: {
      text: "Každá velká cesta začíná prvním krokem.",
      author: "Lao-c'",
    },
    bodyProcesses: [
      { process: "Trávení", description: "Žaludek a střeva zpracovávají poslední jídlo", icon: "🫁" },
      { process: "Vstřebávání", description: "Živiny přecházejí z střev do krve", icon: "🩸" },
      { process: "Ukládání glykogenu", description: "Játra ukládají přebytečnou glukózu", icon: "🏦" },
    ],
    mascotMood: "excited",
  },
  {
    id: "phase-4-8",
    hourStart: 4,
    hourEnd: 8,
    title: "Přechod na glukózu z jater",
    shortTitle: "Přechod",
    icon: "🔄",
    color: "from-teal-400 to-teal-600",
    body: {
      title: "Játra přebírají roli",
      description:
        "Jídlo je stráveno, hladina cukru v krvi klesá. Játra začínají uvolňovat glykogen — zásobu glukózy. Tělo plynule přechází z externího na interní zdroj energie.",
    },
    feelings: {
      physical: ["Normální stav", "Možný mírný hlad", "Žízeň"],
      mental: [
        "Stále stabilní nálada",
        "Občas myšlenky na jídlo",
        "Zvědavost",
      ],
    },
    tips: [
      "Pijte pravidelně vodu — malé doušky",
      "Lehká procházka pomůže odvést pozornost",
      "Vyplňte svůj čas aktivitami — čtení, meditace",
    ],
    drinks: ["Čistá voda", "Teplá voda s citrónem (bez cukru)"],
    warnings: [],
    mascotMessage:
      "Skvěle! Tělo přepíná na vlastní zásoby. To je úplně normální!",
    fatBurn: {
      male: "~0 kg — stále se využívá glykogen",
      female: "~0 kg — stále se využívá glykogen",
    },
    mentalJourney: "Klid, zvědavost. Tělo funguje normálně.",
    science: {
      insulin: "Klesá na bazální úroveň",
      glucagon: "Stoupá — stimuluje glykogenolýzu",
      hgh: "Mírně stoupá",
      cortisol: "Normální denní rytmus",
      ketones: "0.1-0.2 mmol/L",
      autophagy: 5,
      inflammation: 3,
    },
    didYouKnow: [
      "Játra dokážou uložit až 100g glykogenu — to je energie na ~24 hodin.",
      "Glukagon je ‚protihráč' inzulínu — přikazuje játrům uvolňovat cukr do krve.",
      "Tělo zdravého člověka přepíná mezi spalováním cukru a tuku stokrát denně.",
    ],
    difficulty: 3,
    challenge: {
      title: "Mindful chůze",
      description:
        "Jděte na 15minutovou procházku. Soustřeďte se na každý krok — vnímejte zem pod nohama, zvuky kolem, teplotu vzduchu. Žádný telefon.",
      type: "movement",
      durationMinutes: 15,
    },
    journalPrompt: "Jak se cítím 8 hodin od posledního jídla? Překvapuje mě něco?",
    quote: {
      text: "Hlad není nepřítel, ale učitel.",
      author: "Yoshinori Ohsumi, Nobelova cena 2016",
    },
    bodyProcesses: [
      { process: "Glykogenolýza", description: "Játra štěpí zásobní glykogen na glukózu", icon: "⚡" },
      { process: "Pokles inzulínu", description: "Slinivka snižuje výdej inzulínu", icon: "📉" },
      { process: "Mobilizace", description: "Tělo se připravuje na přechod k tukům", icon: "🔄" },
    ],
    mascotMood: "encouraging",
  },
  {
    id: "phase-8-12",
    hourStart: 8,
    hourEnd: 12,
    title: "Začátek glykogenolýzy",
    shortTitle: "Glykogen",
    icon: "⚡",
    color: "from-teal-500 to-blue-500",
    body: {
      title: "Zásoby glykogenu se tenčí",
      description:
        "Játra aktivně spalují glykogen. Zásoby stačí na přibližně 24 hodin. Tělo se připravuje na přechod k alternativním zdrojům energie — tukům. Hladina inzulínu klesá.",
    },
    feelings: {
      physical: ["Mírný hlad", "Kručení v žaludku", "Normální energie"],
      mental: ["Myšlenky na jídlo", "Mírná netrpělivost", "Soustředění OK"],
    },
    tips: [
      "Při hladu vypijte sklenici teplé vody",
      "Zaměstnejte se — práce, koníčky, procházka",
      "Spánek je váš nejlepší přítel — jděte brzy spát",
    ],
    drinks: ["Čistá voda", "Bylinkový čaj", "Teplá voda"],
    warnings: [],
    mascotMessage:
      "Hlad je normální signál. Řekni tělu, že je vše OK — má zásoby!",
    fatBurn: {
      male: "~0.05 kg — začíná se přecházet na tuky",
      female: "~0.04 kg — začíná se přecházet na tuky",
    },
    mentalJourney: "První myšlenky na jídlo. Test odhodlání.",
    science: {
      insulin: "Nízký — umožňuje přístup k tukovým zásobám",
      glucagon: "Zvýšený — pokračuje štěpení glykogenu",
      hgh: "Stoupá o ~50 %",
      cortisol: "Mírně zvýšený — reakce na mírný stres",
      ketones: "0.2-0.5 mmol/L",
      autophagy: 10,
      inflammation: 8,
    },
    didYouKnow: [
      "Kručení v žaludku neznamená, že je prázdný — jsou to kontrakce svalů, které uklízejí zbytky.",
      "Růstový hormon (HGH) chrání svaly před rozpadem a zároveň podporuje spalování tuků.",
      "Intermitentní půst (16:8) končí právě v této fázi — vy jdete dál!",
    ],
    difficulty: 4,
    challenge: {
      title: "Dechové cvičení 4-7-8",
      description:
        "Nádech nosem 4 sekundy, zadržení dechu 7 sekund, výdech ústy 8 sekund. Opakujte 4×. Aktivuje parasympatický nervový systém a snižuje chuť k jídlu.",
      type: "breathing",
      durationMinutes: 5,
    },
    journalPrompt: "Kdy během dne cítím největší hlad? Co mi pomáhá ho zvládnout?",
    quote: {
      text: "Disciplína je most mezi cíli a jejich dosažením.",
      author: "Jim Rohn",
    },
    bodyProcesses: [
      { process: "Spotřeba glykogenu", description: "Zásoby v játrech klesají pod 50 %", icon: "🔋" },
      { process: "Nástup lipolýzy", description: "Tukové buňky začínají uvolňovat mastné kyseliny", icon: "💧" },
      { process: "Růst HGH", description: "Růstový hormon chrání svalovou hmotu", icon: "💪" },
    ],
    mascotMood: "encouraging",
  },
  {
    id: "phase-12-18",
    hourStart: 12,
    hourEnd: 18,
    title: "Počátek ketózy",
    shortTitle: "Ketóza",
    icon: "🔥",
    color: "from-blue-500 to-indigo-500",
    body: {
      title: "Tělo přepíná na spalování tuků",
      description:
        "Glykogen se vyčerpává a tělo začíná produkovat ketony z tukových zásob. Mozek se postupně adaptuje na nové palivo. Toto je klíčový metabolický přechod.",
    },
    feelings: {
      physical: [
        "Silnější hlad",
        "Možná bolest hlavy",
        "Mírná únava",
        "Závratě při rychlém vstání",
      ],
      mental: [
        "Podrážděnost",
        "Silné myšlenky na jídlo",
        "Pochyby — 'mám to vzdát?'",
      ],
    },
    tips: [
      "Elektrolyty! Sůl (1/4 lžičky) ve vodě pomůže s bolestí hlavy",
      "Odpočívejte — netělo netlačte na výkon",
      "Studená sprcha pomůže s únavou",
      "Připomínejte si, PROČ jste začali",
    ],
    drinks: [
      "Voda s elektrolyty (sodík, draslík, hořčík)",
      "Bylinkový čaj",
      "Minerální voda",
    ],
    warnings: [
      "Silná bolest hlavy, která nereaguje na elektrolyty — zvažte ukončení",
    ],
    mascotMessage:
      "Toto je první velký test! Bolest hlavy? Zkus elektrolyty. Jsi silnější než myslíš!",
    fatBurn: {
      male: "~0.1-0.2 kg tuku",
      female: "~0.08-0.15 kg tuku",
    },
    mentalJourney: "Konfrontace s návyky. 'Proč to dělám?'",
    science: {
      insulin: "Velmi nízký — odemyká tukové zásoby",
      glucagon: "Vysoký — stimuluje ketogenezi v játrech",
      hgh: "Stoupá o ~100 %",
      cortisol: "Mírně zvýšený",
      ketones: "0.5-1.0 mmol/L",
      autophagy: 20,
      inflammation: 15,
    },
    didYouKnow: [
      "Ketony jsou o 25 % energeticky účinnější než glukóza — mozek je miluje!",
      "Bolest hlavy v této fázi je většinou z dehydratace a nedostatku sodíku, ne z hladu.",
      "Tento metabolický přechod je přesně ten, který naši předci zažívali pravidelně.",
    ],
    difficulty: 6,
    challenge: {
      title: "Studená expozice",
      description:
        "Na konci sprchy přepněte na 30 sekund studenou vodu. Soustřeďte se na dech. Studená aktivuje hnědý tuk a zvyšuje noradrenalin — zlepšuje náladu a snižuje hlad.",
      type: "movement",
      durationMinutes: 5,
    },
    journalPrompt: "Jaké myšlenky mě napadají, když cítím hlad? Co mi hlad říká o mém vztahu k jídlu?",
    quote: {
      text: "Nejtěžší bitvy svádíme sami se sebou.",
      author: "Karel Čapek",
    },
    bodyProcesses: [
      { process: "Ketogeneze", description: "Játra přeměňují mastné kyseliny na ketony", icon: "🔥" },
      { process: "Adaptace mozku", description: "Neurony se učí využívat ketony jako palivo", icon: "🧠" },
      { process: "Pokles inzulínu", description: "Nejnižší úroveň — tuk je plně dostupný", icon: "📉" },
      { process: "Úbytek vody", description: "Glykogen váže vodu — s jeho úbytkem klesá i váha", icon: "💧" },
    ],
    mascotMood: "warning",
  },
  {
    id: "phase-18-24",
    hourStart: 18,
    hourEnd: 24,
    title: "Ketóza se prohlubuje",
    shortTitle: "Den 1",
    icon: "💧",
    color: "from-indigo-500 to-purple-500",
    body: {
      title: "Plná ketóza — tělo spaluje tuk",
      description:
        "Ketony jsou nyní hlavním zdrojem energie pro mozek. Tělo efektivně spaluje tukové zásoby. Autofagie (buněčný recyklační program) začíná svou aktivitu.",
    },
    feelings: {
      physical: [
        "Hlad může mírně klesnout",
        "Únava",
        "Možný zápach z úst (ketony)",
        "Časté močení",
      ],
      mental: [
        "Emoční vlny",
        "Fáze klidu střídané neklidem",
        "Myšlenky na jídlo slábnou",
      ],
    },
    tips: [
      "Pokračujte v elektrolytech — sodík, draslík, hořčík",
      "Lehká chůze je OK, vyhněte se intenzivnímu cvičení",
      "Teplá sprcha před spaním pomůže s relaxací",
      "Zapisujte si pocity do deníku",
    ],
    drinks: [
      "Voda s elektrolyty",
      "Bylinkový čaj (máta, heřmánek)",
      "Minerální voda",
    ],
    warnings: [
      "Mdloby nebo silné závratě — okamžitě přerušte půst",
      "Silná srdeční arytmie — okamžitě přerušte půst",
    ],
    mascotMessage:
      "První den za tebou! Tvoje tělo právě přepnulo na spalování tuků. Jsi skvělý/á!",
    fatBurn: {
      male: "~0.2-0.3 kg tuku celkem",
      female: "~0.15-0.25 kg tuku celkem",
    },
    mentalJourney: "Emoční vlny. Uvědomění, jak moc jsme na jídle závislí.",
    science: {
      insulin: "Bazální minimum — maximální citlivost buněk",
      glucagon: "Stabilně zvýšený",
      hgh: "Stoupá o ~200 %",
      cortisol: "Mírně zvýšený — tělo je ve ‚stresu z novosti'",
      ketones: "1.0-2.0 mmol/L",
      autophagy: 40,
      inflammation: 25,
    },
    didYouKnow: [
      "Zápach z úst (acetonový dech) je dobrá zpráva — znamená, že spalujete tuk!",
      "Po 24 hodinách bez jídla se aktivita autofagie zvyšuje až 5×.",
      "Většina hladu, který cítíte, je naučený zvyk — nikoliv skutečná potřeba těla.",
    ],
    difficulty: 7,
    challenge: {
      title: "Meditace vděčnosti",
      description:
        "Sedněte si pohodlně, zavřete oči. 5 minut přemýšlejte o věcech, za které jste vděční. Za každou věc řekněte nahlas ‚Děkuji'. Vděčnost snižuje kortizol a zlepšuje náladu.",
      type: "gratitude",
      durationMinutes: 5,
    },
    journalPrompt: "Co jsem dnes zjistil/a o svém vztahu k jídlu? Za co jsem vděčný/á?",
    quote: {
      text: "Člověk může najít smysl i v utrpení — pokud je dobrovolné a má účel.",
      author: "Viktor Frankl",
    },
    bodyProcesses: [
      { process: "Plná ketóza", description: "Ketony zásobují 60-70 % energetických potřeb mozku", icon: "🧠" },
      { process: "Autofagie startuje", description: "Buňky začínají recyklovat poškozené proteiny", icon: "♻️" },
      { process: "Spalování tuků", description: "Tělo spaluje ~150-200g tuku denně", icon: "🔥" },
      { process: "Regenerace střev", description: "Odpočinek trávicího traktu umožňuje obnovu sliznice", icon: "🫁" },
    ],
    mascotMood: "warning",
  },
  {
    id: "phase-24-48",
    hourStart: 24,
    hourEnd: 48,
    title: "Den 2 — 'Stěna'",
    shortTitle: "Den 2",
    icon: "🧱",
    color: "from-purple-500 to-red-500",
    body: {
      title: "Nejtěžší fáze — překonání 'stěny'",
      description:
        "Tělo se plně adaptuje na ketózu. Toto je obvykle nejtěžší fáze — hlad, únava a podrážděnost mohou být silné. Autofagie se rozbíhá. Poškozené buňky jsou recyklovány.",
    },
    feelings: {
      physical: [
        "Silný hlad (vlnami)",
        "Únava a slabost",
        "Bolesti hlavy",
        "Nevolnost",
        "Chladné končetiny",
      ],
      mental: [
        "Silné pochyby",
        "Podrážděnost",
        "Frustrace",
        "Detox mysli — emoce vycházejí na povrch",
      ],
    },
    tips: [
      "Toto je nejtěžší den — pokud ho přežijete, zbytek bude snazší!",
      "Elektrolyty jsou KLÍČOVÉ — pijte pravidelně",
      "Teplá voda místo studené — je šetrnější k žaludku",
      "Odpočívejte. Žádné povinnosti, žádný stres.",
      "Procházka na čerstvém vzduchu pomůže",
    ],
    drinks: [
      "Voda s elektrolyty (každé 2-3 hodiny)",
      "Teplá voda",
      "Heřmánkový čaj",
      "Minerální voda (Magnesia)",
    ],
    warnings: [
      "Opakované zvracení — přerušte půst",
      "Silné srdeční bušení — přerušte půst",
      "Neschopnost pít vodu — přerušte půst",
      "Mdloby — okamžitě přerušte půst",
    ],
    mascotMessage:
      "Den 2 je peklo, to vím. Ale ZÍTRA to bude lepší! Každá minuta se počítá. Drž to!",
    fatBurn: {
      male: "~0.5-0.7 kg tuku celkem",
      female: "~0.4-0.6 kg tuku celkem",
    },
    mentalJourney:
      "Frustrace, emoční vlny, detox mysli. Konfrontace sama se sebou.",
    science: {
      insulin: "Minimální — maximální lipolýza",
      glucagon: "Vysoký — plná mobilizace tukových zásob",
      hgh: "Stoupá o ~300 % — chrání svaly",
      cortisol: "Zvýšený — reakce na fyzický stres",
      ketones: "2.0-4.0 mmol/L",
      autophagy: 65,
      inflammation: 40,
    },
    didYouKnow: [
      "Den 2 je statisticky nejčastější den, kdy lidé půst vzdávají. Pokud ho přežijete, máte 85% šanci dokončit!",
      "Růstový hormon na 300 % znamená, že vaše tělo aktivně chrání svaly a spaluje jen tuk.",
      "Pocit chladu je normální — tělo snižuje metabolismus, aby šetřilo energii.",
    ],
    difficulty: 9,
    challenge: {
      title: "Dechové cvičení 4-7-8",
      description:
        "Nádech nosem 4 sekundy, zadržení dechu 7 sekund, pomalý výdech ústy 8 sekund. Opakujte 6×. Tento vzorec přímo aktivuje vagusový nerv a tlumí stresovou reakci.",
      type: "breathing",
      durationMinutes: 5,
    },
    journalPrompt: "Co je nejtěžší v tuto chvíli? Jakou sílu v sobě nacházím, o které jsem nevěděl/a?",
    quote: {
      text: "Diamanty se rodí pod tlakem.",
      author: "české přísloví",
    },
    bodyProcesses: [
      { process: "Hluboká ketóza", description: "Ketony jsou primárním palivem pro celé tělo", icon: "⚡" },
      { process: "Autofagie roste", description: "Masivní recyklace poškozených buněk a proteinů", icon: "♻️" },
      { process: "Reset imunity", description: "Staré bílé krvinky jsou odbourávány", icon: "🛡️" },
      { process: "Protizánětlivý efekt", description: "Zánětlivé markery (CRP, IL-6) klesají", icon: "💊" },
    ],
    mascotMood: "warning",
  },
  {
    id: "phase-48-72",
    hourStart: 48,
    hourEnd: 72,
    title: "Den 3 — Autofagie naplno",
    shortTitle: "Den 3",
    icon: "✨",
    color: "from-red-400 to-orange-400",
    body: {
      title: "Autofagie na plný výkon",
      description:
        "Tělo masivně recykluje poškozené buňky a proteiny. Hlad paradoxně klesá — tělo si zvyklo na ketony. Imunitní systém se regeneruje. Růstový hormon stoupá (až 300%).",
    },
    feelings: {
      physical: [
        "Hlad klesá!",
        "Energie se vrací",
        "Lepší spánek",
        "Lehkost v těle",
      ],
      mental: [
        "Zlom — mentální jas",
        "Klid a soustředění",
        "Pocit úspěchu",
        "Kreativita",
      ],
    },
    tips: [
      "Užijte si tento den — je to zlomový bod!",
      "Pokračujte v elektrolytech",
      "Lehká jóga nebo meditace jsou ideální",
      "Zapisujte si myšlenky — jsou nyní mimořádně jasné",
    ],
    drinks: [
      "Voda s elektrolyty",
      "Bylinkový čaj",
      "Čistá voda",
      "Minerální voda",
    ],
    warnings: ["Pokračujte v monitorování svého stavu"],
    mascotMessage:
      "ZLOM! Hlad ustupuje, jasnost přichází. Jsi v nejlepší fázi! Tvoje buňky se regenerují.",
    fatBurn: {
      male: "~0.8-1.1 kg tuku celkem",
      female: "~0.7-0.9 kg tuku celkem",
    },
    mentalJourney:
      "Zlom — klid, jasnost, soustředění. Vděčnost a vhled.",
    science: {
      insulin: "Stabilně nízký — metabolická flexibilita",
      glucagon: "Stabilně zvýšený",
      hgh: "Na 300-500 % bazální úrovně",
      cortisol: "Klesá — tělo se adaptovalo",
      ketones: "3.0-5.0 mmol/L",
      autophagy: 85,
      inflammation: 55,
    },
    didYouKnow: [
      "Yoshinori Ohsumi dostal Nobelovu cenu (2016) za objev mechanismů autofagie — právě tohoto procesu.",
      "Váš mozek nyní běží na ketonech a je prokazatelně ostřejší — studie ukazují zlepšení paměti o 20 %.",
      "Pokles hladu ve 3. dni je reálný fenomén — tělo si zvyklo a přestalo vysílat falešné signály.",
    ],
    difficulty: 5,
    challenge: {
      title: "Body scan meditace",
      description:
        "Lehněte si, zavřete oči. Pomalu projděte pozorností celé tělo od špiček prstů po temeno hlavy. U každé části těla poděkujte za její práci. Trvá 10 minut.",
      type: "mindfulness",
      durationMinutes: 10,
    },
    journalPrompt: "Jak se liší můj dnešní hlad od včerejšího? Co nového jsem se o sobě dozvěděl/a?",
    quote: {
      text: "Tělo je chrám — a půst je jeho renovace.",
      author: "Paracelsus",
    },
    bodyProcesses: [
      { process: "Peak autofagie", description: "Maximální recyklace poškozených buněčných komponent", icon: "♻️" },
      { process: "Obnova imunity", description: "Tělo produkuje nové kmenové buňky pro imunitní systém", icon: "🛡️" },
      { process: "Neuronální růst", description: "BDNF (mozkový neurotropní faktor) stoupá — nové nervové spoje", icon: "🧠" },
      { process: "Efektivní ketóza", description: "Tělo mistrovsky využívá ketony jako palivo", icon: "🔥" },
    ],
    mascotMood: "celebrating",
  },
  {
    id: "phase-72-96",
    hourStart: 72,
    hourEnd: 96,
    title: "Den 4 — Hluboká regenerace",
    shortTitle: "Den 4",
    icon: "🧬",
    color: "from-orange-400 to-yellow-400",
    body: {
      title: "Peak autofagie a buněčná obnova",
      description:
        "Autofagie je na maximu. Tělo generuje nové kmenové buňky. Imunitní systém se kompletně resetuje. Zánětlivé markery v krvi klesají. Růstový hormon je na nejvyšší úrovni.",
    },
    feelings: {
      physical: [
        "Minimální hlad",
        "Stabilní energie",
        "Jasná hlava",
        "Lehkost",
      ],
      mental: [
        "Flow stav",
        "Hluboký klid",
        "Kreativita a inspirace",
        "Vděčnost",
      ],
    },
    tips: [
      "Užívejte si tento stav — je unikátní",
      "Meditace je nyní mimořádně efektivní",
      "Pomalu začněte plánovat refeeding",
      "Pokračujte v elektrolytech",
    ],
    drinks: [
      "Voda s elektrolyty",
      "Bylinkový čaj",
      "Čistá voda",
    ],
    warnings: ["Monitorujte svůj stav — jste v pokročilé fázi půstu"],
    mascotMessage:
      "Den 4 — jsi bojovník/bojovnice! Tvoje tělo se regeneruje na buněčné úrovni. Úžasné!",
    fatBurn: {
      male: "~1.2-1.5 kg tuku celkem",
      female: "~1.0-1.3 kg tuku celkem",
    },
    mentalJourney:
      "Flow stav, kreativita, vděčnost. Nový vztah k jídlu a tělu.",
    science: {
      insulin: "Stabilně minimální — maximální inzulínová citlivost",
      glucagon: "Stabilní — ustálený metabolismus",
      hgh: "Na 400-500 % bazální úrovně — chrání svaly",
      cortisol: "Normalizuje se — tělo je plně adaptováno",
      ketones: "4.0-6.0 mmol/L",
      autophagy: 95,
      inflammation: 70,
    },
    didYouKnow: [
      "Po 72 hodinách půstu tělo začíná produkovat zcela nové kmenové buňky imunitního systému.",
      "Hladina HGH 500 % nad normálem znamená, že vaše svaly jsou chráněny — spalujete jen tuk.",
      "Mnozí lidé hlásí nejjasnější myšlení svého života kolem 4. dne půstu.",
    ],
    difficulty: 3,
    challenge: {
      title: "Dopis sobě",
      description:
        "Napište krátký dopis svému budoucímu já — co chcete, aby si zapamatoval/a z této zkušenosti? Co jste se naučil/a? Jaký je váš závazek do budoucna?",
      type: "journaling",
      durationMinutes: 15,
    },
    journalPrompt: "Kdybych mohl/a poslat zprávu sobě na začátek půstu, co bych napsal/a?",
    quote: {
      text: "V tichu najdeme odpovědi, které hluk světa přehlušil.",
      author: "Tomáš Baťa",
    },
    bodyProcesses: [
      { process: "Kmenové buňky", description: "Tělo produkuje nové kmenové buňky pro obnovu tkání", icon: "🧬" },
      { process: "Reset imunity", description: "Kompletní obnova imunitního systému", icon: "🛡️" },
      { process: "Protizánětlivý efekt", description: "CRP a IL-6 klesají o 50-70 %", icon: "💊" },
      { process: "Inzulínová citlivost", description: "Buňky reagují na inzulín mnohem lépe", icon: "📈" },
    ],
    mascotMood: "calm",
  },
  {
    id: "phase-96-120",
    hourStart: 96,
    hourEnd: 120,
    title: "Den 5 — Dokončení a oslava",
    shortTitle: "Den 5",
    icon: "🏆",
    color: "from-yellow-400 to-gold-500",
    body: {
      title: "Peak benefity — poslední den",
      description:
        "Maximální spalování tuků, kompletní reset imunitního systému, hluboká buněčná regenerace. Tělo je v optimálním stavu autofagie. Inzulínová citlivost je výrazně zlepšena.",
    },
    feelings: {
      physical: [
        "Téměř žádný hlad",
        "Stabilní energie",
        "Čistá pleť",
        "Lepší zrak a sluch",
      ],
      mental: [
        "Hluboký vhled",
        "Sebevědomí",
        "Nový vztah k jídlu",
        "Pocit dokončení",
      ],
    },
    tips: [
      "Připravte se na refeeding — NENÁJEZTE SE naráz!",
      "Zítra: kostní vývar, pak ovoce, zelenina",
      "Oslavte tento úspěch — dokázali jste něco mimořádného",
      "Zapište si závěrečné pocity do deníku",
    ],
    drinks: [
      "Voda s elektrolyty",
      "Bylinkový čaj",
      "Čistá voda",
    ],
    warnings: [
      "DŮLEŽITÉ: Správný refeeding je klíčový! Nejezte tuhá jídla ihned.",
      "Den 6: Kostní vývar, ovocné šťávy",
      "Den 7: Ovoce, zelenina, lehká jídla",
      "Teprve den 8+: Normální strava postupně",
    ],
    mascotMessage:
      "DOKÁZAL/A JSI TO! 5 dní. Jen voda. Jsi absolutní šampion! Jsem na tebe neuvěřitelně hrdá!",
    fatBurn: {
      male: "~1.5-2.0 kg čistého tuku celkem (+ vodní váha)",
      female: "~1.3-1.7 kg čistého tuku celkem (+ vodní váha)",
    },
    mentalJourney:
      "Hluboký vhled, nový vztah k jídlu a tělu. Sebevědomí a pocit úspěchu.",
    science: {
      insulin: "Minimální — nejlepší inzulínová citlivost za celý půst",
      glucagon: "Stabilní — tělo je v rovnováze",
      hgh: "Na 400-500 % — ochrana svalové hmoty je maximální",
      cortisol: "Normální — tělo je v klidu",
      ketones: "5.0-7.0 mmol/L",
      autophagy: 100,
      inflammation: 85,
    },
    didYouKnow: [
      "Po 5 dnech půstu máte prokazatelně nový imunitní systém — staré poškozené buňky byly nahrazeny novými.",
      "Inzulínová citlivost je nyní nejlepší, jakou vaše tělo pamatuje — využijte to a jezte zdravě i po půstu.",
      "Studie ukazují, že opakovaný 5denní půst 2-3× ročně může prodloužit život o 5-10 let.",
    ],
    difficulty: 2,
    challenge: {
      title: "Rituál dokončení",
      description:
        "Napište si 3 věci, které jste se během půstu naučili. 3 věci, za které jste vděční. A 1 závazek, jak změníte svůj vztah k jídlu. Přečtěte si to nahlas.",
      type: "gratitude",
      durationMinutes: 10,
    },
    journalPrompt: "Co mě tento půst naučil o mně samém? Jak chci žít dál?",
    quote: {
      text: "Nejde o to, co jíme. Jde o to, kým se stáváme.",
      author: "Mahatma Gándhí",
    },
    bodyProcesses: [
      { process: "Maximální autofagie", description: "Buněčná recyklace na absolutním vrcholu", icon: "♻️" },
      { process: "Nový imunitní systém", description: "Kompletně obnovené bílé krvinky", icon: "🛡️" },
      { process: "Inzulínová citlivost", description: "Buňky reagují na inzulín jako nikdy předtím", icon: "📈" },
      { process: "Epigenetické změny", description: "Některé geny spojené s dlouhověkostí se aktivují", icon: "🧬" },
    ],
    mascotMood: "celebrating",
  },
];

export const CHECKLIST_ITEMS = [
  { id: "doctor", label: "Konzultoval/a jsem to s lékařem" },
  { id: "electrolytes", label: "Mám připravené elektrolyty (sodík, draslík, hořčík)" },
  { id: "schedule", label: "Mám volný týden bez náročných povinností" },
  { id: "water", label: "Mám dostatek čisté vody" },
  { id: "support", label: "Řekl/a jsem blízkým o svém plánu" },
  { id: "scale", label: "Zvážil/a jsem se na začátku" },
  { id: "diary", label: "Mám deník / místo na zápisky" },
  { id: "no-contraindication", label: "Nemám kontraindikace (těhotenství, cukrovka, podváha, poruchy příjmu potravy)" },
];
