import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" />
            <span className="font-mono-data text-xs text-muted-foreground">
              © 2025 CourtSense AI. Enterprise Data Marketplace for Sports Intelligence.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {["API Docs", "Data Privacy", "Manufacturer Terms"].map((label) => (
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
      </div>
    </footer>
  );
}
