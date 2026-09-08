# Convert Markdown & ADF

Use this guide to convert local Markdown and Atlassian Document Format (ADF) files. You do not need Confluence credentials. To read content from a live site, follow [Export a Confluence page](./export-confluence.md).

Version 7 supports both directions through the CLI and library. Conversion reads content without publishing pages or changing your Markdown source.

## Markdown to ADF

With Node.js 24.15.0 or newer:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-adf notes/page.md --output page.adf.json
```

Local conversion needs no Confluence credentials. It does not publish pages or write page IDs to your source Markdown.

## Files and streams in both directions

Read a file or pipe data into the CLI:

```sh
vp dlx @markdown-confluence/cli@7.0.0 to-adf notes/page.md --output page.adf.json
vp dlx @markdown-confluence/cli@7.0.0 to-markdown page.adf.json --output page.md
vp dlx @markdown-confluence/cli@7.0.0 from-adf page.adf.json --output readable.md --readable
cat page.adf.json | vp dlx @markdown-confluence/cli@7.0.0 to-markdown -
```

`from-adf` is an alias for `to-markdown`. Both commands accept file input and output or stdin and stdout. Convert one source per invocation. Create output directories first; an output file is replaced only after input was read and converted successfully. Use `--` before a filename that begins with a hyphen.

## Read a Confluence page

If the content is on Confluence rather than in a local file, use [Export a Confluence page](./export-confluence.md). That guide covers authentication, page URLs and IDs, and saving the original ADF. Export reads a page without changing it or establishing a publishing relationship.

## What lossless means

Default `to-markdown` output uses ordinary Markdown where it can reproduce the original ADF. When Markdown would lose information, it preserves that block in an existing `adf` fenced code block. A final conversion check verifies that all original ADF fields survive a round trip.

This preserves data such as media IDs, unknown extensions, layout widths, comment annotations, unsupported attributes and macro parameters. Some inputs require a fence around the complete ADF document. The result can therefore contain substantial JSON rather than only natural Markdown.

`--readable` prefers readable content: cards become links, dates become ISO dates, statuses become bold text and decisions become list items. It may simplify presentation metadata and is intended for reading rather than exact restoration. Unsupported content still uses ADF fences.

## Boundaries

- Export does not download attachments or migrate their IDs to another page or site.
- Preserved comment and macro payloads are data; export does not recreate server-side comments or macro objects.
- A preserved ADF node is not a guarantee that every Confluence product accepts it.
- Invalid input exits unsuccessfully with diagnostics on stderr and no partial stdout or newly generated output file.

The [complete coverage table](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CONVERSION.md#coverage-of-260-and-264) explains native Markdown, limited formatting markup, and ADF-fence behavior by feature.

## Sources

- [Conversion contract and acceptance criteria](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CONVERSION.md)
- [Conversion feature change](https://github.com/markdown-confluence/markdown-confluence/pull/908)
- [CLI reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
