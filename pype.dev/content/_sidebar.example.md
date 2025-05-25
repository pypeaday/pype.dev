---
templateKey: blog-post
tags: []
title: ""
date: 2022-03-09T00:00:00
published: False

---

    {% set groups = ['tag', 'archive', 'author', 'stream'] %}
{% for group in groups %}

##### {{group}}s

{% for name, items in group(kind=group) -%}
- [{{name}}]({{group}}-{{name | slugify}}.html)
{% endfor %}

{% endfor %}
    
