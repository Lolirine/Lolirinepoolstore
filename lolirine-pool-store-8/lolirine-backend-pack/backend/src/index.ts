import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { query } from "./db.js";
import { UPSERT_CUSTOMER, UPSERT_PRODUCT, UPSERT_ORDER, INSERT_ORDER_ITEM, INSERT_IMAGE } from "./upserts.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

const CustomerSchema = z.object({
  external_id: z.string(),
  email: z.string().email(),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  meta: z.any().optional()
});
app.post("/ingest/customer", async (req, res) => {
  const b = CustomerSchema.parse(req.body);
  const rows = await query(UPSERT_CUSTOMER, [b.external_id, b.email, b.full_name ?? null, b.phone ?? null, b.meta ?? null]);
  res.json(rows[0]);
});

const ProductSchema = z.object({
  external_id: z.string(),
  sku: z.string().optional(),
  name: z.string(),
  price_cents: z.number().int().nonnegative(),
  currency: z.string().optional(),
  meta: z.any().optional()
});
app.post("/ingest/product", async (req, res) => {
  const b = ProductSchema.parse(req.body);
  const rows = await query(UPSERT_PRODUCT, [b.external_id, b.sku ?? null, b.name, b.price_cents, b.currency ?? null, b.meta ?? null]);
  res.json(rows[0]);
});

const OrderSchema = z.object({
  external_id: z.string(),
  customer_ext: z.string(),
  status: z.string(),
  total_cents: z.number().int().nonnegative(),
  meta: z.any().optional()
});
app.post("/ingest/order", async (req, res) => {
  const b = OrderSchema.parse(req.body);
  const rows = await query(UPSERT_ORDER, [b.external_id, b.customer_ext, b.status, b.total_cents, b.meta ?? null]);
  res.json(rows[0]);
});

const OrderItemSchema = z.object({
  order_ext: z.string(),
  product_ext: z.string(),
  qty: z.number().int().positive(),
  unit_cents: z.number().int().nonnegative(),
  meta: z.any().optional()
});
app.post("/ingest/order-item", async (req, res) => {
  const b = OrderItemSchema.parse(req.body);
  const rows = await query(INSERT_ORDER_ITEM, [b.order_ext, b.product_ext, b.qty, b.unit_cents, b.meta ?? null]);
  res.json(rows[0]);
});

const ImageSchema = z.object({
  external_id: z.string(),
  owner_type: z.string().optional(),
  owner_ext: z.string().optional(),
  s3_key: z.string(),
  mime_type: z.string().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  checksum: z.string().optional(),
  meta: z.any().optional()
});
app.post("/ingest/image", async (req, res) => {
  const b = ImageSchema.parse(req.body);
  const rows = await query(INSERT_IMAGE, [
    b.external_id, b.owner_type ?? null, b.owner_ext ?? null, b.s3_key,
    b.mime_type ?? null, b.width ?? null, b.height ?? null, b.checksum ?? null, b.meta ?? null
  ]);
  res.json(rows[0] ?? { status: "exists" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Ingest API running on :${port}`));
