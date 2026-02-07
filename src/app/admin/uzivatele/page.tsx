"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  gender: string | null;
  goal: string | null;
  plan: string | null;
  createdAt: string;
}

const genderLabels: Record<string, string> = {
  MALE: "Muž",
  FEMALE: "Žena",
};

const goalLabels: Record<string, string> = {
  WEIGHT_LOSS: "Hubnutí",
  MENTAL_RESET: "Mentální reset",
  PHYSICAL_REGENERATION: "Regenerace",
};

const roleColors: Record<string, string> = {
  ADMIN: "text-gold-400 bg-gold-500/10",
  USER: "text-navy-400 bg-navy-500/10",
};

export default function UzivatelePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Uživatelé</h1>
        <p className="text-navy-400 text-sm">
          Přehled registrovaných uživatelů ({loading ? "..." : users.length})
        </p>
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
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-navy-400">
            <span className="text-3xl block mb-2">👥</span>
            Zatím žádní uživatelé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-navy-400 border-b border-navy-700">
                  <th className="p-4">Jméno</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Plán</th>
                  <th className="p-4">Pohlaví</th>
                  <th className="p-4">Cíl</th>
                  <th className="p-4">Registrace</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-navy-700/50 text-sm"
                  >
                    <td className="p-4 text-white">
                      {user.name || "—"}
                    </td>
                    <td className="p-4 text-navy-300">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${roleColors[user.role] ?? ""}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-navy-300">
                      {user.plan ?? "—"}
                    </td>
                    <td className="p-4 text-navy-300">
                      {user.gender ? genderLabels[user.gender] ?? user.gender : "—"}
                    </td>
                    <td className="p-4 text-navy-300">
                      {user.goal ? goalLabels[user.goal] ?? user.goal : "—"}
                    </td>
                    <td className="p-4 text-navy-400 text-xs">
                      {new Date(user.createdAt).toLocaleDateString("cs-CZ")}
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
