"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MOOD_OPTIONS, FITRAH_LIST } from "@/types";

const IBADAH_LIST = [
  "Doa sebelum makan", "Dzikir pagi", "Hafalan surat pendek",
  "Shalat Dzuhur berjamaah", "Shalat Ashar berjamaah",
  "Cuci tangan 6 langkah", "Toilet training mandiri",
];

export default function DailyReportClient({ siswaList, guruId }: { siswaList: any[]; guruId: string }) {
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];

  const [siswaId, setSiswaId] = useState("");
  const [tanggal, setTanggal] = useState(today);
  const [sesi, setSesi] = useState("Full Day");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [moodDatang, setMoodDatang] = useState("");
  const [moodPulang, setMoodPulang] = useState("");
  const [kondisi, setKondisi] = useState("Sehat");
  const [suhu, setSuhu] = useState("36.5");
  const [sarapan, setSarapan] = useState("Habis");
  const [snackPagi, setSnackPagi] = useState("Habis");
  const [makanSiang, setMakanSiang] = useState("Habis");
  const [snackSore, setSnackSore] = useState("Habis");
  const [minumGelas, setMinumGelas] = useState(5);
  const [tidurSiang, setTidurSiang] = useState("Nyenyak");
  const [durasiTidur, setDurasiTidur] = useState("60 menit");
  const [bakKali, setBakKali] = useState(4);
  const [bab, setBab] = useState("Ya, normal");
  const [ibadah, setIbadah] = useState<string[]>([]);
  const [fitrah, setFitrah] = useState<string[]>([]);
  const [observasi, setObservasi] = useState("");
  const [catatanOrtu, setCatatanOrtu] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function toggleIbadah(item: string) {
    setIbadah(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  }
  function toggleFitrah(key: string) {
    setFitrah(prev => prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]);
  }

  async function handleSave(kirim: boolean) {
    if (!siswaId) return setMsg("Pilih siswa terlebih dahulu.");
    setSaving(true); setMsg("");
    const payload = {
      siswa_id: siswaId, guru_id: guruId, tanggal, sesi,
      kehadiran, mood_datang: moodDatang || null, mood_pulang: moodPulang || null,
      kondisi_kesehatan: kondisi, suhu_tubuh: suhu,
      sarapan, snack_pagi: snackPagi, makan_siang: makanSiang,
      snack_sore: snackSore, minum_gelas: minumGelas,
      tidur_siang: tidurSiang, durasi_tidur: durasiTidur,
      bak_kali: bakKali, bab,
      ibadah_checklist: ibadah, fitrah_distimulasi: fitrah,
      observasi_guru: observasi, catatan_ortu: catatanOrtu,
      status: kirim ? "terkirim" : "draft",
      dikirim_at: kirim ? new Date().toISOString() : null,
    };

    const { error } = await supabase.from("daily_reports").upsert(payload, {
      onConflict: "siswa_id,tanggal",
    });

    if (error) { setMsg("Gagal: " + error.message); }
    else {
      setMsg(kirim ? "✅ Daily report berhasil dikirim ke orang tua!" : "💾 Draft tersimpan.");
      if (kirim) {
        // Create notification for ortu
        const { data: siswa } = await supabase.from("siswa").select("ortu_id, nama").eq("id", siswaId).single();
        if (siswa?.ortu_id) {
          await supabase.from("notifikasi").insert({
            user_id: siswa.ortu_id, tipe: "daily_report",
            judul: `Daily Report ${siswa.nama}`,
            pesan: `Laporan harian ${siswa.nama} untuk tanggal ${tanggal} telah dikirim.`,
          });
        }
      }
    }
    setSaving(false);
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-serif text-3xl font-bold text-[#1a3a2a] mb-2">✅ Daily Report</h1>
      <p className="text-sm text-gray-500 mb-8">Isi laporan harian portofolio siswa</p>

      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm mb-6 ${msg.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : msg.startsWith("💾") ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
          {msg}
        </div>
      )}

      {/* Header */}
      <div className="card mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="label">Pilih Siswa</label>
          <select className="input" value={siswaId} onChange={e => setSiswaId(e.target.value)}>
            <option value="">– Pilih Siswa –</option>
            {siswaList.map(s => <option key={s.id} value={s.id}>{s.nama} – {s.kelas}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Tanggal</label>
          <input type="date" className="input" value={tanggal} onChange={e => setTanggal(e.target.value)} />
        </div>
        <div>
          <label className="label">Sesi</label>
          <select className="input" value={sesi} onChange={e => setSesi(e.target.value)}>
            {["Pagi", "Siang", "Full Day"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Kehadiran</label>
          <select className="input" value={kehadiran} onChange={e => setKehadiran(e.target.value)}>
            {["Hadir", "Izin", "Sakit", "Alpha"].map(k => <option key={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* Mood */}
      <div className="card mb-5">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">😊 Mood & Kondisi</h3>
        <div className="space-y-4">
          {[{ label: "Mood saat datang", val: moodDatang, set: setMoodDatang }, { label: "Mood saat pulang", val: moodPulang, set: setMoodPulang }].map(({ label, val, set }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-36 flex-shrink-0">{label}</span>
              <div className="flex gap-2">
                {MOOD_OPTIONS.map(m => (
                  <button key={m.value} type="button"
                    onClick={() => set(m.value)}
                    className={`text-2xl px-2 py-1 rounded-xl border-2 transition-all ${val === m.value ? "border-[#1a3a2a] bg-[#e8f0eb]" : "border-transparent hover:border-[#c5d9cc]"}`}
                    title={m.label}>{m.emoji}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Kondisi Kesehatan</label>
              <select className="input" value={kondisi} onChange={e => setKondisi(e.target.value)}>
                {["Sehat", "Kurang sehat", "Demam ringan", "Batuk/pilek"].map(k => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Suhu Tubuh (°C)</label>
              <input className="input" type="text" value={suhu} onChange={e => setSuhu(e.target.value)} placeholder="36.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Makan */}
      <div className="card mb-5">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">🍽️ Makan & Minum</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Sarapan", val: sarapan, set: setSarapan, opts: ["Habis","Setengah","Sedikit","Tidak makan"] },
            { label: "Snack pagi", val: snackPagi, set: setSnackPagi, opts: ["Habis","Setengah","Tidak makan"] },
            { label: "Makan siang", val: makanSiang, set: setMakanSiang, opts: ["Habis","Setengah","Sedikit","Tidak makan"] },
            { label: "Snack sore", val: snackSore, set: setSnackSore, opts: ["Habis","Setengah","Tidak makan"] },
          ].map(({ label, val, set, opts }) => (
            <div key={label}>
              <label className="label">{label}</label>
              <select className="input" value={val} onChange={e => set(e.target.value)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="label">Minum (gelas)</label>
            <input type="number" className="input" value={minumGelas} onChange={e => setMinumGelas(+e.target.value)} min={0} max={15} />
          </div>
        </div>
      </div>

      {/* Tidur */}
      <div className="card mb-5">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">💤 Tidur & BAB/BAK</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Tidur siang</label>
            <select className="input" value={tidurSiang} onChange={e => setTidurSiang(e.target.value)}>
              {["Nyenyak","Setengah","Tidak tidur"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Durasi tidur</label>
            <input className="input" value={durasiTidur} onChange={e => setDurasiTidur(e.target.value)} placeholder="60 menit" />
          </div>
          <div>
            <label className="label">BAK (kali)</label>
            <input type="number" className="input" value={bakKali} onChange={e => setBakKali(+e.target.value)} min={0} />
          </div>
          <div>
            <label className="label">BAB</label>
            <select className="input" value={bab} onChange={e => setBab(e.target.value)}>
              {["Ya, normal","Ya, tidak normal","Tidak"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Ibadah */}
      <div className="card mb-5">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">☪️ Ibadah & Aktivitas</h3>
        <div className="grid grid-cols-2 gap-2">
          {IBADAH_LIST.map(item => (
            <label key={item} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" checked={ibadah.includes(item)} onChange={() => toggleIbadah(item)}
                className="w-4 h-4 rounded accent-[#1a3a2a]" />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Fitrah */}
      <div className="card mb-5">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">🌱 Fitrah yang Distimulasi</h3>
        <div className="grid grid-cols-4 gap-2">
          {FITRAH_LIST.map(f => (
            <button key={f.key} type="button" onClick={() => toggleFitrah(f.key)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-medium transition-all ${
                fitrah.includes(f.key) ? "border-[#1a3a2a] bg-[#e8f0eb] text-[#1a3a2a]" : "border-[#c5d9cc] text-gray-500 hover:border-[#3d7a52]"
              }`}>
              <span className="text-xl">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catatan */}
      <div className="card mb-6">
        <h3 className="font-semibold text-[#1a3a2a] mb-4">📝 Catatan</h3>
        <div className="space-y-3">
          <div>
            <label className="label">Observasi Guru</label>
            <textarea className="input" rows={3} value={observasi} onChange={e => setObservasi(e.target.value)}
              placeholder="Tuliskan observasi perkembangan anak hari ini..." />
          </div>
          <div>
            <label className="label">Catatan untuk Orang Tua</label>
            <textarea className="input" rows={2} value={catatanOrtu} onChange={e => setCatatanOrtu(e.target.value)}
              placeholder="Pesan atau informasi penting untuk orang tua..." />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => handleSave(false)} disabled={saving} className="btn-outline">
          💾 Simpan Draft
        </button>
        <button onClick={() => handleSave(true)} disabled={saving} className="btn-primary flex-1">
          📨 Simpan & Kirim ke Orang Tua →
        </button>
      </div>
    </div>
  );
}
