"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Send, Bot, Mail, ShieldCheck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import TypingText from "@/components/TypingText";
import { siteConfig } from "@/lib/siteConfig";
import { formatPlanPrice, getPlanById } from "@/data/pricing";

export default function ContactPage() {
  // useSearchParams needs a Suspense boundary for static rendering in Next.js 14
  return (
    <Suspense fallback={null}>
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const selectedPlan = getPlanById(searchParams.get("plan"));

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
    projectType: selectedPlan?.defaultProjectType ?? "web-app",
    description: "",
    budget: "tbd",
    timeline: "",
  });

  const handleFormalInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello ${siteConfig.engineerName},

I would like to discuss a project with ${siteConfig.brandName}.
${selectedPlan ? `\nSelected Plan: ${selectedPlan.name} - ${formatPlanPrice(selectedPlan)}\n` : ""}
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company/Organization: ${formData.company}\n` : ""}${formData.phone ? `Phone: ${formData.phone}\n` : ""}Project Type: ${formData.projectType}
Budget: ${formData.budget}
${formData.timeline ? `Timeline: ${formData.timeline}\n` : ""}
Project Details:
${formData.description}

I came across the ${siteConfig.brandName} portfolio and would like to discuss this project further.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-baseline gap-3.5 mb-5">
            <span className="text-4xl md:text-6xl font-light text-neutral-400">01</span>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              <TypingText text="Start a Project" delayMs={60} />
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8">
            <TypingText
              text={`Connect with ${siteConfig.engineerName} at ${siteConfig.brandName}. Describe your idea below to get a preliminary technical concept, or submit a formal project inquiry.`}
              delayMs={260}
              showCaret={false}
            />
          </p>

          {/* Direct Business Contact & Registration Strip */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white/85 border border-black/[0.08] text-xs font-mono shadow-sm">
            <a
              href={siteConfig.mailtoUrl}
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
            >
              <Mail size={15} />
              {siteConfig.email}
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="inline-flex items-center gap-2 text-foreground">
              <ShieldCheck size={15} className="text-accent" />
              {siteConfig.businessRegistrationLabel}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="glass-card p-8 md:p-10 rounded-3xl h-fit"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Describe Your Idea
              </h2>
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <Bot size={20} />
              </div>
            </div>

            <form onSubmit={handleGenerateConcept} className="space-y-5">
              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-muted-foreground mb-2.5">
                  Tell us what you want to build in plain English.
                </label>
                <textarea
                  id="idea"
                  rows={5}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="I need an application where businesses can..."
                  className="w-full bg-white border border-black/[0.1] rounded-2xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-all resize-none text-sm md:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating || !idea.trim()}
                className="w-full py-3.5 bg-white border border-black/[0.1] text-foreground font-semibold rounded-xl hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {isGenerating ? "Analyzing..." : "Generate Technical Concept"}
              </button>
            </form>

            {concept && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-8 pt-8 border-t border-black/[0.07]"
              >
                <h3 className="text-xs font-mono font-bold text-accent mb-3 uppercase tracking-wider">
                  Preliminary Concept
                </h3>
                <div className="bg-white border border-black/[0.07] p-5 rounded-2xl text-sm text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                  {concept}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-balance">
                  Note: This is a preliminary technical assessment, not an automatic binding quotation. Let&apos;s discuss further.
                </p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="surface-card p-8 md:p-10 rounded-3xl relative overflow-hidden"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 tracking-tight">
              Formal Inquiry
            </h2>
            {selectedPlan && (
              <div className="mb-6 p-4 rounded-2xl bg-accent/[0.06] border border-accent/30 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Selected Plan
                    </div>
                    <div className="text-foreground font-semibold">
                      {selectedPlan.name} &middot; {formatPlanPrice(selectedPlan)}
                    </div>
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="text-xs font-semibold text-accent hover:underline whitespace-nowrap"
                >
                  Change plan
                </Link>
              </div>
            )}
            <form onSubmit={handleFormalInquiry} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                >
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
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  >
                    <option value="tbd">To Be Discussed</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-2">
                    Expected Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 months"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-secondary/50 border border-black/[0.1] rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shadow-sm text-sm"
              >
                Submit Inquiry <Send size={17} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
