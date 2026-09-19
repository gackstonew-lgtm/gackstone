"use client";

import { Code2, Server, Smartphone, Database, Cloud, Activity, Webhook, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Frontend",
    icon: <Code2 size={24} />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Server size={24} />,
    items: ["Go", "Python", "FastAPI", "Django", "Node.js", "NestJS"]
  },
  {
    title: "Mobile",
    icon: <Smartphone size={24} />,
    items: ["Kotlin", "Android SDK", "React Native"]
  },
  {
    title: "Data",
    icon: <Database size={24} />,
    items: ["PostgreSQL", "Redis", "RabbitMQ", "CloudNativePG"]
  },
  {
    title: "Infrastructure",
    icon: <Cloud size={24} />,
    items: ["Docker", "Kubernetes", "GitOps", "CI/CD"]
  },
  {
    title: "Observability",
    icon: <Activity size={24} />,
    items: ["Grafana", "Loki", "Tempo", "Mimir", "OpenTelemetry"]
  },
  {
    title: "Protocols",
    icon: <Webhook size={24} />,
    items: ["REST", "gRPC", "WebSockets"]
  },
  {
    title: "Financial Eng.",
    icon: <LineChart size={24} />,
    items: ["MQL5", "MetaTrader 5"]
  }
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-section-lg bg-background border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineering</h2>
          <div className="h-1.5 w-24 bg-accent rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-md flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary tracking-tight">{cap.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {cap.items.map((item, j) => (
                  <span key={j} className="text-xs font-medium px-3 py-1.5 bg-white/5 border border-white/10 text-muted-foreground rounded-md hover:text-primary transition-colors cursor-default">
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
