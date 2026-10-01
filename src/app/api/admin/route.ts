import { NextRequest, NextResponse } from "next/server";
import {
  githubRepositoryInventory,
  projects,
  ProjectClassification,
  GitHubRepositoryRecord,
} from "@/data/portfolio";
import {
  checkRateLimit,
  getClientIdentifier,
  sanitizeInput,
  verifyAdminAuthorization,
} from "@/lib/security";

// In-memory runtime governance state initialized from verified repository inventory
const runtimeGovernanceRegistry: GitHubRepositoryRecord[] = githubRepositoryInventory.map(
  (item) => ({ ...item })
);

const VALID_CLASSIFICATIONS: ProjectClassification[] = [
  "production",
  "client",
  "open-source",
  "experimental",
  "archived",
  "excluded",
];

export async function GET(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`admin:${clientId}`, 20, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const auth = verifyAdminAuthorization(req);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        authenticated: false,
        configured: auth.configured,
        message: auth.reason || "Unauthorized",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    inventory: runtimeGovernanceRegistry,
    publishedCount: runtimeGovernanceRegistry.filter((r) => r.approved).length,
    pendingOrExcludedCount: runtimeGovernanceRegistry.filter((r) => !r.approved).length,
    totalProjects: projects.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rate = checkRateLimit(`admin-write:${clientId}`, 15, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const auth = verifyAdminAuthorization(req);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        authenticated: false,
        configured: auth.configured,
        message: auth.reason || "Unauthorized",
      },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const repoName = sanitizeInput(body?.repoName, 80);
  const classification = sanitizeInput(body?.classification, 30) as ProjectClassification;
  const approved = Boolean(body?.approved);
  const auditNote = sanitizeInput(body?.auditNote, 240);

  const target = runtimeGovernanceRegistry.find(
    (r) => r.name.toLowerCase() === repoName.toLowerCase()
  );

  if (!target) {
    return NextResponse.json({ error: "Repository not found in registry" }, { status: 404 });
  }

  if (VALID_CLASSIFICATIONS.includes(classification)) {
    target.classification = classification;
  }
  target.approved = approved;
  if (auditNote) {
    target.auditNote = auditNote;
  }

  return NextResponse.json({
    ok: true,
    updated: target,
    inventory: runtimeGovernanceRegistry,
  });
}
