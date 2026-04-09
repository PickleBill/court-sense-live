import { createFileRoute } from "@tanstack/react-router";
import { CLIPS_DATA, type ClipAnalysis } from "@/lib/clips-data";
import { useState } from "react";
import { Play, Search } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/clips")({
  component: ClipExplorer,
});

function ClipExplorer() {
  const [selectedId, setSelectedId] = useState<string>(CLIPS_DATA[0]?._highlight_meta?.id || "");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const filtered = CLIPS_DATA.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c._highlight_meta?.name.toLowerCase().includes(q) ||
      c.storytelling.story_arc.toLowerCase().includes(q) ||
      c.brand_detection.brands.some(b => b.brand_name.toLowerCase().includes(q)) ||
      c.daas_signals.search_tags?.some(t => t.includes(q))
    );
  });

  const selected = CLIPS_DATA.find(c => c._highlight_meta?.id === selectedId) || CLIPS_DATA[0];

  const tabs = ["overview", "players", "shot log", "brands", "badges", "commentary", "raw json"];

  const skillData = selected.skill_indicators.court_coverage_rating > 0
    ? Object.entries(selected.skill_indicators).map(([k, v]) => ({
        skill: k.replace(/_rating$/, "").replace(/_/g, " "),
        value: v,
        fullMark: 10,
      }))
    : [];

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left Panel — Clip List */}
      <div className="w-80 lg:w-96 border-r border-border flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clips, brands, shots..."
              className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(clip => {
            const id = clip._highlight_meta?.id || "";
            const active = id === selectedId;
            return (
              <button
                key={id}
                onClick={() => { setSelectedId(id); setActiveTab("overview"); }}
                className={`w-full text-left p-3 border-b border-border transition-colors ${active ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-accent/50"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-10 rounded bg-background flex items-center justify-center shrink-0">
                    <Play size={12} className="text-primary ml-0.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground font-medium truncate">{clip._highlight_meta?.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground uppercase">{clip.storytelling.story_arc.replace(/_/g, " ")}</span>
                      <span className="font-mono-data text-[10px] text-primary">Q:{clip.clip_meta.clip_quality_score}</span>
                      <span className="font-mono-data text-[10px] text-muted-foreground">{clip.shot_analysis.total_shots_estimated} shots</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel — Detail */}
      <div className="flex-1 overflow-y-auto">
        {/* Video Player */}
        <div className="aspect-video bg-background flex items-center justify-center border-b border-border">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Play size={24} className="text-primary ml-1" />
            </div>
            <p className="text-xs text-muted-foreground">{selected._highlight_meta?.name}</p>
            <p className="font-mono-data text-[10px] text-muted-foreground mt-1">{selected.clip_meta.duration_seconds}s · {selected.model_used}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border overflow-x-auto">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium capitalize whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === "overview" && (
            <FadeIn>
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">{selected.storytelling.story_arc.replace(/_/g, " ")}</p>
                  <h2 className="text-lg font-semibold text-foreground">{selected._highlight_meta?.name}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{selected.daas_signals.clip_summary_one_sentence}</p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Quality", value: selected.clip_meta.clip_quality_score },
                    { label: "Viral", value: selected.clip_meta.viral_potential_score },
                    { label: "Watchability", value: selected.clip_meta.watchability_score },
                    { label: "Cinematic", value: selected.clip_meta.cinematic_score },
                  ].map(s => (
                    <div key={s.label} className="bg-background rounded-md p-3 text-center">
                      <p className="font-mono-data text-xl font-semibold text-foreground">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                {skillData.length > 0 && (
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {selected.daas_signals.search_tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {selected.daas_signals.search_tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-accent text-[10px] text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {activeTab === "players" && (
            <FadeIn>
              <div className="space-y-4">
                {selected.players_detected.map((p, i) => (
                  <div key={i} className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-foreground">{p.dominance_in_clip} player · {p.side} side</p>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-xs text-primary font-medium">{p.estimated_skill_level}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <p>Position: {p.approximate_position}</p>
                      <p>Height: {p.height_estimate}</p>
                      <p>Handedness: {p.handedness}</p>
                      <p>Energy: {p.energy_level}</p>
                      <p>Movement: {p.movement_style}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">Apparel: {p.apparel_summary}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {activeTab === "shot log" && (
            <FadeIn>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground uppercase tracking-wider border-b border-border">
                      <th className="text-left py-2 px-2">Time</th>
                      <th className="text-left py-2 px-2">Shot</th>
                      <th className="text-left py-2 px-2">Position</th>
                      <th className="text-center py-2 px-2">Quality</th>
                      <th className="text-center py-2 px-2">Wow</th>
                      <th className="text-left py-2 px-2">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.shot_analysis.shots.map((shot, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-accent/30 transition-colors cursor-pointer">
                        <td className="py-2 px-2 font-mono-data text-primary">{shot.timestamp_approximate_seconds}s</td>
                        <td className="py-2 px-2 text-foreground capitalize">{shot.shot_type.replace(/_/g, " ")}</td>
                        <td className="py-2 px-2 text-muted-foreground">{shot.player_position}</td>
                        <td className="py-2 px-2 text-center font-mono-data text-foreground">{shot.quality_score}</td>
                        <td className="py-2 px-2 text-center font-mono-data text-foreground">{shot.wow_factor}</td>
                        <td className="py-2 px-2 text-muted-foreground">{shot.outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <p>Dominant: <span className="text-foreground capitalize">{selected.shot_analysis.dominant_shot_type}</span></p>
                  <p>Total shots: <span className="font-mono-data text-foreground">{selected.shot_analysis.total_shots_estimated}</span></p>
                  <p>Rally length: <span className="font-mono-data text-foreground">{selected.shot_analysis.rally_length_estimated}</span></p>
                </div>
              </div>
            </FadeIn>
          )}

          {activeTab === "brands" && (
            <FadeIn>
              <div className="space-y-3">
                {selected.brand_detection.brands.map((b, i) => (
                  <div key={i} className="bg-background rounded-lg p-4 border border-border flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.brand_name}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{b.category} · {b.player_side}</p>
                      <p className="text-xs text-muted-foreground">{b.visibility_quality}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono-data text-sm text-foreground">{b.estimated_visible_seconds}s</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${b.confidence === "high" ? "bg-success/20 text-success" : b.confidence === "medium" ? "bg-chart-4/20 text-chart-4" : "bg-muted text-muted-foreground"}`}>
                        {b.confidence}
                      </span>
                    </div>
                  </div>
                ))}
                {selected.brand_detection.sponsorship_whitespace.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Sponsorship Whitespace</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.brand_detection.sponsorship_whitespace.map(cat => (
                        <span key={cat} className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground capitalize">{cat}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {activeTab === "badges" && (
            <FadeIn>
              <div className="space-y-3">
                {selected.badge_intelligence.predicted_badges.map((b, i) => (
                  <div key={i} className="bg-background rounded-lg p-4 border border-border">
                    <p className="text-sm font-medium text-foreground">{b.badge_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Confidence: {b.confidence}</p>
                  </div>
                ))}
                <div className="flex gap-4 mt-3 text-xs">
                  <p className="text-muted-foreground">
                    Highlight Reel: <span className={selected.badge_intelligence.highlight_reel_worthy ? "text-success" : "text-muted-foreground"}>{selected.badge_intelligence.highlight_reel_worthy ? "Yes" : "No"}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Top 10 Candidate: <span className={selected.badge_intelligence.top_10_play_candidate ? "text-success" : "text-muted-foreground"}>{selected.badge_intelligence.top_10_play_candidate ? "Yes" : "No"}</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {activeTab === "commentary" && (
            <FadeIn>
              <div className="space-y-4">
                {selected.commentary.broadcast_hook && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-xs text-primary uppercase tracking-wider mb-1">Broadcast Hook</p>
                    <p className="text-sm text-foreground italic">"{selected.commentary.broadcast_hook}"</p>
                  </div>
                )}
                {selected.commentary.espn && (
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ESPN Style</p>
                    <p className="text-sm text-foreground">{selected.commentary.espn}</p>
                  </div>
                )}
                {selected.commentary.hype && (
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Hype</p>
                    <p className="text-sm text-foreground">{selected.commentary.hype}</p>
                  </div>
                )}
                {selected.commentary.coach && (
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Coach</p>
                    <p className="text-sm text-foreground">{selected.commentary.coach}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {activeTab === "raw json" && (
            <FadeIn>
              <pre className="bg-background border border-border rounded-lg p-4 text-xs font-mono-data text-muted-foreground overflow-auto max-h-[500px]">
                {JSON.stringify(selected, null, 2)}
              </pre>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
