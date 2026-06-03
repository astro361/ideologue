import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

// Disable pre-prepared statements to make it 100% compatible with Supabase Transaction mode (6543)
const client = postgres(databaseUrl, { 
  prepare: false,
  ssl: 'require' // Forces secure handshake across regional boundaries
});

export const db = drizzle(client);
