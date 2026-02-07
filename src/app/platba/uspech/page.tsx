"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

export default function PlatbaUspechPage() {
  return (
    <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <Mascot message="Hurá! Platba proběhla úspěšně!" size="lg" />

        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            Platba úspěšná!
          </h1>
          <p className="text-navy-600 mb-6">
            Váš přístup k průvodci je nyní aktivní. Můžete začít svou 5denní
            cestu.
          </p>

          <Link href="/pruvodce">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg">
              Začít průvodce
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
