---
date: 2025-12-12 21:06:59
templateKey: blog-post
title: Setup A Cloudflare Tunnel With Terraform
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png"
tags:
  - tofu
  - terraform
  - tech
---

I am cooking up some stuff at home and want to put it on the interwebs, but I
don't want it on the same infra as my homelab. Now... I only have a server or
2, so to some degree it will be, but networking-wise I didn't want to funnel
extra traffic through my reverse proxy.

So, I'd heard about Cloudflare Tunnels - they sound like P2P VPN to me, but I
know there's layers of the networking stack I'm blatantly ignoring. "What the
tunnel is" isn't much the point - I'm here to show you how to set one up and
get yourself a fancy <https://app.mydomain.com> for your web app running
kind of wherever you want

> Example Repo linked at the bottom

## Requirements

0. Terraform or open-tofu. I currently use open-tofu but either would be fine.
   `brew install open-tofu` is a simple way to get going
1. Cloudflare account with a domain
2. API token with permissions:
   - `Account:Cloudflare Tunnel:Edit`
   - `Zone:DNS:Edit`
3. `cloudflared` (the example repo runs cloudflared in a docker compose stack)

## Tunnel

The module is simple and has just a few resources:

```bash
❯ tofu state list
module.tunnel.cloudflare_record.tunnel
module.tunnel.cloudflare_tunnel_config.this
module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
module.tunnel.random_id.tunnel_secret

```

We see there will be the a DNS record that tofu references by the key "tunnel".
There is a tunnel configuration resource, the tunnel resource itself, and
finally the associated secret required for the cloudflared daemon that will run
alongside your webapp.

To get started you'll need to fill out the example `terraform.tfvars` file with
your info:

```hcl
# Copy to terraform.tfvars and fill in values
# DO NOT commit terraform.tfvars to git

cloudflare_api_token  = "your-api-token-here"
cloudflare_account_id = "your-account-id"
cloudflare_zone_id    = "your-zone-id"
domain                = "example.com"
subdomain             = "app"
tunnel_name           = "my-tunnel"
origin_service        = "http://localhost:8000"
```

You can grab your account id and zone id from Cloudflare's dashboard for your
domain. It's near the bottom of the Overview page

![20251213113332_0e0f09b8.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png)

Then I presume you have a domain already, but if not hop over to namecheap to
snag one and then register it with cloudflare so they can manage your DNS. I
have terraform for this as well, a future blog post will combine this with a
fuller terraform'd cloudflare setup for simple domain use cases

Once you fill those out, hit it with the `tofu init` and `tofu plan` to see what's up

> NOTE: `terraform.tfvars` is automatically sourced by terraform/tofu, you can name the file differently and then pass `-var-file=myvars.tfvars` to the commands

The initial plan should look something like this:

```bash

OpenTofu used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

OpenTofu will perform the following actions:

  # module.tunnel.cloudflare_record.tunnel will be created
  + resource "cloudflare_record" "tunnel" {
      + allow_overwrite = false
      + comment         = "Managed by Terraform - soonish-tunnel"
      + content         = (known after apply)
      + created_on      = (known after apply)
      + hostname        = (known after apply)
      + id              = (known after apply)
      + metadata        = (known after apply)
      + modified_on     = (known after apply)
      + name            = "app"
      + proxiable       = (known after apply)
      + proxied         = true
      + ttl             = (known after apply)
      + type            = "CNAME"
      + value           = (known after apply)
      + zone_id         = "<REDACTED>"
    }

  # module.tunnel.cloudflare_tunnel_config.this will be created
  + resource "cloudflare_tunnel_config" "this" {
      + account_id = "<REDACTED>"
      + id         = (known after apply)
      + tunnel_id  = (known after apply)

      + config {
          + ingress_rule {
              + hostname = "app.notifiq.net"
              + service  = "http://localhost:8000"
            }
          + ingress_rule {
              + service = "http_status:404"
            }
        }
    }

  # module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this will be created
  + resource "cloudflare_zero_trust_tunnel_cloudflared" "this" {
      + account_id   = "<REDACTED>"
      + cname        = (known after apply)
      + id           = (known after apply)
      + name         = "soonish-tunnel"
      + secret       = (sensitive value)
      + tunnel_token = (sensitive value)
    }

  # module.tunnel.random_id.tunnel_secret will be created
  + resource "random_id" "tunnel_secret" {
      + b64_std     = (known after apply)
      + b64_url     = (known after apply)
      + byte_length = 32
      + dec         = (known after apply)
      + hex         = (known after apply)
      + id          = (known after apply)
    }

Plan: 4 to add, 0 to change, 0 to destroy.

```

As long as that looks good you to, then we `tofu apply` next (type `yes` when
asked or pass `-auto-approve`)

Afterwards `tofu state list` should show you the 4 resources, and if you go to
your cloudflare zone's dashboard you should see the CNAME associated with the
tunnel address

![20251213120004_d199e5fd.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png)

## Daemon

Run the compose stack or the binary itself. Get the token from terraform state with `tofu output -raw tunnel_token`.

`TUNNEL_TOKEN=$(tofu output -raw tunnel_token) docker compose up -d` will do you nicely

Enjoy your tunnel!

[example repo](https://github.com/pypeaday/example-terraform-cloudflare-tunnel)
