import { NextRequest, NextResponse } from "next/server";
import { getFilesByPath, getFoldersByPath } from "@/db/queries/select";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const path = searchParams.get('path') || null;

        const [files, folders] = await Promise.all([
            getFilesByPath(userId, path),
            getFoldersByPath(userId, path)
        ]);

        return NextResponse.json({
            files,
            folders
        });
    } catch (error) {
        console.error('Drive API Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 