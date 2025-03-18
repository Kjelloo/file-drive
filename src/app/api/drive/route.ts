import { NextRequest, NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import {getFilesByPath, getFoldersByPath} from "@/db/queries/select";

export async function GET(req: NextRequest) {
    try {
        const user = await auth();

        if (!user.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        let path = searchParams.get('path');

        if (path?.length == 0) {
            path = null;
        }

        const [files, folders] = await Promise.all([
            getFilesByPath(user.userId, path),
            getFoldersByPath(user.userId, path)
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