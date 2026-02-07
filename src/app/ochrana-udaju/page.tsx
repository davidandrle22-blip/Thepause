import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | ThePause.cz",
  description: "Zásady ochrany osobních údajů služby ThePause.cz.",
};

export default function OchranaUdajuPage() {
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
          Ochrana osobních údajů
        </h1>

        <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8 space-y-6 text-sm text-navy-700 leading-relaxed">
          <p className="text-xs text-navy-400">
            Poslední aktualizace: 1. února 2026
          </p>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              1. Správce osobních údajů
            </h2>
            <p>
              Správcem osobních údajů je provozovatel webové aplikace ThePause.cz
              (dále jen „Správce"). Kontaktní e-mail: the-pause@seznam.cz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              2. Jaké údaje zpracováváme
            </h2>
            <p>V rámci poskytování služby zpracováváme následující osobní údaje:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Registrační údaje:</strong> jméno, e-mailová adresa, heslo
                (uloženo v zašifrované podobě)
              </li>
              <li>
                <strong>Profilové údaje:</strong> pohlaví, cíl půstu (volitelné)
              </li>
              <li>
                <strong>Platební údaje:</strong> zpracovává výhradně platební brána
                Stripe — Správce neukládá čísla platebních karet
              </li>
              <li>
                <strong>Údaje o používání:</strong> záznamy o dokončených fázích
                průvodce, zápisky v deníku
              </li>
              <li>
                <strong>Technické údaje:</strong> IP adresa, typ prohlížeče,
                operační systém (prostřednictvím analytických nástrojů)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              3. Účel zpracování
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Poskytování přístupu k placené službě (Průvodce)</li>
              <li>Zpracování plateb a vedení účetní evidence</li>
              <li>Komunikace s uživatelem (podpora, oznámení)</li>
              <li>Zlepšování kvality služby a uživatelského zážitku</li>
              <li>Plnění zákonných povinností</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              4. Právní základ zpracování
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b) GDPR) —
                zpracování nezbytné pro poskytnutí služby
              </li>
              <li>
                <strong>Oprávněný zájem</strong> (čl. 6 odst. 1 písm. f) GDPR) —
                analytika, zlepšování služby, prevence podvodů
              </li>
              <li>
                <strong>Souhlas</strong> (čl. 6 odst. 1 písm. a) GDPR) — marketing,
                cookies (pokud je vyžadován)
              </li>
              <li>
                <strong>Zákonná povinnost</strong> (čl. 6 odst. 1 písm. c) GDPR) —
                účetní a daňové povinnosti
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              5. Doba uchovávání údajů
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Účetní údaje:</strong> 10 let dle zákona o účetnictví
              </li>
              <li>
                <strong>Uživatelský účet:</strong> po dobu existence účtu + 30 dní
                po smazání
              </li>
              <li>
                <strong>Analytické údaje:</strong> max. 26 měsíců
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              6. Příjemci údajů
            </h2>
            <p>Osobní údaje mohou být sdíleny s těmito třetími stranami:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Stripe, Inc.</strong> — zpracování plateb (EU/USA, Privacy
                Shield / SCC)
              </li>
              <li>
                <strong>Vercel, Inc.</strong> — hosting webové aplikace (EU/USA)
              </li>
              <li>
                <strong>Google LLC</strong> — analytika (Google Analytics 4),
                pokud je aktivována
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              7. Vaše práva
            </h2>
            <p>Jako subjekt údajů máte právo na:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Přístup</strong> — získat informace o zpracovávaných údajích
              </li>
              <li>
                <strong>Opravu</strong> — požadovat opravu nepřesných údajů
              </li>
              <li>
                <strong>Výmaz</strong> — požadovat smazání údajů („právo být
                zapomenut")
              </li>
              <li>
                <strong>Omezení zpracování</strong> — požadovat dočasné omezení
              </li>
              <li>
                <strong>Přenositelnost</strong> — získat údaje ve strukturovaném
                formátu
              </li>
              <li>
                <strong>Námitku</strong> — vznést námitku proti zpracování
              </li>
              <li>
                <strong>Odvolání souhlasu</strong> — kdykoli odvolat udělený souhlas
              </li>
            </ul>
            <p className="mt-2">
              Pro uplatnění těchto práv nás kontaktujte na the-pause@seznam.cz.
              Na žádost odpovíme do 30 dnů.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              8. Zabezpečení údajů
            </h2>
            <p>
              Přijímáme přiměřená technická a organizační opatření k ochraně
              osobních údajů, včetně:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Šifrování komunikace (HTTPS/TLS)</li>
              <li>Hashování hesel (bcrypt)</li>
              <li>Zabezpečený přístup k databázi</li>
              <li>Pravidelné zálohy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              9. Stížnosti
            </h2>
            <p>
              Pokud se domníváte, že zpracování vašich osobních údajů porušuje
              nařízení GDPR, máte právo podat stížnost u dozorového úřadu — Úřadu
              pro ochranu osobních údajů (
              <a
                href="https://www.uoou.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 underline"
              >
                www.uoou.cz
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              10. Změny dokumentu
            </h2>
            <p>
              Tento dokument může být průběžně aktualizován. Aktuální verze je vždy
              dostupná na této stránce. O podstatných změnách budou registrovaní
              uživatelé informováni e-mailem.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
