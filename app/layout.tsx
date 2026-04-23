import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
