---
article_html: "<h1 id=\"intro\">Intro</h1>\n<p>I use ZFS at home in my homelab for
  basically all of my storage... Docker uses\nZFS backend, all my VMs have their <code>.qcow2</code>
  images in their own zfs datasets,\nand all my shares are ZFS datasets. I love ZFS
  but my home hardware presently\nis the opposite of expensive or new... Thankfully
  I've had a lot of my orginal\nhomelab simply given to me but the cost of this is
  that I didn't put my\nmachines together, I didn't choose the disks, and I definitely
  didn't do the\nresearch I would've otherwise done had I bankrolled my server personally...
  </p>\n<h2 id=\"the-problem\">The Problem</h2>\n<p>I run <code>glances</code> on
  basically all my machines and for the longest time I have\nbeen seeing big time
  <code>iowait</code> issues. Now, since everything was free I've\nlargely been able
  to ignore that however I'm now after some better performance\nwhich I think means
  new hardware!</p>\n<p>Here is a random screenshot of my glances homepage at time
  of writing - The\nonly major load on my server is some <code>ffmpeg</code> transcoding
  (about 60% CPU\nutilization)...</p>\n<p><img alt=\"Alt Text\" src=\"/images/glances-iowait.png\"
  /></p>\n<p>As you can see... there's a lot of issues and <em>I don't even know what
  they mean</em>.</p>\n<h1 id=\"fio\">fio</h1>\n<p>I heard about <a href=\"https://fio.readthedocs.io/en/latest/\">fio</a>
  through a friend and\ndecided to try it out quick. It installs with <code>apt</code>
  on ubuntu quick and easy...</p>\n<p>Jim Saltar has a good blog post on it <a href=\"https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/\">here</a></p>\n<p>Basically
  it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
  of metrics matter - it's not just throughput, but also latency,\niops, etc.</p>\n<h2
  id=\"tests\">Tests</h2>\n<p>I ran a few basic commands inside a new zfs dataset
  on my server <code>tank/fio</code></p>\n<div class=\"highlight\"><pre><span></span><code>fio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>4k<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>4g<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-4KiB-random-write.txt\nfio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>64k<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>256m<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--iodepth<span
  class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span><span class=\"m\">16</span>-parallel-64KiB-random-write.txt\nfio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>1m<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>16g<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--iodepth<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-1MiB-random-write.txt\n</code></pre></div>\n<h2
  id=\"results\">Results</h2>\n<p>The single 4 KiB random write:</p>\n<p><code>WRITE:
  bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s), io=523MiB (548MB),
  run=68317-68317msec</code></p>\n<p>The 16 parallel 64KiB random writes:</p>\n<p><code>WRITE:
  bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s), io=7642MiB (8013MB),
  run=81310-81418msec</code></p>\n<p>The single 1MiB random write:</p>\n<p><code>WRITE:
  bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s), io=8177MiB (8574MB),
  run=100699-100699msec</code></p>\n<h1 id=\"summary\">Summary</h1>\n<p>So I don't
  fully understand these numbers yet... 80-100 MiB/s isn't super fast\nand that's
  across a parallelized workload... The single threaded workloads have\nawful performance
  so this tells me something is wrong... I have a few ideas...</p>\n<ol>\n<li>ZFS
  dataset config options such as <code>ashift</code> or the blocksize might be way
  misconfigured</li>\n<li>The disks/pool which came from a TrueNAS/FreeBSD machine
  may have some artifacts that I need to clean up</li>\n<li>The SAS controller I am
  using, which I flashed with IT firmware to get it into JBOD mode might be messed
  up</li>\n<li>The data cables themselves could be a problem...</li>\n</ol>\n<p>Points
  3 and 4 are less likely given that the write speed does increase in the parallelized
  job but I'm a newbie so it's time to dive in!</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/check-your-smart-status-with-smartctl'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Check
  your SMART status with smartctl</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/screwtape'>\n\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Screwtape</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-08-27
datetime: 2022-08-27 00:00:00+00:00
description: I use ZFS at home in my homelab for basically all of my storage... Docker
  uses I run  Here is a random screenshot of my glances homepage at time of writing
  - Th
edit_link: https://github.com/edit/main/pages/blog/benchmark-your-disks-with-fio.md
html: "<h1 id=\"intro\">Intro</h1>\n<p>I use ZFS at home in my homelab for basically
  all of my storage... Docker uses\nZFS backend, all my VMs have their <code>.qcow2</code>
  images in their own zfs datasets,\nand all my shares are ZFS datasets. I love ZFS
  but my home hardware presently\nis the opposite of expensive or new... Thankfully
  I've had a lot of my orginal\nhomelab simply given to me but the cost of this is
  that I didn't put my\nmachines together, I didn't choose the disks, and I definitely
  didn't do the\nresearch I would've otherwise done had I bankrolled my server personally...
  </p>\n<h2 id=\"the-problem\">The Problem</h2>\n<p>I run <code>glances</code> on
  basically all my machines and for the longest time I have\nbeen seeing big time
  <code>iowait</code> issues. Now, since everything was free I've\nlargely been able
  to ignore that however I'm now after some better performance\nwhich I think means
  new hardware!</p>\n<p>Here is a random screenshot of my glances homepage at time
  of writing - The\nonly major load on my server is some <code>ffmpeg</code> transcoding
  (about 60% CPU\nutilization)...</p>\n<p><img alt=\"Alt Text\" src=\"/images/glances-iowait.png\"
  /></p>\n<p>As you can see... there's a lot of issues and <em>I don't even know what
  they mean</em>.</p>\n<h1 id=\"fio\">fio</h1>\n<p>I heard about <a href=\"https://fio.readthedocs.io/en/latest/\">fio</a>
  through a friend and\ndecided to try it out quick. It installs with <code>apt</code>
  on ubuntu quick and easy...</p>\n<p>Jim Saltar has a good blog post on it <a href=\"https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/\">here</a></p>\n<p>Basically
  it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
  of metrics matter - it's not just throughput, but also latency,\niops, etc.</p>\n<h2
  id=\"tests\">Tests</h2>\n<p>I ran a few basic commands inside a new zfs dataset
  on my server <code>tank/fio</code></p>\n<div class=\"highlight\"><pre><span></span><code>fio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>4k<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>4g<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-4KiB-random-write.txt\nfio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>64k<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>256m<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--iodepth<span
  class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span><span class=\"m\">16</span>-parallel-64KiB-random-write.txt\nfio<span
  class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
  </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
  class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>1m<span
  class=\"w\"> </span>--size<span class=\"o\">=</span>16g<span class=\"w\"> </span>--numjobs<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--iodepth<span
  class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
  class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
  class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
  class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-1MiB-random-write.txt\n</code></pre></div>\n<h2
  id=\"results\">Results</h2>\n<p>The single 4 KiB random write:</p>\n<p><code>WRITE:
  bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s), io=523MiB (548MB),
  run=68317-68317msec</code></p>\n<p>The 16 parallel 64KiB random writes:</p>\n<p><code>WRITE:
  bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s), io=7642MiB (8013MB),
  run=81310-81418msec</code></p>\n<p>The single 1MiB random write:</p>\n<p><code>WRITE:
  bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s), io=8177MiB (8574MB),
  run=100699-100699msec</code></p>\n<h1 id=\"summary\">Summary</h1>\n<p>So I don't
  fully understand these numbers yet... 80-100 MiB/s isn't super fast\nand that's
  across a parallelized workload... The single threaded workloads have\nawful performance
  so this tells me something is wrong... I have a few ideas...</p>\n<ol>\n<li>ZFS
  dataset config options such as <code>ashift</code> or the blocksize might be way
  misconfigured</li>\n<li>The disks/pool which came from a TrueNAS/FreeBSD machine
  may have some artifacts that I need to clean up</li>\n<li>The SAS controller I am
  using, which I flashed with IT firmware to get it into JBOD mode might be messed
  up</li>\n<li>The data cables themselves could be a problem...</li>\n</ol>\n<p>Points
  3 and 4 are less likely given that the write speed does increase in the parallelized
  job but I'm a newbie so it's time to dive in!</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/check-your-smart-status-with-smartctl'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Check
  your SMART status with smartctl</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/screwtape'>\n\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Screwtape</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'I use ZFS at home in my homelab for basically all of my storage...
  Docker uses I run  Here is a random screenshot of my glances homepage at time of
  writing - The As you can see... there I heard about  Jim Saltar has a good blog
  post on it  Basically '
now: 2024-06-26 16:50:21.524223
path: pages/blog/benchmark-your-disks-with-fio.md
published: true
slug: benchmark-your-disks-with-fio
super_description: 'I use ZFS at home in my homelab for basically all of my storage...
  Docker uses I run  Here is a random screenshot of my glances homepage at time of
  writing - The As you can see... there I heard about  Jim Saltar has a good blog
  post on it  Basically it I ran a few basic commands inside a new zfs dataset on
  my server  The single 4 KiB random write: WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s
  (8024kB/s-8024kB/s), io=523MiB (548MB), run=68317-68317msec The 16 parallel 64KiB
  random writes: W'
tags:
- python
- zfs
- tech
templateKey: blog-post
title: Benchmark your disks with fio
today: 2024-06-26
---

# Intro

I use ZFS at home in my homelab for basically all of my storage... Docker uses
ZFS backend, all my VMs have their `.qcow2` images in their own zfs datasets,
and all my shares are ZFS datasets. I love ZFS but my home hardware presently
is the opposite of expensive or new... Thankfully I've had a lot of my orginal
homelab simply given to me but the cost of this is that I didn't put my
machines together, I didn't choose the disks, and I definitely didn't do the
research I would've otherwise done had I bankrolled my server personally... 

## The Problem

I run `glances` on basically all my machines and for the longest time I have
been seeing big time `iowait` issues. Now, since everything was free I've
largely been able to ignore that however I'm now after some better performance
which I think means new hardware!

Here is a random screenshot of my glances homepage at time of writing - The
only major load on my server is some `ffmpeg` transcoding (about 60% CPU
utilization)...

![Alt Text](/images/glances-iowait.png)

As you can see... there's a lot of issues and _I don't even know what they mean_.

# fio

I heard about [fio](https://fio.readthedocs.io/en/latest/) through a friend and
decided to try it out quick. It installs with `apt` on ubuntu quick and easy...

Jim Saltar has a good blog post on it [here](https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/)

Basically it's a handy tool for benchmarking your disks and the blog dives into
what types of metrics matter - it's not just throughput, but also latency,
iops, etc.

## Tests

I ran a few basic commands inside a new zfs dataset on my server `tank/fio`

```bash
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=4k --size=4g --numjobs=1 --runtime=60 --time_based --end_fsync=1 > single-4KiB-random-write.txt
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=64k --size=256m --numjobs=16 --iodepth=16 --runtime=60 --time_based --end_fsync=1 > 16-parallel-64KiB-random-write.txt
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=1m --size=16g --numjobs=1 --iodepth=1 --runtime=60 --time_based --end_fsync=1 > single-1MiB-random-write.txt
```

## Results

The single 4 KiB random write:

`WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s), io=523MiB (548MB), run=68317-68317msec`

The 16 parallel 64KiB random writes:

`WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s), io=7642MiB (8013MB), run=81310-81418msec`

The single 1MiB random write:

`WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s), io=8177MiB (8574MB), run=100699-100699msec`

# Summary

So I don't fully understand these numbers yet... 80-100 MiB/s isn't super fast
and that's across a parallelized workload... The single threaded workloads have
awful performance so this tells me something is wrong... I have a few ideas...

1. ZFS dataset config options such as `ashift` or the blocksize might be way misconfigured
2. The disks/pool which came from a TrueNAS/FreeBSD machine may have some artifacts that I need to clean up
3. The SAS controller I am using, which I flashed with IT firmware to get it into JBOD mode might be messed up
4. The data cables themselves could be a problem...

Points 3 and 4 are less likely given that the write speed does increase in the parallelized job but I'm a newbie so it's time to dive in!
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
    
    <a class='prev' href='/check-your-smart-status-with-smartctl'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Check your SMART status with smartctl</p>
        </div>
    </a>
    
    <a class='next' href='/screwtape'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Screwtape</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>