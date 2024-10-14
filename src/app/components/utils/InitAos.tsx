"use client";

import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const InitAos = () => {
    useEffect(() => {
        Aos.init({ once: true, duration: 1000 });
        Aos.refresh();
    }, []);

    return null;
};

export default InitAos;
