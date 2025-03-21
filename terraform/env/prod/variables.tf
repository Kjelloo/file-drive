variable "s3_user" {
  type = string
  default = "s3_prod"
}

variable "s3_path" {
  type = string
  default = "terraform/prod/s3"
}

variable "s3_user_policy_name" {
  type = string
  default = "s3_prod_policy"
}

variable "s3_bucket_name" {
  type = string
  default = "schoke_drive_prod"
}