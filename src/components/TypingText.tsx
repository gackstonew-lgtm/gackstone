"use client";

import React, { useEffect, useRef } from "react";

/**
 * Centralized Typing Animation Speed & Timing Constants
 * Target range: ~22 to 38 characters per second (moderate, calm pace),
 * 3.0–4.0s duration cap for longer paragraphs, and 150–250ms stagger step.
 */
export const TYPING_MIN_CPS = 22;
export const TYPING_MAX_CPS = 38;
export const TYPING_DEFAULT_CPS = 30;
export const TYPING_HEADING_CPS = 26;
export const TYPING_BODY_CPS = 34;
export const TYPING_DEFAULT_MAX_DURATION_MS = 3500;
export const TYPING_STAGGER_STEP_MS = 200;

export interface TypingMetrics {
  textLength: number;
  effectiveCps: number;
  baseCharMs: number;
  estimatedDurationMs: number;
}

/**
 * Pure helper to calculate moderate typing speed (22–38 chars/sec) and enforce
 * a 3–4s maximum duration cap (default 3500ms) so headings type at their natural
 * calm pace while long paragraphs accelerate only as needed to stay within the cap.
 */
export function computeTypingMetrics(
  text: string,
  baseCps: number = TYPING_DEFAULT_CPS,
  maxDurationMs: number = TYPING_DEFAULT_MAX_DURATION_MS
): TypingMetrics {
  const textLength = text.length;
  if (textLength === 0) {
    return {
      textLength: 0,
      effectiveCps: baseCps,
      baseCharMs: 0,
      estimatedDurationMs: 0,
    };
  }

  const clampedBaseCps = Math.max(
    TYPING_MIN_CPS,
    Math.min(TYPING_MAX_CPS, baseCps)
  );
  const rawDurationMs = (textLength / clampedBaseCps) * 1000;
  const estimatedDurationMs = Math.min(maxDurationMs, rawDurationMs);
  const effectiveCps =
    rawDurationMs > maxDurationMs
      ? (textLength * 1000) / maxDurationMs
      : clampedBaseCps;
  const baseCharMs = 1000 / effectiveCps;

  return {
    textLength,
    effectiveCps,
    baseCharMs,
    estimatedDurationMs,
  };
}

interface TypingTextProps {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  /** Characters per second (default: TYPING_DEFAULT_CPS = 30, within 22–38 cps range) */
  cps?: number;
  /** Cap total typing time in ms (default: TYPING_DEFAULT_MAX_DURATION_MS = 3500ms) */
  maxDurationMs?: number;
  /** Stagger delay in ms before typing starts once in viewport (default: 0ms) */
  delayMs?: number;
  /** Show a thin solid caret while actively typing (default: true) */
  showCaret?: boolean;
}

export default function TypingText({
  text,
  as: Component = "span",
  className = "",
  cps = TYPING_DEFAULT_CPS,
  maxDurationMs = TYPING_DEFAULT_MAX_DURATION_MS,
  delayMs = 0,
  showCaret = true,
}: TypingTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const fullTextRef = useRef<HTMLSpanElement | null>(null);
  const overlayRef = useRef<HTMLSpanElement | null>(null);
  const typedSpanRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  // Ensure typing triggers only once per component instance per page view
  const hasTypedRef = useRef<boolean>(false);
  const lastTextRef = useRef<string>(text);

  useEffect(() => {
    const rootEl = rootRef.current;
    const fullEl = fullTextRef.current;
    const overlayEl = overlayRef.current;
    const typedEl = typedSpanRef.current;
    const caretEl = caretRef.current;

    if (!rootEl || !fullEl || !overlayEl || !typedEl) return;

    // If the text prop remains identical and already typed in this view, keep full text visible
    if (hasTypedRef.current && lastTextRef.current === text) {
      fullEl.style.opacity = "1";
      overlayEl.style.display = "none";
      return;
    }
    lastTextRef.current = text;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !text) {
      hasTypedRef.current = true;
      fullEl.style.opacity = "1";
      overlayEl.style.display = "none";
      return;
    }

    let rafId = 0;
    let delayTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let observer: IntersectionObserver | null = null;
    let isCancelled = false;

    const { baseCharMs, estimatedDurationMs } = computeTypingMetrics(
      text,
      cps,
      maxDurationMs
    );

    // Prepare layout-locked invisible sizer before typing begins
    fullEl.style.opacity = "0";
    overlayEl.style.display = "inline";
    typedEl.textContent = "";
    if (caretEl) {
      caretEl.style.display = "none";
    }

    const startTypingAnimation = () => {
      if (isCancelled || hasTypedRef.current) return;
      hasTypedRef.current = true;

      if (caretEl && showCaret) {
        caretEl.style.display = "inline-block";
      }

      let charIndex = 0;
      let lastTime = performance.now();
      const startTime = lastTime;
      let timeAccumulator = 0;

      const getStepDelay = (idx: number): number => {
        const ch = text[idx] || "";
        // Subtle natural rhythm jitter (0.80x to 1.20x)
        const jitter = 0.8 + ((idx * 19 + 7) % 11) * 0.04;
        // Noticeable micro-pause on punctuation for natural human cadence
        const isPunctuation =
          text.length <= 120 &&
          (ch === "." ||
            ch === "," ||
            ch === ";" ||
            ch === ":" ||
            ch === "—" ||
            ch === "•" ||
            ch === "!" ||
            ch === "?");
        const punctMultiplier = isPunctuation ? 2.35 : 1.0;
        return baseCharMs * jitter * punctMultiplier;
      };

      const stepFrame = (now: number) => {
        if (isCancelled) return;

        const dt = Math.min(64, Math.max(0, now - lastTime));
        lastTime = now;
        timeAccumulator += dt;

        const totalElapsed = now - startTime;

        // Hard duration cap safety: complete cleanly if totalElapsed reaches cap + punctuation allowance
        if (totalElapsed >= Math.max(estimatedDurationMs * 1.2, maxDurationMs)) {
          charIndex = text.length;
        } else {
          while (charIndex < text.length) {
            const neededMs = getStepDelay(charIndex);
            if (timeAccumulator >= neededMs) {
              timeAccumulator -= neededMs;
              charIndex++;
            } else {
              break;
            }
          }
        }

        if (charIndex >= text.length) {
          // Typing finished: reveal full accessible DOM text and hide overlay + caret
          typedEl.textContent = text;
          fullEl.style.opacity = "1";
          overlayEl.style.display = "none";
          if (caretEl) {
            caretEl.style.display = "none";
          }
          return;
        }

        typedEl.textContent = text.slice(0, charIndex);
        rafId = window.requestAnimationFrame(stepFrame);
      };

      rafId = window.requestAnimationFrame(stepFrame);
    };

    const triggerWithDelay = () => {
      if (delayMs > 0) {
        delayTimeoutId = setTimeout(startTypingAnimation, delayMs);
      } else {
        startTypingAnimation();
      }
    };

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (observer) {
                observer.disconnect();
                observer = null;
              }
              triggerWithDelay();
              break;
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
      );
      observer.observe(rootEl);
    } else {
      triggerWithDelay();
    }

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(rafId);
      if (delayTimeoutId) clearTimeout(delayTimeoutId);
      if (observer) observer.disconnect();
      // Always restore full text visibility on cleanup so UI never gets stuck hidden
      fullEl.style.opacity = "1";
      overlayEl.style.display = "none";
    };
  }, [text, cps, maxDurationMs, delayMs, showCaret]);

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={rootRef as any}
      className={`inline-grid grid-cols-1 items-baseline ${className}`}
      aria-label={text}
    >
      {/* Full text stays in SSR HTML & DOM for SEO, screen readers, and zero-CLS layout sizing */}
      <span ref={fullTextRef} className="col-start-1 row-start-1">
        {text}
      </span>

      {/* Client-side ref-driven typing layer (aria-hidden so screen readers never read letter-by-letter) */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        style={{ display: "none" }}
        className="col-start-1 row-start-1 pointer-events-none select-none"
      >
        <span ref={typedSpanRef} />
        {showCaret && (
          <span
            ref={caretRef}
            style={{ display: "none" }}
            className="inline-block w-[2px] h-[0.88em] bg-accent align-baseline ml-[2px] translate-y-[0.08em]"
          />
        )}
      </span>
    </Component>
  );
}
