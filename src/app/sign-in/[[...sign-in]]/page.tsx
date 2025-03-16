import { SignIn } from '@clerk/nextjs'

export const runtime = "edge";

export default function Page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <SignIn />
        </div>
    )
}