import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Activity, Clock, Wifi, Database, Zap, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const globalStats = [
  { label: "TOTAL POINTS TRACKED", value: "2,847,391", icon: Activity, delta: "+12.4%" },
  { label: "AVG REACTION TIME", value: "0.34s", icon: Clock, delta: "-8.2%" },
  { label: "ACTIVE COURTS", value: "12", icon: Wifi, delta: "+3" },
  { label: "DATA EVENTS TODAY", value: "48,291", icon: Database, delta: "+22.1%" },
];

const liveFeed = [
  { court: "Court 1", player: "A. Martinez", handSpeed: "38 MPH", xp: "Level 8", status: "active" },
  { court: "Court 2", player: "J. Chen", handSpeed: "42 MPH", xp: "Level 12", status: "active" },
  { court: "Court 3", player: "M. Johnson", handSpeed: "35 MPH", xp: "Level 6", status: "active" },
  { court: "Court 4", player: "S. Williams", handSpeed: "51 MPH", xp: "Level 15", status: "active" },
];

const extremeEvents = [
  { id: 1, text: "62 MPH Smash detected", location: "Court 4", time: "2m ago", severity: "high" },
  { id: 2, text: "Diving Save recorded", location: "Court 1", time: "5m ago", severity: "medium" },
  { id: 3, text: "Rally exceeded 45 shots", location: "Court 2", time: "8m ago", severity: "low" },
  { id: 4, text: "Reaction time < 0.2s", location: "Court 3", time: "12m ago", severity: "high" },
  { id: 5, text: "Triple dink sequence", location: "Court 1", time: "15m ago", severity: "medium" },
  { id: 6, text: "58 MPH Cross-court winner", location: "Court 2", time: "18m ago", severity: "high" },
];

function DashboardPage() {
  const [generatingClip, setGeneratingClip] = useState<number | null>(null);

  const handleGenerateClip = (id: number) => {
    setGeneratingClip(id);
    setTimeout(() => {
      setGeneratingClip(null);
      toast.success("Clip generated successfully! Ready for export.", {
        description: "AR overlay applied. Available in Highlights.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1600px] mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Dashboard</h1>
              <p className="font-mono-data text-xs text-muted-foreground">Global court intelligence overview</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/5 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
              <span className="font-mono-data text-xs text-primary">LIVE</span>
            </div>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-6">
            {globalStats.map((stat) => (
              <div key={stat.label} className="bg-background p-4 group">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={14} className="text-primary" />
                  <span className="font-mono-data text-[10px] text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-data text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="font-mono-data text-xs text-primary">{stat.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Edge Ingestor Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-primary" />
                <span className="font-mono-data text-xs text-muted-foreground tracking-widest">EDGE INGESTOR — LIVE FEEDS</span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {liveFeed.map((feed) => (
                  <div key={feed.court} className="bg-card p-0 relative group overflow-hidden">
                    {/* Video placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-background to-card relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Wifi size={24} className="text-primary/30 mx-auto mb-2" />
                          <span className="font-mono-data text-xs text-muted-foreground">{feed.court} — RTSP Feed</span>
                        </div>
                      </div>

                      {/* Live overlay */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-destructive/80 px-1.5 py-0.5 rounded-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                        <span className="font-mono-data text-[9px] font-bold text-foreground">LIVE</span>
                      </div>

                      {/* Data overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="font-mono-data text-xs text-foreground font-medium">{feed.player}</p>
                            <p className="font-mono-data text-[10px] text-muted-foreground">{feed.court}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono-data text-xs text-primary font-bold">Hand Speed: {feed.handSpeed}</p>
                            <p className="font-mono-data text-[10px] text-muted-foreground">Player XP: {feed.xp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extreme Events */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-destructive" />
                <span className="font-mono-data text-xs text-muted-foreground tracking-widest">EXTREME EVENTS</span>
              </div>
              <div className="terminal-card divide-y divide-border">
                {extremeEvents.map((event) => (
                  <div key={event.id} className="p-3 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            event.severity === "high" ? "bg-destructive" :
                            event.severity === "medium" ? "bg-chart-3" : "bg-primary"
                          }`} />
                          <span className="font-mono-data text-xs text-foreground truncate">{event.text}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-data text-[10px] text-muted-foreground">@ {event.location}</span>
                          <span className="font-mono-data text-[10px] text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGenerateClip(event.id)}
                        disabled={generatingClip === event.id}
                        className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-sm bg-primary/10 text-primary font-mono-data text-[10px] font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
                      >
                        {generatingClip === event.id ? (
                          <span className="animate-pulse">Generating...</span>
                        ) : (
                          <>Generate Clip <ChevronRight size={10} /></>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
