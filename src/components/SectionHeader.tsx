"use client";

import { motion } from "framer-motion";
import TypingText, {
  TYPING_HEADING_CPS,
  TYPING_BODY_CPS,
  TYPING_DEFAULT_MAX_DURATION_MS,
  TYPING_STAGGER_STEP_MS,
} from "@/components/TypingText";

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  progress?: number; // 0.15 to 1.0 for the circular editorial ring
  rightElement?: React.ReactNode;
}

export default function SectionHeader({
  index,
  title,
  subtitle,
  progress = 0.35,
  rightElement,
}: SectionHeaderProps) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(Math.max(progress, 0.1), 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16"
    >
      <div className="max-w-2xl">
        <div className="flex items-baseline gap-3.5">
          <span className="text-3xl md:text-4xl font-light tracking-tight text-neutral-400 select-none">
            {index}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            <TypingText text={title} cps={TYPING_HEADING_CPS} delayMs={60} />
          </h2>
        </div>
        {subtitle && (
          <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            <TypingText
              text={subtitle}
              cps={TYPING_BODY_CPS}
              maxDurationMs={TYPING_DEFAULT_MAX_DURATION_MS}
              delayMs={60 + TYPING_STAGGER_STEP_MS}
              showCaret={false}
            />
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 self-start md:self-center">
        {rightElement}
        <div
          className="hidden sm:flex items-center justify-center w-10 h-10"
          aria-hidden="true"
        >
          <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="rgba(18, 18, 22, 0.09)"
              strokeWidth="4"
            />
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
