import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Software Engineering Portfolio | ${siteConfig.brandName}`,
  description: `Verified software engineering portfolio of ${siteConfig.engineerName}. Production web applications, AI autonomous systems, FinTech analytics, and native Android applications.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/portfolio`,
  },
  openGraph: {
    title: `Software Engineering Portfolio | ${siteConfig.brandName}`,
    description: `Production software systems, web platforms, and engineering case studies by ${siteConfig.engineerName}.`,
    url: `${siteConfig.siteUrl}/portfolio`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} Software Portfolio`,
      },
    ],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
