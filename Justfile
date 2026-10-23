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

# --- markata-go (new engine; builds to markout-go/) ---
# encryption keys come from .env or env vars (MARKATA_GO_ENCRYPTION_KEY_*)

# sync thoughts from thoughts.waylonwalker.com into pages/thoughts/
sync-thoughts:
    uv run --script scripts/sync-thoughts.py

go-build: sync-thoughts
    @just decode-private
    markata-go build
    @just encode-private
    cp -r .well-known markout-go/
    rm -rf markout-go/.markata markout-go/.markata-fontpack-preloads.json

# skip minify/tailwind/pagefind for a quick local loop
go-fast: sync-thoughts
    @just decode-private
    markata-go build --fast
    @just encode-private

go-serve: sync-thoughts
    @just decode-private
    markata-go serve --open

go-clean:
    rm -rf markout-go .markata

# create/open today's daily note
daily:
    markata-go new "$(date +%F) Notes" -t daily || true
    ${EDITOR:-vim} "pages/daily/$(date +%F)-notes.md"

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
