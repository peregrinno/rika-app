import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que não precisam de autenticação
const publicRoutes = ['/', '/login', '/register', '/validate', '/verify-account'];

export function middleware(request: NextRequest) {
    // Não podemos acessar localStorage no middleware diretamente
    // Vamos usar um header customizado que será setado pelo client
    const token = request.headers.get('x-auth-token');
    const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    // Se for rota pública, permite acesso
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Se não tiver token e não for rota pública, redireciona para login
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Se tiver token, permite acesso
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public|logos).*)',
    ],
}; 