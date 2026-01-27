---
templateKey: blog-post
tags: ['python', 'tech']
title: Dynamic-Form-Values-With-Jinja-And-Fastapi
date: 2022-05-15T00:00:00
published: False
#cover: "media/dynamic-form-values-with-jinja-and-fastapi.png"

---

I'm currently working on a self-hostable wish list app using FastAPI so we can
finally drop Amazon forever. (The lists funcionality has been super handy for
sharing holiday gift ideas with the famj!)

# FastAPI

FastAPI is an amazing framework for quickly building APIs with Python. I will have a slightly longer post about my brief experience with it coming later...

# Jinja, Forms, and FastAPI

One of the last things I needed to figure out in my app was how to generate a
form in a Jinja template with a dynamic number of inputs and then pass all the
inputs to the backend to perform a database operation (my exact case was
removing rows from a table).

## Explicit Values

The way to pass back explicit variables is really easy...

Our form would look like this (I'm using bootstrap CSS)

```jinja
<form method="post">
    <div class="form-check ">
        <input class="form-check-input"  name="item_1" id="itemOne" value="1" type="checkbox">
        <label class="form-check-label" for="itemOne" > A label for this item </label>
    </div>
    <div class="form-check ">
        <input class="form-check-input"  name="item_2" id="itemTwo" value="2" type="checkbox">
        <label class="form-check-label" for="itemTwo" > A label for item 2 </label>
    </div>

<button type="submit" class="submit btn btn-xl" >Submit</button>
</form>
```

So what is this? This form will have 2 rows with the lables you see in `<label>
</label>` and checkboxes that when checked would have the value `value` in each
`<input>` line.

So our backend might looks something like this...

__I'm keeping all the imports and stuff here to show where they come from but I won't discuss it all here - that'll be in a future post__

```python
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
    item_1: int = Form(...),
    item_2: int = Form(...)
    db: Session = Depends(create_get_session),
):
    print(item_1)  # will just print 1 to the console where fastapi is running if the checkbox was checked
    print(item_2)  # will just print 1 to the console where fastapi is running if the checkbox was checked
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
```


## Dynamic values

That's all pretty simple... pass back values by the name in the form...

What about a form that's generated dynamically? This is my case since I display a row/checkbox for every row in my table so my form looks like this...

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
case each `item` is an existing row in my table). Now I started scratching my
head on how to pass an unknown number of inputs to my backend of FastAPI wants
each input explicitly defined and typed... I can't just pass the form back
becuase that's not a thing so what's the way to do it?


```python
# same stuff as above, only showing post method here
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

I look forward to my wish list app maturing and I hope this helps someone working with FastAPI!
