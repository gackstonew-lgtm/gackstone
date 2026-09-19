"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Full-Stack",
  "Web Applications",
  "AI / Intelligent Systems",
  "Business Systems",
  "FinTech",
  "Automotive",
  "Mobile Apps"
];

function getCategoriesForProject(slug: string): string[] {
  const map: Record<string, string[]> = {
    "webhunt": ["All", "Full-Stack", "Web Applications", "Business Systems"],
    "gacks-ai": ["All", "AI / Intelligent Systems"],
    "yardly-automotive": ["All", "Full-Stack", "Web Applications", "Automotive"],
    "webhunt-android": ["All", "Mobile Apps"],
    "arcade-fx": ["All", "FinTech", "Business Systems"],
    "bm-forex-hub": ["All", "Business Systems", "FinTech"],
    "leavoyage-resort": ["All", "Full-Stack", "Web Applications"],
    "pos-system": ["All", "Business Systems"],
    "varban-autoflex": ["All", "Web Applications", "Automotive"]
  };
  return map[slug] || ["All"];
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) =>
    getCategoriesForProject(project.slug).includes(activeCategory)
  );

  return (
    <div className="py-32 min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Software Portfolio</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            A comprehensive showcase of my public software engineering projects, open-source repositories, and production deployments.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.slug} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl group"
              >
                <div className="p-8 flex-grow">
                  <div className="text-xs font-mono font-semibold text-accent mb-6 inline-block px-3 py-1 bg-accent/10 rounded-full">{project.category}</div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.technologies.slice(0, 3).map((tech, j) => (
                      <span key={j} className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 text-primary rounded-lg cursor-default">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-medium px-3 py-1 text-muted-foreground bg-white/[0.02] rounded-lg">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="px-8 py-5 bg-white/[0.01] border-t border-white/5 flex flex-wrap gap-4 justify-between items-center">
                  <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors group/link w-full sm:w-auto">
                    Case Study <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center gap-4 text-muted-foreground w-full sm:w-auto">
                    <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-medium" aria-label="GitHub Repository">
                      <Code2 size={16} /> <span className="hidden sm:inline">Code</span>
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-medium" aria-label="Live Project">
                        <ExternalLink size={16} /> <span className="hidden sm:inline">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
