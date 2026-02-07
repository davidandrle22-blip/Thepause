"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const motionVal = useMotionValue(0);
    const unsubscribe = motionVal.on("change", (v) => setCount(Math.round(v)));
    const controls = animate(motionVal, target, { duration: 2, ease: "easeOut" });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text">
      {prefix}{count.toLocaleString("cs-CZ")}{suffix}
    </span>
  );
}

const stats = [
  { value: 2847, suffix: "+", label: "Lidí dokončilo půst" },
  { value: 96, suffix: "%", label: "Spokojenost" },
  { value: 4, suffix: ",2 kg", label: "Průměrný úbytek" },
  { value: 120, suffix: "h", label: "Detailní průvodce" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Čísla mluví za vše
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-teal-200 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
