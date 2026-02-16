"use client";

import { useState } from "react";

export function ShareButton({ certificateId, name }: { certificateId: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.the-pulse.cz/certifikat/${certificateId}`;
  const text = `${name} uspesne dokoncil/a 5denni vodni pust!`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Certifikat - The-Pulse.cz", text, url });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? "Odkaz zkopirovan!" : "Sdilet certifikat"}
    </button>
  );
}
