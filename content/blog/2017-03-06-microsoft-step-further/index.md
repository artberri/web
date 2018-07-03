---
slug: microsoft-step-further
date: "2017-03-06T00:00:00Z"
excerpt: |
  The war is over. It seems that 2016 has been the year of the peace deal between Microsoft and the FOSS community,  the hostility has ceased, but let us make no mistake, there is still a long way to go.
title: Microsoft, you need to take it one step further
resources:
- name: "featured"
  src: "images/microsoft-loves-linux-og.jpg"
---

I have been a hater. Since I started in web development I have been a Linux user, a FOSS consumer and, to a lesser degree,
a free software contributor. Somehow, this made me despise Microsoft and, at some point, I was even not able to see
any of their products on an objective basis, I just flat out rejected everything coming from them.

This is not happening anymore, I am now a more mature developer (or just an older one), and I know that taking professional
technical decisions based on sentiments is just not an option. The last years that I have been working in a company with plenty
of Microsoft-friendly mates and also the last movements of Microsoft have opened my mind even more and, now, I can agree with
David Heinemeier Hansson when he says: ["Microsoft, I forgive you!"][1].

[The romance between Google's Angular2 team and Microsoft's Typescript team][2], [Microsoft joining the Linux Foundation][3],
[SQL Servers running on Linux][4], [Microsoft being top rated in Github's 2016 Octoverse][5],... If someone had made
these predictions in 2010, I would have called them crazy (or stupid), but this is already a reality. So, can we just love
Microsoft now? The answer is NO.

I'm currently an active user of several Microsoft products: Visual Studio Team Services, VSCode, Azure,... I use some of them
because my job required me to do it, but there are others in my stack just because I want them to be there, because I like them,
although doing it is sometimes a pain in the neck, and I will explain myself further:

In the company where I work we were using Visual Studio Online as an Agile project management tool and as a CI tool for .NET projects when
Microsoft announced that [Visual Studio Online Supports True Cross-Platform Development][6]. That was nice, we could
switch from the old fashioned Jenkins interface to VSO in our PHP project and unify company's CI tools. But it was quite a surprise
when I found the following sentence [in the documentation][7] of their 'True Cross-Platform Development' tool:
'OSX only for right now. Linux soon'.

Soon. That was in May 2015. One year later, in May 2016, the full support for Linux still wasn't there so I ended [by
adding it by myself][8]. I know, this is how open source works, if you want something, just do it. Yet, I was
expecting something more from a company of thousands of employees that make that kind of announcements.

I can talk about other situations also. As I said, our current hosting company is Azure, so App Insights seems a proper option for
APM in our PHP project. I love New Relic, but paying for another tool when theoretically I can get the same by using the tools
that I'm already paying for doesn't seem a good choice and it seemed that App Insights had a Microsoft supported PHP SDK, so we
started testing it.

After [one of my workmates fixed an important bug][11], App Insights became usable for us and we integrated it in our project.
Later, we added some third party provider APIs to the project that we wanted to measure, App Insights has a great feature
to track dependencies, but we realized that it was not implemented yet in our version of the PHP SDK. We took a look to the Github
repository in order to check how was the status about that feature and [we found a non-desirable status][12]: 'We don't currently have any plans to
add this. The SDK is currently supported on a best-effort basis but isn't actively being developed. We're happy to take PRs though'.

Again the same message from Microsoft, 'if you want something, just do it'. So, instead of complaining, I thought: 'It is not so bad,
it does not seem to be a costly change, so, let's do it'. [I did it just some days ago][13], it was not a difficult change, the problem is actually
that they are not offering documentation for their own API, so, I needed to find other language SDK which already implements the feature,
analyses it and guesses how it works.

These are just some examples to try to explain why I feel so sad when I see articles with headings like
'[Microsoft is #1 on GitHub open source][14]', which in my opinion are a very bad interpretation of the fact that Microsoft ranks
\#1 on Github in the 'Organizations with the most open source contributors' topic. Yes, they have a lot, but I can assure
that at least some of them are forced to be there.

I understand that Microsoft is a company and not a foundation or a community, but if they want to spread the "Microsoft loves Linux" message,
I think that need need to take their new attitude one step further.

> **Note for people interested on using App Insigths with PHP**:
>
> _The worst thing of App Insigths when comparing it with New Relic is that it has not integration with Nginx or Apache, if you
> want to get metrics of your requests, you need to implement it by calling a REST API with PHP, and if this is not well
> implemented you can find out that by monitoring your requests' speed you are also slowing them. (We avoided this by using
> the `fastcgi_finish_request` function and PHP-FPM, especifically by using the `kernel.terminate` [event of the Symfony framework][10])._

[1]: https://m.signalvnoise.com/microsoft-i-forgive-you-2fb6d6061a2c#.qedz7idke
[2]: https://techcrunch.com/2015/03/05/microsoft-and-google-collaborate-on-typescript-hell-has-not-frozen-over-yet/
[3]: http://open.microsoft.com/2016/11/17/microsoft-joins-linux-foundation/
[4]: https://www.microsoft.com/en-us/sql-server/sql-server-vnext-including-linux
[5]: https://octoverse.github.com/
[6]: https://blogs.msdn.microsoft.com/visualstudioalm/2015/06/05/visual-studio-online-supports-true-cross-platform-development/
[7]: https://github.com/Microsoft/vso-agent/blob/master/docs/service.md
[8]: https://github.com/bryanmacfarlane/svcinstall/pull/3
[9]: https://docs.microsoft.com/en-us/azure/application-insights/app-insights-platforms
[10]: http://symfony.com/doc/current/components/http_kernel.html#the-kernel-terminate-event
[11]: https://github.com/Microsoft/ApplicationInsights-PHP/pull/13
[12]: https://github.com/Microsoft/ApplicationInsights-PHP/issues/18
[13]: https://github.com/Microsoft/ApplicationInsights-PHP/pull/24
[14]: http://www.businessinsider.com/microsoft-github-open-source-2016-9
