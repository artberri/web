---
{{- $slug := replaceRE `^\d{4}-\d{2}-\d{2}-` "" .File.ContentBaseName }}
slug: {{ $slug }}
date: "{{ now.Format "2006-01-02" }}"
title: "{{ replace $slug "-" " " | title }}"
description: |
  One or two sentences: used as the summary, meta description and social card text.
draft: true

# Featured image: put it in images/ next to this file. Remove both blocks if
# the post has no featured image.
resources:
- name: "featured"
  src: "images/featured.jpg"
featured_caption:
  author: Author Name
  author_url: https://unsplash.com/@author
  url: https://unsplash.com/photos/photo-id
  source: Unsplash
---

Write the post here. Put images in `images/` and reference them as
`![Alt text](images/file.jpg)`.
