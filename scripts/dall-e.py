import pyperclip
from openai import OpenAI

client = OpenAI()

response = client.images.generate(
  model="dall-e-3",
  prompt="""
    A close-up side profile view of a single piece of pie that has a futuristic city inside it.
    The picture should be of one slice of pie with
    an interesting background of
    gradient coloring. It should look like there's a little city of
    highly advanced technology INSIDE the slice of pie.
    """,
  size="1024x1024",
  quality="standard",
  n=1,
)

image_url = response.data[0].url

pyperclip.copy(image_url)
print(image_url)
