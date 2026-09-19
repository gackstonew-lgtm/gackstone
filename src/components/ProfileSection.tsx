"use client";

import { Code2, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileSection() {
  return (
    <section className="py-section-lg bg-background border-t border-white/5 relative overflow-hidden">
      {/* Subtle glow effect behind profile */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start"
        >
          
          <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-[2rem] overflow-hidden bg-muted border border-white/10 relative shadow-2xl group">
            <Image 
              src="/profile.png" 
              alt="Gackstone Baraka" 
              fill 
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 768px) 224px, 288px"
              priority
            />
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left mt-4 md:mt-0">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Gackstone Baraka</h2>
              <div className="text-accent font-mono text-base mt-3">Senior Software Engineer</div>
              <div className="text-muted-foreground text-sm mt-1">Senior Full-Stack Engineer & Systems Architect</div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed text-balance max-w-2xl">
              Results-oriented software engineer, web developer, designer, data evaluation specialist and AI trainer focused on building modern software systems, full-stack applications, AI-powered products, infrastructure and specialized engineering solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-6">
              <a href="https://github.com/gackstonew-lgtm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:-translate-y-1 text-sm font-medium text-primary">
                <Code2 size={18} />
                GitHub Profile
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:-translate-y-1 text-sm font-medium text-primary">
                <Globe size={18} />
                LinkedIn
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
