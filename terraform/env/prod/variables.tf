variable "environment" {
  type    = list(string)
  default = ["production"]
}

variable "default_branch" {
  type    = string
  default = "main"
}

variable "supabase_name" {
  type    = string
  default = "schoke-drive"
}

variable "supabase_access_token" {
  type      = string
  default   = "default"
  sensitive = true
}

variable "supabase_password" {
  type    = string
  default = "default"
}

variable "s3_user" {
  type    = string
  default = "s3-prod"
}

variable "s3_path" {
  type    = string
  default = "/terraform/prod/s3/"
}

variable "s3_bucket_name" {
  type    = string
  default = "schoke-drive-prod"
}

variable "vercel_project_name" {
  type    = string
  default = "schoke-drive"
}

variable "vercel_domain" {
  type    = string
  default = "drive.schoke.dk"
}

variable "clerk_secret_key" {
  type      = string
  sensitive = true
  default   = "default"
}

variable "next_public_clerk_publishable_key" {
  type    = string
  default = "default"
}

variable "next_public_clerk_sign_in_url" {
  type    = string
  default = "/sign-in"
}

variable "next_public_clerk_sign_in_fallback_redirect_url" {
  type    = string
  default = "/"
}
