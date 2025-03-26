provider "aws" {
  region = "eu-north-1"
}

provider "vercel" {}

provider "terraform" {}

provider "supabase" {
  access_token = var.supabase_access_token
}