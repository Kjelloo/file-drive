variable "s3_user" {
  type = string
  default = "s3_dev"
}

variable "s3_path" {
  type = string
  default = "terraform/dev/s3"
}

variable "s3_user_policy_name" {
  type = string
  default = "s3_dev_policy"
}