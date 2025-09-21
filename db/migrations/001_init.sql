-- db/migrations/001_init.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ========== CLIENTS ==========
CREATE TABLE IF NOT EXISTS customers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,            -- id stable venant de l'app
  email        TEXT NOT NULL,
  full_name    TEXT,
  phone        TEXT,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== PRODUITS ==========
CREATE TABLE IF NOT EXISTS products (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  sku          TEXT UNIQUE,
  name         TEXT NOT NULL,
  price_cents  INTEGER NOT NULL,
  currency     TEXT NOT NULL DEFAULT 'EUR',
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== COMMANDES / DEVIS ==========
CREATE TABLE IF NOT EXISTS orders (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  customer_ext TEXT NOT NULL,                   -- lien via external_id client
  status       TEXT NOT NULL,                   -- quote|draft|paid|shipped...
  total_cents  INTEGER NOT NULL DEFAULT 0,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ext    TEXT NOT NULL,                   -- lien via external_id order
  product_ext  TEXT NOT NULL,                   -- lien via external_id product
  qty          INTEGER NOT NULL,
  unit_cents   INTEGER NOT NULL,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== SERVICES (maintenance/réparations/construction) ==========
CREATE TABLE IF NOT EXISTS service_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  customer_ext TEXT,
  type         TEXT NOT NULL,                   -- maintenance|repair|construction
  status       TEXT NOT NULL DEFAULT 'new',
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== IMAGES (clé S3 OVH) ==========
CREATE TABLE IF NOT EXISTS images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,            -- id image côté app
  owner_type   TEXT,                            -- product|customer|order|service
  owner_ext    TEXT,                            -- external_id du parent
  s3_key       TEXT NOT NULL,                   -- ex: bucket/folder/file.jpg
  mime_type    TEXT,
  width        INT,
  height       INT,
  checksum     TEXT,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========== trigger updated_at ==========
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='upd_customers') THEN
    CREATE TRIGGER upd_customers BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='upd_products') THEN
    CREATE TRIGGER upd_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='upd_orders') THEN
    CREATE TRIGGER upd_orders BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='upd_requests') THEN
    CREATE TRIGGER upd_requests BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

-- ========== indexes utiles ==========
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers (email);
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);
CREATE INDEX IF NOT EXISTS idx_orders_customer_ext ON orders (customer_ext);
CREATE INDEX IF NOT EXISTS idx_order_items_order_ext ON order_items (order_ext);
CREATE INDEX IF NOT EXISTS idx_images_owner ON images (owner_type, owner_ext);
