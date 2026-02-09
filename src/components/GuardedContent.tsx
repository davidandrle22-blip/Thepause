"use client";

import { useEffect, useState } from "react";

export function GuardedContent({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "p", "s", "a"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="guide-content relative select-none"
      style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" }}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}

      {/* Visible watermark overlay */}
      {userEmail && (
        <div
          className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: "rotate(-30deg)",
              opacity: 0.04,
            }}
          >
            <div className="text-center whitespace-nowrap">
              {Array.from({ length: 8 }, (_, i) => (
                <p
                  key={i}
                  className="text-navy-900 text-lg font-bold leading-[120px]"
                >
                  Licencováno pro: {userEmail}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Copy warning toast */}
      {showWarning && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in"
          role="status"
          aria-live="polite"
        >
          Obsah průvodce je chráněn autorským právem a licencí vázanou na váš
          účet.
        </div>
      )}
    </div>
  );
}
