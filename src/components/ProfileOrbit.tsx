import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

interface OrbitDot {
  /** Position on the ring in degrees (0 = top) */
  angle: number;
  /** Tailwind size classes */
  size: string;
  /** "accent" dots glow softly; "neutral" dots echo the canvas background dots */
  tone: "accent" | "neutral";
}

const INNER_ORBIT: OrbitDot[] = [
  { angle: 20, size: "w-1.5 h-1.5", tone: "accent" },
  { angle: 115, size: "w-1 h-1", tone: "neutral" },
  { angle: 200, size: "w-1 h-1", tone: "accent" },
  { angle: 285, size: "w-[3px] h-[3px]", tone: "neutral" },
];

const OUTER_ORBIT: OrbitDot[] = [
  { angle: 65, size: "w-1 h-1", tone: "neutral" },
  { angle: 175, size: "w-[3px] h-[3px]", tone: "accent" },
  { angle: 305, size: "w-1 h-1", tone: "neutral" },
];

const DOT_TONE: Record<OrbitDot["tone"], string> = {
  accent: "bg-accent/70 shadow-[0_0_8px_hsl(var(--accent)/0.5)]",
  neutral: "bg-foreground/35",
};

function OrbitRing({ dots, className }: { dots: OrbitDot[]; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none motion-reduce:animate-none ${className}`}
    >
      {dots.map((dot) => (
        <span
          key={dot.angle}
          className="absolute inset-0"
          style={{ transform: `rotate(${dot.angle}deg)` }}
        >
          <span
            className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot.size} ${DOT_TONE[dot.tone]}`}
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Circular profile photo with a calm particle orbit.
 *
 * - Float: reuses the existing `.profile-float` utility (6s ease-in-out, ±5px).
 * - Orbit: Tailwind's built-in `spin` keyframes (transform only, compositor-driven,
 *   no JS, no React state). Two slow counter-rotating rings.
 * - Reduced motion: `motion-reduce:animate-none` here, plus the global
 *   prefers-reduced-motion rule that already neutralises `.profile-float`.
 */
export default function ProfileOrbit() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mt-2 mb-1 profile-float">
      <OrbitRing
        dots={INNER_ORBIT}
        className="inset-[-10px] border border-accent/15 animate-[spin_30s_linear_infinite]"
      />
      <OrbitRing
        dots={OUTER_ORBIT}
        className="inset-[-18px] animate-[spin_46s_linear_infinite] [animation-direction:reverse]"
      />
      <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary border border-black/[0.08] shadow-sm">
        <Image
          src="/brand/gackstone-baraka-profile-circle.png"
          alt={siteConfig.profileImageAlt}
          width={640}
          height={640}
          priority
          sizes="(max-width: 639px) 96px, (max-width: 1023px) 112px, 128px"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>
  );
}
