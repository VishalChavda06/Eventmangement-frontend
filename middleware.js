import { NextResponse } from "next/server";

// Middleware to protect dashboard and admin routes
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    // Check for auth token in cookies
    const token = request.cookies.get("authToken");
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
