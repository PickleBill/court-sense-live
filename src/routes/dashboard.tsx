import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRedirect,
});

function DashboardRedirect() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono-data text-sm text-muted-foreground mb-4">
          The dashboard has moved to the Data Marketplace.
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono-data text-sm font-bold rounded-sm"
        >
          Go to Marketplace <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
