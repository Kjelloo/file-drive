module "platform" {
  source = "../../module/"

  s3_user = "s3-prod"
  s3_path = "/terraform/prod/s3/"
  s3_bucket_name = "schoke-drive-prod"
}