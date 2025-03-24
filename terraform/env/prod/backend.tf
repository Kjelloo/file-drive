terraform {
  cloud {
    organization = "schoke"
    workspaces {
      name = "file-drive"
    }
  }
}