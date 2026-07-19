-- Run this migration on your Supabase project once it is created.
-- Creates the table used by the contact form Server Action.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  budget text,
  message text not null,
  locale text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  status text not null default 'new'
);

comment on table public.contact_submissions is 'Leads captured from the portfolio contact form.';

-- Row Level Security: enabled with no public policies.
-- All reads/writes happen server-side through the service role key,
-- so no anonymous access is granted here. Add policies later if you
-- want to read submissions from an authenticated admin dashboard.
alter table public.contact_submissions enable row level security;
