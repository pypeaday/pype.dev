# Markata Plugin Development Guide

This guide will help you create plugins for the Markata static site generator.
Follow these patterns and best practices to ensure your plugin integrates
seamlessly with Markata's architecture.

## Plugin Structure

Every Markata plugin follows this standard structure:

1. **Docstring and Imports**: Begin with a comprehensive docstring followed by
   required imports
2. **Plugin Identification**: Define plugin name constants
3. **Configuration Models**: Define Pydantic models for configuration
4. **Hook Implementations**: Implement lifecycle hooks with proper decorators

## Required Components

### 1. Documentation

Every plugin must start with a docstring following this format:

```python
"""
Plugin name and one-line description

# Installation

Installation instructions, including:
- Required pip packages
- Configuration in markata.toml
- Any environment variables needed

\`\`\`toml
hooks = [
    "markata.plugins.load",
]
\`\`\`

# Configuration

Document all configuration options:

\`\`\`toml
[markata.plugin_name]
option1 = "default"  # Description of option1
option2 = 42        # Description of option2
\`\`\`

# Usage

Explain how to use the plugin, with examples.

# Notes

Any additional information, caveats, or best practices.
"""
```

### 2. Imports and Plugin Identity

```python
from markata.hookspec import hook_impl, register_attr
import pydantic
from typing import List, Optional, Union

MARKATA_PLUGIN_NAME = "My Plugin"  # Human readable name
MARKATA_PLUGIN_PACKAGE_NAME = "my-plugin"  # Package/import name
```

### 3. Configuration Models

Define Pydantic models using appropriate configuration based on usage pattern:

```python
class PluginConfig(pydantic.BaseModel):
    option1: str = "default"
    option2: int = 42
    
    model_config = pydantic.ConfigDict(
        validate_assignment=True,    # For config models
        arbitrary_types_allowed=True,
        extra="allow",
        str_strip_whitespace=True,
        validate_default=True,
        coerce_numbers_to_str=True,
        populate_by_name=True,
    )

class Config(pydantic.BaseModel):
    plugin_name: PluginConfig = PluginConfig()

@hook_impl
@register_attr("config_models")
def config_model(markata: "Markata") -> None:
    markata.config_models.append(Config)
```

### 4. Hook Implementation

Implement hooks based on when your plugin needs to run in the lifecycle:

```python
@hook_impl
@register_attr("my_attribute")  # Register any new markata attributes
def hook_name(markata: "Markata") -> None:
    """
    Implement your plugin logic here.
    Always type hint markata parameter.
    Register attributes you add to markata.
    """
    pass
```

## Lifecycle Hooks

Choose appropriate hooks based on when your plugin needs to run:

1. `config_model`: Load configuration models
2. `post_model`: Load post models
3. `create_models`: Model creation/merging
4. `load_config`: Load configuration
5. `configure`: Configuration setup
6. `validate_config`: Configuration validation
7. `glob`: File discovery
8. `load`: File loading
9. `validate_posts`: Post validation
10. `pre_render`: Pre-render processing
11. `render`: Content rendering
12. `post_render`: Post-render processing
13. `save`: Save to disk
14. `teardown`: Cleanup on exit

## Working with Posts

### Searching/Filtering Posts

```python
# Use markata.map for post operations
posts = markata.map(
    'post',  # What to return
    filter='"tag" in post.tags',  # Filter condition
    sort='date',  # Sort field
    reverse=True  # Sort direction
)
```

### Iterating Over All Posts

Typically plugins will iterate over all posts that are not markated as `skip`
posts, these posts have been manually flagged by the user to skip, or have been
identified early as already completed in previoud builds.

```python
for post in markata.filter('not skip'):
    # Do something with post
```

### Creating Posts

```python
post_args = {
    "markata": markata,
    "path": "example.md",
    "content": "# Example\nContent here",
    "raw": "# Example\nContent here",
    "title": "Example Post",
    "description": "An example post",
    "published": True,
    "date": "2025-01-29"
}

post = markata.Post.parse_obj(post_args)
markata.Post.validate(post)
markata.posts.append(post)
```

## Complete Example

Here's a complete example of a tag statistics plugin:

```python
"""
Tag Statistics Plugin

Generates statistics about tag usage across all posts.

# Installation

\`\`\` toml
hooks = ["markata.plugins.tag_stats"]
\`\`\`

# Configuration

\`\`\` toml
[tag_stats]
output_file = "tag-stats.md"  # Output file for statistics
min_count = 1                 # Minimum tag count to include
\`\`\`

"""

from markata.hookspec import hook_impl, register_attr
import pydantic
from pathlib import Path
from typing import Optional
from collections import Counter

MARKATA_PLUGIN_NAME = "Tag Statistics"
MARKATA_PLUGIN_PACKAGE_NAME = "tag-stats"

class TagStatsConfig(pydantic.BaseModel):
    output_file: Path = Path("tag-stats.md")
    min_count: int = 1

    model_config = pydantic.ConfigDict(
        validate_assignment=True,
        arbitrary_types_allowed=True,
        extra="allow",
        str_strip_whitespace=True,
        validate_default=True,
        coerce_numbers_to_str=True,
        populate_by_name=True,
    )

class Config(pydantic.BaseModel):
    tag_stats: TagStatsConfig = TagStatsConfig()

@hook_impl
@register_attr("config_models")
def config_model(markata: "Markata") -> None:
    markata.config_models.append(Config)

@hook_impl
def post_render(markata: "Markata") -> None:
    # Collect all tags
    all_tags = []
    for post in markata.posts:
        if hasattr(post, "tags"):
            all_tags.extend(post.tags)

    # Count tags
    tag_counts = Counter(all_tags)
    
    # Generate markdown
    content = "# Tag Statistics\n\n"
    content += "| Tag | Count |\n|-----|-------|\n"
    
    for tag, count in sorted(tag_counts.items()):
        if count >= markata.config.tag_stats.min_count:
            content += f"| {tag} | {count} |\n"
    
    # Create statistics post
    post_args = {
        "markata": markata,
        "path": str(markata.config.tag_stats.output_file),
        "content": content,
        "raw": content,
        "title": "Tag Statistics",
        "description": "Statistics about tag usage",
        "published": True,
        "date": markata.today
    }
    
    post = markata.Post.parse_obj(post_args)
    markata.Post.validate(post)
    markata.posts.append(post)

```

## CLI Plugins

To add CLI commands:

```python
@hook_impl()
def cli(app, markata):
    @app.command()
    def my_command():
        """Command description for --help"""
        # Command implementation
```

> note throughout this file nested markdown fences were escaped for
> compatibility with the prompt, do not escape them. for example, you should
> not use \`\`\` toml but rather use ``` toml
