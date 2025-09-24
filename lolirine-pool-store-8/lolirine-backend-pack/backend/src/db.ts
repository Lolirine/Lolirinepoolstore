import { Pool } from "pg";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquante");
export const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false }});
export const query = (t: string, p?: any[]) => pool.query(t, p);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function query<T = any>(text: string, params?: any[]) {
  const res = await pool.query<T>(text, params);
  return res.rows;
}
