"use client";

import { motion } from "framer-motion";

export default function TechStack() {
  const categories = [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Go", "Python", "FastAPI", "Django", "Node.js", "NestJS"] },
    { name: "Mobile", items: ["Kotlin", "Android SDK", "React Native"] },
    { name: "Data", items: ["PostgreSQL", "Redis", "RabbitMQ", "CloudNativePG"] },
    { name: "Infrastructure", items: ["Docker", "Kubernetes", "GitOps", "CI/CD"] },
    { name: "Observability", items: ["Grafana", "Loki", "Tempo", "Mimir", "OpenTelemetry"] },
    { name: "Protocols", items: ["REST", "gRPC", "WebSockets"] },
    { name: "Financial Eng.", items: ["MQL5", "MetaTrader 5"] },
    { name: "AI", items: ["Gemini", "LLMs", "Agentic Architecture"] },
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
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-medium border border-black/[0.07] bg-secondary/60 text-foreground rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
