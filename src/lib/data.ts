// Hybrid data layer: real GitHub API data + mock supplements

const BASE_URL = "https://raw.githubusercontent.com/PickleBill/pickle-daas-data/main/output/lovable-package";

// Types
export interface RawClip {
  id: string;
  name: string;
  video_url: string;
  quality_score: number;
  viral_score: number;
  watchability_score?: number;
  cinematic_score?: number;
  story_arc: string;
  brands: string[];
  daas_signals?: Record<string, unknown>;
  commentary?: string;
}

export interface Brand {
  brand_name: string;
  category: string;
  appearances: number;
  confidence: number;
  presence_percentage: number;
}

export interface DashboardData {
  kpis: {
    clips_analyzed: number;
    avg_quality_score: number;
    top_brand: string;
    avg_viral_score: number;
  };
  analytics: {
    top_brands: Brand[];
    skill_radar: Record<string, number>;
    story_arc_breakdown: Record<string, number>;
  };
}

export interface PlayerDNA {
  username: string;
  rank: number;
  xp: number;
  level: number;
  skill_radar: Record<string, number>;
  coaching_insights: string[];
  play_style: string;
}

// Fetch with fallback
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
  return fetchJSON<RawClip[]>("clips-metadata.json", mockClips);
}

export async function fetchBrands(): Promise<Brand[]> {
  return fetchJSON<Brand[]>("brand-registry.json", mockBrands);
}

export async function fetchDashboardData(): Promise<DashboardData> {
  return fetchJSON<DashboardData>("dashboard-data.json", mockDashboardData);
}

export async function fetchPlayerDNA(): Promise<PlayerDNA> {
  return fetchJSON<PlayerDNA>("player-dna.json", mockPlayerDNA);
}

// ─── Mock Supplements ───

export const mockClips: RawClip[] = [
  {
    id: "clip-001",
    name: "62 MPH Cross-Court Winner — Court 4",
    video_url: "https://cdn.courtana.com/clips/clip-001.mp4",
    quality_score: 92,
    viral_score: 88,
    watchability_score: 95,
    cinematic_score: 78,
    story_arc: "Comeback Rally",
    brands: ["JOOLA", "SKECHERS"],
    commentary: "Exceptional power shot with textbook follow-through. Brand paddle clearly visible.",
  },
  {
    id: "clip-002",
    name: "45-Shot Rally — Court 2",
    video_url: "https://cdn.courtana.com/clips/clip-002.mp4",
    quality_score: 87,
    viral_score: 94,
    watchability_score: 91,
    cinematic_score: 85,
    story_arc: "Endurance Battle",
    brands: ["SELKIRK", "LIFE TIME PICKLEBALL"],
    commentary: "Extended rally showcasing defensive positioning and paddle durability under stress.",
  },
  {
    id: "clip-003",
    name: "Diving Save into Winner — Court 1",
    video_url: "https://cdn.courtana.com/clips/clip-003.mp4",
    quality_score: 95,
    viral_score: 97,
    watchability_score: 98,
    cinematic_score: 92,
    story_arc: "Hero Moment",
    brands: ["JOOLA", "ADIDAS"],
    commentary: "Full extension dive to retrieve a ball, followed by an immediate offensive winner.",
  },
];

export const mockBrands: Brand[] = [
  { brand_name: "JOOLA", category: "Paddle Manufacturer", appearances: 847, confidence: 0.94, presence_percentage: 34.2 },
  { brand_name: "SELKIRK", category: "Paddle Manufacturer", appearances: 612, confidence: 0.91, presence_percentage: 24.7 },
  { brand_name: "LIFE TIME PICKLEBALL", category: "Venue Partner", appearances: 1203, confidence: 0.98, presence_percentage: 48.6 },
  { brand_name: "SKECHERS", category: "Footwear", appearances: 389, confidence: 0.87, presence_percentage: 15.7 },
  { brand_name: "ADIDAS", category: "Apparel", appearances: 456, confidence: 0.89, presence_percentage: 18.4 },
  { brand_name: "K-SWISS", category: "Footwear", appearances: 198, confidence: 0.82, presence_percentage: 8.0 },
];

export const mockDashboardData: DashboardData = {
  kpis: {
    clips_analyzed: 2478,
    avg_quality_score: 84.3,
    top_brand: "JOOLA",
    avg_viral_score: 71.2,
  },
  analytics: {
    top_brands: [],
    skill_radar: { power: 78, control: 85, speed: 72, endurance: 88, strategy: 91 },
    story_arc_breakdown: { "Comeback Rally": 23, "Endurance Battle": 18, "Hero Moment": 12, "Dominant Win": 31, "Upset": 16 },
  },
};

export const mockPlayerDNA: PlayerDNA = {
  username: "demo_player",
  rank: 42,
  xp: 12400,
  level: 8,
  skill_radar: { power: 78, control: 85, speed: 72, endurance: 88, strategy: 91 },
  coaching_insights: ["Improve net approach timing", "Leverage backhand dink consistency"],
  play_style: "Defensive Counter-Puncher",
};

// ─── Equipment Audit Data (Dataset B from PDF) ───

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
  { brand: "ADIDAS", model: "Metalbone HRD", gripSuccessRate: 92.6, stressEventOutcome: 85.9, avgShotSpeed: 49.8, controlRating: 89, durabilityIndex: 91, sampleSize: 178 },
  { brand: "SKECHERS", model: "Viper Court Pro", gripSuccessRate: 86.3, stressEventOutcome: 78.4, avgShotSpeed: 44.2, controlRating: 90, durabilityIndex: 87, sampleSize: 145 },
  { brand: "K-SWISS", model: "Express Light 3", gripSuccessRate: 84.7, stressEventOutcome: 76.1, avgShotSpeed: 43.8, controlRating: 85, durabilityIndex: 83, sampleSize: 112 },
];

// ─── Hustle Index Data (Dataset A from PDF) ───

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

// ─── Tactical Geometry Data (Dataset C from PDF) ───

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
    ctaLink: "#",
    priority: "P3",
  },
];
