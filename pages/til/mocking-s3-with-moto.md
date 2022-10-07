---
templateKey: til
tags: []
title: Mocking-S3-With-Moto
date: 2022-05-12T00:00:00
status: draft
cover: "/static/mocking-s3-with-moto.png"

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
