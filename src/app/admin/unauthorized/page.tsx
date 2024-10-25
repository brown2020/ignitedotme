"use client";

import { Context } from "@/app/context/Context";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import useAuth from "@/app/auth/useAuth";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const { user, userLogin } = Context();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      userLogin(null); // Reset user state in context
      router.push("/admin/signup");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-4">
        You do not have permission to access admin panel.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
      <button
        onClick={handleLogout} // Sign out from Firebase
        className="text-blue-500 hover:underline"
      >
        Log out
      </button>
    </div>
  );
};

export default UnauthorizedPage;
