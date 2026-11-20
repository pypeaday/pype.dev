---
date: 2026-10-25 06:58:00
templateKey: blog-post
title: "PHP2Shell: finding and patching every PHP runtime in the homelab"
published: True
authors:
  - nic
  - id: devin
    details: ran the fleet-wide php sweep, verified traefik router state, built and deployed the patch images
tags:
  - homelab
  - security
  - tech
---

PHP dropped a critical security release on Oct 21. Two unauthenticated RCEs (CVE-2026-109618 and CVE-2026-109619, collected under "PHP2Shell", both CVSS 9.2) in the parts of PHP every request touches, memory management and error handling. Patched versions: 8.2.35, 8.3.36, 8.4.27, 8.5.12. Worst case is Apache mod_php, where an exploit ran before any application code. PHP-FPM is affected too.

I knew nextcloud was PHP. Everything else was a guess, so the first job was an inventory.

## The sweep

Loop over every running container on both docker hosts:

``` console
for c in $(docker ps --format "{{.Names}}"); do
  docker exec $c php -v 2>/dev/null | head -1
done
```

Four PHP services, all on ghost:

| service | php | sapi |
|---|---|---|
| nextcloud | 8.3.35 | apache mod_php |
| freshrss | 8.4.26 | apache mod_php |
| kanboard | 8.4.24 | nginx + php-fpm |
| wallos | 8.2.28 | php-fpm |

All four sit behind traefik on `*.paynepride.com`, which publicly resolves to my WAN IP, and none had an IP whitelist. Internet-facing mod_php on a CVSS 9.2 is about as bad as my setup can get. Aurora had zero PHP, and pihole3 runs Pi-hole v6 which dropped PHP entirely. A half-finished k3s/argocd migration scaffold in the repo also turned out to be dead config, not a live cluster.

## The fix, in order

1. **Pull what upstream already rebuilt.** docker-library re-tagged `nextcloud:32.0.15` with PHP 8.3.36 within hours of disclosure, and `wallos:latest` rebuilt too. Pull, recreate, done. Comparing the remote digest against the local one told me which images had new builds before I pulled anything.
2. **Quarantine what couldn't be patched.** FreshRSS and Kanboard had no rebuilt tags, so I attached the existing `default-whitelist@file` middleware (an ipAllowList for LAN + tailscale) to their routers. Instant 403 at the proxy for anything off-LAN, verified live in traefik's API rather than trusting the labels.
3. **Patch locally instead of waiting on vendors.** Distro security feeds moved faster than the app vendors. Alpine 3.24 already shipped `php84 8.4.27`, and Debian trixie-security had `php8.4 8.4.27-1`. Each stack got a three-line Dockerfile layered on the pinned tag: `apk upgrade` for kanboard, `apt upgrade 'php8.4*' libapache2-mod-php8.4` for freshrss. Built on ghost, redeployed, verified `php -v` reports 8.4.27.

All four services now run patched PHP. The whitelist stays on freshrss and kanboard anyway, since LAN-only is the right posture for them regardless.

## Lessons

- **Official base images get silently re-tagged; app images don't.** `nextcloud:32.0.15` quietly moved to a patched build while `freshrss:1.30.1` never will. Digest comparison beats guessing.
- **The distro fixes the language, not the vendor.** When the app image lags, its base distro's security repo usually already has the patched PHP package. A patch layer on the pinned tag is the move.
- **A reusable whitelist middleware doubles as an emergency quarantine.** One traefik label took a service off the internet without touching the app.
- **"What runs PHP" was a 30-second exec loop.** Faster than auditing compose files by hand, and it caught wallos, which I'd forgotten was PHP at all.

---

*Co-authored with Devin, who ran the container sweeps, compared image digests, applied the whitelist middleware, and built and deployed both patch images.*
