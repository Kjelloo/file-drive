import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

// Explicitly set edge runtime for Cloudflare compatibility
export const runtime = 'experimental-edge';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/api(.*)', // Allow API routes without authentication
  '/_next/static/(.*)', // Allow static files
  '/favicon.ico',
]);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};