---
title: "Language vs Perception"
description: "Trying to make sense of alternatives to LLMs"
date: 2026-08-22
tags: ["tech"]
---

> "It's good to have people around that subscribe to different type of thinking schools." 

That's what I thought when I ran into online and real-life discourses, criticizing LLMs as ineffective, time and energy consuming. I was surprised to hear that, let alone process that there were alternatives to LLMs. I mean, I concede the time and energy consuming part but painfully slow and ineffective? Yeah, we're gonna need some proof, yeah?

That's when I discovered **Yann LeCun** and one of the most compelling arguments against mainstream AI trends and especially, LLMs. Ooh, spicy!

# Who's Yann LeCun?

[Yann LeCun](https://en.wikipedia.org/wiki/Yann_LeCun "Yann LeCun - Wikipedia") is the man who pioneered modern **Convolutional Neural Networks**, which is extremely important in **modern computer vision**. Basically, if you got a fancy smartphone with a face unlock mechanism or when Google Photos groups your photos and identifies them as your parents, friends, memes or what not or if you ever used Google Lens, CNNs are the architecture behind all of those wonderful things.

If that doesn't solidify his street cred, the man is a member of the **Canadian La Cosa AI Nostra** ([I made that phrase up, click on this link to know more](https://www.yiaho.com/en/yann-lecun-profile-of-a-french-visionary-in-artificial-intelligence/ "Canadian AI Mafia")) along with Hinton and served as **Chief AI Scientist of Meta's Fundamental AI Research (FAIR)** lab for well over a decade, before launching his new startup, [AMI Labs](https://amilabs.xyz/ "AMI Labs").

# LeCun's argument 

LeCun basically says LLMs' underlying principle which is **next-token prediction**, is a dead-end for true artifical intelligence and considers LLMs to be **glorified autocomplete machines**. They can predict patterns from text yet lack a fundamental understanding of the world that a dog or a 10 year old possesses.

In addition to that, LeCun considers **language to be a highly-compressed, lossy, low-bandwidth medium of intelligence**. To put it simply, if you ever heard of the phrases *"words don't do it justice"*, *"beyond words"*, or *"you have to see it to believe it"*? Yeah, you understand the argument that he's trying to prove with mathematics.

He also terms LLMs **autoregressive**. Autoregression in relation to AI models, refers to models that uses it **own past outputs as inputs to predict the next sequence of outputs**. That's right, friend, every AI model that you use from ChatGPT to Claude to Gemini to Kimi to Qwen, is autoregressive. Now, you know....

The problem with autoregressive LLMs according to LeCun is that they don't have any system in place to check whether their output makes sense before they produce it. (pssst, hallucinations). Personally, hard agree. God knows how many times I've raged at the outputs of Claude or ChatGPT, spewing out nonsense and burning my tokens without giving me proper answers. LeCun states that current LLMs have [**System 1 thinking** but lack **System 2 thinking**](https://thedecisionlab.com/reference-guide/philosophy/system-1-and-system-2-thinking "Here's some psychology for you"). 

>  **System 1 thinking** -> Instantaneous, subconscious pattern matching. LeCun says current LLMs operate entirely here, outputting text word-by-word without real foresight. Simply put, the equivalent of your subconscious mind. Think of System 1 thinking as comparable to your instincts, thoughts and feelings. Involuntary. **If you're Spider-Man, System 1 thinking is your Spider-Sense.**
> 
> **System 2 thinking** -> Conscious reasoning, planning, and estimating outcomes before taking action. The equivalent of your conscious mind. Think of System 2 thinking as comparable to your perception and intelligence. Voluntary. **If you're Spider-Man, System 2 thinking is your genius intellect that allowed you to invent your web fluid, web-shooters and <label class="spoiler"><input type="checkbox" class="spoiler-toggle" autocomplete="off"><span class="spoiler-text">inhibitors for your own arachnid hormones, yes, Brand New Day spoilers in your AI readup, have fun!</span></label>**

Basically, if you think interacting and observing to form judgements and adjust them are a better form of intelligence than the ability to predict what's next by endlessly consuming content, **Voila!, you are on LeCun's side.**

# LeCun's proposal

What LeCun suggests is that we throw the entire LLM architecture out and build a model that uses physics as the basis. He wants your AI to have common sense instead of being a really good chatbot.

LeCun's proposal is based on a mathematical framework called **Energy-Based Model (EBM)**. These EBMs are used to **grade things instead of generating them**. Instead of making an AI write an answer piece by piece, an EBM looks at a complete problem and a proposed answer, and assigns it a single score called **"energy"**.

Energy-Based Models map directly to probability distributions using the [Boltzmann (or Gibbs) distribution](https://blog.gopenai.com/why-energy-based-models-ebms-may-replace-todays-llms-fc5447910a8f "Here's some physics for you").

Because of the negative sign in the exponent, if the model assigns a lower energy value to an answer in a problem, it means that the probability of that answer is highly likely to happen. If the model assigns a higher energy, it means that the probability of that answer is unrealistic.

> **Lower the energy, the better. Higher the energy, the worse.**

LeCun used the concept of EBMs to pioneer an architecture called **Joint-Embedding Predictive Architecture (JEPA)**. JEPA is a specific implementation of EBM that is the blueprint for LeCun's world model.

Imagine you are looking at a photo of a dog running in a park, but a big sticker is covering the dog's face.

A standard AI (like ChatGPT or image generators) tries to fill in the blank by painting every single pixel. It guesses the exact color of the fur, the position of the grass, and the texture of the nose. It wastes a lot of energy on tiny details.

A JEPA model does not paint anything. Instead, it thinks in big ideas. It looks at the body and paws and simply says: "The hidden part is definitely a dog's head, and it is looking forward." JEPA ignores the useless details (like the exact shape of a blade of grass) and focuses only on the meaning of what is missing.

JEPA is different in that by training it to predict what happens next, it has to get good at laws of nature just to make good predictions. JEPA tries to give you abstract ideas of things, not raw texts or pixels. 

**JEPAs are brains, LLMs are mouths with endless knowledge.**

# My Opinions

## Against LeCun

LeCun downplays language, calling it a byproduct of intelligence, arguing that **true intelligence comes from continuous passive observation of the world**, like watching a child grow up and learn from the world and interact with it. **While I agree with this**, I think that language is not as trivial as he makes it seem.

I look at language as not only a tool of communication, I think it's a compression of thousands of years of human reasoning and expression.

Simply put, **language is a compression algorithm for human thoughts**. Compared to LeCun's proposal where we build the reasoning and perceptual abilities by training it on visual data, language imparts a dense, highly cleaned and organized information gathered by billions of humans across millenia. Language also filters the irrelevant noise from the usable data, thereby training models on denser data, that just strictly mentions the basic details necessary.

I don't need to feed thousands of visual recordings of romance to teach it the concept of love because love isn't just in the videos. You can see two people holding hands and without language to label them as siblings or lovers, you can't categorize it as love or grief or affection just from videos alone.

Language paired with brute force, has provided astonishing results and helped current LLMs produce emergent reasoning, coding and basic physics outputs that is good enough for real world use. LLMs are commercially viable as well as are in practical reality, while [LeBrun, the CEO of AMI Labs has stated JEPA models could take years to go from theory to commercial application](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/ "LeBrun on JEPA's real world applications").

## For LeCun

Yet, like LeCun's suggestion, language without common sense is meaningless and heavily inherits the bias of the datasets it trains on. We could very much train a LLM on narrow dataset and limit it a la [Plato's cave allegory](https://en.wikipedia.org/wiki/Allegory_of_the_cave "Plato's cave allegory - Wikipedia"). 

Simply put, for example, if you're only fed evidence that life is bad, how would you ever infer and come to the realization that life can be good, unless you have a brain and a heart to learn and feel and update your memories and feelings and knowledge?

**Language is a tiny, highly compressed projection of a vastly richer physical reality**. You'd need common sense and reasoning to go with your command of languages, if you're gonna achieve true independent intelligence. And, intelligence precedes language. The evidence is the animals around you. They don't speak and yet they can develop their intelligence.

## Conclusion

I think while LeCun is right on the big picture, his stance unintentionally trivializes accessibility of intelligence. Ironically, LeCun built his reputation on open-sourcing AI models to the general public but his present stance is unknown and I'm curious to see his position on this. He wants a better class of models but I think it directly discounts the availability of such models to common people like me, given how extensive training a JEPA model can be.

I think a combination of JEPA and LLM is the most feasible way to achieve true independent intelligence that scales. The world model provides reasoning while the language model provides abstraction and compression.

Without the language model, you're a chimpanzee that understands how the world works without being able to express your thoughts.

Without the world model, you're a [stochastic parrot](https://en.wikipedia.org/wiki/Stochastic_parrot "Stochastic Parrot - Wikipedia") with no understanding of reality.