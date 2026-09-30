-- Room CMS: multi-image galleries + public storage bucket
create table if not exists public.room_images (
 id uuid primary key default gen_random_uuid(),
 room_type_id uuid not null references public.room_types(id) on delete cascade,
 storage_path text,
 image_url text not null,
 alt_text text,
 sort_order integer not null default 0,
 is_cover boolean not null default false,
 created_at timestamptz not null default now()
);
create index if not exists room_images_room_type_idx on public.room_images(room_type_id,sort_order);
alter table public.room_images enable row level security;
grant select on public.room_images to anon,authenticated;
grant insert,update,delete on public.room_images to authenticated;
drop policy if exists "public room images" on public.room_images;
create policy "public room images" on public.room_images for select to anon,authenticated using(true);
drop policy if exists "admins manage room images" on public.room_images;
create policy "admins manage room images" on public.room_images for all to authenticated using(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active)) with check(exists(select 1 from public.admin_profiles a where a.user_id=(select auth.uid()) and a.is_active));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('room-images','room-images',true,10485760,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict(id) do update set public=true,file_size_limit=10485760,allowed_mime_types=excluded.allowed_mime_types;
insert into public.room_images(room_type_id,image_url,alt_text,sort_order,is_cover)
select id,image_url,name||' cover',0,true from public.room_types r
where image_url is not null and not exists(select 1 from public.room_images i where i.room_type_id=r.id);
