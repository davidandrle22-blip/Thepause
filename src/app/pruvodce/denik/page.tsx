"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

const DAYS = [
  { day: 1, label: "Den 1 — Start", icon: "🌅" },
  { day: 2, label: "Den 2 — Stěna", icon: "🧱" },
  { day: 3, label: "Den 3 — Zlom", icon: "✨" },
  { day: 4, label: "Den 4 — Flow", icon: "🧬" },
  { day: 5, label: "Den 5 — Oslava", icon: "🏆" },
];

const MOODS = [
  { value: 1, emoji: "😫", label: "Velmi špatně" },
  { value: 2, emoji: "😕", label: "Špatně" },
  { value: 3, emoji: "😐", label: "Neutrálně" },
  { value: 4, emoji: "🙂", label: "Dobře" },
  { value: 5, emoji: "🤩", label: "Výborně" },
];

const LS_KEY = "the-pulse-diary";

type DiaryEntries = Record<number, { content: string; mood: number | null }>;

function loadFromLocalStorage(): DiaryEntries {
  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveToLocalStorage(entries: DiaryEntries) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(entries));
  } catch {}
}

export default function DenikPage() {
  const [entries, setEntries] = useState<DiaryEntries>({});
  const [activeDay, setActiveDay] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load entries: try API first, fallback to localStorage
  useEffect(() => {
    fetch("/api/diary")
      .then((r) => {
        if (!r.ok) throw new Error("Not authenticated");
        return r.json();
      })
      .then((data) => {
        if (data && typeof data === "object" && !data.error) {
          setEntries(data);
          saveToLocalStorage(data); // sync to localStorage
        } else {
          setEntries(loadFromLocalStorage());
        }
      })
      .catch(() => {
        setEntries(loadFromLocalStorage());
      })
      .finally(() => setLoaded(true));
  }, []);

  const updateEntry = useCallback(
    (day: number, field: "content" | "mood", value: string | number) => {
      setEntries((prev) => {
        const next = {
          ...prev,
          [day]: {
            content: prev[day]?.content || "",
            mood: prev[day]?.mood || null,
            [field]: value,
          },
        };
        saveToLocalStorage(next);
        return next;
      });
      setSaved(false);
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    const entry = entries[activeDay];
    if (!entry) {
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: activeDay,
          content: entry.content,
          mood: entry.mood,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        // API failed (not logged in) — already saved to localStorage
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // Offline — already saved to localStorage
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg-light">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Deník půstu</h1>
            <p className="text-navy-600 text-sm">
              Zapisujte si pocity a pokroky
            </p>
          </div>
          <Link href="/pruvodce">
            <Button
              variant="outline"
              className="border-teal-300 text-teal-700 hover:bg-teal-50"
            >
              Zpět na průvodce
            </Button>
          </Link>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {DAYS.map((d) => {
            const hasEntry = entries[d.day]?.content || entries[d.day]?.mood;
            return (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all relative ${
                  activeDay === d.day
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-white text-navy-700 border border-teal-100 hover:border-teal-300"
                }`}
              >
                <span>{d.icon}</span>
                {d.label}
                {hasEntry && (
                  <span className="w-2 h-2 bg-green-400 rounded-full absolute top-1.5 right-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Entry form */}
        {!loaded ? (
          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
            <div className="space-y-4">
              <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 w-16 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : (
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6"
          >
            <h2 className="text-lg font-bold text-navy-900 mb-4">
              {DAYS[activeDay - 1].icon} {DAYS[activeDay - 1].label}
            </h2>

            {/* Mood selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-navy-700 mb-3">
                Jak se cítíte?
              </label>
              <div className="flex gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => updateEntry(activeDay, "mood", mood.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                      entries[activeDay]?.mood === mood.value
                        ? "bg-teal-50 border-teal-300 shadow-sm"
                        : "border-gray-200 hover:border-teal-200"
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs text-navy-600">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text entry */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Vaše poznámky
              </label>
              <textarea
                value={entries[activeDay]?.content || ""}
                onChange={(e) =>
                  updateEntry(activeDay, "content", e.target.value)
                }
                placeholder="Jak se cítíte? Co pozorujete? Jaké máte myšlenky?"
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-5 rounded-xl disabled:opacity-50"
              >
                {saved ? "Uloženo!" : saving ? "Ukládám..." : "Uložit záznam"}
              </Button>

              {saved && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-teal-600 font-medium"
                >
                  Uloženo
                </motion.span>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-6 text-center">
          <Mascot
            message={
              activeDay <= 2
                ? "Zapisuj si vše — později si na to rád/a vzpomeneš!"
                : activeDay <= 4
                  ? "Tvoje zápisky ukazují sílu! Pokračuj!"
                  : "Poslední den! Zapiš si, jak se cítíš na konci cesty."
            }
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
