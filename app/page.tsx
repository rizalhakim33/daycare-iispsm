"use client";
import { useState } from "react";
import React from "react";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import Link from 'next/link'

// Konfigurasi font
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"] 
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"]
});

// 1. Definisikan ContactForm di luar (Top-Level)
function ContactForm() {
  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      namaAnak: formData.get("namaAnak"),
      tglLahir: formData.get("tglLahir"),
      namaOrtu: formData.get("namaOrtu"),
      wa: formData.get("wa"),
      program: formData.get("program"),
      pesan: formData.get("pesan"),
    };

    const text = `Halo Admin IIS PSM Magetan, saya ingin mendaftar:\n\n` +
                 `*Nama Anak:* ${data.namaAnak}\n` +
                 `*Tanggal Lahir:* ${data.tglLahir}\n` +
                 `*Nama Ortu:* ${data.namaOrtu}\n` +
                 `*WA:* ${data.wa}\n` +
                 `*Program:* ${data.program}\n` +
                 `*Pesan:* ${data.pesan || "-"}`;

    const phone = "6281615784070"; 
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");
  };

  return (
    <form onSubmit={handleWhatsAppSubmit} className="contact-form-card">
      <h3>Formulir Pendaftaran</h3>
      
      <div className="form-row">
        <div className="form-group" style={{ margin: 0 }}>
          <label>Nama Lengkap Anak</label>
          <input name="namaAnak" type="text" placeholder="Nama anak" required />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label>Tanggal Lahir</label>
          <input name="tglLahir" type="date" required />
        </div>
      </div>

      <div className="form-group">
        <label>Nama Orang Tua / Wali</label>
        <input name="namaOrtu" type="text" placeholder="Nama lengkap" required />
      </div>

      <div className="form-row">
        <div className="form-group" style={{ margin: 0 }}>
          <label>Nomor WhatsApp</label>
          <input name="wa" type="tel" placeholder="08xx-xxxx-xxxx" required />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label>Program Diminati</label>
          <select name="program" required>
            <option value="Infant & Toddler Care">Infant & Toddler Care</option>
            <option value="Playgroup">Playgroup</option>
            <option value="KB / Preschool 1">KB / Preschool 1</option>
            <option value="TKA / Preschool 2">TKA / Preschool 2</option>
            <option value="TK B / Preschool 3">TK B / Preschool 3</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Pesan / Pertanyaan</label>
        <textarea name="pesan" placeholder="Ceritakan kebutuhan atau pertanyaan Anda..." />
      </div>

      <button type="submit" className="btn-submit">
        Kirim Formulir Pendaftaran →
      </button>
    </form>
  );
}

const FitrahKurikulum = () => {
  const kurikulumData = [
    {
      icon: '☪️',
      title: 'Fitrah Keimanan',
      tagline: 'Atmosfir Keshalihan & Keteladanan',
      desc: "Menanamkan cinta kepada Allah, Rasul, Al-Qur'an, dan Islam melalui imaji positif & keteladanan — bukan doktrin ketakutan.",
      list: ["Kisah Rasulullah & surga", "Kenalkan Allah di setiap peristiwa", "Doa di awal aktivitas", "Gunakan imaji positif"],
    },
    {
      icon: '🧠',
      title: 'Fitrah Belajar',
      tagline: 'Art of Discovery',
      desc: 'Menumbuhkan perasaan belajar melalui eksplorasi langsung dan stimulasi psikomotorik di alam.',
      list: ["Eksplorasi tubuh & keluarga", "Inspirasi belajar di alam", "Buku bersastra indah", "Dorong abstraksi & imajinasi"],
    },
    {
      icon: '⭐',
      title: 'Fitrah Bakat',
      tagline: 'Mengamati Sifat Unik',
      desc: 'Setiap anak adalah pemimpin. Sifat unik diamati dan dikuatkan dengan label positif sejak dini.',
      list: ["Pelihara hewan & tumbuhan", "Label positif (sang orator)", "Hargai adab & akhlak", "Peran sesuai bakat"],
    },
    {
      icon: '❤️',
      title: 'Fitrah Seksualitas',
      tagline: 'Identitas Gender',
      desc: 'Menguatkan identitas gender melalui kelekatan aman antara anak dengan Ayah dan Bunda.',
      list: ["ASI penuh cinta", "Bermain peran Ayah/Bunda", "Konsep cowok & cewek", "Ajarkan thaharah & malu"],
    },
    {
      icon: '🌿',
      title: 'Fitrah Bahasa',
      tagline: 'Apresiasi Keindahan',
      desc: 'Menguatkan rasa keindahan melalui inderawi (0-2th) dan imajinasi/ekspresi (2-6th).',
      list: ["Sastra & cerita indah", "Bacakan Kitabullah", "Bebas coretan & lukisan", "Bukan paksa akademik"],
    },
    {
      icon: '🤝',
      title: 'Fitrah Sosial',
      tagline: 'Ego Sentris Sehat',
      desc: 'Interaksi sosial sehat melalui bermain dan contoh adab, bukan kepatuhan berbasis takut.',
      list: ["Puasakan masa ego sentris", "Bangun rutinitas cerita", "Label milik privasi", "Suplai ego dari Ayah"],
    },
    {
      icon: '🍽️',
      title: 'Fitrah Jasmani',
      tagline: 'Pola Hidup Fitri',
      desc: 'Pola makan halal-thayyib, tidur fitri, dan gerak aktif untuk stimulasi sensori integrasi.',
      list: ["Makan halal-thayyib", "Tidur cukup sesuai usia", "Gerak aktif & sensorik", "Sensori integrasi 4 level"],
    },
    {
      icon: '🕌',
      title: 'Adab & Akhlak',
      tagline: 'Keteladanan Nyata',
      desc: 'Adab ditanamkan melalui keteladanan orang tua, sehingga anak mencintai keindahan akhlak.',
      list: ["Guru sebagai teladan", "Imaji adab yang indah", "Adab makan & belajar", "Sikap nyata harian"],
    }
  ];

  return (
      <section className="max-w-7xl mx-auto" id="kurikulum">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="sec-label">
            Kurikulum Holistik
          </span>
          <h2 className="sec-title">
            8 Aspek Fitrah
          </h2>
          <p className="sec-desc">
            Stimulasi holistik sesuai tahapan tumbuh kembang usia dini. Setiap kegiatan dirancang 
            <span className="italic font-medium"> Learning Through Living</span> — bermain adalah belajar.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kurikulumData.map((item, idx) => (
            <div 
              key={idx} 
              className={`group relative p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 fitrah-card`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none mb-1">{item.title}</h3>
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">
                    {item.tagline}
                  </p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed mb-6 opacity-90 font-medium">
                {item.desc}
              </p>
              
              <ul className="space-y-2.5">
                {item.list.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-[13px] opacity-80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Timeline */}
        <div className="mt-20 overflow-hidden relative p-8 md:p-12 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl shadow-slate-200">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
          
          <p className="relative z-10 text-xl md:text-2xl font-medium italic mb-8 text-slate-100">
            "Perkembangan manusia memiliki sunnatullah — ada tahapan, ada masa emas bagi setiap fitrah."
          </p>
          
          <div className="relative z-10 flex flex-wrap justify-center items-center gap-3">
            <span className="text-sm text-slate-400 font-semibold uppercase tracking-widest mr-2">Tahapan:</span>
            {[
              "0-2 thn",
              "2-6 thn (Pra Latih)",
              "7-10 thn",
              "11-14 thn",
              ">15 thn"
            ].map((tag, tIdx) => (
              <span 
                key={tIdx} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  tag.includes('Pra Latih') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-white/10 text-slate-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
  );
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        :root{
          --green-dark:#1a3a2a;
          --green-mid:#2d5a3d;
          --green-light:#3d7a52;
          --green-pale:#e8f0eb;
          --green-border:#c5d9cc;
          --gold:#d4a843;
          --gold-dark:#b8922e;
          --cream:#f7f5f0;
          --cream2:#ede9e0;
          --white:#ffffff;
          --text:#1a1a1a;
          --muted:#5a5a5a;
          --light:#8a8a8a;
          --radius:12px;
          --radius-lg:20px;
        }
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);font-size:16px;line-height:1.6}

        /* ── NAV ── */
        nav{
          position:sticky;top:0;z-index:200;
          background:rgba(247,245,240,0.96);
          backdrop-filter:blur(14px);
          border-bottom:1px solid var(--green-border);
          padding:0 48px;
          display:flex;align-items:center;justify-content:space-between;
          height:68px;
        }
        .nav-brand{display:flex;align-items:center;gap:12px;text-decoration:none}
        .nav-logo{
          width:42px;height:42px;border-radius:50%;
          background-image:url("https://dwmpoeqjjrpqdruanhxi.supabase.co/storage/v1/object/public/favicon/favicon.png");
          background-size:cover;
          display:flex;align-items:center;justify-content:center;
          font-family:'DM Sans',sans-serif;font-weight:700;font-size:14px;color:white;letter-spacing:0.5px;
        }
        .nav-name{font-weight:600;font-size:15px;color:var(--green-dark);line-height:1.2}
        .nav-sub{font-size:11px;color:var(--muted)}
        .nav-links{list-style:none;display:flex;gap:32px}
        .nav-links a{text-decoration:none;font-size:14px;color:var(--muted);font-weight:400;transition:color .2s}
        .nav-links a:hover{color:var(--green-dark)}
        .nav-right{display:flex;align-items:center;gap:12px}

        /* Login button */
        .btn-login{
          background:transparent;color:var(--green-dark);
          border:1.5px solid var(--green-dark);
          padding:9px 20px;border-radius:24px;
          font-size:14px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .2s;
          text-decoration:none;display:inline-flex;align-items:center;gap:6px;
        }
        .btn-login:hover{background:var(--green-pale)}
        .btn-gold{
          background:var(--gold);color:white;border:none;
          padding:10px 22px;border-radius:24px;
          font-size:14px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .2s;
          text-decoration:none;display:inline-flex;align-items:center;
        }
        .btn-gold:hover{background:var(--gold-dark);transform:translateY(-1px)}

        /* Hamburger */
        .hamburger{
          display:none;flex-direction:column;gap:5px;cursor:pointer;
          background:none;border:none;padding:4px;
        }
        .hamburger span{
          display:block;width:22px;height:2px;
          background:var(--green-dark);border-radius:2px;transition:all .3s;
        }
        .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
        .hamburger.open span:nth-child(2){opacity:0}
        .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

        /* Mobile menu */
        .mobile-menu{
          display:none;position:fixed;top:60px;left:0;right:0;z-index:199;
          background:rgba(247,245,240,0.98);backdrop-filter:blur(14px);
          border-bottom:1px solid var(--green-border);
          padding:20px 24px 28px;flex-direction:column;gap:16px;
        }
        .mobile-menu.open{display:flex}
        .mobile-menu a,.mobile-menu button{
          font-size:15px;color:var(--text);text-decoration:none;
          background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;
          padding:8px 0;text-align:left;border-bottom:1px solid var(--green-border);
        }
        .mobile-menu a:last-child,.mobile-menu button:last-child{border-bottom:none}
        .mobile-menu .mobile-login{
          margin-top:8px;
          background:var(--green-dark);color:white;
          padding:12px 20px;border-radius:10px;
          font-weight:500;text-align:center;border:none;
          text-decoration:none;display:block;
        }
        .mobile-menu .mobile-daftar{
          background:var(--gold);color:white;
          padding:12px 20px;border-radius:10px;
          font-weight:500;text-align:center;border:none;
          text-decoration:none;display:block;margin-top:4px;
        }

        /* ── HERO ── */
        .hero{
          position:relative;min-height:90vh;
          display:flex;align-items:flex-end;
          overflow:hidden;
        }
        .hero-bg{
          position:absolute;inset:0;
          background:linear-gradient(135deg, rgba(26,58,42,0.82) 0%, rgba(45,90,61,0.70) 60%, rgba(61,122,82,0.55) 100%);
          z-index:1;
        }
        .hero-bg-img{
          position:absolute;inset:0;
          background:#2d5a3d;
          display:flex;align-items:center;justify-content:center;
          overflow:hidden;
        }
        .hero-bg-img::before{
          content:'';position:absolute;inset:0;
          background:
            radial-gradient(circle at 20% 50%, rgba(212,168,67,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
        }
        .hero-badge-top{
          position:absolute;top:40px;left:50%;transform:translateX(-50%);
          z-index:3;
          background:rgba(212,168,67,0.2);
          border:1px solid rgba(212,168,67,0.5);
          color:var(--gold);font-size:12px;font-weight:500;
          padding:7px 20px;border-radius:20px;letter-spacing:1px;
          display:flex;align-items:center;gap:8px;white-space:nowrap;
        }
        .hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--gold)}
        .hero-content{
          position:relative;z-index:2;
          padding:64px 64px;
          max-width:780px;
        }
        .hero-title{
          font-family:'Cormorant Garamond',serif;
          font-size:80px;line-height:1.0;font-weight:700;
          color:white;margin-bottom:24px;
        }
        .hero-desc{
          font-size:17px;color:rgba(255,255,255,0.85);
          max-width:540px;line-height:1.7;margin-bottom:10px;
        }
        .hero-vision{
          font-size:13px;color:rgba(255,255,255,0.55);
          font-style:italic;margin-bottom:30px;max-width:540px;
        }
        .hero-actions{display:flex;gap:14px;margin-bottom:30px;flex-wrap:wrap}
        .btn-gold-solid{
          background:var(--gold);color:white;border:none;
          padding:14px 28px;border-radius:30px;
          font-size:15px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .25s;
        }
        .btn-gold-solid:hover{background:var(--gold-dark);transform:translateY(-2px)}
        .btn-outline-white{
          background:transparent;color:white;
          border:1.5px solid rgba(255,255,255,0.5);
          padding:14px 28px;border-radius:30px;
          font-size:15px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .25s;
        }
        .btn-outline-white:hover{border-color:white;background:rgba(255,255,255,0.1)}
        .btn-portal-hero{
          background:rgba(255,255,255,0.12);color:white;
          border:1.5px solid rgba(255,255,255,0.35);
          padding:14px 28px;border-radius:30px;
          font-size:15px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .25s;
          text-decoration:none;display:inline-flex;align-items:center;gap:8px;
        }
        .btn-portal-hero:hover{background:rgba(255,255,255,0.2);border-color:rgba(255,255,255,0.6)}
        .hero-stats{display:flex;gap:0;border-top:1px solid rgba(255,255,255,0.2);padding-top:32px;flex-wrap:wrap}
        .hero-stat{padding-right:40px;margin-right:40px;border-right:1px solid rgba(255,255,255,0.2)}
        .hero-stat:last-child{border-right:none}
        .hero-stat-num{
          font-family:'Cormorant Garamond',serif;
          font-size:38px;font-weight:700;color:var(--gold);line-height:1;
        }
        .hero-stat-label{font-size:12px;color:rgba(255,255,255,0.65);margin-top:4px}

        /* ── SECTIONS ── */
        section{padding:96px 64px}
        .sec-label{font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
        .sec-title{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:700;line-height:1.15;margin-bottom:16px;color:var(--text)}
        .sec-desc{font-size:16px;color:var(--muted);line-height:1.75;max-width:600px}
        .sec-header{margin-bottom:56px}
        .sec-header.center{text-align:center}
        .sec-header.center .sec-desc{margin:0 auto}

        /* ── VISION ── */
        .vision-section{background:var(--cream);padding:96px 64px}
        .vision-box{
          background:var(--green-dark);border-radius:var(--radius-lg);
          padding:56px 64px;text-align:center;max-width:780px;margin:0 auto 64px;
          position:relative;overflow:hidden;
        }
        .vision-box::before{
          content:'';position:absolute;inset:0;
          background:radial-gradient(ellipse at 30% 50%, rgba(212,168,67,0.12) 0%, transparent 60%);
        }
        .vision-box .label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(212,168,67,0.8);margin-bottom:20px}
        .vision-box .quote{
          font-family:'Cormorant Garamond',serif;
          font-size:26px;font-style:italic;font-weight:400;
          color:white;line-height:1.5;position:relative;z-index:1;
        }
        .doe-label{text-align:center;margin-bottom:8px}
        .doe-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;text-align:center;margin-bottom:12px}
        .doe-desc{text-align:center;color:var(--muted);font-size:15px;margin-bottom:40px}
        .doe-grid{display:flex;justify-content:center;gap:20px;flex-wrap:wrap}
        .doe-card{
          background:var(--white);border:1px solid var(--green-border);
          border-radius:var(--radius);padding:24px 20px;
          text-align:center;width:140px;transition:all .25s;
        }
        .doe-card:hover{border-color:var(--green-mid);transform:translateY(-4px);box-shadow:0 12px 28px rgba(26,58,42,0.1)}
        .doe-icon{font-size:32px;margin-bottom:10px}
        .doe-name{font-weight:600;font-size:14px;color:var(--green-dark);margin-bottom:4px}
        .doe-sub{font-size:12px;color:var(--muted)}

        /* ── PROGRAMS ── */
        .programs-section{background:var(--cream2)}
        .programs-grid{display:flex;gap:20px;overflow-x:auto;padding-bottom:8px}
        .prog-card{
          flex:0 0 240px;
          background:var(--white);border-radius:var(--radius-lg);
          padding:28px 24px;border:2px solid transparent;
          transition:all .3s;cursor:pointer;position:relative;
        }
        .prog-card:hover{border-color:var(--green-mid);transform:translateY(-4px);box-shadow:0 16px 40px rgba(26,58,42,0.1)}
        .prog-age-badge{
          display:inline-block;
          padding:4px 12px;border-radius:12px;
          font-size:11px;font-weight:500;margin-bottom:16px;
        }
        .prog-age-badge.teal{background:#e0f5f0;color:#1a7a60}
        .prog-age-badge.mint{background:#e8f5e0;color:#3a7a20}
        .prog-age-badge.yellow{background:#fdf5e0;color:#8a6a00}
        .prog-age-badge.orange{background:#fdf0e0;color:#8a4a00}
        .prog-icon{font-size:36px;margin-bottom:14px}
        .prog-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;margin-bottom:10px;color:var(--green-dark)}
        .prog-desc{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:16px}
        .prog-list{list-style:none}
        .prog-list li{font-size:13px;color:var(--muted);padding:4px 0;display:flex;align-items:flex-start;gap:8px;}
        .prog-list li::before{content:'●';color:var(--gold);font-size:8px;margin-top:6px;flex-shrink:0}

        /* ── SENSORI ── */
        .sensori-section{background:var(--cream)}
        .sensori-explainer{
          background:var(--green-dark);border-radius:var(--radius-lg);
          padding:32px 40px;margin-bottom:40px;
          display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;
        }
        .sensori-explainer p{font-size:15px;color:rgba(255,255,255,0.8);line-height:1.7}
        .sensori-checks{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .sensori-check{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,0.85);}
        .check-icon{
          width:20px;height:20px;border-radius:50%;
          background:rgba(212,168,67,0.2);border:1px solid rgba(212,168,67,0.4);
          display:flex;align-items:center;justify-content:center;
          font-size:10px;color:var(--gold);flex-shrink:0;
        }
        .sensori-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .sensori-card{border-radius:var(--radius);padding:24px 20px;position:relative;overflow:hidden;}
        .sensori-card.c1{background:var(--green-pale);border:1px solid var(--green-border)}
        .sensori-card.c2{background:#e8f5f0;border:1px solid #b8ddd0}
        .sensori-card.c3{background:var(--green-mid);color:white}
        .sensori-card.c4{background:var(--gold);color:white}
        .sensori-num{font-size:11px;font-weight:700;letter-spacing:1px;opacity:0.6;margin-bottom:4px}
        .sensori-icon-sm{font-size:20px;margin-bottom:10px}
        .sensori-card-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;margin-bottom:4px}
        .sensori-card-sub{font-size:11px;opacity:0.65;margin-bottom:14px;font-style:italic}
        .sensori-body{font-size:12px;line-height:1.6;opacity:0.85}
        .sensori-act-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.6;margin:12px 0 6px}
        .sensori-act-list{list-style:none}
        .sensori-act-list li{font-size:12px;opacity:0.8;padding:2px 0;display:flex;gap:6px}
        .sensori-act-list li::before{content:'●';font-size:7px;margin-top:5px;opacity:0.6}
        .gut-brain{
          background:var(--cream2);border-radius:var(--radius);
          padding:28px 32px;margin-top:24px;
          display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;
        }
        .gut-brain .text-part h4{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;margin-bottom:6px}
        .gut-brain .text-part p{font-size:14px;color:var(--muted);max-width:600px;line-height:1.6}
        .btn-green{
          background:var(--green-dark);color:white;border:none;
          padding:12px 24px;border-radius:24px;
          font-size:13px;font-weight:500;cursor:pointer;
          font-family:'DM Sans',sans-serif;white-space:nowrap;
          transition:all .2s;
        }
        .btn-green:hover{background:var(--green-mid)}
        /* ── FITRAH KURIKULUM SECTION ── */
.fitrah-kurikulum-section {
  background: #f9f6f0;
  padding: 96px 64px;
}
.fitrah-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.fitrah-card {
  background: var(--white);
  border-radius: 14px;
  padding: 24px 20px;
  border: 1.5px solid var(--green-border);
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.fitrah-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(26,58,42,0.10);
}
/* Color accent per card */
.fc-keimanan { border-top: 3px solid #3d7a52; }
.fc-belajar  { border-top: 3px solid #5a8fd6; }
.fc-bakat    { border-top: 3px solid #d4a843; }
.fc-seksualitas { border-top: 3px solid #e07a8a; }
.fc-bahasa   { border-top: 3px solid #7ac47a; }
.fc-sosial   { border-top: 3px solid #d68c5a; }
.fc-jasmani  { border-top: 3px solid #5ab4d6; }
.fc-adab     { border-top: 3px solid #9b6ed6; }

.fc-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.fc-icon {
  font-size: 26px;
  flex-shrink: 0;
  margin-top: 2px;
}
.fc-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--green-dark);
  line-height: 1.3;
  margin-bottom: 3px;
}
.fc-tagline {
  font-size: 11px;
  color: var(--gold-dark);
  font-weight: 500;
  font-style: italic;
  line-height: 1.3;
}
.fc-body p {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 10px;
}
.fc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  margin: 0;
}
.fc-list li {
  font-size: 12px;
  color: var(--muted);
  padding-left: 14px;
  position: relative;
  line-height: 1.5;
}
.fc-list li::before {
  content: '●';
  color: var(--gold);
  font-size: 7px;
  position: absolute;
  left: 0;
  top: 5px;
}
.fitrah-quote-bar {
  background: var(--green-dark);
  border-radius: 14px;
  padding: 28px 40px;
  text-align: center;
  color: white;
}
.fitrah-quote-bar p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 10px;
  color: rgba(255,255,255,0.95);
}
.fitrah-quote-bar span {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.3px;
}
@media (max-width: 1200px) {
  .fitrah-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .fitrah-cards-grid { grid-template-columns: 1fr; }
  .fitrah-kurikulum-section { padding: 64px 24px; }
        /* ── FACILITIES ── */
        .facilities-section{background:var(--cream2)}
        .fac-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .fac-items{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}
        .fac-item{display:flex;gap:14px;align-items:flex-start}
        .fac-icon-box{
          width:40px;height:40px;border-radius:10px;
          background:var(--green-pale);border:1px solid var(--green-border);
          display:flex;align-items:center;justify-content:center;
          font-size:18px;flex-shrink:0;
        }
        .fac-item-title{font-weight:600;font-size:14px;color:var(--green-dark);margin-bottom:4px}
        .fac-item-desc{font-size:12px;color:var(--muted);line-height:1.5}
        .fac-right{position:relative}
        .fac-img-box{
          width:100%;aspect-ratio:4/5;
          background:var(--green-dark);border-radius:var(--radius-lg);
          overflow:hidden;position:relative;
          display:flex;align-items:center;justify-content:center;
        }
        .fac-img-placeholder{
          width:100%;height:100%;
          background-image: url("https://dwmpoeqjjrpqdruanhxi.supabase.co/storage/v1/object/public/portofolio/c2568347-25cf-4647-8ac4-397723dc668a/1776917994395.png");
          background-size: cover;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          color:rgba(255,255,255,0.4);font-size:48px;
        }
        .fac-img-placeholder p{font-size:13px;color:rgba(255,255,255,0.4);margin-top:8px}
        .halal-badge{
          position:absolute;top:16px;right:16px;
          background:var(--gold);color:white;
          width:64px;height:64px;border-radius:50%;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          font-size:11px;font-weight:700;text-align:center;
        }
        .safe-badge{
          position:absolute;bottom:16px;left:-20px;
          background:white;border-radius:var(--radius);
          padding:14px 18px;box-shadow:0 8px 30px rgba(0,0,0,0.12);
        }
        .safe-badge .num{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--green-dark)}
        .safe-badge .label{font-size:11px;color:var(--muted)}

        /* ── GALLERY ── */
        .gallery-section{background:var(--cream)}
        .gallery-grid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(2,180px);gap:12px;margin-top:0}
        .gallery-item{
          background:var(--green-pale);border-radius:10px;overflow:hidden;
          display:flex;align-items:center;justify-content:center;
          font-size:28px;color:var(--green-border);
          transition:transform .3s;cursor:pointer;
        }
        .gallery-item:hover{transform:scale(1.03)}

        /* ── CONTACT ── */
        .contact-section{background:var(--cream2)}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
        .contact-form-card{
          background:var(--white);border-radius:var(--radius-lg);
          padding:36px 32px;border:1px solid var(--green-border);
        }
        .contact-form-card h3{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;margin-bottom:24px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
        .form-group{margin-bottom:16px}
        .form-group label{display:block;font-size:13px;font-weight:500;color:var(--muted);margin-bottom:6px}
        .form-group input,.form-group select,.form-group textarea{
          width:100%;border:1px solid var(--green-border);border-radius:8px;
          padding:11px 14px;font-size:14px;color:var(--text);
          font-family:'DM Sans',sans-serif;background:var(--cream);
          transition:border-color .2s;outline:none;
        }
        .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--green-mid)}
        .form-group textarea{resize:vertical;min-height:100px}
        .btn-submit{
          width:100%;background:var(--green-dark);color:white;border:none;
          padding:14px;border-radius:10px;font-size:15px;font-weight:500;
          cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
        }
        .btn-submit:hover{background:var(--green-mid)}
        .contact-info-card{
          background:var(--green-dark);border-radius:var(--radius-lg);
          padding:36px 32px;color:white;
        }
        .contact-info-card h3{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;margin-bottom:28px}
        .info-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px}
        .info-icon{
          width:38px;height:38px;border-radius:10px;
          background:rgba(212,168,67,0.2);border:1px solid rgba(212,168,67,0.3);
          display:flex;align-items:center;justify-content:center;
          font-size:16px;flex-shrink:0;
        }
        .info-label{font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:3px}
        .info-val{font-size:14px;font-weight:500}
        .open-house{background:var(--cream);border-radius:var(--radius);padding:24px;margin-top:0;}
        .open-house h4{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;margin-bottom:6px}
        .open-house p{font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.5}
        .open-house-btns{display:flex;gap:10px;flex-wrap:wrap}
        .btn-sm-dark{
          background:var(--green-dark);color:white;border:none;
          padding:9px 16px;border-radius:20px;font-size:12px;font-weight:500;
          cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
        }
        .btn-sm-dark:hover{background:var(--green-mid)}
        .btn-sm-green{
          background:transparent;color:var(--green-dark);
          border:1.5px solid var(--green-dark);
          padding:9px 16px;border-radius:20px;font-size:12px;font-weight:500;
          cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;
        }
        .btn-sm-green:hover{background:var(--green-pale)}

        /* ── PORTAL CTA SECTION ── */
        .portal-cta{
          background:var(--green-dark);
          padding:64px;
          display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;
        }
        .portal-cta-text h2{
          font-family:'Cormorant Garamond',serif;
          font-size:36px;font-weight:700;color:white;margin-bottom:10px;
        }
        .portal-cta-text p{font-size:15px;color:rgba(255,255,255,0.65);max-width:560px;line-height:1.7}
        .portal-cta-actions{display:flex;flex-direction:column;gap:12px;align-items:flex-end;min-width:200px}
        .btn-portal-main{
          background:var(--gold);color:white;border:none;
          padding:14px 32px;border-radius:30px;
          font-size:15px;font-weight:600;cursor:pointer;
          font-family:'DM Sans',sans-serif;transition:all .25s;
          text-decoration:none;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;
        }
        .btn-portal-main:hover{background:var(--gold-dark);transform:translateY(-2px)}
        .portal-badge{
          background:rgba(212,168,67,0.2);border:1px solid rgba(212,168,67,0.4);
          color:var(--gold);padding:6px 16px;border-radius:20px;
          font-size:12px;font-weight:500;white-space:nowrap;text-align:center;
        }

        /* ── FOOTER ── */
        footer{
          background:var(--green-dark);
          padding:32px 64px;
          display:flex;align-items:center;justify-content:space-between;
          flex-wrap:wrap;gap:16px;
        }
        footer .f-brand{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:white}
        footer .f-sub{font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px}
        footer .f-copy{font-size:12px;color:rgba(255,255,255,0.45);text-align:right}

        /* ── ANIMATIONS ── */
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .hero-content>*{animation:fadeUp .7s ease both}
        .hero-badge-top{animation:fadeUp .5s ease both}
        .hero-content>*:nth-child(1){animation-delay:.1s}
        .hero-content>*:nth-child(2){animation-delay:.2s}
        .hero-content>*:nth-child(3){animation-delay:.3s}
        .hero-content>*:nth-child(4){animation-delay:.4s}
        .hero-content>*:nth-child(5){animation-delay:.5s}

        /* ── NOTIFY ── */
        .notify{
          position:fixed;bottom:24px;right:24px;z-index:999;
          background:var(--green-dark);color:white;
          padding:14px 20px;border-radius:12px;
          font-size:14px;display:flex;align-items:center;gap:10px;
          box-shadow:0 8px 30px rgba(0,0,0,0.2);
          transform:translateY(80px);opacity:0;
          transition:all .4s cubic-bezier(.34,1.56,.64,1);
          pointer-events:none;
        }
        .notify.show{transform:translateY(0);opacity:1}

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          nav{padding:0 32px}
          .hero-content{padding:32px 32px}
          .hero-title{font-size:60px}
          section,.vision-section,.contact-section,.sensori-section,.facilities-section,.gallery-section,.programs-section{padding:72px 32px}
          .portal-cta{padding:48px 32px}
          footer{padding:24px 32px}
          .sensori-grid{grid-template-columns:repeat(2,1fr)}
          .gallery-grid{grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,160px)}
        }

        @media(max-width:768px){
          nav{padding:0 20px;height:60px}
          .nav-links{display:none}
          .nav-right .btn-login,.nav-right .btn-gold{display:none}
          .hamburger{display:flex}

          .hero{min-height:90vh}
          .hero-badge-top{font-size:10px;padding:6px 14px;top:24px;letter-spacing:0.5px}
          .hero-content{padding:20px 20px;max-width:100%}
          .hero-title{font-size:42px}
          .hero-desc{font-size:15px}
          .hero-actions{gap:10px}
          .btn-gold-solid,.btn-outline-white,.btn-portal-hero{padding:12px 20px;font-size:14px}
          .hero-stats{gap:0;padding-top:24px}
          .hero-stat{padding-right:24px;margin-right:24px}
          .hero-stat-num{font-size:28px}

          section,.vision-section,.contact-section,.sensori-section,.facilities-section,.gallery-section,.programs-section{padding:56px 20px}
          .sec-title{font-size:36px}
          .vision-box{padding:36px 28px}
          .vision-box .quote{font-size:20px}

          .sensori-explainer{grid-template-columns:1fr;gap:24px;padding:24px 20px}
          .sensori-grid{grid-template-columns:1fr 1fr}
          .gut-brain{flex-direction:column;gap:16px}

          .fac-grid{grid-template-columns:1fr}
          .fac-right{display:none}
          .fac-items{grid-template-columns:1fr}

          .gallery-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(5,140px)}

          .contact-grid{grid-template-columns:1fr}
          .form-row{grid-template-columns:1fr}

          .portal-cta{grid-template-columns:1fr;padding:40px 20px;gap:28px}
          .portal-cta-actions{align-items:flex-start}
          .portal-cta-text h2{font-size:28px}

          footer{padding:24px 20px;flex-direction:column;align-items:flex-start}
          footer .f-copy{text-align:left}
        }

        @media(max-width:480px){
          .hero-title{font-size:34px}
          .hero-stats{flex-direction:column;gap:16px;border-top:1px solid rgba(255,255,255,0.2);padding-top:20px}
          .hero-stat{border-right:none;padding-right:0;margin-right:0;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px}
          .hero-stat:last-child{border-bottom:none}
          .sensori-grid{grid-template-columns:1fr}
          .doe-card{width:120px}
          .sec-title{font-size:30px}
        }
      `}</style>
      
      {/* NOTIFY TOAST */}
      <div className="notify" id="notify"><span id="notify-msg">Tersimpan!</span></div>

      {/* NAV */}
      <nav>
        <a className="nav-brand" href="#">
          <div className="nav-logo"></div>
          <div>
            <div className="nav-name">IIS PSM</div>
            <div className="nav-sub">Daycare &amp; Preschool – Magetan</div>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="#vision" onClick={(e) => { e.preventDefault(); scrollTo("vision"); }}>Vision &amp; Values</a></li>
          <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollTo("programs"); }}>Programs</a></li>
          <li><a href="#facilities" onClick={(e) => { e.preventDefault(); scrollTo("facilities"); }}>Facilities</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
        </ul>

        <div className="nav-right">
          <button className="btn-gold" onClick={() => scrollTo("contact")}>Daftar Sekarang</button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button onClick={() => scrollTo("vision")}>Vision &amp; Values</button>
        <button onClick={() => scrollTo("programs")}>Programs</button>
        <button onClick={() => scrollTo("facilities")}>Facilities</button>
        <button onClick={() => scrollTo("gallery")}>Gallery</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
        <button className="mobile-daftar" onClick={() => scrollTo("contact")}>Daftar Sekarang</button>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-img">
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#1a3a2a 0%,#2d5a3d 50%,#3d7a52 100%)",opacity:0.95}}></div>
          <div style={{position:"absolute",bottom:"-80px",left:"-80px",width:"400px",height:"400px",borderRadius:"50%",background:"rgba(212,168,67,0.06)"}}></div>
          <div style={{position:"absolute",top:"20%",right:"10%",width:"200px",height:"200px",borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}></div>
        </div>
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Where Young Khalifahs Begin</h1>
          <p className="hero-desc">A nurturing Islamic environment for children aged 3 months – 6 years. We raise faithful, curious, and joyful little ones — rooted in akhlaq, ready for the world.</p>
          <p className="hero-vision"><em>&ldquo;Sekolah teladan dalam mencetak generasi muda Indonesia yang memiliki pemikiran global dan menjalankan nilai-nilai Islami&rdquo;</em></p>
          <div className="hero-actions">
            <button className="btn-gold-solid" onClick={() => scrollTo("programs")}>Explore Programs</button>
            <button className="btn-outline-white" onClick={() => scrollTo("contact")}>Daftar Sekarang</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">3bln+</div>
              <div className="hero-stat-label">Usia Minimal Masuk</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">5</div>
              <div className="hero-stat-label">Program Tersedia</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">1:5</div>
              <div className="hero-stat-label">Rasio Guru–Murid</div>
            </div>
          </div>
        </div>
      </div>

      {/* VISION */}
      <section className="vision-section" id="vision">
        <div className="sec-header center">
          <div className="sec-label">OUR DIRECTION</div>
          <div className="sec-title">Vision &amp; Mission</div>
        </div>
        <div className="vision-box">
          <div className="label">OUR VISION</div>
          <div className="quote">&ldquo;Model school in educating young Indonesian generation with global mind and Islamic value&rdquo;</div>
        </div>
        <div className="doe-label sec-label" style={{textAlign:"center"}}>DESIRED OUTCOMES OF EDUCATION</div>
        <div className="doe-title">Khalifah Fil Ard</div>
        <p className="doe-desc">The DOE of the school is to nurture leaders who are faithful, virtuous, competent, globally minded, and contribute meaningfully to society according to their roles.</p>
        <div className="doe-grid">
          <div className="doe-card"><div className="doe-icon">🌿</div><div className="doe-name">Mu&apos;min</div><div className="doe-sub">Faithful</div></div>
          <div className="doe-card"><div className="doe-icon">💠</div><div className="doe-name">Muhsin</div><div className="doe-sub">Virtuous</div></div>
          <div className="doe-card"><div className="doe-icon">🎯</div><div className="doe-name">Mutqin</div><div className="doe-sub">Competent</div></div>
          <div className="doe-card"><div className="doe-icon">🌍</div><div className="doe-name">Global</div><div className="doe-sub">Global Minded</div></div>
          <div className="doe-card"><div className="doe-icon">🌟</div><div className="doe-name">Impactful</div><div className="doe-sub">Meaningful Contribution</div></div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="programs-section" id="programs">
        <div className="sec-header center">
          <div className="sec-label">OUR PROGRAMS</div>
          <div className="sec-title">Daycare &amp; Preschool Classes</div>
          <p className="sec-desc" style={{margin:"0 auto"}}>Program berbasis usia untuk anak 3 bulan – 6 tahun, dirancang memaksimalkan potensi spiritual, intelektual, dan sosial setiap anak.</p>
        </div>
        <div className="programs-grid">
          {[
            {badge:"teal",age:"3 Bulan – 2 Tahun",icon:"🍼",name:"Infant & Toddler Care",desc:"Perawatan penuh kasih untuk si kecil. Fokus pada perkembangan fisik, stimulasi sensorik, dan rasa aman secara emosional.",list:["Rasio guru 1:2","Full day (07.00–16.00)","Half day (07.00–11.30 / 11.30–16.00)","Insidental (harian)"]},
            {badge:"mint",age:"2 – 3 Tahun",icon:"🎨",name:"Playgroup",desc:"Belajar melalui bermain yang kreatif — mengembangkan bahasa, kemampuan sosial, dan mengenalkan nilai-nilai Islam.",list:["Rasio guru 1:4","Full day (07.00–16.00)","Half day (07.00–11.30 / 11.30–16.00)","Insidental (harian)"]},
            {badge:"yellow",age:"3 – 4 Tahun",icon:"📚",name:"KB / Preschool 1",desc:"Lingkungan belajar terstruktur namun menyenangkan — mempersiapkan anak secara akademis dan spiritual.",list:["Rasio guru 1:6","Full day (07.00–16.00)","Half day (07.00–11.30 / 11.30–16.00)","Literasi & numerasi dasar"]},
            {badge:"orange",age:"5 Tahun",icon:"⭐",name:"TKA / Preschool 2",desc:"Program TK komprehensif membangun fondasi membaca, matematika, sains, dan karakter Islami yang kuat.",list:["Rasio guru 1:8","Full day (07.00–16.00)","Half day (07.00–11.30 / 11.30–16.00)","Bilingual (Indonesia & Inggris)"]},
            {badge:"",age:"6 Tahun",icon:"🎓",name:"TK B / Preschool 3",desc:"Persiapan masuk SD dengan kurikulum holistik — akademik, karakter Islami, dan kesiapan sosial-emosional.",list:["Rasio guru 1:8","Full day (07.00–16.00)","Half day (07.00–11.30 / 11.30–16.00)","Persiapan masuk SD"]},
          ].map((p, i) => (
            <div className="prog-card" key={i}>
              <div className={`prog-age-badge ${p.badge}`} style={p.badge === "" ? {background:"#f0e8f5",color:"#6a2080"} : {}}>{p.age}</div>
              <div className="prog-icon">{p.icon}</div>
              <div className="prog-name">{p.name}</div>
              <p className="prog-desc">{p.desc}</p>
              <ul className="prog-list">{p.list.map((l,j)=><li key={j}>{l}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* SENSORI */}
      <section className="sensori-section">
        <div className="sec-header center">
          <div className="sec-label">PROGRAM UNGGULAN</div>
          <div className="sec-title">Stimulasi 4 Level Sensori Integrasi</div>
          <p className="sec-desc" style={{margin:"0 auto"}}>Di IIS PSM Daycare &amp; Preschool, kami menerapkan pendekatan berbasis Sensori Integrasi — memastikan setiap anak mendapatkan stimulasi yang tepat sesuai tahapan perkembangannya.</p>
        </div>
        <div className="sensori-explainer">
          <div>
            <div style={{fontSize:"11px",letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(212,168,67,0.8)",marginBottom:"10px"}}>APA ITU SENSORI INTEGRASI?</div>
            <p>Sensori integrasi adalah proses di mana otak menerima informasi dari indera — sentuhan, penglihatan, pendengaran, dan gerakan tubuh — lalu mengolahnya menjadi respons yang tepat.</p>
          </div>
          <div className="sensori-checks">
            {["Deteksi dini gangguan perkembangan","Stimulasi tepat sesuai usia","Meningkatkan fokus & perilaku","Mendukung kesiapan belajar"].map((c,i)=>(
              <div className="sensori-check" key={i}><div className="check-icon">✓</div>{c}</div>
            ))}
          </div>
        </div>
        <div className="sensori-grid">
          {[
            {cls:"c1",num:"1",icon:"🤲",title:"Tactile",sub:"Sentuhan & Tekstur",body:"Stimulasi indera peraba melalui berbagai tekstur, suhu, dan bahan alami untuk membangun kepekaan taktil.",acts:["Bermain pasir & tanah","Finger painting","Eksplorasi bahan alam"]},
            {cls:"c2",num:"2",icon:"🏃",title:"Vestibular",sub:"Keseimbangan & Gerakan",body:"Aktivitas yang mengaktifkan sistem keseimbangan — krusial untuk koordinasi tubuh dan regulasi diri.",acts:["Ayunan & panjatan","Berguling & melompat","Senam pagi bersama"]},
            {cls:"c3",num:"3",icon:"💪",title:"Proprioceptive",sub:"Posisi & Tekanan Tubuh",body:"Stimulasi deep pressure dan kesadaran posisi tubuh untuk membangun kekuatan otot dan kontrol motorik.",acts:["Mendorong & menarik","Membawa beban ringan","Yoga anak-anak"]},
            {cls:"c4",num:"4",icon:"👁️",title:"Visual & Auditori",sub:"Penglihatan & Pendengaran",body:"Integrasi input visual dan auditori untuk membangun fondasi kemampuan belajar dan perhatian.",acts:["Musik & gerak","Eksplorasi warna","Cerita interaktif"]},
          ].map((s,i)=>(
            <div className={`sensori-card ${s.cls}`} key={i}>
              <div className="sensori-num">LEVEL {s.num}</div>
              <div className="sensori-icon-sm">{s.icon}</div>
              <div className="sensori-card-title">{s.title}</div>
              <div className="sensori-card-sub">{s.sub}</div>
              <div className="sensori-body">{s.body}</div>
              <div className="sensori-act-label">Contoh Aktivitas</div>
              <ul className="sensori-act-list">{s.acts.map((a,j)=><li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="gut-brain">
          <div className="text-part">
            <h4>🧠 Gut-Brain Connection dalam Kurikulum Kami</h4>
            <p>IIS PSM mengintegrasikan pemahaman tentang hubungan usus-otak dalam pola makan dan aktivitas harian — makanan bergizi, tidur teratur, dan stimulasi sensorik bekerja bersama untuk mendukung perkembangan kognitif optimal.</p>
          </div>
          <button className="btn-green" onClick={() => scrollTo("contact")}>Pelajari Lebih Lanjut →</button>
        </div>
      </section>
      {/* 8 ASPEK FITRAH - KURIKULUM HOLISTIK */}
      <FitrahKurikulum />

      {/* FACILITIES */}
      <section className="facilities-section" id="facilities">
        <div className="fac-grid">
          <div className="fac-left">
            <div className="sec-header">
              <div className="sec-label">FASILITAS</div>
              <div className="sec-title">Safe, Stimulating &amp; Halal</div>
              <p className="sec-desc">Setiap sudut sekolah kami dirancang untuk mendukung tumbuh kembang anak — aman, menstimulasi, dan sesuai nilai-nilai Islam.</p>
            </div>
            <div className="fac-items">
              {[
                {icon:"🌿",title:"Taman Eksplorasi Alam",desc:"Area outdoor dengan tanaman, pasir, dan bahan alam untuk stimulasi sensorik."},
                {icon:"📚",title:"Ruang Baca & Literasi",desc:"Perpustakaan mini dengan buku bilingual dan cerita Islami."},
                {icon:"🎨",title:"Studio Seni & Kreativitas",desc:"Ruang khusus untuk finger painting, crafts, dan ekspresi kreatif."},
                {icon:"🏃",title:"Area Motorik Kasar",desc:"Panjatan, ayunan, dan obstacle course untuk perkembangan fisik."},
                {icon:"🍽️",title:"Dapur Gizi Halal",desc:"Menu sehat, halal, bergizi setiap hari — disusun oleh ahli gizi."},
                {icon:"💤",title:"Ruang Tidur Siang",desc:"Ruang tidur bersih, nyaman, dengan rasio pengawas yang ketat."},
              ].map((f,i)=>(
                <div className="fac-item" key={i}>
                  <div className="fac-icon-box">{f.icon}</div>
                  <div>
                    <div className="fac-item-title">{f.title}</div>
                    <div className="fac-item-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fac-right">
            <div className="fac-img-box">
              <div className="fac-img-placeholder">
              </div>
              <div className="halal-badge">HALAL<br/>MUI</div>
            </div>
            <div className="safe-badge">
              <div className="num">100%</div>
              <div className="label">CCTV Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="gallery">
        <div className="sec-header center">
          <div className="sec-label">GALERI</div>
          <div className="sec-title">A Glimpse of Daily Life</div>
          <p className="sec-desc" style={{margin:"0 auto 40px"}}>Sekilas suasana belajar, bermain, dan bertumbuh bersama di IIS PSM Daycare &amp; Preschool.</p>
        </div>
        <div className="gallery-grid">
          {["🎨","🌿","📚","🤲","🎵","🏃","☪️","🍽️","⭐","🎓"].map((e,i)=>(
            <div className="gallery-item" key={i}>{e}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="sec-header center">
          <div className="sec-label">BERGABUNG</div>
          <div className="sec-title">Daftarkan Si Kecil</div>
          <p className="sec-desc" style={{margin:"0 auto 56px"}}>Isi formulir berikut dan tim kami akan menghubungi Anda dalam 1x24 jam.</p>
        </div>
        <div className="contact-grid">
          <ContactForm />
          <div className="contact-info-card" style={{marginBottom:"20px"}}>
            <h3>Informasi Kontak</h3>
            {[
              {icon:"📍",label:"ALAMAT",val:"Jl. Monginsidi No. 52, Candirejo, Magetan"},
              {icon:"📱",label:"WHATSAPP",val:"+62 812-3456-7890"},
              {icon:"📧",label:"EMAIL",val:"info@iispsm.sch.id"},
              {icon:"⏰",label:"JAM OPERASIONAL",val:"Senin – Jumat, 07.00 – 16.00"},
            ].map((info,i)=>(
              <div className="info-item" key={i}>
                <div className="info-icon">{info.icon}</div>
                  <div>
                    <div className="info-label">{info.label}</div>
                    <div className="info-val">{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="open-house">
              <h4>🏫 Open House Bulanan</h4>
              <p>Kunjungi sekolah kami setiap Sabtu pertama tiap bulan. Lihat langsung fasilitas, program, dan suasana belajar.</p>
              <div className="open-house-btns">
                <Link className="btn-sm-dark" href="#contact">Daftar Online</Link>
                <Link className="btn-sm-green" href="https://wa.me/6281615784070" target="_blank">Hubungi Kami</Link>
              </div>
            </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="f-brand">IIS PSM Daycare &amp; Preschool</div>
          <div className="f-sub">Membangun Generasi Hukma Shabiya · Magetan, Jawa Timur</div>
        </div>
        <div className="f-copy">© 2025 Yayasan IIS PSM · iispsm.sch.id<br/>Jl. Monginsidi No. 52, Candirejo, Magetan</div>
      </footer>
    </>
  );
}
