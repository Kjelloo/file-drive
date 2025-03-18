import { NextResponse } from 'next/server';
import { currentUser, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

// export async function middleware(req: NextRequest) {
//     const user = await currentUser();
//
//     // Clone the headers
//     const requestHeaders = new Headers(req.headers);
//
//     if (user) {
//         requestHeaders.set('x-user-id', user.id);
//     }
//
//     return NextResponse.next({
//         request: {
//             headers: requestHeaders,
//         },
//     });
// }

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};