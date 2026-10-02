"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Code2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { motion } from "framer-motion";
import TypingText from "@/components/TypingText";
import TechPill from "@/components/TechPill";

export default function PortfolioPage() {
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "portfolio_view" }),
    }).catch(() => {});
  }, []);

  return (
    <div className="py-32 min-h-screen bg-background/35">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mb-14"
        >
          <div className="flex items-baseline gap-3.5 mb-5">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text="Software Portfolio" delayMs={60} />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            <TypingText
              text="Verified software engineering projects, production web platforms, financial analytics systems, and native mobile applications engineered by Gackstone Baraka at Quantum Code Technologies."
              delayMs={260}
              showCaret={false}
            />
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="glass-card hover-card rounded-3xl flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-7 flex-grow flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block mb-1">
                      {String(idx + 1).padStart(2, "0")} • {project.status}
                    </span>
                    <span className="text-xs font-mono font-medium text-accent">
                      {project.category}
                    </span>
                  </div>
                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`View ${project.title} case study`}
                    className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-3">
                  {project.title}
                </h2>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <TechPill key={tech} name={tech} size="sm" />
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 text-muted-foreground bg-secondary/80 border border-black/[0.06] rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="px-7 py-4 bg-white/75 border-t border-black/[0.06] flex items-center justify-between text-xs">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Case Study <ArrowRight size={14} />
                </Link>

                <div className="flex items-center gap-3.5 text-muted-foreground">
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1 font-medium"
                    aria-label="GitHub Repository"
                  >
                    <Code2 size={14} /> Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-1 font-medium"
                      aria-label="Live Project"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
