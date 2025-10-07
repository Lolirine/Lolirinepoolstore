import express, { Request, Response } from "express";
import cors from "cors";
import {
  dbPing,
  ensureSchema,
  listProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "./db";

const PORT = Number(process.env.PORT) || 3010;
const app = express();

app.use(cors());
app.use(express.json());

// Ping simple
app.get("/api/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from the backend!" });
});

// Santé DB
app.get("/api/db/ping", async (_req: Request, res: Response) => {
  try {
    const now = await dbPing();
    res.json({ ok: true, now });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e as Error).message });
  }
});

// Créer un produit
app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const { name, price_cents } = req.body;
    if (!name || typeof price_cents !== "number") {
      return res.status(400).json({ error: "bad input" });
    }
    const id = await insertProduct(name, price_cents);
    res.status(201).json({ id });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

// Lister les produits
app.get("/api/products", async (_req: Request, res: Response) => {
  try {
    res.json(await listProducts());
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

// Mettre à jour un produit
app.put("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, price_cents } = req.body;
    if (!Number.isInteger(id) || !name || typeof price_cents !== "number") {
      return res.status(400).json({ error: "bad input" });
    }
    const ok = await updateProduct(id, name, price_cents);
    if (!ok) return res.status(404).json({ error: "not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

// Supprimer un produit
app.delete("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "bad input" });
    const ok = await deleteProduct(id);
    if (!ok) return res.status(404).json({ error: "not found" });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

// Init schéma (on log l'erreur sans arrêter le serveur)
ensureSchema()
  .then(() => console.log("DB ready"))
  .catch((err) => console.error("DB init failed:", err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`backend running on http://localhost:${PORT}`);
});
