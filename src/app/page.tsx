import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import TechStack from "@/components/TechStack";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Capabilities />
      <TechStack />
      
      {/* Start Project CTA */}
      <section className="py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400/40 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-balance">
            Have an idea? <br className="hidden md:block"/> Describe it.
          </h2>
          <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-12 text-xl leading-relaxed">
            Let&apos;s translate your business requirements into a concrete technical architecture.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-background text-primary font-bold rounded-full hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20 text-lg"
          >
            Start a Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
