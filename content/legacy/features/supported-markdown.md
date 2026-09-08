<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# Supported Markdown

Markdown Confluence converts supported syntax to Atlassian Document Format. Use this inventory to choose native Markdown, rendered diagrams or raw ADF for your content.

## Everyday formatting

- Paragraphs, headings, blockquotes, rules and line breaks.
- Bold, italic, strikethrough, inline code and fenced code blocks.
- Obsidian `==highlight==` syntax becomes bold text, rather than a background highlight.
- Unicode emoji and Confluence emoji syntax `:id|short_name:`.
- Ordered and unordered lists, including ordered-list starting numbers.
- Checked and unchecked task lists.
- Pipe tables with column alignment.
- Links, images and supported Obsidian wikilinks.
- Limited `<u>`, `<sub>`, `<sup>` and color/background-color span formatting.

Arbitrary HTML rendering is disabled. Ordinary HTML comments are omitted; examples inside code stay literal.

## Notes and rich content

| Feature | Guide |
| --- | --- |
| Panels and foldable callouts | [Callouts](/docs/features/callouts) |
| Wikilinks, heading links and aliases | [Wikilinks](/docs/features/wikilinks) |
| Whole-note, heading and block embeds | [Publishing controls](/docs/publishing#reuse-content-with-embeds) |
| Images, files and page attachments | [Image uploads](/docs/features/image-upload) |
| Inline and display LaTeX equations | [LaTeX equations](/docs/latex) |
| Mermaid and optional PlantUML | [Diagrams](/docs/diagrams) |
| Account mentions | [Mentions](/docs/features/mentions) |
| Confluence TOC and raw ADF macros | [Publishing controls](/docs/publishing#insert-a-table-of-contents) |
| Evaluated Dataview TABLE/LIST/TASK output | [Dataview](/docs/dataview) |
| Rich ADF, layouts, media metadata and extensions | [Conversion and export](/docs/export#what-lossless-means) |

## ADF-only content

Some Confluence content cannot be represented faithfully in plain Markdown. Existing `adf` fences can preserve nodes, marks, extension payloads and unsupported attributes. Default lossless export uses those fences where needed; readable export can simplify presentation metadata.

Preserving ADF data does not guarantee that every Confluence product accepts every node, and export does not recreate server-side comments or macro objects.

## Mathematical notation

Version 7 automatically renders `$...$` inline equations and `$$...$$` display equations using bundled MathJax. Obsidian, the CLI and Docker upload the resulting PNG images with your page. No Marketplace app or TeX installation is needed. See [LaTeX equations](/docs/latex) for examples, supported syntax and export limits.

## More structured content in v7

[Footnotes, macros and structured tables](/docs/structured-content) covers named and repeated footnotes, `confluence-excerpt` and `confluence-properties` fences, `yaml-table` with explicit row/column spans, and `JIRA: DOCS-123` Smart Links. Invalid table spans fail conversion; literal `<` and `^` remain text.

Diagrams include [Mermaid and PlantUML](/docs/diagrams), opt-in [Kroki](/docs/kroki), and local [LaTeX equations](/docs/latex). [MP4 embeds](/docs/features/image-upload#mp4-video-embeds) publish as attachment media groups.

## Sources

- [Conversion coverage by feature](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CONVERSION.md#coverage-of-260-and-264)
- [Markdown parser configuration](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/MarkdownTransformer/index.ts)
