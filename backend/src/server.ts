
import express, { Request, Response } from "express";
import cors from "cors";
import { dbPing, ensureSchema, listProducts, insertProduct } from "./db";

const PORT = Number(process.env.PORT) || 3010;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (_req: Request, res: Response) => res.json({ message: "Hello from the backend!" }));

app.get("/api/db/ping", async (_req, res) => {
  try { res.json({ ok:true, now: await dbPing() }); }
  catch (e) { res.status(500).json({ ok:false, error: (e as Error).message }); }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price_cents } = req.body;
    if (!name || typeof price_cents !== "number") return res.status(400).json({ error: "bad input" });
    const id = await insertProduct(name, price_cents);
    res.status(201).json({ id });
  } catch (e) { res.status(500).json({ error: (e as Error).message }); }
});

app.get("/api/products", async (_req, res) => {
  try { res.json(await listProducts()); }
  catch (e) { res.status(500).json({ error: (e as Error).message }); }
});

ensureSchema().then(()=>console.log("DB ready")).catch(err=>{ console.error("DB init failed:", err); process.exit(1); });

app.listen(PORT, "0.0.0.0", () => console.log(`backend running on http://localhost:${PORT}`));
