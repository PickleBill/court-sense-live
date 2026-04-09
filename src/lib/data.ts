// Hybrid data layer: real GitHub API + mock supplements

const BASE_URL =
  "https://raw.githubusercontent.com/PickleBill/pickle-daas-data/main/output/lovable-package";

// ─── Types ───

export interface RawClip {
  id: string;
  name: string;
  video_url: string;
  thumbnail_url?: string;
  quality_score: number;
  viral_score: number;
  story_arc: string;
  ron_burgundy_quote?: string;
  top_badge?: string;
  brands: string[];
  caption?: string;
  sport?: string;
  sport_confidence?: string;
  tmnt_commentary?: Record<string, string>;
  daas_signals?: {
    watchability_score?: number;
    cinematic_score?: number;
    coaching_breakdown?: string[];
    hashtags?: string[];
    badges?: string[];
  };
  commentary?: Record<string, string>;
}

export interface Brand {
  brand_name: string;
  category: string;
  appearances: number;
  clips: string[];
  confidence: string;
  presence_percentage: number;
  sponsorship_insight?: string;
}

export interface BrandRegistry {
  total_clips_analyzed: number;
  brands: Brand[];
  sponsorship_insight: string;
  generated_at: string;
}

export interface DashboardData {
  player: {
    username: string;
    rank: number;
    xp: number;
    level: number;
    rank_tier: string;
    badges_count: number;
  };
  kpis: {
    clips_analyzed: number;
    avg_quality_score: number;
    top_brand: string;
    avg_viral_score: number;
  };
  analytics: {
    avg_quality_score: number;
    avg_viral_score: number;
    top_shot_type: string;
    dominant_play_style: string;
    top_brands: { brand: string; count: number }[];
    skill_radar: Record<string, number>;
    story_arc_breakdown: Record<string, number>;
    total_clips_analyzed: number;
    sport_breakdown: Record<string, number>;
  };
  generated_at: string;
}

// ─── Fetch with fallback ───

async function fetchJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/${path}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function fetchClips(): Promise<RawClip[]> {
  const clips = await fetchJSON<RawClip[]>("clips-metadata.json", []);
  // Supplement with mock clips for variety
  return [...clips, ...mockSupplementClips];
}

export async function fetchBrandRegistry(): Promise<BrandRegistry> {
  const registry = await fetchJSON<BrandRegistry>("brand-registry.json", {
    total_clips_analyzed: 0,
    brands: [],
    sponsorship_insight: "",
    generated_at: "",
  });
  // Supplement with mock brands
  return {
    ...registry,
    brands: [...registry.brands, ...mockSupplementBrands],
  };
}

export async function fetchDashboard(): Promise<DashboardData> {
  return fetchJSON<DashboardData>("dashboard-data.json", mockDashboardFallback);
}

// ─── Mock supplements (brands/clips not yet in real API) ───

const mockSupplementClips: RawClip[] = [
  {
    id: "mock-001",
    name: "62 MPH Cross-Court Winner — Court 4",
    video_url: "https://cdn.courtana.com/clips/mock-001.mp4",
    quality_score: 8,
    viral_score: 6,
    story_arc: "athletic_highlight",
    brands: ["SELKIRK", "SKECHERS"],
    caption: "Pure power from the baseline 💪",
    sport: "pickleball",
  },
  {
    id: "mock-002",
    name: "45-Shot Rally — Court 2",
    video_url: "https://cdn.courtana.com/clips/mock-002.mp4",
    quality_score: 7,
    viral_score: 8,
    story_arc: "grind_rally",
    brands: ["ADIDAS", "LIFE TIME PICKLEBALL"],
    caption: "When neither player will quit 🔥",
    sport: "pickleball",
  },
];

const mockSupplementBrands: Brand[] = [
  {
    brand_name: "SELKIRK",
    category: "paddle",
    appearances: 4,
    clips: ["mock-001"],
    confidence: "medium",
    presence_percentage: 15,
  },
  {
    brand_name: "SKECHERS",
    category: "footwear",
    appearances: 3,
    clips: ["mock-001"],
    confidence: "medium",
    presence_percentage: 12,
  },
  {
    brand_name: "ADIDAS",
    category: "apparel",
    appearances: 2,
    clips: ["mock-002"],
    confidence: "medium",
    presence_percentage: 8,
  },
];

const mockDashboardFallback: DashboardData = {
  player: {
    username: "PickleBill",
    rank: 1,
    xp: 283950,
    level: 17,
    rank_tier: "Gold III",
    badges_count: 82,
  },
  kpis: {
    clips_analyzed: 8,
    avg_quality_score: 7.3,
    top_brand: "JOOLA",
    avg_viral_score: 5.5,
  },
  analytics: {
    avg_quality_score: 7.3,
    avg_viral_score: 5.5,
    top_shot_type: "drive",
    dominant_play_style: "banger",
    top_brands: [
      { brand: "JOOLA", count: 8 },
      { brand: "LIFE TIME PICKLEBALL", count: 8 },
      { brand: "CRBN", count: 2 },
    ],
    skill_radar: {
      court_coverage: 6.0,
      kitchen_mastery: 5.0,
      power_game: 6.0,
      touch_feel: 5.3,
      athleticism: 6.3,
      creativity: 4.0,
      court_iq: 5.7,
    },
    story_arc_breakdown: {
      grind_rally: 2,
      athletic_highlight: 1,
      teaching_moment: 3,
      pure_fun: 2,
      error_highlight: 1,
    },
    total_clips_analyzed: 8,
    sport_breakdown: {
      pickleball: 6,
      hockey: 2,
    },
  },
  generated_at: "2026-03-28T00:00:00Z",
};

// ─── Equipment Audit Data (Dataset B from PDF — mock) ───

export interface EquipmentAudit {
  brand: string;
  model: string;
  gripSuccessRate: number;
  stressEventOutcome: number;
  avgShotSpeed: number;
  controlRating: number;
  durabilityIndex: number;
  sampleSize: number;
}

export const equipmentAudits: EquipmentAudit[] = [
  { brand: "JOOLA", model: "Hyperion CFS 16", gripSuccessRate: 94.2, stressEventOutcome: 87.1, avgShotSpeed: 48.3, controlRating: 91, durabilityIndex: 88, sampleSize: 342 },
  { brand: "JOOLA", model: "Solaire CFS 14", gripSuccessRate: 91.8, stressEventOutcome: 84.6, avgShotSpeed: 51.2, controlRating: 86, durabilityIndex: 90, sampleSize: 287 },
  { brand: "SELKIRK", model: "Vanguard Power Air", gripSuccessRate: 89.4, stressEventOutcome: 82.3, avgShotSpeed: 52.7, controlRating: 83, durabilityIndex: 85, sampleSize: 256 },
  { brand: "SELKIRK", model: "SLK Halo", gripSuccessRate: 87.1, stressEventOutcome: 79.8, avgShotSpeed: 46.9, controlRating: 88, durabilityIndex: 82, sampleSize: 198 },
  { brand: "CRBN", model: "CRBN 1X Power", gripSuccessRate: 92.6, stressEventOutcome: 85.9, avgShotSpeed: 49.8, controlRating: 89, durabilityIndex: 91, sampleSize: 178 },
  { brand: "ADIDAS", model: "Metalbone HRD", gripSuccessRate: 90.3, stressEventOutcome: 83.4, avgShotSpeed: 50.1, controlRating: 87, durabilityIndex: 86, sampleSize: 145 },
  { brand: "SKECHERS", model: "Viper Court Pro", gripSuccessRate: 86.3, stressEventOutcome: 78.4, avgShotSpeed: 44.2, controlRating: 90, durabilityIndex: 87, sampleSize: 112 },
];

// ─── Hustle Index Data (Dataset A from PDF — mock) ───

export interface HustleIndex {
  playerId: string;
  hustleScore: number;
  distanceCovered: number;
  sprintEvents: number;
  avgRecoveryTime: number;
  diveSaves: number;
  biometricLoad: number;
}

export const hustleIndexData: HustleIndex[] = [
  { playerId: "PLR-001", hustleScore: 94.2, distanceCovered: 2847, sprintEvents: 34, avgRecoveryTime: 1.2, diveSaves: 3, biometricLoad: 87.4 },
  { playerId: "PLR-002", hustleScore: 88.7, distanceCovered: 2403, sprintEvents: 28, avgRecoveryTime: 1.5, diveSaves: 1, biometricLoad: 79.1 },
  { playerId: "PLR-003", hustleScore: 91.3, distanceCovered: 2651, sprintEvents: 31, avgRecoveryTime: 1.3, diveSaves: 2, biometricLoad: 83.6 },
  { playerId: "PLR-004", hustleScore: 86.1, distanceCovered: 2198, sprintEvents: 22, avgRecoveryTime: 1.7, diveSaves: 0, biometricLoad: 71.8 },
  { playerId: "PLR-005", hustleScore: 97.4, distanceCovered: 3102, sprintEvents: 41, avgRecoveryTime: 1.1, diveSaves: 5, biometricLoad: 92.3 },
];

// ─── Tactical Geometry Data (Dataset C from PDF — mock) ───

export interface TacticalGeometry {
  matchId: string;
  gameState: string;
  winProbability: number;
  courtCoverage: number;
  shotAngle: number;
  rallyLength: number;
  tacticalPattern: string;
}

export const tacticalGeometryData: TacticalGeometry[] = [
  { matchId: "MTH-001", gameState: "8-6, Game 2", winProbability: 62.4, courtCoverage: 78.3, shotAngle: 42.1, rallyLength: 12, tacticalPattern: "Cross-Court Dominance" },
  { matchId: "MTH-002", gameState: "4-4, Game 1", winProbability: 51.2, courtCoverage: 84.7, shotAngle: 38.9, rallyLength: 23, tacticalPattern: "Kitchen Control" },
  { matchId: "MTH-003", gameState: "10-8, Game 3", winProbability: 74.1, courtCoverage: 71.2, shotAngle: 55.3, rallyLength: 8, tacticalPattern: "Power Offense" },
  { matchId: "MTH-004", gameState: "6-9, Game 2", winProbability: 28.7, courtCoverage: 89.1, shotAngle: 31.4, rallyLength: 34, tacticalPattern: "Defensive Reset" },
  { matchId: "MTH-005", gameState: "11-9, Game 1", winProbability: 88.3, courtCoverage: 76.8, shotAngle: 47.6, rallyLength: 15, tacticalPattern: "Transition Attack" },
];

// ─── Marketplace Products ───

export interface DataProduct {
  id: string;
  name: string;
  description: string;
  tier: string;
  price: string;
  metrics: string[];
  cta: string;
  ctaLink: string;
  priority: "P1" | "P2" | "P3";
}

export const dataProducts: DataProduct[] = [
  {
    id: "brand-intel",
    name: "Brand Intelligence Reports",
    description: "See exactly how your equipment performs in live amateur play. Equipment performance audits, grip success rates, stress event outcomes, and competitive benchmarks.",
    tier: "Enterprise",
    price: "From $2,500/mo",
    metrics: ["Equipment Performance Audit", "Competitive Benchmarks", "Player Correlation Data", "Monthly Trend Reports"],
    cta: "Explore Brand Portal",
    ctaLink: "/intelligence/joola",
    priority: "P1",
  },
  {
    id: "ar-highlights",
    name: "AR Highlight Packages",
    description: "Revenue-ready clips with your brand featured. Automated AR overlays, brand placement verification, and licensable content for marketing campaigns.",
    tier: "Pro",
    price: "From $1,200/mo",
    metrics: ["AR Brand Overlays", "Viral Score Optimization", "Licensable Content Library", "Campaign Integration API"],
    cta: "Browse Media Library",
    ctaLink: "/highlights",
    priority: "P2",
  },
  {
    id: "raw-api",
    name: "Raw Data API Access",
    description: "Integrate court intelligence directly into your data pipeline. Real-time kinetic data, tactical geometry, and ML-ready training payloads.",
    tier: "Custom",
    price: "Contact Sales",
    metrics: ["Real-Time WebSocket Feed", "ML Training Payloads", "Tactical Geometry Data", "Custom Query Builder"],
    cta: "Request API Docs",
    ctaLink: "/sample-data",
    priority: "P3",
  },
];
