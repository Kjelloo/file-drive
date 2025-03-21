module "platform" {
  source = "../../module/"

  s3_user = "s3-dev"
  s3_path = "/terraform/dev/s3/"
  s3_bucket_name = "schoke-drive-dev"
}