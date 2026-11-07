<div align="center">
<a href="https://www.albertovarela.net"><img src="./static/icon.svg" width="60" alt="AV logo"></a>
<h1>albertovarela.net</h1>
<p>Source code of my personal website and blog: <a href="https://www.albertovarela.net">www.albertovarela.net</a></p>
</div>

## Tech stack

- [Hugo][hugo] (extended edition): static site generator. It also bundles the
  CSS ([`css.Build`][css-build]) and JavaScript ([`js.Build`][js-build]) and
  processes images, so building the site doesn't run Node.
- Plain CSS with native nesting, in a custom theme (`themes/av2022`).
- [Fontsource][fontsource]: self-hosted fonts (Fjalla One, Karma, Fira Code),
  installed as npm packages and bundled by Hugo.
- [proto][proto]: pins the Node and pnpm versions
  (`.prototools`).
- [pnpm][pnpm]: installs the npm packages: fonts, `reset-css`, and the
  tools below.
- [Cloudflare Pages][cf-pages]: hosting, deployed with [Wrangler][wrangler].
- [GitHub Actions][actions]: builds and deploys on every push to `main`.
- [linkinator][linkinator]: broken link checker.
- [Prettier][prettier]: formatting.

## Set up

You need git, [proto][proto] and [Hugo][hugo] **extended**, at least v0.158 (for
`css.Build`). CI uses the version in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), so keep your
local version close to it.

```bash
git clone git@github.com:artberri/web.git albertovarela.net
cd albertovarela.net
proto use     # installs Node and pnpm
pnpm install  # fonts, reset-css and the tools
```

## Everyday commands

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `pnpm run serve`  | Dev server with live reload at <http://localhost:1313>           |
| `pnpm run draft`  | Same, including drafts and future-dated posts                    |
| `pnpm run build`  | Production build into `public/` (minified, fingerprinted assets) |
| `pnpm start`      | Serves the built `public/` folder at <http://localhost:1313>     |
| `pnpm test`       | Checks every link in `public/` (run `pnpm run build` first)      |
| `pnpm run deploy` | Uploads `public/` to Cloudflare Pages (normally CI does this)    |

## Publishing

Push to `main`. The [Build and Deploy workflow](.github/workflows/deploy.yml)
installs the toolchain, builds the site and uploads it to the `albertovarela`
Cloudflare Pages project. The workflow needs two repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN`: an API token with the **Cloudflare Pages: Edit**
  permission.

To deploy by hand, for example if GitHub Actions is down:

```bash
pnpm exec wrangler login  # once per computer
pnpm run build && pnpm run deploy
```

Redirects (old domains and URLs) live in [`static/_redirects`](static/_redirects)
and HTTP headers (cache, CSP) in [`static/_headers`](static/_headers); Cloudflare
Pages reads both from the published site.

## Writing

### A new blog post

```bash
hugo new content blog/2026-11-07-my-new-post
```

This creates `content/blog/2026-11-07-my-new-post/index.md` from the
[blog archetype](archetypes/blog/index.md), as a draft with the slug, date and
title filled in. The URL comes from the date and `slug`:
`/blog/2026/11/my-new-post/`.

Each post is a folder (a [page bundle][bundles]) with its images next to it:

```text
content/blog/2026-11-07-my-new-post/
├── index.md
└── images/
    ├── featured.jpg      # featured image, referenced in the front matter
    └── diagram.png       # used in the text as ![Alt](images/diagram.png)
```

Front matter fields:

| Field              | Required | Description                                                               |
| ------------------ | -------- | ------------------------------------------------------------------------- |
| `slug`             | yes      | Last part of the URL                                                      |
| `date`             | yes      | Publication date, `YYYY-MM-DD`                                            |
| `title`            | yes      | Post title                                                                |
| `description`      | yes      | Summary, meta description and social card text                            |
| `draft`            | no       | `true` hides the post; delete it or set `false` to publish                |
| `resources`        | no       | `name: featured` marks the featured image (also used for the social card) |
| `featured_caption` | no       | Credit for the featured image: `author`, `author_url`, `url`, `source`    |

Preview with `pnpm run draft`, then remove `draft: true` and push.

### Pages

Standalone pages live in `content/pages/<name>/index.md` and get the URL
`/<slug>/`. A page can pick a special layout with `layout:` (`projects`, `shop`,
`documentation`), which lives in `themes/av2022/layouts/pages/`. The home page
text is in `themes/av2022/layouts/index.html`.

## Project structure

```text
.
├── .github/workflows/deploy.yml  # CI: build and deploy to Cloudflare Pages
├── archetypes/                   # templates for `hugo new content`
├── content/
│   ├── blog/                     # one folder per post: YYYY-MM-DD-slug/
│   └── pages/                    # about-me, projects, shop, 404, sidr docs
├── static/                       # copied as-is: favicons, _headers, _redirects, robots.txt
├── themes/av2022/
│   ├── assets/
│   │   ├── css/                  # critical.css (inlined), main.css, print.css + partials
│   │   ├── fonts/                # TTFs used to draw the Open Graph images
│   │   ├── img/                  # Open Graph base image and author photo
│   │   └── js/main.js            # bundled by js.Build
│   └── layouts/                  # templates, partials and page layouts
├── config.toml                   # Hugo configuration
├── linkinator.config.json        # link checker settings (and links to check by hand)
├── logo.svg, og.svg              # Inkscape sources of the logo and Open Graph image
├── .prototools                   # Node and pnpm versions
└── package.json                  # npm packages and the commands above
```

## Things worth knowing

- **Critical CSS** (`critical.css`) is inlined in every page. The rest
  (`main.css`) loads asynchronously and `print.css` only for printing.
- **Font preloads**: `themes/av2022/layouts/partials/head.html` preloads the
  fonts used above the fold, taking their URLs from the built CSS. If you change
  fonts, update that list; the build fails if a listed font is missing.
- **Open Graph images** are generated by Hugo from `og_base.png` and the TTF
  fonts in `themes/av2022/assets/fonts` (see `partials/funcs/get-page-images.html`).
- **Links checked by hand**: a few links work in a browser but fail the link
  checker, so they are skipped. The list is in
  [`linkinator.config.json`](linkinator.config.json).
- **Upgrading Hugo**: update the version in the workflow when you upgrade it
  locally, so CI builds with the same version.

## License

| What                                                       | License                                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Code and theme (templates, CSS, JavaScript, configuration) | [MIT](LICENSE)                                                                     |
| Written content (blog posts and pages)                     | [CC BY-SA 4.0][cc-by-sa]                                                           |
| Shop designs                                               | [CC BY-NC-ND 4.0][cc-by-nc-nd]                                                     |
| Images in posts                                            | Their own license, credited in each post (mostly the [Unsplash License][unsplash]) |
| My photos, the logo and Open Graph images                  | All rights reserved                                                                |
| Fonts (Fjalla One, Karma, Fira Code)                       | [SIL Open Font License 1.1][ofl]                                                   |

You're welcome to use the code and theme as a starting point for your own site.
Please replace my content, photos and logo with yours.

<!-- Link references -->

[hugo]: https://gohugo.io
[css-build]: https://gohugo.io/functions/css/build/
[js-build]: https://gohugo.io/functions/js/build/
[fontsource]: https://fontsource.org
[pnpm]: https://pnpm.io
[proto]: https://moonrepo.dev/proto
[cf-pages]: https://pages.cloudflare.com
[wrangler]: https://developers.cloudflare.com/workers/wrangler/
[actions]: https://github.com/features/actions
[linkinator]: https://github.com/JustinBeckwith/linkinator
[prettier]: https://prettier.io
[bundles]: https://gohugo.io/content-management/page-bundles/
[cc-by-sa]: https://creativecommons.org/licenses/by-sa/4.0/
[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[unsplash]: https://unsplash.com/license
[ofl]: https://openfontlicense.org
