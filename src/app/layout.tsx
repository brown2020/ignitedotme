import "animate.css";
import "./globals.css";
import "../components/components.css";
import { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Nunito, Anek_Latin } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import InitAos from "./components/utils/InitAos";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-anek-latin",
});

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
        <title>Ignite</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body
        className={`${nunito.variable} ${anekLatin.variable} flex flex-col min-h-screen w-full text-slate-50`}
      >
        <InitAos />
        <div className="flex-1 master-contant">{children}</div>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
