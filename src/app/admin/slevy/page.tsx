"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Discount {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
  validUntil: string | null;
  createdAt: string;
}

export default function SlevyPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    maxUses: "",
  });

  const fetchDiscounts = () => {
    fetch("/api/admin/discounts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDiscounts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleCreate = async () => {
    if (!form.code || !form.discountValue) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ code: "", discountType: "PERCENTAGE", discountValue: "", maxUses: "" });
        setShowForm(false);
        fetchDiscounts();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Slevové kódy</h1>
          <p className="text-navy-400 text-sm">
            Správa slevových kódů a akcí ({loading ? "..." : discounts.length})
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          + Nový kód
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-800 rounded-xl border border-navy-700 p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">
            Vytvořit slevový kód
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-navy-300 mb-1">Kód</label>
              <input
                type="text"
                placeholder="SLEVA20"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-navy-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">
                Typ slevy
              </label>
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discountType: e.target.value }))
                }
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="PERCENTAGE">Procentuální (%)</option>
                <option value="FIXED">Fixní částka (Kč)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">
                Hodnota
              </label>
              <input
                type="number"
                placeholder="20"
                value={form.discountValue}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discountValue: e.target.value }))
                }
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-navy-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-navy-300 mb-1">
                Max. použití (prázdné = neomezeno)
              </label>
              <input
                type="number"
                placeholder="100"
                value={form.maxUses}
                onChange={(e) =>
                  setForm((f) => ({ ...f, maxUses: e.target.value }))
                }
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-navy-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleCreate}
              disabled={saving || !form.code || !form.discountValue}
              className="bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
            >
              {saving ? "Vytvářím..." : "Vytvořit"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-navy-600 text-navy-300 hover:bg-navy-700"
            >
              Zrušit
            </Button>
          </div>
        </motion.div>
      )}

      <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 bg-navy-700 rounded animate-pulse" />
            ))}
          </div>
        ) : discounts.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            <span className="text-3xl block mb-2">🏷️</span>
            Zatím žádné slevové kódy.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-navy-400 border-b border-navy-700">
                  <th className="p-4">Kód</th>
                  <th className="p-4">Typ</th>
                  <th className="p-4">Hodnota</th>
                  <th className="p-4">Použití</th>
                  <th className="p-4">Aktivní</th>
                  <th className="p-4">Vytvořeno</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-navy-700/50 text-sm"
                  >
                    <td className="p-4 text-white font-mono font-bold">
                      {d.code}
                    </td>
                    <td className="p-4 text-navy-300">
                      {d.discountType === "PERCENTAGE" ? "%" : "Kč"}
                    </td>
                    <td className="p-4 text-navy-300">
                      {d.discountValue}
                      {d.discountType === "PERCENTAGE" ? " %" : " Kč"}
                    </td>
                    <td className="p-4 text-navy-300">
                      {d.currentUses}/{d.maxUses ?? "∞"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${d.isActive ? "bg-green-400" : "bg-red-400"}`}
                      />
                    </td>
                    <td className="p-4 text-navy-400 text-xs">
                      {new Date(d.createdAt).toLocaleDateString("cs-CZ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
