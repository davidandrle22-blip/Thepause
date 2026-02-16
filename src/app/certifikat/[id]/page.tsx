import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ShareButton } from "./ShareButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Certifikát ${id} | The-Pulse.cz`,
    description: `Ověření certifikátu o dokončení 5denního vodního půstu.`,
  };
}

function formatDateCzech(date: Date): string {
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince",
  ];
  return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default async function CertifikatPage({ params }: Props) {
  const { id } = await params;

  const certificate = await prisma.certificate.findUnique({
    where: { certificateId: id },
  });

  if (!certificate) {
    notFound();
  }

  const startDate = certificate.startDate;
  const endDate = certificate.endDate;
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.round(durationMs / (1000 * 60 * 60));

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "linear-gradient(135deg, #0a0c10 0%, #0f1218 30%, #141a24 60%, #0d1117 100%)" }}>
      <div className="max-w-lg w-full">
        <div
          className="relative overflow-hidden rounded-lg p-8 text-center"
          style={{
            background: "linear-gradient(135deg, #0a0c10 0%, #0f1218 50%, #141a24 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-80px",
              right: "-60px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            }}
          />

          {/* Inner border */}
          <div
            className="absolute pointer-events-none rounded"
            style={{
              inset: "12px",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          />

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-lg">💧</span>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                The-Pulse.cz
              </span>
            </div>

            {/* Certificate label */}
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(59, 130, 246, 0.7)" }}>
              Certifikát o dokončení
            </p>

            <h1 className="text-xl font-light tracking-[0.12em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
              5denní vodní půst
            </h1>

            {/* Decorative line */}
            <div className="mx-auto mb-6" style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }} />

            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
              Tímto certifikujeme, že
            </p>

            <h2 className="text-3xl font-bold text-white mb-3" style={{ textShadow: "0 0 40px rgba(59,130,246,0.15)" }}>
              {certificate.name}
            </h2>

            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              úspěšně dokončil/a {durationHours}hodinový vodní půst
              <br />
              pod vedením průvodce The-Pulse.cz
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{durationHours}h</div>
                <div className="text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Délka půstu</div>
              </div>
              <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)" }} />
              <div className="text-center">
                <div className="text-xl font-bold text-white">5</div>
                <div className="text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Dní</div>
              </div>
              <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)" }} />
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{formatDateCzech(endDate)}</div>
                <div className="text-[10px] uppercase tracking-[0.1em] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Datum dokončení</div>
              </div>
            </div>

            {/* Verified badge */}
            <div
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-6"
              style={{
                border: "1px solid rgba(59,130,246,0.2)",
                background: "rgba(59,130,246,0.05)",
              }}
            >
              <span className="text-sm">🏆</span>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: "rgba(59,130,246,0.7)" }}>
                Ověřený certifikát
              </span>
            </div>

            {/* Certificate details */}
            <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Courier New', monospace" }}>
                ID: {certificate.certificateId}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                Vystaveno: {certificate.createdAt.toLocaleDateString("cs-CZ")}
              </p>
            </div>
          </div>
        </div>

        <ShareButton certificateId={certificate.certificateId} name={certificate.name} />

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
          Ověřeno na The-Pulse.cz
        </p>
      </div>
    </div>
  );
}
