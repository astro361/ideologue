import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "IdeaLogue - Share & Explore SaaS Ideas",
  description: "A minimalist platform to share, explore, and track innovative business and SaaS ideas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F9F9FB] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
