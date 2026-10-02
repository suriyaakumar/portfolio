import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "Suriyaa Kumar - Heart",
    description: "Things I see, for you to see.",
    site: context.site ?? "https://suriyaa.dev",

    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/heart/${post.id}/`,
    })),
  });
}