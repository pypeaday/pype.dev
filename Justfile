default:
  @just --list

clean:
    rm -rf markout || echo "markout directory not found"
    ./.venv/bin/markata clean

build:
    ./.venv/bin/markata build

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
