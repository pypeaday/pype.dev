---
date: 2025-09-08 06:33:13
templateKey: til
title: Zsh alias for uv scripts
published: True
tags:
  - python
  - til
  - tech
---

It's apparently advantageous for uv to have a specific shebang set that `uv init` doesn't add, no problem, we can have a zsh alias for it


```bash
alias add-shebang='f(){ 
  if [[ ! -s $1 ]]; then 
    echo "#!/usr/bin/env -S uv run --script" > "$1"; 
  elif head -n1 "$1" | grep -q "^#!"; then 
    echo "Shebang already present in $1"; 
  else 
    sed -i "1i #!/usr/bin/env -S uv run --script" "$1"; 
  fi
}; f'
```

Then if you have a python script from `uv init --script` you can `add-shebang myscript.py` to add the shebang.

