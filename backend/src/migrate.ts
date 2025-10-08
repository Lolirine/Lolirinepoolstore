import "dotenv/config";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname, "../migrations");

async function main() {
  const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
  });

  await pool.query(`
    create table if not exists _migrations(
      id serial primary key,
      name text not null unique,
      run_at timestamptz not null default now()
    );
  `);

  const files = (await readdir(migrationsDir))
    .filter(f => f.endsWith(".sql"))
    .sort();

  for (const f of files) {
    const exists = await pool.query("select 1 from _migrations where name=$1", [f]);
    if (exists.rowCount) continue;
    const sql = await readFile(path.join(migrationsDir, f), "utf8");
    console.log("Running migration", f);
    await pool.query(sql);
    await pool.query("insert into _migrations(name) values($1)", [f]);
  }

  await pool.end();
  console.log("Migrations OK");
}

main().catch(e => { console.error(e); process.exit(1); });

