// middleware.ts
import type { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const cookie = request.cookies.get("carrotsession");
  // console.log("pathname", request.nextUrl.pathname);
  // if (request.nextUrl.pathname !== "/enter") {
  //   return NextResponse.redirect(
  //     new URL(`${request.nextUrl.origin}/enter`, request.url)
  //   );
  // }
}
