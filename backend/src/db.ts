
import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DB_URL, ssl: { rejectUnauthorized: false } });
export async function dbPing(){ const r=await pool.query("select now() as now"); return r.rows[0].now as Date; }
export async function ensureSchema(){ await pool.query(`
  create table if not exists products(
    id serial primary key,
    name text not null,
    price_cents integer not null,
    created_at timestamptz not null default now()
  );`); }
export async function listProducts(){ const r=await pool.query("select id,name,price_cents,created_at from products order by id desc limit 50"); return r.rows; }
export async function insertProduct(name:string,price_cents:number){ const r=await pool.query("insert into products(name,price_cents) values ($1,$2) returning id",[name,price_cents]); return r.rows[0].id as number; }
