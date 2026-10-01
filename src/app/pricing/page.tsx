"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import TypingText from "@/components/TypingText";
import { pricingPlans } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-14"
        >
          <div className="flex items-baseline gap-3.5 mb-5">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text="Pricing" delayMs={60} />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl">
            <TypingText
              text="Simple, transparent per-project pricing. Pick the plan that fits your stage, then finish your inquiry on WhatsApp."
              delayMs={260}
              showCaret={false}
            />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
              className={`relative flex flex-col p-8 rounded-3xl hover-card ${
                plan.popular
                  ? "glass-card !border-accent/50 ring-1 ring-accent/30"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-[10px] font-mono font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {plan.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>

              <div className="mt-6 pb-6 border-b border-black/[0.07]">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-5xl font-semibold tracking-tight ${
                      plan.popular ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {plan.priceLabel}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-sm text-muted-foreground">{plan.priceSuffix}</span>
                  )}
                </div>
                {/* Reserve the same height on every card so features line up */}
                <p className="text-xs text-muted-foreground mt-2 h-4">
                  {plan.priceKes ?? ""}
                </p>
              </div>

              <ul className="mt-6 space-y-3.5 flex-1" aria-label={`${plan.name} plan features`}>
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${
                        feature.included
                          ? "bg-accent/10 text-accent"
                          : "bg-secondary text-muted-foreground/60"
                      }`}
                      aria-hidden="true"
                    >
                      {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                    </span>
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/60 line-through"
                      }
                    >
                      {feature.label}
                      {!feature.included && <span className="sr-only"> (not included)</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?plan=${plan.id}`}
                className={`mt-8 w-full py-3.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    : "bg-white border border-black/[0.1] text-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground text-center text-balance">
          KES amounts are approximate. Selecting a plan takes you to Start a Project, where your
          inquiry is sent to us on WhatsApp.
        </p>
      </div>
    </div>
  );
}
