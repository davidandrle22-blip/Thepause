"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { usePrices } from "@/components/PriceContext";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const prices = usePrices();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Split screen background */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Left half — Man */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src="/images/hero-man.jpg"
            alt="Sebevědomý muž vyzařující sílu a klid"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Teal overlay */}
          <div className="absolute inset-0 bg-teal-900/40" />
        </div>

        {/* Right half — Woman */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src="/images/hero-woman.jpg"
            alt="Krásná sebevědomá žena vyzařující luxus a sebejistotu"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Navy overlay */}
          <div className="absolute inset-0 bg-navy-900/40" />
        </div>
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/60" />

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20"
          >
            Nový přístup k vodnímu půstu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
          >
            Každý si může pomoci
            <br />
            <span className="text-teal-300">skrze půst</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/90 mb-8 max-w-2xl leading-relaxed"
          >
            Objevte sílu vodního půstu — 5denní průvodce, který změní váš pohled
            na zdraví, energii a sebekontrolu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Link href="/objednavka">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all animate-pulse"
              >
                Začít za {prices.basic} Kč
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <a href="#jak-to-funguje">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border-white/30 text-white hover:bg-white/10 bg-white/5"
              >
                Jak to funguje?
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6 text-sm text-white/80 mb-10"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              120 hodin krok za krokem
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Odborně ověřené
            </div>
          </motion.div>

          {/* Mascot — smaller, below CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Mascot
              message="Ahoj! Jsem Kapička a provedu tě celým půstem!"
              size="sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
