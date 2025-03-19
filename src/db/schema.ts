/* eslint-disable @typescript-eslint/no-explicit-any */
import {pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const fileTypeEnum = pgEnum('file_type', ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'png']);

export const files = pgTable('files', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    type: fileTypeEnum('type').notNull(),
    size: text('size').notNull(),
    url: text('url').notNull(),
    path: text('path'),
    modified: timestamp('modified').defaultNow(),
    parentId: uuid('parent_id').references(() => folders.id),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const folders = pgTable('folders', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    modified: timestamp('modified').defaultNow(),
    path: text('path'),
    parentId: uuid('parent_id').references((): any => folders.id),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});