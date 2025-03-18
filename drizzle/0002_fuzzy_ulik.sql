ALTER TABLE "folders" ALTER COLUMN "path" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "path" text;