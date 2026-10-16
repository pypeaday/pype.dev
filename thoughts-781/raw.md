
<a href="https://community.fly.io/t/static-egress-ips-for-machines/22004">
    <img
        src="https://shots.wayl.one/shot/?url=https://community.fly.io/t/static-egress-ips-for-machines/22004&height=450&width=800&scaled_width=800&scaled_height=450&selectors=""
        alt="shot of post - 💭 Static egress IPs for machines - Fresh Produce - Fly.io"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="https://community.fly.io/t/static-egress-ips-for-machines/22004">💭 Static egress IPs for machines - Fresh Produce - Fly.io</a>

---

I'm starting to setup litestream for replicating sqlite dbs of my apps to my self-hosted MinIO instance... only issue is most of my networking assumes client connectivity via tailscale so I whitelist pretty much every accessible domain.
This has gotten me in trouble once or twice, and I'm currently in the throws of backing up sqlite from fly.io. The easiest solution for me would be to add egress IP cidr blocks to my traefik whitelisting configuration and wouldn't ya know it - in september 2024 fly.io released the ability to set static egress IPs!

---

!!! note
     This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's
     content online.  Learn more about the process [[ thoughts ]]


---

['fly.ip', 'egress', 'reverse-proxy', 'thoughts']
        