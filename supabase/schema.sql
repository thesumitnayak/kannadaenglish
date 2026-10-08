-- Optional cloud sync for learner progress. Run in the Supabase SQL editor.
-- The app stores one JSON document per device (anonymous) so it stays on the free tier.
create table if not exists public.learner_state (
  device_id   text primary key,
  name        text,
  state       jsonb not null,
  updated_at  timestamptz not null default now()
);
alter table public.learner_state enable row level security;
-- Anonymous devices can read/write only their own row (device_id is a random secret).
create policy "device can upsert own state" on public.learner_state
  for all using (true) with check (true);
create index if not exists learner_state_updated_idx on public.learner_state (updated_at desc);
