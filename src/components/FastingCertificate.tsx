"use client";

import { useState, useRef, useEffect } from "react";

interface FastingCertificateProps {
  userName: string;
  completionDate: string;
  certificateId: string;
  durationHours?: number;
  variant?: "muzi" | "zeny" | "universal";
}

function formatDateCzech(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince",
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function FastingCertificate({
  userName,
  completionDate,
  certificateId,
  durationHours = 120,
  variant = "universal",
}: FastingCertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const variantLabel =
    variant === "muzi"
      ? "Varianta pro muže"
      : variant === "zeny"
        ? "Varianta pro ženy"
        : "Univerzální varianta";

  async function handleDownloadPDF() {
    setIsDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = certRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const safeName = userName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      pdf.save(`certifikat-the-pulse-${safeName}.pdf`);
    } catch (err) {
      console.error("Chyba při generování PDF:", err);
      alert("Nepodařilo se vygenerovat PDF. Zkuste to prosím znovu.");
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleDownloadImage() {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = certRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `certifikat-the-pulse-${certificateId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Chyba při generování obrázku:", err);
    }
  }

  async function handleShare(method: string) {
    setShowShareMenu(false);
    setIsSharing(true);

    try {
      if (method === "native" && navigator.share) {
        await navigator.share({
          title: `Certifikát – ${userName} dokončil/a 5denní vodní půst`,
          text: `Dokončil/a jsem 5denní vodní půst s The-Pulse.cz! 120 hodin čistého odhodlání. #ThePulse #VodníPůst #Výzva`,
          url: window.location.href,
        });
      } else if (method === "clipboard") {
        const text = `Dokončil/a jsem 5denní vodní půst s The-Pulse.cz!\n\nCertifikát: ${certificateId}\n${userName}\n${formatDateCzech(completionDate)}\n${durationHours} hodin\n\nOvěřit: https://www.the-pulse.cz/certifikat/${certificateId}\n\n#ThePulse #VodníPůst #120hodin`;
        await navigator.clipboard.writeText(text);
        alert("Zkopírováno do schránky!");
      } else if (method === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Dokončil/a jsem 5denní vodní půst s The-Pulse.cz!`)}`,
          "_blank"
        );
      } else if (method === "instagram") {
        await handleDownloadImage();
        alert("Obrázek stažen! Nahrajte ho jako příběh nebo příspěvek na Instagram.");
      }
    } catch (err) {
      console.error("Chyba při sdílení:", err);
    } finally {
      setIsSharing(false);
    }
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (showShareMenu && !(e.target as HTMLElement).closest("[data-share-menu]")) {
        setShowShareMenu(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showShareMenu]);

  return (
    <div className="flex flex-col items-center gap-8 py-12 px-4">
      {/* Certificate */}
      <div
        ref={certRef}
        style={{
          width: "900px",
          height: "636px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0a0c10 0%, #0f1218 30%, #141a24 60%, #0d1117 100%)",
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Ambient glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            inset: "16px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: "2px",
            pointerEvents: "none",
          }}
        />

        {/* Corner accents */}
        {[
          { top: "16px", left: "16px" },
          { top: "16px", right: "16px" },
          { bottom: "16px", left: "16px" },
          { bottom: "16px", right: "16px" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute" as const,
              ...pos,
              width: "24px",
              height: "24px",
              pointerEvents: "none" as const,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: i % 2 === 0 ? 0 : "auto",
                right: i % 2 !== 0 ? 0 : "auto",
                width: "24px",
                height: "1px",
                background: "linear-gradient(90deg, rgba(59,130,246,0.5), transparent)",
                transform: i % 2 !== 0 ? "scaleX(-1)" : "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: i % 2 === 0 ? 0 : "auto",
                right: i % 2 !== 0 ? 0 : "auto",
                width: "1px",
                height: "24px",
                background: "linear-gradient(180deg, rgba(59,130,246,0.5), transparent)",
                transform: i >= 2 ? "scaleY(-1)" : "none",
              }}
            />
          </div>
        ))}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "48px 60px",
            textAlign: "center",
          }}
        >
          {/* Top line: brand + cert ID */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              top: "36px",
              left: 0,
              padding: "0 48px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>💧</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                The-Pulse.cz
              </span>
            </div>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "'Courier New', monospace",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
              }}
            >
              ID: {certificateId}
            </span>
          </div>

          {/* Certificate label */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(59, 130, 246, 0.7)",
              marginBottom: "8px",
            }}
          >
            Certifikát o dokončení
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 300,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "28px",
              lineHeight: 1.3,
            }}
          >
            5denní vodní půst
          </h1>

          {/* Decorative line */}
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
              marginBottom: "28px",
            }}
          />

          {/* "Tímto certifikujeme" */}
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            Tímto certifikujeme, že
          </p>

          {/* User name */}
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#ffffff",
              marginBottom: "12px",
              lineHeight: 1.1,
              textShadow: "0 0 40px rgba(59,130,246,0.15)",
            }}
          >
            {userName}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              maxWidth: "500px",
              marginBottom: "32px",
            }}
          >
            úspěšně dokončil/a {durationHours}hodinový vodní půst
            <br />
            pod vedením průvodce The-Pulse.cz
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                {durationHours}h
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Délka půstu
              </div>
            </div>

            <div
              style={{
                width: "1px",
                height: "32px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                5
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Dní
              </div>
            </div>

            <div
              style={{
                width: "1px",
                height: "32px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                {formatDateCzech(completionDate)}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Datum dokončení
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(59,130,246,0.2)",
              background: "rgba(59,130,246,0.05)",
            }}
          >
            <span style={{ fontSize: "14px" }}>🏆</span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(59,130,246,0.7)",
              }}
            >
              Ověřený certifikát
            </span>
          </div>

          {/* Bottom: variant + verification */}
          <div
            style={{
              position: "absolute",
              bottom: "36px",
              left: 0,
              width: "100%",
              padding: "0 48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              {variantLabel}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              the-pulse.cz/certifikat/{certificateId}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Download PDF */}
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generuji PDF…
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
              </svg>
              Stáhnout PDF
            </>
          )}
        </button>

        {/* Download PNG */}
        <button
          onClick={handleDownloadImage}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Stáhnout PNG
        </button>

        {/* Share */}
        <div className="relative" data-share-menu>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            disabled={isSharing}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Sdílet
          </button>

          {showShareMenu && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-2 min-w-48 z-50">
              <button
                onClick={() => handleShare("native")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Sdílet (systémové)
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare("instagram")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Instagram (stáhne obrázek)
              </button>
              <button
                onClick={() => handleShare("clipboard")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Kopírovat text
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Verification link */}
      <p className="text-xs text-white/30 text-center">
        Ověřit certifikát:{" "}
        <a
          href={`https://www.the-pulse.cz/certifikat/${certificateId}`}
          className="underline hover:text-white/50 transition-colors"
        >
          the-pulse.cz/certifikat/{certificateId}
        </a>
      </p>
    </div>
  );
}
