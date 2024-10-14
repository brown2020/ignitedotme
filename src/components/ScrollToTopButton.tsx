"use client";

import React, { useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
    useEffect(() => {
        const scrollFunction = () => {
            const returnToTop = document.getElementById('return-to-top');
            if (!returnToTop) return;

            if (window.location.pathname.includes('admin')) {
                returnToTop.style.display = 'none';
            } else if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                returnToTop.style.display = 'block';
            } else {
                returnToTop.style.display = 'none';
            }
        };

        window.onscroll = scrollFunction;

        return () => {
            window.onscroll = null;
        };
    }, []);

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <button onClick={() => topFunction()} id="return-to-top" title="Go to top" style={{ display: 'none' }}>
            <ChevronUp size={32} />
        </button>
    );
};

export default ScrollToTopButton;
