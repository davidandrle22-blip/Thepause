import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Certifikat ${id} | The-Pulse.cz`,
    description: `Overeni certifikatu o dokonceni 5denniho vodniho pustu.`,
  };
}

export default async function CertifikatPage({ params }: Props) {
  const { id } = await params;

  const certificate = await prisma.certificate.findUnique({
    where: { certificateId: id },
  });

  if (!certificate) {
    notFound();
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-navy-800 rounded-2xl border-2 border-gold-400 p-8 text-center shadow-2xl">
          {/* Logo */}
          <p className="text-teal-400 text-sm mb-4">The-Pulse.cz</p>

          {/* Badge */}
          <div className="mx-auto mb-6">
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none" className="mx-auto">
              <circle cx="100" cy="100" r="95" stroke="#fbbf24" strokeWidth="4" fill="none" />
              <circle cx="100" cy="100" r="85" fill="url(#certGrad)" />
              <path d="M100 40l15.5 31.3 34.5 5-25 24.3 5.9 34.4L100 119.8 69.1 135l5.9-34.4-25-24.3 34.5-5L100 40z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
              <defs>
                <linearGradient id="certGrad" x1="15" y1="15" x2="185" y2="185">
                  <stop stopColor="#0f172a" />
                  <stop offset="0.5" stopColor="#134e4a" />
                  <stop offset="1" stopColor="#0f766e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
            Certifikat
          </p>
          <h1 className="text-white text-2xl font-bold mb-1">
            5 dni vodniho pustu
          </h1>
          <p className="text-gold-400 text-sm mb-6">Uspesne dokonceno</p>

          <p className="text-white text-xl font-bold mb-4">{certificate.name}</p>

          <div className="text-teal-300 text-sm space-y-1 mb-6">
            <p>Zahajeni: {certificate.startDate.toLocaleDateString("cs-CZ")}</p>
            <p>Dokonceni: {certificate.endDate.toLocaleDateString("cs-CZ")}</p>
          </div>

          <div className="border-t border-navy-700 pt-4">
            <p className="text-navy-400 text-xs">
              Certifikat ID: {certificate.certificateId}
            </p>
            <p className="text-navy-500 text-xs mt-1">
              Vystaveno: {certificate.createdAt.toLocaleDateString("cs-CZ")}
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Overeno na The-Pulse.cz
        </p>
      </div>
    </div>
  );
}
