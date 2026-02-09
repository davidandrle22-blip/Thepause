"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { jsPDF } from "jspdf";
import { DeviceGate } from "@/components/DeviceGate";
import { GuardedContent } from "@/components/GuardedContent";

function generatePDF(name: string, startDate: string, endDate: string, certId: string) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  // Background
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 297, 210, "F");

  // Gradient overlay
  doc.setFillColor(19, 78, 74);
  doc.rect(0, 70, 297, 70, "F");

  // Border
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.rect(14, 14, 269, 182);

  // Logo text
  doc.setFontSize(12);
  doc.setTextColor(94, 234, 212);
  doc.text("The-Pulse.cz", 148.5, 30, { align: "center" });

  // Title
  doc.setFontSize(14);
  doc.setTextColor(251, 191, 36);
  doc.text("CERTIFIKAT", 148.5, 50, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text("5 DNI VODNIHO PUSTU", 148.5, 65, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(251, 191, 36);
  doc.text("USPESNE DOKONCENO", 148.5, 75, { align: "center" });

  // Name
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(name, 148.5, 100, { align: "center" });

  // Dates
  doc.setFontSize(11);
  doc.setTextColor(153, 246, 228);
  doc.text(`Zahajeni: ${startDate}  |  Dokonceni: ${endDate}`, 148.5, 115, { align: "center" });

  // Stats
  doc.setFontSize(10);
  doc.text("120 hodin | 5 dni | Kompletni autofagie | Reset imunity | Bunecna regenerace", 148.5, 130, { align: "center" });

  // Certificate ID
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Certifikat ID: ${certId}`, 148.5, 150, { align: "center" });
  doc.text(`Datum vystaveni: ${new Date().toLocaleDateString("cs-CZ")}`, 148.5, 158, { align: "center" });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(94, 234, 212);
  doc.text("The-Pulse.cz — Chytry pruvodce vodnim pustem", 148.5, 180, { align: "center" });

  // Verification URL
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Overeni: https://the-pulse.cz/certifikat/${certId}`, 148.5, 188, { align: "center" });

  doc.save(`the-pulse-certifikat-${certId}.pdf`);
}

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
  const [step, setStep] = useState<"form" | "confirmed" | "done">("form");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [certId, setCertId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shared, setShared] = useState(false);

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
      setError("Vyplnte vsechna pole.");
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
        setError(data.error || "Chyba pri vytvareni certifikatu.");
        setLoading(false);
        return;
      }

      setCertId(data.certificate.certificateId);
      setStep("done");
    } catch {
      setError("Chyba pri vytvareni certifikatu.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Dokoncil/a jsem 5denni vodni pust!",
      text: `Prave jsem uspesne dokoncil/a 5denni vodni pust s The-Pulse.cz — 120 hodin, jen voda. Certifikat: ${certId}`,
      url: `https://the-pulse.cz/certifikat/${certId}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared(true);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
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
            <Mascot message="Opravdu jsi to dokazal/a? To je uzasne!" size="sm" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2 text-center">
              Vas certifikat
            </h1>
            <p className="text-navy-600 text-sm text-center mb-6">
              Vyplnte udaje pro generovani certifikatu
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Jmeno a prijmeni
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Jan Novak"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">
                  Datum zahajeni pustu
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
                  Datum dokonceni pustu
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-navy-400 mt-1">
                  Musi byt presne 5 dni po zahajeni
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
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center max-w-lg"
      >
        {/* Badge */}
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="mx-auto mb-8"
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="mx-auto drop-shadow-2xl">
            <circle cx="100" cy="100" r="95" stroke="#fbbf24" strokeWidth="4" fill="none" />
            <circle cx="100" cy="100" r="88" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="85" fill="url(#badgeGrad)" />
            <path d="M100 40l15.5 31.3 34.5 5-25 24.3 5.9 34.4L100 119.8 69.1 135l5.9-34.4-25-24.3 34.5-5L100 40z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
            <text x="100" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5 DNI VODNIHO PUSTU</text>
            <text x="100" y="178" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">DOKONCENO</text>
            <defs>
              <linearGradient id="badgeGrad" x1="15" y1="15" x2="185" y2="185">
                <stop stopColor="#0f172a" />
                <stop offset="0.5" stopColor="#134e4a" />
                <stop offset="1" stopColor="#0f766e" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Gratulujeme, {name}!
          </h1>
          <p className="text-white/60 text-sm mb-6">
            Certifikat ID: {certId}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Dni", value: "5", icon: "📅" },
              { label: "Hodin", value: "120", icon: "⏰" },
              { label: "Spalovani", value: "~1.5kg", icon: "🔥" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <span className="text-2xl">{stat.icon}</span>
                <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Download & Share */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button
              onClick={() => generatePDF(name, startDate, endDate, certId)}
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-5 rounded-xl text-base font-medium shadow-lg"
            >
              Stahnout certifikat (PDF)
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-5 rounded-xl text-base"
            >
              {shared ? "Sdileno!" : "Sdilet"}
            </Button>
          </div>

          {/* Share links */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://the-pulse.cz/certifikat/${certId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm font-bold"
              title="Facebook"
            >
              f
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Dokoncil/a jsem 5denni vodni pust! 🏆`)}&url=${encodeURIComponent(`https://the-pulse.cz/certifikat/${certId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm font-bold"
              title="X/Twitter"
            >
              X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://the-pulse.cz/certifikat/${certId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm font-bold"
              title="LinkedIn"
            >
              in
            </a>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(`https://the-pulse.cz/certifikat/${certId}`);
                setShared(true);
                setTimeout(() => setShared(false), 2000);
              }}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm"
              title="Kopirovat odkaz"
            >
              🔗
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Mascot message="Jsem na tebe neuveritelne hrda! Jsi sampion!" size="sm" />
        </motion.div>
      </motion.div>
    </div>
  );
}
