# Suriyaa Kumar — Portfolio

The source for [suriyaa.dev](https://suriyaa.dev), a personal portfolio and writing site built around three sections:

- **Face** (`/`) — an introduction and timeline.
- **Brain** (`/brain`) — a snapshot of GitHub repository activity.
- **Heart** (`/heart`) — a dated archive of writing, with an RSS feed at `/rss.xml`.

Individual blog posts include an interactive **Ask the Archive** panel, which answers questions using the site's writing.

## Tech stack

- [Astro](https://astro.build/) for the site and Markdown content
- React for the interactive Ask the Archive panel
- [Vercel](https://vercel.com/) adapter for deployment
- GitHub Actions to reindex the blog archive when its posts change

## Run locally

Requirements: Node.js `>=22.12.0` and pnpm.

```sh
pnpm install
pnpm dev
```

Astro starts the development server at [localhost:4321](http://localhost:4321).

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Build the production site into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro -- --help` | Show Astro CLI help |

## Writing

Add Markdown files under `src/content/blog/`. Each post uses this frontmatter:

```yaml
---
title: "Post title"
description: "A short description of the post"
date: 2026-01-31
tags: ["tech"]
draft: false
---
```

`title`, `description`, and `date` are required. `tags` defaults to an empty list and `draft` defaults to `false`. Draft posts are excluded from the archive and generated post pages. Posts are ordered newest first.

## Ask the Archive

The browser sends questions to the site's `/api/ask` endpoint. The endpoint forwards them to the configured RAG service; set these environment variables in the deployment environment:

| Variable | Purpose |
| --- | --- |
| `RAG_ENDPOINT` | URL of the RAG service |
| `APP_SECRET` | Shared secret sent to the RAG service as `X-App-Secret` |

These are server-side settings. Do not expose the secret in client-side code or commit it to the repository.

The GitHub Actions workflow `.github/workflows/reindex-rag.yml` runs when files under `src/content/blog/` change on `master` (or can be started manually). It checks out the separate `suriyaakumar/blog-rag-eval` repository, fetches the blog content, builds embeddings with Gemini, and uploads the resulting `embeddings.json` to S3. Workflow configuration requires the `AWS_INGEST_ROLE_ARN` repository variable, a `GEMINI_API_KEY` repository secret, and an AWS role configured for GitHub Actions OIDC with access to the embeddings bucket.

## Project structure

```text
src/
├── components/       # Navigation, profile sections, and Ask the Archive UI
├── content/blog/     # Markdown posts
├── pages/            # Face, Brain, Heart, RSS, and API routes
├── scripts/          # Browser-side behavior
├── styles/           # Site styles
└── layouts/          # Shared page layout
public/               # Static assets
.github/workflows/    # Blog archive reindex workflow
```

## Deployment

The Astro configuration uses the Vercel adapter. Deploy the repository to Vercel and configure `RAG_ENDPOINT` and `APP_SECRET` in the project's environment settings if the Ask the Archive feature is enabled. The production site URL and sitemap are configured for `https://suriyaa.dev`.
