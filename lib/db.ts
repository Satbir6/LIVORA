import { Pool } from "pg";

declare global {
  var livoraPgPool: Pool | undefined;
}

function createPool() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new Pool({
    connectionString: databaseUrl,
  });
}

export const dbPool = globalThis.livoraPgPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.livoraPgPool = dbPool;
}
