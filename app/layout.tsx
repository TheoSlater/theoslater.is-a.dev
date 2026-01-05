import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Theo Slater | Full-Stack Developer",
  description:
    "15-year-old Full-Stack Developer & Founder of Monolabs. Building minimal, powerful software.",
  keywords: [
    "developer",
    "full-stack",
    "react",
    "typescript",
    "golang",
    "monolabs",
  ],
  authors: [{ name: "Theo Slater" }],
  creator: "Theo Slater",
  other: {
    "google-site-verification": "google987579226cc311be.html",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
