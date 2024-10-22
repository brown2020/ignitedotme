"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import logo from "../app/assets/logo192.png";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const checkOffset = () => {
            const header = document.getElementById("header");
            if (header) {
                const offsetTop = header.offsetTop;

                if (window.scrollY > offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };

        checkOffset();
        window.addEventListener("scroll", checkOffset);

        return () => {
            window.removeEventListener("scroll", checkOffset);
        };
    }, []);

    const addactiveclass = () => {
        const menuBox = document.getElementById("menu-box");
        const menuIcon = document.getElementById("menu-icon");

        menuBox?.classList.toggle("active");
        menuIcon?.classList.toggle("active");
    };

    const scrollToSection = (id: string) => {
        const header = document.getElementById("header");
        const element = document.getElementById(id);
        const headerOffset = 78; // Height of your sticky header
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;

            let offsetTop = 0;
            if (header) offsetTop = header.offsetTop;

            const offsetPosition = window.scrollY > offsetTop ? elementPosition + window.scrollY - headerOffset : elementPosition - headerOffset - headerOffset + headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else {
            router.push(`/#${id}`);
            setTimeout(() => {
                const newElement = document.getElementById(id);
                if (newElement) {
                    const elementPosition = newElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100);
        }
        const menuBox = document.getElementById("menu-box");
        const menuIcon = document.getElementById("menu-icon");

        menuBox?.classList.toggle("active");
        menuIcon?.classList.toggle("active");
    };

    return (
        <div id="header" className={`${isFixed ? "fixed-header" : ""} ${pathname === "/" ? " text-white" : "text-black header "} ${(isFixed && pathname === '/') ? 'animate-navbar' : ''} text-lg z-20 flex items-center justify-between`}>
            <div className="flex justify-between items-center container py-3 px-2 mx-auto nav-main">
                <div>
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={48}
                            height={48}
                            className="rounded-md cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex items-center p-2 py-1  space-x-2 gap-5 navigation-bar header-options p-2  border-2 border-[#4D4D50] rounded-full" id="menu-box">
                    <ul className="flex gap-x-11 items-center px-0">
                        <li >
                            <p className="font-bold nav-items relative cursor-pointer px-7 py-0 leading-9" onClick={() => scrollToSection("film")}>
                                Film
                            </p>
                        </li>
                        <li >
                            <p className="font-bold nav-items relative cursor-pointer px-7 py-0 leading-9" onClick={() => scrollToSection("talks")}>
                                Talks
                            </p>
                        </li>
                        <li >
                            <p className="font-bold nav-items relative cursor-pointer px-7 py-0 leading-9" onClick={() => scrollToSection("apps")}>
                                Apps
                            </p>
                        </li>
                        <li >
                            <p className="font-bold nav-items relative cursor-pointer px-7 py-0 leading-9" onClick={() => scrollToSection("openSource")}>
                                Open Source
                            </p>
                        </li>
                        <li className={`${pathname !== "/" ? "text-black" : "text-white"} signup-btn capitalize cursor-pointer bg-transparent relative mobile-view-signup overflow-hidden`} onClick={() => scrollToSection("sign-up")}>
                            <p className={`font-bold`} >
                                Signup
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="responsive-menu ms-3 mx-2" onClick={addactiveclass}>
                <div className="header-menu-icon d-flex align-items-center justify-content-center">
                    <div className="menu-togle-new-class cursor-pointer p-2" id="menu-icon">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
