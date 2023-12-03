---
slug: building-timeless-javascript-projects
date: "2023-12-04"
description: |
  There's a unique satisfaction in revisiting a project a year later and finding it seamlessly functional, but, in the ever-evolving world of JavaScript, there's a common sentiment that leaving a project untouched for a few months is akin to signing its death warrant. In this guide, we'll explore strategies for setting up a JavaScript project to ensure that it remains not only functional, but also robust.
title: "Building Timeless JavaScript Projects: Ensuring Consistency in Dependencies and Versions"
featured_caption:
  author: Yukon Haughton
  author_url: https://unsplash.com/@ydlh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  url: https://unsplash.com/photos/a-close-up-of-a-door-handle-with-the-word-forever-on-it-9a_ls2nG9IE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  source: Unsplash
resources:
- name: "featured"
  src: "images/building-timeless-javascript-projects.jpg"
---

Not for the first time, but I recently came across a tweet that confidently asserted the fragility of JavaScript projects:

> Typescript solved JavaScript like Heroin solved Cocaine.
>
> If you leave a medium sized node or front end project aside and come back to it 6 month later, chances are it will never work again.
>
> Spent 2-3 hours bringing up a docs site last night, lots of breakage, libraries breaking, incompatible interfaces, what a living hell that is.
>
> Starting from scratch was inevitable.
>
> There is NO reason to invest in code craft or tooling on your typical Js/Ts project because 6 months from now it’ll all be obsolete.
>
> Go retro when you can. [@dhh](https://twitter.com/dhh) was right.
>
> jondot ([@jondot](https://twitter.com/jondot)) on X, [Nov 23, 2023
](https://twitter.com/jondot/status/1727572827312705769)

Such provocative statements are not uncommon in the fast-paced world of tech ~~Twitter~~ X. It's important to recognise that these statements often serve a dual purpose: to spark debate and interaction or, in some cases, to fuel the economy of some haughty _tech bro_. But rather than succumb to the narrative, **let's dig deeper and dissect the steps we need to take to ensure that our JavaScript projects remain resilient over time**.

The key aspect is the ability to ensure a **reproducible environment**. Whether collaborating with a team or revisiting your own code months or even years later, the challenge is to create an ecosystem where dependencies, configurations and versions are clearly defined.

## Start with a Solid Foundation: Specify Your Node.js Version

This not only ensures stability but also guarantees that everyone on your team is working in the same environment. **Set the `engines` field in your `package.json` with the version of Node.js** (Bun, Deno,...) you are using.

```json
// package.json
{
  //...
  "engines" : { 
    "node" : ">=20.0.0 <21.0.0"
  }
}
```

You can use a [SemVer](https://semver.npmjs.com/#syntax-examples) range if you are confident that the project should work with the same major version of Node.js, but if you prefer you can fix it to a specific version for a safer approach.

We can also tell your package manager to stubbornly refuse to install any package that claims to be incompatible with the current version of Node.js by setting `engine-strict=true` in our `.npmrc` file (create it if it doesn't exist).

```txt
// .npmrc
engine-strict=true
```

Even if you're only working on the front-end, using Node.js to build, test and tool your project is common practice, so **don't skip this step** just because you're not running a back-end application.

### Using a Node Version Manager

I did not expect to talk about how to install Node.js, but it is worth mentioning that installing a single version of Node.js globally on your machine is currently not good practice. I would say that most people today use a Node.js version manager. A tool that seamlessly manages the installed versions of Node.js and allows you to easily switch between Node.js versions for different projects.

The most common is [NVM](https://github.com/nvm-sh/nvm). Once installed, you can specify and enforce a particular version of Node.js for your project using a `.nvmrc` file. But [Volta](https://docs.volta.sh/guide/#why-volta), [fnm](https://github.com/Schniz/fnm) or [n](https://github.com/tj/n) are also good alternatives.

Nix or Docker are less "polluting" alternatives for running Node.js, but I wouldn't recommend them unless you have previous experience.

## Specify Your Package Manager and its Version

[NPM](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/) and [PNPM](https://pnpm.io/) are the main **package managers** for Node.js. They all claim to be fast and to have a good approach to managing the dependency tree. Choose the one that suits you best, or just roll the dice, but **make sure that everyone in your team, or your future self, uses exactly the same one**. To do this, set it in the engines field of your `package.json`, just as you did with the version of Node.js.

```json
// package.json
{
  //...
  "engines" : { 
    "node" : ">=20.0.0 <21.0.0",
    "pnpm": "^8.0.0"
  }
}
```

NPM is the official package manager for Node.js, but as of version 16, Node.js has a built-in tool called Corepack that not only allows you to install other popular package managers such as Yarn and PNPM, but also ensures that everyone in your team will use exactly the package manager version you intend them to, without them having to manually synchronise it each time you need to make an update. You can enable it and use it like this:

```bash
corepack enable
corepack use pnpm@8.x # This is an example, use whatever you want
```

After running this command, you will see that your chosen package manager and its version have been fixed in a new field in `package.json`. Anyone using Corepack will now be using exactly the same version as you.

```json
// package.json
{
  //...
  "engines" : { 
    "node" : ">=20.0.0 <21.0.0",
    "pnpm": "^8.0.0"
  },
  "packageManager": "pnpm@8.11.0"
}
```

Using Corepack is not mandatory for consistency, you can install the package managers you want, but make sure you clearly specify which package manager and version you are using.

## Commit the Lock File

Achieving stability in a JavaScript project depends on the accuracy of your dependency tree. Pinning down the exact versions ensures that every collaborator, every build, and every deployment is based on the same set of dependencies. So, **whether you're using NPM, Yarn or PNPM, committing the lock file to version control is non-negotiable**.

These lock files, —`package-lock.json` for NPM, `yarn.lock` for Yarn or `pnpm-lock.yaml` for PNPM— contain explicit information about the version of each dependency, **including the dependencies of your dependencies**. When you commit these files, you're essentially encapsulating the exact environment in which your project operates.

### The idempotence of the NPM registry

When we talk about the efficiency of lock files, you'll still find people reminding you of the time [a programmer almost broke the internet by deleting just 11 lines of code](https://www.sciencealert.com/how-a-programmer-almost-broke-the-internet-by-deleting-11-lines-of-code), and it was true, but don't be fooled, that won't happen again.

[NPM packages can not be easily unpublished anymore](https://docs.npmjs.com/unpublishing-packages-from-the-registry), they will be kept if they are commonly used, so we can consider the NPM registry as an idempotent registry. Once you depend on a concrete version of a package, it will remain the same over the years. Yes, even 6 months later.

## Javascript, the Candy Land

And that's it? Will it be a piece of cake to pick up a Javascript project again after two decades? No, obviously not. What I mean is that **if you follow these tips, you should be able to get your project up and running without any problems**. Even a small change should be easy. But if you want to restart and update the project, but the framework you're using has had 5 major updates or even disappeared, you're obviously screwed. Just like a project in any other language.

Like PHP, JavaScript is a language that “good” developers love to hate. Don't worry, there's nothing better than being a “bad” developer 😉.
