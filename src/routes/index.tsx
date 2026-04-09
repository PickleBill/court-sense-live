import { createFileRoute, Link } from "@tanstack/react-router";
import { getAggregatedStats, getAvgSkillRadar, CLIPS_DATA } from "@/lib/clips-data";
import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Play, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: CommandCenter,
});

function CommandCenter() {
  const stats = getAggregatedStats();
  const skillRadar = getAvgSkillRadar();

  const kpis = [
    { label: "Clips Analyzed", value: stats.totalClips },
    { label: "Unique Brands", value: stats.uniqueBrands },
    { label: "Total Shots", value: stats.totalShots },
    { label: "Avg Quality", value: stats.avgQuality, decimal: true },
  ];

  const recentClips = CLIPS_DATA.slice(0, 6);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <FadeIn>
        <h1 className="font-display text-2xl font-bold text-foreground">Command Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time intelligence from court video analysis</p>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <FadeIn key={kpi.label} delay={i * 0.05}>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{kpi.label}</p>
              <p className="font-mono-data text-2xl font-semibold text-foreground">
                <CountUp end={kpi.value} decimals={kpi.decimal ? 1 : 0} duration={1.2} />
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-card border border-border rounded-lg p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Brand Frequency</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.brandFrequency} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--color-foreground)", fontSize: 11 }} width={75} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-card border border-border rounded-lg p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Skill Radar (Avg)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Recent Analyses</h2>
          <Link to="/clips" className="text-xs text-primary hover:underline flex items-center gap-1">View All <ArrowRight size={10} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentClips.map((clip, i) => (
            <FadeIn key={clip._highlight_meta?.id} delay={0.2 + i * 0.04}>
              <Link to="/clips" className="block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors">
                <div className="aspect-video bg-background flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Play size={16} className="text-primary ml-0.5" /></div>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-primary/20 rounded font-mono-data text-[10px] text-primary font-semibold">Q:{clip.clip_meta.clip_quality_score}</div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase mb-1">{clip.storytelling.story_arc.replace(/_/g, " ")}</p>
                  <p className="text-sm text-foreground font-medium truncate">{clip._highlight_meta?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{clip.daas_signals.clip_summary_one_sentence}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Pipeline Status</h2>
          <div className="flex items-center gap-2 text-xs overflow-x-auto">
            {[
              { label: "Available", value: "4,097", color: "bg-muted" },
              { label: "Working Set", value: "460", color: "bg-accent" },
              { label: "Analyzed", value: "15", color: "bg-primary/30" },
              { label: "Multi-Angle", value: "5", color: "bg-primary" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                {i > 0 && <ArrowRight size={12} className="text-muted-foreground shrink-0" />}
                <div className={`${step.color} rounded-md px-4 py-3 text-center min-w-[100px]`}>
                  <p className="font-mono-data text-lg font-semibold text-foreground">{step.value}</p>
                  <p className="text-muted-foreground mt-0.5">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
