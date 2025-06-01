import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/signup"];

const PUBLIC_ROUTES = [...AUTH_ROUTES];

const redirectToPath = (path, url) => {
  url.pathname = path;
  return NextResponse.redirect(url);
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value || null;
  const basePath = req.nextUrl.clone();

  if (token && AUTH_ROUTES.includes(pathname)) {
    return redirectToPath("/", basePath);
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToPath("/login", basePath);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
