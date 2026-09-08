# Export a Confluence page

Use this guide when your content already lives in Confluence Cloud and you want a local Markdown or ADF file. To convert files already on your computer, see [Convert Markdown & ADF](./export.md).

Export reads one page at a time. It does not change the page, download a whole space, or set up continuous two-way synchronization.

## Before you begin

- Install Node.js 24.15.0 or newer and use the v7 CLI.
- Configure [authentication](./authentication.md) for the Confluence site you want to read.
- Get the page's numeric ID or full HTTPS page URL. Replace shortened share links with the full URL.
- Make sure your account can read the page. A publishing parent ID is not required for export.

## Export to Markdown

From the directory containing your configuration, run:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-markdown \
  --page 123456 \
  --config .markdown-confluence.json \
  --output exported-page.md
```

Open `exported-page.md` to inspect the result. Default output preserves rich Confluence content in `adf` code blocks where ordinary Markdown would lose information.

If your priority is reading and editing the exported text, add `--readable`:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-markdown \
  --page 123456 \
  --config .markdown-confluence.json \
  --output readable-page.md \
  --readable
```

Readable mode can simplify formatting metadata. Unsupported content still uses ADF blocks. See [lossless and readable output](./export.md#what-lossless-means) before choosing a mode.

## Export the original ADF

Use `to-adf` with a page URL to save the original document structure:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-adf \
  "https://your-site.atlassian.net/wiki/spaces/DOCS/pages/123456/Page" \
  --config .markdown-confluence.json \
  --output original-page.adf.json
```

The URL must match the configured site. Page reads require an HTTPS API base URL and use the same authentication configuration as publishing.

## Check the result before reusing it

- Export does not download attachments or migrate their IDs to another page or site.
- Preserved comment and macro data does not recreate server-side comments or macro objects.
- Export does not add a publishing relationship or import the page into your Obsidian vault automatically.
- Create output directories first. A failed conversion reports diagnostics and does not write a newly generated partial output file.

For access or URL problems, follow [Troubleshooting](./troubleshooting.md#export-does-not-read-the-page).

## Sources

- [v7 conversion and export contract](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CONVERSION.md)
