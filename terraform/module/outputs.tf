output "project_id" {
  precondition {
    condition = var.environment[0] == "development" || var.environment[0] == "preview"
  }
  value = vercel_project.drive.id
}