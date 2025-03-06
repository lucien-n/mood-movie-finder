import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import TanstackProvider from "@/components/providers/tanstack-provider";

import "./globals.css";

import Lightswitch from "@/components/Lightswitch";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mood Movie Finder",
  description: "Find movies based on the weather's mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TanstackProvider>{children}</TanstackProvider>

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
