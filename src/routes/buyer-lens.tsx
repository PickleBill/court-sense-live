import { createFileRoute } from "@tanstack/react-router";
import { CLIPS_DATA, getAggregatedStats, getBrandIntelligence, getSponsorshipWhitespace } from "@/lib/clips-data";
import FadeIn from "@/components/FadeIn";
import { useState } from "react";
import { Heart, Tag, TrendingUp, Building2 } from "lucide-react";

export const Route = createFileRoute("/buyer-lens")({
  component: BuyerLens,
});

const lenses = [
  { id: "health", label: "Health Insurer", icon: Heart },
  { id: "cpg", label: "CPG Brand", icon: Tag },
  { id: "betting", label: "Betting Analyst", icon: TrendingUp },
  { id: "facility", label: "Facility Operator", icon: Building2 },
] as const;

type LensId = (typeof lenses)[number]["id"];

function BuyerLens() {
  const [activeLens, setActiveLens] = useState<LensId>("health");
  const stats = getAggregatedStats();
  const brands = getBrandIntelligence();
  const whitespace = getSponsorshipWhitespace();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-foreground">Buyer Lens</h1>
        <p className="text-sm text-muted-foreground mt-1">Same data, different value proposition per buyer type</p>
      </FadeIn>

      {/* Lens Tabs */}
      <FadeIn delay={0.05}>
        <div className="flex gap-2 flex-wrap">
          {lenses.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLens(l.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeLens === l.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <l.icon size={14} />
              {l.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Lens Content */}
      <FadeIn key={activeLens}>
        {activeLens === "health" && <HealthLens />}
        {activeLens === "cpg" && <CPGLens brands={brands} whitespace={whitespace} />}
        {activeLens === "betting" && <BettingLens />}
        {activeLens === "facility" && <FacilityLens stats={stats} />}
      </FadeIn>
    </div>
  );
}

function HealthLens() {
  const players = CLIPS_DATA.flatMap(c => c.players_detected).filter(p => p.dominance_in_clip !== "background");
  const energyLevels = players.map(p => p.energy_level);
  const athleticismScores = CLIPS_DATA.filter(c => c.skill_indicators.athleticism_rating > 0).map(c => c.skill_indicators.athleticism_rating);
  const avgAthleticism = athleticismScores.length > 0 ? (athleticismScores.reduce((a, b) => a + b, 0) / athleticismScores.length).toFixed(1) : "N/A";

  const injurySignals = CLIPS_DATA.filter(c =>
    c.players_detected.some(p => p.apparel_summary.toLowerCase().includes("brace") || p.apparel_summary.toLowerCase().includes("compression"))
  );

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Why This Matters to Health Insurers</h2>
        <p className="text-xs text-muted-foreground">Passive court cameras provide continuous biometric and behavioral health signals — movement intensity, fatigue patterns, injury risk indicators, and activity frequency — all without wearable devices or patient self-reporting.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Avg Athleticism Rating</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{avgAthleticism}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Scale: 1-10 across {athleticismScores.length} clips</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Unique Players Observed</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{players.length}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Across all analyzed clips</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Injury Risk Signals</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{injurySignals.length}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Clips with braces/compression detected</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Energy Level Distribution</h3>
        <div className="flex flex-wrap gap-2">
          {energyLevels.map((e, i) => (
            <span key={i} className="px-2 py-1 rounded bg-accent text-xs text-foreground capitalize">{e}</span>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">"Hustle Index" Concept</h3>
        <p className="text-xs text-muted-foreground mb-3">Aggregate physical intensity signals per player session: court coverage × athleticism × energy level × dive frequency</p>
        <div className="grid grid-cols-2 gap-3">
          {CLIPS_DATA.filter(c => c.skill_indicators.athleticism_rating > 0).slice(0, 4).map(c => (
            <div key={c._highlight_meta?.id} className="bg-background rounded-md p-3">
              <p className="text-xs text-foreground mb-1">{c._highlight_meta?.name}</p>
              <p className="font-mono-data text-sm text-primary">
                Index: {((c.skill_indicators.court_coverage_rating + c.skill_indicators.athleticism_rating) / 2 * 10).toFixed(0)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CPGLens({ brands, whitespace }: { brands: ReturnType<typeof getBrandIntelligence>; whitespace: ReturnType<typeof getSponsorshipWhitespace> }) {
  const skillDist = CLIPS_DATA.flatMap(c => c.players_detected).filter(p => p.dominance_in_clip !== "background").map(p => p.estimated_skill_level);
  const skillCounts: Record<string, number> = {};
  skillDist.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; });

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Why This Matters to CPG Brands</h2>
        <p className="text-xs text-muted-foreground">See exactly how your equipment performs in real amateur play. AI detects your brand, measures visibility seconds, and identifies sponsorship whitespace where competitors haven't claimed mindshare.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Brand Visibility Leaderboard</h3>
        <div className="space-y-3">
          {brands.slice(0, 6).map(b => (
            <div key={b.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground font-medium">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.categories.join(", ")}</p>
              </div>
              <div className="text-right">
                <p className="font-mono-data text-sm text-foreground">{b.totalVisibilitySeconds}s</p>
                <p className="text-[10px] text-muted-foreground">{b.appearances} detections</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Player Demographic Signals</h3>
          <div className="space-y-2">
            {Object.entries(skillCounts).map(([level, count]) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-xs text-foreground capitalize">{level}</span>
                <span className="font-mono-data text-xs text-primary">{count} players</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Whitespace Opportunities</h3>
          <div className="space-y-1.5">
            {whitespace.filter(w => !w.filled).map(w => (
              <p key={w.category} className="text-xs text-muted-foreground capitalize">→ {w.category}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BettingLens() {
  const consistencyScores = CLIPS_DATA.filter(c => c.skill_indicators.consistency_rating > 0).map(c => ({
    name: c._highlight_meta?.name || "",
    consistency: c.skill_indicators.consistency_rating,
    quality: c.clip_meta.clip_quality_score,
    dupr: c.daas_signals.estimated_dupr_range || "N/A",
  }));

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Why This Matters to Betting Analysts</h2>
        <p className="text-xs text-muted-foreground">Consistency ratings, skill distributions, fatigue indicators, and shot quality variance provide predictive signals for match outcomes — data that traditional stats don't capture.</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Consistency & Quality Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground uppercase tracking-wider border-b border-border bg-accent/30">
                <th className="text-left py-3 px-4">Clip</th>
                <th className="text-center py-3 px-4">Consistency</th>
                <th className="text-center py-3 px-4">Quality</th>
                <th className="text-center py-3 px-4">Est. DUPR</th>
              </tr>
            </thead>
            <tbody>
              {consistencyScores.map(c => (
                <tr key={c.name} className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">{c.name}</td>
                  <td className="py-3 px-4 text-center font-mono-data text-foreground">{c.consistency}</td>
                  <td className="py-3 px-4 text-center font-mono-data text-foreground">{c.quality}</td>
                  <td className="py-3 px-4 text-center font-mono-data text-primary">{c.dupr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FacilityLens({ stats }: { stats: ReturnType<typeof getAggregatedStats> }) {
  const facilityBrands = CLIPS_DATA.flatMap(c => c.brand_detection.brands).filter(b => ["sponsor_banner", "net", "court surface"].includes(b.category));

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Why This Matters to Facility Operators</h2>
        <p className="text-xs text-muted-foreground">Understand court utilization, player demographics, sponsor banner visibility, and equipment trends — all from existing camera infrastructure with zero additional hardware.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Clips</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{stats.totalClips}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Unique Brands</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{stats.uniqueBrands}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Facility Sponsors Detected</p>
          <p className="font-mono-data text-2xl font-semibold text-foreground">{new Set(facilityBrands.map(b => b.brand_name)).size}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Facility Brand Visibility</h3>
        <div className="space-y-2">
          {Array.from(new Map(facilityBrands.map(b => [b.brand_name, b])).values()).map(b => (
            <div key={b.brand_name} className="flex items-center justify-between bg-background rounded-md p-3">
              <div>
                <p className="text-xs text-foreground font-medium">{b.brand_name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{b.category}</p>
              </div>
              <p className="font-mono-data text-xs text-primary">{b.estimated_visible_seconds}s visibility</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
