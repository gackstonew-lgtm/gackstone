"use client";

import ProfileSection from "@/components/ProfileSection";
import { motion } from "framer-motion";
import TypingText from "@/components/TypingText";
import { siteConfig } from "@/lib/siteConfig";
import { Mail, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <div className="flex items-baseline gap-3.5 mb-6">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text={`About ${siteConfig.brandName}`} delayMs={60} />
            </h1>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-10 space-y-5">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
              <TypingText
                text={`${siteConfig.brandName} presents the software engineering profile and portfolio of ${siteConfig.engineerName}.`}
                delayMs={260}
                showCaret={false}
              />
            </p>
            <div className="text-muted-foreground space-y-4 leading-relaxed text-base md:text-lg">
              <p>
                Led by {siteConfig.engineerName} ({siteConfig.engineerTitle}), {siteConfig.brandName} focuses on engineering real systems that solve actual problems. We prioritize maintainability, architect secure solutions, and design for scalability. When integrating modern AI, we do so responsibly and securely, using observable infrastructure to ensure performance and reliability.
              </p>
              <p>
                Our goal is to bridge the gap between product requirements and technical implementation, delivering production-grade applications that drive measurable business value.
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-2 text-foreground font-semibold">
                <ShieldCheck size={15} className="text-accent" />
                {siteConfig.businessRegistrationLabel}
              </span>
              <a
                href={siteConfig.mailtoUrl}
                className="inline-flex items-center gap-2 text-accent hover:underline"
              >
                <Mail size={15} />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <ProfileSection />
    </div>
  );
}
