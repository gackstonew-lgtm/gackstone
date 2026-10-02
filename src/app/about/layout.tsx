import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `About ${siteConfig.engineerName} & ${siteConfig.brandName}`,
  description: `Learn about ${siteConfig.engineerName}, ${siteConfig.engineerTitle} at ${siteConfig.brandName}. Professional background, engineering philosophy, and enterprise solutions.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
  openGraph: {
    title: `About ${siteConfig.engineerName} | ${siteConfig.brandName}`,
    description: `Software engineering profile and systems architecture background of ${siteConfig.engineerName} at ${siteConfig.brandName}.`,
    url: `${siteConfig.siteUrl}/about`,
    type: "profile",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `About ${siteConfig.engineerName} — ${siteConfig.brandName}`,
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
