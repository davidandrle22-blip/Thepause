import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obchodní podmínky | ThePause.cz",
  description: "Obchodní podmínky služby ThePause.cz — průvodce 5denním vodním půstem.",
};

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
            Poslední aktualizace: 1. února 2026
          </p>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              1. Úvodní ustanovení
            </h2>
            <p>
              Tyto obchodní podmínky (dále jen „Podmínky") upravují práva a povinnosti
              mezi provozovatelem webové aplikace ThePause.cz (dále jen „Poskytovatel")
              a uživatelem služby (dále jen „Uživatel").
            </p>
            <p className="mt-2">
              Poskytovatelem je fyzická osoba podnikající dle živnostenského zákona
              se sídlem v České republice. Kontaktní e-mail: info@thepause.cz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              2. Předmět služby
            </h2>
            <p>
              Předmětem služby je poskytnutí přístupu k digitálnímu interaktivnímu
              průvodci 5denním vodním půstem (dále jen „Průvodce"). Průvodce má
              výhradně informační a vzdělávací charakter.
            </p>
            <p className="mt-2">
              Služba <strong>není</strong> zdravotnickou službou, lékařským
              doporučením ani náhradou odborné lékařské péče. Uživatel bere na
              vědomí, že před zahájením půstu by měl konzultovat svůj zdravotní stav
              s lékařem.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              3. Objednávka a platba
            </h2>
            <p>
              Uživatel si objednává přístup k Průvodci prostřednictvím objednávkového
              formuláře na webu. Dostupné plány:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Základní průvodce</strong> — jednorázová platba 199 Kč
              </li>
              <li>
                <strong>Průvodce + Odznak</strong> — jednorázová platba 298 Kč
              </li>
            </ul>
            <p className="mt-2">
              Platba probíhá prostřednictvím platební brány Stripe. Přístup je
              aktivován ihned po úspěšném zpracování platby.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              4. Práva a povinnosti Uživatele
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Uživatel se zavazuje používat službu výhradně pro osobní účely.</li>
              <li>
                Uživatel nesmí sdílet přístupové údaje s třetími osobami ani
                kopírovat obsah Průvodce.
              </li>
              <li>
                Uživatel bere na vědomí, že provádí půst na vlastní odpovědnost a
                riziko.
              </li>
              <li>
                Uživatel je povinen ukončit půst, pokud se objeví varovné signály
                popsané v Průvodci (mdloby, silná srdeční arytmie, opakované zvracení
                apod.).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              5. Práva a povinnosti Poskytovatele
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Poskytovatel se zavazuje poskytnout přístup k Průvodci po úspěšné
                platbě.
              </li>
              <li>
                Poskytovatel nenese odpovědnost za zdravotní komplikace vzniklé
                v důsledku používání služby.
              </li>
              <li>
                Poskytovatel si vyhrazuje právo měnit obsah Průvodce za účelem
                zlepšení kvality služby.
              </li>
            </ul>
          </section>

          <section>
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
              právo na vrácení platby. Žádost je třeba zaslat na info@thepause.cz
              do 14 dnů od zakoupení.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              7. Odpovědnost a vyloučení záruk
            </h2>
            <p>
              Služba je poskytována „tak jak je" (as is). Poskytovatel neposkytuje
              žádné záruky ohledně výsledků používání služby. Poskytovatel nenese
              odpovědnost za:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Zdravotní komplikace vzniklé v důsledku provádění půstu
              </li>
              <li>
                Nesprávnou interpretaci obsahu Průvodce ze strany Uživatele
              </li>
              <li>
                Škody vzniklé neodhadnutím vlastních tělesných signálů
              </li>
            </ul>
          </section>

          <section>
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
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              9. Závěrečná ustanovení
            </h2>
            <p>
              Tyto Podmínky se řídí právním řádem České republiky. Případné spory
              budou řešeny příslušnými soudy České republiky. Poskytovatel si
              vyhrazuje právo tyto Podmínky kdykoli změnit. Aktuální verze je vždy
              dostupná na této stránce.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-8">
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>DŮLEŽITÉ UPOZORNĚNÍ:</strong> Obsah webu ThePause.cz má
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
