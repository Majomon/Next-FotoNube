import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("No hay token, redirigiendo a login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // jwtVerify devuelve el payload si es válido, o lanza error si no
    await jwtVerify(token, secret);
    console.log("Token válido");
    return NextResponse.next();
  } catch (error) {
    console.log("Error verificando token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
