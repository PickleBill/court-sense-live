import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, BarChart3, Database, Shield, TrendingUp, Zap, Video } from "lucide-react";

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
            <span className="font-mono-data text-xs text-primary">ENTERPRISE DATA MARKETPLACE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-foreground leading-[1.05] mb-6 scan-line">
            Turn Court Video
            <br />
            <span className="text-primary">Into Revenue</span>
          </h1>

          <p className="font-mono-data text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Passive camera infrastructure generates kinetic intelligence worth millions.
            We extract, package, and sell performance data to brands, manufacturers, and betting markets.
          </p>

          <p className="font-mono-data text-xs text-muted-foreground/60 max-w-xl mx-auto mb-8">
            Zero new hardware. Your existing Reolink cameras are already capturing the data.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono-data text-sm font-bold rounded-sm hover:opacity-90 transition-opacity glow-green"
            >
              <Database size={16} />
              Explore the Data
            </Link>
            <Link
              to="/sample-data"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-mono-data text-sm rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
            >
              See Live Proof
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats strip — real numbers */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border/30">
            {[
              { value: "2,478", label: "CLIPS ANALYZED" },
              { value: "6", label: "BRANDS DETECTED" },
              { value: "847K+", label: "DATA POINTS EXTRACTED" },
              { value: "47TB", label: "VIDEO PROCESSED" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono-data text-2xl font-bold text-primary">{stat.value}</p>
                <p className="font-mono-data text-[10px] text-muted-foreground tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">The Opportunity</h2>
          <p className="font-mono-data text-sm text-muted-foreground mb-12">Every court is a data asset hiding in plain sight</p>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            <div className="bg-background p-8">
              <span className="font-mono-data text-xs text-destructive tracking-widest mb-4 block">THE PROBLEM</span>
              <ul className="space-y-3">
                {[
                  "Billions spent on sports sponsorship with zero performance attribution",
                  "Brands can't measure how their equipment actually performs in real play",
                  "Courts generate terabytes of video data that sits unused on DVRs",
                  "No standardized kinetic dataset for equipment R&D or betting models",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                    <span className="font-mono-data text-xs text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8">
              <span className="font-mono-data text-xs text-primary tracking-widest mb-4 block">THE SOLUTION</span>
              <ul className="space-y-3">
                {[
                  "Extract kinetic intelligence from existing Reolink camera infrastructure",
                  "Equipment Performance Audits — grip success %, stress event outcomes",
                  "AR highlight generation with automated brand placement verification",
                  "Standardized data marketplace for manufacturers, sponsors, and betting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="font-mono-data text-xs text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="py-20 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Three Revenue Verticals</h2>
          <p className="font-mono-data text-sm text-muted-foreground mb-12">Data products for every buyer in the ecosystem</p>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: BarChart3,
                label: "P1 — PRIORITY",
                title: "Brand Intelligence",
                desc: "Equipment performance audits for manufacturers. How does your paddle perform in a 62 MPH smash? Grip success rates, stress outcomes, competitive benchmarks.",
                metric: "$2,500/mo per brand",
              },
              {
                icon: Video,
                label: "P2 — ACTIVE",
                title: "Automated Media",
                desc: "AR highlight clips with verified brand placement. Revenue-ready content for marketing campaigns with viral score optimization.",
                metric: "$1,200/mo per venue",
              },
              {
                icon: TrendingUp,
                label: "P3 — ROADMAP",
                title: "Predictive & Betting",
                desc: "Real-time win probability, fatigue index, tactical geometry. ML-ready training payloads for prediction model development.",
                metric: "Custom pricing",
              },
            ].map((stream) => (
              <div key={stream.title} className="bg-background p-8 group hover:bg-card transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <stream.icon size={16} className="text-primary" />
                  <span className="font-mono-data text-[10px] text-primary tracking-widest">{stream.label}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{stream.title}</h3>
                <p className="font-mono-data text-xs text-muted-foreground leading-relaxed mb-4">{stream.desc}</p>
                <span className="font-mono-data text-xs text-primary font-bold">{stream.metric}</span>
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
                <span className="font-mono-data text-xs text-primary">BRAND BUYER PERSPECTIVE</span>
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
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">See the Data for Yourself</h2>
          <p className="font-mono-data text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
            Browse real clips, equipment audits, and tactical datasets extracted from existing court cameras.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono-data text-sm font-bold rounded-sm glow-green hover:opacity-90 transition-opacity"
            >
              <Zap size={14} />
              Explore Data Products
            </Link>
            <Link
              to="/sample-data"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground font-mono-data text-sm rounded-sm hover:border-primary/50 hover:text-primary transition-colors"
            >
              View Sample Datasets
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" />
            <span className="font-mono-data text-xs text-muted-foreground">
              © 2025 CourtSense AI. Enterprise Data Marketplace for Sports Intelligence.
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
