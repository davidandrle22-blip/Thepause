"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    number: 1,
    label: "Přečíst si o průvodci",
    detail: "Jste právě tady",
    done: true,
    icon: "✅",
  },
  {
    number: 2,
    label: "Zakoupit průvodce",
    detail: "Zabere 2 minuty",
    done: false,
    icon: "🔲",
  },
  {
    number: 3,
    label: "Začít 5denní transformaci",
    detail: "Nový začátek",
    done: false,
    icon: "🔲",
  },
];

export function ProgressSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 bg-navy-900" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-10"
        >
          Jste 3 kroky od změny života:
        </motion.h2>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "33%" } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-teal-500 rounded-full"
            />
          </div>
          <p className="text-teal-400 text-sm mt-2 font-medium">
            33 % dokončeno
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className={`rounded-xl p-5 ${
                step.done
                  ? "bg-teal-500/20 border border-teal-500/30"
                  : "bg-navy-800 border border-navy-700"
              }`}
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <div
                className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  step.done ? "text-teal-400" : "text-navy-400"
                }`}
              >
                Krok {step.number}
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                {step.label}
              </div>
              <div
                className={`text-xs ${
                  step.done ? "text-teal-300" : "text-navy-400"
                }`}
              >
                {step.detail}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/objednavka">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-xl font-bold"
            >
              Pokračovat ke kroku 2
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
