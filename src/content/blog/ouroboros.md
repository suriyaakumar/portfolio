---
title: "Ouroboros"
description: "A RAG feature for my blog"
date: 2026-09-07
tags: ["tech"]
---

Honestly, I'm writing this particular post to commit to my memory, on how I implemented this *bleeding-edge feature (/s)* called [Retrieval-Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) for my blog posts and also, as a way to increase content to feed into this very system that I'm about to describe. **cue Ouroboros noises ([the mythical animal](https://en.wikipedia.org/wiki/Ouroboros), not [Gojira](https://open.spotify.com/track/6WUNfk8ULz9ZdmC9f315Qp?autoplay=true))**

# Fetch.py
I'm going to spare you the long-winded explanations about RAG that are *totally unique* AND *aren't overdone* at all. So, we'll just get down and dirty. Since this RAG application is **based on these very blog posts**, I had to use **Github's Content API** to **fetch the markdown files** directly from my portfolio repository. I keep two separate json files, one to **cache the content SHA** (different from the commit SHA you're normally used to, this SHA is to track the particular version of contents of a file) of the files fetched from the Content API and the other JSON file to **cache the actual content** of the files.

After fetching the markdown files, I iterate through each file and see if the markdown file is either new or modified, by comparing them against my local content cache. If the file is new or modified, I redownload the latest version of that particular file and cache both the content SHA and the raw content. If I can't redownload it, I just keep the local version of both instead.

Since I use frontmatter for annotating metadata, I parse the raw markdown text and save every entry in the content json file with two key-value pairs,
one key denotes the metadata and the other key denotes the raw markdown text, before actually caching it..

# Chunk.py
After the fetching part is done, we chunk the content json file, post-by-post. The chunking process is done by first splitting the content by headings and the subsequent texts after the headings and also takes the introduction (which typically don't have headings) into account as well.

If there are no headings in the post, we return the text as a whole.

After splitting the markdown text into sections of text based on the markdown headers, we then proceed to split these sections into smaller chunks if one section is too long. In my case, the maximum amount of characters that a chunk of text can have is 1500 characters (partially an arbitrary decision I made for now and partially on the basis of keeping manageable chunks).

These chunks are just stored in yet another JSON file after the above process is completed and then, we proceed on to the embedding part of the process.

# Embed.py
This is the step where we turn the chunks from the previous step and turn each chunk into a vector. A vector is just a long list of numbers that represents the semantic meaning of text, images or data. For each chunk, we call Gemini's embedding API on them and get a resultant vector back.

We embed all the chunks of all posts returned for the very first pass of this pipeline. On subsequent runs when it reaches the embedding step, we only need to embed again the chunks which are modified since it's a waste to re-embed chunks which are unchanged.

So, to verify if the chunks are unchanged on subsequent passes, we load the embeddings from the previous pass and create a list of hashes for each chunks from the previous pass and for the newly generated chunks from the current pass, we hash every chunk and look it up in the list we had and if the hash chunk from the current step exists in the hash chunk lookup, it means that the chunk is unchanged and we just reuse it. Otherwise, we vectorize the new chunk.

After vectorizing the chunks, we store the vectors with their respective chunks and then, store the new vectorized chunks in yet another brand-new JSON file.

The reason for using JSON file as opposed to a vector database is a matter of scale. At this stage of my blog posts, the chunks aren't in excess of a hundred. As the number of blog articles and subsequently the number of chunks increase, I might change the nature of storage from a simple JSON file to a vector database.

# Retrieve.py
After embedding the chunks from the previous step, it's time for retrieval. This is the part where you ask the RAG bot a question and what happens behind the scenes is that your question gets turned into a vector, just like the chunks from the previous embedding step.

Then, we load the embeddings from the previous step and iterate through every embedding and compare it with our question embedding with a method called [cosine similarity](https://www.ibm.com/think/topics/cosine-similarity "Cosine Similarity") to give each embedding, a score based on how relevant they are to our question.

Then, the scored chunks are ranked based on their "similarity" scores and we return the most relevant chunks to the next step.

# Generate.py
This is the final step of the RAG pipeline where you actually get the answer to your question. Finally!!!

So, what we do here in this step is that we get the most relevant chunks from the previous step and build a prompt for each chunk and feed it to a LLM to generate the final answer to your question with citations from the chunks themselves.
