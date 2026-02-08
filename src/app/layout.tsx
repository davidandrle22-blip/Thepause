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
    default: "The-Pulse.cz | 5denni pruvodce vodnim pustem | Water Fasting Guide",
    template: "%s | The-Pulse.cz",
  },
  description:
    "Kompletni pruvodce 5dennim vodnim pustem. Naucte se spravne drzet vodni pust, detoxikujte telo a mysl. Interaktivni pruvodce s dennim checklistem a certifikatem.",
  keywords: [
    "vodni pust",
    "water fast",
    "water fasting",
    "fasting",
    "5denni pust",
    "pruvodce pustem",
    "jak drzet vodni pust",
    "vodni pust pruvodce",
    "detox pustem",
    "intermittent fasting",
    "pust pro zdravi",
    "autofagie",
    "hubnuti pustem",
    "ketoza",
    "ocista organismu",
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
      name: "Pruvodce 5dennim vodnim pustem",
      description: "Kompletni interaktivni pruvodce 5dennim vodnim pustem s dennim checklistem, vedou a certifikatem.",
      url: "https://the-pulse.cz",
      brand: { "@type": "Brand", name: "The-Pulse.cz" },
      offers: [
        {
          "@type": "Offer",
          name: "Zakladni pruvodce",
          price: "199",
          priceCurrency: "CZK",
          availability: "https://schema.org/InStock",
          url: "https://the-pulse.cz/objednavka",
        },
        {
          "@type": "Offer",
          name: "Pruvodce + Certifikat",
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
      description: "Interaktivni pruvodce 5dennim vodnim pustem s odbornym vedenim",
      url: "https://the-pulse.cz",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      inLanguage: "cs",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domov", item: "https://the-pulse.cz" },
        { "@type": "ListItem", position: 2, name: "Objednavka", item: "https://the-pulse.cz/objednavka" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Je vodni pust bezpecny?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro zdrave dospele osoby je kratkodoby vodni pust obecne povazovan za bezpecny. Vzdy doporucujeme konzultaci s lekarem.",
          },
        },
        {
          "@type": "Question",
          name: "Kolik stoji pruvodce?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zakladni pruvodce stoji 199 Kc. Verze s certifikatem stoji 298 Kc.",
          },
        },
        {
          "@type": "Question",
          name: "Co je autofagie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Autofagie je prirozeny proces, pri kterem telo recykluje poskozene bunecne struktury. Vyznamna autofagie nastupuje priblizne po 48-72 hodinach pustu.",
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
