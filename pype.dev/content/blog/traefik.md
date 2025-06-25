---
templateKey: blog-post
tags: ['homelab', 'tech']
title: Traefik
date: 2022-03-06T00:00:00
published: True
cover: "media/traefik-01.png"

---

# Traefik

If you don't know about [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you might want to check it out.
I used to use nginx for my reverse proxy but the config was over my head, and once it was working I was afraid to touch it.
Traefik brings a lot to the table, my main uses are reverse proxy and ip whitelisting, but it's doing even more under the hood that I don't have a full-grasp of yet.

I like Traefik a lot because once I get some basic config up it's incredibly easy to add services into my homelab whether they run on my primary server or not.
This will not be exhaustive but I'll outline my simple setup process of traefik and how I add services whether they are in docker or not.

# Docker

In 2022 I'm still a docker fan-boy and I run my traefik instance in a docker container. 
This isn't necessary but I love the portability since my homelab is very dynamic at the moment.
And even if it wasn't I'd still want to keep traefik in docker because deployment and updating are just so flipping easy

A simple docker-compose file for traefik might look like this:

```yaml
name: traefik
image: "traefik:v2.4"
network_mode: host
volumes:
  - "docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro"
  - "docker-data/traefik/config.yml:/etc/traefik/config.yml:ro"
  - "docker-data/traefik/letsencrypt:/letsencrypt:rw"
  - "/var/run/docker.sock:/var/run/docker.sock:ro"  # for auto-discovery
env: "{{ traefik_environment_variables }}"
restart_policy: unless-stopped
memory: "1g"
```

# Ansible deployment

__I plan to have more on my homelab and Ansible on this site eventually...__

I use Ansible to deploy most of my services at home, including traefik. My main homelab repo is [here](https://github.com/nicpayne713/ansible-nas) which is a fork of [Ansible NAS](https://github.com/davestephens/ansible-nas).

> If you want my stuff then be sure to go to the `user/nic` branch on my fork

You can see the ansible stuff for traefik [here](https://github.com/davestephens/ansible-nas/tree/master/roles/traefik)

# Config

I use a `traefik.toml` as the main config and it looks something like this.
With ansible a lot of this is done through template variables but this is the general idea.
This config tells traefik what ports to listen and forward on, and gives the names to be referenced by docker labels (down below). 

Traefik also has a handy web ui that with this config you can find on port `8080`.
There is a `providers` section - which is one of the biggest selling points of traefik for me.
I have a docker provider configured  and a static file. 

The docker provider lets traefik auto-discover new services that I deploy and automatically handle the routing!
The static file lets me easily add non-dockerized service routing, or routing to dockerized services on another host (I think traefik has an easier way to do this automatically but I don't do it often enough to need that kind of automation).
Then at the bottom is the SSL cert stuff. 
Using Let's Encrypt is pretty easy and I use Cloudflare as my DNS provider

```toml

[entryPoints]
[entryPoints.web]
address = ":80"

[entryPoints.web.http.redirections.entryPoint]
to = "websecure"

[entryPoints.websecure]
address = ":443"

[entryPoints.websecure.http.tls]
certResolver = "letsencrypt"

[entryPoints.websecure.http.tls.domains]
main = "example.com"
sans = [
"*.example.com"
]

[entryPoints.traefik]
address = ":8080"

[providers]
providersThrottleDuration = "1s"
[providers.docker]
exposedbydefault = false
[providers.file]
filename = "/etc/traefik/config.yml"

[api]
insecure = true
dashboard = true

[log]
level = "INFO"

[ping]
terminatingStatusCode = 0

[certificatesResolvers]
[certificatesResolvers.letsencrypt]
[certificatesResolvers.letsencrypt.acme]
email = "my_email@example.com"
storage = "/letsencrypt/acme.json"
caserver = "https://acme-staging-v02.api.letsencrypt.org/directory"  # le staging, not prod

[certificatesResolvers.letsencrypt.acme.dnsChallenge]
provider = "cloudflare"
```

# Providers.file

To my knowledge there isn't much to configure on the docker provider side of things until you deploy a service.
But the provider config file should get a little screen time here.

The file defines a traefik http router for each service you define, in this case just `pihole`. 

Here I am adding my pihole instance which is not run inside docker but is inside a VM on another host.
I want the `entryPoints` to be set to `websecure` which is configured above in the http redirects.
I want some middlewares, `addprefix-pihole` and `default-headers`, which I'll explain below.
I set letsencrypt as the cert certResolver.
Finally I name the service `pihole`.

Then in the `services` section I configure where pihole is located by just giving the internal IP for traefik to route to.
Finally I define my middlewares. 
To get to the pihole homepage you need to use the route `/admin` so I want that added automatically when I go to `pihole.example.com` so I come to `pihole.example.com/admin`.
And I wanted to restrict access to just my internal network and my wireguard network - this is done with the `default-whitelist`. 
The last thing is to configure a chain of middlewares that I called `secured` which is just easier for the docker labels later on.

With this config in play though, traefik will know about the route `pihole.example.com` and handle the ip whitelisting and load balancing for me.

```yaml
http:
 #region routers 
  routers:
    pihole:
      entryPoints:
        - "websecure"
      rule: "Host(`pihole.example.com`)"
      middlewares:
        # - default-headers
        - addprefix-pihole
        - default-whitelist
      tls: 
        certResolver: letsencrypt
      service: pihole
  #region services
  services:
    pihole:
      loadBalancer:
        servers:
          - url: "http://192.168.1.3:80"
        passHostHeader: true
  #endregion
  middlewares:
    addprefix-pihole:
      addPrefix:
        prefix: "/admin"
    https-redirect:
      redirectScheme:
        scheme: https

    default-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN

    default-whitelist:
      ipWhiteList:
        sourceRange:
        - "10.6.0.0/24"  # wg
        - "192.168.1.0/24"  # lan
        - "172.17.0.0/16"  # docker

    secured:
      chain:
        middlewares:
        - default-whitelist
        - default-headers
```


# Docker labels

Now the real magic is with Docker.
Here is an example docker-compose file for spinning up a [jellyfin](https://jellyfin.org/) server that you want to expose to the world, or at least access at home with `jellyfin.example.com` instead of `http://192.168.1.N:8096`...

I left some of the ansible variable stuff in here, but the main part to be concerned with is the `labels` section...

We define just a few labels to throw onto this docker container which let's traefik discover it automatically and apply any settings necessary (like my `ipWhiteList`).

* `traefik.enable` is either True or False. 
* `traefik.http.router.jellyfin.rule` defines an http router called jellyfin and sets the url to `jellyfin.example.com` (if example.com was my `ansible_nas_domain`)
* `traefik.http.routers.jellyfin.tls.certresolver` is set to letsencrypt since I use LE for my wildcard certs.
* `traefik.http.routers.jellyfin.tls.domains[0].main` will just be `example.com` -> and this should remind you of the toml file above
* `traefik.http.routers.jellyfin.tls.domains[0].sans` is set to `*.example.com`
* `traefik.http.services.jellyfin.loadbalancer.server.port` is set to jellyfin's default http port of 8096, which tells traefik which port to point to for this service.

```yaml
name: jellyfin
image: linuxserver/jellyfin
volumes:
  - "{{ jellyfin_config_directory }}:/config:rw"
  - "{{ jellyfin_movies_directory }}:/movies:{{ jellyfin_movies_permissions }}"
  - "{{ jellyfin_music_directory }}:/music:{{ jellyfin_music_permissions }}"
  - "{{ jellyfin_photos_directory }}:/photos:{{ jellyfin_photos_permissions }}"
  - "{{ jellyfin_tv_directory }}:/tv:{{ jellyfin_tv_permissions }}"
  - "{{ jellyfin_books_directory }}:/books:{{ jellyfin_books_permissions }}"
  - "{{ jellyfin_audiobooks_directory }}:/audiobooks:{{ jellyfin_audiobooks_permissions }}"
ports:
  - "{{ jellyfin_port_http }}:8096"
  - "{{ jellyfin_port_https }}:8920"
env:
  TZ: "{{ ansible_nas_timezone }}"
  PUID: "{{ jellyfin_user_id }}"
  PGID: "{{ jellyfin_group_id }}"
restart_policy: unless-stopped
memory: 1g
labels:
  traefik.enable: "{{ jellyfin_available_externally }}"
  traefik.http.routers.jellyfin.rule: "Host(`jellyfin.{{ ansible_nas_domain }}`)"
  traefik.http.routers.jellyfin.tls.certresolver: "letsencrypt"
  traefik.http.routers.jellyfin.tls.domains[0].main: "{{ ansible_nas_domain }}"
  traefik.http.routers.jellyfin.tls.domains[0].sans: "*.{{ ansible_nas_domain }}"
  traefik.http.services.jellyfin.loadbalancer.server.port: "8096"
```


And just like that traefik will automagically find your jellyfin container and route `jellyfin.example.com` to it!
