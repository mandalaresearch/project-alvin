-- Skema database booking rental PlayStation.
-- Jalankan di Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  unit text not null check (unit in ('ps3','ps4')),
  start_at timestamptz not null,
  end_at timestamptz not null,
  duration_hours int not null check (duration_hours in (6,12,24)),
  customer_name text not null,
  customer_wa text not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','cancelled','completed')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_unit_start_idx
  on bookings (unit, start_at);
