"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { FASTING_PHASES, CHECKLIST_ITEMS, type FastingPhase } from "@/data/fasting-phases";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";

type TabKey = "body" | "science" | "feelings" | "challenge";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "body", label: "Co se děje", icon: "🔬" },
  { key: "science", label: "Věda & hormony", icon: "🧪" },
  { key: "feelings", label: "Pocity & tipy", icon: "💡" },
  { key: "challenge", label: "Výzva", icon: "🎯" },
];

function useLocalStorageSet(key: string): [Set<string>, (id: string) => void] {
  const [set, setSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setSet(new Set(JSON.parse(stored)));
    } catch {}
  }, [key]);

  const toggle = useCallback(
    (id: string) => {
      setSet((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        localStorage.setItem(key, JSON.stringify([...next]));
        return next;
      });
    },
    [key]
  );

  return [set, toggle];
}

// --- SVG Gauge components ---

function CircularGauge({
  value,
  label,
  color,
  size = 90,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
}) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span className="text-lg font-bold text-navy-900">{value}%</span>
      <span className="text-xs text-navy-500 text-center">{label}</span>
    </div>
  );
}

function HormoneBar({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-navy-700 w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-navy-500 w-36 flex-shrink-0 text-right">{value}</span>
    </div>
  );
}

function DifficultyMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium text-navy-600 mr-1">Náročnost:</span>
      {Array.from({ length: 10 }, (_, i) => {
        const active = i < level;
        let bg = "bg-gray-200";
        if (active) {
          if (i < 3) bg = "bg-green-400";
          else if (i < 6) bg = "bg-yellow-400";
          else if (i < 8) bg = "bg-orange-400";
          else bg = "bg-red-500";
        }
        return (
          <div
            key={i}
            className={`w-2.5 h-5 rounded-sm ${bg} transition-colors`}
          />
        );
      })}
      <span className="text-xs text-navy-500 ml-1">{level}/10</span>
    </div>
  );
}

// --- Breathing exercise ---

type BreathPhase = "idle" | "in" | "hold" | "out";

function BreathingExercise() {
  const [phase, setPhase] = useState<BreathPhase>("idle");
  const [cycles, setCycles] = useState(0);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalCycles = 6;

  const cleanup = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const runCycle = useCallback(
    (cycle: number) => {
      if (cycle >= totalCycles) {
        setPhase("idle");
        setCycles(totalCycles);
        cleanup();
        return;
      }

      // Inhale 4s
      setPhase("in");
      setTimer(4);
      intervalRef.current = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);

      timeoutRef.current = setTimeout(() => {
        cleanup();
        // Hold 7s
        setPhase("hold");
        setTimer(7);
        intervalRef.current = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);

        timeoutRef.current = setTimeout(() => {
          cleanup();
          // Exhale 8s
          setPhase("out");
          setTimer(8);
          intervalRef.current = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);

          timeoutRef.current = setTimeout(() => {
            cleanup();
            setCycles(cycle + 1);
            runCycle(cycle + 1);
          }, 8000);
        }, 7000);
      }, 4000);
    },
    [cleanup]
  );

  const start = () => {
    setCycles(0);
    runCycle(0);
  };

  const stop = () => {
    cleanup();
    setPhase("idle");
    setCycles(0);
    setTimer(0);
  };

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const phaseLabel =
    phase === "in" ? "Nádech" : phase === "hold" ? "Držte" : phase === "out" ? "Výdech" : "";

  const circleScale =
    phase === "in" ? 1 : phase === "hold" ? 1 : phase === "out" ? 0.6 : 0.6;

  const circleColor =
    phase === "in"
      ? "bg-teal-400/30 border-teal-400"
      : phase === "hold"
        ? "bg-blue-400/30 border-blue-400"
        : phase === "out"
          ? "bg-indigo-400/30 border-indigo-400"
          : "bg-gray-200/50 border-gray-300";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <motion.div
          className={`absolute inset-0 rounded-full border-4 ${circleColor}`}
          animate={{ scale: circleScale }}
          transition={{
            duration:
              phase === "in" ? 4 : phase === "hold" ? 0.3 : phase === "out" ? 8 : 0.3,
            ease: "easeInOut",
          }}
        />
        <div className="relative z-10 text-center">
          {phase === "idle" ? (
            <span className="text-sm text-navy-500">Připraveno</span>
          ) : (
            <>
              <div className="text-2xl font-bold text-navy-900">{timer}</div>
              <div className="text-sm font-medium text-navy-600">{phaseLabel}</div>
            </>
          )}
        </div>
      </div>

      <div className="text-xs text-navy-500">
        {phase === "idle" && cycles === totalCycles
          ? "Hotovo! Skvělá práce."
          : phase === "idle"
            ? "4 s nádech — 7 s držet — 8 s výdech"
            : `Cyklus ${cycles + 1}/${totalCycles}`}
      </div>

      {phase === "idle" ? (
        <Button
          onClick={start}
          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6"
        >
          {cycles === totalCycles ? "Znovu" : "Spustit"}
        </Button>
      ) : (
        <Button
          onClick={stop}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl px-6"
        >
          Zastavit
        </Button>
      )}
    </div>
  );
}

// --- Did you know ---

function DidYouKnow({ facts }: { facts: string[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 flex items-start gap-3">
      <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-gold-800 uppercase tracking-wide mb-1">
          Věděli jste?
        </h4>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-gold-900 leading-relaxed"
          >
            {facts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      {facts.length > 1 && (
        <button
          onClick={() => setIndex((i) => (i + 1) % facts.length)}
          className="text-xs text-gold-700 hover:text-gold-900 font-medium flex-shrink-0 border border-gold-300 rounded-lg px-2 py-1 hover:bg-gold-100 transition-colors"
        >
          Další
        </button>
      )}
    </div>
  );
}

// --- Mascot mood bubble ---

function MascotBubble({ message, mood }: { message: string; mood: FastingPhase["mascotMood"] }) {
  const moodStyles: Record<typeof mood, string> = {
    excited: "bg-teal-50 border-teal-300 text-teal-800",
    encouraging: "bg-blue-50 border-blue-300 text-blue-800",
    warning: "bg-red-50 border-red-300 text-red-800",
    celebrating: "bg-gold-50 border-gold-300 text-gold-800",
    calm: "bg-indigo-50 border-indigo-300 text-indigo-800",
  };

  const isPulsing = mood === "celebrating";

  return (
    <div
      className={`rounded-xl p-4 flex items-center gap-3 border ${moodStyles[mood]} ${isPulsing ? "animate-pulse-glow" : ""}`}
    >
      <span className="text-2xl">💧</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

// --- Tab content ---

function TabBody({ phase }: { phase: FastingPhase }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-navy-600 leading-relaxed">
        {phase.body.description}
      </p>

      {/* Body processes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {phase.bodyProcesses.map((bp, i) => (
          <motion.div
            key={bp.process}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
          >
            <span className="text-xl flex-shrink-0">{bp.icon}</span>
            <div>
              <h5 className="text-sm font-semibold text-navy-900">{bp.process}</h5>
              <p className="text-xs text-navy-500">{bp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fat burn comparison */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <h5 className="text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
          🔥 Spalování tuků
        </h5>
        <p className="text-sm text-navy-600 mb-1">
          <strong>Muži:</strong> {phase.fatBurn.male}
        </p>
        <p className="text-sm text-navy-600">
          <strong>Ženy:</strong> {phase.fatBurn.female}
        </p>
      </div>
    </div>
  );
}

function TabScience({ phase }: { phase: FastingPhase }) {
  const s = phase.science;
  const hormones = [
    { label: "Inzulín", value: s.insulin, color: "#14b8a6" },
    { label: "Glukagon", value: s.glucagon, color: "#f59e0b" },
    { label: "HGH", value: s.hgh, color: "#8b5cf6" },
    { label: "Kortizol", value: s.cortisol, color: "#ef4444" },
    { label: "Ketony", value: s.ketones, color: "#3b82f6" },
  ];

  return (
    <div className="space-y-6">
      {/* Hormone bars */}
      <div>
        <h5 className="text-sm font-bold text-navy-900 mb-3">Hormony & metabolity</h5>
        <div className="space-y-3">
          {hormones.map((h) => (
            <HormoneBar key={h.label} label={h.label} value={h.value} color={h.color} />
          ))}
        </div>
      </div>

      {/* Circular gauges */}
      <div className="flex justify-center gap-8">
        <CircularGauge
          value={s.autophagy}
          label="Autofagie"
          color="#14b8a6"
        />
        <CircularGauge
          value={s.inflammation}
          label="Snížení zánětu"
          color="#8b5cf6"
        />
      </div>
    </div>
  );
}

function TabFeelings({ phase }: { phase: FastingPhase }) {
  return (
    <div className="space-y-5">
      <div>
        <h5 className="text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
          💪 Fyzické pocity
        </h5>
        <ul className="text-sm text-navy-600 space-y-1">
          {phase.feelings.physical.map((f, j) => (
            <li key={j} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
          🧘 Psychické pocity
        </h5>
        <ul className="text-sm text-navy-600 space-y-1">
          {phase.feelings.mental.map((f, j) => (
            <li key={j} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-navy-400 rounded-full flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
          💡 Tipy
        </h5>
        <ul className="text-sm text-navy-600 space-y-1">
          {phase.tips.map((t, j) => (
            <li key={j} className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
          🥤 Co pít
        </h5>
        <div className="flex flex-wrap gap-2">
          {phase.drinks.map((d, j) => (
            <span
              key={j}
              className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {phase.warnings.length > 0 && (
        <div>
          <h5 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
            ⚠️ Varovné signály
          </h5>
          <ul className="text-sm text-red-600 space-y-1">
            {phase.warnings.map((w, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0 mt-1.5" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TabChallenge({
  phase,
  completed,
  onComplete,
}: {
  phase: FastingPhase;
  completed: boolean;
  onComplete: () => void;
}) {
  const challengeTypeLabel: Record<FastingPhase["challenge"]["type"], string> = {
    breathing: "Dechové cvičení",
    journaling: "Psaní deníku",
    movement: "Pohyb",
    mindfulness: "Mindfulness",
    gratitude: "Vděčnost",
  };

  const [justCompleted, setJustCompleted] = useState(false);

  const handleComplete = () => {
    onComplete();
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 600);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
            {challengeTypeLabel[phase.challenge.type]}
          </span>
          <span className="text-xs text-navy-400">
            {phase.challenge.durationMinutes} min
          </span>
        </div>
        <h5 className="text-base font-bold text-navy-900 mb-2">
          {phase.challenge.title}
        </h5>
        <p className="text-sm text-navy-600 leading-relaxed">
          {phase.challenge.description}
        </p>
      </div>

      {/* Breathing exercise widget */}
      {phase.challenge.type === "breathing" && (
        <div className="bg-teal-50/50 rounded-xl p-6 border border-teal-100">
          <BreathingExercise />
        </div>
      )}

      {/* Journal prompt */}
      {phase.challenge.type === "journaling" && (
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">
            Otázka do deníku
          </h5>
          <p className="text-sm text-indigo-700 italic">
            &ldquo;{phase.journalPrompt}&rdquo;
          </p>
          <Link href="/pruvodce/denik" className="inline-block mt-2">
            <span className="text-xs text-indigo-600 hover:text-indigo-800 underline">
              Otevřít deník →
            </span>
          </Link>
        </div>
      )}

      {/* Complete button */}
      <button
        onClick={handleComplete}
        disabled={completed}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
          completed
            ? "bg-green-100 text-green-700 border border-green-300 cursor-default"
            : "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg"
        } ${justCompleted ? "animate-celebrate" : ""}`}
      >
        {completed ? "✅ Splněno!" : "Označit jako splněné"}
      </button>
    </div>
  );
}

// --- Main page ---

export default function PruvodcePage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, TabKey>>({});
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);
  const [completedPhases, toggleCompleted] = useLocalStorageSet("thepause-completed-phases");
  const [completedChallenges, toggleChallenge] = useLocalStorageSet("thepause-completed-challenges");
  const [celebratePhase, setCelebratePhase] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = CHECKLIST_ITEMS.every((item) => checklist[item.id]);

  const getTab = (phaseId: string): TabKey => activeTab[phaseId] || "body";
  const setTab = (phaseId: string, tab: TabKey) =>
    setActiveTab((prev) => ({ ...prev, [phaseId]: tab }));

  const handleMarkComplete = (phaseId: string) => {
    toggleCompleted(phaseId);
    if (!completedPhases.has(phaseId)) {
      setCelebratePhase(phaseId);
      setTimeout(() => setCelebratePhase(null), 700);
    }
  };

  const completedCount = completedPhases.size;
  const allDone = completedCount === FASTING_PHASES.length;

  // Checklist gate (unchanged)
  if (!started) {
    return (
      <div className="min-h-screen gradient-bg-light">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Mascot message="Než začneme, projděme si checklist!" size="sm" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8"
          >
            <h1 className="text-2xl font-bold text-navy-900 mb-2">
              Checklist před půstem
            </h1>
            <p className="text-navy-600 mb-6">
              Zaškrtněte všechny body, než začnete svou 5denní cestu.
            </p>

            <div className="space-y-3 mb-8">
              {CHECKLIST_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    checklist[item.id]
                      ? "bg-teal-50 border-teal-300"
                      : "bg-white border-gray-200 hover:border-teal-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.id] || false}
                    onChange={() => toggleCheck(item.id)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span
                    className={`text-sm ${
                      checklist[item.id]
                        ? "text-teal-800 font-medium"
                        : "text-navy-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <Button
              onClick={() => setStarted(true)}
              disabled={!allChecked}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {allChecked ? "Začít průvodce" : "Zaškrtněte všechny body"}
            </Button>
          </motion.div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>Upozornění:</strong> Obsah tohoto průvodce má výhradně
              informační a vzdělávací charakter. Nejedná se o zdravotnickou
              službu ani lékařské doporučení. Před zahájením půstu se vždy
              poraďte se svým lékařem.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-light">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-navy-900">
              Dokončeno {completedCount} z {FASTING_PHASES.length} fází
            </span>
            <Link href="/pruvodce/denik">
              <span className="text-xs text-teal-600 hover:text-teal-800 font-medium">
                📓 Deník
              </span>
            </Link>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedCount / FASTING_PHASES.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {/* Quick-jump dots */}
          <div className="flex items-center justify-between">
            {FASTING_PHASES.map((phase) => {
              const isCompleted = completedPhases.has(phase.id);
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() =>
                    setActivePhase(activePhase === phase.id ? null : phase.id)
                  }
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-teal-500 text-white shadow-sm"
                      : isActive
                        ? "bg-teal-100 text-teal-700 ring-2 ring-teal-400"
                        : "bg-gray-100 text-navy-400 hover:bg-teal-50"
                  }`}
                  title={`${phase.shortTitle} (${phase.hourStart}-${phase.hourEnd}h)`}
                >
                  {isCompleted ? "✓" : phase.shortTitle.charAt(0)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy-900">
            Váš 5denní průvodce
          </h1>
          <p className="text-navy-600 text-sm">
            Klikněte na fázi pro detail — 120 hodin, 9 fází, celé tělo
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-200 hidden lg:block" />

          <div className="space-y-4">
            {FASTING_PHASES.map((phase, i) => {
              const isOpen = activePhase === phase.id;
              const isCompleted = completedPhases.has(phase.id);

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Phase header (accordion trigger) */}
                  <button
                    onClick={() =>
                      setActivePhase(isOpen ? null : phase.id)
                    }
                    className={`w-full text-left rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "bg-white shadow-xl border-teal-300 ring-2 ring-teal-100"
                        : isCompleted
                          ? "bg-teal-50/80 shadow-sm border-teal-200 hover:shadow-lg"
                          : "bg-white/80 shadow-sm border-teal-100 hover:shadow-lg hover:border-teal-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 p-5">
                      {/* Timeline node */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-xl flex-shrink-0 ${
                          celebratePhase === phase.id ? "animate-celebrate" : ""
                        }`}
                      >
                        {isCompleted ? "✅" : phase.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                            {phase.hourStart}-{phase.hourEnd}h
                          </span>
                          <h3 className="text-base font-bold text-navy-900 truncate">
                            {phase.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-navy-600 truncate flex-1">
                            {phase.body.title}
                          </p>
                          <DifficultyMeter level={phase.difficulty} />
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white rounded-b-2xl border border-t-0 border-teal-200 p-6 -mt-2 space-y-5">
                          {/* Tabs */}
                          <div className="flex gap-1 bg-gray-50 rounded-xl p-1">
                            {TABS.map((tab) => (
                              <button
                                key={tab.key}
                                onClick={() => setTab(phase.id, tab.key)}
                                className={`flex-1 text-xs font-medium py-2 px-2 rounded-lg transition-all ${
                                  getTab(phase.id) === tab.key
                                    ? "bg-white shadow-sm text-teal-700"
                                    : "text-navy-500 hover:text-navy-700"
                                }`}
                              >
                                <span className="mr-1">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Tab content */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={getTab(phase.id)}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {getTab(phase.id) === "body" && (
                                <TabBody phase={phase} />
                              )}
                              {getTab(phase.id) === "science" && (
                                <TabScience phase={phase} />
                              )}
                              {getTab(phase.id) === "feelings" && (
                                <TabFeelings phase={phase} />
                              )}
                              {getTab(phase.id) === "challenge" && (
                                <TabChallenge
                                  phase={phase}
                                  completed={completedChallenges.has(phase.id)}
                                  onComplete={() => toggleChallenge(phase.id)}
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {/* Did you know */}
                          <DidYouKnow facts={phase.didYouKnow} />

                          {/* Motivational quote */}
                          <div className="border-l-4 border-teal-400 pl-4 py-2">
                            <p className="text-sm italic text-navy-600">
                              &ldquo;{phase.quote.text}&rdquo;
                            </p>
                            <p className="text-xs text-navy-400 mt-1 text-right">
                              — {phase.quote.author}
                            </p>
                          </div>

                          {/* Mascot bubble */}
                          <MascotBubble
                            message={phase.mascotMessage}
                            mood={phase.mascotMood}
                          />

                          {/* Journal prompt */}
                          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex items-start gap-2">
                            <span className="text-sm">📝</span>
                            <div>
                              <span className="text-xs font-semibold text-indigo-700">
                                Otázka do deníku:{" "}
                              </span>
                              <span className="text-xs text-indigo-600 italic">
                                {phase.journalPrompt}
                              </span>
                            </div>
                          </div>

                          {/* Mark as completed */}
                          <button
                            onClick={() => handleMarkComplete(phase.id)}
                            className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                              isCompleted
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg"
                            } ${celebratePhase === phase.id ? "animate-celebrate" : ""}`}
                          >
                            {isCompleted
                              ? "✅ Fáze dokončena"
                              : "Označit fázi jako dokončenou"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center pb-12">
          <p className="text-sm text-navy-500 mb-4">
            Dokončeno {completedCount} z {FASTING_PHASES.length} fází
          </p>
          {allDone ? (
            <Link href="/odznak">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white py-6 px-12 rounded-xl text-lg font-bold shadow-lg animate-pulse-glow">
                🏆 Dokončil/a jsem půst!
              </Button>
            </Link>
          ) : (
            <p className="text-xs text-navy-400">
              Dokončete všechny fáze pro odemčení odznaku
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
