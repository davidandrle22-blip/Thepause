"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  conversionRate: number;
}

interface RecentOrder {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  amount: number;
  status: string;
  discountCode: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PAID: "text-green-400 bg-green-500/10",
  PENDING: "text-yellow-400 bg-yellow-500/10",
  FAILED: "text-red-400 bg-red-500/10",
  REFUNDED: "text-navy-400 bg-navy-500/10",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats);
        setRecentOrders(data.recentOrders ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Celkové tržby",
      value: stats ? `${stats.totalRevenue.toLocaleString("cs-CZ")} Kč` : "—",
      icon: "💰",
      color: "bg-teal-500/10 text-teal-400",
    },
    {
      label: "Objednávky",
      value: stats ? String(stats.totalOrders) : "—",
      icon: "🛒",
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Uživatelé",
      value: stats ? String(stats.totalUsers) : "—",
      icon: "👥",
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      label: "Konverzní rate",
      value: stats ? `${stats.conversionRate}%` : "—",
      icon: "📈",
      color: "bg-gold-500/10 text-gold-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-navy-400 text-sm">
          Přehled vašeho podnikání na The-Pulse.cz
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-navy-800 rounded-xl border border-navy-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${stat.color}`}
              >
                {stat.icon}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">
              {loading ? (
                <span className="inline-block w-16 h-7 bg-navy-700 rounded animate-pulse" />
              ) : (
                stat.value
              )}
            </div>
            <div className="text-sm text-navy-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-navy-800 rounded-xl border border-navy-700 p-6">
        <h2 className="text-lg font-bold text-white mb-4">
          Poslední objednávky
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-navy-700 rounded animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-12 text-navy-400">
            <span className="text-4xl mb-3 block">🛒</span>
            <p>Zatím žádné objednávky</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-navy-400 border-b border-navy-700">
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Plán</th>
                  <th className="pb-3 pr-4">Částka</th>
                  <th className="pb-3 pr-4">Stav</th>
                  <th className="pb-3">Datum</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-navy-700/50 text-sm"
                  >
                    <td className="py-3 pr-4 text-white">{order.email}</td>
                    <td className="py-3 pr-4 text-navy-300">{order.plan}</td>
                    <td className="py-3 pr-4 text-navy-300">
                      {order.amount} Kč
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status] ?? "text-navy-400"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-navy-400 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("cs-CZ")}
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
