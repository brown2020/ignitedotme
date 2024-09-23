import Link from "next/link";
import React from "react";
import CookieConsentWrapper from "./CookieConsentWrapper";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col items-center justify-center p-4 space-y-2 bg-transparent text-white">
            <div className="footer-icon flex mb-2 space-x-4">
                <a href="https://www.facebook.com/ignitechannel">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/ignitechannel">
                    <i className="fa-brands fa-twitter"></i>
                </a>

                <a href="https://www.pinterest.com/ignitechannel/">
                    <i className="fa-brands fa-pinterest-p"></i>
                </a>
                <a href="https://www.youtube.com/ignitechannel">
                    <i className="fa-brands fa-youtube"></i>
                </a>
            </div>
            <a href="/">&copy;2022 Ignite Channel Inc.</a>
            <div className="flex space-x-2">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
            </div>
            <CookieConsentWrapper />
        </footer>
    );
};

export default Footer;
