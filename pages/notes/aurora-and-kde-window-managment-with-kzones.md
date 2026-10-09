---
date: 2026-04-25 06:51:20
templateKey: note
title: Aurora and KDE Window Managment with KZones
published: True
tags:
  - window-management
  - note

---

I have used a variety of window managers on a variety of distros and OS's over the last several years and because my hardware usage feels regularly in flux I don't have an air-tight common setup for any given environment. On my desktop the way I give myself some nice easy window management is with KZones and this config:

```json
[
 {
        "name": "Side by Side",
        "padding": 2,
        "zones": [
            {
                "x": 0,
                "y": 0,
                "height": 100,
                "width": 80
            },
            {
                "x": 80,
                "y": 0,
                "height": 100,
                "width": 20
            }
        ]
    },
    {
        "name": "Split Top",
        "padding": 2,
        "zones": [
            {
                "x": 0,
                "y": 0,
                "height": 50,
                "width": 50
            },
            {
                "x": 50,
                "y": 0,
                "height": 50,
                "width": 50
            },
            {
                "x": 0,
                "y": 50,
                "height": 50,
                "width": 100
            }
        ]
    },
    {
        "name": "Full Screen",
        "padding": 2,
        "zones": [
            {
                "x": 0,
                "y": 0,
                "height": 100,
                "width": 100
            }
        ]
    },
{
                "name": "Stacked",
        "padding": 2,
        "zones": [
            {
                "x": 0,
                "y": 0,
                "height": 70,
                "width": 100
            },
            {
                "x": 0,
                "y": 70,
                "height": 30,
                "width": 100
            }
        ]
    }
]
```


