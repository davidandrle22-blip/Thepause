"use client";

import { useState, useEffect } from "react";

const DAILY_ITEMS = [
  "Vypil/a jsem dostatek vody (min. 2–3 l)",
  "Odpočíval/a jsem dostatečně",
  "Změřil/a jsem si tlak/tep",
  "Zapsal/a jsem si své pocity",
  "Neměl/a jsem závažné příznaky",
];

export function DailyChecklist({ day }: { day: number }) {
  const lsKey = `the-pulse-daily-checklist-day-${day}`;
  const [checked, setChecked] = useState<boolean[]>(() => Array(DAILY_ITEMS.length).fill(false));

  useEffect(() => {
    try {
      const stored = localStorage.getItem(lsKey);
      if (stored) setChecked(JSON.parse(stored));
    } catch {}
  }, [lsKey]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(lsKey, JSON.stringify(next));
      return next;
    });
  };

  const completed = checked.filter(Boolean).length;

  return (
    <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4 my-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-navy-900">Denní checklist</h4>
        <span className="text-xs text-teal-600 font-medium">
          {completed}/{DAILY_ITEMS.length}
        </span>
      </div>
      <div className="space-y-2">
        {DAILY_ITEMS.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm text-navy-700 hover:text-navy-900"
          >
            <input
              type="checkbox"
              checked={checked[i] || false}
              onChange={() => toggle(i)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className={checked[i] ? "line-through text-navy-400" : ""}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
