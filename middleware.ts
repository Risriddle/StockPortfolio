import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";  // Use jwtVerify from jose

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      // Decode and verify the JWT using jose's jwtVerify
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const isAuthPage = ["/signin", "/signup"].includes(request.nextUrl.pathname);
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (!isAuthenticated && isDashboard) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
