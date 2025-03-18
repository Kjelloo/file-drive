CREATE TYPE "public"."file_type" AS ENUM('pdf', 'docx', 'xlsx', 'pptx', 'txt', 'jpg', 'png', 'folder');--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "file_type",
	"size" text,
	"modified" timestamp DEFAULT now(),
	"parent_id" uuid,
	"user_id" text NOT NULL,
	"is_folder" boolean DEFAULT false,
	"path" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_parent_id_files_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;