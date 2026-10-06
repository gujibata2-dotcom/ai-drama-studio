create extension if not exists "pgcrypto";

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  genre text,
  duration_minutes integer not null default 1,
  language text not null default 'th',
  visual_style text,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  role text,
  description text,
  reference_image_url text,
  voice_id text,
  created_at timestamptz not null default now()
);

create table if not exists scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  scene_number integer not null,
  title text,
  script text,
  created_at timestamptz not null default now()
);

create table if not exists shots (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid not null references scenes(id) on delete cascade,
  shot_number integer not null,
  prompt text,
  dialogue text,
  duration_seconds numeric default 8,
  video_url text,
  audio_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists characters_project_id_idx on characters(project_id);
create index if not exists scenes_project_id_idx on scenes(project_id);
create index if not exists shots_scene_id_idx on shots(scene_id);
