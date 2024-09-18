// src/app/layout.tsx
import Navbar from "../components/Navbar";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ignite.me",
  description:
    "Ignite Channel produces and distributes innovative documentary films and media technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full bg-[#333333] text-slate-50">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
