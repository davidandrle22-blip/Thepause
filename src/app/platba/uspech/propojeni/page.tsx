"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function PropojeniPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen gradient-bg-light flex items-center justify-center">
          <div className="animate-pulse text-navy-600">Propojuji účet...</div>
        </div>
      }
    >
      <PropojeniContent />
    </Suspense>
  );
}

function PropojeniContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"linking" | "done" | "error">("linking");

  useEffect(() => {
    async function linkAndRedirect() {
      try {
        // Link orphaned orders to the now-authenticated user
        await fetch("/api/link-order", { method: "POST" });

        // Refresh JWT so hasPaid is set
        await fetch("/api/auth/refresh-token", { method: "POST" });

        setStatus("done");

        // Redirect to guide
        window.location.href = "/pruvodce";
      } catch {
        setStatus("error");
      }
    }

    linkAndRedirect();
  }, [sessionId]);

  if (status === "error") {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-navy-900 mb-2">
            Nepodařilo se propojit účet
          </h1>
          <p className="text-navy-600 mb-4">
            Zkuste se přihlásit znovu nebo nás kontaktujte.
          </p>
          <a
            href="/pruvodce"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
          >
            Zkusit otevřít průvodce
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto" />
        <p className="mt-4 text-navy-600">Propojuji platbu s účtem...</p>
      </div>
    </div>
  );
}
