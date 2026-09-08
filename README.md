# Markdown Confluence website

The source for https://markdown-confluence.com: React and TanStack Router, built with Vite+, hosted by the existing `markdown-confluence` Vercel project.

## Development

Use Node.js 24.15.0 and pnpm (the lockfile is authoritative).

```sh
vp install --frozen-lockfile
vp run dev
vp run check
vp run fmt:check
vp test run
vp run build
```

## Publishing

Vercel's GitHub integration deploys `main` to production and pull requests to previews. The project root is this repository root; build, install, output, legacy redirects and SPA routing are configured in `vercel.json`. GitHub Actions verifies the site and does not deploy GitHub Pages or publish content to Confluence. No Vercel or Confluence credentials are needed by this static site or its build checks.

## Content

Edit guides in `content/current`, navigation in `content/documentation-navigation.json`, use cases in `content/use-cases.json`, and layouts in `src`. The original guides are retained under `content/legacy`. Keep old URL redirects in `vercel.json` aligned with the client aliases; the route tests check them. `scripts/build-route-files.mjs` generates metadata-bearing SPA entry files, sitemap and robots rules. Article bodies are rendered in the browser.

The product source and release artifacts remain in https://github.com/markdown-confluence/markdown-confluence. Changes here affect only the public website. The previous mdBook site and publishing workflows remain available in Git history.
