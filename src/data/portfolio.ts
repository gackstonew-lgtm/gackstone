export type ProjectClassification =
  | "production"
  | "client"
  | "open-source"
  | "experimental"
  | "archived"
  | "excluded";

export interface ArchitectureNode {
  layer: string;
  component: string;
  detail: string;
}

export interface ProjectCaseStudy {
  requirements: string[];
  technologyChoices: string[];
  security: string[];
  performance: string[];
  observability: string[];
  lessonsLearned: string[];
}

export interface ProjectComparisonFlags {
  frontend: boolean;
  backend: boolean;
  ai: boolean;
  postgresql: boolean;
  realtime: boolean;
  cloud: boolean;
  mobile: boolean;
  fintech: boolean;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  capabilities: string[];
  description: string;
  architecture: string[];
  features: string[];
  repositoryUrl: string;
  liveUrl?: string;
  featured: boolean;
  // Extended Project Intelligence fields
  classification: ProjectClassification;
  status: "Production" | "Client Delivery" | "Active Architecture" | "Native Release";
  filterCategories: string[];
  problem: string;
  clientSummary: string;
  clientOutcomes: string[];
  engineeringChallenges: string[];
  solutions: string[];
  deployment: string;
  integrations: string[];
  results: string[];
  timeline: string;
  createdAt: string;
  updatedAt: string;
  architectureDiagram: ArchitectureNode[];
  caseStudy: ProjectCaseStudy;
  comparison: ProjectComparisonFlags;
}

export interface GitHubRepositoryRecord {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  homepage: string | null;
  language: string;
  createdAt: string;
  pushedAt: string;
  classification: ProjectClassification;
  approved: boolean;
  portfolioSlug?: string;
  auditNote: string;
}

export const projects: Project[] = [
  {
    slug: "webhunt",
    title: "WebHunt",
    shortDescription: "Engineering a worldwide business and technology opportunity discovery platform.",
    category: "B2B Intelligence / Lead Discovery",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    capabilities: ["Full-Stack Platform", "Data Discovery", "Lead Pipeline"],
    description: "WebHunt is a lead discovery platform designed for agencies, freelancers, software developers, consultants, and businesses looking for new opportunities around the world. It brings business discovery and remote opportunity discovery together in one simple interface.",
    architecture: ["App Router", "Server Components", "Middleware", "Prisma Data Layer"],
    features: ["Physical Business Search", "Online Opportunity Search", "Lead Pipeline Management", "Contact Discovery"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/WebHunt",
    liveUrl: "https://web-hunt-delta.vercel.app/",
    featured: true,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Full-Stack", "Web Applications", "Business Systems"],
    problem: "Agencies and independent software engineers spend excessive hours manually searching fragmented directories to identify businesses lacking modern web infrastructure or remote technical opportunities.",
    clientSummary: "An end-to-end B2B lead discovery and pipeline management platform that identifies high-intent businesses needing digital transformation worldwide.",
    clientOutcomes: [
      "Unified physical business discovery and remote opportunity search in one workspace",
      "Structured lead pipeline tracking from initial discovery to outreach",
      "Deployed globally on Vercel with sub-second server-rendered views"
    ],
    engineeringChallenges: [
      "Normalizing heterogeneous business directory records and contact metadata into a unified schema",
      "Preventing duplicate lead ingestion across concurrent search sessions",
      "Maintaining fast query responsiveness across filtered multi-criteria lead tables"
    ],
    solutions: [
      "Designed a strongly typed Prisma + PostgreSQL data model with composite uniqueness constraints",
      "Implemented Next.js App Router Server Components and route middleware for authenticated data access",
      "Built deterministic client-side filtering combined with indexed server-side pagination"
    ],
    deployment: "Vercel Production Edge & Serverless Functions with managed PostgreSQL via Prisma.",
    integrations: ["Prisma ORM", "PostgreSQL", "REST Search Endpoints", "WebHunt Android Companion API"],
    results: [
      "Live production deployment serving global B2B lead discovery workflows",
      "Paired with a dedicated native Kotlin Android mobile companion application"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-09",
    updatedAt: "2026-09-30",
    architectureDiagram: [
      { layer: "Client Layer", component: "Next.js 14 App Router UI", detail: "Server & Client Components with Tailwind CSS responsive pipeline views" },
      { layer: "Edge & Auth", component: "Next.js Middleware", detail: "Request validation, session protection, and route guards" },
      { layer: "Application API", component: "Discovery & Pipeline Services", detail: "Lead aggregation, deduplication, and contact qualification logic" },
      { layer: "Persistence", component: "Prisma ORM + PostgreSQL", detail: "Relational storage for business leads, status stages, and notes" }
    ],
    caseStudy: {
      requirements: [
        "Unified search interface for both local/physical businesses and remote software opportunities",
        "Structured CRM-style lead pipeline to track outreach status and contact details",
        "API compatibility with the WebHunt Android mobile client"
      ],
      technologyChoices: [
        "Next.js App Router for hybrid SSR/CSR rendering and colocated API routes",
        "TypeScript for end-to-end type safety between database queries and UI tables",
        "Prisma ORM with PostgreSQL for schema migrations and relational integrity"
      ],
      security: [
        "Middleware-enforced route protection and server-side input validation",
        "Parameterized ORM queries preventing SQL injection across search filters"
      ],
      performance: [
        "Server Component data fetching minimizing client JavaScript bundle overhead",
        "Indexed database lookups on business category, region, and pipeline status"
      ],
      observability: [
        "Structured API error logging and deployment health monitoring on Vercel"
      ],
      lessonsLearned: [
        "Separating discovery ingestion from pipeline qualification keeps the core CRM schema clean and fast",
        "Sharing API contracts early accelerated development of the WebHunt Android companion app"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: true,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "gacks-ai",
    title: "GACKS P.A.",
    shortDescription: "An experimental production-oriented agentic AI personal operator architecture.",
    category: "AI Engineering / Agentic Systems",
    technologies: ["React 19", "Vite", "TypeScript", "Gemini", "Claude", "Docker", "WebRTC"],
    capabilities: ["Agentic AI", "Context Engineering", "Model Routing", "Tool Execution"],
    description: "GACKS P.A. V2 is an architectural evolution from a local voice assistant into a production-grade, persistent, multimodal personal AI operator. It understands context, creates structured execution plans, invokes sandboxed tools, verifies outcomes against real systems, and seamless integrates with screens and cameras.",
    architecture: ["Context Engine", "Orchestrator", "Planner", "Model Router", "Tool Execution Registry", "Verifier"],
    features: ["Persistent Missions", "Multi-Tier Memory", "Closed-Loop Verification", "Voice & Vision Integration"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/Gacks-AI",
    liveUrl: "https://gacks-ai.vercel.app/",
    featured: true,
    classification: "production",
    status: "Active Architecture",
    filterCategories: ["All", "Full-Stack", "Web Applications", "AI / Intelligent Systems"],
    problem: "Conventional chat assistants lack persistent mission state, multimodal screen/camera awareness, deterministic tool execution boundaries, and closed-loop outcome verification.",
    clientSummary: "A multimodal AI personal operator that combines voice, vision, multi-model LLM routing, and sandboxed tool execution to automate complex technical workflows.",
    clientOutcomes: [
      "Multi-model routing across Gemini and Claude based on task complexity and latency targets",
      "Real-time WebRTC voice and visual context ingestion",
      "Closed-loop execution verification before marking operator missions complete"
    ],
    engineeringChallenges: [
      "Preventing hallucinated tool invocations during multi-step autonomous missions",
      "Managing short-term conversational context alongside long-term episodic memory without token bloat",
      "Synchronizing low-latency WebRTC audio/video streams with asynchronous planner states"
    ],
    solutions: [
      "Separated the cognitive loop into distinct Context Engine, Planner, Model Router, Tool Registry, and Verifier modules",
      "Implemented strict schema validation on all tool calls with sandboxed execution boundaries",
      "Built a multi-tier memory hierarchy with deterministic context pruning"
    ],
    deployment: "Vercel Frontend Deployment with containerized Docker execution environment support.",
    integrations: ["Google Gemini API", "Anthropic Claude API", "WebRTC Media Streams", "Docker Sandboxes"],
    results: [
      "Production-deployed interactive operator interface at gacks-ai.vercel.app",
      "Demonstrates complete agentic orchestration, tool registry governance, and multimodal state management"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-15",
    updatedAt: "2026-09-17",
    architectureDiagram: [
      { layer: "Multimodal I/O", component: "React 19 + WebRTC Streamer", detail: "Voice, screen share, and camera frame capture interface" },
      { layer: "Context & Memory", component: "Multi-Tier Context Engine", detail: "Working state, episodic mission history, and semantic pruning" },
      { layer: "Cognitive Core", component: "Orchestrator, Planner & Model Router", detail: "Dynamic task decomposition and routing between Gemini and Claude" },
      { layer: "Execution & Safety", component: "Sandboxed Tool Registry + Verifier", detail: "Schema-validated tool invocation and closed-loop outcome verification" }
    ],
    caseStudy: {
      requirements: [
        "Support multimodal inputs including voice, text, screen capture, and camera streams",
        "Route tasks dynamically across frontier LLMs (Gemini, Claude)",
        "Verify tool execution outcomes before reporting mission completion"
      ],
      technologyChoices: [
        "React 19 + TypeScript + Vite for low-latency reactive operator telemetry panels",
        "WebRTC for native browser audio/video stream ingestion",
        "Docker for isolated tool execution environments"
      ],
      security: [
        "Explicit tool permission registry preventing unauthorized system commands",
        "Strict environment-variable isolation for LLM provider credentials"
      ],
      performance: [
        "Streaming token responses paired with incremental state updates",
        "Context window budgeting to maintain predictable LLM response latency"
      ],
      observability: [
        "Real-time agent step logs tracking Planner -> Tool -> Verifier state transitions"
      ],
      lessonsLearned: [
        "A dedicated Verifier stage after tool execution drastically reduces silent agent failures",
        "Explicit model routing allows pairing fast models for UI intent with deep reasoning models for planning"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: true,
      postgresql: false,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "yardly-automotive",
    title: "Yardly Automotives",
    shortDescription: "Engineering a digital automotive marketplace for vehicle discovery and seller connections.",
    category: "Automotive Marketplace",
    technologies: ["TypeScript", "Supabase", "Next.js", "Tailwind", "PostgreSQL"],
    capabilities: ["Marketplace Architecture", "Advanced Filtering", "Database Security (RLS)"],
    description: "Yardly Automotives is a digital automotive marketplace designed to make buying and selling vehicles in Kenya simpler, faster, and more transparent. It connects vehicle buyers, private sellers, car yards, and automotive businesses in one digital marketplace.",
    architecture: ["Supabase Backend", "Row Level Security", "Payment Integration", "Serverless Functions"],
    features: ["Vehicle Discovery", "Seller Workflows", "Protected Documentation", "Real-Time Search & Filtering"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/YARDLY-Automotive",
    liveUrl: "https://yardlyautomotive.vercel.app",
    featured: true,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Full-Stack", "Web Applications", "Automotive"],
    problem: "Vehicle buyers and car yards in Kenya face fragmented listings, unverified seller workflows, and slow search experiences across informal social channels.",
    clientSummary: "A modern digital automotive marketplace connecting Kenyan car yards, private sellers, and buyers with real-time search, verified listings, and secure seller dashboards.",
    clientOutcomes: [
      "Centralized vehicle discovery across multiple car yards and private sellers",
      "Fine-grained Row Level Security (RLS) protecting seller inventory and documentation",
      "High-speed multi-attribute filtering by make, model, price range, and body type"
    ],
    engineeringChallenges: [
      "Enforcing tenant isolation so sellers and car yards can only mutate their own vehicle listings",
      "Handling high-resolution vehicle galleries without degrading mobile page load speeds",
      "Supporting multi-faceted search filters across thousands of vehicle attributes"
    ],
    solutions: [
      "Implemented PostgreSQL Row Level Security (RLS) policies in Supabase tied to authenticated user roles",
      "Engineered responsive image optimization and lazy loading across listing grids",
      "Created indexed database queries supporting combined make, price, year, and transmission filters"
    ],
    deployment: "Vercel Production with Supabase PostgreSQL, Auth, and Storage.",
    integrations: ["Supabase PostgreSQL", "Supabase Auth & RLS", "Supabase Storage", "Payment Gateways"],
    results: [
      "Deployed and live at yardlyautomotive.vercel.app",
      "End-to-end buyer discovery and multi-seller inventory management workflows"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-09",
    updatedAt: "2026-09-09",
    architectureDiagram: [
      { layer: "Presentation", component: "Next.js + Tailwind Marketplace UI", detail: "Responsive vehicle search, comparison, and seller portal" },
      { layer: "Auth & Access Control", component: "Supabase Auth + PostgreSQL RLS", detail: "Role-based seller, dealer, and buyer security policies" },
      { layer: "Data & Media", component: "Supabase PostgreSQL & Storage", detail: "Relational vehicle inventory, specifications, and image buckets" },
      { layer: "Serverless Logic", component: "Edge & Serverless Handlers", detail: "Listing verification, search indexing, and payment webhooks" }
    ],
    caseStudy: {
      requirements: [
        "Multi-vendor marketplace supporting both commercial car yards and individual sellers",
        "Fast multi-parameter search and filtering optimized for mobile networks in Kenya",
        "Database-level access control protecting seller records"
      ],
      technologyChoices: [
        "Next.js + TypeScript for SEO-friendly vehicle listing pages",
        "Supabase (PostgreSQL) for integrated relational data, authentication, and Row Level Security",
        "Tailwind CSS for mobile-first automotive catalog cards"
      ],
      security: [
        "PostgreSQL Row Level Security (RLS) ensuring strict data ownership boundaries",
        "Protected document and media upload policies"
      ],
      performance: [
        "Optimized media delivery and debounced real-time search filtering",
        "Static and dynamic route caching for popular vehicle categories"
      ],
      observability: [
        "Database query performance tracking and API request logging via Supabase & Vercel"
      ],
      lessonsLearned: [
        "Encoding authorization rules directly in PostgreSQL RLS eliminates entire classes of API permission bugs",
        "Mobile-first filter ergonomics are critical for automotive marketplaces in emerging markets"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: true,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "webhunt-android",
    title: "WebHunt Android",
    shortDescription: "The mobile application engineering counterpart to WebHunt.",
    category: "Mobile Engineering / Android",
    technologies: ["Kotlin", "Android SDK", "REST APIs"],
    capabilities: ["Mobile Architecture", "API Integration", "Authentication"],
    description: "WebHunt Android brings the power of the WebHunt B2B lead discovery platform to a native mobile experience. It is designed to provide a responsive and device-oriented product experience for users on the go.",
    architecture: ["Native Android", "REST API Communication", "Authentication Flow"],
    features: ["Mobile Search Experience", "Responsive UX", "Backend API Integration"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/WebHunt-Android",
    featured: false,
    classification: "production",
    status: "Native Release",
    filterCategories: ["All", "Mobile Apps"],
    problem: "Field sales teams and consultants need on-the-go access to WebHunt lead discovery and outreach pipelines without being tethered to a desktop browser.",
    clientSummary: "A native Android mobile companion application for the WebHunt B2B lead discovery ecosystem.",
    clientOutcomes: [
      "Native mobile lead lookup and pipeline status management on Android devices",
      "Resilient REST API synchronization with the core WebHunt platform",
      "Streamlined authentication and mobile-ergonomic outreach workflows"
    ],
    engineeringChallenges: [
      "Maintaining responsive UI rendering over variable mobile network connections",
      "Synchronizing authentication state and lead updates cleanly with the WebHunt backend"
    ],
    solutions: [
      "Engineered asynchronous REST API client layers with structured error handling and retry states",
      "Designed lifecycle-aware mobile screens tailored for one-handed field operation"
    ],
    deployment: "Native Android APK package communicating with WebHunt Cloud APIs.",
    integrations: ["WebHunt REST API", "Android SDK Networking & Lifecycle APIs"],
    results: [
      "Extends the WebHunt B2B platform into a multi-platform web + mobile ecosystem"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-14",
    updatedAt: "2026-09-14",
    architectureDiagram: [
      { layer: "Mobile UI", component: "Native Android Views", detail: "Mobile lead search, detail inspection, and pipeline cards" },
      { layer: "State & Lifecycle", component: "Kotlin ViewModels & State Holders", detail: "Configuration-survivable state and loading/error handling" },
      { layer: "Network Layer", component: "REST API Client", detail: "Authenticated HTTPS communication with WebHunt backend" }
    ],
    caseStudy: {
      requirements: [
        "Provide native Android access to WebHunt lead search and pipeline tracking",
        "Ensure smooth touch navigation and resilient network error handling"
      ],
      technologyChoices: [
        "Kotlin & Android SDK for native platform integration and performance",
        "RESTful JSON communication matching the WebHunt server schema"
      ],
      security: [
        "Token-based authentication over HTTPS and secure local session handling"
      ],
      performance: [
        "Lightweight list virtualization and non-blocking background network calls"
      ],
      observability: [
        "Structured client-side network error states and diagnostic logging"
      ],
      lessonsLearned: [
        "Designing backend APIs with mobile pagination in mind simplifies native client state management"
      ]
    },
    comparison: {
      frontend: true,
      backend: false,
      ai: false,
      postgresql: false,
      realtime: false,
      cloud: true,
      mobile: true,
      fintech: false
    }
  },
  {
    slug: "arcade-fx",
    title: "Arcade FX",
    shortDescription: "A professional quantitative trading analysis engine and native Settings Center.",
    category: "Financial Engineering / Trading Systems",
    technologies: ["TradingView Pine Script", "JavaScript", "Quantitative Analysis"],
    capabilities: ["Algorithmic Trading", "Smart Money Concepts", "Deterministic Calculations"],
    description: "A professional quantitative trading analysis engine and interactive charting workspace built according to Institutional Smart Money Concepts (SMC) and 5AM Candle Range Theory (CRT). Designed with zero-repainting guarantees.",
    architecture: ["Quantitative Engine", "Timeframe Analysis", "Signal Generation"],
    features: ["Institutional Smart Money Concepts", "5AM Candle Range Theory", "Zero-repainting Algorithms", "Interactive Charting"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/Arcade-Fx",
    liveUrl: "https://arcadefx.live/",
    featured: true,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "FinTech", "Business Systems", "Web Applications"],
    problem: "Discretionary forex and index traders often rely on lagging indicators or repainting scripts that distort historical signal accuracy and institutional market structure.",
    clientSummary: "A quantitative trading analysis engine and web platform implementing Institutional Smart Money Concepts (SMC) and 5AM Candle Range Theory (CRT) with zero-repainting guarantees.",
    clientOutcomes: [
      "Deterministic multi-timeframe market structure and liquidity sweep detection",
      "Strict zero-repainting bar-close confirmation logic for trustworthy backtesting",
      "Interactive web workspace and native Settings Center deployed at arcadefx.live"
    ],
    engineeringChallenges: [
      "Eliminating look-ahead bias and indicator repainting across multi-timeframe candle evaluations",
      "Computing institutional liquidity pools, order blocks, and 5AM CRT ranges deterministically in real time"
    ],
    solutions: [
      "Enforced strict bar-state confirmation rules so signals lock permanently upon candle close",
      "Modularized quantitative calculations into dedicated SMC structure, CRT range, and session engines"
    ],
    deployment: "Production web platform hosted at arcadefx.live with TradingView Pine Script execution modules.",
    integrations: ["TradingView Pine Script Engine", "Multi-Timeframe Market Data Feeds"],
    results: [
      "Live production platform at arcadefx.live developed in partnership with Affiniti",
      "Zero-repainting quantitative engine for institutional SMC and CRT workflows"
    ],
    timeline: "August 2026",
    createdAt: "2026-08-26",
    updatedAt: "2026-08-27",
    architectureDiagram: [
      { layer: "Market Data Input", component: "Multi-Timeframe OHLCV Feed", detail: "Session-aligned price action and 5AM reference candle ingestion" },
      { layer: "Quantitative Engine", component: "SMC & 5AM CRT Calculators", detail: "Deterministic Order Block, FVG, Liquidity Sweep, and Range boundary math" },
      { layer: "Integrity Guard", component: "Zero-Repainting Bar-Close Verifier", detail: "Prevents historical signal mutation and look-ahead bias" },
      { layer: "Visualization & Config", component: "Interactive Charting & Settings Center", detail: "Configurable alerts, overlays, and risk parameters at arcadefx.live" }
    ],
    caseStudy: {
      requirements: [
        "Automate detection of Institutional Smart Money Concepts (SMC) and 5AM Candle Range Theory (CRT)",
        "Guarantee 100% zero-repainting behavior so historical signals match live execution",
        "Provide an intuitive Settings Center for customizing session overlays and risk thresholds"
      ],
      technologyChoices: [
        "TradingView Pine Script for deterministic on-chart quantitative calculations",
        "JavaScript web platform for interactive charting configuration and user onboarding"
      ],
      security: [
        "Read-only analytical signal generation with no broker credential exposure"
      ],
      performance: [
        "Optimized loop bounds and array memory management for sub-second chart recalculation"
      ],
      observability: [
        "On-chart diagnostic tables displaying real-time session bias and range states"
      ],
      lessonsLearned: [
        "Strict bar-close state discipline is essential for quantitative credibility in financial engineering"
      ]
    },
    comparison: {
      frontend: true,
      backend: false,
      ai: false,
      postgresql: false,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: true
    }
  },
  {
    slug: "bm-forex-hub",
    title: "BM Forex Hub",
    shortDescription: "Enterprise-scale Email Notification & Bulk Broadcast Infrastructure.",
    category: "Backend Infrastructure / Communications",
    technologies: ["Node.js", "PHP", "Email APIs", "Queues"],
    capabilities: ["Bulk Broadcast", "Rate-limiting", "Async Workers"],
    description: "Production-grade, enterprise-scale Email Notification & Bulk Broadcast Infrastructure for BM Forex Hub. It handles real-time email communications, rate-limited OTP verification, multi-provider abstraction, and asynchronous queue workers.",
    architecture: ["Asynchronous Queue Workers", "Multi-provider Abstraction", "Rate-limiting Service"],
    features: ["Real-time Communications", "OTP Verification", "Campaign Scheduling", "Draft Management"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/BM-FOREX-HUB",
    liveUrl: "https://bmforexhub.exchange/",
    featured: false,
    classification: "client",
    status: "Production",
    filterCategories: ["All", "Business Systems", "FinTech"],
    problem: "High-volume transactional OTP emails and bulk community broadcasts fail or trigger provider throttling when sent synchronously from web request threads.",
    clientSummary: "Enterprise-grade transactional email, OTP verification, and asynchronous bulk broadcast infrastructure powering BM Forex Hub.",
    clientOutcomes: [
      "Decoupled high-priority OTP verification emails from bulk marketing broadcasts",
      "Multi-provider SMTP/API abstraction with automatic failover and rate-limiting",
      "Live production deployment supporting bmforexhub.exchange"
    ],
    engineeringChallenges: [
      "Preventing bulk broadcast campaigns from delaying time-sensitive OTP verification codes",
      "Enforcing provider rate limits and retry backoff across thousands of recipients",
      "Ensuring idempotent delivery so retries never send duplicate emails to the same user"
    ],
    solutions: [
      "Engineered priority-segregated asynchronous queue workers separating OTP traffic from bulk campaigns",
      "Built a multi-provider email abstraction layer with token-bucket rate limiting",
      "Added campaign state tracking, draft management, and per-recipient delivery audit logs"
    ],
    deployment: "Production backend infrastructure deployed at bmforexhub.exchange.",
    integrations: ["Multi-Provider Email APIs", "SMTP Relays", "Asynchronous Job Queues"],
    results: [
      "Reliable real-time OTP delivery alongside scheduled bulk broadcast campaigns at bmforexhub.exchange"
    ],
    timeline: "August – September 2026",
    createdAt: "2026-08-26",
    updatedAt: "2026-09-27",
    architectureDiagram: [
      { layer: "API Gateway", component: "Broadcast & OTP Ingestion Endpoints", detail: "Request validation, rate limiting, and payload sanitization" },
      { layer: "Queue Layer", component: "Priority-Segregated Job Queues", detail: "High-priority OTP lane vs. throttled bulk campaign worker lane" },
      { layer: "Worker Engine", component: "Asynchronous Dispatch Workers", detail: "Exponential backoff, retry management, and idempotency checks" },
      { layer: "Provider Abstraction", component: "Multi-Provider Email Router", detail: "Unified delivery interface across transactional email providers" }
    ],
    caseStudy: {
      requirements: [
        "Deliver time-critical OTP verification emails with minimal latency",
        "Support scheduled bulk email broadcasts with draft management and delivery tracking",
        "Protect sender reputation through strict rate-limiting and retry controls"
      ],
      technologyChoices: [
        "Node.js & PHP backend services for queue orchestration and web portal integration",
        "Asynchronous worker queues for non-blocking background dispatch"
      ],
      security: [
        "Rate-limited OTP generation and verification endpoints mitigating brute-force abuse",
        "Server-side credential isolation for all email provider API keys"
      ],
      performance: [
        "Non-blocking request handling via background queue offloading",
        "Controlled concurrency and batching for bulk broadcast throughput"
      ],
      observability: [
        "Per-campaign delivery status tracking, bounce/error logging, and queue depth monitoring"
      ],
      lessonsLearned: [
        "Isolating transactional authentication queues from bulk broadcast queues is mandatory for predictable OTP SLA"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: false,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: true
    }
  },
  {
    slug: "leavoyage-resort",
    title: "Le Voyage Resort",
    shortDescription: "A modern, high-conversion luxury resort and hospitality web application.",
    category: "Hospitality / Full-Stack Web App",
    technologies: ["React", "TypeScript", "Serverless", "Tailwind CSS"],
    capabilities: ["Booking Management", "Real-time Availability", "Interactive Showcase"],
    description: "Le Voyage Resort is designed to deliver a seamless booking experience for guests and comprehensive booking management for resort operators. Built with high performance, elegant UI transitions, and robust serverless architecture.",
    architecture: ["Serverless Architecture", "Real-time Synchronization", "Component-driven UI"],
    features: ["Interactive Room Showcase", "Real-time Room Availability", "Dynamic Pricing", "Direct Booking Processing"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/Leavoyage-Resort",
    liveUrl: "https://leavoyage-resort.vercel.app/",
    featured: false,
    classification: "client",
    status: "Client Delivery",
    filterCategories: ["All", "Full-Stack", "Web Applications"],
    problem: "Regional hospitality properties lose direct bookings to third-party aggregators when their digital presence lacks mobile-friendly room exploration and direct reservation flows.",
    clientSummary: "A tailored luxury hospitality web application for Le Voyage Resort in Kitale, featuring interactive accommodation showcases and direct guest booking workflows.",
    clientOutcomes: [
      "Direct online room exploration and reservation inquiries without third-party commission fees",
      "High-conversion mobile and desktop hospitality experience",
      "Live deployment at leavoyage-resort.vercel.app"
    ],
    engineeringChallenges: [
      "Delivering rich visual photography and smooth transitions while maintaining fast mobile load times",
      "Structuring multi-step booking and availability inquiries cleanly across devices"
    ],
    solutions: [
      "Built a component-driven React + TypeScript architecture with optimized image loading",
      "Implemented serverless reservation and inquiry routing with validation"
    ],
    deployment: "Vercel Serverless Deployment at leavoyage-resort.vercel.app.",
    integrations: ["Serverless Booking Functions", "Direct Property Inquiry Channels"],
    results: [
      "Production resort platform live for Le Voyage Resort Kitale"
    ],
    timeline: "August – September 2026",
    createdAt: "2026-08-27",
    updatedAt: "2026-09-29",
    architectureDiagram: [
      { layer: "Guest Experience", component: "React + TypeScript Hospitality UI", detail: "Interactive room galleries, amenities showcase, and pricing views" },
      { layer: "Booking Workflow", component: "Reservation & Availability Engine", detail: "Date selection, guest capacity validation, and dynamic pricing calculation" },
      { layer: "Serverless Backend", component: "Vercel Serverless Endpoints", detail: "Direct booking processing and operator notification dispatch" }
    ],
    caseStudy: {
      requirements: [
        "Showcase luxury rooms, dining, and resort facilities for Le Voyage Resort Kitale",
        "Enable direct guest booking and inquiry submissions across mobile and desktop"
      ],
      technologyChoices: [
        "React & TypeScript for modular, maintainable hospitality UI components",
        "Tailwind CSS for custom responsive styling and smooth visual hierarchy",
        "Vercel Serverless architecture for zero-maintenance scaling"
      ],
      security: [
        "Client and server-side form validation on all reservation payloads"
      ],
      performance: [
        "Optimized visual assets and code-split route bundles"
      ],
      observability: [
        "Deployment and edge request monitoring on Vercel"
      ],
      lessonsLearned: [
        "Clear pricing transparency and mobile-first date selection directly reduce booking abandonment"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: false,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "pos-system",
    title: "KaringPOS",
    shortDescription: "Enterprise-grade Point of Sale (POS) and inventory management platform.",
    category: "Business Systems / POS",
    technologies: ["Web Technologies", "Hardware APIs", "Offline Sync"],
    capabilities: ["Multi-Terminal Checkout", "Offline Resilience", "Payment Integrations"],
    description: "KaringPOS is a custom-built, enterprise-grade Point of Sale (POS) and inventory management platform designed to handle multi-terminal retail operations, supermarkets, and service-based businesses.",
    architecture: ["Multi-Terminal Sync", "Background Data Syncing", "Hardware Integration"],
    features: ["USB/Bluetooth Barcode Support", "ESC/POS Thermal Printing", "Offline Resilience", "M-Pesa Express Integration"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/POS-SYSTEM",
    liveUrl: "https://karingpos.shop",
    featured: false,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Business Systems", "Web Applications"],
    problem: "Retailers and supermarkets in East Africa experience checkout stalls during internet outages and struggle to integrate web POS systems with barcode scanners, thermal printers, and M-Pesa payments.",
    clientSummary: "An offline-resilient, multi-terminal Point of Sale and inventory management system with native barcode scanning, ESC/POS thermal receipt printing, and M-Pesa Express checkout.",
    clientOutcomes: [
      "Uninterrupted retail checkout during internet connectivity drops via local offline resilience",
      "Direct hardware integration with USB/Bluetooth barcode scanners and ESC/POS thermal printers",
      "Automated M-Pesa Express (STK Push) payment reconciliation at karingpos.shop"
    ],
    engineeringChallenges: [
      "Preventing inventory stock drift when multiple checkout terminals operate offline and reconnect later",
      "Interfacing browser-based POS terminals directly with ESC/POS thermal printers and barcode peripherals",
      "Reconciling asynchronous M-Pesa STK Push callbacks with active cashier checkout sessions"
    ],
    solutions: [
      "Implemented local transaction queuing with deterministic background synchronization upon reconnection",
      "Built hardware peripheral adapters supporting high-speed barcode input streams and thermal print formatting",
      "Integrated real-time M-Pesa Express webhook reconciliation tied to terminal receipt generation"
    ],
    deployment: "Production cloud platform at karingpos.shop with offline-capable local terminal runtime.",
    integrations: ["M-Pesa Express (Daraja API)", "ESC/POS Thermal Printers", "USB/Bluetooth Barcode Scanners"],
    results: [
      "Live production retail POS system deployed at karingpos.shop",
      "Supports multi-terminal checkout, inventory auditing, and automated mobile money payments"
    ],
    timeline: "August – September 2026",
    createdAt: "2026-08-28",
    updatedAt: "2026-09-30",
    architectureDiagram: [
      { layer: "Cashier Terminal", component: "POS Checkout & Hardware Bridge", detail: "Barcode scanner listener, cart engine, and ESC/POS thermal receipt formatter" },
      { layer: "Offline Resilience", component: "Local Queue & Sync Engine", detail: "Persists sales locally during network drops and syncs idempotently on reconnect" },
      { layer: "Payment Gateway", component: "M-Pesa Express (STK Push) Service", detail: "Initiates mobile money prompts and reconciles payment callbacks" },
      { layer: "Central Inventory", component: "Multi-Terminal Inventory & Audit Core", detail: "Stock deduction, low-stock alerts, and shift reconciliation" }
    ],
    caseStudy: {
      requirements: [
        "Support high-speed cashier checkout with USB/Bluetooth barcode scanners and thermal printers",
        "Maintain checkout continuity during intermittent internet outages",
        "Integrate M-Pesa Express for instant mobile money payments"
      ],
      technologyChoices: [
        "Modern Web Technologies & Hardware APIs for cross-device terminal deployment without heavy desktop installers",
        "Offline-first local storage queues paired with background synchronization"
      ],
      security: [
        "Role-based cashier and manager permissions with shift audit trails",
        "Verified M-Pesa payment callback validation before receipt finalization"
      ],
      performance: [
        "Zero-latency local barcode lookup for instant item scanning at checkout",
        "Lightweight thermal print payload generation"
      ],
      observability: [
        "Terminal sync status indicators, shift sales summaries, and payment audit logs"
      ],
      lessonsLearned: [
        "Retail POS systems must treat network connectivity as optional during active customer checkout"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: false,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: true
    }
  },
  {
    slug: "varban-autoflex",
    title: "VarbanAutoFlex",
    shortDescription: "A specialized digital platform for car yard sales in Kenya.",
    category: "Automotive / E-Commerce",
    technologies: ["TypeScript", "Web Application", "Database"],
    capabilities: ["Vehicle Listings", "Search", "Sales Processing"],
    description: "VarbanAutoFlex provides a dedicated platform for car yard sales in Kenya, facilitating connections between sellers and buyers with an optimized vehicle discovery experience.",
    architecture: ["Frontend Application", "Database Integration"],
    features: ["Car Listings", "Marketplace Operations"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/VarbanAutoFlex",
    liveUrl: "https://varbanautoflex.com/",
    featured: false,
    classification: "client",
    status: "Client Delivery",
    filterCategories: ["All", "Web Applications", "Automotive"],
    problem: "Commercial car yards require a dedicated, branded digital storefront to showcase verified vehicle stock and capture buyer inquiries directly.",
    clientSummary: "A dedicated digital storefront and inventory showcase engineered for car yard sales in Kenya at varbanautoflex.com.",
    clientOutcomes: [
      "Branded production storefront at varbanautoflex.com showcasing live vehicle stock",
      "Streamlined buyer search, specification inspection, and sales inquiry workflows"
    ],
    engineeringChallenges: [
      "Structuring detailed vehicle specification sheets and multi-angle photo galleries for fast browsing",
      "Ensuring mobile responsiveness across diverse buyer devices"
    ],
    solutions: [
      "Built a TypeScript-driven vehicle catalog with structured filtering and responsive media presentation",
      "Integrated direct buyer-to-yard inquiry routing"
    ],
    deployment: "Production deployment at custom domain varbanautoflex.com.",
    integrations: ["Relational Inventory Database", "Direct Sales Inquiry Channels"],
    results: [
      "Live commercial automotive platform operating at varbanautoflex.com"
    ],
    timeline: "August – September 2026",
    createdAt: "2026-08-31",
    updatedAt: "2026-09-05",
    architectureDiagram: [
      { layer: "Storefront UI", component: "TypeScript Web Application", detail: "Responsive vehicle catalog, specification views, and search filters" },
      { layer: "Catalog Service", component: "Inventory & Inquiry Handler", detail: "Vehicle availability filtering and buyer lead capture" },
      { layer: "Data Layer", component: "Inventory Database", detail: "Structured storage for vehicle models, pricing, and media assets" }
    ],
    caseStudy: {
      requirements: [
        "Deliver a fast, trustworthy digital car yard storefront on a custom domain",
        "Support vehicle search, detailed specification views, and buyer inquiries"
      ],
      technologyChoices: [
        "TypeScript web application architecture for maintainable catalog logic",
        "Structured database integration for vehicle stock management"
      ],
      security: [
        "Validated inquiry submissions and protected inventory administration"
      ],
      performance: [
        "Responsive image delivery and fast catalog filtering"
      ],
      observability: [
        "Uptime and production domain health monitoring"
      ],
      lessonsLearned: [
        "High-clarity specification tables and fast image carousels are the primary conversion drivers for online car yards"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: false,
      realtime: false,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "alpha-coach",
    title: "Alpha Coach",
    shortDescription: "Automated MT5 trading journal and quantitative performance analytics operating system.",
    category: "Financial Engineering / Trading Analytics",
    technologies: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Tailwind CSS"],
    capabilities: ["Trade Reconstruction", "Performance Analytics", "Zero-Password MT5 Bridge", "Risk Management"],
    description: "Alpha Coach is an automated trading journal and quantitative performance operating system for MetaTrader 5 (MT5) traders. It connects to local MT5 terminals via a zero-password Python bridge, reconstructs multi-leg position lifecycles, and powers an executive dashboard, Strategy Lab, Session & Symbol Intelligence, Risk Guardian, and data-grounded AI Trading Coach.",
    architecture: ["Zero-Password Local Python MT5 Bridge", "Rotating Device Pairing Token Auth", "Position Lifecycle Reconstruction Engine", "Express & TypeScript Backend API", "PostgreSQL & SQLite Persistence Layer", "React PWA Analytics Dashboard"],
    features: ["Automatic MT5 Deal & Position Lifecycle Reconstruction", "Executive Equity Curve, Drawdown & Expectancy Analytics", "Strategy Lab & Confluence Matrix", "Session & Symbol Intelligence Heatmaps", "Risk Guardian & Trader DNA Profiling", "Data-Grounded AI Trading Coach & Voice Journal"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/Alpha-Coach",
    liveUrl: "https://alpha-coach-pi.vercel.app/",
    featured: true,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Full-Stack", "Web Applications", "AI / Intelligent Systems", "Business Systems", "FinTech"],
    problem: "MetaTrader 5 traders struggle to reconstruct multi-leg position lifecycles (scale-ins, partial closes, swaps, commissions) from raw terminal deal logs, while cloud journals often demand sensitive broker passwords.",
    clientSummary: "An automated MT5 trading journal and quantitative performance OS featuring a zero-password local Python bridge, multi-leg trade reconstruction, risk guardrails, and an empirical AI Trading Coach.",
    clientOutcomes: [
      "Zero-password security architecture: broker credentials never leave the trader's desktop terminal",
      "Automated reconstruction of complex MT5 deals into complete position lifecycles with exact R-multiples",
      "Executive PWA dashboard with Strategy Lab, Risk Guardian, Trader DNA, and grounded AI Coaching"
    ],
    engineeringChallenges: [
      "Synchronizing desktop MT5 deal and order histories to the cloud without ever requesting or storing broker passwords",
      "Reconstructing complex positions (entry deals, scale-ins, partial exits, SL/TP hits, commissions, and swaps) idempotently without duplicate ingestion",
      "Ensuring the AI Trading Coach remains strictly grounded in empirical trade history rather than generic advice"
    ],
    solutions: [
      "Engineered a local Python MT5 Bridge using official MetaTrader5 APIs authenticated via rotating Device Pairing Tokens (x-bridge-token) over TLS",
      "Built a deterministic Position Reconstruction & Analytics Math Engine calculating weighted average prices, net P/L, Sharpe/recovery factors, and session classifications",
      "Separated Objective MT5 Facts, Subjective Trader Reviews, and AI Inferences in the database schema with automated Jest and Python test suites"
    ],
    deployment: "Vercel Production PWA & Serverless API Bundle backed by PostgreSQL / Supabase and SQLite support.",
    integrations: ["MetaTrader 5 Python API", "Supabase / PostgreSQL", "Express & TypeScript API", "WebSockets", "Vite PWA"],
    results: [
      "Live production deployment at alpha-coach-pi.vercel.app with instant multi-asset demo dataset exploration",
      "Full automated Jest backend test suite and Python bridge verification suite"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-25",
    updatedAt: "2026-09-29",
    architectureDiagram: [
      { layer: "Desktop Terminal", component: "MT5 Terminal + Python Bridge", detail: "Read-only deal/order extraction via official MetaTrader5 Python API" },
      { layer: "Zero-Password Sync", component: "TLS Device Pairing Auth (x-bridge-token)", detail: "Idempotent incremental trade synchronization without broker passwords" },
      { layer: "Core Backend & Math", component: "Express + TypeScript Reconstruction Engine", detail: "Reconstructs scale-ins, partial closes, R-multiples, drawdown, and session tags" },
      { layer: "Data Persistence", component: "PostgreSQL / Supabase & SQLite", detail: "Stores objective MT5 deals, reconstructed positions, and subjective journal reviews" },
      { layer: "Analytics & AI OS", component: "React 18 PWA + Grounded AI Coach", detail: "Equity curves, Strategy Lab, Risk Guardian, Trader DNA, and Voice Journal" }
    ],
    caseStudy: {
      requirements: [
        "Import up to 3 months of historical MT5 data and track new trades incrementally without duplicate ingestion",
        "Never ask for, receive, or store the trader's MT5 or broker password",
        "Accurately reconstruct multi-leg position lifecycles and compute institutional performance metrics",
        "Provide Strategy Lab, Session & Symbol Intelligence, Risk Guardian, and a data-grounded AI Trading Coach"
      ],
      technologyChoices: [
        "Python + official MetaTrader5 API for local terminal bridge synchronization",
        "Node.js, Express, TypeScript, and Zod for validated backend API and math reconstruction engines",
        "PostgreSQL / Supabase and SQLite for relational trade and journal storage",
        "React 18, TypeScript, Tailwind CSS, Recharts, and Vite PWA for the desktop/mobile dashboard"
      ],
      security: [
        "Zero-password security model: read-only local terminal extraction authorized via rotating x-bridge-token headers",
        "Helmet security headers, rate limiting (express-rate-limit), JWT authentication, and Zod payload validation"
      ],
      performance: [
        "Idempotent batch deal ingestion and pre-computed position lifecycle aggregates",
        "Installable Progressive Web App (PWA) with fast client-side chart rendering"
      ],
      observability: [
        "Dedicated /health endpoint, bridge sync telemetry, and automated backend Jest + Python test suites"
      ],
      lessonsLearned: [
        "Separating raw immutable broker deals from derived position lifecycles allows recalculating analytics safely as math models evolve",
        "Distinguishing objective broker data from subjective trader tags prevents AI coaching hallucinations"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: true,
      postgresql: true,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: true
    }
  },
  {
    slug: "for-sale",
    title: "For Sale",
    shortDescription: "Configurable white-label resort, hotel, and hospitality web application for rapid client deployment.",
    category: "Hospitality / White-Label Web App",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Netlify Forms"],
    capabilities: ["White-Label Configuration", "Accommodation Showcase", "Interactive Dining Menus", "Booking Workflows"],
    description: "For Sale (RESORT & Accommodation) is a modern white-label hospitality web platform engineered for hotels, resorts, and accommodation providers. Driven by a single centralized configuration file, it enables rapid property rebranding while providing room and cottage showcases, interactive dining and bar menus with an order drawer, conference booking workflows, and one-tap WhatsApp enquiries.",
    architecture: ["Next.js 14 App Router", "Single-Config White-Label Branding System", "Component-Driven Hospitality UI", "Schema.org Hotel Structured Data & SSR Metadata", "Netlify Forms & WhatsApp Enquiry Integration"],
    features: ["Room & Cottage Showcase with Multi-Image Galleries", "Online Dining & Bar Menus with Interactive Order Drawer", "Accommodation, Conference & Event Request Forms", "Curated Packages, Facilities & Pricing Views", "Direct One-Tap WhatsApp Property Enquiries"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/For-Sale",
    liveUrl: "https://for-sale-three.vercel.app/",
    featured: false,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Full-Stack", "Web Applications", "Business Systems"],
    problem: "Hotels, resorts, and accommodation providers often need a full-featured digital booking, dining, and event showcase quickly without months of bespoke development from scratch.",
    clientSummary: "A turnkey white-label hospitality and resort web platform that can be rebranded for any hotel or resort client via a single centralized configuration file.",
    clientOutcomes: [
      "Single-config rebranding (src/config/resortInfo.ts) for instant client customization",
      "Complete guest journey covering cottages/rooms, interactive dining & bar menus, conferences, packages, and pricing",
      "Built-in Schema.org Hotel JSON-LD structured data, OpenGraph SEO, and one-tap WhatsApp booking integration"
    ],
    engineeringChallenges: [
      "Decoupling property-specific branding, contact details, and room catalogs from UI components so rebranding requires zero component rewrites",
      "Combining accommodation booking, conference event requests, and interactive dining/bar menu ordering in one cohesive UX"
    ],
    solutions: [
      "Architected a centralized TypeScript configuration layer (resortInfo.ts) driving all branding, metadata, and contact channels",
      "Built modular Next.js 14 App Router pages for Accommodation, Conferences, Dining Menu, Bar Menu, Facilities, Packages, and Gallery"
    ],
    deployment: "Vercel Production Deployment at for-sale-three.vercel.app with Netlify Forms compatibility.",
    integrations: ["WhatsApp Direct Enquiry API", "Netlify Forms", "Schema.org Hotel JSON-LD"],
    results: [
      "Live interactive white-label hospitality showcase deployed at for-sale-three.vercel.app"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-29",
    updatedAt: "2026-09-29",
    architectureDiagram: [
      { layer: "Configuration Core", component: "Single-Config Branding Engine (resortInfo.ts)", detail: "Centralized property identity, contact channels, SEO, and room data" },
      { layer: "Presentation Layer", component: "Next.js 14 App Router Pages", detail: "Accommodation, Dining & Bar Menus, Conferences, Packages, Pricing, and Gallery" },
      { layer: "Interactive State", component: "Booking Modals & Menu Order Drawer", detail: "Multi-slide room galleries, stay date pickers, and dining cart drawer" },
      { layer: "Lead & Booking Capture", component: "Netlify Forms + WhatsApp Router", detail: "Structured booking, conference, and one-tap WhatsApp property enquiries" }
    ],
    caseStudy: {
      requirements: [
        "Enable complete hotel/resort white-label rebranding from a single configuration source",
        "Provide dedicated modules for rooms/cottages, dining & bar menus, conferences, facilities, and packages",
        "Maximize search visibility with server-side metadata and Schema.org Hotel structured data"
      ],
      technologyChoices: [
        "Next.js 14 & React 18 for fast server-rendered hospitality pages and SEO metadata",
        "TypeScript for strongly typed property configuration and menu/room catalogs",
        "Tailwind CSS & Lucide Icons for responsive hospitality theming"
      ],
      security: [
        "Honeypot spam protection on booking, enquiry, and conference forms",
        "Sanitized WhatsApp and form payload encoding"
      ],
      performance: [
        "Preloaded hero imagery, responsive slide carousels, and lightweight route bundles"
      ],
      observability: [
        "Structured Schema.org JSON-LD validation and production availability checks"
      ],
      lessonsLearned: [
        "Centralizing all tenant/property metadata into a single typed config file turns a custom web app into a reusable productized asset"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: false,
      realtime: false,
      cloud: true,
      mobile: false,
      fintech: false
    }
  },
  {
    slug: "endless-chase",
    title: "Endless Chase",
    shortDescription: "Native 3D mobile pursuit game built for Android with Java 17, libGDX 3D, and OpenGL ES.",
    category: "Mobile Engineering / 3D Game Runtime",
    technologies: ["Java 17", "libGDX 3D", "OpenGL ES", "Android SDK", "Gradle"],
    capabilities: ["3D Rendering Pipeline", "Autonomous AI Pursuit", "Spatial Physics", "Zero-Allocation Memory Pooling"],
    description: "Endless Chase is a native 3D pursuit game engineered for Android using Java 17 and libGDX 3D. It features a modular 3-tier architecture separating Android lifecycle management, a code-driven OpenGL ES 3.0/2.0 rendering pipeline with procedural track generation, a multi-state AI pursuit controller, and zero-allocation object pooling for smooth mobile frame rates.",
    architecture: ["3-Tier Modular Architecture (Android Shell, Core 3D Runtime, Data Bridge)", "OpenGL ES 3.0/2.0 Rendering Pipeline with ModelBatch", "Multi-State AI Pursuit Controller", "Zero-Allocation ObjectPoolManager", "Pluggable Touch & Gesture Input Abstraction"],
    features: ["Procedural 3D Track Generation & Dynamic Lighting", "Adaptive AI Pursuit with Evasive Maneuver Recovery", "Third-Person Chase Camera with Look-Ahead Prediction", "Swipe, Drag & Dual-Zone Touch Controls", "Responsive Multi-Aspect-Ratio Scene2D UI"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/Android-Game",
    featured: false,
    classification: "open-source",
    status: "Native Release",
    filterCategories: ["All", "Mobile Apps"],
    problem: "Mobile 3D games frequently suffer from garbage-collection frame stutter, tightly coupled platform code, and rigid camera/input handling across diverse Android screen aspect ratios.",
    clientSummary: "A modular native 3D Android pursuit game engineered with Java 17, libGDX 3D, and OpenGL ES featuring procedural track generation, autonomous AI pursuit, and zero-allocation memory pooling.",
    clientOutcomes: [
      "Clean 3-tier separation between Android lifecycle shell, platform-agnostic 3D core runtime, and data persistence",
      "Smooth mobile frame pacing via zero-allocation render loops and object pooling (ObjectPoolManager)",
      "Adaptive Scene2D UI scaling across 16:9, 18:9, 19.5:9, and tablet aspect ratios"
    ],
    engineeringChallenges: [
      "Preventing JVM garbage collection pauses during 60fps 3D rendering and collision checks on mobile devices",
      "Designing an AI pursuit controller that dynamically modulates speed, lateral tracking, and obstacle recovery",
      "Maintaining smooth third-person camera tracking during high-speed lateral evasive maneuvers"
    ],
    solutions: [
      "Implemented an ObjectPoolManager and reusable vector/matrix math structures for zero-allocation game loops",
      "Built a multi-state AI pursuit engine with catch-up modulation and evasive maneuver recovery",
      "Engineered a lerped third-person chase camera with look-ahead prediction and rotation damping"
    ],
    deployment: "Multi-module Gradle build producing native Android APK packages with automated unit test suites.",
    integrations: ["OpenGL ES 3.0/2.0", "libGDX 3D & Scene2D", "Android Lifecycle & SharedPreferences Bridge"],
    results: [
      "Complete multi-module Android Studio & Gradle codebase with unit test coverage (./gradlew test)"
    ],
    timeline: "September 2026",
    createdAt: "2026-09-21",
    updatedAt: "2026-09-25",
    architectureDiagram: [
      { layer: "Platform Shell", component: "Android Module (Launcher & Lifecycle)", detail: "Immersive landscape window management, audio lifecycle, and persistence bridge" },
      { layer: "Core 3D Runtime", component: "OpenGL ES 3.0/2.0 + ModelBatch", detail: "PerspectiveCamera, directional lighting, environmental fog, and procedural tracks" },
      { layer: "Simulation & AI", component: "Spatial Physics & Chase AI Engine", detail: "Collision detection, multi-state AI pursuit, and ObjectPoolManager" },
      { layer: "Input & UI", component: "Pluggable Input + Scene2D UI", detail: "Swipe, drag, dual-zone touch, desktop fallback, and multi-aspect HUD" }
    ],
    caseStudy: {
      requirements: [
        "Architect a modular native 3D Android game separating platform lifecycle from core 3D simulation",
        "Maintain stutter-free frame pacing through zero-allocation memory management",
        "Support multiple touch steering paradigms and aspect ratios"
      ],
      technologyChoices: [
        "Java 17 & libGDX 3D for cross-module 3D rendering over OpenGL ES 3.0/2.0",
        "Scene2D for resolution-independent HUD and menu layouts",
        "Gradle multi-module architecture (:core, :android) for isolated unit testing"
      ],
      security: [
        "Local sandboxed persistence with no external network permissions required"
      ],
      performance: [
        "Zero-allocation game loop utilizing ObjectPoolManager and pre-allocated math vectors",
        "Procedural track segment recycling to bound GPU and heap memory usage"
      ],
      observability: [
        "Deterministic core simulation unit tests executable via ./gradlew test"
      ],
      lessonsLearned: [
        "Decoupling the core 3D simulation from Android Context enables fast headless unit testing on the JVM"
      ]
    },
    comparison: {
      frontend: true,
      backend: false,
      ai: true,
      postgresql: false,
      realtime: true,
      cloud: false,
      mobile: true,
      fintech: false
    }
  },
  {
    slug: "g-tech-isp-billing-system",
    title: "G-Tech ISP Billing System",
    shortDescription: "Multi-tenant ISP and WISP billing, subscriber CRM, MikroTik RouterOS orchestration, FreeRADIUS AAA, and M-Pesa payment automation platform.",
    category: "Telecom SaaS / ISP Billing & Network Operations",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "FreeRADIUS", "MikroTik RouterOS", "M-Pesa Daraja API", "WireGuard"],
    capabilities: ["ISP / WISP Management", "MikroTik RouterOS Orchestration", "FreeRADIUS AAA", "M-Pesa Payment Automation", "PPPoE & Hotspot Billing", "Real-Time NOC Monitoring"],
    description: "G-Tech ISP Billing System (G-Tech OS) is a multi-tenant SaaS platform engineered for Internet Service Providers (ISPs), Wireless ISPs (WISPs), hotspot operators, and fiber networks. It unifies subscriber CRM, PPPoE and dynamic hotspot captive portal billing, MikroTik RouterOS v6/v7 fleet orchestration over WireGuard tunnels, FreeRADIUS 3.x AAA session control, Safaricom Daraja M-Pesa payment automation, technician field work orders, and a real-time Network Operations Center (NOC).",
    architecture: ["Next.js 15 App Router & React 19 SaaS Control Plane", "Multi-Tenant PostgreSQL & Supabase Row-Level Security (RLS)", "FreeRADIUS 3.x SQL AAA Engine (radcheck, radreply, radacct & CoA)", "MikroTik RouterOS API/REST Provisioning & WireGuard Control Plane", "Safaricom Daraja M-Pesa STK Push & C2B Webhook Reconciliation Engine", "Role-Based Access Control (RBAC) & Double-Entry Billing Ledger"],
    features: ["PPPoE Subscriber CRM, Bandwidth Queues & Automated Suspension/Reconnection", "Dynamic Hotspot Captive Portal, Batch Voucher Generation & Self-Checkout", "Safaricom Daraja M-Pesa Express (STK Push) & C2B Paybill Automation", "MikroTik RouterOS Fleet Management & Script Provisioning", "Real-Time NOC Dashboard (Interface Traffic, CPU/RAM Telemetry & Alerts)", "Field Operations, Technician Work Orders & Customer Self-Care Portal"],
    repositoryUrl: "https://github.com/gackstonew-lgtm/G-Tech-ISP-Billing-System",
    liveUrl: "https://g-tech-isp-billing-system.vercel.app/",
    featured: true,
    classification: "production",
    status: "Production",
    filterCategories: ["All", "Full-Stack", "Web Applications", "Business Systems", "FinTech"],
    problem: "ISPs and WISPs in East Africa often rely on disconnected spreadsheets, manual WinBox router edits, and manual M-Pesa SMS verification, causing delayed subscriber reconnections, revenue leakage, and poor network visibility.",
    clientSummary: "A unified ISP billing and network operations SaaS platform integrating subscriber CRM, PPPoE and hotspot captive portals, MikroTik RouterOS provisioning, FreeRADIUS AAA, M-Pesa Daraja payment automation, and live NOC telemetry.",
    clientOutcomes: [
      "End-to-end automated subscriber renewal: M-Pesa STK Push and C2B Paybill callbacks automatically reconcile ledgers and unlock FreeRADIUS/MikroTik sessions",
      "Unified multi-tenant operations across Admin & NOC Dashboard, Subscribers CRM, MikroTik Fleet, Hotspot Vouchers, Field Technicians, Customer Self-Care Portal, and Captive Portal",
      "Multi-tenant PostgreSQL schema with 12 migration modules and Row-Level Security (RLS) isolating organization data"
    ],
    engineeringChallenges: [
      "Bridging asynchronous mobile money callbacks (M-Pesa STK Push and C2B Paybill) with deterministic FreeRADIUS AAA attribute updates and MikroTik session reactivation",
      "Securing edge MikroTik router management without exposing RouterOS API or WinBox ports directly to the public internet",
      "Enforcing strict multi-tenant data isolation and granular permissions across ISP owners, finance staff, network engineers, field technicians, and subscribers"
    ],
    solutions: [
      "Engineered a payment reconciliation pipeline (MpesaService and /api/v1/mpesa-callback) that validates Daraja callbacks, records ledger transactions, and updates FreeRADIUS radcheck/radreply bandwidth profiles",
      "Designed a zero-trust WireGuard tunnel topology paired with MikroTikService and automated RouterOS provisioning script generation",
      "Implemented PostgreSQL Row-Level Security (RLS) across 12 SQL migration modules alongside a fine-grained RBAC permission matrix (src/lib/auth/rbac.ts)"
    ],
    deployment: "Vercel Production Next.js App Router deployment (g-tech-isp-billing-system.vercel.app) backed by PostgreSQL / Supabase, FreeRADIUS 3.x SQL AAA, and WireGuard edge router tunnels.",
    integrations: ["MikroTik RouterOS v6/v7 API", "FreeRADIUS 3.x (rlm_sql & CoA)", "Safaricom Daraja M-Pesa API (STK Push, C2B, B2C)", "Supabase PostgreSQL & Auth", "WireGuard VPN"],
    results: [
      "Live production deployment at g-tech-isp-billing-system.vercel.app with interactive NOC, CRM, Billing, Router Fleet, Voucher, Captive Portal, and Self-Care modules",
      "Verified by automated billing, revenue reconciliation, and settings validation test suites (node --test)"
    ],
    timeline: "October 2026",
    createdAt: "2026-10-02",
    updatedAt: "2026-10-03",
    architectureDiagram: [
      { layer: "Client & Portal Layer", component: "Next.js 15 + React 19 Multi-Portal UI", detail: "Tenant Admin & NOC Dashboard, Customer Self-Care Portal, and Captive Hotspot Portal" },
      { layer: "SaaS Control Plane", component: "Next.js API v1 Routes & RBAC Services", detail: "CRM, Service Plans, Voucher Generator, M-Pesa Daraja Webhooks, and NOC Telemetry Services" },
      { layer: "Data & AAA Persistence", component: "PostgreSQL / Supabase (RLS) + FreeRADIUS SQL", detail: "Multi-tenant relational tables, billing ledgers, and FreeRADIUS radcheck/radreply/radacct mapping" },
      { layer: "Edge Network Plane", component: "MikroTik RouterOS Fleet + WireGuard Tunnel", detail: "RouterOS v6/v7 provisioning, PPPoE queues, hotspot captive portal, and RFC 3576 CoA session control" }
    ],
    caseStudy: {
      requirements: [
        "Unify PPPoE subscriber management, dynamic hotspot voucher billing, and customer self-care in a multi-tenant SaaS architecture",
        "Automate payment collection and instant service activation via Safaricom Daraja M-Pesa STK Push and C2B Paybill webhooks",
        "Orchestrate MikroTik RouterOS routers, FreeRADIUS AAA policies, technician work orders, and live NOC telemetry"
      ],
      technologyChoices: [
        "Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4 for the multi-portal web application and REST API v1 endpoints",
        "PostgreSQL / Supabase with Row-Level Security (RLS) for multi-tenant isolation, audit logging, and FreeRADIUS SQL integration",
        "FreeRADIUS 3.x Vendor-Specific Attributes (Mikrotik-Rate-Limit) and WireGuard encrypted management tunnels for edge router control"
      ],
      security: [
        "Zero-trust router management over encrypted WireGuard tunnels so RouterOS API ports remain unexposed to the public internet",
        "PostgreSQL Row-Level Security (RLS) policies, RBAC permission guards across 7 operational roles, and server-side M-Pesa callback verification"
      ],
      performance: [
        "Indexed PostgreSQL queries for subscriber lookups, voucher redemption, and RADIUS accounting aggregation",
        "Decoupled network control and telemetry polling preventing router I/O from blocking web API requests"
      ],
      observability: [
        "Real-time NOC monitoring for router CPU/memory load, interface RX/TX throughput, active PPPoE/Hotspot sessions, and immutable audit logs"
      ],
      lessonsLearned: [
        "Mapping service plan bandwidth limits directly to FreeRADIUS Vendor-Specific Attributes (VSAs) eliminates manual per-router queue configuration drift",
        "Idempotent mobile money webhook handling is critical to prevent duplicate ledger credits during payment gateway retries"
      ]
    },
    comparison: {
      frontend: true,
      backend: true,
      ai: false,
      postgresql: true,
      realtime: true,
      cloud: true,
      mobile: false,
      fintech: true
    }
  }
];

export const githubRepositoryInventory: GitHubRepositoryRecord[] = [
  {
    name: "G-Tech-ISP-Billing-System",
    fullName: "gackstonew-lgtm/G-Tech-ISP-Billing-System",
    htmlUrl: "https://github.com/gackstonew-lgtm/G-Tech-ISP-Billing-System",
    description: "Advanced ISP Business Management System",
    homepage: "https://g-tech-isp-billing-system.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-10-02T18:57:25Z",
    pushedAt: "2026-10-03T09:08:24Z",
    classification: "production",
    approved: true,
    portfolioSlug: "g-tech-isp-billing-system",
    auditNote: "Approved multi-tenant ISP/WISP billing, MikroTik RouterOS, FreeRADIUS AAA & M-Pesa SaaS platform."
  },
  {
    name: "WebHunt",
    fullName: "gackstonew-lgtm/WebHunt",
    htmlUrl: "https://github.com/gackstonew-lgtm/WebHunt",
    description: "Hunting for business needing websites",
    homepage: "https://web-hunt-delta.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-09-09T12:54:06Z",
    pushedAt: "2026-09-30T19:54:48Z",
    classification: "production",
    approved: true,
    portfolioSlug: "webhunt",
    auditNote: "Approved production B2B lead discovery platform."
  },
  {
    name: "POS-SYSTEM",
    fullName: "gackstonew-lgtm/POS-SYSTEM",
    htmlUrl: "https://github.com/gackstonew-lgtm/POS-SYSTEM",
    description: "karingpos.shop",
    homepage: "https://karingpos.shop",
    language: "HTML",
    createdAt: "2026-08-28T15:15:39Z",
    pushedAt: "2026-09-30T09:41:41Z",
    classification: "production",
    approved: true,
    portfolioSlug: "pos-system",
    auditNote: "Approved enterprise multi-terminal POS platform (KaringPOS)."
  },
  {
    name: "Alpha-Coach",
    fullName: "gackstonew-lgtm/Alpha-Coach",
    htmlUrl: "https://github.com/gackstonew-lgtm/Alpha-Coach",
    description: "automated trading platform and journal",
    homepage: "https://alpha-coach-pi.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-09-25T17:02:56Z",
    pushedAt: "2026-09-29T19:10:23Z",
    classification: "production",
    approved: true,
    portfolioSlug: "alpha-coach",
    auditNote: "Approved flagship automated MT5 trading journal & quantitative performance OS."
  },
  {
    name: "For-Sale",
    fullName: "gackstonew-lgtm/For-Sale",
    htmlUrl: "https://github.com/gackstonew-lgtm/For-Sale",
    description: "Resort Website",
    homepage: "https://for-sale-three.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-09-29T07:26:14Z",
    pushedAt: "2026-09-29T17:19:46Z",
    classification: "production",
    approved: true,
    portfolioSlug: "for-sale",
    auditNote: "Approved white-label resort & hospitality web platform."
  },
  {
    name: "Leavoyage-Resort",
    fullName: "gackstonew-lgtm/Leavoyage-Resort",
    htmlUrl: "https://github.com/gackstonew-lgtm/Leavoyage-Resort",
    description: "Le Voyage Resort Kitale",
    homepage: "https://leavoyage-resort.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-08-27T09:22:44Z",
    pushedAt: "2026-09-29T07:14:58Z",
    classification: "client",
    approved: true,
    portfolioSlug: "leavoyage-resort",
    auditNote: "Approved client hospitality web application for Le Voyage Resort Kitale."
  },
  {
    name: "BM-FOREX-HUB",
    fullName: "gackstonew-lgtm/BM-FOREX-HUB",
    htmlUrl: "https://github.com/gackstonew-lgtm/BM-FOREX-HUB",
    description: "BM FOREX HUB",
    homepage: "https://bmforexhub.exchange/",
    language: "PHP",
    createdAt: "2026-08-26T06:06:33Z",
    pushedAt: "2026-09-27T17:42:30Z",
    classification: "client",
    approved: true,
    portfolioSlug: "bm-forex-hub",
    auditNote: "Approved enterprise email notification & broadcast infrastructure."
  },
  {
    name: "Android-Game",
    fullName: "gackstonew-lgtm/Android-Game",
    htmlUrl: "https://github.com/gackstonew-lgtm/Android-Game",
    description: "Endless Chase",
    homepage: null,
    language: "Java",
    createdAt: "2026-09-21T19:22:45Z",
    pushedAt: "2026-09-25T07:08:11Z",
    classification: "open-source",
    approved: true,
    portfolioSlug: "endless-chase",
    auditNote: "Approved native 3D Android pursuit game engineered with Java 17 & libGDX 3D."
  },
  {
    name: "Gacks-AI",
    fullName: "gackstonew-lgtm/Gacks-AI",
    htmlUrl: "https://github.com/gackstonew-lgtm/Gacks-AI",
    description: "GACKS P.A. V2 Multimodal Agentic Personal AI Operator",
    homepage: "https://gacks-ai.vercel.app/",
    language: "TypeScript",
    createdAt: "2026-09-15T06:24:38Z",
    pushedAt: "2026-09-17T12:05:03Z",
    classification: "production",
    approved: true,
    portfolioSlug: "gacks-ai",
    auditNote: "Approved multimodal agentic AI operator platform."
  },
  {
    name: "WebHunt-Android",
    fullName: "gackstonew-lgtm/WebHunt-Android",
    htmlUrl: "https://github.com/gackstonew-lgtm/WebHunt-Android",
    description: "Native Android companion application for WebHunt",
    homepage: null,
    language: "Kotlin",
    createdAt: "2026-09-14T11:34:57Z",
    pushedAt: "2026-09-14T11:34:57Z",
    classification: "production",
    approved: true,
    portfolioSlug: "webhunt-android",
    auditNote: "Approved native Android mobile client for WebHunt."
  },
  {
    name: "YARDLY-Automotive",
    fullName: "gackstonew-lgtm/YARDLY-Automotive",
    htmlUrl: "https://github.com/gackstonew-lgtm/YARDLY-Automotive",
    description: "Car sales",
    homepage: "https://yardlyautomotive.vercel.app",
    language: "TypeScript",
    createdAt: "2026-09-09T09:49:10Z",
    pushedAt: "2026-09-09T09:51:41Z",
    classification: "production",
    approved: true,
    portfolioSlug: "yardly-automotive",
    auditNote: "Approved digital automotive marketplace with Supabase RLS."
  },
  {
    name: "VarbanAutoFlex",
    fullName: "gackstonew-lgtm/VarbanAutoFlex",
    htmlUrl: "https://github.com/gackstonew-lgtm/VarbanAutoFlex",
    description: "Car yard sales in Kenya",
    homepage: "https://varbanautoflex.com/",
    language: "TypeScript",
    createdAt: "2026-08-31T22:07:41Z",
    pushedAt: "2026-09-05T17:36:40Z",
    classification: "client",
    approved: true,
    portfolioSlug: "varban-autoflex",
    auditNote: "Approved commercial car yard platform in Kenya."
  },
  {
    name: "Arcade-Fx",
    fullName: "gackstonew-lgtm/Arcade-Fx",
    htmlUrl: "https://github.com/gackstonew-lgtm/Arcade-Fx",
    description: "In Partnership with Affiniti",
    homepage: "https://arcadefx.live/",
    language: "JavaScript",
    createdAt: "2026-08-26T05:48:39Z",
    pushedAt: "2026-08-27T09:04:27Z",
    classification: "production",
    approved: true,
    portfolioSlug: "arcade-fx",
    auditNote: "Approved quantitative trading analysis engine & charting workspace."
  },
  {
    name: "gackstone",
    fullName: "gackstonew-lgtm/gackstone",
    htmlUrl: "https://github.com/gackstonew-lgtm/gackstone",
    description: "Gackstone portfolio platform - Quantum Code Technologies, Next.js production portfolio",
    homepage: "https://gackstone.quantumcode.co.ke/",
    language: "TypeScript",
    createdAt: "2026-10-01T23:36:40Z",
    pushedAt: "2026-10-02T11:53:19Z",
    classification: "excluded",
    approved: false,
    auditNote: "Excluded from project cards because it is the active host portfolio platform repository itself."
  },
  {
    name: "GacksDev",
    fullName: "gackstonew-lgtm/GacksDev",
    htmlUrl: "https://github.com/gackstonew-lgtm/GacksDev",
    description: "(Quantum Code Technologies)",
    homepage: "https://gacksdev.vercel.app",
    language: "TypeScript",
    createdAt: "2026-09-19T15:02:11Z",
    pushedAt: "2026-09-19T18:53:29Z",
    classification: "excluded",
    approved: false,
    auditNote: "Excluded from project cards because it is the host portfolio platform repository itself."
  },
  {
    name: "Wifi-Bypass",
    fullName: "gackstonew-lgtm/Wifi-Bypass",
    htmlUrl: "https://github.com/gackstonew-lgtm/Wifi-Bypass",
    description: "bridge",
    homepage: null,
    language: "Kotlin",
    createdAt: "2026-09-22T09:25:00Z",
    pushedAt: "2026-09-23T20:53:57Z",
    classification: "experimental",
    approved: false,
    auditNote: "Held in experimental/unapproved state: local device SOCKS5 proxy tethering utility without commercial branding."
  }
];
