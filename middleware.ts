import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;

    const restrictedPaths = ["/signIn", "/signup"];
    if (restrictedPaths.includes(pathname)) {
      // Redirect authenticated users to the dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow the request to continue for other cases
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/signIn", "/signup", "/dashboard"] };
