export function DisclaimerBox({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-3 mb-4 text-xs text-orange-800">
        <span className="font-bold">Upozornění:</span> Tento obsah má edukativní charakter.
        Provádějte půst na vlastní odpovědnost. Při zdravotních potížích ihned ukončete půst.
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border-2 border-orange-400 rounded-2xl p-6 my-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div>
          <h3 className="font-bold text-orange-900 text-base mb-2">
            DŮLEŽITÉ UPOZORNĚNÍ
          </h3>
          <p className="text-sm text-orange-800 mb-3">
            Tento průvodce má výhradně edukativní a informační charakter.
            Nenahrazuje odbornou lékařskou konzultaci.
          </p>
          <ul className="text-sm text-orange-800 space-y-1.5 list-disc list-inside">
            <li>
              Jakékoli zdravotní komplikace vzniklé v souvislosti s vodním
              půstem <strong>nejsou</strong> odpovědností provozovatele webu The-Pulse.cz
            </li>
            <li>
              Vodní půst provádíte <strong>zcela na vlastní odpovědnost</strong>
            </li>
            <li>
              <strong>Před zahájením</strong> půstu je nutné konzultovat svůj záměr s lékařem
            </li>
            <li>
              Při <strong>jakýchkoli</strong> zdravotních potížích ihned <strong>přerušte</strong> půst
              a vyhledejte lékařskou pomoc
            </li>
            <li>
              Tento průvodce <strong>není</strong> náhradou za lékařskou konzultaci, diagnózu ani léčbu
            </li>
          </ul>
          <p className="text-xs text-orange-700 mt-3">
            Pokračováním v používání tohoto průvodce potvrzujete, že jste si vědomi těchto podmínek.
          </p>
        </div>
      </div>
    </div>
  );
}
