---
date: 2025-07-19 08:09:31
templateKey: protected-post
title: After Exceeding Expectations For 4 Years
password: rto2025
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721144328_7c8886e6.png"
tags:
  - rto
  - tech
---

!!! danger "I was FIRED over return to office"

!!! note ""

    The title is a tad misleading - I have not **technically** been fired... yet...

I work for Caterpillar, Inc. It's a large company, and so during my time
there I was able to work in 4 different divisions...

!!! note "TLDR"

    This may be a longer post, but I wrote up the highlights [TLDR](#tldr)

## White Belt

I started in an Analytics silo, which is now apart of Cat Digital. The group
was called "Information Analytics". As I joined Cat I sort of understood our
role to be internal consulting. Our group didn't make a product, we were a
support arm. IA (Information Analytics) was mostly a SAS shop unfortunately...
but fortunately for me I got connected very early on, and by nothing other than
divine appointment, with 2 guys who became somewhat like mentors to me. For the
sake of privacy we'll call them Bjorn and Jokko. Jokko is the guy who taught me
git ([[you-suck-at-git-but-its-honestly-fine]]), and Bjorn is the reason I'm
worth anything at python.

> I make comments about it, and have written some, but my career up until very
> recently has been built on python, and if it wasn't for Bjorn or Jokko, as
> well as others who come into the story later, I wouldn't be where I'm at in a
> technical sense... By God's grace I owe several people a non-trivial debt.

As I honed by python and git skills amongst a sea of SAS, SQL, and serious lack
of DevOps support I was rotated into a product group, Excavation (EXD) to work
on an autonomy-related project. The program I joined in IA was a rotational
program so this move was kind of part of the plan - not set in stone, but the
rotation was expected. It also is where I leveled up and entered what I'd
consider my blue belt phase at Cat.

## Blue Belt

The team I joined was small. But by God's continued grace on my life Bjorn
joined the same team literally at the same time... We worked together on some
cool ML stuff. The relevant part here is that I did well... This is also about
when I started using Linux, homelabbing, and started to bridge the gap in my
mind between the hardware in my laptop and the code I write. I was challenged
to think about expectations and the axioms present in our work. I was hired as
a data scientist but I spent weeks in the freezing cold on a Caterpillar 315
NextGen Hex gathering hydraulics data and testing code from the cab. I purchased
hardware somehow, and carted in by myself a massive Deep Learning rig that's
still being used last I checked. My boss was regularly pleased with the work I
chose to do and the results. I wasn't often given tasks, I was given a
description of a desirable end state, and I worked well in that season.

Due to some restructuring at Caterpillar the EXD job morphed into role in ICS
where I worked on Computer Vision projects for safety systems. I continued to
grow in my skillset here, I was writing ML pipelines in horrible ways (I didn't
know better), doing stuff in AWS (I knew nothing), designing database schemas
for projects I didn't understand, consulting on our groups NAS hardware (I
still believed you could download RAM at this point in my life) but in the
chaos, once again I performed well on my team. This rols was the most vague in
its requirements, and I built my very first platform here - a Computer Vision
pipeline that automated indexing new data we got coming in from the field,
running computer vision pipelines over various videos with different annotation
formats. It was horrible and thankfully replaced with airflow on k8s after I
left. But as a one-man team, one-boy team more appropriately, I learned a lot
about what I will and can do given the right problem.

But back to the moves within the enterprise - from IA to ICS I had little say
in where I went - I might've had some but I felt much more "along for the
ride". And then, in 2021 I made my own choice... I applied for a job in
Remanufacturing as a Sr. Data Scientist after learning about the analytic's
team use of a real framework for writing pipelines, and the chance to work with
[Waylon](https://waylonwalker.com)... I was getting burned out trying to do
everything myself with little knowledge of what or how to do it..

The data scientist job was a salary grade
higher and Cat has some odd rules about internal hiring... Deets aside, I was
allowed to take the job. Apart of that move was a desire to move geographically
because we were pregnant with our second - so Reman agreed to let me move and
work as a remote employee - beyond the Covid provisions I was told I could move
to another state and my role would be a remote one.

## Purple Belt

In Reman I'd say I earned purple belt status. I grew in my python knowledge,
and moreso than just python for data science, but using python to solve real
problems on real computers with real networks... It became awesome what I could
build and utilize. But where I really gravitated was towards the DevOps
space... In all my previous roles, there was a serious lack of DevOps and I had
to always hobble my stuff together with bubble gum and tape. But now I was on a
more mature data team, and although the problem space was more well-defined, we
were duplicating tons of effort in very inefficient ways. And it's in noticing
this and deciding to do something about it that I think I really transitioned
into a Senior role...

What I did with that observation was build a thing... I started to bring
together all our processes that were on the left hand side of writing data
pipelines:

- central config management
- localfirst design (we were logging into the AWS console to click buttons in
the ever-changing Batch dashboard)
- standard dependencies
- internal team interfacing - Cat is huge, you want to deploy something into
AWS? You better know the on-prem networking team and have a security contact
for your LTA...
- and more...

I took these things under my own management, centralized everything that I
thought made sense, rolled out a cli to the team to make just running pipelines
in AWS a little easier... And from then on I've been working on this platform
called `rada` - Reman Analytics Delivery Acceleration.

Since then I have gotten an "Exceeds Expectations" all 4 years working remote,
I received an award in 2022 called the "CEO Award of Excellence" for the work I
was doing. My initiatives and vision gave birth to rada - it would not exist
without me. Not that the team wouldn't be successful, but through rada the
velocity of a lean team of data scientists skyrocketed... not only velocity but
capacity. Rada manages deployments, monitoring, security, updates, etc... the
data scientists get to wear a "project manager" hat for a little while, but
now they take it off and move on to another thing, and not babysit an
ever-growing list of Jupyter notebooks...

## Betrayed

And then I was recently informed that Caterpillar has determined that my role is
an "in office" role that would be be performed best amongst the physical crowd
of workers at a giant facility in the middle of nowhere. So I was given a
choice - uproot the life I was told I could leave to create, or be fired... To
be frank I was actually expecting a promotion this year...

Just like that Cat decided that the platform I conceived, the value I created,
their word to me about working remote, 4 years of exceeding expectations in
official end of year reviews.... after all of that, my job wasn't worth doing
remotely anymore, to the degree that they'll fire me over it

## Fin

I was greatly looking forward to leveling up, the DevOps Brown Belt and Principal Black
Belt were absolutely in my sights but not for the sake of the title - I
genuinely believe in the platform I built. It was my art and unfortunately it
looks like I'll be practicing the discipline of platform engineering somewhere
else, in a system designed by someone else, solving problems I never had...
Somewhere that I didn't pour myself into, something I don't own.

??? warning "I expect clarity on our decision to come in Summer of 2026..."


## TLDR

???+ danger "You gave me a great start but from the bottom of my heart - Fuck you, Caterpillar"

[back to the top](#white-belt)

I wrote up some more raw [[reflections-on-rto-2025]] (password: rto2025)
