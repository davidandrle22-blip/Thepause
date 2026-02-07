import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="34" viewBox="0 0 90 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 4C45 4 10 52 10 72C10 92 25 104 45 104C65 104 80 92 80 72C80 52 45 4 45 4Z" fill="#14b8a6" stroke="#5eead4" strokeWidth="2"/>
              </svg>
              <span className="text-lg font-bold text-teal-400">ThePause.cz</span>
            </div>
            <p className="text-sm text-gray-400">
              Interaktivní průvodce 5denním vodním půstem. Bezpečně, s odborným vedením.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm text-teal-400 mb-3">Průvodce</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#jak-to-funguje" className="hover:text-white transition-colors">Jak to funguje</a></li>
              <li><a href="#benefity" className="hover:text-white transition-colors">Benefity</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Časté dotazy</a></li>
              <li><a href="#cenik" className="hover:text-white transition-colors">Ceník</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-teal-400 mb-3">Právní</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/obchodni-podminky" className="hover:text-white transition-colors">Obchodní podmínky</Link></li>
              <li><Link href="/ochrana-udaju" className="hover:text-white transition-colors">Ochrana údajů</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-teal-400 mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@thepause.cz</li>
              <li>
                <a href="https://instagram.com/thepause.cz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Disclaimer */}
        <div className="bg-navy-800 rounded-lg p-4 mb-6 border border-yellow-700/30">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-gold-400">DŮLEŽITÉ UPOZORNĚNÍ: </strong>
            Obsah tohoto webu má výhradně informační a vzdělávací charakter.
            Nejedná se o zdravotnickou službu, lékařské doporučení ani náhradu odborné lékařské péče.
            Před zahájením jakéhokoli půstu nebo změny stravovacích návyků se vždy poraďte se svým lékařem.
            Provozovatel webu nenese odpovědnost za zdravotní komplikace vzniklé nesprávnou interpretací obsahu nebo neodhadnutím vlastních tělesných signálů.
            Osoby s chronickým onemocněním, těhotné a kojící ženy, děti a mladiství by neměly půst provádět bez lékařského dohledu.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} ThePause.cz — Všechna práva vyhrazena.</p>
          <p>Vytvořeno s láskou v ČR</p>
        </div>
      </div>
    </footer>
  );
}
