---
date: 2025-06-14 16:03:50
templateKey: blog-post
title: Test Styles
published: True
tags:
  - test
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250613203559_6470ff5a.png"
---


# Test Title Heading

Content fooo bar

## Test Sub Heading

### Test Sub Sub Heading

#### Test Sub Sub Sub Heading

##### Test Sub Sub Sub Sub Heading

###### Test Sub Sub Sub Sub Sub Heading

> Blockquote

`code`

[Link](https://pype.dev)

![20250613203559_6470ff5a.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250613203559_6470ff5a.png)

```python
import os

print(os.environ['PATH'])
```

```hcl
resource "cloudflare_pages_domain" "cf_domain" {
  account_id   = local.account_id
  project_name = cloudflare_pages_project.build_config.name
  domain       = "pype.dev"
}
```

!!! success "a success message"
    This is a success message

!!! info "an info message"
    This is an info message

!!! warning "a warning message"
    This is a warning message

!!! danger "a danger message"
    This is a danger message

!!! question "a question message"
    This is a question message

!!! note "a note message"
    This is a note message

??? info "an info message"
    This is an info message