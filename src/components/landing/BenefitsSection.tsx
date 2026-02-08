"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    emoji: "🧠",
    title: "Mentalni jasnost a soustredeni",
    description: "Zvysene BDNF — bilkovina pro rust mozkovych bunek. Ostrejsi mysleni a hlubsi soustredeni.",
    color: "bg-gold-50 text-gold-600",
  },
  {
    emoji: "💪",
    title: "Fyzicka regenerace a detox",
    description: "Telo aktivuje prirozene hojive procesy. Ocista organu, snizeni zanetu a celkova obnova.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    emoji: "⚡",
    title: "Zvyseni energie a vitality",
    description: "Po pocatecni adaptaci prijde vlna energie. Telo efektivne spaluje tuky a produkuje ketony.",
    color: "bg-navy-50 text-navy-600",
  },
  {
    emoji: "🧘",
    title: "Duchovni rust a sebepoznani",
    description: "Pust je jednou z nejhlubsich cest k sebepoznani. Objevte novy vztah k jidlu a svemu telu.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    emoji: "💰",
    title: "Financni uspora",
    description: "Za 5 dni bez jidla usetrite 1000-1500 Kc. Pruvodce se vam zaplatí sam.",
    color: "bg-green-50 text-green-600",
  },
  {
    emoji: "🔄",
    title: "Autofagie — obnova bunek",
    description: "Nobelovou cenou oceneny proces bunecne recyklace. Telo odstranuje poskozene bunky a regeneruje nove.",
    color: "bg-teal-50 text-teal-600",
  },
];

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefity" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Proč vodní půst?
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Vědecky podložené přínosy, které vaše tělo zažije během 5 dní.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center text-2xl`}
              >
                {benefit.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-800 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
