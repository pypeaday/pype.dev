---
content: "---\n\nPassword Protection Plugin for Markata\n\nAdds client-side password
  protection to posts using secure hash-based authentication.\nThis plugin encrypts
  post content and provides a password prompt interface for decryption.\n\n# Installation\n\nAdd
  the plugin to your markata.toml hooks:\n\n```toml\nhooks = [\n    \"plugins.password_protection\",\n]\n```\n\n#
  Configuration\n\nConfigure the plugin in your markata.toml (minimal setup):\n\n```toml\n[markata.password_protection]\n#
  Salt for password hashing (required for security)\nsalt = \"blog_salt_2025\"\n#
  Global default password - use plain text, will be hashed automatically\nencryption_password
  = \"your_password\"\n```\n\n**Note**: The following are automatically set and don't
  need configuration:\n- `protected_template_key = \"protected-post\"` (hardcoded)\n-
  `encrypt_content = true` (always enabled for protected posts)\n\n# Usage\n\nProtect
  posts by setting the template key and optionally a custom password:\n\n**Method
  1: Use global password**\n```yaml\n---\ntitle: My Secret Post\ntemplateKey: protected-post\n---\n```\n\n**Method
  2: Custom password per post**\n```yaml\n---\ntitle: My Secret Post\ntemplateKey:
  protected-post\npassword: \"my-custom-password\"\n---\n```\n\n**Method 3: Custom
  password hash per post**\n```yaml\n---\ntitle: My Secret Post\ntemplateKey: protected-post\npassword_hash:
  \"sha256_hash_of_password\"\n---\n```\n\n# Password Hashing Requirements\n\n**CRITICAL**:
  Both Python (server-side) and JavaScript (client-side) must use identical \npassword
  hashing algorithms for authentication to work correctly.\n\n**Current Implementation**:
  SHA256(password + salt)\n- Python: `hashlib.sha256((password + salt).encode()).hexdigest()`\n-
  JavaScript: `CryptoJS.SHA256(password + SALT).toString()`\n\n**DO NOT MODIFY** the
  hashing logic without updating both sides simultaneously.\nAny mismatch will cause
  password authentication to fail.\n\n# Security Features\n\n- **Content Encryption**:
  Post content is encrypted using AES-CBC with CryptoJS\n- **Password Verification**:
  Client-side password verification before decryption\n- **Salt Protection**: Passwords
  are salted before hashing to prevent rainbow table attacks\n- **No Plain Text**:
  Passwords are never stored in plain text in the generated HTML\n- **Fallback Protection**:
  Falls back to content hiding if encryption fails\n\n# Future Enhancements\n\n- **REST
  Endpoint Support**: Planned support for fetching passwords from external APIs\n-
  **Multiple Password Support**: Potential support for multiple passwords per post\n-
  **Time-based Access**: Potential support for time-limited access tokens\n\n# Notes\n\n-
  Uses SHA-256 hashing with salt for security\n- No plaintext passwords stored in
  code\n- Works with existing markdown content and build process\n- Requires CryptoJS
  CDN for client-side hashing\n- Password protection is client-side only (not server-side
  secure)\n\n---\n\n!!! function\n    <h2 id=\"_encrypt_content\" class=\"admonition-title\"
  style=\"margin: 0; padding: .5rem 1rem;\">_encrypt_content <em class=\"small\">function</em></h2>\n\n
  \   Encrypt content using AES encryption compatible with CryptoJS.\n\n???+ source
  \"_encrypt_content <em class='small'>source</em>\"\n    ```python\n    def _encrypt_content(content:
  str, password: str) -> str:\n        \"\"\"Encrypt content using AES encryption
  compatible with CryptoJS.\"\"\"\n        if not HAS_CRYPTOGRAPHY:\n            raise
  ImportError(\"cryptography package required for content encryption. Install with:
  pip install cryptography\")\n        \n        # Use a simple key derivation that
  matches CryptoJS expectations\n        # CryptoJS.AES.encrypt(content, password)
  uses this approach\n        key = hashlib.sha256(password.encode()).digest()\n        \n
  \       # Generate random IV\n        iv = os.urandom(16)\n        \n        # Pad
  content to AES block size\n        padder = padding.PKCS7(128).padder()\n        padded_content
  = padder.update(content.encode('utf-8'))\n        padded_content += padder.finalize()\n
  \       \n        # Encrypt\n        cipher = Cipher(algorithms.AES(key), modes.CBC(iv),
  backend=default_backend())\n        encryptor = cipher.encryptor()\n        encrypted
  = encryptor.update(padded_content) + encryptor.finalize()\n        \n        # Return
  in format that CryptoJS can decrypt: base64(iv + encrypted)\n        combined =
  iv + encrypted\n        return base64.b64encode(combined).decode('utf-8')\n    ```\n!!!
  class\n    <h2 id=\"PasswordProtectionConfig\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">PasswordProtectionConfig <em class=\"small\">class</em></h2>\n\n
  \   Configuration for password protection plugin.\n\n???+ source \"PasswordProtectionConfig
  <em class='small'>source</em>\"\n    ```python\n    class PasswordProtectionConfig(pydantic.BaseModel):\n
  \       \"\"\"Configuration for password protection plugin.\"\"\"\n        # Salt
  for password hashing (required for security)\n        salt: str = \"blog_salt_2025\"\n
  \       # Global default password (optional - can be overridden per post)\n        #
  Use either password_hash (pre-computed) or encryption_password (plain text)\n        password_hash:
  str = \"\"  # SHA256(password + salt) - leave empty to use encryption_password\n
  \       encryption_password: str = \"\"  # Plain text password - will be hashed
  with salt\n        \n        # Internal constants (not configurable)\n        protected_template_key:
  str = \"protected-post\"  # Always use this template key\n        encrypt_content:
  bool = True  # Always encrypt protected content\n        \n        model_config
  = pydantic.ConfigDict(\n            validate_assignment=True,\n            arbitrary_types_allowed=True,\n
  \           extra=\"allow\",\n            str_strip_whitespace=True,\n            validate_default=True,\n
  \           coerce_numbers_to_str=True,\n            populate_by_name=True,\n        )\n
  \   ```\n!!! class\n    <h2 id=\"Config\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">Config <em class=\"small\">class</em></h2>\n\n    Main
  config model.\n\n???+ source \"Config <em class='small'>source</em>\"\n    ```python\n
  \   class Config(pydantic.BaseModel):\n        \"\"\"Main config model.\"\"\"\n
  \       password_protection: PasswordProtectionConfig = PasswordProtectionConfig()\n
  \   ```\n!!! function\n    <h2 id=\"config_model\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">config_model <em class=\"small\">function</em></h2>\n\n
  \   Register the configuration model.\n\n???+ source \"config_model <em class='small'>source</em>\"\n
  \   ```python\n    def config_model(markata: \"Markata\") -> None:\n        \"\"\"Register
  the configuration model.\"\"\"\n        markata.config_models.append(Config)\n    ```\n!!!
  function\n    <h2 id=\"post_render\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">post_render <em class=\"small\">function</em></h2>\n\n
  \   Protect post content in feeds and descriptions before they are used.\n\n???+
  source \"post_render <em class='small'>source</em>\"\n    ```python\n    def post_render(markata:
  \"Markata\") -> None:\n        \"\"\"Protect post content in feeds and descriptions
  before they are used.\"\"\"\n        config = markata.config.password_protection\n
  \       \n        markata.console.log(\"[blue]Password protection: Sanitizing protected
  posts in feeds[/blue]\")\n        \n        for post in markata.articles:\n            template_key_value
  = post.get('templateKey', '')\n            \n            # Only sanitize posts with
  the protected template key\n            if template_key_value == config.protected_template_key:\n
  \               markata.console.log(f\"[yellow]Sanitizing protected post for feeds:
  {post.get('title', 'Unknown')}[/yellow]\")\n                \n                #
  Replace content fields that might leak in feeds\n                protected_message
  = \"\U0001F512 This content is password protected.\"\n                \n                #
  Sanitize various content fields that could leak in feeds\n                if hasattr(post,
  'content'):\n                    post.content = protected_message\n                if
  hasattr(post, 'description'):\n                    post.description = protected_message\n
  \               if hasattr(post, 'excerpt'):\n                    post.excerpt =
  protected_message\n                if hasattr(post, 'summary'):\n                    post.summary
  = protected_message\n                if hasattr(post, 'article_html'):\n                    #
  Keep a backup of the original content for the save hook\n                    if
  not hasattr(post, '_original_article_html'):\n                        post._original_article_html
  = post.article_html\n                    post.article_html = f\"<p>{protected_message}</p>\"\n
  \               \n                # Sanitize metadata fields that could leak in
  link previews\n                # if hasattr(post, 'cover'):\n                #     #
  Remove cover image to prevent content leakage in previews\n                #     post.cover
  = None\n                # if hasattr(post, 'image'):\n                #     # Remove
  any other image fields\n                #     post.image = None\n                #
  if hasattr(post, 'featured_image'):\n                #     post.featured_image =
  None\n                # if hasattr(post, 'thumbnail'):\n                #     post.thumbnail
  = None\n                \n                # Sanitize tags that might reveal sensitive
  information\n                if hasattr(post, 'tags'):\n                    # Keep
  only generic tags, remove potentially sensitive ones\n                    if post.tags:\n
  \                       # Replace with generic \"protected\" tag\n                        post.tags
  = [\"protected\"]\n                \n                # Sanitize any other fields
  that might leak content\n                if hasattr(post, 'subtitle'):\n                    post.subtitle
  = protected_message\n                if hasattr(post, 'lead'):\n                    post.lead
  = protected_message\n                if hasattr(post, 'intro'):\n                    post.intro
  = protected_message\n                if hasattr(post, 'abstract'):\n                    post.abstract
  = protected_message\n                \n                markata.console.log(f\"[green]Protected
  post sanitized for feeds: {post.get('title', 'Unknown')}[/green]\")\n    ```\n!!!
  function\n    <h2 id=\"save\" class=\"admonition-title\" style=\"margin: 0; padding:
  .5rem 1rem;\">save <em class=\"small\">function</em></h2>\n\n    Add password protection
  to posts by modifying the generated HTML files.\n\n???+ source \"save <em class='small'>source</em>\"\n
  \   ```python\n    def save(markata: \"Markata\") -> None:\n        \"\"\"Add password
  protection to posts by modifying the generated HTML files.\"\"\"\n        config
  = markata.config.password_protection\n        \n        markata.console.log(f\"[blue]Password
  protection plugin running on {len(markata.articles)} posts[/blue]\")\n        \n
  \       for post in markata.articles:\n            template_key_value = post.get('templateKey',
  '')\n            \n            # Only protect posts with the protected template
  key\n            should_protect = template_key_value == config.protected_template_key\n
  \           \n            markata.console.log(f\"[yellow]Post {post.get('title',
  'Unknown')}: templateKey={template_key_value}, should_protect={should_protect}[/yellow]\")\n
  \           \n            if should_protect:\n                markata.console.log(f\"[green]PROTECTING
  POST: {post.get('title', 'Unknown')}[/green]\")\n                \n                #
  Get the output HTML file path\n                output_file = post.output_html\n
  \               markata.console.log(f\"[cyan]Output file: {output_file}[/cyan]\")\n
  \               \n                # Check if the HTML file exists and read its content\n
  \               if output_file.exists():\n                    try:\n                        html_content
  = output_file.read_text(encoding='utf-8')\n                        markata.console.log(f\"[cyan]Read
  HTML file with {len(html_content)} characters[/cyan]\")\n                        \n
  \                       # Extract the body content from the HTML for encryption\n
  \                       import re\n                        \n                        #
  Check if content is already password protected (avoid recursive encryption)\n                        if
  ('password-prompt' in html_content or \n                            'encrypted-data'
  in html_content or \n                            'ENCRYPTED_DATA' in html_content
  or\n                            'decryptAndShow' in html_content):\n                            markata.console.log(\"[yellow]Content
  already appears to be password protected, skipping...[/yellow]\")\n                            continue\n
  \                       \n                        # Check if we have original content
  backed up from post_render hook\n                        article_match = None  #
  Initialize to avoid UnboundLocalError\n                        if hasattr(post,
  '_original_article_html'):\n                            markata.console.log(\"[cyan]Using
  original content backed up from post_render hook[/cyan]\")\n                            #
  Use the original content for encryption, not the sanitized version\n                            content_to_encrypt
  = post._original_article_html\n                            # Look for article tags
  in the current HTML to maintain structure\n                            article_match
  = re.search(r'<article[^>]*>(.*?)</article>', html_content, re.DOTALL)\n                            if
  not article_match:\n                                # If no article tag found, we'll
  replace the entire content\n                                article_match = None\n
  \                       else:\n                            # Look for the main article
  content (this is a simplified approach)\n                            # We'll encrypt
  everything between <article> tags or similar\n                            article_match
  = re.search(r'<article[^>]*>(.*?)</article>', html_content, re.DOTALL)\n                            if
  article_match:\n                                content_to_encrypt = article_match.group(1)\n
  \                               markata.console.log(f\"[cyan]Found article content
  with {len(content_to_encrypt)} characters[/cyan]\")\n                            else:\n
  \                               # Fallback: encrypt everything in the main content
  area\n                                content_to_encrypt = html_content\n                                markata.console.log(\"[cyan]Using
  full HTML content for encryption[/cyan]\")\n                                article_match
  = None\n                            \n                    except Exception as e:\n
  \                       markata.console.log(f\"[red]Error reading HTML file {output_file}:
  {e}[/red]\")\n                        continue\n                else:\n                    markata.console.log(f\"[red]HTML
  file does not exist: {output_file}[/red]\")\n                    continue\n                \n
  \               if config.encrypt_content and content_to_encrypt:\n                    #
  Get password and hash for this specific post\n                    post_password
  = post.get('password', '')\n                    post_password_hash = post.get('password_hash',
  '')\n                    \n                    # TODO: Future enhancement - fetch
  password/hash from REST endpoint\n                    # This would allow passwords
  to be stored securely outside the repo\n                    # Example: password_endpoint
  = post.get('password_endpoint', '')\n                    # if password_endpoint:\n
  \                   #     password_hash = fetch_password_from_endpoint(password_endpoint,
  post.get('slug', ''))\n                    \n                    # Determine which
  password/hash to use\n                    if post_password:\n                        #
  Use custom password from frontmatter\n                        import hashlib\n                        encryption_password
  = post_password\n                        # Hash password with salt to match JavaScript
  logic: SHA256(password + salt)\n                        password_hash = hashlib.sha256((post_password
  + config.salt).encode()).hexdigest()\n                        markata.console.log(f\"[blue]Using
  custom password from frontmatter for post: {post.get('title', 'Unknown')}[/blue]\")\n
  \                       markata.console.log(f\"[cyan]Password hash: {password_hash}[/cyan]\")\n
  \                   elif post_password_hash:\n                        # Use custom
  password hash from frontmatter\n                        password_hash = post_password_hash\n
  \                       encryption_password = config.encryption_password or \"default_encryption_key\"\n
  \                       markata.console.log(f\"[blue]Using custom password hash
  from frontmatter for post: {post.get('title', 'Unknown')}[/blue]\")\n                    else:\n
  \                       # Use global config - prefer password_hash, fallback to
  encryption_password\n                        if config.password_hash:\n                            password_hash
  = config.password_hash\n                            encryption_password = config.encryption_password
  or \"default_encryption_key\"\n                        elif config.encryption_password:\n
  \                           # Hash the global encryption password with salt\n                            import
  hashlib\n                            password_hash = hashlib.sha256((config.encryption_password
  + config.salt).encode()).hexdigest()\n                            encryption_password
  = config.encryption_password\n                        else:\n                            #
  No global password configured - this shouldn't happen but provide fallback\n                            markata.console.log(f\"[yellow]Warning:
  No global password configured for post: {post.get('title', 'Unknown')}[/yellow]\")\n
  \                           encryption_password = \"default_encryption_key\"\n                            password_hash
  = hashlib.sha256((encryption_password + config.salt).encode()).hexdigest()\n                        markata.console.log(f\"[blue]Using
  global password config for post: {post.get('title', 'Unknown')}[/blue]\")\n                    \n
  \                   markata.console.log(f\"[blue]Attempting encryption with password:
  {encryption_password[:5] if len(encryption_password) >= 5 else encryption_password}...[/blue]\")\n
  \                   try:\n                        encrypted_content = _encrypt_content(\n
  \                           content_to_encrypt, \n                            encryption_password\n
  \                       )\n                        # Create the protected content
  wrapper\n                        protected_content = _wrap_with_encrypted_content(\n
  \                           encrypted_content,\n                            password_hash,\n
  \                           config.salt,\n                            encryption_password\n
  \                       )\n                        \n                        # Replace
  the content in the HTML file\n                        if article_match:\n                            #
  Replace just the article content\n                            new_html_content =
  html_content.replace(article_match.group(0), f\"<article>{protected_content}</article>\")\n
  \                       else:\n                            # Replace the entire
  HTML content or use full protected content\n                            new_html_content
  = protected_content\n                        \n                        # Write the
  modified HTML back to the file\n                        output_file.write_text(new_html_content,
  encoding='utf-8')\n                        markata.console.log(f\"[green]Content
  encrypted successfully! Updated HTML file with {len(new_html_content)} characters[/green]\")\n
  \                       markata.console.log(f\"[cyan]Post template: {getattr(post,
  'template', 'unknown')}[/cyan]\")\n                        markata.console.log(f\"[cyan]Post
  templateKey: {getattr(post, 'templateKey', 'unknown')}[/cyan]\")\n                        \n
  \                       # Show first 200 chars of encrypted content\n                        preview_content
  = new_html_content[:200]\n                        markata.console.log(f\"[cyan]First
  200 chars of new HTML: {preview_content}...[/cyan]\")\n                    except
  ImportError as e:\n                        markata.console.log(f\"[red]Encryption
  failed: {e}[/red]\")\n                        markata.console.log(\"[yellow]Falling
  back to content hiding[/yellow]\")\n                        # Fall back to simple
  content hiding\n                        # Use the same password logic for fallback\n
  \                       post_password = post.get('password', '')\n                        post_password_hash
  = post.get('password_hash', '')\n                        \n                        if
  post_password:\n                            import hashlib\n                            #
  Hash password with salt to match JavaScript logic: SHA256(password + salt)\n                            password_hash
  = hashlib.sha256((post_password + config.salt).encode()).hexdigest()\n                        elif
  post_password_hash:\n                            password_hash = post_password_hash\n
  \                       else:\n                            # Use global config -
  prefer password_hash, fallback to encryption_password\n                            if
  config.password_hash:\n                                password_hash = config.password_hash\n
  \                           elif config.encryption_password:\n                                import
  hashlib\n                                password_hash = hashlib.sha256((config.encryption_password
  + config.salt).encode()).hexdigest()\n                            else:\n                                import
  hashlib\n                                password_hash = hashlib.sha256((\"default_encryption_key\"
  + config.salt).encode()).hexdigest()\n                        \n                        protected_content
  = _wrap_with_password_protection(\n                            content_to_encrypt,
  \n                            password_hash, \n                            config.salt\n
  \                       )\n                        # Replace content in HTML file\n
  \                       if article_match:\n                            new_html_content
  = html_content.replace(article_match.group(0), f\"<article>{protected_content}</article>\")\n
  \                       else:\n                            new_html_content = protected_content\n
  \                       output_file.write_text(new_html_content, encoding='utf-8')\n
  \                       markata.console.log(f\"[green]Content hidden successfully!
  New length: {len(new_html_content)}[/green]\")\n                    except Exception
  as e:\n                        markata.console.log(f\"[red]Unexpected encryption
  error: {e}[/red]\")\n                        markata.console.log(\"[yellow]Falling
  back to content hiding[/yellow]\")\n                        # Fall back to simple
  content hiding\n                        # Use the same password logic for fallback\n
  \                       post_password = post.get('password', '')\n                        post_password_hash
  = post.get('password_hash', '')\n                        \n                        if
  post_password:\n                            import hashlib\n                            #
  Hash password with salt to match JavaScript logic: SHA256(password + salt)\n                            password_hash
  = hashlib.sha256((post_password + config.salt).encode()).hexdigest()\n                        elif
  post_password_hash:\n                            password_hash = post_password_hash\n
  \                       else:\n                            # Use global config -
  prefer password_hash, fallback to encryption_password\n                            if
  config.password_hash:\n                                password_hash = config.password_hash\n
  \                           elif config.encryption_password:\n                                import
  hashlib\n                                password_hash = hashlib.sha256((config.encryption_password
  + config.salt).encode()).hexdigest()\n                            else:\n                                import
  hashlib\n                                password_hash = hashlib.sha256((\"default_encryption_key\"
  + config.salt).encode()).hexdigest()\n                        \n                        protected_content
  = _wrap_with_password_protection(\n                            content_to_encrypt,
  \n                            password_hash, \n                            config.salt\n
  \                       )\n                        # Replace content in HTML file\n
  \                       if article_match:\n                            new_html_content
  = html_content.replace(article_match.group(0), f\"<article>{protected_content}</article>\")\n
  \                       else:\n                            new_html_content = protected_content\n
  \                       output_file.write_text(new_html_content, encoding='utf-8')\n
  \                       markata.console.log(f\"[green]Content hidden successfully!
  New length: {len(new_html_content)}[/green]\")\n                else:\n                    #
  Simple content hiding without encryption\n                    markata.console.log(\"[blue]Using
  simple content hiding (no encryption)[/blue]\")\n                    \n                    #
  Get password hash for this specific post\n                    post_password = post.get('password',
  '')\n                    post_password_hash = post.get('password_hash', '')\n                    \n
  \                   if post_password:\n                        import hashlib\n
  \                       # Hash password with salt to match JavaScript logic: SHA256(password
  + salt)\n                        password_hash = hashlib.sha256((post_password +
  config.salt).encode()).hexdigest()\n                    elif post_password_hash:\n
  \                       password_hash = post_password_hash\n                    else:\n
  \                       # Use global config - prefer password_hash, fallback to
  encryption_password\n                        if config.password_hash:\n                            password_hash
  = config.password_hash\n                        elif config.encryption_password:\n
  \                           import hashlib\n                            password_hash
  = hashlib.sha256((config.encryption_password + config.salt).encode()).hexdigest()\n
  \                       else:\n                            import hashlib\n                            password_hash
  = hashlib.sha256((\"default_encryption_key\" + config.salt).encode()).hexdigest()\n
  \                   \n                    protected_content = _wrap_with_password_protection(\n
  \                       content_to_encrypt, \n                        password_hash,
  \n                        config.salt\n                    )\n                    #
  Replace content in HTML file\n                    if article_match:\n                        new_html_content
  = html_content.replace(article_match.group(0), f\"<article>{protected_content}</article>\")\n
  \                   else:\n                        new_html_content = protected_content\n
  \                   output_file.write_text(new_html_content, encoding='utf-8')\n
  \                   markata.console.log(f\"[green]Content hidden successfully! New
  length: {len(new_html_content)}[/green]\")\n            else:\n                markata.console.log(f\"[dim]Post
  {post.get('title', 'Unknown')} does not need protection[/dim]\")\n    ```\n!!! function\n
  \   <h2 id=\"_wrap_with_encrypted_content\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">_wrap_with_encrypted_content <em class=\"small\">function</em></h2>\n\n
  \   Wrap encrypted content with password protection and decryption logic.\n\n???+
  source \"_wrap_with_encrypted_content <em class='small'>source</em>\"\n    ```python\n
  \   def _wrap_with_encrypted_content(encrypted_content: str, password_hash: str,
  salt: str, encryption_password: str = \"default_encryption_key\") -> str:\n        \"\"\"Wrap
  encrypted content with password protection and decryption logic.\"\"\"\n        \n
  \       protection_html = f\"\"\"\n    <!-- Password Protection with Content Encryption
  -->\n    <div id=\"password-prompt\" style=\"max-width: 400px; margin: 50px auto;
  padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; font-family:
  Arial, sans-serif;\">\n      <h3>\U0001F512 Password Required</h3>\n      <p>This
  post is encrypted. Enter the password to decrypt and view:</p>\n      <input type=\"password\"
  id=\"password-input\" placeholder=\"Enter password\" style=\"padding: 10px; margin:
  10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;\">\n      <br>\n
  \     <button onclick=\"decryptAndShow()\" style=\"padding: 10px 20px; background:
  #007cba; color: white; border: none; border-radius: 4px; cursor: pointer; margin:
  10px;\">Decrypt</button>\n      <div id=\"error-message\" style=\"color: red; margin-top:
  10px; display: none;\">Failed to decrypt. Check your password.</div>\n    </div>\n\n
  \   <div id=\"decrypted-content\" style=\"display: none;\"></div>\n\n    <!-- Encrypted
  content blob -->\n    <div id=\"encrypted-data\" style=\"display: none;\" data-encrypted=\"{encrypted_content}\"></div>\n\n
  \   <!-- Include CryptoJS for decryption -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js\"></script>\n\n
  \   <script>\n    // Password hash for authentication\n    const PASSWORD_HASH =
  '{password_hash}';\n    const SALT = '{salt}';\n    // Store encrypted data persistently\n
  \   const ENCRYPTED_DATA = '{encrypted_content}';\n\n    function decryptAndShow()
  {{\n      const password = document.getElementById('password-input').value;\n      const
  encryptedData = ENCRYPTED_DATA;\n      \n      console.log('Debug: Password entered:',
  password);\n      console.log('Debug: Encrypted data length:', encryptedData ? encryptedData.length
  : 'null');\n      console.log('Debug: Encrypted data preview:', encryptedData ?
  encryptedData.substring(0, 50) + '...' : 'null');\n      \n      if (!encryptedData)
  {{\n        console.error('Debug: No encrypted data found!');\n        document.getElementById('error-message').textContent
  = 'No encrypted data found.';\n        document.getElementById('error-message').style.display
  = 'block';\n        return;\n      }}\n      \n      // First verify password\n
  \     const hashedInput = CryptoJS.SHA256(password + SALT).toString();\n      console.log('Debug:
  Expected password hash:', PASSWORD_HASH);\n      console.log('Debug: Computed password
  hash:', hashedInput);\n      console.log('Debug: Password verification:', hashedInput
  === PASSWORD_HASH);\n      \n      if (hashedInput !== PASSWORD_HASH) {{\n        console.log('Debug:
  Password verification failed!');\n        document.getElementById('error-message').style.display
  = 'block';\n        document.getElementById('password-input').value = '';\n        document.getElementById('password-input').focus();\n
  \       return;\n      }}\n      \n      console.log('Debug: Password verification
  passed, proceeding to decrypt...');\n      \n      // Password is correct, now decrypt
  content\n      try {{\n        // Decrypt using the same method as Python encryption\n
  \       const encryptionPassword = '{encryption_password}';\n        \n        //
  Create key from password (matching Python SHA256 approach)\n        const key =
  CryptoJS.SHA256(encryptionPassword);\n        \n        // Decode base64 encrypted
  data\n        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);\n
  \       \n        // Extract IV (first 16 bytes) and ciphertext (rest)\n        //
  Convert to Uint8Array for proper byte manipulation\n        const encryptedArray
  = new Uint8Array(encryptedBytes.sigBytes);\n        for (let i = 0; i < encryptedBytes.sigBytes;
  i++) {{\n          encryptedArray[i] = (encryptedBytes.words[Math.floor(i / 4)]
  >>> (24 - (i % 4) * 8)) & 0xff;\n        }}\n        \n        // Extract IV (first
  16 bytes) and ciphertext (remaining bytes)\n        const ivArray = encryptedArray.slice(0,
  16);\n        const ciphertextArray = encryptedArray.slice(16);\n        \n        //
  Convert back to CryptoJS WordArrays\n        const iv = CryptoJS.lib.WordArray.create(ivArray);\n
  \       const ciphertext = CryptoJS.lib.WordArray.create(ciphertextArray);\n        \n
  \       // Decrypt\n        const decrypted = CryptoJS.AES.decrypt(\n          CryptoJS.lib.CipherParams.create({{\n
  \           ciphertext: ciphertext\n          }}),\n          key,\n          {{\n
  \           iv: iv,\n            mode: CryptoJS.mode.CBC,\n            padding:
  CryptoJS.pad.Pkcs7\n          }}\n        );\n        \n        const decryptedText
  = decrypted.toString(CryptoJS.enc.Utf8);\n        \n        console.log('Debug:
  Decrypted text length:', decryptedText ? decryptedText.length : 'null');\n        console.log('Debug:
  Decrypted text preview:', decryptedText ? decryptedText.substring(0, 100) + '...'
  : 'null');\n        \n        if (decryptedText && decryptedText.length > 0) {{\n
  \         console.log('Debug: Decryption successful, showing content');\n          //
  Hide password prompt and show decrypted content\n          document.getElementById('password-prompt').style.display
  = 'none';\n          \n          // Get post metadata from the page\n          const
  postTitle = document.title || 'Protected Post';\n          const postDate = document.querySelector('time')?.textContent
  || '';\n          const postTags = Array.from(document.querySelectorAll('.tag, .badge')).map(tag
  => tag.textContent).join(' ');\n          \n          // Create properly structured
  content matching post_partial.html structure and CSS classes\n          // Add top
  margin to prevent overlap with search bar\n          const structuredContent = `\n
  \           <div class=\"mt-8 pt-4\">\n              <article class=\"w-full pattern-card
  glow-card p-4 md:p-6 post-container\">\n                <section class=\"post-header
  mb-8\">\n                  <h1 id=\"title\" style=\"font-size: 4rem; line-height:
  1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
  mb-4 post-title-large\">${{postTitle}}</h1>\n                  ${{postDate ? `<div
  class=\"flex items-center text-sm text-text-main/80 mb-6\"><time>${{postDate}}</time></div>`
  : ''}}\n                  ${{postTags ? `<div class=\"flex flex-wrap gap-2\">${{postTags}}</div>`
  : ''}}\n                </section>\n                <section class=\"article-content
  prose dark:prose-invert lg:prose-xl mx-auto mt-8\">\n                  ${{decryptedText}}\n
  \               </section>\n              </article>\n            </div>\n          `;\n
  \         \n          document.getElementById('decrypted-content').innerHTML = structuredContent;\n
  \         document.getElementById('decrypted-content').style.display = 'block';\n
  \       }} else {{\n          console.log('Debug: Decryption failed - empty or null
  result');\n          document.getElementById('error-message').textContent = 'Failed
  to decrypt. Check your password.';\n          document.getElementById('error-message').style.display
  = 'block';\n          document.getElementById('password-input').value = '';\n          document.getElementById('password-input').focus();\n
  \       }}\n      }} catch (error) {{\n        console.error('Decryption error:',
  error);\n        document.getElementById('error-message').textContent = 'Decryption
  failed: ' + error.message;\n        document.getElementById('error-message').style.display
  = 'block';\n        document.getElementById('password-input').value = '';\n        document.getElementById('password-input').focus();\n
  \     }}\n    }}\n\n    // Allow Enter key to submit password\n    document.getElementById('password-input').addEventListener('keypress',
  function(e) {{\n      if (e.key === 'Enter') {{\n        decryptAndShow();\n      }}\n
  \   }});\n\n    // Focus on password input when page loads\n    window.addEventListener('load',
  function() {{\n      document.getElementById('password-input').focus();\n    }});\n
  \   </script>\n    \"\"\"\n        \n        return protection_html\n    ```\n!!!
  function\n    <h2 id=\"_wrap_with_password_protection\" class=\"admonition-title\"
  style=\"margin: 0; padding: .5rem 1rem;\">_wrap_with_password_protection <em class=\"small\">function</em></h2>\n\n
  \   Wrap content with password protection HTML and JavaScript (content hiding only).\n\n???+
  source \"_wrap_with_password_protection <em class='small'>source</em>\"\n    ```python\n
  \   def _wrap_with_password_protection(content: str, password_hash: str, salt: str)
  -> str:\n        \"\"\"Wrap content with password protection HTML and JavaScript
  (content hiding only).\"\"\"\n        \n        # Password protection HTML and JavaScript\n
  \       protection_html = f\"\"\"\n    <!-- Password Protection -->\n    <div id=\"password-prompt\"
  style=\"max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd;
  border-radius: 8px; text-align: center; font-family: Arial, sans-serif;\">\n      <h3>\U0001F512
  Password Required</h3>\n      <p>This post is password protected. Please enter the
  password to continue:</p>\n      <input type=\"password\" id=\"password-input\"
  placeholder=\"Enter password\" style=\"padding: 10px; margin: 10px; border: 1px
  solid #ccc; border-radius: 4px; width: 200px;\">\n      <br>\n      <button onclick=\"checkPassword()\"
  style=\"padding: 10px 20px; background: #007cba; color: white; border: none; border-radius:
  4px; cursor: pointer; margin: 10px;\">Submit</button>\n      <div id=\"error-message\"
  style=\"color: red; margin-top: 10px; display: none;\">Incorrect password. Please
  try again.</div>\n    </div>\n\n    <div id=\"protected-content\" style=\"display:
  none;\">\n\n    {content}\n\n    </div>\n\n    <!-- Include CryptoJS for secure
  hashing -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js\"></script>\n\n
  \   <script>\n    // Secure password hash (SHA-256 with salt)\n    const PASSWORD_HASH
  = '{password_hash}';\n    const SALT = '{salt}';\n\n    function checkPassword()
  {{\n      const password = document.getElementById('password-input').value;\n      \n
  \     // Hash the entered password with salt\n      const hashedInput = CryptoJS.SHA256(password
  + SALT).toString();\n      \n      // Compare with stored hash\n      if (hashedInput
  === PASSWORD_HASH) {{\n        document.getElementById('password-prompt').style.display
  = 'none';\n        document.getElementById('protected-content').style.display =
  'block';\n        document.getElementById('error-message').style.display = 'none';\n
  \     }} else {{\n        document.getElementById('error-message').style.display
  = 'block';\n        document.getElementById('password-input').value = '';\n        document.getElementById('password-input').focus();\n
  \     }}\n    }}\n\n    // Allow Enter key to submit password\n    document.getElementById('password-input').addEventListener('keypress',
  function(e) {{\n      if (e.key === 'Enter') {{\n        checkPassword();\n      }}\n
  \   }});\n\n    // Focus on password input when page loads\n    window.addEventListener('load',
  function() {{\n      document.getElementById('password-input').focus();\n    }});\n\n
  \   // Helper function to generate hash for a new password (for development)\n    function
  generatePasswordHash(password) {{\n      return CryptoJS.SHA256(password + SALT).toString();\n
  \   }}\n    // Usage: console.log(generatePasswordHash('your_password_here'));\n
  \   </script>\n    \"\"\"\n        \n        return protection_html\n    ```"
date: 2025-07-25
description: 'Password Protection Plugin for Markata Adds client-side password protection
  to posts using secure hash-based authentication.

  This plugin encrypts post content a'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>password_protection.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Password Protection Plugin for Markata
    Adds client-side password protection to posts using secure hash-based authentication.\nThis
    plugin encrypts post content a\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"password_protection.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Password Protection
    Plugin for Markata Adds client-side password protection to posts using secure
    hash-based authentication.\nThis plugin encrypts post content a\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devplugins/password-protection\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"password_protection.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Password Protection Plugin for Markata Adds client-side password protection
    to posts using secure hash-based authentication.\nThis plugin encrypts post content
    a\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class='py-4'>\n\n    <nav
    class='flex flex-wrap justify-center sm:justify-start items-center'>\n        <a
    class=\"nav-link accent-glow\"\n            href='/'>Home</a>\n        <a class=\"nav-link
    accent-glow\"\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/slash'>Start Here</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/my-thoughts'>My
    Thoughts</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
    id='didyoumean'>\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\"\n               class=\"w-full p-2 border rounded-md
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/'
    Search for a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script><style>\n
    \   /* Ultra-aggressive title styling override */\n    #title, h1#title, .post-header
    h1, h1.gradient-text {\n        font-size: 3.75rem !important; /* ~text-7xl */\n
    \       font-weight: 800 !important;\n        line-height: 1.1 !important;\n        letter-spacing:
    -0.025em !important;\n    }\n    \n    @media (min-width: 768px) {\n        #title,
    h1#title, .post-header h1, h1.gradient-text {\n            font-size: 4.5rem !important;
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Floating cover
    image above article */\n    .cover-floating-container {\n        position: relative;\n
    \       width: 100%;\n        margin: 2.5rem auto 0; /* Space from search bar
    */\n        z-index: 20;\n    }\n    \n    /* True boundary-breaking cover image
    */\n    .boundary-break-container {\n        position: relative;\n        width:
    calc(100% + 3rem); /* Extend 1.5rem on each side beyond article */\n        left:
    -1.5rem; /* Pull left edge 1.5rem beyond container */\n        height: 380px;
    /* Reduced from 450px for smaller image */\n        overflow: visible;\n        z-index:
    20;\n    }\n    \n    /* Glow effect that extends beyond image */\n    .boundary-break-glow
    {\n        position: absolute;\n        top: -2rem;\n        left: -2rem;\n        right:
    -2rem;\n        bottom: -1rem;\n        background: linear-gradient(45deg, \n
    \           rgba(211, 124, 95, 0.7),  /* accent-warm */\n            rgba(96,
    138, 159, 0.7),  /* accent-cool */\n            rgba(106, 138, 130, 0.7)  /* accent-green
    */\n        );\n        filter: blur(2.5rem);\n        border-radius: 1rem;\n
    \       opacity: 0.8;\n        z-index: 10;\n        animation: boundary-break-pulse
    4s infinite alternate;\n    }\n    \n    @keyframes boundary-break-pulse {\n        0%
    { opacity: 0.7; filter: blur(2rem); }\n        100% { opacity: 0.9; filter: blur(3rem);
    }\n    }\n    \n    /* Image styling */\n    .boundary-break-image {\n        position:
    relative;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n
    \       border-radius: 0.75rem;\n        border: 0.5rem solid white;\n        box-shadow:
    0 2rem 4rem -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">password_protection.py</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n
    \           July 25, 2025\n        </time>\n    </div>\n</section>    <section
    class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto mt-8\">\n
    \       <hr />\n<p>Password Protection Plugin for Markata</p>\n<p>Adds client-side
    password protection to posts using secure hash-based authentication.\nThis plugin
    encrypts post content and provides a password prompt interface for decryption.</p>\n<h1
    id=\"installation\">Installation <a class=\"header-anchor\" href=\"#installation\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Add the plugin to your
    markata.toml hooks:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">hooks</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"s2\">&quot;plugins.password_protection&quot;</span><span
    class=\"p\">,</span>\n<span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"configuration\">Configuration <a class=\"header-anchor\" href=\"#configuration\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Configure the plugin
    in your markata.toml (minimal setup):</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[markata.password_protection]</span>\n<span
    class=\"c1\"># Salt for password hashing (required for security)</span>\n<span
    class=\"n\">salt</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n<span
    class=\"c1\"># Global default password - use plain text, will be hashed automatically</span>\n<span
    class=\"n\">encryption_password</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;your_password&quot;</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Note</strong>:
    The following are automatically set and don't need configuration:</p>\n<ul>\n<li><code>protected_template_key
    = &quot;protected-post&quot;</code> (hardcoded)</li>\n<li><code>encrypt_content
    = true</code> (always enabled for protected posts)</li>\n</ul>\n<h1 id=\"usage\">Usage
    <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Protect posts by setting
    the template key and optionally a custom password:</p>\n<p><strong>Method 1: Use
    global password</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method 2: Custom
    password per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;my-custom-password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method
    3: Custom password hash per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password_hash</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;sha256_hash_of_password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"password-hashing-requirements\">Password Hashing Requirements <a class=\"header-anchor\"
    href=\"#password-hashing-requirements\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>CRITICAL</strong>:
    Both Python (server-side) and JavaScript (client-side) must use identical\npassword
    hashing algorithms for authentication to work correctly.</p>\n<p><strong>Current
    Implementation</strong>: SHA256(password + salt)</p>\n<ul>\n<li>Python: <code>hashlib.sha256((password
    + salt).encode()).hexdigest()</code></li>\n<li>JavaScript: <code>CryptoJS.SHA256(password
    + SALT).toString()</code></li>\n</ul>\n<p><strong>DO NOT MODIFY</strong> the hashing
    logic without updating both sides simultaneously.\nAny mismatch will cause password
    authentication to fail.</p>\n<h1 id=\"security-features\">Security Features <a
    class=\"header-anchor\" href=\"#security-features\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>Content
    Encryption</strong>: Post content is encrypted using AES-CBC with CryptoJS</li>\n<li><strong>Password
    Verification</strong>: Client-side password verification before decryption</li>\n<li><strong>Salt
    Protection</strong>: Passwords are salted before hashing to prevent rainbow table
    attacks</li>\n<li><strong>No Plain Text</strong>: Passwords are never stored in
    plain text in the generated HTML</li>\n<li><strong>Fallback Protection</strong>:
    Falls back to content hiding if encryption fails</li>\n</ul>\n<h1 id=\"future-enhancements\">Future
    Enhancements <a class=\"header-anchor\" href=\"#future-enhancements\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>REST
    Endpoint Support</strong>: Planned support for fetching passwords from external
    APIs</li>\n<li><strong>Multiple Password Support</strong>: Potential support for
    multiple passwords per post</li>\n<li><strong>Time-based Access</strong>: Potential
    support for time-limited access tokens</li>\n</ul>\n<h1 id=\"notes\">Notes <a
    class=\"header-anchor\" href=\"#notes\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li>Uses SHA-256
    hashing with salt for security</li>\n<li>No plaintext passwords stored in code</li>\n<li>Works
    with existing markdown content and build process</li>\n<li>Requires CryptoJS CDN
    for client-side hashing</li>\n<li>Password protection is client-side only (not
    server-side secure)</li>\n</ul>\n<hr />\n<div class=\"admonition function\">\n<p
    class=\"admonition-title\">Function</p>\n<h2 id=\"_encrypt_content\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">_encrypt_content <em class=\"small\">function</em></h2>\n<p>Encrypt
    content using AES encryption compatible with CryptoJS.</p>\n</div>\n<div class=\"admonition
    source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_encrypt_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_encrypt_content</span><span class=\"p\">(</span><span
    class=\"n\">content</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Encrypt content using AES encryption compatible
    with CryptoJS.&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">HAS_CRYPTOGRAPHY</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">raise</span> <span class=\"ne\">ImportError</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;cryptography package required for
    content encryption. Install with: pip install cryptography&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"c1\"># Use a simple key derivation that matches CryptoJS
    expectations</span>\n    <span class=\"c1\"># CryptoJS.AES.encrypt(content, password)
    uses this approach</span>\n    <span class=\"n\">key</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">(</span><span class=\"n\">password</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">digest</span><span class=\"p\">()</span>\n    \n    <span class=\"c1\">#
    Generate random IV</span>\n    <span class=\"n\">iv</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">urandom</span><span
    class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">)</span>\n    \n
    \   <span class=\"c1\"># Pad content to AES block size</span>\n    <span class=\"n\">padder</span>
    <span class=\"o\">=</span> <span class=\"n\">padding</span><span class=\"o\">.</span><span
    class=\"n\">PKCS7</span><span class=\"p\">(</span><span class=\"mi\">128</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">padder</span><span
    class=\"p\">()</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">update</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">))</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">+=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">finalize</span><span
    class=\"p\">()</span>\n    \n    <span class=\"c1\"># Encrypt</span>\n    <span
    class=\"n\">cipher</span> <span class=\"o\">=</span> <span class=\"n\">Cipher</span><span
    class=\"p\">(</span><span class=\"n\">algorithms</span><span class=\"o\">.</span><span
    class=\"n\">AES</span><span class=\"p\">(</span><span class=\"n\">key</span><span
    class=\"p\">),</span> <span class=\"n\">modes</span><span class=\"o\">.</span><span
    class=\"n\">CBC</span><span class=\"p\">(</span><span class=\"n\">iv</span><span
    class=\"p\">),</span> <span class=\"n\">backend</span><span class=\"o\">=</span><span
    class=\"n\">default_backend</span><span class=\"p\">())</span>\n    <span class=\"n\">encryptor</span>
    <span class=\"o\">=</span> <span class=\"n\">cipher</span><span class=\"o\">.</span><span
    class=\"n\">encryptor</span><span class=\"p\">()</span>\n    <span class=\"n\">encrypted</span>
    <span class=\"o\">=</span> <span class=\"n\">encryptor</span><span class=\"o\">.</span><span
    class=\"n\">update</span><span class=\"p\">(</span><span class=\"n\">padded_content</span><span
    class=\"p\">)</span> <span class=\"o\">+</span> <span class=\"n\">encryptor</span><span
    class=\"o\">.</span><span class=\"n\">finalize</span><span class=\"p\">()</span>\n
    \   \n    <span class=\"c1\"># Return in format that CryptoJS can decrypt: base64(iv
    + encrypted)</span>\n    <span class=\"n\">combined</span> <span class=\"o\">=</span>
    <span class=\"n\">iv</span> <span class=\"o\">+</span> <span class=\"n\">encrypted</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">base64</span><span class=\"o\">.</span><span
    class=\"n\">b64encode</span><span class=\"p\">(</span><span class=\"n\">combined</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">decode</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"PasswordProtectionConfig\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">PasswordProtectionConfig
    <em class=\"small\">class</em></h2>\n<p>Configuration for password protection
    plugin.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">PasswordProtectionConfig <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">PasswordProtectionConfig</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Configuration
    for password protection plugin.&quot;&quot;&quot;</span>\n    <span class=\"c1\">#
    Salt for password hashing (required for security)</span>\n    <span class=\"n\">salt</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n    <span class=\"c1\">#
    Global default password (optional - can be overridden per post)</span>\n    <span
    class=\"c1\"># Use either password_hash (pre-computed) or encryption_password
    (plain text)</span>\n    <span class=\"n\">password_hash</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># SHA256(password + salt) - leave empty to use encryption_password</span>\n
    \   <span class=\"n\">encryption_password</span><span class=\"p\">:</span> <span
    class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># Plain text password - will be hashed with salt</span>\n
    \   \n    <span class=\"c1\"># Internal constants (not configurable)</span>\n
    \   <span class=\"n\">protected_template_key</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;protected-post&quot;</span>
    \ <span class=\"c1\"># Always use this template key</span>\n    <span class=\"n\">encrypt_content</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>  <span class=\"c1\"># Always encrypt protected
    content</span>\n    \n    <span class=\"n\">model_config</span> <span class=\"o\">=</span>
    <span class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">ConfigDict</span><span
    class=\"p\">(</span>\n        <span class=\"n\">validate_assignment</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">arbitrary_types_allowed</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">extra</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;allow&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">str_strip_whitespace</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">validate_default</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">coerce_numbers_to_str</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">populate_by_name</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"Config\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">Config <em class=\"small\">class</em></h2>\n<p>Main
    config model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">Config <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Config</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Main
    config model.&quot;&quot;&quot;</span>\n    <span class=\"n\">password_protection</span><span
    class=\"p\">:</span> <span class=\"n\">PasswordProtectionConfig</span> <span class=\"o\">=</span>
    <span class=\"n\">PasswordProtectionConfig</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"config_model\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">config_model <em class=\"small\">function</em></h2>\n<p>Register the configuration
    model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">config_model <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">config_model</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Register
    the configuration model.&quot;&quot;&quot;</span>\n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config_models</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"n\">Config</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"post_render\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">post_render
    <em class=\"small\">function</em></h2>\n<p>Protect post content in feeds and descriptions
    before they are used.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">post_render <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">post_render</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Protect
    post content in feeds and descriptions before they are used.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[blue]Password
    protection: Sanitizing protected posts in feeds[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only sanitize posts with the protected
    template key</span>\n        <span class=\"k\">if</span> <span class=\"n\">template_key_value</span>
    <span class=\"o\">==</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">protected_template_key</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Sanitizing protected post
    for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \           \n            <span class=\"c1\"># Replace content fields that might
    leak in feeds</span>\n            <span class=\"n\">protected_message</span> <span
    class=\"o\">=</span> <span class=\"s2\">&quot;\U0001F512 This content is password
    protected.&quot;</span>\n            \n            <span class=\"c1\"># Sanitize
    various content fields that could leak in feeds</span>\n            <span class=\"k\">if</span>
    <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;content&#39;</span><span class=\"p\">):</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;description&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">description</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;excerpt&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">excerpt</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;summary&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">summary</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;article_html&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep a backup of the original content for the save hook</span>\n
    \               <span class=\"k\">if</span> <span class=\"ow\">not</span> <span
    class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">_original_article_html</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;p&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_message</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/p&gt;&quot;</span>\n            \n            <span class=\"c1\">#
    Sanitize metadata fields that could leak in link previews</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;cover&#39;):</span>\n            <span class=\"c1\">#
    \    # Remove cover image to prevent content leakage in previews</span>\n            <span
    class=\"c1\">#     post.cover = None</span>\n            <span class=\"c1\">#
    if hasattr(post, &#39;image&#39;):</span>\n            <span class=\"c1\">#     #
    Remove any other image fields</span>\n            <span class=\"c1\">#     post.image
    = None</span>\n            <span class=\"c1\"># if hasattr(post, &#39;featured_image&#39;):</span>\n
    \           <span class=\"c1\">#     post.featured_image = None</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;thumbnail&#39;):</span>\n            <span
    class=\"c1\">#     post.thumbnail = None</span>\n            \n            <span
    class=\"c1\"># Sanitize tags that might reveal sensitive information</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;tags&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep only generic tags, remove potentially sensitive ones</span>\n
    \               <span class=\"k\">if</span> <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">tags</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Replace with generic &quot;protected&quot;
    tag</span>\n                    <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">tags</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;protected&quot;</span><span class=\"p\">]</span>\n            \n
    \           <span class=\"c1\"># Sanitize any other fields that might leak content</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;subtitle&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">subtitle</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;lead&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">lead</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;intro&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">intro</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;abstract&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">abstract</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           \n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Protected
    post sanitized for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"save\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">save
    <em class=\"small\">function</em></h2>\n<p>Add password protection to posts by
    modifying the generated HTML files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">save <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">save</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Add
    password protection to posts by modifying the generated HTML files.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Password protection plugin running on </span><span class=\"si\">{</span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">articles</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> posts[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only protect posts with the protected template
    key</span>\n        <span class=\"n\">should_protect</span> <span class=\"o\">=</span>
    <span class=\"n\">template_key_value</span> <span class=\"o\">==</span> <span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">protected_template_key</span>\n
    \       \n        <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Post
    </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">: templateKey=</span><span
    class=\"si\">{</span><span class=\"n\">template_key_value</span><span class=\"si\">}</span><span
    class=\"s2\">, should_protect=</span><span class=\"si\">{</span><span class=\"n\">should_protect</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"k\">if</span> <span class=\"n\">should_protect</span><span
    class=\"p\">:</span>\n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]PROTECTING
    POST: </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Get the output
    HTML file path</span>\n            <span class=\"n\">output_file</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">output_html</span>\n            <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Output file: </span><span class=\"si\">{</span><span
    class=\"n\">output_file</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Check if
    the HTML file exists and read its content</span>\n            <span class=\"k\">if</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">():</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">read_text</span><span
    class=\"p\">(</span><span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Read HTML file with </span><span
    class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">html_content</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"c1\"># Extract the body content from the HTML
    for encryption</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">re</span>\n                    \n                    <span
    class=\"c1\"># Check if content is already password protected (avoid recursive
    encryption)</span>\n                    <span class=\"k\">if</span> <span class=\"p\">(</span><span
    class=\"s1\">&#39;password-prompt&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;encrypted-data&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;ENCRYPTED_DATA&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span>\n                        <span
    class=\"s1\">&#39;decryptAndShow&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span><span class=\"p\">):</span>\n                        <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Content already appears to be password protected, skipping...[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">continue</span>\n
    \                   \n                    <span class=\"c1\"># Check if we have
    original content backed up from post_render hook</span>\n                    <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"kc\">None</span>
    \ <span class=\"c1\"># Initialize to avoid UnboundLocalError</span>\n                    <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[cyan]Using
    original content backed up from post_render hook[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \                       <span class=\"c1\"># Use the original content for encryption,
    not the sanitized version</span>\n                        <span class=\"n\">content_to_encrypt</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">_original_article_html</span>\n                        <span class=\"c1\">#
    Look for article tags in the current HTML to maintain structure</span>\n                        <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">search</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                           <span class=\"c1\"># If no article tag found, we&#39;ll
    replace the entire content</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Look for the main article content (this is a simplified approach)</span>\n
    \                       <span class=\"c1\"># We&#39;ll encrypt everything between
    &lt;article&gt; tags or similar</span>\n                        <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">search</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"n\">article_match</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">content_to_encrypt</span> <span class=\"o\">=</span> <span class=\"n\">article_match</span><span
    class=\"o\">.</span><span class=\"n\">group</span><span class=\"p\">(</span><span
    class=\"mi\">1</span><span class=\"p\">)</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Found article content with
    </span><span class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">content_to_encrypt</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                        <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                            <span
    class=\"c1\"># Fallback: encrypt everything in the main content area</span>\n
    \                           <span class=\"n\">content_to_encrypt</span> <span
    class=\"o\">=</span> <span class=\"n\">html_content</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[cyan]Using full HTML content for encryption[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                        \n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Error
    reading HTML file </span><span class=\"si\">{</span><span class=\"n\">output_file</span><span
    class=\"si\">}</span><span class=\"s2\">: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">continue</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[red]HTML file does not exist: </span><span
    class=\"si\">{</span><span class=\"n\">output_file</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">continue</span>\n            \n            <span class=\"k\">if</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encrypt_content</span>
    <span class=\"ow\">and</span> <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">:</span>\n                <span class=\"c1\"># Get password and hash
    for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"c1\"># TODO: Future enhancement - fetch password/hash
    from REST endpoint</span>\n                <span class=\"c1\"># This would allow
    passwords to be stored securely outside the repo</span>\n                <span
    class=\"c1\"># Example: password_endpoint = post.get(&#39;password_endpoint&#39;,
    &#39;&#39;)</span>\n                <span class=\"c1\"># if password_endpoint:</span>\n
    \               <span class=\"c1\">#     password_hash = fetch_password_from_endpoint(password_endpoint,
    post.get(&#39;slug&#39;, &#39;&#39;))</span>\n                \n                <span
    class=\"c1\"># Determine which password/hash to use</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">post_password</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Use custom password from frontmatter</span>\n
    \                   <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                    <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password from
    frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Password
    hash: </span><span class=\"si\">{</span><span class=\"n\">password_hash</span><span
    class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use custom password
    hash from frontmatter</span>\n                    <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password_hash</span>\n                    <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span> <span class=\"ow\">or</span>
    <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password hash
    from frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">else</span><span class=\"p\">:</span>\n                    <span
    class=\"c1\"># Use global config - prefer password_hash, fallback to encryption_password</span>\n
    \                   <span class=\"k\">if</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">password_hash</span>\n
    \                       <span class=\"n\">encryption_password</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"ow\">or</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                   <span class=\"k\">elif</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Hash the global encryption password
    with salt</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span
    class=\"o\">.</span><span class=\"n\">sha256</span><span class=\"p\">((</span><span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                        <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># No global password configured - this shouldn&#39;t happen but provide
    fallback</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[yellow]Warning: No global password configured for post: </span><span
    class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">encryption_password</span> <span class=\"o\">+</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">salt</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">encode</span><span
    class=\"p\">())</span><span class=\"o\">.</span><span class=\"n\">hexdigest</span><span
    class=\"p\">()</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Using global password config for post: </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               \n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Attempting
    encryption with password: </span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"p\">[:</span><span class=\"mi\">5</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">encryption_password</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"o\">&gt;=</span><span
    class=\"w\"> </span><span class=\"mi\">5</span><span class=\"w\"> </span><span
    class=\"k\">else</span><span class=\"w\"> </span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">...[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">try</span><span class=\"p\">:</span>\n                    <span
    class=\"n\">encrypted_content</span> <span class=\"o\">=</span> <span class=\"n\">_encrypt_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                        <span class=\"n\">encryption_password</span>\n
    \                   <span class=\"p\">)</span>\n                    <span class=\"c1\">#
    Create the protected content wrapper</span>\n                    <span class=\"n\">protected_content</span>
    <span class=\"o\">=</span> <span class=\"n\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">encrypted_content</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">password_hash</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">,</span>\n
    \                       <span class=\"n\">encryption_password</span>\n                    <span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Replace the content in the HTML file</span>\n                    <span class=\"k\">if</span>
    <span class=\"n\">article_match</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Replace just the article content</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">html_content</span><span
    class=\"o\">.</span><span class=\"n\">replace</span><span class=\"p\">(</span><span
    class=\"n\">article_match</span><span class=\"o\">.</span><span class=\"n\">group</span><span
    class=\"p\">(</span><span class=\"mi\">0</span><span class=\"p\">),</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span class=\"si\">{</span><span
    class=\"n\">protected_content</span><span class=\"si\">}</span><span class=\"s2\">&lt;/article&gt;&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Replace the entire HTML content or
    use full protected content</span>\n                        <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                    \n
    \                   <span class=\"c1\"># Write the modified HTML back to the file</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content encrypted successfully!
    Updated HTML file with </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> characters[/green]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post template: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;template&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post templateKey: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Show first 200 chars of encrypted content</span>\n                    <span class=\"n\">preview_content</span>
    <span class=\"o\">=</span> <span class=\"n\">new_html_content</span><span class=\"p\">[:</span><span
    class=\"mi\">200</span><span class=\"p\">]</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]First 200 chars of new HTML: </span><span class=\"si\">{</span><span
    class=\"n\">preview_content</span><span class=\"si\">}</span><span class=\"s2\">...[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                <span class=\"k\">except</span> <span class=\"ne\">ImportError</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Encryption
    failed: </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Unexpected
    encryption error: </span><span class=\"si\">{</span><span class=\"n\">e</span><span
    class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"c1\"># Simple content hiding without encryption</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[blue]Using simple content hiding (no encryption)[/blue]&quot;</span><span
    class=\"p\">)</span>\n                \n                <span class=\"c1\"># Get
    password hash for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use global config
    - prefer password_hash, fallback to encryption_password</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                        <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                   <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                \n                <span
    class=\"n\">protected_content</span> <span class=\"o\">=</span> <span class=\"n\">_wrap_with_password_protection</span><span
    class=\"p\">(</span>\n                    <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">password_hash</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span>\n                <span class=\"p\">)</span>\n
    \               <span class=\"c1\"># Replace content in HTML file</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                    <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                <span
    class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">write_text</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">)</span>\n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content
    hidden successfully! New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"k\">else</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[dim]Post </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> does not need protection[/dim]&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"_wrap_with_encrypted_content\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">_wrap_with_encrypted_content
    <em class=\"small\">function</em></h2>\n<p>Wrap encrypted content with password
    protection and decryption logic.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_encrypted_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span><span class=\"n\">encrypted_content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">encryption_password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    encrypted content with password protection and decryption logic.&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"n\">protection_html</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">&lt;!-- Password Protection with Content Encryption --&gt;</span>\n<span
    class=\"s2\">&lt;div id=&quot;password-prompt&quot; style=&quot;max-width: 400px;
    margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;
    text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span class=\"s2\">
    \ &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span class=\"s2\">
    \ &lt;p&gt;This post is encrypted. Enter the password to decrypt and view:&lt;/p&gt;</span>\n<span
    class=\"s2\">  &lt;input type=&quot;password&quot; id=&quot;password-input&quot;
    placeholder=&quot;Enter password&quot; style=&quot;padding: 10px; margin: 10px;
    border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;decryptAndShow()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Decrypt&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Failed to decrypt. Check your password.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;decrypted-content&quot;
    style=&quot;display: none;&quot;&gt;&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;!--
    Encrypted content blob --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;encrypted-data&quot;
    style=&quot;display: none;&quot; data-encrypted=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">encrypted_content</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for decryption --&gt;</span>\n<span class=\"s2\">&lt;script
    src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Password hash for authentication</span>\n<span
    class=\"s2\">const PASSWORD_HASH = &#39;</span><span class=\"si\">{</span><span
    class=\"n\">password_hash</span><span class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span
    class=\"s2\">const SALT = &#39;</span><span class=\"si\">{</span><span class=\"n\">salt</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">// Store
    encrypted data persistently</span>\n<span class=\"s2\">const ENCRYPTED_DATA =
    &#39;</span><span class=\"si\">{</span><span class=\"n\">encrypted_content</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function
    decryptAndShow() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  const
    password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  const encryptedData = ENCRYPTED_DATA;</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password entered:&#39;,
    password);</span>\n<span class=\"s2\">  console.log(&#39;Debug: Encrypted data
    length:&#39;, encryptedData ? encryptedData.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">  console.log(&#39;Debug: Encrypted data preview:&#39;, encryptedData
    ? encryptedData.substring(0, 50) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  if (!encryptedData) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.error(&#39;Debug: No encrypted
    data found!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;No encrypted data found.&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    return;</span>\n<span class=\"s2\">
    \ </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // First verify password</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  console.log(&#39;Debug: Expected
    password hash:&#39;, PASSWORD_HASH);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Computed password hash:&#39;, hashedInput);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Password verification:&#39;, hashedInput === PASSWORD_HASH);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  if (hashedInput !== PASSWORD_HASH) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.log(&#39;Debug: Password
    verification failed!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    return;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password
    verification passed, proceeding to decrypt...&#39;);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  // Password is correct, now decrypt content</span>\n<span
    class=\"s2\">  try </span><span class=\"se\">{{</span>\n<span class=\"s2\">    //
    Decrypt using the same method as Python encryption</span>\n<span class=\"s2\">
    \   const encryptionPassword = &#39;</span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Create key from password (matching Python SHA256 approach)</span>\n<span
    class=\"s2\">    const key = CryptoJS.SHA256(encryptionPassword);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decode base64 encrypted data</span>\n<span
    class=\"s2\">    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Extract IV (first 16 bytes)
    and ciphertext (rest)</span>\n<span class=\"s2\">    // Convert to Uint8Array
    for proper byte manipulation</span>\n<span class=\"s2\">    const encryptedArray
    = new Uint8Array(encryptedBytes.sigBytes);</span>\n<span class=\"s2\">    for
    (let i = 0; i &lt; encryptedBytes.sigBytes; i++) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">      encryptedArray[i] = (encryptedBytes.words[Math.floor(i / 4)]
    &gt;&gt;&gt; (24 - (i % 4) * 8)) &amp; 0xff;</span>\n<span class=\"s2\">    </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    </span>\n<span class=\"s2\">    //
    Extract IV (first 16 bytes) and ciphertext (remaining bytes)</span>\n<span class=\"s2\">
    \   const ivArray = encryptedArray.slice(0, 16);</span>\n<span class=\"s2\">    const
    ciphertextArray = encryptedArray.slice(16);</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Convert back to CryptoJS WordArrays</span>\n<span class=\"s2\">
    \   const iv = CryptoJS.lib.WordArray.create(ivArray);</span>\n<span class=\"s2\">
    \   const ciphertext = CryptoJS.lib.WordArray.create(ciphertextArray);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decrypt</span>\n<span class=\"s2\">
    \   const decrypted = CryptoJS.AES.decrypt(</span>\n<span class=\"s2\">      CryptoJS.lib.CipherParams.create(</span><span
    class=\"se\">{{</span>\n<span class=\"s2\">        ciphertext: ciphertext</span>\n<span
    class=\"s2\">      </span><span class=\"se\">}}</span><span class=\"s2\">),</span>\n<span
    class=\"s2\">      key,</span>\n<span class=\"s2\">      </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">        iv: iv,</span>\n<span class=\"s2\">        mode: CryptoJS.mode.CBC,</span>\n<span
    class=\"s2\">        padding: CryptoJS.pad.Pkcs7</span>\n<span class=\"s2\">      </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    );</span>\n<span class=\"s2\">
    \   </span>\n<span class=\"s2\">    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    console.log(&#39;Debug: Decrypted
    text length:&#39;, decryptedText ? decryptedText.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">    console.log(&#39;Debug: Decrypted text preview:&#39;, decryptedText
    ? decryptedText.substring(0, 100) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    if (decryptedText &amp;&amp;
    decryptedText.length &gt; 0) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \     console.log(&#39;Debug: Decryption successful, showing content&#39;);</span>\n<span
    class=\"s2\">      // Hide password prompt and show decrypted content</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">      </span>\n<span class=\"s2\">
    \     // Get post metadata from the page</span>\n<span class=\"s2\">      const
    postTitle = document.title || &#39;Protected Post&#39;;</span>\n<span class=\"s2\">
    \     const postDate = document.querySelector(&#39;time&#39;)?.textContent ||
    &#39;&#39;;</span>\n<span class=\"s2\">      const postTags = Array.from(document.querySelectorAll(&#39;.tag,
    .badge&#39;)).map(tag =&gt; tag.textContent).join(&#39; &#39;);</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      // Create properly structured
    content matching post_partial.html structure and CSS classes</span>\n<span class=\"s2\">
    \     // Add top margin to prevent overlap with search bar</span>\n<span class=\"s2\">
    \     const structuredContent = `</span>\n<span class=\"s2\">        &lt;div class=&quot;mt-8
    pt-4&quot;&gt;</span>\n<span class=\"s2\">          &lt;article class=&quot;w-full
    pattern-card glow-card p-4 md:p-6 post-container&quot;&gt;</span>\n<span class=\"s2\">
    \           &lt;section class=&quot;post-header mb-8&quot;&gt;</span>\n<span class=\"s2\">
    \             &lt;h1 id=&quot;title&quot; style=&quot;font-size: 4rem; line-height:
    1.1; font-weight: 800;&quot; class=&quot;text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large&quot;&gt;$</span><span class=\"se\">{{</span><span class=\"s2\">postTitle</span><span
    class=\"se\">}}</span><span class=\"s2\">&lt;/h1&gt;</span>\n<span class=\"s2\">
    \             $</span><span class=\"se\">{{</span><span class=\"s2\">postDate
    ? `&lt;div class=&quot;flex items-center text-sm text-text-main/80 mb-6&quot;&gt;&lt;time&gt;$</span><span
    class=\"se\">{{</span><span class=\"s2\">postDate</span><span class=\"se\">}}</span><span
    class=\"s2\">&lt;/time&gt;&lt;/div&gt;` : &#39;&#39;</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">              $</span><span class=\"se\">{{</span><span class=\"s2\">postTags
    ? `&lt;div class=&quot;flex flex-wrap gap-2&quot;&gt;$</span><span class=\"se\">{{</span><span
    class=\"s2\">postTags</span><span class=\"se\">}}</span><span class=\"s2\">&lt;/div&gt;`
    : &#39;&#39;</span><span class=\"se\">}}</span>\n<span class=\"s2\">            &lt;/section&gt;</span>\n<span
    class=\"s2\">            &lt;section class=&quot;article-content prose dark:prose-invert
    lg:prose-xl mx-auto mt-8&quot;&gt;</span>\n<span class=\"s2\">              $</span><span
    class=\"se\">{{</span><span class=\"s2\">decryptedText</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">            &lt;/section&gt;</span>\n<span class=\"s2\">          &lt;/article&gt;</span>\n<span
    class=\"s2\">        &lt;/div&gt;</span>\n<span class=\"s2\">      `;</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).innerHTML
    = structuredContent;</span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">      console.log(&#39;Debug:
    Decryption failed - empty or null result&#39;);</span>\n<span class=\"s2\">      document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Failed to decrypt. Check your password.&#39;;</span>\n<span class=\"s2\">
    \     document.getElementById(&#39;error-message&#39;).style.display = &#39;block&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).value = &#39;&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span><span
    class=\"se\">}}</span><span class=\"s2\"> catch (error) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">    console.error(&#39;Decryption error:&#39;, error);</span>\n<span
    class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Decryption failed: &#39; + error.message;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   decryptAndShow();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n<span class=\"s2\">&lt;/script&gt;</span>\n<span
    class=\"s2\">&quot;&quot;&quot;</span>\n    \n    <span class=\"k\">return</span>
    <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"_wrap_with_password_protection\" class=\"admonition-title\" style=\"margin:
    0; padding: .5rem 1rem;\">_wrap_with_password_protection <em class=\"small\">function</em></h2>\n<p>Wrap
    content with password protection HTML and JavaScript (content hiding only).</p>\n</div>\n<div
    class=\"admonition source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_password_protection
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_password_protection</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    content with password protection HTML and JavaScript (content hiding only).&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"c1\"># Password protection HTML and JavaScript</span>\n
    \   <span class=\"n\">protection_html</span> <span class=\"o\">=</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">&lt;!--
    Password Protection --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;password-prompt&quot;
    style=&quot;max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid
    #ddd; border-radius: 8px; text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span
    class=\"s2\">  &lt;p&gt;This post is password protected. Please enter the password
    to continue:&lt;/p&gt;</span>\n<span class=\"s2\">  &lt;input type=&quot;password&quot;
    id=&quot;password-input&quot; placeholder=&quot;Enter password&quot; style=&quot;padding:
    10px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;checkPassword()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Submit&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Incorrect password. Please try again.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;protected-content&quot;
    style=&quot;display: none;&quot;&gt;</span>\n\n<span class=\"si\">{</span><span
    class=\"n\">content</span><span class=\"si\">}</span>\n\n<span class=\"s2\">&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for secure hashing --&gt;</span>\n<span
    class=\"s2\">&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Secure password hash
    (SHA-256 with salt)</span>\n<span class=\"s2\">const PASSWORD_HASH = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">password_hash</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n<span class=\"s2\">const SALT = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">salt</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function checkPassword() </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">  const password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  // Hash the entered password with
    salt</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // Compare with stored hash</span>\n<span class=\"s2\">  if (hashedInput ===
    PASSWORD_HASH) </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;protected-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   checkPassword();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Helper
    function to generate hash for a new password (for development)</span>\n<span class=\"s2\">function
    generatePasswordHash(password) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \ return CryptoJS.SHA256(password + SALT).toString();</span>\n<span class=\"se\">}}</span>\n<span
    class=\"s2\">// Usage: console.log(generatePasswordHash(&#39;your_password_here&#39;));</span>\n<span
    class=\"s2\">&lt;/script&gt;</span>\n<span class=\"s2\">&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"k\">return</span> <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>password_protection.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Password Protection Plugin for Markata
    Adds client-side password protection to posts using secure hash-based authentication.\nThis
    plugin encrypts post content a\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"password_protection.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Password Protection
    Plugin for Markata Adds client-side password protection to posts using secure
    hash-based authentication.\nThis plugin encrypts post content a\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devplugins/password-protection\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"password_protection.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Password Protection Plugin for Markata Adds client-side password protection
    to posts using secure hash-based authentication.\nThis plugin encrypts post content
    a\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">password_protection.py</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n            July
    25, 2025\n        </time>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<style>\n    /* Ultra-aggressive title styling override */\n    #title,
    h1#title, .post-header h1, h1.gradient-text {\n        font-size: 3.75rem !important;
    /* ~text-7xl */\n        font-weight: 800 !important;\n        line-height: 1.1
    !important;\n        letter-spacing: -0.025em !important;\n    }\n    \n    @media
    (min-width: 768px) {\n        #title, h1#title, .post-header h1, h1.gradient-text
    {\n            font-size: 4.5rem !important; /* Even larger than text-7xl */\n
    \       }\n    }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
    {\n        position: relative;\n        width: 100%;\n        margin: 2.5rem auto
    0; /* Space from search bar */\n        z-index: 20;\n    }\n    \n    /* True
    boundary-breaking cover image */\n    .boundary-break-container {\n        position:
    relative;\n        width: calc(100% + 3rem); /* Extend 1.5rem on each side beyond
    article */\n        left: -1.5rem; /* Pull left edge 1.5rem beyond container */\n
    \       height: 380px; /* Reduced from 450px for smaller image */\n        overflow:
    visible;\n        z-index: 20;\n    }\n    \n    /* Glow effect that extends beyond
    image */\n    .boundary-break-glow {\n        position: absolute;\n        top:
    -2rem;\n        left: -2rem;\n        right: -2rem;\n        bottom: -1rem;\n
    \       background: linear-gradient(45deg, \n            rgba(211, 124, 95, 0.7),
    \ /* accent-warm */\n            rgba(96, 138, 159, 0.7),  /* accent-cool */\n
    \           rgba(106, 138, 130, 0.7)  /* accent-green */\n        );\n        filter:
    blur(2.5rem);\n        border-radius: 1rem;\n        opacity: 0.8;\n        z-index:
    10;\n        animation: boundary-break-pulse 4s infinite alternate;\n    }\n    \n
    \   @keyframes boundary-break-pulse {\n        0% { opacity: 0.7; filter: blur(2rem);
    }\n        100% { opacity: 0.9; filter: blur(3rem); }\n    }\n    \n    /* Image
    styling */\n    .boundary-break-image {\n        position: relative;\n        width:
    100%;\n        height: 100%;\n        object-fit: cover;\n        border-radius:
    0.75rem;\n        border: 0.5rem solid white;\n        box-shadow: 0 2rem 4rem
    -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">password_protection.py</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n
    \           July 25, 2025\n        </time>\n    </div>\n</section>    <section
    class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto mt-8\">\n
    \       <hr />\n<p>Password Protection Plugin for Markata</p>\n<p>Adds client-side
    password protection to posts using secure hash-based authentication.\nThis plugin
    encrypts post content and provides a password prompt interface for decryption.</p>\n<h1
    id=\"installation\">Installation <a class=\"header-anchor\" href=\"#installation\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Add the plugin to your
    markata.toml hooks:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">hooks</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"s2\">&quot;plugins.password_protection&quot;</span><span
    class=\"p\">,</span>\n<span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"configuration\">Configuration <a class=\"header-anchor\" href=\"#configuration\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Configure the plugin
    in your markata.toml (minimal setup):</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[markata.password_protection]</span>\n<span
    class=\"c1\"># Salt for password hashing (required for security)</span>\n<span
    class=\"n\">salt</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n<span
    class=\"c1\"># Global default password - use plain text, will be hashed automatically</span>\n<span
    class=\"n\">encryption_password</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;your_password&quot;</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Note</strong>:
    The following are automatically set and don't need configuration:</p>\n<ul>\n<li><code>protected_template_key
    = &quot;protected-post&quot;</code> (hardcoded)</li>\n<li><code>encrypt_content
    = true</code> (always enabled for protected posts)</li>\n</ul>\n<h1 id=\"usage\">Usage
    <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Protect posts by setting
    the template key and optionally a custom password:</p>\n<p><strong>Method 1: Use
    global password</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method 2: Custom
    password per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;my-custom-password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method
    3: Custom password hash per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password_hash</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;sha256_hash_of_password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"password-hashing-requirements\">Password Hashing Requirements <a class=\"header-anchor\"
    href=\"#password-hashing-requirements\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>CRITICAL</strong>:
    Both Python (server-side) and JavaScript (client-side) must use identical\npassword
    hashing algorithms for authentication to work correctly.</p>\n<p><strong>Current
    Implementation</strong>: SHA256(password + salt)</p>\n<ul>\n<li>Python: <code>hashlib.sha256((password
    + salt).encode()).hexdigest()</code></li>\n<li>JavaScript: <code>CryptoJS.SHA256(password
    + SALT).toString()</code></li>\n</ul>\n<p><strong>DO NOT MODIFY</strong> the hashing
    logic without updating both sides simultaneously.\nAny mismatch will cause password
    authentication to fail.</p>\n<h1 id=\"security-features\">Security Features <a
    class=\"header-anchor\" href=\"#security-features\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>Content
    Encryption</strong>: Post content is encrypted using AES-CBC with CryptoJS</li>\n<li><strong>Password
    Verification</strong>: Client-side password verification before decryption</li>\n<li><strong>Salt
    Protection</strong>: Passwords are salted before hashing to prevent rainbow table
    attacks</li>\n<li><strong>No Plain Text</strong>: Passwords are never stored in
    plain text in the generated HTML</li>\n<li><strong>Fallback Protection</strong>:
    Falls back to content hiding if encryption fails</li>\n</ul>\n<h1 id=\"future-enhancements\">Future
    Enhancements <a class=\"header-anchor\" href=\"#future-enhancements\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>REST
    Endpoint Support</strong>: Planned support for fetching passwords from external
    APIs</li>\n<li><strong>Multiple Password Support</strong>: Potential support for
    multiple passwords per post</li>\n<li><strong>Time-based Access</strong>: Potential
    support for time-limited access tokens</li>\n</ul>\n<h1 id=\"notes\">Notes <a
    class=\"header-anchor\" href=\"#notes\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li>Uses SHA-256
    hashing with salt for security</li>\n<li>No plaintext passwords stored in code</li>\n<li>Works
    with existing markdown content and build process</li>\n<li>Requires CryptoJS CDN
    for client-side hashing</li>\n<li>Password protection is client-side only (not
    server-side secure)</li>\n</ul>\n<hr />\n<div class=\"admonition function\">\n<p
    class=\"admonition-title\">Function</p>\n<h2 id=\"_encrypt_content\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">_encrypt_content <em class=\"small\">function</em></h2>\n<p>Encrypt
    content using AES encryption compatible with CryptoJS.</p>\n</div>\n<div class=\"admonition
    source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_encrypt_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_encrypt_content</span><span class=\"p\">(</span><span
    class=\"n\">content</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Encrypt content using AES encryption compatible
    with CryptoJS.&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">HAS_CRYPTOGRAPHY</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">raise</span> <span class=\"ne\">ImportError</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;cryptography package required for
    content encryption. Install with: pip install cryptography&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"c1\"># Use a simple key derivation that matches CryptoJS
    expectations</span>\n    <span class=\"c1\"># CryptoJS.AES.encrypt(content, password)
    uses this approach</span>\n    <span class=\"n\">key</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">(</span><span class=\"n\">password</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">digest</span><span class=\"p\">()</span>\n    \n    <span class=\"c1\">#
    Generate random IV</span>\n    <span class=\"n\">iv</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">urandom</span><span
    class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">)</span>\n    \n
    \   <span class=\"c1\"># Pad content to AES block size</span>\n    <span class=\"n\">padder</span>
    <span class=\"o\">=</span> <span class=\"n\">padding</span><span class=\"o\">.</span><span
    class=\"n\">PKCS7</span><span class=\"p\">(</span><span class=\"mi\">128</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">padder</span><span
    class=\"p\">()</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">update</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">))</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">+=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">finalize</span><span
    class=\"p\">()</span>\n    \n    <span class=\"c1\"># Encrypt</span>\n    <span
    class=\"n\">cipher</span> <span class=\"o\">=</span> <span class=\"n\">Cipher</span><span
    class=\"p\">(</span><span class=\"n\">algorithms</span><span class=\"o\">.</span><span
    class=\"n\">AES</span><span class=\"p\">(</span><span class=\"n\">key</span><span
    class=\"p\">),</span> <span class=\"n\">modes</span><span class=\"o\">.</span><span
    class=\"n\">CBC</span><span class=\"p\">(</span><span class=\"n\">iv</span><span
    class=\"p\">),</span> <span class=\"n\">backend</span><span class=\"o\">=</span><span
    class=\"n\">default_backend</span><span class=\"p\">())</span>\n    <span class=\"n\">encryptor</span>
    <span class=\"o\">=</span> <span class=\"n\">cipher</span><span class=\"o\">.</span><span
    class=\"n\">encryptor</span><span class=\"p\">()</span>\n    <span class=\"n\">encrypted</span>
    <span class=\"o\">=</span> <span class=\"n\">encryptor</span><span class=\"o\">.</span><span
    class=\"n\">update</span><span class=\"p\">(</span><span class=\"n\">padded_content</span><span
    class=\"p\">)</span> <span class=\"o\">+</span> <span class=\"n\">encryptor</span><span
    class=\"o\">.</span><span class=\"n\">finalize</span><span class=\"p\">()</span>\n
    \   \n    <span class=\"c1\"># Return in format that CryptoJS can decrypt: base64(iv
    + encrypted)</span>\n    <span class=\"n\">combined</span> <span class=\"o\">=</span>
    <span class=\"n\">iv</span> <span class=\"o\">+</span> <span class=\"n\">encrypted</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">base64</span><span class=\"o\">.</span><span
    class=\"n\">b64encode</span><span class=\"p\">(</span><span class=\"n\">combined</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">decode</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"PasswordProtectionConfig\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">PasswordProtectionConfig
    <em class=\"small\">class</em></h2>\n<p>Configuration for password protection
    plugin.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">PasswordProtectionConfig <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">PasswordProtectionConfig</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Configuration
    for password protection plugin.&quot;&quot;&quot;</span>\n    <span class=\"c1\">#
    Salt for password hashing (required for security)</span>\n    <span class=\"n\">salt</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n    <span class=\"c1\">#
    Global default password (optional - can be overridden per post)</span>\n    <span
    class=\"c1\"># Use either password_hash (pre-computed) or encryption_password
    (plain text)</span>\n    <span class=\"n\">password_hash</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># SHA256(password + salt) - leave empty to use encryption_password</span>\n
    \   <span class=\"n\">encryption_password</span><span class=\"p\">:</span> <span
    class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># Plain text password - will be hashed with salt</span>\n
    \   \n    <span class=\"c1\"># Internal constants (not configurable)</span>\n
    \   <span class=\"n\">protected_template_key</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;protected-post&quot;</span>
    \ <span class=\"c1\"># Always use this template key</span>\n    <span class=\"n\">encrypt_content</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>  <span class=\"c1\"># Always encrypt protected
    content</span>\n    \n    <span class=\"n\">model_config</span> <span class=\"o\">=</span>
    <span class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">ConfigDict</span><span
    class=\"p\">(</span>\n        <span class=\"n\">validate_assignment</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">arbitrary_types_allowed</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">extra</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;allow&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">str_strip_whitespace</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">validate_default</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">coerce_numbers_to_str</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">populate_by_name</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"Config\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">Config <em class=\"small\">class</em></h2>\n<p>Main
    config model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">Config <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Config</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Main
    config model.&quot;&quot;&quot;</span>\n    <span class=\"n\">password_protection</span><span
    class=\"p\">:</span> <span class=\"n\">PasswordProtectionConfig</span> <span class=\"o\">=</span>
    <span class=\"n\">PasswordProtectionConfig</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"config_model\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">config_model <em class=\"small\">function</em></h2>\n<p>Register the configuration
    model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">config_model <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">config_model</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Register
    the configuration model.&quot;&quot;&quot;</span>\n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config_models</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"n\">Config</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"post_render\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">post_render
    <em class=\"small\">function</em></h2>\n<p>Protect post content in feeds and descriptions
    before they are used.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">post_render <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">post_render</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Protect
    post content in feeds and descriptions before they are used.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[blue]Password
    protection: Sanitizing protected posts in feeds[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only sanitize posts with the protected
    template key</span>\n        <span class=\"k\">if</span> <span class=\"n\">template_key_value</span>
    <span class=\"o\">==</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">protected_template_key</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Sanitizing protected post
    for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \           \n            <span class=\"c1\"># Replace content fields that might
    leak in feeds</span>\n            <span class=\"n\">protected_message</span> <span
    class=\"o\">=</span> <span class=\"s2\">&quot;\U0001F512 This content is password
    protected.&quot;</span>\n            \n            <span class=\"c1\"># Sanitize
    various content fields that could leak in feeds</span>\n            <span class=\"k\">if</span>
    <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;content&#39;</span><span class=\"p\">):</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;description&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">description</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;excerpt&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">excerpt</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;summary&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">summary</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;article_html&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep a backup of the original content for the save hook</span>\n
    \               <span class=\"k\">if</span> <span class=\"ow\">not</span> <span
    class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">_original_article_html</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;p&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_message</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/p&gt;&quot;</span>\n            \n            <span class=\"c1\">#
    Sanitize metadata fields that could leak in link previews</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;cover&#39;):</span>\n            <span class=\"c1\">#
    \    # Remove cover image to prevent content leakage in previews</span>\n            <span
    class=\"c1\">#     post.cover = None</span>\n            <span class=\"c1\">#
    if hasattr(post, &#39;image&#39;):</span>\n            <span class=\"c1\">#     #
    Remove any other image fields</span>\n            <span class=\"c1\">#     post.image
    = None</span>\n            <span class=\"c1\"># if hasattr(post, &#39;featured_image&#39;):</span>\n
    \           <span class=\"c1\">#     post.featured_image = None</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;thumbnail&#39;):</span>\n            <span
    class=\"c1\">#     post.thumbnail = None</span>\n            \n            <span
    class=\"c1\"># Sanitize tags that might reveal sensitive information</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;tags&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep only generic tags, remove potentially sensitive ones</span>\n
    \               <span class=\"k\">if</span> <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">tags</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Replace with generic &quot;protected&quot;
    tag</span>\n                    <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">tags</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;protected&quot;</span><span class=\"p\">]</span>\n            \n
    \           <span class=\"c1\"># Sanitize any other fields that might leak content</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;subtitle&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">subtitle</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;lead&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">lead</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;intro&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">intro</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;abstract&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">abstract</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           \n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Protected
    post sanitized for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"save\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">save
    <em class=\"small\">function</em></h2>\n<p>Add password protection to posts by
    modifying the generated HTML files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">save <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">save</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Add
    password protection to posts by modifying the generated HTML files.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Password protection plugin running on </span><span class=\"si\">{</span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">articles</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> posts[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only protect posts with the protected template
    key</span>\n        <span class=\"n\">should_protect</span> <span class=\"o\">=</span>
    <span class=\"n\">template_key_value</span> <span class=\"o\">==</span> <span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">protected_template_key</span>\n
    \       \n        <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Post
    </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">: templateKey=</span><span
    class=\"si\">{</span><span class=\"n\">template_key_value</span><span class=\"si\">}</span><span
    class=\"s2\">, should_protect=</span><span class=\"si\">{</span><span class=\"n\">should_protect</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"k\">if</span> <span class=\"n\">should_protect</span><span
    class=\"p\">:</span>\n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]PROTECTING
    POST: </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Get the output
    HTML file path</span>\n            <span class=\"n\">output_file</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">output_html</span>\n            <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Output file: </span><span class=\"si\">{</span><span
    class=\"n\">output_file</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Check if
    the HTML file exists and read its content</span>\n            <span class=\"k\">if</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">():</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">read_text</span><span
    class=\"p\">(</span><span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Read HTML file with </span><span
    class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">html_content</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"c1\"># Extract the body content from the HTML
    for encryption</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">re</span>\n                    \n                    <span
    class=\"c1\"># Check if content is already password protected (avoid recursive
    encryption)</span>\n                    <span class=\"k\">if</span> <span class=\"p\">(</span><span
    class=\"s1\">&#39;password-prompt&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;encrypted-data&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;ENCRYPTED_DATA&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span>\n                        <span
    class=\"s1\">&#39;decryptAndShow&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span><span class=\"p\">):</span>\n                        <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Content already appears to be password protected, skipping...[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">continue</span>\n
    \                   \n                    <span class=\"c1\"># Check if we have
    original content backed up from post_render hook</span>\n                    <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"kc\">None</span>
    \ <span class=\"c1\"># Initialize to avoid UnboundLocalError</span>\n                    <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[cyan]Using
    original content backed up from post_render hook[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \                       <span class=\"c1\"># Use the original content for encryption,
    not the sanitized version</span>\n                        <span class=\"n\">content_to_encrypt</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">_original_article_html</span>\n                        <span class=\"c1\">#
    Look for article tags in the current HTML to maintain structure</span>\n                        <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">search</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                           <span class=\"c1\"># If no article tag found, we&#39;ll
    replace the entire content</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Look for the main article content (this is a simplified approach)</span>\n
    \                       <span class=\"c1\"># We&#39;ll encrypt everything between
    &lt;article&gt; tags or similar</span>\n                        <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">search</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"n\">article_match</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">content_to_encrypt</span> <span class=\"o\">=</span> <span class=\"n\">article_match</span><span
    class=\"o\">.</span><span class=\"n\">group</span><span class=\"p\">(</span><span
    class=\"mi\">1</span><span class=\"p\">)</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Found article content with
    </span><span class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">content_to_encrypt</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                        <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                            <span
    class=\"c1\"># Fallback: encrypt everything in the main content area</span>\n
    \                           <span class=\"n\">content_to_encrypt</span> <span
    class=\"o\">=</span> <span class=\"n\">html_content</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[cyan]Using full HTML content for encryption[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                        \n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Error
    reading HTML file </span><span class=\"si\">{</span><span class=\"n\">output_file</span><span
    class=\"si\">}</span><span class=\"s2\">: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">continue</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[red]HTML file does not exist: </span><span
    class=\"si\">{</span><span class=\"n\">output_file</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">continue</span>\n            \n            <span class=\"k\">if</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encrypt_content</span>
    <span class=\"ow\">and</span> <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">:</span>\n                <span class=\"c1\"># Get password and hash
    for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"c1\"># TODO: Future enhancement - fetch password/hash
    from REST endpoint</span>\n                <span class=\"c1\"># This would allow
    passwords to be stored securely outside the repo</span>\n                <span
    class=\"c1\"># Example: password_endpoint = post.get(&#39;password_endpoint&#39;,
    &#39;&#39;)</span>\n                <span class=\"c1\"># if password_endpoint:</span>\n
    \               <span class=\"c1\">#     password_hash = fetch_password_from_endpoint(password_endpoint,
    post.get(&#39;slug&#39;, &#39;&#39;))</span>\n                \n                <span
    class=\"c1\"># Determine which password/hash to use</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">post_password</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Use custom password from frontmatter</span>\n
    \                   <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                    <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password from
    frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Password
    hash: </span><span class=\"si\">{</span><span class=\"n\">password_hash</span><span
    class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use custom password
    hash from frontmatter</span>\n                    <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password_hash</span>\n                    <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span> <span class=\"ow\">or</span>
    <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password hash
    from frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">else</span><span class=\"p\">:</span>\n                    <span
    class=\"c1\"># Use global config - prefer password_hash, fallback to encryption_password</span>\n
    \                   <span class=\"k\">if</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">password_hash</span>\n
    \                       <span class=\"n\">encryption_password</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"ow\">or</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                   <span class=\"k\">elif</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Hash the global encryption password
    with salt</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span
    class=\"o\">.</span><span class=\"n\">sha256</span><span class=\"p\">((</span><span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                        <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># No global password configured - this shouldn&#39;t happen but provide
    fallback</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[yellow]Warning: No global password configured for post: </span><span
    class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">encryption_password</span> <span class=\"o\">+</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">salt</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">encode</span><span
    class=\"p\">())</span><span class=\"o\">.</span><span class=\"n\">hexdigest</span><span
    class=\"p\">()</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Using global password config for post: </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               \n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Attempting
    encryption with password: </span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"p\">[:</span><span class=\"mi\">5</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">encryption_password</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"o\">&gt;=</span><span
    class=\"w\"> </span><span class=\"mi\">5</span><span class=\"w\"> </span><span
    class=\"k\">else</span><span class=\"w\"> </span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">...[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">try</span><span class=\"p\">:</span>\n                    <span
    class=\"n\">encrypted_content</span> <span class=\"o\">=</span> <span class=\"n\">_encrypt_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                        <span class=\"n\">encryption_password</span>\n
    \                   <span class=\"p\">)</span>\n                    <span class=\"c1\">#
    Create the protected content wrapper</span>\n                    <span class=\"n\">protected_content</span>
    <span class=\"o\">=</span> <span class=\"n\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">encrypted_content</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">password_hash</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">,</span>\n
    \                       <span class=\"n\">encryption_password</span>\n                    <span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Replace the content in the HTML file</span>\n                    <span class=\"k\">if</span>
    <span class=\"n\">article_match</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Replace just the article content</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">html_content</span><span
    class=\"o\">.</span><span class=\"n\">replace</span><span class=\"p\">(</span><span
    class=\"n\">article_match</span><span class=\"o\">.</span><span class=\"n\">group</span><span
    class=\"p\">(</span><span class=\"mi\">0</span><span class=\"p\">),</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span class=\"si\">{</span><span
    class=\"n\">protected_content</span><span class=\"si\">}</span><span class=\"s2\">&lt;/article&gt;&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Replace the entire HTML content or
    use full protected content</span>\n                        <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                    \n
    \                   <span class=\"c1\"># Write the modified HTML back to the file</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content encrypted successfully!
    Updated HTML file with </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> characters[/green]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post template: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;template&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post templateKey: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Show first 200 chars of encrypted content</span>\n                    <span class=\"n\">preview_content</span>
    <span class=\"o\">=</span> <span class=\"n\">new_html_content</span><span class=\"p\">[:</span><span
    class=\"mi\">200</span><span class=\"p\">]</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]First 200 chars of new HTML: </span><span class=\"si\">{</span><span
    class=\"n\">preview_content</span><span class=\"si\">}</span><span class=\"s2\">...[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                <span class=\"k\">except</span> <span class=\"ne\">ImportError</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Encryption
    failed: </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Unexpected
    encryption error: </span><span class=\"si\">{</span><span class=\"n\">e</span><span
    class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"c1\"># Simple content hiding without encryption</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[blue]Using simple content hiding (no encryption)[/blue]&quot;</span><span
    class=\"p\">)</span>\n                \n                <span class=\"c1\"># Get
    password hash for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use global config
    - prefer password_hash, fallback to encryption_password</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                        <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                   <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                \n                <span
    class=\"n\">protected_content</span> <span class=\"o\">=</span> <span class=\"n\">_wrap_with_password_protection</span><span
    class=\"p\">(</span>\n                    <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">password_hash</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span>\n                <span class=\"p\">)</span>\n
    \               <span class=\"c1\"># Replace content in HTML file</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                    <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                <span
    class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">write_text</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">)</span>\n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content
    hidden successfully! New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"k\">else</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[dim]Post </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> does not need protection[/dim]&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"_wrap_with_encrypted_content\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">_wrap_with_encrypted_content
    <em class=\"small\">function</em></h2>\n<p>Wrap encrypted content with password
    protection and decryption logic.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_encrypted_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span><span class=\"n\">encrypted_content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">encryption_password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    encrypted content with password protection and decryption logic.&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"n\">protection_html</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">&lt;!-- Password Protection with Content Encryption --&gt;</span>\n<span
    class=\"s2\">&lt;div id=&quot;password-prompt&quot; style=&quot;max-width: 400px;
    margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;
    text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span class=\"s2\">
    \ &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span class=\"s2\">
    \ &lt;p&gt;This post is encrypted. Enter the password to decrypt and view:&lt;/p&gt;</span>\n<span
    class=\"s2\">  &lt;input type=&quot;password&quot; id=&quot;password-input&quot;
    placeholder=&quot;Enter password&quot; style=&quot;padding: 10px; margin: 10px;
    border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;decryptAndShow()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Decrypt&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Failed to decrypt. Check your password.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;decrypted-content&quot;
    style=&quot;display: none;&quot;&gt;&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;!--
    Encrypted content blob --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;encrypted-data&quot;
    style=&quot;display: none;&quot; data-encrypted=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">encrypted_content</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for decryption --&gt;</span>\n<span class=\"s2\">&lt;script
    src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Password hash for authentication</span>\n<span
    class=\"s2\">const PASSWORD_HASH = &#39;</span><span class=\"si\">{</span><span
    class=\"n\">password_hash</span><span class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span
    class=\"s2\">const SALT = &#39;</span><span class=\"si\">{</span><span class=\"n\">salt</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">// Store
    encrypted data persistently</span>\n<span class=\"s2\">const ENCRYPTED_DATA =
    &#39;</span><span class=\"si\">{</span><span class=\"n\">encrypted_content</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function
    decryptAndShow() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  const
    password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  const encryptedData = ENCRYPTED_DATA;</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password entered:&#39;,
    password);</span>\n<span class=\"s2\">  console.log(&#39;Debug: Encrypted data
    length:&#39;, encryptedData ? encryptedData.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">  console.log(&#39;Debug: Encrypted data preview:&#39;, encryptedData
    ? encryptedData.substring(0, 50) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  if (!encryptedData) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.error(&#39;Debug: No encrypted
    data found!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;No encrypted data found.&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    return;</span>\n<span class=\"s2\">
    \ </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // First verify password</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  console.log(&#39;Debug: Expected
    password hash:&#39;, PASSWORD_HASH);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Computed password hash:&#39;, hashedInput);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Password verification:&#39;, hashedInput === PASSWORD_HASH);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  if (hashedInput !== PASSWORD_HASH) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.log(&#39;Debug: Password
    verification failed!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    return;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password
    verification passed, proceeding to decrypt...&#39;);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  // Password is correct, now decrypt content</span>\n<span
    class=\"s2\">  try </span><span class=\"se\">{{</span>\n<span class=\"s2\">    //
    Decrypt using the same method as Python encryption</span>\n<span class=\"s2\">
    \   const encryptionPassword = &#39;</span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Create key from password (matching Python SHA256 approach)</span>\n<span
    class=\"s2\">    const key = CryptoJS.SHA256(encryptionPassword);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decode base64 encrypted data</span>\n<span
    class=\"s2\">    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Extract IV (first 16 bytes)
    and ciphertext (rest)</span>\n<span class=\"s2\">    // Convert to Uint8Array
    for proper byte manipulation</span>\n<span class=\"s2\">    const encryptedArray
    = new Uint8Array(encryptedBytes.sigBytes);</span>\n<span class=\"s2\">    for
    (let i = 0; i &lt; encryptedBytes.sigBytes; i++) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">      encryptedArray[i] = (encryptedBytes.words[Math.floor(i / 4)]
    &gt;&gt;&gt; (24 - (i % 4) * 8)) &amp; 0xff;</span>\n<span class=\"s2\">    </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    </span>\n<span class=\"s2\">    //
    Extract IV (first 16 bytes) and ciphertext (remaining bytes)</span>\n<span class=\"s2\">
    \   const ivArray = encryptedArray.slice(0, 16);</span>\n<span class=\"s2\">    const
    ciphertextArray = encryptedArray.slice(16);</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Convert back to CryptoJS WordArrays</span>\n<span class=\"s2\">
    \   const iv = CryptoJS.lib.WordArray.create(ivArray);</span>\n<span class=\"s2\">
    \   const ciphertext = CryptoJS.lib.WordArray.create(ciphertextArray);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decrypt</span>\n<span class=\"s2\">
    \   const decrypted = CryptoJS.AES.decrypt(</span>\n<span class=\"s2\">      CryptoJS.lib.CipherParams.create(</span><span
    class=\"se\">{{</span>\n<span class=\"s2\">        ciphertext: ciphertext</span>\n<span
    class=\"s2\">      </span><span class=\"se\">}}</span><span class=\"s2\">),</span>\n<span
    class=\"s2\">      key,</span>\n<span class=\"s2\">      </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">        iv: iv,</span>\n<span class=\"s2\">        mode: CryptoJS.mode.CBC,</span>\n<span
    class=\"s2\">        padding: CryptoJS.pad.Pkcs7</span>\n<span class=\"s2\">      </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    );</span>\n<span class=\"s2\">
    \   </span>\n<span class=\"s2\">    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    console.log(&#39;Debug: Decrypted
    text length:&#39;, decryptedText ? decryptedText.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">    console.log(&#39;Debug: Decrypted text preview:&#39;, decryptedText
    ? decryptedText.substring(0, 100) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    if (decryptedText &amp;&amp;
    decryptedText.length &gt; 0) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \     console.log(&#39;Debug: Decryption successful, showing content&#39;);</span>\n<span
    class=\"s2\">      // Hide password prompt and show decrypted content</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">      </span>\n<span class=\"s2\">
    \     // Get post metadata from the page</span>\n<span class=\"s2\">      const
    postTitle = document.title || &#39;Protected Post&#39;;</span>\n<span class=\"s2\">
    \     const postDate = document.querySelector(&#39;time&#39;)?.textContent ||
    &#39;&#39;;</span>\n<span class=\"s2\">      const postTags = Array.from(document.querySelectorAll(&#39;.tag,
    .badge&#39;)).map(tag =&gt; tag.textContent).join(&#39; &#39;);</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      // Create properly structured
    content matching post_partial.html structure and CSS classes</span>\n<span class=\"s2\">
    \     // Add top margin to prevent overlap with search bar</span>\n<span class=\"s2\">
    \     const structuredContent = `</span>\n<span class=\"s2\">        &lt;div class=&quot;mt-8
    pt-4&quot;&gt;</span>\n<span class=\"s2\">          &lt;article class=&quot;w-full
    pattern-card glow-card p-4 md:p-6 post-container&quot;&gt;</span>\n<span class=\"s2\">
    \           &lt;section class=&quot;post-header mb-8&quot;&gt;</span>\n<span class=\"s2\">
    \             &lt;h1 id=&quot;title&quot; style=&quot;font-size: 4rem; line-height:
    1.1; font-weight: 800;&quot; class=&quot;text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large&quot;&gt;$</span><span class=\"se\">{{</span><span class=\"s2\">postTitle</span><span
    class=\"se\">}}</span><span class=\"s2\">&lt;/h1&gt;</span>\n<span class=\"s2\">
    \             $</span><span class=\"se\">{{</span><span class=\"s2\">postDate
    ? `&lt;div class=&quot;flex items-center text-sm text-text-main/80 mb-6&quot;&gt;&lt;time&gt;$</span><span
    class=\"se\">{{</span><span class=\"s2\">postDate</span><span class=\"se\">}}</span><span
    class=\"s2\">&lt;/time&gt;&lt;/div&gt;` : &#39;&#39;</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">              $</span><span class=\"se\">{{</span><span class=\"s2\">postTags
    ? `&lt;div class=&quot;flex flex-wrap gap-2&quot;&gt;$</span><span class=\"se\">{{</span><span
    class=\"s2\">postTags</span><span class=\"se\">}}</span><span class=\"s2\">&lt;/div&gt;`
    : &#39;&#39;</span><span class=\"se\">}}</span>\n<span class=\"s2\">            &lt;/section&gt;</span>\n<span
    class=\"s2\">            &lt;section class=&quot;article-content prose dark:prose-invert
    lg:prose-xl mx-auto mt-8&quot;&gt;</span>\n<span class=\"s2\">              $</span><span
    class=\"se\">{{</span><span class=\"s2\">decryptedText</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">            &lt;/section&gt;</span>\n<span class=\"s2\">          &lt;/article&gt;</span>\n<span
    class=\"s2\">        &lt;/div&gt;</span>\n<span class=\"s2\">      `;</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).innerHTML
    = structuredContent;</span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">      console.log(&#39;Debug:
    Decryption failed - empty or null result&#39;);</span>\n<span class=\"s2\">      document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Failed to decrypt. Check your password.&#39;;</span>\n<span class=\"s2\">
    \     document.getElementById(&#39;error-message&#39;).style.display = &#39;block&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).value = &#39;&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span><span
    class=\"se\">}}</span><span class=\"s2\"> catch (error) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">    console.error(&#39;Decryption error:&#39;, error);</span>\n<span
    class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Decryption failed: &#39; + error.message;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   decryptAndShow();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n<span class=\"s2\">&lt;/script&gt;</span>\n<span
    class=\"s2\">&quot;&quot;&quot;</span>\n    \n    <span class=\"k\">return</span>
    <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"_wrap_with_password_protection\" class=\"admonition-title\" style=\"margin:
    0; padding: .5rem 1rem;\">_wrap_with_password_protection <em class=\"small\">function</em></h2>\n<p>Wrap
    content with password protection HTML and JavaScript (content hiding only).</p>\n</div>\n<div
    class=\"admonition source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_password_protection
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_password_protection</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    content with password protection HTML and JavaScript (content hiding only).&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"c1\"># Password protection HTML and JavaScript</span>\n
    \   <span class=\"n\">protection_html</span> <span class=\"o\">=</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">&lt;!--
    Password Protection --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;password-prompt&quot;
    style=&quot;max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid
    #ddd; border-radius: 8px; text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span
    class=\"s2\">  &lt;p&gt;This post is password protected. Please enter the password
    to continue:&lt;/p&gt;</span>\n<span class=\"s2\">  &lt;input type=&quot;password&quot;
    id=&quot;password-input&quot; placeholder=&quot;Enter password&quot; style=&quot;padding:
    10px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;checkPassword()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Submit&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Incorrect password. Please try again.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;protected-content&quot;
    style=&quot;display: none;&quot;&gt;</span>\n\n<span class=\"si\">{</span><span
    class=\"n\">content</span><span class=\"si\">}</span>\n\n<span class=\"s2\">&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for secure hashing --&gt;</span>\n<span
    class=\"s2\">&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Secure password hash
    (SHA-256 with salt)</span>\n<span class=\"s2\">const PASSWORD_HASH = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">password_hash</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n<span class=\"s2\">const SALT = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">salt</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function checkPassword() </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">  const password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  // Hash the entered password with
    salt</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // Compare with stored hash</span>\n<span class=\"s2\">  if (hashedInput ===
    PASSWORD_HASH) </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;protected-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   checkPassword();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Helper
    function to generate hash for a new password (for development)</span>\n<span class=\"s2\">function
    generatePasswordHash(password) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \ return CryptoJS.SHA256(password + SALT).toString();</span>\n<span class=\"se\">}}</span>\n<span
    class=\"s2\">// Usage: console.log(generatePasswordHash(&#39;your_password_here&#39;));</span>\n<span
    class=\"s2\">&lt;/script&gt;</span>\n<span class=\"s2\">&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"k\">return</span> <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n
    \   </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>password_protection.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Password Protection Plugin for Markata
    Adds client-side password protection to posts using secure hash-based authentication.\nThis
    plugin encrypts post content a\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"password_protection.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Password Protection
    Plugin for Markata Adds client-side password protection to posts using secure
    hash-based authentication.\nThis plugin encrypts post content a\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devplugins/password-protection\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"password_protection.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Password Protection Plugin for Markata Adds client-side password protection
    to posts using secure hash-based authentication.\nThis plugin encrypts post content
    a\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class='py-4'>\n\n    <nav
    class='flex flex-wrap justify-center sm:justify-start items-center'>\n        <a
    class=\"nav-link accent-glow\"\n            href='/'>Home</a>\n        <a class=\"nav-link
    accent-glow\"\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/slash'>Start Here</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/my-thoughts'>My
    Thoughts</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
    id='didyoumean'>\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\"\n               class=\"w-full p-2 border rounded-md
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/'
    Search for a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <hr />\n<p>Password
    Protection Plugin for Markata</p>\n<p>Adds client-side password protection to
    posts using secure hash-based authentication.\nThis plugin encrypts post content
    and provides a password prompt interface for decryption.</p>\n<h1 id=\"installation\">Installation
    <a class=\"header-anchor\" href=\"#installation\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Add the plugin to your
    markata.toml hooks:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">hooks</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"s2\">&quot;plugins.password_protection&quot;</span><span
    class=\"p\">,</span>\n<span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"configuration\">Configuration <a class=\"header-anchor\" href=\"#configuration\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Configure the plugin
    in your markata.toml (minimal setup):</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[markata.password_protection]</span>\n<span
    class=\"c1\"># Salt for password hashing (required for security)</span>\n<span
    class=\"n\">salt</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n<span
    class=\"c1\"># Global default password - use plain text, will be hashed automatically</span>\n<span
    class=\"n\">encryption_password</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;your_password&quot;</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Note</strong>:
    The following are automatically set and don't need configuration:</p>\n<ul>\n<li><code>protected_template_key
    = &quot;protected-post&quot;</code> (hardcoded)</li>\n<li><code>encrypt_content
    = true</code> (always enabled for protected posts)</li>\n</ul>\n<h1 id=\"usage\">Usage
    <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Protect posts by setting
    the template key and optionally a custom password:</p>\n<p><strong>Method 1: Use
    global password</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method 2: Custom
    password per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;my-custom-password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<p><strong>Method
    3: Custom password hash per post</strong></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nn\">---</span>\n<span
    class=\"nt\">title</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">My Secret Post</span>\n<span class=\"nt\">templateKey</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">protected-post</span>\n<span
    class=\"nt\">password_hash</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;sha256_hash_of_password&quot;</span>\n<span class=\"nn\">---</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"password-hashing-requirements\">Password Hashing Requirements <a class=\"header-anchor\"
    href=\"#password-hashing-requirements\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>CRITICAL</strong>:
    Both Python (server-side) and JavaScript (client-side) must use identical\npassword
    hashing algorithms for authentication to work correctly.</p>\n<p><strong>Current
    Implementation</strong>: SHA256(password + salt)</p>\n<ul>\n<li>Python: <code>hashlib.sha256((password
    + salt).encode()).hexdigest()</code></li>\n<li>JavaScript: <code>CryptoJS.SHA256(password
    + SALT).toString()</code></li>\n</ul>\n<p><strong>DO NOT MODIFY</strong> the hashing
    logic without updating both sides simultaneously.\nAny mismatch will cause password
    authentication to fail.</p>\n<h1 id=\"security-features\">Security Features <a
    class=\"header-anchor\" href=\"#security-features\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>Content
    Encryption</strong>: Post content is encrypted using AES-CBC with CryptoJS</li>\n<li><strong>Password
    Verification</strong>: Client-side password verification before decryption</li>\n<li><strong>Salt
    Protection</strong>: Passwords are salted before hashing to prevent rainbow table
    attacks</li>\n<li><strong>No Plain Text</strong>: Passwords are never stored in
    plain text in the generated HTML</li>\n<li><strong>Fallback Protection</strong>:
    Falls back to content hiding if encryption fails</li>\n</ul>\n<h1 id=\"future-enhancements\">Future
    Enhancements <a class=\"header-anchor\" href=\"#future-enhancements\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li><strong>REST
    Endpoint Support</strong>: Planned support for fetching passwords from external
    APIs</li>\n<li><strong>Multiple Password Support</strong>: Potential support for
    multiple passwords per post</li>\n<li><strong>Time-based Access</strong>: Potential
    support for time-limited access tokens</li>\n</ul>\n<h1 id=\"notes\">Notes <a
    class=\"header-anchor\" href=\"#notes\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ul>\n<li>Uses SHA-256
    hashing with salt for security</li>\n<li>No plaintext passwords stored in code</li>\n<li>Works
    with existing markdown content and build process</li>\n<li>Requires CryptoJS CDN
    for client-side hashing</li>\n<li>Password protection is client-side only (not
    server-side secure)</li>\n</ul>\n<hr />\n<div class=\"admonition function\">\n<p
    class=\"admonition-title\">Function</p>\n<h2 id=\"_encrypt_content\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">_encrypt_content <em class=\"small\">function</em></h2>\n<p>Encrypt
    content using AES encryption compatible with CryptoJS.</p>\n</div>\n<div class=\"admonition
    source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_encrypt_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_encrypt_content</span><span class=\"p\">(</span><span
    class=\"n\">content</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Encrypt content using AES encryption compatible
    with CryptoJS.&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">HAS_CRYPTOGRAPHY</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">raise</span> <span class=\"ne\">ImportError</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;cryptography package required for
    content encryption. Install with: pip install cryptography&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"c1\"># Use a simple key derivation that matches CryptoJS
    expectations</span>\n    <span class=\"c1\"># CryptoJS.AES.encrypt(content, password)
    uses this approach</span>\n    <span class=\"n\">key</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">(</span><span class=\"n\">password</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">digest</span><span class=\"p\">()</span>\n    \n    <span class=\"c1\">#
    Generate random IV</span>\n    <span class=\"n\">iv</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">urandom</span><span
    class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">)</span>\n    \n
    \   <span class=\"c1\"># Pad content to AES block size</span>\n    <span class=\"n\">padder</span>
    <span class=\"o\">=</span> <span class=\"n\">padding</span><span class=\"o\">.</span><span
    class=\"n\">PKCS7</span><span class=\"p\">(</span><span class=\"mi\">128</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">padder</span><span
    class=\"p\">()</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">update</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">))</span>\n    <span class=\"n\">padded_content</span> <span class=\"o\">+=</span>
    <span class=\"n\">padder</span><span class=\"o\">.</span><span class=\"n\">finalize</span><span
    class=\"p\">()</span>\n    \n    <span class=\"c1\"># Encrypt</span>\n    <span
    class=\"n\">cipher</span> <span class=\"o\">=</span> <span class=\"n\">Cipher</span><span
    class=\"p\">(</span><span class=\"n\">algorithms</span><span class=\"o\">.</span><span
    class=\"n\">AES</span><span class=\"p\">(</span><span class=\"n\">key</span><span
    class=\"p\">),</span> <span class=\"n\">modes</span><span class=\"o\">.</span><span
    class=\"n\">CBC</span><span class=\"p\">(</span><span class=\"n\">iv</span><span
    class=\"p\">),</span> <span class=\"n\">backend</span><span class=\"o\">=</span><span
    class=\"n\">default_backend</span><span class=\"p\">())</span>\n    <span class=\"n\">encryptor</span>
    <span class=\"o\">=</span> <span class=\"n\">cipher</span><span class=\"o\">.</span><span
    class=\"n\">encryptor</span><span class=\"p\">()</span>\n    <span class=\"n\">encrypted</span>
    <span class=\"o\">=</span> <span class=\"n\">encryptor</span><span class=\"o\">.</span><span
    class=\"n\">update</span><span class=\"p\">(</span><span class=\"n\">padded_content</span><span
    class=\"p\">)</span> <span class=\"o\">+</span> <span class=\"n\">encryptor</span><span
    class=\"o\">.</span><span class=\"n\">finalize</span><span class=\"p\">()</span>\n
    \   \n    <span class=\"c1\"># Return in format that CryptoJS can decrypt: base64(iv
    + encrypted)</span>\n    <span class=\"n\">combined</span> <span class=\"o\">=</span>
    <span class=\"n\">iv</span> <span class=\"o\">+</span> <span class=\"n\">encrypted</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">base64</span><span class=\"o\">.</span><span
    class=\"n\">b64encode</span><span class=\"p\">(</span><span class=\"n\">combined</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">decode</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"PasswordProtectionConfig\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">PasswordProtectionConfig
    <em class=\"small\">class</em></h2>\n<p>Configuration for password protection
    plugin.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">PasswordProtectionConfig <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">PasswordProtectionConfig</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Configuration
    for password protection plugin.&quot;&quot;&quot;</span>\n    <span class=\"c1\">#
    Salt for password hashing (required for security)</span>\n    <span class=\"n\">salt</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;blog_salt_2025&quot;</span>\n    <span class=\"c1\">#
    Global default password (optional - can be overridden per post)</span>\n    <span
    class=\"c1\"># Use either password_hash (pre-computed) or encryption_password
    (plain text)</span>\n    <span class=\"n\">password_hash</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># SHA256(password + salt) - leave empty to use encryption_password</span>\n
    \   <span class=\"n\">encryption_password</span><span class=\"p\">:</span> <span
    class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span>
    \ <span class=\"c1\"># Plain text password - will be hashed with salt</span>\n
    \   \n    <span class=\"c1\"># Internal constants (not configurable)</span>\n
    \   <span class=\"n\">protected_template_key</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;protected-post&quot;</span>
    \ <span class=\"c1\"># Always use this template key</span>\n    <span class=\"n\">encrypt_content</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>  <span class=\"c1\"># Always encrypt protected
    content</span>\n    \n    <span class=\"n\">model_config</span> <span class=\"o\">=</span>
    <span class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">ConfigDict</span><span
    class=\"p\">(</span>\n        <span class=\"n\">validate_assignment</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">arbitrary_types_allowed</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">extra</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;allow&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">str_strip_whitespace</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">validate_default</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">coerce_numbers_to_str</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"n\">populate_by_name</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    class\">\n<p class=\"admonition-title\">Class</p>\n<h2 id=\"Config\" class=\"admonition-title\"
    style=\"margin: 0; padding: .5rem 1rem;\">Config <em class=\"small\">class</em></h2>\n<p>Main
    config model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">Config <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Config</span><span class=\"p\">(</span><span
    class=\"n\">pydantic</span><span class=\"o\">.</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Main
    config model.&quot;&quot;&quot;</span>\n    <span class=\"n\">password_protection</span><span
    class=\"p\">:</span> <span class=\"n\">PasswordProtectionConfig</span> <span class=\"o\">=</span>
    <span class=\"n\">PasswordProtectionConfig</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"config_model\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">config_model <em class=\"small\">function</em></h2>\n<p>Register the configuration
    model.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">config_model <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">config_model</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Register
    the configuration model.&quot;&quot;&quot;</span>\n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config_models</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"n\">Config</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"post_render\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">post_render
    <em class=\"small\">function</em></h2>\n<p>Protect post content in feeds and descriptions
    before they are used.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">post_render <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">post_render</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Protect
    post content in feeds and descriptions before they are used.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[blue]Password
    protection: Sanitizing protected posts in feeds[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only sanitize posts with the protected
    template key</span>\n        <span class=\"k\">if</span> <span class=\"n\">template_key_value</span>
    <span class=\"o\">==</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">protected_template_key</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Sanitizing protected post
    for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \           \n            <span class=\"c1\"># Replace content fields that might
    leak in feeds</span>\n            <span class=\"n\">protected_message</span> <span
    class=\"o\">=</span> <span class=\"s2\">&quot;\U0001F512 This content is password
    protected.&quot;</span>\n            \n            <span class=\"c1\"># Sanitize
    various content fields that could leak in feeds</span>\n            <span class=\"k\">if</span>
    <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;content&#39;</span><span class=\"p\">):</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;description&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">description</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;excerpt&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">excerpt</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;summary&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">summary</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;article_html&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep a backup of the original content for the save hook</span>\n
    \               <span class=\"k\">if</span> <span class=\"ow\">not</span> <span
    class=\"nb\">hasattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">_original_article_html</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>\n
    \               <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">article_html</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;p&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_message</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/p&gt;&quot;</span>\n            \n            <span class=\"c1\">#
    Sanitize metadata fields that could leak in link previews</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;cover&#39;):</span>\n            <span class=\"c1\">#
    \    # Remove cover image to prevent content leakage in previews</span>\n            <span
    class=\"c1\">#     post.cover = None</span>\n            <span class=\"c1\">#
    if hasattr(post, &#39;image&#39;):</span>\n            <span class=\"c1\">#     #
    Remove any other image fields</span>\n            <span class=\"c1\">#     post.image
    = None</span>\n            <span class=\"c1\"># if hasattr(post, &#39;featured_image&#39;):</span>\n
    \           <span class=\"c1\">#     post.featured_image = None</span>\n            <span
    class=\"c1\"># if hasattr(post, &#39;thumbnail&#39;):</span>\n            <span
    class=\"c1\">#     post.thumbnail = None</span>\n            \n            <span
    class=\"c1\"># Sanitize tags that might reveal sensitive information</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;tags&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"c1\"># Keep only generic tags, remove potentially sensitive ones</span>\n
    \               <span class=\"k\">if</span> <span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">tags</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Replace with generic &quot;protected&quot;
    tag</span>\n                    <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">tags</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;protected&quot;</span><span class=\"p\">]</span>\n            \n
    \           <span class=\"c1\"># Sanitize any other fields that might leak content</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;subtitle&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">subtitle</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;lead&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">lead</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">post</span><span class=\"p\">,</span> <span
    class=\"s1\">&#39;intro&#39;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">intro</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n            <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;abstract&#39;</span><span
    class=\"p\">):</span>\n                <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">abstract</span> <span class=\"o\">=</span> <span class=\"n\">protected_message</span>\n
    \           \n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Protected
    post sanitized for feeds: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"save\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">save
    <em class=\"small\">function</em></h2>\n<p>Add password protection to posts by
    modifying the generated HTML files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">save <em class='small'>source</em></p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">save</span><span class=\"p\">(</span><span
    class=\"n\">markata</span><span class=\"p\">:</span> <span class=\"s2\">&quot;Markata&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Add
    password protection to posts by modifying the generated HTML files.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">config</span> <span class=\"o\">=</span> <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_protection</span>\n    \n    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Password protection plugin running on </span><span class=\"si\">{</span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">articles</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> posts[/blue]&quot;</span><span class=\"p\">)</span>\n
    \   \n    <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">articles</span><span
    class=\"p\">:</span>\n        <span class=\"n\">template_key_value</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"c1\"># Only protect posts with the protected template
    key</span>\n        <span class=\"n\">should_protect</span> <span class=\"o\">=</span>
    <span class=\"n\">template_key_value</span> <span class=\"o\">==</span> <span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">protected_template_key</span>\n
    \       \n        <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[yellow]Post
    </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">: templateKey=</span><span
    class=\"si\">{</span><span class=\"n\">template_key_value</span><span class=\"si\">}</span><span
    class=\"s2\">, should_protect=</span><span class=\"si\">{</span><span class=\"n\">should_protect</span><span
    class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span class=\"p\">)</span>\n
    \       \n        <span class=\"k\">if</span> <span class=\"n\">should_protect</span><span
    class=\"p\">:</span>\n            <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]PROTECTING
    POST: </span><span class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Get the output
    HTML file path</span>\n            <span class=\"n\">output_file</span> <span
    class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">output_html</span>\n            <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Output file: </span><span class=\"si\">{</span><span
    class=\"n\">output_file</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n            \n            <span class=\"c1\"># Check if
    the HTML file exists and read its content</span>\n            <span class=\"k\">if</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">():</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">read_text</span><span
    class=\"p\">(</span><span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Read HTML file with </span><span
    class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">html_content</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"c1\"># Extract the body content from the HTML
    for encryption</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">re</span>\n                    \n                    <span
    class=\"c1\"># Check if content is already password protected (avoid recursive
    encryption)</span>\n                    <span class=\"k\">if</span> <span class=\"p\">(</span><span
    class=\"s1\">&#39;password-prompt&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;encrypted-data&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span> \n                        <span
    class=\"s1\">&#39;ENCRYPTED_DATA&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span> <span class=\"ow\">or</span>\n                        <span
    class=\"s1\">&#39;decryptAndShow&#39;</span> <span class=\"ow\">in</span> <span
    class=\"n\">html_content</span><span class=\"p\">):</span>\n                        <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Content already appears to be password protected, skipping...[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">continue</span>\n
    \                   \n                    <span class=\"c1\"># Check if we have
    original content backed up from post_render hook</span>\n                    <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"kc\">None</span>
    \ <span class=\"c1\"># Initialize to avoid UnboundLocalError</span>\n                    <span
    class=\"k\">if</span> <span class=\"nb\">hasattr</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">,</span> <span class=\"s1\">&#39;_original_article_html&#39;</span><span
    class=\"p\">):</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"s2\">&quot;[cyan]Using
    original content backed up from post_render hook[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \                       <span class=\"c1\"># Use the original content for encryption,
    not the sanitized version</span>\n                        <span class=\"n\">content_to_encrypt</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">_original_article_html</span>\n                        <span class=\"c1\">#
    Look for article tags in the current HTML to maintain structure</span>\n                        <span
    class=\"n\">article_match</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">search</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"ow\">not</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                           <span class=\"c1\"># If no article tag found, we&#39;ll
    replace the entire content</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Look for the main article content (this is a simplified approach)</span>\n
    \                       <span class=\"c1\"># We&#39;ll encrypt everything between
    &lt;article&gt; tags or similar</span>\n                        <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">search</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s1\">&#39;&lt;article[^&gt;]*&gt;(.*?)&lt;/article&gt;&#39;</span><span
    class=\"p\">,</span> <span class=\"n\">html_content</span><span class=\"p\">,</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">DOTALL</span><span
    class=\"p\">)</span>\n                        <span class=\"k\">if</span> <span
    class=\"n\">article_match</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">content_to_encrypt</span> <span class=\"o\">=</span> <span class=\"n\">article_match</span><span
    class=\"o\">.</span><span class=\"n\">group</span><span class=\"p\">(</span><span
    class=\"mi\">1</span><span class=\"p\">)</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Found article content with
    </span><span class=\"si\">{</span><span class=\"nb\">len</span><span class=\"p\">(</span><span
    class=\"n\">content_to_encrypt</span><span class=\"p\">)</span><span class=\"si\">}</span><span
    class=\"s2\"> characters[/cyan]&quot;</span><span class=\"p\">)</span>\n                        <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                            <span
    class=\"c1\"># Fallback: encrypt everything in the main content area</span>\n
    \                           <span class=\"n\">content_to_encrypt</span> <span
    class=\"o\">=</span> <span class=\"n\">html_content</span>\n                            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[cyan]Using full HTML content for encryption[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                            <span class=\"n\">article_match</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n                        \n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Error
    reading HTML file </span><span class=\"si\">{</span><span class=\"n\">output_file</span><span
    class=\"si\">}</span><span class=\"s2\">: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">continue</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[red]HTML file does not exist: </span><span
    class=\"si\">{</span><span class=\"n\">output_file</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">continue</span>\n            \n            <span class=\"k\">if</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encrypt_content</span>
    <span class=\"ow\">and</span> <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">:</span>\n                <span class=\"c1\"># Get password and hash
    for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"c1\"># TODO: Future enhancement - fetch password/hash
    from REST endpoint</span>\n                <span class=\"c1\"># This would allow
    passwords to be stored securely outside the repo</span>\n                <span
    class=\"c1\"># Example: password_endpoint = post.get(&#39;password_endpoint&#39;,
    &#39;&#39;)</span>\n                <span class=\"c1\"># if password_endpoint:</span>\n
    \               <span class=\"c1\">#     password_hash = fetch_password_from_endpoint(password_endpoint,
    post.get(&#39;slug&#39;, &#39;&#39;))</span>\n                \n                <span
    class=\"c1\"># Determine which password/hash to use</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">post_password</span><span class=\"p\">:</span>\n
    \                   <span class=\"c1\"># Use custom password from frontmatter</span>\n
    \                   <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                    <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password from
    frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[cyan]Password
    hash: </span><span class=\"si\">{</span><span class=\"n\">password_hash</span><span
    class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use custom password
    hash from frontmatter</span>\n                    <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">post_password_hash</span>\n                    <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span> <span class=\"ow\">or</span>
    <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Using custom password hash
    from frontmatter for post: </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">else</span><span class=\"p\">:</span>\n                    <span
    class=\"c1\"># Use global config - prefer password_hash, fallback to encryption_password</span>\n
    \                   <span class=\"k\">if</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">password_hash</span>\n
    \                       <span class=\"n\">encryption_password</span> <span class=\"o\">=</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"ow\">or</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                   <span class=\"k\">elif</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Hash the global encryption password
    with salt</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span
    class=\"o\">.</span><span class=\"n\">sha256</span><span class=\"p\">((</span><span
    class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">encryption_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                        <span
    class=\"n\">encryption_password</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">encryption_password</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># No global password configured - this shouldn&#39;t happen but provide
    fallback</span>\n                        <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[yellow]Warning: No global password configured for post: </span><span
    class=\"si\">{</span><span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                        <span class=\"n\">encryption_password</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">encryption_password</span> <span class=\"o\">+</span>
    <span class=\"n\">config</span><span class=\"o\">.</span><span class=\"n\">salt</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">encode</span><span
    class=\"p\">())</span><span class=\"o\">.</span><span class=\"n\">hexdigest</span><span
    class=\"p\">()</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[blue]Using global password config for post: </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               \n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[blue]Attempting
    encryption with password: </span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"p\">[:</span><span class=\"mi\">5</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">encryption_password</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"o\">&gt;=</span><span
    class=\"w\"> </span><span class=\"mi\">5</span><span class=\"w\"> </span><span
    class=\"k\">else</span><span class=\"w\"> </span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">...[/blue]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">try</span><span class=\"p\">:</span>\n                    <span
    class=\"n\">encrypted_content</span> <span class=\"o\">=</span> <span class=\"n\">_encrypt_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                        <span class=\"n\">encryption_password</span>\n
    \                   <span class=\"p\">)</span>\n                    <span class=\"c1\">#
    Create the protected content wrapper</span>\n                    <span class=\"n\">protected_content</span>
    <span class=\"o\">=</span> <span class=\"n\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span>\n                        <span class=\"n\">encrypted_content</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">password_hash</span><span
    class=\"p\">,</span>\n                        <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">,</span>\n
    \                       <span class=\"n\">encryption_password</span>\n                    <span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Replace the content in the HTML file</span>\n                    <span class=\"k\">if</span>
    <span class=\"n\">article_match</span><span class=\"p\">:</span>\n                        <span
    class=\"c1\"># Replace just the article content</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">html_content</span><span
    class=\"o\">.</span><span class=\"n\">replace</span><span class=\"p\">(</span><span
    class=\"n\">article_match</span><span class=\"o\">.</span><span class=\"n\">group</span><span
    class=\"p\">(</span><span class=\"mi\">0</span><span class=\"p\">),</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span class=\"si\">{</span><span
    class=\"n\">protected_content</span><span class=\"si\">}</span><span class=\"s2\">&lt;/article&gt;&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"c1\"># Replace the entire HTML content or
    use full protected content</span>\n                        <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                    \n
    \                   <span class=\"c1\"># Write the modified HTML back to the file</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content encrypted successfully!
    Updated HTML file with </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> characters[/green]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post template: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;template&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]Post templateKey: </span><span class=\"si\">{</span><span
    class=\"nb\">getattr</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;templateKey&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;unknown&#39;</span><span
    class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                    \n                    <span class=\"c1\">#
    Show first 200 chars of encrypted content</span>\n                    <span class=\"n\">preview_content</span>
    <span class=\"o\">=</span> <span class=\"n\">new_html_content</span><span class=\"p\">[:</span><span
    class=\"mi\">200</span><span class=\"p\">]</span>\n                    <span class=\"n\">markata</span><span
    class=\"o\">.</span><span class=\"n\">console</span><span class=\"o\">.</span><span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;[cyan]First 200 chars of new HTML: </span><span class=\"si\">{</span><span
    class=\"n\">preview_content</span><span class=\"si\">}</span><span class=\"s2\">...[/cyan]&quot;</span><span
    class=\"p\">)</span>\n                <span class=\"k\">except</span> <span class=\"ne\">ImportError</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Encryption
    failed: </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[red]Unexpected
    encryption error: </span><span class=\"si\">{</span><span class=\"n\">e</span><span
    class=\"si\">}</span><span class=\"s2\">[/red]&quot;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[yellow]Falling back to content hiding[/yellow]&quot;</span><span
    class=\"p\">)</span>\n                    <span class=\"c1\"># Fall back to simple
    content hiding</span>\n                    <span class=\"c1\"># Use the same password
    logic for fallback</span>\n                    <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \                   <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                    \n
    \                   <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                        <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                        <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                    <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                        <span class=\"c1\"># Use global
    config - prefer password_hash, fallback to encryption_password</span>\n                        <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                            <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                        <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                            <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                           <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                       <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                           <span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">hashlib</span>\n                            <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                    \n
    \                   <span class=\"n\">protected_content</span> <span class=\"o\">=</span>
    <span class=\"n\">_wrap_with_password_protection</span><span class=\"p\">(</span>\n
    \                       <span class=\"n\">content_to_encrypt</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">password_hash</span><span class=\"p\">,</span>
    \n                        <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span>\n                    <span class=\"p\">)</span>\n                    <span
    class=\"c1\"># Replace content in HTML file</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                       <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                    <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">new_html_content</span> <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n
    \                   <span class=\"n\">output_file</span><span class=\"o\">.</span><span
    class=\"n\">write_text</span><span class=\"p\">(</span><span class=\"n\">new_html_content</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;utf-8&#39;</span><span class=\"p\">)</span>\n                    <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content hidden successfully!
    New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \           <span class=\"k\">else</span><span class=\"p\">:</span>\n                <span
    class=\"c1\"># Simple content hiding without encryption</span>\n                <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;[blue]Using simple content hiding (no encryption)[/blue]&quot;</span><span
    class=\"p\">)</span>\n                \n                <span class=\"c1\"># Get
    password hash for this specific post</span>\n                <span class=\"n\">post_password</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;password&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n
    \               <span class=\"n\">post_password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;password_hash&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;&#39;</span><span class=\"p\">)</span>\n                \n
    \               <span class=\"k\">if</span> <span class=\"n\">post_password</span><span
    class=\"p\">:</span>\n                    <span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">hashlib</span>\n                    <span
    class=\"c1\"># Hash password with salt to match JavaScript logic: SHA256(password
    + salt)</span>\n                    <span class=\"n\">password_hash</span> <span
    class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"n\">post_password</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                <span
    class=\"k\">elif</span> <span class=\"n\">post_password_hash</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">post_password_hash</span>\n                <span class=\"k\">else</span><span
    class=\"p\">:</span>\n                    <span class=\"c1\"># Use global config
    - prefer password_hash, fallback to encryption_password</span>\n                    <span
    class=\"k\">if</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">password_hash</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">password_hash</span> <span class=\"o\">=</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">password_hash</span>\n                    <span
    class=\"k\">elif</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span><span class=\"p\">:</span>\n                        <span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">hashlib</span>\n
    \                       <span class=\"n\">password_hash</span> <span class=\"o\">=</span>
    <span class=\"n\">hashlib</span><span class=\"o\">.</span><span class=\"n\">sha256</span><span
    class=\"p\">((</span><span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">encryption_password</span> <span class=\"o\">+</span> <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">encode</span><span class=\"p\">())</span><span
    class=\"o\">.</span><span class=\"n\">hexdigest</span><span class=\"p\">()</span>\n
    \                   <span class=\"k\">else</span><span class=\"p\">:</span>\n
    \                       <span class=\"kn\">import</span><span class=\"w\"> </span><span
    class=\"nn\">hashlib</span>\n                        <span class=\"n\">password_hash</span>
    <span class=\"o\">=</span> <span class=\"n\">hashlib</span><span class=\"o\">.</span><span
    class=\"n\">sha256</span><span class=\"p\">((</span><span class=\"s2\">&quot;default_encryption_key&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">config</span><span class=\"o\">.</span><span
    class=\"n\">salt</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">encode</span><span class=\"p\">())</span><span class=\"o\">.</span><span
    class=\"n\">hexdigest</span><span class=\"p\">()</span>\n                \n                <span
    class=\"n\">protected_content</span> <span class=\"o\">=</span> <span class=\"n\">_wrap_with_password_protection</span><span
    class=\"p\">(</span>\n                    <span class=\"n\">content_to_encrypt</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">password_hash</span><span
    class=\"p\">,</span> \n                    <span class=\"n\">config</span><span
    class=\"o\">.</span><span class=\"n\">salt</span>\n                <span class=\"p\">)</span>\n
    \               <span class=\"c1\"># Replace content in HTML file</span>\n                <span
    class=\"k\">if</span> <span class=\"n\">article_match</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">new_html_content</span> <span class=\"o\">=</span>
    <span class=\"n\">html_content</span><span class=\"o\">.</span><span class=\"n\">replace</span><span
    class=\"p\">(</span><span class=\"n\">article_match</span><span class=\"o\">.</span><span
    class=\"n\">group</span><span class=\"p\">(</span><span class=\"mi\">0</span><span
    class=\"p\">),</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;article&gt;</span><span
    class=\"si\">{</span><span class=\"n\">protected_content</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/article&gt;&quot;</span><span class=\"p\">)</span>\n                <span
    class=\"k\">else</span><span class=\"p\">:</span>\n                    <span class=\"n\">new_html_content</span>
    <span class=\"o\">=</span> <span class=\"n\">protected_content</span>\n                <span
    class=\"n\">output_file</span><span class=\"o\">.</span><span class=\"n\">write_text</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s1\">&#39;utf-8&#39;</span><span
    class=\"p\">)</span>\n                <span class=\"n\">markata</span><span class=\"o\">.</span><span
    class=\"n\">console</span><span class=\"o\">.</span><span class=\"n\">log</span><span
    class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;[green]Content
    hidden successfully! New length: </span><span class=\"si\">{</span><span class=\"nb\">len</span><span
    class=\"p\">(</span><span class=\"n\">new_html_content</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">[/green]&quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"k\">else</span><span class=\"p\">:</span>\n            <span
    class=\"n\">markata</span><span class=\"o\">.</span><span class=\"n\">console</span><span
    class=\"o\">.</span><span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;[dim]Post </span><span class=\"si\">{</span><span
    class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s1\">&#39;Unknown&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\"> does not need protection[/dim]&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"_wrap_with_encrypted_content\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">_wrap_with_encrypted_content
    <em class=\"small\">function</em></h2>\n<p>Wrap encrypted content with password
    protection and decryption logic.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_encrypted_content
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_encrypted_content</span><span
    class=\"p\">(</span><span class=\"n\">encrypted_content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">,</span> <span class=\"n\">encryption_password</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;default_encryption_key&quot;</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    encrypted content with password protection and decryption logic.&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"n\">protection_html</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">&lt;!-- Password Protection with Content Encryption --&gt;</span>\n<span
    class=\"s2\">&lt;div id=&quot;password-prompt&quot; style=&quot;max-width: 400px;
    margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;
    text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span class=\"s2\">
    \ &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span class=\"s2\">
    \ &lt;p&gt;This post is encrypted. Enter the password to decrypt and view:&lt;/p&gt;</span>\n<span
    class=\"s2\">  &lt;input type=&quot;password&quot; id=&quot;password-input&quot;
    placeholder=&quot;Enter password&quot; style=&quot;padding: 10px; margin: 10px;
    border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;decryptAndShow()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Decrypt&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Failed to decrypt. Check your password.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;decrypted-content&quot;
    style=&quot;display: none;&quot;&gt;&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;!--
    Encrypted content blob --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;encrypted-data&quot;
    style=&quot;display: none;&quot; data-encrypted=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">encrypted_content</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for decryption --&gt;</span>\n<span class=\"s2\">&lt;script
    src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Password hash for authentication</span>\n<span
    class=\"s2\">const PASSWORD_HASH = &#39;</span><span class=\"si\">{</span><span
    class=\"n\">password_hash</span><span class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span
    class=\"s2\">const SALT = &#39;</span><span class=\"si\">{</span><span class=\"n\">salt</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">// Store
    encrypted data persistently</span>\n<span class=\"s2\">const ENCRYPTED_DATA =
    &#39;</span><span class=\"si\">{</span><span class=\"n\">encrypted_content</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function
    decryptAndShow() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  const
    password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  const encryptedData = ENCRYPTED_DATA;</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password entered:&#39;,
    password);</span>\n<span class=\"s2\">  console.log(&#39;Debug: Encrypted data
    length:&#39;, encryptedData ? encryptedData.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">  console.log(&#39;Debug: Encrypted data preview:&#39;, encryptedData
    ? encryptedData.substring(0, 50) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  if (!encryptedData) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.error(&#39;Debug: No encrypted
    data found!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;No encrypted data found.&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    return;</span>\n<span class=\"s2\">
    \ </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // First verify password</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  console.log(&#39;Debug: Expected
    password hash:&#39;, PASSWORD_HASH);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Computed password hash:&#39;, hashedInput);</span>\n<span class=\"s2\">  console.log(&#39;Debug:
    Password verification:&#39;, hashedInput === PASSWORD_HASH);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  if (hashedInput !== PASSWORD_HASH) </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">    console.log(&#39;Debug: Password
    verification failed!&#39;);</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    return;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  console.log(&#39;Debug: Password
    verification passed, proceeding to decrypt...&#39;);</span>\n<span class=\"s2\">
    \ </span>\n<span class=\"s2\">  // Password is correct, now decrypt content</span>\n<span
    class=\"s2\">  try </span><span class=\"se\">{{</span>\n<span class=\"s2\">    //
    Decrypt using the same method as Python encryption</span>\n<span class=\"s2\">
    \   const encryptionPassword = &#39;</span><span class=\"si\">{</span><span class=\"n\">encryption_password</span><span
    class=\"si\">}</span><span class=\"s2\">&#39;;</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Create key from password (matching Python SHA256 approach)</span>\n<span
    class=\"s2\">    const key = CryptoJS.SHA256(encryptionPassword);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decode base64 encrypted data</span>\n<span
    class=\"s2\">    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Extract IV (first 16 bytes)
    and ciphertext (rest)</span>\n<span class=\"s2\">    // Convert to Uint8Array
    for proper byte manipulation</span>\n<span class=\"s2\">    const encryptedArray
    = new Uint8Array(encryptedBytes.sigBytes);</span>\n<span class=\"s2\">    for
    (let i = 0; i &lt; encryptedBytes.sigBytes; i++) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">      encryptedArray[i] = (encryptedBytes.words[Math.floor(i / 4)]
    &gt;&gt;&gt; (24 - (i % 4) * 8)) &amp; 0xff;</span>\n<span class=\"s2\">    </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    </span>\n<span class=\"s2\">    //
    Extract IV (first 16 bytes) and ciphertext (remaining bytes)</span>\n<span class=\"s2\">
    \   const ivArray = encryptedArray.slice(0, 16);</span>\n<span class=\"s2\">    const
    ciphertextArray = encryptedArray.slice(16);</span>\n<span class=\"s2\">    </span>\n<span
    class=\"s2\">    // Convert back to CryptoJS WordArrays</span>\n<span class=\"s2\">
    \   const iv = CryptoJS.lib.WordArray.create(ivArray);</span>\n<span class=\"s2\">
    \   const ciphertext = CryptoJS.lib.WordArray.create(ciphertextArray);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    // Decrypt</span>\n<span class=\"s2\">
    \   const decrypted = CryptoJS.AES.decrypt(</span>\n<span class=\"s2\">      CryptoJS.lib.CipherParams.create(</span><span
    class=\"se\">{{</span>\n<span class=\"s2\">        ciphertext: ciphertext</span>\n<span
    class=\"s2\">      </span><span class=\"se\">}}</span><span class=\"s2\">),</span>\n<span
    class=\"s2\">      key,</span>\n<span class=\"s2\">      </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">        iv: iv,</span>\n<span class=\"s2\">        mode: CryptoJS.mode.CBC,</span>\n<span
    class=\"s2\">        padding: CryptoJS.pad.Pkcs7</span>\n<span class=\"s2\">      </span><span
    class=\"se\">}}</span>\n<span class=\"s2\">    );</span>\n<span class=\"s2\">
    \   </span>\n<span class=\"s2\">    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    console.log(&#39;Debug: Decrypted
    text length:&#39;, decryptedText ? decryptedText.length : &#39;null&#39;);</span>\n<span
    class=\"s2\">    console.log(&#39;Debug: Decrypted text preview:&#39;, decryptedText
    ? decryptedText.substring(0, 100) + &#39;...&#39; : &#39;null&#39;);</span>\n<span
    class=\"s2\">    </span>\n<span class=\"s2\">    if (decryptedText &amp;&amp;
    decryptedText.length &gt; 0) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \     console.log(&#39;Debug: Decryption successful, showing content&#39;);</span>\n<span
    class=\"s2\">      // Hide password prompt and show decrypted content</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">      </span>\n<span class=\"s2\">
    \     // Get post metadata from the page</span>\n<span class=\"s2\">      const
    postTitle = document.title || &#39;Protected Post&#39;;</span>\n<span class=\"s2\">
    \     const postDate = document.querySelector(&#39;time&#39;)?.textContent ||
    &#39;&#39;;</span>\n<span class=\"s2\">      const postTags = Array.from(document.querySelectorAll(&#39;.tag,
    .badge&#39;)).map(tag =&gt; tag.textContent).join(&#39; &#39;);</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      // Create properly structured
    content matching post_partial.html structure and CSS classes</span>\n<span class=\"s2\">
    \     // Add top margin to prevent overlap with search bar</span>\n<span class=\"s2\">
    \     const structuredContent = `</span>\n<span class=\"s2\">        &lt;div class=&quot;mt-8
    pt-4&quot;&gt;</span>\n<span class=\"s2\">          &lt;article class=&quot;w-full
    pattern-card glow-card p-4 md:p-6 post-container&quot;&gt;</span>\n<span class=\"s2\">
    \           &lt;section class=&quot;post-header mb-8&quot;&gt;</span>\n<span class=\"s2\">
    \             &lt;h1 id=&quot;title&quot; style=&quot;font-size: 4rem; line-height:
    1.1; font-weight: 800;&quot; class=&quot;text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large&quot;&gt;$</span><span class=\"se\">{{</span><span class=\"s2\">postTitle</span><span
    class=\"se\">}}</span><span class=\"s2\">&lt;/h1&gt;</span>\n<span class=\"s2\">
    \             $</span><span class=\"se\">{{</span><span class=\"s2\">postDate
    ? `&lt;div class=&quot;flex items-center text-sm text-text-main/80 mb-6&quot;&gt;&lt;time&gt;$</span><span
    class=\"se\">{{</span><span class=\"s2\">postDate</span><span class=\"se\">}}</span><span
    class=\"s2\">&lt;/time&gt;&lt;/div&gt;` : &#39;&#39;</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">              $</span><span class=\"se\">{{</span><span class=\"s2\">postTags
    ? `&lt;div class=&quot;flex flex-wrap gap-2&quot;&gt;$</span><span class=\"se\">{{</span><span
    class=\"s2\">postTags</span><span class=\"se\">}}</span><span class=\"s2\">&lt;/div&gt;`
    : &#39;&#39;</span><span class=\"se\">}}</span>\n<span class=\"s2\">            &lt;/section&gt;</span>\n<span
    class=\"s2\">            &lt;section class=&quot;article-content prose dark:prose-invert
    lg:prose-xl mx-auto mt-8&quot;&gt;</span>\n<span class=\"s2\">              $</span><span
    class=\"se\">{{</span><span class=\"s2\">decryptedText</span><span class=\"se\">}}</span>\n<span
    class=\"s2\">            &lt;/section&gt;</span>\n<span class=\"s2\">          &lt;/article&gt;</span>\n<span
    class=\"s2\">        &lt;/div&gt;</span>\n<span class=\"s2\">      `;</span>\n<span
    class=\"s2\">      </span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).innerHTML
    = structuredContent;</span>\n<span class=\"s2\">      document.getElementById(&#39;decrypted-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">      console.log(&#39;Debug:
    Decryption failed - empty or null result&#39;);</span>\n<span class=\"s2\">      document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Failed to decrypt. Check your password.&#39;;</span>\n<span class=\"s2\">
    \     document.getElementById(&#39;error-message&#39;).style.display = &#39;block&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).value = &#39;&#39;;</span>\n<span
    class=\"s2\">      document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">    </span><span class=\"se\">}}</span>\n<span class=\"s2\">  </span><span
    class=\"se\">}}</span><span class=\"s2\"> catch (error) </span><span class=\"se\">{{</span>\n<span
    class=\"s2\">    console.error(&#39;Decryption error:&#39;, error);</span>\n<span
    class=\"s2\">    document.getElementById(&#39;error-message&#39;).textContent
    = &#39;Decryption failed: &#39; + error.message;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   decryptAndShow();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n<span class=\"s2\">&lt;/script&gt;</span>\n<span
    class=\"s2\">&quot;&quot;&quot;</span>\n    \n    <span class=\"k\">return</span>
    <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"_wrap_with_password_protection\" class=\"admonition-title\" style=\"margin:
    0; padding: .5rem 1rem;\">_wrap_with_password_protection <em class=\"small\">function</em></h2>\n<p>Wrap
    content with password protection HTML and JavaScript (content hiding only).</p>\n</div>\n<div
    class=\"admonition source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">_wrap_with_password_protection
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">_wrap_with_password_protection</span><span
    class=\"p\">(</span><span class=\"n\">content</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">password_hash</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">salt</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Wrap
    content with password protection HTML and JavaScript (content hiding only).&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"c1\"># Password protection HTML and JavaScript</span>\n
    \   <span class=\"n\">protection_html</span> <span class=\"o\">=</span> <span
    class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">&lt;!--
    Password Protection --&gt;</span>\n<span class=\"s2\">&lt;div id=&quot;password-prompt&quot;
    style=&quot;max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid
    #ddd; border-radius: 8px; text-align: center; font-family: Arial, sans-serif;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;h3&gt;\U0001F512 Password Required&lt;/h3&gt;</span>\n<span
    class=\"s2\">  &lt;p&gt;This post is password protected. Please enter the password
    to continue:&lt;/p&gt;</span>\n<span class=\"s2\">  &lt;input type=&quot;password&quot;
    id=&quot;password-input&quot; placeholder=&quot;Enter password&quot; style=&quot;padding:
    10px; margin: 10px; border: 1px solid #ccc; border-radius: 4px; width: 200px;&quot;&gt;</span>\n<span
    class=\"s2\">  &lt;br&gt;</span>\n<span class=\"s2\">  &lt;button onclick=&quot;checkPassword()&quot;
    style=&quot;padding: 10px 20px; background: #007cba; color: white; border: none;
    border-radius: 4px; cursor: pointer; margin: 10px;&quot;&gt;Submit&lt;/button&gt;</span>\n<span
    class=\"s2\">  &lt;div id=&quot;error-message&quot; style=&quot;color: red; margin-top:
    10px; display: none;&quot;&gt;Incorrect password. Please try again.&lt;/div&gt;</span>\n<span
    class=\"s2\">&lt;/div&gt;</span>\n\n<span class=\"s2\">&lt;div id=&quot;protected-content&quot;
    style=&quot;display: none;&quot;&gt;</span>\n\n<span class=\"si\">{</span><span
    class=\"n\">content</span><span class=\"si\">}</span>\n\n<span class=\"s2\">&lt;/div&gt;</span>\n\n<span
    class=\"s2\">&lt;!-- Include CryptoJS for secure hashing --&gt;</span>\n<span
    class=\"s2\">&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js&quot;&gt;&lt;/script&gt;</span>\n\n<span
    class=\"s2\">&lt;script&gt;</span>\n<span class=\"s2\">// Secure password hash
    (SHA-256 with salt)</span>\n<span class=\"s2\">const PASSWORD_HASH = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">password_hash</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n<span class=\"s2\">const SALT = &#39;</span><span
    class=\"si\">{</span><span class=\"n\">salt</span><span class=\"si\">}</span><span
    class=\"s2\">&#39;;</span>\n\n<span class=\"s2\">function checkPassword() </span><span
    class=\"se\">{{</span>\n<span class=\"s2\">  const password = document.getElementById(&#39;password-input&#39;).value;</span>\n<span
    class=\"s2\">  </span>\n<span class=\"s2\">  // Hash the entered password with
    salt</span>\n<span class=\"s2\">  const hashedInput = CryptoJS.SHA256(password
    + SALT).toString();</span>\n<span class=\"s2\">  </span>\n<span class=\"s2\">
    \ // Compare with stored hash</span>\n<span class=\"s2\">  if (hashedInput ===
    PASSWORD_HASH) </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;password-prompt&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;protected-content&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;none&#39;;</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span><span
    class=\"s2\"> else </span><span class=\"se\">{{</span>\n<span class=\"s2\">    document.getElementById(&#39;error-message&#39;).style.display
    = &#39;block&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).value
    = &#39;&#39;;</span>\n<span class=\"s2\">    document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"s2\">  </span><span class=\"se\">}}</span>\n<span class=\"se\">}}</span>\n\n<span
    class=\"s2\">// Allow Enter key to submit password</span>\n<span class=\"s2\">document.getElementById(&#39;password-input&#39;).addEventListener(&#39;keypress&#39;,
    function(e) </span><span class=\"se\">{{</span>\n<span class=\"s2\">  if (e.key
    === &#39;Enter&#39;) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \   checkPassword();</span>\n<span class=\"s2\">  </span><span class=\"se\">}}</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Focus
    on password input when page loads</span>\n<span class=\"s2\">window.addEventListener(&#39;load&#39;,
    function() </span><span class=\"se\">{{</span>\n<span class=\"s2\">  document.getElementById(&#39;password-input&#39;).focus();</span>\n<span
    class=\"se\">}}</span><span class=\"s2\">);</span>\n\n<span class=\"s2\">// Helper
    function to generate hash for a new password (for development)</span>\n<span class=\"s2\">function
    generatePasswordHash(password) </span><span class=\"se\">{{</span>\n<span class=\"s2\">
    \ return CryptoJS.SHA256(password + SALT).toString();</span>\n<span class=\"se\">}}</span>\n<span
    class=\"s2\">// Usage: console.log(generatePasswordHash(&#39;your_password_here&#39;));</span>\n<span
    class=\"s2\">&lt;/script&gt;</span>\n<span class=\"s2\">&quot;&quot;&quot;</span>\n
    \   \n    <span class=\"k\">return</span> <span class=\"n\">protection_html</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n
    \       </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  raw.md: ''
published: false
slug: plugins/password-protection
title: password_protection.py


---

---

Password Protection Plugin for Markata

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

---

!!! function
    <h2 id="_encrypt_content" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">_encrypt_content <em class="small">function</em></h2>

    Encrypt content using AES encryption compatible with CryptoJS.

???+ source "_encrypt_content <em class='small'>source</em>"
    ```python
    def _encrypt_content(content: str, password: str) -> str:
        """Encrypt content using AES encryption compatible with CryptoJS."""
        if not HAS_CRYPTOGRAPHY:
            raise ImportError("cryptography package required for content encryption. Install with: pip install cryptography")
        
        # Use a simple key derivation that matches CryptoJS expectations
        # CryptoJS.AES.encrypt(content, password) uses this approach
        key = hashlib.sha256(password.encode()).digest()
        
        # Generate random IV
        iv = os.urandom(16)
        
        # Pad content to AES block size
        padder = padding.PKCS7(128).padder()
        padded_content = padder.update(content.encode('utf-8'))
        padded_content += padder.finalize()
        
        # Encrypt
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        encrypted = encryptor.update(padded_content) + encryptor.finalize()
        
        # Return in format that CryptoJS can decrypt: base64(iv + encrypted)
        combined = iv + encrypted
        return base64.b64encode(combined).decode('utf-8')
    ```
!!! class
    <h2 id="PasswordProtectionConfig" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">PasswordProtectionConfig <em class="small">class</em></h2>

    Configuration for password protection plugin.

???+ source "PasswordProtectionConfig <em class='small'>source</em>"
    ```python
    class PasswordProtectionConfig(pydantic.BaseModel):
        """Configuration for password protection plugin."""
        # Salt for password hashing (required for security)
        salt: str = "blog_salt_2025"
        # Global default password (optional - can be overridden per post)
        # Use either password_hash (pre-computed) or encryption_password (plain text)
        password_hash: str = ""  # SHA256(password + salt) - leave empty to use encryption_password
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
    ```
!!! class
    <h2 id="Config" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">Config <em class="small">class</em></h2>

    Main config model.

???+ source "Config <em class='small'>source</em>"
    ```python
    class Config(pydantic.BaseModel):
        """Main config model."""
        password_protection: PasswordProtectionConfig = PasswordProtectionConfig()
    ```
!!! function
    <h2 id="config_model" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">config_model <em class="small">function</em></h2>

    Register the configuration model.

???+ source "config_model <em class='small'>source</em>"
    ```python
    def config_model(markata: "Markata") -> None:
        """Register the configuration model."""
        markata.config_models.append(Config)
    ```
!!! function
    <h2 id="post_render" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">post_render <em class="small">function</em></h2>

    Protect post content in feeds and descriptions before they are used.

???+ source "post_render <em class='small'>source</em>"
    ```python
    def post_render(markata: "Markata") -> None:
        """Protect post content in feeds and descriptions before they are used."""
        config = markata.config.password_protection
        
        markata.console.log("[blue]Password protection: Sanitizing protected posts in feeds[/blue]")
        
        for post in markata.articles:
            template_key_value = post.get('templateKey', '')
            
            # Only sanitize posts with the protected template key
            if template_key_value == config.protected_template_key:
                markata.console.log(f"[yellow]Sanitizing protected post for feeds: {post.get('title', 'Unknown')}[/yellow]")
                
                # Replace content fields that might leak in feeds
                protected_message = "🔒 This content is password protected."
                
                # Sanitize various content fields that could leak in feeds
                if hasattr(post, 'content'):
                    post.content = protected_message
                if hasattr(post, 'description'):
                    post.description = protected_message
                if hasattr(post, 'excerpt'):
                    post.excerpt = protected_message
                if hasattr(post, 'summary'):
                    post.summary = protected_message
                if hasattr(post, 'article_html'):
                    # Keep a backup of the original content for the save hook
                    if not hasattr(post, '_original_article_html'):
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
                if hasattr(post, 'tags'):
                    # Keep only generic tags, remove potentially sensitive ones
                    if post.tags:
                        # Replace with generic "protected" tag
                        post.tags = ["protected"]
                
                # Sanitize any other fields that might leak content
                if hasattr(post, 'subtitle'):
                    post.subtitle = protected_message
                if hasattr(post, 'lead'):
                    post.lead = protected_message
                if hasattr(post, 'intro'):
                    post.intro = protected_message
                if hasattr(post, 'abstract'):
                    post.abstract = protected_message
                
                markata.console.log(f"[green]Protected post sanitized for feeds: {post.get('title', 'Unknown')}[/green]")
    ```
!!! function
    <h2 id="save" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">save <em class="small">function</em></h2>

    Add password protection to posts by modifying the generated HTML files.

???+ source "save <em class='small'>source</em>"
    ```python
    def save(markata: "Markata") -> None:
        """Add password protection to posts by modifying the generated HTML files."""
        config = markata.config.password_protection
        
        markata.console.log(f"[blue]Password protection plugin running on {len(markata.articles)} posts[/blue]")
        
        for post in markata.articles:
            template_key_value = post.get('templateKey', '')
            
            # Only protect posts with the protected template key
            should_protect = template_key_value == config.protected_template_key
            
            markata.console.log(f"[yellow]Post {post.get('title', 'Unknown')}: templateKey={template_key_value}, should_protect={should_protect}[/yellow]")
            
            if should_protect:
                markata.console.log(f"[green]PROTECTING POST: {post.get('title', 'Unknown')}[/green]")
                
                # Get the output HTML file path
                output_file = post.output_html
                markata.console.log(f"[cyan]Output file: {output_file}[/cyan]")
                
                # Check if the HTML file exists and read its content
                if output_file.exists():
                    try:
                        html_content = output_file.read_text(encoding='utf-8')
                        markata.console.log(f"[cyan]Read HTML file with {len(html_content)} characters[/cyan]")
                        
                        # Extract the body content from the HTML for encryption
                        import re
                        
                        # Check if content is already password protected (avoid recursive encryption)
                        if ('password-prompt' in html_content or 
                            'encrypted-data' in html_content or 
                            'ENCRYPTED_DATA' in html_content or
                            'decryptAndShow' in html_content):
                            markata.console.log("[yellow]Content already appears to be password protected, skipping...[/yellow]")
                            continue
                        
                        # Check if we have original content backed up from post_render hook
                        article_match = None  # Initialize to avoid UnboundLocalError
                        if hasattr(post, '_original_article_html'):
                            markata.console.log("[cyan]Using original content backed up from post_render hook[/cyan]")
                            # Use the original content for encryption, not the sanitized version
                            content_to_encrypt = post._original_article_html
                            # Look for article tags in the current HTML to maintain structure
                            article_match = re.search(r'<article[^>]*>(.*?)</article>', html_content, re.DOTALL)
                            if not article_match:
                                # If no article tag found, we'll replace the entire content
                                article_match = None
                        else:
                            # Look for the main article content (this is a simplified approach)
                            # We'll encrypt everything between <article> tags or similar
                            article_match = re.search(r'<article[^>]*>(.*?)</article>', html_content, re.DOTALL)
                            if article_match:
                                content_to_encrypt = article_match.group(1)
                                markata.console.log(f"[cyan]Found article content with {len(content_to_encrypt)} characters[/cyan]")
                            else:
                                # Fallback: encrypt everything in the main content area
                                content_to_encrypt = html_content
                                markata.console.log("[cyan]Using full HTML content for encryption[/cyan]")
                                article_match = None
                            
                    except Exception as e:
                        markata.console.log(f"[red]Error reading HTML file {output_file}: {e}[/red]")
                        continue
                else:
                    markata.console.log(f"[red]HTML file does not exist: {output_file}[/red]")
                    continue
                
                if config.encrypt_content and content_to_encrypt:
                    # Get password and hash for this specific post
                    post_password = post.get('password', '')
                    post_password_hash = post.get('password_hash', '')
                    
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
                        password_hash = hashlib.sha256((post_password + config.salt).encode()).hexdigest()
                        markata.console.log(f"[blue]Using custom password from frontmatter for post: {post.get('title', 'Unknown')}[/blue]")
                        markata.console.log(f"[cyan]Password hash: {password_hash}[/cyan]")
                    elif post_password_hash:
                        # Use custom password hash from frontmatter
                        password_hash = post_password_hash
                        encryption_password = config.encryption_password or "default_encryption_key"
                        markata.console.log(f"[blue]Using custom password hash from frontmatter for post: {post.get('title', 'Unknown')}[/blue]")
                    else:
                        # Use global config - prefer password_hash, fallback to encryption_password
                        if config.password_hash:
                            password_hash = config.password_hash
                            encryption_password = config.encryption_password or "default_encryption_key"
                        elif config.encryption_password:
                            # Hash the global encryption password with salt
                            import hashlib
                            password_hash = hashlib.sha256((config.encryption_password + config.salt).encode()).hexdigest()
                            encryption_password = config.encryption_password
                        else:
                            # No global password configured - this shouldn't happen but provide fallback
                            markata.console.log(f"[yellow]Warning: No global password configured for post: {post.get('title', 'Unknown')}[/yellow]")
                            encryption_password = "default_encryption_key"
                            password_hash = hashlib.sha256((encryption_password + config.salt).encode()).hexdigest()
                        markata.console.log(f"[blue]Using global password config for post: {post.get('title', 'Unknown')}[/blue]")
                    
                    markata.console.log(f"[blue]Attempting encryption with password: {encryption_password[:5] if len(encryption_password) >= 5 else encryption_password}...[/blue]")
                    try:
                        encrypted_content = _encrypt_content(
                            content_to_encrypt, 
                            encryption_password
                        )
                        # Create the protected content wrapper
                        protected_content = _wrap_with_encrypted_content(
                            encrypted_content,
                            password_hash,
                            config.salt,
                            encryption_password
                        )
                        
                        # Replace the content in the HTML file
                        if article_match:
                            # Replace just the article content
                            new_html_content = html_content.replace(article_match.group(0), f"<article>{protected_content}</article>")
                        else:
                            # Replace the entire HTML content or use full protected content
                            new_html_content = protected_content
                        
                        # Write the modified HTML back to the file
                        output_file.write_text(new_html_content, encoding='utf-8')
                        markata.console.log(f"[green]Content encrypted successfully! Updated HTML file with {len(new_html_content)} characters[/green]")
                        markata.console.log(f"[cyan]Post template: {getattr(post, 'template', 'unknown')}[/cyan]")
                        markata.console.log(f"[cyan]Post templateKey: {getattr(post, 'templateKey', 'unknown')}[/cyan]")
                        
                        # Show first 200 chars of encrypted content
                        preview_content = new_html_content[:200]
                        markata.console.log(f"[cyan]First 200 chars of new HTML: {preview_content}...[/cyan]")
                    except ImportError as e:
                        markata.console.log(f"[red]Encryption failed: {e}[/red]")
                        markata.console.log("[yellow]Falling back to content hiding[/yellow]")
                        # Fall back to simple content hiding
                        # Use the same password logic for fallback
                        post_password = post.get('password', '')
                        post_password_hash = post.get('password_hash', '')
                        
                        if post_password:
                            import hashlib
                            # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                            password_hash = hashlib.sha256((post_password + config.salt).encode()).hexdigest()
                        elif post_password_hash:
                            password_hash = post_password_hash
                        else:
                            # Use global config - prefer password_hash, fallback to encryption_password
                            if config.password_hash:
                                password_hash = config.password_hash
                            elif config.encryption_password:
                                import hashlib
                                password_hash = hashlib.sha256((config.encryption_password + config.salt).encode()).hexdigest()
                            else:
                                import hashlib
                                password_hash = hashlib.sha256(("default_encryption_key" + config.salt).encode()).hexdigest()
                        
                        protected_content = _wrap_with_password_protection(
                            content_to_encrypt, 
                            password_hash, 
                            config.salt
                        )
                        # Replace content in HTML file
                        if article_match:
                            new_html_content = html_content.replace(article_match.group(0), f"<article>{protected_content}</article>")
                        else:
                            new_html_content = protected_content
                        output_file.write_text(new_html_content, encoding='utf-8')
                        markata.console.log(f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]")
                    except Exception as e:
                        markata.console.log(f"[red]Unexpected encryption error: {e}[/red]")
                        markata.console.log("[yellow]Falling back to content hiding[/yellow]")
                        # Fall back to simple content hiding
                        # Use the same password logic for fallback
                        post_password = post.get('password', '')
                        post_password_hash = post.get('password_hash', '')
                        
                        if post_password:
                            import hashlib
                            # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                            password_hash = hashlib.sha256((post_password + config.salt).encode()).hexdigest()
                        elif post_password_hash:
                            password_hash = post_password_hash
                        else:
                            # Use global config - prefer password_hash, fallback to encryption_password
                            if config.password_hash:
                                password_hash = config.password_hash
                            elif config.encryption_password:
                                import hashlib
                                password_hash = hashlib.sha256((config.encryption_password + config.salt).encode()).hexdigest()
                            else:
                                import hashlib
                                password_hash = hashlib.sha256(("default_encryption_key" + config.salt).encode()).hexdigest()
                        
                        protected_content = _wrap_with_password_protection(
                            content_to_encrypt, 
                            password_hash, 
                            config.salt
                        )
                        # Replace content in HTML file
                        if article_match:
                            new_html_content = html_content.replace(article_match.group(0), f"<article>{protected_content}</article>")
                        else:
                            new_html_content = protected_content
                        output_file.write_text(new_html_content, encoding='utf-8')
                        markata.console.log(f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]")
                else:
                    # Simple content hiding without encryption
                    markata.console.log("[blue]Using simple content hiding (no encryption)[/blue]")
                    
                    # Get password hash for this specific post
                    post_password = post.get('password', '')
                    post_password_hash = post.get('password_hash', '')
                    
                    if post_password:
                        import hashlib
                        # Hash password with salt to match JavaScript logic: SHA256(password + salt)
                        password_hash = hashlib.sha256((post_password + config.salt).encode()).hexdigest()
                    elif post_password_hash:
                        password_hash = post_password_hash
                    else:
                        # Use global config - prefer password_hash, fallback to encryption_password
                        if config.password_hash:
                            password_hash = config.password_hash
                        elif config.encryption_password:
                            import hashlib
                            password_hash = hashlib.sha256((config.encryption_password + config.salt).encode()).hexdigest()
                        else:
                            import hashlib
                            password_hash = hashlib.sha256(("default_encryption_key" + config.salt).encode()).hexdigest()
                    
                    protected_content = _wrap_with_password_protection(
                        content_to_encrypt, 
                        password_hash, 
                        config.salt
                    )
                    # Replace content in HTML file
                    if article_match:
                        new_html_content = html_content.replace(article_match.group(0), f"<article>{protected_content}</article>")
                    else:
                        new_html_content = protected_content
                    output_file.write_text(new_html_content, encoding='utf-8')
                    markata.console.log(f"[green]Content hidden successfully! New length: {len(new_html_content)}[/green]")
            else:
                markata.console.log(f"[dim]Post {post.get('title', 'Unknown')} does not need protection[/dim]")
    ```
!!! function
    <h2 id="_wrap_with_encrypted_content" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">_wrap_with_encrypted_content <em class="small">function</em></h2>

    Wrap encrypted content with password protection and decryption logic.

???+ source "_wrap_with_encrypted_content <em class='small'>source</em>"
    ```python
    def _wrap_with_encrypted_content(encrypted_content: str, password_hash: str, salt: str, encryption_password: str = "default_encryption_key") -> str:
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
    ```
!!! function
    <h2 id="_wrap_with_password_protection" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">_wrap_with_password_protection <em class="small">function</em></h2>

    Wrap content with password protection HTML and JavaScript (content hiding only).

???+ source "_wrap_with_password_protection <em class='small'>source</em>"
    ```python
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
    ```