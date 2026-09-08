# Publish Dataview results

Turn Obsidian queries into Confluence tables, lists and task snapshots. Keep the query in your note and refresh the published result whenever you publish.

Available in **version 7** of the desktop Obsidian plugin. Live query evaluation uses Dataview installed in your vault.

## Enable result publishing

To publish query results:

1. Install and enable Dataview in the vault.
2. Open Confluence Integration settings and enable **Publish Dataview results**. It is off by default.
3. Remove `dataview` from `ignoredCodeBlockLanguages` if you previously configured it there. Ignoring the language takes precedence over evaluating its results.

Fenced `dataview` **TABLE**, **LIST** and **TASK** queries are evaluated during publication. Their results pass through the normal Markdown-to-ADF conversion pipeline.

## Build a bibliography

Link to papers and select them with a query:

````markdown
[[Papers/Example paper]]

```dataview
TABLE authors AS Authors
FROM "Papers"
WHERE contains(this.file.outlinks, file.link)
```
````

The query remains in the source note, including after page IDs and URLs are written to frontmatter. Updating a paper's `authors` changes the bibliography on its next publication even when the bibliography note itself has not changed. Unchanged query results do not create a new Confluence page version.

## Links and embedded context

Links resolve to Confluence when their targets are in the selected publication set. Otherwise, the publisher retains the text without a link. A query does not automatically select its results for publication.

A query inside an embedded note section runs with that note's context: `this` refers to the embedded note. Only the included section is evaluated. Single-note publishing evaluates that note and its included content.

## Know the limits

- Task output is a snapshot. Changing a task in Confluence does not update Obsidian.
- CALENDAR and DataviewJS blocks report unsupported output when result publishing is enabled.
- Inline DQL and JavaScript expressions are not evaluated by this feature.
- Arbitrary JavaScript views, interactive charts and HTML rendering are outside its scope.
- Live evaluation runs in Obsidian. The standalone CLI can consume already-generated Markdown or ADF but does not evaluate your vault's Dataview queries.

Index initialization and recently edited Markdown dependencies are checked before evaluation. Indexing has a 15-second wait limit; each query has a 30-second limit. Missing Dataview, query errors and timeouts identify the source note and stop preparation before Confluence page creation or content updates.

## Extend the same pipeline

Library consumers can provide an asynchronous source transformation through `MarkdownSourceTransformerService`. That hook runs before embed expansion, conversion, link mapping and uploads, while frontmatter write-back preserves the original source. See [library integration](./library.md).

## Sources

- [Dataview behavior, limitations and integration checks](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/DATAVIEW.md)
- [Dataview feature change](https://github.com/markdown-confluence/markdown-confluence/pull/909)
- [Real desktop verification in the v7 matrix](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md#feature-acceptance)
