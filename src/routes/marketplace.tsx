import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Video, Database, Shield, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
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
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs text-primary uppercase tracking-widest font-medium mb-4">Data Product Catalog</p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Data Marketplace</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mb-16">
              Court-derived intelligence products for brands, manufacturers, and analytics teams.
              Every dataset is extracted from passive camera infrastructure — zero new hardware required.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-12 gap-6 mb-20">
            {dataProducts.map((product, i) => {
              const Icon = iconMap[product.id] || Database;
              const spans = ["md:col-span-5", "md:col-span-4", "md:col-span-3"];
              return (
                <FadeIn key={product.id} delay={i * 0.08} className={spans[i]}>
                  <div className="bg-card border border-border rounded-lg p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                      <Icon size={20} className="text-primary" />
                      <span className={`text-xs tracking-widest px-2 py-0.5 rounded-md ${
                        product.priority === "P1"
                          ? "bg-primary/10 text-primary"
                          : product.priority === "P2"
                          ? "bg-chart-2/10 text-chart-2"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {product.tier}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{product.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{product.description}</p>

                    <ul className="space-y-2.5 mb-6">
                      {product.metrics.map((m) => (
                        <li key={m} className="flex items-center gap-2">
                          <Check size={12} className="text-primary shrink-0" />
                          <span className="text-sm text-foreground/80">{m}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-5 border-t border-border">
                      <span className="font-mono-data text-sm font-semibold text-primary">{product.price}</span>
                      <Link
                        to={product.ctaLink as "/marketplace"}
                        className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {product.cta} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Trust Section */}
          <FadeIn>
            <div className="bg-card border border-border rounded-lg p-10 text-center">
              <Shield size={24} className="text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Enterprise-Grade Data Security</h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
                All data is processed on-premises via Edge Ingestors. No raw video leaves the venue.
                Only anonymized kinetic signals and brand detection metadata enter the marketplace.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["SOC 2 Compliant", "GDPR Ready", "On-Prem Processing", "Anonymized Data"].map((badge) => (
                  <span key={badge} className="text-xs text-muted-foreground tracking-widest px-4 py-2 border border-border rounded-md">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
