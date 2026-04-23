"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";
import clsx from "clsx";

const NAV = [
  { href: "/ortu/dashboard",   icon: "🏠", label: "Beranda" },
  { href: "/ortu/portofolio",  icon: "📷", label: "Portofolio" },
  { href: "/ortu/laporan",     icon: "📋", label: "Laporan Perkembangan" },
  { href: "/ortu/notifikasi",  icon: "🔔", label: "Notifikasi" },
];

export default function OrtuSidebarClient({
  profile, unreadCount, anak,
}: { profile: Profile; unreadCount: number; anak: { id: string; nama: string; kelas: string }[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login"); router.refresh();
  }

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col min-h-screen sticky top-0" style={{ background: "var(--green-dark)" }}>
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">IIS</div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">Portal Orang Tua</div>
            <div className="text-white/40 text-xs">IIS PSM Daycare</div>
          </div>
        </div>
      </div>

      {/* Anak */}
      {anak.length > 0 && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="text-white/40 text-xs mb-2 uppercase tracking-wide">Anak Saya</div>
          {anak.map(a => (
            <div key={a.id} className="flex items-center gap-2 py-1">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                {a.nama.split(" ").map(w => w[0]).slice(0,2).join("")}
              </div>
              <div>
                <div className="text-white text-xs font-medium leading-tight">{a.nama}</div>
                <div className="text-white/40 text-xs">{a.kelas}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith(item.href) ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
            )}>
            <span>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.label === "Notifikasi" && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{unreadCount}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            {profile.full_name?.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{profile.full_name}</div>
            <div className="text-white/40 text-xs">Orang Tua</div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm transition-all">
          → Keluar
        </button>
      </div>
    </aside>
  );
}
