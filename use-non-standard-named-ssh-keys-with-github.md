---
article_html: "<p>I was getting <code>(publickey denied)</code> when trying to push
  to GH using ssh. When I\ntested the connection I saw that a bunch of keys in ``~/.ssh/
  were being\nattempted</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">✗ ssh git@github.com -vv</span>\n\n<span class=\"go\">...</span>\n\n<span
  class=\"go\">debug1: Will attempt key: /home/nic/.ssh/id_rsa </span>\n<span class=\"go\">debug1:
  Will attempt key: /home/nic/.ssh/id_ecdsa </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ecdsa_sk </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ed25519 </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ed25519_sk </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_xmss </span>\n<span class=\"go\">debug1: Will attempt
  key: /home/nic/.ssh/id_dsa </span>\n\n<span class=\"go\">...</span>\n\n<span class=\"go\">debug1:
  No more authentication methods to try.</span>\n<span class=\"go\">git@github.com:
  Permission denied (publickey).</span>\n</code></pre></div>\n<p>None of those were
  the key I setup with GH. So I added an entry\ninto <code>~/.ssh/config</code>:</p>\n<div
  class=\"highlight\"><pre><span></span><code>Host\ngithub.com\nUser git\nPort 22\nHostname
  github.com\nIdentityFile ~/.ssh/my_custom_github_key\nTCPKeepAlive yes\nIdentitiesOnly
  yes \n</code></pre></div>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/i3-like-keyboard-mapping-in-pop-os'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>i3-Like
  keyboard mapping in Pop_OS</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/reminder-about-ssh-copy-id-for-ssh-and-ansible'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Reminder
  about ssh-copy-id for SSH and Ansible</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2023-01-03
datetime: 2023-01-03 00:00:00+00:00
description: I was getting  None of those were the key I setup with GH. So I added
  an entry
edit_link: https://github.com/edit/main/pages/til/use-non-standard-named-ssh-keys-with-github.md
html: "<p>I was getting <code>(publickey denied)</code> when trying to push to GH
  using ssh. When I\ntested the connection I saw that a bunch of keys in ``~/.ssh/
  were being\nattempted</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">✗ ssh git@github.com -vv</span>\n\n<span class=\"go\">...</span>\n\n<span
  class=\"go\">debug1: Will attempt key: /home/nic/.ssh/id_rsa </span>\n<span class=\"go\">debug1:
  Will attempt key: /home/nic/.ssh/id_ecdsa </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ecdsa_sk </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ed25519 </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_ed25519_sk </span>\n<span class=\"go\">debug1: Will
  attempt key: /home/nic/.ssh/id_xmss </span>\n<span class=\"go\">debug1: Will attempt
  key: /home/nic/.ssh/id_dsa </span>\n\n<span class=\"go\">...</span>\n\n<span class=\"go\">debug1:
  No more authentication methods to try.</span>\n<span class=\"go\">git@github.com:
  Permission denied (publickey).</span>\n</code></pre></div>\n<p>None of those were
  the key I setup with GH. So I added an entry\ninto <code>~/.ssh/config</code>:</p>\n<div
  class=\"highlight\"><pre><span></span><code>Host\ngithub.com\nUser git\nPort 22\nHostname
  github.com\nIdentityFile ~/.ssh/my_custom_github_key\nTCPKeepAlive yes\nIdentitiesOnly
  yes \n</code></pre></div>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/i3-like-keyboard-mapping-in-pop-os'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>i3-Like
  keyboard mapping in Pop_OS</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/reminder-about-ssh-copy-id-for-ssh-and-ansible'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Reminder
  about ssh-copy-id for SSH and Ansible</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: I was getting  None of those were the key I setup with GH. So I
  added an entry
now: 2024-10-12 11:09:11.872244
path: pages/til/use-non-standard-named-ssh-keys-with-github.md
published: true
slug: use-non-standard-named-ssh-keys-with-github
super_description: I was getting  None of those were the key I setup with GH. So I
  added an entry
tags:
- linux
- cli
- tech
templateKey: til
title: Use non-standard named ssh keys with github
today: 2024-10-12
---

I was getting `(publickey denied)` when trying to push to GH using ssh. When I
tested the connection I saw that a bunch of keys in ``~/.ssh/ were being
attempted

```console
✗ ssh git@github.com -vv

...

debug1: Will attempt key: /home/nic/.ssh/id_rsa 
debug1: Will attempt key: /home/nic/.ssh/id_ecdsa 
debug1: Will attempt key: /home/nic/.ssh/id_ecdsa_sk 
debug1: Will attempt key: /home/nic/.ssh/id_ed25519 
debug1: Will attempt key: /home/nic/.ssh/id_ed25519_sk 
debug1: Will attempt key: /home/nic/.ssh/id_xmss 
debug1: Will attempt key: /home/nic/.ssh/id_dsa 

...

debug1: No more authentication methods to try.
git@github.com: Permission denied (publickey).

```

None of those were the key I setup with GH. So I added an entry
into `~/.ssh/config`:

```text
Host
github.com
User git
Port 22
Hostname github.com
IdentityFile ~/.ssh/my_custom_github_key
TCPKeepAlive yes
IdentitiesOnly yes 

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
    
    <a class='prev' href='/i3-like-keyboard-mapping-in-pop-os'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>i3-Like keyboard mapping in Pop_OS</p>
        </div>
    </a>
    
    <a class='next' href='/reminder-about-ssh-copy-id-for-ssh-and-ansible'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Reminder about ssh-copy-id for SSH and Ansible</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>