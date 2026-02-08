"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const personas = [
  {
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="28" fill="url(#grad1)" fillOpacity="0.12" />
        <path d="M28 16v4m0 16v4m-12-12h4m16 0h4m-8.485-8.485l2.828-2.828m-16.97 16.97l2.828-2.828m11.314 0l2.828 2.828M19.172 19.172l2.828 2.828" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="28" r="6" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#14b8a6" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Chci zhubnout",
    description:
      "Vodní půst je účinný způsob jak nastartovat hubnutí a resetovat metabolismus. Uvidíte přesně, kdy tělo spaluje tuky.",
    gradient: "from-teal-500/5 to-teal-600/10",
  },
  {
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="28" fill="url(#grad2)" fillOpacity="0.12" />
        <path d="M28 14c-1.5 5-6 8-6 14a6 6 0 0012 0c0-6-4.5-9-6-14z" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M25 32s1 3 3 3 3-3 3-3" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="40" r="2" fill="#14b8a6" fillOpacity="0.4" />
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#14b8a6" />
            <stop offset="1" stopColor="#1e40af" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Mentální reset",
    description:
      "Půst přináší mimořádnou mentální jasnost. Ideální pro ty, kdo hledají hlubší soustředění a duševní očistu.",
    gradient: "from-navy-500/5 to-teal-500/10",
  },
  {
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="28" fill="url(#grad3)" fillOpacity="0.12" />
        <path d="M28 18l2.5 5.1 5.6.8-4.05 3.95.96 5.55L28 30.65l-5.01 2.75.96-5.55L19.9 23.9l5.6-.8L28 18z" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M20 38c2-2 5-3 8-3s6 1 8 3" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="grad3" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#0d9488" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Zdravotní benefity",
    description:
      "Autofagie, regenerace imunitního systému, snížení zánětu. Vědecky podložené přínosy pro vaše zdraví.",
    gradient: "from-teal-600/5 to-teal-400/10",
  },
  {
    icon: (
      <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="28" fill="url(#grad4)" fillOpacity="0.12" />
        <path d="M28 16v12l6 6" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="28" r="12" stroke="#0d9488" strokeWidth="2" fill="none" />
        <path d="M22 40l-2 4m16-4l2 4" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="grad4" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#1e40af" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Výzva & disciplína",
    description:
      "Hledáte způsob, jak otestovat svou vůli? 5denní vodní půst je jednou z nejtěžších výzev, kterou můžete podstoupit.",
    gradient: "from-navy-500/5 to-navy-400/10",
  },
];

export function ForWhoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 gradient-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Pro koho je průvodce?
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Ať už je vaše motivace jakákoliv, The-Pulse vás provede bezpečně.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Card className="group h-full border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="relative p-6 text-center">
                  {/* Subtle gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div className="flex justify-center mb-5">
                      {persona.icon}
                    </div>
                    <h3 className="text-lg font-bold text-navy-800 mb-3">
                      {persona.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
