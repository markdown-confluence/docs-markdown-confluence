# Select & control publishing

Choose the notes, structure and reusable content that belong in Confluence. These controls work through the shared publishing library; configure them in the CLI's JSON file, supported environment variables, or the Obsidian settings interface where exposed.

## Select by folder, tag or note

`contentRoot` chooses the scan root. `folderToPublish` chooses the default publishing folder within it. Matching `tagsToPublish` values or `connie-publish: true` include notes elsewhere under the scan root. `connie-publish: false` always excludes a note.

```json
{
  "contentRoot": ".",
  "folderToPublish": "docs",
  "tagsToPublish": "public, handbook"
}
```

Here, notes in `docs` are selected by default. Other scanned notes with a matching YAML tag are also selected. A linked note or Dataview result is not automatically selected merely because another page references it.

## Titles, labels and properties

Use `connie-title` to override the page title without renaming the file. Alternatively, set `firstHeadingPageTitle: true` to use a leading heading when there is no explicit `connie-title`; the selected heading is removed from the body to avoid duplication.

YAML `tags` are published as Confluence labels. `tagsToPublish` is the separate selection setting. Include chosen source properties as a table with `connie-frontmatter-to-publish`:

```yaml
---
connie-publish: true
connie-title: Team handbook
owner: Platform team
tags:
  - handbook
  - public
connie-frontmatter-to-publish:
  - owner
---
```

Publishing writes `connie-page-id` and `connie-page-url` back to the source. Preserve the ID to keep updating the same page. These are per-note properties, not global JSON settings.

## Build a page tree

The common root of selected notes maps to `confluenceParentId`, an existing page. Subfolders become child pages. Selecting notes outside the default folder can expand the common root and therefore change the resulting tree.

A folder note named after its folder, `index.md`, `README.md`, or `readme.md` supplies the folder page's content. A root folder note updates the configured parent itself. Generated folder pages retain the standard child-page listing.

`connie-dont-change-parent-page: true` keeps an existing page's parent rather than moving it to match the local tree. Use it together with the intended `connie-page-id`; it does not discover an arbitrary destination for you. [Folder structure](/docs/features/folder-structure) and [frontmatter](/docs/features/yaml-frontmatter) describe the details.

## Reuse content with embeds

Note transclusion expands the source of another Markdown note before publication:

```markdown
![[Shared Notes/Release Checklist]]
![[Shared Notes/Release Checklist#Before release]]
![[Shared Notes/Release Checklist#^approval-block]]
```

Whole-note, heading and block embeds are supported. Referenced notes can be outside the publishing folder but must be available to the scanned workspace. Section embeds include only the requested content, and relative image paths are rebased to the source note. Literal embed examples inside code stay literal. An included note does not need its own Confluence page merely to supply embedded content.

## Add shared headers and footers

Insert Markdown before and after each Markdown-backed page:

```json
{
  "pageHeaderMarkdown": "> [!note] Maintained in Markdown\n> Edit the source repository to suggest a change.",
  "pageFooterMarkdown": "---\n[Documentation repository](https://github.com/your-org/your-docs)"
}
```

The environment variables are `CONFLUENCE_PAGE_HEADER_MARKDOWN` and `CONFLUENCE_PAGE_FOOTER_MARKDOWN`; the CLI options use the same camel-case names as JSON. These fragments apply to Markdown source pages. Automatically generated folder pages keep their standard content.

## Insert a table of contents

Place an empty `toc` fence where the Confluence TOC macro should appear:

````markdown
```toc
```
````

Standalone Confluence wiki-style markup such as `{toc:printable=true|maxLevel=3}` is also accepted. For other Confluence-specific structures, [raw ADF fences](/docs/features/raw-adf) embed supported ADF nodes without inventing another Markdown syntax.

## Omit source-only blocks

Remove selected fenced languages from the published page using JSON configuration:

```json
{
  "ignoredCodeBlockLanguages": ["button"]
}
```

The source note keeps those blocks. Include `dataview` in this array only if you want to omit Dataview queries: ignoring that language takes precedence over [publishing Dataview results](/docs/dataview). Ordinary HTML comments are omitted from published content; literal comment examples in code remain literal.

## Publish a blog post

To publish a note as a Confluence blog post:

```yaml
---
connie-publish: true
connie-content-type: blogpost
connie-blog-post-date: "2026-09-08"
connie-title: September engineering update
---
```

The space must have Blogs enabled, and the publishing account needs blog-post creation permission. Keep the date quoted in `YYYY-MM-DD` format. A date also selects `blogpost` when content type is omitted; do not combine a blog-post date with `connie-content-type: page`.

Read the complete [blog publishing guide](/docs/blog-posts) for destination requirements and updating existing posts.

## Protect existing work

Leave `forceOverwrite` false to stop overwriting pages last updated by another user. Inspect the conflict before deliberately enabling it. The publisher compares existing content and attachments to avoid unnecessary updates and preserves inline-comment annotations where it can reattach them. [Comment handling](/docs/features/comment-handling) explains the behavior when an anchor cannot be matched.

For first runs, page IDs, repeat publishing and ownership, read [Publishing & updates](/docs/publishing-lifecycle).

## Publish equations

Version 7 automatically renders inline `$E=mc^2$` and display `$$...$$` LaTeX equations in Obsidian, the CLI and Docker. No extra publishing setting is required. See [LaTeX equations](/docs/latex) for examples and supported syntax.

## Exclude private or draft folders

Set `foldersToExclude` in JSON, pass `--excludeFolders private,drafts`, or use **Excluded folders** in Obsidian. Paths are relative to `contentRoot` (the vault in Obsidian).

```json
{"foldersToExclude": ["private", "drafts"]}
```

Exclusions override publish tags and `connie-publish: true`. `private` excludes `private/note.md`, but not `private-other/note.md`. This selects pages; it does **not** redact content explicitly embedded from an excluded note.

## Validate and plan before publishing

The v7 CLI can validate offline, discover destinations without writing, and produce JSON reports. Follow [Validate, plan and report](/docs/preflight).

## Restrict editing and order pages

Use [page edit locks](/docs/page-edit-locks) to keep editing with the publishing account. Enable `orderPages` and use numeric `sort-order` values to [order sibling pages](/docs/features/folder-structure#order-sibling-pages).

## Sources

- [Publishing settings and frontmatter reference](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/cli/README.md)
- [Per-page configuration implementation](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/packages/lib/src/ConniePageConfig.ts)
- [Publishing behavior](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/MIGRATING_TO_6.md#publishing-behavior)
- [Blog and inline-comment verification](https://github.com/markdown-confluence/markdown-confluence/blob/9392b954dc50d48d1ea072d555cf7029d562e00f/documentation/CLOUD_API_MIGRATION.md#feature-acceptance)
