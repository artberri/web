---
slug: managing-php-dependencies
date: "2016-10-28T00:00:00Z"
description: |
  The first step to build a proper CD pipeline is to manage your dependencies in the right way. If you are PHP developer, you need to master Composer in order to achieve it.
title: Managing PHP Dependencies Properly
resources:
- name: "featured"
  src: "images/managing-php-dependencies-og.png"
---

<div class="series">
    <i class="fa fa-info-circle" aria-hidden="true"></i> This is the first post of the
    <a href="#other-posts-of-the-series">The Perfect Continous Delivery Pipeline For PHP</a> series.
</div>

[Composer][1] is the _de facto_ dependency manager for PHP and [Packagist][2] is its official package repository.
The release of this project in 2012 has revolutionized the PHP world, and nowadays, the dependencies of most of the
projects are being managed with it.

The usage of Composer and a Version Control System is the first step to build a CD pipeline for PHP- I will use
[git][3] as VCS in the rest of the article, but the same ideas could be applied if you are using other systems like
Mercurial or Subversion.

## How Composer Works And What Should I Commit

I don't want to create a _Getting Started_ guide because Composer is already [well documented][4], but I think that
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
  only as a dependency for other projects, usually in very different projects. Furthermore, you should ensure that
  you list properly the package versions that your project depends on, in order to avoid conflicts in the projects where
  it will be installed and to maximize its compatibilty. This is why you shouldn't use the `composer require` command to
  install the dependencies, or, in case you do it, you should review manually the version added to the `composer.json` and ensure that
  it covers all the versions that are compatible with your project.

- **Commit the `composer.lock` file if** you are working on a standalone or on an 'end-user' application. In contrast to
  the previous case, applications are intended to be installed always in the same way, and committing the `composer.lock`
  will ensure that the `composer install` command will install exatly the same versions of the dependencies everywhere.

## Dependencies and Dev Dependencies

Composer splits dependencies in two types:

- **Dependencies**: Packages required by the project to work. The project will not be installed unless those requirements
  can be met.
- **Dev Dependencies**: Packages required for developing the project, or running tests, etc.

The classification is managed by the `require` and the `require-dev` properties inside the `composer.json` file. You
can also classify them by using or by omitting the `--dev` option in the `composer require` command.

When we are requiring packages through the command line or writting them directly in the `composer.json` file, we need to ensure
that we place them in the proper place. This means that we need to take our own decissions when installing new dependencies and
to double check the installation instructions of our dependencies before executing them. This will allow us to deploy to
production the minimum dependencies needed by the project.

I recommend you to install all kinds of dev dependencies at project level with Composer. I've seen a lot of people installing
PHPUnit and other CLI tools globally in their computers. It works, but it can generate
some version conflicts when you have multiple applications installed in the same computer/CI-server.

These are the steps recommended in the PHP unit installation guide:

{{< highlight bash >}}
wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
sudo mv phpunit.phar /usr/local/bin/phpunit
phpunit --version
{{< / highlight >}}

But I think that is better to do this:

{{< highlight bash >}}
composer require phpunit/phpunit --dev
./vendor/bin/phpunit --version
{{< / highlight >}}

## Modifying The Code Of Our Dependencies

Sometimes, you will need to modify the code of a dependency, it happens when you find a bug or when you need to
add some new functionality that can not be done by extending it. In those cases you should open an issue in their
Github repo, but if you can not wait until the owners of that repo implement it and bump a new version, you can just
fork it and do it by yourself.

The first step is to fork that project and clone it. Then, you should create a new branch from `master` and commit your
modifications there, finally, push the changes to the forked repo. Now, you are ready to use your own fork by updating the
project's `composer.json`:

Add your fork as a repository and update the version field to point to your custom branch by prepending the `dev-` prefix
to the branch name. This is an example assuming you patched the Doctrine ORM to fix a bug in the `bugfix` branch:

{{< highlight json >}}
{
"repositories": [
{
"type": "vcs",
"url": "https://github.com/myname/orm"
}
],
"require": {
"doctrine/orm": "dev-bugfix"
}
}
{{< / highlight >}}

Don't forget to create a pull request to the original project once you are done, but ensure that you read carefully the
contributing guide of that project first.

While making changes to the dependency, you can feel the need to test it inside your project before pushing any change.
You will be able to do it also, in this case, by adding the local path where you cloned the fork as a repository:

{{< highlight json >}}
{
"repositories": [
{
"type": "path",
"url": "../../packages/doctrine-orm"
}
],
"require": {
"doctrine/orm": "\*"
}
}
{{< / highlight >}}

## Optimizing The Autoloading For Production

Composer autoloads your classes dinamically by default, which is really useful while we are developing, but it's important to
avoid doing it in production in order to improve your application's performance. It is worth to decrease the package size by
excluding the dev dependencies also before going to production. We can achieve both by running this command:

{{< highlight bash >}}
composer install --no-dev --optimize-autoloader
{{< / highlight >}}

I'd say that skipping this step is the most common mistake that I've seen related to Composer.

If you know that all your dependencies follow the PSR-0/4 recommendations, you can go an step further and disable a lot of
`file_exists` calls by running the following command:

{{< highlight bash >}}
composer install --no-dev --classmap-authoritative
{{< / highlight >}}

Finally, you can add the `--prefer-dist` option in order to speed up the installation of the packages. This last option
will just improve the installation timing, which can be a good option for your continous integration process, but it will
not improve your app performance.

{{< highlight bash >}}
composer install --no-dev --prefer-dist --classmap-authoritative
{{< / highlight >}}

## Other Posts Of The Series

This is just the beginning, in future posts we will cover the rest of the Continous Delivery pipeline process:

1. Managing PHP Dependencies Properly
1. PHP Code Analysis (TBD)
1. Unit Testing With PHP (TBD)
1. Artifacts, Packaging PHP Applications (TBD)
1. PHP Task Runners (TBD)
1. Continous Integration Tools For PHP (TBD)
1. Continous Deployment for PHP (TBD)
1. Functional Testing PHP Applications (TBD)
1. Automated Provisioning For PHP (TBD)

[1]: https://getcomposer.org/
[2]: https://packagist.org/
[3]: https://git-scm.com/
[4]: https://getcomposer.org/doc/00-intro.md
