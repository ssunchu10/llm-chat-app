// middleware.ts
import { withAuth } from "next-auth/middleware";
export default withAuth({ pages: { signIn: "/login" } });
export const config = { matcher: ["/home", "/app/:path*"] };


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");
//   const isAuth = !!token;

//   // Only protect the root route
//   if (request.nextUrl.pathname === "/" && !isAuth) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/"], // Only run middleware on the root route
// };
