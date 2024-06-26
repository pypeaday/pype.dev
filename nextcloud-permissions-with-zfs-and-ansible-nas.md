---
article_html: "<h1 id=\"tldr\">TL;DR</h1>\n<p>As the nextcloud docs say... if you
  want to write to an external volume that\nlocation has to be writeable by the user/group
  <code>www-data</code> on the host system...\nso if that makes sense to you then
  this TIL probably isn't a ton of value.. if\nnot however, read on :)</p>\n<h1 id=\"case-study\">Case
  Study</h1>\n<p>You want to self-host your own cloud and use a smart file system
  for convenience...\nNextcloud and ZFS are pretty common goto answers for each of
  those problems.</p>\n<p>My home NAS is built on ZFS and among other things I have
  a <code>zpool</code> named\n<code>tank</code> and nested in there is a <code>tank/nas</code>
  dataset with several child zfs\ndatasets under that.</p>\n<p>I want to use nextcloud
  mainly for auto-uploading photos from my wife's and my phones for automatic backups.\nThe
  issue is that the nextcloud application (I run in Docker) is fixed as the\n<code>www-data</code>
  user and so any volume/folder that you want nextcloud to write to\nneeds to be permissioned
  such that <code>www-data</code> owns it... but I don't want\n<code>www-data</code>
  to own everything in my NAS... so what's a girl to do?</p>\n<h1 id=\"solution\">Solution</h1>\n<p>Well,
  one way to go is to just utilize docker volumes, write the data in the\ncontainer
  to <code>/var/www/html</code> and let that be the place your data backsup to.</p>\n<p>I
  still wanted nextcloud to automatically write right to my NAS so I created a\n<code>nextcloud-upload</code>
  directory inside of <code>tank/nas/media/photos</code> (photos cause\nthat's all
  that gets automatically uploaded)</p>\n<p>Then I <code>chown -R www-data:www-data
  /tank/nas/media/photos/nextcloud-upload</code> so\nthat just that sub-folder is
  owned by <code>www-data</code>. Now everyone's happy!</p>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/netplan-change-from-focal-to-jammy'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Netplan
  change from Focal to Jammy</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/filepath-completion-in-neovim'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Filepath
  Completion in Neovim</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-05-19
datetime: 2022-05-19 00:00:00+00:00
description: As the nextcloud docs say... if you want to write to an external volume
  that You want to self-host your own cloud and use a smart file system for convenience...
edit_link: https://github.com/edit/main/pages/til/nextcloud-permissions-with-zfs-and-ansible-nas.md
html: "<h1 id=\"tldr\">TL;DR</h1>\n<p>As the nextcloud docs say... if you want to
  write to an external volume that\nlocation has to be writeable by the user/group
  <code>www-data</code> on the host system...\nso if that makes sense to you then
  this TIL probably isn't a ton of value.. if\nnot however, read on :)</p>\n<h1 id=\"case-study\">Case
  Study</h1>\n<p>You want to self-host your own cloud and use a smart file system
  for convenience...\nNextcloud and ZFS are pretty common goto answers for each of
  those problems.</p>\n<p>My home NAS is built on ZFS and among other things I have
  a <code>zpool</code> named\n<code>tank</code> and nested in there is a <code>tank/nas</code>
  dataset with several child zfs\ndatasets under that.</p>\n<p>I want to use nextcloud
  mainly for auto-uploading photos from my wife's and my phones for automatic backups.\nThe
  issue is that the nextcloud application (I run in Docker) is fixed as the\n<code>www-data</code>
  user and so any volume/folder that you want nextcloud to write to\nneeds to be permissioned
  such that <code>www-data</code> owns it... but I don't want\n<code>www-data</code>
  to own everything in my NAS... so what's a girl to do?</p>\n<h1 id=\"solution\">Solution</h1>\n<p>Well,
  one way to go is to just utilize docker volumes, write the data in the\ncontainer
  to <code>/var/www/html</code> and let that be the place your data backsup to.</p>\n<p>I
  still wanted nextcloud to automatically write right to my NAS so I created a\n<code>nextcloud-upload</code>
  directory inside of <code>tank/nas/media/photos</code> (photos cause\nthat's all
  that gets automatically uploaded)</p>\n<p>Then I <code>chown -R www-data:www-data
  /tank/nas/media/photos/nextcloud-upload</code> so\nthat just that sub-folder is
  owned by <code>www-data</code>. Now everyone's happy!</p>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/netplan-change-from-focal-to-jammy'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Netplan
  change from Focal to Jammy</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/filepath-completion-in-neovim'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Filepath
  Completion in Neovim</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: As the nextcloud docs say... if you want to write to an external
  volume that You want to self-host your own cloud and use a smart file system for
  convenience... My home NAS is built on ZFS and among other things I have a  I want
  to use nextcloud main
now: 2024-06-26 16:50:21.523874
path: pages/til/nextcloud-permissions-with-zfs-and-ansible-nas.md
published: true
slug: nextcloud-permissions-with-zfs-and-ansible-nas
super_description: 'As the nextcloud docs say... if you want to write to an external
  volume that You want to self-host your own cloud and use a smart file system for
  convenience... My home NAS is built on ZFS and among other things I have a  I want
  to use nextcloud mainly for auto-uploading photos from my wife Well, one way to
  go is to just utilize docker volumes, write the data in the I still wanted nextcloud
  to automatically write right to my NAS so I created a Then I '
tags:
- homelab
- zfs
- tech
templateKey: til
title: Nextcloud permissions with ZFS and Ansible-NAS
today: 2024-06-26
---

# TL;DR

As the nextcloud docs say... if you want to write to an external volume that
location has to be writeable by the user/group `www-data` on the host system...
so if that makes sense to you then this TIL probably isn't a ton of value.. if
not however, read on :)



# Case Study

You want to self-host your own cloud and use a smart file system for convenience...
Nextcloud and ZFS are pretty common goto answers for each of those problems.

My home NAS is built on ZFS and among other things I have a `zpool` named
`tank` and nested in there is a `tank/nas` dataset with several child zfs
datasets under that.

I want to use nextcloud mainly for auto-uploading photos from my wife's and my phones for automatic backups.
The issue is that the nextcloud application (I run in Docker) is fixed as the
`www-data` user and so any volume/folder that you want nextcloud to write to
needs to be permissioned such that `www-data` owns it... but I don't want
`www-data` to own everything in my NAS... so what's a girl to do?

# Solution

Well, one way to go is to just utilize docker volumes, write the data in the
container to `/var/www/html` and let that be the place your data backsup to.

I still wanted nextcloud to automatically write right to my NAS so I created a
`nextcloud-upload` directory inside of `tank/nas/media/photos` (photos cause
that's all that gets automatically uploaded)

Then I `chown -R www-data:www-data /tank/nas/media/photos/nextcloud-upload` so
that just that sub-folder is owned by `www-data`. Now everyone's happy!
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
    
    <a class='prev' href='/netplan-change-from-focal-to-jammy'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Netplan change from Focal to Jammy</p>
        </div>
    </a>
    
    <a class='next' href='/filepath-completion-in-neovim'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Filepath Completion in Neovim</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>