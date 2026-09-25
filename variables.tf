variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Short name used to tag and name resources"
  type        = string
  default     = "paynaija"
}

variable "instance_type" {
  description = "EC2 instance size for the app server"
  type        = string
  default     = "t3.micro"
}

variable "db_instance_class" {
  description = "RDS instance size"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Postgres database name"
  type        = string
  default     = "paynaija"
}

variable "db_username" {
  description = "Postgres master username"
  type        = string
  default     = "paynaija_admin"
}

variable "db_password" {
  description = "Postgres master password"
  type        = string
  sensitive   = true
}

variable "key_pair_name" {
  description = "Name of the EC2 key pair to attach"
  type        = string
  default     = "paynaija-key"
}