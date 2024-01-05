---
article_html: "<p>I've started using <a href=\"https://www.terraform.io/\">Terraform</a>
  to manage Snowflake infrastructure at work.</p>\n<p>I'm still a noobie but I've
  got a workflow that I think makes sense...</p>\n<p>Here's the directory setup for
  a simple project with some databases, schemas, and tables to manage.</p>\n<div class=\"highlight\"><pre><span></span><code>terraform-dir\n├──<span
  class=\"w\"> </span>.auto.tfvars\n├──<span class=\"w\"> </span>databases.tf\n├──<span
  class=\"w\"> </span>main.tf\n├──<span class=\"w\"> </span>schemas.tf\n├──<span class=\"w\">
  </span>tables.tf\n├──<span class=\"w\"> </span>.terraform\n│<span class=\"w\">  
  </span>└──<span class=\"w\"> </span>providers\n│<span class=\"w\">       </span>└──<span
  class=\"w\"> </span>registry.terraform.io\n│<span class=\"w\">           </span>└──<span
  class=\"w\"> </span>chanzuckerberg\n│<span class=\"w\">               </span>└──<span
  class=\"w\"> </span>snowflake\n│<span class=\"w\">                   </span>├──<span
  class=\"w\"> </span><span class=\"m\">0</span>.25.6\n│<span class=\"w\">                   </span>│<span
  class=\"w\">   </span>└──<span class=\"w\"> </span>linux_amd64\n│<span class=\"w\">  
  \                </span>│<span class=\"w\">       </span>├──<span class=\"w\"> </span>LICENSE\n│<span
  class=\"w\">                   </span>│<span class=\"w\">       </span>├──<span
  class=\"w\"> </span>README.md\n│<span class=\"w\">                   </span>│<span
  class=\"w\">       </span>└──<span class=\"w\"> </span>terraform-provider-snowflake_v0.25.6\n│<span
  class=\"w\">                   </span>└──<span class=\"w\"> </span><span class=\"m\">0</span>.31.0\n│<span
  class=\"w\">                       </span>└──<span class=\"w\"> </span>linux_amd64\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>CHANGELOG.md\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>LICENSE\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>README.md\n│<span
  class=\"w\">                           </span>└──<span class=\"w\"> </span>terraform-provider-snowflake_v0.31.0\n├──<span
  class=\"w\"> </span>.terraform.lock.hcl\n├──<span class=\"w\"> </span>terraform.tfstate\n</code></pre></div>\n<p>We
  start with the <code>main.tf</code> and I have in here <a href=\"https://www.terraform.io/language/providers\">providers</a>
  and <a href=\"https://www.terraform.io/language/values/variables\">variables</a></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nb\">terraform</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"nb\">required_providers</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
  class=\"w\">    </span><span class=\"nb\">snowflake</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
  class=\"w\">      </span><span class=\"na\">source</span><span class=\"w\">  </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;chanzuckerberg/snowflake&quot;</span>\n<span
  class=\"w\">      </span><span class=\"na\">version</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;0.31.0&quot;</span>\n<span
  class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
  class=\"p\">}</span>\n<span class=\"p\">}</span>\n\n<span class=\"kr\">provider</span><span
  class=\"w\"> </span><span class=\"nv\">&quot;snowflake&quot;</span><span class=\"w\">
  </span><span class=\"p\">{</span>\n<span class=\"c1\">  // required</span>\n<span
  class=\"w\">  </span><span class=\"na\">username</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;SNOWFLAKE_USER&quot;</span>\n<span
  class=\"w\">  </span><span class=\"na\">account</span><span class=\"w\">  </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;URL&quot;</span>\n\n<span
  class=\"w\">  </span><span class=\"na\">password</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">var.snowflake_password</span>\n<span
  class=\"w\">  </span><span class=\"na\">role</span><span class=\"w\">     </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;ROLE WITH
  DBA LIKE PERMISSIONS&quot;</span>\n<span class=\"p\">}</span>\n\n<span class=\"kr\">variable</span><span
  class=\"w\"> </span><span class=\"nv\">&quot;snowflake_password&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\">      </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"kt\">string</span>\n<span class=\"w\">  </span><span
  class=\"na\">sensitive</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"no\">true</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;public&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;environment&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;roles&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pipx'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pipx</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/terraform-01.png
date: 2022-04-15
datetime: 2022-04-15 00:00:00+00:00
description: 'I I Here We start with the '
edit_link: https://github.com/edit/main/pages/blog/terraform-01.md
html: "<p>I've started using <a href=\"https://www.terraform.io/\">Terraform</a> to
  manage Snowflake infrastructure at work.</p>\n<p>I'm still a noobie but I've got
  a workflow that I think makes sense...</p>\n<p>Here's the directory setup for a
  simple project with some databases, schemas, and tables to manage.</p>\n<div class=\"highlight\"><pre><span></span><code>terraform-dir\n├──<span
  class=\"w\"> </span>.auto.tfvars\n├──<span class=\"w\"> </span>databases.tf\n├──<span
  class=\"w\"> </span>main.tf\n├──<span class=\"w\"> </span>schemas.tf\n├──<span class=\"w\">
  </span>tables.tf\n├──<span class=\"w\"> </span>.terraform\n│<span class=\"w\">  
  </span>└──<span class=\"w\"> </span>providers\n│<span class=\"w\">       </span>└──<span
  class=\"w\"> </span>registry.terraform.io\n│<span class=\"w\">           </span>└──<span
  class=\"w\"> </span>chanzuckerberg\n│<span class=\"w\">               </span>└──<span
  class=\"w\"> </span>snowflake\n│<span class=\"w\">                   </span>├──<span
  class=\"w\"> </span><span class=\"m\">0</span>.25.6\n│<span class=\"w\">                   </span>│<span
  class=\"w\">   </span>└──<span class=\"w\"> </span>linux_amd64\n│<span class=\"w\">  
  \                </span>│<span class=\"w\">       </span>├──<span class=\"w\"> </span>LICENSE\n│<span
  class=\"w\">                   </span>│<span class=\"w\">       </span>├──<span
  class=\"w\"> </span>README.md\n│<span class=\"w\">                   </span>│<span
  class=\"w\">       </span>└──<span class=\"w\"> </span>terraform-provider-snowflake_v0.25.6\n│<span
  class=\"w\">                   </span>└──<span class=\"w\"> </span><span class=\"m\">0</span>.31.0\n│<span
  class=\"w\">                       </span>└──<span class=\"w\"> </span>linux_amd64\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>CHANGELOG.md\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>LICENSE\n│<span
  class=\"w\">                           </span>├──<span class=\"w\"> </span>README.md\n│<span
  class=\"w\">                           </span>└──<span class=\"w\"> </span>terraform-provider-snowflake_v0.31.0\n├──<span
  class=\"w\"> </span>.terraform.lock.hcl\n├──<span class=\"w\"> </span>terraform.tfstate\n</code></pre></div>\n<p>We
  start with the <code>main.tf</code> and I have in here <a href=\"https://www.terraform.io/language/providers\">providers</a>
  and <a href=\"https://www.terraform.io/language/values/variables\">variables</a></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nb\">terraform</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"nb\">required_providers</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
  class=\"w\">    </span><span class=\"nb\">snowflake</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
  class=\"w\">      </span><span class=\"na\">source</span><span class=\"w\">  </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;chanzuckerberg/snowflake&quot;</span>\n<span
  class=\"w\">      </span><span class=\"na\">version</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;0.31.0&quot;</span>\n<span
  class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
  class=\"p\">}</span>\n<span class=\"p\">}</span>\n\n<span class=\"kr\">provider</span><span
  class=\"w\"> </span><span class=\"nv\">&quot;snowflake&quot;</span><span class=\"w\">
  </span><span class=\"p\">{</span>\n<span class=\"c1\">  // required</span>\n<span
  class=\"w\">  </span><span class=\"na\">username</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;SNOWFLAKE_USER&quot;</span>\n<span
  class=\"w\">  </span><span class=\"na\">account</span><span class=\"w\">  </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;URL&quot;</span>\n\n<span
  class=\"w\">  </span><span class=\"na\">password</span><span class=\"w\"> </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">var.snowflake_password</span>\n<span
  class=\"w\">  </span><span class=\"na\">role</span><span class=\"w\">     </span><span
  class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;ROLE WITH
  DBA LIKE PERMISSIONS&quot;</span>\n<span class=\"p\">}</span>\n\n<span class=\"kr\">variable</span><span
  class=\"w\"> </span><span class=\"nv\">&quot;snowflake_password&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\">      </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"kt\">string</span>\n<span class=\"w\">  </span><span
  class=\"na\">sensitive</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"no\">true</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;public&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;environment&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"kr\">variable</span><span class=\"w\"> </span><span class=\"nv\">&quot;roles&quot;</span><span
  class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">  </span><span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"nf\">map</span><span class=\"p\">(</span><span
  class=\"err\">any</span><span class=\"p\">)</span>\n<span class=\"p\">}</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pipx'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pipx</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I I Here We start with the '
now: 2024-01-05 14:15:22.253543
path: pages/blog/terraform-01.md
published: false
slug: terraform-01
super_description: 'I I Here We start with the '
tags:
- homelab
- tech
templateKey: blog-post
title: Terraform-01
today: 2024-01-05
---

I've started using [Terraform](https://www.terraform.io/) to manage Snowflake infrastructure at work.

I'm still a noobie but I've got a workflow that I think makes sense...

Here's the directory setup for a simple project with some databases, schemas, and tables to manage.

```bash
terraform-dir
├── .auto.tfvars
├── databases.tf
├── main.tf
├── schemas.tf
├── tables.tf
├── .terraform
│   └── providers
│       └── registry.terraform.io
│           └── chanzuckerberg
│               └── snowflake
│                   ├── 0.25.6
│                   │   └── linux_amd64
│                   │       ├── LICENSE
│                   │       ├── README.md
│                   │       └── terraform-provider-snowflake_v0.25.6
│                   └── 0.31.0
│                       └── linux_amd64
│                           ├── CHANGELOG.md
│                           ├── LICENSE
│                           ├── README.md
│                           └── terraform-provider-snowflake_v0.31.0
├── .terraform.lock.hcl
├── terraform.tfstate
```


We start with the `main.tf` and I have in here [providers](https://www.terraform.io/language/providers) and [variables](https://www.terraform.io/language/values/variables)

```terraform
terraform {
  required_providers {
    snowflake = {
      source  = "chanzuckerberg/snowflake"
      version = "0.31.0"
    }
  }
}

provider "snowflake" {
  // required
  username = "SNOWFLAKE_USER"
  account  = "URL"

  password = var.snowflake_password
  role     = "ROLE WITH DBA LIKE PERMISSIONS"
}

variable "snowflake_password" {
  type      = string
  sensitive = true
}

variable "public" {
  type = map(any)
}

variable "environment" {
  type = map(any)
}

variable "roles" {
  type = map(any)
}

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
    
    <a class='prev' href='/truenas-and-wireguard'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Truenas-And-Wireguard</p>
        </div>
    </a>
    
    <a class='next' href='/pipx'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Pipx</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>