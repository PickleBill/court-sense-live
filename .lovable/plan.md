

# CourtSense AI — Architecture & Design Overhaul Plan

## Two Problems to Solve

**1. Data layer is disconnected from real data.** The current `src/lib/data.ts` defines fetch functions (`fetchClips`, `fetchBrands`, etc.) but no page actually calls them. Every page imports static `mockClips`, `mockBrands` arrays directly. Meanwhile, the real GitHub API has 8 clips with real video URLs, real brand detection (JOOLA, LIFE TIME PICKLEBALL, CRBN), real quality/viral scores, and real commentary — none of it is being used.

**2. Design is generic AI terminal aesthetic.** The current design is exactly what impeccable calls out as AI slop: centered everything, identical card grids, monospace-everywhere "Bloomberg terminal" skin, neon green on black, gradient accents. We need to apply impeccable's principles while keeping a design that's authentic to a data marketplace for sports brands.

---

## Data Architecture

### Real Data Available (GitHub API)

```text
Base: raw.githubusercontent.com/PickleBill/pickle-daas-data/main/output/lovable-package/

clips-metadata.json    → 8 clips with:
                          - Real courtana.com video URLs (CDN-hosted MP4s)
                          - Quality scores (7-8), viral scores (4-7)
                          - Story arcs: athletic_highlight, grind_rally, teaching_moment, etc.
                          - Brand detection: JOOLA (8/8), LIFE TIME (8/8), CRBN (2/8)
                          - Multi-voice commentary (ESPN, hype, ron_burgundy, TMNT, coach)
                          - DaaS signals: coaching_breakdown, hashtags, badges

brand-registry.json    → 3 detected brands with appearance counts, confidence, clip IDs
                          + sponsorship_insight string

dashboard-data.json    → KPIs, skill radar (7 axes), story arc breakdown,
                          sport breakdown (pickleball: 6, hockey: 2)

player-dna.json        → Player profile with skill radar, coaching insights
```

### Proposed Hybrid Data Layer

Refactor `src/lib/data.ts` to match PickleStats Hub's pattern — a context provider using TanStack Query that fetches from the real API, with mock supplements for scale:

- **Real clips** (8) from API + 3-5 mock clips to show variety
- **Real brands** (3: JOOLA, LIFE TIME, CRBN) from API + mock brands (SELKIRK, SKECHERS, ADIDAS) to show market breadth
- **Real dashboard KPIs** from API
- **Mock equipment audits** (these don't exist in the API yet — fabricated per PDF Dataset B schema)
- **Mock hustle index / tactical geometry** (Dataset A and C from PDF — no API equivalent yet)

Every page will consume data via route loaders calling these fetch functions, not importing static arrays.

---

## Design Overhaul — Impeccable Principles Applied

### What Changes

**Typography**: Replace Inter + Roboto Mono monoculture. Following impeccable's font selection procedure:
- Brand voice: "dense, authoritative, institutional" (Bloomberg-style data marketplace)
- Reject reflex picks: Inter, DM Sans, Space Grotesk, IBM Plex
- Proposal: Use a distinctive grotesque for headings (e.g., Bricolage Grotesque or Satoshi) paired with a clean proportional body font. Reserve monospace ONLY for actual data values in tables, not for all body text.

**Layout**: Stop centering everything. Use left-aligned asymmetric layouts. Break the identical card grid pattern on marketplace and highlights pages. Use varied spacing for hierarchy.

**Color**: Keep the dark theme (this IS a data platform viewed by brand buyers in office settings — dark is correct), but ditch pure #00FF41 matrix green. Use OKLCH for a more refined accent — perhaps a warm amber or cool slate-blue that feels institutional rather than "hacker movie." Tint neutrals toward the brand hue.

**Visual details**: Remove scan-line animations, glow effects, terminal-card borders. These are the "AI slop" fingerprints. Replace with more subtle, purposeful motion — staggered reveals on page load, smooth table row transitions.

**Specific bans**: No gradient text, no side-stripe borders, no glassmorphism, no identical card grids.

### What Transfers from VibeCo Labs

Import these specific component patterns (adapted, not copied):
- **FadeIn component** — scroll-triggered `useInView` + framer-motion reveal. Clean, reusable.
- **CountUp/StatsBar pattern** — animated number count-up on scroll into view. Perfect for the KPI strips.
- **SpeedTimeline SVG chart pattern** — interactive slider-driven data visualization with interpolated curves. Adapt for equipment performance comparison.
- **ProjectShowcase card pattern** — hover-aware cards with category badges, thumbnails, and progressive info reveal. Adapt for clip gallery.
- **Navbar scroll behavior** — transparent-to-backdrop-blur on scroll, mobile AnimatePresence menu.

These are copied as component files and adapted, NOT as design tokens or color schemes.

---

## Build Order

### Step 1: Design System Reset
- New font pairing (following impeccable procedure — will finalize in implementation)
- Revised OKLCH color palette: keep dark background, choose a non-neon accent
- Remove scan-line, glow-green, terminal-card utilities
- Add FadeIn, CountUp components from VibeCo Labs
- Add framer-motion dependency if not present

### Step 2: Hybrid Data Layer
- Refactor `src/lib/data.ts` to actually fetch from GitHub API using async functions
- Match PickleStats Hub's `PickleDaasContext` type shapes (RawClip with commentary, daas_signals, etc.)
- Supplement with mock data for scale (equipment audits, additional brands, tactical geometry)
- Wire into route loaders so pages consume real data

### Step 3: Landing Page Redesign
- Left-aligned hero with asymmetric layout
- CountUp stats strip pulling real KPIs from dashboard-data.json
- Problem/solution section with varied card sizes (not identical grid)
- Revenue verticals with progressive disclosure

### Step 4: Intelligence Portal (`/intelligence/$brand`)
- Real brand data from brand-registry.json for JOOLA/LIFE TIME/CRBN
- Equipment audit table with current brand highlighted
- Embedded real video clips where that brand was detected
- Interactive SpeedTimeline-style comparison chart

### Step 5: Highlights / Media Library
- Real video players using courtana.com CDN URLs
- Brand detection badges from real data
- Commentary tabs (ESPN, hype, coach voices — all in the API)
- DaaS signal display (watchability, cinematic scores, coaching breakdown)

### Step 6: Sample Data / Proof Layer
- Interactive tables for all three PDF datasets
- Live JSON preview showing actual API response structure
- "This data comes from existing Reolink cameras" messaging

### Step 7: Marketplace + Nav + Footer
- Product catalog with progressive disclosure (not identical card grid)
- Updated navigation reflecting marketplace structure

---

## Technical Notes

- **framer-motion**: Required for FadeIn, CountUp, AnimatePresence patterns from VibeCo. Need to verify it's installed or add it.
- **Route loaders**: Pages will use TanStack Router loaders calling the fetch functions, with `staleTime: Infinity` since GitHub JSON is static.
- **Real video playback**: The courtana.com CDN URLs are real MP4s. Use native `<video>` elements, not placeholder divs.
- **No Supabase needed yet**: All data is static JSON from GitHub + mock supplements.

