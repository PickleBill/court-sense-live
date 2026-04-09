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
              <Link to="/marketplace" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
              <Link to="/highlights" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Highlights</Link>
              <Link to="/sample-data" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Sample Data</Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">Company</p>
              <span className="block text-sm text-muted-foreground">API Docs</span>
              <span className="block text-sm text-muted-foreground">Privacy</span>
              <span className="block text-sm text-muted-foreground">Terms</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            © 2025 CourtSense AI
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
