import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Start a Project | Contact ${siteConfig.engineerName} • ${siteConfig.brandName}`,
  description: `Start a software engineering project with ${siteConfig.engineerName} at ${siteConfig.brandName}. Generate technical concepts, submit formal inquiries, or connect via WhatsApp and email.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/contact`,
  },
  openGraph: {
    title: `Start a Project | Contact ${siteConfig.brandName}`,
    description: `Connect with ${siteConfig.engineerName} to discuss custom software development, web platforms, and AI architectures.`,
    url: `${siteConfig.siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.brandName}`,
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
