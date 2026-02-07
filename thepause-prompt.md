# PROMPT PRO CLAUDE CODE TERMINÁL — PROJEKT THEPAUSE.CZ

> **Zkopíruj celý text níže a vlož do terminálu s Claude Code ve složce `web-pusty`.**

---

```
Jsi senior webmaster a full-stack vývojář. Tvým úkolem je vytvořit kompletní produkční webovou aplikaci ve složce ./web-pusty pro projekt ThePause.cz — chytrý průvodce 5denním vodním půstem.

## PŘEHLED PROJEKTU

**Název:** ThePause.cz — Chytrý průvodce 5denním půstem
**Doména (budoucí):** thepause.cz
**Jazyk:** kompletně v češtině
**Účel:** Prodej a zpřístupnění interaktivního edukačního průvodce 5denním vodním půstem (pouze voda). Nejde o zdravotnickou službu — jde o edukační wellness program / podporu změny životního stylu.

## TECHNICKÝ STACK

- **Frontend:** Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Framer Motion (animace)
- **Backend:** Next.js API routes
- **Databáze:** PostgreSQL s Prisma ORM
- **Auth:** NextAuth.js (email + heslo, případně Google)
- **Platby:** Stripe (připraveno na napojení — Apple Pay, kartou, QR kód pro bankovní převod)
- **Admin:** Vlastní admin dashboard
- **SEO:** next-seo, structured data, sitemap, robots.txt
- **Analytika:** připraveno na Google Analytics 4, Meta Pixel

## STRUKTURA WEBU — STRÁNKY A FUNKCE

### 1. VEŘEJNÁ LANDING PAGE (hlavní prodejní stránka)
Maximálně konverzní stránka, která musí:
- Okamžitě sdělit, o co jde: "5 dní. Jen voda. Tvoje restart tlačítko." nebo podobný silný headline
- Obsahovat hero sekci s animovanou vizualizací 5denní timeline (hodiny → dny)
- Interaktivní preview: uživatel vidí na timeline co se děje v těle v jednotlivých fázích (ketóza, autofagie, spalování tuků) — ale detaily jsou zamčené (blur/lock ikona) → motivace k nákupu
- Sekce "Pro koho je to" s variantami:
  - 🧠 Mentální reset / očista
  - 🔥 Hubnutí a spalování tuků  
  - 💪 Fyzická regenerace
  - 🧘 Vědomý půst / spirituální rozměr
- Sekce s benefity (ikony + krátké texty + animace při scrollu)
- Sekce s čísly / statistikami (kolik lidí dokončilo, průměrný úbytek, atd. — placeholder data)
- Social proof sekce (testimonials — placeholder)
- FAQ accordion
- Sticky CTA tlačítko "Začít průvodce za 199 Kč"
- Cenová sekce:
  - **Základní průvodce:** 199 Kč
  - **Odznak + vyhodnocení po dokončení:** příplatek 99 Kč
- Urgency / scarcity prvky (kognitivní zkreslení):
  - Odpočet "Akce platí do..."
  - "Právě si prohlíží X lidí"
  - "Posledních Y míst za tuto cenu"  
  - Kotvení ceny (přeškrtnutá vyšší cena)
  - Loss aversion: "Každý den bez půstu je promarněná příležitost..."
- **MASKOT:** Sympatická animovaná postava (SVG/Lottie) — přátelský průvodce, parťák na cestu půstem. Objevuje se na celém webu, komentuje, povzbuzuje. Navrhni jako minimalistickou friendly postavu (např. usměvavá kapka vody s očima, nebo malý mnich/jogín). Maskot má jméno — navrhni vhodné české jméno.

### 2. REGISTRACE / PŘIHLÁŠENÍ
- Email + heslo nebo Google OAuth
- Po registraci redirect na platební bránu

### 3. PLATEBNÍ FLOW
- Stripe Checkout Session (připraveno na napojení):
  - Apple Pay
  - Platba kartou
  - QR kód / bankovní převod (Czech-specific)
- Po úspěšné platbě → aktivace přístupu k průvodci
- Webhook endpoint pro Stripe události

### 4. PLACENÝ PRŮVODCE — HLAVNÍ PRODUKT (po zaplacení 199 Kč)
Toto je srdce aplikace. Musí být vizuálně nádherné, interaktivní a informačně bohaté.

#### 4a. INTERAKTIVNÍ TIMELINE (hlavní navigace průvodcem)
- Horizontální nebo vertikální timeline: Hodina 0 → Hodina 120 (5 dní)
- Klíčové milníky na timeline s ikonami a animacemi:
  - **0-4h:** Trávení posledního jídla
  - **4-8h:** Přechod na glukózu z jater
  - **8-12h:** Začátek glykogenolýzy
  - **12-18h:** Počátek ketózy, první nepříjemné pocity (bolest hlavy, hlad)
  - **18-24h:** Ketóza se prohlubuje, tělo přepíná na tuky
  - **24-48h:** Nejtěžší fáze — "stěna". Silný hlad, únava, podrážděnost
  - **48-72h:** Autofagie startuje naplno, hlad paradoxně klesá
  - **72-96h:** Hluboká autofagie, mentální jas, energie se vrací
  - **96-120h:** Peak benefity, buněčná regenerace, maximální spalování

- **Po kliknutí na každou fázi** se otevře detail panel s:
  - Co se děje v těle (biologické procesy, ilustrace)
  - Jaké budu mít pocity (fyzické i psychické)
  - Praktické tipy: jak řešit nepříjemné pocity (elektrolyty, teplá voda, procházka...)
  - Doporučené tekutiny pro tuto fázi
  - Kdy zvážit ukončení půstu (varovné signály)
  - Motivační zpráva od maskota

#### 4b. VARIANTY PRŮVODCE (uživatel si vybere při vstupu)
Podle pohlaví:
- **Pro muže** — specifika mužského metabolismu, testosteron, svalová hmota
- **Pro ženy** — hormonální cyklus, specifická doporučení, kontraindikace

Podle cíle:
- **Hubnutí** → vizualizace: animovaný ukazatel kolik tuku cca zmizí každý den (graficky — silueta těla která se mění, nebo progress bar s kg). Cca hodnoty:
  - Den 1: ~0.2-0.3 kg tuku
  - Den 2: ~0.3-0.4 kg tuku  
  - Den 3: ~0.3-0.4 kg tuku
  - Den 4: ~0.3-0.4 kg tuku
  - Den 5: ~0.3-0.4 kg tuku
  Celkem cca 1.5-2 kg čistého tuku (+ vodní váha)

- **Mentální očista** → vizualizace psychických a mentálních dopadů po dnech:
  - Den 1: Konfrontace s návyky, "proč to dělám?"
  - Den 2: Frustrece, emoční vlny, detox mysli
  - Den 3: Zlom — klid, jasnost
  - Den 4: Flow stav, kreativita, vděčnost
  - Den 5: Hluboký vhled, nový vztah k jídlu a tělu

- **Fyzická regenerace** → zaměření na autofagii, buněčnou obnovu, imunitu

#### 4c. PRAKTICKÉ SEKCE
- **Checklist před půstem** (interaktivní, zaškrtávací)
- **Co pít:** voda, minerálka, bylinkové čaje, černý čaj/káva (diskutabilní), elektrolyty (sodík, draslík, hořčík) — s přesnými dávkami
- **Varovné signály:** kdy přestat (mdloby, silná srdeční arytmie, atd.)
- **Jak správně půst ukončit** (refeeding protokol — den 6, 7)
- **Deník půstu** — uživatel si může zapisovat poznámky ke každému dni

#### 4d. ODZNAK A VYHODNOCENÍ (příplatek 99 Kč)
- Po dokončení 5 dní → uživatel klikne "Dokončil jsem!"
- Vygeneruje se personalizovaný certifikát / odznak (graficky krásný, shareable na sociální sítě)
- Celkové vyhodnocení: souhrn co tělo prošlo, co uživatel získal
- Možnost sdílet na sociální sítě

### 5. ADMIN DASHBOARD (/admin)
Přístup pouze pro admina (role-based).

- **Dashboard:** přehled objednávek, tržby, počet uživatelů, konverzní rate
- **Objednávky:** seznam všech objednávek, stav platby, filtrování
- **Uživatelé:** seznam registrovaných, kdo zaplatil, kdo dokončil půst
- **Nastavení cen:** možnost měnit cenu průvodce (default 199 Kč) a příplatek za odznak (default 99 Kč)
- **Obsah:** editace textů na landing page (CMS-like)
- **Analytika:** napojení na GA4 dashboard, základní metriky
- **SEO nastavení:** meta titulky, popisy pro jednotlivé stránky
- **Discount kódy:** vytváření slevových kódů

### 6. SEO & TECHNICKÉ

- Všechny stránky optimalizované pro SEO:
  - Meta title, description, OG tags
  - Structured data (Product, FAQPage, WebApplication)
  - Sitemap.xml, robots.txt
  - Semantic HTML
- Klíčová slova: průvodce půstem, 5denní půst, vodní půst, jak držet půst, autofagie, hubnutí půstem, detox půstem
- Rychlost: optimalizované obrázky, lazy loading, code splitting
- Responzivní design (mobile-first)
- PWA ready (manifest.json, service worker)

## PRÁVNÍ DISCLAIMER — MUSÍ BÝT VŠUDE VIDITELNÝ

Na každé stránce (footer + speciální banner) musí být:

```
⚠️ DŮLEŽITÉ UPOZORNĚNÍ
Obsah tohoto webu má výhradně informační a vzdělávací charakter.
Nejedná se o zdravotnickou službu, lékařské doporučení ani náhradu odborné lékařské péče.
Před zahájením jakéhokoli půstu nebo změny stravovacích návyků se vždy poraďte se svým lékařem.
Provozovatel webu nenese odpovědnost za zdravotní komplikace vzniklé nesprávnou interpretací obsahu nebo neodhadnutím vlastních tělesných signálů.
Osoby s chronickým onemocněním, těhotné a kojící ženy, děti a mladiství by neměly půst provádět bez lékařského dohledu.
```

Taktéž musí být v:
- Obchodních podmínkách
- Checkbox při registraci: "Potvrzuji, že jsem se seznámil/a s upozorněním a beru na vědomí, že obsah má edukační charakter."

## DESIGN SMĚRNICE

- **Barevná paleta:** Tmavě modrá / teal + bílá + zlaté akcenty (premium feel). Gradient přechody. Dark mode varianta.
- **Font:** Inter nebo podobný moderní sans-serif
- **Animace:** Subtle, profesionální — Framer Motion. Scroll-triggered reveals, hover efekty, smooth transitions.
- **Ilustrace:** Moderní, minimalistické SVG ilustrace (orgány, tělo, mozek, buňky)
- **Maskot:** Přítomný na každé stránce, animovaný, s speech bubbles s tipy

## STRUKTURA SOUBORŮ

Vytvoř kompletní strukturu:
```
web-pusty/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── images/
│   └── mascot/
├── src/
│   ├── app/
│   │   ├── (public)/          # veřejné stránky
│   │   │   ├── page.tsx       # landing page
│   │   │   ├── layout.tsx
│   │   │   └── faq/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (protected)/       # placený obsah
│   │   │   ├── pruvodce/
│   │   │   │   ├── page.tsx   # hlavní timeline
│   │   │   │   ├── [phase]/   # detail fáze
│   │   │   │   └── denik/     # deník pústu
│   │   │   └── odznak/
│   │   ├── admin/
│   │   │   ├── page.tsx       # dashboard
│   │   │   ├── objednavky/
│   │   │   ├── uzivatele/
│   │   │   ├── nastaveni/
│   │   │   └── seo/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── stripe/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── landing/           # komponenty landing page
│   │   ├── guide/             # komponenty průvodce
│   │   ├── admin/             # admin komponenty
│   │   ├── mascot/            # maskot komponenta
│   │   ├── ui/                # sdílené UI prvky
│   │   └── layout/            # header, footer, nav
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── stripe.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── data/
│   │   └── fasting-phases.ts  # všechna data o fázích půstu
│   ├── hooks/
│   └── types/
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

## POSTUP PRÁCE

1. Inicializuj Next.js projekt s TypeScript a Tailwind
2. Nastav Prisma schema (User, Order, Payment, Setting, DiscountCode)
3. Vytvoř kompletní landing page se všemi sekcemi
4. Vytvoř auth flow (registrace, přihlášení)
5. Vytvoř platební flow (Stripe mock/připraveno)
6. Vytvoř interaktivní průvodce s timeline
7. Vytvoř varianty (muži/ženy, hubnutí/mentální/fyzické)
8. Vytvoř odznak a vyhodnocení funkci
9. Vytvoř admin dashboard
10. SEO optimalizace
11. Otestuj všechny flows

## DŮLEŽITÉ

- Veškerý obsah o půstu čerpej z ověřených zdrojů (vyhledej na webu aktuální informace o vodním půstu, autofagii, ketóze, bezpečnostních doporučeních)
- Piš kód bez chyb, profesionálně, s TypeScript typy
- Všechny texty v češtině
- Mobile-first responsive design
- Každá komponenta musí být funkční a vizuálně dokončená
- Používej české názvy proměnných v UI textech, anglické v kódu

Začni inicializací projektu a postupně vytvářej všechny části. Pracuj systematicky, soubor po souboru. U každého souboru piš kompletní kód, žádné placeholder komentáře typu "// TODO" nebo "// doplnit později".
```

---

## JAK POUŽÍT

1. Otevři terminál s Claude Code
2. Přejdi do složky projektu: `cd web-pusty`
3. Zkopíruj a vlož celý text mezi \`\`\` bloky výše
4. Claude začne systematicky vytvářet projekt

## TIPY

- Pokud se Claude zastaví, napiš: `Pokračuj kde jsi skončil.`
- Pokud chceš přeskočit na konkrétní část: `Teď vytvoř admin dashboard.`
- Pro kontrolu: `Ukaž mi strukturu projektu a seznam hotových souborů.`
- Pokud je soubor moc velký a Claude ho ořízne: `Dokonči soubor [název souboru].`
