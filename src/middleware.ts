import { auth } from "auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/dashboard/:path",
    "/users/:path*",
    "/brands/:path*",
    "/complaints/:path*",
    "/projects/:path*",
  ],
};
