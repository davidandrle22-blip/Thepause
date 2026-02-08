"use client";

import { useState } from "react";

export function EmergencyButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
      >
        🆘 Potrebuji pomoc
      </button>
      {expanded && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
          <a
            href="tel:155"
            className="flex items-center gap-3 bg-white rounded-lg p-3 border border-red-200 hover:border-red-400 transition-colors"
          >
            <span className="text-2xl">🚑</span>
            <div>
              <div className="font-bold text-red-800 text-sm">155 — Zachranna sluzba</div>
              <div className="text-xs text-red-600">Zdravotni tisnovka</div>
            </div>
          </a>
          <a
            href="tel:112"
            className="flex items-center gap-3 bg-white rounded-lg p-3 border border-red-200 hover:border-red-400 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <div>
              <div className="font-bold text-red-800 text-sm">112 — Tisnovka</div>
              <div className="text-xs text-red-600">Jednotne evropske cislo tisnovcho volani</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
