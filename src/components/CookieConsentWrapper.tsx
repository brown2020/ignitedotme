// src/components/CookieConsentWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import react-cookie-consent with SSR disabled
const CookieConsent = dynamic(() => import("react-cookie-consent"), {
  ssr: false,
});

const CookieConsentWrapper = () => {
  return (
    <CookieConsent>
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentWrapper;
