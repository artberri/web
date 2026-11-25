---
slug: barely-write-code-now
date: "2026-11-24"
title: "I Barely Write Code Now, and Somehow I'm OK with It"
description: |
  I was quite sceptical about where programming with AI was going, but the truth is that I now write almost no code at all: I review what the AI does. The skills I use for that in my pet projects are public, and they're a good starting point for any project.
resources:
- name: "featured"
  src: "images/barely-write-code-now.jpg"
featured_caption:
  author: Vitaly Gariev
  author_url: https://unsplash.com/@silverkblack?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
  url: https://unsplash.com/photos/a-designer-measures-fabric-on-a-dress-form-slRBeGlbj9A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
  source: Unsplash
---

In February, I wrote that "the way I use AI today will almost certainly be different in a month".

It took longer than a month, but it happened. I was quite sceptical about where all this was going, but the truth is that I now write almost no code at all. I review what the AI does instead.

At work I use more advanced processes, but for my pet projects I use [Made-to-Measure Skills](https://github.com/artberri/skills), my own set of skills (the `/create-plan` and `/execute-plan` commands from [my February post](/blog/2026/02/programming-with-ai/) are two of them). They're a good starting point for any project, and they're public, so let me show you how I use them.

## Made-to-Measure Skills

Honestly, I got tired of repeating myself. In one of my projects, for example, the checks run with `pnpm qa`. I told the agent many times, but in every new session it tried `npm test` first, so I had to tell it again. And when I asked it to review its own work in a small project, it always raised issues about potential race conditions that would never happen in a project with only a few dozen users a day. I could fix that with a better prompt, but only for that session, and the next day I was explaining the same things again.

Frameworks like [GSD](https://github.com/gsd-build/get-shit-done), [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) and [Spec-Kit](https://github.com/github/spec-kit) are great for going from an idea to code, but they come with their own folders and phases. My projects already had their own way of working, so I would have had to adapt my projects to them. Also, the part that bugs me most is what happens after the code is written (reviewing it, shipping it, learning from the mistakes), and that's where they say the least.

So each skill is one of those annoyances, fixed once.

### Setting Up

In Claude Code, these two commands install them:

```sh
claude plugin marketplace add artberri/claude-plugins
claude plugin install artberri-skills@artberri
```

The [README](https://github.com/artberri/skills#installation) explains how to install them in Codex, GitHub Copilot CLI and other agents.

Some of the skills are templates, and there's a reason for that. Every time I started a new project, or wanted to add these skills to an existing one, I found that I couldn't just copy and paste them. To do that, I would have had to make them less tailored and more generic, and I didn't want that: the best part of them is that each one is customised to its project. So **I wanted them adapted, not generic**, and I could get that with templates and a single skill that adapts them.

That skill is `/adapt-skill`. You run it once per template, for example `/adapt-skill deliver`, and it fills the template in from your project, asking you about whatever it can't find. Before that, run `/setup-review-docs` and `/setup-ocr` if you want the reviews tailored to your project too, because `deliver` only uses the project's review checklist if it already exists when you adapt it.

### A Real Example

My latest pet project is a small QR code generator. I wanted to know my options for generating QR codes, so I ran `/research` first to find the best QR library for a small project with as few dependencies as possible and no tracking (writing my own was one of the options).

Then I asked `/create-plan` for a plan, and gave it some screenshots of similar projects, a design prototype I made with Claude Design, the design system, and a description in my own words. I don't use a ticket tracker for this project, so I didn't run `/write-acceptance-criteria`.

After that, I ran the plan with `/execute-plan`. The changes were small enough not to need an `/adversarial-review`, so I reviewed each phase myself. But I shipped each one with `/deliver`, which also runs a review with [Open Code Review](https://open-codereview.ai/) (OCR), and the review found a few issues that I fixed with `/address-pr-comments`.

When the whole loop was done, I ran `/capture-learnings`, and it added a few rules to the project docs, like updating the design system every time we add a new component.

As you can see, I didn't use all of them, and that's fine, because each skill works on its own. The [README](https://github.com/artberri/skills#skills) lists the rest.

## Owning the Outer Loop

AI is moving so fast that it's hard to keep up, and I'm not working with what Addy Osmani calls [software factories](https://addyosmani.com/blog/software-factories/) yet (agent loops running at scale), but I'm doing my best. Even so, I think his idea of [owning the outer loop](https://addyosmani.com/blog/own-the-outer-loop/) applies to me too. I write the input (the AI helps me refine it) and I take care of the output, and the agent does everything in between.

Some people go further than me. Alexey Grigorev, for example, recently explained in [Dark Software Factories](https://aishippingblog.com/p/dark-software-factories) why he stopped reading the code his agents write. Others are more careful. Charity Majors [isn't telling anyone to skip code review yet](https://www.oreilly.com/radar/ai-demands-more-engineering-discipline-not-less/), but she argues that humans are weak validators anyway, and that production is where much of the checking belongs.

Would I stop reading the code too? It depends on how big and how critical the project is. In some pet projects I don't read the code at all, and at work we have some internal tools where we don't care much about how they're built (they don't need to scale, and few people use them), so it's fine there. There are other parts of our code at work where we've built such a good harness that I'm pretty confident the AI will do exactly what I expect. I realised that by reading the code: after some loops I noticed that I wasn't fixing anything, everything was OK, and the bad parts were just nits or small details. **So once the AI has earned that trust, I'm OK with that approach.**

Birgitta Böckeler explains this well in [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html): the harness should "reduce the review toil and increase the system quality", and when the same issue happens more than once, you improve the harness so it's less likely to happen again. For me, that means improving the project's memory with `/capture-learnings` and adding docs as I go. A big project needs different docs from a small one, but the idea works for both.

It's still programming. It just doesn't involve much typing.

## Learning Still Matters

"Learning by doing" was one of the sections of my February post, and it matters even more now.

Mikayla Maki's rule, "[only use agents for tasks you already know how to do](https://zed.dev/blog/on-programming-with-agents)", is still a good default. If I'm going to review the code instead of writing it, I need to understand it. Louise Cox puts it very well in a [recent post on O'Reilly Radar](https://www.oreilly.com/radar/the-value-of-human-expertise-in-the-software-factory/): "Agents amplify whatever you give them, but you need to understand it in the first place."

Delivering code you don't fully understand might be acceptable in some cases. **But that doesn't apply to architecture decisions or processes: you need to understand those.**

Still, there are ways to keep learning when the agent writes the code. Sometimes I read Claude's reasoning as it makes decisions, and I just have to trust it, because I don't know enough about the topic, or about that specific action, to judge it. But I want to understand those decisions, because I'm the one accountable for them. I can't just blame the AI. So I built [`/teach-me-why`](https://github.com/artberri/skills/blob/main/skills/portable/teach-me-why/SKILL.md) to help me with that.

The last time I used it, Claude was auditing a plan for one of my pet projects, and it suggested a fix for a React warning in one technical sentence: "render into a fresh `<div>` appended to root on each mount, and defer the unmount with `queueMicrotask`". I said yes and it went into the plan, but I didn't understand why it was needed. Before running the plan, I wanted to understand what I had approved.

It turned out that React doesn't like unmounting one root while it's still busy rendering another one, and that in development StrictMode mounts everything twice (that's why each mount needs its own `<div>`). I didn't know any of that. And there was a bonus, because while writing the lesson, Claude noticed that my `AGENTS.md` was still recommending the old way of doing it, so I asked it to add that fix to the plan too.

## The Bigger Picture

Now I feel that we build more, and faster. But if development isn't the bottleneck anymore, the rest of the company has to adapt too. That deserves its own post.

If you try [the skills](https://github.com/artberri/skills), tell me what you'd change. And yes, I'm probably still a hater. I just review more code than I write now.
