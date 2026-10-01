"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import TypingText from "@/components/TypingText";

export default function InsightsPage() {
  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-14"
        >
          <div className="flex items-baseline gap-3.5 mb-5">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text="Engineering Insights" delayMs={60} />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            <TypingText
              text="Architecture deep-dives, technical patterns, and lessons learned from building production software."
              delayMs={260}
              showCaret={false}
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="glass-card p-10 md:p-14 text-center rounded-3xl"
        >
          <div className="w-12 h-12 mx-auto mb-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-sm">
            <FileText size={20} />
          </div>
          <div className="text-foreground font-semibold text-xl mb-3">
            Technical Notes &amp; Case Studies Available
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed text-sm md:text-base mb-8">
            While standalone long-form essays on Agentic AI Architecture, OpenTelemetry, and React 19 performance patterns are being finalized, you can explore all 12 production engineering case studies and interactive labs right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-2 hover:bg-primary/90 transition-all"
            >
              Explore Project Case Studies <ArrowRight size={14} />
            </Link>
            <Link
              href="/engineering"
              className="px-6 py-3 rounded-full bg-white border border-black/[0.08] text-foreground text-xs font-medium inline-flex items-center gap-2 hover:bg-secondary transition-all"
            >
              Open Engineering Labs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
