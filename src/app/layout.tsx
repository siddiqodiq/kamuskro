import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamus Klasifikasi Rincian Output",
  description: "Aplikasi shorting dan pencarian data Kamus Klasifikasi Rincian Output",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink-deep font-sans">
        {children}
      </body>
    </html>
  );
}
