import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { dbPing, ensureSchema, listProducts, insertProduct, updateProduct, deleteProduct } from "./db.js";

const PORT = Number(process.env.PORT || 3010);
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

app.get("/api/hello", (_req, res) => res.json({ message: "Hello from the backend!" }));
app.get("/api/db/ping", async (_req, res) => {
  try { res.json({ ok: true, now: await dbPing() }); }
  catch (e:any) { res.status(500).json({ error: e.message }); }
});

app.get("/api/products", async (_req, res) => {
  try { res.json(await listProducts()); }
  catch (e:any) { res.status(500).json({ error: e.message }); }
});

app.post("/api/products", async (req, res) => {
  const { name, price_cents } = req.body;
  if (!name || typeof price_cents !== "number") return res.status(400).json({ error: "bad input" });
  try { const id = await insertProduct(name, price_cents); res.status(201).json({ id }); }
  catch (e:any) { res.status(500).json({ error: e.message }); }
});

app.put("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, price_cents } = req.body;
  if (!id || !name || typeof price_cents !== "number") return res.status(400).json({ error: "bad input" });
  try { await updateProduct(id, name, price_cents); res.json({ ok: true }); }
  catch (e:any) { res.status(500).json({ error: e.message }); }
});

app.delete("/api/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "bad input" });
  try { await deleteProduct(id); res.json({ ok: true }); }
  catch (e:any) { res.status(500).json({ error: e.message }); }
});

ensureSchema()
  .then(() => console.log("DB ready"))
  .catch((err) => { console.error("DB init failed:", err); process.exit(1); });

app.listen(PORT, "0.0.0.0", () => console.log(`backend running on http://localhost:${PORT}`));

