import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config

export default defineConfig({
	site: 'https://8951172c.astronotion.pages.dev/',
	// base: '/astronotion',
	integrations: [mdx(), sitemap()],
});
