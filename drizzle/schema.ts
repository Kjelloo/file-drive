import { pgTable, foreignKey, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const fileType = pgEnum("file_type", ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'png'])


export const files = pgTable("files", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	type: fileType().notNull(),
	size: text().notNull(),
	modified: timestamp({ mode: 'string' }).defaultNow(),
	parentId: uuid("parent_id"),
	userId: text("user_id").notNull(),
	path: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	url: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [folders.id],
			name: "files_parent_id_folders_id_fk"
		}),
]);

export const folders = pgTable("folders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	modified: timestamp({ mode: 'string' }).defaultNow(),
	parentId: uuid("parent_id"),
	userId: text("user_id").notNull(),
	path: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "folders_parent_id_folders_id_fk"
		}),
]);
