"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Je vodní půst bezpečný?",
    answer:
      "Pro zdravé dospělé osoby je 5denní vodní půst obecně bezpečný. Nicméně je důležité se předem poradit s lékařem, zejména pokud máte jakékoli zdravotní problémy, užíváte léky, jste těhotná/kojící, nebo máte historii poruch příjmu potravy. Náš průvodce obsahuje jasné varovné signály, kdy půst přerušit.",
  },
  {
    question: "Co budu pít během půstu?",
    answer:
      "Během vodního půstu pijete čistou vodu, neperlivou i perlivou. Průvodce doporučuje také doplnění elektrolytů (sodík, draslík, hořčík) v přesných dávkách. Detailní informace o tekutinách a dávkování najdete v placeném průvodci.",
  },
  {
    question: "Kolik zhubnu za 5 dní?",
    answer:
      "Průměrný úbytek je 3-5 kg, ale závisí na výchozí váze, pohlaví a metabolismu. Část úbytku tvoří voda, která se po ukončení půstu vrátí. Reálný úbytek tuku je přibližně 1-2 kg. V průvodci uvidíte personalizovaný odhad na základě vašich údajů.",
  },
  {
    question: "Co je autofagie a kdy nastává?",
    answer:
      `Autofagie je přirozený proces, při kterém tělo \u201Erecykluje\u201C poškozené buněčné struktury. Významná autofagie nastupuje přibližně po 48-72 hodinách půstu. Nobelovu cenu za objev mechanismu autofagie získal Yoshinori Ohsumi v roce 2016.`,
  },
  {
    question: "Mohu během půstu sportovat?",
    answer:
      "Lehká aktivita jako procházky je v pořádku a dokonce doporučovaná. Intenzivní cvičení se během vodního půstu nedoporučuje, protože tělu chybí energie z potravy. V průvodci najdete doporučení aktivity pro každý den.",
  },
  {
    question: "Co je refeeding a proč je důležitý?",
    answer:
      "Refeeding je proces postupného návratu k jídlu po ukončení půstu. Je to klíčová fáze — příliš rychlý návrat k normální stravě může být nebezpečný (refeeding syndrom). Náš průvodce obsahuje detailní 2denní protokol bezpečného návratu k jídlu.",
  },
  {
    question: "Co obsahuje placený průvodce?",
    answer:
      "Interaktivní timeline 120 hodin (hodinu po hodině), personalizovaný obsah podle vašeho cíle (hubnutí/mentální reset/zdraví), praktické checklisty, doporučené tekutiny s dávkováním, varovné signály, deník půstu, refeeding protokol a certifikát o dokončení.",
  },
  {
    question: "Mohu dostat vrácení peněz?",
    answer:
      "Ano, nabízíme 14denní garanci vrácení peněz bez udání důvodu. Pokud nebudete spokojeni, napište nám na the-pause@seznam.cz a peníze vám vrátíme.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Časté dotazy
          </h2>
          <p className="text-lg text-navy-600">
            Odpovědi na vše, co potřebujete vědět před zahájením.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-gray-50 rounded-xl px-6 border border-gray-100"
              >
                <AccordionTrigger className="text-left font-semibold text-navy-800 hover:text-teal-600 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-navy-600 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
