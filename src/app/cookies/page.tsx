import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies | The-Pulse.cz",
  description: "Informace o používání cookies na webu The-Pulse.cz.",
};

export default function CookiesPage() {
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
          Zásady používání cookies
        </h1>

        <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8 space-y-6 text-sm text-navy-700 leading-relaxed">
          <p className="text-xs text-navy-400">
            Poslední aktualizace: 1. února 2026
          </p>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              1. Co jsou cookies
            </h2>
            <p>
              Cookies jsou malé textové soubory, které se ukládají do vašeho
              prohlížeče při návštěvě webových stránek. Slouží k zajištění správného
              fungování webu, zapamatování vašich preferencí a analýze návštěvnosti.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              2. Jaké cookies používáme
            </h2>

            <div className="space-y-4 mt-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-bold text-green-800 mb-1">
                  Nezbytné cookies (vždy aktivní)
                </h3>
                <p className="text-green-700 text-xs">
                  Tyto cookies jsou nutné pro základní fungování webu. Bez nich by
                  nefungovalo přihlášení, platby ani navigace.
                </p>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-green-600">
                        <th className="pb-1 pr-4">Název</th>
                        <th className="pb-1 pr-4">Účel</th>
                        <th className="pb-1">Expirace</th>
                      </tr>
                    </thead>
                    <tbody className="text-green-700">
                      <tr>
                        <td className="pr-4 py-1">next-auth.session-token</td>
                        <td className="pr-4">Přihlášení uživatele</td>
                        <td>30 dní</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">next-auth.csrf-token</td>
                        <td className="pr-4">Ochrana proti CSRF útokům</td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">
                          next-auth.callback-url
                        </td>
                        <td className="pr-4">Přesměrování po přihlášení</td>
                        <td>Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-800 mb-1">
                  Analytické cookies (volitelné)
                </h3>
                <p className="text-blue-700 text-xs">
                  Pomáhají nám porozumět, jak návštěvníci používají web. Data jsou
                  anonymizována.
                </p>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-blue-600">
                        <th className="pb-1 pr-4">Název</th>
                        <th className="pb-1 pr-4">Účel</th>
                        <th className="pb-1">Expirace</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-700">
                      <tr>
                        <td className="pr-4 py-1">_ga</td>
                        <td className="pr-4">Google Analytics — rozlišení uživatelů</td>
                        <td>2 roky</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">_ga_*</td>
                        <td className="pr-4">Google Analytics — stav relace</td>
                        <td>2 roky</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="font-bold text-purple-800 mb-1">
                  Platební cookies
                </h3>
                <p className="text-purple-700 text-xs">
                  Cookies třetí strany nastavené platební bránou Stripe pro
                  bezpečné zpracování plateb.
                </p>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-purple-600">
                        <th className="pb-1 pr-4">Název</th>
                        <th className="pb-1 pr-4">Účel</th>
                        <th className="pb-1">Expirace</th>
                      </tr>
                    </thead>
                    <tbody className="text-purple-700">
                      <tr>
                        <td className="pr-4 py-1">__stripe_mid</td>
                        <td className="pr-4">Identifikace zařízení pro prevenci podvodů</td>
                        <td>1 rok</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">__stripe_sid</td>
                        <td className="pr-4">Identifikace relace pro prevenci podvodů</td>
                        <td>30 minut</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              3. LocalStorage
            </h2>
            <p>
              Kromě cookies používáme také localStorage prohlížeče pro ukládání:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Stavu dokončených fází průvodce</li>
              <li>Splněných výzev</li>
              <li>Zápisků v deníku (před synchronizací se serverem)</li>
            </ul>
            <p className="mt-2">
              Tato data zůstávají pouze ve vašem prohlížeči a nejsou odesílána na
              server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              4. Správa cookies
            </h2>
            <p>
              Cookies můžete spravovat v nastavení svého prohlížeče. Máte možnost:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Přijmout všechny cookies</li>
              <li>Odmítnout volitelné cookies (analytické)</li>
              <li>Smazat existující cookies</li>
              <li>Nastavit upozornění před uložením nových cookies</li>
            </ul>
            <p className="mt-2">
              Upozorňujeme, že odmítnutí nezbytných cookies může omezit funkčnost
              webu (např. přihlášení nebude fungovat).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-navy-900 mb-3">
              5. Další informace
            </h2>
            <p>
              Podrobnosti o zpracování osobních údajů naleznete v dokumentu{" "}
              <Link
                href="/ochrana-udaju"
                className="text-teal-600 hover:text-teal-800 underline"
              >
                Ochrana osobních údajů
              </Link>
              . V případě dotazů nás kontaktujte na the-pause@seznam.cz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
