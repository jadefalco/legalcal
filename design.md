# LegalCals Design System  
Version: 1.0  
Status: Authoritative — all UI must follow this file.

---

# 1. Brand Identity

## 1.1 Logo Placement
- Always top-left in the navbar.
- Minimum size: 32px height.
- Maintain 24px padding from left edge.
- Logo must never be replaced by text on desktop.


---

# 2. Color System

## 2.1 Primary Colors
These are the core LegalCals brand colors used throughout the platform:

- **Navy**: `#0A1A2F`  
  - Primary background, hero text, dark surfaces

- **Gold**: `#C9A86A`  
  - Accents, highlights, report markers

- **Blue 900**: `#0F2A5F`  
  - Primary CTA background, strong interactive elements

- **Blue 500**: `#3B82F6`  
  - Secondary interactive elements, subtle highlights

---

## 2.2 Neutrals
Used for backgrounds, borders, text, and subtle UI elements:

- **Slate 50**: `#F8FAFC`
- **Slate 100**: `#F1F5F9`
- **Slate 300**: `#CBD5E1`
- **Slate 600**: `#475569`
- **Slate 900**: `#0F172A`

---

## 2.3 Semantic Colors
Used for risk scoring, heatmaps, and analytical visualizations:

- **Risk Low**: `#4ADE80`
- **Risk Medium**: `#FACC15`
- **Risk High**: `#F87171`

---

## 2.4 Tailwind Color Tokens (Required)
These custom Tailwind colors MUST be added to `tailwind.config.ts` so that all components can use the correct brand blues.

```ts
extend: {
  colors: {
    brandBlue: {
      900: "#0F2A5F",  // Primary CTA background
      600: "#1C3F7A",  // CTA hover state
      500: "#2A5AA0"   // Gradient start / interactive accents
    }
  }
}
```

### Usage Rules
- Primary buttons: `bg-brandBlue-900`
- Hover state: `hover:bg-brandBlue-600`
- Gradients: `from-brandBlue-500 to-brandBlue-600`
- Avoid Tailwind’s default `blue-*` classes unless explicitly intended

# 3. Typography

## 3.1 Headings
- **Font:** Merriweather (serif)
- **Weights:** 700, 900
- **Tracking:** -1% for H1/H2
- **H1 Size:** 48–64px
- **H2 Size:** 32–40px

## 3.2 Body
- **Font:** Inter (sans-serif)
- **Weights:** 400, 500, 600
- **Line Height:** 1.6

---

# 4. Layout & Spacing

## 4.1 Section Spacing
- Desktop: 120px top/bottom
- Mobile: 64px top/bottom

## 4.2 Grid
- Max width: 1280px
- Padding: 24px mobile, 48px desktop

---

# 5. Buttons

## 5.1 Primary Button
- - Background: brandBlue-900


- Text: White
- Radius: 8px
- Padding: 14px 28px
- Hover: from-brandBlue-500 to-brandBlue-600



## 5.2 Secondary Button
- Border: 1px solid Slate 300
- Text: Slate 900
- Background: White
- Hover: Slate 100

---

# 6. Card Components

## 6.1 Standard Card
- Background: White
- Border: 1px solid Slate 200
- Radius: 12px
- Shadow: subtle (Stripe-style)
- Padding: 32px

## 6.2 Dark Card (API, Reports)
- Background: #0A1A2F
- Border: 1px solid #1E293B
- Text: Slate 50
- Radius: 12px
- Padding: 32px

---

# 7. Hero Animation — Stripe Aurora–Style (Premium Motion System)

The hero background uses a multi‑layer, GPU‑accelerated canvas animation inspired by Stripe’s Aurora gradients.  
It must feel premium, atmospheric, cinematic, and deeply layered — never flat, random, or simplistic.

## 7.1 Visual Principles
- Soft, flowing gradients with depth and dimensionality  
- Multi‑layer motion (foreground, midground, background)  
- Slow, organic movement (20–40s cycles)  
- Gold highlights that shimmer subtly  
- Blue glow/bloom layer for atmospheric depth  
- Noise texture overlay for realism  
- Parallax drift to create a sense of space  
- Smooth easing curves (no linear or jittery motion)  

## 7.2 Color Palette
Use LegalCals brand colors:

- **Navy**: `#0A1A2F` — base layer  
- **brandBlue‑900**: `#0F2A5F` — primary gradient  
- **brandBlue‑600**: `#1C3F7A` — secondary gradient  
- **brandBlue‑500**: `#2A5AA0` — accent gradient  
- **Gold**: `#C9A86A` — highlight streaks  

## 7.3 Layer Structure
The animation must include **five layers**, rendered in this order:

### Layer 1 — Base Gradient
- Large radial gradient (navy → brandBlue‑900)  
- Very slow drift (30–40s cycle)  

### Layer 2 — Perlin Noise Distortion Field
- Noise‑driven displacement of the base gradient  
- Creates organic “liquid” motion  
- Low amplitude, slow frequency  

### Layer 3 — Additive Gold Highlights
- Soft gold blobs with additive blend mode  
- Slow shimmer (8–12s cycles)  
- Opacity: 0.05–0.12  

### Layer 4 — Blue Bloom Layer
- Gradient: brandBlue‑500 → brandBlue‑600  
- Gaussian blur applied  
- Screen blend mode  
- Creates the “light leaking through fog” effect  

### Layer 5 — Noise Texture Overlay
- Transparent PNG noise texture  
- `mix-blend-mode: overlay`  
- Opacity: 0.05–0.08  
- Adds realism and subtle grain  

## 7.4 Motion Rules
- All layers move independently  
- Use `requestAnimationFrame`  
- Use easing curves (easeInOutSine)  
- No linear motion  
- No random jitter  
- Parallax: foreground layers move 2–3× faster than background layers  

## 7.5 Performance Requirements
- GPU‑accelerated  
- CPU usage < 5%  
- Canvas resolution scales with device pixel ratio  
- Animation pauses when tab is inactive  

## 7.6 Component Requirements
The animation must be implemented in a standalone component:

```
app/components/home/HeroCanvas.tsx
```

Integration rules:
- Positioned behind hero content  
- `position: absolute`  
- `inset: 0`  
- `z-index: -1`  
- `pointer-events: none`  

# 8. Heatmap (D3-Based)

## 8.1 Requirements
- Use D3.js
- Animated transitions
- Tooltip on hover
- Color scale: Low → Medium → High
- Grid layout: 64 jurisdictions × N topics
- Responsive

## 8.2 Color Scale
```js
d3.scaleLinear()
  .domain([0, 0.5, 1])
  .range(["#4ADE80", "#FACC15", "#F87171"]);
```

---

# 9. Similarity Clusters

## 9.1 Style
- Stripe-style cards
- Cluster color badges
- Minimalist lines
- No heavy borders

---

# 10. Trend & Forecast Visuals

## 10.1 Trend Sparkline
- SVG path
- Blue 500 stroke
- 2px width
- Soft shadow

## 10.2 Forecast Bars
- Gold bars
- Rounded corners
- 60% opacity background bar

---

# 11. Reports Section

## 11.1 Cards
- White background
- Gold accent line at top
- Shadow: medium
- Hover: lift + shadow increase

---

# 12. API Showcase

## 12.1 Code Blocks
- Dark navy background
- Rounded corners
- Syntax highlighting
- Stripe-style code font (JetBrains Mono or Fira Code)

---

# 13. Footer

## 13.1 Style
- Navy background
- White text
- 4-column grid
- 24px vertical padding

# 14. Brand Assets

## 14.1 Logo Usage
- Primary dark-background logo: `public/assets/logo-white.png`
- Primary light-background logo: `public/assets/logo-blue.png`
- Always use white logo on navy or dark hero backgrounds.
- Always use blue logo on white or slate backgrounds.
- Minimum logo height: 32px
- Maintain 24px left padding in navbar.
- Logo must always appear in the top-left corner of the navigation bar.
- Primary dark-background icon: `public/assets/favicon.png`
- Primary white-background logo: `public/assets/favicon-white.png`

## 14.2 Hero Background Assets
The following assets are available for hero and section backgrounds:

- `public/assets/hero-layout1.png` — abstract geometric layout (light)
- `public/assets/hero-layout2.png` — abstract geometric layout (dark)
- `public/assets/hero-background-pattern.png` — subtle repeating texture
- `public/assets/courthouse.png` — photographic accent element (low opacity)

Usage rules:
- Hero section uses the proprietary animated canvas background (Section 7).
- `hero-layout1.png` and `hero-layout2.png` may be layered at 5–10% opacity for depth.
- `hero-background-pattern.png` may be used as a noise overlay with `mix-blend-mode: overlay`.
- `courthouse.png` may be used as a faint watermark (opacity 3–5%) behind legal-themed sections.

