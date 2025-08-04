import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  const isAuthPage = url.pathname === "/login" || url.pathname === "/register";
  const isProtectedPage =
    url.pathname.startsWith("/profile") ||
    url.pathname.startsWith("/dashboard");

  if (!token) {
    // No token
    if (isProtectedPage) {
      // Quieren acceder a zona protegida sin token -> redirigir a login
      console.log("No token, redirigiendo a login");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // No token y no zona protegida -> dejar pasar (por ej /login o /register)
    return NextResponse.next();
  }

  // Si hay token, verifico validez
  try {
    await jwtVerify(token, secret);

    // Token válido

    if (isAuthPage) {
      // Si está logueado y quiere ir a login o register, lo mando al dashboard
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // Si accede a zona protegida o cualquier otra ruta, dejar pasar
    return NextResponse.next();
  } catch (error) {
    // Token inválido

    if (isProtectedPage) {
      // Si token inválido y quieren zona protegida, redirigir a login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Token inválido pero quieren ir a login o register o ruta pública -> dejar pasar
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*", "/dashboard/:path*"],
};
