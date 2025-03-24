locals {
  # Define environment variables that adapt based on current workspace
  env_vars = [
    {
      key       = "POSTGRES_URL"
      value     = var.postgres_url
      target   = [var.environment]
      sensitive = true
    },
    {
      key       = "S3_USER"
      value     = var.s3_user
      target   = [var.environment]
      sensitive = false
    }
  ]
}

resource "vercel_project" "drive" {
  name = var.vercel_project_name
  framework = "nextjs"
  serverless_function_region = "fra1"

  git_repository = {
    type = "github"
    repo = "Kjelloo/file-drive"
  }
}

resource "vercel_project_environment_variable" "drive" {
  for_each = { for idx, env in local.env_vars : idx => env }

  project_id = vercel_project.drive.id
  key        = each.value.key
  value      = each.value.value
  target    = each.value.target
  sensitive  = each.value.sensitive
}

resource "vercel_project_domain" "drive" {
  project_id = vercel_project.drive.id
  domain     = var.vercel_domain
}