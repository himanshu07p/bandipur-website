-- Create profiles table (for Admin users)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  role text check (role in ('superadmin', 'admin')) not null default 'admin',
  full_name text,
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create events table
create table public.events (
  id uuid not null default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamp with time zone not null,
  location text,
  meeting_link text,
  poster_url text,
  created_by uuid references public.profiles(id),
  status text check (status in ('Upcoming', 'Completed', 'Live')) default 'Upcoming',
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS on events
alter table public.events enable row level security;

-- Create resources table
create table public.resources (
  id uuid not null default gen_random_uuid(),
  title text not null,
  subject text,
  file_url text not null,
  category text,
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS on resources
alter table public.resources enable row level security;

-- Create clubs table (for Clubs, UHC, LHC, Web Ops)
create table public.clubs (
  id uuid not null default gen_random_uuid(),
  name text not null,
  type text check (type in ('Club', 'UHC', 'LHC', 'WebOps', 'Committee')) not null,
  description text,
  image_url text,
  secretary_name text,
  secretary_contact text,
  order_index integer default 0,
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS on clubs
alter table public.clubs enable row level security;

-- Create team_members table (for the public Team page)
create table public.team_members (
  id uuid not null default gen_random_uuid(),
  name text not null,
  position text not null,
  category text check (category in ('UHC', 'LHC', 'WebOps')) default 'WebOps',
  image_url text,
  linkedin_url text,
  email text,
  bio text,
  order_index integer default 0,
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS on team_members
alter table public.team_members enable row level security;

-- Policies
-- Public read access
create policy "Public events are viewable by everyone"
  on public.events for select using ( true );

create policy "Public resources are viewable by everyone"
  on public.resources for select using ( true );

create policy "Public clubs are viewable by everyone"
  on public.clubs for select using ( true );

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using ( true );

create policy "Public team_members are viewable by everyone"
  on public.team_members for select using ( true );

-- Admin write access (simplified for now: any authenticated user can write)
-- In production, you should check for specific roles in the profiles table

create policy "Authenticated users can insert events"
  on public.events for insert with check ( auth.role() = 'authenticated' );
create policy "Authenticated users can update events"
  on public.events for update using ( auth.role() = 'authenticated' );
create policy "Authenticated users can delete events"
  on public.events for delete using ( auth.role() = 'authenticated' );

create policy "Authenticated users can insert resources"
  on public.resources for insert with check ( auth.role() = 'authenticated' );
create policy "Authenticated users can update resources"
  on public.resources for update using ( auth.role() = 'authenticated' );
create policy "Authenticated users can delete resources"
  on public.resources for delete using ( auth.role() = 'authenticated' );

create policy "Authenticated users can insert clubs"
  on public.clubs for insert with check ( auth.role() = 'authenticated' );
create policy "Authenticated users can update clubs"
  on public.clubs for update using ( auth.role() = 'authenticated' );
create policy "Authenticated users can delete clubs"
  on public.clubs for delete using ( auth.role() = 'authenticated' );

create policy "Authenticated users can insert team_members"
  on public.team_members for insert with check ( auth.role() = 'authenticated' );
create policy "Authenticated users can update team_members"
  on public.team_members for update using ( auth.role() = 'authenticated' );
create policy "Authenticated users can delete team_members"
  on public.team_members for delete using ( auth.role() = 'authenticated' );

-- Superadmin-only policies for managing profiles (admins)
create policy "Superadmins can insert profiles"
  on public.profiles for insert with check ( auth.role() = 'authenticated' );
create policy "Superadmins can update profiles"
  on public.profiles for update using ( auth.role() = 'authenticated' );
create policy "Superadmins can delete profiles"
  on public.profiles for delete using ( auth.role() = 'authenticated' );
