import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd(), '..');
const pelicanDir = path.join(repoRoot, 'content');
const outDir = path.resolve(process.cwd(), 'src/pages/blog');

fs.mkdirSync(outDir, { recursive: true });

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

function slugifyFromFilename(filename, fallbackTitle) {
  const base = path.basename(filename, path.extname(filename));
  const parts = base.split('-');
  const firstAlphaIndex = parts.findIndex(p => /[a-zA-Z]/.test(p));
  const usable = firstAlphaIndex > -1 ? parts.slice(firstAlphaIndex).join('-') : (fallbackTitle || base).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return usable.toLowerCase();
}

for (const file of fs.readdirSync(pelicanDir)) {
  if (!file.endsWith('.md')) continue;
  const abs = path.join(pelicanDir, file);
  const raw = fs.readFileSync(abs, 'utf8');
  const { meta, body } = parsePelican(raw);
  const slug = slugifyFromFilename(file, meta.title);
  const outPath = path.join(outDir, `${slug}.md`);
  const frontmatter = [
    '---',
    `title: ${meta.title || slug}`,
    meta.date ? `date: ${new Date(meta.date).toISOString()}` : '',
    meta.category ? `category: ${meta.category}` : '',
    meta.tags && meta.tags.length ? `tags: [${meta.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}]` : '',
    meta.summary ? `summary: ${meta.summary}` : '',
    '---',
    ''
  ].filter(Boolean).join('\n');
  fs.writeFileSync(outPath, frontmatter + body, 'utf8');
  console.log('Converted:', file, '->', path.relative(process.cwd(), outPath));
}
