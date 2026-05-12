import { Pool } from "pg";

const globalForPg = globalThis as unknown as { _pgPool?: Pool };

export const pool =
  globalForPg._pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForPg._pgPool = pool;

export async function ensureFitecVisitorsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fitec_visitors (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255),
      email     VARCHAR(255),
      phone     VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
