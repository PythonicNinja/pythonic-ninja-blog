import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd(), '..');
const pelicanDir = path.join(repoRoot, 'content');
const outDir = path.resolve(process.cwd(), 'src/pages/blog');

fs.mkdirSync(outDir, { recursive: true });
// Clean existing markdown files to avoid stale filenames
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith('.md')) {
    fs.unlinkSync(path.join(outDir, f));
  }
}

function parsePelican(mdContent) {
  const lines = mdContent.split(/\r?\n/);
  let i = 0;
  const meta = { title: '', date: '', category: '', tags: [], summary: '' };
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    const m = line.match(/^(Title|Date|Category|Tags|Summary|Slug|Status):\s*(.*)$/i);
    if (!m) break; // metadata header ended
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === 'title') meta.title = val;
    else if (key === 'date') meta.date = val;
    else if (key === 'category') meta.category = val;
    else if (key === 'tags') meta.tags = val.split(',').map(s => s.trim()).filter(Boolean);
    else if (key === 'summary') meta.summary = val;
    i++;
  }
  const body = lines.slice(i).join('\n').trimStart();
  return { meta, body };
}

function toKebabCase(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

function parseDateFromFilename(filename) {
  // Expect formats like 2017-10-20T00:00-title.md or 2017-10-20-title.md
  const base = path.basename(filename, path.extname(filename));
  const m = base.match(/^(\d{4}-\d{2}-\d{2})(?:[T_\-]?(\d{2}):?(\d{2})?)?[-_]?(.+)?$/);
  if (!m) return { datePrefix: null, titlePart: base };
  const [, ymd, hh, mm, rest] = m;
  const datePrefix = ymd; // keep ISO date only in filename
  const titlePart = rest || base;
  return { datePrefix, titlePart };
}

function slugifyFilename(filename, fallbackTitle) {
  const { datePrefix, titlePart } = parseDateFromFilename(filename);
  const titleSlug = toKebabCase(titlePart || fallbackTitle || 'post');
  return datePrefix ? `${datePrefix}-${titleSlug}` : titleSlug;
}

for (const file of fs.readdirSync(pelicanDir)) {
  if (!file.endsWith('.md')) continue;
  const abs = path.join(pelicanDir, file);
  const raw = fs.readFileSync(abs, 'utf8');
  const { meta, body } = parsePelican(raw);
  const { datePrefix } = parseDateFromFilename(file);
  const slug = slugifyFilename(file, meta.title);
  // Determine YYYY-MM-DD date for frontmatter
  let fmDate = '';
  if (meta.date) {
    const m = String(meta.date).match(/(\d{4}-\d{2}-\d{2})/);
    if (m) fmDate = m[1];
  }
  if (!fmDate && datePrefix) fmDate = datePrefix;
  const outPath = path.join(outDir, `${slug}.md`);
  const frontmatter = [
    '---',
    `layout: ../../layouts/PostLayout.astro`,
    `title: ${meta.title || slug}`,
    fmDate ? `date: ${fmDate}` : '',
    meta.category ? `category: ${meta.category}` : '',
    meta.tags && meta.tags.length ? `tags: [${meta.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}]` : '',
    meta.summary ? `summary: ${meta.summary}` : '',
    '---',
    ''
  ].filter(Boolean).join('\n');
  fs.writeFileSync(outPath, frontmatter + body, 'utf8');
  console.log('Converted:', file, '->', path.relative(process.cwd(), outPath));
}
