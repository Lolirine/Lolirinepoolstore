import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const file = path.join(__dirname, "..", "migrations", "001_init.sql");
  const sql = await fs.readFile(file, "utf8");
  await pool.query(sql);
  console.log("migrations ok");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
