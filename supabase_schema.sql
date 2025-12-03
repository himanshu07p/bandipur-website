-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  role text check (role in ('superadmin', 'admin')) not null default 'admin',
  full_name text,
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
  primary key (id)
);

-- Enable RLS on resources
alter table public.resources enable row level security;

-- Policies (Basic examples, refine as needed)
-- Public read access for events and resources
create policy "Public events are viewable by everyone"
  on public.events for select
  using ( true );

create policy "Public resources are viewable by everyone"
  on public.resources for select
  using ( true );

-- Admin write access (needs more complex policies based on auth.uid() -> profile.role)
-- For now, allow authenticated users to insert (refine later)
create policy "Authenticated users can insert events"
  on public.events for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can insert resources"
  on public.resources for insert
  with check ( auth.role() = 'authenticated' );
