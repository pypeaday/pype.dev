---
templateKey: blog-post
tags: ['python', 'blog']
title: Wish-List-With-Fastapi
date: 2022-05-06T00:00:00
status: draft
cover: "/static/wish-list-with-fastapi.png"

---

Amazon has crossed the line with me just one too many times now so we are looking to drop them like every other Big Tech provider....

However, one key feature of Amazon that has been so useful for us is Lists... We can just maintain a list for each of us and then family members can login anytime and check it out... 
This really alleviates any last minute gift idea stress right before a birthday or something.

So I need a nice gift list service but I don't want to be locked into one company (like a Target registry or something) and I'd like to host it myself

The internets had a few options but nothing looked/felt like I wanted to I decided to build my own.

# The Frontend

__I have no idea how to do front end so stay tuned__

# The Backend

FastAPI for the win on this one... I followed a few examples online and what I was able to build in just a few minutes is pretty impressive thanks to the design of FastAPI.

Some key features are:
1. Auto doc generation
2. Required typing (which makes #1 possible)
3. Built-in api testing in the browser
4. Easy integration with sqlalchemy
5. Development time so short you won't be done with your coffee before having something up and running!

## Database

Starting with a simple `database.py` we can create a sqlalchemy session with a base model with about 7 lines of code...

```python

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "sqlite:///wishes.sqlite3"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## Model

For my wish list I needed just a simple table:

```markdown
|   id | person   | item         | link         | purchased   | purchased_by   | date_added          |
|-----:|:---------|:-------------|:-------------|:------------|:---------------|:--------------------|
|    1 | pypeaday | A sweet item | www.mystore.store | False        | dad| 2022-05-05 21:55:09 |
|    2 | pypeaday   | A bitter item| www.bitterstore.com | True       |Mrs. pypeaday |  2022-05-06 06:55:54 |

```

The table is simple enough... A unique key, the person who the wish belongs to, the item (or wish), a link to the item, whether it's been purchased or not and by whom, and the date it was added.

To make this model with sqlalchemy we can make a `model.py` like so:

```python
from database import Base
from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Integer, String, Text


class Wishes(Base):
    __tablename__ = "Wishes"
    id = Column(Integer, primary_key=True, index=True)
    person = Column(String(20))
    item = Column(Text())
    link = Column(Text())
    purchased = Column(Boolean())
    purchased_by = Column(String(90))
    date_added = Column(String(15))
```

## Schema

One of the best things about FastAPI is trivial integration with pydantic.
We can define a schema to ensure any data posted is not missing anything!

Make a `schema.py` with the following:

```python
from pydantic import BaseModel
import time
from typing import Optional


class wish_schema(BaseModel):

    person: str
    item: str
    link: str
    purchased: bool = False
    purchased_by: Optional[str] = None
    date_added: Optional[str] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    class Config:
        orm_mode = True


class patch_schema(BaseModel):

    purchased: bool
    purchased_by: Optional[str] = None

    class Config:
        orm_mode = True

```

I have 2 schemas - one for a `wish` which you'll see down below is used to validate any `post` requests.

To simplify things for me I made another schema, `patch_schema` which I use for the route that updates the table (ie. marking an existing wish as purchased) 

## Session

One of the last things we need is a Session

So make a `session.py`...

```python
from database import SessionLocal, engine
import model

model.Base.metadata.create_all(bind=engine)


def create_get_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
```

Our routes will depend on this `create_get_session` function that will yield a `db` object through which we'll udpate our database

# Ok just do it already!

So our `main.py` will have a few routes in it...

What do we want to support?

1. Getting all wishes
2. Getting a specific wish
3. Updating a specific wish
4. Deleting a wish

I think the script is fairly self explanatory but here's a few notes...

1. We decorate each function with `@app.<method>` and define `response_model` as well as `status_code`
2. The functions are defined with `async` (this was my first exposure to this so I can't go in depth on it yet)
3. The functions all take a `db` which is from `session.py` and that `db` depends on the `create_get_session` function
4. If the db is being updtes then we type the object used for the update with the appropriate schema (either `wish_schema` or `patch_schema`)

From there we're in true python-land where you can basically guess the methods on `db` and you'd probably be right... (like `query`, `upddate`, `delete` etc.)


```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from model import Wishes
from schema import wish_schema, patch_schema
from session import create_get_session

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "server is up!"}


@app.get("/wishes", response_model=List[wish_schema], status_code=200)
async def read_wishes(db: Session = Depends(create_get_session)):
    wishes = db.query(Wishes).all()
    return wishes


@app.post("/wishes", response_model=wish_schema, status_code=201)
async def add_wish(wish: wish_schema, db: Session = Depends(create_get_session)):
    new_wish = Wishes(
        person=wish.person,
        item=wish.item,
        link=wish.link,
        purchased=wish.purchased,
        purchased_by=wish.purchased_by,
        date_added=wish.date_added,
    )
    db.add(new_wish)
    db.commit()

    return new_wish


@app.get("/wishes/{id}", response_model=wish_schema, status_code=200)
async def get_wish(id: int, db: Session = Depends(create_get_session)):
    wish = db.query(Wishes).get(id)
    return wish


@app.patch("/wishes/{id}", response_model=wish_schema, status_code=200)
async def update_wish(
    id: int, patch: patch_schema, db: Session = Depends(create_get_session)
):
    db_wish = db.query(Wishes).get(id)
    db_wish.purchased = patch.purchased
    db_wish.purchased_by = patch.purchased_by
    db.commit()
    db.refresh(db_wish)

    return db_wish


@app.delete("/wishes/{id}", status_code=200)
async def delete_wish(id: int, db: Session = Depends(create_get_session)):
    db_wish = db.query(Wishes).get(id)
    if not db_wish:
        raise HTTPException(status_code="404", detail="Wish id does not exist")

    db.delete(db_wish)
    db.commit()

    return None

```

# My Code

You can find my repo [here](https://github.com/nicpayne713/wish-lists).

I'll plan to update and maintain for as long as I use it
