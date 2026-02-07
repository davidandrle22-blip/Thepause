"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const genderCards = [
  {
    title: "Pro muže",
    image: "/images/hero-man.jpg",
    imageAlt: "Sebevědomý muž vyzařující sílu a klid",
    overlayColor: "bg-teal-900/35",
    accentColor: "text-teal-400",
    borderColor: "border-teal-500/30",
    hoverBorder: "hover:border-teal-400/60",
    buttonClass: "bg-teal-600 hover:bg-teal-700",
    benefits: [
      "Efektivní hubnutí a spalování tuků",
      "Mentální disciplína a odolnost",
      "Zvýšení energie a soustředění",
      "Podpora přirozené hladiny testosteronu",
    ],
  },
  {
    title: "Pro ženy",
    image: "/images/hero-woman.jpg",
    imageAlt: "Krásná sebevědomá žena vyzařující luxus a sebejistotu",
    overlayColor: "bg-navy-900/35",
    accentColor: "text-teal-300",
    borderColor: "border-navy-400/30",
    hoverBorder: "hover:border-teal-300/60",
    buttonClass: "bg-navy-700 hover:bg-navy-800",
    benefits: [
      "Detox a očista těla zevnitř",
      "Krása a vitalita zevnitř ven",
      "Hormonální rovnováha a harmonie",
      "Posílení sebevědomí a vnitřní síly",
    ],
  },
];

export function GenderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Průvodce na míru <span className="text-teal-400">právě pro vás</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Vodní půst funguje jinak pro muže a ženy. Náš průvodce respektuje
            fyziologické rozdíly a přizpůsobí se vašim potřebám.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {genderCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <div
                className={`group relative rounded-2xl overflow-hidden border ${card.borderColor} ${card.hoverBorder} transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10`}
              >
                {/* Card background image */}
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${card.overlayColor}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />

                  {/* Title overlaid on image */}
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="p-6 bg-navy-900">
                  <ul className="space-y-3 mb-6">
                    {card.benefits.map((benefit, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.15 + j * 0.1, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <svg
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${card.accentColor}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white/85 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href="/objednavka">
                    <Button
                      size="lg"
                      className={`w-full ${card.buttonClass} text-white text-base py-5 rounded-xl shadow-lg hover:shadow-xl transition-all`}
                    >
                      Chci začít
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
