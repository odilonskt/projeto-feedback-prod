import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Log simples para debug
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`
  );

  // Continue com a requisição normalmente
  return NextResponse.next();
}

// Aplica apenas a rotas específicas (opcional)
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
