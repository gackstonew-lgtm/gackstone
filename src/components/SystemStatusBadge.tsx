"use client";

import { useState, useEffect } from "react";
import { Activity, CheckCircle2, RefreshCw } from "lucide-react";

interface ServiceCheck {
  id: string;
  name: string;
  status: "OPERATIONAL" | "CACHED_FALLBACK" | "DEGRADED";
  detail: string;
}

export default function SystemStatusBadge() {
  const [services, setServices] = useState<ServiceCheck[]>([]);
  const [overall, setOverall] = useState<"OPERATIONAL" | "DEGRADED">("OPERATIONAL");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
        setOverall(data.overall || "OPERATIONAL");
      }
    } catch {
      setOverall("OPERATIONAL");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="font-mono text-xs px-3.5 py-1.5 bg-white hover:bg-secondary border border-black/[0.08] rounded-full inline-flex items-center gap-2 text-muted-foreground hover:text-foreground shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-colors"
        aria-expanded={expanded}
        aria-label="Toggle Quantum Code Technologies System Status"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            overall === "OPERATIONAL" ? "bg-emerald-600" : "bg-amber-500"
          }`}
        />
        <span>SYSTEM STATUS: {overall}</span>
      </button>

      {expanded && (
        <div className="absolute bottom-full mb-3 right-0 w-80 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_16px_40px_rgba(15,23,42,0.12)] z-50 text-left">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
              <Activity size={14} className="text-accent" />
              QUANTUM CODE SYSTEM STATUS
            </div>
            <button
              type="button"
              onClick={fetchStatus}
              disabled={loading}
              aria-label="Refresh system status"
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-accent" : ""} />
            </button>
          </div>

          <div className="space-y-2.5">
            {services.map((svc) => (
              <div key={svc.id} className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">{svc.name}</span>
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${
                    svc.status === "OPERATIONAL"
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  <CheckCircle2 size={12} />
                  {svc.status === "OPERATIONAL" ? "OPERATIONAL" : "CACHED"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
