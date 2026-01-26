-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Session storage table
create table if not exists ecas_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  participant_id text,
  proctor_name text,
  session_date date,
  data jsonb not null default '{}'::jsonb,
  naming_data jsonb not null default '{}'::jsonb,
  comprehension_data jsonb not null default '{}'::jsonb,
  spelling_data jsonb not null default '{}'::jsonb,
  story_data jsonb not null default '{}'::jsonb,
  delayed_story_data jsonb not null default '{}'::jsonb,
  delayed_recognition_data jsonb not null default '{}'::jsonb,
  fluency_data jsonb not null default '{}'::jsonb,
  fluency_t_data jsonb not null default '{}'::jsonb,
  digits_data jsonb not null default '{}'::jsonb,
  alternation_data jsonb not null default '{}'::jsonb,
  dots_data jsonb not null default '{}'::jsonb,
  cubes_data jsonb not null default '{}'::jsonb,
  numberloc_data jsonb not null default '{}'::jsonb,
  social_data jsonb not null default '{}'::jsonb,
  social_b_data jsonb not null default '{}'::jsonb,
  sentences_data jsonb not null default '{}'::jsonb,
  prompts jsonb not null default '{}'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  transcripts jsonb not null default '{}'::jsonb,
  rationales jsonb not null default '{}'::jsonb,
  timers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists ecas_sessions_set_updated_at on ecas_sessions;
create trigger ecas_sessions_set_updated_at
before update on ecas_sessions
for each row execute function set_updated_at();
