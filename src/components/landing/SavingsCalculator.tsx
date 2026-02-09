"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function SavingsCalculator() {
  const [dailyCost, setDailyCost] = useState(250);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedValue, setAnimatedValue] = useState(0);

  const totalSaved = dailyCost * 5;
  const guidePrice = 199;
  const netSaved = totalSaved - guidePrice;

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const target = totalSaved;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setAnimatedValue(current);
    }, 25);
    return () => clearInterval(interval);
  }, [isInView, totalSaved]);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
            Kolik ušetříte za 5 dní bez jídla?
          </h2>
          <p className="text-lg text-navy-600">
            Zadejte, kolik denně utratíte za jídlo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-green-100 p-8"
        >
          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-navy-700">
                Denní útrata za jídlo
              </label>
              <span className="text-2xl font-bold text-navy-900">
                {dailyCost} Kč
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={dailyCost}
              onChange={(e) => setDailyCost(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex justify-between text-xs text-navy-400 mt-1">
              <span>100 Kč</span>
              <span>500 Kč</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-green-600">
                {animatedValue} Kč
              </div>
              <div className="text-sm text-green-700 mt-1">Ušetříte za jídlo</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-navy-600">
                -{guidePrice} Kč
              </div>
              <div className="text-sm text-navy-500 mt-1">Cena průvodce</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-5 text-center border-2 border-teal-200">
              <div className="text-3xl font-bold text-teal-600">
                +{Math.max(0, netSaved)} Kč
              </div>
              <div className="text-sm text-teal-700 mt-1 font-medium">Čistě ušetřeno!</div>
            </div>
          </div>

          <p className="text-center text-sm text-navy-600">
            Ušetříte <strong className="text-green-600">{totalSaved} Kč</strong>,
            průvodce stojí pouze <strong>{guidePrice} Kč</strong> —{" "}
            <strong className="text-teal-600">vydělali jste {Math.max(0, netSaved)} Kč!</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
