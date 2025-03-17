import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken"

const publicRoutes = ["/login", '/signup'];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl;
    try {
        if (token) {
            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

            // Check expiration
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // If user is authenticated, prevent access to login/signup
            if (publicRoutes.includes(url.pathname)) {
                return NextResponse.redirect(new URL('/', req.url));
            }

            return NextResponse.next();
        }

        // If no token and trying to access a non-public route, redirect to login
        if (!publicRoutes.includes(url.pathname)) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        return NextResponse.next();
    } catch {
        // If token is invalid, redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}