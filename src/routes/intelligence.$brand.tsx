import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { equipmentAudits, fetchBrandRegistry, fetchClips, type Brand, type RawClip } from "@/lib/data";
import { ArrowRight, BarChart3, Download, Calendar, TrendingUp, Video } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/intelligence/$brand")({
  component: IntelligencePage,
});

function IntelligencePage() {
  const { brand } = Route.useParams();
  const brandName = brand.toUpperCase();
  const [brandInfo, setBrandInfo] = useState<Brand | null>(null);
  const [brandClips, setBrandClips] = useState<RawClip[]>([]);

  const brandAudits = equipmentAudits.filter((a) => a.brand === brandName);
  const allAudits = equipmentAudits;

  useEffect(() => {
    fetchBrandRegistry().then((r) => {
      const found = r.brands.find((b) => b.brand_name === brandName);
      setBrandInfo(found || null);
    });
    fetchClips().then((clips) => {
      setBrandClips(clips.filter((c) => c.brands.includes(brandName)));
    });
  }, [brandName]);

  const avgGrip = brandAudits.length > 0
    ? (brandAudits.reduce((s, a) => s + a.gripSuccessRate, 0) / brandAudits.length).toFixed(1)
    : "—";
  const avgStress = brandAudits.length > 0
    ? (brandAudits.reduce((s, a) => s + a.stressEventOutcome, 0) / brandAudits.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <FadeIn>
              <div>
                <p className="text-xs text-primary uppercase tracking-widest font-medium mb-4">Brand Intelligence Portal</p>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-2">{brandName}</h1>
                <p className="text-sm text-muted-foreground">
                  {brandInfo?.category || "Equipment"} · {brandInfo?.appearances || 0} appearances detected
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors">
                  <Download size={14} /> Download Report
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity">
                  <Calendar size={14} /> Schedule Briefing
                </button>
              </div>
            </FadeIn>
          </div>

          {/* KPI Row */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Grip Success Rate", value: `${avgGrip}%`, delta: "+2.1%" },
                { label: "Stress Event Outcome", value: `${avgStress}%`, delta: "+1.8%" },
                { label: "Clips w/ Brand", value: String(brandClips.length), delta: "" },
                { label: "Presence Score", value: `${brandInfo?.presence_percentage || 0}%`, delta: "" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-card border border-border rounded-lg p-5">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display text-2xl font-extrabold text-foreground">{kpi.value}</span>
                    {kpi.delta && <span className="text-sm text-primary font-medium">{kpi.delta}</span>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Equipment Performance Audit Table */}
          <FadeIn delay={0.15}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 size={14} className="text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Equipment Performance Audit</span>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Brand", "Model", "Grip %", "Stress %", "Avg Speed", "Control", "Durability", "Samples"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider font-medium">
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
                            <td className={`px-5 py-3 text-sm font-semibold ${isCurrentBrand ? "text-primary" : "text-foreground"}`}>{audit.brand}</td>
                            <td className="px-5 py-3 text-sm text-foreground/80">{audit.model}</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-foreground">{audit.gripSuccessRate}%</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-foreground">{audit.stressEventOutcome}%</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-foreground">{audit.avgShotSpeed} MPH</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-foreground">{audit.controlRating}</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-foreground">{audit.durabilityIndex}</td>
                            <td className="px-5 py-3 font-mono-data text-sm text-muted-foreground">{audit.sampleSize}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Clip Evidence */}
          {brandClips.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Clip Evidence — Brand Detected</span>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {brandClips.slice(0, 6).map((clip) => (
                    <div key={clip.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="aspect-video bg-background relative">
                        {clip.video_url && clip.video_url.startsWith("https://cdn.courtana.com/files/") ? (
                          <video
                            src={clip.video_url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                            onMouseLeave={(e) => {
                              const v = e.target as HTMLVideoElement;
                              v.pause();
                              v.currentTime = 0;
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video size={20} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-foreground font-medium mb-1 truncate">{clip.name}</p>
                        <div className="flex items-center gap-3">
                          <span className="font-mono-data text-xs text-primary">Q:{clip.quality_score}</span>
                          <span className="font-mono-data text-xs text-chart-2">V:{clip.viral_score}</span>
                          <span className="text-xs text-muted-foreground">{clip.story_arc?.replace(/_/g, " ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Bottom CTA */}
          <FadeIn delay={0.25}>
            <div className="bg-card border border-border rounded-lg p-10">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Want the Full Picture?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                This portal shows a sample of available intelligence. Full reports include trend analysis,
                competitive benchmarks, and actionable R&D recommendations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
                >
                  View All Products <ArrowRight size={12} />
                </Link>
                <Link
                  to="/sample-data"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-border text-foreground text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Browse Raw Datasets
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
