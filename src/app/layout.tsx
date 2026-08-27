import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sky Home — Amplía tu casa hacia arriba | Disrupción Urbana",
  description: "Tu azotea puede ser un departamento que genera ingresos. Construcción modular en 4 meses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen font-sans bg-white text-ink`}>
        {children}
      </body>
    </html>
  );
}
