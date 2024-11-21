import Link from "next/link";
import React from "react";
import CookieConsentWrapper from "./CookieConsentWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-5 bg-transparent text-white">
      <div className="footer-icon flex space-x-4 mb-2">
        <Link href="https://www.facebook.com/ignitechannel" target="_black">
          <i className="fa-brands fa-facebook-f"></i>
        </Link>
        <Link href="https://twitter.com/ignitechannel" target="_black">
          <i className="fa-brands fa-twitter"></i>
        </Link>

        <Link href="https://www.pinterest.com/ignitechannel/" target="_black">
          <i className="fa-brands fa-pinterest-p"></i>
        </Link>
        <Link href="https://www.youtube.com/ignitechannel" target="_black">
          <i className="fa-brands fa-youtube"></i>
        </Link>
        <Link href="https://github.com/brown2020" target="_black">
          <i className="fa-brands fa-github"></i>
        </Link>
      </div>
      <Link href="/">&copy;2024 Ignite Channel Inc.</Link>
      <div className="flex space-x-2">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
      <CookieConsentWrapper />
    </footer>
  );
};

export default Footer;
