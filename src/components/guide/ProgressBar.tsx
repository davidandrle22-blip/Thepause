"use client";

const MILESTONES = [
  { day: 1, label: "Start", icon: "🌅" },
  { day: 2, label: "Stěna", icon: "🧱" },
  { day: 3, label: "Zlom", icon: "✨" },
  { day: 4, label: "Flow", icon: "🧬" },
  { day: 5, label: "Cíl", icon: "🏆" },
];

export function ProgressBar({ completedPhases }: { completedPhases: number }) {
  const totalPhases = 9; // FASTING_PHASES.length
  const percentage = Math.round((completedPhases / totalPhases) * 100);

  // Map phases to approximate day (phases are distributed across 5 days)
  const currentDay = Math.min(5, Math.ceil((completedPhases / totalPhases) * 5));

  return (
    <div className="bg-white border border-teal-100 rounded-xl p-4 my-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold text-navy-900">Pokrok půstem</h4>
        <span className="text-sm font-bold text-teal-600">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Milestones */}
      <div className="flex items-center justify-between">
        {MILESTONES.map((m) => {
          const isReached = currentDay >= m.day;
          return (
            <div key={m.day} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  isReached
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {m.icon}
              </div>
              <span className={`text-[10px] ${isReached ? "text-teal-700 font-bold" : "text-navy-400"}`}>
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
