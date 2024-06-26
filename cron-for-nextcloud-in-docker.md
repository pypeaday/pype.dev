---
article_html: "<p>AJAX wasn't cutting it, traditional crontab in containers doesn't
  make much\nsense to me, webcron is recommended but I don't want to register with
  anything\noutside my LAN... Turns out you can just spin up an identical container
  with a\ndifferent entrypoint to /cron.sh that does what you need!</p>\n<blockquote>\n<p>Note
  that this is a task in an Ansible playbook - but the docker-compose is straight
  forward</p>\n</blockquote>\n<p>So the only thing you need to make sure of is that
  <em>all</em> the configuration\noptions - data volumes, user permissions, etc. are
  <em>identical</em> between the\ncontainers running the cron job and the one actually
  hosting NextCloud. This\nensures that the container running cron has proper access
  to the database and\nfilesystem - or at least the same access as NextCloud proper.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"nt\">name</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">Nextcloud Cron Docker
  Container</span>\n<span class=\"w\">  </span><span class=\"nt\">docker_container</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">name</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nextcloud-cron</span>\n<span
  class=\"w\">    </span><span class=\"nt\">image</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">    </span><span
  class=\"nt\">pull</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span class=\"w\">    </span><span
  class=\"nt\">links</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">nextcloud-mysql:mysql</span>\n<span class=\"w\">    </span><span
  class=\"nt\">entrypoint</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">/cron.sh</span>\n<span class=\"w\">    </span><span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;/nextcloud:/var/www/html:rw&quot;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">env</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">MYSQL_HOST</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;mysql&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">MYSQL_DATABASE</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;nextcloud&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">MYSQL_USER</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span
  class=\"nt\">MYSQL_PASSWORD</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span class=\"nt\">NEXTCLOUD_TRUSTED_DOMAINS</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;.&quot;</span>\n<span
  class=\"w\">      </span><span class=\"nt\">PUID</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span
  class=\"nt\">PGID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span class=\"nt\">TZ</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">restart_policy</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
  class=\"w\">    </span><span class=\"nt\">memory</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n</code></pre></div>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Pipe
  to a pager to preserve console output in SSH session</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/call-basicconfig-to-get-python-log-messages-in-ipython'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Call basicConfig to get Python log messages
  in iPython</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-12-13
datetime: 2022-12-13 00:00:00+00:00
description: 'AJAX wasn Note that this is a task in an Ansible playbook - but the
  docker-compose is straight forward So the only thing you need to make sure of is
  that '
edit_link: https://github.com/edit/main/pages/til/cron-for-nextcloud-in-docker.md
html: "<p>AJAX wasn't cutting it, traditional crontab in containers doesn't make much\nsense
  to me, webcron is recommended but I don't want to register with anything\noutside
  my LAN... Turns out you can just spin up an identical container with a\ndifferent
  entrypoint to /cron.sh that does what you need!</p>\n<blockquote>\n<p>Note that
  this is a task in an Ansible playbook - but the docker-compose is straight forward</p>\n</blockquote>\n<p>So
  the only thing you need to make sure of is that <em>all</em> the configuration\noptions
  - data volumes, user permissions, etc. are <em>identical</em> between the\ncontainers
  running the cron job and the one actually hosting NextCloud. This\nensures that
  the container running cron has proper access to the database and\nfilesystem - or
  at least the same access as NextCloud proper.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"nt\">name</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">Nextcloud
  Cron Docker Container</span>\n<span class=\"w\">  </span><span class=\"nt\">docker_container</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">name</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nextcloud-cron</span>\n<span
  class=\"w\">    </span><span class=\"nt\">image</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">    </span><span
  class=\"nt\">pull</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span class=\"w\">    </span><span
  class=\"nt\">links</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
  l-Scalar-Plain\">nextcloud-mysql:mysql</span>\n<span class=\"w\">    </span><span
  class=\"nt\">entrypoint</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">/cron.sh</span>\n<span class=\"w\">    </span><span
  class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
  class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;/nextcloud:/var/www/html:rw&quot;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">env</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">MYSQL_HOST</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;mysql&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">MYSQL_DATABASE</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;nextcloud&quot;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">MYSQL_USER</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span
  class=\"nt\">MYSQL_PASSWORD</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span class=\"nt\">NEXTCLOUD_TRUSTED_DOMAINS</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;.&quot;</span>\n<span
  class=\"w\">      </span><span class=\"nt\">PUID</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span
  class=\"nt\">PGID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"s\">&quot;&quot;</span>\n<span class=\"w\">      </span><span class=\"nt\">TZ</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">restart_policy</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
  class=\"w\">    </span><span class=\"nt\">memory</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"s\">&quot;&quot;</span>\n</code></pre></div>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Pipe
  to a pager to preserve console output in SSH session</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/call-basicconfig-to-get-python-log-messages-in-ipython'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Call basicConfig to get Python log messages
  in iPython</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'AJAX wasn Note that this is a task in an Ansible playbook - but
  the docker-compose is straight forward So the only thing you need to make sure of
  is that '
now: 2024-06-26 16:50:21.524135
path: pages/til/cron-for-nextcloud-in-docker.md
published: true
slug: cron-for-nextcloud-in-docker
super_description: 'AJAX wasn Note that this is a task in an Ansible playbook - but
  the docker-compose is straight forward So the only thing you need to make sure of
  is that '
tags:
- homelab
- homelab
- tech
templateKey: til
title: Cron for Nextcloud in Docker
today: 2024-06-26
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
    image: ""
    pull: true
    links:
      - nextcloud-mysql:mysql
    entrypoint: /cron.sh
    volumes:
      - "/nextcloud:/var/www/html:rw"
    env:
      MYSQL_HOST: "mysql"
      MYSQL_DATABASE: "nextcloud"
      MYSQL_USER: ""
      MYSQL_PASSWORD: ""
      NEXTCLOUD_TRUSTED_DOMAINS: "."
      PUID: ""
      PGID: ""
      TZ: ""
    restart_policy: unless-stopped
    memory: ""

```
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Pipe to a pager to preserve console output in SSH session</p>
        </div>
    </a>
    
    <a class='next' href='/call-basicconfig-to-get-python-log-messages-in-ipython'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Call basicConfig to get Python log messages in iPython</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>