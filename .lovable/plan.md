
# CourtSense AI — v1 Rebuild Plan

## Design Direction
**Color palette (my call):** Deep navy background (#0a0a0f → #0f1d3a gradient range), with a **cool teal accent** (oklch-based, ~#5ec4d4) — institutional, not neon. Secondary accent: muted violet for discovery signals. Keep Bricolage Grotesque headings + Inter body + JetBrains Mono for data values.

**Layout:** Sidebar navigation (shadcn Sidebar component), desktop-first. Dense, Bloomberg-inspired information architecture.

## Architecture

### Data Layer
- Embed 15 clip analyses as static `CLIPS_DATA` in `src/lib/clips-data.ts` (the prompt says to embed, not fetch)
- Also embed multi-angle merge data as `MULTI_ANGLE_DATA`
- Type definitions matching the `ClipAnalysis` interface from the prompt
- Supplement with real GitHub API data where available (brand registry, dashboard KPIs)

### Routes (6 pages + sidebar)
1. **`/` — Command Center**: Stats row (4 KPI cards), Brand Frequency bar chart, Skill Radar chart, Recent Analyses grid, Pipeline Status
2. **`/clips` — Clip Explorer**: Two-panel layout. Left: scrollable clip grid with search/filter. Right: video player + tabbed details (Overview, Players, Shot Log, Brands, Badges, Commentary, Raw JSON)
3. **`/brands` — Brand Intelligence**: Brand overview table, Sponsorship Whitespace grid, Brand Exposure timeline
4. **`/players` — Player Profiles**: Player archetype cards with skill radars, shot tendencies, clip appearances
5. **`/multi-angle` — Multi-Angle Lab**: Angle selector, fused intelligence panel, confidence indicators
6. **`/buyer-lens` — Buyer Lens**: Tab bar (Health Insurer | CPG Brand | Betting Analyst | Facility Operator), each re-frames the same data

### Components
- `AppSidebar` — shadcn Sidebar with nav items + stats footer
- `VideoPlayer` — HTML5 video with seek-to-timestamp support
- `SkillRadar` — Recharts radar chart
- `BrandFrequencyChart` — Recharts horizontal bar
- `ShotLogTable` — Interactive table with video seek
- `WhitespaceGrid` — Category cards (green = filled, gray = whitespace)
- Reuse existing: `FadeIn`, `CountUp`

## Build Order
1. **Design system update** — New color tokens, keep typography
2. **Data layer** — Types + embedded clip data + multi-angle data
3. **Sidebar + layout shell** — AppSidebar + root layout wrapper
4. **Command Center** (`/`) — KPIs, charts, recent analyses, pipeline
5. **Clip Explorer** (`/clips`) — Two-panel with video + tabs
6. **Brand Intelligence** (`/brands`) — Tables + whitespace grid
7. **Player Profiles** (`/players`) — Archetype cards + radars
8. **Multi-Angle Lab** (`/multi-angle`) — Angle grid + fused panel
9. **Buyer Lens** (`/buyer-lens`) — 4 buyer views

## What Gets Removed
- Current top Navbar (replaced by sidebar)
- Current `/marketplace`, `/highlights`, `/intelligence/$brand`, `/sample-data` routes (replaced by new routes)
- Current `/login` route (no auth needed — showcase app)

## What Stays
- `FadeIn`, `CountUp` components
- `Footer` (adapted)
- shadcn/ui components
- Recharts, framer-motion deps
- Lovable Cloud (available but not used yet)
