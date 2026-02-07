"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Order {
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

const statusLabels: Record<string, string> = {
  PAID: "Zaplaceno",
  PENDING: "Čekající",
  FAILED: "Selhalo",
  REFUNDED: "Vráceno",
};

const filters = [
  { label: "Všechny", value: "" },
  { label: "Zaplacené", value: "PAID" },
  { label: "Čekající", value: "PENDING" },
  { label: "Selhané", value: "FAILED" },
];

export default function ObjednavkyPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("");

  const fetchOrders = (status: string) => {
    setLoading(true);
    const url = status
      ? `/api/admin/orders?status=${status}`
      : "/api/admin/orders";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Objednávky</h1>
        <p className="text-navy-400 text-sm">
          Seznam všech objednávek a stav plateb
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              activeFilter === filter.value
                ? "bg-teal-600/20 text-teal-400 border-teal-500"
                : "bg-navy-800 text-navy-300 border-navy-700 hover:border-teal-500 hover:text-teal-400"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden"
      >
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-navy-700 rounded animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            <span className="text-3xl block mb-2">📦</span>
            Žádné objednávky
            {activeFilter && " pro tento filtr"}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-navy-400 border-b border-navy-700">
                  <th className="p-4">ID</th>
                  <th className="p-4">Uživatel</th>
                  <th className="p-4">Plán</th>
                  <th className="p-4">Částka</th>
                  <th className="p-4">Stav</th>
                  <th className="p-4">Slevový kód</th>
                  <th className="p-4">Datum</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-navy-700/50 text-sm"
                  >
                    <td className="p-4 text-navy-400 font-mono text-xs">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="p-4">
                      <div className="text-white text-sm">{order.email}</div>
                      {order.name && (
                        <div className="text-navy-400 text-xs">{order.name}</div>
                      )}
                    </td>
                    <td className="p-4 text-navy-300">{order.plan}</td>
                    <td className="p-4 text-navy-300">{order.amount} Kč</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status] ?? ""}`}
                      >
                        {statusLabels[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="p-4 text-navy-400 text-xs">
                      {order.discountCode ?? "—"}
                    </td>
                    <td className="p-4 text-navy-400 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("cs-CZ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
