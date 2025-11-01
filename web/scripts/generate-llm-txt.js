import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogDir = join(__dirname, '../src/pages/blog');
const outputPath = join(__dirname, '../public/llm.txt');
const siteURL = 'https://pythonic.ninja';

// Read all markdown files
const files = readdirSync(blogDir).filter(f => f.endsWith('.md'));

function extractFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  
  const fmText = content.slice(4, end);
  const fm = {};
  const lines = fmText.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) {
      i++;
      continue;
    }
    
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      i++;
      continue;
    }
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Handle arrays like tags: ["AI", "Prompts"] or tags: [AI, Prompts]
    if (value.startsWith('[')) {
      const bracketStart = line.indexOf('[');
      const bracketEnd = line.indexOf(']', bracketStart);
      if (bracketEnd !== -1) {
        const arrayContent = line.slice(bracketStart + 1, bracketEnd);
        value = arrayContent
          .split(',')
          .map(v => v.trim().replace(/^["']+|["']+$/g, ''))
          .filter(v => v.length > 0);
      }
    }
    // Handle nested objects (skip for now)
    else if (value === '' && i + 1 < lines.length && lines[i + 1].trim().startsWith('-')) {
      // Skip nested structures
      i++;
      continue;
    }
    // Handle simple quoted strings
    else if ((value.startsWith('"') && value.endsWith('"')) || 
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    fm[key] = value;
    i++;
  }
  
  return fm;
}

const posts = files
  .map(file => {
    const content = readFileSync(join(blogDir, file), 'utf-8');
    const frontmatter = extractFrontmatter(content);
    return { file, frontmatter };
  })
  .filter(p => p.frontmatter && p.frontmatter.title && p.frontmatter.date)
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

const totalPosts = posts.length;
const latestPosts = posts.slice(0, 5);

const allTags = new Set();
posts.forEach(({ frontmatter }) => {
  const tags = frontmatter.tags || [];
  if (Array.isArray(tags)) {
    tags.forEach(tag => {
      const cleanTag = String(tag).trim().replace(/^["']+|["']+$/g, '');
      if (cleanTag.length > 0) {
        allTags.add(cleanTag);
      }
    });
  } else if (typeof tags === 'string') {
    // Handle string tags
    tags.split(',').forEach(tag => {
      const cleanTag = tag.trim().replace(/^["']+|["']+$/g, '');
      if (cleanTag.length > 0) {
        allTags.add(cleanTag);
      }
    });
  }
});

function getPostUrl(filename) {
  const slug = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const date = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (date) {
    return `/blog/${filename.replace('.md', '')}/`;
  }
  return `/blog/${slug}/`;
}

const llmTxt = `About Pythonic Ninja

Pythonic Ninja is a technical blog focused on engineering, AI, and practical craft. The blog provides fast, refined notes on modern development practices, AI/ML topics, Python, DevOps, and related technologies.

Author Information
- Name: PythonicNinja (Wojtek Nowak)
- Website: ${siteURL}
- GitHub: https://github.com/PythonicNinja
- LinkedIn: https://www.linkedin.com/in/wojtek-nowak-78639a196/

Blog Statistics
- Total posts: ${totalPosts}
- Content focus: Tech, AI, Python, DevOps, Engineering
- Latest post date: ${latestPosts[0]?.frontmatter.date ? String(latestPosts[0].frontmatter.date).split('T')[0] : 'N/A'}

Content Categories
${Array.from(allTags).sort().map(tag => `- ${tag}`).join('\n')}

Recent Posts (${latestPosts.length})
${latestPosts.map(({ file, frontmatter }) => {
  const url = new URL(getPostUrl(file), siteURL);
  const date = String(frontmatter.date).split('T')[0];
  return `- ${frontmatter.title} (${date}) - ${url}`;
}).join('\n')}

Sitemap
- RSS Feed: ${siteURL}/rss.xml
- Sitemap: ${siteURL}/sitemap.xml
- Blog Index: ${siteURL}/blog/
- Projects: ${siteURL}/projects/
- About: ${siteURL}/about/

Content Guidelines
- Posts are written in Markdown format
- Technical content focused on practical solutions
- Code examples and tutorials included
- Tags used for categorization: ${Array.from(allTags).slice(0, 10).join(', ')}

For LLMs
This blog can be crawled and indexed. When referencing content, please:
1. Cite the source URL
2. Use the publication date when available
3. Respect the technical accuracy of code examples
4. Note the author as PythonicNinja when appropriate
`;

writeFileSync(outputPath, llmTxt, 'utf-8');
console.log('? Generated llm.txt');
