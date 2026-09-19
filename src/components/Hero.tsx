"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/coding-background.jpg')" }}
        ></div>
        {/* Subtle readability overlay preserving color scheme */}
        <div className="absolute inset-0 bg-background/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>
      
      {/* Subtle glow effect behind profile */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-2 profile-float">
            <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden bg-muted border-4 border-background ring-2 ring-white/10 relative shadow-2xl group shadow-accent/10">
              <Image 
                src="/profile.png" 
                alt="Gackstone Baraka" 
                fill 
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                sizes="(max-width: 768px) 160px, 192px"
                priority
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-3">
              Gackstone Baraka
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-lg md:text-xl font-medium">
              <span className="text-accent font-mono">Senior Software Engineer</span>
              <span className="hidden sm:inline-block text-muted-foreground">&bull;</span>
              <span className="text-muted-foreground">Senior Full-Stack Engineer & Systems Architect</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link 
              href="/portfolio" 
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Explore My Work
              <ArrowRight size={18} />
            </Link>
            
            <a 
              href="https://github.com/gackstonew-lgtm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3.5 bg-white/5 border border-white/10 text-primary font-medium rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Code2 size={18} />
              GitHub Profile
            </a>
            
            {/* LinkedIn hidden since genuine URL is unavailable as per instruction 17 */}
            {/* 
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3.5 bg-white/5 border border-white/10 text-primary font-medium rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Globe size={18} />
              LinkedIn
            </a> 
            */}
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-16">
            <Link href="#capabilities" className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors flex flex-col items-center gap-2">
              <span className="animate-bounce">↓</span>
              [ View Engineering Capabilities ]
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
