module "platform" {
  source = "../../module/"
  environment = "dev"

  // S3
  s3_user = "s3-dev"
  s3_path = "/terraform/dev/s3/"
  s3_bucket_name = "schoke-drive-dev"

  // Supabase
  postgres_url = "" // Set by terraform cloud

  // Clerk
  clerk_secret_key = ""
  next_public_clerk_publishable_key = "pk_test_aW1tZW5zZS1ibG93ZmlzaC00My5jbGVyay5hY2NvdW50cy5kZXYk"
  next_public_clerk_sign_in_url = "/sign-in"
  next_public_clerk_sign_in_fallback_redirect_url = "/"

  // Vercel
  vercel_project_name = "schoke-drive"
  github_repo = "kjelloo/file-drive"
  vercel_domain = "drive.schoke.dk"
}