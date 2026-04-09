import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";

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
        <FadeIn>
          <div className="text-center mb-8">
            <p className="font-display text-2xl font-extrabold text-foreground">
              Court<span className="text-primary">Sense</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">Enterprise Data Marketplace Access</p>
          </div>
        </FadeIn>

        {submitted ? (
          <FadeIn>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-foreground font-medium">Access Granted</p>
              <p className="text-sm text-muted-foreground mt-1">Loading data marketplace...</p>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md"
              >
                Enter Marketplace <ArrowRight size={12} />
              </Link>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.05}>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5">
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    placeholder="brand@manufacturer.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Sign In
                <ArrowRight size={14} />
              </button>
            </form>
          </FadeIn>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to CourtSense</Link>
        </p>
      </div>
    </div>
  );
}
