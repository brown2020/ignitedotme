import 'animate.css';
import "./globals.css";
import "../components/components.css";
import { Metadata } from "next";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Nunito } from "next/font/google";
import InitWow from "./components/utils/InitWow";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
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
                <link href='https://fonts.googleapis.com/css?family=Zain' rel='stylesheet'></link>
                <link href='https://fonts.googleapis.com/css?family=Anek Latin' rel='stylesheet'></link>
            </head>
            <body className={`${nunito.className} flex flex-col min-h-screen w-full text-slate-50`}>
                <InitWow />
                <div className="flex-1 master-contant">{children}</div>
            </body>
        </html>
    );
}
