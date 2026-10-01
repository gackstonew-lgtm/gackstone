"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal } from "lucide-react";
import {
  technologyRadarData,
  type TechRadarItem,
} from "@/lib/intelligence";
import SectionHeader from "@/components/SectionHeader";
import TypingText from "@/components/TypingText";

type TechQuadrant = TechRadarItem["quadrant"];

const quadrants: ("All" | TechQuadrant)[] = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Infrastructure",
  "Observability",
  "AI",
];

const processSteps = [
  { num: "01", title: "DISCOVER", desc: "Understand the product, users, business requirements and technical constraints." },
  { num: "02", title: "ARCHITECT", desc: "Define architecture, data models, APIs, integrations and infrastructure." },
  { num: "03", title: "DESIGN", desc: "Create the interface system, interaction model and responsive experience." },
  { num: "04", title: "ENGINEER", desc: "Build frontend, backend, integrations and infrastructure." },
  { num: "05", title: "TEST", desc: "Validate functionality, security, performance, accessibility and reliability." },
  { num: "06", title: "DEPLOY", desc: "Production deployment, environment configuration, CI/CD and monitoring." },
  { num: "07", title: "OBSERVE & IMPROVE", desc: "Monitor systems, identify bottlenecks and continuously improve." },
];

export default function EngineeringPage() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<"All" | TechQuadrant>("All");
  const filteredRadar = useMemo(() => {
    if (selectedQuadrant === "All") return technologyRadarData;
    return technologyRadarData.filter((item) => item.quadrant === selectedQuadrant);
  }, [selectedQuadrant]);

  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl pill-badge text-accent text-xs font-mono uppercase tracking-wider mb-6">
            <Terminal size={14} /> Engineering Lifecycle &amp; Technology Stack
          </div>
          <div className="flex items-baseline gap-3.5 mb-5">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text="Engineering Process" delayMs={60} />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            <TypingText
              text="We follow a structured engineering lifecycle to ensure reliable, scalable, and maintainable software delivery."
              delayMs={260}
              showCaret={false}
            />
          </p>
        </motion.div>

        {/* 7-Step Engineering Lifecycle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-light text-neutral-400">{step.num}</span>
                  <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-mono font-bold">
                    {idx + 1}
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                  {step.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION 2: INTERACTIVE TECHNOLOGY RADAR */}
        <section id="tech-radar" className="pt-16 border-t border-black/[0.07] scroll-mt-28">
          <SectionHeader
            index="02"
            title="Technology Radar"
            subtitle="Every technology listed below is backed by verified production or open-source repositories in the Quantum Code Technologies portfolio."
            progress={0.85}
            rightElement={
              <div className="flex flex-wrap gap-1.5">
                {quadrants.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuadrant(q)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
                      selectedQuadrant === q
                        ? "bg-primary text-primary-foreground border-primary font-semibold"
                        : "bg-white border-black/[0.08] text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRadar.map((tech) => (
              <div
                key={tech.name}
                className="glass-card hover-card rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white border border-black/[0.07] text-accent">
                      {tech.quadrant}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tech.ring}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tech.summary}</p>
                </div>

                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Verified In Projects ({tech.evidenceProjects.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.evidenceProjects.length > 0 ? (
                      tech.evidenceProjects.map((ep) => (
                        <Link
                          key={ep.slug}
                          href={`/work/${ep.slug}`}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white border border-black/[0.07] text-foreground hover:border-accent hover:text-accent transition-colors"
                        >
                          {ep.title}
                        </Link>
                      ))
                    ) : (
                      <span className="text-xs font-mono text-muted-foreground">
                        Platform &amp; Observability Layer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
