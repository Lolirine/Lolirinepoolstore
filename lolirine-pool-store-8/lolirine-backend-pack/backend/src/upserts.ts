export const UPSERT_CUSTOMER = `
  INSERT INTO customers (external_id, email, full_name, phone, meta_json)
  VALUES ($1,$2,$3,$4,$5)
  ON CONFLICT (external_id) DO UPDATE
  SET email=EXCLUDED.email,
      full_name=EXCLUDED.full_name,
      phone=EXCLUDED.phone,
      meta_json = COALESCE(customers.meta_json,'{}'::jsonb)
                  || COALESCE(EXCLUDED.meta_json,'{}'::jsonb)
  RETURNING id, external_id;
`;

export const UPSERT_PRODUCT = `
  INSERT INTO products (external_id, sku, name, price_cents, currency, meta_json)
  VALUES ($1,$2,$3,$4,COALESCE($5,'EUR'),$6)
  ON CONFLICT (external_id) DO UPDATE
  SET sku=EXCLUDED.sku,
      name=EXCLUDED.name,
      price_cents=EXCLUDED.price_cents,
      currency=EXCLUDED.currency,
      meta_json = COALESCE(products.meta_json,'{}'::jsonb)
                  || COALESCE(EXCLUDED.meta_json,'{}'::jsonb)
  RETURNING id, external_id;
`;

export const UPSERT_ORDER = `
  INSERT INTO orders (external_id, customer_ext, status, total_cents, meta_json)
  VALUES ($1,$2,$3,$4,$5)
  ON CONFLICT (external_id) DO UPDATE
  SET customer_ext=EXCLUDED.customer_ext,
      status=EXCLUDED.status,
      total_cents=EXCLUDED.total_cents,
      meta_json = COALESCE(orders.meta_json,'{}'::jsonb)
                  || COALESCE(EXCLUDED.meta_json,'{}'::jsonb)
  RETURNING id, external_id;
`;

export const INSERT_ORDER_ITEM = `
  INSERT INTO order_items (order_ext, product_ext, qty, unit_cents, meta_json)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING id;
`;

export const INSERT_IMAGE = `
  INSERT INTO images (external_id, owner_type, owner_ext, s3_key, mime_type, width, height, checksum, meta_json)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  ON CONFLICT (external_id) DO NOTHING
  RETURNING id, external_id;
`;
