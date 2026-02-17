"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { DeviceGate } from "@/components/DeviceGate";
import { GuardedContent } from "@/components/GuardedContent";
import FastingCertificate from "@/components/FastingCertificate";

export default function OdznakPage() {
  return (
    <DeviceGate>
      <GuardedContent>
        <OdznakContent />
      </GuardedContent>
    </DeviceGate>
  );
}

function OdznakContent() {
  const [step, setStep] = useState<"form" | "done">("form");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [certId, setCertId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    if (val) {
      const start = new Date(val);
      start.setDate(start.getDate() + 5);
      setEndDate(start.toISOString().split("T")[0]);
    }
  };

  const handleGenerateCert = async () => {
    setError("");
    if (!name.trim() || !startDate || !endDate) {
      setError("Vyplňte všechna pole.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, startDate, endDate }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Chyba při vytváření certifikátu.");
        setLoading(false);
        return;
      }

      setCertId(data.certificate.certificateId);
      setStep("done");
    } catch {
      setError("Chyba při vytváření certifikátu.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "form") {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Mascot message="Opravdu jsi to dokázal/a? To je úžasné!" size="sm" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2 text-center">
              Váš certifikát
            </h1>
            <p className="text-navy-600 text-sm text-center mb-6">
              Vyplňte údaje pro generování certifikátu
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Jméno a příjmení
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Datum zahájení půstu
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Datum dokončení půstu
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-navy-400 mt-1">
                  Musí být přesně 5 dní po zahájení
                </p>
              </div>
            </div>

            <Button
              onClick={handleGenerateCert}
              disabled={loading}
              className="w-full mt-6 bg-gold-500 hover:bg-gold-600 text-white py-6 rounded-xl text-base font-bold shadow-lg disabled:opacity-50"
            >
              {loading ? "Generuji certifikat..." : "Vygenerovat certifikat"}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <FastingCertificate
          userName={name}
          completionDate={endDate}
          certificateId={certId}
        />
      </motion.div>
    </div>
  );
}
