"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

export default function PlatbaZrusenoPage() {
  return (
    <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <Mascot message="Nevadí, můžeš to zkusit znovu kdykoliv!" size="sm" />

        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            Platba zrušena
          </h1>
          <p className="text-navy-600 mb-6">
            Vaše platba nebyla dokončena. Pokud se chcete vrátit k nákupu,
            klikněte níže.
          </p>

          <div className="space-y-3">
            <Link href="/objednavka">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-xl text-base font-medium">
                Dokončit objednávku
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-50 py-5 rounded-xl text-base"
              >
                Zpět na hlavní stránku
              </Button>
            </Link>
          </div>

          <p className="text-xs text-navy-400 mt-6">
            Máte otázky? Napište nám na{" "}
            <a href="mailto:the-pause@seznam.cz" className="text-teal-600 hover:underline">
              the-pause@seznam.cz
            </a>
          </p>
          <p className="text-xs text-navy-400 mt-2">
            Již 2 800+ spokojených zákazníků
          </p>
        </div>
      </motion.div>
    </div>
  );
}
