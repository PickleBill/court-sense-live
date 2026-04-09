import { createFileRoute } from "@tanstack/react-router";
import { MULTI_ANGLE_DATA, CLIPS_DATA } from "@/lib/clips-data";
import FadeIn from "@/components/FadeIn";
import { useState } from "react";
import { Play } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/multi-angle")({
  component: MultiAngleLab,
});

function MultiAngleLab() {
  const groupClips = CLIPS_DATA.filter(c => c._highlight_meta?.group_id === MULTI_ANGLE_DATA.group_id);
  const [selectedAngle, setSelectedAngle] = useState(0);
  const selected = groupClips[selectedAngle];
  const fused = MULTI_ANGLE_DATA.fused_intelligence;

  const radarData = Object.entries(fused.skill_radar_fused).map(([k, v]) => ({
    skill: k.replace(/_/g, " "),
    value: v,
    fullMark: 10,
  }));

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-foreground">Multi-Angle Lab</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fusing {MULTI_ANGLE_DATA.angles_analyzed} camera angles for higher-confidence intelligence
        </p>
      </FadeIn>

      {/* Angle Selector */}
      <FadeIn delay={0.05}>
        <div className="grid grid-cols-5 gap-3">
          {groupClips.map((clip, i) => (
            <button
              key={clip._highlight_meta?.id}
              onClick={() => setSelectedAngle(i)}
              className={`rounded-lg border overflow-hidden transition-colors ${i === selectedAngle ? "border-primary" : "border-border hover:border-primary/30"}`}
            >
              <div className="aspect-video bg-background flex items-center justify-center">
                <Play size={14} className="text-primary" />
              </div>
              <div className="p-2">
                <p className="text-[10px] text-foreground truncate">{clip._highlight_meta?.name}</p>
                <p className="text-[9px] text-muted-foreground">Angle {i + 1}</p>
              </div>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Selected Angle Detail */}
      {selected && (
        <FadeIn delay={0.1}>
          <div className="bg-card border border-border rounded-lg p-5">
            <h2 className="text-sm font-semibold text-foreground mb-1">{selected._highlight_meta?.name}</h2>
            <p className="text-xs text-muted-foreground mb-3">{selected.daas_signals.clip_summary_one_sentence}</p>
            <div className="flex gap-3 text-xs">
              <span className="font-mono-data text-primary">Q:{selected.clip_meta.clip_quality_score}</span>
              <span className="font-mono-data text-discovery">V:{selected.clip_meta.viral_potential_score}</span>
              <span className="text-muted-foreground">{selected.shot_analysis.total_shots_estimated} shots detected</span>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Fused Intelligence */}
      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn delay={0.15}>
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Fused Intelligence</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-md p-3">
                <p className="text-[10px] text-muted-foreground uppercase">Total Shots (All Angles)</p>
                <p className="font-mono-data text-xl font-semibold text-foreground">{fused.total_shots_across_angles}</p>
              </div>
              <div className="bg-background rounded-md p-3">
                <p className="text-[10px] text-muted-foreground uppercase">Single Angle Avg</p>
                <p className="font-mono-data text-xl font-semibold text-foreground">{fused.single_angle_avg_shots}</p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-md p-3 border border-primary/20">
              <p className="text-xs text-primary font-medium">{fused.shot_detection_improvement}</p>
            </div>

            {/* Multi-angle brand confirmation */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Brand Confidence (Multi-Angle)</p>
              <div className="space-y-2">
                {fused.brands_confirmed_multi_angle.map(b => (
                  <div key={b.brand} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{b.brand}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < b.angles_detected ? "bg-primary" : "bg-muted"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{b.angles_detected}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Fused Skill Radar</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Badge Consensus */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Badge Consensus</p>
              <div className="space-y-2">
                {fused.badge_consensus.map(b => (
                  <div key={b.badge} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{b.badge}</span>
                    <span className="text-[10px] text-muted-foreground font-mono-data">{b.votes}/{b.total_angles} angles</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Arc Votes */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Story Arc Votes</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(fused.story_arc_votes).map(([arc, count]) => (
                  <span key={arc} className="px-2 py-1 rounded bg-accent text-xs text-foreground capitalize">
                    {arc.replace(/_/g, " ")} <span className="font-mono-data text-primary ml-1">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
