import {NextRequest, NextResponse} from "next/server";
import { cookies } from 'next/headers';

const publicRoutes = ["/login", '/signup'];

export default async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const url = req.nextUrl;
    try {
        if (token) {
            // If user is authenticated, prevent access to login/signup
            if (publicRoutes.includes(url.pathname)) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            return NextResponse.next();
        }

        // If no token and trying to access a non-public route, redirect to log in
        if (!publicRoutes.includes(url.pathname)) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        return NextResponse.next();
    } catch {
        // If token is invalid, redirect to log in
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}