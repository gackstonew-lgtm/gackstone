import React from "react";
import TechIcon from "@/components/TechIcon";

interface TechPillProps {
  name: string;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md";
}

export default function TechPill({
  name,
  className = "",
  iconClassName = "",
  size = "md",
}: TechPillProps) {
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${
        isSm ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } font-medium rounded-full bg-white/95 border border-black/[0.08] text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:border-black/[0.15] shrink-0 ${className}`}
      title={name}
      aria-label={name}
    >
      <TechIcon name={name} className={`shrink-0 ${iconClassName}`} size={isSm ? 12 : 14} />
      <span className="truncate">{name}</span>
    </span>
  );
}
