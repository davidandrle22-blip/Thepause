"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-10 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="38" viewBox="0 0 90 108" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 4C45 4 10 52 10 72C10 92 25 104 45 104C65 104 80 92 80 72C80 52 45 4 45 4Z" fill="url(#headerDrop)" stroke="#0f766e" strokeWidth="2"/>
              <defs>
                <linearGradient id="headerDrop" x1="45" y1="0" x2="45" y2="108" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#5eead4"/>
                  <stop offset="100%" stopColor="#0d9488"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold gradient-text">The-Pulse.cz</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#jak-to-funguje" className="text-sm font-medium text-navy-700 hover:text-teal-600 transition-colors">
              Jak to funguje
            </a>
            <a href="#benefity" className="text-sm font-medium text-navy-700 hover:text-teal-600 transition-colors">
              Benefity
            </a>
            <a href="#faq" className="text-sm font-medium text-navy-700 hover:text-teal-600 transition-colors">
              FAQ
            </a>
            <a href="#cenik" className="text-sm font-medium text-navy-700 hover:text-teal-600 transition-colors">
              Ceník
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <Link href={session.user.role === "ADMIN" ? "/admin" : "/pruvodce"}>
                  <Button variant="ghost" size="sm" className="text-navy-700">
                    {session.user.role === "ADMIN" ? "Admin" : "Průvodce"}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-navy-500"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Odhlásit se
                </Button>
              </>
            ) : (
              <>
                <Link href="/prihlaseni">
                  <Button variant="ghost" size="sm" className="text-navy-700">
                    Přihlásit se
                  </Button>
                </Link>
                <Link href="/objednavka">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                    Začít půst
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-teal-100"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              <a href="#jak-to-funguje" className="text-sm font-medium text-navy-700 py-2" onClick={() => setMobileOpen(false)}>
                Jak to funguje
              </a>
              <a href="#benefity" className="text-sm font-medium text-navy-700 py-2" onClick={() => setMobileOpen(false)}>
                Benefity
              </a>
              <a href="#faq" className="text-sm font-medium text-navy-700 py-2" onClick={() => setMobileOpen(false)}>
                FAQ
              </a>
              <a href="#cenik" className="text-sm font-medium text-navy-700 py-2" onClick={() => setMobileOpen(false)}>
                Ceník
              </a>
              <div className="flex gap-2 pt-2">
                {session?.user ? (
                  <>
                    <Link href={session.user.role === "ADMIN" ? "/admin" : "/pruvodce"} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setMobileOpen(false)}>
                        {session.user.role === "ADMIN" ? "Admin" : "Průvodce"}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-navy-500"
                      onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                    >
                      Odhlásit se
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/prihlaseni" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Přihlásit se
                      </Button>
                    </Link>
                    <Link href="/objednavka" className="flex-1">
                      <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                        Začít půst
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
