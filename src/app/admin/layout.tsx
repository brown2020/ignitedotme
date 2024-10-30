"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./style.css";
import Image from "next/image";
import UserPlaceholder from "../../app/assets/user-placeholder.png";
import logo from "../../app/assets/logo192.png";
import { Context } from "../context/Context";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

interface User {
  id?: string,
  display_name?: string,
  email?: string,
  photo_url?: string,
  created_at?: { seconds: number; nanoseconds: number },
  is_admin?: boolean
}


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user, userLogout } = Context();
  const noPanelPaths = [
    "/admin/signup"
  ];
  const hidePanel = noPanelPaths.includes(pathname);

  const [darkMode, setDarkMode] = useState(true);
  const [userData, setUserData] = useState<User | null>();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleLogout = () => {
    userLogout();
  };

  useEffect(() => {
    if (user) setUserData(user);
  }, [user])

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

  if (!hidePanel) {
    return (
      <div
        className={`flex h-screen main-admin-section ${darkMode ? "dark" : ""
          }`}
      >
        <aside
          className=" z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 left-side"
          id="sidebar"
        >
          <div className="p-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className="rounded-md cursor-pointer"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white ms-3 sm:block hidden">
                Ignite Admin
              </h1>
            </div>
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
              className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/film"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
                }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-[25px] flex items-center justify-center">
                  <i className="fas fa-film"></i>
                </div>
                <p>Films</p>
              </div>
            </Link>
            <Link
              href="/admin/talk"
              className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/talk"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
                }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-[25px] flex items-center justify-center">
                  <i className="fas fa-comments"></i>
                </div>
                <p>Talks</p>
              </div>
            </Link>
            <Link
              href="/admin/apps"
              className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/apps"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
                }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-[25px] flex items-center justify-center">
                  {" "}
                  <i className="fas fa-th-large"></i>
                </div>
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
                <div className="w-[25px] flex items-center justify-center">
                  <i className="fas fa-code"></i>
                </div>
                <p>Open Sources</p>
              </div>
            </Link>
            <Link
              href="/admin/blog"
              className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/blog"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
                }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-[25px] flex items-center justify-center">
                  <i className="fas fa-blog"></i>
                </div>
                <p>Blogs</p>
              </div>
            </Link>
            <Link
              href="/admin/users"
              className={`block py-2 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${pathname === "/admin/users"
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
                }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-[25px] flex items-center justify-center">
                  <i className="fa-solid fa-users"></i>
                </div>
                <p>Users</p>
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
                <Dropdown.Root>
                  <Dropdown.Trigger asChild>
                    {userData && (
                      <div className="flex align-center cursor-pointer">
                        <Image
                          src={userData?.photo_url || UserPlaceholder}
                          alt="Profile"
                          className="rounded-full h-full my-auto"
                          width={40}
                          height={40}
                        />
                        <div className="ms-2 text-gray-900 dark:text-white">
                          <span className="block dark:text-white">
                            {userData.display_name}
                          </span>
                          <span>{userData.email}</span>
                        </div>
                      </div>
                    )}
                  </Dropdown.Trigger>
                  <Dropdown.Content
                    className="DropdownMenuContent"
                    sideOffset={5}
                  >
                    <div className="mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2">
                      <a
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  </Dropdown.Content>
                </Dropdown.Root>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default AdminLayout;
