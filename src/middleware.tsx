
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  // Allow access to signup page
  if (pathname === "/admin/signup") {
    return NextResponse.next();
  }

  // Check if token exists and is valid
  if (pathname.startsWith("/admin")) {
    if (!authToken || isTokenExpired(authToken)) {
      return NextResponse.redirect(new URL("/admin/signup", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
