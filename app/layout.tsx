import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IIS PSM Daycare & Preschool – Portal",
  description: "Portal guru dan orang tua IIS PSM Daycare Magetan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
