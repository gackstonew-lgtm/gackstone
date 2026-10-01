import { NextRequest, NextResponse } from "next/server";
import { githubRepositoryInventory, GitHubRepositoryRecord } from "@/data/portfolio";
import { checkRateLimit, getClientIdentifier } from "@/lib/security";

interface CachedGitHubPayload {
  repositories: (GitHubRepositoryRecord & {
    stars?: number;
    forks?: number;
    topics?: string[];
    syncSource: "github-live-api" | "verified-local-cache";
  })[];
  syncedAt: string;
  source: "github-live-api" | "verified-local-cache";
}

let cachedData: CachedGitHubPayload | null = null;
let cacheExpiresAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`github:${clientId}`, 30, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Returning cached repository inventory.",
        repositories: githubRepositoryInventory.map((r) => ({
          ...r,
          stars: 0,
          forks: 0,
          topics: [],
          syncSource: "verified-local-cache" as const,
        })),
        syncedAt: new Date().toISOString(),
        source: "verified-local-cache",
      },
      { status: 429 }
    );
  }

  const now = Date.now();
  if (cachedData && now < cacheExpiresAt) {
    return NextResponse.json(cachedData, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "QuantumCodeTechnologies-Portfolio-Platform",
    };

    // Never expose GITHUB_TOKEN to client; only use server-side if configured
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim().length > 0) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN.trim()}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(
      "https://api.github.com/users/gackstonew-lgtm/repos?per_page=100&sort=updated",
      {
        headers,
        signal: controller.signal,
        next: { revalidate: 300 },
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const rawRepos = (await response.json()) as Array<{
      name: string;
      full_name: string;
      html_url: string;
      description: string | null;
      homepage: string | null;
      language: string | null;
      created_at: string;
      pushed_at: string;
      stargazers_count?: number;
      forks_count?: number;
      topics?: string[];
      fork?: boolean;
      archived?: boolean;
    }>;

    const merged = rawRepos.map((liveRepo) => {
      const known = githubRepositoryInventory.find(
        (item) => item.name.toLowerCase() === liveRepo.name.toLowerCase()
      );

      return {
        name: liveRepo.name,
        fullName: liveRepo.full_name,
        htmlUrl: liveRepo.html_url,
        description: liveRepo.description || known?.description || "Software engineering repository",
        homepage: known?.homepage ?? liveRepo.homepage ?? null,
        language: liveRepo.language || known?.language || "TypeScript",
        createdAt: liveRepo.created_at || known?.createdAt || new Date().toISOString(),
        pushedAt: liveRepo.pushed_at || known?.pushedAt || new Date().toISOString(),
        classification: known
          ? known.classification
          : liveRepo.archived
          ? ("archived" as const)
          : ("experimental" as const),
        // Never auto-publish arbitrary newly discovered repositories without human approval
        approved: known ? known.approved : false,
        portfolioSlug: known?.portfolioSlug,
        auditNote:
          known?.auditNote ||
          "Discovered via GitHub API sync — awaiting human classification & approval.",
        stars: liveRepo.stargazers_count ?? 0,
        forks: liveRepo.forks_count ?? 0,
        topics: liveRepo.topics ?? [],
        syncSource: "github-live-api" as const,
      };
    });

    cachedData = {
      repositories: merged,
      syncedAt: new Date().toISOString(),
      source: "github-live-api",
    };
    cacheExpiresAt = now + CACHE_TTL_MS;

    return NextResponse.json(cachedData);
  } catch {
    const fallback: CachedGitHubPayload = {
      repositories: githubRepositoryInventory.map((r) => ({
        ...r,
        stars: 0,
        forks: 0,
        topics: [],
        syncSource: "verified-local-cache" as const,
      })),
      syncedAt: new Date().toISOString(),
      source: "verified-local-cache",
    };
    cachedData = fallback;
    cacheExpiresAt = now + 60_000;
    return NextResponse.json(fallback);
  }
}
