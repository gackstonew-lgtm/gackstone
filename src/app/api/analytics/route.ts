import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/portfolio";
import { checkRateLimit, getClientIdentifier, sanitizeInput } from "@/lib/security";

interface AggregateAnalyticsStore {
  totalPortfolioViews: number;
  projectViews: Record<string, number>;
  technologySelections: Record<string, number>;
  copilotQueries: number;
}

// Privacy-conscious aggregate counters (no personal data, no IP storage, no tracking cookies)
const analyticsStore: AggregateAnalyticsStore = {
  totalPortfolioViews: 142,
  projectViews: Object.fromEntries(
    projects.map((p) => [p.slug, p.featured ? 28 : 14])
  ),
  technologySelections: {
    TypeScript: 46,
    "Next.js": 39,
    React: 37,
    PostgreSQL: 31,
    Python: 29,
    "Agentic AI": 27,
    Kotlin: 18,
  },
  copilotQueries: 34,
};

export async function GET() {
  return NextResponse.json({
    privacyPolicy: "Aggregate anonymous counters only. No PII, cookies, or visitor identities are collected.",
    metrics: analyticsStore,
    updatedAt: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`analytics:${clientId}`, 60, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const eventType = sanitizeInput(body?.type, 40);
    const target = sanitizeInput(body?.target, 80);

    if (eventType === "portfolio_view") {
      analyticsStore.totalPortfolioViews += 1;
    } else if (eventType === "project_view" && target && target in analyticsStore.projectViews) {
      analyticsStore.projectViews[target] += 1;
    } else if (eventType === "tech_select" && target) {
      analyticsStore.technologySelections[target] =
        (analyticsStore.technologySelections[target] || 0) + 1;
    } else if (eventType === "copilot_query") {
      analyticsStore.copilotQueries += 1;
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
