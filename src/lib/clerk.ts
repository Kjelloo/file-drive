import { clerkClient, currentUser } from '@clerk/nextjs/server';

// Export the Clerk client for use throughout the application
export { clerkClient, currentUser };

// Configure Clerk for Cloudflare compatibility
export const clerkConfig = {
  // Ensure Clerk works with Cloudflare's edge runtime
  isSatellite: false,
  domain: process.env.NEXT_PUBLIC_CLERK_DOMAIN || '',
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
  secretKey: process.env.CLERK_SECRET_KEY || '',
}; 