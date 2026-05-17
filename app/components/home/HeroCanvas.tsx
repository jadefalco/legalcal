"use client";

import { useEffect, useRef } from "react";

// =============================================================================
// HERO CANVAS — Stripe Aurora-Style Premium Motion System
// =============================================================================
// Implements a 5-layer GPU-accelerated canvas animation per design.md Section 7.
// Layers: Base Gradient → Perlin Distortion → Gold Highlights → Blue Bloom → Noise
// =============================================================================

// ---------------------------------------------------------------------------
// 1. PERLIN NOISE (Classic 2D implementation)
// ---------------------------------------------------------------------------
// Used by Layer 2 to drive organic, non-repeating liquid motion paths.
// Seeded permutation table ensures deterministic but natural-looking drift.

class PerlinNoise {
  private perm: Uint8Array;

  constructor(seed = 12345) {
    // Build permutation table
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;

    // Seeded shuffle (Fisher-Yates with LCG)
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807 + 0) % 2147483647;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }

    // Duplicate for wrap-free lookup
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : -x;
    const v = h < 1 ? y : -y;
    return u + v;
  }

  /**
   * Sample 2D Perlin noise at (x, y).
   * Returns a value in the range [-1, 1].
   */
  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = this.fade(xf);
    const v = this.fade(yf);

    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;

    return this.lerp(
      v,
      this.lerp(
        u,
        this.grad(this.perm[A], xf, yf),
        this.grad(this.perm[B], xf - 1, yf)
      ),
      this.lerp(
        u,
        this.grad(this.perm[A + 1], xf, yf - 1),
        this.grad(this.perm[B + 1], xf - 1, yf - 1)
      )
    );
  }
}

// ---------------------------------------------------------------------------
// 2. EASING & INTERPOLATION UTILITIES
// ---------------------------------------------------------------------------

/** easeInOutSine — smooth acceleration and deceleration for all motion */
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/** Oscillate between -1 and 1 using a sine wave with ease-in-out character */
function oscillate(time: number, speed: number, phase: number): number {
  return Math.sin(time * speed + phase);
}

/** Convert hex color to rgba string with alpha */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------------------------------------------------------------------------
// 3. NOISE TEXTURE GENERATOR (Layer 5)
// ---------------------------------------------------------------------------
// Creates a tiling greyscale noise texture on an offscreen canvas.
// Drawn with "overlay" composite mode for subtle film-grain realism.

function createNoiseTexture(size = 256): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255;
    data[i] = v; // R
    data[i + 1] = v; // G
    data[i + 2] = v; // B
    data[i + 3] = 255; // A
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

// ---------------------------------------------------------------------------
// 4. LAYER CONFIGURATION
// ---------------------------------------------------------------------------
// Each layer is defined by a set of gradient "blobs" with specific motion
// parameters. Parallax factors create depth: foreground moves 2-3× faster.

interface BlobConfig {
  /** Normalized base X position (0-1) */
  baseX: number;
  /** Normalized base Y position (0-1) */
  baseY: number;
  /** Radius as a fraction of canvas min dimension */
  radius: number;
  /** Center color (hex) */
  colorCenter: string;
  /** Edge color (hex or rgba) */
  colorEdge: string;
  /** Center opacity */
  opacityCenter: number;
  /** Motion speed multiplier (lower = slower) */
  speed: number;
  /** Phase offset for orbital motion */
  phase: number;
  /** Orbital amplitude (normalized 0-1) */
  orbitAmp: number;
  /** Parallax speed factor relative to base time */
  parallax: number;
  /** Optional: Perlin noise frequency (Layer 2 only) */
  noiseFreq?: number;
  /** Optional: Perlin noise amplitude (Layer 2 only) */
  noiseAmp?: number;
}

// Brand colors from design.md
const NAVY = "#0A1A2F";
const BRAND_BLUE_900 = "#0F2A5F";
const BRAND_BLUE_600 = "#1C3F7A";
const BRAND_BLUE_500 = "#2A5AA0";
const GOLD = "#C9A86A";

/** Layer 1 — Base Gradient: large, slow-moving navy → blue radial fields */
const LAYER1_BLOBS: BlobConfig[] = [
  {
    baseX: 0.35,
    baseY: 0.45,
    radius: 0.65,
    colorCenter: BRAND_BLUE_900,
    colorEdge: NAVY,
    opacityCenter: 1.0,
    speed: 0.18, // ~35s cycle
    phase: 0,
    orbitAmp: 0.12,
    parallax: 0.3,
  },
  {
    baseX: 0.7,
    baseY: 0.55,
    radius: 0.55,
    colorCenter: BRAND_BLUE_900,
    colorEdge: NAVY,
    opacityCenter: 0.85,
    speed: 0.15, // ~42s cycle
    phase: Math.PI * 0.7,
    orbitAmp: 0.1,
    parallax: 0.3,
  },
  {
    baseX: 0.5,
    baseY: 0.2,
    radius: 0.5,
    colorCenter: BRAND_BLUE_600,
    colorEdge: NAVY,
    opacityCenter: 0.6,
    speed: 0.12,
    phase: Math.PI * 1.3,
    orbitAmp: 0.08,
    parallax: 0.25,
  },
];

/** Layer 2 — Perlin Distortion: organic liquid motion driven by noise */
const LAYER2_BLOBS: BlobConfig[] = [
  {
    baseX: 0.45,
    baseY: 0.5,
    radius: 0.4,
    colorCenter: BRAND_BLUE_900,
    colorEdge: NAVY,
    opacityCenter: 0.5,
    speed: 0.08,
    phase: 0,
    orbitAmp: 0.05,
    parallax: 0.5,
    noiseFreq: 0.2,
    noiseAmp: 0.08,
  },
  {
    baseX: 0.25,
    baseY: 0.65,
    radius: 0.35,
    colorCenter: BRAND_BLUE_600,
    colorEdge: NAVY,
    opacityCenter: 0.4,
    speed: 0.06,
    phase: 2.5,
    orbitAmp: 0.04,
    parallax: 0.5,
    noiseFreq: 0.15,
    noiseAmp: 0.06,
  },
  {
    baseX: 0.75,
    baseY: 0.35,
    radius: 0.38,
    colorCenter: BRAND_BLUE_500,
    colorEdge: NAVY,
    opacityCenter: 0.35,
    speed: 0.07,
    phase: 4.0,
    orbitAmp: 0.05,
    parallax: 0.55,
    noiseFreq: 0.18,
    noiseAmp: 0.07,
  },
];

/** Layer 3 — Additive Gold Highlights: soft shimmer streaks */
const LAYER3_BLOBS: BlobConfig[] = [
  {
    baseX: 0.2,
    baseY: 0.35,
    radius: 0.18,
    colorCenter: GOLD,
    colorEdge: GOLD,
    opacityCenter: 0.12,
    speed: 0.6, // ~10s cycle
    phase: 0,
    orbitAmp: 0.15,
    parallax: 2.2,
  },
  {
    baseX: 0.8,
    baseY: 0.4,
    radius: 0.14,
    colorCenter: GOLD,
    colorEdge: GOLD,
    opacityCenter: 0.08,
    speed: 0.5, // ~12s cycle
    phase: 1.8,
    orbitAmp: 0.12,
    parallax: 2.5,
  },
  {
    baseX: 0.55,
    baseY: 0.75,
    radius: 0.2,
    colorCenter: GOLD,
    colorEdge: GOLD,
    opacityCenter: 0.1,
    speed: 0.55,
    phase: 3.5,
    orbitAmp: 0.18,
    parallax: 2.8,
  },
  {
    baseX: 0.4,
    baseY: 0.2,
    radius: 0.12,
    colorCenter: GOLD,
    colorEdge: GOLD,
    opacityCenter: 0.06,
    speed: 0.7,
    phase: 5.0,
    orbitAmp: 0.1,
    parallax: 2.0,
  },
];

/** Layer 4 — Blue Bloom: large atmospheric glow, screen blend */
const LAYER4_BLOBS: BlobConfig[] = [
  {
    baseX: 0.4,
    baseY: 0.5,
    radius: 0.75,
    colorCenter: BRAND_BLUE_500,
    colorEdge: BRAND_BLUE_500,
    opacityCenter: 0.18,
    speed: 0.25,
    phase: 0,
    orbitAmp: 0.1,
    parallax: 1.5,
  },
  {
    baseX: 0.6,
    baseY: 0.3,
    radius: 0.65,
    colorCenter: BRAND_BLUE_600,
    colorEdge: BRAND_BLUE_600,
    opacityCenter: 0.14,
    speed: 0.22,
    phase: Math.PI * 0.5,
    orbitAmp: 0.08,
    parallax: 1.5,
  },
  {
    baseX: 0.3,
    baseY: 0.7,
    radius: 0.6,
    colorCenter: BRAND_BLUE_500,
    colorEdge: BRAND_BLUE_500,
    opacityCenter: 0.1,
    speed: 0.2,
    phase: Math.PI * 1.2,
    orbitAmp: 0.09,
    parallax: 1.6,
  },
];

// ---------------------------------------------------------------------------
// 5. BLOB POSITION COMPUTATION
// ---------------------------------------------------------------------------

/** Compute a blob's current center position given time and canvas size */
function computeBlobPosition(
  blob: BlobConfig,
  time: number,
  w: number,
  h: number,
  perlin?: PerlinNoise
): { x: number; y: number; r: number } {
  const t = time * blob.parallax;

  // Orbital motion with ease-in-out sine character
  const orbitX = oscillate(t, blob.speed, blob.phase);
  const orbitY = oscillate(t, blob.speed, blob.phase + Math.PI * 0.5);

  let dx = easeInOutSine((orbitX + 1) / 2) * 2 - 1;
  let dy = easeInOutSine((orbitY + 1) / 2) * 2 - 1;

  dx *= blob.orbitAmp;
  dy *= blob.orbitAmp;

  // Add Perlin noise displacement for organic liquid feel (Layer 2)
  if (perlin && blob.noiseFreq && blob.noiseAmp) {
    const nx = perlin.noise(t * blob.noiseFreq, blob.phase);
    const ny = perlin.noise(t * blob.noiseFreq + 100, blob.phase);
    dx += nx * blob.noiseAmp;
    dy += ny * blob.noiseAmp;
  }

  // Gold shimmer: subtle breathing on radius (Layer 3)
  let rScale = 1.0;
  if (blob.parallax > 2.0) {
    const breathe = oscillate(t, blob.speed * 1.5, blob.phase + 1);
    rScale = 1.0 + breathe * 0.08;
  }

  const minDim = Math.min(w, h);
  return {
    x: (blob.baseX + dx) * w,
    y: (blob.baseY + dy) * h,
    r: blob.radius * minDim * rScale,
  };
}

/** Compute gold opacity shimmer for Layer 3 */
function computeGoldOpacity(blob: BlobConfig, time: number): number {
  const t = time * blob.parallax;
  const shimmer = oscillate(t, blob.speed * 1.3, blob.phase + 2);
  // Oscillate between 0.4× and 1.0× of base opacity
  const intensity = 0.4 + 0.6 * easeInOutSine((shimmer + 1) / 2);
  return blob.opacityCenter * intensity;
}

// ---------------------------------------------------------------------------
// 6. DRAWING HELPERS
// ---------------------------------------------------------------------------

/** Draw a single radial gradient blob */
function drawBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  colorCenter: string,
  colorEdge: string,
  opacityCenter: number
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);

  // Center color with opacity
  if (colorCenter.startsWith("rgba")) {
    gradient.addColorStop(0, colorCenter);
  } else {
    gradient.addColorStop(0, hexToRgba(colorCenter, opacityCenter));
  }

  // Edge color
  if (colorEdge.startsWith("rgba")) {
    gradient.addColorStop(1, colorEdge);
  } else {
    gradient.addColorStop(1, hexToRgba(colorEdge, 0));
  }

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ---------------------------------------------------------------------------
// 7. MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // -------------------------------------------------------------------------
    // Setup & Resize
    // -------------------------------------------------------------------------
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
    let animationId = 0;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Scale once, draw in CSS pixels
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // -------------------------------------------------------------------------
    // Layer 5: Noise texture (generate once)
    // -------------------------------------------------------------------------
    const noiseTexture = createNoiseTexture(256);
    const noisePattern = ctx.createPattern(noiseTexture, "repeat")!;

    // -------------------------------------------------------------------------
    // Layer 2: Perlin noise instance
    // -------------------------------------------------------------------------
    const perlin = new PerlinNoise(42);

    // -------------------------------------------------------------------------
    // Visibility handling (pause when tab hidden)
    // -------------------------------------------------------------------------
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // -------------------------------------------------------------------------
    // Animation state
    // -------------------------------------------------------------------------
    let startTime = performance.now();
    let lastTime = startTime;

    // -------------------------------------------------------------------------
    // Main render loop
    // -------------------------------------------------------------------------
    function render() {
      animationId = requestAnimationFrame(render);

      if (!canvas || !ctx) return;

      if (!isVisible) {
        // Still update startTime so we don't jump when tab becomes visible
        startTime = performance.now() - (lastTime - startTime);
        return;
      }

      const now = performance.now();
      lastTime = now;

      // Time in seconds for motion calculations
      const time = (now - startTime) / 1000;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Guard against zero-size canvas
      if (w === 0 || h === 0) return;

      // ===================================================================
      // LAYER 1 — Base Gradient (source-over)
      // ===================================================================
      // Large, slow-moving radial gradients forming the deep navy backdrop.
      // Very slow drift (30–40s cycles) creates a living, breathing depth.

      ctx.globalCompositeOperation = "source-over";

      // Solid navy background first
      ctx.fillStyle = NAVY;
      ctx.fillRect(0, 0, w, h);

      for (const blob of LAYER1_BLOBS) {
        const pos = computeBlobPosition(blob, time, w, h);
        drawBlob(
          ctx,
          pos.x,
          pos.y,
          pos.r,
          blob.colorCenter,
          blob.colorEdge,
          blob.opacityCenter
        );
      }

      // ===================================================================
      // LAYER 2 — Perlin Noise Distortion Field (source-over)
      // ===================================================================
      // Noise-driven displacement creates organic "liquid" motion.
      // Low amplitude, slow frequency — subtle but essential for realism.

      for (const blob of LAYER2_BLOBS) {
        const pos = computeBlobPosition(blob, time, w, h, perlin);
        drawBlob(
          ctx,
          pos.x,
          pos.y,
          pos.r,
          blob.colorCenter,
          blob.colorEdge,
          blob.opacityCenter
        );
      }

      // ===================================================================
      // LAYER 3 — Additive Gold Highlights (lighter / additive)
      // ===================================================================
      // Soft gold blobs with additive blending.
      // Slow shimmer (8–12s cycles) with opacity breathing 0.05–0.12.
      // These read as warm light leaking through the atmospheric haze.

      ctx.globalCompositeOperation = "lighter";

      for (const blob of LAYER3_BLOBS) {
        const pos = computeBlobPosition(blob, time, w, h);
        const opacity = computeGoldOpacity(blob, time);
        drawBlob(ctx, pos.x, pos.y, pos.r, blob.colorCenter, blob.colorEdge, opacity);
      }

      // ===================================================================
      // LAYER 4 — Blue Bloom Layer (screen)
      // ===================================================================
      // Large, soft brandBlue-500 → brandBlue-600 gradients.
      // Screen blend mode creates the "light leaking through fog" effect.
      // Moves independently at mid-ground parallax speed.

      ctx.globalCompositeOperation = "screen";

      for (const blob of LAYER4_BLOBS) {
        const pos = computeBlobPosition(blob, time, w, h);
        drawBlob(
          ctx,
          pos.x,
          pos.y,
          pos.r,
          blob.colorCenter,
          blob.colorEdge,
          blob.opacityCenter
        );
      }

      // ===================================================================
      // LAYER 5 — Noise Texture Overlay (overlay)
      // ===================================================================
      // Tiled greyscale noise with overlay blend.
      // Adds subtle film grain realism. Very low opacity (0.05–0.08).

      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = noisePattern;
      ctx.globalAlpha = 0.06;
      ctx.fillRect(0, 0, w, h);

      // Reset alpha & composite for next frame
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
    }

    // Start loop
    render();

    // -------------------------------------------------------------------------
    // Cleanup
    // -------------------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", handleVisibility);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        willChange: "transform",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
