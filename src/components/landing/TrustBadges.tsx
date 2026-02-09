"use client";

import { CONVERSION_CONFIG } from "@/config/conversion";

export function TrustBadges() {
  const badges = CONVERSION_CONFIG.trustBadges;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5">
      {badges.map((badge, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-navy-500"
        >
          <span className="text-base leading-none">{badge.icon}</span>
          <span>{badge.text}</span>
        </span>
      ))}
    </div>
  );
}
