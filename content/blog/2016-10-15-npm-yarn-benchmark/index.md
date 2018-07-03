---
slug: npm-yarn-benchmark
date: "2016-10-15T00:00:00Z"
excerpt: |
  Yarn, the recently launched alternative for NPM as Node.js dependency manager, claims to be much faster and reliable than its predecessor. Let see if it's true.
title: NPM vs Yarn benchmark
resources:
- name: "featured"
  src: "images/npm-yarn-benchmark-og.png"
---

If you are a Javascript developer, specially if you work with Node.js, you have probably read something
about [Yarn][1] in the last days. Engineers from Facebook Exponent, Google, and Tilde [have been
working together][2] [to build][3] an alternative for the well known [NPM][4], the built-in package manager of
Node.js.

During the last years, developers around the world have complained a lot about how slow NPM is. Having a
dependency system able to avoid inconsistences between environments has been the other big request around
NPM. So, if we take a look to the claim of Yarn, it seems that this is what we have been expecting all this
time: 'Fast, Reliable, and Secure Dependency Management'.

It's clear that the introduction of the [yarn.lock][5] file and the checksum verification adds consistency and
integrity to our packages between environments, but... What about the speed? Yarn [states that it is ultra fast][6],
which is something that you will trust as soon as you try it with a project that has a big amount of dependencies.
Anyway, I wanted to make a benchmarking and here it is.

## The Method

The tool I've used to measure the speed of both managers is just the linux command `time`. I've created a little Bash
script, based on [this gist][7] made by Peter Mitchell, that will perform multiple installations of three popular JS
frameworks using Yarn and NPM.

The script will run multiple installations of [Angular][8], [Ember][9] and [React][10] using both, NPM and Yarn, and it
will measure the time used for each installation. At the end, it will display the average metrics by tool and framework.
It will also perform installations with precached packages and with empty cache to see the difference between both
situations.

You can see the script used here:
[https://github.com/artberri/npm-yarn-benchmark][11]

## The Environment

Once the measure tool is chosen, it's time to run the script, but... Where? Of course, my own computer is the first place
where I have run the script, but in order to have more standard metrics, I have done the same in the following Continous
Integration tools: Travis, Snap CI, Semaphore and Circle CI.

Because of the big amount of installations that are done in each test run, the script takes some time to finish. In order
to avoid timeouts in these CI tools, the timing averages will be calculated only over three runs.

## The Results

In my own computer:

<pre class="pre">
 -----------------------------------------------------------------------
 -------------------------- RESULTS (seconds) --------------------------
 -----------------------------------------------------------------------
|                          |     angular2 |        ember |        react |
|     npm_with_empty_cache |       15.687 |       56.993 |       93.650 |
|      npm_with_all_cached |        9.380 |       52.380 |       81.213 |
|    yarn_with_empty_cache |        9.477 |       30.757 |       37.497 |
|     yarn_with_all_cached |        4.650 |       15.090 |       17.730 |
 -----------------------------------------------------------------------
</pre>

In [Travis][12]:

<pre class="pre">
 -----------------------------------------------------------------------
 -------------------------- RESULTS (seconds) --------------------------
 -----------------------------------------------------------------------
|                          |     angular2 |        ember |        react |
|     npm_with_empty_cache |       19.720 |       55.090 |       76.233 |
|      npm_with_all_cached |       14.640 |       40.203 |       56.467 |
|    yarn_with_empty_cache |       13.193 |       34.037 |       43.663 |
|     yarn_with_all_cached |        5.830 |       15.923 |       40.420 |
 -----------------------------------------------------------------------
</pre>

In [Snap CI][13]:

<pre class="pre">
 -----------------------------------------------------------------------
 -------------------------- RESULTS (seconds) --------------------------
 -----------------------------------------------------------------------
|                          |     angular2 |        ember |        react |
|     npm_with_empty_cache |       20.640 |       57.030 |      120.470 |
|      npm_with_all_cached |       15.753 |       45.273 |       62.597 |
|    yarn_with_empty_cache |       12.227 |       41.997 |       51.863 |
|     yarn_with_all_cached |        7.693 |       23.607 |       24.490 |
 -----------------------------------------------------------------------
</pre>

In [Semaphore][14]:

<pre class="pre">
 -----------------------------------------------------------------------
 -------------------------- RESULTS (seconds) --------------------------
 -----------------------------------------------------------------------
|                          |     angular2 |        ember |        react |
|     npm_with_empty_cache |       11.057 |       35.287 |       54.203 |
|      npm_with_all_cached |        7.107 |       24.797 |       31.300 |
|    yarn_with_empty_cache |        6.273 |       17.407 |       22.777 |
|     yarn_with_all_cached |        2.790 |        8.150 |        9.380 |
 -----------------------------------------------------------------------
</pre>

In [CircleCI][15]:

<pre class="pre">
 -----------------------------------------------------------------------
 -------------------------- RESULTS (seconds) --------------------------
 -----------------------------------------------------------------------
|                          |     angular2 |        ember |        react |
|     npm_with_empty_cache |       42.940 |      100.287 |      163.550 |
|      npm_with_all_cached |       16.990 |       50.083 |       67.000 |
|    yarn_with_empty_cache |       15.907 |       45.547 |       58.113 |
|     yarn_with_all_cached |        7.547 |       26.763 |       27.130 |
 -----------------------------------------------------------------------
</pre>

## The Conclusion

Yarn is Ultra Fast, between 2 and 3 times faster than NPM.

The Yarn creators are telling the truth. It's awesome to see how Yarn is faster even if we compare the NPM cached test with
the Yarn test without cache. I'd say that Yarn will become the standard dependency manager for Node.js within a few months.

The aim of this comparison was not to benchmark CI tools, but I think that is worth to mention the good performance of
Semaphore when comparing it with the rest of tools used in this example.

## The Extra

I have been testing Yarn since the first day, as I said it's something I had wanted for a long time, and, right now, I'm using
[Puppet][16] for software provisioning in most of my projects. Because of this, I have created a Puppet module for installing
Yarn that you can see here: [https://forge.puppetlabs.com/artberri/yarn][17].

I hope you enjoyed this reading!

[1]: https://yarnpkg.com/
[2]: https://code.facebook.com/posts/1840075619545360
[3]: http://yehudakatz.com/2016/10/11/im-excited-to-work-on-yarn-the-new-js-package-manager-2/
[4]: https://www.npmjs.com/
[5]: https://yarnpkg.com/en/docs/yarn-lock
[6]: https://yarnpkg.com/en/compare
[7]: https://gist.github.com/peterjmit/3864743
[8]: https://angular.io/
[9]: http://emberjs.com/
[10]: https://facebook.github.io/react/
[11]: https://github.com/artberri/npm-yarn-benchmark
[12]: https://travis-ci.org/artberri/npm-yarn-benchmark
[13]: https://snap-ci.com/artberri/npm-yarn-benchmark/
[14]: https://semaphoreci.com/artberri/npm-yarn-benchmark/
[15]: https://circleci.com/gh/artberri/npm-yarn-benchmark
[16]: https://puppet.com/
[17]: https://forge.puppetlabs.com/artberri/yarn
