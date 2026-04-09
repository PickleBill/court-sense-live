import { createFileRoute } from "@tanstack/react-router";
import { getBrandIntelligence, getSponsorshipWhitespace } from "@/lib/clips-data";
import FadeIn from "@/components/FadeIn";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/brands")({
  component: BrandIntelligence,
});

function BrandIntelligence() {
  const brands = getBrandIntelligence();
  const whitespace = getSponsorshipWhitespace();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-foreground">Brand Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Cross-clip brand detection, visibility metrics, and sponsorship opportunity mapping</p>
      </FadeIn>

      {/* Brand Overview Table */}
      <FadeIn delay={0.05}>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Brand Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground uppercase tracking-wider border-b border-border bg-accent/30">
                  <th className="text-left py-3 px-4">Brand</th>
                  <th className="text-center py-3 px-4">Appearances</th>
                  <th className="text-center py-3 px-4">Clips</th>
                  <th className="text-left py-3 px-4">Categories</th>
                  <th className="text-center py-3 px-4">Visibility (s)</th>
                  <th className="text-center py-3 px-4">High Conf.</th>
                  <th className="text-center py-3 px-4">Med Conf.</th>
                </tr>
              </thead>
              <tbody>
                {brands.map(b => (
                  <tr key={b.name} className="border-b border-border/50 hover:bg-accent/20 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{b.name}</td>
                    <td className="py-3 px-4 text-center font-mono-data text-foreground">{b.appearances}</td>
                    <td className="py-3 px-4 text-center font-mono-data text-foreground">{b.clips.length}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {b.categories.map(c => (
                          <span key={c} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] capitalize">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono-data text-foreground">{b.totalVisibilitySeconds}</td>
                    <td className="py-3 px-4 text-center font-mono-data text-success">{b.confidences.high}</td>
                    <td className="py-3 px-4 text-center font-mono-data text-chart-4">{b.confidences.medium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Sponsorship Whitespace */}
      <FadeIn delay={0.1}>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">Sponsorship Whitespace Report</h2>
          <p className="text-xs text-muted-foreground mb-4">Categories with no brand presence represent sponsorship opportunities</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {whitespace.map(w => (
              <div
                key={w.category}
                className={`rounded-lg p-3 border ${w.filled ? "bg-success/5 border-success/30" : "bg-muted/30 border-border"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {w.filled ? (
                    <Check size={12} className="text-success" />
                  ) : (
                    <X size={12} className="text-muted-foreground" />
                  )}
                  <span className="text-xs text-foreground font-medium capitalize">{w.category}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {w.filled ? w.brand : "No brand detected — opportunity"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
