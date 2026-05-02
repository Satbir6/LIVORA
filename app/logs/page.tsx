import { getTrafficStats } from "@/lib/traffic";
import type { TrafficLog } from "@/lib/traffic";
import { LogsPageClient } from "./client";
import LoginClient from "./LoginClient";
import { cookies } from "next/headers";
import { getAuthUserFromCookie, getSessionCookieName } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function LogsPage() {
  const cookieStore = await cookies();
  const sessionCookieName = getSessionCookieName();
  const cookie = cookieStore.get(sessionCookieName)?.value ?? null;

  const user = await getAuthUserFromCookie(cookie);

  if (!user) {
    // not authenticated — render client login component
    return <LoginClient />;
  }

  const stats = await getTrafficStats();

  // prefer IST formatted column if present
  const statsWithPretty = {
    ...stats,
    recentLogs: stats.recentLogs.map((log: TrafficLog & { created_at_ist?: string }) => ({
      ...log,
      created_at_pretty: log.created_at_ist ?? new Date(log.created_at).toISOString().replace("T", " ").replace("Z", " UTC"),
    })),
  } as unknown as typeof stats;

  return <LogsPageClient initialStats={statsWithPretty} />;
}
