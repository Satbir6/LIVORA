import { dbPool } from "@/lib/db";

export type TrafficLog = {
  id: string;
  visitor_id: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
  created_at_ist?: string;
  created_at_pretty?: string;
};

export type TrafficStats = {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  topPages: Array<{ path: string; views: number }>;
  recentLogs: TrafficLog[];
  dailyTraffic: Array<{ date: string; views: number }>;
};

const TABLE_NAME = "website_access_logs";

async function ensureTrafficTable() {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id BIGSERIAL PRIMARY KEY,
      visitor_id VARCHAR(64) NOT NULL,
      path VARCHAR(255) NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      created_at_ist TEXT
    )
  `);

  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_path ON ${TABLE_NAME}(path)
  `);

  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_visitor_id ON ${TABLE_NAME}(visitor_id)
  `);

  await dbPool.query(`
    CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_created_at ON ${TABLE_NAME}(created_at)
  `);
}
  // created_at_ist is part of the table definition above

export async function logTrafficEntry(params: {
  visitorId: string;
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
}) {
  await ensureTrafficTable();
  const now = new Date();
  const createdAtIso = now.toISOString();

  // Format IST using Intl with Asia/Kolkata to avoid timezone math mistakes
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(now).reduce((acc: Record<string, string>, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {} as Record<string, string>);

  const istFormatted = `${parts.day}-${parts.month}-${parts.year}-${parts.hour}-${parts.minute}-${parts.second}`;

  await dbPool.query(
    `
      INSERT INTO ${TABLE_NAME} (visitor_id, path, referrer, user_agent, created_at, created_at_ist)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [params.visitorId, params.path, params.referrer ?? null, params.userAgent ?? null, createdAtIso, istFormatted],
  );
}

export async function getTrafficStats(): Promise<TrafficStats> {
  await ensureTrafficTable();

  const [totalViewsResult, uniqueVisitorsResult, todayViewsResult, topPagesResult, recentLogsResult, dailyTrafficResult] = await Promise.all([
    dbPool.query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM ${TABLE_NAME}`),
    dbPool.query<{ count: string }>(`SELECT COUNT(DISTINCT visitor_id)::text AS count FROM ${TABLE_NAME}`),
    dbPool.query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM ${TABLE_NAME} WHERE created_at::date = CURRENT_DATE`),
    dbPool.query<{ path: string; views: string }>(`
      SELECT path, COUNT(*)::text AS views
      FROM ${TABLE_NAME}
      GROUP BY path
      ORDER BY COUNT(*) DESC, path ASC
      LIMIT 10
    `),
    dbPool.query<TrafficLog & { created_at_ist?: string }>(`
      SELECT id::text, visitor_id, path, referrer, user_agent, created_at::text, created_at_ist
      FROM ${TABLE_NAME}
      ORDER BY created_at DESC
      LIMIT 20
    `),
    dbPool.query<{ date: string; views: string }>(`
      SELECT to_char(created_at::date, 'YYYY-MM-DD') AS date, COUNT(*)::text AS views
      FROM ${TABLE_NAME}
      WHERE created_at >= CURRENT_DATE - INTERVAL '13 days'
      GROUP BY created_at::date
      ORDER BY date ASC
    `),
  ]);

  return {
    totalViews: Number(totalViewsResult.rows[0]?.count ?? 0),
    uniqueVisitors: Number(uniqueVisitorsResult.rows[0]?.count ?? 0),
    todayViews: Number(todayViewsResult.rows[0]?.count ?? 0),
    topPages: topPagesResult.rows.map((row) => ({ path: row.path, views: Number(row.views) })),
    recentLogs: recentLogsResult.rows,
    dailyTraffic: dailyTrafficResult.rows.map((row) => ({ date: row.date, views: Number(row.views) })),
  };
}
