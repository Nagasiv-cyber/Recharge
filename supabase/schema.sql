-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  university_email text unique not null,
  verified_at timestamptz,
  name text,
  dob date,
  gender text,
  gender_preference text[],
  year text,
  major text,
  bio text,
  avatar_urls text[],
  purpose_tags text[] check (purpose_tags <@ ARRAY['study_partner','project_team','friendship','dating']::text[]),
  created_at timestamptz default now()
);

-- COURSES TABLE
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  code text not null,
  name text,
  university_id uuid
);

-- USER_COURSES TABLE
create table public.user_courses (
  user_id uuid references public.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  primary key (user_id, course_id)
);

-- SWIPES TABLE
create table public.swipes (
  id uuid primary key default uuid_generate_v4(),
  swiper_id uuid references public.users(id) on delete cascade,
  swiped_id uuid references public.users(id) on delete cascade,
  direction text check (direction in ('like', 'pass', 'superlike')),
  created_at timestamptz default now(),
  unique(swiper_id, swiped_id)
);

-- MATCHES TABLE
create table public.matches (
  id uuid primary key default uuid_generate_v4(),
  user_a_id uuid references public.users(id) on delete cascade,
  user_b_id uuid references public.users(id) on delete cascade,
  matched_at timestamptz default now(),
  unique(user_a_id, user_b_id)
);

-- MESSAGES TABLE
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  match_id uuid references public.matches(id) on delete cascade,
  sender_id uuid references public.users(id) on delete cascade,
  content text not null,
  sent_at timestamptz default now(),
  read_at timestamptz
);

-- STUDY_ROOMS TABLE
create table public.study_rooms (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses(id),
  title text not null,
  description text,
  creator_id uuid references public.users(id),
  max_seats int default 4,
  created_at timestamptz default now()
);

-- STUDY_ROOM_MEMBERS TABLE
create table public.study_room_members (
  room_id uuid references public.study_rooms(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (room_id, user_id)
);

-- REPORTS TABLE
create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid references public.users(id),
  reported_id uuid references public.users(id),
  reason text not null,
  details text,
  status text default 'open',
  created_at timestamptz default now()
);

-- BLOCKS TABLE
create table public.blocks (
  blocker_id uuid references public.users(id) on delete cascade,
  blocked_id uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (blocker_id, blocked_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES --

alter table public.users enable row level security;
alter table public.courses enable row level security;
alter table public.user_courses enable row level security;
alter table public.swipes enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;
alter table public.study_rooms enable row level security;
alter table public.study_room_members enable row level security;
alter table public.reports enable row level security;
alter table public.blocks enable row level security;

-- Users RLS
create policy "Users can view their own full profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can view public fields of others" on public.users
  for select using (true); 

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- Swipes RLS
create policy "Users can insert their own swipes" on public.swipes
  for insert with check (auth.uid() = swiper_id);

create policy "Users can view their own swipes" on public.swipes
  for select using (auth.uid() = swiper_id OR auth.uid() = swiped_id);

-- Matches RLS
create policy "Users can view their own matches" on public.matches
  for select using (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Messages RLS
create policy "Users can insert messages in their matches" on public.messages
  for insert with check (
    auth.uid() = sender_id AND
    exists (
      select 1 from public.matches
      where id = match_id and (user_a_id = auth.uid() or user_b_id = auth.uid())
    )
  );

create policy "Users can view messages in their matches" on public.messages
  for select using (
    exists (
      select 1 from public.matches
      where id = match_id and (user_a_id = auth.uid() or user_b_id = auth.uid())
    )
  );

-- Reports RLS
create policy "Users can insert reports" on public.reports
  for insert with check (auth.uid() = reporter_id);

create policy "Users can view their own reports" on public.reports
  for select using (auth.uid() = reporter_id);

-- Blocks RLS
create policy "Users can insert blocks" on public.blocks
  for insert with check (auth.uid() = blocker_id);

create policy "Users can view their own blocks" on public.blocks
  for select using (auth.uid() = blocker_id);

create policy "Users can remove their own blocks" on public.blocks
  for delete using (auth.uid() = blocker_id);

-- TRIGGER FOR EDU EMAIL VALIDATION --
create or replace function public.check_edu_email()
returns trigger as $$
begin
  if new.university_email not like '%.edu' then
    raise exception 'Must use a .edu email address';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger enforce_edu_email
  before insert or update on public.users
  for each row
  execute function public.check_edu_email();
