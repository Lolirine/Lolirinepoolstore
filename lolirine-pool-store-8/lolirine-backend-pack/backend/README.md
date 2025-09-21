# Lolirine Ingest API (backend)

Mini-backend Express pour upserter les données dans OVH PostgreSQL `defaultdb`.

## Démarrage local

```bash
cd backend
npm i
cp .env.example .env   # édite la DATABASE_URL
npm run dev
curl http://localhost:8080/health
```

## Routes

- POST `/ingest/customer` { external_id, email, full_name?, phone?, meta? }
- POST `/ingest/product` { external_id, sku?, name, price_cents, currency?, meta? }
- POST `/ingest/order` { external_id, customer_ext, status, total_cents, meta? }
- POST `/ingest/order-item` { order_ext, product_ext, qty, unit_cents, meta? }
- POST `/ingest/image` { external_id, owner_type?, owner_ext?, s3_key, mime_type?, width?, height?, checksum?, meta? }

## Build / prod

```bash
npm run build
node dist/index.js
```
