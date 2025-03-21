variable "environment" {
  type = string
  default = "dev"
}

variable "s3_user" {
  type = string
  default = "s3-dev"
}

variable "s3_path" {
  type = string
  default = "/terraform/dev/s3/"
}

variable "s3_bucket_name" {
  type = string
  default = "schoke-drive-dev"
}

variable "vercel_project_name" {
  type = string
  default = "schoke-drive"
}

variable "github_repo" {
  type = string
  default = "kjelloo/file-drive"
}

variable "postgres_url" {
  type = string
  sensitive = true
  default = "postgres://postgres:password@localhost:5432/postgres"
}

variable "clerk_secret_key" {
  type = string
  sensitive = true
  default = "default"
}

variable "next_public_clerk_publishable_key" {
  type = string
  default = "default"
}

variable "next_public_clerk_sign_in_url" {
  type = string
  default = "/sign-in"
}

variable "next_public_clerk_sign_in_fallback_redirect_url" {
  type = string
  default = "/"
}