-- RELIK: esquema inicial multiempresa con RLS. Ejecutar en Supabase > SQL Editor.
create extension if not exists pgcrypto;

create type member_role as enum ('superadmin','admin','encargado','mecanico','almacen');

create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table memberships (
  user_id uuid not null references auth.users(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  role member_role not null,
  primary key (user_id, tenant_id)
);

-- Talleres a los que pertenece el usuario autenticado.
create function auth_tenants() returns setof uuid language sql stable security definer set search_path = public as
$$ select tenant_id from memberships where user_id = auth.uid() $$;

create function auth_is_admin(t uuid) returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from memberships where user_id = auth.uid() and tenant_id = t and role in ('superadmin','admin')) $$;

create table service_categories (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null, short_name text, description text, icon text, photo_path text,
  position int not null default 0, active boolean not null default true
);

create table services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  category_id uuid references service_categories(id) on delete set null,
  name text not null, description text, price numeric(10,2),
  tasks text[] not null default '{}', photo_path text,
  featured boolean not null default false, demo boolean not null default false, active boolean not null default true
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  plate text not null check (plate ~ '^[A-Z0-9]{6}$'),
  brand text, model text, year int, km int, vin text,
  unique (tenant_id, plate)
);

create table products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  code text not null, name text not null, category text, description text, photo_path text,
  stock int not null default 0 check (stock >= 0), min_stock int not null default 0,
  cost numeric(10,2) not null default 0,   -- NUNCA se expone al cliente
  price numeric(10,2) not null default 0,
  published boolean not null default true,
  unique (tenant_id, code)
);

create sequence order_seq;
create table work_orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  code text not null default ('ORD-' || nextval('order_seq')),
  vehicle_id uuid not null references vehicles(id),
  customer_name text, customer_dni text, customer_phone text,   -- datos privados: no se exponen en la consulta pública
  service text, problem text, diagnosis text,
  status smallint not null default 0 check (status between 0 and 6),
  eta timestamptz, labor_price numeric(10,2) not null default 0,
  mechanic_id uuid references auth.users(id),
  stock_deducted boolean not null default false,  -- evita descontar dos veces
  created_at timestamptz not null default now()
);

create table work_order_parts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references work_orders(id) on delete cascade,
  product_id uuid not null references products(id),
  qty int not null check (qty > 0),
  unit_price numeric(10,2) not null    -- precio autorizado al cliente (editable por el trabajador)
);

create table work_order_photos (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references work_orders(id) on delete cascade,
  path text not null, description text, created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  product_id uuid not null references products(id),
  kind text not null check (kind in ('entrada','salida','ajuste','devolucion')),
  qty int not null, ref text, created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null, phone text not null check (phone ~ '^[0-9]{9}$'),
  plate text not null check (plate ~ '^[A-Z0-9]{6}$'),
  service_id text, date date not null, time time not null,
  status text not null default 'pendiente' check (status in ('pendiente','confirmada','reprogramacion','rechazada','atendida','cancelada')),
  proposed_date date, proposed_time time,
  created_at timestamptz not null default now()
);
-- Evita dobles reservas del mismo horario mientras la solicitud siga abierta.
create unique index appointments_slot_open on appointments (tenant_id, date, time) where status in ('pendiente','confirmada','reprogramacion');

-- ===== RLS: cada taller solo accede a lo suyo =====
do $$
declare t text;
begin
  foreach t in array array['service_categories','services','vehicles','products','work_orders','stock_movements','appointments'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "tenant members" on %I for all using (tenant_id in (select auth_tenants())) with check (tenant_id in (select auth_tenants()))', t);
  end loop;
end $$;

alter table tenants enable row level security;
create policy "members read tenant" on tenants for select using (id in (select auth_tenants()));
alter table memberships enable row level security;
create policy "read own membership" on memberships for select using (user_id = auth.uid());

alter table work_order_parts enable row level security;
create policy "tenant members" on work_order_parts for all
  using (exists (select 1 from work_orders o where o.id = order_id and o.tenant_id in (select auth_tenants())))
  with check (exists (select 1 from work_orders o where o.id = order_id and o.tenant_id in (select auth_tenants())));
alter table work_order_photos enable row level security;
create policy "tenant members" on work_order_photos for all
  using (exists (select 1 from work_orders o where o.id = order_id and o.tenant_id in (select auth_tenants())))
  with check (exists (select 1 from work_orders o where o.id = order_id and o.tenant_id in (select auth_tenants())));

-- Catálogo público (sin costos). TODO: filtrar por taller/dominio cuando haya varios talleres.
create view public_services as select id, tenant_id, category_id, name, description, price, tasks, photo_path, featured, demo from services where active;
create view public_products as select id, tenant_id, code, name, category, description, price, stock, photo_path from products where published;
grant select on public_services, public_products to anon;

-- Consulta pública por placa: SOLO la ejecuta el servidor (service role). Sin datos personales del cliente.
create function public_order_status(p_tenant uuid, p_plate text) returns jsonb
language sql stable security definer set search_path = public as
$$
  select jsonb_build_object(
    'plate', v.plate, 'brand', v.brand, 'model', v.model, 'year', v.year, 'km', v.km,
    'order_code', o.code, 'status', o.status, 'eta', o.eta, 'service', o.service, 'labor', o.labor_price,
    'parts', coalesce((select jsonb_agg(jsonb_build_object('name', p.name, 'qty', wp.qty, 'unit_price', wp.unit_price))
                       from work_order_parts wp join products p on p.id = wp.product_id where wp.order_id = o.id), '[]'::jsonb))
  from work_orders o join vehicles v on v.id = o.vehicle_id
  where o.tenant_id = p_tenant and v.plate = upper(p_plate)
  order by (o.status < 6) desc, o.created_at desc
  limit 1
$$;
revoke all on function public_order_status(uuid, text) from public, anon, authenticated;
grant execute on function public_order_status(uuid, text) to service_role;
