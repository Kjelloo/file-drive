module "platform" {
  source = "../../module/"
  environment = ["production"]
  main_branch = "main"

  supabase_access_token = var.supabase_access_token

  // S3
  s3_user = "s3-prod"
  s3_path = "/terraform/prod/s3/"
  s3_bucket_name = "schoke-drive-prod"

  // Supabase
  postgres_url = var.postgres_url // Set by terraform cloud

  // Clerk
  clerk_secret_key = var.clerk_secret_key
  next_public_clerk_publishable_key = var.next_public_clerk_publishable_key
  next_public_clerk_sign_in_url = "/sign-in"
  next_public_clerk_sign_in_fallback_redirect_url = "/"
  next_public_clerk_sign_up_fallback_redirect_url = "/"

  // Vercel
  vercel_project_name = "schoke-drive"
  vercel_domain = "drive.schoke.dk"
}