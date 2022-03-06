from python:3.8-slim

RUN apt-get -y update
RUN apt-get -y install git

copy ./requirements.txt .

run python3 -m pip install -r requirements.txt

copy ./static/ ./static
copy ./plugins/ ./plugins
copy ./pages/ ./pages
copy ./markata.toml .
copy ./run.py .


run markata build

cmd ["python3", "-m", "http.server", "--directory", "markout", "80"]
