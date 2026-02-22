---
date: 2024-05-06 11:57:07
templateKey: til
title: Customize K9s
published: True
tags:
  - cli
  - homelab
  - tech
  - k8s
  - til

---

To customize k9s use the skins from catppuccin or the ones k9s supplies

```bash
OUT="${XDG_CONFIG_HOME:-$HOME/.config}/k9s/skins"
mkdir -p "$OUT"
curl -L https://github.com/catppuccin/k9s/archive/main.tar.gz | tar xz -C "$OUT" --strip-components=2 k9s-main/dist
```

Then edit your k9s config

```
# ~/.config/k9s/config.yml
k9s:
  ui:
    skin: catppuccin-mocha
    # ...or another flavor:
    # skin: catppuccin-macchiato
    # skin: catppuccin-frappe
    # skin: catppuccin-latte

    # ...or the transparent variants:
    # skin: catppuccin-mocha-transparent
    # skin: catppuccin-macchiato-transparent
    # skin: catppuccin-frappe-transparent
    # skin: catppuccin-latte-transparent
```

Other k9s skins are available [here](https://github.com/derailed/k9s/tree/master/skins)
