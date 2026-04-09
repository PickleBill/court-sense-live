import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-sm bg-primary flex items-center justify-center mx-auto mb-4">
            <Activity size={24} className="text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">CourtSense AI</h1>
          <p className="font-mono-data text-xs text-muted-foreground mt-1">Secure Terminal Access</p>
        </div>

        {submitted ? (
          <div className="terminal-card p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Activity size={20} className="text-primary" />
            </div>
            <p className="text-sm text-foreground font-medium">Access Granted</p>
            <p className="font-mono-data text-xs text-muted-foreground mt-1">Redirecting to terminal...</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground font-mono-data text-xs font-bold rounded-sm"
            >
              Enter Dashboard <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="terminal-card p-6 space-y-4">
            <div>
              <label className="font-mono-data text-xs text-muted-foreground block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-sm pl-9 pr-3 py-2 font-mono-data text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                  placeholder="operator@courtsense.ai"
                  required
                />
              </div>
            </div>
            <div>
              <label className="font-mono-data text-xs text-muted-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-sm pl-9 pr-3 py-2 font-mono-data text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono-data text-sm font-bold py-2.5 rounded-sm hover:opacity-90 transition-opacity glow-green-subtle"
            >
              Authenticate
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="text-center font-mono-data text-xs text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to CourtSense AI</Link>
        </p>
      </div>
    </div>
  );
}
