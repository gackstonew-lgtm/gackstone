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
    { name: "AI", items: ["Gemini", "LLMs", "Agentic Architecture"] }
  ];

  return (
    <section className="py-section-lg bg-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineering Stack</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-balance">
            We build with stable, production-ready technologies to ensure long-term maintainability and performance.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex flex-col items-center mb-8 mx-2 w-[180px] md:w-[220px]"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-6 font-mono text-center h-8">{category.name}</span>
              <div className="flex flex-wrap justify-center gap-2">
                {category.items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-medium border border-white/10 bg-white/5 text-primary rounded-md hover:bg-white/10 transition-colors cursor-default">
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
