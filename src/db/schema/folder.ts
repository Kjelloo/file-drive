/* eslint-disable @typescript-eslint/no-explicit-any */
import { pgTable, text, timestamp, uuid, type PgTableWithColumns } from 'drizzle-orm/pg-core';

export const folders: PgTableWithColumns<any> = pgTable('folders', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    modified: timestamp('modified').defaultNow(),
    parentId: uuid('parent_id').references((): any => folders.id),
    userId: text('user_id').notNull(),
    path: text('path').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}); 