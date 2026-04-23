-- ============================================================
-- IIS PSM Daycare — Supabase Database Schema
-- Jalankan file ini di Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────
-- Extends Supabase Auth users
create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text not null,
  role        text not null check (role in ('guru', 'ortu', 'admin')),
  phone       text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- ── SISWA (Students) ──────────────────────────────────────
create table public.siswa (
  id          uuid primary key default uuid_generate_v4(),
  nama        text not null,
  jenis_kelamin text check (jenis_kelamin in ('L', 'P')),
  tanggal_lahir date,
  kelas       text not null, -- Infant Care, Playgroup, KB Preschool 1, KB Preschool 2, TKA, TKB
  foto_url    text,
  ortu_id     uuid references public.profiles(id),   -- orang tua linked
  guru_id     uuid references public.profiles(id),   -- guru wali kelas
  status      text default 'aktif' check (status in ('aktif', 'cuti', 'alumni')),
  catatan     text,
  created_at  timestamptz default now()
);

-- ── DAILY REPORT ──────────────────────────────────────────
create table public.daily_reports (
  id              uuid primary key default uuid_generate_v4(),
  siswa_id        uuid references public.siswa(id) on delete cascade,
  guru_id         uuid references public.profiles(id),
  tanggal         date not null,
  sesi            text default 'Full Day' check (sesi in ('Pagi', 'Siang', 'Full Day')),
  kehadiran       text default 'Hadir' check (kehadiran in ('Hadir', 'Izin', 'Sakit', 'Alpha')),
  -- Mood
  mood_datang     text check (mood_datang in ('senang', 'biasa', 'sedih', 'marah')),
  mood_pulang     text check (mood_pulang in ('senang', 'biasa', 'sedih', 'marah')),
  -- Kesehatan
  kondisi_kesehatan text default 'Sehat',
  suhu_tubuh      text,
  -- Makan
  sarapan         text,
  snack_pagi      text,
  makan_siang     text,
  snack_sore      text,
  minum_gelas     integer,
  -- Tidur & BAB/BAK
  tidur_siang     text,
  durasi_tidur    text,
  bak_kali        integer,
  bab             text,
  -- Ibadah & Aktivitas (JSONB array of completed items)
  ibadah_checklist jsonb default '[]',
  -- Fitrah distimulasi
  fitrah_distimulasi text[] default '{}',
  -- Catatan
  observasi_guru  text,
  catatan_ortu    text,
  -- Status
  status          text default 'draft' check (status in ('draft', 'terkirim')),
  dikirim_at      timestamptz,
  created_at      timestamptz default now(),
  unique(siswa_id, tanggal)
);

-- ── PORTOFOLIO ────────────────────────────────────────────
create table public.portofolio (
  id              uuid primary key default uuid_generate_v4(),
  siswa_id        uuid references public.siswa(id) on delete cascade,
  guru_id         uuid references public.profiles(id),
  tanggal         date not null,
  sesi            text,
  fitrah          text[] default '{}',
  observasi       text,
  catatan_ortu    text,
  status          text default 'draft' check (status in ('draft', 'terkirim')),
  dikirim_at      timestamptz,
  created_at      timestamptz default now()
);

-- ── PORTOFOLIO MEDIA ──────────────────────────────────────
create table public.portofolio_media (
  id              uuid primary key default uuid_generate_v4(),
  portofolio_id   uuid references public.portofolio(id) on delete cascade,
  url             text not null,
  tipe            text check (tipe in ('foto', 'video')),
  nama_file       text,
  ukuran_bytes    bigint,
  created_at      timestamptz default now()
);

-- ── LAPORAN 3 BULANAN ────────────────────────────────────
create table public.laporan_triwulan (
  id              uuid primary key default uuid_generate_v4(),
  siswa_id        uuid references public.siswa(id) on delete cascade,
  guru_id         uuid references public.profiles(id),
  periode         text not null, -- misal: "Q1-2026", "Q2-2026"
  tahun           integer not null,
  -- Penilaian per fitrah (BSB/BSH/MB/BB + catatan)
  fitrah_keimanan jsonb,   -- { capaian: 'BSH', catatan: '...' }
  fitrah_belajar  jsonb,
  fitrah_bakat    jsonb,
  fitrah_seksualitas jsonb,
  fitrah_jasmani  jsonb,
  fitrah_bahasa   jsonb,
  fitrah_sosialitas jsonb,
  fitrah_adab     jsonb,
  -- Ringkasan
  catatan_umum    text,
  rekomendasi     text,
  status          text default 'draft' check (status in ('draft', 'terkirim')),
  dikirim_at      timestamptz,
  created_at      timestamptz default now(),
  unique(siswa_id, periode)
);

-- ── PENGUMUMAN ────────────────────────────────────────────
create table public.pengumuman (
  id              uuid primary key default uuid_generate_v4(),
  guru_id         uuid references public.profiles(id),
  judul           text not null,
  isi             text not null,
  target_kelas    text default 'semua', -- 'semua', 'Infant Care', dll
  status          text default 'terkirim' check (status in ('draft', 'terkirim', 'dijadwalkan')),
  jadwal_kirim    timestamptz,
  created_at      timestamptz default now()
);

-- ── NOTIFIKASI ────────────────────────────────────────────
create table public.notifikasi (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references public.profiles(id) on delete cascade,
  judul           text not null,
  pesan           text not null,
  tipe            text check (tipe in ('daily_report', 'portofolio', 'laporan', 'pengumuman', 'sistem')),
  ref_id          uuid,   -- ID referensi ke tabel terkait
  dibaca          boolean default false,
  created_at      timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.profiles         enable row level security;
alter table public.siswa             enable row level security;
alter table public.daily_reports     enable row level security;
alter table public.portofolio        enable row level security;
alter table public.portofolio_media  enable row level security;
alter table public.laporan_triwulan  enable row level security;
alter table public.pengumuman        enable row level security;
alter table public.notifikasi        enable row level security;

-- Profiles: user bisa baca & update profil sendiri
create policy "profiles_select" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Guru bisa baca semua profil (untuk lihat data ortu)
create policy "profiles_guru_select" on public.profiles for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));

-- Siswa: guru bisa semua, ortu hanya baca anak sendiri
create policy "siswa_guru_all" on public.siswa for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "siswa_ortu_select" on public.siswa for select
  using (ortu_id = auth.uid());

-- Daily reports: guru bisa semua, ortu hanya baca anak sendiri yang sudah terkirim
create policy "daily_guru_all" on public.daily_reports for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "daily_ortu_select" on public.daily_reports for select
  using (
    status = 'terkirim' and
    exists (select 1 from public.siswa s where s.id = siswa_id and s.ortu_id = auth.uid())
  );

-- Portofolio: guru bisa semua, ortu hanya baca anak sendiri yang sudah terkirim
create policy "porto_guru_all" on public.portofolio for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "porto_ortu_select" on public.portofolio for select
  using (
    status = 'terkirim' and
    exists (select 1 from public.siswa s where s.id = siswa_id and s.ortu_id = auth.uid())
  );

-- Portofolio media: ikut akses portofolio
create policy "media_guru_all" on public.portofolio_media for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "media_ortu_select" on public.portofolio_media for select
  using (
    exists (
      select 1 from public.portofolio po
      join public.siswa s on s.id = po.siswa_id
      where po.id = portofolio_id and po.status = 'terkirim' and s.ortu_id = auth.uid()
    )
  );

-- Laporan triwulan: guru bisa semua, ortu hanya baca anak sendiri
create policy "laporan_guru_all" on public.laporan_triwulan for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "laporan_ortu_select" on public.laporan_triwulan for select
  using (
    status = 'terkirim' and
    exists (select 1 from public.siswa s where s.id = siswa_id and s.ortu_id = auth.uid())
  );

-- Pengumuman: guru bisa semua, ortu bisa baca
create policy "pengumuman_guru_all" on public.pengumuman for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru'));
create policy "pengumuman_ortu_select" on public.pengumuman for select
  using (
    status = 'terkirim' and
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ortu')
  );

-- Notifikasi: hanya bisa baca notifikasi sendiri
create policy "notif_own" on public.notifikasi for all using (user_id = auth.uid());

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

-- Buat bucket untuk portofolio (foto/video)
insert into storage.buckets (id, name, public) values ('portofolio', 'portofolio', false);

-- Policy storage: guru bisa upload/read, ortu hanya bisa read file anak sendiri
create policy "storage_guru_all" on storage.objects for all
  using (
    bucket_id = 'portofolio' and
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'guru')
  );

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile saat user baru daftar
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'ortu')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- SAMPLE DATA (untuk testing — hapus di production)
-- ============================================================

-- Catatan: insert sample data setelah mendaftar akun guru terlebih dahulu
-- kemudian update role di tabel profiles menjadi 'guru'
-- UPDATE public.profiles SET role = 'guru' WHERE id = 'uuid-akun-guru-anda';
