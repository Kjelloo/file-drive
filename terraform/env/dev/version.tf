terraform {
  required_version = "~>1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~>2.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.5.1"
    }
  }
}