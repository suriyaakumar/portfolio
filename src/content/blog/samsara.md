---
title: "Samsara"
description: "Describing my automated ingestion pipeline"
date: 2026-10-12
tags: ["tech"]
---

Well, I was thinking of a proper name for this post since I impressed myself with the name of the [last post](/heart/ouroboros). So, I had to rack my brain for a nice title. The content was about my cool new **automated ingestion pipeline** for my RAG bot (wait, wait, what? I'll get down to it below).

So, harking back to the things I love now that I'm a bit older, there's this one game I used to spend a lot of time on, which is **[Genshin Impact](https://genshin.hoyoverse.com/en/)**. God knows I dropped off after the **Sumeru arc**, since they were taking too long for the **Fontaine arc** to drop (it dropped by the way a while ago). So, in the Sumeru arc, there's this concept called **Samsara** where basically the [Grand Sage](https://genshin-impact.fandom.com/wiki/Azar) and the [Akademiya of Sumeru](https://genshin-impact.fandom.com/wiki/Sumeru_Akademiya) use a device called [Akasha Terminal](https://genshin-impact.fandom.com/wiki/Akasha_System) (think ChatGPT but advanced enough to collect dreams and thoughts) to induce their citizens to make them relive the same day over and over, so that they can extract mental energy to build an artificial god called [Scaramouche](https://genshin-impact.fandom.com/wiki/Wanderer) that can rule over them.

(**Scaramouche, Scaramouche, will you do the Fandango?** Sorry, couldn't resist avoiding the Queen reference here. RIP Freddie.)

Do I sound Orwellian enough in my inspiration for this blogpost title? I guess. So, you'll see the content justify the title as I describe my automated ingestion pipeline.

# [THE WHY?]

I was tired of **manually running my Python scripts** locally everytime I publish a new blog post or edit my existing blog post. So, like most humans and all developers, I tried to automate it and **twas easy & twas good**.

# [THE HOW?]

[Github Actions](https://github.com/features/actions).

I used a Github Actions workflow that automatically triggers on a **push to my master branch, specifically to my blog directory**. This workflow can also be manually triggered.

What happens when you trigger the flows multiple times in a short span of time? Easy. I've set up a **concurrency group**, that means the action keeps one flow running and the next trigger is kept on hold. If the workflow is triggered for a third time, the third run will replace the waiting run. It's kinda like how the [Sabzeruz festival](https://genshin-impact.fandom.com/wiki/Sabzeruz_Festival) restarts every time at the end of the day after the citizens finish living the current dream. Their minds are wiped, except for the [Traveller](https://genshin-impact.fandom.com/wiki/Traveler) and [Nahida](https://genshin-impact.fandom.com/wiki/Nahida), and in the case, I am the traveller (yes, please let me live my gacha fantasy in peace).

It checks out my [RAG bot repository](https://github.com/suriyaakumar/blog-rag-eval) in a separate folder called ```rag/``` and installs the required environment (Python 3.12) & dependencies from the repository's ```requirements.txt```.

To give you some overall context, the retrieval and generation part of my RAG bot is hosted on a **Lambda function**, which relies on a JSON file of embeddings stored in a **S3 bucket** to generate responses to the questions. (I'll describe the AWS setup in a future post, but for now, let's focus on this.)

Now, to **update the embeddings** which I store in my S3 bucket, I created an **IAM role**. The IAM role is set up in a way that only the workflows that run on the master branch in this particular repo can assume it. And, it authenticates by using [OIDC](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws) because I didn't want to store sensitive AWS Access Keys with a long expiration date as Github secrets in my repository to use for this workflow. It's risky and frankly, cumbersome as all hell.

This IAM role is scoped to **only read and modify this particular JSON file** in the bucket. We don't want this role to perform anything more than what is expected out of it, right?

Our workflow assumes this role in each run to check if there's an existing JSON file of embeddings in the S3 bucket and if there's an existing JSON file, it downloads the file from S3 object and reuses the embedding.

The workflow then runs the fetch, chunk and embed scripts ([go to my last post to know more about these scripts](/heart/ouroboros)) from the RAG bot repository and generates the embeddings needed for retrieval and generation. After generating the embeddings, we update the S3 bucket with the new embeddings file.

And, this whole mechanism runs everytime I publish, edit or delete a blogpost just like how the Grand Sage and the Sumeru Akademiya makes the Sumeru citizens relive their lives to harvest their dreams and thoughts to create an artificial god. Eerie parallels between a gacha game and the state of the current world, I guess..

And, that's how my new shiny, automated ingestion pipeline automatically embeds my blog post so that my RAG bot can answer your questions about my writings.

 Well, did that justify the title? I'll let you be the judge. And, unfortunately, no, I don't regularly play gacha games anymore but hey, if you're playing, don't hesitate to reach out. I've been meaning to get back on it, once I **checks notes** fix everything that's wrong.
