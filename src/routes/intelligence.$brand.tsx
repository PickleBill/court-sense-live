import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { equipmentAudits, mockBrands, mockClips } from "@/lib/data";
import { ArrowRight, BarChart3, Download, Calendar, TrendingUp, Shield } from "lucide-react";

export const Route = createFileRoute("/intelligence/$brand")({
  component: IntelligencePage,
});

function IntelligencePage() {
  const { brand } = Route.useParams();
  const brandName = brand.toUpperCase();
  const brandInfo = mockBrands.find((b) => b.brand_name === brandName);
  const brandAudits = equipmentAudits.filter((a) => a.brand === brandName);
  const allAudits = equipmentAudits;
  const brandClips = mockClips.filter((c) => c.brands.includes(brandName));

  const avgGrip = brandAudits.length > 0
    ? (brandAudits.reduce((s, a) => s + a.gripSuccessRate, 0) / brandAudits.length).toFixed(1)
    : "—";
  const avgStress = brandAudits.length > 0
    ? (brandAudits.reduce((s, a) => s + a.stressEventOutcome, 0) / brandAudits.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-4">
                <BarChart3 size={12} className="text-primary" />
                <span className="font-mono-data text-xs text-primary">BRAND INTELLIGENCE PORTAL</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">{brandName}</h1>
              <p className="font-mono-data text-sm text-muted-foreground">
                {brandInfo?.category || "Equipment"} • {brandInfo?.appearances || 0} appearances detected
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground font-mono-data text-xs rounded-sm hover:border-primary/50 hover:text-primary transition-colors">
                <Download size={12} /> Download Report
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-mono-data text-xs font-bold rounded-sm hover:opacity-90 transition-opacity">
                <Calendar size={12} /> Schedule Briefing
              </button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-8">
            {[
              { label: "GRIP SUCCESS RATE", value: `${avgGrip}%`, delta: "+2.1%" },
              { label: "STRESS EVENT OUTCOME", value: `${avgStress}%`, delta: "+1.8%" },
              { label: "CLIPS W/ BRAND", value: String(brandClips.length), delta: "" },
              { label: "PRESENCE SCORE", value: `${brandInfo?.presence_percentage || 0}%`, delta: "" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-background p-4">
                <span className="font-mono-data text-[10px] text-muted-foreground tracking-widest">{kpi.label}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono-data text-2xl font-bold text-foreground">{kpi.value}</span>
                  {kpi.delta && <span className="font-mono-data text-xs text-primary">{kpi.delta}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Equipment Performance Audit Table */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={14} className="text-primary" />
              <span className="font-mono-data text-xs text-muted-foreground tracking-widest">EQUIPMENT PERFORMANCE AUDIT</span>
            </div>
            <div className="terminal-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["Brand", "Model", "Grip %", "Stress %", "Avg Speed", "Control", "Durability", "Samples"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-mono-data text-[10px] text-muted-foreground tracking-widest font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allAudits.map((audit) => {
                      const isCurrentBrand = audit.brand === brandName;
                      return (
                        <tr key={`${audit.brand}-${audit.model}`} className={`border-b border-border/50 ${isCurrentBrand ? "bg-primary/5" : "hover:bg-card/50"} transition-colors`}>
                          <td className={`px-4 py-3 font-mono-data text-xs font-bold ${isCurrentBrand ? "text-primary" : "text-foreground"}`}>{audit.brand}</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground/80">{audit.model}</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground">{audit.gripSuccessRate}%</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground">{audit.stressEventOutcome}%</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground">{audit.avgShotSpeed} MPH</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground">{audit.controlRating}</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-foreground">{audit.durabilityIndex}</td>
                          <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">{audit.sampleSize}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Clip Evidence */}
          {brandClips.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-primary" />
                <span className="font-mono-data text-xs text-muted-foreground tracking-widest">CLIP EVIDENCE — BRAND DETECTED</span>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-border">
                {brandClips.map((clip) => (
                  <div key={clip.id} className="bg-background p-4 hover:bg-card transition-colors">
                    <div className="aspect-video bg-card rounded-sm mb-3 flex items-center justify-center border border-border">
                      <span className="font-mono-data text-[10px] text-muted-foreground">▶ {clip.id}</span>
                    </div>
                    <p className="font-mono-data text-xs text-foreground font-medium mb-1 truncate">{clip.name}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-data text-[10px] text-primary">Q:{clip.quality_score}</span>
                      <span className="font-mono-data text-[10px] text-chart-2">V:{clip.viral_score}</span>
                      <span className="font-mono-data text-[10px] text-muted-foreground">{clip.story_arc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="terminal-card p-8 text-center">
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Want the Full Picture?</h3>
            <p className="font-mono-data text-xs text-muted-foreground mb-4 max-w-md mx-auto">
              This portal shows a sample of available intelligence. Full reports include trend analysis,
              competitive benchmarks, and actionable R&D recommendations.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-mono-data text-xs font-bold rounded-sm hover:opacity-90 transition-opacity"
              >
                View All Products <ArrowRight size={12} />
              </Link>
              <Link
                to="/sample-data"
                className="inline-flex items-center gap-2 px-6 py-2 border border-border text-foreground font-mono-data text-xs rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                Browse Raw Datasets
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
