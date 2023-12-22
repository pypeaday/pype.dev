clean:
    hatch run markata clean
build:
    hatch runmarkata build
tui:
    hatch runmarkata tui
serve:
    hatch runpython -m http.server 8000 --directory=markout
clean-build:
    hatch run clean-build
clean-tui:
    hatch run clean-tui
build-serve:
    hatch run build-serve
fresh:
    hatch run clean-serve
