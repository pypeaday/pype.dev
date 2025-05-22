default:
  @just --list

build:
    ./.venv/bin/markata clean && ./.venv/bin/markata build
serve: 
    @just build
    python -m http.server -d markout 8003
    # marmite pype.dev markout --watch --serve --bind "0.0.0.0:8001"

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
