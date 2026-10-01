import { NextRequest, NextResponse } from "next/server";
import { answerPortfolioQuery } from "@/lib/intelligence";
import { checkRateLimit, getClientIdentifier, sanitizeInput } from "@/lib/security";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`copilot:${clientId}`, 20, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit reached for Quantum Code Technologies AI Copilot. Please wait a moment before asking another question.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const query = sanitizeInput(body?.query, 350);

    const groundedResult = answerPortfolioQuery(query);

    return NextResponse.json({
      query,
      ...groundedResult,
      rateLimitRemaining: rate.remaining,
      timestamp: new Date().toISOString(),
    });
  } catch {
    const fallback = answerPortfolioQuery("");
    return NextResponse.json(
      {
        query: "",
        ...fallback,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
