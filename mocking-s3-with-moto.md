---
article_html: "<h2 id=\"todo\">TODO</h2>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">os</span>\n\n<span class=\"kn\">import</span>
  <span class=\"nn\">boto3</span>\n<span class=\"kn\">import</span> <span class=\"nn\">pytest</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">moto</span> <span class=\"kn\">import</span>
  <span class=\"n\">mock_s3</span>\n\n<span class=\"n\">MY_BUCKET</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;bucket&quot;</span>\n<span class=\"c1\"># BAD PREFIX</span>\n<span
  class=\"n\">MY_PREFIX</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;bucket/project/data/layer/dataset/&quot;</span>\n\n\n<span
  class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
  class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span>
  <span class=\"nf\">aws_credentials</span><span class=\"p\">():</span>\n<span class=\"w\">
  \   </span><span class=\"sd\">&quot;&quot;&quot;Mocked AWS Credentials for moto.&quot;&quot;&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_ACCESS_KEY_ID&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECRET_ACCESS_KEY&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECURITY_TOKEN&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SESSION_TOKEN&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_DEFAULT_REGION&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;us-east-1&quot;</span>\n\n\n<span
  class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
  class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span>
  <span class=\"nf\">s3</span><span class=\"p\">(</span><span class=\"n\">aws_credentials</span><span
  class=\"p\">):</span>\n    <span class=\"k\">with</span> <span class=\"n\">mock_s3</span><span
  class=\"p\">():</span>\n        <span class=\"k\">yield</span> <span class=\"n\">boto3</span><span
  class=\"o\">.</span><span class=\"n\">client</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;s3&quot;</span><span class=\"p\">,</span> <span class=\"n\">region_name</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;us-east-1&quot;</span><span class=\"p\">)</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">_upload_fixtures</span><span class=\"p\">(</span><span
  class=\"n\">s3</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span
  class=\"kc\">None</span><span class=\"p\">:</span>\n    <span class=\"n\">s3</span><span
  class=\"o\">.</span><span class=\"n\">put_object</span><span class=\"p\">(</span><span
  class=\"n\">Bucket</span><span class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span
  class=\"p\">,</span> <span class=\"n\">Key</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;project/data/layer/dataset&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">Body</span><span class=\"o\">=</span><span class=\"sa\">b</span><span
  class=\"s2\">&quot;some data&quot;</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span>
  <span class=\"nf\">test_get_list_of_dataset_versions</span><span class=\"p\">(</span><span
  class=\"n\">s3</span><span class=\"p\">):</span>\n    <span class=\"c1\"># We need
  to create the bucket since this is all in Moto&#39;s &#39;virtual&#39; AWS account</span>\n
  \   <span class=\"n\">s3</span><span class=\"o\">.</span><span class=\"n\">create_bucket</span><span
  class=\"p\">(</span><span class=\"n\">Bucket</span><span class=\"o\">=</span><span
  class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>\n    <span class=\"n\">_upload_fixtures</span><span
  class=\"p\">(</span><span class=\"n\">s3</span><span class=\"p\">)</span>\n\n    <span
  class=\"n\">objs</span> <span class=\"o\">=</span> <span class=\"n\">s3</span><span
  class=\"o\">.</span><span class=\"n\">list_objects_v2</span><span class=\"p\">(</span><span
  class=\"n\">Bucket</span><span class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span
  class=\"p\">)</span>  <span class=\"c1\"># , Prefix=MY_PREFIX)</span>\n    <span
  class=\"k\">assert</span> <span class=\"n\">objs</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;Contents&quot;</span><span
  class=\"p\">)</span> <span class=\"ow\">is</span> <span class=\"ow\">not</span>
  <span class=\"kc\">None</span>\n\n    <span class=\"c1\"># test_datasets = [</span>\n
  \   <span class=\"c1\">#     c[&quot;Key&quot;]</span>\n    <span class=\"c1\">#
  \    for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)[&quot;Contents&quot;]</span>\n
  \   <span class=\"c1\">#     if c[&quot;Key&quot;] != MY_PREFIX</span>\n    <span
  class=\"c1\"># ]</span>\n</code></pre></div>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/psutils-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Psutil-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/unpack-anywhere-with-star'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Unpack-Anywhere-With-Star</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/mocking-s3-with-moto.png
date: 2022-05-12
datetime: 2022-05-12 00:00:00+00:00
description: ''
edit_link: https://github.com/edit/main/pages/til/mocking-s3-with-moto.md
html: "<h2 id=\"todo\">TODO</h2>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">os</span>\n\n<span class=\"kn\">import</span>
  <span class=\"nn\">boto3</span>\n<span class=\"kn\">import</span> <span class=\"nn\">pytest</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">moto</span> <span class=\"kn\">import</span>
  <span class=\"n\">mock_s3</span>\n\n<span class=\"n\">MY_BUCKET</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;bucket&quot;</span>\n<span class=\"c1\"># BAD PREFIX</span>\n<span
  class=\"n\">MY_PREFIX</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;bucket/project/data/layer/dataset/&quot;</span>\n\n\n<span
  class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
  class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span>
  <span class=\"nf\">aws_credentials</span><span class=\"p\">():</span>\n<span class=\"w\">
  \   </span><span class=\"sd\">&quot;&quot;&quot;Mocked AWS Credentials for moto.&quot;&quot;&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_ACCESS_KEY_ID&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECRET_ACCESS_KEY&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECURITY_TOKEN&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_SESSION_TOKEN&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
  \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;AWS_DEFAULT_REGION&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;us-east-1&quot;</span>\n\n\n<span
  class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
  class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span>
  <span class=\"nf\">s3</span><span class=\"p\">(</span><span class=\"n\">aws_credentials</span><span
  class=\"p\">):</span>\n    <span class=\"k\">with</span> <span class=\"n\">mock_s3</span><span
  class=\"p\">():</span>\n        <span class=\"k\">yield</span> <span class=\"n\">boto3</span><span
  class=\"o\">.</span><span class=\"n\">client</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;s3&quot;</span><span class=\"p\">,</span> <span class=\"n\">region_name</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;us-east-1&quot;</span><span class=\"p\">)</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">_upload_fixtures</span><span class=\"p\">(</span><span
  class=\"n\">s3</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span
  class=\"kc\">None</span><span class=\"p\">:</span>\n    <span class=\"n\">s3</span><span
  class=\"o\">.</span><span class=\"n\">put_object</span><span class=\"p\">(</span><span
  class=\"n\">Bucket</span><span class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span
  class=\"p\">,</span> <span class=\"n\">Key</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;project/data/layer/dataset&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">Body</span><span class=\"o\">=</span><span class=\"sa\">b</span><span
  class=\"s2\">&quot;some data&quot;</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span>
  <span class=\"nf\">test_get_list_of_dataset_versions</span><span class=\"p\">(</span><span
  class=\"n\">s3</span><span class=\"p\">):</span>\n    <span class=\"c1\"># We need
  to create the bucket since this is all in Moto&#39;s &#39;virtual&#39; AWS account</span>\n
  \   <span class=\"n\">s3</span><span class=\"o\">.</span><span class=\"n\">create_bucket</span><span
  class=\"p\">(</span><span class=\"n\">Bucket</span><span class=\"o\">=</span><span
  class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>\n    <span class=\"n\">_upload_fixtures</span><span
  class=\"p\">(</span><span class=\"n\">s3</span><span class=\"p\">)</span>\n\n    <span
  class=\"n\">objs</span> <span class=\"o\">=</span> <span class=\"n\">s3</span><span
  class=\"o\">.</span><span class=\"n\">list_objects_v2</span><span class=\"p\">(</span><span
  class=\"n\">Bucket</span><span class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span
  class=\"p\">)</span>  <span class=\"c1\"># , Prefix=MY_PREFIX)</span>\n    <span
  class=\"k\">assert</span> <span class=\"n\">objs</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;Contents&quot;</span><span
  class=\"p\">)</span> <span class=\"ow\">is</span> <span class=\"ow\">not</span>
  <span class=\"kc\">None</span>\n\n    <span class=\"c1\"># test_datasets = [</span>\n
  \   <span class=\"c1\">#     c[&quot;Key&quot;]</span>\n    <span class=\"c1\">#
  \    for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)[&quot;Contents&quot;]</span>\n
  \   <span class=\"c1\">#     if c[&quot;Key&quot;] != MY_PREFIX</span>\n    <span
  class=\"c1\"># ]</span>\n</code></pre></div>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/psutils-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Psutil-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/unpack-anywhere-with-star'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Unpack-Anywhere-With-Star</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: ''
now: 2024-01-05 14:15:22.253706
path: pages/til/mocking-s3-with-moto.md
published: false
slug: mocking-s3-with-moto
super_description: ''
tags:
- tech
templateKey: til
title: Mocking-S3-With-Moto
today: 2024-01-05
---

## TODO

```python

import os

import boto3
import pytest
from moto import mock_s3

MY_BUCKET = "bucket"
# BAD PREFIX
MY_PREFIX = "bucket/project/data/layer/dataset/"


@pytest.fixture(scope="function")
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"


@pytest.fixture(scope="function")
def s3(aws_credentials):
    with mock_s3():
        yield boto3.client("s3", region_name="us-east-1")


def _upload_fixtures(s3) -> None:
    s3.put_object(Bucket=MY_BUCKET, Key="project/data/layer/dataset", Body=b"some data")


def test_get_list_of_dataset_versions(s3):
    # We need to create the bucket since this is all in Moto's 'virtual' AWS account
    s3.create_bucket(Bucket=MY_BUCKET)
    _upload_fixtures(s3)

    objs = s3.list_objects_v2(Bucket=MY_BUCKET)  # , Prefix=MY_PREFIX)
    assert objs.get("Contents") is not None

    # test_datasets = [
    #     c["Key"]
    #     for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)["Contents"]
    #     if c["Key"] != MY_PREFIX
    # ]

```
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
    
    <a class='prev' href='/psutils-01'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Psutil-01</p>
        </div>
    </a>
    
    <a class='next' href='/unpack-anywhere-with-star'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Unpack-Anywhere-With-Star</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>