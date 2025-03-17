import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FileText, Menu, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const dynamicParams = false;
export const runtime = 'edge';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Google Drive Clone",
    description: "A Google Drive clone built with Next.js and Tailwind CSS",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <ClerkProvider 
            appearance={{
                elements: {
                    footer: "hidden", // Hide the Clerk footer
                }
            }}
        >
        <body className={inter.className}>
        <SignedIn>
            <div className="flex h-screen flex-col">
                <header className="flex h-16 items-center border-b px-4 md:px-6">
                    <div className="flex items-center gap-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-56 p-0">
                                <nav className="flex flex-col gap-1 p-4">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <FileText className="h-5 w-5" />
                                        My Drive
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span>Filedrive</span>
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <form className="relative hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search in Drive"
                                className="w-64 rounded-full bg-muted pl-8 md:w-80"
                            />
                        </form>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </div>
                </header>
                <div className="flex flex-1">
                    <aside className="hidden w-56 flex-col border-r md:flex">
                        <nav className="flex flex-col gap-1 p-4">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
                            >
                                <FileText className="h-5 w-5" />
                                My Drive
                            </Link>
                        </nav>
                    </aside>
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            </div>
        </SignedIn>
        <SignedOut>
            {children}
        </SignedOut>
        </body>
        </ClerkProvider>
        </html>
    )
}