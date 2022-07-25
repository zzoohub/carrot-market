import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    return new Response("Please don't be a bot. Be a human.", { status: 404 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
}
