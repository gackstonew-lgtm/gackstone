import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Engineering Lifecycle & Technology Stack | ${siteConfig.brandName}`,
  description: `Explore the structured 7-step engineering process and verified Technology Radar across Languages, Frontend, Backend, Infrastructure, Observability, and AI at ${siteConfig.brandName}.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/engineering`,
  },
  openGraph: {
    title: `Engineering Lifecycle & Technology Radar | ${siteConfig.brandName}`,
    description: `Structured software engineering process and evidence-backed technology stack by ${siteConfig.engineerName}.`,
    url: `${siteConfig.siteUrl}/engineering`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} Engineering Lifecycle & Tech Radar`,
      },
    ],
  },
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
