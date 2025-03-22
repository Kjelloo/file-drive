resource "vercel_project" "drive" {
  name = var.vercel_project_name
  framework = "nextjs"
  serverless_function_region = "fra1"

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}

resource "vercel_project_environment_variables" "drive" {
  project_id = vercel_project.drive.id

  lifecycle {
    replace_triggered_by = [
      random_pet.random.id
    ]
  }

  variables = [
    {
      key     = "POSTGRES_URL"
      value   = var.postgres_url
      target  = var.environment == "prod" ? ["production"] : ["preview"]
      sensitive = true
    },
    {
      key     = "S3_USER"
      value   = var.s3_user
      target  = var.environment == "prod" ? ["production"] : ["preview"]
    },
    {
      key     = "S3_PATH"
      value   = var.s3_path
      target  = var.environment == "prod" ? ["production"] : ["preview"]
    },
    {
      key     = "S3_BUCKET_NAME"
      value   = var.s3_bucket_name
      target  = var.environment == "prod" ? ["production"] : ["preview"]
    },
    {
      key     = "CLERK_API_KEY"
      value   = var.clerk_secret_key
      target  = var.environment == "prod" ? ["production"] : ["preview"]
      sensitive = true
    },
    {
      key     = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      value   = var.next_public_clerk_publishable_key
      target  = var.environment == "prod" ? ["production"] : ["preview"]
    },
    {
      key     = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
      value   = var.next_public_clerk_sign_in_url
      target  = ["production", "preview"] // Same for either environments
    },
    {
      key     = "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL"
      value   = var.next_public_clerk_sign_in_fallback_redirect_url
      target  = ["production", "preview"]
    }
  ]
}

resource "vercel_project_domain" "drive" {
  project_id = vercel_project.drive.id
  domain     = var.vercel_domain
}

resource "random_pet" "random" {
  keepers = {
    time = timestamp()
  }
}