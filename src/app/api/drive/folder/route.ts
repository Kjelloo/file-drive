import {NextRequest, NextResponse} from "next/server";
import {uploadFolderMetadata} from "@/db/queries/insert";
import {auth} from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const folderName = formData.get('folderName') as string;
        const parentId = formData.get('parentId') as string;
        const path = formData.get('path') as string;

        if (!folderName) {
            return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
        }

        const folderMetadata = {
            id: crypto.randomUUID(),
            name: folderName,
            parentId: parentId ? parentId : null,
            createdAt: new Date(),
            modified: null,
            userId: userId,
            path: path || null,
        }

        const createdFolder = await uploadFolderMetadata(folderMetadata);

        return NextResponse.json(createdFolder);
    } catch (error) {
        console.error('Folder Upload Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}