import { getCurrentUser } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login"];

const sharedRoutes = [/^\/dashboard\/profile/];

const roleBasedPrivateRoutes = {
  customer: [/^\/dashboard\/user/],
  admin: [/^\/dashboard\/admin/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(
        `/login?redirectPath=${pathname}`,
        request.url
      )
    );
  }

  if (sharedRoutes.some(route => pathname.match(route))) {
    return NextResponse.next();
  }
  
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/checkout",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
