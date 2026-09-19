"use client";

import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [idea, setIdea] = useState("");
  const [concept, setConcept] = useState<null | string>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateConcept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setConcept(`Based on your description, here is a preliminary technical assessment:

Potential Product:
A web-based SaaS platform or marketplace.

Recommended Architecture:
- Next.js (App Router) for SSR and SEO.
- Serverless API routes or separate FastAPI backend if heavy processing is needed.
- PostgreSQL database (e.g., Supabase or CloudNativePG) for relational data.

Core Modules:
- User Authentication & Authorization.
- Search & Discovery Engine.
- Dashboard & Data Management.

Development Considerations:
- Prioritize responsive mobile design.
- Implement robust row-level security (RLS).
- Plan for horizontal scaling of the database.
`);
      setIsGenerating(false);
    }, 1500);
  };

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "web-app",
    description: "",
    budget: "tbd",
    timeline: ""
  });

  const handleFormalInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello Gackstone,

I would like to discuss a project with you.

Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company/Organization: ${formData.company}\n` : ""}${formData.phone ? `Phone: ${formData.phone}\n` : ""}Project Type: ${formData.projectType}
Budget: ${formData.budget}
${formData.timeline ? `Timeline: ${formData.timeline}\n` : ""}
Project Details:
${formData.description}

I came across your GacksDev portfolio and would like to discuss this project further.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254712052104?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Start a Project</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mx-auto">
            Have an idea? Describe it below to get a preliminary technical concept, or fill out the formal project inquiry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 p-10 rounded-[2rem] h-fit shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-primary tracking-tight">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Bot size={24} /> 
              </div>
              Describe Your Idea
            </h2>
            <form onSubmit={handleGenerateConcept} className="space-y-6">
              <div>
                <label htmlFor="idea" className="block text-sm font-semibold text-muted-foreground mb-3">
                  Tell us what you want to build in plain English.
                </label>
                <textarea 
                  id="idea"
                  rows={5}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="I need an application where businesses can..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-primary placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none text-base"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isGenerating || !idea.trim()}
                className="w-full py-4 bg-white/5 border border-white/10 text-primary font-semibold rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:-translate-y-1 active:translate-y-0"
              >
                {isGenerating ? "Analyzing..." : "Generate Technical Concept"}
              </button>
            </form>

            {concept && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-10 pt-10 border-t border-white/10"
              >
                <h3 className="text-sm font-mono font-bold text-accent mb-4 uppercase tracking-widest">Preliminary Concept</h3>
                <div className="bg-black/50 border border-white/5 p-6 rounded-xl text-sm md:text-base text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                  {concept}
                </div>
                <p className="text-xs text-muted-foreground/70 mt-4 text-balance">
                  Note: This is a preliminary technical assessment, not an automatic binding quotation. Let&apos;s discuss further.
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-black border border-white/5 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-3xl font-bold mb-8 tracking-tight relative z-10">Formal Inquiry</h2>
            <form onSubmit={handleFormalInquiry} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Phone / WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Project Type</label>
                <select value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option value="web-app">Web Application</option>
                  <option value="saas">SaaS Platform</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="ai-system">AI System / Automation</option>
                  <option value="api">API / Backend</option>
                  <option value="custom">Custom Software</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Project Description</label>
                <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Budget Range</label>
                  <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="tbd">To Be Discussed</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Expected Timeline</label>
                  <input type="text" placeholder="e.g. 3 months" value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-primary focus:outline-none focus:border-accent transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full py-4 mt-8 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                Submit Inquiry <Send size={18} />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
