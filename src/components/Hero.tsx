"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import TypingText, {
  TYPING_HEADING_CPS,
  TYPING_BODY_CPS,
  TYPING_DEFAULT_MAX_DURATION_MS,
  TYPING_STAGGER_STEP_MS,
} from "@/components/TypingText";
import ProfileOrbit from "@/components/ProfileOrbit";
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
              <ProfileOrbit />
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
            <div className="w-full max-w-md glass-card rounded-3xl p-2.5 md:p-3 relative">
              <Image
                src="/brand/full-stack-web-development-poster.png"
                alt="Full Stack Web Development services poster – Quantum Code"
                width={606}
                height={729}
                priority
                sizes="(max-width: 448px) 100vw, 448px"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
