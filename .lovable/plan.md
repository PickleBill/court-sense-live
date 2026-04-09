

# CourtSense AI — Enterprise Data Marketplace

## What We're Actually Building

A platform where **brand buyers** (Joola, Skechers, Adidas) and **investors** log in to see the value of court-derived data. Not a coaching tool. Not a camera management system. A **data intelligence marketplace** that proves the thesis: passive court video = monetizable asset.

## Architecture

```text
┌─────────────────────────────────────────────────┐
│  /  Landing — Sell the vision (investor-first)  │
├─────────────────────────────────────────────────┤
│  /login — Brand buyer / investor access         │
├─────────────────────────────────────────────────┤
│  /marketplace — The data product catalog        │
│    ├── Brand Intelligence Reports               │
│    ├── AR Highlight Packages                    │
│    └── Raw Data API Access tiers                │
├─────────────────────────────────────────────────┤
│  /intelligence/:brand — Brand-specific portal   │
│    ├── Equipment Performance Audit table        │
│    ├── Grip Success %, Stress Event outcomes    │
│    ├── Competitive benchmarks vs other brands   │
│    └── "Request Full Report" CTA                │
├─────────────────────────────────────────────────┤
│  /highlights — AR Media Library                 │
│    ├── Clip gallery with brand detection tags   │
│    ├── Quality/Viral/Watchability scores        │
│    ├── "License This Clip" workflow             │
│    └── AR overlay preview                       │
├─────────────────────────────────────────────────┤
│  /sample-data — Proof layer (investor demo)     │
│    ├── Dataset A: Hustle Index table            │
│    ├── Dataset B: Equipment Audit table         │
│    ├── Dataset C: Tactical Geometry table       │
│    └── Live JSON API preview                    │
└─────────────────────────────────────────────────┘
```

## Route Breakdown

### `/` — Landing Page (Investor-First)
Reframe from "Bloomberg Terminal" dashboard pitch to **data monetization thesis**. Lead with the problem/solution table from your PDF page 6. Show the three revenue streams. Stats strip shows real numbers from your GitHub API (clips analyzed, brands detected, data points extracted). CTA: "Explore the Data" and "Request Demo."

### `/marketplace` — Data Product Catalog
Three product cards representing your revenue verticals:
- **Brand Intelligence Reports** — "See exactly how your equipment performs in live amateur play" — P1 priority
- **AR Highlight Packages** — "Revenue-ready clips with your brand featured" — P2 priority
- **Raw Data API** — "Integrate court intelligence into your pipeline" — future/teaser

Each card shows pricing tier (teaser), sample metrics, and a CTA to explore.

### `/intelligence/:brand` — Brand-Specific Portal
This is the money page. When Joola's marketing VP logs in, they see:
- **Equipment Performance Audit** (Dataset B from your PDF) — their paddle's grip success rate, stress event outcomes, comparison vs Selkirk
- **Hustle Index correlation** — how players using their gear perform biomechanically
- **Clip evidence** — linked AR clips where their brand was detected
- **"Download Full Report"** and **"Schedule Briefing"** CTAs

For the investor demo, show this with real data from PickleStats Hub (JOOLA and LIFE TIME PICKLEBALL are already detected). Supplement with mock data for Adidas, Skechers, Selkirk to show scale.

### `/highlights` — AR Media Library
Pulls real clips from your GitHub CDN. Each clip card shows:
- Video player (real courtana.com video URLs)
- Brand detection badges (from your brand registry)
- Quality, Viral, Watchability, Cinematic scores (from daas_signals)
- Story arc classification
- "License for Brand Use" / "Export with AR Overlay" actions

### `/sample-data` — The Proof Layer (Investor Page)
Directly renders the three datasets from your PDF as interactive tables:
- Dataset A: Hustle Index (biometric load)
- Dataset B: Equipment Performance Audit
- Dataset C: Tactical Geometry (game state + win probability)
- Live JSON API preview showing the ML training payload structure
- "This data is generated from existing Reolink cameras with zero new hardware"

### `/login` — Clean, minimal. No coaching language.

## Data Strategy

**Real data** (from PickleStats Hub GitHub API):
- `clips-metadata.json` — 3+ clips with video URLs, scores, brands, commentary
- `brand-registry.json` — JOOLA, LIFE TIME PICKLEBALL with appearance counts
- `dashboard-data.json` — KPIs, skill radar, story arc breakdown
- `player-dna.json` — player profile with skill radar

**Mock data** (to demonstrate scale for investors):
- Expand brand registry: add Adidas, Skechers, Selkirk, K-Swiss with fabricated equipment audit data matching your PDF's Dataset B schema
- Expand venue data: 3-5 venues with match counts
- Add pricing tiers for marketplace cards
- Equipment performance audit tables matching your PDF exactly

## Design System

Carry forward VibeCo Labs principles adapted with the CourtSense color palette:
- **Background**: #0A0A0A (near-black)
- **Primary**: #00FF41 (matrix green) for data accents and CTAs
- **Typography**: Source Code Pro / Roboto Mono for data, Inter for headings
- **Surfaces**: Elevated cards with 1px borders, glow on hover
- **Animations**: Scan-line on headings, count-up on KPIs, bar-fill on progress

## What Gets Cut

- No live camera feeds or RTSP management (that's operations, not sales)
- No `/connect-court` route (venue onboarding is a separate ops tool)
- No coaching/player-facing features
- No betting data (P3 is deprioritized)
- No "Active Streams: 12" in nav — replace with data-focused indicators

## Build Order

1. Fix current build errors + update SEO/branding
2. Data layer — create hybrid data provider (real GitHub API + mock supplements)
3. Landing page — rewrite with investor thesis framing
4. `/marketplace` — product catalog cards
5. `/intelligence/:brand` — brand portal with equipment audit data
6. `/highlights` — real clips from GitHub CDN with licensing CTAs
7. `/sample-data` — PDF datasets as interactive proof tables
8. Navigation + footer — marketplace-oriented, not dashboard-oriented

## Technical Notes

- Recharts for any charts (already available patterns from PickleStats Hub)
- Fetch real data from `https://raw.githubusercontent.com/PickleBill/pickle-daas-data/main/output/lovable-package/` endpoints
- TanStack Router file-based routing — all routes created before any Link references
- No Supabase/auth needed yet — mock auth state for demo purposes

