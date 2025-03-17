import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export const runtime = "edge";

// Add a loading component for better UX
function SignInLoading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-gray-500">Loading sign-in...</p>
      </div>
    </div>
  )
}

export default function Page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Suspense fallback={<SignInLoading />}>
                <SignIn />
            </Suspense>
        </div>
    )
}