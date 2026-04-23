"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";
import clsx from "clsx";

const NAV = [
  { href: "/guru/dashboard",     icon: "📊", label: "Dashboard" },
  { href: "/guru/data-siswa",    icon: "👤", label: "Data Siswa" },
  { href: "/guru/portofolio",    icon: "📷", label: "Input Portofolio" },
  { href: "/guru/daily-report",  icon: "✅", label: "Daily Report" },
  { href: "/guru/laporan",       icon: "📋", label: "Laporan 3 Bulanan" },
  { href: "/guru/riwayat",       icon: "🕘", label: "Riwayat" },
  { href: "/guru/pengumuman",    icon: "📣", label: "Pengumuman" },
];

export default function GuruSidebarClient({
  profile,
  unreadCount,
}: {
  profile: Profile;
  unreadCount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col min-h-screen sticky top-0"
      style={{ background: "var(--green-dark)" }}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
            IIS
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Portal Guru</div>
            <div className="text-white/40 text-xs">IIS PSM Daycare</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith(item.href)
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white hover:bg-white/8"
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            {profile.full_name?.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{profile.full_name}</div>
            <div className="text-white/40 text-xs">Guru</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm transition-all"
        >
          → Keluar
        </button>
      </div>
    </aside>
  );
}
