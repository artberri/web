---
slug: time-zone-change-break-apps
date: "2025-10-27"
description: |
  Spain's prime minister Pedro Sánchez has recently reignited the long-standing debate over daylight saving time (DST), calling on the European Union to end the clock change every spring and autumn. If this were to happen, time zones such as Europe/Madrid would stop switching between UTC+1 and UTC+2, and would instead keep the same time all year. Let's go through what would really happen and why developers should care. After all, changing or creating time zones isn't just politics.
title: "How a Time Zone Change Could Break Your Apps"
featured_caption:
  author: Vince Veras
  author_url: https://unsplash.com/@vinceveras?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  url: https://unsplash.com/photos/black-and-white-round-analog-wall-clock-G1lR5-cMdAQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  source: Unsplash
resources:
- name: "featured"
  src: "images/timezone-change-break-apps.jpg"
---

Most people think of time zones as "offsets from UTC", but we know they're more than that: they also include rules, like when to switch to summer time, and the historical rules and offsets.

If Europe removes the DST switch, `Europe/Madrid` would, for example, transition from a two-rule timezone (UTC+1 in winter, UTC+2 in summer) to a single offset. That means new data in the [IANA tz database (tzdata)](https://www.iana.org/time-zones), and a quiet cascade of changes across our stacks. OSes, runtimes, databases, browsers... everything that depends on it needs to catch up.

That's where things start breaking.

## Systems Using UTC Internally

Good news first: **if your app stores everything in UTC** or UNIX timestamps and only converts to local time for display, **you're mostly safe**. When a time zone changes, old data doesn't change.

But future events are trickier.

Let's say you run a ticketing platform and a concert is scheduled for `25 March 2026, 21:00 (Europe/Madrid)`. If your system converts that to UTC today using the current timezone rules (which still assume DST in March), it will store: `2026-03-25T20:00:00Z`.

Later, Europe drops DST and the Spanish peninsular region becomes UTC+1 permanently, that same UTC value will now convert back to: `25 March 2026, 22:00 (Europe/Madrid)`. Your concert was silently shifted by one hour. I would not want to be the person stuck facing the fans who showed up an hour late to their favourite band's concert, so... how should you handle this?

**For future events, you need to store both**: the local date and time (`2026-03-25 21:00`), and the intended timezone identifier (`Europe/Madrid`).

Then, when the time comes to display or schedule it, you convert it to UTC using the rules that apply at that moment, not the rules that existed when you first saved the event. That way, your app will still interpret the event according to the latest official definition of `Europe/Madrid`.

## Cron Jobs and Schedulers

Let's take a look at this cron entry:

```
0 8 * * * /usr/bin/something
```

It means “run at 8:00 a.m. local time, every day".

If your server is in Europe, and Europe stops switching time, your job will continue running at 8:00 local time, but you need to ensure that the machine running your cron has stopped changing the clock for the summer season and adopted the right permanent offset.

As long as the machine has an up-to-date `tzdata`, cron will do the right thing. So, you should ensure to keep your OS and timezone packages up to date.

## Runtime Specific Issues

This is where things can get ugly.

I am a `Node.js` user, and this runtime bundles a snapshot of `tzdata` from the time the Node version you are using was compiled. You can't update it yourself; you must wait for a new Node release.

This means that if `Europe/Madrid` stops changing time, older Node versions will still think it does, which can cause you a lot of problems if you are, for example, converting those dates to UTC for storage, or if you are using tools like `node-cron` to schedule jobs.

Each language/runtime might handle this differently, if I remember correctly `.NET` uses Linux `tzdata` or Windows registry time zones; in that case, keeping your OS up to date should be enough.

The key point here is that you need to know how your tools handle `tzdata` and be prepared for these kind of changes, especially if the timezone change affects a significant number of your users.

##  Distributed Systems and APIs

If part of your system updates tzdata before the rest, you'll have conflicting interpretations of "local time" and you might get into temporal chaos. It can also be a problem if your third-party provider's API is not up to date, or if your API clients are the ones delaying the `tzdata` update.

This is the kind of silent bug that costs hours to debug because nothing crashes, it just disagrees by one hour. If at some point we have such a big change, where almost a whole continent changes the rules of their time zones, you will need to keep in mind this change while you are troubleshooting bugs and rare issues.

## The Other Possibility: New Time Zones

Now, forget about Europe removing the DST switch, I would like it, but this initiative will probably lead to nothing, the same end that the same proposal from the former European Commission President, Jean-Claude Juncker, made in 2018. 

Let's imagine another hypothetical situation: Galicia, the Spanish region above Portugal, creates its own timezone aligned with Lisbon: `Europe/Santiago`. With the same rules as `Europe/Lisbon`. Same offset, different name.

For months, half the software on the planet will probably respond with:

```
RangeError: Invalid time zone specified: Europe/Santiago
```

Because `tzdata` updates take time to propagate: from IANA to Linux, to ICU, to Node, to browsers, to Docker images... you'll probably need to create aliases or find a way to deal with those users.

This is exactly what happened in 2023, when we started getting users reporting they were in the `America/Ciudad_Juarez` timezone. We were not aware of the problem until the number of users from that region increased, and our system monitoring started alerting us about a new recurrent error: `RangeError: Invalid time zone specified: America/Ciudad_Juarez`.

In our case, until Node.js launched an update reflecting Mexico's new time zones, we created our own timezone validation system. Easy but effective:

```ts
const DEFAULT_TIME_ZONE = "Europe/London";
const equivalentIANATimezones: Record<string, string> = {
    "America/Ciudad_Juarez": "US/Mountain",
    //...
};

const isValidTimezoneIANAString = (timeZoneString: string): boolean => {
    try {
        new Intl.DateTimeFormat(undefined, { timeZone: timeZoneString });
        return true;
    } catch (error) {
        logWarn(`[isValidTimezoneIANAString] Invalid timezone: ${timeZoneString}`, { error });
        return false;
    }
};

export const getValidTimeZone = (timeZone: string): string => {
    if (isValidTimezoneIANAString(timeZone)) {
        return timeZone;
    }

    return equivalentIANATimezones[timeZone] || DEFAULT_TIME_ZONE;
};

```

## The Bigger Picture

Time changes are a political decision, but they directly affect our tools, and we can end up with our apps broken. 

We are talking here about hypothetical situations, but as I said, we've seen this before and it is more common that what we would expect: when Russia (2014), Turkey (2016) or Mexico (2023) stopped DST; or when new zones like `America/Ciudad_Juarez` appeared (2023); or when `Europe/Kiev` was officialy renamed to `Europe/Kyiv` three years ago.

If the EU really stops changing the clock, the impact won't be dramatic, but we need to be prepared. The key takeaways are:

- You can use UTC timestamps for past events or to save `createdAt`/`updatedAt` like information.
- Never flatten future events into UTC too early. Keep the intended local wall time + timezone as the source of truth
- Keep your OS and `tzdata` up to date
- Understand your runtime-specific issues and keep it up to date
- Expect a few months of subtle, one-hour bugs.

I'll stop here, my timezone says it's coffee o'clock ☕
