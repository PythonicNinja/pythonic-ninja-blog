import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteURL = site || 'https://pythonic.ninja';
  const modules = import.meta.glob('../pages/blog/*.md', { eager: true }) as Record<string, any>;

  const posts = Object.values(modules)
    .map((m) => {
      const url = (m as any).url as string;
      const frontmatter = (m as any).frontmatter as any;
      return { url, frontmatter };
    })
    .filter((p) => p.frontmatter && p.frontmatter.title);

  // Get all unique tags
  const allTags = new Set<string>();
  posts.forEach(({ frontmatter }) => {
    const tags = frontmatter.tags || [];
    tags.forEach((tag: string) => allTags.add(String(tag).toLowerCase()));
  });

  const urls = [
    { loc: siteURL, changefreq: 'daily', priority: '1.0' },
    { loc: `${siteURL}/blog/`, changefreq: 'daily', priority: '0.9' },
    { loc: `${siteURL}/about/`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${siteURL}/projects/`, changefreq: 'monthly', priority: '0.8' },
    ...Array.from(allTags).map(tag => ({
      loc: `${siteURL}/tags/${encodeURIComponent(tag)}/`,
      changefreq: 'weekly' as const,
      priority: '0.7',
    })),
    ...posts.map(({ url, frontmatter }) => ({
      loc: new URL(url, siteURL).toString(),
      changefreq: 'monthly' as const,
      priority: '0.8',
      lastmod: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : undefined,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
