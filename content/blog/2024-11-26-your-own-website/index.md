---
slug: your-own-website
date: "2024-11-26"
description: |
  In the age of LinkedIn profiles, Twitter threads, and Medium blogs, you might wonder: Do I really need my own website? If you're a developer or work in tech, the answer is an enthusiastic yes. In the following lines, I'll explain why I think you should have a website, how I built mine, and some tips for setting up yours, whether you're into static site generators like me or prefer something simpler.
title: "Why You Should Have Your Own Website (and How I Built Mine)"
featured_caption:
  author: Kvalifik
  author_url: https://unsplash.com/@kvalifik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  url: https://unsplash.com/photos/black-and-blue-computer-keyboard-cd79oBJrIWw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  source: Unsplash
resources:
- name: "featured"
  src: "images/your-own-website.jpg"
---

Twitter and I aren't a thing anymore, I'm a [Bluesky](https://bsky.app/profile/albertovarela.net) user now, and I noticed a trend: people are buying custom domains to use as their handles, like `@yourname.dev`. It's elegant, personal, and professional. But, if you've already invested in a custom domain, why not use it for more than just a handle?

## Simple Alternatives

If you're using a domain as your handle, chances are that **someone will open it in a browser at some point**. So it's a good idea to have _something_ there, even if it's just a basic page. You can easily redirect your domain to a service that showcases your information. All domain providers allow you to do this.

You might think of LinkedIn as the best option to redirect your domain to, but I prefer [custom GitHub profiles](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme), where you can have a bio of yourself with a simple Markdown file, without the noise that LinkedIn adds to your profile page. Consider [hiding your Github activity](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/setting-your-profile-to-private#changing-your-profiles-privacy-settings) if you select this option; no one needs to know when or how much code you upload to Github (your profile will look like [this](https://github.com/artberri)).

Other easy alternatives are link aggregators like [Linktree](https://linktr.ee/) or [Lnk.Bio](https://lnk.bio/), or if you already have a Notion account, you [can connect your own domain](https://www.notion.so/help/connect-a-custom-domain-with-notion-sites) to a Notion site.

Even these small steps can make a big difference, and you can always expand later.

## Hosting Your Own Space

But; **I've always believed in decentralized content and the importance of owning your own content**. Relying entirely on third-party platforms  can be risky, and you're bound by their rules and privacy policies. That's why I think it's so valuable to have your website under your control.

**Building your website is also an excellent way to hone your technical skills**. Whether it's working with static site generators, tweaking CSS, or setting up CI/CD pipelines, there's always something new to learn. I understand this might be a drawback for some of you, as it means extra maintenance costs and requires time you might not have or you might not want to spend on tech.

You can start with the very basics, just an `index.html` uploaded to any hosting platform. Take inspiration from [Gloria Langreo's site](https://glorialangreo.com/); a single, well-designed index.html can make a great impression:

![Screenshot of Gloria Langreo's site](images/gloria-langreo.png)

Or, you can go a little further and create an elegant site like [Rosa Gutierrez's](https://rosa.codes/), which acts as a modern business card, using a well-known static site generator with a [clean and simple  template](https://adityatelange.github.io/hugo-PaperMod/).

### Writing Regularly?

If you're planning to publish content on a regular basis (such as blog posts, articles or even technical write-ups), having your own website becomes even more important. It gives you complete control over how your content is presented and ensures that it remains accessible for years to come. You won't have a built-in audience like on Medium or DEV (you can always re-publish your content there), and you'll have to market yourself, but it will last forever and you'll never see a paywall over your content or ads on the side unless you want to add them yourself.

## How I Built Mine

OK, now that I've (hopefully) convinced you, let me show you how I built my site. Spoiler: it's all about static site generators, automation, and keeping things simple.

### Use A Static Site Generator

Static site generators (SSGs) are a fantastic option for tech-savvy people compared to the overhead of platforms like WordPress (which I used in the past).

One of the biggest advantages is speed, SSGs generate plain HTML files, so your site is likely to load much faster than a setup that relies on databases and server-side rendering. Security is another big win; with no backend or database to exploit, it significantly reduces the risk of hacks and constant security patches and plugin updates are avoided. Last but not least, portability: most SSGs rely on Markdown files to store your content, which means your posts are plain text, easily editable, and not tied to a specific platform.

I chose [Hugo](https://gohugo.io/) because it's simple, it requires little configurations and is easy to upgrade. It's also fast and very flexible with lots of themes and customisation options. [Jekyll](https://jekyllrb.com/), [Eleventy](https://www.11ty.dev/), [Next.js](https://nextjs.org/) or [Gatsby](https://www.gatsbyjs.com) are also good alternatives. I won't go into detail here because they all have good documentation and there's no point in repeating it here.

### Setting Up The Hosting

Hosting static sites is often free or very cheap. I chose [Cloudflare Pages](https://pages.cloudflare.com/) because their free tier is sufficient for any personal website and has an incredible performance. They have a [seamless integration guide for Hugo and GitHub](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/), which you can use to automate publishing to the web after you push your content to your repo. And they also offer a free, cookie-less [analytics service](https://www.cloudflare.com/web-analytics/).

[Netlify](https://www.netlify.com/), [GitHub Pages](https://pages.github.com/) or [Vercel](https://vercel.com/solutions/web-apps) are the most popular alternatives to Cloudflare.

### Publishing Content

Once the setup was in place, publishing became ridiculously easy:

1. Write a post in Markdown.
2. Commit and push to main.
3. Watch it go live in seconds.

## Why It's Worth It

At the end of the day, having your own website is an investment in yourself. It's your personal space on the internet, a place to showcase your work, share your ideas, and experiment with new technologies.

If you're ready to take the leap, start small. Pick a simple theme, write a "Hello, World!" blog post, and build from there. And if you need some inspiration, feel free to check out [my website's GitHub repo](https://github.com/artberri/web).

Happy building!
