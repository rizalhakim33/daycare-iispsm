import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";

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

export const metadata: Metadata = {
  title: "IIS PSM Daycare & Preschool Magetan | Pendidikan Usia Dini Islami",
  description: "Layanan penitipan anak (daycare) dan prasekolah Islami di Magetan untuk usia 3 bulan hingga 6 tahun. Dilengkapi fasilitas aman dan kurikulum berbasis Sensori Integrasi untuk mengoptimalkan tumbuh kembang anak.",
  keywords: [
    "daycare magetan",
    "preschool magetan",
    "penitipan anak magetan",
    "sekolah islam magetan",
    "playgroup magetan",
    "TK islam magetan",
    "IIS PSM",
    "sensori integrasi anak"
  ],
  openGraph: {
    title: "IIS PSM Daycare & Preschool Magetan | Pendidikan Usia Dini Islami",
    description: "Pendidikan usia dini dan penitipan anak Islami di Magetan. Membentuk generasi berakhlak mulia dengan metode stimulasi Sensori Integrasi.",
    url: "https://v0-daycare-iispsm.vercel.app/",
    siteName: "IIS PSM Daycare & Preschool",
    images: [
      {
        url: "https://dwmpoeqjjrpqdruanhxi.supabase.co/storage/v1/object/public/favicon/og_image.png", // Siapkan gambar resolusi 1200x630 px di folder public
        width: 1200,
        height: 630,
        alt: "Kegiatan Belajar di IIS PSM Daycare & Preschool Magetan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
