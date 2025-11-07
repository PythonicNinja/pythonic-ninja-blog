# Repository Guidelines

## Agent Guidelines

- KISS - keep it simple stupid 
- DRY - don't repeat yourself
- You can use emoji
- Posts should follow structure of:
  - Problem / Solution / Example / Take it further

## Project Structure & Module Organization
- `web/`: Astro frontend containing `/src` for components, layouts, and pages, `/public` for static assets, and `/scripts` for utilities. Blog posts live in `web/src/pages/blog/` as Markdown/MDX with YAML frontmatter.
- Root-level `Makefile` and `pythonic-ninja-blog.yml` support deployment chores; prefer working inside `web/` for day-to-day changes.
- Generated artifacts land in `web/dist/`; never commit this directory.

## Build, Test, and Development Commands
- `npm install` (run inside `web/`): installs Astro, Vite, and content tooling.
- `npm run dev`: launches the local dev server with hot reload; useful for validating new posts/components.
- `npm run build`: produces the static bundle in `dist/`; run before opening PRs.
- `npm run preview`: serves the production build locally to check for routing or asset issues.

## Coding Style & Naming Conventions
- TypeScript/JavaScript use 2-space indentation; keep Astro components lean and favor functional patterns.
- Markdown posts require `---` frontmatter matching existing keys (`layout`, `title`, `date`, `tags`, `category`, `image`, `seo` block). Use ISO `YYYY-MM-DD` filenames to keep blog ordering deterministic.
- Prefer descriptive component filenames (e.g., `HeroSection.astro`) and kebab-case asset names.

## Testing Guidelines
- No automated test suite yet; validation relies on `npm run build` succeeding and the dev server showing expected output.
- When adding scripts/components, include minimal manual checks in PR descriptions (e.g., “verified tag archive renders”).
- For content-heavy changes, lint Markdown manually for broken links or code fences.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (`Add agent blog post`, `Fix RSS feed path`). Group related changes to keep diffs reviewable.
- Every PR should describe the change, note testing steps (`npm run build`, screenshots if UI), and link tracking issues when applicable.
- Highlight content changes touching dates, metadata, or SEO fields so reviewers can double-check the site map and RSS impacts.
