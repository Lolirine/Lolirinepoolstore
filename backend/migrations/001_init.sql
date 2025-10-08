-- 001_init.sql
create table if not exists users(
  id serial primary key,
  email text unique not null,
  pass_hash text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists products(
  id serial primary key,
  sku text unique,
  name text not null,
  description text,
  price_cents integer not null,
  stock integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists promotions(
  id serial primary key,
  code text unique,
  title text not null,
  description text,
  type text not null,       -- 'percent' | 'fixed'
  value integer not null,   -- percent ou cents
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists popups(
  id serial primary key,
  slug text unique,
  html jsonb not null,      -- contenu structuré (titre, body, CTA)
  target text not null,     -- 'homepage' | 'catalog' | 'all'
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
