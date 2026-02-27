---
templateKey: til
tags: ['python', 'tech', 'til']
title: Forms with FastAPI and Jinja
date: 2022-05-15T00:00:00
published: False
#cover: "media/forms-with-fast-api-and-jinja.png"

---

I just started using FastAPI for a home project and needed to pass back a
dynamic number of values from a form rendered with jinja...


# Dynamic Values 

The jinja templating for rendering HTML based on something like a python iterable is nice and easy

> data is the result of a database query, and item is each row, so the dot notation is the value of each column basically in that row

```jinja
<form method="post">
  {% for item in data %}
    <div class="form-check ">
        <input class="form-check-input"  name="item_{{ item.id }}" id="{{ item.name }}" value="{{ item.id }}" type="checkbox">
        <label class="form-check-label" for="{{ item.id }}" > Label for: {{ item.name }} </label>
    </div>
  {% endfor %}

<button type="submit" class="submit btn btn-xl btn-outline-danger" >Remove</button>
</form>

```

This form generates a row with a checkbox for every `item` in `data` (in my
case each `item` is an existing row in my table). it?

The way to pass back all those values is pretty straight forward (after hours of messing around that is!)

```python
# I hate it when tutorials don't show ALL relevant pieces to the blurb
import starlette.status as status
from fastapi import APIRouter, Depends, Form, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.session.session import create_get_session

router = APIRouter()
templates = Jinja2Templates(directory="templates/")

@router.post("/my_route/do_something_with_form", response_class=HTMLResponse)
async def delete_rows(
    request: Request,
    db: Session = Depends(create_get_session),
):
    form_data = await request.get_form()
    data = jsonable_encoder(form_data)
    # data = {"item_1": 1, "item_2": 2, ... "item_N": N}
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
```

We `await request.get_form()` and after encoding the data we get a dictionary with key/value pairs of the name/value from the form!

This took me quite a long time to figure out in part because most of the Google-able resources are still on Flask...
