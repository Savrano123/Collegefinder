-- Supabase schema for Colleges, Departments, Faculty, Reviews, Profiles (minimal)
-- Run in Supabase SQL editor or via CLI. Ids use uuid by default in Supabase; adjust if using bigint.

create table if not exists public.colleges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  slug text unique not null,
  description text,
  type text check (type in ('government','private','deemed')) not null,
  counseling_categories text[] default '{}',
  established int,
  location text not null,
  state text not null,
  city text not null,
  pincode text,
  website text,
  phone text,
  email text,
  logo_url text,
  banner_url text,
  nirf_rank int,
  rating numeric default 0,
  total_reviews int default 0,
  total_students int,
  total_faculty int,
  total_departments int,
  placement_rate int,
  average_package text,
  highest_package text,
  annual_fees text,
  highlights text[] default '{}',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references public.colleges(id) on delete cascade,
  name text not null,
  short_name text,
  description text,
  total_students int default 0,
  total_faculty int default 0,
  rating numeric default 0,
  total_reviews int default 0,
  labs text[] default '{}',
  collaborations text[] default '{}',
  accreditations text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  username text unique,
  role text check (role in ('student','moderator','admin')) default 'student',
  college_id uuid references public.colleges(id),
  graduation_year int,
  branch text,
  bio text,
  avatar_url text,
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.faculty (
  id uuid primary key default gen_random_uuid(),
  department_id uuid references public.departments(id) on delete cascade,
  name text not null,
  designation text,
  qualification text,
  specialization text[],
  research_areas text[],
  experience_years int,
  email text,
  phone text,
  image_url text,
  rating numeric default 0,
  total_reviews int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  reviewable_type text not null, -- 'college' | 'department' | 'faculty' | etc.
  reviewable_id uuid not null,
  rating int check (rating between 1 and 5) not null,
  title text,
  content text not null,
  pros text[],
  cons text[],
  tags text[],
  helpful_count int default 0,
  not_helpful_count int default 0,
  status text check (status in ('pending','approved','rejected','flagged')) default 'pending',
  is_anonymous boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Helpful indexes
create index if not exists idx_reviews_entity on public.reviews (reviewable_type, reviewable_id, status);
create index if not exists idx_faculty_department on public.faculty (department_id);

-- RLS policies (example - adjust as needed)
alter table public.reviews enable row level security;
create policy if not exists "Allow read approved" on public.reviews for select using (status = 'approved');
create policy if not exists "Allow insert authenticated" on public.reviews for insert with check (auth.role() = 'authenticated');
create policy if not exists "Allow owner update" on public.reviews for update using (auth.uid() = user_id);

-- Trigger to update timestamps
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_colleges_updated before update on public.colleges for each row execute procedure public.set_updated_at();
create trigger trg_departments_updated before update on public.departments for each row execute procedure public.set_updated_at();
create trigger trg_faculty_updated before update on public.faculty for each row execute procedure public.set_updated_at();
create trigger trg_reviews_updated before update on public.reviews for each row execute procedure public.set_updated_at();

