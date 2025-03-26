locals {
  env_vars = [
    {
      key       = "POSTGRES_URL"
      value     = data.supabase_pooler.drive.url[0]
      target    = var.environment
      sensitive = false
    },
    {
      key       = "S3_USER"
      value     = var.s3_user
      target    = var.environment
      sensitive = false
    },
    {
      key       = "S3_PATH"
      value     = var.s3_path
      target    = var.environment
      sensitive = false
    },
    {
      key       = "S3_BUCKET_NAME"
      value     = var.s3_bucket_name
      target    = var.environment
      sensitive = false
    },
    {
      key       = "CLERK_SECRET_KEY"
      value     = var.clerk_secret_key
      target    = var.environment
      sensitive = false
    },
    {
      key       = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      value     = var.next_public_clerk_publishable_key
      target    = var.environment
      sensitive = false
    },
    {
      key       = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
      value     = var.next_public_clerk_sign_in_url
      target    = var.environment
      sensitive = false
    },
    {
      key       = "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL"
      value     = var.next_public_clerk_sign_in_fallback_redirect_url
      target    = var.environment
      sensitive = false
    },
    {
      key       = "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL"
      value     = var.next_public_clerk_sign_up_fallback_redirect_url
      target    = var.environment
      sensitive = false
    },
    {
      key       = "VERCEL_ENV"
      value     = var.environment[0]
      target = ["production"]
      sensitive = false
    }
  ]
}

resource "vercel_project" "drive" {
  name      = var.vercel_project_name
  framework = "nextjs"
  serverless_function_region = "fra1"

  // Only deploy on production branch
  ignore_command = "if [ \"$VERCEL_ENV\" == \"production\" ]; then exit 1; else exit 0; fi"

  auto_assign_custom_domains = false

  git_repository = {
    type              = "github"
    repo              = "Kjelloo/file-drive"
    production_branch = var.main_branch
  }

  depends_on = [
    supabase_project.drive,
    aws_s3_bucket.files
  ]
}

resource "vercel_project_environment_variable" "drive" {
  for_each = {for idx, env in local.env_vars : idx => env}

  project_id = vercel_project.drive.id
  key        = each.value.key
  value      = each.value.value
  target     = each.value.target
  sensitive  = each.value.sensitive

  depends_on = [
    vercel_project.drive,
    aws_s3_bucket.files
  ]
}

resource "vercel_project_domain" "drive" {
  project_id = vercel_project.drive.id
  domain     = var.vercel_domain

  depends_on = [
    vercel_project.drive,
    aws_s3_bucket.files
  ]
}