// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: "https://suriyaa.dev",
  integrations: [sitemap(), react()],
  vite: {
    // Keep production builds from replacing a running dev server's React runtime.
    cacheDir: process.env.NODE_ENV === 'production'
      ? './node_modules/.vite-production'
      : './node_modules/.vite-development',
  },
  adapter: vercel()
});
