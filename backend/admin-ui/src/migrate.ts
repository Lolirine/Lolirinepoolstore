import { promises as fs } from "fs";
import { Pool } from "pg";
import path from "path";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DB_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const p = path.join(__dirname, "..", "migrations", "001_init.sql");
  const sql = await fs.readFile(p, "utf8");
  await pool.query(sql);
  console.log("migrations ok");
  await pool.end();
}
main().catch(e => { console.error(e); process.exit(1); });
