"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"guru" | "ortu">("ortu");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    if (data.user) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
      router.push(profile?.role === "guru" ? "/guru/dashboard" : "/ortu/dashboard");
      router.refresh();
    }
    setLoading(false);
    
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role } },
    });
    if (err) { setError(err.message); setLoading(false); return; }
    // Update phone if provided
    setSuccess("Akun berhasil dibuat! Silakan cek email untuk verifikasi, lalu login.");
    setMode("login");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10"
           style={{ background: "var(--green-dark)" }}>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">IIS</div>
            <div>
              <div className="text-white font-semibold text-sm">IIS PSM Daycare</div>
              <div className="text-white/50 text-xs">& Preschool Magetan</div>
            </div>
          </div>
          <h1 className="text-white font-serif text-4xl font-bold leading-tight mb-4">
            Portal Terpadu<br />Guru & Orang Tua
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Pantau perkembangan si kecil setiap hari — laporan harian, portofolio kegiatan, dan laporan 3 bulanan dalam satu platform.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "📊", title: "Daily Report", desc: "Laporan harian mood, makan, tidur & ibadah" },
            { icon: "📷", title: "Portofolio", desc: "Foto & video kegiatan anak setiap hari" },
            { icon: "📋", title: "Laporan Triwulan", desc: "Perkembangan 8 fitrah per 3 bulan" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <div className="text-white text-sm font-medium">{f.title}</div>
                <div className="text-white/50 text-xs">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="card mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#1a3a2a] mb-1">
              {mode === "login" ? "Masuk ke Portal" : "Daftar Akun Baru"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {mode === "login" ? "Selamat datang kembali" : "Buat akun untuk orang tua siswa"}
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">{success}</div>
            )}

            <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-4">
              {mode === "register" && (
                <>
                  <div>
                    <label className="label">Nama Lengkap</label>
                    <input className="input" type="text" placeholder="Nama lengkap orang tua/guru"
                           value={fullName} onChange={e => setFullName(e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["ortu", "guru"] as const).map(r => (
                        <button key={r} type="button"
                          onClick={() => setRole(r)}
                          className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            role === r
                              ? "bg-[#1a3a2a] text-white border-[#1a3a2a]"
                              : "bg-white text-gray-600 border-[#c5d9cc] hover:border-[#1a3a2a]"
                          }`}>
                          {r === "ortu" ? "👨‍👩‍👧 Orang Tua" : "👩‍🏫 Guru"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">No. HP / WhatsApp</label>
                    <input className="input" type="tel" placeholder="08xx-xxxx-xxxx"
                           value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </>
              )}
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="email@contoh.com"
                       value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="label">Password</label>
                <input className="input" type="password" placeholder="Min. 8 karakter"
                       value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base mt-2">
                {loading ? "Memproses..." : mode === "login" ? "Masuk →" : "Daftar →"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setSuccess(""); }}
                      className="text-[#1a3a2a] font-semibold hover:underline">
                {mode === "login" ? "Daftar" : "Masuk"}
              </button>
            </p>
          </div>
          <p className="text-center text-xs text-gray-400">
            © 2026 IIS PSM Daycare & Preschool · Magetan
          </p>
        </div>
      </div>
    </div>
  );
}
