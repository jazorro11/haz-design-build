import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** `app/_*` es carpeta privada en Next; servimos la UI en `/internal/…` y reescribimos la URL acordada en el brief. */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/_internal/design-system") {
    const url = request.nextUrl.clone();
    url.pathname = "/internal/design-system";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/_internal/design-system",
};
