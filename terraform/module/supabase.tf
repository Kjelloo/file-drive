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