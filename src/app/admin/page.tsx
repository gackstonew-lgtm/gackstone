"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  ExternalLink,
  Code2,
  Activity,
} from "lucide-react";
import {
  githubRepositoryInventory,
  type GitHubRepositoryRecord,
  type ProjectClassification,
} from "@/data/portfolio";

export default function AdminCommandCenterPage() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<GitHubRepositoryRecord[]>(githubRepositoryInventory);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filterClass, setFilterClass] = useState<"all" | ProjectClassification>("all");

  const fetchAdminState = useCallback(async (adminToken: string) => {
    try {
      const res = await fetch("/api/admin", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        setAuthError(err.error || "Unauthorized access.");
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.repositories)) {
        setInventory(data.repositories);
      }
      setIsAuthenticated(true);
      setAuthError(null);
    } catch {
      setAuthError("Failed to connect to admin governance endpoint.");
    }
  }, []);

  useEffect(() => {
    fetchAdminState("dev-local-session");
  }, [fetchAdminState]);

  const handleSyncGitHub = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch("/api/github");
      const data = await res.json();
      if (Array.isArray(data.repositories)) {
        setInventory(data.repositories);
        setSyncStatus(
          `Synchronized ${data.repositories.length} repositories via ${data.source} (${new Date(
            data.syncedAt
          ).toLocaleTimeString()}).`
        );
      }
    } catch {
      setSyncStatus("GitHub sync fallback active (using verified repository snapshot).");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleApproval = async (
    repoName: string,
    currentApproved: boolean,
    classification: ProjectClassification
  ) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "dev-local-session"}`,
        },
        body: JSON.stringify({
          name: repoName,
          approved: !currentApproved,
          classification,
        }),
      });
      if (res.ok) {
        setInventory((prev) =>
          prev.map((item) =>
            item.name === repoName ? { ...item, approved: !currentApproved, classification } : item
          )
        );
      }
    } catch {
      // ignore error in UI preview
    }
  };

  const filteredInventory =
    filterClass === "all"
      ? inventory
      : inventory.filter((item) => item.classification === filterClass);

  return (
    <div className="py-32 bg-background/35 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl pill-badge text-accent text-xs font-mono uppercase tracking-wider mb-4">
              <Terminal size={14} /> Protected Engineering Governance
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Admin Command Center
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              GitHub repository discovery, classification governance, and human-in-the-loop publication approval (`GitHub → Discovery → Classification → Review → Approve → Publish`).
            </p>
          </div>

          <button
            onClick={handleSyncGitHub}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Synchronizing GitHub..." : "Sync Live GitHub Inventory"}
          </button>
        </div>

        {!isAuthenticated && (
          <div className="p-7 rounded-3xl glass-card mb-10 max-w-xl">
            <div className="flex items-center gap-2 text-amber-800 font-mono text-xs uppercase mb-2.5">
              <Lock size={14} /> Admin Authorization Required (`ADMIN_ACCESS_TOKEN`)
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your configured `ADMIN_ACCESS_TOKEN` to unlock repository approval mutations in production.
            </p>
            {authError && <p className="text-xs text-rose-600 font-mono mb-3">{authError}</p>}
            <div className="flex gap-3">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter ADMIN_ACCESS_TOKEN..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-black/[0.1] text-foreground text-sm font-mono"
              />
              <button
                onClick={() => fetchAdminState(token)}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold"
              >
                Authenticate
              </button>
            </div>
          </div>
        )}

        {syncStatus && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-8 flex items-center gap-2">
            <CheckCircle2 size={15} /> {syncStatus}
          </div>
        )}

        {/* Governance Pipeline Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="p-5 rounded-2xl surface-card">
            <div className="text-xs font-mono text-muted-foreground">AUDITED REPOS</div>
            <div className="text-3xl font-semibold text-foreground mt-1">{inventory.length}</div>
          </div>
          <div className="p-5 rounded-2xl surface-card">
            <div className="text-xs font-mono text-emerald-700">APPROVED PUBLIC</div>
            <div className="text-3xl font-semibold text-emerald-700 mt-1">
              {inventory.filter((r) => r.approved).length}
            </div>
          </div>
          <div className="p-5 rounded-2xl surface-card">
            <div className="text-xs font-mono text-accent">PRODUCTION / CLIENT</div>
            <div className="text-3xl font-semibold text-foreground mt-1">
              {inventory.filter((r) => r.classification === "production" || r.classification === "client").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl surface-card">
            <div className="text-xs font-mono text-muted-foreground">OPEN-SOURCE</div>
            <div className="text-3xl font-semibold text-foreground mt-1">
              {inventory.filter((r) => r.classification === "open-source").length}
            </div>
          </div>
          <div className="p-5 rounded-2xl surface-card">
            <div className="text-xs font-mono text-amber-700">EXCLUDED / EXPERIMENTAL</div>
            <div className="text-3xl font-semibold text-amber-700 mt-1">
              {inventory.filter((r) => !r.approved).length}
            </div>
          </div>
        </div>

        {/* Classification Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "production", "client", "open-source", "experimental", "excluded"] as const).map((cls) => (
            <button
              key={cls}
              onClick={() => setFilterClass(cls)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition-all border ${
                filterClass === cls
                  ? "bg-primary text-primary-foreground border-primary font-semibold"
                  : "bg-white border-black/[0.08] text-muted-foreground hover:text-foreground"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Repository Governance Table */}
        <div className="rounded-3xl surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.07] text-[11px] font-mono uppercase text-muted-foreground bg-secondary/50">
                  <th className="py-4 px-6">Repository</th>
                  <th className="py-4 px-6">Language</th>
                  <th className="py-4 px-6">Classification</th>
                  <th className="py-4 px-6">Public Status</th>
                  <th className="py-4 px-6">Audit Notes</th>
                  <th className="py-4 px-6 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-sm">
                {filteredInventory.map((repo) => (
                  <tr key={repo.name} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <Code2 size={15} className="text-accent" />
                        {repo.name}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs font-mono text-muted-foreground">
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent inline-flex items-center gap-1"
                        >
                          GitHub <ExternalLink size={11} />
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline inline-flex items-center gap-1"
                          >
                            Live Demo <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-foreground">{repo.language}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono uppercase bg-secondary border border-black/[0.06] text-accent">
                        {repo.classification}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {repo.approved ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldCheck size={13} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                          <Activity size={13} /> Withheld
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-muted-foreground max-w-md">
                      {repo.auditNote}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() =>
                          handleToggleApproval(repo.name, repo.approved, repo.classification)
                        }
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-secondary border border-black/[0.08] text-xs font-mono text-foreground transition-colors"
                      >
                        {repo.approved ? "Withhold" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
