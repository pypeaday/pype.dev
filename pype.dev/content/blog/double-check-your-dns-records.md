---
date: 2025-06-13 06:53:50
templateKey: blog-post
title: Double Check Your DNS Records
published: False
tags:
  - homelab
  - tech
  - dns
  - terraform
  - cloudflare

---

# My Blog

I host [my blog](https://pype.dev) on cloudflare and manage my infra with
terraform. I got a 522 when I went to `https://www.pype.dev` recently and I
wondered why since `https://pype.dev` worked fine...

## Terraform

I had this right in the terraform:

```hcl
resource "cloudflare_pages_domain" "cf_domain" {
  account_id   = local.account_id
  project_name = cloudflare_pages_project.build_config.name
  domain       = "pype.dev"
}
```

But turns out the `www` record was commented out for some reason in my terraform code:

```hcl
resource "cloudflare_pages_domain" "cf_domain_www" {
  account_id   = local.account_id
  project_name = cloudflare_pages_project.build_config.name
  domain       = "www.pype.dev"
}
```

A quick `terraform apply -auto-approve` (careful with this) and we're up and
running with the `www` record now

