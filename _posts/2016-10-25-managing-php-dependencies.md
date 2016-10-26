---
layout: post
title: Managing PHP Dependencies Properly
excerpt: >
    The first step to build a proper CD pipeline is to manage your dependencies in the right way.
    If you are PHP developer, you need to master Composer in order to achieve it.
ogImage: /images/blog/2016/managing-php-dependencies-og.png
featuredImage: /images/blog/2016/managing-php-dependencies.jpg
category: [javascript]
---

<div class="series">
    <i class="fa fa-info-circle" aria-hidden="true"></i> This is the first post of the
    <a href="#">The Perfect Continous Delivery Pipeline For PHP</a> series.
</div>

[Composer][1] is the *de facto* dependency manager for PHP and [Packagist][2] is its official package repository.
The release of this project in 2012 has revolutionized the PHP world, and nowadays, the dependencies of most of the
projects are being managed with it.

The usage of Composer and a Version Control System is the first step to build a CD pipeline for PHP- I will use
[git][3] as VCS in the rest of the article, but the same ideas could be applied if you are using other systems like
Mercurial or Subversion.

## How Composer Works And What Should I Commit

I don't want to create a *Getting Started* guide because Composer is already [well documented][4], but I think that
is worth to explain how to avoid some common mistakes that I have seen (and made) in several projects.

Composer uses two files for listing the dependencies and a directory for storing them:

- `composer.json` - This file list the dependencies of your project and usually contains other metadata.
- `composer.lock` - This file is created/updated after installing/updating your project dependencies with the list of
the installed packages and versions.
- `vendor/` - The default directory where the dependency packages will be stored.

It's obvious that you should add the `vendor/` directory in your `.gitignore` file in order to keep clean your project
repository, and that you should commit the `composer.json` to be able to install the dependencies in your Continous
Integration tool or to share them with your workmates, but I've seen some people that have some doubts about whether they
should commit the `composer.lock` file or not. It depends on what kind of project are you working on:

- **Don't commit the `composer.lock` file if** you are working on a library or package that is intended to be used
only as a dependency of another projects, usually in very different projects. Furthermore, you should ensure that
you list properly the package versions that your project depends on, in order to avoid conflicts in the projects where
it will be installed and to maximize its compatibilty. This is why you shouldn't use the `composer require` command to
install the dependencies, or if you do, you should review manually the version added to the Composer.json and ensure that
it covers all the versions that are compatible with your project.

- **Commit the `composer.lock` file if** you are working on a standalone or an 'end-user' application. In contrast to
the previous case, applications are intended to be installed always in the same way, and committing the `composer.lock`
will ensure that the `composer install` command will install exatly the same versions of the dependencies everywhere.

## Dependencies and Dev Dependencies

Composer splits dependencies in two types:

- **Dependencies**: Packages required by the project to work. The project will not be installed unless those requirements
can be met.
- **Dev Dependencies**: Packages required for developing the project, or running tests, etc.

In the dependency installatioon, the classification is managed by the `require` and the `require-dev` properties inside the `composer.json` file. You
can also classify them by using or by omitting the `--dev` option in the `composer require` command.

When we are requiring packages through the command line or writting them directly in the `composer.json` file, we need to ensure
that we place them in the proper place. This means that we need to take our own decissions when installing new dependencies and
to double check the installation instruction of our dependencies before executing them in order to clasify the dependencies properly.
This will allow us to deploy to production the minimum dependencies needed by the project.




## Forking

## Optimize / Deployinf (--no-dev)

## Others

## Other Posts Of The Series

This is just the beginning, in future posts we will cover the rest of the Continous Delivery pipeline process:

1. [Managing PHP Dependencies Properly]({% post_url 2016-10-25-managing-php-dependencies %})
1. PHP Code Analysis
1. Unit Testing With PHP
1. Artifacts, Packaging PHP Applications
1. PHP Task Runners
1. Continous Integration Tools For PHP
1. Continous Deployment for PHP
1. Functional Testing PHP Applications
1. Automated Provisioning For PHP


[1]: https://getcomposer.org/
[2]: http://packagist.org/
[3]: https://git-scm.com/
[4]: https://getcomposer.org/doc/00-intro.md
