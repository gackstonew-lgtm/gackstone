import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import EngineeringCommandCenter from "@/components/EngineeringCommandCenter";
import TypingText from "@/components/TypingText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Hero />
      <Capabilities />
      <EngineeringCommandCenter />

      {/* Start Project CTA (Solid Editorial Surface — Zero Gradients) */}
      <section className="py-24 md:py-32 bg-background/35 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
            <span className="inline-block px-3.5 py-1.5 rounded-xl pill-badge text-xs font-mono text-accent mb-6">
              03 • Project Consultation
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-5 text-balance">
              <TypingText text="Have an idea? Describe it." delayMs={60} />
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
              <TypingText
                text="Let's translate your product requirements into a concrete, production-ready technical architecture."
                delayMs={260}
                showCaret={false}
              />
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_20px_rgba(15,23,42,0.14)] text-sm md:text-base"
              >
                Start a Project
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-black/[0.08] text-foreground font-medium rounded-full hover:bg-secondary transition-all text-sm md:text-base"
              >
                Browse Full Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
