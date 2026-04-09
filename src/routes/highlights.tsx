import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { fetchClips, fetchBrandRegistry, type RawClip } from "@/lib/data";
import { Video, Tag, Download, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/highlights")({
  component: HighlightsPage,
});

function HighlightsPage() {
  const [clips, setClips] = useState<RawClip[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [licensingClip, setLicensingClip] = useState<string | null>(null);

  useEffect(() => {
    fetchClips().then(setClips);
    fetchBrandRegistry().then((r) =>
      setBrands(r.brands.map((b) => b.brand_name))
    );
  }, []);

  const filteredClips = filter
    ? clips.filter((c) => c.brands.includes(filter))
    : clips;

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
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs text-primary uppercase tracking-widest font-medium mb-4">AR Media Library</p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Highlight Archive</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mb-10">
              AI-curated clips with brand detection, quality scoring, and AR overlay capabilities.
              License content for campaigns or export with automated brand placement.
            </p>
          </FadeIn>

          {/* Brand filter pills */}
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFilter(null)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  !filter
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                All Brands
              </button>
              {brands.slice(0, 6).map((b) => (
                <button
                  key={b}
                  onClick={() => setFilter(b)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    filter === b
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Clips grid — varied layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClips.map((clip, i) => (
              <FadeIn key={clip.id} delay={i * 0.04}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                  {/* Video area */}
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
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Video size={20} className="text-primary" />
                        </div>
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 rounded-md">
                      <span className="text-xs text-foreground">{clip.story_arc?.replace(/_/g, " ")}</span>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <span className="px-1.5 py-0.5 bg-primary/20 rounded-md font-mono-data text-xs text-primary font-semibold">
                        Q:{clip.quality_score}
                      </span>
                      <span className="px-1.5 py-0.5 bg-chart-2/20 rounded-md font-mono-data text-xs text-chart-2 font-semibold">
                        V:{clip.viral_score}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm text-foreground font-medium mb-3 truncate">{clip.name}</h3>

                    {/* Brand tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {clip.brands.map((brand) => (
                        <span key={brand} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/20">
                          <Tag size={9} className="text-primary" />
                          <span className="text-xs text-primary">{brand}</span>
                        </span>
                      ))}
                    </div>

                    {clip.caption && (
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{clip.caption}</p>
                    )}

                    {/* DaaS signals */}
                    {clip.daas_signals && (clip.daas_signals.watchability_score || clip.daas_signals.cinematic_score) && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {clip.daas_signals.watchability_score && (
                          <div className="bg-background rounded-md p-2">
                            <span className="text-[10px] text-muted-foreground block uppercase tracking-wider">Watchability</span>
                            <span className="font-mono-data text-sm text-foreground font-semibold">{clip.daas_signals.watchability_score}</span>
                          </div>
                        )}
                        {clip.daas_signals.cinematic_score && (
                          <div className="bg-background rounded-md p-2">
                            <span className="text-[10px] text-muted-foreground block uppercase tracking-wider">Cinematic</span>
                            <span className="font-mono-data text-sm text-foreground font-semibold">{clip.daas_signals.cinematic_score}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLicense(clip.id)}
                        disabled={licensingClip === clip.id}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {licensingClip === clip.id ? "Submitting..." : (
                          <><Download size={10} /> License Clip</>
                        )}
                      </button>
                      <button
                        onClick={() => handleExportAR(clip.id)}
                        className="flex items-center gap-1.5 px-3 py-2 border border-border text-foreground text-xs rounded-md hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <Sparkles size={10} /> AR Export
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
