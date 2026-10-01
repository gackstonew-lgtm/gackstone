"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

/**
 * Deterministic PRNG (Mulberry32) so the blue-noise jittered cell scatter and
 * per-dot independent motion parameters are reproducible across renders without
 * hydration mismatches.
 */
function createSeededRandom(seed: number) {
  let a = seed;
  return function next() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface AmbientGlowTransform {
  tx: number;
  ty: number;
  scale: number;
  opacity: number;
}

/**
 * Computes a continuous, non-repeating 3-layer drift (37s, 53s, 71s prime periods)
 * for the existing ambient blue glow using only compositor-friendly translate3d,
 * scale, and subtle opacity breathing.
 */
export function computeAmbientGlowTransform(
  simTimeSec: number,
  viewportW: number,
  viewportH: number,
  laggedPointerX: number = 0,
  laggedPointerY: number = 0,
  reducedMotion: boolean = false
): AmbientGlowTransform {
  if (reducedMotion) {
    return { tx: 0, ty: 0, scale: 1, opacity: 1 };
  }

  const w1 = TAU / 37;
  const w2 = TAU / 53;
  const w3 = TAU / 71;

  const isMobile = viewportW < 768;
  const t = simTimeSec * (isMobile ? 0.82 : 1.0);

  const waveX =
    Math.sin(t * w1) * 0.52 +
    Math.cos(t * w2 + 1.15) * 0.31 +
    Math.sin(t * w3 + 2.45) * 0.17;
  const waveY =
    Math.cos(t * w1 + 0.75) * 0.48 +
    Math.sin(t * w2 + 2.05) * 0.34 +
    Math.cos(t * w3 + 0.55) * 0.18;

  const centerBiasX = -viewportW * 0.22 * (0.5 - 0.5 * Math.cos(t * w3));
  const centerBiasY = viewportH * 0.16 * (0.5 - 0.5 * Math.cos(t * w2));

  const ampX = viewportW * (isMobile ? 0.2 : 0.26);
  const ampY = viewportH * (isMobile ? 0.18 : 0.22);

  const pointerOffsetX = laggedPointerX * viewportW * 0.022;
  const pointerOffsetY = laggedPointerY * viewportH * 0.022;

  const tx = centerBiasX + waveX * ampX + pointerOffsetX;
  const ty = centerBiasY + waveY * ampY + pointerOffsetY;

  const scale =
    1.02 +
    Math.sin(t * w2 + 0.4) * 0.065 +
    Math.cos(t * w3 + 1.8) * 0.04;

  const opacity = 0.94 + Math.sin(t * w3 + 0.9) * 0.06;

  return { tx, ty, scale, opacity };
}

export function getResponsiveNodeCount(width: number, cores: number = 4): number {
  let count = 56;
  if (width >= 1440) {
    count = 68;
  } else if (width >= 1024) {
    count = 54;
  } else if (width >= 768) {
    count = 38;
  } else {
    count = 24;
  }

  if (cores <= 2) {
    count = Math.max(16, Math.floor(count * 0.65));
  }
  return count;
}

export interface DotFieldConfig {
  cols: number;
  rows: number;
  totalDots: number;
  cellSpacingPx: number;
  minDotRadius: number;
  maxDotRadius: number;
}

/**
 * Scales dot count across device classes by widening cell spacing on smaller or
 * low-power devices (desktop > laptop > tablet > mobile) rather than shrinking dots.
 */
export function getResponsiveDotFieldConfig(
  width: number,
  height: number,
  cores: number = 4
): DotFieldConfig {
  let cellSpacingPx = 42;
  if (width >= 1440) {
    cellSpacingPx = 38;
  } else if (width >= 1024) {
    cellSpacingPx = 42;
  } else if (width >= 768) {
    cellSpacingPx = 48;
  } else {
    cellSpacingPx = 56;
  }

  if (cores <= 2) {
    cellSpacingPx = Math.round(cellSpacingPx * 1.25);
  }

  // Include 18% overscan on all 4 sides (1.36x total span) so edges never empty
  const overscanW = Math.max(320, width) * 1.36;
  const overscanH = Math.max(320, height) * 1.36;

  const cols = Math.max(10, Math.min(64, Math.round(overscanW / cellSpacingPx)));
  const rows = Math.max(10, Math.min(48, Math.round(overscanH / cellSpacingPx)));

  return {
    cols,
    rows,
    totalDots: cols * rows,
    cellSpacingPx,
    minDotRadius: 0.65,
    maxDotRadius: 2.1,
  };
}

export interface UniformDotFieldBuffers {
  count: number;
  cols: number;
  rows: number;
  /** Normalized rest positions across overscanned viewport [-1.18, 1.18] */
  normX: Float32Array;
  normY: Float32Array;
  /** Per-dot depth in [0, 1] (0 = farthest, 1 = nearest) for individual scroll parallax & size */
  depthZ: Float32Array;
  /** Per-dot spring-damped displacement & velocity in pixels */
  ox: Float32Array;
  oy: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  /** Per-dot base radius (small organic grain with occasional slightly larger dot) */
  baseRadius: Float32Array;
  /** Per-dot independent drift amplitude (pixels) */
  ampX: Float32Array;
  ampY: Float32Array;
  /** Two independent non-harmonic frequencies & phases per axis per dot */
  freqX1: Float32Array;
  freqX2: Float32Array;
  freqY1: Float32Array;
  freqY2: Float32Array;
  phaseX1: Float32Array;
  phaseX2: Float32Array;
  phaseY1: Float32Array;
  phaseY2: Float32Array;
  /** Per-dot spring stiffness and damping */
  springK: Float32Array;
  damp: Float32Array;
  /** Discrete opacity bucket (0 = far/subtle, 1 = mid, 2 = near/crisp) */
  alphaBucket: Uint8Array;
}

/**
 * Generates an even, blue-noise style jittered-cell distribution across the entire
 * overscanned viewport [-1.18, 1.18] with zero central cluster and completely
 * independent per-dot motion parameters.
 */
export function generateUniformDotField(
  width: number,
  height: number,
  cores: number = 4
): UniformDotFieldBuffers {
  const rand = createSeededRandom(20261003);
  const cfg = getResponsiveDotFieldConfig(width, height, cores);
  const { cols, rows, totalDots } = cfg;

  const normX = new Float32Array(totalDots);
  const normY = new Float32Array(totalDots);
  const depthZ = new Float32Array(totalDots);
  const ox = new Float32Array(totalDots);
  const oy = new Float32Array(totalDots);
  const vx = new Float32Array(totalDots);
  const vy = new Float32Array(totalDots);
  const baseRadius = new Float32Array(totalDots);
  const ampX = new Float32Array(totalDots);
  const ampY = new Float32Array(totalDots);
  const freqX1 = new Float32Array(totalDots);
  const freqX2 = new Float32Array(totalDots);
  const freqY1 = new Float32Array(totalDots);
  const freqY2 = new Float32Array(totalDots);
  const phaseX1 = new Float32Array(totalDots);
  const phaseX2 = new Float32Array(totalDots);
  const phaseY1 = new Float32Array(totalDots);
  const phaseY2 = new Float32Array(totalDots);
  const springK = new Float32Array(totalDots);
  const damp = new Float32Array(totalDots);
  const alphaBucket = new Uint8Array(totalDots);

  // Full span in normalized coordinates is [-1.18, +1.18] (total width = 2.36)
  const spanMin = -1.18;
  const spanTotal = 2.36;
  const stepX = spanTotal / cols;
  const stepY = spanTotal / rows;
  const minSepX = stepX * 0.34;
  const minSepY = stepY * 0.34;

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    const cellCenterY = spanMin + (r + 0.5) * stepY;
    for (let c = 0; c < cols; c++) {
      const cellCenterX = spanMin + (c + 0.5) * stepX;

      // Stratified blue-noise jitter within cell (avoids both grid lines and pure-random clumps)
      let nx = cellCenterX + (rand() - 0.5) * stepX * 0.84;
      let ny = cellCenterY + (rand() - 0.5) * stepY * 0.84;

      // Blue-noise minimum-distance relaxation against left and top neighbors
      if (c > 0) {
        const leftIdx = idx - 1;
        const dx = nx - normX[leftIdx];
        const dy = ny - normY[leftIdx];
        if (Math.abs(dx) < minSepX && Math.abs(dy) < minSepY) {
          nx += (minSepX - Math.abs(dx)) * 0.55;
        }
      }
      if (r > 0) {
        const topIdx = idx - cols;
        const dx = nx - normX[topIdx];
        const dy = ny - normY[topIdx];
        if (Math.abs(dx) < minSepX && Math.abs(dy) < minSepY) {
          ny += (minSepY - Math.abs(dy)) * 0.55;
        }
      }

      normX[idx] = nx;
      normY[idx] = ny;

      // Per-dot independent depth [0, 1]
      const z = rand();
      depthZ[idx] = z;

      // Random organic dot size (mostly fine 0.65–1.35px grain, ~11% slightly larger 1.45–2.05px dots)
      const sizeRoll = rand();
      const rawRadius =
        sizeRoll < 0.89
          ? 0.65 + rand() * 0.7
          : 1.45 + rand() * 0.6;
      // Nearer dots are slightly larger
      baseRadius[idx] = rawRadius * (0.82 + 0.28 * z);

      // Nearer dots are slightly more opaque (bucket 0, 1, or 2)
      const opacityScore = z * 0.65 + rand() * 0.35;
      alphaBucket[idx] = opacityScore > 0.68 ? 2 : opacityScore > 0.34 ? 1 : 0;

      // Completely independent per-dot drift amplitudes, frequencies, and phases
      ampX[idx] = (6.5 + rand() * 14.5) * (0.75 + 0.4 * z);
      ampY[idx] = (6.5 + rand() * 14.5) * (0.75 + 0.4 * z);

      freqX1[idx] = 0.18 + rand() * 0.44;
      freqX2[idx] = 0.47 + rand() * 0.58;
      freqY1[idx] = 0.16 + rand() * 0.42;
      freqY2[idx] = 0.43 + rand() * 0.56;

      phaseX1[idx] = rand() * TAU;
      phaseX2[idx] = rand() * TAU;
      phaseY1[idx] = rand() * TAU;
      phaseY2[idx] = rand() * TAU;

      springK[idx] = 5.8 + rand() * 3.4;
      damp[idx] = 3.3 + rand() * 1.3;

      idx++;
    }
  }

  return {
    count: totalDots,
    cols,
    rows,
    normX,
    normY,
    depthZ,
    ox,
    oy,
    vx,
    vy,
    baseRadius,
    ampX,
    ampY,
    freqX1,
    freqX2,
    freqY1,
    freqY2,
    phaseX1,
    phaseX2,
    phaseY1,
    phaseY2,
    springK,
    damp,
    alphaBucket,
  };
}

// Alias preserved for backwards compatibility in tests
export const generateHalftoneDotField = generateUniformDotField;

export default function GlobalNetworkBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glowEl = glowRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isPageVisible = !document.hidden;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;

    let width = Math.max(1, container.clientWidth || window.innerWidth);
    let height = Math.max(1, container.clientHeight || window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);

    // Mutable pointer state (no React state updates per frame)
    const pointer = {
      normX: 0,
      normY: 0,
      smoothNormX: 0,
      smoothNormY: 0,
      velNormX: 0,
      velNormY: 0,
      screenX: width * 0.5,
      screenY: height * 0.5,
      smoothScreenX: width * 0.5,
      smoothScreenY: height * 0.5,
      presence: 0,
      targetPresence: 0,
      intensity: 1,
      lastMoveTime: 0,
    };

    let scrollOffset = window.scrollY || 0;
    let smoothScrollOffset = scrollOffset;

    // Adaptive frame-rate guard: thins farthest bucket slightly if frame rate drops
    let avgFrameMs = 16.6;
    let farBucketStride = 1;

    const getCores = () =>
      typeof navigator !== "undefined" && navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : 4;

    let field = generateUniformDotField(width, height, getCores());
    let lastDeviceClass = width >= 1440 ? 3 : width >= 1024 ? 2 : width >= 768 ? 1 : 0;

    const syncCanvasDimensions = (allowRebuildOnBreakpoint: boolean) => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width || window.innerWidth));
      height = Math.max(1, Math.round(rect.height || window.innerHeight));
      dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);

      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const currentDeviceClass =
        width >= 1440 ? 3 : width >= 1024 ? 2 : width >= 768 ? 1 : 0;
      if (allowRebuildOnBreakpoint && currentDeviceClass !== lastDeviceClass) {
        lastDeviceClass = currentDeviceClass;
        field = generateUniformDotField(width, height, getCores());
      }
    };

    syncCanvasDimensions(false);

    // 3 discrete solid charcoal/black opacity buckets (Zero gradients, nearer dots slightly more opaque)
    const BUCKET_STYLES = [
      "rgba(22, 22, 26, 0.17)",
      "rgba(18, 18, 22, 0.25)",
      "rgba(14, 14, 18, 0.34)",
    ] as const;

    let simTime = 0;
    let lastFrameTime = performance.now();

    const renderFrame = (now: number) => {
      const rawDtMs = now - lastFrameTime;
      lastFrameTime = now;

      // Clamp delta time to [1ms, 50ms] to avoid jumps after tab switches
      const dt = prefersReducedMotion
        ? 0
        : Math.min(0.05, Math.max(0.001, rawDtMs * 0.001));
      simTime += dt;

      if (rawDtMs > 0 && rawDtMs < 120) {
        avgFrameMs = avgFrameMs * 0.92 + rawDtMs * 0.08;
        farBucketStride = avgFrameMs > 28 ? 2 : 1;
      }

      ctx.clearRect(0, 0, width, height);

      // Idle decay: ease pointer influence back to 0 when cursor is inactive for >2.2s
      if (pointer.targetPresence > 0 && now - pointer.lastMoveTime > 2200) {
        pointer.targetPresence = 0;
      }

      const lerpRate = Math.min(1, dt * 5.5 || 0.08);
      pointer.presence += (pointer.targetPresence - pointer.presence) * lerpRate;

      const effectiveTargetNormX = pointer.normX * pointer.presence;
      const effectiveTargetNormY = pointer.normY * pointer.presence;

      // Smooth pointer coordinates for ambient glow & per-dot cursor interaction
      const springKPtr = 18;
      const dampingPtr = 5.2;
      const ax =
        (effectiveTargetNormX - pointer.smoothNormX) * springKPtr -
        pointer.velNormX * dampingPtr;
      const ay =
        (effectiveTargetNormY - pointer.smoothNormY) * springKPtr -
        pointer.velNormY * dampingPtr;

      pointer.velNormX += ax * dt;
      pointer.velNormY += ay * dt;
      pointer.smoothNormX += pointer.velNormX * dt;
      pointer.smoothNormY += pointer.velNormY * dt;

      pointer.smoothScreenX +=
        (pointer.screenX - pointer.smoothScreenX) * Math.min(1, dt * 8 || 0.12);
      pointer.smoothScreenY +=
        (pointer.screenY - pointer.smoothScreenY) * Math.min(1, dt * 8 || 0.12);

      smoothScrollOffset +=
        (scrollOffset - smoothScrollOffset) * Math.min(1, dt * 6 || 0.1);

      // Update the single root-level ambient blue glow behind the dot field
      if (glowEl) {
        const glowState = computeAmbientGlowTransform(
          simTime,
          width,
          height,
          pointer.smoothNormX * pointer.intensity,
          pointer.smoothNormY * pointer.intensity,
          prefersReducedMotion
        );
        glowEl.style.transform = `translate3d(${glowState.tx.toFixed(
          2
        )}px, ${glowState.ty.toFixed(2)}px, 0) scale(${glowState.scale.toFixed(4)})`;
        glowEl.style.opacity = glowState.opacity.toFixed(3);
      }

      // Fixed viewport center (Zero whole-field group sway, rotation, or rigid camera tilt)
      const originX = width * 0.5;
      const originY = height * 0.5;
      const halfW = width * 0.5;
      const halfH = height * 0.5;

      // Full overscanned vertical span for seamless per-dot depth scroll wrapping
      const totalSpanH = height * 1.18 * 2;
      const halfSpanH = height * 1.18;

      // Per-dot cursor interaction parameters
      const influenceRadius = width < 768 ? 135 : 195;
      const influenceRadiusSq = influenceRadius * influenceRadius;
      const innerRepelRadius = 26;
      const pointerActive = !prefersReducedMotion && pointer.presence > 0.01;
      const ptrX = pointer.smoothScreenX;
      const ptrY = pointer.smoothScreenY;
      const ptrBaseStrength = 20 * pointer.presence * pointer.intensity;

      const mobileAmpScale = width < 768 ? 0.72 : 1.0;
      const dotRadiusScale = width < 768 ? 0.92 : 1.0;

      const {
        count,
        normX,
        normY,
        depthZ,
        ox,
        oy,
        vx,
        vy,
        baseRadius,
        ampX,
        ampY,
        freqX1,
        freqX2,
        freqY1,
        freqY2,
        phaseX1,
        phaseX2,
        phaseY1,
        phaseY2,
        springK,
        damp,
        alphaBucket,
      } = field;

      // Batched Canvas 2D path rendering across 3 discrete opacity buckets
      for (let bucket = 0; bucket < 3; bucket++) {
        ctx.beginPath();
        ctx.fillStyle = BUCKET_STYLES[bucket];

        for (let i = 0; i < count; i++) {
          if (alphaBucket[i] !== bucket) continue;
          if (bucket === 0 && farBucketStride > 1 && (i & 1) === 1) continue;

          const z = depthZ[i];
          // Per-dot depth-based scroll parallax (nearer dots shift more than farther ones)
          const dotScrollShift = smoothScrollOffset * (0.04 + 0.14 * z);

          const rawRestX = originX + normX[i] * halfW;
          const rawRestY = originY + normY[i] * halfH - dotScrollShift;

          // Wrap vertical rest position seamlessly inside the overscanned bounds [-1.18*halfH, +1.18*halfH]
          const relY =
            ((((rawRestY - originY + halfSpanH) % totalSpanH) + totalSpanH) %
              totalSpanH) -
            halfSpanH;
          const restX = rawRestX;
          const restY = originY + relY;

          // Update individual per-dot motion state (completely decorrelated from neighbors)
          if (!prefersReducedMotion && dt > 0) {
            const targetDriftX =
              (Math.sin(simTime * freqX1[i] + phaseX1[i]) * 0.62 +
                Math.cos(simTime * freqX2[i] + phaseX2[i]) * 0.38) *
              ampX[i] *
              mobileAmpScale;

            const targetDriftY =
              (Math.cos(simTime * freqY1[i] + phaseY1[i]) * 0.62 +
                Math.sin(simTime * freqY2[i] + phaseY2[i]) * 0.38) *
              ampY[i] *
              mobileAmpScale;

            let cursorForceX = 0;
            let cursorForceY = 0;

            if (pointerActive) {
              const curX = restX + ox[i];
              const curY = restY + oy[i];
              const dxPtr = ptrX - curX;
              const dyPtr = ptrY - curY;
              const distSq = dxPtr * dxPtr + dyPtr * dyPtr;

              if (distSq < influenceRadiusSq && distSq > 1) {
                const dist = Math.sqrt(distSq);
                const dirX = dxPtr / dist;
                const dirY = dyPtr / dist;

                if (dist < innerRepelRadius) {
                  // Lightly repel when very close so dots never stack on the cursor
                  const repel =
                    (1 - dist / innerRepelRadius) * 18 * pointer.presence;
                  cursorForceX = -dirX * repel;
                  cursorForceY = -dirY * repel;
                } else {
                  const falloff = 1 - dist / influenceRadius;
                  const smoothFalloff = falloff * falloff * (3 - 2 * falloff);
                  const attract =
                    smoothFalloff * ptrBaseStrength * (0.7 + 0.6 * z);
                  cursorForceX = dirX * attract;
                  cursorForceY = dirY * attract;
                }
              }
            }

            // Clamp per-dot displacement so the blue-noise distribution stays even without clumps
            const maxDisp = 24;
            const desiredOx = Math.max(
              -maxDisp,
              Math.min(maxDisp, targetDriftX + cursorForceX)
            );
            const desiredOy = Math.max(
              -maxDisp,
              Math.min(maxDisp, targetDriftY + cursorForceY)
            );

            const k = springK[i];
            const d = damp[i];

            const nvx = vx[i] + ((desiredOx - ox[i]) * k - vx[i] * d) * dt;
            const nvy = vy[i] + ((desiredOy - oy[i]) * k - vy[i] * d) * dt;

            vx[i] = nvx;
            vy[i] = nvy;
            ox[i] += nvx * dt;
            oy[i] += nvy * dt;
          }

          const px = restX + ox[i];
          const py = restY + oy[i];

          // Cull off-screen overscan dots before adding to canvas path
          if (px < -6 || px > width + 6 || py < -6 || py > height + 6) {
            continue;
          }

          const r = Math.max(0.5, baseRadius[i] * dotRadiusScale);

          ctx.moveTo(px + r, py);
          ctx.arc(px, py, r, 0, TAU);
        }

        ctx.fill();
      }

      if (!prefersReducedMotion && isPageVisible) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const startLoop = () => {
      window.cancelAnimationFrame(animationFrameId);
      lastFrameTime = performance.now();
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    startLoop();

    // Unified passive Pointer Events (mouse, pen, touch)
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      pointer.screenX = e.clientX;
      pointer.screenY = e.clientY;
      pointer.normX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      pointer.normY = (e.clientY / Math.max(1, height) - 0.5) * 2;
      pointer.intensity = e.pointerType === "touch" ? 0.55 : 1.0;
      pointer.targetPresence = 1;
      pointer.lastMoveTime = performance.now();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      pointer.screenX = e.clientX;
      pointer.screenY = e.clientY;
      pointer.normX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      pointer.normY = (e.clientY / Math.max(1, height) - 0.5) * 2;
      pointer.intensity = e.pointerType === "touch" ? 0.55 : 1.0;
      pointer.targetPresence = 1;
      pointer.lastMoveTime = performance.now();
    };

    const handlePointerLeave = () => {
      pointer.targetPresence = 0;
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY || 0;
      if (prefersReducedMotion && isPageVisible) {
        renderFrame(performance.now());
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !prefersReducedMotion) {
        lastFrameTime = performance.now();
        startLoop();
      } else {
        window.cancelAnimationFrame(animationFrameId);
      }
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        window.cancelAnimationFrame(animationFrameId);
        renderFrame(performance.now());
      } else if (isPageVisible) {
        startLoop();
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleViewportResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        syncCanvasDimensions(true);
        if (prefersReducedMotion && isPageVisible) {
          renderFrame(performance.now());
        }
      }, 60);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncCanvasDimensions(false);
        if (prefersReducedMotion && isPageVisible) {
          renderFrame(performance.now());
        }
      });
      resizeObserver.observe(container);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleViewportResize, { passive: true });
    window.addEventListener("orientationchange", handleViewportResize, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("orientationchange", handleViewportResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen min-h-[100dvh] z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      role="presentation"
    >
      {/* Layer 1A: Persistent Ambient Blue Glow (background color < blue glow < dot field < content) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-[14%] right-[8%] w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-accent/[0.07] blur-[64px] md:blur-[90px] pointer-events-none select-none will-change-transform"
      />
      {/* Layer 1B: Uniform Blue-Noise Dot Field Canvas */}
      <canvas ref={canvasRef} className="relative z-10 block w-full h-full" />
    </div>
  );
}
