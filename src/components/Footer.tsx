import { Activity } from "lucide-react";

const footerLinks = [
  { label: "API Docs", href: "#" },
  { label: "Data Privacy Policy", href: "#" },
  { label: "Manufacturer Terms", href: "#" },
  { label: "System Status", href: "#", status: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" />
            <span className="font-mono-data text-xs text-muted-foreground">
              © 2024 CourtSense AI. Kinetic Intelligence for Global Athletics.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 font-mono-data text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.status && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
