import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} | ${siteConfig.engineerName}, ${siteConfig.engineerRole}`,
    short_name: siteConfig.shortBrandName,
    description:
      "Quantum Code Technologies presents the software engineering profile and portfolio of Gackstone Baraka, Senior Software Engineer • Full-Stack Systems & AI Architect.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F8F6",
    theme_color: "#F8F8F6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: siteConfig.logo192Path,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.logo512Path,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: siteConfig.logoMaskable512Path,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
