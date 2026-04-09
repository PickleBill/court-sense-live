import { createFileRoute } from "@tanstack/react-router";
import { CLIPS_DATA } from "@/lib/clips-data";
import FadeIn from "@/components/FadeIn";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/players")({
  component: PlayerProfiles,
});

interface PlayerArchetype {
  id: string;
  label: string;
  skillLevel: string;
  apparel: string;
  movement: string;
  clips: string[];
  avgSkills: Record<string, number>;
  badges: string[];
}

function PlayerProfiles() {
  // Group players by apparel description as a proxy for identity
  const archetypeMap = new Map<string, PlayerArchetype>();

  CLIPS_DATA.forEach(clip => {
    clip.players_detected.forEach(p => {
      if (p.dominance_in_clip === "background") return;
      const key = p.apparel_summary.slice(0, 40);
      const existing = archetypeMap.get(key);
      const clipId = clip._highlight_meta?.id || "";

      if (existing) {
        if (!existing.clips.includes(clipId)) existing.clips.push(clipId);
      } else {
        const skills: Record<string, number> = {};
        if (clip.skill_indicators.court_coverage_rating > 0) {
          Object.entries(clip.skill_indicators).forEach(([k, v]) => {
            skills[k.replace(/_rating$/, "").replace(/_/g, " ")] = v;
          });
        }
        const badges = clip.badge_intelligence.predicted_badges
          .filter(b => b.badge_name)
          .map(b => b.badge_name!);

        archetypeMap.set(key, {
          id: key,
          label: `${p.estimated_skill_level} · ${p.handedness}-handed · ${p.height_estimate}`,
          skillLevel: p.estimated_skill_level,
          apparel: p.apparel_summary,
          movement: p.movement_style,
          clips: [clipId],
          avgSkills: skills,
          badges,
        });
      }
    });
  });

  const archetypes = Array.from(archetypeMap.values()).sort((a, b) => b.clips.length - a.clips.length);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-foreground">Player Profiles</h1>
        <p className="text-sm text-muted-foreground mt-1">Observed player archetypes grouped by visual description. Identity tracking improves with more clips.</p>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-5">
        {archetypes.map((arch, i) => {
          const radarData = Object.entries(arch.avgSkills).map(([k, v]) => ({ skill: k, value: v, fullMark: 10 }));
          return (
            <FadeIn key={arch.id} delay={i * 0.04}>
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{arch.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{arch.movement}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    arch.skillLevel === "elite" ? "bg-primary/20 text-primary" :
                    arch.skillLevel === "advanced" ? "bg-success/20 text-success" :
                    arch.skillLevel === "intermediate" ? "bg-chart-4/20 text-chart-4" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {arch.skillLevel}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{arch.apparel}</p>

                {radarData.length > 0 && (
                  <div className="h-40 mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 8 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={1.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {arch.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {arch.badges.map(b => (
                      <span key={b} className="px-2 py-0.5 rounded bg-discovery/10 text-[10px] text-discovery">{b}</span>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground">
                  Appears in {arch.clips.length} clip{arch.clips.length > 1 ? "s" : ""}: {arch.clips.join(", ")}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
