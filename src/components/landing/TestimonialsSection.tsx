"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Petra K.",
    age: 34,
    text: "Po 5 dnech jsem se cítila jako nový člověk. Průvodce mi pomohl překonat nejtěžší chvíle — hlavně den 2 a 3. Kapička mě vždy rozveselila!",
    result: "Zhubla 4,8 kg",
    avatar: "PK",
  },
  {
    name: "Martin D.",
    age: 41,
    text: "Jako programátor jsem ocenil mentální jasnost po 3. dni. Nikdy jsem se nesoustředil tak dobře. Ten průvodce hodinu po hodině je geniální.",
    result: "Mentální reset",
    avatar: "MD",
  },
  {
    name: "Jana S.",
    age: 28,
    text: "Bála jsem se, ale díky podrobným informacím o tom, co se v těle děje, jsem věděla, že je vše v pořádku. Refeeding protokol byl super bonus.",
    result: "Zhubla 3,2 kg",
    avatar: "JS",
  },
  {
    name: "Tomas R.",
    age: 52,
    text: "Po letech se mi podařilo resetovat metabolismus. Inzulínová rezistence se výrazně zlepšila. Investice 199 Kč, která se vyplatila tisíckrát.",
    result: "Zdravotní benefity",
    avatar: "TR",
  },
  {
    name: "Lucie M.",
    age: 31,
    text: "Vždycky jsem se bála půstu, ale tento průvodce mi dal jistotu. Každá hodina je podrobně popsána a věděla jsem přesně, co očekávat. Doporučuji všem!",
    result: "Zhubla 3,9 kg",
    avatar: "LM",
  },
  {
    name: "Jakub V.",
    age: 38,
    text: "Nejlepší investice do zdraví, co jsem kdy udělal. Za 199 Kč dostanete průvodce, který vám otevře oči. Po půstu jsem se cítil o 10 let mladší.",
    result: "Kompletní regenerace",
    avatar: "JV",
  },
];

export function TestimonialsSection() {
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
            Co říkají ostatní?
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-3">
            Tisíce lidí už zvládly svůj 5denní vodní půst s naším průvodcem.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-navy-700">4.9/5</span>
            <span className="text-sm text-navy-500">(2 847+ hodnocení)</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-teal-100 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className="w-5 h-5 text-gold-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-navy-700 mb-4 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-800">
                          {t.name}
                        </p>
                        <p className="text-xs text-navy-500">{t.age} let</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                      {t.result}
                    </span>
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
