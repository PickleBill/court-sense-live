import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Video, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — left-aligned, asymmetric */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">
              Enterprise Data Marketplace
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.05] max-w-4xl">
              Turn court video
              <br />
              into <span className="text-primary">revenue</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
              Passive camera infrastructure generates kinetic intelligence worth millions.
              We extract, package, and sell performance data to brands, manufacturers, and betting markets.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-sm text-muted-foreground/60 mt-3 max-w-md">
              Zero new hardware. Your existing Reolink cameras are already capturing the data.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Explore the Data
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/sample-data"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
              >
                See Live Proof
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats strip */}
      <section ref={statsRef} className="border-t border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
            {[
              { value: 2478, suffix: "", label: "Clips Analyzed" },
              { value: 6, suffix: "", label: "Brands Detected" },
              { value: 847, suffix: "K+", label: "Data Points Extracted" },
              { value: 47, suffix: "TB", label: "Video Processed" },
            ].map((stat, i) => (
              <div key={stat.label} className={i === 0 ? "text-left" : i === 3 ? "text-right" : "text-center"}>
                <p className="font-display text-3xl font-extrabold text-primary">
                  <CountUp target={stat.value} suffix={stat.suffix} active={statsInView} />
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">The Opportunity</h2>
            <p className="text-sm text-muted-foreground mb-16 max-w-lg">
              Every court is a data asset hiding in plain sight.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <FadeIn delay={0.05}>
              <div>
                <p className="text-xs text-destructive uppercase tracking-widest font-medium mb-6">The Problem</p>
                <ul className="space-y-4">
                  {[
                    "Billions spent on sports sponsorship with zero performance attribution",
                    "Brands can't measure how their equipment performs in real play",
                    "Courts generate terabytes of video that sits unused on DVRs",
                    "No standardized kinetic dataset for equipment R&D or betting models",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <p className="text-xs text-primary uppercase tracking-widest font-medium mb-6">The Solution</p>
                <ul className="space-y-4">
                  {[
                    "Extract kinetic intelligence from existing Reolink camera infrastructure",
                    "Equipment Performance Audits — grip success %, stress event outcomes",
                    "AR highlight generation with automated brand placement verification",
                    "Standardized data marketplace for manufacturers, sponsors, and betting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Revenue Streams — varied card sizes */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">Three Revenue Verticals</h2>
            <p className="text-sm text-muted-foreground mb-16">Data products for every buyer in the ecosystem.</p>
          </FadeIn>

          <div className="grid md:grid-cols-12 gap-6">
            {[
              {
                icon: BarChart3,
                label: "P1 — Priority",
                title: "Brand Intelligence",
                desc: "Equipment performance audits for manufacturers. How does your paddle perform in a 62 MPH smash? Grip success rates, stress outcomes, competitive benchmarks.",
                metric: "$2,500/mo per brand",
                span: "md:col-span-5",
              },
              {
                icon: Video,
                label: "P2 — Active",
                title: "Automated Media",
                desc: "AR highlight clips with verified brand placement. Revenue-ready content for marketing campaigns with viral score optimization.",
                metric: "$1,200/mo per venue",
                span: "md:col-span-4",
              },
              {
                icon: TrendingUp,
                label: "P3 — Roadmap",
                title: "Predictive & Betting",
                desc: "Real-time win probability, fatigue index, tactical geometry. ML-ready training payloads.",
                metric: "Custom pricing",
                span: "md:col-span-3",
              },
            ].map((stream, i) => (
              <FadeIn key={stream.title} delay={i * 0.08} className={stream.span}>
                <div className="bg-card border border-border rounded-lg p-8 h-full hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-6">
                    <stream.icon size={16} className="text-primary" />
                    <span className="text-xs text-primary uppercase tracking-widest">{stream.label}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{stream.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{stream.desc}</p>
                  <span className="font-mono-data text-sm text-primary font-semibold">{stream.metric}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-5 gap-6">
            <FadeIn className="md:col-span-3">
              <div className="bg-card border border-border rounded-lg p-8">
                <p className="text-xs text-primary uppercase tracking-widest font-medium mb-4">Investor Perspective</p>
                <p className="text-foreground/80 leading-relaxed">
                  "The pivot to an Enterprise Data Play significantly increases TAM. The 'Bloomberg Terminal for Sports'
                  analogy is strong. Quality of CV models on low-cost Reolink sensors is the technical hurdle to clear."
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8">
                <p className="text-xs text-primary uppercase tracking-widest font-medium mb-4">Brand Buyer</p>
                <p className="text-foreground/80 leading-relaxed">
                  "Being able to show a brand exactly how their paddle performs in a 62 MPH smash is a level of leverage
                  coaching has never had."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-4">See the Data for Yourself</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-lg">
              Browse real clips, equipment audits, and tactical datasets extracted from existing court cameras.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Explore Data Products
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/sample-data"
                className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
              >
                View Sample Datasets
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
