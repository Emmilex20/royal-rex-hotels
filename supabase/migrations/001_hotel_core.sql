create extension if not exists pgcrypto;
create type reservation_status as enum ('pending','confirmed','checked_in','checked_out','cancelled','no_show');
create type payment_status as enum ('pending','paid','failed','refunded');

create table public.room_types (
 id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
 description text, nightly_rate integer not null check (nightly_rate >= 0), max_guests integer not null default 2,
 size_label text, image_url text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.rooms (
 id uuid primary key default gen_random_uuid(), room_type_id uuid not null references public.room_types(id) on delete restrict,
 room_number text unique not null, floor text, is_active boolean not null default true, created_at timestamptz not null default now()
);
create table public.guests (
 id uuid primary key default gen_random_uuid(), first_name text not null, last_name text not null, email text not null,
 phone text not null, country text, notes text, created_at timestamptz not null default now()
);
create table public.reservations (
 id uuid primary key default gen_random_uuid(), reference text unique not null,
 guest_id uuid not null references public.guests(id) on delete restrict, room_type_id uuid not null references public.room_types(id) on delete restrict,
 room_id uuid references public.rooms(id) on delete set null, check_in date not null, check_out date not null,
 adults integer not null default 1 check(adults>0), children integer not null default 0 check(children>=0),
 status reservation_status not null default 'pending', nightly_rate integer not null, total_amount integer not null,
 special_requests text, source text not null default 'website', created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint valid_stay_dates check(check_out > check_in)
);
create table public.payments (
 id uuid primary key default gen_random_uuid(), reservation_id uuid not null references public.reservations(id) on delete restrict,
 provider text not null default 'paystack', provider_reference text unique, amount integer not null check(amount>=0),
 status payment_status not null default 'pending', paid_at timestamptz, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create table public.admin_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade, full_name text, role text not null default 'staff' check(role in ('owner','manager','reception','staff')), is_active boolean not null default true, created_at timestamptz not null default now()
);
create index reservations_dates_idx on public.reservations(check_in,check_out);
create index reservations_status_idx on public.reservations(status);
create index reservations_room_type_idx on public.reservations(room_type_id);
create index payments_reservation_idx on public.payments(reservation_id);

alter table public.room_types enable row level security; alter table public.rooms enable row level security;
alter table public.guests enable row level security; alter table public.reservations enable row level security;
alter table public.payments enable row level security; alter table public.admin_profiles enable row level security;
revoke all on public.guests,public.reservations,public.payments,public.admin_profiles from anon;
grant select on public.room_types to anon,authenticated; grant select on public.rooms to authenticated;
grant select,insert,update,delete on public.room_types,public.rooms,public.guests,public.reservations,public.payments to authenticated;
grant select on public.admin_profiles to authenticated;
create policy "public active room types" on public.room_types for select to anon using(is_active=true);
create policy "authenticated room types" on public.room_types for select to authenticated using(true);
create policy "admins view profile" on public.admin_profiles for select to authenticated using(user_id=(select auth.uid()));
create policy "admins manage room types" on public.room_types for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));
create policy "admins manage rooms" on public.rooms for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));
create policy "admins manage guests" on public.guests for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));
create policy "admins manage reservations" on public.reservations for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));
create policy "admins manage payments" on public.payments for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));

insert into public.room_types(slug,name,nightly_rate,max_guests,size_label,image_url) values
('standard','Standard Room',30000,2,'20–25m²','https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90'),
('classic','Classic Room',35000,2,'25–30m²','https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=85'),
('royal','Royal Room',40000,3,'30–35m²','https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85'),
('apartment','2-Bedroom Service Apartment',80000,4,'Two bedrooms','https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85')
on conflict(slug) do update set name=excluded.name,nightly_rate=excluded.nightly_rate,max_guests=excluded.max_guests,size_label=excluded.size_label,image_url=excluded.image_url;