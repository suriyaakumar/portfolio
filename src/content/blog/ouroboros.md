---
title: "Ouroboros"
description: "A RAG feature for my blog"
date: 2026-09-02
tags: ["tech"]
---

Honestly, I'm writing this particular post to commit to my memory, on how I implemented this *bleeding-edge feature (/s)* called [Retrieval-Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) for my blog posts and also, as a way to increase content to feed into this very system that I'm about to describe. **cue Ouroboros noises ([the mythical animal](https://en.wikipedia.org/wiki/Ouroboros), not [Gojira](https://open.spotify.com/track/6WUNfk8ULz9ZdmC9f315Qp?autoplay=true))**

# Fetch.py
I'm going to spare you the long-winded explanations about RAG that are *totally unique* AND *aren't overdone* at all. So, we'll just get down and dirty. Since this RAG application is **based on these very blog posts**, I had to use **Github's Content API** to **fetch the markdown files** directly from my portfolio repository. I keep two separate json files, one to **cache the content SHA** (different from the commit SHA you're normally used to, this SHA is to track the particular version of contents of a file) of the files fetched from the Content API and the other JSON file to **cache the actual content** of the files.

After fetching the markdown files, I iterate through each file and see if the markdown file is either new or modified, by comparing them against my local content cache. If the file is new or modified, I redownload the latest version of that particular file and cache both the content SHA and the raw content. If I can't redownload it, I just keep the local version of both instead.

Since I use frontmatter for annotating metadata, I parse the raw markdown text and save every entry in the content json file with two key-value pairs,
one key denotes the metadata and the other key denotes the raw markdown text, before actually caching it..

# Chunk.py
After the fetching part is done, we chunk the content json file, post-by-post. The chunking process is done by first splitting the content by headings and, also takes the introduction (which typically don't have headings) into account as well.

If there are no headings in the post, we return the text as a whole.

# Embed.py

# Retrieve.py

# Generate.py
