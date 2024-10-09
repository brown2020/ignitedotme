"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const InitWow = () => {
    const pathname = usePathname();

    useEffect(() => {
        import('wowjs').then(({ WOW }) => {
            const wow = new WOW();
            wow.init();
        });
    }, [pathname]);

    return null;
};

export default InitWow;
