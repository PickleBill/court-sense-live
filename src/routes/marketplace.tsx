import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Video, Zap, Database, Shield, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dataProducts } from "@/lib/data";

export const Route = createFileRoute("/marketplace")({
  component: MarketplacePage,
});

const iconMap: Record<string, typeof BarChart3> = {
  "brand-intel": BarChart3,
  "ar-highlights": Video,
  "raw-api": Database,
};

function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-4">
              <Zap size={12} className="text-primary" />
              <span className="font-mono-data text-xs text-primary">DATA PRODUCT CATALOG</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Data Marketplace</h1>
            <p className="font-mono-data text-sm text-muted-foreground max-w-2xl">
              Court-derived intelligence products for brands, manufacturers, and analytics teams.
              Every dataset is extracted from passive camera infrastructure — zero new hardware required.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-border mb-16">
            {dataProducts.map((product) => {
              const Icon = iconMap[product.id] || Database;
              return (
                <div key={product.id} className="bg-background p-8 flex flex-col group hover:bg-card transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={24} className="text-primary" />
                    <span className={`font-mono-data text-[10px] tracking-widest px-2 py-0.5 rounded-sm ${
                      product.priority === "P1"
                        ? "bg-primary/10 text-primary"
                        : product.priority === "P2"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {product.tier}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="font-mono-data text-xs text-muted-foreground leading-relaxed mb-6 flex-1">{product.description}</p>

                  <ul className="space-y-2 mb-6">
                    {product.metrics.map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <Check size={12} className="text-primary shrink-0" />
                        <span className="font-mono-data text-xs text-foreground/80">{m}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-mono-data text-sm font-bold text-primary">{product.price}</span>
                    <Link
                      to={product.ctaLink as "/marketplace"}
                      className="inline-flex items-center gap-1 font-mono-data text-xs text-foreground hover:text-primary transition-colors"
                    >
                      {product.cta} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Section */}
          <div className="terminal-card p-8 text-center">
            <Shield size={24} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Enterprise-Grade Data Security</h3>
            <p className="font-mono-data text-xs text-muted-foreground max-w-lg mx-auto mb-6">
              All data is processed on-premises via Edge Ingestors. No raw video leaves the venue.
              Only anonymized kinetic signals and brand detection metadata enter the marketplace.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["SOC 2 Compliant", "GDPR Ready", "On-Prem Processing", "Anonymized Data"].map((badge) => (
                <span key={badge} className="font-mono-data text-[10px] text-muted-foreground tracking-widest px-3 py-1 border border-border rounded-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
