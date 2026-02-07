"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    hour: "0-12h",
    title: "Glykogenové zásoby",
    description: "Tělo spotřebovává zásoby glykogenu z jater a svalů.",
    icon: "⚡",
    color: "from-teal-400 to-teal-500",
    locked: false,
  },
  {
    hour: "12-24h",
    title: "Přechod na tuky",
    description: "Začíná lipolýza — spalování tukových zásob.",
    icon: "🔥",
    color: "from-teal-500 to-teal-600",
    locked: false,
  },
  {
    hour: "24-48h",
    title: "Ketóza",
    description: "Produkce ketonů vzrůstá. Mozek přechází na alternativní palivo.",
    icon: "🧠",
    color: "from-teal-600 to-navy-600",
    locked: true,
  },
  {
    hour: "48-72h",
    title: "Autofagie",
    description: "Buněčná regenerace a odstraňování poškozených buněk.",
    icon: "✨",
    color: "from-navy-600 to-navy-700",
    locked: true,
  },
  {
    hour: "72-120h",
    title: "Hluboká regenerace",
    description: "Imunitní systém se resetuje. Kmenové buňky se aktivují.",
    icon: "💎",
    color: "from-navy-700 to-navy-800",
    locked: true,
  },
];

export function TimelinePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="jak-to-funguje" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Co se děje ve vašem těle?
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Každá hodina půstu spouští v těle unikátní procesy. Náš průvodce vás
            jimi provede krok za krokem.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-teal-500 to-navy-700 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`inline-block bg-white rounded-xl p-6 shadow-lg border border-teal-100 max-w-md ${
                      phase.locked ? "relative overflow-hidden" : ""
                    }`}
                  >
                    {phase.locked && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto mb-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <p className="text-sm font-medium text-navy-700">
                            Odemkněte plný přístup
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{phase.icon}</span>
                      <span className="text-sm font-bold text-teal-600">
                        {phase.hour}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-navy-600">{phase.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-20 flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-lg">{phase.icon}</span>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
