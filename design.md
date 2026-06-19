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

# 8. Heatmap — National Regulatory Matrix (Premium D3 Visualization)

The heatmap is a core analytical visualization representing regulatory intensity across all 64 jurisdictions.  
It must feel premium, smooth, and data‑driven — not blocky, static, or generic.

## 8.1 Visual Principles
- Smooth animated transitions (no instant jumps)
- Perceptual color scale (green → yellow → red)
- Even grid rhythm with consistent spacing
- Soft hover glow (not harsh outlines)
- Subtle drop shadow for depth
- Crisp typography for labels
- Stripe‑style motion: staggered, eased, and elegant

## 8.2 Layout & Structure
- Grid: **64 jurisdictions × N topics**
- Each cell is a **rounded square** (6px radius)
- Cell size: **24–32px** depending on viewport
- Gap: **4–6px**
- Responsive: grid scales down on mobile
- Labels:
  - Left: jurisdiction abbreviations (2–3 chars)
  - Top: topic abbreviations (2–4 chars)
  - Sticky on scroll

## 8.3 Color Scale (Perceptual)
Use a **three‑stop perceptual ramp**:

```js
d3.scaleLinear()
  .domain([0, 0.5, 1])
  .range(["#4ADE80", "#FACC15", "#F87171"]);
```

Rules:
- Never use default D3 categorical colors
- Never use pure red/green (accessibility)
- Colors must interpolate smoothly

## 8.4 Motion & Animation
### **Entrance Animation**
- Cells fade in with staggered timing
- Duration: 600–900ms
- Easing: `d3.easeCubicOut`
- Stagger: 15–25ms per cell (diagonal wave)

### **Hover Interaction**
- Cell scales to **1.08×**
- Soft glow: `rgba(255,255,255,0.25)`
- Tooltip fades in (150ms)

### **Data Update Animation**
When new data is loaded:
- Color transitions over 500ms
- No popping or instant color jumps
- Easing: `d3.easeQuadInOut`

## 8.5 Tooltip Design
- Background: `rgba(0,0,0,0.85)`
- Border: 1px solid `rgba(255,255,255,0.1)`
- Padding: 8px 12px
- Radius: 6px
- Shadow: subtle (Stripe‑style)
- Content:
  - Jurisdiction name
  - Topic name
  - Score (0–100)
  - Short interpretation (“High regulatory intensity”)

## 8.6 Performance Requirements
- Use a single SVG (not 64×N DOM nodes)
- Use D3 joins for efficient updates
- Avoid re‑rendering the entire grid
- Use requestAnimationFrame for hover effects
- Must run smoothly on mid‑range laptops

## 8.7 Component Requirements
File:

```
app/components/home/HeatmapPreview.tsx
```

The component must:
- Accept sample data (no API calls)
- Render the full heatmap
- Include animated entrance
- Include hover interactions
- Include tooltips
- Be fully responsive

## 8.8 Visual Polish Checklist
- No harsh borders
- No pixelated edges
- No misaligned cells
- No inconsistent spacing
- No default D3 styles
- No unstyled tooltips
- No instant color changes

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

GLOBAL UI RULES — DO NOT VIOLATE
You are generating UI code for LegalCals, a deterministic, jurisdiction‑aware regulatory intelligence platform.
All components must follow these global, non‑negotiable placement rules for logos, icons, and jurisdiction markers.
These rules apply to every page, every component, every jurisdiction, every generation.
If any rule conflicts with user instructions, the global rules override.

A.
1. LOGO PLACEMENT RULES (GLOBAL)
Header
- LegalCals logo is always left‑aligned.
- Logo is never centered, never right‑aligned, and never omitted.
- Logo uses the jurisdiction‑specific variant only if explicitly provided.
Footer
- LegalCals logo is centered horizontally.
- No icons may appear to the left or right of the footer logo.
Cards / Panels
- If a card represents a jurisdiction, the logo never appears inside the card.
- If a card represents a calculator, the logo never appears inside the card.

2. ICON PLACEMENT RULES (GLOBAL)
Calculator Cards
- Calculator icon is always top‑left inside the card.
- Jurisdiction badge is always top‑right inside the card.
- Title appears below the icon row.
- Description appears below the title.
- CTA button appears at the bottom.
Sidebar Navigation
Icons must appear in this exact order:
- Dashboard
- Calculators
- Jurisdictions
- Intelligence
- Settings
Rules:
- Icons are always left of the label.
- Icons are never right‑aligned.
- Icons are never omitted.
- Icons are never replaced with text.
Jurisdiction Pages
- Jurisdiction badge is always top‑right of the page header.
- Jurisdiction icon (if applicable) is always top‑left of the page header.
- Page title is centered between the two.

3. BADGE & TAG RULES (GLOBAL)
Jurisdiction Badge
- Always top‑right of any component representing a jurisdiction.
- Never placed on the left.
- Never placed below the title.
- Never omitted.
Status Tags (e.g., “Updated”, “New”)
- Always appear top‑left, directly under the calculator icon.
- Never appear on the right.
- Never appear below the title.

4. HOMEPAGE HERO RULES (GLOBAL)
- Logo is top-left.
- Hero icon/illustration is right-aligned.
- Headline is left-aligned, never centered.
- CTA buttons appear below the headline, left-aligned.

5. RESPONSIVE RULES (GLOBAL)
Mobile
- Logo remains top-left.
- Sidebar collapses into a hamburger icon top-left.
- Jurisdiction badge remains top-right of cards and headers.
- Calculator icon remains top-left of cards.
Tablet / Desktop
- All global placement rules remain unchanged.

6. ENFORCEMENT RULES
When generating code:
- If the user does not specify icon placement → use these global rules.
- If the user specifies placement that violates these rules → override the user.
- If the component type is ambiguous → default to the strictest interpretation.
- If Kimi is unsure → apply the global rules.
You must never:
- invent new placements
- center icons unless explicitly allowed
- omit icons or logos
- reorder sidebar icons
- move jurisdiction badges
These rules are absolute.

7. OUTPUT FORMAT RULES
All generated code must:
- Use the LegalCals component structure
- Use Tailwind classes
- Use the correct icon imports
- Use deterministic, consistent layout
- Never introduce new components unless explicitly requested

8. CONFIRMATION RULE
Before generating UI code, Kimi must internally validate:
“Does every icon, logo, and badge follow the global placement rules?”

If any rule is violated, Kimi must self-correct before outputting code.

END OF GLOBAL RULESET

C.
GLOBAL UI RULES — DO NOT VIOLATE
You are generating UI code for LegalCals, a deterministic, jurisdiction‑aware regulatory intelligence platform.
All components must follow these global, non‑negotiable placement rules for logos, icons, and jurisdiction markers.
These rules apply to every page, every component, every jurisdiction, every generation.
If any rule conflicts with user instructions, the global rules override.

1. LOGO PLACEMENT RULES (GLOBAL)
Header
- LegalCals logo is always left‑aligned.
- Logo is never centered, never right‑aligned, and never omitted.
- Logo uses the jurisdiction‑specific variant only if explicitly provided.
Footer
- LegalCals logo is centered horizontally.
- No icons may appear to the left or right of the footer logo.
Cards / Panels
- If a card represents a jurisdiction, the logo never appears inside the card.
- If a card represents a calculator, the logo never appears inside the card.

2. ICON PLACEMENT RULES (GLOBAL)
Calculator Cards
- Calculator icon is always top‑left inside the card.
- Jurisdiction badge is always top‑right inside the card.
- Title appears below the icon row.
- Description appears below the title.
- CTA button appears at the bottom.
Sidebar Navigation
Icons must appear in this exact order:
- Dashboard
- Calculators
- Jurisdictions
- Intelligence
- Settings
Rules:
- Icons are always left of the label.
- Icons are never right‑aligned.
- Icons are never omitted.
- Icons are never replaced with text.
Jurisdiction Pages
- Jurisdiction badge is always top‑right of the page header.
- Jurisdiction icon (if applicable) is always top‑left of the page header.
- Page title is centered between the two.

3. BADGE & TAG RULES (GLOBAL)
Jurisdiction Badge
- Always top‑right of any component representing a jurisdiction.
- Never placed on the left.
- Never placed below the title.
- Never omitted.
Status Tags (e.g., “Updated”, “New”)
- Always appear top‑left, directly under the calculator icon.
- Never appear on the right.
- Never appear below the title.

4. HOMEPAGE HERO RULES (GLOBAL)
- Logo is top-left.
- Hero icon/illustration is right-aligned.
- Headline is left-aligned, never centered.
- CTA buttons appear below the headline, left-aligned.

5. RESPONSIVE RULES (GLOBAL)
Mobile
- Logo remains top-left.
- Sidebar collapses into a hamburger icon top-left.
- Jurisdiction badge remains top-right of cards and headers.
- Calculator icon remains top-left of cards.
Tablet / Desktop
- All global placement rules remain unchanged.

6. ENFORCEMENT RULES
When generating code:
- If the user does not specify icon placement → use these global rules.
- If the user specifies placement that violates these rules → override the user.
- If the component type is ambiguous → default to the strictest interpretation.
- If Kimi is unsure → apply the global rules.
You must never:
- invent new placements
- center icons unless explicitly allowed
- omit icons or logos
- reorder sidebar icons
- move jurisdiction badges
These rules are absolute.

7. OUTPUT FORMAT RULES
All generated code must:
- Use the LegalCals component structure
- Use Tailwind classes
- Use the correct icon imports
- Use deterministic, consistent layout
- Never introduce new components unless explicitly requested

8. CONFIRMATION RULE
Before generating UI code, Kimi must internally validate:
“Does every icon, logo, and badge follow the global placement rules?”

If any rule is violated, Kimi must self-correct before outputting code.

END OF GLOBAL RULESET

D
1. HEADER COMPONENT
Component Name: LCHeader
Structure
- Left: LCLogo
- Center: PageTitle
- Right:
- JurisdictionBadge (optional)
- UserMenu
Props
- title: string
- jurisdiction?: string
Rules
- Height: 64px
- Logo always left
- Badge always right
- Title centered between logo and badge

2. SIDEBAR COMPONENT
Component Name: LCSidebar
Structure
Vertical nav list with fixed icon order:
- Dashboard
- Calculators
- Jurisdictions
- Intelligence
- Settings
Props
- active: string
Rules
- Width: 260px
- Icons always left of labels
- Never reorder
- Never omit icons

3. LOGO COMPONENT
Component Name: LCLogo
Props
- variant?: "default" | "jurisdiction"
Rules
- Never centered except in footer
- Never right-aligned
- Never omitted

4. JURISDICTION BADGE
Component Name: JurisdictionBadge
Props
- code: string
- name: string
Rules
- Always top-right of parent container
- Never left-aligned
- Never below title

5. CALCULATOR CARD
Component Name: CalculatorCard
Structure
- Top-left: Calculator icon
- Top-right: Jurisdiction badge
- Title
- Description
- CTA button
Props
- title: string
- description: string
- jurisdiction: string
- icon: ReactNode
- href: string
Rules
- Icon always top-left
- Badge always top-right
- CTA always bottom

6. CALCULATOR PAGE COMPONENTS
6.1 Calculator Header
Component Name: CalculatorHeader
Structure
- Left: Calculator icon
- Center: Title
- Right: Jurisdiction badge
Props
- title: string
- jurisdiction: string
- icon: ReactNode

6.2 Calculator Form
Component Name: CalculatorForm
Props
- fields: FieldDefinition[]
- onSubmit: (data) => void
Rules
- Vertical stacking
- Labels always above inputs
- Required fields marked with *

6.3 Results Panel
Component Name: ResultsPanel
Props
- results: ResultDefinition[]
Rules
- Sticky on desktop
- Full-width on mobile

7. JURISDICTION PAGE COMPONENTS
7.1 Jurisdiction Header
Component Name: JurisdictionHeader
Structure
- Left: Jurisdiction icon
- Center: Name
- Right: Jurisdiction badge
Props
- name: string
- code: string
- icon: ReactNode

7.2 Jurisdiction Section
Component Name: JurisdictionSection
Props
- title: string
- children: ReactNode
Rules
- Title left-aligned
- Section spacing consistent across pages

8. INTELLIGENCE COMPONENTS
8.1 Heatmap
Component Name: NationalHeatmap
Props
- data: HeatmapData
Rules
- Always first section on Intelligence page

8.2 Risk Score Panel
Component Name: RiskScorePanel
Props
- scores: RiskScore[]

8.3 Similarity Cluster View
Component Name: SimilarityClusters
Props
- clusters: Cluster[]

8.4 Trend Analysis Chart
Component Name: TrendAnalysis
Props
- data: TrendData[]
Rules
- Always last section

9. SEARCH COMPONENTS
9.1 Search Bar
Component Name: LCSearchBar
Props
- query: string
- onChange: (value) => void

9.2 Search Result Item
Component Name: SearchResultItem
Structure
- Left: Calculator icon
- Right: Title + jurisdiction badge
Props
- title: string
- jurisdiction: string
- icon: ReactNode
- href: string

10. FOOTER COMPONENT
Component Name: LCFooter
Structure
- Center: Logo
- Left: Navigation links
- Right: Social icons
Rules
- Logo must be centered
- No icons beside logo

11. GRID SYSTEM
Component Name: LCGrid
Props
- columns: number
- children: ReactNode
Rules
- Desktop: 3–4 columns
- Tablet: 2 columns
- Mobile: 1 column

12. RESPONSIVE WRAPPERS
Component Name: LCContainer
Props
- children: ReactNode
Rules
- Max width: 1280px
- Horizontal padding: 24px

13. ENFORCEMENT RULE
Before generating any component, Kimi must validate:
“Does this component match the canonical Component Library Spec?”

If not, Kimi must self-correct before outputting code.

END OF COMPONENT LIBRARY SPEC (D)
E.1 — GLOBAL VALIDATION HARNESS
Before outputting code, Kimi must run this internal checklist:
“Does this output violate any Global UI Rules (A), Page Layout Rules (C), or Component Specs (D)?”

If yes → stop, correct, revalidate.
If no → output code.

E.2 — GLOBAL UI RULE TESTS (A‑Compliance)
Test A‑1: Logo Placement
- Header logo must be left-aligned
- Footer logo must be centered
- No logo may appear inside cards
Fail if:
- Logo appears in any other position
- Logo is omitted where required

Test A‑2: Icon Placement
- Calculator icon must be top-left of cards
- Jurisdiction badge must be top-right
- Sidebar icons must follow the fixed order
Fail if:
- Icons appear centered, right-aligned, or reordered
- Icons are missing

Test A‑3: Badge Placement
- Jurisdiction badge must always be top-right
- Never left, never below title
Fail if:
- Badge appears anywhere else

Test A‑4: Hero Layout
- Headline left
- Illustration right
- CTA left
Fail if:
- Headline is centered
- Illustration is left

E.3 — PAGE LAYOUT TESTS (C‑Compliance)
Test C‑1: Homepage Structure
- Hero → What LegalCals Does → Supported Jurisdictions → Featured Calculators
Fail if:
- Sections appear out of order
- Hero layout violates A

Test C‑2: Calculator Page Structure
- Header (icon left, title center, badge right)
- Form left
- Results panel right
Fail if:
- Form and results are reversed
- Header elements misplaced

Test C‑3: Jurisdiction Page Structure
- Icon left
- Title center
- Badge right
- Sections in order: Overview → Calculators → Changes → Intelligence
Fail if:
- Any section is missing or reordered

Test C‑4: Intelligence Dashboard Structure
- Heatmap first
- Trend analysis last
Fail if:
- Any other order is used

E.4 — COMPONENT LIBRARY TESTS (D‑Compliance)
Test D‑1: Component Usage
- Only components defined in D may be used
- No ad‑hoc components allowed
Fail if:
- New components appear without definition

Test D‑2: Component Structure
Each component must match its canonical structure exactly.
Fail if:
- Props differ
- Required elements missing
- Layout differs

Test D‑3: Card Structure
- Icon top-left
- Badge top-right
- Title
- Description
- CTA bottom
Fail if:
- Any element is out of order

Test D‑4: Sidebar Structure
- Must use the fixed icon order
- Must use LCSidebar
Fail if:
- Order changes
- Icons missing

E.5 — RESPONSIVE TESTS
Test R‑1: Mobile
- Sidebar collapses
- Cards become single column
- Hero illustration moves below text
Fail if:
- Desktop layout persists on mobile

Test R‑2: Desktop
- Sidebar visible
- Full grid widths
Fail if:
- Mobile layout persists on desktop

E.6 — OUTPUT VALIDATION MACRO
Before outputting code, Kimi must run this macro:
VALIDATE_OUTPUT()
- Run A‑Compliance tests
- Run C‑Compliance tests
- Run D‑Compliance tests
- Run Responsive tests
- If any test fails → regenerate
- If all tests pass → output code

This macro is mandatory for every generation.

E.7 — FAILURE HANDLING
If any test fails:
- Kimi must not output the invalid code
- Kimi must self-correct
- Kimi must re-run the validation suite
- Kimi must only output code once all tests pass

END OF TEST SUITE (E)
LEGALCALS — VISUAL TOKEN SYSTEM (F)
Canonical design tokens for color, typography, spacing, radii, shadows, motion, and iconography.
These tokens must be used everywhere.
No custom values are allowed unless explicitly defined here.
If any conflict occurs:
A > C > D > F

F.1 — COLOR SYSTEM
LegalCals uses a jurisdiction‑aware neutral palette with a premium, authoritative feel.
Primary Colors
- --lc-primary-50: #F0F7FF
- --lc-primary-100: #D6E8FF
- --lc-primary-200: #A8CEFF
- --lc-primary-300: #7AB4FF
- --lc-primary-400: #4C9AFF
- --lc-primary-500: #1E80FF
- --lc-primary-600: #0066E6
- --lc-primary-700: #004DB4
- --lc-primary-800: #003482
- --lc-primary-900: #001B51
Neutral Colors
- --lc-gray-50: #F9FAFB
- --lc-gray-100: #F3F4F6
- --lc-gray-200: #E5E7EB
- --lc-gray-300: #D1D5DB
- --lc-gray-400: #9CA3AF
- --lc-gray-500: #6B7280
- --lc-gray-600: #4B5563
- --lc-gray-700: #374151
- --lc-gray-800: #1F2937
- --lc-gray-900: #111827
Semantic Colors
- Success: --lc-success: #16A34A
- Warning: --lc-warning: #F59E0B
- Error: --lc-error: #DC2626
- Info: --lc-info: #2563EB
Jurisdiction Accent Colors
Each jurisdiction gets a deterministic accent:
- Federal: #1E80FF
- Provinces/States: deterministic hash → HSL shift
- Territories: lighter variant of primary
Rule:
Accent colors may only be used for badges, highlights, and jurisdiction icons.

F.2 — TYPOGRAPHY SYSTEM
LegalCals uses a two‑font system:
Font Families
- --lc-font-sans: Inter, system-ui, sans-serif
- --lc-font-mono: JetBrains Mono, monospace
Font Sizes
- --lc-text-xs: 12px
- --lc-text-sm: 14px
- --lc-text-md: 16px
- --lc-text-lg: 18px
- --lc-text-xl: 20px
- --lc-text-2xl: 24px
- --lc-text-3xl: 30px
- --lc-text-4xl: 36px
- --lc-text-5xl: 48px
Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
Line Heights
- --lc-leading-tight: 1.1
- --lc-leading-normal: 1.4
- --lc-leading-relaxed: 1.6
Rules
- Headlines use semibold
- Body text uses regular
- Calculator results use mono

F.3 — SPACING SYSTEM
LegalCals uses a 4px grid.
Spacing Tokens
- --lc-space-1: 4px
- --lc-space-2: 8px
- --lc-space-3: 12px
- --lc-space-4: 16px
- --lc-space-5: 20px
- --lc-space-6: 24px
- --lc-space-8: 32px
- --lc-space-10: 40px
- --lc-space-12: 48px
- --lc-space-16: 64px
Rules
- Vertical rhythm uses multiples of 8px
- Horizontal padding uses 24px containers
- Cards use 20px internal padding

F.4 — BORDER RADIUS SYSTEM
Radii
- --lc-radius-sm: 4px
- --lc-radius-md: 8px
- --lc-radius-lg: 12px
- --lc-radius-xl: 16px
Rules
- Cards use md
- Buttons use md
- Badges use full (rounded-full)

F.5 — SHADOW SYSTEM
Shadows
- --lc-shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
- --lc-shadow-md: 0 4px 6px rgba(0,0,0,0.08)
- --lc-shadow-lg: 0 10px 15px rgba(0,0,0,0.12)
- --lc-shadow-xl: 0 20px 25px rgba(0,0,0,0.15)
Rules
- Cards use shadow-md
- Modals use shadow-xl
- Hover states increase shadow by one tier

F.6 — MOTION SYSTEM
Durations
- --lc-duration-fast: 120ms
- --lc-duration-normal: 200ms
- --lc-duration-slow: 300ms
Easing
- --lc-ease-standard: cubic-bezier(0.2, 0, 0, 1)
- --lc-ease-emphasized: cubic-bezier(0.4, 0, 0.2, 1)
Rules
- Hover transitions use fast
- Page transitions use normal
- Hero animations use slow

F.7 — ICONOGRAPHY SYSTEM
Icon Sizes
- --lc-icon-xs: 14px
- --lc-icon-sm: 18px
- --lc-icon-md: 20px
- --lc-icon-lg: 24px
- --lc-icon-xl: 32px
Rules
- Sidebar icons use lg
- Card icons use xl
- Badge icons use sm
- Calculator page header icons use xl
Stroke Rules
- All icons use 1.75px stroke
- Rounded linecaps
- No filled icons unless explicitly defined

F.8 — GRID & LAYOUT TOKENS
Breakpoints
- Mobile: <768px
- Tablet: 768–1024px
- Desktop: >1024px
Container Width
- --lc-container-max: 1280px
Grid Gaps
- --lc-grid-gap: 24px
Rules
- All grids use consistent gap
- Cards align to 3–4 columns on desktop
- 2 columns on tablet
- 1 column on mobile

F.9 — ENFORCEMENT RULE
Before outputting UI code, Kimi must validate:
“Does every color, font, spacing, radius, shadow, motion, and icon size match the Visual Token System?”

If not → self-correct.

END OF VISUAL TOKEN SYSTEM (F)

