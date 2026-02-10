"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Prices {
  basic: string;
  premium: string;
}

const PriceContext = createContext<Prices>({ basic: "199", premium: "298" });

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [prices, setPrices] = useState<Prices>({ basic: "199", premium: "298" });

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.priceBasic) {
          setPrices({ basic: data.priceBasic, premium: data.pricePremium });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PriceContext.Provider value={prices}>{children}</PriceContext.Provider>
  );
}

export function usePrices() {
  return useContext(PriceContext);
}
