"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";
import clsx from "clsx";

const NAV = [
  { href: "/ortu/dashboard",  icon: "🏠", label: "Beranda" },
  { href: "/ortu/portofolio", icon: "📷", label: "Portofolio" },
  { href: "/ortu/laporan",    icon: "📋", label: "Laporan Perkembangan" },
  { href: "/ortu/notifikasi", icon: "🔔", label: "Notifikasi" },
];

export default function OrtuSidebarClient({
  profile,
  unreadCount,
  anak,
}: {
  profile: Profile;
  unreadCount: number;
  anak: { id: string; nama: string; kelas: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
              IIS
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">Portal Orang Tua</div>
              <div className="text-white/40 text-xs">IIS PSM Daycare</div>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            className="lg:hidden text-white/50 hover:text-white p-1"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Anak */}
      {anak.length > 0 && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="text-white/40 text-xs mb-2 uppercase tracking-wide">Anak Saya</div>
          {anak.map((a) => (
            <div key={a.id} className="flex items-center gap-2 py-1">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                {a.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-white text-xs font-medium leading-tight">{a.nama}</div>
                <div className="text-white/40 text-xs">{a.kelas}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname.startsWith(item.href)
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white hover:bg-white/8"
            )}
          >
            <span>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.label === "Notifikasi" && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {unreadCount}
              </span>
            )}
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
            <div className="text-white/40 text-xs">Orang Tua</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm transition-all"
        >
          → Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── MOBILE TOPBAR ── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{ background: "var(--green-dark)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
            IIS
          </div>
          <div>
            <div className="text-white font-semibold text-xs leading-tight">Portal Orang Tua</div>
            <div className="text-white/40 text-xs">IIS PSM Daycare</div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white/70 hover:text-white p-2"
          aria-label="Buka menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <aside
        className={clsx(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "var(--green-dark)" }}
      >
        <SidebarContent />
      </aside>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden lg:flex w-60 flex-shrink-0 flex-col min-h-screen sticky top-0"
        style={{ background: "var(--green-dark)" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
