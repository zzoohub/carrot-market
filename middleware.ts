// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    if (
      request.cookies.get("carrotsession") === undefined &&
      request.nextUrl.pathname !== "/enter"
    ) {
      console.log("redirect");
      return NextResponse.redirect(
        new URL(`${request.nextUrl.origin}/enter`, request.url)
      );
    }
  }
}

export const config = {
  matcher: ["/"],
};
