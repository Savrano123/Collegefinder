-- Additional tables for missing entities in College Information Platform
-- Run after the initial admin migration

-- Hostels table
create table if not exists public.hostels (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references public.colleges(id) on delete cascade,
  name text not null,
  type text check (type in ('boys','girls','mixed')) not null,
  capacity int default 0,
  available_rooms int default 0,
  room_types jsonb default '[]', -- Array of room type objects with pricing
  amenities text[] default '{}',
  rules text,
  entry_timings text,
  exit_timings text,
  mess_available boolean default true,
  mess_timings jsonb default '{}', -- breakfast, lunch, snacks, dinner timings
  weekly_menu jsonb default '{}', -- Day-wise menu
  nearby_facilities text[] default '{}',
  images text[] default '{}',
  rating numeric default 0,
  total_reviews int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Fests table
create table if not exists public.fests (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references public.colleges(id) on delete cascade,
  name text not null,
  description text,
  type text check (type in ('technical','cultural','sports','mixed')) not null,
  duration_days int default 1,
  typical_dates text, -- e.g., "March 15-17" or "Second week of October"
  budget_range text, -- e.g., "₹50 Lakhs - ₹1 Crore"
  events jsonb default '[]', -- Array of event objects
  highlights text[] default '{}',
  celebrity_visits text[] default '{}',
  participation_guidelines text,
  registration_process text,
  images text[] default '{}',
  videos text[] default '{}',
  website_url text,
  social_media jsonb default '{}', -- Instagram, Facebook, etc.
  rating numeric default 0,
  total_reviews int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Clubs table
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references public.colleges(id) on delete cascade,
  name text not null,
  description text,
  category text check (category in ('technical','cultural','sports','social','academic','entrepreneurship','other')) not null,
  membership_requirements text,
  application_process text,
  meeting_frequency text, -- e.g., "Weekly", "Bi-weekly", "Monthly"
  meeting_schedule text, -- e.g., "Every Friday 6 PM"
  activities text[] default '{}',
  achievements text[] default '{}',
  projects jsonb default '[]', -- Array of project objects
  leadership_structure jsonb default '{}', -- President, Vice-President, etc.
  contact_info jsonb default '{}', -- Email, phone, social media
  membership_count int default 0,
  images text[] default '{}',
  website_url text,
  social_media jsonb default '{}',
  rating numeric default 0,
  total_reviews int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Entrance Exams table
create table if not exists public.entrance_exams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  description text,
  conducting_body text,
  exam_type text check (exam_type in ('national','state','university','college')) not null,
  subjects text[] default '{}',
  exam_pattern jsonb default '{}', -- Duration, questions, marking scheme
  eligibility_criteria text,
  application_process text,
  important_dates jsonb default '{}', -- Application start/end, exam date, result date
  exam_centers text[] default '{}',
  fees_structure jsonb default '{}',
  syllabus_url text,
  official_website text,
  preparation_tips text[] default '{}',
  counseling_process text,
  participating_colleges int default 0,
  total_seats int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- College-Entrance Exam mapping table
create table if not exists public.college_entrance_exams (
  id uuid primary key default gen_random_uuid(),
  college_id uuid references public.colleges(id) on delete cascade,
  entrance_exam_id uuid references public.entrance_exams(id) on delete cascade,
  seats_available int default 0,
  cutoff_ranks jsonb default '{}', -- Category-wise cutoff ranks
  fees_for_exam text,
  additional_requirements text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(college_id, entrance_exam_id)
);

-- Forum Posts table
create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  title text not null,
  content text not null,
  category text check (category in ('general','admissions','placements','campus_life','academics','hostels','fests','clubs','comparison','exam_prep')) not null,
  tags text[] default '{}',
  upvotes int default 0,
  downvotes int default 0,
  reply_count int default 0,
  view_count int default 0,
  is_pinned boolean default false,
  is_locked boolean default false,
  status text check (status in ('pending','approved','rejected','flagged')) default 'approved',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Forum Replies table
create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.forum_posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  parent_reply_id uuid references public.forum_replies(id) on delete cascade, -- For nested replies
  content text not null,
  upvotes int default 0,
  downvotes int default 0,
  is_accepted_answer boolean default false,
  status text check (status in ('pending','approved','rejected','flagged')) default 'approved',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Polls table
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  title text not null,
  description text,
  poll_type text check (poll_type in ('single_choice','multiple_choice','rating','yes_no')) not null,
  options jsonb not null, -- Array of option objects with text and vote count
  total_votes int default 0,
  is_anonymous boolean default false,
  expires_at timestamptz,
  status text check (status in ('active','closed','draft')) default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Poll Votes table
create table if not exists public.poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references public.polls(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  selected_options jsonb not null, -- Array of selected option IDs or values
  created_at timestamptz default now(),
  unique(poll_id, user_id)
);

-- Helpful indexes
create index if not exists idx_hostels_college on public.hostels (college_id);
create index if not exists idx_fests_college on public.fests (college_id);
create index if not exists idx_clubs_college on public.clubs (college_id);
create index if not exists idx_forum_posts_college on public.forum_posts (college_id);
create index if not exists idx_forum_posts_category on public.forum_posts (category);
create index if not exists idx_forum_posts_status on public.forum_posts (status);
create index if not exists idx_forum_replies_post on public.forum_replies (post_id);
create index if not exists idx_polls_college on public.polls (college_id);
create index if not exists idx_polls_status on public.polls (status);
create index if not exists idx_college_entrance_exams_college on public.college_entrance_exams (college_id);
create index if not exists idx_college_entrance_exams_exam on public.college_entrance_exams (entrance_exam_id);

-- Update triggers for timestamps
create trigger trg_hostels_updated before update on public.hostels for each row execute procedure public.set_updated_at();
create trigger trg_fests_updated before update on public.fests for each row execute procedure public.set_updated_at();
create trigger trg_clubs_updated before update on public.clubs for each row execute procedure public.set_updated_at();
create trigger trg_entrance_exams_updated before update on public.entrance_exams for each row execute procedure public.set_updated_at();
create trigger trg_college_entrance_exams_updated before update on public.college_entrance_exams for each row execute procedure public.set_updated_at();
create trigger trg_forum_posts_updated before update on public.forum_posts for each row execute procedure public.set_updated_at();
create trigger trg_forum_replies_updated before update on public.forum_replies for each row execute procedure public.set_updated_at();
create trigger trg_polls_updated before update on public.polls for each row execute procedure public.set_updated_at();

-- RLS policies for forum posts and replies
alter table public.forum_posts enable row level security;
create policy if not exists "Allow read approved posts" on public.forum_posts for select using (status = 'approved');
create policy if not exists "Allow insert authenticated posts" on public.forum_posts for insert with check (auth.role() = 'authenticated');
create policy if not exists "Allow owner update posts" on public.forum_posts for update using (auth.uid() = user_id);

alter table public.forum_replies enable row level security;
create policy if not exists "Allow read approved replies" on public.forum_replies for select using (status = 'approved');
create policy if not exists "Allow insert authenticated replies" on public.forum_replies for insert with check (auth.role() = 'authenticated');
create policy if not exists "Allow owner update replies" on public.forum_replies for update using (auth.uid() = user_id);

-- RLS policies for polls
alter table public.polls enable row level security;
create policy if not exists "Allow read active polls" on public.polls for select using (status = 'active');
create policy if not exists "Allow insert authenticated polls" on public.polls for insert with check (auth.role() = 'authenticated');
create policy if not exists "Allow owner update polls" on public.polls for update using (auth.uid() = user_id);

alter table public.poll_votes enable row level security;
create policy if not exists "Allow read own votes" on public.poll_votes for select using (auth.uid() = user_id);
create policy if not exists "Allow insert own votes" on public.poll_votes for insert with check (auth.uid() = user_id);
