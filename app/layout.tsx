import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { PersistentLogo } from "@/components/landing/PersistentLogo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Recharge - Connect",
  description: "Match by tech stack, connect by vibe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-dark text-white overflow-x-hidden">
        <PersistentLogo />
        <TopBar />
        {children}
      </body>
    </html>
  );
}
