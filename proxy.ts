import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // const accessToken = req.cookies.get("accessToken");
  // const isAuth = !!accessToken;

  // const pathname = req.nextUrl.pathname;

  // const isAuthPage =
  //   pathname.startsWith("/login") ||
  //   pathname.startsWith("/signup") ||
  //   pathname.startsWith("/email-verification") ||
  //   pathname.startsWith("/reset-password-email") ||
  //   pathname.startsWith("/reset-password-otp") ||
  //   pathname.startsWith("/reset-password-confirm");

  // const isProtectedRoute =
  //   pathname.startsWith("/dashboard") ||
  //   pathname.startsWith("/admin") ||
  //   pathname.startsWith("/checkout");

  // // 🔥 FIXED HERE
  // if (isAuthPage && isAuth) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // if (isProtectedRoute && !isAuth) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};