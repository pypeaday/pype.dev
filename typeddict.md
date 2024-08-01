---
article_html: "<p>Type hinting has helped me write code almost as much, if not more,
  than unit testing.</p>\n<p>One thing I love is that with complete type hinting you
  get a lot more out of your LSP.\nTyping dictionaries can be tricky and I recently
  learned about <code>TypedDict</code> to do exactly what I needed!</p>\n<h2 id=\"the-problem\">The
  Problem</h2>\n<p>It might not be straight up obvious what the problem is, especially
  if you don't utilize tools like <code>mypy</code> or <code>flake8</code> in your
  development.</p>\n<p>My handy-dandy <code>nvim-lsp</code> gives me a lot of feedback
  when I'm coding and it's immensely helpful.</p>\n<p>So with the LSP giving me constant
  feedback here's the issue:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">Dict</span><span class=\"p\">,</span> <span class=\"n\">List</span><span
  class=\"p\">,</span> <span class=\"n\">Union</span>\n\n<span class=\"n\">my_dict</span><span
  class=\"p\">:</span> <span class=\"n\">Dict</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">Union</span><span
  class=\"p\">[</span><span class=\"n\">List</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">],</span> <span class=\"nb\">str</span><span
  class=\"p\">]]</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span
  class=\"s2\">&quot;key_1&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;val_1&quot;</span><span
  class=\"p\">,</span>\n    <span class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span>
  <span class=\"p\">[</span><span class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;ls_2&quot;</span><span class=\"p\">],</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"n\">my_dict</span><span class=\"p\">[</span><span class=\"s2\">&quot;key_2&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">pop</span><span
  class=\"p\">()</span>\n</code></pre></div>\n<p>With the above script you'll get
  an annoying warning about using <code>pop</code> on <code>key_2</code>.</p>\n<p><img
  alt=\"Alt text\" src=\"/images/typed-dict-warning.png\" title=\"dict-warning\" /></p>\n<h2
  id=\"the-solution\">The Solution</h2>\n<p>Maybe you can stomach getting yelled at
  by your LSP but I like complete silence if at all possible.</p>\n<p><code>TypedDict</code>
  \ was the saving grace.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">TypedDict</span>\n\n<span class=\"n\">MyDict</span> <span class=\"o\">=</span>
  <span class=\"n\">TypedDict</span><span class=\"p\">(</span><span class=\"s2\">&quot;MyDict&quot;</span><span
  class=\"p\">,</span> <span class=\"p\">{</span><span class=\"s2\">&quot;key_1&quot;</span><span
  class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
  class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span> <span class=\"n\">List</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">]})</span>\n\n<span
  class=\"n\">my_typed_dict</span><span class=\"p\">:</span> <span class=\"n\">MyDict</span>
  <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;key_1&quot;</span><span
  class=\"p\">:</span> <span class=\"s2\">&quot;val_1&quot;</span><span class=\"p\">,</span>\n
  \   <span class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span> <span
  class=\"p\">[</span><span class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;ls_2&quot;</span><span class=\"p\">],</span>\n<span class=\"p\">}</span>\n\n\n<span
  class=\"n\">my_typed_dict</span><span class=\"p\">[</span><span class=\"s2\">&quot;key_2&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">pop</span><span
  class=\"p\">()</span>\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/typed-dict.png\"
  title=\"typeddict\" /></p>\n<blockquote>\n<p>I was able to import TypedDict from
  typing, mypy_extensions, and typing_extensions</p>\n</blockquote>\n<p>With <code>TypedDict</code>
  you define your custom type, match the first argument to <code>TypedDict</code>
  with the name of the variable (idk why), then type hint each key you expect in the
  dict!\nIt's super easy and I think puts you into a position of being extremely explicit
  with your dictionary variables. \nThis isn't always desired or appropriate but in
  most of my use cases it is.</p>\n<h2 id=\"rtfm\">RTFM</h2>\n<p>There's other implementation
  of <code>TypedDict</code> and while writing this I saw that most of the docs define
  a <code>class</code> for the type like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">TypedDict</span>\n<span class=\"k\">class</span> <span class=\"nc\">MyDict</span><span
  class=\"p\">(</span><span class=\"n\">TypedDict</span><span class=\"p\">):</span>\n
  \   <span class=\"n\">key_1</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">key_2</span><span class=\"p\">:</span> <span class=\"n\">List</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">]</span>\n\n<span
  class=\"n\">my_dict</span> <span class=\"p\">:</span> <span class=\"n\">MyDict</span>
  <span class=\"o\">=</span> <span class=\"p\">{</span><span class=\"s1\">&#39;key_1&#39;</span><span
  class=\"p\">:</span> <span class=\"s1\">&#39;val_1&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;key_2&#39;</span><span class=\"p\">:</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;ls_2&quot;</span><span
  class=\"p\">]}</span>\n</code></pre></div>\n<p><a href=\"https://peps.python.org/pep-0589/\">pep
  docs</a></p>\n<p><a href=\"https://mypy.readthedocs.io/en/latest/more_types.html#typeddict\">mypy
  docs</a></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/jellyfin-media-players'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Jellyfin-Media-Players</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/and-vs'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>And-vs-&</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/typeddict.png
date: 2022-04-15
datetime: 2022-04-15 00:00:00+00:00
description: Type hinting has helped me write code almost as much, if not more, than
  unit testing. One thing I love is that with complete type hinting you get a lot
  more out
edit_link: https://github.com/edit/main/pages/til/typeddict.md
html: "<p>Type hinting has helped me write code almost as much, if not more, than
  unit testing.</p>\n<p>One thing I love is that with complete type hinting you get
  a lot more out of your LSP.\nTyping dictionaries can be tricky and I recently learned
  about <code>TypedDict</code> to do exactly what I needed!</p>\n<h2 id=\"the-problem\">The
  Problem</h2>\n<p>It might not be straight up obvious what the problem is, especially
  if you don't utilize tools like <code>mypy</code> or <code>flake8</code> in your
  development.</p>\n<p>My handy-dandy <code>nvim-lsp</code> gives me a lot of feedback
  when I'm coding and it's immensely helpful.</p>\n<p>So with the LSP giving me constant
  feedback here's the issue:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">Dict</span><span class=\"p\">,</span> <span class=\"n\">List</span><span
  class=\"p\">,</span> <span class=\"n\">Union</span>\n\n<span class=\"n\">my_dict</span><span
  class=\"p\">:</span> <span class=\"n\">Dict</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">Union</span><span
  class=\"p\">[</span><span class=\"n\">List</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">],</span> <span class=\"nb\">str</span><span
  class=\"p\">]]</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span
  class=\"s2\">&quot;key_1&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;val_1&quot;</span><span
  class=\"p\">,</span>\n    <span class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span>
  <span class=\"p\">[</span><span class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;ls_2&quot;</span><span class=\"p\">],</span>\n<span class=\"p\">}</span>\n\n<span
  class=\"n\">my_dict</span><span class=\"p\">[</span><span class=\"s2\">&quot;key_2&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">pop</span><span
  class=\"p\">()</span>\n</code></pre></div>\n<p>With the above script you'll get
  an annoying warning about using <code>pop</code> on <code>key_2</code>.</p>\n<p><img
  alt=\"Alt text\" src=\"/images/typed-dict-warning.png\" title=\"dict-warning\" /></p>\n<h2
  id=\"the-solution\">The Solution</h2>\n<p>Maybe you can stomach getting yelled at
  by your LSP but I like complete silence if at all possible.</p>\n<p><code>TypedDict</code>
  \ was the saving grace.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">TypedDict</span>\n\n<span class=\"n\">MyDict</span> <span class=\"o\">=</span>
  <span class=\"n\">TypedDict</span><span class=\"p\">(</span><span class=\"s2\">&quot;MyDict&quot;</span><span
  class=\"p\">,</span> <span class=\"p\">{</span><span class=\"s2\">&quot;key_1&quot;</span><span
  class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">,</span> <span
  class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span> <span class=\"n\">List</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">]})</span>\n\n<span
  class=\"n\">my_typed_dict</span><span class=\"p\">:</span> <span class=\"n\">MyDict</span>
  <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;key_1&quot;</span><span
  class=\"p\">:</span> <span class=\"s2\">&quot;val_1&quot;</span><span class=\"p\">,</span>\n
  \   <span class=\"s2\">&quot;key_2&quot;</span><span class=\"p\">:</span> <span
  class=\"p\">[</span><span class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;ls_2&quot;</span><span class=\"p\">],</span>\n<span class=\"p\">}</span>\n\n\n<span
  class=\"n\">my_typed_dict</span><span class=\"p\">[</span><span class=\"s2\">&quot;key_2&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">pop</span><span
  class=\"p\">()</span>\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/typed-dict.png\"
  title=\"typeddict\" /></p>\n<blockquote>\n<p>I was able to import TypedDict from
  typing, mypy_extensions, and typing_extensions</p>\n</blockquote>\n<p>With <code>TypedDict</code>
  you define your custom type, match the first argument to <code>TypedDict</code>
  with the name of the variable (idk why), then type hint each key you expect in the
  dict!\nIt's super easy and I think puts you into a position of being extremely explicit
  with your dictionary variables. \nThis isn't always desired or appropriate but in
  most of my use cases it is.</p>\n<h2 id=\"rtfm\">RTFM</h2>\n<p>There's other implementation
  of <code>TypedDict</code> and while writing this I saw that most of the docs define
  a <code>class</code> for the type like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">TypedDict</span>\n<span class=\"k\">class</span> <span class=\"nc\">MyDict</span><span
  class=\"p\">(</span><span class=\"n\">TypedDict</span><span class=\"p\">):</span>\n
  \   <span class=\"n\">key_1</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">key_2</span><span class=\"p\">:</span> <span class=\"n\">List</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">]</span>\n\n<span
  class=\"n\">my_dict</span> <span class=\"p\">:</span> <span class=\"n\">MyDict</span>
  <span class=\"o\">=</span> <span class=\"p\">{</span><span class=\"s1\">&#39;key_1&#39;</span><span
  class=\"p\">:</span> <span class=\"s1\">&#39;val_1&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;key_2&#39;</span><span class=\"p\">:</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;ls_1&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;ls_2&quot;</span><span
  class=\"p\">]}</span>\n</code></pre></div>\n<p><a href=\"https://peps.python.org/pep-0589/\">pep
  docs</a></p>\n<p><a href=\"https://mypy.readthedocs.io/en/latest/more_types.html#typeddict\">mypy
  docs</a></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/jellyfin-media-players'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Jellyfin-Media-Players</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/and-vs'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>And-vs-&</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Type hinting has helped me write code almost as much, if not more,
  than unit testing. One thing I love is that with complete type hinting you get a
  lot more out of your LSP. It might not be straight up obvious what the problem is,
  especially if you d
now: 2024-08-01 13:40:17.987584
path: pages/til/typeddict.md
published: true
slug: typeddict
super_description: Type hinting has helped me write code almost as much, if not more,
  than unit testing. One thing I love is that with complete type hinting you get a
  lot more out of your LSP. It might not be straight up obvious what the problem is,
  especially if you don My handy-dandy  So with the LSP giving me constant feedback
  here With the above script you Maybe you can stomach getting yelled at by your LSP
  but I like complete silence if at all possible. TypedDict I was able to import TypedDict
  from typing, my
tags:
- til
- python
- tech
templateKey: til
title: Typeddict
today: 2024-08-01
---

Type hinting has helped me write code almost as much, if not more, than unit testing.

One thing I love is that with complete type hinting you get a lot more out of your LSP.
Typing dictionaries can be tricky and I recently learned about `TypedDict` to do exactly what I needed!


## The Problem

It might not be straight up obvious what the problem is, especially if you don't utilize tools like `mypy` or `flake8` in your development.

My handy-dandy `nvim-lsp` gives me a lot of feedback when I'm coding and it's immensely helpful.

So with the LSP giving me constant feedback here's the issue:

```python
from typing import Dict, List, Union

my_dict: Dict[str, Union[List[str], str]] = {
    "key_1": "val_1",
    "key_2": ["ls_1", "ls_2"],
}

my_dict["key_2"].pop()
```

With the above script you'll get an annoying warning about using `pop` on `key_2`.


![Alt text](/images/typed-dict-warning.png "dict-warning")


## The Solution

Maybe you can stomach getting yelled at by your LSP but I like complete silence if at all possible.

`TypedDict`  was the saving grace.

```python
from typing import TypedDict

MyDict = TypedDict("MyDict", {"key_1": str, "key_2": List[str]})

my_typed_dict: MyDict = {
    "key_1": "val_1",
    "key_2": ["ls_1", "ls_2"],
}


my_typed_dict["key_2"].pop()
```

![Alt text](/images/typed-dict.png "typeddict")

> I was able to import TypedDict from typing, mypy_extensions, and typing_extensions

With `TypedDict` you define your custom type, match the first argument to `TypedDict` with the name of the variable (idk why), then type hint each key you expect in the dict!
It's super easy and I think puts you into a position of being extremely explicit with your dictionary variables. 
This isn't always desired or appropriate but in most of my use cases it is.

## RTFM

There's other implementation of `TypedDict` and while writing this I saw that most of the docs define a `class` for the type like this:

```python
from typing import TypedDict
class MyDict(TypedDict):
    key_1: str
    key_2: List[str]

my_dict : MyDict = {'key_1': 'val_1', 'key_2': ["ls_1", "ls_2"]}

```

[pep docs](https://peps.python.org/pep-0589/)

[mypy docs](https://mypy.readthedocs.io/en/latest/more_types.html#typeddict)
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/jellyfin-media-players'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Jellyfin-Media-Players</p>
        </div>
    </a>
    
    <a class='next' href='/and-vs'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>And-vs-&</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>