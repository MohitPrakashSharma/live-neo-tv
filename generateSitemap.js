import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder';
import { fetchCategories, fetchChannels } from './services/api'; // Import the provided APIs
import { generateSlug } from './utils/slug'; // Utility for generating slugs

const BASE_URL = 'https://neotvapp.com'; // Replace with your actual website's base URL

const generateSitemap = async () => {
  try {
    // Fetch categories
    const categories = await fetchCategories();

    const sitemap = create('urlset', { version: '1.0', encoding: 'UTF-8' })
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    // Add the base URL
    sitemap.ele('url').ele('loc', BASE_URL).up();

    // Fetch channels for each category
    for (const category of categories) {
      const channels = await fetchChannels(category.language);

      channels.forEach((channel) => {
        const slug = generateSlug(channel.name);
        sitemap
          .ele('url')
          .ele('loc', `${BASE_URL}/${slug}`)
          .up()
          .ele('lastmod', new Date().toISOString())
          .up()
          .ele('priority', 0.8);
      });
    }

    // Write sitemap.xml to the public directory
    const xml = sitemap.end({ pretty: true });
    const outputPath = path.resolve(__dirname, 'public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);

    console.log('Sitemap generated successfully:', outputPath);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

generateSitemap();
