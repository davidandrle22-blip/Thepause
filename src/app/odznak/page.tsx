"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";

function useCertificateDownload() {
  const download = useCallback((userName?: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, "#0f172a");
    grad.addColorStop(0.5, "#134e4a");
    grad.addColorStop(1, "#0f766e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 740);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 1120, 720);

    // Star (center top)
    ctx.save();
    ctx.translate(600, 200);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * 60;
      const y = Math.sin(angle) * 60;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Title
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 20px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFIKÁT", 600, 310);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px system-ui, sans-serif";
    ctx.fillText("5 DNÍ VODNÍHO PŮSTU", 600, 370);

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("ÚSPĚŠNĚ DOKONČENO", 600, 410);

    // Name
    if (userName) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 28px system-ui, sans-serif";
      ctx.fillText(userName, 600, 470);
    }

    // Stats
    ctx.fillStyle = "#99f6e4";
    ctx.font = "16px system-ui, sans-serif";
    const stats = [
      "120 hodin | 5 dní | ~1.5 kg spalování tuku",
      "Kompletní autofagie | Reset imunity | Buněčná regenerace",
    ];
    stats.forEach((line, i) => {
      ctx.fillText(line, 600, 530 + i * 30);
    });

    // Date
    ctx.fillStyle = "#5eead4";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText(
      `Datum: ${new Date().toLocaleDateString("cs-CZ")}`,
      600,
      620
    );

    // Footer
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText("ThePause.cz — Chytrý průvodce vodním půstem", 600, 720);

    // Download
    const link = document.createElement("a");
    link.download = "thepause-certifikat.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return download;
}

export default function OdznakPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [shared, setShared] = useState(false);
  const downloadCertificate = useCertificateDownload();
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const shareData = {
      title: "Dokončil/a jsem 5denní vodní půst!",
      text: "Právě jsem úspěšně dokončil/a 5denní vodní půst s ThePause.cz — 120 hodin, jen voda. Autofagie, reset imunity a nový vztah k jídlu!",
      url: "https://thepause.cz",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared(true);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  if (!confirmed) {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Mascot message="Opravdu jsi to dokázal/a? To je úžasné!" size="sm" />

          <div className="mt-8 bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-4">
              Dokončení půstu
            </h1>
            <p className="text-navy-600 mb-6">
              Potvrzuji, že jsem úspěšně dokončil/a 5denní vodní půst a chci
              získat svůj odznak a vyhodnocení.
            </p>

            <Button
              onClick={() => setConfirmed(true)}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white py-6 rounded-xl text-base font-bold shadow-lg"
            >
              Ano, dokončil/a jsem!
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
          ref={badgeRef}
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="mx-auto mb-8"
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            className="mx-auto drop-shadow-2xl"
          >
            <circle cx="100" cy="100" r="95" stroke="#fbbf24" strokeWidth="4" fill="none" />
            <circle cx="100" cy="100" r="88" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="85" fill="url(#badgeGrad)" />
            <path
              d="M100 40l15.5 31.3 34.5 5-25 24.3 5.9 34.4L100 119.8 69.1 135l5.9-34.4-25-24.3 34.5-5L100 40z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text
              x="100"
              y="160"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              5 DNI VODNIHO PUSTU
            </text>
            <text
              x="100"
              y="178"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="10"
              fontWeight="bold"
            >
              DOKONCENO
            </text>
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
          <h1 className="text-3xl font-bold text-white mb-4">
            Gratulujeme!
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
            Úspěšně jste dokončili 5denní vodní půst. Vaše tělo prošlo
            kompletní regenerací — autofagie, reset imunitního systému a
            hluboká buněčná obnova.
          </p>

          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Dní", value: "5", icon: "📅" },
              { label: "Hodin", value: "120", icon: "⏰" },
              { label: "Spalování", value: "~1.5kg", icon: "🔥" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <span className="text-2xl">{stat.icon}</span>
                <div className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* What you achieved */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 text-left">
            <h3 className="text-white font-bold mb-3">
              Co vaše tělo prošlo:
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                "Kompletní přechod do ketózy a spalování tuků",
                "Aktivace autofagie — recyklace poškozených buněk",
                "Reset imunitního systému a tvorba nových kmenových buněk",
                "Zvýšení růstového hormonu až o 300%",
                "Snížení zánětlivých markerů v těle",
                "Zlepšení inzulínové citlivosti",
                "Mentální jas a nový vztah k jídlu",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0"
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
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleShare}
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-5 rounded-xl text-base font-medium shadow-lg"
            >
              {shared ? "Sdíleno!" : "Sdílet na sociální sítě"}
            </Button>
            <Button
              onClick={() => downloadCertificate()}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-5 rounded-xl text-base"
            >
              Stáhnout certifikát
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Mascot
            message="Jsem na tebe neuvěřitelně hrdá! Jsi šampion!"
            size="sm"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
