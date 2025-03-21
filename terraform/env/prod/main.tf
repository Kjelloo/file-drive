module "platform" {
  source = "../../module/"
  environment = "prod"

  // S3
  s3_user = "s3-prod"
  s3_path = "/terraform/prod/s3/"
  s3_bucket_name = "schoke-drive-prod"

  // Supabase
  postgres_url = "" // Set by terraform cloud

  // Clerk
  clerk_secret_key = ""
  next_public_clerk_publishable_key = ""
  next_public_clerk_sign_in_url = "/sign-in"
  next_public_clerk_sign_in_fallback_redirect_url = "/"

  // Vercel
  vercel_project_name = "schoke-drive"
  github_repo = "kjelloo/file-drive"
}