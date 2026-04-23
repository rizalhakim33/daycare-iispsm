import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function GuruDashboard() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  // Parallel fetches
  const [
    { count: totalSiswa },
    { data: hadirHariIni },
    { data: recentReports },
    { data: pendingLaporan },
    { data: siswaList },
  ] = await Promise.all([
    supabase.from("siswa").select("*", { count: "exact", head: true }).eq("status", "aktif"),
    supabase.from("daily_reports").select("kehadiran, siswa(nama, kelas)").eq("tanggal", today),
    supabase.from("daily_reports").select("*, siswa(nama)").eq("status", "terkirim")
      .order("created_at", { ascending: false }).limit(5),
    supabase.from("laporan_triwulan").select("*, siswa(nama)").eq("status", "draft").limit(6),
    supabase.from("siswa").select("id, nama, kelas, status").eq("status", "aktif")
      .order("nama").limit(10),
  ]);

  const hadirCount = hadirHariIni?.filter(r => r.kehadiran === "Hadir").length ?? 0;
  const izinCount = (hadirHariIni?.length ?? 0) - hadirCount;

  const stats = [
    { label: "Total Siswa Aktif", value: totalSiswa ?? 0, sub: "dari kapasitas 48", badge: "▲ bulan ini", badgeColor: "bg-green-100 text-green-700" },
    { label: "Hadir Hari Ini", value: hadirCount, sub: `${izinCount} izin/sakit`, badge: `${totalSiswa ? Math.round(hadirCount / totalSiswa * 100) : 0}% hadir`, badgeColor: "bg-green-100 text-green-700" },
    { label: "Laporan Pending", value: pendingLaporan?.length ?? 0, sub: "perlu diselesaikan", badge: "Segera", badgeColor: "bg-yellow-100 text-yellow-700" },
    { label: "Laporan Terkirim Hari Ini", value: recentReports?.length ?? 0, sub: "daily report", badge: "Hari ini", badgeColor: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#1a3a2a]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: id })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="font-serif text-4xl font-bold text-[#1a3a2a] leading-none mb-1">{s.value}</div>
            <div className="text-xs text-gray-400 mb-2">{s.sub}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badgeColor}`}>{s.badge}</span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="card mb-6">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">⚡ Aksi Cepat</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/guru/daily-report", label: "✅ Input Daily Report", primary: true },
            { href: "/guru/portofolio",   label: "📷 Upload Portofolio" },
            { href: "/guru/laporan",      label: "📋 Isi Laporan 3 Bulanan" },
            { href: "/guru/data-siswa",   label: "👤 Kelola Data Siswa" },
            { href: "/guru/pengumuman",   label: "📣 Buat Pengumuman" },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className={a.primary ? "btn-primary" : "btn-outline"}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daftar siswa */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1a3a2a]">👥 Daftar Siswa</h3>
            <Link href="/guru/data-siswa" className="text-xs text-[#3d7a52] hover:underline">Lihat semua →</Link>
          </div>
          <div className="space-y-2">
            {siswaList?.map((s) => {
              const dr = hadirHariIni?.find((r: any) => r.siswa?.nama === s.nama);
              const status = (dr as any)?.kehadiran ?? "Belum";
              return (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#e8f0eb] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e8f0eb] flex items-center justify-center text-[#1a3a2a] text-xs font-bold">
                      {s.nama.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{s.nama}</div>
                      <div className="text-xs text-gray-400">{s.kelas}</div>
                    </div>
                  </div>
                  <span className={
                    status === "Hadir" ? "badge-hadir" :
                    status === "Izin"  ? "badge-izin"  :
                    status === "Sakit" ? "badge-sakit"  : "badge-draft"
                  }>{status}</span>
                </div>
              );
            })}
            {(!siswaList || siswaList.length === 0) && (
              <p className="text-sm text-gray-400 py-4 text-center">Belum ada data siswa. <Link href="/guru/data-siswa" className="text-[#3d7a52] underline">Tambah siswa →</Link></p>
            )}
          </div>
        </div>

        {/* Laporan terbaru */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1a3a2a]">📨 Laporan Terkirim Terbaru</h3>
            <Link href="/guru/riwayat" className="text-xs text-[#3d7a52] hover:underline">Lihat semua →</Link>
          </div>
          <div className="space-y-3">
            {recentReports?.map((r: any) => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#f7f5f0]">
                <span className="text-xl">✅</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{r.siswa?.nama}</div>
                  <div className="text-xs text-gray-400">
                    Daily Report · {format(new Date(r.tanggal), "d MMM yyyy", { locale: id })}
                  </div>
                </div>
                <span className="badge-sent">Terkirim</span>
              </div>
            ))}
            {(!recentReports || recentReports.length === 0) && (
              <p className="text-sm text-gray-400 py-4 text-center">Belum ada laporan terkirim.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
