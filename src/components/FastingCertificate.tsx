"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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

const CERT_W = 900;
const CERT_H = 636;

// Draw the certificate directly on a Canvas — no html2canvas needed
function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  userName: string,
  completionDate: string,
  certificateId: string,
  durationHours: number,
  variantLabel: string,
) {
  const scale = 3;
  canvas.width = CERT_W * scale;
  canvas.height = CERT_H * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, CERT_W, CERT_H);
  bg.addColorStop(0, "#0a0c10");
  bg.addColorStop(0.3, "#0f1218");
  bg.addColorStop(0.6, "#141a24");
  bg.addColorStop(1, "#0d1117");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // Ambient glow — top right blue
  const glow1 = ctx.createRadialGradient(CERT_W + 80, -120, 0, CERT_W + 80, -120, 400);
  glow1.addColorStop(0, "rgba(59,130,246,0.08)");
  glow1.addColorStop(1, "transparent");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // Ambient glow — bottom left purple
  const glow2 = ctx.createRadialGradient(-60, CERT_H + 100, 0, -60, CERT_H + 100, 350);
  glow2.addColorStop(0, "rgba(168,85,247,0.06)");
  glow2.addColorStop(1, "transparent");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // Grid pattern
  ctx.strokeStyle = "rgba(255,255,255,0.015)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= CERT_W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CERT_H); ctx.stroke();
  }
  for (let y = 0; y <= CERT_H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CERT_W, y); ctx.stroke();
  }

  // Outer border frame
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  roundRect(ctx, 16, 16, CERT_W - 32, CERT_H - 32, 4);
  ctx.stroke();

  // Inner border frame
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  roundRect(ctx, 20, 20, CERT_W - 40, CERT_H - 40, 2);
  ctx.stroke();

  // Corner accents (blue lines at corners)
  const corners = [
    { x: 16, y: 16, dx: 1, dy: 1 },
    { x: CERT_W - 16, y: 16, dx: -1, dy: 1 },
    { x: 16, y: CERT_H - 16, dx: 1, dy: -1 },
    { x: CERT_W - 16, y: CERT_H - 16, dx: -1, dy: -1 },
  ];
  corners.forEach(({ x, y, dx, dy }) => {
    // Horizontal line
    const hGrad = ctx.createLinearGradient(x, y, x + 24 * dx, y);
    hGrad.addColorStop(0, "rgba(59,130,246,0.5)");
    hGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = hGrad;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 24 * dx, y); ctx.stroke();
    // Vertical line
    const vGrad = ctx.createLinearGradient(x, y, x, y + 24 * dy);
    vGrad.addColorStop(0, "rgba(59,130,246,0.5)");
    vGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = vGrad;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 24 * dy); ctx.stroke();
  });

  const cx = CERT_W / 2;

  // Top bar: brand left, cert ID right
  ctx.font = "600 13px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.textAlign = "left";
  ctx.fillText("💧  THE-PULSE.CZ", 48, 52);

  ctx.font = "11px 'Courier New', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.textAlign = "right";
  ctx.fillText(`ID: ${certificateId}`, CERT_W - 48, 52);

  // Certificate label
  ctx.textAlign = "center";
  ctx.font = "600 11px system-ui, sans-serif";
  ctx.fillStyle = "rgba(59,130,246,0.7)";
  ctx.letterSpacing = "3px";
  ctx.fillText("CERTIFIKÁT O DOKONČENÍ", cx, 200);

  // Title
  ctx.font = "300 28px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("5DENNÍ VODNÍ PŮST", cx, 240);

  // Decorative line
  const lineGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, "rgba(59,130,246,0.4)");
  lineGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx - 40, 266); ctx.lineTo(cx + 40, 266); ctx.stroke();

  // "Tímto certifikujeme, že"
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText("Tímto certifikujeme, že", cx, 296);

  // User name (large, bold)
  ctx.font = "700 42px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(59,130,246,0.15)";
  ctx.shadowBlur = 40;
  ctx.fillText(userName, cx, 342);
  ctx.shadowBlur = 0;

  // Description
  ctx.font = "14px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText(`úspěšně dokončil/a ${durationHours}hodinový vodní půst`, cx, 376);
  ctx.fillText("pod vedením průvodce The-Pulse.cz", cx, 396);

  // Stats row
  const statsY = 440;
  // Duration
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${durationHours}h`, cx - 160, statsY);
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText("DÉLKA PŮSTU", cx - 160, statsY + 18);

  // Separator
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx - 80, statsY - 14); ctx.lineTo(cx - 80, statsY + 18); ctx.stroke();

  // Days
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("5", cx, statsY);
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText("DNÍ", cx, statsY + 18);

  // Separator
  ctx.beginPath(); ctx.moveTo(cx + 80, statsY - 14); ctx.lineTo(cx + 80, statsY + 18); ctx.stroke();

  // Completion date
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(formatDateCzech(completionDate), cx + 170, statsY);
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText("DATUM DOKONČENÍ", cx + 170, statsY + 18);

  // Verified badge (pill)
  const badgeY = 490;
  const badgeText = "🏆  OVĚŘENÝ CERTIFIKÁT";
  ctx.font = "600 10px system-ui, sans-serif";
  const badgeW = ctx.measureText(badgeText).width + 32;
  // Pill background
  ctx.fillStyle = "rgba(59,130,246,0.05)";
  ctx.strokeStyle = "rgba(59,130,246,0.2)";
  ctx.lineWidth = 1;
  roundRect(ctx, cx - badgeW / 2, badgeY - 12, badgeW, 26, 13);
  ctx.fill();
  roundRect(ctx, cx - badgeW / 2, badgeY - 12, badgeW, 26, 13);
  ctx.stroke();
  // Pill text
  ctx.fillStyle = "rgba(59,130,246,0.7)";
  ctx.fillText(badgeText, cx, badgeY + 4);

  // Bottom: variant left, verification right
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.textAlign = "left";
  ctx.fillText(variantLabel, 48, CERT_H - 36);
  ctx.textAlign = "right";
  ctx.fillText(`the-pulse.cz/certifikat/${certificateId}`, CERT_W - 48, CERT_H - 36);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default function FastingCertificate({
  userName,
  completionDate,
  certificateId,
  durationHours = 120,
  variant = "universal",
}: FastingCertificateProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [scale, setScale] = useState(1);
  const [copied, setCopied] = useState(false);

  const variantLabel =
    variant === "muzi"
      ? "Varianta pro muže"
      : variant === "zeny"
        ? "Varianta pro ženy"
        : "Univerzální varianta";

  // Responsive scaling
  const updateScale = useCallback(() => {
    const maxW = Math.min(window.innerWidth - 32, CERT_W);
    setScale(maxW / CERT_W);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  function getCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    renderCertificateToCanvas(canvas, userName, completionDate, certificateId, durationHours, variantLabel);
    return canvas;
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }

  async function handleDownloadPDF() {
    setIsDownloading(true);
    try {
      const canvas = getCanvas();
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfW, pdfH);

      const safeName = userName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      const blob = pdf.output("blob");
      downloadBlob(blob, `certifikat-the-pulse-${safeName}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert("Nepodařilo se vygenerovat PDF. Zkuste to znovu.");
    } finally {
      setIsDownloading(false);
    }
  }

  function handleDownloadPNG() {
    setIsDownloading(true);
    try {
      const canvas = getCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `certifikat-the-pulse-${certificateId}.png`);
        }
        setIsDownloading(false);
      }, "image/png");
    } catch (err) {
      console.error("PNG error:", err);
      setIsDownloading(false);
    }
  }

  async function handleShare(method: string) {
    setShowShareMenu(false);
    try {
      if (method === "native" && navigator.share) {
        await navigator.share({
          title: `Certifikát – ${userName} dokončil/a 5denní vodní půst`,
          text: `Dokončil/a jsem 5denní vodní půst s The-Pulse.cz! 120 hodin čistého odhodlání.`,
          url: `https://www.the-pulse.cz/certifikat/${certificateId}`,
        });
      } else if (method === "clipboard") {
        const text = `Dokončil/a jsem 5denní vodní půst s The-Pulse.cz!\n\nCertifikát: ${certificateId}\n${userName}\n${formatDateCzech(completionDate)}\n${durationHours} hodin\n\nOvěřit: https://www.the-pulse.cz/certifikat/${certificateId}`;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else if (method === "facebook") {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.the-pulse.cz/certifikat/${certificateId}`)}`,
          "_blank",
        );
      } else if (method === "instagram") {
        handleDownloadPNG();
        alert("Obrázek stažen! Nahrajte ho jako příběh nebo příspěvek na Instagram.");
      }
    } catch (err) {
      console.error("Share error:", err);
    }
  }

  // Close share menu on outside click
  useEffect(() => {
    if (!showShareMenu) return;
    function handleClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest("[data-share-menu]")) {
        setShowShareMenu(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showShareMenu]);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 py-8 sm:py-12 px-4">
      {/* Certificate visual — scaled for viewport */}
      <div
        style={{
          width: CERT_W * scale,
          height: CERT_H * scale,
          overflow: "hidden",
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            style={{
              width: `${CERT_W}px`,
              height: `${CERT_H}px`,
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #0a0c10 0%, #0f1218 30%, #141a24 60%, #0d1117 100%)",
              fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
              color: "#ffffff",
            }}
          >
            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

            {/* Borders */}
            <div style={{ position: "absolute", inset: "16px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: "20px", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "2px", pointerEvents: "none" }} />

            {/* Corner accents */}
            {[
              { top: "16px", left: "16px" },
              { top: "16px", right: "16px" },
              { bottom: "16px", left: "16px" },
              { bottom: "16px", right: "16px" },
            ].map((pos, i) => (
              <div key={i} style={{ position: "absolute" as const, ...pos, width: "24px", height: "24px", pointerEvents: "none" as const }}>
                <div style={{ position: "absolute", top: 0, left: i % 2 === 0 ? 0 : "auto", right: i % 2 !== 0 ? 0 : "auto", width: "24px", height: "1px", background: "linear-gradient(90deg, rgba(59,130,246,0.5), transparent)", transform: i % 2 !== 0 ? "scaleX(-1)" : "none" }} />
                <div style={{ position: "absolute", top: 0, left: i % 2 === 0 ? 0 : "auto", right: i % 2 !== 0 ? 0 : "auto", width: "1px", height: "24px", background: "linear-gradient(180deg, rgba(59,130,246,0.5), transparent)", transform: i >= 2 ? "scaleY(-1)" : "none" }} />
              </div>
            ))}

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 60px", textAlign: "center" }}>
              {/* Top bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", position: "absolute", top: "36px", left: 0, padding: "0 48px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "20px" }}>💧</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>The-Pulse.cz</span>
                </div>
                <span style={{ fontSize: "11px", fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>ID: {certificateId}</span>
              </div>

              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(59,130,246,0.7)", marginBottom: "8px" }}>
                Certifikát o dokončení
              </div>
              <h1 style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.3 }}>
                5denní vodní půst
              </h1>
              <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)", marginBottom: "28px" }} />
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Tímto certifikujeme, že
              </p>
              <h2 style={{ fontSize: "42px", fontWeight: 700, letterSpacing: "0.02em", color: "#ffffff", marginBottom: "12px", lineHeight: 1.1, textShadow: "0 0 40px rgba(59,130,246,0.15)" }}>
                {userName}
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "500px", marginBottom: "32px" }}>
                úspěšně dokončil/a {durationHours}hodinový vodní půst<br />pod vedením průvodce The-Pulse.cz
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: "48px", alignItems: "center", marginBottom: "32px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{durationHours}h</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Délka půstu</div>
                </div>
                <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>5</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Dní</div>
                </div>
                <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", lineHeight: 1 }}>{formatDateCzech(completionDate)}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Datum dokončení</div>
                </div>
              </div>

              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(59,130,246,0.2)", background: "rgba(59,130,246,0.05)" }}>
                <span style={{ fontSize: "14px" }}>🏆</span>
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(59,130,246,0.7)" }}>Ověřený certifikát</span>
              </div>

              {/* Bottom */}
              <div style={{ position: "absolute", bottom: "36px", left: 0, width: "100%", padding: "0 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>{variantLabel}</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>the-pulse.cz/certifikat/{certificateId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 w-full max-w-md sm:max-w-none sm:w-auto">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generuji…
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

        <button
          onClick={handleDownloadPNG}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Stáhnout PNG
        </button>

        <div className="relative" data-share-menu>
          <button
            onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copied ? "Zkopírováno!" : "Sdílet"}
          </button>

          {showShareMenu && (
            <div className="absolute bottom-full mb-2 left-0 sm:left-1/2 sm:-translate-x-1/2 right-0 sm:right-auto bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-2 sm:min-w-48 z-50">
              <button onClick={() => handleShare("native")} className="w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                Sdílet (systémové)
              </button>
              <button onClick={() => handleShare("facebook")} className="w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                Facebook
              </button>
              <button onClick={() => handleShare("instagram")} className="w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                Instagram (stáhne obrázek)
              </button>
              <button onClick={() => handleShare("clipboard")} className="w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                Kopírovat text
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-white/30 text-center">
        Ověřit certifikát:{" "}
        <a href={`https://www.the-pulse.cz/certifikat/${certificateId}`} className="underline hover:text-white/50 transition-colors">
          the-pulse.cz/certifikat/{certificateId}
        </a>
      </p>
    </div>
  );
}
