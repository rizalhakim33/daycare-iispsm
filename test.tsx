"use client";

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
type TabId = "dashboard" | "laporan-harian" | "portofolio" | "siswa" | "laporan";
type PortalTab = { id: TabId; label: string; badge?: number };

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const PORTAL_TABS: PortalTab[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "laporan-harian", label: "Laporan Harian", badge: 3 },
  { id: "portofolio", label: "Input Portofolio" },
  { id: "siswa", label: "Data Siswa" },
  { id: "laporan", label: "Laporan 3 Bulanan" },
];

const PROGRAMS = [
  { age: "3–12 Bulan", badgeClass: "teal", icon: "🍼", name: "Infant 1", desc: "Stimulasi awal perkembangan bayi: gerakan, suara, sentuhan, dan ikatan emosional yang penuh kasih." },
  { age: "1–3 Tahun", badgeClass: "mint", icon: "🎨", name: "Toddler", desc: "Belajar melalui bermain yang kreatif — mengembangkan bahasa, kemampuan sosial, dan mengenalkan nilai-nilai Islam." },
  { age: "4 Tahun", badgeClass: "yellow", icon: "📚", name: "KB / Preschool 1", desc: "Lingkungan belajar terstruktur namun menyenangkan — mempersiapkan anak secara akademis dan spiritual." },
  { age: "5 Tahun", badgeClass: "orange", icon: "⭐", name: "TK A / Preschool 2", desc: "Program TK komprehensif membangun fondasi membaca, matematika, sains, dan karakter Islami yang kuat." },
  { age: "6 Tahun", badgeClass: "purple", icon: "🎓", name: "TK B / Preschool 3", desc: "Persiapan masuk SD dengan kurikulum holistik — akademik, karakter Islami, dan kesiapan sosial-emosional." },
];

const SENSORI_CARDS = [
  {
    num: "1", icon: "🐾", color: "c1",
    title: "Dasar Sensorik", sub: "Basic Sensory System",
    body: "Stimulasi sistem sensorik utama: sentuhan, gerakan, keseimbangan, dan kesadaran tubuh.",
    acts: ["Bermain pasir & air bertekstur", "Pijat & sentuhan lembut", "Ayunan & matras keseimbangan", "Permainan tekstur alami"],
  },
  {
    num: "2", icon: "🏃", color: "c2",
    title: "Integrasi Sensorik & Motorik", sub: "Sensory–Motor Integration",
    body: "Menggabungkan informasi sensorik dengan gerakan tubuh, koordinasi berkembang.",
    acts: ["Bermain bola & lempar tangkap", "Menyusun balok & puzzle", "Permainan keseimbangan", "Merangkak & memanjat aman"],
  },
  {
    num: "3", icon: "🎯", color: "c3",
    title: "Persepsi & Kognitif", sub: "Perception & Cognition",
    body: "Anak mulai mengolah informasi sensorik menjadi pemahaman kompleks — warna, bentuk, ukuran.",
    acts: ["Bermain edukatif & matching", "Membuat bentuk & pola", "Mengenal warna & bentuk", "Problem solving sederhana"],
  },
  {
    num: "4", icon: "🌟", color: "c4",
    title: "Fungsi Kompleks & Perilaku", sub: "Complex Function & Behaviour",
    body: "Seluruh kemampuan sensori terintegrasi. Anak mampu berinteraksi sosial dan menunjukkan kemandirian.",
    acts: ["Bermain peran & sosialisasi", "Kegiatan kelompok Islam", "Ekspresi seni & empati", "Kemandirian & life skills"],
  },
];

const FITRAH_CARDS = [
  { cls: "fc-keimanan", icon: "☪️", name: "Fitrah Keimanan", tagline: "Atmosfir Keshalihan & Keteladanan", desc: "Menanamkan cinta kepada Allah, Rasul, Al-Qur'an, dan Islam melalui imaji positif & keteladanan — bukan doktrin ketakutan.", list: ["Bacakan kisah Rasulullah SAW & indahnya surga", "Kenalkan Allah di setiap peristiwa: adzan, hujan, terbit matahari", "Baca doa di setiap memulai aktivitas, tumbuhkan getaran", "Hindari kisah kengerian — gunakan imaji positif & indah"] },
  { cls: "fc-belajar", icon: "🧠", name: "Fitrah Belajar & Bernalar", tagline: "Art of Discovery & Creative Imagination", desc: "Menumbuhkan perasaan belajar, bukan kepintaran. Diawali imaji positifnya dan stimulasi psikomotorik melalui eksplorasi langsung.", list: ["Belajar mengeksplorasi tubuh dan anggota keluarga", "Memberi inspirasi belajar di alam secara langsung (muscle memory)", "Membacakan buku bersastra indah untuk membangun hipotesis", "Dorong abstraksi & imajinasi — jadikan tema belajar dari kehidupan nyata"] },
  { cls: "fc-bakat", icon: "⭐", name: "Fitrah Bakat & Kepemimpinan", tagline: "Mengamati & Menguatkan Sifat Unik", desc: "Setiap anak adalah pemimpin masa depan. Sifat unik diamati, dikuatkan, dan diberi label positif sejak dini.", list: ["Memelihara hewan & tumbuhan untuk menguatkan executive functioning", "Beri label positif sesuai sifat unik: 'sang orator', 'komunikator handal'", "Menghargai adab & akhlak — beri peran sesuai bakat", "Anak cerewet = sang orator; anak suka menelepon = komunikator handal"] },
  { cls: "fc-seksualitas", icon: "❤️", name: "Fitrah Seksualitas", tagline: "Kelekatan & Identitas Gender", desc: "Menguatkan konsep diri berupa identitas gender yang jelas melalui kelekatan aman antara anak, ayah, dan ibu.", list: ["Menyusui dengan penuh cinta — ASI membangun kelekatan (attachment)", "Bermain peran bersama Ayah & Bunda untuk menjalin kelekatan", "Membedakan 'cowok' dan 'cewek' sesuai gendernya", "Peluk dengan cinta, ajarkan thaharah & rasa malu"] },
  { cls: "fc-bahasa", icon: "🌿", name: "Fitrah Bahasa & Estetika", tagline: "Kebebasan Berekspresi & Apresiasi Keindahan", desc: "Anak dikuatkan rasa keindahannya melalui inderawi: penglihatan, pendengaran, sentuhan — perlahan beranjak ke imaji & bahasa yang indah.", list: ["Kenalkan indahnya sastra, cerita, gambar, bernyanyi sesuai usia", "Bacakan kisah bersastra baik dan indah — Bacalah juga Kitaullah", "Beri kebebasan coretan, lukisan, bunyi — jangan paksa akademik", "Usia 0–2: inderawi; Usia 2–6: imaji & ekspresi keindahan"] },
  { cls: "fc-sosial", icon: "🤝", name: "Fitrah Individualitas & Sosialitas", tagline: "Ego Sentris & Interaksi Sosial Sehat", desc: "Mengenalkan interaksi sosial yang sehat melalui bermain, memberikan contoh adab, dan menanamkan kasih sayang — bukan kepatuhan berbasis ketakutan.", list: ["Beri ruang memuaskan ego sentrisnya — tidak memaksa berbagi jika belum siap", "Bacakan kisah indahnya bersama — bangun rutinitas cerita", "Memberi julukan positif dan label milik privasinya", "Ayah memberikan suplai 'ego' dengan bermain bersama setiap hari"] },
  { cls: "fc-jasmani", icon: "🍽️", name: "Fitrah Jasmani", tagline: "Pola Hidup Fitri & Sensori Integrasi", desc: "Pola makan halal-thayyib, pola tidur fitri, pola gerak aktif, dan pola kebersihan alami. Stimulasi sensori integrasi 4 level.", list: ["Pola makan halal-thayyib — makanan bergizi & alami", "Pola tidur fitri — tidur cukup sesuai usia", "Pola gerak aktif & sensorik setiap hari", "Sensori integrasi: CNS → Sensori Motor → Perceptual Motor → Kognitif"] },
  { cls: "fc-adab", icon: "🕌", name: "Adab & Akhlak", tagline: "Diimajikan Positif, Bukan Disiplin Keras", desc: "Adab ditanamkan & ditembleng melalui keteladanan, bukan perintah. Anak suka melakukannya karena mencintai keindahan akhlak.", list: ["Keteladanan guru & orang tua sebagai metode utama", "Adab diimajikan indah — anak melakukannya dengan suka cita", "Tanamkan adab berinteraksi, adab makan, adab belajar", "Penguatan akhlak melalui sikap nyata guru & orang tua setiap hari"] },
];

const FACILITIES = [
  { icon: "🍽️", title: "Dapur Gizi Terpadu", desc: "Menu halal thayyib bergizi, masak segar setiap hari" },
  { icon: "🛏️", title: "Ruang Tidur Siang", desc: "Nyaman, bersih, AC – tidur siang berkualitas" },
  { icon: "🌿", title: "Area Bermain Hijau", desc: "Rumput alami & tanaman, stimulasi sensorik outdoor" },
  { icon: "📚", title: "Perpustakaan Mini", desc: "Ratusan buku anak berkualitas berbahasa Indonesia & Arab" },
  { icon: "💧", title: "Kolam Sensori Air", desc: "Bermain air terstruktur, higienis & terawasi" },
  { icon: "🎵", title: "Ruang Musik Aktif", desc: "Alat musik anak & aktivitas nasyid Islami setiap hari" },
];

const DOE_ITEMS = [
  { icon: "🕌", name: "Fitrah Keimanan", sub: "Spiritual" },
  { icon: "🧠", name: "Fitrah Belajar", sub: "Kognitif" },
  { icon: "⭐", name: "Fitrah Bakat", sub: "Kepemimpinan" },
  { icon: "❤️", name: "Fitrah Seksualitas", sub: "Identitas Diri" },
  { icon: "🌿", name: "Fitrah Bahasa", sub: "Estetika" },
  { icon: "🤝", name: "Fitrah Sosial", sub: "Interaksi" },
  { icon: "🍽️", name: "Fitrah Jasmani", sub: "Kesehatan" },
  { icon: "📿", name: "Adab & Akhlak", sub: "Karakter" },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function IISPSMPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [contactForm, setContactForm] = useState({ nama: "", namaAnak: "", wa: "", usia: "", pesan: "" });

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        /* Tab Badge */
        .tab-badge{display:inline-block;background:#e74c3c;color:white;font-size:10px;font-weight:700;border-radius:10px;padding:1px 6px;margin-left:5px;vertical-align:middle}
        /* Filter */
        .filter-btn{padding:4px 12px;border:1px solid var(--green-border);border-radius:20px;font-size:12px;font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--muted);cursor:pointer;transition:all .2s}
        .filter-btn.active,.filter-btn:hover{background:var(--green-dark);color:white;border-color:var(--green-dark)}
        /* Quick Actions */
        .quick-actions-bar{background:var(--green-pale);border:1px solid var(--green-border);border-radius:var(--radius);padding:18px 20px;margin-top:18px}
        .qa-btn{padding:8px 14px;border:1.5px solid var(--green-border);border-radius:8px;background:var(--white);color:var(--green-dark);font-size:13px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap}
        .qa-btn:hover{background:var(--green-dark);color:white;border-color:var(--green-dark)}
        /* Siswa Table */
        .siswa-table-wrap{overflow-x:auto;border-radius:10px;border:1px solid var(--green-border)}
        .siswa-table{width:100%;border-collapse:collapse;font-size:13px}
        .siswa-table th{background:var(--green-dark);color:white;padding:12px 14px;text-align:left;font-weight:500;white-space:nowrap}
        .siswa-table td{padding:11px 14px;border-bottom:1px solid var(--green-border);vertical-align:middle}
        .siswa-table tbody tr:last-child td{border-bottom:none}
        .siswa-table tbody tr:hover{background:var(--green-pale)}
        /* Riwayat */
        .riwayat-item{display:flex;align-items:flex-start;gap:14px;background:var(--white);border:1px solid var(--green-border);border-radius:10px;padding:14px 16px;transition:box-shadow .2s}
        .riwayat-item:hover{box-shadow:0 4px 16px rgba(26,58,42,0.08)}
        .rw-icon{width:40px;height:40px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px}
        .rw-icon.daily{background:#e8f5e0;color:#3a7a20}
        .rw-icon.porto{background:#e8f0ff;color:#4a50d9}
        .rw-icon.laporan{background:#fff0e8;color:#d96a2a}
        /* Fitrah cards */
        .fitrah-cards-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px}
        .fitrah-card{background:var(--white);border-radius:14px;padding:24px 20px;border:1.5px solid var(--green-border);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column;gap:14px}
        .fitrah-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(26,58,42,0.10)}
        .fc-header{display:flex;align-items:flex-start;gap:14px}
        .fc-icon{font-size:28px;flex-shrink:0}
        .fc-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:var(--green-dark)}
        .fc-tagline{font-size:11px;color:var(--muted);font-style:italic;margin-top:2px}
        .fc-body p{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:10px}
        .fc-list{list-style:none;padding:0}
        .fc-list li{font-size:12px;color:var(--muted);padding:3px 0;display:flex;gap:6px;align-items:flex-start}
        .fc-list li::before{content:'●';color:var(--gold);font-size:7px;margin-top:5px;flex-shrink:0}
        .fitrah-quote-bar{background:var(--green-dark);border-radius:var(--radius);padding:24px 32px;text-align:center;color:white}
        .fitrah-quote-bar p{font-family:'Cormorant Garamond',serif;font-size:19px;font-style:italic;margin-bottom:10px}
        .fitrah-quote-bar span{font-size:12px;color:rgba(255,255,255,0.55);letter-spacing:.5px}
        /* Sensori cards */
        .sensori-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .sensori-card{border-radius:var(--radius);padding:24px 20px;position:relative;overflow:hidden}
        .sensori-card.c1{background:var(--green-pale);border:1px solid var(--green-border)}
        .sensori-card.c2{background:#e8f5f0;border:1px solid #b8ddd0}
        .sensori-card.c3{background:var(--green-mid);color:white}
        .sensori-card.c4{background:var(--gold);color:white}
        .sensori-num{font-size:11px;font-weight:700;letter-spacing:1px;opacity:0.6;margin-bottom:4px}
        .sensori-icon-sm{font-size:20px;margin-bottom:10px}
        .sensori-card-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;margin-bottom:4px}
        .sensori-card-sub{font-size:11px;opacity:.65;margin-bottom:14px;font-style:italic}
        .sensori-body{font-size:12px;line-height:1.6;opacity:.85}
        .sensori-act-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:.6;margin:12px 0 6px}
        .sensori-act-list{list-style:none;padding:0}
        .sensori-act-list li{font-size:12px;opacity:.8;padding:2px 0;display:flex;gap:6px}
        .sensori-act-list li::before{content:'●';font-size:7px;margin-top:5px;opacity:.6}
        /* Facilities */
        .fac-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .fac-items{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}
        .fac-item{display:flex;gap:14px;align-items:flex-start}
        .fac-icon-box{width:40px;height:40px;border-radius:10px;background:var(--green-pale);border:1px solid var(--green-border);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
        /* Gallery */
        .gallery-grid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(2,180px);gap:12px}
        .gallery-item{background:var(--green-pale);border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--green-border);transition:transform .3s;cursor:pointer}
        .gallery-item:hover{transform:scale(1.03)}
        /* Contact */
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
        .form-group{margin-bottom:16px}
        .form-group label{display:block;font-size:13px;font-weight:500;color:var(--muted);margin-bottom:6px}
        .form-group input,.form-group select,.form-group textarea{width:100%;border:1px solid var(--green-border);border-radius:8px;padding:11px 14px;font-size:14px;color:var(--text);font-family:'DM Sans',sans-serif;background:var(--cream);transition:border-color .2s;outline:none}
        .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--green-mid)}
        .form-group textarea{resize:vertical;min-height:100px}
        /* Portal */
        .portal-tabs{display:flex;border-bottom:2px solid var(--green-border);margin-bottom:48px}
        .ptab{padding:14px 28px;font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .2s}
        .ptab.active{color:var(--green-dark);border-bottom-color:var(--green-dark)}
        .ptab:hover:not(.active){color:var(--green-mid)}
        .dash-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:32px}
        .dash-card{background:var(--cream);border:1px solid var(--green-border);border-radius:var(--radius);padding:20px}
        .today-activities{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .activity-list-card,.student-list-card{background:var(--cream);border:1px solid var(--green-border);border-radius:var(--radius);padding:24px}
        .activity-item,.student-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--green-border)}
        .activity-item:last-child,.student-item:last-child{border-bottom:none}
        /* Programs */
        .programs-grid{display:flex;gap:20px;overflow-x:auto;padding-bottom:8px}
        .prog-card{flex:0 0 240px;background:var(--white);border-radius:var(--radius-lg);padding:28px 24px;border:2px solid transparent;transition:all .3s;cursor:pointer}
        .prog-card:hover{border-color:var(--green-mid);transform:translateY(-4px);box-shadow:0 16px 40px rgba(26,58,42,0.1)}
        .prog-age-badge{display:inline-block;padding:4px 12px;border-radius:12px;font-size:11px;font-weight:500;margin-bottom:16px}
        .prog-age-badge.teal{background:#e0f5f0;color:#1a7a60}
        .prog-age-badge.mint{background:#e8f5e0;color:#3a7a20}
        .prog-age-badge.yellow{background:#fdf5e0;color:#8a6a00}
        .prog-age-badge.orange{background:#fdf0e0;color:#8a4a00}
        .prog-age-badge.purple{background:#f0e8f5;color:#6a2080}
        /* DOE */
        .doe-grid{display:flex;justify-content:center;gap:20px;flex-wrap:wrap}
        .doe-card{background:var(--white);border:1px solid var(--green-border);border-radius:var(--radius);padding:24px 20px;text-align:center;width:140px;transition:all .25s}
        .doe-card:hover{border-color:var(--green-mid);transform:translateY(-4px);box-shadow:0 12px 28px rgba(26,58,42,0.1)}
        /* Notify */
        .notify{position:fixed;bottom:80px;right:24px;z-index:999;background:var(--green-dark);color:white;padding:14px 20px;border-radius:12px;font-size:14px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 30px rgba(0,0,0,0.2);pointer-events:none;transition:all .4s cubic-bezier(.34,1.56,.64,1)}
        .notify.show{opacity:1;transform:translateY(0)}
        .notify.hide{opacity:0;transform:translateY(80px)}
        /* Portal daily form */
        .daily-form{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .daily-card{background:var(--cream);border:1px solid var(--green-border);border-radius:var(--radius);padding:24px}
        .mood-btns{display:flex;gap:8px}
        .mood-btn{font-size:20px;cursor:pointer;padding:4px 8px;border-radius:8px;border:1.5px solid transparent;transition:all .15s;background:none}
        .mood-btn:hover,.mood-btn.active{border-color:var(--green-mid);background:var(--green-pale)}
        .checklist-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--green-border)}
        .checklist-item:last-child{border-bottom:none}
        /* Porto */
        .porto-form{background:var(--cream);border:1px solid var(--green-border);border-radius:var(--radius-lg);padding:32px}
        .porto-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
        .porto-fitrah-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
        .fitrah-chip{border:1.5px solid var(--green-border);border-radius:8px;padding:10px 8px;text-align:center;cursor:pointer;transition:all .2s;font-size:11px;color:var(--muted)}
        .fitrah-chip:hover,.fitrah-chip.selected{border-color:var(--green-dark);background:var(--green-pale);color:var(--green-dark);font-weight:500}
        .upload-area{border:2px dashed var(--green-border);border-radius:var(--radius);padding:40px;text-align:center;margin-bottom:20px;cursor:pointer;transition:all .2s;background:var(--white)}
        .upload-area:hover{border-color:var(--green-mid);background:var(--green-pale)}
        /* Laporan 3 Bulanan */
        .laporan-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:28px}
        .laporan-card{background:var(--white);border:1px solid var(--green-border);border-radius:var(--radius);padding:20px}
        /* Vision box */
        .vision-box{background:var(--green-dark);border-radius:var(--radius-lg);padding:56px 64px;text-align:center;max-width:780px;margin:0 auto 64px;position:relative;overflow:hidden}
        .vision-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%, rgba(212,168,67,0.12) 0%, transparent 60%)}
        /* Sensori explainer */
        .sensori-explainer{background:var(--green-dark);border-radius:var(--radius-lg);padding:32px 40px;margin-bottom:40px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
        .sensori-explainer p{font-size:15px;color:rgba(255,255,255,0.8);line-height:1.7}
        .sensori-checks{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .sensori-check{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,0.85)}
        .check-icon{width:20px;height:20px;border-radius:50%;background:rgba(212,168,67,0.2);border:1px solid rgba(212,168,67,0.4);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--gold);flex-shrink:0}
        /* Hero */
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .hero-content>*{animation:fadeUp .7s ease both}
        .hero-badge-top{animation:fadeUp .5s ease both}
        .hero-content>*:nth-child(1){animation-delay:.1s}
        .hero-content>*:nth-child(2){animation-delay:.2s}
        .hero-content>*:nth-child(3){animation-delay:.3s}
        .hero-content>*:nth-child(4){animation-delay:.4s}
        .hero-content>*:nth-child(5){animation-delay:.5s}
        /* Responsive */
        @media(max-width:900px){
          .fac-grid,.contact-grid,.daily-form,.today-activities{grid-template-columns:1fr}
          .sensori-grid,.laporan-grid{grid-template-columns:repeat(2,1fr)}
          .fitrah-cards-grid{grid-template-columns:1fr 1fr}
          .porto-row{grid-template-columns:1fr}
          nav ul{display:none}
        }
      `}</style>

      {/* ── TOAST ── */}
      <div className={`notify ${showToast ? "show" : "hide"}`}>
        ✅ <span>{toast}</span>
      </div>

      {/* ── NAV ── */}
      <nav>
        <a className="nav-brand" href="#">
          <div className="nav-logo">IIS</div>
          <div>
            <div className="nav-name">IIS PSM</div>
            <div className="nav-sub">Daycare &amp; Preschool – Magetan</div>
          </div>
        </a>
        <ul>
          <li><a href="#vision">Vision &amp; Values</a></li>
          <li><a href="#programs">Programs</a></li>
          <li><a href="#facilities">Facilities</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="btn-gold" onClick={() => scrollTo("contact")}>Daftar Sekarang</button>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-bg-img">
          <div className="hero-bg-img-pattern" />
        </div>
        <div className="hero-bg" />
        <div
          className="hero-badge-top"
          style={{
            position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
            zIndex: 3, background: "rgba(212,168,67,0.2)", border: "1px solid rgba(212,168,67,0.5)",
            color: "var(--gold)", fontSize: 12, fontWeight: 500, padding: "7px 20px", borderRadius: 20,
            letterSpacing: 1, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
          }}
        >
          <div className="hero-badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
          Pendaftaran Tahun Ajaran 2025/2026 Dibuka
        </div>
        <div className="hero-content">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, lineHeight: 1.0, fontWeight: 700, color: "white", marginBottom: 24 }}>
            Tempat Terbaik<br /><em>Tumbuh &amp; Berkembang</em>
          </div>
          <p className="hero-desc">
            IIS PSM Daycare &amp; Preschool Magetan — Membangun generasi Hukma Shabiya yang berkarakter,
            cerdas, dan berakhlak mulia dengan pendekatan Fitrah Based Education.
          </p>
          <p className="hero-vision">"Membangun Generasi Hukma Shabiya — Insan Ulum wa Amal."</p>
          <div className="hero-actions">
            <button className="btn-gold-solid" onClick={() => scrollTo("contact")}>Daftar Sekarang</button>
            <button className="btn-outline-white" onClick={() => scrollTo("programs")}>Lihat Program</button>
          </div>
          <div className="hero-stats">
            {[["120+", "Siswa Aktif"], ["8", "Aspek Fitrah"], ["15+", "Guru Terlatih"], ["5★", "Rating Orang Tua"]].map(([num, label]) => (
              <div className="hero-stat" key={label}>
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VISION ── */}
      <section className="vision-section" id="vision">
        <div className="sec-header center">
          <div className="sec-label">VISI &amp; NILAI</div>
          <div className="sec-title">Fondasi Pendidikan Kami</div>
        </div>
        <div className="vision-box">
          <div className="label" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(212,168,67,0.8)", marginBottom: 20 }}>VISI</div>
          <div className="quote" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontStyle: "italic", fontWeight: 400, color: "white", lineHeight: 1.5, position: "relative", zIndex: 1 }}>
            "Mewujudkan generasi Hukma Shabiya yang memiliki fitrah keimanan, kecerdasan majemuk, karakter mulia, dan kesiapan menghadapi tantangan masa depan."
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div className="sec-label">DIMENSI OF EXCELLENCE</div>
        </div>
        <div className="doe-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>8 Dimensi Kecemerlangan</div>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 15, marginBottom: 40 }}>
          Setiap aspek dirancang untuk membangun manusia seutuhnya — jiwa, akal, raga, dan sosial.
        </p>
        <div className="doe-grid">
          {DOE_ITEMS.map((d) => (
            <div className="doe-card" key={d.name}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{d.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--green-dark)", marginBottom: 4 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="programs-section" id="programs" style={{ background: "var(--cream2)" }}>
        <div className="sec-header">
          <div className="sec-label">JENJANG PROGRAM</div>
          <div className="sec-title">Program Kami</div>
          <p className="sec-desc">Dari bayi hingga TK B — setiap jenjang dirancang khusus sesuai tahapan tumbuh kembang.</p>
        </div>
        <div className="programs-grid">
          {PROGRAMS.map((p) => (
            <div className="prog-card" key={p.name}>
              <div className={`prog-age-badge ${p.badgeClass}`}>{p.age}</div>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, marginBottom: 10, color: "var(--green-dark)" }}>{p.name}</div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SENSORI INTEGRASI ── */}
      <section className="sensori-section" style={{ background: "var(--cream)", padding: "96px 64px" }}>
        <div className="sec-header center">
          <div className="sec-label">PROGRAM UNGGULAN</div>
          <div className="sec-title">Stimulasi 4 Level Sensori Integrasi</div>
          <p className="sec-desc" style={{ margin: "0 auto" }}>
            Di IIS PSM Daycare &amp; Preschool, kami menerapkan pendekatan berbasis Sensori Integrasi — memastikan setiap anak mendapatkan stimulasi yang tepat sesuai tahapan perkembangannya.
          </p>
        </div>
        <div className="sensori-explainer">
          <div>
            <div style={{ fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(212,168,67,0.8)", marginBottom: 10 }}>APA ITU SENSORI INTEGRASI?</div>
            <p>Sensori integrasi adalah proses di mana otak menerima informasi dari indera — sentuhan, penglihatan, pendengaran, dan gerakan tubuh — lalu mengolahnya menjadi respons yang tepat.</p>
          </div>
          <div className="sensori-checks">
            {["Deteksi dini gangguan perkembangan", "Stimulasi tepat sesuai usia", "Meningkatkan fokus & perilaku", "Mendukung kesiapan belajar"].map((c) => (
              <div className="sensori-check" key={c}><div className="check-icon">✓</div>{c}</div>
            ))}
          </div>
        </div>
        <div className="sensori-grid">
          {SENSORI_CARDS.map((c) => (
            <div className={`sensori-card ${c.color}`} key={c.num}>
              <div className="sensori-num">LEVEL {c.num}</div>
              <div className="sensori-icon-sm">{c.icon}</div>
              <div className="sensori-card-title">{c.title}</div>
              <div className="sensori-card-sub">{c.sub}</div>
              <div className="sensori-body">{c.body}</div>
              <div className="sensori-act-label">AKTIVITAS DI IIS PSM</div>
              <ul className="sensori-act-list">
                {c.acts.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--cream2)", borderRadius: "var(--radius)", padding: "28px 32px", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>🌱 Gut-Brain Sehat – Belajar Optimal</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 600, lineHeight: 1.6 }}>
              Kami memastikan setiap anak di IIS PSM mendapatkan stimulasi sensorik yang terstruktur dan menyenangkan — karena fondasi perkembangan yang kuat dimulai dari pengalaman bermain yang tepat.
            </p>
          </div>
          <button className="btn-green" style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "12px 24px", borderRadius: 24, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}
            onClick={() => showToastMsg("Tim kami akan segera menghubungi Anda!")}>
            🌿 Konsultasikan Kebutuhan Anak Anda
          </button>
        </div>
      </section>

      {/* ── 8 ASPEK FITRAH ── */}
      <section style={{ background: "#f9f6f0", padding: "96px 64px" }} id="kurikulum">
        <div className="sec-header center" style={{ marginBottom: 48 }}>
          <div className="sec-label">KURIKULUM HOLISTIK</div>
          <div className="sec-title">8 Aspek Fitrah</div>
          <p className="sec-desc" style={{ margin: "0 auto" }}>
            Stimulasi holistik sesuai tahapan tumbuh kembang usia dini. Setiap kegiatan dirancang <em>Learning Through Living</em> — bermain adalah belajar.
          </p>
        </div>
        <div className="fitrah-cards-grid">
          {FITRAH_CARDS.map((f) => (
            <div className={`fitrah-card ${f.cls}`} key={f.name}>
              <div className="fc-header">
                <div className="fc-icon">{f.icon}</div>
                <div>
                  <div className="fc-name">{f.name}</div>
                  <div className="fc-tagline">{f.tagline}</div>
                </div>
              </div>
              <div className="fc-body">
                <p>{f.desc}</p>
                <ul className="fc-list">
                  {f.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="fitrah-quote-bar">
          <p>"Perkembangan manusia memiliki sunnatullah — ada tahapan, ada masa emas bagi setiap fitrah."</p>
          <span>Tahapan: 0-2 thn · 2-6 thn (Pra Latih) · 7-10 thn (Pra Aqil Baligh 1) · 11-14 thn (Pra Aqil Baligh 2) · &gt;15 thn (Post Aqil Baligh)</span>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section style={{ background: "var(--cream2)", padding: "96px 64px" }} id="facilities">
        <div className="fac-grid">
          <div>
            <div className="sec-label">FASILITAS</div>
            <div className="sec-title">Lingkungan Belajar yang Aman &amp; Nyaman</div>
            <p className="sec-desc">Setiap sudut IIS PSM dirancang untuk mendukung eksplorasi, kreativitas, dan pertumbuhan optimal anak.</p>
            <div className="fac-items">
              {FACILITIES.map((f) => (
                <div className="fac-item" key={f.title}>
                  <div className="fac-icon-box">{f.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--green-dark)", marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "4/5", background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 48 }}>
              🏫
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Gedung IIS PSM Magetan</p>
            </div>
            <div style={{ position: "absolute", top: 16, right: 16, background: "var(--gold)", color: "white", width: 64, height: 64, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, textAlign: "center" }}>
              HALAL<br />100%
            </div>
            <div style={{ position: "absolute", bottom: 16, left: -20, background: "white", borderRadius: "var(--radius)", padding: "14px 18px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "var(--green-dark)" }}>100%</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Safe Environment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery-section" style={{ background: "var(--cream)", padding: "96px 64px" }} id="gallery">
        <div className="sec-header center">
          <div className="sec-label">GALERI</div>
          <div className="sec-title">Momen Berharga</div>
        </div>
        <div className="gallery-grid">
          {["🎨", "📚", "🌿", "🎵", "🏃", "🍽️", "💧", "🌸", "⭐", "🎯"].map((icon, i) => (
            <div className="gallery-item" key={i} style={i === 0 ? { gridColumn: "span 2", gridRow: "span 2" } : {}}>
              {icon}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--light)" }}>Momen berharga bersama siswa IIS PSM</p>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: "var(--cream2)", padding: "96px 64px" }} id="contact">
        <div className="sec-header center">
          <div className="sec-label">GET IN TOUCH</div>
          <div className="sec-title">Hubungi Kami</div>
          <p className="sec-desc" style={{ margin: "0 auto" }}>Kami senang menjawab pertanyaan Anda dan membantu proses pendaftaran anak Anda.</p>
        </div>
        <div className="contact-grid">
          {/* Form */}
          <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "36px 32px", border: "1px solid var(--green-border)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Kirim Pesan</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Nama Orang Tua</label>
                <input type="text" placeholder="Nama lengkap" value={contactForm.nama} onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Nama Anak</label>
                <input type="text" placeholder="Nama anak" value={contactForm.namaAnak} onChange={(e) => setContactForm({ ...contactForm, namaAnak: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Nomor WhatsApp</label>
              <input type="tel" placeholder="+62 812 xxxx xxxx" value={contactForm.wa} onChange={(e) => setContactForm({ ...contactForm, wa: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Usia Anak</label>
              <select value={contactForm.usia} onChange={(e) => setContactForm({ ...contactForm, usia: e.target.value })}>
                <option>3 - 12 Bulan (Infant 1)</option>
                <option>1-3 Tahun (Toddler)</option>
                <option>4 Tahun (KB)</option>
                <option>5 Tahun (TK A)</option>
                <option>6 Tahun (TK B)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pesan</label>
              <textarea placeholder="Pertanyaan atau informasi tambahan..." value={contactForm.pesan} onChange={(e) => setContactForm({ ...contactForm, pesan: e.target.value })} />
            </div>
            <button style={{ width: "100%", background: "var(--green-dark)", color: "white", border: "none", padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => showToastMsg("Pesan terkirim! Tim kami akan menghubungi Anda segera.")}>
              Kirim Pesan
            </button>
          </div>
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "var(--green-dark)", borderRadius: "var(--radius-lg)", padding: "36px 32px", color: "white" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, marginBottom: 28 }}>Informasi Sekolah</h3>
              {[
                { icon: "📍", label: "Alamat", val: "Jl. Monginsidi No. 52, Candirejo, Magetan, Jawa Timur" },
                { icon: "📞", label: "Telepon", val: "081615784070" },
                { icon: "✉️", label: "Email", val: "info@iispsm.sch.id" },
                { icon: "🕐", label: "Jam Operasional", val: "Senin – Jumat: 07.00 – 16.00 WIB" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(212,168,67,0.2)", border: "1px solid rgba(212,168,67,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--cream)", borderRadius: "var(--radius)", padding: 24 }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Open House &amp; Kunjungan Sekolah</h4>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>Jadwalkan kunjungan gratis untuk mengenal lingkungan belajar kami lebih dekat. Atau daftar online melalui portal penerimaan murid baru.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "9px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => showToastMsg("Formulir pendaftaran online dibuka!")}>
                  📋 Daftar Online
                </button>
                <button style={{ background: "transparent", color: "var(--green-dark)", border: "1.5px solid var(--green-dark)", padding: "9px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => window.open("https://wa.me/6281615784070", "_blank")}>
                  💬 Chat via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTAL GURU DIVIDER ── */}
      <div style={{ background: "var(--green-dark)", padding: "48px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }} id="portal">
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "white", marginBottom: 6 }}>Portal Guru &amp; Admin</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>Kelola laporan harian, portofolio, dan data siswa dalam satu platform.</p>
        </div>
        <div style={{ background: "rgba(212,168,67,0.2)", border: "1px solid rgba(212,168,67,0.4)", color: "var(--gold)", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
          🔒 Area Guru &amp; Admin
        </div>
      </div>

      {/* ── PORTAL SECTION ── */}
      <section style={{ background: "var(--white)", padding: "48px 64px" }}>
        {/* Tabs */}
        <div className="portal-tabs">
          {PORTAL_TABS.map((tab) => (
            <button key={tab.id} className={`ptab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
              {tab.badge && <span className="tab-badge">{tab.badge}</span>}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <div className="dash-grid">
              {[
                { label: "Total Siswa", num: "47", sub: "Aktif saat ini", badge: "▲ +3 bulan ini", cls: "green" },
                { label: "Hadir Hari Ini", num: "42", sub: "5 siswa izin/sakit", badge: "89% kehadiran", cls: "green" },
                { label: "Laporan Pending", num: "3", sub: "Belum dikirim", badge: "⚠ Perlu perhatian", cls: "gold" },
                { label: "Portofolio Baru", num: "12", sub: "Minggu ini", badge: "↑ Aktif", cls: "green" },
              ].map((c) => (
                <div className="dash-card" key={c.label}>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{c.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: "var(--green-dark)", lineHeight: 1 }}>{c.num}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{c.sub}</div>
                  <div className={`d-badge ${c.cls}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 500, background: c.cls === "green" ? "#e0f5e0" : "#fdf5e0", color: c.cls === "green" ? "#2a7a2a" : "#8a6a00" }}>
                    {c.badge}
                  </div>
                </div>
              ))}
            </div>
            <div className="today-activities">
              <div className="activity-list-card">
                <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "var(--green-dark)" }}>📅 Jadwal Hari Ini</h4>
                {[
                  { time: "07:00", dot: "done", text: "Penyambutan & Morning Circle", fitrah: "Keimanan" },
                  { time: "08:00", dot: "done", text: "Sentra Bermain Peran", fitrah: "Bakat" },
                  { time: "09:30", dot: "gold", text: "Sensori Play – Pasir & Air", fitrah: "Jasmani" },
                  { time: "10:30", dot: "", text: "Makan Siang Bersama (Halal)", fitrah: "Jasmani" },
                  { time: "11:30", dot: "", text: "Tidur Siang & Quiet Time", fitrah: "Jasmani" },
                ].map((a) => (
                  <div className="activity-item" key={a.time}>
                    <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 70 }}>{a.time}</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot === "done" ? "var(--green-mid)" : a.dot === "gold" ? "var(--gold)" : "var(--green-light)", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 13, color: "var(--text)", flex: 1 }}>{a.text}</span>
                    <span style={{ fontSize: 11, color: "var(--green-mid)", background: "var(--green-pale)", padding: "2px 8px", borderRadius: 8, whiteSpace: "nowrap" }}>{a.fitrah}</span>
                  </div>
                ))}
              </div>
              <div className="student-list-card">
                <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "var(--green-dark)" }}>👦 Daftar Siswa Hari Ini</h4>
                {[
                  { initials: "AF", name: "Ahmad Fauzan", age: "4 thn – KB", status: "hadir" },
                  { initials: "ZR", name: "Zahra Ramadhani", age: "5 thn – TK A", status: "hadir" },
                  { initials: "MH", name: "Muhammad Hafidz", age: "3 thn – Toddler", status: "izin" },
                  { initials: "SA", name: "Siti Aisyah", age: "6 thn – TK B", status: "hadir" },
                  { initials: "RA", name: "Rizky Ananda", age: "4 thn – KB", status: "hadir" },
                ].map((s) => (
                  <div className="student-item" key={s.name}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--green-dark)", flexShrink: 0 }}>{s.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{s.age}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 11, padding: "3px 10px", borderRadius: 10, background: s.status === "hadir" ? "#e0f5e0" : "#fdf5e0", color: s.status === "hadir" ? "#2a7a2a" : "#8a6a00" }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Laporan Harian */}
        {activeTab === "laporan-harian" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700 }}>Laporan Harian Siswa</h3>
              <button style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "10px 20px", borderRadius: 24, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Laporan berhasil disimpan!")}>
                + Buat Laporan Baru
              </button>
            </div>
            <div className="daily-form">
              <div className="daily-card">
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--green-dark)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>📊 Kondisi Hari Ini</h4>
                {[
                  { label: "Mood Pagi", type: "mood" },
                  { label: "Nafsu Makan", type: "select", opts: ["Baik", "Kurang", "Tidak Mau"] },
                  { label: "Tidur Siang", type: "select", opts: ["Tidur Nyenyak", "Tidur Sebentar", "Tidak Tidur"] },
                  { label: "Suhu Tubuh (°C)", type: "input", placeholder: "36.5" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--green-border)" }}>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{row.label}</span>
                    {row.type === "mood" ? (
                      <div className="mood-btns">
                        {["😊", "😐", "😢", "😠"].map((m) => <button key={m} className="mood-btn">{m}</button>)}
                      </div>
                    ) : row.type === "select" ? (
                      <select style={{ border: "1px solid var(--green-border)", borderRadius: 6, padding: "4px 10px", fontSize: 12, background: "var(--white)", fontFamily: "'DM Sans', sans-serif" }}>
                        {row.opts!.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type="text" placeholder={row.placeholder} style={{ border: "1px solid var(--green-border)", borderRadius: 6, padding: "5px 10px", fontSize: 13, width: 120, background: "var(--white)", fontFamily: "'DM Sans', sans-serif" }} />
                    )}
                  </div>
                ))}
              </div>
              <div className="daily-card">
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--green-dark)", marginBottom: 16 }}>✅ Kegiatan Hari Ini</h4>
                {["Sholat Dhuha", "Hafalan Surat Pendek", "Sensori Play", "Art & Craft", "Outdoor Play", "Story Time Islami"].map((item) => (
                  <div className="checklist-item" key={item}>
                    <input type="checkbox" id={item} />
                    <label htmlFor={item} style={{ fontSize: 13, color: "var(--text)", cursor: "pointer" }}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted)", marginBottom: 8 }}>Catatan Guru</label>
              <textarea placeholder="Ceritakan perkembangan anak hari ini..." style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 8, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "var(--cream)", minHeight: 100, outline: "none", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
              <button style={{ background: "transparent", color: "var(--green-dark)", border: "1.5px solid var(--green-dark)", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Draft tersimpan!")}>Simpan Draft</button>
              <button style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Laporan terkirim ke orang tua!")}>Kirim ke Orang Tua</button>
            </div>
          </div>
        )}

        {/* Portofolio */}
        {activeTab === "portofolio" && (
          <div className="porto-form">
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: "var(--green-dark)" }}>📁 Input Portofolio Siswa</h4>
            <div className="porto-row">
              {[{ label: "Pilih Siswa", type: "select", opts: ["Ahmad Fauzan – KB", "Zahra Ramadhani – TK A", "Siti Aisyah – TK B"] }, { label: "Tanggal", type: "date" }, { label: "Jenis Karya", type: "select", opts: ["Karya Seni", "Foto Kegiatan", "Video", "Tulisan"] }].map((f) => (
                <div className="form-group" key={f.label}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted)", marginBottom: 6 }}>{f.label}</label>
                  {f.type === "select" ? (
                    <select style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 8, padding: "11px 14px", fontSize: 14, background: "var(--white)", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                      {f.opts!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type="date" style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 8, padding: "11px 14px", fontSize: 14, background: "var(--white)", fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                  )}
                </div>
              ))}
            </div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted)", marginBottom: 10 }}>Aspek Fitrah</label>
            <div className="porto-fitrah-grid">
              {DOE_ITEMS.map((d) => (
                <div className="fitrah-chip" key={d.name}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{d.icon}</div>
                  {d.name}
                </div>
              ))}
            </div>
            <div className="upload-area" onClick={() => showToastMsg("Upload foto/video karya siswa")}>
              <div style={{ fontSize: 32, marginBottom: 8, color: "var(--green-border)" }}>📷</div>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>Klik untuk upload foto/video karya siswa</p>
              <span style={{ fontSize: 12, color: "var(--light)" }}>JPG, PNG, MP4 (maks. 50MB)</span>
            </div>
            <div className="form-group">
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--muted)", marginBottom: 6 }}>Observasi Guru</label>
              <textarea placeholder="Tuliskan observasi perkembangan anak..." style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "var(--cream)", minHeight: 120, outline: "none", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button style={{ background: "transparent", color: "var(--green-dark)", border: "1.5px solid var(--green-dark)", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Draft portofolio tersimpan!")}>Simpan Draft</button>
              <button style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Portofolio berhasil disimpan!")}>Simpan Portofolio</button>
            </div>
          </div>
        )}

        {/* Data Siswa */}
        {activeTab === "siswa" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {["Semua", "Hadir", "Izin", "Sakit"].map((s) => (
                  <button key={s} className={`filter-btn ${s === "Semua" ? "active" : ""}`}>{s}</button>
                ))}
              </div>
              <input type="text" placeholder="🔍 Cari nama siswa..." style={{ border: "1px solid var(--green-border)", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "var(--white)", outline: "none", minWidth: 220 }} />
            </div>
            <div className="siswa-table-wrap">
              <table className="siswa-table">
                <thead>
                  <tr>
                    <th>Nama Siswa</th><th>Kelas</th><th>Usia</th><th>Status</th><th>Wali</th><th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Ahmad Fauzan", kelas: "KB", usia: "4 thn", status: "Hadir", wali: "Bpk. Hasan" },
                    { name: "Zahra Ramadhani", kelas: "TK A", usia: "5 thn", status: "Hadir", wali: "Ibu Fatimah" },
                    { name: "Muhammad Hafidz", kelas: "Toddler", usia: "3 thn", status: "Izin", wali: "Bpk. Yusuf" },
                    { name: "Siti Aisyah", kelas: "TK B", usia: "6 thn", status: "Hadir", wali: "Ibu Maryam" },
                    { name: "Rizky Ananda", kelas: "KB", usia: "4 thn", status: "Hadir", wali: "Bpk. Arif" },
                    { name: "Naila Zahra", kelas: "Infant", usia: "8 bln", status: "Hadir", wali: "Ibu Rahma" },
                  ].map((s) => (
                    <tr key={s.name}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td>{s.kelas}</td>
                      <td>{s.usia}</td>
                      <td><span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, background: s.status === "Hadir" ? "#e0f5e0" : "#fdf5e0", color: s.status === "Hadir" ? "#2a7a2a" : "#8a6a00", fontWeight: 600 }}>{s.status}</span></td>
                      <td style={{ fontSize: 13, color: "var(--muted)" }}>{s.wali}</td>
                      <td><button style={{ fontSize: 12, padding: "4px 12px", background: "var(--green-pale)", border: "1px solid var(--green-border)", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }} onClick={() => showToastMsg(`Membuka profil ${s.name}`)}>Lihat</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Laporan 3 Bulanan */}
        {activeTab === "laporan" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, background: "var(--cream)", border: "1px solid var(--green-border)", borderRadius: "var(--radius)", padding: "16px 20px" }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", whiteSpace: "nowrap" }}>Siswa:</label>
              <select style={{ border: "1px solid var(--green-border)", borderRadius: 8, padding: "8px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "var(--white)", outline: "none", flex: 1 }}>
                <option>Ahmad Fauzan – KB</option>
                <option>Zahra Ramadhani – TK A</option>
                <option>Siti Aisyah – TK B</option>
              </select>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", whiteSpace: "nowrap" }}>Periode:</label>
              <select style={{ border: "1px solid var(--green-border)", borderRadius: 8, padding: "8px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "var(--white)", outline: "none" }}>
                <option>Triwulan 1 (Jan–Mar)</option>
                <option>Triwulan 2 (Apr–Jun)</option>
                <option>Triwulan 3 (Jul–Sep)</option>
                <option>Triwulan 4 (Okt–Des)</option>
              </select>
            </div>
            <div className="laporan-grid">
              {[
                { icon: "☪️", title: "Fitrah Keimanan", fields: ["Hafalan & Doa", "Adab Ibadah"] },
                { icon: "🧠", title: "Fitrah Belajar", fields: ["Kognitif & Bahasa", "Kreativitas"] },
                { icon: "⭐", title: "Fitrah Bakat", fields: ["Minat & Bakat", "Kepemimpinan"] },
                { icon: "🤝", title: "Fitrah Sosial", fields: ["Interaksi Sosial", "Kemandirian"] },
              ].map((card) => (
                <div className="laporan-card" key={card.title}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 20 }}>{card.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green-dark)" }}>{card.title}</span>
                  </div>
                  {card.fields.map((f) => (
                    <div key={f} style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 4 }}>{f}</label>
                      <select style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 6, padding: "8px 10px", fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: "var(--cream)", outline: "none" }}>
                        <option>Berkembang Sangat Baik</option>
                        <option>Berkembang Sesuai Harapan</option>
                        <option>Mulai Berkembang</option>
                        <option>Belum Berkembang</option>
                      </select>
                    </div>
                  ))}
                  <textarea placeholder="Catatan tambahan..." style={{ width: "100%", border: "1px solid var(--green-border)", borderRadius: 6, padding: "8px 10px", fontSize: 12, fontFamily: "'DM Sans', sans-serif", background: "var(--cream)", minHeight: 70, resize: "vertical", outline: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 16, borderTop: "1px solid var(--green-border)" }}>
              <button style={{ background: "transparent", color: "var(--green-dark)", border: "1.5px solid var(--green-dark)", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Laporan di-preview!")}>Preview Laporan</button>
              <button style={{ background: "var(--green-dark)", color: "white", border: "none", padding: "11px 24px", borderRadius: 24, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => showToastMsg("Laporan terkirim ke orang tua!")}>Kirim ke Orang Tua</button>
            </div>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "white" }}>IIS PSM Daycare &amp; Preschool</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Membangun Generasi Hukma Shabiya · Magetan, Jawa Timur</div>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "right" }}>
          © 2025 Yayasan IIS PSM · iispsm.sch.id<br />
          Jl. Monginsidi No. 52, Candirejo, Magetan
        </div>
      </footer>

      {/* ── DARK MODE TOGGLE ── */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Dark Mode"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 300,
          width: 46, height: 46, borderRadius: "50%",
          background: "var(--green-dark)", color: "white", border: "none",
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
}