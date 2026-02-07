"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NastaveniPage() {
  const [prices, setPrices] = useState({ basic: "199", premium: "298" });
  const [seo, setSeo] = useState({
    title: "ThePause.cz — Chytrý průvodce 5denním vodním půstem",
    description:
      "Interaktivní průvodce vodním půstem, který vás provede hodinu po hodině. 5 dní, jen voda, vaše restart tlačítko.",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.priceBasic) setPrices({ basic: data.priceBasic, premium: data.pricePremium });
        if (data.seoTitle) setSeo({ title: data.seoTitle, description: data.seoDescription });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceBasic: prices.basic,
          pricePremium: prices.premium,
          seoTitle: seo.title,
          seoDescription: seo.description,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Nastavení</h1>
        <p className="text-navy-400 text-sm">Ceny, SEO a konfigurace webu</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-navy-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-800 rounded-xl border border-navy-700 p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4">Ceny produktů</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-navy-300 mb-1">
                  Základní průvodce (Kč)
                </label>
                <input
                  type="number"
                  value={prices.basic}
                  onChange={(e) =>
                    setPrices((p) => ({ ...p, basic: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-navy-300 mb-1">
                  Průvodce + Odznak (Kč)
                </label>
                <input
                  type="number"
                  value={prices.premium}
                  onChange={(e) =>
                    setPrices((p) => ({ ...p, premium: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* SEO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-navy-800 rounded-xl border border-navy-700 p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              SEO nastavení
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-navy-300 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seo.title}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  {seo.title.length}/60 znaků
                </p>
              </div>
              <div>
                <label className="block text-sm text-navy-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={seo.description}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-navy-500 mt-1">
                  {seo.description.length}/160 znaků
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stripe status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-navy-800 rounded-xl border border-navy-700 p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Stripe propojení
            </h2>
            <div className="flex items-center gap-3 p-4 bg-navy-700/50 rounded-xl border border-navy-600">
              <div
                className={`w-3 h-3 rounded-full ${process.env.NEXT_PUBLIC_STRIPE_KEY ? "bg-green-500" : "bg-yellow-500"}`}
              />
              <span className="text-sm text-navy-300">
                {process.env.NEXT_PUBLIC_STRIPE_KEY
                  ? "Stripe je napojen"
                  : "Stripe není napojen — nastavte API klíče v .env souboru"}
              </span>
            </div>
          </motion.div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-5 rounded-xl disabled:opacity-50"
          >
            {saved ? "Uloženo!" : saving ? "Ukládám..." : "Uložit nastavení"}
          </Button>
        </div>
      )}
    </div>
  );
}
