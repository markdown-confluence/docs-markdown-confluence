<!-- Adapted from markdown-confluence/docs-markdown-confluence (Apache-2.0). Revised for v7: current APIs, commands, configuration, links and publishing behavior. See LEGACY-CONTENT-NOTES.md. -->

# YAML frontmatter

Control an individual note using YAML at the start of the file. These keys belong in Markdown frontmatter, not the global `.markdown-confluence.json` configuration.

## Publishing and titles

```yaml
---
connie-publish: true
connie-title: Team handbook
---
```

`connie-publish: true` includes a scanned note even outside the default publishing folder. `false` excludes it regardless of folder or matching tag. `connie-title` overrides the Confluence title without renaming the file.

The global `firstHeadingPageTitle: true` setting can use a leading heading when `connie-title` is absent. [Publishing controls](/docs/publishing) explains the title and selection rules.

## Labels and visible properties

YAML tags become Confluence labels:

```yaml
---
tags:
  - handbook
  - public
owner: Platform team
connie-frontmatter-to-publish:
  - owner
---
```

The separate global `tagsToPublish` setting selects notes by their YAML tags. `connie-frontmatter-to-publish` lists property keys to show in a table at the beginning of the document. The implementation includes properties with truthy values; empty values and `false` are omitted.

## Page identity and parent

Publishing records `connie-page-id` and `connie-page-url` in source frontmatter. Keep the ID to continue addressing the same page. For an existing Confluence page, set its numeric ID deliberately:

```yaml
---
connie-page-id: "123456"
connie-dont-change-parent-page: true
---
```

The parent flag keeps that page's existing parent rather than moving it to match the local folder tree. See [folder structure](/docs/features/folder-structure). The generated URL links back to the published page; it is not an alternative destination setting.

## Blog posts

```yaml
---
connie-publish: true
connie-content-type: blogpost
connie-blog-post-date: "2026-09-08"
connie-title: September update
---
```

`connie-content-type` accepts `page` or `blogpost`. A quoted `YYYY-MM-DD` blog-post date also selects `blogpost` if content type is absent. Do not combine a date with `connie-content-type: page`.

Enable Blogs in the target space and grant the publishing account blog-post creation permission. Existing IDs continue to address existing content; changing a type field is not an automatic migration between Confluence content types.

## Editing restrictions and ordering

| Key | Value | Behavior |
| --- | --- | --- |
| `connie-lock` | `true` or `false` | Overrides global edit-lock management for this note. False stops management; it does not unlock an already restricted page. |
| `sort-order` | Number | Ranks a sibling page when global `orderPages` is enabled. |

See [edit locks](/docs/page-edit-locks) and [page ordering](/docs/features/folder-structure#order-sibling-pages). [Page-properties fences](/docs/structured-content#excerpts-and-page-properties) are explicit published macros, separate from note frontmatter.

## Sources

- [Per-page configuration implementation](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/ConniePageConfig.ts)
- [Blog publishing verification](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md)
