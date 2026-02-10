"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONVERSION_CONFIG } from "@/config/conversion";
import { usePrices } from "@/components/PriceContext";

export function ValueBreakdown() {
  const prices = usePrices();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = CONVERSION_CONFIG.valueBreakdown;
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
            {/* Header */}
            <div className="bg-navy-900 px-6 py-5 sm:px-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                Co vše získáte za {prices.basic} Kč:
              </h2>
            </div>

            {/* Items */}
            <div className="px-6 py-6 sm:px-8 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg
                      className="w-5 h-5 text-teal-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-navy-800 font-medium text-sm sm:text-base">
                      {item.item}
                    </span>
                  </div>
                  <span className="text-navy-400 text-sm whitespace-nowrap">
                    hodnota {item.value} Kč
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-6 sm:mx-8 border-t-2 border-dashed border-teal-200" />

            {/* Total */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="px-6 py-6 sm:px-8 text-center space-y-3"
            >
              <div className="text-navy-500 text-base">
                Celková hodnota:{" "}
                <span className="line-through text-navy-400 font-semibold">
                  {totalValue.toLocaleString("cs-CZ")} Kč
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-navy-900">
                Vaše cena:{" "}
                <span className="text-teal-600">{prices.basic} Kč</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <span className="inline-block bg-teal-100 text-teal-700 font-bold text-sm sm:text-base px-4 py-1.5 rounded-full">
                  Ušetříte 86 %!
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
