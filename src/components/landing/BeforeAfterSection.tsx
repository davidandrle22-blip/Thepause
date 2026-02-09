"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WITHOUT = [
  { icon: "❌", text: "Zmatení — co jíst, co pít, jak začít?" },
  { icon: "⚠️", text: "Riziko zdravotních komplikací" },
  { icon: "😰", text: "Nejistota a strach z neznámého" },
  { icon: "🤷", text: "Bez podpory a průvodce" },
  { icon: "🔄", text: "Častá chyba = předčasné ukončení" },
];

const WITH = [
  { icon: "✅", text: "Jasný plán na každý den" },
  { icon: "🛡️", text: "Bezpečnostní protokol a varovné signály" },
  { icon: "💪", text: "Jistota a klid — víte co vás čeká" },
  { icon: "📊", text: "Denní checklist a tracking pokroku" },
  { icon: "🏆", text: "98 % úspěšnost dokončení" },
];

export function BeforeAfterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-navy-900 text-center mb-4"
        >
          Proč ne sám/sama?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-navy-600 text-center mb-12 max-w-2xl mx-auto"
        >
          Za 5 dní můžete být úplně jiný člověk — nebo můžete zůstat tam, kde
          jste
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* BEZ průvodce */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy-50 border border-navy-100 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-navy-400 mb-6 flex items-center gap-2">
              <span className="text-2xl">😕</span> BEZ průvodce
            </h3>
            <ul className="space-y-4">
              {WITHOUT.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 text-navy-500"
                >
                  <span className="text-lg leading-6 flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-sm sm:text-base">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* S průvodcem */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-teal-500/10"
          >
            <h3 className="text-lg font-bold text-teal-700 mb-6 flex items-center gap-2">
              <span className="text-2xl">🌟</span> S průvodcem The-Pulse
            </h3>
            <ul className="space-y-4">
              {WITH.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 text-navy-800"
                >
                  <span className="text-lg leading-6 flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
