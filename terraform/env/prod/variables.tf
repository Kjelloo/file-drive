variable "s3_user" {
  type = string
  default = "s3-prod"
}

variable "s3_path" {
  type = string
  default = "/terraform/prod/s3/"
}

variable "s3_user_policy_name" {
  type = string
  default = "s3-prod-policy"
}

variable "s3_bucket_name" {
  type = string
  default = "schoke-drive-prod"
}