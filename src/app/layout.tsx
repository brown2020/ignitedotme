// src/app/layout.tsx
import Navbar from "../components/Navbar";
import "./globals.css";
import "../components/components.css";
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
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                />
            </head>
            <body className="flex flex-col min-h-screen w-full  text-slate-50">
                <Navbar />
                <div className="flex-1">{children}</div>
            </body>
        </html>
    );
}
