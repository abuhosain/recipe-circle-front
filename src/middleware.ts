import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// Define protected routes (including home page '/')
const protectedRoutes = [
  "/profile",
  "/recipes",
  "/recipes/:page*",
  "/membership",
  "/user/:page*",
  "/admin/:page*",
  "/"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated
  const user = await getCurrentUser();

  // If user is not authenticated and trying to access any protected route
  if (!user) {
    // Redirect to login if trying to access a protected route, including the home page
    if (protectedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  } else {
    // If user is authenticated, allow access to all routes, including home page
    return NextResponse.next();
  }

  // Default response if no condition matched (should not happen)
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/recipes",
    "/recipes/:page*",
    "/membership",
    "/user/:page*",
    "/admin/:page*",
    "/" // Match the home page as well
  ],
};
