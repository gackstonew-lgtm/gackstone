import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Project Pricing & Software Development Plans | ${siteConfig.brandName}`,
  description: `Transparent per-project pricing from ${siteConfig.brandName}: Basic ($200), Pro ($400) and tailored Enterprise software development plans.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/pricing`,
  },
  openGraph: {
    title: `Software Development Pricing Plans | ${siteConfig.brandName}`,
    description: `Transparent project packages and custom software development pricing by ${siteConfig.engineerName}.`,
    url: `${siteConfig.siteUrl}/pricing`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} Project Pricing`,
      },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
