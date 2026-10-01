"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Layers,
  Bot,
  Terminal,
  Activity,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

type CommandTab =
  | "ENGINEERING LAB"
  | "AI & AUTOMATION"
  | "BACKEND & DATA"
  | "CLOUD & OBSERVABILITY"
  | "CLIENT SYSTEMS";

const TABS: CommandTab[] = [
  "ENGINEERING LAB",
  "AI & AUTOMATION",
  "BACKEND & DATA",
  "CLOUD & OBSERVABILITY",
  "CLIENT SYSTEMS",
];

export default function EngineeringCommandCenter() {
  const [activeTab, setActiveTab] = useState<CommandTab>("ENGINEERING LAB");

  const getProjectsForTab = (tab: CommandTab) => {
    switch (tab) {
      case "AI & AUTOMATION":
        return projects.filter((p) => p.comparison.ai || p.slug === "arcade-fx");
      case "BACKEND & DATA":
        return projects.filter((p) =>
          ["alpha-coach", "bm-forex-hub", "webhunt", "pos-system"].includes(p.slug)
        );
      case "CLIENT SYSTEMS":
        return projects.filter(
          (p) => p.classification === "client" || p.slug === "for-sale" || p.slug === "pos-system"
        );
      default:
        return projects.slice(0, 4);
    }
  };

  const activeProjects = getProjectsForTab(activeTab);

  return (
    <section className="py-section-lg bg-background/45 border-b border-black/[0.06] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader
          index="02"
          title="Engineering Intelligence"
          subtitle="Interactive engineering lifecycle, grounded AI knowledge retrieval, observability telemetry, and verified production technology radar."
          progress={0.66}
          rightElement={
            <Link
              href="/engineering"
              className="px-4 py-2 rounded-full pill-badge text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              Engineering Lifecycle <ArrowRight size={13} className="text-accent" />
            </Link>
          }
        />

        {/* Progressive Disclosure Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-5 border-b border-black/[0.07]">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all border ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-white border-black/[0.07] text-muted-foreground hover:text-foreground hover:border-black/[0.15]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "ENGINEERING LAB" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Layers size={18} />,
                title: "Engineering Process Lifecycle",
                desc: "Inspect our 7-step software engineering lifecycle from discovery and architecture to deployment and observability.",
                href: "/engineering",
                cta: "Explore Lifecycle",
              },
              {
                icon: <Bot size={18} />,
                title: "Quantum Code Grounded AI Copilot",
                desc: "Query the deterministic portfolio knowledge engine about PostgreSQL, AI agents, MT5 bridges, and backend architectures.",
                action: () => window.dispatchEvent(new CustomEvent("open-ai-copilot")),
                cta: "Launch AI Copilot",
              },
              {
                icon: <Terminal size={18} />,
                title: "Production Technology Radar",
                desc: "Explore the verified production Technology Radar across languages, frontend, backend, cloud infrastructure, and AI.",
                href: "/engineering#tech-radar",
                cta: "Open Tech Radar",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass-card hover-card rounded-3xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">
                      {card.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-sm">
                      {card.icon}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                {card.action ? (
                  <button
                    type="button"
                    onClick={card.action}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:underline"
                  >
                    {card.cta} <ArrowRight size={14} />
                  </button>
                ) : (
                  <Link
                    href={card.href || "/engineering"}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:underline"
                  >
                    {card.cta} <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : activeTab === "CLOUD & OBSERVABILITY" ? (
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent px-3 py-1 bg-accent/10 rounded-full">
                  <Activity size={13} /> SAMPLE DEMONSTRATION TELEMETRY
                </span>
                <h3 className="text-2xl font-semibold text-foreground mt-3">
                  OpenTelemetry, Grafana, Loki &amp; Tempo Architecture
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Representative telemetry model illustrating how Quantum Code Technologies instruments services across metrics, logs, and distributed traces.
                </p>
              </div>
              <Link
                href="/engineering#tech-radar"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shrink-0"
              >
                View Observability Stack <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "P95 LATENCY (DEMO)", value: "42 ms", note: "Edge + API Span" },
                { label: "ERROR RATE (DEMO)", value: "0.04%", note: "Idempotent Retries" },
                { label: "ACTIVE SERVICES", value: "12 Systems", note: "Verified Inventory" },
                { label: "TRACE PIPELINE", value: "OTLP / HTTP", note: "Tempo + Loki Correlation" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="p-5 rounded-2xl bg-white border border-black/[0.07] flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-muted-foreground">{metric.label}</span>
                  <span className="text-2xl font-semibold text-foreground my-2">{metric.value}</span>
                  <span className="text-xs text-accent font-mono">{metric.note}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <div
                key={project.slug}
                className="glass-card hover-card rounded-3xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-medium text-accent">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground px-2.5 py-0.5 bg-white rounded-full border border-black/[0.07]">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 bg-white border border-black/[0.07] text-foreground rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs">
                  <Link
                    href={`/work/${project.slug}`}
                    className="font-semibold text-foreground hover:text-accent inline-flex items-center gap-1.5"
                  >
                    Case Study <ArrowRight size={14} />
                  </Link>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground inline-flex items-center gap-1 font-medium"
                    >
                      <Code2 size={14} /> Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground inline-flex items-center gap-1 font-medium"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
