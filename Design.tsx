import { useState, type ComponentType } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  Filter,
  Globe,
  Monitor,
  Smartphone,
  Users,
} from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  trend?: string;
  trendUp?: boolean;
};

type TrafficPoint = {
  date: string;
  views: number;
};

type TopPage = {
  path: string;
  views: number;
  rate: number;
};

type RecentLog = {
  id: number;
  path: string;
  visitor_id: string;
  method: string;
  status: number;
  time: string;
  device: string;
};

type DashboardStats = {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  growth: string;
  topPages: TopPage[];
  recentLogs: RecentLog[];
  dailyTraffic: TrafficPoint[];
};

const mockStats: DashboardStats = {
  totalViews: 48293,
  uniqueVisitors: 12402,
  todayViews: 1240,
  growth: "+12.5%",
  topPages: [
    { path: "/", views: 12402, rate: 84 },
    { path: "/products", views: 8231, rate: 62 },
    { path: "/about", views: 3102, rate: 45 },
    { path: "/contact", views: 1042, rate: 22 },
  ],
  recentLogs: [
    { id: 1, path: "/products", visitor_id: "721a", method: "GET", status: 200, time: "2 mins ago", device: "Desktop" },
    { id: 2, path: "/", visitor_id: "882c", method: "GET", status: 200, time: "5 mins ago", device: "Mobile" },
    { id: 3, path: "/api/v1/auth", visitor_id: "102b", method: "POST", status: 401, time: "12 mins ago", device: "Desktop" },
    { id: 4, path: "/about", visitor_id: "441f", method: "GET", status: 200, time: "18 mins ago", device: "Tablet" },
    { id: 5, path: "/products/special-item", visitor_id: "990d", method: "GET", status: 404, time: "22 mins ago", device: "Mobile" },
  ],
  dailyTraffic: [
    { date: "Mon", views: 420 },
    { date: "Tue", views: 380 },
    { date: "Wed", views: 510 },
    { date: "Thu", views: 780 },
    { date: "Fri", views: 620 },
    { date: "Sat", views: 450 },
    { date: "Sun", views: 390 },
  ],
};

function StatCard({ label, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-[#F5F1EC] p-3 text-[#1F3F5B]">
          <Icon size={20} />
        </div>
        {trend ? (
          <span className={`flex items-center rounded-full px-3 py-1 text-xs font-semibold ${trendUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {trendUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
            {trend}
          </span>
        ) : null}
      </div>
      <div className="mt-5">
        <h3 className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">{label}</h3>
        <p className="mt-3 font-playfair text-4xl text-[#1F3F5B]">{value}</p>
      </div>
    </div>
  );
}

function TrafficBarChart({ data }: { data: TrafficPoint[] }) {
  const maxViews = Math.max(...data.map((entry) => entry.views));

  return (
    <div className="flex h-56 items-end gap-3 pt-8">
      {data.map((item) => (
        <div key={item.date} className="group flex flex-1 flex-col items-center">
          <div className="relative flex h-44 w-full items-end justify-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-[#1F3F5B] px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.views} views
            </div>
            <div
              className="w-full rounded-t-2xl bg-[#E6D6C5] transition-colors duration-300 group-hover:bg-[#B9926B]"
              style={{ height: `${(item.views / maxViews) * 100}%` }}
            />
          </div>
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">{item.date}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [stats] = useState<DashboardStats>(mockStats);

  return (
    <div className="min-h-screen bg-[#F5F1EC] font-inter text-[#2B2B2B]">
      <nav className="sticky top-0 z-30 border-b border-[#E6D6C5] bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3F5B] font-playfair text-lg text-[#C8A97E]">L</div>
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B9926B]">LogPanel</p>
              <h1 className="font-playfair text-2xl text-[#1F3F5B]">Website Traffic Dashboard</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-full bg-[#1F3F5B] px-4 py-2 text-sm font-semibold text-white">Analytics</button>
            <button className="rounded-full px-4 py-2 text-sm font-semibold text-[#1F3F5B] transition-colors hover:bg-[#F5F1EC]">Visitors</button>
            <button className="rounded-full px-4 py-2 text-sm font-semibold text-[#1F3F5B] transition-colors hover:bg-[#F5F1EC]">Reports</button>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 text-[#8A8A8A] transition-colors hover:bg-[#F5F1EC] hover:text-[#1F3F5B]">
              <Filter size={18} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#1F3F5B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B9926B]">
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="overflow-hidden rounded-[32px] border border-[#E6D6C5] bg-[#1F3F5B] shadow-[0_24px_80px_rgba(31,63,91,0.16)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
            <div>
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Traffic Overview</p>
              <h2 className="mt-4 max-w-3xl font-playfair text-4xl leading-tight text-[#F5F1EC] sm:text-5xl lg:text-[64px]">
                Real-time statistics for your site traffic
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#E6D6C5] sm:text-base">
                A Livora-styled analytics screen that keeps the same dashboard structure, but uses the brand&apos;s warm neutrals, deep blue accents, and editorial typography.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {["1H", "24H", "7D", "30D"].map((range) => (
                <button
                  key={range}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    range === "7D" ? "bg-[#F5F1EC] text-[#1F3F5B]" : "border border-white/20 text-[#F5F1EC] hover:bg-white/10"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Views" value={stats.totalViews.toLocaleString()} icon={Eye} trend="+12.5%" trendUp />
          <StatCard label="Unique Visitors" value={stats.uniqueVisitors.toLocaleString()} icon={Users} trend="+3.2%" trendUp />
          <StatCard label="Today" value={stats.todayViews.toLocaleString()} icon={Clock3} trend="-2.1%" trendUp={false} />
          <StatCard label="Growth" value={stats.growth} icon={BarChart3} trend="+0.4%" trendUp />
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="xl:col-span-2 rounded-[32px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-playfair text-3xl text-[#1F3F5B]">Traffic Trend</h3>
                <p className="mt-2 text-sm text-[#8A8A8A]">Daily page views with a Livora warm-neutral presentation.</p>
              </div>
              <select className="rounded-full border border-[#E6D6C5] bg-[#F5F1EC] px-4 py-2 text-sm font-medium text-[#1F3F5B] outline-none">
                <option>Page Views</option>
                <option>Unique Visitors</option>
              </select>
            </div>
            <TrafficBarChart data={stats.dailyTraffic} />
          </section>

          <section className="rounded-[32px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-3xl text-[#1F3F5B]">Top Pages</h3>
                <p className="mt-2 text-sm text-[#8A8A8A]">Highest viewed pages on the site.</p>
              </div>
              <button className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B9926B] hover:underline">View All</button>
            </div>
            <div className="mt-6 space-y-4">
              {stats.topPages.map((page) => (
                <div key={page.path} className="group">
                  <div className="mb-1 flex items-center justify-between gap-4">
                    <span className="max-w-[180px] truncate text-sm font-semibold text-[#1F3F5B]">{page.path}</span>
                    <span className="text-xs font-semibold text-[#8A8A8A]">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F1EC]">
                    <div className="h-full rounded-full bg-[#B9926B] transition-all duration-700" style={{ width: `${page.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="xl:col-span-3 overflow-hidden rounded-[32px] border border-[#E6D6C5] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6D6C5] px-6 py-5">
              <div>
                <h3 className="font-playfair text-3xl text-[#1F3F5B]">Recent Access Logs</h3>
                <p className="mt-2 text-sm text-[#8A8A8A]">Recent route visits and request details.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#B9926B]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">Live Updates</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead className="border-b border-[#E6D6C5] bg-[#F5F1EC] text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8A8A]">
                  <tr>
                    <th className="px-6 py-4">Endpoint</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Visitor ID</th>
                    <th className="px-6 py-4">Device</th>
                    <th className="px-6 py-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6D6C5]">
                  {stats.recentLogs.map((log) => (
                    <tr key={log.id} className="transition-colors hover:bg-[#FBF8F4]">
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-sm font-medium text-[#1F3F5B]">
                          <ChevronRight size={14} className="text-[#D4C1A7]" />
                          {log.path}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${log.method === "GET" ? "border-blue-100 bg-blue-50 text-blue-700" : "border-purple-100 bg-purple-50 text-purple-700"}`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold ${log.status === 200 ? "text-emerald-600" : log.status === 404 ? "text-amber-600" : "text-rose-600"}`}>
                          {log.status} {log.status === 200 ? "OK" : log.status === 404 ? "Not Found" : "Error"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="rounded-md bg-[#F5F1EC] px-2 py-1 font-mono text-xs text-[#1F3F5B]">{log.visitor_id}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#8A8A8A]">
                          {log.device === "Mobile" ? <Smartphone size={14} /> : log.device === "Desktop" ? <Monitor size={14} /> : <Globe size={14} />}
                          <span className="text-xs">{log.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-[#8A8A8A]">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#E6D6C5] bg-[#FBF8F4] p-4 text-center">
              <button className="text-sm font-semibold text-[#1F3F5B] hover:text-[#B9926B]">Load More Logs</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
