create extension if not exists pgcrypto;

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  type text not null,
  collection_id uuid references public.collections(id) on delete set null,
  image_url text,
  sale_price numeric(10,2),
  current_stock integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  movement_type text not null check (movement_type in ('addition','sale','damage','adjustment')),
  quantity integer not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists products_collection_id_idx on public.products(collection_id);
create index if not exists inventory_movements_product_id_idx on public.inventory_movements(product_id);
create index if not exists inventory_movements_created_at_idx on public.inventory_movements(created_at desc);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
before update on public.products
for each row execute function public.set_products_updated_at();

alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.inventory_movements enable row level security;

create policy "authenticated users can read collections"
on public.collections for select to authenticated using (true);
create policy "authenticated users can manage collections"
on public.collections for all to authenticated using (true) with check (true);

create policy "authenticated users can read products"
on public.products for select to authenticated using (true);
create policy "authenticated users can manage products"
on public.products for all to authenticated using (true) with check (true);

create policy "authenticated users can read movements"
on public.inventory_movements for select to authenticated using (true);
create policy "authenticated users can manage movements"
on public.inventory_movements for all to authenticated using (true) with check (true);
