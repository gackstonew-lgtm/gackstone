import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { Code2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not Found" };
  
  return {
    title: `${project.title} | Case Study | GacksDev`,
    description: project.shortDescription,
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <article className="py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-16 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
        
        <header className="mb-20">
          <div className="text-sm font-mono font-semibold text-accent mb-6 inline-block px-3 py-1 bg-accent/10 rounded-full">{project.category}</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">{project.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed text-balance">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 text-sm font-medium">
              <Code2 size={18} /> View Repository
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all hover:-translate-y-1 shadow-lg shadow-accent/20 text-sm font-bold">
                <ExternalLink size={18} /> Live Project
              </a>
            )}
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent">
          <h2 className="text-3xl mt-16 mb-8 border-b border-white/10 pb-4">Architecture</h2>
          <ul className="space-y-3 marker:text-accent">
            {project.architecture.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-3xl mt-16 mb-8 border-b border-white/10 pb-4">Core Features</h2>
          <ul className="space-y-3 marker:text-accent">
            {project.features.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          
          <h2 className="text-3xl mt-16 mb-8 border-b border-white/10 pb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-3 not-prose">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-primary rounded-lg text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
