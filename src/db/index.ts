import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres';
import {files, folders} from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);

export const db = drizzle({ client })

export type DriveFile = typeof files.$inferSelect;
export type DriveFolder = typeof folders.$inferSelect;