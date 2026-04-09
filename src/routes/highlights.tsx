import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockClips, mockBrands } from "@/lib/data";
import { Video, Tag, Download, Sparkles, Film } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/highlights")({
  component: HighlightsPage,
});

function HighlightsPage() {
  const [licensingClip, setLicensingClip] = useState<string | null>(null);

  const handleLicense = (id: string) => {
    setLicensingClip(id);
    setTimeout(() => {
      setLicensingClip(null);
      toast.success("License request submitted", {
        description: "Our team will send usage terms within 24 hours.",
      });
    }, 1500);
  };

  const handleExportAR = (id: string) => {
    toast.success(`AR overlay export started for ${id}`, {
      description: "Rendering with brand placement. ETA: ~30 seconds.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-4">
              <Film size={12} className="text-primary" />
              <span className="font-mono-data text-xs text-primary">AR MEDIA LIBRARY</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Highlight Archive</h1>
            <p className="font-mono-data text-sm text-muted-foreground max-w-2xl">
              AI-curated clips with brand detection, quality scoring, and AR overlay capabilities.
              License content for campaigns or export with automated brand placement.
            </p>
          </div>

          {/* Brand filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 rounded-sm bg-primary/10 text-primary font-mono-data text-xs font-medium border border-primary/30">
              All Brands
            </span>
            {mockBrands.slice(0, 5).map((b) => (
              <span key={b.brand_name} className="px-3 py-1 rounded-sm bg-card text-muted-foreground font-mono-data text-xs border border-border hover:border-primary/30 hover:text-foreground cursor-pointer transition-colors">
                {b.brand_name}
              </span>
            ))}
          </div>

          {/* Clips grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockClips.map((clip) => (
              <div key={clip.id} className="terminal-card overflow-hidden group">
                {/* Video area */}
                <div className="aspect-video bg-gradient-to-br from-background to-card relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Video size={20} className="text-primary" />
                    </div>
                  </div>
                  {/* Story arc badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 rounded-sm">
                    <span className="font-mono-data text-[10px] text-foreground">{clip.story_arc}</span>
                  </div>
                  {/* Scores */}
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <span className="px-1.5 py-0.5 bg-primary/20 rounded-sm font-mono-data text-[10px] text-primary font-bold">
                      Q:{clip.quality_score}
                    </span>
                    <span className="px-1.5 py-0.5 bg-chart-2/20 rounded-sm font-mono-data text-[10px] text-chart-2 font-bold">
                      V:{clip.viral_score}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-mono-data text-sm text-foreground font-medium mb-2 truncate">{clip.name}</h3>

                  {/* Brand tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {clip.brands.map((brand) => (
                      <span key={brand} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-primary/5 border border-primary/20">
                        <Tag size={9} className="text-primary" />
                        <span className="font-mono-data text-[10px] text-primary">{brand}</span>
                      </span>
                    ))}
                  </div>

                  {clip.commentary && (
                    <p className="font-mono-data text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">{clip.commentary}</p>
                  )}

                  {/* Score grid */}
                  {(clip.watchability_score || clip.cinematic_score) && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-background rounded-sm p-2">
                        <span className="font-mono-data text-[9px] text-muted-foreground block">WATCHABILITY</span>
                        <span className="font-mono-data text-sm text-foreground font-bold">{clip.watchability_score}</span>
                      </div>
                      <div className="bg-background rounded-sm p-2">
                        <span className="font-mono-data text-[9px] text-muted-foreground block">CINEMATIC</span>
                        <span className="font-mono-data text-sm text-foreground font-bold">{clip.cinematic_score}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLicense(clip.id)}
                      disabled={licensingClip === clip.id}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground font-mono-data text-[10px] font-bold rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {licensingClip === clip.id ? "Submitting..." : (
                        <><Download size={10} /> License Clip</>
                      )}
                    </button>
                    <button
                      onClick={() => handleExportAR(clip.id)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-border text-foreground font-mono-data text-[10px] rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <Sparkles size={10} /> AR Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
