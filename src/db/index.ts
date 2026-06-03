import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    // FIXED: Crucial configurations for serverless functions hitting a Supabase pooler
    max: 10,                 // Prevents a single lambda instance from hogging connections
    idleTimeoutMillis: 30000,// Closes idle connections quickly to free up space
    connectionTimeoutMillis: 5000, // Fails fast instead of letting the lambda function time out
    ssl: {
      rejectUnauthorized: false, // Bypasses self-signed certificate restrictions on production pool
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
