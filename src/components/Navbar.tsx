"use client";

import Link from "next/link";
import Image from "next/image"; // Import Image component from next/image
import React from "react";
import { useEffect, useState } from "react";
import logo from "../app/assets/logo192.png";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        // Function to check and update the header's offset position
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

        // Run the check when the component is mounted
        checkOffset();

        // Add scroll event listener
        window.addEventListener("scroll", checkOffset);

        // Cleanup on component unmount
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
        const headerOffset = 64; // Height of your sticky header
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;

            let offsetTop = 0;
            if (header) offsetTop = header.offsetTop;

            const offsetPosition = window.scrollY > offsetTop ? elementPosition + window.scrollY - headerOffset : elementPosition - headerOffset - headerOffset;

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
    };

    return (
        <div id="header" className={`${isFixed ? "fixed-header" : ""} ${pathname === "/" ? "bg-slate-900/10 text-white" : "text-black header "} text-lg z-20 flex items-center justify-between h-16 p-2 `}>
            <div className="flex justify-between container mx-auto">
                <div>
                    <Link href="/">
                        {/* Use next/image component for optimized image rendering */}
                        <Image
                            src={logo}
                            alt="logo"
                            width={48} // Set appropriate width
                            height={48} // Set appropriate height
                            className="rounded-md cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex space-x-2 gap-5 navigation-bar header-options" id="menu-box">
                    <ul className="flex gap-x-11 items-center">
                        <li>
                            <p className="font-bold nav-items relative cursor-pointer" onClick={() => scrollToSection("film")}>
                                Film
                            </p>
                        </li>
                        <li>
                            <p className="font-bold nav-items relative cursor-pointer" onClick={() => scrollToSection("talks")}>
                                Talks
                            </p>
                        </li>
                        <li>
                            <p className="font-bold nav-items relative cursor-pointer" onClick={() => scrollToSection("apps")}>
                                Apps
                            </p>
                        </li>
                        <li>
                            <p className="font-bold nav-items relative cursor-pointer" onClick={() => scrollToSection("openSource")}>
                                Open Source
                            </p>
                        </li>
                        <li className={`${pathname !== "/" ? "text-black" : "text-white"} signup-btn capitalize cursor-pointer bg-transparent relative overflow-hidden`}>
                            <p className={`font-bold`} onClick={() => scrollToSection("sign-up")}>
                                Signup
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="responsive-menu ms-3 mx-3" onClick={addactiveclass}>
                <div className="header-menu-icon d-flex align-items-center justify-content-center">
                    <div className="menu-togle-new-class cursor-pointer" id="menu-icon">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
{/* Styled JSX for scoping the styles */ }
export default Navbar;
