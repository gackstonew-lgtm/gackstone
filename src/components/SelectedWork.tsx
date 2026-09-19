"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { projects } from "../data/portfolio";
import { motion } from "framer-motion";

export default function SelectedWork() {
  const featured = projects.filter(p => p.featured);

  return (
    <section className="py-section-lg bg-background border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Selected Work</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full"></div>
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-300">
            View all projects <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featured.map((project, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i % 2 === 0 ? 0 : 0.15 }}
              className="flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-accent/5 group"
            >
              <div className="p-10 flex-grow relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black text-white mix-blend-overlay">0{i + 1}</span>
                </div>
                
                <div className="text-sm font-mono text-accent mb-6 inline-block px-3 py-1 bg-accent/10 rounded-full">{project.category}</div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">{project.title}</h3>
                <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-lg">
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {project.technologies.slice(0, 4).map((tech, j) => (
                    <span key={j} className="text-xs font-medium px-3 py-1.5 bg-white/5 border border-white/10 text-primary rounded-lg">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs font-medium px-3 py-1.5 text-muted-foreground bg-white/[0.02] rounded-lg border border-transparent">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-10 py-6 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-start sm:items-center relative z-10">
                <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors group/link">
                  View Case Study
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-5 text-muted-foreground">
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" aria-label="GitHub Repository">
                    <Code2 size={18} /> Code
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" aria-label="Live Project">
                      <ExternalLink size={18} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
