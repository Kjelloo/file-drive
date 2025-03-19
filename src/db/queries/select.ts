import {and, eq, isNull} from "drizzle-orm";
import {files, folders} from "@/db/schema";
import {db} from "@/db";

export async function getFilesByPath(userId: string, path: string | null) {
    if (!path) {
        return db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.userId, userId),
                    isNull(files.parentId)
                )
            );
    }

    return db
        .select()
        .from(files)
        .where(
            and(
                eq(files.userId, userId),
                eq(files.path, path)
            )
        );
}

export async function getFoldersByPath(userId: string | null, path: string | null) {
    if (!userId) {
        return [];
    }

    if (!path) {
        return db
            .select()
            .from(folders)
            .where(
                and(
                    eq(folders.userId, userId),
                    isNull(folders.parentId)
                )
            );
    }

    return db
        .select()
        .from(folders)
        .where(
            and(
                eq(folders.userId, userId),
                eq(folders.path, path)
            )
        );
}