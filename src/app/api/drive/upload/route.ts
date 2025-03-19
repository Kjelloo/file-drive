import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadFileMetadata } from "@/db/queries/insert";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const path = formData.get('path') as string;
        const parentId = formData.get('parentId') as string;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // TODO: Upload file to S3 and get URL
        const s3Url = "https://your-s3-bucket.com/" + file.name; // Placeholder

        // Create file metadata
        const fileMetadata = {
            id: crypto.randomUUID(),
            userId,
            name: file.name,
            type: file.type.split('/')[1] as "pdf" | "docx" | "xlsx" | "pptx" | "txt" | "jpg" | "png",
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            url: s3Url,
            path: path || null,
            parentId: parentId || null,
            modified: new Date(file.lastModified),
            createdAt: new Date(),
        };

        const createdFile = await uploadFileMetadata(fileMetadata);

        return NextResponse.json(createdFile);
    } catch (error) {
        console.error('File Upload Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 