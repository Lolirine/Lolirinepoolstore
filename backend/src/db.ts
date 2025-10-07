
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

// ---- health ----
export async function dbPing() {
  const r = await pool.query("select now() as now");
  return r.rows[0].now as Date;
}

// ---- schema ----
export async function ensureSchema() {
  await pool.query(`
    create table if not exists products(
      id serial primary key,
      name text not null,
      price_cents integer not null,
      created_at timestamptz not null default now()
    );
  `);
  await pool.query(
    `create index if not exists idx_products_created_at on products(created_at desc);`
  );
}

// ---- queries ----
export async function listProducts() {
  const r = await pool.query(
    "select id,name,price_cents,created_at from products order by created_at desc limit 50"
  );
  return r.rows;
}

export async function insertProduct(name: string, price_cents: number) {
  const r = await pool.query(
    "insert into products(name,price_cents) values ($1,$2) returning id",
    [name, price_cents]
  );
  return r.rows[0].id as number;
}

export async function updateProduct(id: number, name: string, price_cents: number) {
  const r = await pool.query(
    "update products set name=$1, price_cents=$2 where id=$3",
    [name, price_cents, id]
  );
  return r.rowCount === 1;
}

export async function deleteProduct(id: number) {
  const r = await pool.query("delete from products where id=$1", [id]);
  return r.rowCount === 1;
}
