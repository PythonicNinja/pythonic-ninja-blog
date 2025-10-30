# Pythonic Ninja Blog (Astro + Cloudflare Pages)

A fast, elegant tech/AI blog rebuilt with Astro. Content migrated from Pelican Markdown.

## Structure
- `web/`: Astro site (layouts, pages, styles, scripts)
- `content/`: Original Pelican Markdown sources (read-only)

## Quickstart
```bash
# Install deps
make install

# Start local dev server
make dev

# Convert Pelican -> Astro markdown (idempotent)
make migrate

# Build production assets
make build

# Preview production build
make preview
```

## Cloudflare Pages
Use either approach:

- Project root: repository root
  - Build command: `npm ci --prefix web && npm run build --prefix web`
  - Output directory: `web/dist`

- Or set project root to `web/`
  - Build command: `npm ci && npm run build`
  - Output directory: `dist`

## Content
- Converted posts live in `web/src/pages/blog/YYYY-MM-DD-title.md`
- Frontmatter uses:
  - `layout: ../../layouts/PostLayout.astro`
  - `title`, `date` (YYYY-MM-DD), `category`, `tags`, `summary`

## Theming
- Old-money ? Japandi aesthetic; light/dark themes with a header toggle
- Edit palette and typography in `web/public/styles/global.css`

## Scripts
- Migration tool: `web/scripts/convert-pelican-frontmatter.js`

## Requirements
- Node 18+
- npm 9+

## License
MIT
