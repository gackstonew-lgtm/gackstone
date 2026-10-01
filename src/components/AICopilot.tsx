"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bot, Send, X, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MatchedProjectRef {
  slug: string;
  title: string;
  category: string;
  liveUrl?: string;
  repositoryUrl: string;
}

interface CopilotMessage {
  role: "user" | "assistant";
  content: string;
  matchedProjects?: MatchedProjectRef[];
  suggestedFollowUps?: string[];
}

const INITIAL_SUGGESTIONS = [
  "Tell me about Alpha Coach.",
  "Which projects use PostgreSQL?",
  "Which projects involve AI?",
  "Tell me about For Sale.",
  "Show me backend-heavy projects.",
];

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am the Quantum Code Technologies AI Copilot for Gackstone Baraka's software engineering portfolio. I answer questions strictly from verified portfolio repositories, system architectures, and production deployments. What would you like to explore?",
      suggestedFollowUps: INITIAL_SUGGESTIONS,
    },
  ]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-copilot", handleOpen);
    return () => window.removeEventListener("open-ai-copilot", handleOpen);
  }, []);

  const sendQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || loading) return;

    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Unable to process request right now.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          matchedProjects: data.matchedProjects,
          suggestedFollowUps: data.suggestedFollowUps,
        },
      ]);

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copilot_query" }),
      }).catch(() => {});
    } catch {
      setError("Network error while contacting Quantum Code AI Copilot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Quantum Code Technologies AI Copilot"
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 bg-white border border-black/[0.09] text-accent rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[65] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Quantum Code Technologies AI Copilot"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative z-10 w-full max-w-md bg-background border-l border-black/[0.08] h-full flex flex-col shadow-[0_20px_50px_rgba(15,23,42,0.16)]"
            >
              <div className="px-6 py-5 bg-white border-b border-black/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                      Quantum Code AI Copilot
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                        Grounded
                      </span>
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Gackstone Baraka &bull; Verified architecture intelligence
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI Copilot"
                  className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-white border border-black/[0.07] text-foreground shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                      <div className="mt-3 w-full space-y-2">
                        {msg.matchedProjects.slice(0, 4).map((proj) => (
                          <div
                            key={proj.slug}
                            className="p-3 rounded-xl bg-white border border-black/[0.07] shadow-sm flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-mono text-accent truncate">
                                {proj.category}
                              </div>
                              <div className="text-sm font-semibold text-foreground truncate">
                                {proj.title}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {proj.liveUrl && (
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-muted-foreground hover:text-foreground bg-secondary rounded-lg"
                                  aria-label={`Live demo for ${proj.title}`}
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}
                              <Link
                                href={`/work/${proj.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-accent/90"
                              >
                                Case Study <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => sendQuery(prompt)}
                            disabled={loading}
                            className="text-xs px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Sparkles size={11} className="text-accent" />
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs font-mono text-accent bg-white border border-black/[0.07] px-4 py-3 rounded-xl w-fit shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    Querying verified Quantum Code Technologies knowledge base...
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendQuery(input);
                }}
                className="p-4 border-t border-black/[0.07] bg-white"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, PostgreSQL, AI, MT5..."
                    maxLength={350}
                    className="flex-1 bg-secondary/70 border border-black/[0.08] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send question"
                    className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground font-mono text-center">
                  Controlled Knowledge Source • Zero Unverified Claims
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
