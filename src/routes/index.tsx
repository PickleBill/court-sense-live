import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Activity, Zap, Video, BarChart3, ArrowRight, Shield, Cpu } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-border/20" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-border/10" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-border/5" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-border/10" />
          <div className="absolute top-0 left-2/4 h-full w-px bg-border/10" />
          <div className="absolute top-0 left-3/4 h-full w-px bg-border/10" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
            <span className="font-mono-data text-xs text-primary">LIVE DATA INTELLIGENCE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-foreground leading-[1.05] mb-6 scan-line">
            The Bloomberg Terminal
            <br />
            <span className="text-primary">for Sports Data</span>
          </h1>

          <p className="font-mono-data text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Extract value from your existing court video infrastructure. Real-time analytics,
            AR highlight generation, and kinetic data monetization for venues and manufacturers.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono-data text-sm font-bold rounded-sm hover:opacity-90 transition-opacity glow-green"
            >
              <Activity size={16} />
              Access Terminal
            </Link>
            <Link
              to="/connect-court"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono-data text-sm rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
            >
              Connect Your Court
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border/30">
            {[
              { value: "2.4M+", label: "POINTS TRACKED" },
              { value: "12", label: "ACTIVE COURTS" },
              { value: "0.3ms", label: "AVG LATENCY" },
              { value: "47TB", label: "DATA PROCESSED" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono-data text-2xl font-bold text-primary">{stat.value}</p>
                <p className="font-mono-data text-[10px] text-muted-foreground tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Platform Architecture</h2>
          <p className="font-mono-data text-sm text-muted-foreground mb-12">Four pillars of kinetic intelligence</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              {
                icon: Cpu,
                title: "Edge Ingestor",
                desc: "Extract kinetic data from existing Reolink cameras. Zero new hardware required.",
              },
              {
                icon: Zap,
                title: "Kinetic Intelligence",
                desc: "Real-time reaction times, shot speeds, and court compression analytics.",
              },
              {
                icon: Video,
                title: "Highlight Architect",
                desc: "Revenue-ready clips with AR overlays and automated brand placement.",
              },
              {
                icon: BarChart3,
                title: "Data Marketplace",
                desc: "Monetize performance data. Sell kinetic insights to manufacturers and sponsors.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-background p-8 group hover:bg-card transition-colors">
                <feature.icon size={24} className="text-primary mb-4" />
                <h3 className="font-display text-base font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="font-mono-data text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="terminal-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-primary" />
                <span className="font-mono-data text-xs text-primary">INVESTOR PERSPECTIVE</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                "The pivot to an Enterprise Data Play significantly increases TAM. The 'Bloomberg Terminal for Sports'
                analogy is strong. Quality of CV models on low-cost Reolink sensors is the technical hurdle to clear."
              </p>
            </div>
            <div className="terminal-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-primary" />
                <span className="font-mono-data text-xs text-primary">CUSTOMER PERSPECTIVE</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                "Being able to show a brand exactly how their paddle performs in a 62 MPH smash is a level of leverage
                coaching has never had. If it's plug-and-play with my Reolinks, this changes everything."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Start Extracting Value Today</h2>
          <p className="font-mono-data text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
            Connect your existing court cameras. Begin generating kinetic intelligence in under 5 minutes.
          </p>
          <Link
            to="/connect-court"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono-data text-sm font-bold rounded-sm glow-green hover:opacity-90 transition-opacity"
          >
            Integrate Edge Stream
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" />
            <span className="font-mono-data text-xs text-muted-foreground">
              © 2024 CourtSense AI. Kinetic Intelligence for Global Athletics.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {["API Docs", "Data Privacy Policy", "Manufacturer Terms"].map((label) => (
              <span key={label} className="font-mono-data text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                {label}
              </span>
            ))}
            <span className="flex items-center gap-1.5 font-mono-data text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              System Status
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
