import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obchodní podmínky | The-Pulse.cz",
  description: "Obchodní podmínky služby The-Pulse.cz — průvodce 5denním vodním půstem.",
};

const sections = [
  { id: "uvod", label: "1. Úvodní ustanovení" },
  { id: "definice", label: "2. Definice pojmů" },
  { id: "objednavka", label: "3. Objednávka a uzavření smlouvy" },
  { id: "cena", label: "4. Cena a platební podmínky" },
  { id: "dodani", label: "5. Dodání digitálního obsahu" },
  { id: "odstoupeni", label: "6. Odstoupení od smlouvy" },
  { id: "reklamace", label: "7. Reklamace" },
  { id: "udaje", label: "8. Ochrana osobních údajů" },
  { id: "zdravi", label: "9. Vyloučení odpovědnosti za zdravotní dopady" },
  { id: "zaver", label: "10. Závěrečná ustanovení" },
];

export default function ObchodniPodminkyPage() {
  return (
    <div className="min-h-screen gradient-bg-light">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-sm text-teal-600 hover:text-teal-800 mb-6 inline-block"
        >
          ← Zpět na hlavní stránku
        </Link>

        <h1 className="text-3xl font-bold text-navy-900 mb-8">
          Obchodní podmínky
        </h1>

        <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8 space-y-6 text-sm text-navy-700 leading-relaxed">
          <p className="text-xs text-navy-400">
            Poslední aktualizace: 8. února 2026
          </p>

          {/* Section navigation */}
          <nav className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold text-navy-900 mb-2 uppercase tracking-wider">Obsah</p>
            <ol className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-xs text-teal-600 hover:text-teal-800 hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="uvod">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              1. Úvodní ustanovení
            </h2>
            <p>
              Tyto obchodní podmínky (dále jen „Podmínky") upravují práva a povinnosti
              mezi provozovatelem webové aplikace The-Pulse.cz (dále jen „Poskytovatel")
              a uživatelem služby (dále jen „Uživatel").
            </p>
            <p className="mt-2">
              Poskytovatelem je fyzická osoba podnikající dle živnostenského zákona
              se sídlem v České republice. Kontaktní e-mail: the-pause@seznam.cz.
            </p>
          </section>

          <section id="definice">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              2. Definice pojmů
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Služba</strong> — přístup k digitálnímu interaktivnímu průvodci 5denním vodním půstem prostřednictvím webové aplikace The-Pulse.cz.</li>
              <li><strong>Průvodce</strong> — interaktivní digitální obsah poskytovaný v rámci Služby, obsahující informace, tipy a doporučení týkající se vodního půstu.</li>
              <li><strong>Uživatel</strong> — fyzická osoba, která si objednala a používá Službu.</li>
              <li><strong>Poskytovatel</strong> — provozovatel webové aplikace The-Pulse.cz.</li>
              <li><strong>Certifikát</strong> — personalizovaný digitální dokument vystavený po dokončení půstu (součást Premium plánu).</li>
            </ul>
          </section>

          <section id="objednavka">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              3. Objednávka a uzavření smlouvy
            </h2>
            <p>
              Uživatel si objednává přístup k Průvodci prostřednictvím objednávkového
              formuláře na webu. Smlouva je uzavřena okamžikem úspěšného zpracování
              platby. Dostupné plány:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Základní průvodce</strong> — jednorázová platba 199 Kč
              </li>
              <li>
                <strong>Průvodce + Certifikát</strong> — jednorázová platba 298 Kč
              </li>
            </ul>
          </section>

          <section id="cena">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              4. Cena a platební podmínky
            </h2>
            <p>
              Ceny jsou uvedeny v českých korunách (CZK) včetně DPH. Platba probíhá
              prostřednictvím platební brány Stripe. Poskytovatel si vyhrazuje právo
              ceny kdykoli změnit, přičemž změna nemá vliv na již uhrazené objednávky.
            </p>
          </section>

          <section id="dodani">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              5. Dodání digitálního obsahu
            </h2>
            <p>
              Přístup ke Službě je aktivován ihned po úspěšném zpracování platby.
              Uživatel obdrží přístup prostřednictvím svého uživatelského účtu na
              webu The-Pulse.cz. Obsah je dostupný online bez časového omezení.
            </p>
          </section>

          <section id="odstoupeni">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              6. Odstoupení od smlouvy
            </h2>
            <p>
              Vzhledem k tomu, že se jedná o digitální obsah dodávaný online,
              Uživatel souhlasí se započetím plnění před uplynutím lhůty pro
              odstoupení od smlouvy a bere na vědomí, že tím ztrácí právo na
              odstoupení od smlouvy dle § 1837 písm. l) občanského zákoníku.
            </p>
            <p className="mt-2">
              V případě technických problémů bránících přístupu ke službě má Uživatel
              právo na vrácení platby. Žádost je třeba zaslat na the-pause@seznam.cz
              do 14 dnů od zakoupení.
            </p>
          </section>

          <section id="reklamace">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              7. Reklamace
            </h2>
            <p>
              Reklamace se řídí platnými právními předpisy České republiky. V případě
              vad digitálního obsahu kontaktujte Poskytovatele na e-mailu
              the-pause@seznam.cz. Poskytovatel se zavazuje reklamaci vyřídit do 30 dnů
              od jejího přijetí.
            </p>
          </section>

          <section id="udaje">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              8. Ochrana osobních údajů
            </h2>
            <p>
              Zpracování osobních údajů se řídí samostatným dokumentem{" "}
              <Link
                href="/ochrana-udaju"
                className="text-teal-600 hover:text-teal-800 underline"
              >
                Ochrana osobních údajů
              </Link>
              , který je nedílnou součástí těchto Podmínek.
            </p>
          </section>

          {/* KEY SECTION: Health disclaimer */}
          <section id="zdravi">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 -mx-2">
              <h2 className="text-lg font-bold text-red-900 mb-4">
                9. Vyloučení odpovědnosti za zdravotní dopady
              </h2>

              <div className="space-y-4 text-sm text-red-900">
                <p>
                  Veškerý obsah Průvodce má <strong>výhradně edukativní a informační charakter</strong>.
                  Průvodce <strong>nenahrazuje</strong> lékařskou konzultaci, diagnózu ani léčbu.
                </p>

                <div>
                  <p className="font-bold mb-2">
                    Poskytovatel webu se výslovně zříká jakékoliv odpovědnosti za:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Negativní zdravotní dopady vzniklé v souvislosti s držením vodního půstu</li>
                    <li>Nesprávné držení půstu</li>
                    <li>Podcenění vlastního zdravotního stavu Uživatelem</li>
                    <li>Ignorování varovných signálů těla</li>
                    <li>Nekonzultování půstu s lékařem před zahájením</li>
                    <li>Pokračování v půstu navzdory zdravotním komplikacím</li>
                  </ul>
                </div>

                <div className="bg-red-100 rounded-lg p-4 border border-red-200">
                  <p className="font-bold mb-2">
                    Uživatel bere na vědomí a souhlasí, že:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vodní půst provádí <strong>zcela na vlastní riziko a odpovědnost</strong></li>
                    <li>Je <strong>povinen konzultovat</strong> záměr držet vodní půst se svým lékařem <strong>před zahájením</strong></li>
                    <li>Je <strong>povinen ihned přerušit</strong> půst při jakýchkoliv zdravotních obtížích</li>
                    <li>Provozovatel <strong>nenese odpovědnost</strong> za jakékoliv zdravotní komplikace vzniklé v souvislosti s používáním Služby</li>
                  </ul>
                </div>

                <p>
                  Provozovatel <strong>neposkytuje</strong> lékařské, nutriční ani jiné
                  zdravotnické poradenství. Uživatel zakoupením Služby prohlašuje, že
                  nemá zdravotní kontraindikace pro držení vodního půstu, nebo že svůj
                  zdravotní stav konzultoval s ošetřujícím lékařem.
                </p>

                <p>
                  Osoby s chronickým onemocněním, těhotné a kojící ženy, děti a mladiství
                  by neměly vodní půst provádět bez lékařského dohledu. Osobám s historií
                  poruch příjmu potravy se vodní půst nedoporučuje.
                </p>
              </div>
            </div>
          </section>

          <section id="zaver">
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              10. Závěrečná ustanovení
            </h2>
            <p>
              Tyto Podmínky se řídí právním řádem České republiky. Případné spory
              budou řešeny příslušnými soudy České republiky. Poskytovatel si
              vyhrazuje právo tyto Podmínky kdykoli změnit. Aktuální verze je vždy
              dostupná na této stránce. O podstatných změnách budou registrovaní
              uživatelé informováni e-mailem.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>DŮLEŽITÉ UPOZORNĚNÍ:</strong> Obsah webu The-Pulse.cz má
              výhradně informační a vzdělávací charakter. Nejedná se o
              zdravotnickou službu, lékařské doporučení ani náhradu odborné
              lékařské péče. Před zahájením jakéhokoli půstu se vždy poraďte se
              svým lékařem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
