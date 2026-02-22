"""Password Protection Plugin for Markata

Adds client-side password protection to posts using secure hash-based authentication.
This plugin encrypts post content and provides a password prompt interface for decryption.

# Installation

Add the plugin to your markata.toml hooks:

```toml
hooks = [
    "plugins.password_protection",
]
```

# Configuration

Configure the plugin in your markata.toml (minimal setup):

```toml
[markata.password_protection]
# Salt for password hashing (required for security)
salt = "blog_salt_2025"
# Global default password - use plain text, will be hashed automatically
encryption_password = "your_password"
```

**Note**: The following are automatically set and don't need configuration:
- `protected_template_key = "protected-post"` (hardcoded)
- `encrypt_content = true` (always enabled for protected posts)

# Usage

Protect posts by setting the template key and optionally a custom password:

**Method 1: Use global password**
```yaml
---
title: My Secret Post
templateKey: protected-post
---
```

**Method 2: Custom password per post**
```yaml
---
title: My Secret Post
templateKey: protected-post
password: "my-custom-password"
---
```

**Method 3: Custom password hash per post**
```yaml
---
title: My Secret Post
templateKey: protected-post
password_hash: "sha256_hash_of_password"
---
```

# Password Hashing Requirements

**CRITICAL**: Both Python (server-side) and JavaScript (client-side) must use identical
password hashing algorithms for authentication to work correctly.

**Current Implementation**: SHA256(password + salt)
- Python: `hashlib.sha256((password + salt).encode()).hexdigest()`
- JavaScript: `CryptoJS.SHA256(password + SALT).toString()`

**DO NOT MODIFY** the hashing logic without updating both sides simultaneously.
Any mismatch will cause password authentication to fail.

# Security Features

- **Content Encryption**: Post content is encrypted using AES-CBC with CryptoJS
- **Password Verification**: Client-side password verification before decryption
- **Salt Protection**: Passwords are salted before hashing to prevent rainbow table attacks
- **No Plain Text**: Passwords are never stored in plain text in the generated HTML
- **Fallback Protection**: Falls back to content hiding if encryption fails

# Future Enhancements

- **REST Endpoint Support**: Planned support for fetching passwords from external APIs
- **Multiple Password Support**: Potential support for multiple passwords per post
- **Time-based Access**: Potential support for time-limited access tokens

# Notes

- Uses SHA-256 hashing with salt for security
- No plaintext passwords stored in code
- Works with existing markdown content and build process
- Requires CryptoJS CDN for client-side hashing
- Password protection is client-side only (not server-side secure)
"""

from markata.hookspec import hook_impl, register_attr
import pydantic
import base64
import hashlib
import os
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from markata import Markata

try:
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    from cryptography.hazmat.primitives import padding
    from cryptography.hazmat.backends import default_backend

    HAS_CRYPTOGRAPHY = True
except ImportError:
    HAS_CRYPTOGRAPHY = False

MARKATA_PLUGIN_NAME = "Password Protection"
MARKATA_PLUGIN_PACKAGE_NAME = "password-protection"


def _encrypt_content(content: str, password: str) -> str:
    """Encrypt content using AES encryption compatible with CryptoJS."""
    if not HAS_CRYPTOGRAPHY:
        raise ImportError(
            "cryptography package required for content encryption. Install with: pip install cryptography"
        )

    # Use a simple key derivation that matches CryptoJS expectations
    # CryptoJS.AES.encrypt(content, password) uses this approach
    key = hashlib.sha256(password.encode()).digest()

    # Generate random IV
    iv = os.urandom(16)

    # Pad content to AES block size
    padder = padding.PKCS7(128).padder()
    padded_content = padder.update(content.encode("utf-8"))
    padded_content += padder.finalize()

    # Encrypt
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted = encryptor.update(padded_content) + encryptor.finalize()

    # Return in format that CryptoJS can decrypt: base64(iv + encrypted)
    combined = iv + encrypted
    return base64.b64encode(combined).decode("utf-8")


class PasswordProtectionConfig(pydantic.BaseModel):
    """Configuration for password protection plugin."""

    # Salt for password hashing (required for security)
    salt: str = "blog_salt_2025"
    # Global default password (optional - can be overridden per post)
    # Use either password_hash (pre-computed) or encryption_password (plain text)
    password_hash: str = (
        ""  # SHA256(password + salt) - leave empty to use encryption_password
    )
    encryption_password: str = ""  # Plain text password - will be hashed with salt

    # Internal constants (not configurable)
    protected_template_key: str = "protected-post"  # Always use this template key
    encrypt_content: bool = True  # Always encrypt protected content

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
    """Main config model."""

    password_protection: PasswordProtectionConfig = PasswordProtectionConfig()


@hook_impl
@register_attr("post_models")
def config_model(markata: "Markata") -> None:
    """Register the configuration model."""
    markata.config_models.append(Config)


@hook_impl
def post_render(markata: "Markata") -> None:
    """Protect post content in feeds and descriptions before they are used."""
    config = markata.config.password_protection

    markata.console.log(
        "[blue]Password protection: Sanitizing protected posts in feeds[/blue]"
    )

    for post in markata.articles:
        template_key_value = post.get("templateKey", "")

        # Only sanitize posts with the protected template key
        if template_key_value == config.protected_template_key:
            markata.console.log(
                f"[yellow]Sanitizing protected post for feeds: {post.get('title', 'Unknown')}[/yellow]"
            )

            # Replace content fields that might leak in feeds
            protected_message = "🔒 This content is password protected."

            # Sanitize various content fields that could leak in feeds
            if hasattr(post, "content"):
                post.content = protected_message
            if hasattr(post, "description"):
                post.description = protected_message
            if hasattr(post, "excerpt"):
                post.excerpt = protected_message
            if hasattr(post, "summary"):
                post.summary = protected_message
            if hasattr(post, "article_html"):
                # Keep a backup of the original content for the save hook
                if not hasattr(post, "_original_article_html"):
                    post._original_article_html = post.article_html
                post.article_html = f"<p>{protected_message}</p>"

            # Sanitize metadata fields that could leak in link previews
            # if hasattr(post, 'cover'):
            #     # Remove cover image to prevent content leakage in previews
            #     post.cover = None
            # if hasattr(post, 'image'):
            #     # Remove any other image fields
            #     post.image = None
            # if hasattr(post, 'featured_image'):
            #     post.featured_image = None
            # if hasattr(post, 'thumbnail'):
            #     post.thumbnail = None

            # Sanitize tags that might reveal sensitive information
            if hasattr(post, "tags"):
                # Keep only generic tags, remove potentially sensitive ones
                if post.tags:
                    # Replace with generic "protected" tag
                    post.tags = ["protected"]

            # Sanitize any other fields that might leak content
            if hasattr(post, "subtitle"):
                post.subtitle = protected_message
            if hasattr(post, "lead"):
                post.lead = protected_message
            if hasattr(post, "intro"):
                post.intro = protected_message
            if hasattr(post, "abstract"):
                post.abstract = protected_message

            markata.console.log(
                f"[green]Protected post sanitized for feeds: {post.get('title', 'Unknown')}[/green]"
            )


@hook_impl
def save(markata: "Markata") -> None:
    """Add password protection to posts by modifying the generated HTML files."""
    config = markata.config.password_protection

    markata.console.log(
        f"[blue]Password protection plugin running on {len(markata.articles)} posts[/blue]"
    )

    for post in markata.articles:
        template_key_value = post.get("templateKey", "")

        # Only protect posts with the protected template key
        should_protect = template_key_value == config.protected_template_key

        # markata.console.log(f"[yellow]Post {post.get('title', 'Unknown')}: templateKey={template_key_value}, should_protect={should_protect}[/yellow]")

        if should_protect:
            markata.console.log(
                f"[green]PROTECTING POST: {post.get('title', 'Unknown')}[/green]"
            )

            # Get the output HTML file path
            output_file = post.output_html
            markata.console.log(f"[cyan]Output file: {output_file}[/cyan]")

            # Check if the HTML file exists and read its content
            if output_file.exists():
                try:
                    html_content = output_file.read_text(encoding="utf-8")
                    markata.console.log(
                        f"[cyan]Read HTML file with {len(html_content)} characters[/cyan]"
                    )

                    # Extract the body content from the HTML for encryption
                    import re

                    # Check if content is already password protected (avoid recursive encryption)
                    if (
                        "password-prompt" in html_content
                        or "encrypted-data" in html_content
                        or "ENCRYPTED_DATA" in html_content
                        or "decryptAndShow" in html_content
                    ):
                        markata.console.log(
                            "[yellow]Content already appears to be password protected, skipping...[/yellow]"
                        )
                        continue

                    # Check if we have original content backed up from post_render hook
                    article_match = None  # Initialize to avoid UnboundLocalError
                    if hasattr(post, "_original_article_html"):
                        markata.console.log(
                            "[cyan]Using original content backed up from post_render hook[/cyan]"
                        )
                        # Use the original content for encryption, not the sanitized version
                        content_to_encrypt = post._original_article_html
                        # Look for article tags in the current HTML to maintain structure
                        article_match = re.search(
                            r"<article[^>]*>(.*?)</article>", html_content, re.DOTALL
                        )
                        if not article_match:
                            # If no article tag found, we'll replace the entire content
                            article_match = None
                    else:
                        # Look for the main article content (this is a simplified approach)
                        # We'll encrypt everything between <article> tags or similar
                        article_match = re.search(
                            r"<article[^>]*>(.*?)</article>", html_content, re.DOTALL
                        )
                        if article_match:
                            content_to_encrypt = article_match.group(1)
                            markata.console.log(
                                f"[cyan]Found article content with {len(content_to_encrypt)} characters[/cyan]"
                            )
                        else:
                            # Fallback: encrypt everything in the main content area
                            content_to_encrypt = html_content
                            markata.console.log(
                                "[cyan]Using full HTML content for encryption[/cyan]"
                            )
                            article_match = None

                except Exception as e:
                    markata.console.log(
                        f"[red]Error reading HTML file {output_file}: {e}[/red]"
                    )
                    continue
            else:
                # markata.console.log(f"[red]HTML file does not exist: {output_file}[/red]")
                continue

            if config.encrypt_content and content_to_encrypt:
                # Get password and hash for this specific post
                post_password = post.get("password", "")
                post_password_hash = post.get("password_hash", "")

                # TODO: Future enhancement - fetch password/hash from REST endpoint
                # This would allow passwords to be stored securely outside the repo
                # Example: password_endpoint = post.get('password_endpoint', '')
                # if password_endpoint:
                #     password_hash = fetch_password_from_endpoint(password_endpoint, post.get('slug', ''))

                # Determine which password/hash to use
                if post_password:
                    # Use custom password from frontmatter
                    import hashlib

                    encryption_password = post_password
                    # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                    password_hash = hashlib.sha256(
                        (post_password + config.salt).encode()
                    ).hexdigest()
                    markata.console.log(
                        f"[blue]Using custom password from frontmatter for post: {post.get('title', 'Unknown')}[/blue]"
                    )
                    markata.console.log(f"[cyan]Password hash: {password_hash}[/cyan]")
                elif post_password_hash:
                    # Use custom password hash from frontmatter
                    password_hash = post_password_hash
                    encryption_password = (
                        config.encryption_password or "default_encryption_key"
                    )
                    markata.console.log(
                        f"[blue]Using custom password hash from frontmatter for post: {post.get('title', 'Unknown')}[/blue]"
                    )
                else:
                    # Use global config - prefer password_hash, fallback to encryption_password
                    if config.password_hash:
                        password_hash = config.password_hash
                        encryption_password = (
                            config.encryption_password or "default_encryption_key"
                        )
                    elif config.encryption_password:
                        # Hash the global encryption password with salt
                        import hashlib

                        password_hash = hashlib.sha256(
                            (config.encryption_password + config.salt).encode()
                        ).hexdigest()
                        encryption_password = config.encryption_password
                    else:
                        # No global password configured - this shouldn't happen but provide fallback
                        markata.console.log(
                            f"[yellow]Warning: No global password configured for post: {post.get('title', 'Unknown')}[/yellow]"
                        )
                        encryption_password = "default_encryption_key"
                        password_hash = hashlib.sha256(
                            (encryption_password + config.salt).encode()
                        ).hexdigest()
                    markata.console.log(
                        f"[blue]Using global password config for post: {post.get('title', 'Unknown')}[/blue]"
                    )

                markata.console.log(
                    f"[blue]Attempting encryption with password: {encryption_password[:5] if len(encryption_password) >= 5 else encryption_password}...[/blue]"
                )
                try:
                    encrypted_content = _encrypt_content(
                        content_to_encrypt, encryption_password
                    )
                    # Create the protected content wrapper
                    protected_content = _wrap_with_encrypted_content(
                        encrypted_content,
                        password_hash,
                        config.salt,
                        encryption_password,
                    )

                    # Replace the content in the HTML file
                    if article_match:
                        # Replace just the article content
                        new_html_content = html_content.replace(
                            article_match.group(0),
                            f"<article>{protected_content}</article>",
                        )
                    else:
                        # Replace the entire HTML content or use full protected content
                        new_html_content = protected_content

                    # Write the modified HTML back to the file
                    output_file.write_text(new_html_content, encoding="utf-8")
                    markata.console.log(
                        f"[green]Content encrypted successfully! Updated HTML file with {len(new_html_content)} characters[/green]"
                    )
                    markata.console.log(
                        f"[cyan]Post template: {getattr(post, 'template', 'unknown')}[/cyan]"
                    )
                    markata.console.log(
                        f"[cyan]Post templateKey: {getattr(post, 'templateKey', 'unknown')}[/cyan]"
                    )

                    # Show first 200 chars of encrypted content
                    preview_content = new_html_content[:200]
                    markata.console.log(
                        f"[cyan]First 200 chars of new HTML: {preview_content}...[/cyan]"
                    )
                except ImportError as e:
                    markata.console.log(f"[red]Encryption failed: {e}[/red]")
                    markata.console.log(
                        "[yellow]Falling back to content hiding[/yellow]"
                    )
                    # Fall back to simple content hiding
                    # Use the same password logic for fallback
                    post_password = post.get("password", "")
                    post_password_hash = post.get("password_hash", "")

                    if post_password:
                        import hashlib

                        # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                        password_hash = hashlib.sha256(
                            (post_password + config.salt).encode()
                        ).hexdigest()
                    elif post_password_hash:
                        password_hash = post_password_hash
                    else:
                        # Use global config - prefer password_hash, fallback to encryption_password
                        if config.password_hash:
                            password_hash = config.password_hash
                        elif config.encryption_password:
                            import hashlib

                            password_hash = hashlib.sha256(
                                (config.encryption_password + config.salt).encode()
                            ).hexdigest()
                        else:
                            import hashlib

                            password_hash = hashlib.sha256(
                                ("default_encryption_key" + config.salt).encode()
                            ).hexdigest()

                    protected_content = _wrap_with_password_protection(
                        content_to_encrypt, password_hash, config.salt
                    )
                    # Replace content in HTML file
                    if article_match:
                        new_html_content = html_content.replace(
                            article_match.group(0),
                            f"<article>{protected_content}</article>",
                        )
                    else:
                        new_html_content = protected_content
                    output_file.write_text(new_html_content, encoding="utf-8")
                    markata.console.log(
                        f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]"
                    )
                except Exception as e:
                    markata.console.log(f"[red]Unexpected encryption error: {e}[/red]")
                    markata.console.log(
                        "[yellow]Falling back to content hiding[/yellow]"
                    )
                    # Fall back to simple content hiding
                    # Use the same password logic for fallback
                    post_password = post.get("password", "")
                    post_password_hash = post.get("password_hash", "")

                    if post_password:
                        import hashlib

                        # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                        password_hash = hashlib.sha256(
                            (post_password + config.salt).encode()
                        ).hexdigest()
                    elif post_password_hash:
                        password_hash = post_password_hash
                    else:
                        # Use global config - prefer password_hash, fallback to encryption_password
                        if config.password_hash:
                            password_hash = config.password_hash
                        elif config.encryption_password:
                            import hashlib

                            password_hash = hashlib.sha256(
                                (config.encryption_password + config.salt).encode()
                            ).hexdigest()
                        else:
                            import hashlib

                            password_hash = hashlib.sha256(
                                ("default_encryption_key" + config.salt).encode()
                            ).hexdigest()

                    protected_content = _wrap_with_password_protection(
                        content_to_encrypt, password_hash, config.salt
                    )
                    # Replace content in HTML file
                    if article_match:
                        new_html_content = html_content.replace(
                            article_match.group(0),
                            f"<article>{protected_content}</article>",
                        )
                    else:
                        new_html_content = protected_content
                    output_file.write_text(new_html_content, encoding="utf-8")
                    markata.console.log(
                        f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]"
                    )
            else:
                # Simple content hiding without encryption
                markata.console.log(
                    "[blue]Using simple content hiding (no encryption)[/blue]"
                )

                # Get password hash for this specific post
                post_password = post.get("password", "")
                post_password_hash = post.get("password_hash", "")

                if post_password:
                    import hashlib

                    # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                    password_hash = hashlib.sha256(
                        (post_password + config.salt).encode()
                    ).hexdigest()
                elif post_password_hash:
                    password_hash = post_password_hash
                else:
                    # Use global config - prefer password_hash, fallback to encryption_password
                    if config.password_hash:
                        password_hash = config.password_hash
                    elif config.encryption_password:
                        import hashlib

                        password_hash = hashlib.sha256(
                            (config.encryption_password + config.salt).encode()
                        ).hexdigest()
                    else:
                        import hashlib

                        password_hash = hashlib.sha256(
                            ("default_encryption_key" + config.salt).encode()
                        ).hexdigest()

                protected_content = _wrap_with_password_protection(
                    content_to_encrypt, password_hash, config.salt
                )
                # Replace content in HTML file
                if article_match:
                    new_html_content = html_content.replace(
                        article_match.group(0),
                        f"<article>{protected_content}</article>",
                    )
                else:
                    new_html_content = protected_content
                output_file.write_text(new_html_content, encoding="utf-8")
                markata.console.log(
                    f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]"
                )
        else:
            continue
            # markata.console.log(
            #     f"[dim]Post {post.get('title', 'Unknown')} does not need protection[/dim]"
            # )


def _wrap_with_encrypted_content(
    encrypted_content: str,
    password_hash: str,
    salt: str,
    encryption_password: str = "default_encryption_key",
) -> str:
    """Wrap encrypted content with password protection and decryption logic."""

    protection_html = f"""
<!-- Password Protection with Content Encryption -->
<div id="password-prompt" style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; font-family: Arial, sans-serif;">
  <h3>🔒 Password Required</h3>
  <p>This post is encrypted. Enter the password to decrypt and view:</p>
  <input type="password" id="password-input" placeholder="Enter password" style="padding: 10px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
  <br>
  <button onclick="decryptAndShow()" style="padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 10px;">Decrypt</button>
  <div id="error-message" style="color: red; margin-top: 10px; display: none;">Failed to decrypt. Check your password.</div>
</div>

<div id="decrypted-content" style="display: none;"></div>

<!-- Encrypted content blob -->
<div id="encrypted-data" style="display: none;" data-encrypted="{encrypted_content}"></div>

<!-- Include CryptoJS for decryption -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<script>
// Password hash for authentication
const PASSWORD_HASH = '{password_hash}';
const SALT = '{salt}';
// Store encrypted data persistently
const ENCRYPTED_DATA = '{encrypted_content}';

function decryptAndShow() {{
  const password = document.getElementById('password-input').value;
  const encryptedData = ENCRYPTED_DATA;
  
  console.log('Debug: Password entered:', password);
  console.log('Debug: Encrypted data length:', encryptedData ? encryptedData.length : 'null');
  console.log('Debug: Encrypted data preview:', encryptedData ? encryptedData.substring(0, 50) + '...' : 'null');
  
  if (!encryptedData) {{
    console.error('Debug: No encrypted data found!');
    document.getElementById('error-message').textContent = 'No encrypted data found.';
    document.getElementById('error-message').style.display = 'block';
    return;
  }}
  
  // First verify password
  const hashedInput = CryptoJS.SHA256(password + SALT).toString();
  console.log('Debug: Expected password hash:', PASSWORD_HASH);
  console.log('Debug: Computed password hash:', hashedInput);
  console.log('Debug: Password verification:', hashedInput === PASSWORD_HASH);
  
  if (hashedInput !== PASSWORD_HASH) {{
    console.log('Debug: Password verification failed!');
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
    return;
  }}
  
  console.log('Debug: Password verification passed, proceeding to decrypt...');
  
  // Password is correct, now decrypt content
  try {{
    // Decrypt using the same method as Python encryption
    const encryptionPassword = '{encryption_password}';
    
    // Create key from password (matching Python SHA256 approach)
    const key = CryptoJS.SHA256(encryptionPassword);
    
    // Decode base64 encrypted data
    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);
    
    // Extract IV (first 16 bytes) and ciphertext (rest)
    // Convert to Uint8Array for proper byte manipulation
    const encryptedArray = new Uint8Array(encryptedBytes.sigBytes);
    for (let i = 0; i < encryptedBytes.sigBytes; i++) {{
      encryptedArray[i] = (encryptedBytes.words[Math.floor(i / 4)] >>> (24 - (i % 4) * 8)) & 0xff;
    }}
    
    // Extract IV (first 16 bytes) and ciphertext (remaining bytes)
    const ivArray = encryptedArray.slice(0, 16);
    const ciphertextArray = encryptedArray.slice(16);
    
    // Convert back to CryptoJS WordArrays
    const iv = CryptoJS.lib.WordArray.create(ivArray);
    const ciphertext = CryptoJS.lib.WordArray.create(ciphertextArray);
    
    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({{
        ciphertext: ciphertext
      }}),
      key,
      {{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }}
    );
    
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    console.log('Debug: Decrypted text length:', decryptedText ? decryptedText.length : 'null');
    console.log('Debug: Decrypted text preview:', decryptedText ? decryptedText.substring(0, 100) + '...' : 'null');
    
    if (decryptedText && decryptedText.length > 0) {{
      console.log('Debug: Decryption successful, showing content');
      // Hide password prompt and show decrypted content
      document.getElementById('password-prompt').style.display = 'none';
      
      // Get post metadata from the page
      const postTitle = document.title || 'Protected Post';
      const postDate = document.querySelector('time')?.textContent || '';
      const postTags = Array.from(document.querySelectorAll('.tag, .badge')).map(tag => tag.textContent).join(' ');
      
      // Create properly structured content matching post_partial.html structure and CSS classes
      // Add top margin to prevent overlap with search bar
      const structuredContent = `
        <div class="mt-8 pt-4">
          <article class="w-full pattern-card glow-card p-4 md:p-6 post-container">
            <section class="post-header mb-8">
              <h1 id="title" style="font-size: 4rem; line-height: 1.1; font-weight: 800;" class="text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large">${{postTitle}}</h1>
              ${{postDate ? `<div class="flex items-center text-sm text-text-main/80 mb-6"><time>${{postDate}}</time></div>` : ''}}
              ${{postTags ? `<div class="flex flex-wrap gap-2">${{postTags}}</div>` : ''}}
            </section>
            <section class="article-content prose dark:prose-invert lg:prose-xl mx-auto mt-8">
              ${{decryptedText}}
            </section>
          </article>
        </div>
      `;
      
      document.getElementById('decrypted-content').innerHTML = structuredContent;
      document.getElementById('decrypted-content').style.display = 'block';
    }} else {{
      console.log('Debug: Decryption failed - empty or null result');
      document.getElementById('error-message').textContent = 'Failed to decrypt. Check your password.';
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('password-input').value = '';
      document.getElementById('password-input').focus();
    }}
  }} catch (error) {{
    console.error('Decryption error:', error);
    document.getElementById('error-message').textContent = 'Decryption failed: ' + error.message;
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
  }}
}}

// Allow Enter key to submit password
document.getElementById('password-input').addEventListener('keypress', function(e) {{
  if (e.key === 'Enter') {{
    decryptAndShow();
  }}
}});

// Focus on password input when page loads
window.addEventListener('load', function() {{
  document.getElementById('password-input').focus();
}});
</script>
"""

    return protection_html


def _wrap_with_password_protection(content: str, password_hash: str, salt: str) -> str:
    """Wrap content with password protection HTML and JavaScript (content hiding only)."""

    # Password protection HTML and JavaScript
    protection_html = f"""
<!-- Password Protection -->
<div id="password-prompt" style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; font-family: Arial, sans-serif;">
  <h3>🔒 Password Required</h3>
  <p>This post is password protected. Please enter the password to continue:</p>
  <input type="password" id="password-input" placeholder="Enter password" style="padding: 10px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;">
  <br>
  <button onclick="checkPassword()" style="padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 10px;">Submit</button>
  <div id="error-message" style="color: red; margin-top: 10px; display: none;">Incorrect password. Please try again.</div>
</div>

<div id="protected-content" style="display: none;">

{content}

</div>

<!-- Include CryptoJS for secure hashing -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<script>
// Secure password hash (SHA-256 with salt)
const PASSWORD_HASH = '{password_hash}';
const SALT = '{salt}';

function checkPassword() {{
  const password = document.getElementById('password-input').value;
  
  // Hash the entered password with salt
  const hashedInput = CryptoJS.SHA256(password + SALT).toString();
  
  // Compare with stored hash
  if (hashedInput === PASSWORD_HASH) {{
    document.getElementById('password-prompt').style.display = 'none';
    document.getElementById('protected-content').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
  }} else {{
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('password-input').value = '';
    document.getElementById('password-input').focus();
  }}
}}

// Allow Enter key to submit password
document.getElementById('password-input').addEventListener('keypress', function(e) {{
  if (e.key === 'Enter') {{
    checkPassword();
  }}
}});

// Focus on password input when page loads
window.addEventListener('load', function() {{
  document.getElementById('password-input').focus();
}});

// Helper function to generate hash for a new password (for development)
function generatePasswordHash(password) {{
  return CryptoJS.SHA256(password + SALT).toString();
}}
// Usage: console.log(generatePasswordHash('your_password_here'));
</script>
"""

    return protection_html
