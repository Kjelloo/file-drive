/* eslint-disable @typescript-eslint/no-explicit-any */
import {pgEnum, pgTable, text, timestamp, uuid, type PgTableWithColumns} from 'drizzle-orm/pg-core';
import {folders} from "@/db/schema/folder";

export const fileTypeEnum = pgEnum('file_type', ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'png']);

export const files: PgTableWithColumns<any> = pgTable('files', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    type: fileTypeEnum('type').notNull(),
    size: text('size').notNull(),
    url: text('url').notNull(),
    modified: timestamp('modified').defaultNow(),
    parentId: uuid('parent_id').references(() => folders.id),
    userId: text('user_id').notNull(),
    path: text('path').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}); 