import { NextRequest, NextResponse } from "next/server";

const MAINTENANCE = process.env.MAINTENANCE_MODE === "true";

export async function middleware(request: NextRequest) {
  if (!MAINTENANCE && /maintenance$/.test(request.nextUrl.pathname))
    return NextResponse.rewrite(new URL("/not-found", request.url));

  /*
   * controls the maintenance state
   */
  if (MAINTENANCE) {
    if (/images/.test(request.nextUrl.pathname)) return NextResponse.next();
    const maintenanceUrl = request.nextUrl.clone();
    maintenanceUrl.pathname = "/maintenance";
    return NextResponse.rewrite(maintenanceUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
