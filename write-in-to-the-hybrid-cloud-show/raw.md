---
date: 2025-09-05 00:53:50
templateKey: protected-post
password: hybridcloud
title: Write In To The Hybrid Cloud Show
published: True
tags:
  - reflection
  - tech

---

I really enjoyed the podcast, and it resonated with my experience building the
'rada platform' at my employer. This email turned out a little longer than I
anticipated and if you do take the time to read it fully then awesome, but the
TLDR is this episode brought me down memory lane in a very emotional way...

Gary started the episode by basically describing what my job has been the last
several years - I became a DevOps person and then, via a manager seeing value
in a reorg, my now-boss and I were given the opportunity to build a platform.
We were both data scientists along with 7 other folks, but we naturally
gravitated towards devops/home-labbing/sys adminy kind of things. We were given
the chance to become a support team for the data scientists rather than “do”
the data science anymore. Now, our “business” isn’t all of our entire
organization… The “Enterprise” is a fortune 100 company with 100k employees -
we are a small analytics team embedded in the highest-profit generating
division of the business. We don’t have several app teams, we have a handful of
data scientists who all do a handful of things. Primarily they write data
pipelines in python - a process we’ve sense templated and containerized pretty
beautifully. They also sometimes create web apps (specifically with streamlit,
but that's not necessarily relevant at a high level). We have a k3s cluster and
set of helm charts for using ArgoCD to manage their web app deployments - it’s
all apart of our centralized CI/CD process. We refer to everything stitched
together as the “rada platform” (rada is in internal name). We are the “team
who builds [the platform] and has great relationship with the developers but
aren’t necessarily doing the work for them” (1:31 in the episode).

The Platform Product Owner idea is very interesting - it’s coincidentally how I
had started referring to myself in relationship to rada as the development
transitioned from the CLI and CI/CD framework towards a desirable web frontend
to give the devs a centralized place to go for info. I didn’t code as much as
when putting the CLI and CI/CD branches together, but felt like I was driving
the features and design and architecture along with Waylon (my boss). I recall
last year or so saying that I felt more like a product owner than a developer
(in some ways).

Sean bringing up “shift left” was another particularly relevant note, or
anti-relevant perhaps… Rada strived in the beginning to be a “hyper developer
focused” experience. Our goal with rada was to make a data scientist’s job in
our team an absolute dream - and we’ve mostly accomplished that goal, and
continue to accomplish it with daily continual improvement. What I mean is that
the data scientist doesn’t care about ops AT ALL (or very little). To them,
they clone a template repo and write python code. Data connections, pipelines
deployment and everything surrounding the operational side of things is done by
sets of tooling within the rada platform. The genesis for this focus was that
our entire team was spending multiple hours per person per week, every week,
scheduling and configuring things in the AWS and Azure DevOps consoles. That
was the first thing I personally did - was automate and centralize those
configuration workloads. So in a sense I implemented DevOps by focusing on
taking Ops away from the developers but providing a way that is laser-focused
on this small group’s use cases.

Gary’s memory of the UK client with a few EKS clusters is very in-step with the
actual platform side of rada. We have some helm charts and a self-managed k3s
node along with some automation around cert and domain requesting that makes it
possible for our data scientists to have a streamlit app deployed with a nice
https://myapp.our_team.corp.com in our walled-off corporate intranet, but
furthermore - that node helps us navigate the Border Patrol Team, GIS security,
and multiple cloud teams required to connect to data in the cloud from on prem
resources… the rada platform conveniently takes advantage of existing
corporate-approved pathways to bring relevant data right to the data scientists
through common interfaces. It’s not much in the way of supporting a
million-user app, but it’s a beautiful, albeit scrappy setup to give our
developers a very smooth path to deploying something for their customers
(internal engineers usually) that would otherwise be literally impossible to
navigate fresh for every app. Honestly, the way our team is setup makes me
think it’s the way every data analytics team should be setup - with a small set
of dedicated resources to manage their operations so they can focus on data.
Now “small set of dedicated resources” looks different at different scales of
enterprise certainly, but I’ve been in several data-related groups within my
employer (Fortune 100 company since forever, 100k employees) and every one of
them has terrible deployment and operational experiences for the data
scientist. The idea of offloading that onto someone whose actual responsibility
it was to manage and be accountable for made sense and I don’t know why more
groups weren’t setup how ours got to be.

> Yeah, I think the position we’re in now is fundamentally better than whatever
> has gone before, right? And I guess that’s partly human nature because we
> always want to make things better and improve on things. But I think by and
> large, companies who do this well have developers that are more productive.
> ops people who are happier and hopefully have shifted left still in the ways
> that made sense. (8:54)

This is so true for our group (not the company necessarily) - our data
scientists are very productive, and happy. And as the ops guy - my job rocks...

> And although our developers did have full admin access to Azure and the
> console and the CLI and everything else, what they didn't have the kind of
> underlying knowledge of is what does our network look like on-premises? How
> does the routing work to get back to our data center? What data center even
> is the database that I want to talk to sitting in? So there’s a whole bunch
> of context that I don’t think it’s reasonable to expect a developer to know
> or understand. (17:27)

This quote from Gary rang very true to me as well. The data scientists I work
with are smart guys for sure, with varying levels of technical curiosity. But
ultimately, even the most curious one was miles away for understanding
networking, firewall rules, proxies, Logical Technical Architecture diagrams,
etc. These were things I don’t necessarily have a passion for, but things I
came to understand to (apparently) significantly deeper degrees than my
co-workers, but that skill distinction is one of the things that opened the
door to our own little platform in-house. It’s been awesome and this episode
let me relive a lot of good times.

I will wrap up my message to y’all out of respect for everyone’s time if you
read this far… I said above that my job rocks, which is true and it’s one
reason this episode has been such a whirlwind for me, because my employer
created a remote role for me to take 4 years ago. I took it, moved away, and in
this role is where I created rada from inception and became familiar with
platform engineering as a concept. Well, due to their RTO (return to office)
mandates it looks like I’m going to lose the thing I created and love because
they want me to now uproot the life I was told I could go build, to come back
to an office. I won’t rant much more about that - I’ve excelled in reviews all
4 years in this role and, not to brag, but I have a great reputation. I’m very
upset - not about losing my job, there's more work out there, but about having
rada taken from me for the most unreasonable reason I could think of... This
episode allowed me to remember a lot of the good things about what I built. I
have fond memories of development and problem solving with Waylon as well as
the data scientists as we built out features of the platform (and continue to).
It’s something I will certainly miss but Hybrid Cloud Show EP 37 is bookmarked
forever if I want to relive those memories via your conversation again.
