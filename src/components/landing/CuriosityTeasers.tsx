"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const TEASERS = [
  {
    icon: "🔥",
    teaser: "Den 3 je zlomový — zjistěte proč...",
    detail: "72 % lidí netuší, co se děje v těle po 72 hodinách bez jídla",
  },
  {
    icon: "⚡",
    teaser: "Jedna věc, kterou dělá 90 % lidí při půstu špatně...",
    detail:
      "Tato chyba může znehodnotit celý váš půst. V průvodci se dozvíte jak jí předejít.",
  },
  {
    icon: "🧬",
    teaser: "Co je autofagie a proč byste ji měli chtít?",
    detail:
      "Nobelova cena za medicínu odhalila klíčový proces, který se spouští při půstu",
  },
];

export function CuriosityTeasers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-navy-50" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-navy-900 text-center mb-10"
        >
          Věděli jste, že...
        </motion.h2>

        <div className="space-y-4">
          {TEASERS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -25 : 25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              className="bg-white rounded-xl p-5 sm:p-6 border border-navy-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1">
                    {item.teaser}
                  </h3>
                  <p className="text-sm text-navy-500">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/objednavka"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors"
          >
            Odemkněte všechna tajemství úspěšného půstu
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
