import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger toutes les routes admin sauf login et register
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && pathname !== "/admin/register") {
    const sessionToken = request.cookies.get("admin_session")?.value;

    if (!sessionToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Ajouter le pathname dans les headers pour RailsShell
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
