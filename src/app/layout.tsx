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
    "Senior Software Engineer Portfolio",
    "Full-Stack Systems & AI Architect",
    "Alpha Coach",
    "For Sale Marketplace",
    "WebHunt Security Scanner",
    "Next.js TypeScript Architecture",
    "Full-Stack Engineering Kenya",
  ],
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
        identifier: {
          "@type": "PropertyValue",
          name: "Business Registration No",
          value: siteConfig.businessRegistrationNumber,
        },
        sameAs: [siteConfig.githubUrl],
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
        sameAs: [siteConfig.githubUrl],
        worksFor: {
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
