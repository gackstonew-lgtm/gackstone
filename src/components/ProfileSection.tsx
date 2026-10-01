"use client";

import { Code2, Globe, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

export default function ProfileSection() {
  return (
    <section className="py-20 bg-transparent border-t border-black/[0.06] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center md:items-start"
        >
          {/* Profile Photo & Quantum Code Logo Pairing */}
          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4 shrink-0">
            <div className="w-44 h-44 md:w-52 md:h-52 shrink-0 rounded-3xl overflow-hidden bg-secondary border border-black/[0.08] relative shadow-sm">
              <Image
                src={siteConfig.profileImagePath}
                alt={siteConfig.profileImageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 176px, 208px"
                priority
              />
            </div>
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
              <Image
                src={siteConfig.logoPath}
                alt={siteConfig.logoAlt}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-contain shrink-0"
              />
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {siteConfig.brandName}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  {siteConfig.businessRegistrationNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                {siteConfig.engineerName}
              </h2>
              <div className="text-accent font-mono text-sm font-semibold mt-2">
                {siteConfig.engineerTitle}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {siteConfig.brandName}
              </div>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed text-balance">
              Results-oriented software engineer, web developer, designer, data evaluation specialist and AI trainer focused on building modern software systems, full-stack applications, AI-powered products, infrastructure and specialized engineering solutions under {siteConfig.brandName}.
            </p>

            <div className="pt-2 space-y-1.5 text-xs font-mono text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-2 text-foreground">
                <ShieldCheck size={14} className="text-accent shrink-0" />
                <span>{siteConfig.businessRegistrationLabel}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={14} className="text-accent shrink-0" />
                <a href={siteConfig.mailtoUrl} className="text-accent hover:underline">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full transition-all hover:-translate-y-0.5 text-xs font-semibold shadow-sm"
              >
                <Code2 size={16} />
                GitHub Profile
              </a>
              <a
                href={siteConfig.mailtoUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-black/[0.08] rounded-full transition-all hover:-translate-y-0.5 text-xs font-medium text-foreground shadow-sm"
              >
                <Mail size={16} className="text-accent" />
                Email Directly
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-black/[0.08] rounded-full transition-all hover:-translate-y-0.5 text-xs font-medium text-foreground shadow-sm"
              >
                <Globe size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
