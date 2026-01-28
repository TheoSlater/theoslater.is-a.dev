import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import "./globals.css";
import { Geist } from "next/font/google";
import GradualBlur from "./components/GradualBlur";

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

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {" "}
        {/*<GradualBlur
          target="parent"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />*/}
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
