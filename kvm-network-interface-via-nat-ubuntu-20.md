---
article_html: "<p>I have started using VMs more and more in my development workflow
  and it's\nimpossible to work in a VM without an internet connection for me most
  of the\ntime. Setting up the KVM networking is kind of confusing to me and I've
  done it\ntwo different ways. Here is how I set it up on my home desktop using NAT.</p>\n<h1
  id=\"credit\">Credit</h1>\n<p>First thing's first: <a href=\"https://computingforgeeks.com/managing-kvm-network-interfaces-in-linux/\">credit
  to this post</a></p>\n<h1 id=\"commands\">Commands</h1>\n<p>There was a <code>default</code>
  network already made by virt-manager but my VM couldn't connect over it at all...</p>\n<p>These
  commands got me up and running without even turning the VM off</p>\n<blockquote>\n<p>I
  went full on <code>sudo -i</code> for this just to make it easier - be careful</p>\n</blockquote>\n<h2
  id=\"dump-an-existint-network-config\">Dump an existint network config</h2>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"c1\"># as root</span>\n\nvirsh<span
  class=\"w\"> </span>net-dumpxml<span class=\"w\"> </span>default<span class=\"w\">
  </span>&gt;<span class=\"w\"> </span>br1.xml\n\nvim<span class=\"w\"> </span>br1.xml\n</code></pre></div>\n<h2
  id=\"edit-it\">Edit it</h2>\n<p>I was unsure what the ip range should be so I just
  stuck with the original blog. \nThe <code>default</code> network had the CIDR block
  defined as <code>192.168.122.0/24</code> which is different from my home network
  so I guess it's fine?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">&lt;network&gt;</span>\n<span class=\"w\">  </span><span class=\"nt\">&lt;name&gt;</span>br1<span
  class=\"nt\">&lt;/name&gt;</span>\n<span class=\"w\">  </span><span class=\"nt\">&lt;forward</span><span
  class=\"w\"> </span><span class=\"na\">mode=</span><span class=\"s\">&#39;nat&#39;</span><span
  class=\"nt\">&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;nat&gt;</span>\n<span
  class=\"w\">      </span><span class=\"nt\">&lt;port</span><span class=\"w\"> </span><span
  class=\"na\">start=</span><span class=\"s\">&#39;1024&#39;</span><span class=\"w\">
  </span><span class=\"na\">end=</span><span class=\"s\">&#39;65535&#39;</span><span
  class=\"nt\">/&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;/nat&gt;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">&lt;/forward&gt;</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">&lt;bridge</span><span class=\"w\"> </span><span class=\"na\">name=</span><span
  class=\"s\">&#39;br1&#39;</span><span class=\"w\"> </span><span class=\"na\">stp=</span><span
  class=\"s\">&#39;on&#39;</span><span class=\"w\"> </span><span class=\"na\">delay=</span><span
  class=\"s\">&#39;0&#39;</span><span class=\"nt\">/&gt;</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">&lt;ip</span><span class=\"w\"> </span><span class=\"na\">address=</span><span
  class=\"s\">&#39;192.168.10.1&#39;</span><span class=\"w\"> </span><span class=\"na\">netmask=</span><span
  class=\"s\">&#39;255.255.255.0&#39;</span><span class=\"nt\">&gt;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">&lt;dhcp&gt;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">&lt;range</span><span class=\"w\"> </span><span
  class=\"na\">start=</span><span class=\"s\">&#39;192.168.10.10&#39;</span><span
  class=\"w\"> </span><span class=\"na\">end=</span><span class=\"s\">&#39;192.168.10.100&#39;</span><span
  class=\"nt\">/&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;/dhcp&gt;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">&lt;/ip&gt;</span>\n<span class=\"nt\">&lt;/network&gt;</span>\n</code></pre></div>\n<h2
  id=\"define-a-network\">Define a network</h2>\n<div class=\"highlight\"><pre><span></span><code>virsh<span
  class=\"w\"> </span>net-define<span class=\"w\"> </span>br1.xml\nvirsh<span class=\"w\">
  </span>net-autostart<span class=\"w\"> </span>br1\n</code></pre></div>\n<p>Then
  to check...</p>\n<div class=\"highlight\"><pre><span></span><code>virsh<span class=\"w\">
  </span>net-list<span class=\"w\"> </span>--all\n\n<span class=\"w\"> </span>Name<span
  class=\"w\">      </span>State<span class=\"w\">    </span>Autostart<span class=\"w\">
  \  </span>Persistent\n--------------------------------------------\n<span class=\"w\">
  </span>br1<span class=\"w\">       </span>active<span class=\"w\">   </span>yes<span
  class=\"w\">         </span>yes\n<span class=\"w\"> </span>default<span class=\"w\">
  \  </span>active<span class=\"w\">   </span>yes<span class=\"w\">         </span>yes\n</code></pre></div>\n<h2
  id=\"uuid\">UUID</h2>\n<p><code>virsh net-uuid br1</code></p>\n<h2 id=\"magic\">Magic</h2>\n<p><code>virsh
  attach-interface --domain &lt;NAME OF VM&gt; --type bridge --source br1 --model
  virtio --config --live</code></p>\n<p>My VM, <code>ubuntu20.04</code> was running
  and immediately connected to the newly attached device!</p>\n<h1 id=\"credit-again\">Credit
  again</h1>\n<p>Visit the original post for more details - this serves more as as
  a quicker set of notes for future me</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/xrdp-authentication-required-to-create-managed-color-device'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/cheat-on-your-man'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>cheat on your man</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-06-25
datetime: 2022-06-25 00:00:00+00:00
description: 'I have started using VMs more and more in my development workflow and
  it First thing There was a  These commands got me up and running without even turning
  the '
edit_link: https://github.com/edit/main/pages/blog/kvm-network-interface-via-nat-ubuntu-20.md
html: "<p>I have started using VMs more and more in my development workflow and it's\nimpossible
  to work in a VM without an internet connection for me most of the\ntime. Setting
  up the KVM networking is kind of confusing to me and I've done it\ntwo different
  ways. Here is how I set it up on my home desktop using NAT.</p>\n<h1 id=\"credit\">Credit</h1>\n<p>First
  thing's first: <a href=\"https://computingforgeeks.com/managing-kvm-network-interfaces-in-linux/\">credit
  to this post</a></p>\n<h1 id=\"commands\">Commands</h1>\n<p>There was a <code>default</code>
  network already made by virt-manager but my VM couldn't connect over it at all...</p>\n<p>These
  commands got me up and running without even turning the VM off</p>\n<blockquote>\n<p>I
  went full on <code>sudo -i</code> for this just to make it easier - be careful</p>\n</blockquote>\n<h2
  id=\"dump-an-existint-network-config\">Dump an existint network config</h2>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"c1\"># as root</span>\n\nvirsh<span
  class=\"w\"> </span>net-dumpxml<span class=\"w\"> </span>default<span class=\"w\">
  </span>&gt;<span class=\"w\"> </span>br1.xml\n\nvim<span class=\"w\"> </span>br1.xml\n</code></pre></div>\n<h2
  id=\"edit-it\">Edit it</h2>\n<p>I was unsure what the ip range should be so I just
  stuck with the original blog. \nThe <code>default</code> network had the CIDR block
  defined as <code>192.168.122.0/24</code> which is different from my home network
  so I guess it's fine?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">&lt;network&gt;</span>\n<span class=\"w\">  </span><span class=\"nt\">&lt;name&gt;</span>br1<span
  class=\"nt\">&lt;/name&gt;</span>\n<span class=\"w\">  </span><span class=\"nt\">&lt;forward</span><span
  class=\"w\"> </span><span class=\"na\">mode=</span><span class=\"s\">&#39;nat&#39;</span><span
  class=\"nt\">&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;nat&gt;</span>\n<span
  class=\"w\">      </span><span class=\"nt\">&lt;port</span><span class=\"w\"> </span><span
  class=\"na\">start=</span><span class=\"s\">&#39;1024&#39;</span><span class=\"w\">
  </span><span class=\"na\">end=</span><span class=\"s\">&#39;65535&#39;</span><span
  class=\"nt\">/&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;/nat&gt;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">&lt;/forward&gt;</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">&lt;bridge</span><span class=\"w\"> </span><span class=\"na\">name=</span><span
  class=\"s\">&#39;br1&#39;</span><span class=\"w\"> </span><span class=\"na\">stp=</span><span
  class=\"s\">&#39;on&#39;</span><span class=\"w\"> </span><span class=\"na\">delay=</span><span
  class=\"s\">&#39;0&#39;</span><span class=\"nt\">/&gt;</span>\n<span class=\"w\">
  \ </span><span class=\"nt\">&lt;ip</span><span class=\"w\"> </span><span class=\"na\">address=</span><span
  class=\"s\">&#39;192.168.10.1&#39;</span><span class=\"w\"> </span><span class=\"na\">netmask=</span><span
  class=\"s\">&#39;255.255.255.0&#39;</span><span class=\"nt\">&gt;</span>\n<span
  class=\"w\">    </span><span class=\"nt\">&lt;dhcp&gt;</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">&lt;range</span><span class=\"w\"> </span><span
  class=\"na\">start=</span><span class=\"s\">&#39;192.168.10.10&#39;</span><span
  class=\"w\"> </span><span class=\"na\">end=</span><span class=\"s\">&#39;192.168.10.100&#39;</span><span
  class=\"nt\">/&gt;</span>\n<span class=\"w\">    </span><span class=\"nt\">&lt;/dhcp&gt;</span>\n<span
  class=\"w\">  </span><span class=\"nt\">&lt;/ip&gt;</span>\n<span class=\"nt\">&lt;/network&gt;</span>\n</code></pre></div>\n<h2
  id=\"define-a-network\">Define a network</h2>\n<div class=\"highlight\"><pre><span></span><code>virsh<span
  class=\"w\"> </span>net-define<span class=\"w\"> </span>br1.xml\nvirsh<span class=\"w\">
  </span>net-autostart<span class=\"w\"> </span>br1\n</code></pre></div>\n<p>Then
  to check...</p>\n<div class=\"highlight\"><pre><span></span><code>virsh<span class=\"w\">
  </span>net-list<span class=\"w\"> </span>--all\n\n<span class=\"w\"> </span>Name<span
  class=\"w\">      </span>State<span class=\"w\">    </span>Autostart<span class=\"w\">
  \  </span>Persistent\n--------------------------------------------\n<span class=\"w\">
  </span>br1<span class=\"w\">       </span>active<span class=\"w\">   </span>yes<span
  class=\"w\">         </span>yes\n<span class=\"w\"> </span>default<span class=\"w\">
  \  </span>active<span class=\"w\">   </span>yes<span class=\"w\">         </span>yes\n</code></pre></div>\n<h2
  id=\"uuid\">UUID</h2>\n<p><code>virsh net-uuid br1</code></p>\n<h2 id=\"magic\">Magic</h2>\n<p><code>virsh
  attach-interface --domain &lt;NAME OF VM&gt; --type bridge --source br1 --model
  virtio --config --live</code></p>\n<p>My VM, <code>ubuntu20.04</code> was running
  and immediately connected to the newly attached device!</p>\n<h1 id=\"credit-again\">Credit
  again</h1>\n<p>Visit the original post for more details - this serves more as as
  a quicker set of notes for future me</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/xrdp-authentication-required-to-create-managed-color-device'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/cheat-on-your-man'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>cheat on your man</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: I have started using VMs more and more in my development workflow
  and it First thing There was a  These commands got me up and running without even
  turning the VM off I went full on  I was unsure what the ip range should be so I
  just stuck with the o
now: 2024-06-26 16:50:21.524151
path: pages/blog/kvm-network-interface-via-nat-ubuntu-20.md
published: true
slug: kvm-network-interface-via-nat-ubuntu-20
super_description: 'I have started using VMs more and more in my development workflow
  and it First thing There was a  These commands got me up and running without even
  turning the VM off I went full on  I was unsure what the ip range should be so I
  just stuck with the original blog. Then to check... virsh net-uuid br1 virsh attach-interface
  --domain <NAME OF VM> --type bridge --source br1 --model virtio --config --live
  My VM,  Visit the original post for more details - this serves more as as a quicker
  set of notes '
tags:
- homelab
- linux
- tech
templateKey: blog-post
title: kvm-network-interface-via-nat-ubuntu-20
today: 2024-06-26
---

I have started using VMs more and more in my development workflow and it's
impossible to work in a VM without an internet connection for me most of the
time. Setting up the KVM networking is kind of confusing to me and I've done it
two different ways. Here is how I set it up on my home desktop using NAT.

# Credit

First thing's first: [credit to this post](https://computingforgeeks.com/managing-kvm-network-interfaces-in-linux/)

# Commands

There was a `default` network already made by virt-manager but my VM couldn't connect over it at all...

These commands got me up and running without even turning the VM off

> I went full on `sudo -i` for this just to make it easier - be careful

## Dump an existint network config

```bash
# as root

virsh net-dumpxml default > br1.xml

vim br1.xml

```

## Edit it

I was unsure what the ip range should be so I just stuck with the original blog. 
The `default` network had the CIDR block defined as `192.168.122.0/24` which is different from my home network so I guess it's fine?

```xml
<network>
  <name>br1</name>
  <forward mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
  </forward>
  <bridge name='br1' stp='on' delay='0'/>
  <ip address='192.168.10.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.10.10' end='192.168.10.100'/>
    </dhcp>
  </ip>
</network>
```

## Define a network

```bash
virsh net-define br1.xml
virsh net-autostart br1
```

Then to check...

```bash
virsh net-list --all

 Name      State    Autostart   Persistent
--------------------------------------------
 br1       active   yes         yes
 default   active   yes         yes
```

## UUID

`virsh net-uuid br1`


## Magic

`virsh attach-interface --domain <NAME OF VM> --type bridge --source br1 --model virtio --config --live`

My VM, `ubuntu20.04` was running and immediately connected to the newly attached device!


# Credit again

Visit the original post for more details - this serves more as as a quicker set of notes for future me
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
    
    <a class='prev' href='/xrdp-authentication-required-to-create-managed-color-device'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>
        </div>
    </a>
    
    <a class='next' href='/cheat-on-your-man'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>cheat on your man</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>