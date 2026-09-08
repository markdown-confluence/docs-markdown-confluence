# Footnotes, macros and structured tables

Keep structured content in your Markdown source and publish it as native Confluence content. These forms are available in the v7 shared conversion pipeline.

## Footnotes


```markdown
A reference[^source], and the same reference again[^source].

[^source]: A **formatted** definition.

    An additional paragraph in the same footnote.
```

Numeric and named labels, repeated references, multiline definitions and inline notes use the Markdown parser. Code and escaped syntax remain literal. Generated Confluence anchors link references to definitions and back. Header/footer fragments use separate anchor namespaces.

## Excerpts and page properties

Use an explicit fenced block whose contents are Markdown:

````markdown
```confluence-excerpt summary
Reusable **summary** text.
```

```confluence-properties record
| Property | Value |
| --- | --- |
| Owner | Documentation team |
```
````

The name after the fence language identifies the excerpt or properties record. Multiple blocks get deterministic macro IDs. No arbitrary frontmatter is published automatically. Existing raw `adf` fences remain available for lossless expressions and exports.

## YAML tables

````markdown
```yaml-table
- Count: 0
  Enabled: false
  Literal: "<"
- Count: 12
  Enabled: true
  Literal: "^"
```
````

For explicit spans, use columns and rows. A spanned-over column is omitted from the row input; absent remaining cells are empty.

````markdown
```yaml-table
columns: [Name, Details]
rows:
  - [{value: Group, colspan: 2}]
  - [{value: Shared, rowspan: 2}, First]
  - [Second]
```
````

Scalar values preserve `0`, `false`, and empty text. Literal `<` and `^` never merge cells. Invalid or overlapping spans fail conversion instead of deleting content. Tables are limited to 100 columns and 1000 rows. Cells contain literal scalar text; use ordinary Markdown or raw ADF for richer cell content.

## Jira shorthand

Set `jiraUrl` in JSON, use `--jiraUrl https://example.atlassian.net`, or set **Jira site URL** in Obsidian. Explicit `JIRA: DOCS-123` becomes a Smart Link. Code and existing links are left intact; formatting on surrounding text is preserved. This does not grant access to the linked issue.


## Next steps

Use [raw ADF](/docs/features/raw-adf) for richer content that these explicit forms cannot express. Configure the Jira site in the [configuration reference](/docs/features/setting-sources).

## Sources

- [Released syntax and limitations](https://github.com/markdown-confluence/markdown-confluence/blob/obsidian-confluence-root-v7.0.0/documentation/FORK_PORTS.md)
