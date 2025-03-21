module "platform" {
  source = "../../module/"

  s3_user = "s3_dev"
  s3_path = "terraform/dev/s3"
  s3_user_policy_name = "s3_dev_policy"
}