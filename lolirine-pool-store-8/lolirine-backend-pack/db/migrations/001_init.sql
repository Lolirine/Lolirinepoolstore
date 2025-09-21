CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS customers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  email        TEXT NOT NULL,
  full_name    TEXT,
  phone        TEXT,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS orders (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  customer_ext TEXT NOT NULL,
  status       TEXT NOT NULL,
  total_cents  INTEGER NOT NULL DEFAULT 0,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ext    TEXT NOT NULL,
  product_ext  TEXT NOT NULL,
  qty          INTEGER NOT NULL,
  unit_cents   INTEGER NOT NULL,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS service_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  customer_ext TEXT,
  type         TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'new',
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id  TEXT UNIQUE NOT NULL,
  owner_type   TEXT,
  owner_ext    TEXT,
  s3_key       TEXT NOT NULL,
  mime_type    TEXT,
  width        INT,
  height       INT,
  checksum     TEXT,
  meta_json    JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

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

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers (email);
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);
CREATE INDEX IF NOT EXISTS idx_orders_customer_ext ON orders (customer_ext);
CREATE INDEX IF NOT EXISTS idx_order_items_order_ext ON order_items (order_ext);
CREATE INDEX IF NOT EXISTS idx_images_owner ON images (owner_type, owner_ext);
