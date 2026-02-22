---
date: 2025-05-31 08:18:55
templateKey: blog-post
title: homelab-computer-vision-pipelines
published: False
tags:
  - tech
  - homelab
  - computer-vision
---

Done in 11 seconds! Subtitle and audio files are in the outputs folder.

I wanted to talk through an idea I have for some computer vision pipelines at home.
I heard of a tool called Roboflow, which is like a no-code computer vision pipeline training
and inference tool.
It seems very cool.
I also use Frigate at home, and Frigate supports lots of detection on the NVR side.
And so deploying a model in Frigate or using Roboflow, depending on what kind of customization
you would need, you can have these detections potentially be as accurate as you want, at
least with Roboflow.
The thing is, I don't know about Frigate, but my ideas are if I have a model at home
that knows me and my wife and my children by name, then when monitored areas issue detections,
for example, say I'm in the backyard and the temperature is above 80 degrees, have a home
assistant kick on a sprinkler system or something like that.
And if my wife is back there and it's 80 degrees, don't do that because she wouldn't want that
sprinkler on or whatever.
I think that something like that would be very feasible once you have the model.
So you would need a way to train the model, which would require gathering data and labeling
it.
Then you could train a model in lots of ways, but you need to have the deployment in mind.
If the deployment was Frigate, you would need to be able to compile that model into some
TensorFlow Lite thing that can run on a TPU.
That sounds very possible.
Otherwise, the Roboflow would probably be the platform for training, and then they make
the deployment kind of a one-click thing.
From there, I guess either way, Frigate is running the inference, and so the home assistant
integration would be about the same.
Frigate sends notifications over MQTT, and based on the Frigate blueprint that I'm using
for home assistant anyway, based on the object and whatever other conditions you want to
set in an automation, you do whatever you want to do in home assistant.
That sounds neat.
