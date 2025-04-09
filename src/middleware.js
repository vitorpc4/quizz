import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {

  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = req.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    
    await jwtVerify(session, SECRET, {
      algorithms: ["HS256"],
    });
    return NextResponse.next();
    
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/login', req.url));
  }

}

export const config = {
  matcher: ["/((?!api/auth|login|register|_next|favicon.ico).*)"],
};
