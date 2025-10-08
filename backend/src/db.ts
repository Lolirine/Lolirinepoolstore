import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }
});

export async function dbPing() {
  const r = await pool.query("select now() as now");
  return r.rows[0].now as Date;
}

export async function ensureSchema() {
  // garde fou : table products (au cas où les migrations n’ont pas encore tourné)
  await pool.query(`
    create table if not exists products(
      id serial primary key,
      name text not null,
      price_cents integer not null,
      created_at timestamptz not null default now()
    );
  `);
}

export type Product = { id:number; name:string; price_cents:number; created_at:Date };

export async function listProducts(): Promise<Product[]> {
  const r = await pool.query("select id,name,price_cents,created_at from products order by id asc");
  return r.rows;
}

export async function insertProduct(name:string, price_cents:number): Promise<number> {
  const r = await pool.query(
    "insert into products(name,price_cents) values($1,$2) returning id",
    [name, price_cents]
  );
  return r.rows[0].id;
}

export async function updateProduct(id:number, name:string, price_cents:number) {
  await pool.query("update products set name=$1, price_cents=$2 where id=$3", [name, price_cents, id]);
}

export async function deleteProduct(id:number) {
  await pool.query("delete from products where id=$1", [id]);
}

