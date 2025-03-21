ALTER TABLE "files" DROP CONSTRAINT "files_parent_id_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "folders" DROP CONSTRAINT "folders_parent_id_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "folders" DROP COLUMN "updated_at";