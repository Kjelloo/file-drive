import {and, eq, isNull} from "drizzle-orm";
import {files, folders} from "@/db/schema";
import {db} from "@/db";


export async function getFilesByPath(userId: string, path: string | null) {
    console.log('path: ' + path);
    console.log(userId);

    return db
        .select()
        .from(files)
        .where(
            and(
                eq(files.userId, userId),
                path === null ? isNull(files.parentId) : eq(files.path, path)
            )
        );
}

export async function getFoldersByPath(userId: string | null, path: string | null) {
    if (!userId) {
        return [];
    }

    return db
        .select()
        .from(folders)
        .where(
            and(
                eq(folders.userId, userId),
                path === null
                    ? isNull(folders.parentId) // Root level folders
                    : eq(folders.path, path)
            )
        );
}