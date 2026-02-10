"use client";

import { SessionProvider } from "next-auth/react";
import { PriceProvider } from "./PriceContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PriceProvider>{children}</PriceProvider>
    </SessionProvider>
  );
}
