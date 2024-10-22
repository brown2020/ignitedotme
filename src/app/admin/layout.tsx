"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./style.css";
import Image from "next/image";
import { Spinner } from "./components/ui/Spinner";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const noPanelPaths = ["/admin/signin", "/admin/signup"];
    const hidePanel = noPanelPaths.includes(pathname);

    const [darkMode, setDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem('user');
            const userPhoto = userData ? JSON.parse(userData)?.photoURL : "";
            setUserPhotoURL(userPhoto);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/admin/signup");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [router]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        if (darkMode) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    };

    const toggleProfileDropdown = () => setProfileDropdownOpen((prev) => !prev);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push("/admin/signup");
    }

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
        const toggleSidebar = (id: string) => {
            const sidebar = document.getElementById("sidebar");
            const mainContent = document.getElementById("mainContent");
            const toggleBtn = document.getElementById(id);

            if (sidebar && mainContent && toggleBtn) {
                toggleBtn.addEventListener("click", () => {
                    sidebar.classList.toggle("collapsed");
                    mainContent.classList.toggle("collapsed");
                    toggleBtn.classList.toggle("collapsed");
                });
            }
        };
        toggleSidebar("toggleSidebar");
        toggleSidebar("toggleSidebar-1");
        return () => {
            const toggleBtn1 = document.getElementById("toggleSidebar");
            const toggleBtn2 = document.getElementById("toggleSidebar-1");

            if (toggleBtn1) {
                toggleBtn1.removeEventListener("click", () => { });
            }
            if (toggleBtn2) {
                toggleBtn2.removeEventListener("click", () => { });
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="absolute left-1/2 top-1/2">
                <Spinner className="h-10 w-10" size={1.5} />
            </div>
        )
    } else if (!hidePanel) {
        return (
            <div className={`flex h-screen main-admin-section ${darkMode ? "dark" : ""}`}>
                <aside
                    className=" z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 left-side"
                    id="sidebar"
                >
                    <div className="p-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Ignite Admin
                        </h1>
                        <button
                            className="text-gray-700 dark:text-gray-300 focus:outline-none"
                            id="toggleSidebar-1"
                        >
                            <i className="fas fa-close close-icon"></i>
                        </button>
                    </div>
                    <nav className="mt-6">
                        <Link
                            href="/admin/film"
                            className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/film" ? "bg-gray-200 dark:bg-gray-700" : ""
                                }`}
                        >
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] flex items-center justify-center"><i className="fas fa-film"></i></div>
                                <p>Films</p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/talk"
                            className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/talk" ? "bg-gray-200 dark:bg-gray-700" : ""
                                }`}
                        >
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] flex items-center justify-center"><i className="fas fa-comments"></i></div>
                                <p>Talks</p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/apps"
                            className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/apps" ? "bg-gray-200 dark:bg-gray-700" : ""
                                }`}
                        >
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] flex items-center justify-center"> <i className="fas fa-th-large"></i></div>
                                <p>Apps</p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/opensource"
                            className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/opensource"
                                ? "bg-gray-200 dark:bg-gray-700"
                                : ""
                                }`}
                        >
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] flex items-center justify-center"><i className="fas fa-code"></i></div>
                                <p>Open Sources</p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/blog"
                            className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/blog" ? "bg-gray-200 dark:bg-gray-700" : ""
                                }`}
                        >
                            <div className="flex gap-3 items-center">
                                <div className="w-[25px] flex items-center justify-center"><i className="fas fa-blog"></i></div>
                                <p>Blogs</p>
                            </div>
                        </Link>
                    </nav>
                </aside>

                <div className={"flex-1 flex flex-col right-side"} id="mainContent">
                    <header className="sticky top-0 z-30 flex justify-between items-center bg-white dark:bg-gray-800 py-4 px-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-700 dark:text-gray-300 focus:outline-none">
                                <i className="fas fa-bars" id="toggleSidebar"></i>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="text-gray-700 dark:text-gray-300 focus:outline-none"
                            >
                                {darkMode ? (
                                    <i className="fas fa-sun"></i>
                                ) : (
                                    <i className="fas fa-moon"></i>
                                )}
                            </button>

                            <div className="relative">
                                {
                                    userPhotoURL &&
                                    <Image
                                        src={userPhotoURL}
                                        alt="Profile"
                                        className="rounded-full cursor-pointer"
                                        width={40}
                                        height={40}
                                        onClick={toggleProfileDropdown}
                                    />
                                }
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 z-30 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-200"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-200"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            className="block px-4 py-2 text-gray-700 dark:text-gray-200 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
                        {children}
                    </main>
                </div>
            </div>
        )
    } else {
        return (
            <>{children}</>
        )
    }
};

export default AdminLayout;
