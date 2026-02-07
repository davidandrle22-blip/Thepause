import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ThePause.cz — Chytrý průvodce 5denním vodním půstem",
    template: "%s | ThePause.cz",
  },
  description:
    "Interaktivní průvodce vodním půstem, který vás provede hodinu po hodině. 5 dní, jen voda, vaše restart tlačítko. Bezpečně, s odborným vedením.",
  keywords: [
    "vodní půst",
    "průvodce půstem",
    "5denní půst",
    "water fasting",
    "jak držet půst",
    "autofagie",
    "hubnutí půstem",
    "detox půstem",
    "ketóza",
    "očista organismu",
    "intermittent fasting",
  ],
  authors: [{ name: "ThePause.cz" }],
  creator: "ThePause.cz",
  metadataBase: new URL("https://thepause.cz"),
  openGraph: {
    title: "ThePause.cz — Chytrý průvodce 5denním vodním půstem",
    description:
      "Interaktivní průvodce vodním půstem. 5 dní, jen voda. Pochopte, co se děje ve vašem těle.",
    url: "https://thepause.cz",
    siteName: "ThePause.cz",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThePause.cz — Průvodce 5denním vodním půstem",
    description:
      "Interaktivní průvodce vodním půstem. 5 dní, jen voda, vaše restart tlačítko.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ThePause.cz",
      description:
        "Interaktivní průvodce 5denním vodním půstem s odborným vedením",
      url: "https://thepause.cz",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "199",
        priceCurrency: "CZK",
        description: "Kompletní interaktivní průvodce 5denním vodním půstem",
      },
      inLanguage: "cs",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Je vodní půst bezpečný?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro zdravé dospělé osoby je krátkodobý vodní půst obecně považován za bezpečný. Vždy doporučujeme konzultaci s lékařem.",
          },
        },
        {
          "@type": "Question",
          name: "Kolik stojí průvodce?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Základní průvodce stojí 199 Kč. Verze s odznákem a vyhodnocením stojí 298 Kč.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}')`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
