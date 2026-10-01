"use client";

import {
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Activity,
  Bot,
  LineChart,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const metricsColumn = [
  {
    number: "12",
    description:
      "Production & open-source software systems architected across web, FinTech, AI, and native Android.",
    source: "From Verified Portfolio",
  },
  {
    number: "08",
    description:
      "Core engineering disciplines integrated from frontend interfaces to PostgreSQL data layers and cloud observability.",
    source: "From System Architecture",
  },
  {
    number: "14",
    description:
      "Public GitHub repositories audited with strict classification governance, live deployments, and case studies.",
    source: "From GitHub Audit",
  },
];

const capabilities = [
  {
    title: "Frontend Systems",
    icon: <Code2 size={18} />,
    items: ["React 18/19", "Next.js 14", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & APIs",
    icon: <Server size={18} />,
    items: ["Go", "Python", "FastAPI", "Node.js", "Express", "NestJS"],
  },
  {
    title: "AI & Agents",
    icon: <Bot size={18} />,
    items: ["Gemini & Claude", "Agentic Workflows", "Grounded RAG"],
  },
  {
    title: "Data & Messaging",
    icon: <Database size={18} />,
    items: ["PostgreSQL", "Prisma", "Supabase RLS", "Redis", "RabbitMQ"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={18} />,
    items: ["Docker", "Kubernetes", "GitOps", "CI/CD", "Vercel"],
  },
  {
    title: "Observability",
    icon: <Activity size={18} />,
    items: ["OpenTelemetry", "Grafana", "Loki", "Tempo", "Mimir"],
  },
  {
    title: "Mobile & 3D",
    icon: <Smartphone size={18} />,
    items: ["Kotlin", "Java 17", "Android SDK", "libGDX 3D"],
  },
  {
    title: "Financial Eng.",
    icon: <LineChart size={18} />,
    items: ["MetaTrader 5", "MQL5", "Pine Script", "Trade Analytics"],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-section-lg bg-background/40 border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader
          index="01"
          title="Capabilities & Stack"
          subtitle="Structured full-stack engineering across modern interfaces, resilient backend services, autonomous AI systems, and observable infrastructure."
          progress={0.28}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Large Numerical Hierarchy (Inspired by Reference Image) */}
          <div className="lg:col-span-5 space-y-10">
            {metricsColumn.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2.5">
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
                    {item.number}
                  </span>
                  <div className="hidden sm:flex items-center flex-1">
                    <div className="h-px w-full bg-black/[0.12]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-3.5">
                  {item.description}
                </p>
                <span className="inline-block px-3.5 py-1.5 rounded-xl pill-badge text-xs font-medium">
                  {item.source}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Glassmorphism Capability Cards with Circular Accent Badges */}
          <div className="lg:col-span-7 relative">
            {/* Solid translucent blurred circle backdrop (No CSS Gradients) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[440px] md:h-[440px] bg-accent/[0.11] rounded-full blur-[80px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass-card hover-card rounded-3xl p-6 flex flex-col justify-between min-h-[168px]"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-foreground tracking-tight pt-1">
                      {cap.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 shadow-sm">
                      {cap.icon}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cap.items.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/90 border border-black/[0.06] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
