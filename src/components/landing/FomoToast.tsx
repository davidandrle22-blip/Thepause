"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CITIES = [
  "Praha", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc",
  "Ceske Budejovice", "Hradec Kralove", "Usti nad Labem", "Pardubice",
  "Zlin", "Karlovy Vary", "Jihlava", "Kladno", "Most",
];

export function FomoToast() {
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState("");

  useEffect(() => {
    const show = () => {
      setCity(CITIES[Math.floor(Math.random() * CITIES.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First one after 15s
    const firstTimeout = setTimeout(show, 15000);

    // Then every 30-60s
    const interval = setInterval(show, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-50 bg-white rounded-xl shadow-2xl border border-teal-100 p-4 max-w-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-lg">
              🛒
            </div>
            <div>
              <p className="text-sm font-medium text-navy-800">
                Nekdo z mesta {city}
              </p>
              <p className="text-xs text-navy-500">
                prave zakoupil pruvodce
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
