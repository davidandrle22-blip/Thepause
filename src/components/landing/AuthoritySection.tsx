"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AUTHORITIES = [
  {
    icon: "🏆",
    title: "Nobelova cena 2016",
    text: "Yoshinori Ohsumi získal Nobelovu cenu za medicínu za výzkum autofagie — buněčného procesu, který se aktivuje při půstu.",
  },
  {
    icon: "🔬",
    title: "Studie v NEJM",
    text: "New England Journal of Medicine potvrzuje benefity intermittentního půstu na metabolické zdraví, kognitivní funkce a dlouhověkost.",
  },
  {
    icon: "📚",
    title: "Tisíciletá tradice",
    text: "Vodní půst praktikují kultury po celém světě tisíce let. Moderní věda teprve nyní potvrzuje, co naši předkové věděli.",
  },
];

const GUARANTEES = [
  { icon: "🛡️", text: "14denní garance vrácení peněz" },
  { icon: "🔒", text: "Bezpečná platba přes Stripe" },
  { icon: "📱", text: "Okamžitý přístup po zaplacení" },
  { icon: "🇨🇿", text: "Český produkt, česká podpora" },
];

export function AuthoritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-navy-50" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Science section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Podloženo vědou
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Vodní půst není módní trend — je to vědecky zkoumaná metoda s
            prokazatelnými výsledky
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {AUTHORITIES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-navy-100 text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {item.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Guarantee section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-teal-200 shadow-md text-center"
        >
          <h3 className="text-xl font-bold text-navy-900 mb-2">
            Nakupujete bez rizika
          </h3>
          <p className="text-navy-600 text-sm mb-6">
            Nejste spokojeni? Vrátíme vám peníze bez otázek.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {GUARANTEES.map((g, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
                className="flex items-center gap-2 text-sm text-navy-700 font-medium"
              >
                <span className="text-lg">{g.icon}</span>
                {g.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
