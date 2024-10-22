"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/Spinner";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      if (pathname === "/admin") {
        router.push("/admin/film");
      }
    } else {
      router.push("/admin/signup");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2">
        <Spinner className="h-10 w-10" size={1.5} />
      </div>
    )
  } else {
    return null;
  }
}
