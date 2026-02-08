"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function UrgencyBar() {
  const [viewers, setViewers] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Random viewers count (placeholder)
    setViewers(Math.floor(Math.random() * 15) + 8);

    // Set countdown to end of today
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update viewers randomly every 15-30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(30, prev + change));
      });
    }, Math.random() * 15000 + 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy-900 text-white py-2.5 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={viewers}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex items-center gap-1.5"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">{viewers} lidí</span> právě prohlíží
          </motion.span>
        </AnimatePresence>
        <span className="text-navy-400">|</span>
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gold-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          🔥 Akcni cena 199 Kc — konci za{" "}
          <span className="font-mono font-bold text-gold-400">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}
