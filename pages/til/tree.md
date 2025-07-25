---
templateKey: til
tags: ['linux', 'tech', 'til']
title: Tree
date: 2022-03-06T00:00:00
published: True
cover: "media/tree.png"

---

I wanted a quick way to generate an `index.html` for a directory of html files that grows by 1 or 2 files a week.
I don't know any html (the files are exports from my [tiddlywiki](/tiddly-wiki))...

`tree` is just the answer.

Say I have a file structure like this:

```
./html-files
├── file1.html
└── file2.html
```

To generate a barebones simple `index.html` we can use tree as follows:

`tree ./html-files -H "." -L 1 -P "*.html"`

and get the following:

```html

<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <meta name="Author" content="Made by 'tree'">
 <meta name="GENERATOR" content="$Version: $ tree v1.8.0 (c) 1996 - 2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro $">
 <title>Directory Tree</title>
 <style type="text/css">
  <!--
  BODY { font-family : ariel, monospace, sans-serif; }
  P { font-weight: normal; font-family : ariel, monospace, sans-serif; color: black; background-color: transparent;}
  B { font-weight: normal; color: black; background-color: transparent;}
  A:visited { font-weight : normal; text-decoration : none; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:link    { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:hover   { color : #000000; font-weight : normal; text-decoration : underline; background-color : yellow; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:active  { color : #000000; font-weight: normal; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  .VERSION { font-size: small; font-family : arial, sans-serif; }
  .NORM  { color: black;  background-color: transparent;}
  .FIFO  { color: purple; background-color: transparent;}
  .CHAR  { color: yellow; background-color: transparent;}
  .DIR   { color: blue;   background-color: transparent;}
  .BLOCK { color: yellow; background-color: transparent;}
  .LINK  { color: aqua;   background-color: transparent;}
  .SOCK  { color: fuchsia;background-color: transparent;}
  .EXEC  { color: green;  background-color: transparent;}
  -->
 </style>
</head>
<body>
        <h1>Directory Tree</h1><p>
        <a href=".">.</a><br>
        ├── <a href="./file1.html">file1.html</a><br>
        └── <a href="./file2.html">file2.html</a><br>
        <br><br>
        </p>
        <p>

0 directories, 2 files
        <br><br>
        </p>
        <hr>
        <p class="VERSION">
                 tree v1.8.0 © 1996 - 2018 by Steve Baker and Thomas Moore <br>
                 HTML output hacked and copyleft © 1998 by Francesc Rocher <br>
                 JSON output hacked and copyleft © 2014 by Florian Sesser <br>
                 Charsets / OS/2 support © 2001 by Kyosuke Tokoro
        </p>
</body>
</html>

```


which [looks like this](/tree-index-example.html) when you serve it up with `python -m http.server`
