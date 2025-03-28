import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {FileText, Menu} from "lucide-react"
import Link from "next/link"

import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {ClerkProvider, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Personal file drive",
    description: "A personal file drive built with Next.js",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <ClerkProvider
            afterSignOutUrl="/sign-in"
        >
            <body className={inter.className}>
            <SignedIn>
                <div className="flex h-screen flex-col">
                    <header className="flex h-16 items-center border-b px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5"/>
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-56 p-0">
                                    <nav className="flex flex-col gap-1 p-4">
                                        <Link
                                            href="/"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <FileText className="h-5 w-5"/>
                                            My Drive
                                        </Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                            <Link href="/" className="flex items-center gap-2 font-semibold unselectable">
                                <span>Filedrive</span>
                            </Link>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <UserButton appearance={{
                                layout: {
                                    shimmer: false,
                                }
                            }} />
                        </div>
                    </header>
                    <div className="flex flex-1">
                        <aside className="hidden w-56 flex-col border-r md:flex">
                            <nav className="flex flex-col gap-1 p-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground unselectable"
                                >
                                    <FileText className="h-5 w-5"/>
                                    My Drive
                                </Link>
                            </nav>
                        </aside>
                        <main className="flex-1 overflow-auto">{children}</main>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="h-screen w-screen">
                    {children}
                </div>
            </SignedOut>
            </body>
        </ClerkProvider>
        </html>
    )
}