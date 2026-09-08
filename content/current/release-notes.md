# What's new in version 7

Version **7.0.0 shipped on 8 September 2026**. It adds richer content, more diagram renderers, publishing controls and Cloud authentication while keeping Markdown and existing page IDs at the center of the workflow. This page is checked against the [published v7 release](https://github.com/markdown-confluence/markdown-confluence/releases/tag/obsidian-confluence-root-v7.0.0).

## Check before you publish

Run offline `validate`, read-only `plan`, and collect JSON publish reports. Planning never creates placeholder pages or uploads attachments; existing pages are marked `reconcile`. [Validation, planning and reporting](/docs/preflight).

## More control over publishing

Exclude folders even when notes carry publish tags or `connie-publish: true`. Cancel an Obsidian publish after the current request, keeping completed work. Opt into sibling ordering with numeric `sort-order` values. [Publishing controls](/docs/publishing) and [page ordering](/docs/features/folder-structure#order-sibling-pages).

Restrict editing to the publishing account globally or per note with `connie-lock`. Viewing restrictions remain intact. Disabling locking does not unlock pages; additional permissions may be needed. [Edit locks](/docs/page-edit-locks).

## More ways to express your content

Publish footnotes with return links, named excerpt and page-properties macros, YAML tables with explicit spans, and Jira shorthand Smart Links. [Syntax, examples and limits](/docs/structured-content).

## More diagram choices

Kroki renders `kroki-<type>` fences through your configured server, with PNG/SVG output and timeouts. Mermaid gains PNG/SVG selection, raster scale, themes and theme variables. [Kroki](/docs/kroki) and [Mermaid output controls](/docs/diagrams#mermaid-output-controls).

## Preserve video embeds

MP4 embeds now remain attachment media groups instead of still-image nodes. [Images, video and attachments](/docs/features/image-upload#mp4-video-embeds).

## Bring content back to Markdown

Convert ADF to Markdown with `to-markdown` or its `from-adf` alias. Read files, pipe streams, or export a Confluence page by URL or ID. Default lossless mode preserves content that Markdown cannot represent in existing `adf` fences. Choose `--readable` when you want easier reading instead of exact restoration.

Export reads pages without updating them. It does not download attachments or migrate their IDs. [Explore conversion and export](./export.md).

## Publish LaTeX equations

Inline `$...$` and display `$$...$$` mathematics render automatically in Obsidian, the CLI and Docker. Bundled MathJax renders locally and uploads PNG attachments with your existing credentials. Equation source stays in your Markdown, and unchanged equations avoid unnecessary updates. Published-page export preserves the images rather than restoring editable TeX. [Explore LaTeX equations](/docs/latex).

## Publish Dataview results

Obsidian TABLE, LIST and TASK queries can become native Confluence content while the query stays in your vault. Results are evaluated again on publication, including when only a dependency changed. Unchanged results preserve the existing page version.

Queries in embedded sections keep the embedded note's context. Query errors stop preparation before page creation or content updates. Library integrations can use the new early source-transform hook for their own generated Markdown. [Explore Dataview](/docs/dataview).

## More ways to connect to Cloud

Scoped and unscoped API tokens and service-account OAuth use the same Cloud transport across the CLI, container and desktop plugin. Scoped tokens use the Atlassian gateway with a separate browsable site URL.

Native Obsidian browser OAuth adds site selection, connection testing and rotating refresh tokens. Interactive tokens and the configured app secret use Obsidian SecretStorage. Browser login has been verified against real Confluence with the project's private registration; public onboarding remains pending discussion with Atlassian. The registered app does not have device authorization enabled. [Choose authentication](./authentication.md).

## Preserve more of your published pages

Version 7 fixes inline-comment and TOC comparison cases that caused unnecessary page versions. Live verification checks that real inline comments retain their ID, body, open status, marker and highlighted text when content elsewhere changes, and that unchanged republishing preserves the page version.

The media pipeline also handles paths with parentheses, escaped characters and titles. Regression coverage includes PNG/SVG, files, spaces, encoded spaces, Unicode, wikilink embeds and remote images, alongside unchanged attachment IDs and versions.

The media regression suite also checks that text surrounding Markdown and Obsidian images survives publication, including consecutive images without blank lines. This fixes a historical v5.5.2 issue through the earlier v6 parser update; [regression coverage #915](https://github.com/markdown-confluence/markdown-confluence/pull/915) protects it in the v7 source.

Version 7 also fixes sparse link-mark handling and normalizes narrowly defined Cloud-generated ADF differences, helping avoid spurious changes during repeated publication.

## More predictable large publishes

Hierarchy requests run serially while rendering and uploads run two at a time. Request deadlines, bounded retries and clearer network errors make publishing failures easier to diagnose. Rate-limit retries honor `Retry-After`; multipart writes are not replayed automatically.

The source's regression profile covers a 166-note collection with 17 Mermaid diagrams, unchanged republishing, diagram failures and timeout recovery. These are recorded verification scenarios, not a universal performance guarantee.

## A new library client contract

The shared client moves to `confluence.js` 3.2.0. Pages, blog posts, spaces, ancestors, attachment reads and label reads use REST v2. Current-user lookup, multipart uploads and label writes retain supported v1 endpoints.

Custom integrations need the v3 `host`/`auth`, `body`/`searchParams`, native `FormData` and `fetch` contracts. The old client-factory override is removed, and API-prefix compatibility settings no longer affect routing. Existing Markdown and page IDs remain valid. [Review the library migration](./library.md).

## Upgrading from 5.5.2

The preceding v6 release introduced ESM packages, a revised settings/client/plugins API, Node.js 24.15.0 as the minimum CLI version, optional PlantUML, configurable Mermaid timeouts, publishing by tags, selected embeds, page headers/footers and ignored code blocks.

Read the [v6 migration guide](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md) before applying the v7 client migration. Obsidian installation uses [release assets](https://github.com/markdown-confluence/obsidian-integration/releases) while the community-catalog listing remains absent.

## Sources

- [Conversion change #908](https://github.com/markdown-confluence/markdown-confluence/pull/908)
- [Dataview change #909](https://github.com/markdown-confluence/markdown-confluence/pull/909)
- [OAuth and publishing reliability #912](https://github.com/markdown-confluence/markdown-confluence/pull/912)
- [Version 7 authentication and client migration #913](https://github.com/markdown-confluence/markdown-confluence/pull/913)
- [Feature acceptance and verification matrix](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)

- [Community publishing and formatting features #918](https://github.com/markdown-confluence/markdown-confluence/pull/918)
- [Kroki #919](https://github.com/markdown-confluence/markdown-confluence/pull/919)
- [Edit locks #917](https://github.com/markdown-confluence/markdown-confluence/pull/917)
- [MP4 embeds #916](https://github.com/markdown-confluence/markdown-confluence/pull/916)
