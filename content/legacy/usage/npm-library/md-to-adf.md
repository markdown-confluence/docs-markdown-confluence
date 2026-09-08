<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Modified for this site migration: publishing frontmatter removed, internal links adapted, and development tooling instructions updated where applicable; revised for current v7 APIs and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Markdown and ADF conversion in Node.js

Use the public ESM entry point with Node.js 24.15.0 or newer:

```ts
import { parseMarkdownToADF } from "@markdown-confluence/lib";

const adf = parseMarkdownToADF(
  "# Release notes\n\nWritten in Markdown.",
  "https://your-site.atlassian.net",
);
console.log(adf);
```

The current [library guide](/docs/library) covers installation, workspace publishing and the v7 client contract. The [conversion guide](/docs/export) covers ADF-to-Markdown, lossless fences, readable output and Confluence page export. Conversion does not download attachments or migrate their IDs.
