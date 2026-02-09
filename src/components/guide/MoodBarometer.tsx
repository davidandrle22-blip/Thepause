"use client";

import { useState, useEffect } from "react";

const MOODS = [
  { value: 1, emoji: "😫", label: "Špatně" },
  { value: 2, emoji: "😕", label: "Nic moc" },
  { value: 3, emoji: "😐", label: "Neutrálně" },
  { value: 4, emoji: "🙂", label: "Dobře" },
  { value: 5, emoji: "🤩", label: "Skvěle" },
];

const LS_KEY = "the-pulse-mood-barometer";

type MoodData = Record<number, number>;

export function MoodBarometer({ day }: { day: number }) {
  const [moods, setMoods] = useState<MoodData>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) setMoods(JSON.parse(stored));
    } catch {}
  }, []);

  const selectMood = (value: number) => {
    setMoods((prev) => {
      const next = { ...prev, [day]: value };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const currentMood = moods[day];

  return (
    <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 my-4">
      <h4 className="text-sm font-bold text-navy-900 mb-3">
        Jak se dnes cítíte?
      </h4>
      <div className="flex items-center justify-between gap-1 mb-4">
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => selectMood(m.value)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
              currentMood === m.value
                ? "bg-purple-200 scale-110"
                : "hover:bg-purple-100"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] text-navy-500">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Mini chart across days */}
      <div className="flex items-end gap-1 h-12">
        {[1, 2, 3, 4, 5].map((d) => {
          const val = moods[d];
          const height = val ? (val / 5) * 100 : 10;
          const isToday = d === day;
          return (
            <div key={d} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className={`w-full rounded-t transition-all ${
                  val
                    ? isToday
                      ? "bg-purple-500"
                      : "bg-purple-300"
                    : "bg-gray-200"
                }`}
                style={{ height: `${height}%` }}
              />
              <span className={`text-[9px] ${isToday ? "font-bold text-purple-700" : "text-navy-400"}`}>
                D{d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
