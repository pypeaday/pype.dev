default:
  @just --list

clean:
    rm -rf markout || echo "markout directory not found"
    # make sure to re-encode from plain text file to b64 file so as to not reset the file during build
    @just encode-private
    @just decode-private
    uv run markata clean

build:
    # make sure to re-encode from plain text file to b64 file so as to not reset the file during build
    @just encode-private
    @just decode-private
    uv run markata build
    cp -r .well-known markout/
    rm markout/markata.json
    @just encode-private

clean-build:
    @just clean
    @just build

serve: 
    @just build
    python -m http.server -d markout 8123

clean-serve: 
    @just clean
    @just build
    python -m http.server -d markout 8123

tailwind:
    npx tailwindcss --input tailwind/input.css --output static/app.css --minify --watch
    # npx tailwindcss --input tailwind/input.css --output static/app.css --minify

# Base64 encode private files to obfuscate from GitHub search
encode-private:
    #!/bin/bash
    echo "Encoding private files..."
    for file in pages/private/*.md; do
        if [ -f "$file" ] && [[ "$file" != *.b64 ]]; then
            echo "Encoding: $file"
            base64 -w 0 "$file" > "$file.b64"
            rm "$file"
        fi
    done
    echo "Private files encoded."

# Base64 decode private files for build time
decode-private:
    #!/bin/bash
    echo "Decoding private files..."
    for file in pages/private/*.b64; do
        if [ -f "$file" ]; then
            original="${file%.b64}"
            echo "Decoding: $file -> $original"
            base64 -d "$file" > "$original"
        fi
    done
    echo "Private files decoded."

# Manually encode all private files (for initial setup or manual use)
manual-encode-private:
    @just encode-private

# Manually decode all private files (for editing)
manual-decode-private:
    @just decode-private

[group('i-was-wrecked')]
get-vault-key:
    bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'

[group('i-was-wrecked')]
encrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

[group('i-was-wrecked')]
decrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key

[group('i-was-wrecked')]
encrypt-unsafe:
    #!/bin/bash
    set -e
    just get-vault-key >> key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

[group('i-was-wrecked')]
decrypt-unsafe:
    #!/bin/bash
    set -e
    just get-vault-key >> key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key

# List and open draft posts (published: false) in fzf picker
drafts:
    #!/bin/bash
    set -e
    
    draft_files=$(uvx --with python-frontmatter python scripts/find_drafts.py)
    
    if [ -z "$draft_files" ]; then
        echo "No drafts found"
        exit 0
    fi
    
    selected=$(echo "$draft_files" | fzf --delimiter="|" --with-nth=2 --preview="cat {1}" --preview-window=right:60%:wrap --header="Select a draft to edit" | cut -d"|" -f1)
    
    if [ -n "$selected" ] && [ -f "$selected" ]; then
        if [ -n "$EDITOR" ]; then
            "$EDITOR" "$selected"
        else
            vim "$selected"
        fi
    fi
