import { Link, useLocation } from "@tanstack/react-router";
import { Activity, Menu, X, LogOut, User, Database } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Marketplace", to: "/marketplace" },
  { label: "Highlights", to: "/highlights" },
  { label: "Sample Data", to: "/sample-data" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center">
            <Activity size={16} className="text-primary-foreground" />
          </div>
          <span className="font-mono-data text-sm font-bold text-primary tracking-tight">
            CourtSense<span className="text-foreground">.ai</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 text-xs font-mono-data font-medium rounded-sm transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 border border-primary/20">
            <Database size={12} className="text-primary" />
            <span className="font-mono-data text-xs text-primary">2,478 Clips · 6 Brands</span>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono-data"
          >
            <User size={14} />
            <span>Login</span>
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 font-mono-data text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
