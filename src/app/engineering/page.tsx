"use client";

import { motion } from "framer-motion";

export default function EngineeringPage() {
  const processSteps = [
    { num: "01", title: "DISCOVER", desc: "Understand the product, users, business requirements and technical constraints." },
    { num: "02", title: "ARCHITECT", desc: "Define architecture, data models, APIs, integrations and infrastructure." },
    { num: "03", title: "DESIGN", desc: "Create the interface system, interaction model and responsive experience." },
    { num: "04", title: "ENGINEER", desc: "Build frontend, backend, integrations and infrastructure." },
    { num: "05", title: "TEST", desc: "Validate functionality, security, performance, accessibility and reliability." },
    { num: "06", title: "DEPLOY", desc: "Production deployment, environment configuration, CI/CD and monitoring." },
    { num: "07", title: "OBSERVE & IMPROVE", desc: "Monitor systems, identify bottlenecks and continuously improve." }
  ];

  return (
    <div className="py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Engineering Process</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance">
            We follow a structured engineering lifecycle to ensure reliable, scalable, and maintainable software delivery.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-8 items-start border-l-2 border-white/10 pl-8 relative group"
            >
              <div className="absolute -left-[25px] top-1 bg-background py-2">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-mono font-bold text-accent group-hover:bg-accent group-hover:text-black group-hover:scale-110 transition-all duration-300">
                  {step.num}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-primary">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
