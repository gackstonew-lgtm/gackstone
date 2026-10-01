"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Layers, ShieldCheck, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import TypingText, {
  TYPING_HEADING_CPS,
  TYPING_BODY_CPS,
  TYPING_DEFAULT_MAX_DURATION_MS,
  TYPING_STAGGER_STEP_MS,
} from "@/components/TypingText";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-transparent overflow-hidden border-b border-black/[0.06]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
        >
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl pill-badge text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {siteConfig.brandName} &bull; Engineering Portfolio
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3.5">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold tracking-tight text-foreground leading-[1.06]">
                <TypingText
                  text={siteConfig.engineerName}
                  cps={TYPING_HEADING_CPS}
                  delayMs={60}
                />
              </h1>
              <div className="flex flex-wrap items-center gap-2.5 text-base md:text-lg font-medium text-muted-foreground">
                <span className="text-accent font-mono font-semibold">
                  <TypingText
                    text={siteConfig.engineerRole}
                    cps={TYPING_BODY_CPS}
                    delayMs={60 + TYPING_STAGGER_STEP_MS}
                    showCaret={false}
                  />
                </span>
                <span aria-hidden="true">&bull;</span>
                <span>
                  <TypingText
                    text={siteConfig.engineerSpecialization}
                    cps={TYPING_BODY_CPS}
                    delayMs={60 + TYPING_STAGGER_STEP_MS * 2}
                    showCaret={false}
                  />
                </span>
              </div>
              <div className="text-sm md:text-base font-mono text-foreground/85">
                <TypingText
                  text={`at ${siteConfig.brandName}`}
                  cps={TYPING_BODY_CPS}
                  delayMs={60 + TYPING_STAGGER_STEP_MS * 3}
                />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-balance"
            >
              <TypingText
                text="Designing and shipping production web applications, trading analytics platforms, autonomous AI workflows, native Android systems, and observable cloud infrastructure."
                cps={TYPING_BODY_CPS}
                maxDurationMs={TYPING_DEFAULT_MAX_DURATION_MS}
                delayMs={60 + TYPING_STAGGER_STEP_MS * 4}
                showCaret={false}
              />
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                href="/portfolio"
                className="px-7 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.14)]"
              >
                Explore Portfolio
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/engineering"
                className="px-6 py-3.5 bg-white border border-black/[0.08] text-foreground text-sm font-medium rounded-full hover:bg-secondary transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-[0_2px_10px_rgba(15,23,42,0.03)]"
              >
                <Layers size={16} className="text-accent" />
                Engineering Process
              </Link>

              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white border border-black/[0.08] text-muted-foreground hover:text-foreground text-sm font-medium rounded-full hover:bg-secondary transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-[0_2px_10px_rgba(15,23,42,0.03)]"
              >
                <Code2 size={16} />
                GitHub
              </a>
            </motion.div>

            {/* Verified Quantitative Hierarchy Row */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-black/[0.07] grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  12
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Production Systems
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  14
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Audited Repositories
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  08
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Engineering Domains
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Glassmorphism Editorial Card Composition */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 relative">
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Profile Image + Quantum Code Logo Pairing */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-secondary border border-black/[0.08] shadow-sm shrink-0">
                    <Image
                      src={siteConfig.profileImagePath}
                      alt={siteConfig.profileImageAlt}
                      fill
                      className="object-cover object-top"
                      sizes="112px"
                      priority
                    />
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-black/[0.08] shrink-0 flex items-center justify-center">
                    <Image
                      src={siteConfig.logoPath}
                      alt={siteConfig.logoAlt}
                      width={80}
                      height={80}
                      priority
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-sm">
                  <Terminal size={18} />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {siteConfig.brandName} &bull; Principal Architect
                </div>
                <div className="text-xl font-semibold text-foreground">
                  Production-Grade Software Delivery
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-lifecycle system design spanning Next.js, TypeScript, Go, Python, PostgreSQL, native Android, and financial analytics.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/[0.06]">
                <Link
                  href="/work/alpha-coach"
                  className="p-3.5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all group"
                >
                  <div className="text-[11px] font-mono text-accent mb-1">
                    FEATURED FINTECH
                  </div>
                  <div className="text-sm font-semibold text-foreground flex items-center justify-between">
                    Alpha Coach
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>

                <Link
                  href="/work/for-sale"
                  className="p-3.5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all group"
                >
                  <div className="text-[11px] font-mono text-accent mb-1">
                    FEATURED PLATFORM
                  </div>
                  <div className="text-sm font-semibold text-foreground flex items-center justify-between">
                    For Sale
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-secondary/70 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <ShieldCheck size={14} className="text-accent" />
                  Verified GitHub Source
                </span>
                <span className="font-mono">{siteConfig.githubUsername}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
