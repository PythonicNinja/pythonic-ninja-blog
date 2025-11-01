import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const modules = import.meta.glob('../pages/blog/*.md', { eager: true }) as Record<string, any>;
  const siteURL = 'https://pythonic.ninja';

  const posts = Object.values(modules)
    .map((m) => {
      const url = (m as any).url as string;
      const frontmatter = (m as any).frontmatter as any;
      return { url, frontmatter };
    })
    .filter((p) => p.frontmatter && p.frontmatter.title && p.frontmatter.date)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, 20); // Latest 20 posts

  const rssItems = posts
    .map(({ url, frontmatter }) => {
      const fullURL = new URL(url, siteURL);
      const pubDate = new Date(frontmatter.date).toUTCString();
      const description = frontmatter.summary || frontmatter.description || '';
      
      return `    <item>
      <title><![CDATA[${frontmatter.title}]]></title>
      <link>${fullURL}</link>
      <guid>${fullURL}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${frontmatter.tags && frontmatter.tags.length > 0 
        ? frontmatter.tags.map((tag: string) => `      <category><![CDATA[${tag}]]></category>`).join('\n')
        : ''}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pythonic Ninja</title>
    <link>${siteURL}</link>
    <description>Tech &amp; AI ? serene speed</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
