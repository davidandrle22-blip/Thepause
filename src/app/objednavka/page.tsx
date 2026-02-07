"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import Link from "next/link";

export default function ObjednavkaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen gradient-bg-light flex items-center justify-center">
          <div className="animate-pulse text-navy-600">Načítání...</div>
        </div>
      }
    >
      <ObjednavkaContent />
    </Suspense>
  );
}

type Gender = "MALE" | "FEMALE" | null;
type Goal = "WEIGHT_LOSS" | "MENTAL_RESET" | "PHYSICAL_REGENERATION" | null;

function ObjednavkaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "basic";

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>(null);
  const [goal, setGoal] = useState<Goal>(null);
  const [plan, setPlan] = useState<"basic" | "premium">(
    initialPlan === "premium" ? "premium" : "basic"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [testMode, setTestMode] = useState(process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true");

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.bypassStripe) setTestMode(true);
      })
      .catch(() => {});
  }, []);

  const canProceedStep1 = name.trim().length > 0 && gender !== null;
  const canProceedStep2 = goal !== null;

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const isTestMode = testMode;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!consent) {
      setError("Musíte potvrdit souhlas s upozorněním.");
      return;
    }

    setLoading(true);

    // Test mode — skip registration, login & Stripe
    if (isTestMode) {
      router.push("/platba/uspech");
      return;
    }

    try {
      const res = await fetch("/api/registrace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, gender, goal }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok || result?.error) {
        setError(
          "Registrace proběhla, ale přihlášení selhalo. Zkuste se přihlásit."
        );
        setLoading(false);
        return;
      }

      // Full page navigation (not client-side) so browser follows the Stripe redirect
      window.location.href = `/api/checkout?plan=${plan}`;
    } catch {
      setError("Došlo k neočekávané chybě. Zkuste to znovu.");
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen gradient-bg-light flex flex-col items-center px-4 py-8 pt-24">
      {/* Progress bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step > s
                    ? "bg-teal-500 text-white"
                    : step === s
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`hidden sm:block w-20 md:w-32 h-1 rounded-full transition-all duration-300 ${
                    step > s ? "bg-teal-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-navy-500">
          <span>O vás</span>
          <span>Motivace</span>
          <span>Objednávka</span>
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-lg overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
                <div className="text-center mb-6">
                  <Mascot
                    message="Řekni mi o sobě, přizpůsobím průvodce!"
                    size="sm"
                  />
                </div>

                <h2 className="text-2xl font-bold text-navy-900 mb-1 text-center">
                  Povězte nám o sobě
                </h2>
                <p className="text-navy-500 text-sm text-center mb-8">
                  Přizpůsobíme průvodce vašim potřebám
                </p>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-navy-700 mb-1"
                    >
                      Křestní jméno
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="Jak vám máme říkat?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-3">
                      Pohlaví
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setGender("MALE")}
                        className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 ${
                          gender === "MALE"
                            ? "border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10"
                            : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            gender === "MALE" ? "bg-teal-100" : "bg-gray-100"
                          }`}
                        >
                          <svg
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={gender === "MALE" ? "#0d9488" : "#6b7280"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="10" cy="14" r="7" />
                            <path d="M21 3l-5.5 5.5M21 3h-5M21 3v5" />
                          </svg>
                        </div>
                        <span
                          className={`font-semibold ${
                            gender === "MALE"
                              ? "text-teal-700"
                              : "text-navy-700"
                          }`}
                        >
                          Muž
                        </span>
                        {gender === "MALE" && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("FEMALE")}
                        className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 ${
                          gender === "FEMALE"
                            ? "border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10"
                            : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
                        }`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            gender === "FEMALE"
                              ? "bg-teal-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <svg
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={
                              gender === "FEMALE" ? "#0d9488" : "#6b7280"
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="9" r="7" />
                            <path d="M12 16v5M9 19h6" />
                          </svg>
                        </div>
                        <span
                          className={`font-semibold ${
                            gender === "FEMALE"
                              ? "text-teal-700"
                              : "text-navy-700"
                          }`}
                        >
                          Žena
                        </span>
                        {gender === "FEMALE" && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={goNext}
                  disabled={!canProceedStep1}
                  className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pokračovat
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-1 text-center">
                  Co vás motivuje?
                </h2>
                <p className="text-navy-500 text-sm text-center mb-8">
                  Zvolte hlavní cíl a my přizpůsobíme obsah
                </p>

                <div className="space-y-4">
                  {(
                    [
                      {
                        value: "WEIGHT_LOSS" as const,
                        title: "Hubnutí & spalování tuků",
                        desc: "Chci efektivně zhubnout a nastartovat metabolismus",
                        icon: (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                            />
                          </svg>
                        ),
                      },
                      {
                        value: "MENTAL_RESET" as const,
                        title: "Mentální reset & soustředění",
                        desc: "Chci vyčistit hlavu a získat mentální jas",
                        icon: (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            />
                          </svg>
                        ),
                      },
                      {
                        value: "PHYSICAL_REGENERATION" as const,
                        title: "Fyzická regenerace & detox",
                        desc: "Chci očistit tělo a podpořit přirozené hojení",
                        icon: (
                          <svg
                            className="w-7 h-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        ),
                      },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setGoal(item.value)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                        goal === item.value
                          ? "border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10"
                          : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          goal === item.value
                            ? "bg-teal-100 text-teal-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            goal === item.value
                              ? "text-teal-700"
                              : "text-navy-800"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-navy-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      {goal === item.value && (
                        <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={goBack}
                    variant="outline"
                    className="flex-1 border-gray-300 text-navy-700 py-6 rounded-xl text-base"
                  >
                    <svg
                      className="mr-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 17l-5-5m0 0l5-5m-5 5h12"
                      />
                    </svg>
                    Zpět
                  </Button>
                  <Button
                    onClick={goNext}
                    disabled={!canProceedStep2}
                    className="flex-[2] bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pokračovat
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-1 text-center">
                  Dokončení objednávky
                </h2>
                <p className="text-navy-500 text-sm text-center mb-8">
                  Vyberte plán a vytvořte si účet
                </p>

                {/* Plan selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPlan("basic")}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      plan === "basic"
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <div className="text-xs font-medium text-teal-600 mb-1">
                      Průvodce
                    </div>
                    <div className="text-2xl font-bold text-navy-900">
                      199{" "}
                      <span className="text-sm font-normal text-navy-500">
                        Kč
                      </span>
                    </div>
                    <div className="text-xs text-navy-500 mt-1">
                      5denní plán
                    </div>
                    {plan === "basic" && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlan("premium")}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      plan === "premium"
                        ? "border-gold-400 bg-gold-50"
                        : "border-gray-200 hover:border-gold-300"
                    }`}
                  >
                    <div className="absolute -top-2.5 right-2 bg-gold-400 text-navy-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      + ODZNAK
                    </div>
                    <div className="text-xs font-medium text-gold-600 mb-1">
                      Komplet
                    </div>
                    <div className="text-2xl font-bold text-navy-900">
                      298{" "}
                      <span className="text-sm font-normal text-navy-500">
                        Kč
                      </span>
                    </div>
                    <div className="text-xs text-navy-500 mt-1">
                      Průvodce + odznak
                    </div>
                    {plan === "premium" && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-navy-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required={!isTestMode}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="jan@email.cz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-navy-700 mb-1"
                    >
                      Heslo *
                    </label>
                    <input
                      id="password"
                      type="password"
                      required={!isTestMode}
                      minLength={isTestMode ? undefined : 6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="Alespoň 6 znaků"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor="consent"
                      className="text-xs text-navy-600 leading-relaxed"
                    >
                      Potvrzuji, že jsem se seznámil/a s{" "}
                      <span className="text-teal-600 font-medium">
                        upozorněním
                      </span>{" "}
                      a beru na vědomí, že obsah má edukační charakter a
                      nenahrazuje lékařskou péči.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {loading ? "Vytvářím účet..." : "Pokračovat k platbě"}
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
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: `/api/checkout?plan=${plan}`,
                    })
                  }
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

                <button
                  onClick={goBack}
                  className="w-full mt-4 text-sm text-navy-500 hover:text-navy-700 transition-colors"
                >
                  &larr; Zpět na výběr motivace
                </button>

                <p className="text-center text-sm text-navy-600 mt-4">
                  Už máte účet?{" "}
                  <Link
                    href="/prihlaseni"
                    className="text-teal-600 font-medium hover:underline"
                  >
                    Přihlásit se
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
