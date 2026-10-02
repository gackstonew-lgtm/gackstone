"use client";

import { motion } from "framer-motion";
import TechPill from "@/components/TechPill";

export default function TechStack() {
  const categories = [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Go", "Python", "FastAPI", "Node.js", "Express", "NestJS"] },
    { name: "Mobile", items: ["Kotlin", "Java", "Android SDK", "libGDX"] },
    { name: "Data", items: ["PostgreSQL", "Prisma", "Supabase", "Redis", "RabbitMQ"] },
    { name: "Infrastructure", items: ["Docker", "Kubernetes", "GitOps", "CI/CD", "Vercel"] },
    { name: "Observability", items: ["OpenTelemetry", "Grafana", "Loki", "Tempo", "Mimir"] },
    { name: "Protocols", items: ["REST APIs", "gRPC", "WebSockets"] },
    { name: "Financial Eng.", items: ["MetaTrader 5", "MQL5", "Pine Script", "Trade Analytics"] },
    { name: "AI", items: ["Gemini", "Claude", "Agentic Workflows", "Grounded RAG"] },
  ];

  return (
    <section className="py-section-lg bg-white border-b border-black/[0.06]">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Engineering Stack
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance">
            Stable, production-ready technologies selected for long-term maintainability and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="surface-card rounded-2xl p-5"
            >
              <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-3">
                {category.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <TechPill key={item} name={item} size="sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
