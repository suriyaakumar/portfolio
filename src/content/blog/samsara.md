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

I used a Github Actions workflow that automatically triggers on a **push to my master branch, specifically to my blog directory**. This workflow can be also be manually triggered.

What happens when you trigger the flows multiple times in a short span of time? Easy. I've set up a **concurrency group**, that makes all these overlapping runs queue up.

It checks out my [RAG bot repository](https://github.com/suriyaakumar/blog-rag-eval) in a separate folder called ```rag/``` and installs the required environment (Python 3.12) & dependencies from the repository's ```requirements.txt```.

To give you some overall context, the retrieval and generation part of my RAG bot is hosted on a **Lambda function**, which relies on a JSON file of embeddings stored in a **S3 bucket** to generate responses to the questions. (I'll describe the AWS setup in a future post, but for now, let's focus on this.)

Now, to **update the embeddings** which I store in my S3 bucket, I created an **IAM role**. The IAM role is set up in a way that only the workflows that run on the master branch in this particular repo can assume it. And, it authenticates by using [OIDC](https://openid.net/developers/how-connect-works/) because I didn't want to store sensitive AWS Access Keys with a long expiration date as Github secrets in my repository to use for this workflow. It's risky and frankly, cumbersome as all hell.

This IAM role is scoped to **only read and modify S3 objects** in the bucket. We don't want this role to perform anything more than what is expected out of it, right?

Our workflow assumes this role in each run to check if there's an existing JSON file of embeddings in the S3 bucket and if there's an existing JSON file, it downloads the file from S3 object and reuses the embedding.

If the embeddings file is not found, then, the workflow runs the fetch, chunk and embed scripts ([go to my last post to know more about these scripts](/heart/ouroboros)) from the RAG bot repository and generates the embeddings needed for retrieval and generation. After generating the embeddings, we update the s3 bucket with the new embeddings file.

And, this whole mechanism runs everytime I publish, edit or delete a blogpost. Pretty nifty, huh? Nifty 50's going down but **we don't cry in the casino**, ok, buddy..

And, that's how my new shiny, automated ingested pipeline automatically embeds my blog post so that my RAG bot can answer your questions about my writings, the moment I publish them.
