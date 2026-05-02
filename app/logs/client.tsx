"use client";

import { useState } from "react";
import { BarChart3, ChevronRight, ChevronLeft, Clock3, Eye, Globe, Monitor, Smartphone, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import type { TrafficStats, TrafficLog } from "@/lib/traffic";

type TimeRange = "1H" | "24H" | "7D" | "30D";

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Eye }) {
  return (
    <div className="rounded-[28px] border border-[#E6D6C5] bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-[#F5F1EC] p-3 text-[#1F3F5B]">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8A8A]">{label}</h3>
        <p className="mt-3 font-playfair text-4xl text-[#1F3F5B]">{value}</p>
      </div>
    </div>
  );
}

function TrafficBarChart({ data }: { data: Array<{ date: string; views: number }> }) {
  const maxViews = Math.max(...data.map((entry) => entry.views), 1);

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

export function LogsPageClient({ initialStats }: { initialStats: TrafficStats & { recentLogs: (TrafficLog & { created_at_pretty?: string; created_at_ist?: string })[] } }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("7D");
  const [logsPage, setLogsPage] = useState(1);
  const logsPerPage = 10;

  // Filter logs based on time range (derived state)
  const filteredLogs = initialStats.recentLogs.filter((log) => {
    const now = new Date();
    const logTime = new Date(log.created_at);
    const diffMs = now.getTime() - logTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    switch (timeRange) {
      case "1H":
        return diffHours <= 1;
      case "24H":
        return diffHours <= 24;
      case "7D":
        return diffDays <= 7;
      case "30D":
        return diffDays <= 30;
      default:
        return true;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice((logsPage - 1) * logsPerPage, logsPage * logsPerPage);

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    setLogsPage(1); // Reset to first page when time range changes
  };

  const handlePreviousPage = () => {
    setLogsPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setLogsPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleGoToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setLogsPage(pageNum);
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-[#F5F1EC] font-inter text-[#2B2B2B]">
        <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Hero Header */}
          <header className="overflow-hidden rounded-[32px] border border-[#E6D6C5] bg-[#1F3F5B] shadow-[0_24px_80px_rgba(31,63,91,0.16)]">
            <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
              <div>
                <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Traffic Overview</p>
                <h2 className="mt-4 max-w-3xl font-playfair text-4xl leading-tight text-[#F5F1EC] sm:text-5xl lg:text-[64px]">
                  Real-time statistics for your site traffic
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#E6D6C5] sm:text-base">
                  Every page visit is recorded automatically. Use this dashboard to monitor traffic volume, visitor counts, popular pages, and recent access history.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {(["1H", "24H", "7D", "30D"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                      timeRange === range ? "bg-[#F5F1EC] text-[#1F3F5B]" : "border border-white/20 text-[#F5F1EC] hover:bg-white/10"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Stat Cards Grid */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Views" value={String(initialStats.totalViews)} icon={Eye} />
            <StatCard label="Unique Visitors" value={String(initialStats.uniqueVisitors)} icon={Users} />
            <StatCard label="Today" value={String(initialStats.todayViews)} icon={Clock3} />
            <StatCard label="Top Pages Count" value={String(initialStats.topPages.length)} icon={BarChart3} />
          </section>

          {/* Traffic Trend & Top Pages */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="xl:col-span-2 rounded-[32px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-playfair text-3xl text-[#1F3F5B]">Traffic Trend</h3>
                  <p className="mt-2 text-sm text-[#8A8A8A]">Daily page views with interactive visualization.</p>
                </div>
              </div>
              {initialStats.dailyTraffic.length ? (
                <TrafficBarChart data={initialStats.dailyTraffic} />
              ) : (
                <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-[#D4C1A7] bg-[#F5F1EC]">
                  <p className="text-sm text-[#8A8A8A]">No traffic data yet.</p>
                </div>
              )}
            </section>

            <section className="rounded-[32px] border border-[#E6D6C5] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-3xl text-[#1F3F5B]">Top Pages</h3>
                  <p className="mt-2 text-sm text-[#8A8A8A]">Highest viewed pages on the site.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {initialStats.topPages.length ? (
                  initialStats.topPages.map((page) => (
                    <div key={page.path} className="group">
                      <div className="mb-1 flex items-center justify-between gap-4">
                        <span className="max-w-[180px] truncate text-sm font-semibold text-[#1F3F5B]">{page.path}</span>
                        <span className="text-xs font-semibold text-[#8A8A8A]">{page.views.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F1EC]">
                        <div
                          className="h-full rounded-full bg-[#B9926B] transition-all duration-700"
                          style={{
                            width: `${Math.min((page.views / Math.max(...initialStats.topPages.map((p) => p.views), 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-[#D4C1A7] bg-[#F5F1EC] px-5 py-10 text-sm text-[#8A8A8A]">
                    No traffic has been recorded yet.
                  </p>
                )}
              </div>
            </section>

            {/* Recent Access Logs Table */}
            <section className="xl:col-span-3 overflow-hidden rounded-[32px] border border-[#E6D6C5] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E6D6C5] px-6 py-5">
                <div>
                  <h3 className="font-playfair text-3xl text-[#1F3F5B]">Recent Access Logs</h3>
                  <p className="mt-2 text-sm text-[#8A8A8A]">
                    {filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""} in {timeRange}
                  </p>
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
                      <th className="px-6 py-4">Visitor ID</th>
                      <th className="px-6 py-4">Device</th>
                      <th className="px-6 py-4">Referrer</th>
                      <th className="px-6 py-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6D6C5]">
                    {paginatedLogs.length ? (
                      paginatedLogs.map((log) => {
                        let deviceIcon;
                        let deviceName = "Unknown";
                        if (log.user_agent?.toLowerCase().includes("mobile")) {
                          deviceIcon = <Smartphone size={14} />;
                          deviceName = "Mobile";
                        } else if (log.user_agent?.toLowerCase().includes("tablet")) {
                          deviceIcon = <Globe size={14} />;
                          deviceName = "Tablet";
                        } else {
                          deviceIcon = <Monitor size={14} />;
                          deviceName = "Desktop";
                        }

                        return (
                          <tr key={log.id} className="transition-colors hover:bg-[#FBF8F4]">
                            <td className="px-6 py-4">
                              <span className="flex items-center gap-2 text-sm font-medium text-[#1F3F5B]">
                                <ChevronRight size={14} className="text-[#D4C1A7]" />
                                {log.path}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <code className="rounded-md bg-[#F5F1EC] px-2 py-1 font-mono text-xs text-[#1F3F5B]">{log.visitor_id}</code>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-[#8A8A8A]">
                                {deviceIcon}
                                <span className="text-xs">{deviceName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="truncate text-xs text-[#8A8A8A]">{log.referrer ?? "â€”"}</span>
                            </td>
                                  <td className="px-6 py-4 text-right text-xs text-[#8A8A8A]">
                                    {log.created_at_pretty ? log.created_at_pretty : new Date(log.created_at).toISOString().replace("T", " ").replace("Z", " UTC")}
                                  </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#8A8A8A]">
                          No logs found for {timeRange}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="border-t border-[#E6D6C5] bg-[#FBF8F4] p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-[#8A8A8A]">
                    Showing <span className="font-semibold text-[#1F3F5B]">{filteredLogs.length ? (logsPage - 1) * logsPerPage + 1 : 0}</span> to{" "}
                    <span className="font-semibold text-[#1F3F5B]">{Math.min(logsPage * logsPerPage, filteredLogs.length)}</span> of{" "}
                    <span className="font-semibold text-[#1F3F5B]">{filteredLogs.length}</span> logs
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={logsPage === 1}
                      className="flex items-center justify-center rounded-full border border-[#E6D6C5] p-2 transition-colors hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} className="text-[#1F3F5B]" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrentPage = pageNum === logsPage;
                        const isVisible = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - logsPage) <= 1;

                        if (!isVisible && pageNum !== 2 && pageNum !== totalPages - 1) return null;

                        if ((pageNum === 2 && logsPage > 3) || (pageNum === totalPages - 1 && logsPage < totalPages - 2)) {
                          return (
                            <span key={`ellipsis-${pageNum}`} className="px-2 text-[#8A8A8A]">
                              â€¦
                            </span>
                          );
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handleGoToPage(pageNum)}
                            className={`h-9 w-9 rounded-full text-xs font-semibold transition-colors ${
                              isCurrentPage
                                ? "bg-[#1F3F5B] text-white"
                                : "border border-[#E6D6C5] text-[#1F3F5B] hover:bg-[#F5F1EC]"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNextPage}
                      disabled={logsPage === totalPages}
                      className="flex items-center justify-center rounded-full border border-[#E6D6C5] p-2 transition-colors hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} className="text-[#1F3F5B]" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SiteLayout>
  );
}
