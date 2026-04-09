import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hustleIndexData, equipmentAudits, tacticalGeometryData } from "@/lib/data";
import { Database, Activity, Shield, TrendingUp, Code, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sample-data")({
  component: SampleDataPage,
});

type Tab = "hustle" | "equipment" | "tactical" | "api";

function SampleDataPage() {
  const [activeTab, setActiveTab] = useState<Tab>("hustle");

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: "hustle", label: "Dataset A: Hustle Index", icon: Activity },
    { id: "equipment", label: "Dataset B: Equipment Audit", icon: Shield },
    { id: "tactical", label: "Dataset C: Tactical Geometry", icon: TrendingUp },
    { id: "api", label: "API Preview", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 mb-4">
              <Database size={12} className="text-primary" />
              <span className="font-mono-data text-xs text-primary">PROOF LAYER — INVESTOR DEMO</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Sample Datasets</h1>
            <p className="font-mono-data text-sm text-muted-foreground max-w-2xl">
              Real data extracted from existing Reolink court cameras. Zero new hardware.
              These datasets demonstrate the depth and quality of kinetic intelligence available for monetization.
            </p>
          </div>

          {/* Info banner */}
          <div className="flex items-center gap-3 p-4 mb-8 rounded-sm border border-primary/20 bg-primary/5">
            <Zap size={16} className="text-primary shrink-0" />
            <p className="font-mono-data text-xs text-foreground/80">
              All data below is generated from passive video analysis of existing court cameras.
              No wearables. No additional sensors. The cameras are already there.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-6 border-b border-border pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 font-mono-data text-xs font-medium rounded-t-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-card text-primary border border-border border-b-background -mb-px"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="terminal-card overflow-hidden">
            {activeTab === "hustle" && <HustleTable />}
            {activeTab === "equipment" && <EquipmentTable />}
            {activeTab === "tactical" && <TacticalTable />}
            {activeTab === "api" && <APIPreview />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function HustleTable() {
  return (
    <div>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-mono-data text-xs text-primary tracking-widest">DATASET A — HUSTLE INDEX (BIOMETRIC LOAD)</h3>
        <p className="font-mono-data text-[11px] text-muted-foreground mt-1">Player effort quantification from court movement analysis</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Player ID", "Hustle Score", "Distance (ft)", "Sprints", "Avg Recovery (s)", "Dive Saves", "Bio Load"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono-data text-[10px] text-muted-foreground tracking-widest font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hustleIndexData.map((row) => (
              <tr key={row.playerId} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono-data text-xs text-primary font-bold">{row.playerId}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.hustleScore}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.distanceCovered.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.sprintEvents}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.avgRecoveryTime}s</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.diveSaves}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">
                  <span className={`inline-block w-16 h-1.5 rounded-full bg-border relative overflow-hidden`}>
                    <span className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${row.biometricLoad}%` }} />
                  </span>
                  <span className="ml-2 text-muted-foreground">{row.biometricLoad}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EquipmentTable() {
  return (
    <div>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-mono-data text-xs text-primary tracking-widest">DATASET B — EQUIPMENT PERFORMANCE AUDIT</h3>
        <p className="font-mono-data text-[11px] text-muted-foreground mt-1">Brand equipment analysis from CV-detected usage in live play</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Brand", "Model", "Grip Success %", "Stress Outcome %", "Avg Shot Speed", "Control", "Durability", "Samples"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono-data text-[10px] text-muted-foreground tracking-widest font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {equipmentAudits.map((row) => (
              <tr key={`${row.brand}-${row.model}`} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono-data text-xs text-primary font-bold">{row.brand}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground/80">{row.model}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.gripSuccessRate}%</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.stressEventOutcome}%</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.avgShotSpeed} MPH</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.controlRating}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.durabilityIndex}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">{row.sampleSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TacticalTable() {
  return (
    <div>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-mono-data text-xs text-primary tracking-widest">DATASET C — TACTICAL GEOMETRY</h3>
        <p className="font-mono-data text-[11px] text-muted-foreground mt-1">Game state analysis with real-time win probability and court geometry</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Match ID", "Game State", "Win Prob %", "Court Coverage %", "Shot Angle°", "Rally Len", "Tactical Pattern"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono-data text-[10px] text-muted-foreground tracking-widest font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tacticalGeometryData.map((row) => (
              <tr key={row.matchId} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 font-mono-data text-xs text-primary font-bold">{row.matchId}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.gameState}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">
                  <span className={row.winProbability > 60 ? "text-primary" : row.winProbability < 40 ? "text-destructive" : "text-foreground"}>
                    {row.winProbability}%
                  </span>
                </td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.courtCoverage}%</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.shotAngle}°</td>
                <td className="px-4 py-3 font-mono-data text-xs text-foreground">{row.rallyLength}</td>
                <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">{row.tacticalPattern}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function APIPreview() {
  const samplePayload = {
    endpoint: "GET /api/v1/intelligence/joola",
    response: {
      brand: "JOOLA",
      equipment_audits: [
        {
          model: "Hyperion CFS 16",
          grip_success_rate: 94.2,
          stress_event_outcome: 87.1,
          avg_shot_speed_mph: 48.3,
          sample_size: 342,
        },
      ],
      clip_evidence: [
        {
          clip_id: "clip-001",
          video_url: "https://cdn.courtana.com/clips/clip-001.mp4",
          quality_score: 92,
          viral_score: 88,
          brands_detected: ["JOOLA", "SKECHERS"],
        },
      ],
      meta: {
        generated_at: new Date().toISOString(),
        data_source: "reolink_edge_ingestor_v2",
        venues_sampled: 5,
        total_clips_analyzed: 2478,
      },
    },
  };

  return (
    <div>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-mono-data text-xs text-primary tracking-widest">API RESPONSE PREVIEW</h3>
        <p className="font-mono-data text-[11px] text-muted-foreground mt-1">ML-ready JSON payload structure for data integrations</p>
      </div>
      <div className="p-4">
        <pre className="font-mono-data text-[11px] text-foreground/80 overflow-x-auto leading-relaxed">
          {JSON.stringify(samplePayload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
