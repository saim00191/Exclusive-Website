import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/admin", "/admin/users", "/admin/orders"];
  const adminInfo = req.cookies.get("adminInfo"); 

  if (protectedRoutes.includes(req.nextUrl.pathname) && !adminInfo) {
    return NextResponse.redirect(new URL("/adminLogin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/users", "/admin/orders"],
};
