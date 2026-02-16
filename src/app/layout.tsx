import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
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
    default: "The-Pulse.cz | 5denní průvodce vodním půstem | Water Fasting Guide",
    template: "%s | The-Pulse.cz",
  },
  description:
    "Kompletní průvodce 5denním vodním půstem. Naučte se správně držet vodní půst, detoxikujte tělo a mysl. Interaktivní průvodce s denním checklistem a certifikátem.",
  keywords: [
    "vodní půst",
    "water fast",
    "water fasting",
    "fasting",
    "5denní půst",
    "průvodce půstem",
    "jak držet vodní půst",
    "vodní půst průvodce",
    "detox půstem",
    "intermittent fasting",
    "půst pro zdraví",
    "autofagie",
    "hubnutí půstem",
    "ketóza",
    "očista organismu",
  ],
  authors: [{ name: "The-Pulse.cz" }],
  creator: "The-Pulse.cz",
  metadataBase: new URL("https://the-pulse.cz"),
  openGraph: {
    title: "The-Pulse.cz — Chytrý průvodce 5denním vodním půstem",
    description:
      "Interaktivní průvodce vodním půstem. 5 dní, jen voda. Pochopte, co se děje ve vašem těle.",
    url: "https://the-pulse.cz",
    siteName: "The-Pulse.cz",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The-Pulse.cz — Průvodce 5denním vodním půstem",
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
      "@type": "Organization",
      name: "The-Pulse.cz",
      url: "https://the-pulse.cz",
      logo: "https://the-pulse.cz/favicon.ico",
      contactPoint: {
        "@type": "ContactPoint",
        email: "the-pause@seznam.cz",
        contactType: "customer service",
        availableLanguage: "cs",
      },
    },
    {
      "@type": "Product",
      name: "Průvodce 5denním vodním půstem",
      description: "Kompletní interaktivní průvodce 5denním vodním půstem s denním checklistem, vedením a certifikátem.",
      url: "https://the-pulse.cz",
      brand: { "@type": "Brand", name: "The-Pulse.cz" },
      offers: [
        {
          "@type": "Offer",
          name: "Základní průvodce",
          price: "199",
          priceCurrency: "CZK",
          availability: "https://schema.org/InStock",
          url: "https://the-pulse.cz/objednavka",
        },
        {
          "@type": "Offer",
          name: "Průvodce + Certifikát",
          price: "298",
          priceCurrency: "CZK",
          availability: "https://schema.org/InStock",
          url: "https://the-pulse.cz/objednavka?plan=premium",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2847",
      },
    },
    {
      "@type": "WebApplication",
      name: "The-Pulse.cz",
      description: "Interaktivní průvodce 5denním vodním půstem s odborným vedením",
      url: "https://the-pulse.cz",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      inLanguage: "cs",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domov", item: "https://the-pulse.cz" },
        { "@type": "ListItem", position: 2, name: "Objednávka", item: "https://the-pulse.cz/objednavka" },
      ],
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
            text: "Základní průvodce stojí 199 Kč. Verze s certifikátem stojí 298 Kč.",
          },
        },
        {
          "@type": "Question",
          name: "Co je autofagie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Autofagie je přirozený proces, při kterém tělo recykluje poškozené buněčné struktury. Významná autofagie nastupuje přibližně po 48–72 hodinách půstu.",
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
        <link rel="alternate" hrefLang="cs" href="https://the-pulse.cz" />
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
        <Providers>{children}</Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
