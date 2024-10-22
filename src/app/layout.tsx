import "animate.css";
import "./globals.css";
import "../components/components.css";
import { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Anek_Latin, Zain } from "next/font/google";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import InitAos from "./components/utils/InitAos";
import { Toaster } from "react-hot-toast";

const anekLatin = Anek_Latin({ weight: ['400', '700'], subsets: ['latin'], display: 'optional' });
const zain = Zain({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

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

        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
                --font-zain: ${zain.style.fontFamily};
                --font-anekLatin: ${anekLatin.style.fontFamily};
            }
          `}}>
        </style>
      </head>
      <body className="flex flex-col min-h-screen w-full text-slate-50">
        <InitAos />
        <Toaster position="bottom-left" />
        <div className="flex-1 master-contant">{children}</div>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
