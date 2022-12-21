---
date: 2022-12-13 06:43:45
templateKey: til
title: Cron for Nextcloud in Docker
published: True
tags:
  - homelab
  - homelab
  - tech

---

AJAX wasn't cutting it, traditional crontab in containers doesn't make much
sense to me, webcron is recommended but I don't want to register with anything
outside my LAN... Turns out you can just spin up an identical container with a
different entrypoint to /cron.sh that does what you need!

> Note that this is a task in an Ansible playbook - but the docker-compose is straight forward

So the only thing you need to make sure of is that _all_ the configuration
options - data volumes, user permissions, etc. are _identical_ between the
containers running the cron job and the one actually hosting NextCloud. This
ensures that the container running cron has proper access to the database and
filesystem - or at least the same access as NextCloud proper.

```yaml
- name: Nextcloud Cron Docker Container
  docker_container:
    name: nextcloud-cron
    image: "{{ nextcloud_image }}"
    pull: true
    links:
      - nextcloud-mysql:mysql
    entrypoint: /cron.sh
    volumes:
      - "{{ nextcloud_data_directory }}/nextcloud:/var/www/html:rw"
    env:
      MYSQL_HOST: "mysql"
      MYSQL_DATABASE: "nextcloud"
      MYSQL_USER: "{{ nextcloud_sql_user }}"
      MYSQL_PASSWORD: "{{ nextcloud_sql_password }}"
      NEXTCLOUD_TRUSTED_DOMAINS: "{{ nextcloud_hostname }}.{{ ansible_nas_domain }}"
      PUID: "{{ nextcloud_user_id }}"
      PGID: "{{ nextcloud_group_id }}"
      TZ: "{{ ansible_nas_timezone }}"
    restart_policy: unless-stopped
    memory: "{{ nextcloud_memory }}"

```



