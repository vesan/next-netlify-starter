import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  console.log("req", req);
  console.log("Request in middleware", req.nextUrl);
  console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  console.log("req.nextUrl.locale", req.nextUrl.locale);
  console.log(
    "PUBLIC_FILE.test(req.nextUrl.pathname)",
    PUBLIC_FILE.test(req.nextUrl.pathname)
  );

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "fi";

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
