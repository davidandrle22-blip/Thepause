export function DisclaimerBox({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-3 mb-4 text-xs text-orange-800">
        <span className="font-bold">Upozorneni:</span> Tento obsah ma edukativni charakter.
        Provadite pust na vlastni odpovednost. Pri zdravotnich potizich ihned ukoncete pust.
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border-2 border-orange-400 rounded-2xl p-6 my-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div>
          <h3 className="font-bold text-orange-900 text-base mb-2">
            DULEZITE UPOZORNENI
          </h3>
          <p className="text-sm text-orange-800 mb-3">
            Tento pruvodce ma vyhradne edukativni a informacni charakter.
            Nenahrazuje odbornou lekarskou konzultaci.
          </p>
          <ul className="text-sm text-orange-800 space-y-1.5 list-disc list-inside">
            <li>
              Jakekoliv zdravotni komplikace vznikle v souvislosti s vodnim
              pustem <strong>nejsou</strong> odpovednosti provozovatele webu The-Pulse.cz
            </li>
            <li>
              Vodni pust provadite <strong>zcela na vlastni odpovednost</strong>
            </li>
            <li>
              <strong>Pred zahajenim</strong> pustu je nutne konzultovat svuj zamer s lekarem
            </li>
            <li>
              Pri <strong>jakychkoliv</strong> zdravotnich potizich ihned <strong>preruste</strong> pust
              a vyhledejte lekarskou pomoc
            </li>
            <li>
              Tento pruvodce <strong>neni</strong> nahradou za lekarskou konzultaci, diagnozu ani lecbu
            </li>
          </ul>
          <p className="text-xs text-orange-700 mt-3">
            Pokracovanim v pouzivani tohoto pruvodce potvrzujete, ze jste si vedomi techto podminek.
          </p>
        </div>
      </div>
    </div>
  );
}
