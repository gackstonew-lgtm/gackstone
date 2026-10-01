import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import {
  Code2,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import TypingText from "@/components/TypingText";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | Case Study | Quantum Code Technologies`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Engineering Case Study | Quantum Code Technologies`,
      description: project.description,
      type: "article",
    },
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-14 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="text-xs font-mono font-semibold text-accent px-3 py-1 bg-accent/10 rounded-full">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground px-3 py-1 pill-badge rounded-full">
              {project.status} • {project.timeline}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6 leading-[1.08]">
            <TypingText text={project.title} delayMs={60} />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed text-balance">
            <TypingText
              text={project.description}
              delayMs={260}
              showCaret={false}
            />
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/[0.08] text-foreground rounded-full hover:bg-secondary transition-all hover:-translate-y-0.5 text-sm font-medium shadow-sm"
            >
              <Code2 size={17} /> View Repository
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm text-sm font-semibold"
              >
                <ExternalLink size={17} /> Live Project
              </a>
            )}
          </div>
        </header>

        {/* Problem & Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          <div className="p-6 rounded-3xl glass-card">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent mb-2.5">
              01 • Problem Statement
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div className="p-6 rounded-3xl glass-card">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent mb-2.5">
              02 • Deployment &amp; Runtime
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              {project.deployment}
            </p>
            <div className="text-xs font-mono text-foreground">
              Integrations: {project.integrations.join(" • ")}
            </div>
          </div>
        </div>

        {/* Architecture Flow Visualizer */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-6 border-b border-black/[0.07] pb-4 flex items-center gap-2.5">
            <Layers size={22} className="text-accent" /> System Architecture Pipeline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.architectureDiagram.map((node, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl surface-card flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-accent mb-1">
                    Layer 0{idx + 1} • {node.layer}
                  </div>
                  <div className="text-base font-semibold text-foreground mb-2">
                    {node.component}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{node.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-14">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 border-b border-black/[0.07] pb-3">
              Architecture &amp; Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
                  Architectural Layers
                </div>
                <ul className="space-y-2.5 text-sm text-foreground">
                  {project.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-mono">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
                  Core Product Capabilities
                </div>
                <ul className="space-y-2.5 text-sm text-foreground">
                  {project.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-mono">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 border-b border-black/[0.07] pb-3">
              Engineering Challenges &amp; Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3">
                  Key Technical Challenges
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {project.engineeringChallenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-accent font-mono">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-3">
                  Implemented Solutions
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {project.solutions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 border-b border-black/[0.07] pb-3">
              Requirements &amp; Technical Governance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <Cpu size={15} /> System Requirements
                </div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {project.caseStudy.requirements.map((req, i) => (
                    <li key={i}>• {req}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl surface-card">
                <div className="text-xs font-mono uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <ShieldCheck size={15} /> Security, Performance &amp; Observability
                </div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {project.caseStudy.security.map((sec, i) => (
                    <li key={`sec-${i}`}>• {sec}</li>
                  ))}
                  {project.caseStudy.performance.map((perf, i) => (
                    <li key={`perf-${i}`}>• {perf}</li>
                  ))}
                  {project.caseStudy.observability.map((obs, i) => (
                    <li key={`obs-${i}`}>• {obs}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-5 border-b border-black/[0.07] pb-3">
              Verified Outcomes &amp; Technology Stack
            </h2>
            <div className="p-6 rounded-2xl surface-card mb-6">
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {project.results.map((item, i) => (
                  <li key={`res-${i}`} className="flex items-start gap-2">
                    <span className="text-accent font-mono">→</span>
                    <span>{item}</span>
                  </li>
                ))}
                {project.caseStudy.lessonsLearned.map((item, i) => (
                  <li key={`les-${i}`} className="flex items-start gap-2">
                    <span className="text-accent font-mono">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 pill-badge rounded-xl text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
