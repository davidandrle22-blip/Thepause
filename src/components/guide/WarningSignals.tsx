export function WarningSignals() {
  const signals = [
    "Silne zavrate ktere neustávají",
    "Mdloby nebo ztrata vedomi",
    "Srdecni arytmie nebo buseni srdce",
    "Silna bolest (hlavy, bricha, na hrudi)",
    "Zrakove nebo sluchove poruchy",
    "Silne krece",
    "Dezorientace nebo zmatenost",
    "Neschopnost udrzet tekutiny",
  ];

  return (
    <div className="bg-red-600 rounded-2xl p-6 my-6 text-white">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span className="text-xl">🚨</span>
        KDY IHNED UKONCIT PUST
      </h3>
      <p className="text-sm text-red-100 mb-4">
        Pokud zaznamenate kterykoli z nasledujicich priznaku, <strong>ihned ukoncete pust</strong> a
        vyhledejte lekarskou pomoc:
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
