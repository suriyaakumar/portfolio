---
title: "Samsara"
description: "Describing my automated ingestion pipeline"
date: 2026-10-12
tags: ["tech"]
---

Well, I was thinking of a proper name for this post since I impressed myself with the name of the [last post](/heart/ouroboros). So, I had to rack my brain for a nice title. The content was about my cool new **automated ingestion pipeline** for my RAG bot (wait, wait, what? I'll get down to it below)

So, harking back on the things I love now that I'm a bit older, there's this one game I used to spend a lot of time on, which is **[Genshin Impact](https://genshin.hoyoverse.com/en/)**. God knows I dropped off after the Sumeru arc, since they were taking too long for the Fontaine arc to drop (it dropped by the way a while ago). So, in the Sumeru arc, there's this concept called **Samsara** where basically the rulers of Sumeru use a device called **Akasha Terminal** (think ChatGPT but advanced enough to collect dreams and thoughts) to induce their citizens to make them relive the same day over and over, so that they can extract mental energy to power the city.

Do I sound Orwellian enough in my inspiration for this blogpost title? I guess. So, you'll see the content justify the title as I describe my automated ingestion pipeline.

# [THE WHY?]

I was tired of **manually running my Python scripts** locally everytime I publish a new blog post or edit my existing blog post. So, like most humans and all developers, I tried to automate it and **t'was easy & t'was good**.

# [THE HOW?]

[Github Actions](https://github.com/features/actions).

I used a Github Actions workflow that triggers on a **push to my master branch, specifically to my blog directory**.
