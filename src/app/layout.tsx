import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AICopilot from "@/components/AICopilot";
import GlobalNetworkBackground from "@/components/GlobalNetworkBackground";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | ${siteConfig.engineerName}, ${siteConfig.engineerRole}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    "Quantum Code Technologies presents the software engineering profile and production portfolio of Gackstone Baraka, Senior Software Engineer • Full-Stack Systems & AI Architect.",
  keywords: [
    "Quantum Code Technologies",
    "Gackstone Baraka",
    "Senior Software Engineer Kenya",
    "Full-Stack Systems & AI Architect",
    "Software Engineering Kenya",
    "Next.js TypeScript Architecture",
    "Alpha Coach",
    "For Sale Marketplace",
    "WebHunt Security Scanner",
    "FinTech Trading Systems",
    "Cloud Observability",
  ],
  authors: [{ name: siteConfig.engineerName, url: siteConfig.siteUrl }],
  creator: siteConfig.engineerName,
  publisher: siteConfig.brandName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: siteConfig.logo192Path, sizes: "192x192", type: "image/png" },
      { url: siteConfig.logo512Path, sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: `${siteConfig.brandName} | ${siteConfig.engineerName}, ${siteConfig.engineerRole}`,
    description:
      "Software engineering profile and production portfolio of Gackstone Baraka (Senior Software Engineer • Full-Stack Systems & AI Architect) under Quantum Code Technologies.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} — ${siteConfig.engineerName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | ${siteConfig.engineerName}, ${siteConfig.engineerRole}`,
    description:
      "Production software engineering portfolio, system architectures, and AI systems by Gackstone Baraka at Quantum Code Technologies.",
    images: [siteConfig.ogImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.brandName,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}${siteConfig.logoPath}`,
        email: siteConfig.email,
        telephone: "+254712052104",
        identifier: {
          "@type": "PropertyValue",
          name: "License No",
          value: siteConfig.businessRegistrationNumber,
        },
        sameAs: [
          siteConfig.githubUrl,
          "https://www.linkedin.com/in/quantum-code-technologies-69a150239",
          "https://www.instagram.com/quantum_c0de_tech",
        ],
        description:
          "Software engineering studio presenting the production portfolio and systems architecture work of Gackstone Baraka.",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        name: siteConfig.engineerName,
        jobTitle: siteConfig.engineerTitle,
        image: `${siteConfig.siteUrl}${siteConfig.profileImagePath}`,
        url: siteConfig.siteUrl,
        email: siteConfig.email,
        sameAs: [
          siteConfig.githubUrl,
          "https://www.linkedin.com/in/quantum-code-technologies-69a150239",
          "https://www.instagram.com/quantum_c0de_tech",
        ],
        worksFor: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.brandName,
        description:
          "Production software engineering portfolio, system architectures, and AI systems by Gackstone Baraka at Quantum Code Technologies.",
        publisher: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground relative`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlobalNetworkBackground />
        <Header />
        <main className="relative z-10 flex-grow">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <AICopilot />
        <WhatsAppButton />
      </body>
    </html>
  );
}
