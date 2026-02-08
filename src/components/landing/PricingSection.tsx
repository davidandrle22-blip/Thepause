"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cenik" className="py-20 gradient-bg-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Investice do vašeho zdraví
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Méně než cena jednoho oběda v restauraci. Výsledky na celý život.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Basic plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full border-2 border-teal-200 bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-teal-100 text-teal-700 hover:bg-teal-100">
                  Nejoblíbenější
                </Badge>
                <h3 className="text-2xl font-bold text-navy-800 mb-2">
                  Průvodce půstem
                </h3>
                <p className="text-sm text-navy-600 mb-6">
                  Kompletní 5denní průvodce hodinu po hodině
                </p>

                <div className="mb-6 flex items-center gap-3">
                  <div>
                    <span className="text-sm text-navy-400 line-through mr-2">
                      399 Kc
                    </span>
                    <span className="text-4xl font-bold text-navy-900">199</span>
                    <span className="text-lg text-navy-600 ml-1">Kc</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Sleva 50%
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-sm text-navy-700">
                  {[
                    "120h interaktivní timeline",
                    "Personalizovaný obsah",
                    "Praktické checklisty",
                    "Doporučené tekutiny & dávkování",
                    "Varovné signály",
                    "Refeeding protokol (den 6-7)",
                    "Deník půstu",
                    "14denní garance vrácení peněz",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
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
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/objednavka">
                  <Button
                    size="lg"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 rounded-xl"
                  >
                    Získat průvodce za 199 Kč
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Card className="h-full border-2 border-gold-300 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gold-400 text-navy-900 text-xs font-bold px-4 py-1 rounded-bl-lg">
                + ODZNAK
              </div>
              <CardContent className="p-8">
                <Badge className="mb-4 bg-gold-100 text-gold-700 hover:bg-gold-100">
                  Kompletní balíček
                </Badge>
                <h3 className="text-2xl font-bold text-navy-800 mb-2">
                  Průvodce + Odznak
                </h3>
                <p className="text-sm text-navy-600 mb-6">
                  Vše z průvodce + exkluzivní certifikát a odznak
                </p>

                <div className="mb-6 flex items-center gap-3">
                  <div>
                    <span className="text-sm text-navy-400 line-through mr-2">
                      599 Kc
                    </span>
                    <span className="text-4xl font-bold text-navy-900">298</span>
                    <span className="text-lg text-navy-600 ml-1">Kc</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Sleva 50%
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-sm text-navy-700">
                  {[
                    "Vše z balíčku Průvodce",
                    "Digitální certifikát o dokončení",
                    "Sdílitelný odznak na sociální sítě",
                    "Statistiky vašeho půstu",
                    "Přístup do komunity",
                    "Budoucí aktualizace zdarma",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gold-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/objednavka?plan=premium">
                  <Button
                    size="lg"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 text-lg py-6 rounded-xl font-bold"
                  >
                    Získat komplet za 298 Kč
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-teal-100">
            <svg
              className="w-5 h-5 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium text-navy-700">
              14denní garance vrácení peněz — žádné riziko
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
