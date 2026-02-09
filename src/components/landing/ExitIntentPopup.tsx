"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "tp-exit-shown";
const COUNTDOWN_SECONDS = 10 * 60; // 10 minutes

export function ExitIntentPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mark as mounted (hydration-safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  const showPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    // Only show once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);
  }, []);

  const closePopup = useCallback(() => {
    setVisible(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Exit intent detection
  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [mounted, showPopup]);

  // Countdown timer
  useEffect(() => {
    if (!visible) return;

    setSecondsLeft(COUNTDOWN_SECONDS);

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          closePopup();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, closePopup]);

  // Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center"
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
              aria-label="Zavřít"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="mb-4 text-4xl">
              <span role="img" aria-label="stop">
                ✋
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">
              Počkejte! Opravdu chcete odejít?
            </h3>

            <p className="text-navy-600 mb-6 text-sm sm:text-base">
              Získejte{" "}
              <span className="font-bold text-teal-600">SLEVU 10 %</span>{" "}
              na průvodce — platí pouze teď
            </p>

            {/* Countdown */}
            <div className="bg-navy-50 rounded-xl px-4 py-3 mb-6 inline-flex items-center gap-2">
              <svg
                className="w-5 h-5 text-navy-500"
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
              <span className="text-navy-700 text-sm">
                Nabídka vyprší za{" "}
                <span className="font-mono font-bold text-navy-900">
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </span>
              </span>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Link href="/objednavka" onClick={closePopup}>
                <Button
                  size="lg"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 rounded-xl font-bold"
                >
                  Získat průvodce se slevou 10 %
                </Button>
              </Link>

              <button
                onClick={closePopup}
                className="text-sm text-navy-400 hover:text-navy-600 transition-colors"
              >
                Ne, děkuji, nechci slevu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
