**Live site**: https://pythonic.ninja

## Pythonic Ninja Blog

A static blog powered by Astro, deployed to `https://pythonic.ninja`.

### Tech stack
- **Framework**: Astro
- **Output**: Static site
- **Language**: TypeScript/JS for build scripts; Markdown/MDX for content

### Local development
```bash
cd web
npm install
npm run dev
```
- **Dev server**: Starts on a local port (shown in terminal).

### Build
```bash
cd web
npm run build
```
- Outputs to `web/dist/`.

### Preview production build
```bash
cd web
npm run preview
```

### Project structure
- **web/src/**: Astro components and pages
- **web/src/content/** or **web/src/pages/**: Blog posts and site pages (Markdown/MD)
- **web/public/**: Static assets served as-is
- **web/dist/**: Production build output
- **web/scripts/**: One-off or migration scripts

### Deployment
- Configured `site` in `web/astro.config.mjs` to `https://pythonic.ninja` for correct canonical URLs.
- Any static host or CDN can serve `web/dist/` after `npm run build`.

### License
MIT