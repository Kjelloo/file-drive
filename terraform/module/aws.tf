resource "aws_iam_user" "s3" {
  name = var.s3_user
  path = var.s3_path
}

resource "aws_iam_user_policy" "s3_ro" {
  name = var.s3_user_policy_name
  user = aws_iam_user.s3.name

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Effect = "Allow"
            Action = [
            "s3:ListAllMyBuckets",
            "s3:GetBucketLocation",
            "s3:ListBucket",
            "s3:ListBucketMultipartUploads",
            "s3:GetObject",
            "s3:ListMultipartUploadParts",
            "s3:PutObject",
            "s3:AbortMultipartUpload",
            "s3:DeleteObject",
            "s3:PutObjectAcl",
            ]
            Resource = "*"
        }
        ]
    })
}

resource "aws_iam_access_key" "s3" {
  user = aws_iam_user.s3.name
}