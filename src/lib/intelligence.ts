import { projects, githubRepositoryInventory } from "@/data/portfolio";

export interface TechRadarItem {
  name: string;
  quadrant: "Languages" | "Frontend" | "Backend" | "Infrastructure" | "Observability" | "AI";
  ring: "Adopt" | "Production" | "Specialized";
  evidenceProjects: { slug: string; title: string }[];
  summary: string;
}

export const technologyRadarData: TechRadarItem[] = [
  // Languages
  {
    name: "TypeScript",
    quadrant: "Languages",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "gacks-ai", title: "GACKS P.A." },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "alpha-coach", title: "Alpha Coach" },
      { slug: "for-sale", title: "For Sale" },
      { slug: "leavoyage-resort", title: "Le Voyage Resort" },
      { slug: "varban-autoflex", title: "VarbanAutoFlex" }
    ],
    summary: "Primary language for full-stack web applications, REST APIs, and strict schema validation."
  },
  {
    name: "Python",
    quadrant: "Languages",
    ring: "Adopt",
    evidenceProjects: [{ slug: "alpha-coach", title: "Alpha Coach" }],
    summary: "Used for backend microservices, FastAPI/Django APIs, and the Alpha Coach local MT5 terminal bridge."
  },
  {
    name: "Go",
    quadrant: "Languages",
    ring: "Production",
    evidenceProjects: [],
    summary: "High-throughput concurrent backend microservices and low-latency systems architecture."
  },
  {
    name: "Kotlin",
    quadrant: "Languages",
    ring: "Adopt",
    evidenceProjects: [{ slug: "webhunt-android", title: "WebHunt Android" }],
    summary: "Native Android mobile application engineering and system-level networking services."
  },
  {
    name: "Java 17",
    quadrant: "Languages",
    ring: "Production",
    evidenceProjects: [{ slug: "endless-chase", title: "Endless Chase" }],
    summary: "Native Android 3D runtime engineering with libGDX 3D and zero-allocation object pooling."
  },
  {
    name: "SQL",
    quadrant: "Languages",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "alpha-coach", title: "Alpha Coach" }
    ],
    summary: "Relational schema design, PostgreSQL Row Level Security (RLS), and analytical aggregations."
  },
  {
    name: "MQL5 / Pine Script",
    quadrant: "Languages",
    ring: "Specialized",
    evidenceProjects: [
      { slug: "arcade-fx", title: "Arcade FX" },
      { slug: "alpha-coach", title: "Alpha Coach" }
    ],
    summary: "Financial engineering, MetaTrader 5 terminal integration, and deterministic SMC/CRT indicators."
  },
  // Frontend
  {
    name: "React",
    quadrant: "Frontend",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "gacks-ai", title: "GACKS P.A." },
      { slug: "alpha-coach", title: "Alpha Coach" },
      { slug: "leavoyage-resort", title: "Le Voyage Resort" },
      { slug: "for-sale", title: "For Sale" }
    ],
    summary: "Component-driven interactive UIs, Progressive Web Apps (PWAs), and real-time dashboards."
  },
  {
    name: "Next.js",
    quadrant: "Frontend",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "for-sale", title: "For Sale" }
    ],
    summary: "App Router SSR/SSG architecture, Server Components, edge middleware, and technical SEO."
  },
  {
    name: "Tailwind CSS",
    quadrant: "Frontend",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "alpha-coach", title: "Alpha Coach" },
      { slug: "for-sale", title: "For Sale" },
      { slug: "leavoyage-resort", title: "Le Voyage Resort" }
    ],
    summary: "Design-token-driven utility styling for responsive dark/light interfaces."
  },
  // Backend
  {
    name: "Node.js",
    quadrant: "Backend",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "alpha-coach", title: "Alpha Coach" },
      { slug: "bm-forex-hub", title: "BM Forex Hub" }
    ],
    summary: "REST APIs, asynchronous queue workers, trade reconstruction engines, and webhook services."
  },
  {
    name: "FastAPI / Django",
    quadrant: "Backend",
    ring: "Production",
    evidenceProjects: [{ slug: "alpha-coach", title: "Alpha Coach" }],
    summary: "Python backend API engineering, data validation, and quantitative service orchestration."
  },
  {
    name: "NestJS",
    quadrant: "Backend",
    ring: "Production",
    evidenceProjects: [],
    summary: "Modular enterprise Node.js backend architecture with dependency injection."
  },
  // Infrastructure
  {
    name: "PostgreSQL / Supabase",
    quadrant: "Infrastructure",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "alpha-coach", title: "Alpha Coach" }
    ],
    summary: "Primary relational datastore with Row Level Security (RLS), Prisma ORM, and CloudNativePG patterns."
  },
  {
    name: "Docker & Kubernetes",
    quadrant: "Infrastructure",
    ring: "Adopt",
    evidenceProjects: [{ slug: "gacks-ai", title: "GACKS P.A." }],
    summary: "Containerized runtime isolation, sandboxed tool execution, and GitOps deployment workflows."
  },
  {
    name: "Redis & RabbitMQ",
    quadrant: "Infrastructure",
    ring: "Production",
    evidenceProjects: [{ slug: "bm-forex-hub", title: "BM Forex Hub" }],
    summary: "Asynchronous message queuing, rate-limiting buckets, and background broadcast workers."
  },
  {
    name: "Vercel",
    quadrant: "Infrastructure",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "g-tech-isp-billing-system", title: "G-Tech ISP Billing System" },
      { slug: "webhunt", title: "WebHunt" },
      { slug: "gacks-ai", title: "GACKS P.A." },
      { slug: "yardly-automotive", title: "Yardly Automotives" },
      { slug: "alpha-coach", title: "Alpha Coach" },
      { slug: "for-sale", title: "For Sale" },
      { slug: "leavoyage-resort", title: "Le Voyage Resort" }
    ],
    summary: "Global edge network, serverless API execution, and automated CI/CD preview/production pipelines."
  },
  // Observability
  {
    name: "OpenTelemetry",
    quadrant: "Observability",
    ring: "Adopt",
    evidenceProjects: [],
    summary: "Vendor-neutral distributed tracing, metrics, and context propagation across services."
  },
  {
    name: "Grafana / Loki / Tempo",
    quadrant: "Observability",
    ring: "Production",
    evidenceProjects: [],
    summary: "Unified observability stack for metrics visualization, log aggregation, and trace correlation."
  },
  {
    name: "Prometheus / Mimir",
    quadrant: "Observability",
    ring: "Production",
    evidenceProjects: [],
    summary: "Time-series telemetry collection, latency percentile tracking, and alerting."
  },
  // AI
  {
    name: "LLMs (Gemini & Claude)",
    quadrant: "AI",
    ring: "Adopt",
    evidenceProjects: [
      { slug: "gacks-ai", title: "GACKS P.A." },
      { slug: "alpha-coach", title: "Alpha Coach" }
    ],
    summary: "Multi-model LLM routing, structured extraction, and empirically grounded domain coaching."
  },
  {
    name: "Agentic Architecture & Tool Calling",
    quadrant: "AI",
    ring: "Adopt",
    evidenceProjects: [{ slug: "gacks-ai", title: "GACKS P.A." }],
    summary: "Context Engine, Planner, Model Router, Sandboxed Tool Registry, and Closed-Loop Verifier."
  },
  {
    name: "Grounded RAG & Domain Intelligence",
    quadrant: "AI",
    ring: "Adopt",
    evidenceProjects: [{ slug: "alpha-coach", title: "Alpha Coach" }],
    summary: "Retrieval-augmented analytics grounded strictly in verified database records without fabrication."
  }
];

/**
 * Grounded Quantum Code Technologies AI Copilot answer engine.
 * Strictly uses verified portfolio projects, capabilities, and repository inventory.
 * Never fabricates projects, metrics, or unverified experience.
 */
export function answerPortfolioQuery(rawQuery: string): {
  answer: string;
  matchedProjects: { slug: string; title: string; category: string; liveUrl?: string; repositoryUrl: string }[];
  suggestedFollowUps: string[];
  source: "verified-knowledge-base";
} {
  const q = rawQuery.toLowerCase().trim();

  if (!q) {
    return {
      answer:
        "Ask me about any project in Gackstone Baraka's portfolio at Quantum Code Technologies (such as G-Tech ISP Billing System, Alpha Coach, For Sale, WebHunt, GACKS P.A., Yardly Automotives, Arcade FX, BM Forex Hub, KaringPOS, Le Voyage Resort, VarbanAutoFlex, or Endless Chase), technologies used (PostgreSQL, Next.js, Python, AI, Kotlin, Java), or system architectures.",
      matchedProjects: projects.filter((p) => p.featured).map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about Alpha Coach.",
        "Which projects use PostgreSQL?",
        "Which projects involve AI?",
        "Show me backend-heavy projects."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 1. Check if asking about a specific project by name or slug
  const directProject = projects.find(
    (p) =>
      q.includes(p.title.toLowerCase()) ||
      q.includes(p.slug.toLowerCase()) ||
      (p.slug === "g-tech-isp-billing-system" && (q.includes("g-tech") || q.includes("gtech") || q.includes("isp billing") || q.includes("mikrotik") || q.includes("freeradius"))) ||
      (p.slug === "alpha-coach" && (q.includes("alpha coach") || q.includes("meta coach") || q.includes("mt5"))) ||
      (p.slug === "for-sale" && (q.includes("for sale") || q.includes("for-sale") || q.includes("white-label resort"))) ||
      (p.slug === "gacks-ai" && (q.includes("gacks p.a") || q.includes("gacks ai") || q.includes("personal operator"))) ||
      (p.slug === "pos-system" && (q.includes("karingpos") || q.includes("pos system") || q.includes("point of sale"))) ||
      (p.slug === "endless-chase" && (q.includes("endless chase") || q.includes("android-game") || q.includes("chase 3d")))
  );

  if (directProject) {
    const liveNote = directProject.liveUrl
      ? `Live deployment: ${directProject.liveUrl}`
      : "Deployment: Native package / repository release (no public web URL).";
    return {
      answer: `${directProject.title} (${directProject.category}): ${directProject.description}\n\n• Problem Solved: ${directProject.problem}\n• Architecture: ${directProject.architecture.join(", ")}\n• Technologies: ${directProject.technologies.join(", ")}\n• Key Features: ${directProject.features.join(", ")}\n• ${liveNote}\n• Repository: ${directProject.repositoryUrl}`,
      matchedProjects: [
        {
          slug: directProject.slug,
          title: directProject.title,
          category: directProject.category,
          liveUrl: directProject.liveUrl,
          repositoryUrl: directProject.repositoryUrl
        }
      ],
      suggestedFollowUps: [
        `What engineering challenges were solved in ${directProject.title}?`,
        "Which projects use PostgreSQL?",
        "Which projects involve AI?"
      ],
      source: "verified-knowledge-base"
    };
  }

  // 2. Check if asking about PostgreSQL / Supabase / Prisma / Database
  if (q.includes("postgres") || q.includes("supabase") || q.includes("prisma") || q.includes("database") || q.includes("sql")) {
    const dbProjects = projects.filter(
      (p) =>
        p.comparison.postgresql ||
        p.technologies.some((t) => /postgres|supabase|prisma|database/i.test(t))
    );
    return {
      answer: `Verified portfolio projects using PostgreSQL / relational database architectures (${dbProjects.length} projects):\n\n` +
        dbProjects
          .map(
            (p) =>
              `• ${p.title}: Uses ${p.technologies.join(", ")} — ${p.shortDescription}`
          )
          .join("\n"),
      matchedProjects: dbProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about Alpha Coach.",
        "How does Yardly Automotives use Row Level Security?",
        "Tell me about WebHunt."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 3. Check if asking about AI / LLM / Agentic projects
  if (/\bai\b|artificial intelligence|llm|gemini|claude|agent|rag|copilot/.test(q)) {
    const aiProjects = projects.filter((p) => p.comparison.ai);
    return {
      answer:
        `Quantum Code Technologies features ${aiProjects.length} verified AI & autonomous systems projects engineered by Gackstone Baraka:\n\n` +
        aiProjects
          .map(
            (p) =>
              `• ${p.title} (${p.category}): ${p.description}`
          )
          .join("\n\n"),
      matchedProjects: aiProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about GACKS P.A.",
        "Tell me about Alpha Coach.",
        "Show me backend-heavy projects."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 4. Check if asking about Backend / API / Infrastructure / Queues
  if (q.includes("backend") || q.includes("api") || q.includes("queue") || q.includes("server") || q.includes("infrastructure")) {
    const backendProjects = projects.filter((p) => p.comparison.backend);
    return {
      answer:
        `Verified backend-intensive projects across Quantum Code Technologies (${backendProjects.length} projects):\n\n` +
        backendProjects
          .map(
            (p) =>
              `• ${p.title}: ${p.architecture.slice(0, 3).join(", ")} (${p.technologies.join(", ")})`
          )
          .join("\n"),
      matchedProjects: backendProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about BM Forex Hub.",
        "Tell me about Alpha Coach.",
        "Tell me about KaringPOS."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 5. Check if asking about Mobile / Android / Kotlin / Java
  if (q.includes("mobile") || q.includes("android") || q.includes("kotlin") || q.includes("java") || q.includes("game")) {
    const mobileProjects = projects.filter((p) => p.comparison.mobile);
    return {
      answer:
        `Quantum Code Technologies includes ${mobileProjects.length} verified native Android mobile engineering projects:\n\n` +
        mobileProjects
          .map(
            (p) =>
              `• ${p.title} (${p.technologies.join(", ")}): ${p.description}`
          )
          .join("\n\n"),
      matchedProjects: mobileProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about Endless Chase.",
        "Tell me about WebHunt Android.",
        "What technologies are used across the portfolio?"
      ],
      source: "verified-knowledge-base"
    };
  }

  // 6. Check if asking about FinTech / Trading / Forex
  if (q.includes("fintech") || q.includes("trading") || q.includes("forex") || q.includes("financial") || q.includes("mpesa")) {
    const fintechProjects = projects.filter((p) => p.comparison.fintech);
    return {
      answer:
        `Quantum Code Technologies includes ${fintechProjects.length} verified Financial Engineering & FinTech systems:\n\n` +
        fintechProjects
          .map(
            (p) =>
              `• ${p.title} (${p.category}): ${p.shortDescription}`
          )
          .join("\n"),
      matchedProjects: fintechProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about Alpha Coach.",
        "Tell me about Arcade FX.",
        "Tell me about BM Forex Hub."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 7. Check if asking about Hospitality / Resort / Hotel / Client work
  if (q.includes("resort") || q.includes("hotel") || q.includes("hospitality") || q.includes("client") || q.includes("automotive") || q.includes("car")) {
    const matched = projects.filter(
      (p) =>
        p.classification === "client" ||
        /hospitality|automotive|resort/i.test(p.category) ||
        p.slug === "for-sale" ||
        p.slug === "yardly-automotive"
    );
    return {
      answer:
        `Verified Hospitality, Automotive & Client Platforms (${matched.length} projects):\n\n` +
        matched
          .map((p) => `• ${p.title} (${p.category}): ${p.shortDescription}`)
          .join("\n"),
      matchedProjects: matched.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about For Sale.",
        "Tell me about Le Voyage Resort.",
        "Tell me about Yardly Automotives."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 8. Check if asking about Technologies / Stack / Skills / Capabilities
  if (q.includes("technolog") || q.includes("stack") || q.includes("skill") || q.includes("language") || q.includes("nextjs") || q.includes("next.js") || q.includes("react")) {
    const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)));
    return {
      answer:
        `Quantum Code Technologies (Gackstone Baraka, Senior Software Engineer • Full-Stack Systems & AI Architect) builds with verified production technologies across ${projects.length} public projects:\n\n` +
        `• Frontend: React 18/19, Next.js 14, TypeScript, Tailwind CSS, Vite PWA\n` +
        `• Backend: Go, Python (FastAPI, Django), Node.js (Express, NestJS), PHP\n` +
        `• Mobile & 3D: Kotlin, Java 17, Android SDK, libGDX 3D, OpenGL ES, React Native\n` +
        `• Data & Messaging: PostgreSQL, Supabase (RLS), Prisma, SQLite, Redis, RabbitMQ, CloudNativePG\n` +
        `• Cloud & Observability: Docker, Kubernetes, GitOps, Vercel, OpenTelemetry, Grafana, Loki, Tempo, Mimir\n` +
        `• Financial & AI: MetaTrader 5 (MQL5 / Python Bridge), TradingView Pine Script, Gemini, Claude, Agentic Architecture\n\n` +
        `Project-verified tags: ${allTechs.join(", ")}.`,
      matchedProjects: projects.slice(0, 6).map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Which projects use PostgreSQL?",
        "Which projects involve AI?",
        "Show me mobile Android projects."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 9. Check if asking about GitHub inventory / repositories / contact
  if (q.includes("github") || q.includes("repo") || q.includes("all projects") || q.includes("how many")) {
    return {
      answer:
        `The GitHub profile (https://github.com/gackstonew-lgtm) contains ${githubRepositoryInventory.length} audited public repositories, of which ${projects.length} are approved and published under Quantum Code Technologies (${projects.map((p) => p.title).join(", ")}). The host portfolio repository (GacksDev) and Wifi-Bypass (experimental local device proxy utility) are classified as non-card repositories in the governance registry.`,
      matchedProjects: projects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: [
        "Tell me about Alpha Coach.",
        "Tell me about For Sale.",
        "Tell me about Endless Chase."
      ],
      source: "verified-knowledge-base"
    };
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("whatsapp") || q.includes("email") || q.includes("registration") || q.includes("license")) {
    return {
      answer:
        "You can start a project or contact Gackstone Baraka at Quantum Code Technologies (Business Registration No: BN-J9S6WDAY) via the /contact page, by email at quantumcode7777@gmail.com, via WhatsApp (+254 712 052 104), or on GitHub (https://github.com/gackstonew-lgtm).",
      matchedProjects: [],
      suggestedFollowUps: [
        "What technologies are used across the portfolio?",
        "Tell me about Alpha Coach.",
        "Tell me about For Sale."
      ],
      source: "verified-knowledge-base"
    };
  }

  // 10. Keyword search across all project fields
  const keywordMatches = projects.filter((p) => {
    const haystack = [
      p.title,
      p.category,
      p.shortDescription,
      p.description,
      p.problem,
      ...p.technologies,
      ...p.capabilities,
      ...p.features,
      ...p.architecture
    ]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).some((word) => word.length > 2 && haystack.includes(word));
  });

  if (keywordMatches.length > 0) {
    return {
      answer:
        `Found ${keywordMatches.length} verified Quantum Code Technologies project(s) matching your query:\n\n` +
        keywordMatches
          .map((p) => `• ${p.title} (${p.category}): ${p.shortDescription}`)
          .join("\n"),
      matchedProjects: keywordMatches.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        liveUrl: p.liveUrl,
        repositoryUrl: p.repositoryUrl
      })),
      suggestedFollowUps: keywordMatches.slice(0, 3).map((p) => `Tell me about ${p.title}.`),
      source: "verified-knowledge-base"
    };
  }

  return {
    answer:
      `That specific information is not available in the verified Quantum Code Technologies knowledge base. I only answer using factual repository and portfolio data without inventing claims. You can ask me about any of the ${projects.length} verified projects engineered by Gackstone Baraka (such as G-Tech ISP Billing System, Alpha Coach, For Sale, WebHunt, GACKS P.A., Yardly Automotives, Arcade FX, BM Forex Hub, KaringPOS, Le Voyage Resort, VarbanAutoFlex, WebHunt Android, or Endless Chase) or the engineering stack.`,
    matchedProjects: [],
    suggestedFollowUps: [
      "What technologies are used across the portfolio?",
      "Tell me about Alpha Coach.",
      "Tell me about For Sale.",
      "Which projects use PostgreSQL?"
    ],
    source: "verified-knowledge-base"
  };
}
