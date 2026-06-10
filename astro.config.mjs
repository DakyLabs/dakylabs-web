// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dakylabs.com',
  output: 'static',

  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },

  integrations: [sitemap()],
});