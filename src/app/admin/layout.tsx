"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/objednavky", label: "Objednávky", icon: "🛒" },
  { href: "/admin/uzivatele", label: "Uživatelé", icon: "👥" },
  { href: "/admin/slevy", label: "Slevové kódy", icon: "🏷️" },
  { href: "/admin/nastaveni", label: "Nastavení", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 border-r border-navy-700 flex-shrink-0">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold text-white">
            ThePause<span className="text-teal-400">.cz</span>
          </Link>
          <p className="text-xs text-navy-400 mt-1">Admin Panel</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-600/20 text-teal-400"
                    : "text-navy-300 hover:bg-navy-700 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 text-sm text-navy-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Zpět na web
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
