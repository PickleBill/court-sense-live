import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <p className="font-display text-lg font-extrabold text-foreground tracking-tight mb-2">
              Court<span className="text-primary">Sense</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Enterprise data marketplace turning passive court video into kinetic intelligence.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Product</p>
              <Link to="/clips" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Clip Explorer</Link>
              <Link to="/brands" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Brand Intelligence</Link>
              <Link to="/buyer-lens" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Buyer Lens</Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Company</p>
              <span className="block text-sm text-muted-foreground">API Docs</span>
              <span className="block text-sm text-muted-foreground">Privacy</span>
              <span className="block text-sm text-muted-foreground">Terms</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
          © {new Date().getFullYear()} CourtSense AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
