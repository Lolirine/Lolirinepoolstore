import * as XLSX from "xlsx";
import { query } from "./db.js";

type Row = {
  id: string;            // -> external_id
  name: string;
  category?: string;
  price?: number;
  promoPrice?: number | null;
  isOnSale?: any;
  tvaRate?: number | null;
  stock?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  galleryImages?: string | null;   // URLs séparées par , ou ;
  attributes?: string | null;      // JSON string ou texte
  isDropshipping?: any;
  supplierId?: string | null;
  supplierPrice?: number | null;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function upsertProductsFromXlsx(buf: Buffer) {
  const wb = XLSX.read(buf, { type: "buffer" });
  const ws = wb.Sheets["Produits"] ?? wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Row>(ws, { defval: null });

  for (const r of rows) {
    if (!r.id || !r.name) continue;

    const external_id = String(r.id);
    const price_cents = Math.round(Number(r.price || 0) * 100);
    const slug = slugify(r.name);

    // Produit (UPSERT)
    await query(
      `INSERT INTO products (external_id, sku, name, price_cents, currency, meta_json)
       VALUES ($1,$2,$3,$4,'EUR', jsonb_build_object(
         'category',$5,'slug',$6,'promoPrice',$7,'isOnSale',$8,
         'tvaRate',$9,'stock',$10,'description',$11,
         'isDropshipping',$12,'supplierId',$13,'supplierPrice',$14,
         'attributes',$15
       ))
       ON CONFLICT (external_id) DO UPDATE SET
         sku         = EXCLUDED.sku,
         name        = EXCLUDED.name,
         price_cents = EXCLUDED.price_cents,
         currency    = EXCLUDED.currency,
         meta_json   = EXCLUDED.meta_json,
         updated_at  = now()`,
      [
        external_id,
        external_id,           // pas de SKU dédié -> on met l'id
        r.name,
        price_cents,
        r.category,
        slug,
        r.promoPrice,
        !!r.isOnSale,
        r.tvaRate,
        r.stock,
        r.description,
        !!r.isDropshipping,
        r.supplierId,
        r.supplierPrice,
        r.attributes
      ]
    );

    // Image principale
    if (r.imageUrl) {
      await query(
        `INSERT INTO images (external_id, owner_type, owner_ext, s3_key, mime_type, meta_json)
         VALUES ($1,'product',$2,$3,'image/jpeg', jsonb_build_object('kind','main'))
         ON CONFLICT (external_id) DO UPDATE SET
           s3_key=$3, updated_at=now()`,
        [`img_${external_id}_main`, external_id, r.imageUrl]
      );
    }

    // Galerie (séparateurs virgule/point-virgule/retour)
    if (r.galleryImages) {
      const parts = String(r.galleryImages).split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
      let i = 1;
      for (const url of parts) {
        await query(
          `INSERT INTO images (external_id, owner_type, owner_ext, s3_key, mime_type, meta_json)
           VALUES ($1,'product',$2,$3,'image/jpeg', jsonb_build_object('kind','gallery','idx',$4))
           ON CONFLICT (external_id) DO NOTHING`,
          [`img_${external_id}_g${i}`, external_id, url, i]
        );
        i++;
      }
    }
  }
}
