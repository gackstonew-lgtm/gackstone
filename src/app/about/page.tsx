"use client";

import ProfileSection from "@/components/ProfileSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">About GacksDev</h1>
          
          <div className="prose prose-invert prose-zinc max-w-none prose-lg">
            <p className="text-2xl text-primary leading-relaxed mb-10 font-medium">
              GacksDev is the software engineering brand of Quantum Code Technologies.
            </p>
            <div className="text-muted-foreground space-y-6 leading-relaxed">
              <p>
                We focus on engineering real systems that solve actual problems. We prioritize maintainability, architect secure solutions, and design for scalability. When integrating modern AI, we do so responsibly and securely. We use observable infrastructure to ensure performance and reliability.
              </p>
              <p>
                Our goal is to bridge the gap between product requirements and technical implementation, delivering production-grade applications that drive business value.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <ProfileSection />
    </div>
  );
}
