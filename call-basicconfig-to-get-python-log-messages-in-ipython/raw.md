---
date: 2022-12-10 14:04:23
templateKey: til
title: Call basicConfig to get Python log messages in iPython
published: True
tags:
  - python
  - cli
  - tech

---

# Logging instead of printing

I am trying to adopt `logger.debug` instead of `print` but ran into a confusing
thing in ipython during Advent of Code... I riddled by script with
`logger.debug` (yes after setting `logging.setLevel('DEBUG')`) but in ipython
none of my log messages showed up!

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel("DEBUG")

```

Turns out what I was missing was a call to `basicConfig`

```python
import logging

# forget this and your messages are in the ether! or at least not seen in ipython...
logging.basicConfig()

logger = logging.getLogger(__name__)
logger.setLevel("DEBUG")
```


# Bonus

Want your new messages to show up while iterating on something without killing
the ipython kernel?

```python
from importlib import reload
reload(logging) # to make sure you get new log messages you add while developing!

```
