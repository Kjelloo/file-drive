module "platform" {
  source = "../../module/"

  s3_user = "s3_prod"
  s3_path = "terraform/prod/s3"
  s3_user_policy_name = "s3_prod_policy"
  s3_bucket_name = "schoke_drive_prod"
}