alter table public.reservations add column if not exists hold_expires_at timestamptz;
create index if not exists reservations_hold_expiry_idx on public.reservations(hold_expires_at) where status='pending';

create or replace function public.create_booking_hold(
 p_reference text,p_first_name text,p_last_name text,p_email text,p_phone text,p_country text,
 p_room_type_id uuid,p_check_in date,p_check_out date,p_adults integer,p_children integer,p_special_requests text,p_hold_minutes integer default 15
) returns table(reservation_id uuid,guest_id uuid,nightly_rate integer,total_amount integer,hold_expires_at timestamptz)
language plpgsql security definer set search_path=public as $$
declare v_type public.room_types%rowtype;v_inventory integer;v_reserved integer;v_nights integer;v_guest uuid;v_res uuid;v_exp timestamptz;
begin
 if p_check_out<=p_check_in then raise exception 'INVALID_DATES'; end if;
 if p_check_in<current_date then raise exception 'PAST_CHECKIN'; end if;
 perform pg_advisory_xact_lock(hashtext(p_room_type_id::text));
 select * into v_type from public.room_types where id=p_room_type_id and is_active=true for update;
 if not found then raise exception 'ROOM_TYPE_UNAVAILABLE'; end if;
 if p_adults<1 or p_children<0 or p_adults+p_children>v_type.max_guests then raise exception 'INVALID_GUEST_COUNT'; end if;
 select greatest(coalesce(v_type.inventory_count,0),count(*) filter(where r.is_active))::integer into v_inventory from public.rooms r where r.room_type_id=p_room_type_id;
 select count(*)::integer into v_reserved from public.reservations x where x.room_type_id=p_room_type_id and x.check_in<p_check_out and x.check_out>p_check_in and (x.status in ('confirmed','checked_in') or (x.status='pending' and (x.hold_expires_at is null or x.hold_expires_at>now())));
 if v_inventory<=v_reserved then raise exception 'SOLD_OUT'; end if;
 v_nights:=p_check_out-p_check_in;v_exp:=now()+make_interval(mins=>greatest(5,least(p_hold_minutes,30)));
 insert into public.guests(first_name,last_name,email,phone,country) values(trim(p_first_name),trim(p_last_name),lower(trim(p_email)),trim(p_phone),nullif(trim(p_country),'') ) returning id into v_guest;
 insert into public.reservations(reference,guest_id,room_type_id,check_in,check_out,adults,children,status,nightly_rate,total_amount,special_requests,source,hold_expires_at)
 values(p_reference,v_guest,p_room_type_id,p_check_in,p_check_out,p_adults,p_children,'pending',v_type.nightly_rate,v_type.nightly_rate*v_nights,nullif(trim(p_special_requests),''),'website',v_exp) returning id into v_res;
 return query select v_res,v_guest,v_type.nightly_rate,v_type.nightly_rate*v_nights,v_exp;
end$$;
revoke all on function public.create_booking_hold(text,text,text,text,text,text,uuid,date,date,integer,integer,text,integer) from public,anon,authenticated;
