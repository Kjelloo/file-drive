import {db, DriveFile, DriveFolder} from "@/db";
import {files, folders} from "@/db/schema";

export async function uploadFileMetadata(file: DriveFile): Promise<DriveFile> {
    if (!file) {
        throw new Error("File is required");
    }
    if (!file.userId) {
        throw new Error("User ID is required");
    }
    if (!file.name) {
        throw new Error("File name is required");
    }
    if (!file.size) {
        throw new Error("File size is required");
    }
    if (!file.type) {
        throw new Error("File type is required");
    }

    const fileCreated = await db.insert(files).values(file).returning();

    if (!fileCreated) {
        throw new Error("Failed to create file");
    }

    return fileCreated[0];
}

export async function uploadFolderMetadata(folder: DriveFolder): Promise<DriveFolder> {
    if (!folder) {
        throw new Error("Folder is required");
    }
    if (!folder.userId) {
        throw new Error("User ID is required");
    }
    if (!folder.name) {
        throw new Error("Folder name is required");
    }

    const folderCreated = await db.insert(folders).values(folder).returning();

    if (!folderCreated) {
        throw new Error("Failed to create folder");
    }

    return folderCreated[0];
}