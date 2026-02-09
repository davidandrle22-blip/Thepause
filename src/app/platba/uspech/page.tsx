"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import { Confetti } from "@/components/Confetti";

export default function PlatbaUspechPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen gradient-bg-light flex items-center justify-center">
          <div className="animate-pulse text-navy-600">Ověřuji platbu...</div>
        </div>
      }
    >
      <UspechContent />
    </Suspense>
  );
}

type PaymentData = {
  paid: boolean;
  email: string;
  plan: string;
  name: string;
};

function UspechContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isBypass = searchParams.get("bypass") === "true";

  const [verifying, setVerifying] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [verifyError, setVerifyError] = useState("");

  // Registration form
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [regError, setRegError] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Verify payment on mount
  useEffect(() => {
    // Bypass mode — skip Stripe verification
    if (isBypass) {
      setPaymentData({
        paid: true,
        email: searchParams.get("email") || "",
        plan: searchParams.get("plan") || "BASIC",
        name: "",
      });
      setVerifying(false);
      return;
    }

    if (!sessionId) {
      setVerifyError("Chybí identifikátor platby.");
      setVerifying(false);
      return;
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.paid) {
          setPaymentData(data);
        } else {
          setVerifyError("Platba nebyla potvrzena. Zkuste to prosím znovu.");
        }
        setVerifying(false);
      })
      .catch(() => {
        setVerifyError("Nepodařilo se ověřit platbu.");
        setVerifying(false);
      });
  }, [sessionId, isBypass, searchParams]);

  // Countdown after registration
  useEffect(() => {
    if (!done) return;
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = "/pruvodce";
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [done]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegistering(true);

    try {
      // If not already known as existing user, try to register first
      if (!existingUser) {
        const regRes = await fetch("/api/registrace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: paymentData?.name || "",
            email: paymentData?.email,
            password,
            gender: "",
            goal: "",
          }),
        });

        const regData = await regRes.json();

        if (regRes.status === 409) {
          // User already exists — switch to "existing user" mode
          setExistingUser(true);
          setPassword("");
          setRegError("");
          setRegistering(false);
          return;
        }

        if (!regRes.ok) {
          setRegError(regData.error || "Chyba při registraci.");
          setRegistering(false);
          return;
        }
      }

      // Sign in (with new password for new users, existing password for existing users)
      const signInRes = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: paymentData?.email,
          password,
        }),
      });

      if (!signInRes.ok) {
        const signInData = await signInRes.json();
        setRegError(
          existingUser
            ? "Nesprávné heslo. Zadejte heslo ke svému stávajícímu účtu."
            : signInData.error || "Přihlášení selhalo."
        );
        setRegistering(false);
        return;
      }

      // Link order to user
      await fetch("/api/link-order", { method: "POST" });

      // Refresh JWT so hasPaid is set
      await fetch("/api/auth/refresh-token", { method: "POST" });

      setDone(true);
    } catch {
      setRegError("Došlo k neočekávané chybě.");
      setRegistering(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // JWT callback auto-links orphaned orders by email and sets hasPaid
    // so we can redirect straight to /pruvodce
    signIn("google", {
      callbackUrl: "/pruvodce",
    });
  };

  // Loading state
  if (verifying) {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto" />
          <p className="mt-4 text-navy-600">Ověřuji platbu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (verifyError) {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Mascot message="Hmm, něco se nepovedlo..." size="sm" />
          <div className="mt-8 bg-white rounded-2xl shadow-xl border border-red-100 p-8">
            <h1 className="text-xl font-bold text-navy-900 mb-2">
              Platbu se nepodařilo ověřit
            </h1>
            <p className="text-navy-600 mb-6">{verifyError}</p>
            <Button
              onClick={() => (window.location.href = "/objednavka")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-xl"
            >
              Zkusit znovu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Done — redirect to guide
  if (done) {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <Mascot message="Hurá! Vše je připraveno!" size="lg" />
          <div className="mt-8 bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-2">
              {existingUser ? "Přihlášení úspěšné!" : "Účet vytvořen!"}
            </h1>
            <p className="text-navy-600 mb-6">
              Přesměrování na průvodce za {countdown}s...
            </p>
            <Button
              onClick={() => {
                window.location.href = "/pruvodce";
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg"
            >
              Otevřít průvodce
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main: registration form after successful payment
  return (
    <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
      <Confetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full"
      >
        <Mascot message="Platba proběhla úspěšně!" size="lg" />

        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            Platba úspěšná!
          </h1>
          <p className="text-navy-600 mb-6">
            {existingUser
              ? "Účet s tímto emailem již existuje. Přihlaste se svým stávajícím heslem."
              : "Nyní si vytvořte účet pro přístup k průvodci"}
          </p>

          {paymentData && (
            <div className="bg-teal-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-teal-800">
                <strong>Email:</strong> {paymentData.email}
              </p>
              <p className="text-sm text-teal-800">
                <strong>Plán:</strong>{" "}
                {paymentData.plan === "PREMIUM"
                  ? "Průvodce + Odznak"
                  : "Základní průvodce"}
              </p>
            </div>
          )}

          {regError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {regError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy-700 mb-1"
              >
                {existingUser ? "Vaše stávající heslo *" : "Vytvořte si heslo *"}
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                placeholder="Alespoň 6 znaků"
              />
              <p className="text-xs text-navy-500 mt-1">
                {existingUser
                  ? `Zadejte heslo k účtu ${paymentData?.email}`
                  : `Heslo k účtu ${paymentData?.email}`}
              </p>
            </div>

            <Button
              type="submit"
              disabled={registering || password.length < 6}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {registering
                ? (existingUser ? "Přihlašuji..." : "Vytvářím účet...")
                : (existingUser ? "Přihlásit se a otevřít průvodce" : "Vytvořit účet a otevřít průvodce")}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-navy-500">nebo</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm font-medium text-navy-700">
              Pokračovat přes Google
            </span>
          </button>

          {!existingUser && (
            <p className="text-xs text-navy-400 mt-4">
              Již máte účet? Zadejte své stávající heslo výše.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
