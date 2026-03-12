import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, Link2, MousePointer, Zap, Trophy, Globe,
  Activity, BarChart2, PieChart as PieIcon, Clock, AlertCircle, Flame,
} from "lucide-react";
import config from "../../config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AnalyticsData {
  summary: {
    totalUrls: number;
    activeUrls: number;
    inactiveUrls: number;
    totalClicks: number;
    avgClicks: number;
    p50Clicks: number;
    p90Clicks: number;
    dormantCount: number;
    engagementRate: number;
  };
  bestUrl: { shortCode: string; originalUrl: string; clicks: number } | null;
  createdPerDay: { date: string; count: number }[];
  clickDistribution: { range: string; count: number }[];
  topUrls: { shortCode: string; originalUrl: string; clicks: number; createdAt: string }[];
  topDomains: { domain: string; count: number }[];
  weeklyCreated: { weekStart: string; count: number }[];
  dayOfWeekActivity: { day: string; count: number }[];
  clickVelocityTop: { shortCode: string; originalUrl: string; clicks: number; ageDays: number; velocity: number }[];
  urlAgeDistribution: { range: string; count: number }[];
}

// ─── Color palette ────────────────────────────────────────────────────────────
const CHART_COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#10b981", "#f43f5e", "#a78bfa", "#fb923c", "#34d399"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const truncate = (s: string, n = 38) => (s.length > n ? s.slice(0, n) + "…" : s);

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const StyledTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold mb-1 text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-bold ml-1">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({
  title, value, sub, icon: Icon, color, bg,
}: {
  title: string; value: string | number; sub: string;
  icon: any; color: string; bg: string;
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-4xl font-bold mb-1">{value}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
        <div className={cn("p-3 rounded-lg", bg)}>
          <Icon className={cn("h-6 w-6", color)} />
        </div>
      </div>
    </CardContent>
  </Card>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${config.api_url}/url/analytics`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to load analytics");
        setData(json.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { summary, bestUrl, createdPerDay, clickDistribution, topUrls, topDomains,
    weeklyCreated, dayOfWeekActivity, clickVelocityTop, urlAgeDistribution } = data;

  const activeRatio = summary.totalUrls > 0
    ? Math.round((summary.activeUrls / summary.totalUrls) * 100)
    : 0;

  const statusData = [
    { name: "Active", value: summary.activeUrls },
    { name: "Inactive", value: summary.inactiveUrls },
  ];

  const statCards = [
    { title: "Total URLs", value: summary.totalUrls, sub: `${activeRatio}% active`, icon: Link2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Clicks", value: summary.totalClicks.toLocaleString(), sub: "All-time", icon: MousePointer, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Avg. Clicks / URL", value: summary.avgClicks, sub: "Mean performance", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Median Clicks", value: summary.p50Clicks, sub: "50th percentile", icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Top 10% Clicks", value: summary.p90Clicks, sub: "90th percentile", icon: Zap, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { title: "Active URLs", value: summary.activeUrls, sub: `${summary.inactiveUrls} inactive / deleted`, icon: BarChart2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Dormant URLs", value: summary.dormantCount, sub: "Active but never clicked", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Engagement Rate", value: `${summary.engagementRate}%`, sub: "URLs with at least 1 click", icon: Flame, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your URL performance</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {statCards.map((s) => (
            <motion.div key={s.title} variants={itemVariants}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Best URL highlight */}
        {bestUrl && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-yellow-500/40 bg-yellow-50/30 dark:bg-yellow-900/10">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/15">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-yellow-600 dark:text-yellow-400 mb-0.5">Best Performing URL</p>
                  <p className="font-bold text-lg">{config.red_url}/r/{bestUrl.shortCode}</p>
                  <p className="text-sm text-muted-foreground truncate">{bestUrl.originalUrl}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-extrabold text-yellow-500">{bestUrl.clicks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">total clicks</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* URLs Created Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />URLs Created (Last 30 Days)</CardTitle>
              <CardDescription>Daily URL creation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={createdPerDay} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cgradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={fmtDate}
                    tick={{ fontSize: 11 }}
                    interval={4}
                    className="text-muted-foreground"
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip content={<StyledTooltip />} labelFormatter={(label) => fmtDate(String(label))} />
                  <Area type="monotone" dataKey="count" name="URLs Created" stroke="#6366f1" strokeWidth={2} fill="url(#cgradient)" dot={false} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top URLs + Click Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top URLs by Clicks */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Top 5 URLs by Clicks</CardTitle>
                <CardDescription>Your highest-performing links</CardDescription>
              </CardHeader>
              <CardContent>
                {topUrls.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">No click data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                      data={topUrls.map(u => ({ name: u.shortCode, clicks: u.clicks }))}
                      layout="vertical"
                      margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
                      <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
                      <Tooltip content={<StyledTooltip />} />
                      <Bar dataKey="clicks" name="Clicks" radius={[0, 4, 4, 0]}>
                        {topUrls.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Click Distribution */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5" />Click Distribution</CardTitle>
                <CardDescription>How many URLs fall into each click-count bucket</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={clickDistribution} margin={{ top: 0, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip content={<StyledTooltip />} />
                    <Bar dataKey="count" name="URLs" radius={[4, 4, 0, 0]}>
                      {clickDistribution.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-3 text-center">Ranges show total clicks per short URL</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Domain Breakdown + Active vs Inactive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Domain breakdown */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />Top Destination Domains</CardTitle>
                <CardDescription>Most frequently shortened domains</CardDescription>
              </CardHeader>
              <CardContent>
                {topDomains.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {topDomains.map((d, i) => {
                      const pct = Math.round((d.count / summary.totalUrls) * 100);
                      return (
                        <div key={d.domain}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium truncate flex-1">{d.domain}</span>
                            <span className="text-muted-foreground ml-4 shrink-0">{d.count} URL{d.count !== 1 ? "s" : ""} · {pct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, delay: 0.05 * i }}
                              className="h-full rounded-full"
                              style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active vs Inactive pie */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><PieIcon className="h-5 w-5" />URL Status Breakdown</CardTitle>
                <CardDescription>Active vs deleted/inactive URLs</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={["#6366f1", "#f43f5e"][i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<StyledTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center p-3 rounded-lg bg-indigo-500/10">
                    <p className="text-2xl font-bold text-indigo-500">{summary.activeUrls}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-rose-500/10">
                    <p className="text-2xl font-bold text-rose-500">{summary.inactiveUrls}</p>
                    <p className="text-xs text-muted-foreground">Inactive</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Creation Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Weekly Creation Trend (Last 12 Weeks)</CardTitle>
              <CardDescription>How many URLs you created each week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={weeklyCreated} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="wgradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="weekStart" tickFormatter={fmtDate} tick={{ fontSize: 11 }} interval={1} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip content={<StyledTooltip />} labelFormatter={(l) => `Week of ${fmtDate(String(l))}`} />
                  <Area type="monotone" dataKey="count" name="URLs Created" stroke="#22d3ee" strokeWidth={2} fill="url(#wgradient)" dot={{ r: 3, fill: "#22d3ee" }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Day-of-Week Activity + URL Age Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day of Week */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Creation by Day of Week</CardTitle>
                <CardDescription>Which days you create URLs most</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={dayOfWeekActivity} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <PolarGrid className="stroke-border" />
                    <PolarAngleAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <Radar name="URLs Created" dataKey="count" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.35} strokeWidth={2} />
                    <Tooltip content={<StyledTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* URL Age Distribution */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />URL Age Distribution</CardTitle>
                <CardDescription>How old your active links are</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={urlAgeDistribution} margin={{ top: 4, right: 16, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip content={<StyledTooltip />} />
                    <Bar dataKey="count" name="URLs" radius={[4, 4, 0, 0]}>
                      {urlAgeDistribution.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Click Velocity Leaderboard */}
        {clickVelocityTop.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-amber-500" />Click Velocity Leaderboard</CardTitle>
                <CardDescription>URLs ranked by clicks per day since creation — higher = faster growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground text-left">
                        <th className="pb-3 font-medium">#</th>
                        <th className="pb-3 font-medium">Short Code</th>
                        <th className="pb-3 font-medium">Destination</th>
                        <th className="pb-3 font-medium text-right">Total Clicks</th>
                        <th className="pb-3 font-medium text-right">Age (days)</th>
                        <th className="pb-3 font-medium text-right">Velocity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {clickVelocityTop.map((u, i) => (
                        <tr key={u.shortCode} className="hover:bg-muted/40 transition-colors">
                          <td className="py-3 pr-4">
                            <span className="w-6 h-6 rounded-full bg-amber-500/15 text-amber-500 text-xs font-bold inline-flex items-center justify-center">{i + 1}</span>
                          </td>
                          <td className="py-3 pr-4">
                            <a href={`${config.red_url}/r/${u.shortCode}`} target="_blank" rel="noopener noreferrer" className="font-mono text-primary hover:underline">{u.shortCode}</a>
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground max-w-xs">
                            <span title={u.originalUrl}>{truncate(u.originalUrl)}</span>
                          </td>
                          <td className="py-3 pr-4 text-right font-bold">{u.clicks.toLocaleString()}</td>
                          <td className="py-3 pr-4 text-right text-muted-foreground">{u.ageDays}</td>
                          <td className="py-3 text-right">
                            <span className="inline-flex items-center gap-1 font-bold text-amber-500">
                              <Zap className="h-3 w-3" />{u.velocity}/day
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Top URLs detailed table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MousePointer className="h-5 w-5" />Top 5 URLs — Detailed</CardTitle>
              <CardDescription>Full breakdown of your best links</CardDescription>
            </CardHeader>
            <CardContent>
              {topUrls.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No URLs yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground text-left">
                        <th className="pb-3 font-medium">#</th>
                        <th className="pb-3 font-medium">Short Code</th>
                        <th className="pb-3 font-medium">Destination</th>
                        <th className="pb-3 font-medium text-right">Clicks</th>
                        <th className="pb-3 font-medium text-right">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {topUrls.map((u, i) => (
                        <tr key={u.shortCode} className="hover:bg-muted/40 transition-colors">
                          <td className="py-3 pr-4">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold inline-flex items-center justify-center">{i + 1}</span>
                          </td>
                          <td className="py-3 pr-4">
                            <a
                              href={`${config.red_url}/r/${u.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-primary hover:underline"
                            >
                              {u.shortCode}
                            </a>
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground max-w-xs">
                            <span title={u.originalUrl}>{truncate(u.originalUrl)}</span>
                          </td>
                          <td className="py-3 pr-4 text-right">
                            <span className="font-bold">{u.clicks.toLocaleString()}</span>
                          </td>
                          <td className="py-3 text-right text-muted-foreground whitespace-nowrap">
                            {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;