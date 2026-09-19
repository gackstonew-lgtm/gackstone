"use client";

import { motion } from "framer-motion";

export default function InsightsPage() {
  return (
    <div className="py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Engineering Insights</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance">
            Architecture deep-dives, technical patterns, and lessons learned from building production software.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-white/5 bg-white/[0.02] p-16 text-center rounded-[2rem] shadow-xl"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <div className="text-primary font-bold text-xl mb-4">No published articles yet</div>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We are currently preparing our first series of technical articles covering Agentic AI Architecture, OpenTelemetry, and React 19 performance patterns. Check back soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
