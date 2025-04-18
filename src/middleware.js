import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { decrypt } from "./lib/jwt";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/api/auth",
  "/takequizz",
  "/api/quiz",
  "/api/evaluation",
];

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {

  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    
    await decrypt(session);
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api/auth|login|register|_next|favicon.ico).*)"],
};
