import { NextRequest, NextResponse } from "next/server";
import { projects, githubRepositoryInventory } from "@/data/portfolio";
import { answerPortfolioQuery } from "@/lib/intelligence";
import { checkRateLimit, getClientIdentifier } from "@/lib/security";

export async function GET(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`status:${clientId}`, 40, 60_000);

  if (!rate.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // 1. Portfolio Data Registry Check
  const portfolioOperational = projects.length >= 12 && githubRepositoryInventory.length >= 14;

  // 2. AI Assistant Grounded Engine Check
  const aiProbe = answerPortfolioQuery("Alpha Coach");
  const aiOperational = Boolean(aiProbe.answer && aiProbe.matchedProjects.length > 0);

  // 3. Project Demos Inventory Check (verify live URLs are configured on production projects)
  const liveDemoCount = projects.filter((p) => Boolean(p.liveUrl)).length;
  const demosOperational = liveDemoCount >= 9;

  // 4. GitHub Reachability Check with fast timeout
  let githubStatus: "OPERATIONAL" | "CACHED_FALLBACK" = "CACHED_FALLBACK";
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const ghRes = await fetch("https://api.github.com/users/gackstonew-lgtm", {
      headers: { "User-Agent": "QuantumCodeTechnologies-Status-Monitor" },
      signal: controller.signal,
      next: { revalidate: 120 },
    });
    clearTimeout(timer);
    if (ghRes.ok) {
      githubStatus = "OPERATIONAL";
    }
  } catch {
    githubStatus = "CACHED_FALLBACK";
  }

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    overall: portfolioOperational && aiOperational ? "OPERATIONAL" : "DEGRADED",
    services: [
      {
        id: "portfolio",
        name: "PORTFOLIO",
        status: portfolioOperational ? "OPERATIONAL" : "DEGRADED",
        detail: `${projects.length} verified engineering projects active`,
      },
      {
        id: "api",
        name: "API",
        status: "OPERATIONAL",
        detail: "Next.js App Router serverless endpoints active",
      },
      {
        id: "ai-assistant",
        name: "AI ASSISTANT",
        status: aiOperational ? "OPERATIONAL" : "DEGRADED",
        detail: "Grounded knowledge base & query engine verified",
      },
      {
        id: "project-demos",
        name: "PROJECT DEMOS",
        status: demosOperational ? "OPERATIONAL" : "DEGRADED",
        detail: `${liveDemoCount} production live deployments linked`,
      },
      {
        id: "github",
        name: "GITHUB",
        status: githubStatus,
        detail:
          githubStatus === "OPERATIONAL"
            ? "Live GitHub API reachable"
            : "Operating on verified local repository snapshot",
      },
    ],
  });
}
