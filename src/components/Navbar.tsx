"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Import Image component from next/image
import React from "react";
import logo from "@/app/assets/logo192.png";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="z-20 flex items-center justify-between h-16 p-2 text-lg text-white bg-slate-900/10">
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

      <div className="flex space-x-2">
        <Link href="/talks">
          <p className={pathname === "/talks" ? "activelink" : "navlink"}>
            Talks
          </p>
        </Link>
        <Link href="/">
          <p className={pathname === "/" ? "activelink" : "navlink"}>Film</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
