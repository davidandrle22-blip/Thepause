"use client";

import { useState, useEffect } from "react";
import { getSeasonalMessage } from "@/config/conversion"; // v4

export function SeasonalBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(getSeasonalMessage());
  }, []);

  if (!message) return null;

  return (
    <div className="bg-teal-600 text-white text-center py-2.5 px-4 text-sm font-medium">
      {message}
    </div>
  );
}
