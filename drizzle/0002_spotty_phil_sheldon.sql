CREATE TABLE "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"modified" timestamp DEFAULT now(),
	"parent_id" uuid,
	"user_id" text NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_parent_id_files_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "size" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "is_folder";--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."file_type";--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'png');--> statement-breakpoint
ALTER TABLE "public"."files" ALTER COLUMN "type" SET DATA TYPE "public"."file_type" USING "type"::"public"."file_type";