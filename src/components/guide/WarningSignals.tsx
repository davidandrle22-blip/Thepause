export function WarningSignals() {
  const signals = [
    "Silné závratě, které neustávají",
    "Mdloby nebo ztráta vědomí",
    "Srdeční arytmie nebo bušení srdce",
    "Silná bolest (hlavy, břicha, na hrudi)",
    "Zrakové nebo sluchové poruchy",
    "Silné křeče",
    "Dezorientace nebo zmatenost",
    "Neschopnost udržet tekutiny",
  ];

  return (
    <div className="bg-red-600 rounded-2xl p-6 my-6 text-white">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span className="text-xl">🚨</span>
        KDY IHNED UKONČIT PŮST
      </h3>
      <p className="text-sm text-red-100 mb-4">
        Pokud zaznamenáte kterýkoli z následujících příznaků, <strong>ihned ukončete půst</strong> a
        vyhledejte lékařskou pomoc:
      </p>
      <ul className="space-y-2">
        {signals.map((signal) => (
          <li key={signal} className="flex items-start gap-2 text-sm">
            <span className="text-red-200 flex-shrink-0">🚨</span>
            {signal}
          </li>
        ))}
      </ul>
    </div>
  );
}
