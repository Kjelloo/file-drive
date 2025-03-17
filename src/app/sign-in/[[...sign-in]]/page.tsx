'use client';

import {SignIn} from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <SignIn 
                appearance={{
                    elements: {
                        formButtonPrimary: 
                            "bg-black hover:bg-gray-800 text-sm normal-case",
                        card: "shadow-none",
                        footer: "hidden"
                    }
                }}
                routing="path"
                path="/sign-in"
                fallbackRedirectUrl="/"
            />
        </div>
    )
}