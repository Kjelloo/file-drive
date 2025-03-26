resource "supabase_project" "drive" {
  database_password = var.supabase_password
  name              = var.supabase_name
  organization_id   = "dncjzximfknzchkqmrma"
  region            = "eu-central-1"

  lifecycle {
    ignore_changes = [
      database_password,
      instance_size,
    ]
  }
}

data "supabase_pooler" "drive" {
  project_ref = supabase_project.drive.id
}

output "supabase_pooler_url" {
  value = replace(values(data.supabase_pooler.drive.url)[0], "[YOUR-PASSWORD]", var.supabase_password)
}