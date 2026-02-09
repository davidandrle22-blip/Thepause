"use client";

import { useState, useEffect, useRef } from "react";

export function GuideSavingsCalculator() {
  const [dailyCost] = useState(250);
  const totalSaved = dailyCost * 5;
  const guidePrice = 199;
  const netSaved = totalSaved - guidePrice;

  const [displayedSaved, setDisplayedSaved] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const step = Math.ceil(totalSaved / 30);
          const interval = setInterval(() => {
            current += step;
            if (current >= totalSaved) {
              current = totalSaved;
              clearInterval(interval);
            }
            setDisplayedSaved(current);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [totalSaved]);

  return (
    <div ref={ref} className="bg-green-50 border border-green-200 rounded-xl p-4 my-4">
      <h4 className="text-sm font-bold text-navy-900 mb-2">
        Kolik ušetříte?
      </h4>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-green-600">
            {displayedSaved} Kč
          </div>
          <div className="text-[10px] text-navy-500">Úspora za jídlo</div>
        </div>
        <div>
          <div className="text-lg font-bold text-navy-600">-{guidePrice} Kč</div>
          <div className="text-[10px] text-navy-500">Cena průvodce</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-700">
            +{netSaved > 0 ? netSaved : 0} Kč
          </div>
          <div className="text-[10px] text-navy-500">Čistě ušetřeno</div>
        </div>
      </div>
    </div>
  );
}
