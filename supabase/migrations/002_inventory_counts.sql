alter table public.room_types add column if not exists inventory_count integer not null default 0 check (inventory_count >= 0);
comment on column public.room_types.inventory_count is 'Sellable inventory count used until/alongside individually numbered physical rooms. Availability uses the greater of inventory_count and active physical-room count.';
