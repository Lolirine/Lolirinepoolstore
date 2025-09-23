import * as XLSX from "xlsx";
import { query } from "./db.js";

// mapping attendu dans l'Excel (1 ligne = 1 produit)
type Row = {
  external_id: string; sku?: string; name: string;
  price_cents: number; currency?: string;
  category?: string; slug?: string; color?: string; model?: string;
  image_url?: string; // URL GCS publique/signée
};

export async function upsertProductsFromXlsx(buf: Buffer) {
  const wb = XLSX.read(buf, { type: "buffer" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Row>(ws, { defval: null });

  for (const r of rows) {
    if (!r.external_id || !r.name) continue;

    // UPSERT produit
    await query(
      `INSERT INTO products (external_id, sku, name, price_cents, currency, meta_json)
       VALUES ($1,$2,$3,$4,COALESCE($5,'EUR'), jsonb_build_object(
         'category',$6,'slug',$7,'color',$8,'model',$9
       ))
       ON CONFLICT (external_id) DO UPDATE SET
         sku = EXCLUDED.sku,
         name = EXCLUDED.name,
         price_cents = EXCLUDED.price_cents,
         currency = EXCLUDED.currency,
         meta_json = EXCLUDED.meta_json,
         updated_at = now()
       RETURNING external_id`,
      [
        r.external_id, r.sku ?? null, r.name, Number(r.price_cents || 0),
        r.currency ?? "EUR", r.category ?? null, r.slug ?? null,
        r.color ?? null, r.model ?? null,
      ]
    );

    // Image liée (si fournie) — on garde 1 enregistrement par URL
    if (r.image_url) {
      await query(
        `INSERT INTO images (external_id, owner_type, owner_ext, s3_key, mime_type, meta_json)
         VALUES ($1,'product',$2,$3,'image/jpeg', jsonb_build_object('source','excel'))
         ON CONFLICT (external_id) DO NOTHING`,
        [
          // external_id image = hash simple pour éviter les doublons
          `img_${r.external_id}`,
          r.external_id,
          r.image_url,
        ]
      );
    }
  }
}
