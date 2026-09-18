---
date: 2026-04-11 10:32:50
templateKey: blog-post
title: Fixing Firefox Launcher on Kubuntu 22
published: False
tags:
  - agents
  - tech
---

- Problem: Firefox installed but missing from KDE/Plasma app menu
- Root cause: No .desktop launcher file — Firefox only worked from terminal
- Solution: Created desktop entry with standard KDE fields

```

[Desktop Entry]
Version=1.0
Name=Firefox
GenericName=Web Browser
Comment=Web Browser
Exec=firefox %u
Terminal=false
Icon=firefox
Type=Application
Categories=Network;WebBrowser;
MimeType=x-scheme-handler/http;x-scheme-handler/https;
StartupNotify=true
StartupWMClass=firefox

```

- Location: ~/.local/share/applications/firefox.desktop (user-local, no sudo needed)
- Discovery step: Checked /usr/share/applications/ — empty for Firefox
- Applied fix: Ran kbuildsycoca5 to rebuild Plasma's menu cache
- Result: Firefox now appears in app menu (Network category) and Alt+F2 autocomplete
