"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ALTERNATIVES = [
  {
    name: "Nutriční poradce",
    price: "1 500 – 3 000 Kč",
    detail: "/ konzultace",
    highlighted: false,
  },
  {
    name: "Detoxikační program v lázních",
    price: "5 000 – 15 000 Kč",
    detail: "",
    highlighted: false,
  },
  {
    name: "Knihy o půstu",
    price: "300 – 600 Kč",
    detail: "(bez interaktivity)",
    highlighted: false,
  },
  {
    name: "The-Pulse.cz průvodce",
    price: "pouze 199 Kč",
    detail: "",
    highlighted: true,
  },
];

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 gradient-bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Kolik stojí alternativy?
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Srovnejte si cenu s běžnými řešeními na trhu
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5">
          {ALTERNATIVES.map((alt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              className={`
                relative rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3
                ${
                  alt.highlighted
                    ? "bg-white border-2 border-teal-500 shadow-lg shadow-teal-500/10"
                    : "bg-white border border-navy-100 shadow-sm"
                }
              `}
            >
              {/* Badge for highlighted */}
              {alt.highlighted && (
                <span className="absolute -top-3 left-5 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Nejlepší hodnota
                </span>
              )}

              {/* Name */}
              <div className="flex items-center gap-3">
                {alt.highlighted ? (
                  <svg
                    className="w-6 h-6 text-teal-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-navy-100 flex-shrink-0" />
                )}
                <span
                  className={`font-semibold text-base sm:text-lg ${
                    alt.highlighted ? "text-teal-700" : "text-navy-800"
                  }`}
                >
                  {alt.name}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 pl-9 sm:pl-0">
                <span
                  className={`font-bold text-lg sm:text-xl ${
                    alt.highlighted ? "text-teal-600" : "text-navy-700"
                  }`}
                >
                  {alt.price}
                </span>
                {alt.detail && (
                  <span className="text-navy-400 text-sm">{alt.detail}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-navy-500 text-sm mt-8"
        >
          Kompletní interaktivní průvodce za zlomek ceny alternativ.
          Navíc s 14denní garancí vrácení peněz.
        </motion.p>
      </div>
    </section>
  );
}
